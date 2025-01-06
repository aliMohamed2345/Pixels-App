import { createSlice } from "@reduxjs/toolkit"
import { VideosProps } from "@/app/(pages)/videos/page";
export interface DownloadVideosProps {
    src: string;
    videos: VideosProps
    tags: string;
}

const initialState: DownloadVideosProps = {
    src: '',
    videos: {
        large: { url: '', width: 0, height: 0, size: 0, thumbnail: '' },
        medium: { url: '', width: 0, height: 0, size: 0, thumbnail: '' },
        small: { url: '', width: 0, height: 0, size: 0, thumbnail: '' },
        tiny: { url: '', width: 0, height: 0, size: 0, thumbnail: '' },
    },
    tags: ''
}

const DownloadVideosSlice = createSlice({
    name: `DownloadVideos`,
    initialState,
    reducers: {
        setTags: (state, action) => {
            state.tags = action.payload
        },
        setSrc: (state, action) => {
            state.src = action.payload
        },
        setVideos: (state, action) => {
            state.videos = action.payload
        }
    }
})
export const { setSrc, setTags, setVideos } = DownloadVideosSlice.actions
export default DownloadVideosSlice.reducer;