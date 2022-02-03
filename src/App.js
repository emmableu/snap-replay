import React from "react";
import Snap from "./components/Snap.jsx";
import Frame from "./components/Frame.jsx";
import ResizablePanels from "./util/ResizablePanels.jsx";
import EditStepper from "./components/EditStepper";
import Player from "./components/Player";
import NotebookContainer from "./components/Notebook/NotebookContainer";

function App() {
  return (
        <div className="App" style={{width: "100%", height: "100%"}}>
            <ResizablePanels>
                {/*<Frame />*/}
                <EditStepper
                    // step1={<Player/>}
                    // step2={<Frame/>}
                />
                <Snap />
            </ResizablePanels>
            <NotebookContainer/>
        </div>
  );
}

export default App;
