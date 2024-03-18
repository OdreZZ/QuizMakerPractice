import { DeleteOutline, Recycling } from "@mui/icons-material";
import { Container, Divider, IconButton, Paper, TextField, Tooltip, Typography } from "@mui/material";
import React from "react";

class Question extends React.PureComponent {
    render() {
        const {
            question,
            questionNumber,
            questionPool,
            onRemoveQuestion,
            onChangeAnswer,
            onChangeQuestion,
        } = this.props;

        const onRecycleRandomQuestion = () => {
            const randomQuestionIdx = Math.floor(Math.random() * questionPool.length);
            const chosenQuestion = questionPool[randomQuestionIdx];

            onChangeQuestion(question.id, chosenQuestion.question);
            onChangeAnswer(question.id, chosenQuestion.answer);
        };

        return <Paper elevation={1}
            sx={{
                flexDirection: 'column',
                maxWidth: '800px',
                alignSelf: 'center',
            }}
        >
            <Container align='top'
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <Typography variant='h6'>
                    Question #{questionNumber}

                    <Tooltip title='Recycle Random Question' arrow>
                        <IconButton
                            color='primary'
                            size='small'
                            onClick={onRecycleRandomQuestion}
                            sx={{ ml: '6px' }}
                        >
                            <Recycling />
                        </IconButton>
                    </Tooltip>
                </Typography>

                <Tooltip title='Delete Question' arrow>
                    <IconButton
                        color='secondary'
                        size='small'
                        onClick={() => onRemoveQuestion(question.id)}
                    >
                        <DeleteOutline />
                    </IconButton>
                </Tooltip>
            </Container>

            <Divider flexItem />

            <Container sx={{ margin: '8px 0' }}>
                <Typography>
                    Question
                </Typography>

                <TextField
                    multiline
                    rows={4}
                    placeholder='Question'
                    size='large'
                    value={question.question}
                    sx={{ width: '100%' }}
                    onChange={(e) => onChangeQuestion(question.id, e.target.value)}
                />
            </Container>

            <Container sx={{ margin: '8px 0' }}>
                <Typography>
                    Answer
                </Typography>

                <TextField
                    placeholder='Answer'
                    size='medium'
                    value={question.answer}
                    sx={{ width: '100%' }}
                    onChange={(e) => onChangeAnswer(question.id, e.target.value)}
                />
            </Container>
        </Paper>
    }
};

export default Question;
