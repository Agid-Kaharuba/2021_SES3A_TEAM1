import React from "react"
import CircularProgress from "@material-ui/core/CircularProgress"

export default function LoadingSpinner() {

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <CircularProgress color="primary" />
    </div>
    )
}