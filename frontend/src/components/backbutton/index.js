import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";

export default function BackButton(props) {
    const history = useHistory();

    const handleBack = () => {
        props.handleBack === undefined ? history.goBack() : props.handleBack();
    }

    return (
        <div data-testid = "backButtonTest">
            <Button Button variant="contained" color="secondary" onClick={handleBack}>
                Back
            </Button>
        </div>
    )
}