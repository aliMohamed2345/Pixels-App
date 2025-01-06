import { createSlice } from "@reduxjs/toolkit"
interface filterDataProps {
    pathName: string,
    searchQuery: string,
}

const initialState: filterDataProps = {
    pathName: '',
    searchQuery: ''
}

const FilterWindowSlice = createSlice({
    name: `FilterWindow`,
    initialState,
    reducers: {
        setPathName: (state, action) => {
            state.pathName = action.payload
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload
        },
    }
})
export const { setPathName, setSearchQuery } = FilterWindowSlice.actions
export default FilterWindowSlice.reducer;