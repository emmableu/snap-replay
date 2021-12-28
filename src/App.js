import React from "react";
import Canvas from "./components/Canvas.jsx";
import Frame from "./components/Frame.jsx";
import ResizablePanels from "./util/ResizablePanels.jsx";

function App() {
  return (
        <div className="App" style={{width: "100%", height: "100%"}}>
            <ResizablePanels>
                <Frame />
                <Canvas />
            </ResizablePanels>
        </div>
  );
}

export default App;
