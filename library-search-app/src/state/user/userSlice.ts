import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
	username: string;
};

const initialState: UserState = {
	username: '',
};

const userSlice = createSlice({
	name: "username",
	initialState,
	reducers: {
		signIn: (state, action: PayloadAction<string>) => {
			state.username = action.payload;
		},
		signOut: (state) => {
			state.username = '';
		},
	},
});

export const { signIn, signOut } = userSlice.actions;

export default userSlice.reducer;

