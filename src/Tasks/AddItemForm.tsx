import React, {ChangeEvent, KeyboardEvent, SetStateAction, useState} from "react";
import { IconButton, TextField} from "@mui/material";
import { AddBox } from "@mui/icons-material";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {TaskPriorityType, tasksThunks, TaskType} from "../app/tasks.reducer";
import {useAppDispatch} from "../app/store";
import {filterPriorityType, filterStatusType} from "../app/App";

type Props = {
    setFilterPriority: (filter: filterPriorityType)=> void
    setFilterStatus:(filter: filterStatusType)=> void
}

export const AddItemForm = React.memo(function (props: Props) {
    let [title, setTitle] = useState<string>("");
    const [priority, setPriority] = useState<string>('low');
    const dispatch = useAppDispatch()
    const handleChange = (event: SelectChangeEvent) => {
        setPriority(event.target.value as string);
    };
    const addItemHandler = () => {
        if (title.trim() !== "") {
            dispatch(tasksThunks.addTask({title, priority}))
            setTitle("");
            props.setFilterPriority('all')
            props.setFilterStatus('all')
        }
    };
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    };
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addItemHandler();
        }
    };
    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Priority</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={priority}
                        label="Priority"
                        onChange={handleChange}
                    >
                        <MenuItem value={'low'}>Low</MenuItem>
                        <MenuItem value={'medium'}>Medium</MenuItem>
                        <MenuItem value={'high'}>High</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <TextField
                variant="outlined"
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                label="Title"
            />
            <IconButton color="primary" onClick={addItemHandler} disabled={!title}>
                <AddBox />
            </IconButton>
        </div>
    );
});