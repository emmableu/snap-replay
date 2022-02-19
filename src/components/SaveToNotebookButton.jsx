import React from "react";
import Button from "@mui/material/Button";
import DownloadIcon from '@mui/icons-material/Download';
import {Box, Fab, TextField, Tooltip} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {addExample, setExample} from "../redux/features/exampleCollectionSlice";
import {useDispatch, useSelector} from "react-redux";
import * as UUID from "uuid";
import globalConfig from "../globalConfig";
import Snackbar from "@mui/material/Snackbar";

const SaveToNotebookButton = () => {
    const dispatch = useDispatch();
    const [setNameDialogOpen, setSetNameDialogOpen] = React.useState(false);
    const ids = useSelector(state => state.exampleCollection.idLst)
    const staticData = globalConfig.tasks;
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);

    const [exampleId, setExampleId] = React.useState("");

    const handleChangeTextField = (e) => {
        setExampleId(e.target.value);
    }

    const handleClickFab = () => {
        if (globalConfig.simplifiedInterfaceFor110) {
            window.ide.exportProject(window.ide.projectName);
        }
        else {
            setSetNameDialogOpen(true);
        }
    }

    const handleCloseSetNameDialog = () => {
        setSetNameDialogOpen(false);
    };

    const handleClickSave = () => {
        handleCloseSetNameDialog();
        setSnackbarOpen(true);
        dispatch(setExample({
            _id: exampleId,
            xml: window.ide.serializer.serialize(window.ide.stage),
        }));
    }


    const handleClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <>
            <div>
                <Tooltip title={globalConfig.simplifiedInterfaceFor110? "Export":"Save to Notebook"}>
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
                        {
                            globalConfig.simplifiedInterfaceFor110 ?
                                <TextField fullWidth label="Name"
                                           id="fullWidth"
                                           onChange={handleChangeTextField}
                                />
                                :
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Name</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={exampleId}
                                        label="Name"
                                        onChange={handleChangeTextField}
                                    >
                                        {ids.map(_id =>
                                            <MenuItem value={_id}>{staticData[_id].name}</MenuItem>
                                        )}
                                    </Select>
                                </FormControl>
                        }

                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseSetNameDialog}>Cancel</Button>
                    <Button onClick={handleClickSave} autoFocus disabled={!exampleId}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={snackbarOpen}
                vertical='bottom'
                horizontal='center'
                onClose={handleClose}
                message="Saved"
                sx={{bottom: 100}}
            />

        </>
    )
}

export default SaveToNotebookButton;
