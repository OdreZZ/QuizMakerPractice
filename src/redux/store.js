import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { quizReducer } from './reducers/quizReducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/sagas';
import { navigationReducer } from './reducers/navigationReducer';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    navigation: navigationReducer,
    quiz: quizReducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([sagaMiddleware]),
});

sagaMiddleware.run(rootSaga);

export default store;
