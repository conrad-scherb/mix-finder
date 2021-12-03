import FindMixButton from "./FindMixButton";

interface FindMixContainerProps {
    trackOneURL: string | undefined;
    trackTwoURL: string | undefined;
    findMix: (url: string) => Promise<void>;
}

function FindMixContainer(props: FindMixContainerProps) {
    return (
        <div className="flex flex-row justify-center bg-gray-900">
            <FindMixButton trackOneURL={props.trackOneURL} trackTwoURL={props.trackTwoURL} findMix={props.findMix}/>
        </div>
    )
}

export default FindMixContainer;