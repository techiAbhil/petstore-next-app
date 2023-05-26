import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { IDefaultAPIUtils } from '../utils/common';
import { API_ERROR_MSG } from '../utils/constants';

export interface IProducts {
    pr_id: string;
    prc_id: number;
    psc_id: number;
    pr_name: string;
    pr_description: string;
    pr_price: number;
    pr_discount: number;
    pb_id: number;
    pr_quantity: number;
    pr_qty_unit: string;
    pr_suitable_for: string;
    pr_poster_path: string;
    pr_is_best_selling: number;
    pr_is_featured: number;
    pr_is_combo: number;
    status: string;
    pb_name: string;
    psc_title: string;
}

export interface IMarketPlaceData extends IDefaultAPIUtils {
    petCategories: {
        pc_id: number;
        pc_title: string;
        pc_icon_path: string;
        pc_display_order: number;
        status: string;
    }[];
    bestSellingProducts: IProducts[];
    featuredProducts: IProducts[];
    comboProducts: IProducts[];
}

const initialState: IMarketPlaceData = {
    comboProducts: [],
    featuredProducts: [],
    bestSellingProducts: [],
    petCategories: [],
    error: null,
    isError: false,
    isLoading: false,
};

export const getMyMarketplaceData = createAsyncThunk(
    'getMyMarketplaceDetails',
    async (_params: any = undefined, thunkAPI) => {
        try {
            const data: any = await axios.get(
                '/marketplace/products/dashboard'
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

const myMarketplaceSlice = createSlice({
    name: 'myMarketplaceData',
    initialState,
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addCase(getMyMarketplaceData.pending, (state) => {
                state.error = null;
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(
                getMyMarketplaceData.rejected,
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
                getMyMarketplaceData.fulfilled,
                (state, { payload }: PayloadAction<IMarketPlaceData>) => {
                    state.error = null;
                    state.isError = false;
                    state.isLoading = false;
                    state.bestSellingProducts = payload.bestSellingProducts;
                    state.comboProducts = payload.comboProducts;
                    state.featuredProducts = payload.featuredProducts;
                    state.petCategories = payload.petCategories;
                }
            ),
});

export default myMarketplaceSlice.reducer;
