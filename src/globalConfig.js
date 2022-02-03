import {createTheme} from "@mui/material";

const materialDarkTheme = {
    darkText: "#131A20",
    primary: "#90CAF9",
}
const antdTheme = {
    antdDarkBase: "#111D2C",
}

const materialSuggestedTheme = {
    darkBase: "#141414",
    darkSurfac5: "#161616",
    darkSurface2: "#223040",
    darkSurface3: "#1e2b3b",
    darkSurface4: "#111D2C",
    darkBaseAppBarPale: "#111d2c",
    blueSecondary: "#64b6fa",
    darkPrimary: "#177ddc",
    darkSecondary: "#64b6fa",
    pinkSecondary: "#F291B5",
    darkMenuBackground2: "#323d4a",
    dp01: "#1e1e1e",
    dp02: "#222222",
    dp03: "#252525",
    dp04: "#272727",
    dp06: "#2c2c2c",
    dp08: "#2d2d2d",
    dp12: "#333333",
    dp16: "#363636",
    dp24: "#383838",
    dp48: "#505050",
}

const draftTheme = {
    darkBaseAppBar2: "#F291B5",
}



const exampleTop = 60;

let mode = "LARGE"

if (window.innerWidth < 1380) {
    mode = "SMALL"
}

if (window.innerWidth >= 1380 && window.innerWidth < 1600 ) {
    mode = "MEDIUM"
}

let responsiveSizeData = {
    // actorDrawerWidth: 270,
    // exampleDrawerWidth: 240,
    // noteWidth: 335,
    // frameListHeight: 200,
    exampleDrawerWidth: 250,
    actorDrawerWidth: 250, // refer to the width of the goal panel
    noteWidth: 230,
    frameListHeight: 165,
    frameListPaperHeight: 100,
}

const costumeSwapperHeight = Math.max(window.innerHeight - exampleTop*2 - (56 + 24 + 28 + 8 + 148 + 21 + 21 + 42 + 42 + 32 + 12 + 24 + 52 + 50), 200);

const globalConfig = {
    // actorDrawerWidth: 270,
    // exampleDrawerWidth: 240,
    drawerBleeding: 48,
    toolBarHeight: 56,
    examplePageMargin: 8,
    exampleToolBarHeight: 40,
    addNewActorBoxHeight: 50,
    projectDrawerWidth: 270,
    panelTabsWidth: 65,
    exampleTop: exampleTop,
    galleryStepperMaxHeight: window.innerHeight - exampleTop*2 - 200,
    costumeSwapperHeight: costumeSwapperHeight,
    // noteWidth: 335,
    // responsiveSizeData.frameListHeight: 200,
    trashToolBarHeight: 36,
    innerBoxLeftRightPaddingEach: 20,
    topAndBottomMarginOutsideFrame: 5,
    noScaleWidth: 480, //to make it the same as scratch
    exampleModalWidth: 1100,
    color: {
        veryLightGrey: "#fafafa",
    },

    exampleMenuColor: {
        titleBar: {
            background: materialDarkTheme.primary,
            text: materialDarkTheme.darkText
        },
        surface: "#111D2C",
        menuHeader: "#2a2e33",
        menuItem: "#353a40",
        menuBackground: "#121c29",
        menuItemOnClick: {
            background: materialDarkTheme.primary,
            text: materialDarkTheme.darkText
        },
        menuItemOnHover: "#40a9ff",
        menuBackgroundOnDrag: "#e6f7ff",
        whiteText: "white",
    },
    dashboardTheme: ()=> createTheme({
        palette: {
            secondary: {
                main: "#1890ff",
            },
        },
    }),
    routes: {
        dashboard: "/project",
        login: "/login",
    },
    types: {
        DRAFT: false,
        FINAL: true,
    },
    imageServer: {
        "student": {
            "state": "static/student/state/",
            "backdrop": "static/student/backdrop/",
            "frame": "static/student/frame/",
            "event": "static/student/event/",
            "text": "static/student/text/",
            "resource": "static/student/resource/",
            "speech": "static/student/speech/",
        },
        "sample": {
            "state": "static/sample/state/",
            "backdrop": "static/sample/backdrop/",
            "frame": "static/sample/frame/",
            "event": "static/sample/event/",
            "text": "static/sample/text/",
            "resource": "static/sample/resource/",
        }
    }
}

globalConfig.mode = mode;
globalConfig.responsiveSizeData = responsiveSizeData;



const calcFrameWidth = ( windowInnerWidth, windowInnerHeight ) => {
    const bestFrameHeight = windowInnerHeight
        - globalConfig.toolBarHeight
        - globalConfig.exampleToolBarHeight
        - globalConfig.examplePageMargin*2
        - globalConfig.responsiveSizeData.frameListHeight
        - globalConfig.trashToolBarHeight*3
        - globalConfig.topAndBottomMarginOutsideFrame*4
    ; //2 bars right up/beneath and one bar on the very top just below framelist.

    const bestFrameWidth = (windowInnerWidth
        - globalConfig.responsiveSizeData.exampleDrawerWidth
        - globalConfig.panelTabsWidth
        - globalConfig.responsiveSizeData.actorDrawerWidth
        - globalConfig.responsiveSizeData.noteWidth
        -  globalConfig.innerBoxLeftRightPaddingEach*2
    );

    return Math.min(bestFrameWidth, bestFrameHeight * 4 / 3);
}


const globalLog = (...msgs) => {
    if (process.env.REACT_APP_DEBUG !== 'OFF') console.log(...msgs)
    // console.log(...msgs)
}

Object.freeze(globalConfig);
Object.freeze(calcFrameWidth);
Object.freeze(globalLog);

export default globalConfig;
export  {calcFrameWidth, globalLog};

