import { createSlice } from "@reduxjs/toolkit";

interface fetchState {
    duration: number;
};

const initialState: fetchState = {
    duration: 0,
};

const durationSlice = createSlice({
    name: "duration",
    initialState,
    reducers: {},
});

//export const { setUsername } = durationSlice.actions;

export default durationSlice.reducer;