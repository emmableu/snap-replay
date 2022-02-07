import React, {useRef, useState, useEffect} from "react";
import ReactDOM from "react-dom";
import {useSelector} from "react-redux";

const NotebookSnap = (props) => {

    const canvasRef = useRef();
    const containerRef = useRef();

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
        window.notebookWorld = world;
        world.isDevMode = true;
        world.worldCanvas.focus();
        world.initLayout(width, height);
        const ide = new IDE_Morph();
        ide.openIn(world);
        ide.setBlocksScale(1.1);
        ide.fixLayout();
        window.notebookIde = ide;
        loop();
    }, [])

    // useEffect(() => {
    //     // ReplayerAPI.postSnapXML(selectedProject, null, "asset").then(
    //     // );
    // }, [selectedProject])

    return (
        <div ref={containerRef} style={{width: "100%", height: "100%"}}>
            <canvas ref={canvasRef} tabIndex={2}/>
        </div>
    )
}

export default NotebookSnap;


