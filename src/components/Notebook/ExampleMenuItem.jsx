import {Grid, Paper, Button} from "@mui/material";
import globalConfig from "../../globalConfig";
import React from "react";
import ExampleActionDropdown from "./ExampleActionDropdown";
import {useDispatch, useSelector} from "react-redux";

const ExampleMenuItem = (props) => {
    const {item} = props;
    const selectedExample = "abc";
    const dispatch = useDispatch();
    // const selectedExample = useSelector(state => state.project.value.selectedId.exampleId);
    const [hovering, setHovering] = React.useState(false)

    const toggleHover = () => {
        setHovering(!hovering);
    }

    return (
        <Paper
            variant="outlined"
            elevation={0}
            onClick={(e) => {
                // dispatch(setSelectedExampleId(item._id));
            }}
            onMouseEnter={toggleHover}
            onMouseLeave={toggleHover}
            style={{
                width: "100%",
                userSelect: "none",
                padding: 10,
                margin: "0 0 13px 0",
                minHeight: "26px",
                backgroundColor: selectedExample===item._id
                    ? "#E6F7FF"
                    : (
                        hovering?
                            "#fafafa":
                           "#fafafa"
                    ),
                color: selectedExample===item._id
                    ? "#359AF2"
                    :
                    (
                        hovering?
                            "#359AF2":
                            "#262626"
                    )
                    ,
                overflow: "hidden",
                borderColor: selectedExample===item._id
                    ? "#3590FF"
                    : "#eaeaea"
            }}>

            <span style={{
                flexGrow: 1,
            }}>{'\u00A0'} {item.name}</span>
            <div
                style={{"float": "right"}}
            >
                <ExampleActionDropdown exampleId={item._id}/>
            </div>
        </Paper>
    )
}

export default ExampleMenuItem;
