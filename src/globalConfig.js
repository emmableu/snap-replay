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
    toolBarHeight: 56,
    projectDrawerWidth: simplifiedInterfaceFor110 ? 150 : 250,
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

