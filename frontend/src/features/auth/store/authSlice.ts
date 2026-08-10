import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type AuthStatus = "initializing"|"authenticated"|"unauthenticated";

interface AuthState {
    status:AuthStatus
}

const initialState :AuthState ={
    status:"initializing"
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setAuthStatus(state,action:PayloadAction<AuthStatus>){
            state.status = action.payload
        }
    }
})

export const { setAuthStatus } = authSlice.actions;

export default authSlice.reducer;