import React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import globalConfig from "../../globalConfig";
// import {deleteExample} from "../../redux/features/projectSlice";
import {useDispatch} from "react-redux";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Box, TextField} from "@mui/material";
// import {setSelectedExampleId} from "../../redux/features/projectSlice";


const ExampleActionDropdown  = (props) => {
    const {exampleId} = props;
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
    const [renameDialogOpen, setRenameDialogOpen] = React.useState(false);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickDelete = () => {
        handleClose();
        setDeleteDialogOpen(true);
    }

    const handleClickRename = () => {
        handleClose();
        setRenameDialogOpen(true);
    }

    const handleCloseDeleteDialog = () => {
        handleClose();
        setDeleteDialogOpen(false);
    };

    const handleCloseRenameDialog = () => {
        handleClose();
        setRenameDialogOpen(false);
    };


    return (
        <>
            <IconButton aria-label="display more actions"
                        color="inherit"
                        onClick={handleClick}
                        size="small">
                <MoreVertIcon
                />
            </IconButton>

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClickRename}>Rename</MenuItem>
                <MenuItem onClick={handleClickDelete}>Delete</MenuItem>
                {/*<MenuItem onClick={handleClose}>Logout</MenuItem>*/}
            </Menu>

            <Dialog
                open={deleteDialogOpen}
                onClose={handleCloseDeleteDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to delete this example?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This action is irreversible.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
                    <Button onClick={handleCloseDeleteDialog} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>


            <Dialog
                open={renameDialogOpen}
                onClose={handleCloseRenameDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                size="small"
            >
                <DialogTitle id="alert-dialog-title-2">
                    {"Rename Example"}
                </DialogTitle>
                <DialogContent>
                    <Box
                        sx={{
                            width: 500,
                            maxWidth: '100%',
                        }}
                    >
                        <TextField fullWidth label="Example Name" id="fullWidth" />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseRenameDialog}>Cancel</Button>
                    <Button onClick={handleCloseRenameDialog} autoFocus>
                        Rename
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
};

export default ExampleActionDropdown;

