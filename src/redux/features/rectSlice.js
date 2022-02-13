import { createSlice} from '@reduxjs/toolkit'

const playerPanelWidth = 500;
const oneSidePadding = 25;


export const rectSlice = createSlice({
    name: 'rectSlice',
    initialState: {
        data: {
            playerPanelContainerWidth: 450,
            goalPadWidth: 150,
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
