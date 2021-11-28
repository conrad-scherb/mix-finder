import { TrackSearchResult } from "1001-tracklists-scraper"

interface TrackInSearchProps {
    result: TrackSearchResult
    selected: boolean
}

function TrackInSearch(props: TrackInSearchProps) {

    return(
        <div className={`rounded-xl border-2 bg-white p-2 my-2 ${props.selected ? "border-blue-500" : "hover:border-blue-300"}`}>
            <strong>{props.result.artist}</strong>
            <br/>
            {props.result.trackName}
        </div>
    )
}

export default TrackInSearch;