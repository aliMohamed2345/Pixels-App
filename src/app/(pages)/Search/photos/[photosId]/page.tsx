'use client'
import { useSearchParams } from "next/navigation";

const PhotoId = () => {
    const query = useSearchParams().get('q');
    return (<>
        <div>

            you have searched about {query}
        </div>
    </>);
}

export default PhotoId;