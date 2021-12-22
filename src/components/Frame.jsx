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
import axios from "../axiosConfig.js"
const ScratchRender = require('scratch-render/src/RenderWebGL.js');


const Frame = () => {
    const frameRef = React.useRef(null);
    const frameParentRef = React.useRef(null);
    const [trace, setTrace] = React.useState();
    const [actorCodeList, setActorCodeList] = React.useState([])
    const [sliderSize, setSliderSize] = React.useState(0);
    const [start, setStart] = React.useState(0);
    const [end, setEnd] = React.useState(0);
    const replayer = React.useRef(null);
    const minDistance = 1;
    // const projectSelections = [ "keymove", "bullet_wrap"]
    const projectSelections = [
        "02-Boat Race",
        "03-Taco Defence",
        "04-Lost In Space",
        "05-Ada Poetry Generator",
        "06-Skiing",
        "07-CATS!",
        "08-ChatBot",
        "09-Clone Wars",
        "10-Sprint",
        "11-Rock Band",
        "12-The Scratch Olympics Weightlifter",
        "13-Username Generator",
        "14-Space Quiz",
        "15-FruitCatching",
        "16-Flower Generator",
        "acceleration",
        "ask_random_question",
        "asteroid_alien_move",
        "bullet_wrap",
        "button_select",
        "carousel",
        "checkout_list",
        "click_show_calendar",
        "collision_change_score",
        "collision_explosion",
        "hit_remove",
        "inertia",
        "initialize_fish_property",
        "initialize_to_random",
        "jump",
        "key_trigger_bounce",
        "keymove",
        "move_between_points",
        "move_free",
        "move_with_mouse",
        "multiple_choice_question",
        "paddle",
        "radio_options",
        "shoot_bullets",
        "show_hide_calendar",
        "spawn_enemies",
        "start_button",
        "timer",
        "turn_smaller"];
    const [selectedProject, setSelectedProject] = React.useState(projectSelections[0]);

    const handleChange = (range) => {
        setStart(range[0])
        setEnd(range[1])
    };

    function valuetext(value) {
        return `frame ${value}`;
    }

    React.useEffect( () => {
        const renderer = new ScratchRender(frameRef.current, );
        renderer.setLayerGroupOrdering(['group1']);
        ReplayerAPI.getTrace(selectedProject).then((response) => {
            setTrace(response.data);
            setSliderSize(response.data.length)
            setMarks([
                {
                    value: 0,
                    label: '0',
                },
                {
                    value: response.data.length - 1,
                    label: (response.data.length - 1).toString(),
                },
            ]);
            replayer.current = new Replayer(renderer, selectedProject, response.data);
        });
        const drawStep = function () {
            renderer.draw();
            // renderer.getBounds(drawableID2);
            // renderer.isTouchingColor(drawableID2, [255,255,255]);
            requestAnimationFrame(drawStep);
        };
        // size somehow gets multiplied by 4 on mac retina displays
        // const rect = frameParentRef.current.getBoundingClientRect();
        // console.log("rect: ", rect);
        const width = frameParentRef.current.offsetWidth / window.devicePixelRatio;
        const height = width * 0.75;
        console.log("width, height: ", width, height);
        renderer.resize(width, height);
        drawStep();
    }, [selectedProject])

    function handleChangeSelect(event) {
        setSelectedProject(event.target.value)
    }


    const [timeRange, setTimeRange] = React.useState([20, 37]);

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
        } else {
            setTimeRange(newValue);
        }
    };


    const loadFrame = (event) => {
        replayer.current.loadFrame(parseInt(event.target.value));
    }
    return (
        <div style={{width: "100%"}} ref={frameParentRef}>

            {/*<Select defaultValue={projectSelections[0]} style={{ width: 120 }} onChange={handleChangeSelect}>*/}
            {/*    {projectSelections.map((name, idx) => (*/}
            {/*        <Option value={idx}>{name}</Option>*/}
            {/*    ))}*/}
            {/*</Select>*/}

            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-helper-label">Project name</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={selectedProject}
                    label="Age"
                    onChange={handleChangeSelect}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                        {projectSelections.map((name) => (
                            <MenuItem value={name}>{name}</MenuItem>
                        ))}
                </Select>
                <FormHelperText>Select an example project</FormHelperText>
            </FormControl>

            <canvas
                ref={frameRef} width="400px"
            >
            </canvas>
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
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                disableSwap
            />
            {/*<Slider min={0} max={sliderSize}  defaultValue={0} onChange={loadFrame} />*/}
            {/*<Slider min={0} max={sliderSize} range defaultValue={[0, 10]}  onChange={handleChange}/>*/}
        </div>
    )
}
export default Frame;
