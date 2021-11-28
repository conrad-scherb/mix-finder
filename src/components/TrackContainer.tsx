import { useState } from "react";
import { searchTracks, TrackSearchResult } from "1001-tracklists-scraper"
import TrackInSearch from "./TrackInSearch";

interface TrackContainerProps {
    updateTrackURL: (trackURL: string | undefined) => void;
}

function TrackContainer(props: TrackContainerProps) {
    const [query, setQuery] = useState("");
    const [selected, setSelected] = useState<number | undefined>(undefined);
    const [searchResults, setSearchResults] = useState<TrackSearchResult[] | undefined>(undefined);

    return (
        <div className="flex-grow flex-shrink-0 bg-gray-700 min-h-full p-4 rounded-xl" style={{width: "45%", height: "508px"}}>
            <div className="flex flex-col h-full">
                <input className="w-full rounded-xl border-2 p-2" type="text" placeholder="Enter a track name..." value={query} onChange={e => {
                    setQuery(e.target.value);
                    setSelected(undefined);
                    searchTracks(e.target.value, 5).then((res) => {
                        setSearchResults(res);
                    });
                }}/> 

                {searchResults?.map((res, i) => {
                    return(
                        <div onClick={() => {
                            setSelected(i);
                            props.updateTrackURL(res.url);
                        }}>
                            <TrackInSearch result={res} selected={i === selected}/>
                        </div>
                    )
                })}

                {(query !== "" && searchResults === undefined) && 
                    <div className="flex flex-grow w-full justify-center items-center">
                        <em className="text-gray-700">No track found</em>
                    </div>
                }
            </div>
        </div>
    );
}

export default TrackContainer;