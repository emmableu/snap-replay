
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
        shoot:
            (<p>Shoot the star using the space key.<br/>Game ends when the star hits the gun, or when the star is out of the stage.  </p>),
        skiing:
            (<p>Use left/right arrow to control the cat and to avoid hitting the tree.<br/>When the cat hits the tree, game ends. </p>)
    }

    return (
        <>
            {!playerOnly && <ProjectSelector
                setActiveStep={setActiveStep}
                setNextEnabled={setNextEnabled}/>}
            <div style={{color: "grey", fontStyle: "italic", margin: "10px 50px"}}>
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
