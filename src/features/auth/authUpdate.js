import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        authToken: "",
        refreshToken: "",
        isLoggedIn: false,
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
export const { increment, decrement, incrementByAmount } = authSlice.actions

export default authSlice.reducer