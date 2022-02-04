import {createTheme} from "@mui/material";


const globalConfig = {
    simplifiedInterfaceFor110: true,
    drawerBleeding: 48,
    toolBarHeight: 56,
    projectDrawerWidth: 250,
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

