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
    const realRange = useSelector(s => s.timeRange.real);
    const dispatch = useDispatch();
    const [marks, setMarks] = React.useState([]);
    const [marksFormat, setMarksFormat] = React.useState({});
    // const [maxMark, setMaxMark] = React.useState(0);
    // const stride = useSelector(state => state.trace.stride);
    const trace = useSelector(state => state.trace.data);
    // const [valMap, setValMap] = React.useState({});

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
        updateMarks(trace);
    }, [trace])


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
            const width = frameWidth;
            const height = width * 0.75;
            // console.log("width, height: ", width, height);
            renderer.current.resize(width, height);
            drawStep();
            replayerAPI.postScript(selectedProject, false, realRange[0], realRange[1])
        }
    }, [selectedProject])

    const handleChangeTimeSlider = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }
        if (timeRange[0] === newValue[0] && timeRange[1] === newValue[1]) return;
        const real = [];
        for (const d of newValue) {
            real.push(parseInt(valMap[d.toString()]));
        }

        // for (const val of newValue) {
        //     if (!(markVals.includes(val.toString()))) return;
        // }
        if (activeThumb === 0) {
            replayer1.current.loadFrame(real[0] );
        } else {
            replayer2.current.loadFrame(real[1] );
        }
        dispatch(setTimeRange({data:newValue, real}));

        // if (newValue[1] - newValue[0] < minDistance) {
        //     if (activeThumb === 0) {
        //         const clamped = Math.min(newValue[0], 100 - minDistance);
        //         dispatch(setTimeRange([clamped, clamped + minDistance]));
        //     } else {
        //         const clamped = Math.max(newValue[1], minDistance);
        //         dispatch(setTimeRange([clamped - minDistance, clamped]));
        //     }
        //     for (const val of newValue) {
        //         if (!(markVals.includes(val))) return;
        //     }
        //     replayer1.current.loadFrame(timeRange[0] * stride);
        //     replayer2.current.loadFrame(timeRange[1] * stride);
        // }
        // else {
        //
        // }
    };

    const handleMouseUp = (e, newValue) => {
        if (globalConfig.playerOnly) return;
        const traceBlocks =  new Set(trace.blocks.slice(realRange[0] , realRange[1] ));
        window.ide.traceBlocks = traceBlocks;
        if (!originalMode) {
            replayerAPI.postScript(selectedProject, false, realRange[0], realRange[1])
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
            replayerAPI.postScript(selectedProject, false, realRange[0], realRange[1]).then(
                res => setOriginalMode(false)
            )
        }
    };
    const keyToMark = (opcode, value, i) => {
        if (i===undefined) {
            return {label: `${opcode.toLowerCase()}`, format:`${opcode.toLowerCase()} key pressed`}
        }
        let idx;
        if (i === 0) {idx = "1st"}
        else if (i === 1) {idx = "2nd"}
        else if (i === 2) {idx = "3rd"}
        else {idx = `${i+1}th`}
        if (opcode === "control_create_clone_of") {
            return {label: `clone${i+1}`, format: `the ${idx} clone appeared`}
        }
        else if (opcode === "control_delete_this_clone") {
            return {label: `delete${i+1}`, format: `a ${idx} clone deleted`}
        }
    }


    const updateMarks = (trace) => {
        const marksLabel = {}
        const marksFormatRaw = {};
        for (const op in trace.keyOps) {
            const stamps = trace.keyOps[op];
            let i = 0;
            for (const timeStamp of stamps) {
                const value = Math.floor(timeStamp);
                const {label, format} =  keyToMark(op, value, i);
                // marks.push({value, label});
                marksLabel[value] = label
                marksFormatRaw[value] =format;
                i += 1;
            }
        }
        for (const [i, d] in trace.keysDown.data.entries()) {
            const value = trace.keyDown.id[i];
            if (d === "EMPTY") continue;
            const {label, format} =  keyToMark(d, value);
            // marks.push({value, label});
            marksLabel[value] = label
            marksFormatRaw[value] = format;
        }
        const sortedVals = Object.keys(marksLabel).map(m => parseInt(m)).sort(function(a, b) {
            return a - b;
        });
        let marks = [];
        let shownVal = 0
        let marksFormat = {};
        let valMap = {};
        console.log("sortedVals: ", sortedVals);
        for (const value of sortedVals) {
            marks.push({value: shownVal, label: marksLabel[value]})
            marksFormat[shownVal] = marksFormatRaw[value];
            valMap[shownVal.toString()] = value;
            shownVal += 1;
        }
        setMarks(marks);
        setMarksFormat(marksFormat);
        console.log("marks: ", marks);
        console.log("marksFormat: ", marksFormat);
        // console.log("marks: ", marks);
        return marks
    }

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
                max={trace.vals[trace.vals.length - 1]}
                onChangeCommitted={handleMouseUp}
                valueLabelDisplay="auto"
                disableSwap
                marks={marks}
                valueLabelFormat={(num, i) => marksFormat[num]}
                step={null}
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
