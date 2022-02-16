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
import {Fab, Tooltip} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import ReplayIcon from '@mui/icons-material/Replay';
import globalConfig from "../globalConfig";
import {useSelector} from "react-redux";
import ReplayerAPI from "../api/ReplayerAPI";
import Button from "@mui/material/Button";
import FlagIcon from "@mui/icons-material/Flag";

const LowerRightCorner = () => {

    const [singleStepping, setSingleStepping] = React.useState(false);
    const isFullProject = useSelector(state => state.isFullProject.data);
    const selectedProject = useSelector(state => state.selectedProject.data.selected);
    // const stride = useSelector(s => s.trace.stride);
    const realRange = useSelector(s => s.timeRange.real);

    const handleChangeSwitch = (event) => {
        setSingleStepping(!singleStepping);
        window.ide.stage.threads.toggleSingleStepping();
    };

    const handleReload = (event) => {
        if (globalConfig.simplifiedInterfaceFor110) {
            return;
        }
        if (globalConfig.controlCond) {
            ReplayerAPI.postSnapXML(selectedProject, null, "script_and_asset_no_slice").then(
            );
        }
        else {
            if (isFullProject) {
                replayerAPI.postScript(selectedProject, true, 0, 0).then()
            }
            else {
                replayerAPI.postScript(selectedProject, false, realRange[0], realRange[1])
            }
        }
    }

    const handleGreenFlag = (e) => {
        if (window.ide) {
            window.ide.runScripts();
        }
    }

    return (
        <>
            <div style={{
                position: "absolute",
                right: "55px",
                bottom:"100px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                zIndex: 9,
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Tooltip title="Press Green Flag">
                    <Fab  size="small"  onClick={handleGreenFlag}><FlagIcon   color="success"/></Fab>
                </Tooltip>

            {!globalConfig.simplifiedInterfaceFor110 &&
                <Tooltip title="Reload">
                <Fab size="small" onClick={handleReload}><ReplayIcon/></Fab>
            </Tooltip>
            }
            <Paper style={{
                borderRadius: '50%',
                width: 56,
                height: 56,
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
            </div>

        </>
    )
}

export default LowerRightCorner;
