import React from "react";
import Button from '@mui/material/Button';
import FlagIcon from '@mui/icons-material/Flag';
import StopIcon from '@mui/icons-material/Stop';
import ScratchStage from "../whisker/scratch-stage"
import ReplayerAPI from "../api/ReplayerAPI";
import {useSelector, useDispatch} from "react-redux";
import {setStride, setTrace} from "../redux/features/traceSlice";

const Player = (props) => {
    const {nextEnabled, setNextEnabled} = props;
    const playerPanelWidth = useSelector(state => state.rect.data.playerPanelWidth);
    const playerRef = React.useRef();
    const selectedProject = useSelector(state => state.selectedProject.data.selected);
    const scratch = React.useRef();
    const dispatch = useDispatch();

    React.useEffect(async () => {
        if (scratch.current) {
            scratch.current.stop();
        }
        else {
            scratch.current = new ScratchStage(playerRef.current);
            window.scratch = scratch.current;
        }
        const width = playerPanelWidth / window.devicePixelRatio;
        const height = width * 0.75;
        scratch.current.vm.renderer.resize(width, height);
        const sb3 = await ReplayerAPI.getSB3(selectedProject);
        await scratch.current.vm.loadProject(sb3).then(r => console.log("complete loading project"));
        await new Promise(r => setTimeout(r, 500));
        scratch.current.start();
    }, [selectedProject])


    const handleGreenFlag = (e) => {
        scratch.current.greenFlag();
    }

    const handleStop = (e) => {
        stop();
    }

    const stop = () => {
        scratch.current.stop();
        const trace = scratch.current.traceLogger.trace;
        const stride = trace.endIdx / 100;

        ReplayerAPI.postTrace(selectedProject, trace.blocks).then(
            res => {
                dispatch(setTrace({...trace}));
                dispatch(setStride(stride));
                scratch.current.clearTrace();
                setNextEnabled(true);
            }
        )

        //
        // ReplayerAPI.postScript(selectedProject, true, 0, 0, 0).then(
        //     res => {
        //         setNextEnabled(true);
        //     }
        // )
    }


    return (
        <>
            <Button color="success" variant="outlined" onClick={handleGreenFlag}><FlagIcon/></Button>
            <Button color="error" variant="outlined" onClick={handleStop}><StopIcon/></Button>
            <div style={{backgroundColor: "grey", border: "1px solid grey"}}>
                {/*<div>*/}
                <canvas
                    tabIndex={0}
                    ref={playerRef}
                >
                </canvas>
            </div>
        </>
    )
}

export default Player
