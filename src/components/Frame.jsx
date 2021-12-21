import React from "react";
import { Slider } from 'antd';
import {Replayer} from "../Replayer.js";
import ReplayerAPI from "../api/ReplayerAPI.js";
import { Image } from 'antd';
import { Select } from 'antd';
import axios from "../axiosConfig.js"

const { Option } = Select;
const ScratchRender = require('scratch-render/src/RenderWebGL.js');


const Frame = () => {
    const frameRef = React.useRef(null);
    const [trace, setTrace] = React.useState();
    const [actorCodeList, setActorCodeList] = React.useState([])
    const [sliderSize, setSliderSize] = React.useState(0);
    const [start, setStart] = React.useState(0);
    const [end, setEnd] = React.useState(0);
    const replayer = React.useRef(null)
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
    }
    React.useEffect( () => {
        const renderer = new ScratchRender(frameRef.current);
        renderer.setLayerGroupOrdering(['group1']);
        ReplayerAPI.getTrace(selectedProject).then((response) => {
            setTrace(response.data);
            setSliderSize(response.data.length)
            replayer.current = new Replayer(renderer, selectedProject, response.data);
        });
        const drawStep = function () {
            renderer.draw();
            // renderer.getBounds(drawableID2);
            // renderer.isTouchingColor(drawableID2, [255,255,255]);
            requestAnimationFrame(drawStep);
        };
        drawStep();
    }, [selectedProject])

    function handleChangeSelect(value) {
        setSelectedProject(projectSelections[value])
    }


    const loadFrame = (val) => {
        replayer.current.loadFrame(parseInt(val));
    }
    return (
        <>
            <Select defaultValue={projectSelections[0]} style={{ width: 120 }} onChange={handleChangeSelect}>
                {projectSelections.map((name, idx) => (
                    <Option value={idx}>{name}</Option>
                ))}
            </Select>

            <canvas
                ref={frameRef} width="100px" height="100px"
            >
            </canvas>
            <Slider min={0} max={sliderSize}  defaultValue={0} onChange={loadFrame} />
            <Slider min={0} max={sliderSize} range defaultValue={[0, 10]}  onChange={handleChange}/>
        </>
    )
}
export default Frame;
