import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface IRegistrationState {
    us_email: string;
    us_phone: string;
}

const initialState: IRegistrationState = {
    us_email: '',
    us_phone: '',
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
                us_email: string;
                us_phone: string;
            }>
        ) => {
            state.us_email = payload.us_email;
            state.us_phone = payload.us_phone;
        },
        clearLogoutState: () => {},
    },
});

export const { setRegistrationState, clearLogoutState } =
    registrationSlice.actions;

export default registrationSlice.reducer;
