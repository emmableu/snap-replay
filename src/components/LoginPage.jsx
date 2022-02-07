import {makeStyles} from "@mui/styles";
import React from "react";
import Cookies from "js-cookie";
import {Button, Container, CssBaseline, Paper, TextField, Typography} from "@mui/material";
import {useDispatch} from "react-redux";
import {setUserId} from "../redux/features/userIdSlice";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: "100px",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: "380px",
        padding: "40px",
    },
    ideaBuilderIcon: {
        fontSize: 20,
    },
    instruction: {
        color: "grey",
        fontStyle: "italic",
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: 10,
    },
    submit: {
        margin: "10px 10px",
    },
}));


const LoginPage = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [curUserId, setCurUserID] = React.useState(null);

    const login = async (e) => {
        if (curUserId === null) {
            return;
        }
        Cookies.set("userId", curUserId);
        await new Promise(r => setTimeout(r, 100));
        dispatch(setUserId(curUserId));
    }

    return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Paper
                    elevation={8}
                    className={classes.paper}>
                    <Typography component="h1" variant="h6" style={{color: "#616161"}}>
                        {'\u00A0'} Programming Study
                    </Typography>
                    <br />
                    <Typography component="h1" variant="subtitle2" className={classes.instruction}>
                        Sign in using your unity ID
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="userId"
                            label="Unity ID"
                            name="userId"
                            autoComplete="userId"
                            autoFocus
                            onInput={ e => setCurUserID(e.target.value.toLowerCase())}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={login}
                        >
                            Sign In
                        </Button>
                    </form>
                </Paper>
            </Container>
    );
}

export default LoginPage;
