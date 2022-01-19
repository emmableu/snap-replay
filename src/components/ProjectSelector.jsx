import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {setSelectedProject} from "../redux/features/selectedProjectSlice";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";

const ProjectSelector = () => {
    const dispatch = useDispatch();
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
        "turn_smaller"]
    const selectedProject = useSelector(state => state.selectedProject.data.selected);

    function handleChangeSelect(event) {
        dispatch(setSelectedProject(event.target.value));
    }

    return (
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
    )
}

export default ProjectSelector;
