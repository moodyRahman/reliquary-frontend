import { createSlice } from '@reduxjs/toolkit'

export const testSlice = createSlice({
    name: 'test',
    initialState: {
        counter: 0,
        name: ""
    },
    reducers: {
        increment: (state, action) => {
            state.counter = state.counter + 1;
        }
    },
})

// Action creators are generated for each case reducer function
export const { increment } = testSlice.actions

export default testSlice.reducer
