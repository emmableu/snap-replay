import React from "react";
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import {Replayer} from "../Replayer.js";
import ReplayerAPI from "../api/ReplayerAPI.js";
import axios from "../api/axiosSpringConfig.js"
import {useSelector, useDispatch} from "react-redux";
import replayerAPI from "../api/ReplayerAPI.js";
const ScratchRender = require('scratch-render/src/RenderWebGL.js');
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Bisect from "../util/Bisect";
import globalConfig from "../globalConfig";
import {setIsFullProject} from "../redux/features/isFullProjectSlice";
import {setTimeRange} from "../redux/features/timeRangeSlice";

const TwoFrame = ( ) => {
    const frameRef1 = React.useRef(null);
    const frameRef2 = React.useRef(null);
    const replayer1 = React.useRef(null);
    const replayer2 = React.useRef(null);
    const renderer1 = React.useRef(null);
    const renderer2 = React.useRef(null);
    const timeRange = useSelector(s => s.timeRange.data);
    const dispatch = useDispatch();

    const stride = useSelector(state => state.trace.stride);
    const trace = useSelector(state => state.trace.data);
    const playerPanelContainerWidth = useSelector(state => state.rect.data.playerPanelContainerWidth);
    const calcFrameWidth = (playerPanelContainerWidth) => (
      (playerPanelContainerWidth / 2
        - globalConfig.oneSideOuterPadding
        - globalConfig.oneSideInnerPadding) / window.devicePixelRatio
    );
    const [frameWidth, setFrameWidth] = React.useState(calcFrameWidth(playerPanelContainerWidth));
    const minDistance = 1;
    const selectedProject = useSelector(state => state.selectedProject.data.selected);
    const [originalMode, setOriginalMode] = React.useState(false);


    React.useEffect(() => {
        const width = calcFrameWidth(playerPanelContainerWidth)
        setFrameWidth(width);
        const height = width * 0.75;
        try {
            for (const renderer of [renderer1, renderer2]) {
                renderer.current.resize(width, height);
            }
        }
        catch (e) {
            console.error(e);
        }
    }, [playerPanelContainerWidth])

    React.useEffect(  () => {
        const frameRefs = [frameRef1, frameRef2];
        const replayers = [replayer1, replayer2];
        const renderers = [renderer1, renderer2];

        for (const i of [0, 1]) {
            const frameRef = frameRefs[i];
            const renderer = renderers[i];
            const replayer = replayers[i];

            renderer.current = new ScratchRender(frameRef.current);
            renderer.current.setLayerGroupOrdering(['group1']);
            replayer.current = new Replayer(renderer.current, selectedProject, trace);

            const drawStep = function () {
                renderer.current.draw();
                requestAnimationFrame(drawStep);
            };

            // size somehow gets multiplied by 4 on mac retina displays
            const width = frameWidth ;
            const height = width * 0.75;
            // console.log("width, height: ", width, height);
            renderer.current.resize(width, height);
            drawStep();
            replayerAPI.postScript(selectedProject, false, timeRange[0], timeRange[1], stride)
        }
    }, [selectedProject])

    const handleChangeTimeSlider = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }
        if (newValue[1] - newValue[0] < minDistance) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], 100 - minDistance);
                dispatch(setTimeRange([clamped, clamped + minDistance]));
            } else {
                const clamped = Math.max(newValue[1], minDistance);
                dispatch(setTimeRange([clamped - minDistance, clamped]));
            }
            replayer1.current.loadFrame(timeRange[0] * stride);
            replayer2.current.loadFrame(timeRange[1] * stride);
        }
        else {
            dispatch(setTimeRange(newValue));
            if (activeThumb === 0) {
                replayer1.current.loadFrame(timeRange[0] * stride);
            } else {
                replayer2.current.loadFrame(timeRange[1] * stride);
            }
        }
    };

    const handleMouseUp = (e, newValue) => {
        if (globalConfig.playerOnly) return;
        const traceBlocks =  new Set(trace.blocks.slice(newValue[0] * stride, newValue[1] * stride));
        window.ide.traceBlocks = traceBlocks;
        if (!originalMode) {
            replayerAPI.postScript(selectedProject, false, newValue[0], newValue[1], stride)
        }
        else {
            window.ide.highlightRunningCode(traceBlocks);
        }
    }


    const handleChangeSwitch = (event) => {
        const newChecked = event.target.checked;
        setOriginalMode(newChecked);
        dispatch(setIsFullProject(newChecked))
        if (newChecked) {
            replayerAPI.postScript(selectedProject, true, 0, 0, 0).then(
                res => setOriginalMode(true)
            )
        }
        else {
            replayerAPI.postScript(selectedProject, false, timeRange[0], timeRange[1], stride).then(
                res => setOriginalMode(false)
            )
        }
    };


    return (
        <div>

            <div style={{
                display: "flex",

            }}>
            <div style={{backgroundColor:  "#c9c9c9", border: "1px solid #c9c9c9"}}>
                {/*<div>*/}
                <canvas
                    ref={frameRef1}
                >
                </canvas>
            </div>
            <div style={{backgroundColor: "#c9c9c9", border: "1px solid #c9c9c9"}}>
                {/*<div>*/}
                <canvas
                    ref={frameRef2}
                >
                </canvas>
            </div>
            </div>

            <Slider
                getAriaLabel={() => 'Minimum distance shift'}
                value={timeRange}
                onChange={handleChangeTimeSlider}
                onChangeCommitted={handleMouseUp}
                valueLabelDisplay="auto"
                disableSwap
            />
            {/*<Button onClick={showFullCode}>Show Complete Code</Button>*/}
            {
                !globalConfig.playerOnly &&
                <FormGroup>
                    <FormControlLabel
                        originalMode={originalMode}
                        onChange={handleChangeSwitch}
                        control={<Switch />} label="Show Full Project" />
                </FormGroup>
            }
        </div>
    )
}

export default TwoFrame;
