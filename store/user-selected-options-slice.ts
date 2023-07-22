import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type IUserSelectedOptions = {
    selectedPetIDForMarketplace: string | undefined;
};

const initialState: IUserSelectedOptions = {
    selectedPetIDForMarketplace: undefined,
};

const userSelectedOptionsSlice = createSlice({
    name: 'userSelectedOptions',
    initialState,
    reducers: {
        resetUserSelectedOptionsState: () => initialState,
        setUserSelectedOptionsState: (
            state,
            action: PayloadAction<IUserSelectedOptions>
        ) => {
            return action.payload;
        },
    },
});

export const { resetUserSelectedOptionsState, setUserSelectedOptionsState } =
    userSelectedOptionsSlice.actions;

export default userSelectedOptionsSlice.reducer;
