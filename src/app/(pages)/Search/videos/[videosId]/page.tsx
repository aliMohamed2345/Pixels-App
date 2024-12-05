'use client'
import { useSearchParams } from "next/navigation";

const VideoId = () => {
    const query = useSearchParams().get('q');
    return (<>
        <div>
            you have searched about {query} video section
        </div>
    </>);
}

export default VideoId;