import {
    CREATE_QUIZ_SUBMIT,
    CREATE_QUIZ_SUBMIT_ERROR,
    CREATE_QUIZ_SUBMIT_SUCCESS,
    DELETE_QUIZ,
    DELETE_QUIZ_ERROR,
    DELETE_QUIZ_SUCCESS,
    GET_ALL_QUESTIONS,
    GET_ALL_QUESTIONS_ERROR,
    GET_ALL_QUESTIONS_SUCCESS,
    GET_QUIZ,
    GET_QUIZ_ERROR,
    GET_QUIZ_SUCCESS,
    QUIZZES_LOAD,
    QUIZZES_LOAD_ERROR,
    QUIZZES_LOAD_SUCCESS,
    UPDATE_QUIZ_SUBMIT,
    UPDATE_QUIZ_SUBMIT_ERROR,
    UPDATE_QUIZ_SUBMIT_SUCCESS,
} from "../actionTypes";

const initialState = {
    isLoading: true,
    quizzes: [],
    allQuestions: [],
    error: null,
};

const quizReducer = (state = initialState, action) => {
    switch (action.type) {
        case QUIZZES_LOAD:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case QUIZZES_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error,
            };
        case QUIZZES_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                quizzes: action.payload.quizzes,
                error: null,
            };
        case CREATE_QUIZ_SUBMIT:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case CREATE_QUIZ_SUBMIT_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error,
            };
        case CREATE_QUIZ_SUBMIT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                quizzes: [...state.quizzes, action.payload.createdQuiz],
                error: null,
            };
        case GET_QUIZ:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case GET_QUIZ_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error,
            };
        case GET_QUIZ_SUCCESS:
            return {
                ...state,
                isLoading: false,
                quizzes: [
                    {
                        ...action.payload,
                    },
                    ...state.quizzes.filter(quiz => quiz.id !== action.payload.id),
                ],
                error: null,
            };
        case UPDATE_QUIZ_SUBMIT:
            return {
                ...state,
                isLoading: true,
            };
        case UPDATE_QUIZ_SUBMIT_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error,
            };
        case UPDATE_QUIZ_SUBMIT_SUCCESS:
            const { id, name, questions } = action.payload;

            return {
                ...state,
                isLoading: false,
                quizzes: state.quizzes.map(quiz => {
                    if (quiz.id === id) {
                        return {
                            ...quiz,
                            id,
                            name,
                            questions,
                        };
                    }

                    return quiz;
                }),
            };
        case DELETE_QUIZ:
            return {
                ...state,
                isLoading: true,
            };
        case DELETE_QUIZ_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error,
            };
        case DELETE_QUIZ_SUCCESS:
            return {
                ...state,
                isLoading: false,
                quizzes: state.quizzes.filter(quiz => quiz.id !== action.payload.id),
                error: null,
            };
        case GET_ALL_QUESTIONS:
            return {
                ...state,
                isLoading: true,
            };
        case GET_ALL_QUESTIONS_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error,
            };
        case GET_ALL_QUESTIONS_SUCCESS:
            return {
                ...state,
                allQuestions: action.payload,
                isLoading: false,
                error: null,
            };
        default:
            return state;
    }
};

export { quizReducer };

export const selectIsLoading = state => state.quiz.isLoading;
export const selectQuizzes = state => state.quiz.quizzes;
export const selectError = state => state.quiz.error;
export const selectNewQuiz = state => state.quiz.newQuiz;
export const selectSelectedQuiz = (state, id) => state.quiz.quizzes.find(quiz => quiz.id === id);
export const selectAllQuestions = state => state.quiz.allQuestions;
