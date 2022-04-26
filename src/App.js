import React from "react";
import Snap from "./components/Snap.jsx";
import Frame from "./components/Frame.jsx";
import ResizablePanels from "./util/ResizablePanels.jsx";
import EditStepper from "./components/EditStepper";
import Player from "./components/Player";
import NotebookContainer from "./components/Notebook/NotebookContainer";
import {useSelector} from "react-redux";
import globalConfig from "./globalConfig";
import TitleBar from "./components/TitleBar";
import LoginPage from "./components/LoginPage";
import LowerRightCorner from "./components/LowerRightCorner";
import FrameList from "./components/FrameList/FrameList";
import FrameListContainer from "./components/FrameList/FrameListContainer";

function App() {
    const userId = useSelector(s => s.userId.data);
    const [activeStep, setActiveStep] = React.useState(0);
    const playerPanelContainerWidth = useSelector(state => {return state.rect.data.playerPanelContainerWidth});
    return (
        <div className="App" style={{width: "100%", height: "100%"}}>
            {
                globalConfig.playerOnly ?
                    <EditStepper activeStep={activeStep} setActiveStep={setActiveStep} />
                    :
                    userId ?
                            <>
                                {globalConfig.simplifiedInterfaceFor110 ?
                                    <Snap activeStep={1}/> :
                                    <>
                                        {/*<TitleBar/>*/}
                                        <ResizablePanels
                                            leftSize={playerPanelContainerWidth}
                                            draggingType={"playerPanelContainerWidth"}
                                            panelHeight={"100vh"}
                                        >
                                            <EditStepper activeStep={activeStep} setActiveStep={setActiveStep}/>
                                            <div>
                                                <FrameListContainer/>
                                                <Snap activeStep={globalConfig.controlCond? 1:activeStep} />
                                            </div>
                                        </ResizablePanels>
                                    </>
                                }
                                { (globalConfig.simplifiedInterfaceFor110 ||
                                    globalConfig.controlCond ||
                                    activeStep === 1 )
                                    && <LowerRightCorner/>}
                                {/*{!globalConfig.simplifiedInterfaceFor110 &&*/}
                                {/*    <NotebookContainer/>*/}
                                {/*}*/}
                            </>
                            : <LoginPage/>


            }





        </div>
  );
}

export default App;
