import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {setRect} from "../redux/features/rectSlice.js";

const ResizablePanels = (props) => {
    const {leftSize, draggingType, panelHeight} = props;
    const parentRef = React.useRef(null);
    const [isDragging, setIsDragging] = React.useState(false);
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
        let bounds = parentRef.current.getBoundingClientRect();
        if (isDragging) {
            dispatch(setRect({type: draggingType, value:event.clientX - bounds.left}));
        }
    }

    return (
        <div style={{display: "flex", height: panelHeight}}
             ref={parentRef}
             onMouseMove={e => {resizePanel(e)}}
             onMouseUp={(e) => stopResize(e)}>
            <div className="panel" style={{flex: `0 1 ${leftSize}px`, height: "100%"}}>
                {props.children[0]}
            </div>
            <div onMouseDown={(e) => {startResize(e)}}
                        className="resizer"/>
            <div className="panel" style={{flex: `0 1 calc(100% - ${leftSize}px)`, height: "100%"}}>
                {props.children[1]}
            </div>
        </div>
    )
}

export default ResizablePanels;
