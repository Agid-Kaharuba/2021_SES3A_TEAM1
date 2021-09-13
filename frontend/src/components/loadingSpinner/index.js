import React from "react"
import CircularProgress from "@material-ui/core/CircularProgress"

export default function LoadingSpinner() {

  return (
    <div data-testid = "LoadingSpinnerTest" style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <CircularProgress color="primary" />
    </div>
    )
}