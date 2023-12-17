import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import {tasksReducer} from "./tasks.reducer";
import { useDispatch} from "react-redux";


export const store = configureStore({
    reducer: {
        tasks: tasksReducer
    }
});

//дженерик определяем возвращаемый тип
export type AppRootStateType = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;



// @ts-ignore
window.store = store;