import { Check, Clear, VisibilityOutlined } from "@mui/icons-material";
import { Button, Container, Divider, Icon, IconButton, LinearProgress, Paper, Tooltip, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const QuizSummary = ({ quiz, score, answers, gotoQuestion }) => {
    const navigate = useNavigate();

    return <>
        <Typography
            variant='h4'
            align='center'
            fontFamily='serif'
            sx={{
                margin: '16px 0',
            }}
        >
            {quiz.name}
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
            <Paper elevation={2}
                sx={{
                    flexDirection: 'column',
                    width: '100%',
                    maxWidth: '800px',
                    margin: '32px auto',
                }}
            >
                <Typography
                    variant='h5'
                >
                    Summary
                </Typography>

                <Divider flexItem />

                <Typography color='primary' sx={{ mt: '12px' }}>
                    Score: {score}/{quiz.questions.length}
                </Typography>

                <LinearProgress
                    variant='determinate'
                    value={score / quiz.questions.length * 100}
                />

                <Container sx={{ m: '24px 12px' }}>
                    {quiz.questions.map((question, idx) => {
                        const answer = answers[idx];
                        const isCorrect = answer.correct === answer.given;

                        return (
                            <Paper key={`question-${question.id}`}
                                sx={{
                                    alignItems: 'end',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Typography textAlign='left'>
                                    <Tooltip title={`View Question ${idx + 1}`} arrow>
                                        <IconButton
                                            size='small'
                                            onClick={() => gotoQuestion(idx)}
                                        >
                                            <VisibilityOutlined />
                                        </IconButton>
                                    </Tooltip>

                                    {idx + 1}. Question
                                </Typography>

                                <Typography
                                    color={isCorrect ? 'primary' : 'secondary'}
                                >
                                    <Icon>
                                        {isCorrect ? <Check /> : <Clear />}
                                    </Icon>
                                </Typography>
                            </Paper>
                        );
                    })}
                </Container>
            </Paper>
        </Container>

        <Container align='center'
            sx={{
                margin: '16px 0',
            }}
        >
            <Button
                variant="contained"
                onClick={() => navigate('/')}
            >
                Back to Dashboard
            </Button>
        </Container>
    </>;
};

export default QuizSummary;
