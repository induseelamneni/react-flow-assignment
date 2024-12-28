import {configureStore} from "@reduxjs/toolkit"
import nodeReducer  from "./nodeSlice"


const store = configureStore(
    {
       reducer:{
        node: nodeReducer,
        
       }
    }
)

export default store