import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
    persistReducer,
    persistStore,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartReducer from './cart-items-slice';
import myMarketplaceReducer from './my-marketplace-slice';
import petsMetaDataReducer from './pets-params-slice';
import productCategoriesReducer from './product-categories-slice';
import registrationReducer from './registration-slice';
import userDashboardSlice from './user-dashboard-slice';
import userReducer from './userSlice';

const appReducer = combineReducers({
    registration: registrationReducer,
    user: userReducer,
    petsMetaData: petsMetaDataReducer,
    myMarketplace: myMarketplaceReducer,
    productCategoriesByPet: productCategoriesReducer,
    userDashboard: userDashboardSlice,
    cart: cartReducer,
});

const rootReducer = (state: any, action: any) => {
    if (action.type === 'registration/clearLogoutState') {
        storage.removeItem('persist:root');
        return appReducer(undefined, action);
    }

    return appReducer(state, action);
};

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const persistor = persistStore(store);
