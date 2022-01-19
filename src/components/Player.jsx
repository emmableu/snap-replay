import React from "react";
import Button from '@mui/material/Button';
import FlagIcon from '@mui/icons-material/Flag';
import StopIcon from '@mui/icons-material/Stop';
// import ScratchStage from "../whisker/scratch-stage"

const Player = (props) => {
    const playerRef = React.useRef();

    React.useEffect(() => {
        // const scratch = new ScratchStage(playerRef.current);
        // scratch.loadProject()
    })
    return (
        <>
            <Button color="success" variant="outlined"><FlagIcon/></Button>
            <Button color="error" variant="outlined"><StopIcon/></Button>
            <div style={{backgroundColor: "grey", border: "1px solid grey"}}>
                {/*<div>*/}
                <canvas
                    ref={playerRef}
                >
                </canvas>
            </div>
        </>
    )
}

export default Player
