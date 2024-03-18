import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { GET_QUIZ } from '../redux/actionTypes';
import { selectSelectedQuiz } from '../redux/reducers/quizReducer';
import { Button, Container, Typography } from '@mui/material';
import QuizSummary from '../components/QuizSummary';
import QuizSolving from '../components/QuizSolving';
import BaseComponent from '../components/BaseComponent';

const SolvingQuizPage = ({ isLoading }) => {
  const { id } = useParams();
  const selectedQuiz = useSelector((state) => selectSelectedQuiz(state, parseInt(id)));
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [allAnswers] = useState([]);
  const [isCorrect, setIsCorrect] = useState(null);
  const [isLocked, setIsLocked] = useState(false);
  const [isSummary, setIsSummary] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: GET_QUIZ,
      payload: { id },
    });
  }, [dispatch, id]);

  useEffect(() => {
    if (allAnswers[currentQuestionIdx]) {
      const alreadyAnswered = allAnswers[currentQuestionIdx];
      setIsLocked(true);
      setAnswer(alreadyAnswered.given);

      if (alreadyAnswered.given === alreadyAnswered.correct) {
        setFeedback('Correct answer!');
        setIsCorrect(true);
      } else {
        setFeedback(`Incorrect! Correct answer is ${alreadyAnswered.correct}.`)
        setIsCorrect(false);
      }
    } else {
      setIsLocked(false);
      setAnswer('');
      setFeedback('');
    }
  }, [currentQuestionIdx, allAnswers]);

  if (isSummary) {
    return <QuizSummary
      quiz={selectedQuiz}
      score={score}
      answers={allAnswers}
      gotoQuestion={(idx) => {
        setCurrentQuestionIdx(idx);
        setIsSummary(false);
      }}
    />;
  }

  const onAnswerQuestion = () => {
    if (isLocked) {
      if (currentQuestionIdx + 1 === selectedQuiz.questions.length) {
        setIsSummary(true);
      } else {
        setCurrentQuestionIdx(currentQuestionIdx + 1);
      }
    } else {
      const correctAnswer = selectedQuiz.questions[currentQuestionIdx].answer;
      if (answer.toLowerCase() === correctAnswer.toLowerCase()) {
        setFeedback('Correct answer!');
        setIsCorrect(true);
        setScore(score + 1);
      } else {
        setFeedback(`Incorrect! Correct answer is ${correctAnswer}.`)
        setIsCorrect(false);
      }
      allAnswers.push({
        given: answer,
        correct: correctAnswer,
      });
      setIsLocked(true);
    }
  };

  if (isLoading || !selectedQuiz) {
    return <>
      Loading...
    </>
  }

  return <>
    <Typography
      variant='h4'
      align='center'
      fontFamily='serif'
      sx={{
        margin: '16px 0',
      }}
    >
      {selectedQuiz.name}
    </Typography>

    <Container sx={{
      flexGrow: 1,
      padding: '8px',
      minHeight: '50vh',
      overflowY: 'scroll',
      borderTop: 'none',
      backgroundColor: 'rgba(0, 40, 100, 0.2)',
    }}
    >
      <QuizSolving
        question={selectedQuiz.questions[currentQuestionIdx].question}
        questionNo={currentQuestionIdx + 1}
        score={score}
        answer={answer}
        feedback={feedback}
        isCorrect={isCorrect}
        isLocked={isLocked}
        onAnswerChange={answer => setAnswer(answer)}
        onAnswerSubmit={onAnswerQuestion}
      />
    </Container>

    <Container
      sx={{
        display: 'flex',
        alignItems: 'center',
        margin: '8px 0',
        justifyContent: 'space-around',
      }}
    >
      <Button
        variant='contained'
        disabled={currentQuestionIdx === 0}
        onClick={() => setCurrentQuestionIdx(currentQuestionIdx - 1)}
      >
        Back
      </Button>

      <Button
        variant='contained'
        onClick={onAnswerQuestion}
        disabled={!isLocked}
      >
        {currentQuestionIdx + 1 === selectedQuiz.questions.length ? 'Summary' : 'Next'}
      </Button>
    </Container>
  </>;
};

export default BaseComponent(SolvingQuizPage);
