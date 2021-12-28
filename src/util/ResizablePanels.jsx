import React from "react";

const ResizablePanels = (props) => {
    const [isDragging, setIsDragging] = React.useState(false);
    const [leftSize, setLeftSize] = React.useState(400);

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
            setLeftSize(event.clientX);
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
