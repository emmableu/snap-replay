import React from 'react';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { makeStyles } from '@mui/styles';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import {useDispatch, useSelector} from "react-redux";
import {clearUserId} from "../redux/features/userIdSlice";


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex'
    },
    paper: {
        marginRight: "20px"
    }
}));

const UserButton = () => {
    const classes = useStyles();
    const userId = useSelector(s => s.userId.data);
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const dispatch = useDispatch();
    // function AuthButton() {


    const handleToggle = () => {
        setOpen(prevOpen => !prevOpen);
    };

    const handleClick = event => {
        dispatch(clearUserId());
        handleClose(event);
    };

    const handleClose = event => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    }

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <div className={classes.root}>
            <div>
                <Button
                    color="inherit"
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                    startIcon={<PersonOutlineOutlinedIcon />}>
                    {userId}
                </Button>
                <Popper
                    open={open}
                    style={{zIndex: 1000}}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    transition
                    disablePortal
                >
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin:
                                    placement === 'bottom' ? 'center top' : 'center bottom'
                            }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList
                                        autoFocusItem={open}
                                        id="menu-list-grow"
                                        onKeyDown={handleListKeyDown}
                                    >
                                        <MenuItem onClick={handleClick}>Logout</MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        </div>
    );
}

export default UserButton;
