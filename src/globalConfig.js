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



const storyboardTop = 60;

let mode = "LARGE"

if (window.innerWidth < 1380) {
    mode = "SMALL"
}

if (window.innerWidth >= 1380 && window.innerWidth < 1600 ) {
    mode = "MEDIUM"
}

let responsiveSizeData = {
    // actorDrawerWidth: 270,
    // storyboardDrawerWidth: 240,
    // noteWidth: 335,
    // frameListHeight: 200,
    actorDrawerWidth: 200,
    storyboardDrawerWidth: 200,
    noteWidth: 230,
    frameListHeight: 165,
    frameListPaperHeight: 100,
}

const costumeSwapperHeight = Math.max(window.innerHeight - storyboardTop*2 - (56 + 24 + 28 + 8 + 148 + 21 + 21 + 42 + 42 + 32 + 12 + 24 + 52 + 50), 200);

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


    storyboardPageMargin: 8,
    storyboardToolBarHeight: 40,
    addNewActorBoxHeight: 50,
    codeBoxHeight: window.innerHeight - 250,
    panelTabsWidth: 65,
    storyboardTop: storyboardTop,
    galleryStepperMaxHeight: window.innerHeight - storyboardTop*2 - 250,
    costumeSwapperHeight: costumeSwapperHeight,
    // noteWidth: 335,
    // responsiveSizeData.frameListHeight: 200,
    trashToolBarHeight: 36,
    innerBoxLeftRightPaddingEach: 20,
    topAndBottomMarginOutsideFrame: 5,
    noScaleWidth: 480, //to make it the same as scratch
    storyboardModalWidth: 1100,
    color: {
        veryLightGrey: "#fafafa",
    },

    storyboardMenuColor: {
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
        - globalConfig.storyboardToolBarHeight
        - globalConfig.storyboardPageMargin*2
        - globalConfig.responsiveSizeData.frameListHeight
        - globalConfig.trashToolBarHeight*3
        - globalConfig.topAndBottomMarginOutsideFrame*4
    ; //2 bars right up/beneath and one bar on the very top just below framelist.

    const bestFrameWidth = (windowInnerWidth
        - globalConfig.responsiveSizeData.storyboardDrawerWidth
        - globalConfig.panelTabsWidth
        - globalConfig.responsiveSizeData.actorDrawerWidth
        - globalConfig.responsiveSizeData.noteWidth
        -  globalConfig.innerBoxLeftRightPaddingEach*2
    );

    return Math.min(bestFrameWidth, bestFrameHeight * 4 / 3);
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


Logger.prototype.csc110Note = function (obj) {
    const {msg, data} = obj;
    console.log("csc110Note: ", msg, data)
    let messageStarter = "csc110";
    this.log(messageStarter + "." + msg, data);
}

Object.freeze(globalConfig);

export default globalConfig;

export  {calcFrameWidth};
