import React from "react";
import ReplayerAPI from "../api/ReplayerAPI";
var scratchblocks = require('scratchblocks');

const CodeBox = () => {
    const [code, getCode] = React.useState("")
    // const blocks = React.useRef();

    return (
        <>
        <pre className="blocks">
            {`when flag clicked
            move (10) steps`}
        </pre>
       </>
    )
};

export default CodeBox;
