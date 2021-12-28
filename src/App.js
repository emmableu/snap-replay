import React from "react";
import Canvas from "./components/Canvas.jsx";
import Frame from "./components/Frame.jsx";
import ResizablePanels from "./util/ResizablePanels.jsx";

function App() {
  return (
    <div className="App" style={{width: "100%", height: "100%"}}>
        {/*/!*<div style={{position: "absolute", left: "0px", right: "calc(100vw - 400px)",*!/*/}
        {/*/!*            height: "100vh"}}>*!/*/}
        {/*    <div style={{flex: "2 1 50%", height: "100vh", backgroundColor: "red"}}>*/}
        {/*    /!*<Frame />*!/*/}
        {/*    </div>*/}
        {/*<ResizePanel direction="w"*/}
        {/*             style={{ flex: "1 1 50%",height: "100vh",*/}
        {/*                 backgroundColor: "grey"}}>*/}
        {/*<div style={{height: "100%"}}*/}
        {/*>*/}
        {/*    /!*<Canvas/>*!/*/}
        {/*</div>*/}
        {/*</ResizePanel>*/}

            <h1>ReactJS Resizable Panels</h1>
            <ResizablePanels>
                <div>
                    This is the first panel. It will use the rest of the available space.
                </div>
                <div>
                    This is the second panel. Starts with 300px.
                </div>
            </ResizablePanels>
    </div>
  );
}

export default App;
