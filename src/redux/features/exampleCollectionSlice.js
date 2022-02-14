import { createSlice} from '@reduxjs/toolkit'

const idLst = ["move_with_key", "spawn_of_clones", "shoot_when_space_key_pressed",
    "move_slowly_leftwards", "destroy_clone_on_touch", "rotate_actor_on_touch", "destroy_clone_on_edge" ];
const loadLocalStorageData = (idLst) =>   {
    let data = {};
    for (const id of idLst) {
        data[id] = localStorage.getItem(id)
    }
    return data;
}


export const exampleCollectionSlice = createSlice({
    name: 'exampleCollectionSlice',
    initialState: {
        idLst,
        data: loadLocalStorageData(idLst),
        selectedId: "move_with_key",
    },
    reducers: {
        setExample: (state, action) => {
            const {_id, xml} = action.payload;
            // console.log("setExample: ", {_id, xml});
            // const idx = state.data.filter(d => d._id === _id)[0];
            // if (idx > -1) {
            //     state.data[idx][attr] = val;
            // }
            window.localStorage.setItem(_id, xml);
            state.data[_id] = xml;
        },

        // addExample: (state, action) => {
        //     state.data.unshift(action.payload);
        //     console.log("addExample", state.data);
        // },

        deleteExample: (state, action) => {
            const {_id} = action.payload;
            const idx = state.data.filter(d => d._id === _id)[0];
            if (idx > -1) {
                state.data.splice(idx, 1);
            }
        },

        loadExample: (state, action) => {
            const {_id} = action.payload;
            // const idx = state.data.filter(d => d._id === _id)[0];
            window.notebookIde.interpretReqAnchors(state.data[_id]);
        },

        setSelectedExampleId: (state, action) => {
            const {_id} = action.payload;
            state.selectedId = _id;
        },

        download: (state, action) => {
            function downloadFile(content, fileName, contentType) {
                const a = document.createElement("a");
                const file = new Blob([content], { type: contentType });
                a.href = URL.createObjectURL(file);
                a.download = fileName;
                a.click();
            }
            downloadFile(JSON.stringify(state.data), "example-collection.json", "text/plain");
        }
    }
})

export const {setExample,addExample,deleteExample,loadExample,
            setSelectedExampleId, download,
} = exampleCollectionSlice.actions;
export default exampleCollectionSlice.reducer;
