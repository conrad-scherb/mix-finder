import FindMixButton from "./FindMixButton";

interface FindMixContainerProps {
    trackOneURL: string | undefined;
    trackTwoURL: string | undefined;
}

function FindMixContainer(props: FindMixContainerProps) {
    return (
        <div className="flex flex-row justify-center bg-gray-900">
            <FindMixButton trackOneURL={props.trackOneURL} trackTwoURL={props.trackTwoURL}/>
        </div>
    )
}

export default FindMixContainer;