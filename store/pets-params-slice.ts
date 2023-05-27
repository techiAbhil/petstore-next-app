import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { IDefaultAPIUtils } from '../utils/common';
import { API_ERROR_MSG } from '../utils/constants';

export interface IPetsMetaData extends IDefaultAPIUtils {
    breeds: {
        br_id: number;
        br_title: string;
        pc_id: number;
        status: string;
    }[];
    genders: {
        gn_id: number;
        gn_title: string;
        status: string;
    }[];
    petTypes: {
        pc_id: number;
        pc_title: string;
        pc_icon_path: string;
        pc_display_order: number;
        status: string;
    }[];
}

const initialState: IPetsMetaData = {
    breeds: [],
    genders: [],
    petTypes: [],
    error: null,
    isError: false,
    isLoading: false,
};

export const getPetsMetaData = createAsyncThunk(
    'getPetsMeta',
    async (_params: any = undefined, thunkAPI) => {
        try {
            const data: any = await axios.get('/pet/params');
            if (data?.status === true) {
                return data;
            }

            throw new Error(API_ERROR_MSG);
        } catch (e) {
            console.log('error in getPetsMetaData = ', e);
            return thunkAPI.rejectWithValue(e);
        }
    }
);

const petsMetaDataSlice = createSlice({
    name: 'petsMetaData',
    initialState,
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addCase(getPetsMetaData.pending, (state) => {
                state.error = null;
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(getPetsMetaData.rejected, (state, { payload }: any) => {
                let e = API_ERROR_MSG;
                if (payload?.message && typeof payload?.message === 'string') {
                    e = payload.message;
                }
                state.error = e;
                state.isError = true;
                state.isLoading = false;
            })
            .addCase(
                getPetsMetaData.fulfilled,
                (state, { payload }: PayloadAction<IPetsMetaData>) => {
                    state.error = null;
                    state.isError = false;
                    state.isLoading = false;
                    state.breeds = payload.breeds;
                    state.genders = payload.genders;
                    state.petTypes = payload.petTypes;
                }
            ),
});

export default petsMetaDataSlice.reducer;
