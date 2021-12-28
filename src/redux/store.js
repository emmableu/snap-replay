import { configureStore } from '@reduxjs/toolkit';
import rectSlice from "./features/rectSlice.js";

const store = configureStore({
   reducer: {
       rect: rectSlice
   }
});

export default store;
