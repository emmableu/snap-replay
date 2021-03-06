// import React from "react";
// import Button from '@mui/material/Button';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import FormHelperText from '@mui/material/FormHelperText';
// import Select from '@mui/material/Select';
// import Slider from '@mui/material/Slider';
// import {Replayer} from "../Replayer.js";
// import ReplayerAPI from "../api/ReplayerAPI.js";
// import axios from "../api/axiosSpringConfig.js"
// import {useSelector} from "react-redux";
// import replayerAPI from "../api/ReplayerAPI.js";
// const ScratchRender = require('scratch-render/src/RenderWebGL.js');
// import FormGroup from '@mui/material/FormGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Switch from '@mui/material/Switch';
// import Bisect from "../util/Bisect";
//
// const Frame = () => {
//     const frameRef = React.useRef(null);
//     const frameParentRef = React.useRef(null);
//     const playerPanelContainerWidth = useSelector(state => state.rect.data.playerPanelContainerWidth);
//     const trace = useSelector(state => state.trace.data);
//     const stride = useSelector(state => state.trace.stride);
//     const [sliderSize, setSliderSize] = React.useState(0);
//     const [originalMode, setOriginalMode] = React.useState(false);
//     const replayer = React.useRef(null);
//     const renderer = React.useRef(null);
//     const minDistance = 1;
//     const selectedProject = useSelector(state => state.selectedProject.data.selected);
//     const [timeRange, setTimeRange] = React.useState([0, 10]);
//
//
//     const handleChangeSwitch = (event) => {
//         const newChecked = event.target.checked;
//         setOriginalMode(newChecked);
//         if (newChecked) {
//             replayerAPI.postScript(selectedProject, true, 0, 0, 0).then(
//                 res => setOriginalMode(true)
//             )
//         }
//         else {
//             // replayerAPI.postSnapXML(selectedProject, null, "full").then(
//             //     res => setOriginalMode(false)
//             // )
//             replayerAPI.postScript(selectedProject, false, timeRange[0], timeRange[1], stride).then(
//                 res => setOriginalMode(false)
//             )
//         }
//     };
//
//     function valuetext(value) {
//         return `frame ${value}`;
//     }
//
//     React.useEffect(  () => {
//         renderer.current = new ScratchRender(frameRef.current);
//         renderer.current.setLayerGroupOrdering(['group1']);
//         setSliderSize(100)
//         setMarks([
//             {
//                 value: 0,
//                 label: '0',
//             },
//             {
//                 value: trace.endIdx,
//                 label: trace.endIdx.toString(),
//             },
//         ]);
//         replayer.current = new Replayer(renderer.current, selectedProject, trace);
//         const drawStep = function () {
//             renderer.current.draw();
//             requestAnimationFrame(drawStep);
//         };
//         // size somehow gets multiplied by 4 on mac retina displays
//         const width = playerPanelContainerWidth / window.devicePixelRatio;
//         const height = width * 0.75;
//         console.log("width, height: ", width, height);
//         renderer.current.resize(width, height);
//         drawStep();
//         replayerAPI.postScript(selectedProject, false, timeRange[0], timeRange[1], stride)
//     }, [selectedProject])
//
//
//
//     // React.useEffect( () => {
//     //     if (!renderer.current) return;
//     //     const width = playerPanelContainerWidth / window.devicePixelRatio;
//     //     const height = width * 0.75;
//     //     renderer.current.resize(width, height);
//     //     renderer.current.draw();
//     // }, [playerPanelContainerWidth])
//
//
//
//
//     const [marks, setMarks] = React.useState([{value:0, label: '0'}]);
//
//
//     const handleChangeTimeSlider = (event, newValue, activeThumb) => {
//         if (!Array.isArray(newValue)) {
//             return;
//         }
//
//         if (newValue[1] - newValue[0] < minDistance) {
//             if (activeThumb === 0) {
//                 const clamped = Math.min(newValue[0], 100 - minDistance);
//                 setTimeRange([clamped, clamped + minDistance]);
//             } else {
//                 const clamped = Math.max(newValue[1], minDistance);
//                 setTimeRange([clamped - minDistance, clamped]);
//             }
//         }
//         else {
//             setTimeRange(newValue);
//         }
//     };
//
//     const handleMouseUp = (e, newValue) => {
//         // const startIdx = Bisect.ub(trace.blocks.id, newValue[0]);
//         // const endIdx = Bisect.ub(trace.blocks.id, newValue[1]);
//         const traceBlocks =  new Set(trace.blocks.slice(newValue[0], newValue[1]));
//         window.ide.traceBlocks = traceBlocks;
//         if (!originalMode) {
//             replayerAPI.postScript(selectedProject, false, newValue[0], newValue[1], stride)
//         }
//         else {
//             window.ide.highlightRunningCode(traceBlocks);
//         }
//     }
//
//
//     const loadFrame = (event) => {
//         replayer.current.loadFrame(parseInt(event.target.value) * stride);
//     }
//
//     return (
//         <div style={{width: playerPanelContainerWidth, height: playerPanelContainerWidth * 3/4 + 300}} ref={frameParentRef}>
//
//             <div style={{backgroundColor: "#c9c9c9", border: "1px solid #c9c9c9"}}>
//             {/*<div>*/}
//             <canvas
//                 ref={frameRef}
//             >
//             </canvas>
//             </div>
//
//
//             <Slider
//                 aria-label="Temperature"
//                 defaultValue={0}
//                 valueLabelDisplay="auto"
//                 marks
//                 min={0}
//                 max={sliderSize}
//                 onChange={loadFrame}
//             />
//             <Slider
//                 getAriaLabel={() => 'Minimum distance shift'}
//                 value={timeRange}
//                 onChange={handleChangeTimeSlider}
//                 onChangeCommitted={handleMouseUp}
//                 valueLabelDisplay="auto"
//                 getAriaValueText={valuetext}
//                 disableSwap
//             />
//             {/*<Button onClick={showFullCode}>Show Complete Code</Button>*/}
//             <FormGroup>
//                 <FormControlLabel
//                     originalMode={originalMode}
//                     onChange={handleChangeSwitch}
//                     control={<Switch />} label="Show Full Project" />
//             </FormGroup>
//                 </div>
//
//     )
// }
// export default Frame;
