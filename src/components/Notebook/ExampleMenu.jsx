import React from "react";
import ExampleMenuItem from "./ExampleMenuItem";
import {useSelector} from "react-redux";
import ProjectLoader from "./ProjectLoader";

export const ExampleMenu = (props) => {

    const ids = useSelector(state => state.exampleCollection.idLst)
    return (
        <>
        {
            ids.map((_id, idx)  => {
                return (
                    <ExampleMenuItem
                        _id={_id}
                        key={_id}
                    />
                )
            })
        }
            <ProjectLoader/>
        </>
    )
}
