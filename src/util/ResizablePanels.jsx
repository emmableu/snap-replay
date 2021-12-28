import React from "react";

const ResizablePanels = (props) => {
    const [isDragging, setIsDragging] = React.useState(false);
    const [currentPanel, setCurrentPanel] = React.useState(null);
    const [panels, setPanels] = React.useState([300, 300, 300]);
    const [initialPos, setInitialPos] = React.useState(0);
    const [delta, setDelta] = React.useState(0);

    const startResize = (event, idx) => {
        setIsDragging(true);
        setCurrentPanel(idx);
        setInitialPos(event.clientX);
    }


    const stopResize = (event) => {
        if (isDragging) {
            const newPanels = [...panels];
            newPanels[currentPanel] =  (panels[currentPanel] || 0) - delta;
            newPanels[currentPanel - 1] = (panels[currentPanel - 1] || 0) + delta;
            setPanels(newPanels);
            setIsDragging(false);
            // setDelta(0);
            setDelta(event.clientX - initialPos);
            setCurrentPanel(null);
        }
    }

    const resizePanel = (event) => {
        if (isDragging) {
            setDelta(event.clientX - initialPos);
            console.log("x: ", event.clientX);
        }
    }

    const rest = props.children.slice(1)
    return (
        <div className="panel-container"
             onMouseMove={e => {resizePanel(e)}}
             onMouseUp={(e) => stopResize(e)}>
            <div className="panel" style={{width: `calc(100% - ${panels[1]}px - ${panels[2]}px)`}}>
                {props.children[0]}
            </div>
            {[].concat(...rest.map((child, i) => {
                return [
                    <div onMouseDown={(e) => {startResize(e, i + 1)}}
                        key={"resizer_" + i}
                        style={currentPanel === i + 1 ? {left: delta} : {}}
                        className="resizer"/>,
                    <div key={"panel_" + i} className="panel" style={{width: panels[i + 1]}}>
                        {child}
                    </div>
                ]
            }))}
        </div>
    )
}

export default ResizablePanels;
