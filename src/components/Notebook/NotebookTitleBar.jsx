import React from 'react';
import { makeStyles } from '@mui/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// import {IdeaBuilderIcon} from "../primitives/Icon/Icon";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import globalConfig from "../../globalConfig";
import {Avatar, Box, Tooltip, Fab} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import DownloadIcon from '@mui/icons-material/Download';
import {download, setExample} from "../../redux/features/exampleCollectionSlice";
import {useDispatch, useSelector} from "react-redux";
import Snackbar from '@mui/material/Snackbar';
import Fade from '@mui/material/Fade';
import Slide from '@mui/material/Slide';
import Grow from '@mui/material/Grow';

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
    const dispatch = useDispatch();
    const selectedExample = useSelector(state => state.exampleCollection.selectedId);
    const [open, setOpen] = React.useState(false);


    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        setOpen(true);
        dispatch(setExample({_id: selectedExample,
            xml: window.notebookIde.serializer.serialize(window.notebookIde.stage)}));
        dispatch(download());
    }

    return (
        <AppBar className={classes.appBar}
                position="relative"
                color="inherit"
                elevation={3}
        >
            <Toolbar>
                <Avatar   sx={{ width: 24, height: 24 }}
                          alt="notebook" src="static/notebook.png" />

                <Typography variant="subtitle" className={classes.title}>
                    {' '} My Feature Prototypes
                </Typography>

                <Tooltip title={"save and download"}>
                <IconButton color="primary"
                            aria-label="save and download"
                            onClick={handleSave}
                            component="span">
                    <DownloadIcon />
                </IconButton>

                </Tooltip>

                <Snackbar
                    open={open}
                    onClose={handleClose}
                    message="Saved"
                />

                <PersonOutlineOutlinedIcon/>
                {userId}
            </Toolbar>
        </AppBar>
    );
}

export default NotebookTitleBar;
