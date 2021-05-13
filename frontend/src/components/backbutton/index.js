import React from "react";
import {useHistory} from "react-router-dom";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { IconButton } from "@material-ui/core";

export default function BackButton() {
    const history = useHistory();

    return(
        <div>
            <IconButton onClick={() => history.goBack()}>
                <ArrowBackIcon></ArrowBackIcon>
            </IconButton>
        </div>
    )
}