
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

const steps = ['Play the program', 'View your trace'];

export default function EditStepper(props) {
    const leftPanelSize = useSelector(state => state.rect.data.leftPanelSize);
    const [activeStep, setActiveStep] = React.useState(0);
    const [forceStop, setForceStop] = React.useState(false);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setForceStop(true);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };


    return (
        <>
            <ProjectSelector/>
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
                {activeStep === 1 ? <Frame/> : <Player forceStop={forceStop}/>}
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

                    <Button onClick={handleNext}>
                        {activeStep === steps.length - 1 ? '' : 'Next'}
                    </Button>
                </Box>
            </React.Fragment>
        </Box>
        </>
    );
}