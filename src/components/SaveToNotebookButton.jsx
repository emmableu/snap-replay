import React from "react";
import Button from "@mui/material/Button";
import DownloadIcon from '@mui/icons-material/Download';
import {Box, Fab, TextField, Tooltip} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import {addExample} from "../redux/features/exampleCollectionSlice";
import {useDispatch} from "react-redux";
import * as UUID from "uuid";

const SaveToNotebookButton = () => {
    const dispatch = useDispatch();
    const [setNameDialogOpen, setSetNameDialogOpen] = React.useState(false);
    const [exampleName, setExampleName] = React.useState("");

    const handleChangeTextField = (e) => {
        setExampleName(e.target.value);
    }

    const handleClickFab = () => {
        setSetNameDialogOpen(true);
    }

    const handleCloseSetNameDialog = () => {
        setSetNameDialogOpen(false);
    };

    const handleClickSave = () => {
        handleCloseSetNameDialog();
        dispatch(addExample({
            _id: UUID.v4(),
            name: exampleName,
            description: "",
            xml: window.ide.serializer.serialize(window.ide.stage),
        }));
    }

    return (
        <>
            <div>
                <Tooltip title="Save to Notebook">
                <Fab size="small" onClick={handleClickFab}><DownloadIcon/></Fab>
                </Tooltip>
            </div>
            <Dialog
                open={setNameDialogOpen}
                onClose={handleCloseSetNameDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                size="small"
            >
                <DialogTitle id="alert-dialog-title-2">
                    {"Add name"}
                </DialogTitle>
                <DialogContent>
                    <Box
                        sx={{
                            width: 500,
                            maxWidth: '100%',
                        }}
                    >
                        <TextField fullWidth label="Name"
                                   id="fullWidth"
                                   onChange={handleChangeTextField}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseSetNameDialog}>Cancel</Button>
                    <Button onClick={handleClickSave} autoFocus>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

        </>
    )
}

export default SaveToNotebookButton;
