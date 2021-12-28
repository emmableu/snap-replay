import { createSlice} from '@reduxjs/toolkit'


export const rectSlice = createSlice({
    name: 'rectSlice',
    initialState: {
        data: {

        },
    },
    reducers: {
        setData: (state, action) => {
            const {type, value} = action.payload;
            state.data[type] = value;
        }
    }
})

export const {setData} = rectSlice.actions;
export default rectSlice.reducer;
