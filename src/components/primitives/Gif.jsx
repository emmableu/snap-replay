import React from "react";

const Gif = ( props ) => {
    const {imgSrc, gifSrc} = props;
    const [src, setSrc] = React.useState(imgSrc);
    return (
        <img
            alt="img"
            src={src}
            width="100%"
            style={{
                border: "1px solid #ddd",
                borderRadius: "4px",
                padding: 5
            }}

            onMouseEnter={() => {
                setSrc(gifSrc);
            }}

            onMouseOut={() => {
                setSrc(imgSrc)
            }}
        />
    )

}

export  default Gif;
