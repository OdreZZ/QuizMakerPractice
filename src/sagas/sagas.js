import { call, put, takeEvery } from 'redux-saga/effects'
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
    NAVIGATE,
    QUIZZES_LOAD,
    QUIZZES_LOAD_ERROR,
    QUIZZES_LOAD_SUCCESS,
    UPDATE_QUIZ_SUBMIT,
    UPDATE_QUIZ_SUBMIT_ERROR,
    UPDATE_QUIZ_SUBMIT_SUCCESS,
} from '../redux/actionTypes';
import { createQuiz, deleteQuiz, getAllQuizzes, getQuizById, updateQuiz } from '../services/quizService';
import { getAllQuestions } from '../services/questionService';

function* loadQuizzesSaga() {
    try {
        const allQuizzes = yield call(getAllQuizzes);

        yield put({
            type: QUIZZES_LOAD_SUCCESS,
            payload: { quizzes: allQuizzes.data },
        });
    } catch (error) {
        yield put({
            type: QUIZZES_LOAD_ERROR,
            payload: { error: error.message },
        });
    }
}

function* submitNewQuizSaga(action) {
    try {
        const createdQuiz = yield call(createQuiz, action.payload.newQuiz);

        yield put({
            type: CREATE_QUIZ_SUBMIT_SUCCESS,
            payload: { createdQuiz },
        });

        yield put({
            type: NAVIGATE,
            payload: { redirectTo: '/' },
        });
    } catch (error) {
        yield put({
            type: CREATE_QUIZ_SUBMIT_ERROR,
            payload: { error: error.message },
        });
    }
}

function* updateQuizSaga(action) {
    try {
        const { id, updatedQuiz } = action.payload;

        const newlyUpdatedQuiz = yield call(updateQuiz, { id, updatedQuiz });

        yield put({
            type: NAVIGATE,
            payload: { redirectTo: '/' },
        });

        yield put({
            type: UPDATE_QUIZ_SUBMIT_SUCCESS,
            payload: newlyUpdatedQuiz,
        });
    } catch (error) {
        yield put({
            type: UPDATE_QUIZ_SUBMIT_ERROR,
            payload: { error: error.message },
        });
    }
}

function* getQuizSaga(action) {
    try {
        const selectedQuiz = yield call(getQuizById, action.payload.id);
        yield put({
            type: GET_QUIZ_SUCCESS,
            payload: { ...selectedQuiz },
        });
    } catch (error) {
        yield put({
            type: GET_QUIZ_ERROR,
            payload: { error: error.message },
        });
    }
}

function* deleteQuizSaga(action) {
    try {
        const id = action.payload.id;
        
        yield call(deleteQuiz, id);

        yield put({
            type: DELETE_QUIZ_SUCCESS,
            payload: { id },
        });
    } catch (error) {
        yield put({
            type: DELETE_QUIZ_ERROR,
            payload: { error: error.message },
        });
    }
}

function* getAllQuestionsSaga() {
    try {
        const allQuestions = yield call(getAllQuestions);

        yield put({
            type: GET_ALL_QUESTIONS_SUCCESS,
            payload: allQuestions,
        });
    } catch (error) {
        yield put({
            type: GET_ALL_QUESTIONS_ERROR,
            payload: { error: error.message },
        })
    }
}

export default function* rootSaga() {
    yield takeEvery(QUIZZES_LOAD, loadQuizzesSaga);
    yield takeEvery(CREATE_QUIZ_SUBMIT, submitNewQuizSaga);
    yield takeEvery(UPDATE_QUIZ_SUBMIT, updateQuizSaga);
    yield takeEvery(GET_QUIZ, getQuizSaga);
    yield takeEvery(DELETE_QUIZ, deleteQuizSaga);
    yield takeEvery(GET_ALL_QUESTIONS, getAllQuestionsSaga);
}
