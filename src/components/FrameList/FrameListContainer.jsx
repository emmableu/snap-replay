import FrameList from "./FrameList";
import React from "react";
import {useSelector} from "react-redux";
import Bisect from "../../util/Bisect";
import TimeIntervalUtil from "../../util/TimeIntervalUtil";

const FrameListContainer = () => {
    const frameList = useSelector(state => {return state.trace.frameList});
    const playerPanelContainerWidth = useSelector(state => state.rect.data.playerPanelContainerWidth);

    return (
        <div
            style={{
                // padding: '10px 10px 5px 10px',
                height: '125px',
                width: window.innerWidth - playerPanelContainerWidth, // todo: this is not reactive
                overflow: "scroll",
            }}
        >
            <FrameList
                // frameList={storyboardData.frameList}
                // frameList={curFrameList}
                frameList={frameList}
                _id={null}
                handleDelete={null}
                handleAdd={null}
            />
        </div>
    )
}

export default FrameListContainer;
