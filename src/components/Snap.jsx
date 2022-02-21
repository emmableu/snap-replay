import React, {useRef, useState, useEffect} from "react";
import ReactDOM from "react-dom";
import {useDimensions} from "../hooks/useDimensions.js";
import {useSelector} from "react-redux";
import ReplayerAPI from "../api/ReplayerAPI";
import globalConfig from "../globalConfig";

const Snap = (props) => {
    const {activeStep} = props;
    const canvasRef = useRef();
    const containerRef = useRef();
    const selectedProject = useSelector(state => state.selectedProject.data.selected)
    const [snapXml, setSnapXml] = React.useState("");
    const [snapIdeLoaded, setSnapIdeLoaded] = React.useState(false);

    let width = 900;
    let height = 600;


    useEffect(() => {
        function loop() {
            width = containerRef.current.offsetWidth;
            height = containerRef.current.offsetHeight;
            //
            if (world.fillContainer(width, height)) {
                console.log("refill container");
                world.resize();
            }
            requestAnimationFrame(loop);
            world.doOneCycle();
        }

        const world = new WorldMorph(canvasRef.current,
            false, true);
        // implemented fixLayout manually.
        window.world = world;
        world.isDevMode = false;
        world.worldCanvas.focus();
        world.initLayout(width, height);
        const ide = new IDE_Morph(true);
        ide.openIn(world);
        if (globalConfig.simplifiedInterfaceFor110) {
            window.top.postMessage('snapWindowLoaded', '*')
            setSnapIdeLoaded(true);
        }
        ide.setBlocksScale(1.1);
        ide.fixLayout();
        window.ide = ide;
        loop();
    }, [])

    useEffect(() => {
        if (!globalConfig.simplifiedInterfaceFor110) {
            ReplayerAPI.postSnapXML(selectedProject, null, "script_and_asset_no_slice").then(
            );
        }
    }, [selectedProject])

    useEffect(() => {
        if (snapIdeLoaded && snapXml) {
            window.ide.interpretReqAnchors(snapXml);
        }
    }, [snapIdeLoaded, snapXml])


    window.onmessage = function(e) {
        if (!globalConfig.simplifiedInterfaceFor110) return;
        try {
            if (typeof e.data === "string") {
                const data = JSON.parse(e.data);
                if ("snapXml" in data) {
                    setSnapXml(data.snapXml);
                }
                else if ("logInfo" in data) {
                    Trace.csc110Note(data.logInfo);
                }
            }
        } catch(e) {
            console.error(e);
        }
    };


    return (
        <>
        <div ref={containerRef} style={{width: "100%", height: "100vh"}}>
            {activeStep === 0 && <div style={{position: "absolute", width: "100%", height: "100%", backgroundColor: "white"}}/>}
            <canvas ref={canvasRef} tabIndex={1}/>
        </div>
        </>
    )
}

export default Snap;


