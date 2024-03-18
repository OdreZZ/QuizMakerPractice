import { HttpResponse, http } from 'msw';
import { QUIZ_ENDPOINT } from '../services/quizService';
import { API_BASE_URL } from '../services/api';
import { QUESTION_ENDPOINT } from '../services/questionService';

let nextQuizId = 2;
let allQuizzes = [{
    "id": 1,
    "name": "My Quiz",
    "questions": [
        {
            "id": 1,
            "question": "Who was the English mathematician and writer widely considered as the worldq's first computer programmer for her work on Charles Babbage's proposed mechanical general-purpose computer, the Analytical Engine?",
            "answer": "Ada Lovelace"
        }
    ],
}];
let allQuestions = [{
    "question": "Who was the English mathematician and writer widely considered as the worldq's first computer programmer for her work on Charles Babbage's proposed mechanical general-purpose computer, the Analytical Engine?",
    "answer": "Ada Lovelace"
}];

const MSW_HEADERS = {
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    },
};

const handlers = [
    http.get(`${API_BASE_URL}${QUIZ_ENDPOINT}`, () => {
        return HttpResponse.json(allQuizzes, MSW_HEADERS);
    }),

    http.post(`${API_BASE_URL}${QUIZ_ENDPOINT}`, async ({ request }) => {
        const newQuiz = await request.json();
        newQuiz.id = nextQuizId++;
        allQuizzes.push({
            id: newQuiz.id,
            ...newQuiz,
        })

        allQuestions.push(...newQuiz.questions.filter(question => !allQuestions.some(unique => 
            unique.question === question.question && unique.answer === question.answer,
        )));

        return HttpResponse.json(newQuiz, MSW_HEADERS);
    }),

    http.get(`${API_BASE_URL}${QUIZ_ENDPOINT}/:id`, ({ params }) => {
        const { id } = params;

        const selectedQuiz = allQuizzes.find(quiz => quiz.id === parseInt(id));

        if (selectedQuiz) {
            return HttpResponse.json(selectedQuiz, MSW_HEADERS);
        } else {
            return HttpResponse.json(null, { ...MSW_HEADERS, status: 404 });
        }
    }),

    http.put(`${API_BASE_URL}${QUIZ_ENDPOINT}/:id`, async ({ request, params }) => {
        const { id } = params;
        const updatedData = await request.json();
        const idx = allQuizzes.findIndex(quiz => quiz.id === parseInt(id));
        const updatedQuiz = {
            id: parseInt(id),
            ...updatedData,
        }

        if (idx !== undefined) {
            allQuizzes = [
                ...allQuizzes.filter(quiz => quiz.id !== parseInt(id)),
                updatedQuiz,
            ];
        } else {
            return HttpResponse.json(null, { status: 404 });
        }

        allQuestions.push(...updatedQuiz.questions.filter(question => !allQuestions.some(unique => 
            unique.question === question.question && unique.answer === question.answer,
        )));

        return HttpResponse.json(updatedQuiz, MSW_HEADERS);
    }),

    http.delete(`${API_BASE_URL}${QUIZ_ENDPOINT}/:id`, ({ params }) => {
        const { id } = params;
        const selectedQuizIdx = allQuizzes.findIndex(quiz => quiz.id === parseInt(id));

        if (selectedQuizIdx >= 0) {
            allQuizzes.splice(selectedQuizIdx, 1);
        } else {
            return HttpResponse.json(null, { status: 404 });
        }

        return HttpResponse.json({ id: parseInt(id) }, { status: 200 });
    }, MSW_HEADERS),

    http.get(`${API_BASE_URL}${QUESTION_ENDPOINT}`, () => {
        return HttpResponse.json(allQuestions, MSW_HEADERS);
    }),
];

export { handlers };
