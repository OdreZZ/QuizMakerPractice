import apiService from './api';

export const QUIZ_ENDPOINT = '/quizzes';

export const getAllQuizzes = async () => {
    return await apiService.get(QUIZ_ENDPOINT);
};

export const createQuiz = async (newQuiz) => {
    const createdQuiz = await apiService.post(QUIZ_ENDPOINT, newQuiz);
    return createdQuiz.data;
};

export const getQuizById = async (quizId) => {
    const selectedQuiz = await apiService.get(`${QUIZ_ENDPOINT}/${quizId}`);
    return selectedQuiz.data;
};

export const updateQuiz = async (quizData) => {
    const updatedQuiz = await apiService.put(`${QUIZ_ENDPOINT}/${quizData.id}`, quizData.updatedQuiz);
    return updatedQuiz.data;
};

export const deleteQuiz = async (quizId) => {
    return await apiService.delete(`${QUIZ_ENDPOINT}/${quizId}`);
};
