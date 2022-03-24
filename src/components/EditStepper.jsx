
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useSelector} from "react-redux";
import ProjectSelector from "./ProjectSelector";
import Frame from "./Frame";
import Player from "./Player";
import TwoFrame from "./TwoFrame";
import globalConfig from "../globalConfig";
import OutboundIcon from '@mui/icons-material/Outbound';
import {Tooltip} from "@mui/material";

const steps = ['Play the program', 'Inspect your trace'];

export default function EditStepper(props) {
    const playerPanelContainerWidth = useSelector(state => state.rect.data.playerPanelContainerWidth);
    const selectedProject = useSelector(state => state.selectedProject.data.selected);
    const {activeStep, setActiveStep} = props;
    // const [activeStep, setActiveStep] = React.useState(0);
    const [nextEnabled, setNextEnabled] = React.useState(false);
    const playerOnly = globalConfig.playerOnly;
    const controlCond = globalConfig.controlCond;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        setNextEnabled(false);
    };

    const htmlDescriptions = {
        panda:
            (<p>Use arrow keys to control panda movement.<br/>When the panda eats all bamboos, you win. </p>),
        boat:
            (<p>Use arrow keys to control boat movement.</p>),
        shoot:
            (<p>Shoot the star using the space key.<br/>Game ends when the star hits the gun, or when the star is out of the stage.  </p>),
        skiing:
            (<p>Use left/right arrow to control the cat and to avoid hitting the tree.<br/>When the cat hits the tree, game ends. </p>),
        space:
            (<p>Use left/right arrow to control the player.<br/>
                When pressing the space key, a bullet shoots out of the player.<br/>
                When all of the enemies are destroyed, you win.
            </p>),
        catch:
            (<p>Use left/right arrow to change direction of the controller.<br/>
                Play with the code to see what happens when the color of the dot matches/doesn't match the controller.<br/>
            </p>),
    }

    return (
        <>
        {/*    */}
        {/*    {!playerOnly &&*/}

        {/*    <div style={{padding: "10px 30px"}}>*/}
        {/*    <Tooltip title="Open in new tab">*/}

        {/*        <Button*/}
        {/*            target="_blank"*/}
        {/*            href=*/}
        {/*                {controlCond?*/}
        {/*                    "https://docs.google.com/document/d/e/2PACX-1vTj9XObjv-kiiWJWNoQaw0OvWGWN1cVUM8gLs0zWYzvo926X-37IlXXdRs-zNdHCJ2ktG6jNu1LQocv/pub"*/}
        {/*                    : "https://docs.google.com/document/d/e/2PACX-1vSunV8OV8cVcDn3MEoMuKwtftt8a33NM2fGBC8SFhWRX_NhgC53u3D098TI6iYMWoAQLYyvovoWmB9v/pub"*/}
        {/*                }*/}
        {/*            endIcon={<OutboundIcon/>}>*/}
        {/*        Decompose By Sequence Worksheet*/}
        {/*    </Button>*/}
        {/*    </Tooltip>*/}
        {/*    </div>*/}
        {/*}*/}

            {!playerOnly && <ProjectSelector
                setActiveStep={setActiveStep}
                setNextEnabled={setNextEnabled}/>}
            <div style={{color: "grey", fontStyle: "italic", margin: "10px 10px", fontSize:15}}>
                {htmlDescriptions[selectedProject]}
            </div>

            {playerOnly && controlCond
             &&  <Box sx={{ width: '100%' }}>
                <Player
                    nextEnabled={nextEnabled}
                    setNextEnabled={setNextEnabled}
                />
                </Box>
            }

            {!controlCond &&
                <Box sx={{ width: '100%' }}>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label, index) => {
                            const stepProps = {};
                            const labelProps = {};
                            return (
                                <Step key={label} {...stepProps}>
                                    <StepLabel {...labelProps}>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
                        {activeStep === 1 ? <TwoFrame/> : <Player
                            nextEnabled={nextEnabled}
                            setNextEnabled={setNextEnabled}
                        />}
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                Back
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />

                            <Button onClick={handleNext}
                                    disabled={!nextEnabled}
                            >
                                {activeStep === steps.length - 1 ? '' : 'Next'}
                            </Button>
                        </Box>
                    </React.Fragment>
                </Box>
            }


        </>
    );
}
