import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {tasksAPI} from "./tasks.api";

export type TaskType = {
    id: string
    priority: TaskPriorityType
    title: string
    date: string
    status: boolean
}

export type TaskPriorityType = 'high' | 'medium' | 'low'

export const fetchTasks = createAsyncThunk<{ tasks: TaskType[] }, undefined, { rejectValue: null }>(
    'tasks/fetchTasks', async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI;
        try {
            const res = await tasksAPI.fetchTasks();
            return {tasks: res};
        } catch (e) {
            return rejectWithValue(null);
        }
    }
)


export const addTask = createAsyncThunk<TaskType, { title: string, priority: string }, { rejectValue: null }>(
    'tasks/addTask', async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI;
        let {title, priority} = arg
        try {
            return await tasksAPI.addTask(title, priority)
        } catch (e) {
            return rejectWithValue(null);
        }
    }
)

export const deleteTask = createAsyncThunk<string, string, { rejectValue: null }>(
    'tasks/deleteTask', async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI;

        try {
            return await tasksAPI.deleteTask(arg)
        } catch (e) {
            return rejectWithValue(null);
        }
    }
)
export const changeStatus = createAsyncThunk<{ id: string, status: boolean },
    { id: string, status: boolean }, { rejectValue: null }>(
    'tasks/changeTask', async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI;
        let {id, status} = arg
        try {
            return await tasksAPI.changeStatus(id, status)
        } catch (e) {
            return rejectWithValue(null);
        }
    }
)


const slice = createSlice({
    name: "tasks",
    initialState: [] as TaskType[],
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.fulfilled, (state, action) => {
                return action.payload.tasks;
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state.unshift(action.payload)
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                const index = state.findIndex((task) => task.id === action.payload)
                if (index !== -1) state.splice(index, 1)
            })
            .addCase(changeStatus.fulfilled, (state, action) => {
                const task = state.find((task) => task.id === action.payload.id)
                if (task) {
                    task.status = !action.payload.status
                }
            })
    },
});
export const tasksReducer = slice.reducer;
export const tasksActions = slice.actions;
export const tasksThunks = {fetchTasks, addTask, deleteTask, changeStatus};









