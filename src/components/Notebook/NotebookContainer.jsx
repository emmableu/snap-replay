import * as React from 'react';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import {IconButton} from "@mui/material";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import NotebookPage from "./NotebookPage";
import globalConfig from "../../globalConfig";

const drawerBleeding = globalConfig.drawerBleeding;

const Root = styled('div')(({ theme }) => ({
    height: '100%',
    backgroundColor:
        theme.palette.mode === 'light'
            ? grey[100]
            : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const PullerButton = styled(IconButton)(({ theme }) => ({
    // width: 30,
    // height: 6,
    backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
    // borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
}));

function NotebookContainer() {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    // This is used only for the example

    return (
        <Root>
            <CssBaseline />
            <Global
                styles={{
                    '.MuiDrawer-root > .MuiPaper-root': {
                        height: `calc(95% - ${drawerBleeding}px)`,
                        overflow: 'visible',
                    },
                }}
            />
            <Drawer
                anchor="bottom"
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                swipeAreaWidth={drawerBleeding}
                disableSwipeToOpen={false}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                <StyledBox
                    sx={{
                        position: 'absolute',
                        top: -drawerBleeding,
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        visibility: 'visible',
                        right: 0,
                        left: 0,
                        backgroundColor: "#fafafa",
                    }}
                >
                    {/*<Puller />*/}
                    <PullerButton onClick={toggleDrawer(!open)}>
                        {open ? <KeyboardArrowDownIcon/> : <KeyboardArrowUpIcon/>}
                    </PullerButton>
                    <Typography sx={{ p: 2, color: 'text.secondary' }}>
                        My Examples
                    </Typography>
                </StyledBox>
                <StyledBox
                    sx={{
                        height: '100%',
                        overflow: 'auto',
                        backgroundColor: "#fafafa",
                    }}
                >
                    {/*<Skeleton variant="rectangular" height="100%" />*/}
                    <NotebookPage/>
                </StyledBox>
            </Drawer>
        </Root>
    );
}


export default NotebookContainer;
