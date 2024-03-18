import { useCallback, useState } from "react";

export const INITIAL_QUESTION = { id: 0, question: '', answer: '' };

let nextQuestionId = 1;

// Custom Hook for editing questions.
export function useQuestionEditor() {
    const [name, setName] = useState('');
    const [questions, setQuestions] = useState([{ ...INITIAL_QUESTION }]);

    const initialize = useCallback(() => {
        setQuestions([{ ...INITIAL_QUESTION }]);
    }, [setQuestions]);

    const removeQuestion = useCallback((questionId) => {
        if (questions.length > 1) {
            setQuestions(questions.filter(question => question.id !== questionId));
        }
    }, [questions, setQuestions]);

    const addQuestion = useCallback(() => {
        const newQuestion = {
            id: nextQuestionId++,
            question: '',
            answer: '',
        };

        setQuestions([...questions, newQuestion]);
    }, [questions]);

    const updateQuestion = useCallback((questionId, newQuestion) => {
        setQuestions(questions.map((question) => {
            if (question.id === questionId) {
                question.question = newQuestion;
            }

            return question;
        }));
    }, [questions]);

    const updateAnswer = useCallback((questionId, newAnswer) => {
        setQuestions(questions.map((question) => {
            if (question.id === questionId) {
                question.answer = newAnswer;
            }

            return question;
        }));
    }, [questions, setQuestions]);

    const updateQuestions = useCallback((quiz) => {
        setName(quiz.name);
        setQuestions([...quiz.questions.map(question => ({
            id: question.id,
            question: question.question,
            answer: question.answer,
        }))]);
        nextQuestionId = quiz.questions.length + 1;
    }, [setName, setQuestions]);

    return [
        name,
        setName,
        questions,
        initialize,
        addQuestion,
        updateQuestion,
        updateAnswer,
        updateQuestions,
        removeQuestion,
    ];
};
