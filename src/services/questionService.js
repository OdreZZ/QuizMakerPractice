import apiService from './api';

export const QUESTION_ENDPOINT = '/questions';

export const getAllQuestions = async () => {
    const allQuestions = await apiService.get(QUESTION_ENDPOINT);
    return allQuestions.data;
};
