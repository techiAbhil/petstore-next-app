import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { IDefaultAPIUtils } from '../utils/common';
import { API_ERROR_MSG } from '../utils/constants';

export interface IProductCatogeries extends IDefaultAPIUtils {
    categories: {
        prc_id: number;
        prc_title: string;
    }[];
}

const initialState: IProductCatogeries = {
    categories: [],
    error: null,
    isError: false,
    isLoading: false,
};

export const getProductCategoriesByPetID = createAsyncThunk(
    'getMyMarketplaceDetails',
    async (petID: any, thunkAPI) => {
        try {
            const data: any = await axios.get(
                `marketplace/pet-category/${petID}/product-categories`
            );
            if (data?.status === true) {
                return data;
            }

            throw new Error(API_ERROR_MSG);
        } catch (e) {
            console.log('error in getMyMarketplaceDetails = ', e);
            return thunkAPI.rejectWithValue(e);
        }
    }
);

const productCategoriesByPetId = createSlice({
    name: 'productCategories',
    initialState,
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addCase(getProductCategoriesByPetID.pending, (state) => {
                state.error = null;
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(
                getProductCategoriesByPetID.rejected,
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
                getProductCategoriesByPetID.fulfilled,
                (state, { payload }: PayloadAction<IProductCatogeries>) => {
                    state.error = null;
                    state.isError = false;
                    state.isLoading = false;
                    state.categories = payload.categories;
                }
            ),
});

export default productCategoriesByPetId.reducer;
