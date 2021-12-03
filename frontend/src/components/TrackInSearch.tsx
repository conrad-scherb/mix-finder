import { TrackSearchResult } from "1001-tracklists-scraper"

interface TrackInSearchProps {
    result: TrackSearchResult
    selected: boolean
}

function TrackInSearch(props: TrackInSearchProps) {
    return(
        <div className={`flex flex-col justify-center items-center text-sm h-12 rounded-xl border-2 bg-white border-gray-400 my-2 ${props.selected ? "border-green-500" : "hover:border-green-300"}`}>
                <strong>{props.result.trackName}</strong>
                {props.result.artist}
        </div>
    )
}

export default TrackInSearch;