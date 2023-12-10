import React, {useState} from 'react';
import {tasksAPI} from "../app/tasks.api";
import {useAppDispatch} from "../app/store";
import {tasksThunks} from "../app/tasks.reducer";
import cx from "classnames";

type Props = {
    key: string
    title: string
    date: string
    priority: string
    id: string
    status: boolean
}
const Task = (props: Props) => {
    const [checked, setChecked] = useState<boolean>(props.status);
    const dispatch = useAppDispatch()

    let circle: string;
    if(props.priority === 'high') {
        circle = 'tw-w-6 tw-h-6 tw-bg-red-400 tw-rounded-full tw-mx-4';
    } else if(props.priority === 'medium') {
        circle = 'tw-w-6 tw-h-6 tw-bg-yellow-400 tw-rounded-full tw-mx-4';
    } else {
        circle = 'tw-w-6 tw-h-6 tw-bg-green-400 tw-rounded-full tw-mx-4';
    }
    function onClickDeleteHandler() {
        dispatch(tasksThunks.deleteTask(props.id))
    }
    function onChangeCheckboxHandler() {
        setChecked(!checked)
        dispatch(tasksThunks.changeStatus({id: props.id, status: checked}))
    }

    return (
        <>
        <div className={cx('tw-flex tw-justify-center tw-mt-6 tw-items-center')}>
            <input type="checkbox"
                   checked={checked}
                   onChange={()=> onChangeCheckboxHandler()}
                   className={cx('tw-mx-6')}
            />
            {props.title} {props.date}
            <span className={circle}></span>
            <button
                onClick={()=>onClickDeleteHandler()}
                    className={cx('tw-bg-gray-400 hover:tw-bg-gray-500 tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-rounded')}
            >Delete</button>
        </div>
        </>
    );
};

export default Task;
//test
//test2
//test3