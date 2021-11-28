import { getTrack } from "1001-tracklists-scraper";

interface FindMixButtonProps {
    trackOneURL: string | undefined;
    trackTwoURL: string | undefined;
}

function FindMixButton(props: FindMixButtonProps) {
    return (
        <div className="py-1 px-4 rounded-xl bg-green-500" onClick={() => {
            const trackOne = props.trackOneURL?.replace("https://www.1001tracklists.com/track/", "");
            const trackTwo = props.trackTwoURL?.replace("https://www.1001tracklists.com/track/", "");

            if (trackOne && trackTwo) {

            }
        }}>Find Mix</div>
    )
}

export default FindMixButton