import { createSlice } from '@reduxjs/toolkit'

export const testSlice = createSlice({
    name: 'test',
    initialState: {
        counter: 0,
        name: "test",
    },
    reducers: {
        increment: (state, action) => {
            state.counter = state.counter + 1;
            state.name = `${state.counter}mmm`;
        },
        setName: (state, action) => {
            state.name = `${action.payload}mmm`;
        }

    },
})

// Action creators are generated for each case reducer function
export const { increment, setName } = testSlice.actions

export default testSlice.reducer
