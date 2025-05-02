import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";


const navBar = createSlice(
    {
        name:'navBar',
        initialState:false,
        reducers:{
            bgColor:(state=false,action)=>{
               return state=action.payload;
            }
        }
    }
)



const store = configureStore({
    reducer:{
        navBar:navBar.reducer
    }
})

export const navBarAction = navBar.actions;

export default store;