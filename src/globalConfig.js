import {createTheme} from "@mui/material";
import globalConfigIgnore from "../globalConfig.ignore";

let simplifiedInterfaceFor110;
if (globalConfigIgnore) {
    simplifiedInterfaceFor110 = globalConfigIgnore.simplifiedInterfaceFor110;
}
else {
    simplifiedInterfaceFor110 = true;
}

const globalConfig = {
    simplifiedInterfaceFor110,
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
}

Object.freeze(globalConfig);

export default globalConfig;

