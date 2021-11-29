import { TrackSearchResult } from "1001-tracklists-scraper"

interface TrackInSearchProps {
    result: TrackSearchResult
    selected: boolean
}

function TrackInSearch(props: TrackInSearchProps) {

    return(
        <div className={`rounded-xl border-4 bg-white border-gray-400 p-2 my-2 ${props.selected ? "border-green-500" : "hover:border-green-300"}`}>
            <strong>{props.result.artist}</strong>
            <br/>
            {props.result.trackName}
        </div>
    )
}

export default TrackInSearch;