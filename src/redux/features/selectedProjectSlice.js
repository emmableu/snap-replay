import { createSlice} from '@reduxjs/toolkit'


export const selectedProjectSlice = createSlice({
    name: 'selectedProjectSlice',
    initialState: {
        data: {
            selected: "Panda Eats Bamboos",
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
