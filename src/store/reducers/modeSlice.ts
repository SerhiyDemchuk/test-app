import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IModes, IMode, ISquaresArray } from "../../models/IMode";
import { fetchModes } from "./actionCreators";

interface modeState {
    modes: IModes;
    fieldAmount: IMode;
    isLoading: boolean;
    error: string;
    squaresHovered: ISquaresArray[];
}

const initialState: modeState = {
    modes: {
        easyMode: {
            field: 0
        },
        hardMode: {
            field: 0
        },
        normalMode: {
            field: 0
        },
    },
    fieldAmount: {
        field: 0
    },
    isLoading: false,
    error: '',
    squaresHovered: [],
}

export const modeSlice = createSlice({
    name: 'modes',
    initialState,
    reducers: {
        setValue(state, action: PayloadAction<IMode>) {
            state.fieldAmount = action.payload;
        },
        setSquares(state, action: PayloadAction<ISquaresArray[]>) {
            state.squaresHovered = action.payload;
        }
    },
    extraReducers: {
        [fetchModes.pending.type]: (state) => {
            state.isLoading = true;
        },
        [fetchModes.fulfilled.type]: (state, action: PayloadAction<IModes>) => {
            state.isLoading = false;
            state.error = '';
            state.modes = action.payload;
        },
        [fetchModes.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
});

export default modeSlice.reducer;