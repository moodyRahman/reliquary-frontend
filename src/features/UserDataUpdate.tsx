import { createSlice, PayloadAction } from '@reduxjs/toolkit'


interface userState {
    characters: any,
}

const initialState: userState = {
    characters: {},
}

export const userDataSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setCharacters: (state, action:PayloadAction<any>) => {
            state.characters = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setCharacters } = userDataSlice.actions

export default userDataSlice.reducer
export type { userState }
