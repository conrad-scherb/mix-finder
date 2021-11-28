import React from "react";
import "../styles/tailwind.output.css"
import TrackContainer from "./TrackContainer";

function TrackSelectionContainer() {
    return (
        <div className="flex flex-row">
            <TrackContainer/>
            <div style={{width: "20px"}}></div>
            <TrackContainer/>
        </div>
    )
}

export default TrackSelectionContainer;