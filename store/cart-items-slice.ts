import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { IDefaultAPIUtils } from '../utils/common';
import { API_ERROR_MSG } from '../utils/constants';

interface ICartItems extends IDefaultAPIUtils {
    cartItems: any[];
}

const initialState: ICartItems = {
    error: null,
    isLoading: false,
    isError: false,
    cartItems: [],
};

export const getCartItems = createAsyncThunk(
    'getCartItems',
    async (_params: any = undefined, thunkAPI) => {
        try {
            const data: any = await axios.get('/marketplace/cart');
            if (data?.status === true) {
                return data;
            }

            throw new Error(API_ERROR_MSG);
        } catch (e) {
            console.log('error in getCartItems = ', e);
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const addCartItems = createAsyncThunk(
    'addCartItems',
    async (
        params: {
            pr_id: number;
            ct_price: number;
            ct_qty: number;
        },
        thunkAPI
    ) => {
        try {
            const data: any = await axios.post('/marketplace/cart', params);
            if (data?.status === true) {
                return data;
            }

            throw new Error(API_ERROR_MSG);
        } catch (e) {
            console.log('error in addCartItems = ', e);
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const updateCartItems = createAsyncThunk(
    'updateCartItems',
    async (
        {
            ct_id,
            isAddItem,
        }: {
            ct_id: number;
            isAddItem: boolean;
        },
        thunkAPI
    ) => {
        try {
            const apiEndpoint = isAddItem ? 'increment_qty' : 'decrement_qty';
            const data: any = await axios.put(
                `/marketplace/cart/${ct_id}/${apiEndpoint}`
            );
            if (data?.status === true) {
                return data;
            }

            throw new Error(API_ERROR_MSG);
        } catch (e) {
            console.log('error in updateCartItems = ', e);
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const deleteCartItems = createAsyncThunk(
    'deleteCartItems',
    async (cart_item_id, thunkAPI) => {
        try {
            const data: any = await axios.delete(
                `/marketplace/cart/${cart_item_id}`
            );
            if (data?.status === true) {
                return data;
            }

            throw new Error(API_ERROR_MSG);
        } catch (e) {
            console.log('error in deleteCartItems = ', e);
            return thunkAPI.rejectWithValue(e);
        }
    }
);

const cartItemSlice = createSlice({
    name: 'cartItems',
    initialState,
    reducers: {},

    extraReducers: (builder) =>
        builder
            .addCase(getCartItems.pending, (state) => {
                state.error = null;
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(
                getCartItems.fulfilled,
                (state, { payload }: PayloadAction<any>) => {
                    state.error = null;
                    state.isError = false;
                    state.isLoading = true;
                    state.cartItems = payload?.cartItems;
                }
            )
            .addCase(getCartItems.rejected, (state, { payload }: any) => {
                let e = API_ERROR_MSG;
                if (payload?.message && typeof payload?.message === 'string') {
                    e = payload.message;
                }
                state.error = e;
                state.isError = true;
                state.isLoading = false;
            })
            .addCase(addCartItems.pending, (state) => {
                state.error = null;
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(
                addCartItems.fulfilled,
                (state, { payload }: PayloadAction<any>) => {
                    state.error = null;
                    state.isError = false;
                    state.isLoading = true;
                    state.cartItems = [
                        ...state.cartItems,
                        ...payload?.cartItems,
                    ];
                }
            )
            .addCase(addCartItems.rejected, (state, { payload }: any) => {
                let e = API_ERROR_MSG;
                if (payload?.message && typeof payload?.message === 'string') {
                    e = payload.message;
                }
                state.error = e;
                state.isError = true;
                state.isLoading = false;
            })
            .addCase(updateCartItems.pending, (state) => {
                state.error = null;
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(updateCartItems.fulfilled, (state) => {
                state.error = null;
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(updateCartItems.rejected, (state, { payload }: any) => {
                let e = API_ERROR_MSG;
                if (payload?.message && typeof payload?.message === 'string') {
                    e = payload.message;
                }
                state.error = e;
                state.isError = true;
                state.isLoading = false;
            })
            .addCase(deleteCartItems.pending, (state) => {
                state.error = null;
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(deleteCartItems.fulfilled, (state) => {
                state.error = null;
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(deleteCartItems.rejected, (state, { payload }: any) => {
                let e = API_ERROR_MSG;
                if (payload?.message && typeof payload?.message === 'string') {
                    e = payload.message;
                }
                state.error = e;
                state.isError = true;
                state.isLoading = false;
            }),
});

export default cartItemSlice.reducer;
