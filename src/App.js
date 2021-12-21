import './App.css';
import React from "react";
import Canvas from "./components/Canvas.jsx";
import Frame from "./components/Frame.jsx";

function App() {
  return (
    <div className="App" style={{width: "100%", height: "100%"}}>
        <div style={{position: "absolute", left: "0px", right: "calc(100vw - 400px)",
                    height: "100vh",
                    backgroundColor: "red"}}>
            <Frame />
        </div>
        <div style={{position: "absolute", left: "400px", right: "0px",
            height: "100vh",
            backgroundColor: "grey"}}>
            <Canvas/>
        </div>
    </div>
  );
}

export default App;
