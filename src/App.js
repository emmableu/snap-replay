import React from "react";
import Snap from "./components/Snap.jsx";
import Frame from "./components/Frame.jsx";
import ResizablePanels from "./util/ResizablePanels.jsx";
import EditStepper from "./components/EditStepper";
import Player from "./components/Player";
import NotebookContainer from "./components/Notebook/NotebookContainer";
import {useSelector} from "react-redux";
import globalConfig from "./globalConfig";
import SaveToNotebookButton from "./components/SaveToNotebookButton";
import TitleBar from "./components/TitleBar";
import LoginPage from "./components/LoginPage";

function App() {
    const userId = useSelector(s => s.userId.data);
    const playerPanelContainerWidth = useSelector(state => {return state.rect.data.playerPanelContainerWidth});
    return (
        <div className="App" style={{width: "100%", height: "100%"}}>
            {userId ?
                <>
                {globalConfig.simplifiedInterfaceFor110 ?
                        <Snap/> :
                    <>
                        <TitleBar/>
                        <ResizablePanels
                            leftSize={playerPanelContainerWidth}
                            draggingType={"playerPanelContainerWidth"}
                            panelHeight={"100vh"}
                        >
                            <EditStepper/>
                            <Snap />
                        </ResizablePanels>
                    </>
                }
                <SaveToNotebookButton/>
                <NotebookContainer/>
                </>
                : <LoginPage/>}

        </div>
  );
}

export default App;
