import React, { Suspense, useEffect, useState } from 'react';
import { CREATE_QUIZ_SUBMIT, GET_ALL_QUESTIONS, GET_QUIZ, UPDATE_QUIZ_SUBMIT } from '../redux/actionTypes';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Divider, TextField, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { selectAllQuestions, selectSelectedQuiz } from '../redux/reducers/quizReducer';
import { Add, ArrowBack, Create } from '@mui/icons-material';
import { useQuestionEditor } from '../util/QuestionEditor';
import BaseComponent from '../components/BaseComponent';
import Loader from '../components/Loader';
import Question from '../components/Question';

const isAnyFieldEmpty = (name, questions) => {
  let isEmpty = name === '';
  questions.forEach(question => {
    if (!question.question || !question.answer) {
      isEmpty = true;
    }
  });

  return isEmpty;
};

const EditQuizPage = ({ isLoading, error }) => {
  const { id } = useParams();
  const isEdit = id !== undefined;

  const selectedQuiz = useSelector((state) => selectSelectedQuiz(state, parseInt(id)));
  const allQuestions = useSelector(selectAllQuestions);
  const [isInitialized, setIsInitialized] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [
    name,
    setName,
    questions,
    initializeQuiz,
    addQuestion,
    updateQuestion,
    updateAnswer,
    updateQuestions,
    removeQuestion,
  ] = useQuestionEditor();

  const isSomeFieldEmpty = isAnyFieldEmpty(name, questions);

  useEffect(() => {
    if (isEdit) {
      dispatch({
        type: GET_QUIZ,
        payload: { id },
      });
    }

    dispatch({
      type: GET_ALL_QUESTIONS,
    });
  }, [id, isEdit, dispatch]);

  useEffect(() => {
    if (error && isEdit && !isInitialized) {
      navigate('/404');
    }

    if (!isLoading && !error && selectedQuiz && isEdit && !isInitialized) {
      setIsInitialized(true);
      updateQuestions(selectedQuiz);
    }

    if (!isLoading && !error && !selectedQuiz && !isEdit) {
      initializeQuiz();
      setIsInitialized(true);
    }
  }, [id, isLoading, isInitialized, error, selectedQuiz, isEdit, navigate, initializeQuiz, updateQuestions, setIsInitialized]);

  const onSubmitQuiz = () => {
    if (isLoading) {
      return;
    }

    const quiz = {
      name,
      questions,
    };

    if (isEdit) {
      dispatch({
        type: UPDATE_QUIZ_SUBMIT,
        payload: { id, updatedQuiz: quiz },
      });
    } else {
      dispatch({
        type: CREATE_QUIZ_SUBMIT,
        payload: { newQuiz: quiz },
      });
    }
  };

  return <Suspense fallback={<Loader />}>
    <Typography variant="h6" sx={{ marginTop: '12px' }}>
      Quiz Name:
    </Typography>

    <TextField
      placeholder='Quiz Name'
      value={name}
      onChange={(e) => setName(e.target.value)}
      sx={{ width: '100%', marginBottom: '16px' }}
    />

    <Divider flexItem />

    <Box align='center'
      sx={{
        padding: '24px 8px',
        height: '60vh',
        flexGrow: 1,
        overflowY: 'scroll',
        borderTop: 'none',
        backgroundColor: 'rgba(0, 40, 100, 0.2)',
      }}
    >
      {questions.map((question, idx) => (
        <Question
          key={`question-${question.id}`}
          question={question}
          questionNumber={idx + 1}
          questionPool={allQuestions}
          onRemoveQuestion={removeQuestion}
          onChangeAnswer={updateAnswer}
          onChangeQuestion={updateQuestion}
        />
      ))}

      <Button
        variant='contained'
        onClick={addQuestion}
        startIcon={<Add />}
      >
        Add New Question
      </Button>
    </Box>

    <Divider flexItem />

    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        margin: '16px 0',
      }}
    >
      <Button
        variant='outlined'
        onClick={() => navigate('/')}
        startIcon={<ArrowBack />}
      >
        Back
      </Button>

      <Button
        variant='contained'
        onClick={onSubmitQuiz}
        startIcon={<Create />}
        disabled={questions.length === 0 || isSomeFieldEmpty}
      >
        {isEdit ? 'Update' : 'Create'}
      </Button>
    </Box>
  </Suspense>;
};

export default BaseComponent(EditQuizPage);
