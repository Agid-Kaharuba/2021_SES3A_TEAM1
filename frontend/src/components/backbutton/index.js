import React from "react";
import { useHistory } from "react-router-dom";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { IconButton } from "@material-ui/core";

export default function BackButton(props) {
    const history = useHistory();

    const handleBack = () => {
        props.handleBack === undefined ? history.goBack() : props.handleBack();
    }

    return (
        <div>
            <IconButton onClick={handleBack}>
                <ArrowBackIcon></ArrowBackIcon>
            </IconButton>
        </div>
    )
}