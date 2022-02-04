import { createSlice} from '@reduxjs/toolkit'


export const exampleCollectionSlice = createSlice({
    name: 'exampleCollectionSlice',
    initialState: {
        data: [],
        selectedId: null,
    },
    reducers: {
        setExample: (state, action) => {
            const {_id, attr, val} = action.payload;
            const idx = state.data.filter(d => d._id === _id)[0];
            if (idx > -1) {
                state.data[idx][attr] = val;
            }
        },

        addExample: (state, action) => {
            state.data.unshift(action.payload);
            console.log("addExample", state.data);
        },

        deleteExample: (state, action) => {
            const {_id} = action.payload;
            const idx = state.data.filter(d => d._id === _id)[0];
            if (idx > -1) {
                state.data.splice(idx, 1);
            }
        },

        loadExample: (state, action) => {
            const {_id} = action.payload;
            const idx = state.data.filter(d => d._id === _id)[0];
            if (idx > -1) {
                window.notebookIde.interpretReqAnchors(state.data[idx].xml);
            }
        },

        setSelectedExampleId: (state, action) => {
            const {_id} = action.payload;
            state.selectedId = _id;
        }
    }
})

export const {setExample,addExample,deleteExample,loadExample,
            setSelectedExampleId
} = exampleCollectionSlice.actions;
export default exampleCollectionSlice.reducer;
