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
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

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
    const [maxMark, setMaxMark] = React.useState(0);
    const trace = useSelector(state => state.trace.data);
    const [valMap, setValMap] = React.useState({});
    const [loadingOpen, setLoadingOpen] = React.useState(true);
    const [defaultTimeRange, setDefaultTimeRange] = React.useState([0,1]);
    const playerPanelContainerWidth = useSelector(state => state.rect.data.playerPanelContainerWidth);
    const calcFrameWidth = (playerPanelContainerWidth) => (
      (playerPanelContainerWidth / 2
        - globalConfig.oneSideOuterPadding
        - globalConfig.oneSideInnerPadding) / window.devicePixelRatio
    );
    const [frameWidth, setFrameWidth] = React.useState(calcFrameWidth(playerPanelContainerWidth));
    const minDistance = 1;
    const selectedProject = useSelector(state => state.selectedProject.data.selected);
    const projectStatic = useSelector(state => state.selectedProject.data.static);
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

    React.useEffect( async () => {
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
        }
        replayerAPI.postScript(selectedProject, false, 0, trace.endIdx)
        // await new Promise(resolve => setTimeout(resolve, 700));

    }, [selectedProject])

    React.useEffect(async ()=> {
        if (maxMark > 0) {
            setDefaultTimeRange([0, maxMark])
            dispatch(setTimeRange({data: [0, maxMark], real: [0, trace.endIdx]}))
            console.log("replayer1.current: ", replayer1.current);
            for (const i of [2,1,0]) {
                replayer1.current.loadFrame(0 + i);
                await new Promise(resolve => setTimeout(resolve, 100));
                replayer2.current.loadFrame( trace.endIdx - i);
                await new Promise(resolve => setTimeout(resolve, 100));
            }
            renderer1.current.draw();
            renderer2.current.draw();
            setLoadingOpen(false);
        }
    }, [maxMark])


    const getRealFrameId = (selected) => {
        // selected is one value from the two values
        const valLst = Object.keys(valMap).map(v => parseInt(v)).sort((a, b) => a - b);

        selected = selected.toString();
        if (selected in valMap) {
            return parseInt(valMap[selected])
        }
        else {
            const closestBigger = valLst[Bisect.lb(valLst, selected)];
            const closestSmaller = closestBigger - projectStatic.stride;
            const realBigger = valMap[closestBigger];
            const realSmaller = valMap[closestSmaller];
            let realSelected = (realBigger - realSmaller) * (selected - closestSmaller)/projectStatic.stride + realSmaller
            realSelected = Math.floor(realSelected);
            console.log(selected, closestBigger, closestSmaller,realBigger,realSmaller,realSelected)
            return realSelected;
        }

    }

    const handleChangeTimeSlider = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }
        let real;

        if (newValue[1] - newValue[0] < minDistance) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], 100 - minDistance);
                newValue = [clamped, clamped + minDistance]
            } else {
                const clamped = Math.max(newValue[1], minDistance);
                newValue = [clamped - minDistance, clamped]
            }
            real = newValue.map(v => getRealFrameId(v));
            replayer1.current.loadFrame(real[0] );
            replayer2.current.loadFrame(real[1] );
        }
        else {
            if (timeRange[0] === newValue[0] && timeRange[1] === newValue[1]) return;
            real = newValue.map(v => getRealFrameId(v));
            if (activeThumb === 0) {
                replayer1.current.loadFrame(real[0] );
            } else {
                replayer2.current.loadFrame(real[1] );
            }
        }
        dispatch(setTimeRange({data:newValue, real}));
    };

    const handleMouseUp = (e, newValue) => {
        if (globalConfig.playerOnly) return;
        const traceBlocks =  new Set(trace.blocks.slice(realRange[0] , realRange[1] + 1 ));
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

        const idMap =  {
            "=g2b@M,XxwDxqe4_$:Hl": {name: "deleteEnemy", img: projectStatic.enemyCrossImg, format: "an enemy clone is deleted"},
            "s1wJp3H4E:dH*TPi;rrW": { name: "deleteBullet", img: projectStatic.bulletCrossImg, format: "a bullet clone is deleted"},
            "0zE@EITM`:OjYpS]M6}m": { name: "createEnemy", img: projectStatic.enemyImg, format: "an enemy clone is created"},
            "2`J9WMb[RASJq66]X}!h": { name: "createBullet", img: projectStatic.bulletImg, format: "a bullet clone is created"},
        }

        // if (opcode === "control_create_clone_of") {
        //     return {label: <img width="20px" src={"static/"+projectStatic.cloneImg} alt="clone"/>, format: `the ${idx} clone appeared`}
        // }
        // else if (opcode === "control_delete_this_clone") {
        //     return {label: <img width="20px" src={"static/"+projectStatic.cloneCrossImg} alt="delete"/>, format: `a ${idx} clone deleted`}
        // }
        // add hack for spaceinvader project
        if (opcode in idMap) {
            return {
                label: <img width="20px" src={"static/"+idMap[opcode].img} alt={idMap[opcode].name} />, format: idMap[opcode].format
            }
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
                if (value <= trace.endIdx) {
                    const {label, format} =  keyToMark(op, value, i); // usually effect is found a step after this.
                    // marks.push({value, label});
                    marksLabel[value] = label
                    marksFormatRaw[value] =format;
                    i += 1;
                }
            }
        }
        for (const [i, d] of trace.keysDown.data.entries()) {
            const value = trace.keysDown.id[i];
            if (d === "EMPTY") continue;
            // marks.push({value, label});
            if (value - 2 > 0) {
                const {label, format} =  keyToMark(d, value-2);
                marksLabel[value-2] = label
                marksFormatRaw[value-2] = format;
            }
        }
        marksLabel['0'] = "start";
        marksLabel['0'] = "start";
        marksLabel[trace.endIdx] = "end"
        marksFormatRaw[trace.endIdx] = "end"
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
            shownVal += projectStatic.stride; //e.g., 0, 4, 8, 12 ,...
        }
        setMarks(marks);
        setValMap(valMap);
        setMaxMark(shownVal - projectStatic.stride);
        setMarksFormat(marksFormat);
        console.log("marks: ", marks);
        console.log("valMap: ", valMap);
        console.log("marksFormat: ", marksFormat);
        return marks
    }

    return (
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex: 1000}}
                open={loadingOpen}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

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
                <canvas
                    ref={frameRef2}
                >
                </canvas>
            </div>
            </div>

          <Slider
                style={{width: playerPanelContainerWidth - 20}}
                getAriaLabel={() => 'Minimum distance shift'}
                value={timeRange}
                defaultValue={defaultTimeRange}
                onChange={handleChangeTimeSlider}
                max={maxMark}
                onChangeCommitted={handleMouseUp}
                valueLabelDisplay="auto"
                disableSwap
                marks={marks}
                valueLabelFormat={(num, i) => marksFormat[num] ? marksFormat[num]:`\xa0`}
                step={1}
            />
            {/*<Button onClick={showFullCode}>Show Complete Code</Button>*/}
            <br/>
            <br/>
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
