import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectQuizzes } from '../redux/reducers/quizReducer';
import { Box, Button, Typography } from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';
import Quiz from '../components/Quiz';
import { QUIZZES_LOAD } from '../redux/actionTypes';

const HomePage = () => {
    const allQuizzes = useSelector(selectQuizzes);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: QUIZZES_LOAD,
        });
    }, [dispatch]);

    return <>
        <Typography
            variant='h4'
            align='center'
            fontFamily='serif'
            sx={{
                margin: '16px 0',
            }}
        >
            Welcome! Craft your quizzes here.
        </Typography>

        <Box align='center'
            sx={{
                padding: '16px 8px',
                height: '60vh',
                flexGrow: 1,
                overflowY: 'scroll',
                borderTop: 'none',
                backgroundColor: 'rgba(0, 40, 100, 0.2)',
            }}
        >
            {allQuizzes.map(quiz => (
                <Quiz
                    key={`quiz-${quiz.id}`}
                    quiz={quiz}
                />
            ))}
        </Box>

        <Button
            variant='contained'
            LinkComponent={Link}
            to='/create'
            sx={{
                margin: '16px 0',
                height: '64px',
                borderRadius: '12px',
                fontSize: '24px',
            }}
        >
            <AddCircleOutline fontSize='large' sx={{ mr: '12px' }} /> New Quiz
        </Button>
    </>;
};

export default HomePage;
