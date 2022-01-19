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


const Frame = () => {
    const frameRef = React.useRef(null);
    const frameParentRef = React.useRef(null);
    const leftPanelSize = useSelector(state => state.rect.data.leftPanelSize);
    const trace = useSelector(state => state.trace.data);
    const stride = useSelector(state => state.trace.stride);
    const [sliderSize, setSliderSize] = React.useState(0);
    const [start, setStart] = React.useState(0);
    const [end, setEnd] = React.useState(0);
    const replayer = React.useRef(null);
    const renderer = React.useRef(null);
    const minDistance = 1;
    const selectedProject = useSelector(state => state.selectedProject.data.selected);
    // const projectSelections = [ "keymove", "bullet_wrap"]
    // const projectSelections = [
    //     "02-Boat Race",
    //     "03-Taco Defence",
    //     "04-Lost In Space",
    //     "05-Ada Poetry Generator",
    //     "06-Skiing",
    //     "07-CATS!",
    //     "08-ChatBot",
    //     "09-Clone Wars",
    //     "10-Sprint",
    //     "11-Rock Band",
    //     "12-The Scratch Olympics Weightlifter",
    //     "13-Username Generator",
    //     "14-Space Quiz",
    //     "15-FruitCatching",
    //     "16-Flower Generator",
    //     "acceleration",
    //     "ask_random_question",
    //     "asteroid_alien_move",
    //     "bullet_wrap",
    //     "button_select",
    //     "carousel",
    //     "checkout_list",
    //     "click_show_calendar",
    //     "collision_change_score",
    //     "collision_explosion",
    //     "hit_remove",
    //     "inertia",
    //     "initialize_fish_property",
    //     "initialize_to_random",
    //     "jump",
    //     "key_trigger_bounce",
    //     "keymove",
    //     "move_between_points",
    //     "move_free",
    //     "move_with_mouse",
    //     "multiple_choice_question",
    //     "paddle",
    //     "radio_options",
    //     "shoot_bullets",
    //     "show_hide_calendar",
    //     "spawn_enemies",
    //     "start_button",
    //     "timer",
    //     "turn_smaller"];
    // const [selectedProject, setSelectedProject] = React.useState(projectSelections[0]);

    const handleChange = (range) => {
        setStart(range[0])
        setEnd(range[1])
    };

    function valuetext(value) {
        return `frame ${value}`;
    }

    React.useEffect( () => {
        renderer.current = new ScratchRender(frameRef.current);
        renderer.current.setLayerGroupOrdering(['group1']);
        setSliderSize(trace.length)
        setMarks([
            {
                value: 0,
                label: '0',
            },
            {
                value: trace.length - 1,
                label: (trace.length - 1).toString(),
            },
        ]);
        replayer.current = new Replayer(renderer.current, selectedProject, trace);
        ReplayerAPI.postSnapXML(selectedProject, null, "asset").then(

        );
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
    }, [selectedProject])



    React.useEffect( () => {
        if (!renderer.current) return;
        const width = leftPanelSize / window.devicePixelRatio;
        const height = width * 0.75;
        renderer.current.resize(width, height);
        renderer.current.draw();
    }, [leftPanelSize])



    const [timeRange, setTimeRange] = React.useState([0, 10]);

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
        replayerAPI.postScript(selectedProject, newValue[0], newValue[1], stride)
    }


    const loadFrame = (event) => {
        replayer.current.loadFrame(parseInt(event.target.value));
    }
    return (
        <div style={{width: leftPanelSize, height: leftPanelSize * 3/4 + 300}} ref={frameParentRef}>

            <div style={{backgroundColor: "red", border: "1px solid red"}}>
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
                </div>

    )
}
export default Frame;
