import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { IDefaultAPIUtils } from '../utils/common';
import { API_ERROR_MSG } from '../utils/constants';

export interface IPetDetails {
    mp_id: string;
    us_id: string;
    mp_name: string;
    mp_type: number;
    mp_breed: number;
    mp_dob: string;
    mp_gender: number;
    mp_neutered: string;
    mp_weight: 25;
    mp_weight_units: string;
    mp_blood_type: string;
    mp_food_allergies: string;
    mp_image: string;
    mp_chip_no: string;
    mp_reg_no: string;
}

export interface IUserPet {
    age: string;
    gender: string;
    imgUrl: string;
    name: string;
    petId: string;
}

export interface IUserDashboard extends IDefaultAPIUtils {
    petDetails: Record<string, IPetDetails>;
    pets: IUserPet[];
    reminders: {
        reminder_id: number;
        reminder_title: string;
        reminder_date: string;
        reminder_time: string;
    }[];
    family: {
        article_id: number;
        article_title: string;
        article_poster_url: string;
    }[];
}

const initialState: IUserDashboard = {
    family: [],
    petDetails: {},
    pets: [],
    reminders: [],

    error: null,
    isError: false,
    isLoading: false,
};

export const getUserDashboardData = createAsyncThunk(
    'getUserDashboardData',
    async (_params: any = undefined, thunkAPI) => {
        try {
            const data: any = await axios.get('/user/dashboard');
            if (data?.status === true) {
                return data?.dashboard;
            }

            throw new Error(API_ERROR_MSG);
        } catch (e) {
            console.log('error in getPetsMetaData = ', e);
            return thunkAPI.rejectWithValue(e);
        }
    }
);

const userDashboardSlice = createSlice({
    name: 'userDashboardData',
    initialState,
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addCase(getUserDashboardData.pending, (state) => {
                state.error = null;
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(
                getUserDashboardData.rejected,
                (state, { payload }: any) => {
                    let e = API_ERROR_MSG;
                    if (
                        payload?.message &&
                        typeof payload?.message === 'string'
                    ) {
                        e = payload.message;
                    }
                    state.error = e;
                    state.isError = true;
                    state.isLoading = false;
                }
            )
            .addCase(
                getUserDashboardData.fulfilled,
                (state, { payload }: PayloadAction<IUserDashboard>) => {
                    state.error = null;
                    state.isError = false;
                    state.isLoading = false;
                    state.family = payload.family;
                    state.petDetails = payload.petDetails;
                    state.pets = payload.pets;
                    state.reminders = payload.reminders;
                }
            ),
});

export default userDashboardSlice.reducer;
