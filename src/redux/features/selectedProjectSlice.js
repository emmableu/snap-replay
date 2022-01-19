import { createSlice} from '@reduxjs/toolkit'


export const selectedProjectSlice = createSlice({
    name: 'selectedProjectSlice',
    initialState: {
        data: {
            selected: "02-Boat Race",
        }
    },
    reducers: {
        setSelectedProject: (state, action) => {
            state.data.selected = action.payload;
        }
    }
})

export const {setSelectedProject} = selectedProjectSlice.actions;
export default selectedProjectSlice.reducer;
