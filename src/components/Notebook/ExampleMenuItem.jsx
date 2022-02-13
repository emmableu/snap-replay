import {Grid, Paper, Button} from "@mui/material";
import globalConfig from "../../globalConfig";
import React from "react";
import ExampleActionDropdown from "./ExampleActionDropdown";
import {useDispatch, useSelector} from "react-redux";
import {setSelectedExampleId} from "../../redux/features/exampleCollectionSlice";

const ExampleMenuItem = (props) => {
    const {_id} = props;
    const dispatch = useDispatch();
    const selectedExample = useSelector(state => state.exampleCollection.selectedId);
    const name = globalConfig.tasks[_id].name;
    const [hovering, setHovering] = React.useState(false)

    const toggleHover = () => {
        setHovering(!hovering);
    }

    return (
        <Paper
            variant="outlined"
            elevation={0}
            onClick={(e) => {
                dispatch(setSelectedExampleId({_id: _id}));
            }}
            onMouseEnter={toggleHover}
            onMouseLeave={toggleHover}
            style={{
                width: "100%",
                userSelect: "none",
                padding: 10,
                margin: "0 0 10px 0",
                minHeight: "20px",
                backgroundColor: selectedExample===_id
                    ? "#E6F7FF"
                    : (
                        hovering?
                            "#fafafa":
                           "#fafafa"
                    ),
                color: selectedExample===_id
                    ? "#359AF2"
                    :
                    (
                        hovering?
                            "#359AF2":
                            "#262626"
                    )
                    ,
                overflow: "hidden",
                borderColor: selectedExample===_id
                    ? "#3590FF"
                    : "#eaeaea"
            }}>

            <span style={{
                flexGrow: 1,
                fontSize: 12,
                fontWeight: "bold",
            }}>{name}</span>
            {/*<div*/}
            {/*    style={{"float": "right"}}*/}
            {/*>*/}
                {/*<ExampleActionDropdown exampleId={_id}/>*/}
            {/*</div>*/}
        </Paper>
    )
}

export default ExampleMenuItem;
