import {makeStyles} from "@mui/styles";
import React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import {useDispatch, useSelector} from "react-redux";
import globalConfig from "../../globalConfig";

const useStyles = makeStyles((theme) => ({
    goalPad: {
        // width: globalConfig.responsiveSizeData.actorDrawerWidth,
        // flex: `0 0 ${globalConfig.responsiveSizeData.actorDrawerWidth}px`,
        // borderColor: "black",
        padding: "0 5px",
        backgroundColor: "white",
        height: "100%",
        fontSize: 13,
        overflow: "scroll"
    },
}));
const GoalPad = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selectedExample = useSelector(state => state.exampleCollection.selectedId);
    const item = useSelector(
        state => {
            if (selectedExample) {
                const item = globalConfig.tasks[selectedExample]
                return item;
            }
            return null
        }
    )


    return (
            <Box className={classes.goalPad}>
                <h5>{item.name}</h5>
                {item.content}
                {/*Goal:*/}
                {/*Your goal is to ...*/}
            </Box>
    );
}

export default GoalPad;
