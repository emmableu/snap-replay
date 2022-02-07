import React from 'react';
import {makeStyles} from '@mui/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Drawer, Box, Button, CssBaseline, Grid} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
// import ListItem from '@mui/material/ListItem';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import NotebookTitleBar from "./NotebookTitleBar";
// import ProjectMenu from "./ProjectMenu";
import globalConfig from "../../globalConfig";
// import ProjectTable from "./ProjectTable";
// import NewProjectButton from "./DashboardAddNewProject/NewProjectButton";
import {useDispatch, useSelector} from "react-redux";
import Cookies from "js-cookie";
import {Add} from "@mui/icons-material";
import NotebookTitleBar from "./NotebookTitleBar";
import {ExampleMenu} from "./ExampleMenu";
import NotebookSnap from "./NotebookSnap";
import ResizablePanels from "../../util/ResizablePanels";
import EditStepper from "../EditStepper";
import Snap from "../Snap";
import GoalPad from "./GoalPad";

const drawerWidth = globalConfig.projectDrawerWidth;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        height: "100%"
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        padding: "0px 20px",
        height: "100%",
        borderRight: "1px solid #f0f0f0"
    },
    drawerPaper: {
        width: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: {
        height: globalConfig.toolBarHeight
    },
    // content: {
    //     flexGrow: 1,
    //     backgroundColor: "#fafafa",
    //     padding: 10,
    // },
    goalPad: {
        // width: globalConfig.responsiveSizeData.actorDrawerWidth,
        // flex: `0 0 ${globalConfig.responsiveSizeData.actorDrawerWidth}px`,
        borderColor: "black",
        backgroundColor: "red",
    },
    addButtonContainer: {
        display: "flex",
        "& span": {
            textTransform: "none",
        },
        width: "100%",
        padding: "10px 0",
        justifyContent: "center",
        alignItems: "center"
    },
    projectTableGrid: {
        padding: "30px 0 0 0"
    }
}));
const DashboardPage = () => {
    const goalPadWidth = useSelector(state => {return state.rect.data.goalPadWidth});
    const classes = useStyles();
    const dispatch = useDispatch();
    const userId = Cookies.get('userId');
    const projectList = useSelector(state =>
    {
        // return (state.dashboard.value===null? null: state.dashboard.value.projectList)
        return []
    });

    React.useEffect(() =>
    {
        if (userId !== undefined) {
            // dispatch(fetchDashboardByUserID(userId));
        }
    }, []);


    return (
        <ThemeProvider theme={globalConfig.dashboardTheme()}>
            <div className={classes.root}>
                <CssBaseline />
                <div
                    className={classes.drawer}
                >
                    <div className={classes.toolbar} />
                    <Divider />
                    {globalConfig.hasAddNewExample  &&

                        <div className={classes.addButtonContainer}>
                            <Button
                                onClick={e => e.preventDefault()}
                                startIcon={<Add/>}
                                color="secondary"
                                variant="contained"
                            > New Example
                            </Button>
                        </div>
                    }
                    <ExampleMenu/>
                    {/*<ProjectMenu/>*/}
                </div>

                <div style={{flexGrow: 1, display: "flex", flexDirection: "column", height: "100%"}}>
                    <NotebookTitleBar userId={userId}/>
                    <div style={{
                                width: `100%`,
                                height: `calc(100% - ${globalConfig.toolBarHeight}px`}}>
                        {globalConfig.simplifiedInterfaceFor110?
                            <NotebookSnap/> :
                            <ResizablePanels
                                leftSize={goalPadWidth}
                                draggingType="goalPadWidth"
                                panelHeight={`calc(95vh - ${globalConfig.drawerBleeding}px - ${globalConfig.toolBarHeight}px`}
                            >
                                <GoalPad/>
                                <NotebookSnap/>
                            </ResizablePanels>
                        }
                    </div>
                </div>
                {/*</div>*/}
            </div>
        </ThemeProvider>
    );
}


export default DashboardPage;
