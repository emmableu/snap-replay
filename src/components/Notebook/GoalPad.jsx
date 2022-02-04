import {makeStyles} from "@mui/styles";
import React from "react";
import Paper from "@mui/material/Paper";

const useStyles = makeStyles((theme) => ({
    goalPad: {
        // width: globalConfig.responsiveSizeData.actorDrawerWidth,
        // flex: `0 0 ${globalConfig.responsiveSizeData.actorDrawerWidth}px`,
        borderColor: "black",
        backgroundColor: "red",
        height: "100%"
    },
}));
const GoalPad = () => {
    const classes = useStyles();

    return (
            <Paper className={classes.goalPad}>
                Goal:
                Your goal is to ...
            </Paper>
    );
}

export default GoalPad;
