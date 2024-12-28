import { createSlice } from "@reduxjs/toolkit";

const nodeSlice = createSlice({
    name:'node',
    initialState:null,
    reducers:{
        addNode:(state, action) => {
            return action.payload


        },
        removeNode:(state,action)=>{
            return null
        }
    }
    
})

export const {addNode, removeNode} = nodeSlice.actions

export default nodeSlice.reducer