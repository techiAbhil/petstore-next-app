import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { IDefaultAPIUtils } from '../utils/common';
import { API_ERROR_MSG } from '../utils/constants';

export interface IMarketPlaceData extends IDefaultAPIUtils {
    articleCategories: any[] | null;
}

const initialState: IMarketPlaceData = {
    articleCategories: null,
    error: null,
    isError: false,
    isLoading: false,
};

export const getMyPetOSPhareeData = createAsyncThunk(
    'getMyPetOSphareDetails',
    async (_params: any = undefined, thunkAPI) => {
        try {
            const data: any = await axios.get('/petfamily/home');
            if (data?.status === true) {
                return data;
            }

            throw new Error(API_ERROR_MSG);
        } catch (e) {
            console.log('error in getMyPetOSphareDetails = ', e);
            return thunkAPI.rejectWithValue(e);
        }
    }
);

const myPetOSphareSlice = createSlice({
    name: 'myPetOSphareData',
    initialState,
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addCase(getMyPetOSPhareeData.pending, (state) => {
                state.error = null;
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(
                getMyPetOSPhareeData.rejected,
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
                getMyPetOSPhareeData.fulfilled,
                (state, { payload }: PayloadAction<IMarketPlaceData>) => {
                    state.error = null;
                    state.isError = false;
                    state.isLoading = false;
                    state.articleCategories =
                        payload?.articleCategories ?? null;
                }
            ),
});

export default myPetOSphareSlice.reducer;
