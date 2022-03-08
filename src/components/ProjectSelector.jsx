import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {setSelectedProject} from "../redux/features/selectedProjectSlice";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";

const ProjectSelector = (props) => {
    const {setActiveStep, setNextEnabled} = props;
    const selectedProject = useSelector(state => state.selectedProject.data.selected);
    const dispatch = useDispatch();
    const projectSelections = {
        // "panda": "Panda Eats Bamboos",
        // "shoot": "Shoot a Star",
        // "skiing": "Skiing Cat",
        "space": "Space Invaders",
    };


    function handleChangeSelect(event) {
        setActiveStep(0);
        setNextEnabled(false);
        dispatch(setSelectedProject(event.target.value));
    }

    return (
        <>
        <FormControl sx={{ m: 1, minWidth: 50 }}>
            <InputLabel id="demo-simple-select-helper-label">Project name</InputLabel>
            <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={selectedProject}
                label="Project"
                onChange={handleChangeSelect}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {Object.entries(projectSelections).map(([name, val]) => (
                    <MenuItem value={name}>{val}</MenuItem>
                ))}
            </Select>
            <FormHelperText>Select an example project</FormHelperText>
        </FormControl>
    </>
)
}

export default ProjectSelector;
