import React from "react";
import "../styles/tailwind.output.css"
import TrackContainer from "./TrackContainer";

interface TrackSelectionContainerProps {
    updateTrackOneURL: (track: string | undefined) => void;
    updateTrackTwoURL: (track: string | undefined) => void;
}

function TrackSelectionContainer(props: TrackSelectionContainerProps) {
    return (
        <div className="flex flex-row px-4 pb-4 bg-gray-900">
            <TrackContainer updateTrackURL={(trackURL: string | undefined) => props.updateTrackOneURL(trackURL)}/>
            <div style={{width: "20px"}}></div>
            <TrackContainer updateTrackURL={(trackURL: string | undefined) => props.updateTrackTwoURL(trackURL)}/>
        </div>
    )
}

export default TrackSelectionContainer;