import { configureStore, combineReducers } from "@reduxjs/toolkit";
import FilterWindowSlice from '@/app/redux/Slices/FilterWindowSlice'
import DownloadVideosSlice from '@/app/redux/Slices/DownloadVideosSlice'
const RootReducers = combineReducers({
    FilterWindow: FilterWindowSlice,
    DownloadVideos: DownloadVideosSlice,
})

export const store = configureStore({
    reducer: RootReducers
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;