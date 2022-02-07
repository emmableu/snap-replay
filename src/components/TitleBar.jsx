import React from 'react';
import { makeStyles } from '@mui/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import UserButton from "./UserButton";
// import {useSelector} from "react-redux";
// import Cookies from "js-cookie"

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
    },
    appBar: {
        width: `100%`,
        backgroundColor:"#fafafa",
        height: 56,
    },
}));

export const TitleBar = (props) => {
    const {userId} = props;
    const classes = useStyles();
    // const userId = useSelector(state =>
    //     state.dashboard.value===null? null:state.dashboard.value.userId);
    //
    // React.useEffect(() => {
    // }, [userId])

    return (
        <AppBar className={classes.appBar}
                position="relative"
                color="inherit"
                elevation={3}
        >
            <Toolbar>
                <Typography variant="subtitle" className={classes.title}>
                    Programming Study
                </Typography>
                <UserButton/>
                {userId}
            </Toolbar>
        </AppBar>
    );
}

export default TitleBar;
