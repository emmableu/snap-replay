import {MenuItem} from "@mui/material";
import {makeStyles} from "@mui/styles";
import React from "react";
import CardActionArea from "@mui/material/CardActionArea";
import StaticFrame from "./StaticFrame";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card/Card";
import globalConfig from "../../globalConfig";
import {useDispatch, useSelector} from "react-redux";

const useStyles = makeStyles((theme) => ({
    paper: {
        height: globalConfig.responsiveSizeData.frameListPaperHeight,
        backgroundColor: "white",
        width: globalConfig.responsiveSizeData.frameListPaperHeight*4/3
    },

}));


const StaticFrameContainer = React.memo((props) => {
    const classes = useStyles();
    const {frameData, frameIndex, _id} = props;


    return (
        <Grid  item key={frameIndex}>
            <Card variant="outlined"
                  className={classes.paper}
            >
                <StaticFrame
                    key={_id}
                    frameData={frameData}
                />
            </Card>
        </Grid>

    )
});

export default StaticFrameContainer;
