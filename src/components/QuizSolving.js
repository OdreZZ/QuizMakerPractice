import { Box, Button, Divider, Paper, TextField, Typography } from "@mui/material";
import React from "react";

class QuizSolving extends React.PureComponent {
    render() {
        const {
            question,
            questionNo,
            score,
            answer,
            isCorrect,
            isLocked,
            onAnswerChange,
            feedback,
            onAnswerSubmit,
        } = this.props;

        return <Paper elevation={1}
            sx={{
                flexDirection: 'column',
                maxWidth: '800px',
                margin: '36px auto',
            }}
        >
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
            }}
            >
                <Typography variant='h5'>
                    Question #{questionNo}
                </Typography>

                <Typography color='primary'>
                    Score: <b>{score}</b>
                </Typography>
            </Box>

            <Divider flexItem />

            <Typography variant='body1'
                sx={{
                    padding: '12px 0',
                }}
            >
                {question}
            </Typography>

            <TextField placeholder='Answer'
                size='small'
                value={answer}
                disabled={isLocked}
                onChange={(e) => onAnswerChange(e.target.value)}
                fullWidth
                inputProps={{ maxLength: 24 }}
            />

            <Box sx={{ mt: '6px' }}>
                <Button variant='contained' disabled={isLocked || answer === ''} onClick={onAnswerSubmit}>Submit</Button>
            </Box>

            <Typography variant='body2'
                color={isCorrect ? 'primary' : 'secondary'}
                sx={{ padding: '12px 0' }}
            >
                {feedback}
            </Typography>
        </Paper>;
    }
};

export default QuizSolving;
