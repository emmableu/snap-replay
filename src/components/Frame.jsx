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
import {useSelector} from "react-redux";
import replayerAPI from "../api/ReplayerAPI.js";
const ScratchRender = require('scratch-render/src/RenderWebGL.js');
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const Frame = () => {
    const frameRef = React.useRef(null);
    const frameParentRef = React.useRef(null);
    const leftPanelSize = useSelector(state => state.rect.data.leftPanelSize);
    const trace = useSelector(state => state.trace.data);
    const stride = useSelector(state => state.trace.stride);
    const [sliderSize, setSliderSize] = React.useState(0);
    const [checked, setChecked] = React.useState(false);
    const replayer = React.useRef(null);
    const renderer = React.useRef(null);
    const minDistance = 1;
    const selectedProject = useSelector(state => state.selectedProject.data.selected);
    const [timeRange, setTimeRange] = React.useState([0, 10]);


    const handleChangeSwitch = (event) => {
        const newChecked = event.target.checked;
        if (newChecked) {
            replayerAPI.postScript(selectedProject, true, 0, 0, 0).then(
                res => setChecked(true)
            )
        }
        else {
            // replayerAPI.postSnapXML(selectedProject, null, "full").then(
            //     res => setChecked(false)
            // )
            replayerAPI.postScript(selectedProject, false, timeRange[0], timeRange[1], stride).then(
                res => setChecked(false)
            )
        }
    };

    function valuetext(value) {
        return `frame ${value}`;
    }

    React.useEffect(  () => {
        renderer.current = new ScratchRender(frameRef.current);
        renderer.current.setLayerGroupOrdering(['group1']);
        setSliderSize(trace.endIdx)
        setMarks([
            {
                value: 0,
                label: '0',
            },
            {
                value: trace.endIdx,
                label: trace.endIdx.toString(),
            },
        ]);
        replayer.current = new Replayer(renderer.current, selectedProject, trace);
        const drawStep = function () {
            renderer.current.draw();
            requestAnimationFrame(drawStep);
        };
        // size somehow gets multiplied by 4 on mac retina displays
        const width = leftPanelSize / window.devicePixelRatio;
        const height = width * 0.75;
        console.log("width, height: ", width, height);
        renderer.current.resize(width, height);
        drawStep();
        replayerAPI.postScript(selectedProject, false, timeRange[0], timeRange[1], stride)
    }, [selectedProject])



    // React.useEffect( () => {
    //     if (!renderer.current) return;
    //     const width = leftPanelSize / window.devicePixelRatio;
    //     const height = width * 0.75;
    //     renderer.current.resize(width, height);
    //     renderer.current.draw();
    // }, [leftPanelSize])




    const [marks, setMarks] = React.useState([{value:0, label: '0'}]);


    const handleChangeTimeSlider = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (newValue[1] - newValue[0] < minDistance) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], 100 - minDistance);
                setTimeRange([clamped, clamped + minDistance]);
            } else {
                const clamped = Math.max(newValue[1], minDistance);
                setTimeRange([clamped - minDistance, clamped]);
            }
        }
        else {
            setTimeRange(newValue);
        }
    };

    const handleMouseUp = (e, newValue) => {
        replayerAPI.postScript(selectedProject, false, newValue[0], newValue[1], stride)
    }


    const loadFrame = (event) => {
        replayer.current.loadFrame(parseInt(event.target.value));
    }

    return (
        <div style={{width: leftPanelSize, height: leftPanelSize * 3/4 + 300}} ref={frameParentRef}>

            <div style={{backgroundColor: "grey", border: "1px solid grey"}}>
            {/*<div>*/}
            <canvas
                ref={frameRef}
            >
            </canvas>
            </div>


            <Slider
                aria-label="Temperature"
                defaultValue={0}
                valueLabelDisplay="auto"
                marks
                min={0}
                max={sliderSize}
                onChange={loadFrame}
            />
            <Slider
                getAriaLabel={() => 'Minimum distance shift'}
                value={timeRange}
                onChange={handleChangeTimeSlider}
                onChangeCommitted={handleMouseUp}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                disableSwap
            />
            {/*<Button onClick={showFullCode}>Show Complete Code</Button>*/}
            <FormGroup>
                <FormControlLabel
                    checked={checked}
                    onChange={handleChangeSwitch}
                    control={<Switch />} label="Show Full Project" />
            </FormGroup>
                </div>

    )
}
export default Frame;
