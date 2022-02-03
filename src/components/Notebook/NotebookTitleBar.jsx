import React from 'react';
import { makeStyles } from '@mui/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// import {IdeaBuilderIcon} from "../primitives/Icon/Icon";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import globalConfig from "../../globalConfig";
import {Avatar, Box} from "@mui/material";
// import {useSelector} from "react-redux";
// import Cookies from "js-cookie"

const drawerWidth = globalConfig.projectDrawerWidth;
const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
    },
    appBar: {
        width: `100%`,
        backgroundColor:"#fafafa",
        height: globalConfig.toolBarHeight,
    },
}));

export const NotebookTitleBar = (props) => {
    const {userId} = props;
    const classes = useStyles();
    // // // globalLog("Cookies.get(userid", Cookies.get("userId"));
    // const userId = useSelector(state =>
    //     state.dashboard.value===null? null:state.dashboard.value.userId);
    //
    // React.useEffect(() => {
    //     // // globalLog("state.dashboard.value: ", userId);
    // }, [userId])

    return (
        <AppBar className={classes.appBar}
                position="relative"
                color="inherit"
                elevation={3}
        >
            <Toolbar>
                <Avatar   sx={{ width: 24, height: 24 }}
                          alt="notebook" src="/static/notebook.png" />

                <Typography variant="subtitle" className={classes.title}>
                    {' '} My Examples
                </Typography>
                <PersonOutlineOutlinedIcon/>
                {userId}
            </Toolbar>
        </AppBar>
    );
}

export default NotebookTitleBar;
