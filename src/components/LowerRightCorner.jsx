import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import SaveToNotebookButton from "./SaveToNotebookButton";
import replayerAPI from "../api/ReplayerAPI";
import Paper from "@mui/material/Paper";

const LowerRightCorner = () => {

    const [singleStepping, setSingleStepping] = React.useState(false);

    const handleChangeSwitch = (event) => {
        window.ide.stage.threads.toggleSingleStepping();
    };


    return (
        <>
            <Paper style={{
                position: "absolute",
                right: "30px",
                bottom:"180px",
                padding: "0px 0px 0px 20px",
                backgroundColor: "#E0DFE0",
                zIndex: 9,
            }}>
                <FormGroup>
                    <FormControlLabel
                        originalMode={singleStepping}
                        onChange={handleChangeSwitch}
                        control={<Switch />} label="Slower" />
                </FormGroup>
            </Paper>
        <SaveToNotebookButton/>
        </>
    )
}

export default LowerRightCorner;
