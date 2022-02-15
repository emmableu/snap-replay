import {createTheme} from "@mui/material";
import globalConfigIgnore from "../globalConfig.ignore";
import tasksJson from "./data/tasksJson";
const params = new URLSearchParams(window.location.search);

let simplifiedInterfaceFor110;
if (globalConfigIgnore) {
    simplifiedInterfaceFor110 = globalConfigIgnore.simplifiedInterfaceFor110;
}
else {
    simplifiedInterfaceFor110 = true;
}

// Trace.log("codegen.info", {
//     "isCSC110": simplifiedInterfaceFor110,
//     "isControlCond": globalConfigIgnore.controlCond,
//     "isPlayerOnly": globalConfigIgnore.playerOnly,
// })
const globalConfig = {
    originalSelectedProject: params.get("project"),
    controlCond: globalConfigIgnore.controlCond,
    simplifiedInterfaceFor110,
    playerOnly: globalConfigIgnore.playerOnly,
    drawerBleeding: 48,
    hasAddNewExample: false,
    toolBarHeight: 56,
    oneSideOuterPadding: 0,  //shown as A in the below picture
    oneSideInnerPadding: 0,  //shown as B in the below picture
    /*

|                                                       |
|     ----------------            ----------------      |
|<-A->|               |<-B-> <-B->|               |<-A->|
|     |               |           |               |     |
|     |               |           |               |     |
|    -----------------            -----------------     |
| <---  state.rect.data.playerPanelContainerWidth ----> |
    */



    projectDrawerWidth: simplifiedInterfaceFor110 ? 150 : 150,
    dashboardTheme: () => createTheme({
        palette: {
            secondary: {
                main: "#1890ff",
            },
        },
    }),
    tasks: tasksJson,
}

Logger.prototype.note = function (msg, data) {
    let messageStarter = "codegen";
    if (globalConfig.simplifiedInterfaceFor110) {
        messageStarter = messageStarter + ".csc110"
    }
    else {
        messageStarter = messageStarter + ".e115"
        if (globalConfig.controlCond) {
            messageStarter = messageStarter + ".controlCond"
        }
        else {
            messageStarter = messageStarter + ".expCond"
        }
    }
    this.log(messageStarter + "." + msg, data);
}

Object.freeze(globalConfig);

export default globalConfig;

