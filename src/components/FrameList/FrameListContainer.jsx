import FrameList from "./FrameList";
import React from "react";
import {useSelector} from "react-redux";

const FrameListContainer = () => {
    const frameList = useSelector(state => {return state.trace.data.frameList});

    return (
        <div
            style={{
                // padding: '10px 10px 5px 10px',
                height: '125px',
            }}
        >
            <FrameList
                // frameList={storyboardData.frameList}
                frameList={ [
                    {
                        "_id": "f7770583-5d1e-4ad8-82c0-121d1f363476",
                        "backdropStar": {
                            "actorId": "Stage",
                            "prototypeId": "static/project/carousel/cd21514d0531fdffb22204e0ec5ed84a.svg",
                            "width": 2.0,
                            "height": 2.0,
                            "x": 239.0,
                            "y": 179.0
                        },
                        "starList": [
                            {
                                "actorId": "Untitled Diagram (9)",
                                "prototypeId": "static/project/carousel/241ce86138ef0adf2f7b5871a0a69ee7.svg",
                                "width": 77.0,
                                "height": 77.0,
                                "x": 401.5,
                                "y": 137.5,
                                "childStar": {
                                    "speechStar": null,
                                    "lineStar": null,
                                    "motionStarList": []
                                }
                            },
                            {
                                "actorId": "Untitled Diagram (8)",
                                "prototypeId": "static/project/carousel/678d4e76bb41694351709d8f16a30dd5.svg",
                                "width": 77.0,
                                "height": 77.0,
                                "x": 2.5,
                                "y": 141.5,
                                "childStar": {
                                    "speechStar": null,
                                    "lineStar": null,
                                    "motionStarList": []
                                }
                            },
                            {
                                "actorId": "color-hex-6",
                                "prototypeId": "static/project/carousel/5f96ef7aefc143a5cfb605af4caa562c.svg",
                                "width": 1137.16482,
                                "height": 1137.16482,
                                "x": 121.41759000000002,
                                "y": -378.58241,
                                "childStar": {
                                    "speechStar": null,
                                    "lineStar": null,
                                    "motionStarList": []
                                }
                            }
                        ]
                    },
                    {
                        "_id": "cd3c6df8-2eda-45e1-97d6-c3d4cf0f2ba9",
                        "backdropStar": {
                            "actorId": "Stage",
                            "prototypeId": "static/project/carousel/cd21514d0531fdffb22204e0ec5ed84a.svg",
                            "width": 2.0,
                            "height": 2.0,
                            "x": 239.0,
                            "y": 179.0
                        },
                        "starList": [
                            {
                                "actorId": "Untitled Diagram (9)",
                                "prototypeId": "static/project/carousel/241ce86138ef0adf2f7b5871a0a69ee7.svg",
                                "width": 77.0,
                                "height": 77.0,
                                "x": 401.5,
                                "y": 137.5,
                                "childStar": {
                                    "speechStar": null,
                                    "lineStar": null,
                                    "motionStarList": []
                                }
                            },
                            {
                                "actorId": "Untitled Diagram (8)",
                                "prototypeId": "static/project/carousel/678d4e76bb41694351709d8f16a30dd5.svg",
                                "width": 77.0,
                                "height": 77.0,
                                "x": 2.5,
                                "y": 141.5,
                                "childStar": {
                                    "speechStar": null,
                                    "lineStar": null,
                                    "motionStarList": []
                                }
                            },
                            {
                                "actorId": "color-hex-6",
                                "prototypeId": "static/project/carousel/5f96ef7aefc143a5cfb605af4caa562c.svg",
                                "width": 1137.16482,
                                "height": 1137.16482,
                                "x": 454.41759,
                                "y": -378.58241,
                                "childStar": {
                                    "speechStar": null,
                                    "lineStar": null,
                                    "motionStarList": []
                                }
                            }
                        ]
                    }
                ]}
                _id={null}
                handleDelete={null}
                handleAdd={null}
            />
        </div>
    )
}

export default FrameListContainer;
