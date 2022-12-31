import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type IUser = {
    us_email: string;
    us_address: string;
    us_city: string;
    us_country: string;
    us_full_name: string;
    us_phone: string;
    us_profile_image: string;
    us_otp_verified: string;
    status: string;
};

const initialState: IUser = {
    us_email: '',
    us_address: '',
    us_city: '',
    us_country: '',
    us_full_name: '',
    us_phone: '',
    us_profile_image: '',
    us_otp_verified: '',
    status: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetUserState: () => initialState,
        setUserState: (state, action: PayloadAction<IUser>) => {
            return action.payload;
        },
    },
});

export const { resetUserState, setUserState } = userSlice.actions;

export default userSlice.reducer;
