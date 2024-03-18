import { DeleteOutline, PlayCircleFilledOutlined } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DELETE_QUIZ } from "../redux/actionTypes";
import { useState } from "react";

const Quiz = ({ quiz }) => {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onDeleteQuiz = (quizId) => {
        dispatch({
            type: DELETE_QUIZ,
            payload: { id: quizId },
        });
    };

    return <Paper key={`quiz-${quiz.id}`}
        elevation={1}
        onClick={() => navigate(`/edit/${quiz.id}`)}
        sx={{
            alignItems: 'center',
            maxWidth: '800px',
            cursor: 'pointer',
            '&:hover': {
                backgroundColor: 'rgba(21, 120, 210, 0.1)',
            },
        }}
    >
        <Tooltip title='Do Quiz!' arrow>
            <IconButton
                size='medium'
                color='primary'
                onClick={(e) => {
                    navigate(`/solve/${quiz.id}`);
                    e.stopPropagation();
                }}
            >
                <PlayCircleFilledOutlined fontSize='large' />
            </IconButton>
        </Tooltip>

        <Typography
            noWrap
            variant='h6'
            textAlign='left'
            sx={{ flexGrow: 1 }}
        >
            {quiz.name}
        </Typography>

        <Tooltip title='Delete Quiz' arrow>
            <IconButton
                size='small'
                color='error'
                onClick={(e) => {
                    setShowDeleteDialog(true);
                    e.stopPropagation();
                }}
            >
                <DeleteOutline />
            </IconButton>
        </Tooltip>

        <Dialog
            open={showDeleteDialog}
            onClose={(e) => {
                setShowDeleteDialog(false);
                e.stopPropagation();
            }}
        >
            <DialogTitle>Confirmation</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete this quiz?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={(e) => {
                        setShowDeleteDialog(false);
                        e.stopPropagation();
                    }}
                    variant='contained'
                    color='primary'
                >
                    Cancel
                </Button>
                <Button
                    onClick={(e) => {
                        onDeleteQuiz(quiz.id);
                        e.stopPropagation();
                    }}
                    variant='contained'
                    color='secondary'
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    </Paper>
};

export default Quiz;
