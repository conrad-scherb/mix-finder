import { Track } from "1001-tracklists-scraper";
import React from "react";
import "../styles/tailwind.output.css"
import TrackContainer from "./TrackContainer";

interface TrackSelectionContainerProps {
    updateTrackOneURL: (track: string | undefined) => void;
    updateTrackTwoURL: (track: string | undefined) => void;
    tracksArray: Track[];
}

function TrackSelectionContainer(props: TrackSelectionContainerProps) {
    return ( 
        <div className="flex flex-row px-4 pb-4 bg-gray-900">
            <TrackContainer updateTrackURL={(trackURL: string | undefined) => props.updateTrackOneURL(trackURL)}/>
            <div style={{width: "20px"}}></div>
            <div className="flex-grow flex-shrink-0 bg-gray-700 min-h-full p-4 rounded-xl" style={{width: "45%", height: "508px"}}>
                {props.tracksArray.map((track: Track) => {
                    return(
                    <div>
                        {track && <div className={`rounded-xl border-4 bg-white border-gray-400 p-2 my-2`}>
                                {`${track.artist ?? "ID"} - ${track.title ?? "ID"}`}
                        </div>}
                    </div>)
                })}
            </div>
        </div>
    )
}

export default TrackSelectionContainer;