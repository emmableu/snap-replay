import React from "react";
import ExampleMenuItem from "./ExampleMenuItem";
import {useSelector} from "react-redux";
import ProjectLoader from "./ProjectLoader";

export const ExampleMenu = (props) => {
    // const items = [{_id: "abc", name: "move with key"},
    //     {_id: "dd", name: "dd"}]
    const items = useSelector(state => state.exampleCollection.data.map(item =>
        ({_id: item._id, name: item.name})))
    return (
        <>
        {
            items.map((item, idx)  => {
                return (
                    <ExampleMenuItem
                        item={item}
                        key={item._id}
                    />
                )
            })
        }
            <ProjectLoader/>
        </>
    )
}
