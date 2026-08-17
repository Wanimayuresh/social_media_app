import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type AuthStatus = "initializing"|"authenticated"|"unauthenticated";

interface AuthState {
    status:AuthStatus
    accessToken:string|null
}

const initialState :AuthState ={
    status:"initializing",
    accessToken:null
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setAuthenticated(state,action:PayloadAction<string>){
            state.status = "authenticated";
            state.accessToken = action.payload
        },
        setUnauthenticated(state){
            state.status = "unauthenticated"
            state.accessToken=null
        }
    }
})

export const { setAuthenticated,setUnauthenticated } = authSlice.actions;

export default authSlice.reducer;