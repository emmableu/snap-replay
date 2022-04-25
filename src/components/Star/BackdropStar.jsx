import React from 'react';
import {Transformer, Image} from 'react-konva';
import useImage from 'use-image';
import axios from "../../api/ideaServerAxiosConfig";
import globalConfig from "../../globalConfig";

const BackdropStar = (props) => {
    const {_id, prototypeId, backdropWidth} = props;
    const [imgSrc, setImgSrc] = React.useState(axios.defaults.baseURL + prototypeId);
    let [image] = useImage(imgSrc);
    React.useEffect( () => {
            // globalLog("img src updated: ", axios.defaults.baseURL + prototypeId)
            setImgSrc(axios.defaults.baseURL + prototypeId);
        }
        , [_id]
    )
    if (image !== undefined) {
        // globalLog("executing useimage here");
        image.crossOrigin = "Anonymous";
    }

    return (
        <>
            <Image
                image={image}
                key="backdropStar"
                id="backdropStar"
                width={globalConfig.noScaleWidth}
                height={globalConfig.noScaleWidth*3/4}
                // onClick={onSelect}
                // onTap={onSelect}
               />
        </>
    );
};


export default BackdropStar;
