import { createSlice, PayloadAction } from '@reduxjs/toolkit'


interface authState {
    accessToken: string,
    refreshToken: string,
    isLoggedIn: boolean,
    oauthserver: string,
    username: string
}

const initialState: authState = {
    accessToken: "",
    refreshToken: "",
    isLoggedIn: false,
    oauthserver: "",
    username: ""
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setAuth: (state, action:PayloadAction<string>) => {
            state.accessToken = action.payload;
            state.isLoggedIn = true;
        },
        setRefresh: (state, action) => {
            state.refreshToken = action.payload
        },
        setTokens:(state, action:PayloadAction<{refresh_token:string, access_token:string, username:string}>) => {
            state.accessToken = action.payload.access_token;
            state.refreshToken = action.payload.refresh_token;
            state.username = action.payload.username
            state.isLoggedIn = true;

        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.accessToken = ""
            state.refreshToken = ""
        },
        setName: (state, action) => {
            state.username = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setAuth, setRefresh, setTokens, logout, setName } = authSlice.actions

export default authSlice.reducer
export type { authState }