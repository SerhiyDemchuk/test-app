import { getModes } from "../../api/api";
import { AppDispatch } from "../store";
import { modeSlice } from "./modeSlice";

export const fetchModes = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(modeSlice.actions.modesFetching());
        const response = await getModes();
        dispatch(modeSlice.actions.modesFetchingSuccess(response));
    } catch (e: any) {
        dispatch(modeSlice.actions.modesFetchingError(e.message));
    }
}