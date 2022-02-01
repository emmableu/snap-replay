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
        "Panda Eats Bamboos",
        "Shoot a Star",
        "Skiing Cat",
    ]
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
