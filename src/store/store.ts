import { combineReducers, configureStore } from "@reduxjs/toolkit";
import modeReducer from './reducers/modeSlice';

const rootReducer = combineReducers({
    modeReducer
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];