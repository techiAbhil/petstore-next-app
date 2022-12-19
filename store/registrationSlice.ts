import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface IRegistrationState {
    email: string;
    password: string;
}

const initialState: IRegistrationState = {
    email: '',
    password: '',
};

export const registrationSlice = createSlice({
    name: 'registration',
    initialState,
    reducers: {
        setRegistrationState: (
            state,
            {
                payload,
            }: PayloadAction<{
                email: string;
                password: string;
            }>
        ) => {
            state.email = payload.email;
            state.password = payload.password;
        },
    },
});

export const { setRegistrationState } = registrationSlice.actions;

export default registrationSlice.reducer;
