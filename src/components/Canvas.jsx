import React, {useRef, useState, useEffect} from "react";
import ReactDOM from "react-dom";
import {useDimensions} from "../hooks/useDimensions.js";

const Canvas = (props) => {

    const canvasRef = useRef();

    let width = 900;
    let height = 600;


    useEffect(() => {

        function loop() {
            width = canvasRef.current.offsetWidth;
            height = canvasRef.current.offsetHeight;
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
        world.isDevMode = true;
        world.worldCanvas.focus();
        world.initLayout(width, height);
        const ide = new IDE_Morph();
        ide.openIn(world);
        ide.fixLayout();
        window.ide = ide;
        loop();
    }, [])

    return (
        <canvas ref={canvasRef} tabIndex={1}/>
    )
}

export default Canvas;


