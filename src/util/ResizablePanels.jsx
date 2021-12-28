import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {setRect} from "../redux/features/rectSlice.js";

const ResizablePanels = (props) => {
    const [isDragging, setIsDragging] = React.useState(false);
    const leftSize = useSelector(state => {return state.rect.data.leftPanelSize});
    const dispatch = useDispatch();

    const startResize = (event) => {
        setIsDragging(true);
    }

    const stopResize = (event) => {
        if (isDragging) {
            setIsDragging(false);
        }
    }

    const resizePanel = (event) => {
        if (isDragging) {
            dispatch(setRect({type: "leftPanelSize", value:event.clientX}));
        }
    }

    const rest = props.children.slice(1)
    return (
        <div className="panel-container"
             onMouseMove={e => {resizePanel(e)}}
             onMouseUp={(e) => stopResize(e)}>
            <div className="panel" style={{flex: `0 1 ${leftSize}px`, height: "100vh"}}>
                {props.children[0]}
            </div>
            <div onMouseDown={(e) => {startResize(e)}}
                        className="resizer"/>
            <div className="panel" style={{flex: `0 1 calc(100vw - ${leftSize}px)`, height: "100vh"}}>
                {props.children[1]}
            </div>
        </div>
    )
}

export default ResizablePanels;
