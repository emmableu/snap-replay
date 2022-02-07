import { createSlice} from '@reduxjs/toolkit'
import Cookies from "js-cookie";



export const userIdSlice = createSlice({
    name: 'userIdSlice',
    initialState: {data: Cookies.get("userId")},
    reducers: {
        setUserId: (state, action) => {
            state.data = action.payload;
            Cookies.set("userId", action.payload);
        },
        clearUserId: (state, action) => {
            state.data = undefined;
            Cookies.remove("userId");
        },
    },
})

export const { setUserId, clearUserId } = userIdSlice.actions
export default userIdSlice.reducer
