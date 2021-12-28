import { createSlice} from '@reduxjs/toolkit'


export const rectSlice = createSlice({
    name: 'rectSlice',
    initialState: {
        data: {
            leftPanelSize: 400,
        },
    },
    reducers: {
        setRect: (state, action) => {
            const {type, value} = action.payload;
            state.data[type] = value;
        }
    }
})

export const {setRect} = rectSlice.actions;
export default rectSlice.reducer;
