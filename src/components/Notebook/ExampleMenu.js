import React from "react";
import ExampleMenuItem from "./ExampleMenuItem";

export const ExampleMenu = (props) => {
    const items = [{_id: "abc", name: "move with key"},
        {_id: "dd", name: "dd"}]
    return (
        <>
        {
            items.map((item, idx)  => {
                return (
                    <ExampleMenuItem item={item}/>
                )
            })
        }
        </>
    )
}
