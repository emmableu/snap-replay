import React from "react";
import Snap from "./components/Snap.jsx";
import Frame from "./components/Frame.jsx";
import ResizablePanels from "./util/ResizablePanels.jsx";
import EditStepper from "./components/EditStepper";
import Player from "./components/Player";
import NotebookContainer from "./components/Notebook/NotebookContainer";
import {useSelector} from "react-redux";

function App() {
    const playerPanelWidth = useSelector(state => {return state.rect.data.playerPanelWidth});
    return (
        <div className="App" style={{width: "100%", height: "100%"}}>
            <ResizablePanels
                    leftSize={playerPanelWidth}
                    draggingType={"playerPanelWidth"}
                    panelHeight={"100vh"}
            >
                <EditStepper/>
                <Snap />
            </ResizablePanels>
            <NotebookContainer/>
        </div>
  );
}

export default App;
