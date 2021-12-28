import { configureStore } from '@reduxjs/toolkit';
import {rectSlice} from "./features/rectSlice";

export default configureStore({
   reducer: {
       rect: rectSlice
   }
});
