import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import SaveToNotebookButton from "./SaveToNotebookButton";
import replayerAPI from "../api/ReplayerAPI";
import Paper from "@mui/material/Paper";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import SpeedIcon from '@mui/icons-material/Speed';

const LowerRightCorner = () => {

    const [singleStepping, setSingleStepping] = React.useState(false);

    const handleChangeSwitch = (event) => {
        setSingleStepping(!singleStepping);
        window.ide.stage.threads.toggleSingleStepping();
    };


    return (
        <>
            <Paper style={{
                position: "absolute",
                right: "70px",
                borderRadius: '50%',
                width: 56,
                height: 56,
                bottom:"180px",
                padding: "10px 10px",
                backgroundColor: "#E0DFE0",
                zIndex: 9,
                fontSize: 12,
            }}>
                <FormGroup sx={{margin:"0px 0px -10px 0px"}}>
                    <FormControlLabel
                        originalMode={singleStepping}
                        onChange={handleChangeSwitch}
                        control={<Switch />} label=""/>
                </FormGroup>
                slower
            </Paper>
        <SaveToNotebookButton/>
        </>
    )
}

export default LowerRightCorner;
