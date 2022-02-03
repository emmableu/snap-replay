import React from "react";
import Canvas from "./components/Canvas.jsx";
import Frame from "./components/Frame.jsx";
import ResizablePanels from "./util/ResizablePanels.jsx";
import EditStepper from "./components/EditStepper";
import Player from "./components/Player";
import SwipeableEdgeDrawer from "./components/Notebook/NotebookPage";

function App() {
  return (
        <div className="App" style={{width: "100%", height: "100%"}}>
            <ResizablePanels>
                {/*<Frame />*/}
                <EditStepper
                    // step1={<Player/>}
                    // step2={<Frame/>}
                />
                <Canvas />
            </ResizablePanels>
            <SwipeableEdgeDrawer/>
        </div>
  );
}

export default App;
