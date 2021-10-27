import { createAsyncThunk } from "@reduxjs/toolkit";
import { getModes } from "../../api/api";

export const fetchModes = createAsyncThunk(
    'fetchAll',
    async(_:void, thunkAPI) => {
        try {
            const response = await getModes();
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue("An error occured :(");
        }
    }
)