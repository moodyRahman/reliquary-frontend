import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        authToken: "",
        refreshToken: "",
        isLoggedIn: false,
        oauthserver: "",
        name: ""
    },
    reducers: {
        setAuth: (state, action) => {
            state.authToken = action.payload;
            state.isLoggedIn = true;
        },
        setRefresh: (state, action) => {
            state.refreshToken = action.payload
        },
        setTokens:(state, action) => {

        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.authToken = ""
            state.refreshToken = ""
        },
        setName: (state, action) => {
            state.name = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setAuth, setRefresh, logout, setName } = authSlice.actions

export default authSlice.reducer
