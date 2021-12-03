import { useState } from "react";
import { searchTracks, Track, TrackSearchResult } from "1001-tracklists-scraper"
import TrackInSearch from "./TrackInSearch";
import "../styles/tailwind.output.css"

interface SingleTrackSearchProps {
    updateTrackURL: (trackURL: string | undefined) => void;
    tracksArray: Track[];
}

function SingleTrackSearch(props: SingleTrackSearchProps) {
    const [query, setQuery] = useState("");
    const [selected, setSelected] = useState<number | undefined>(undefined);
    const [searchResults, setSearchResults] = useState<TrackSearchResult[] | undefined>(undefined);

    return (
        <div className="flex-grow flex-shrink-0 bg-gray-700 min-h-full pt-6 px-20 w-full" style={{height: "900x"}}>
            <div className="flex flex-col h-full">
                <input className="w-full rounded-xl border-2 p-2 h-12" type="text" placeholder="Enter a track name..." value={query} onChange={e => {
                    setQuery(e.target.value);
                    setSelected(undefined);
                    searchTracks(e.target.value, 5).then((res) => {
                        setSearchResults(res);
                    });
                }}/> 

                <div className="grid grid-cols-5 gap-x-4">
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
                        <div className="flex h-12 col-span-5 justify-center items-center">
                            <em className="text-white">No track found</em>
                        </div>
                    }

                    {props.tracksArray.map((track: Track) => {
                        if (track) {
                            return(
                                <div className={`flex flex-col justify-center items-center rounded-xl border-2 bg-white border-gray-400 p-2 my-2`} style={{height: "200px"}}>
                                        {track.artwork 
                                            ? <img src={track.artwork} style={{height: "130px"}} alt=""/>
                                            : <div className="flex items-center" style={{height: "130px"}}><em >No artwork found</em></div>
                                        }
                                        <strong>{track.title?.replaceAll("&amp;", "&")}</strong>
                                        {track.artist?.replaceAll("&amp;", "&")}
                                </div>
                            )
                        } 
                        return null;
                    })}
                    </div>
            </div>
        </div>
    );
}

export default SingleTrackSearch;