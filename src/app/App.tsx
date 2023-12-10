import React, {useEffect, useState} from "react";
import {AddItemForm} from "../Tasks/AddItemForm";
import Tasks from "../Tasks/Tasks";
import {useSelector} from "react-redux";
import {tasksThunks, TaskType} from "./tasks.reducer";
import {AppRootStateType, useAppDispatch} from "./store";
import cx from "classnames"

export type filterPriorityType = 'high' | 'medium' | 'low' | 'all';
export type filterStatusType = 'all' | 'active'| 'completed'

function App() {
    const dispatch = useAppDispatch()
    let _tasksForRender = useSelector<AppRootStateType, TaskType[]>(state => state.tasks)
    const [filterStatus, setFilterStatus] = useState<filterStatusType>('all')
    const [filterPriority, setFilterPriority] = useState<filterPriorityType>('all')
    useEffect(() => {
        dispatch(tasksThunks.fetchTasks())
    }, []);
    const onFilterPriorityHandler = (filterPriority: filterPriorityType) => {
        setFilterPriority(filterPriority)
    }
    const onFilterStatusHandler = (filterStatus: filterStatusType) => {
        setFilterStatus(filterStatus)
    }
    let tasksForRender:TaskType[] = _tasksForRender
    if(filterPriority === 'all' && filterStatus === 'all') {
        tasksForRender=tasksForRender.filter((t)=>{
            return true
        })
    }
    if(filterPriority === 'all' && filterStatus === 'active') {
        tasksForRender=tasksForRender.filter((task)=>{
            return !task.status;
        })
    }
    if(filterPriority === 'all' && filterStatus === 'completed') {
        tasksForRender=tasksForRender.filter((task)=>{
            //task.status === true ? true : false
            return task.status
        })
    }
    if(filterPriority === 'high' && filterStatus === 'all') {
        tasksForRender=tasksForRender.filter((task)=>{
            //task.priority === 'high' ? true : false
            return task.priority === 'high'
        })
    }

    if(filterPriority === 'high' && filterStatus === 'active') {
        tasksForRender=tasksForRender.filter((task)=>{
            //task.priority === 'high' && task.status === false ? true : false
            return task.priority === 'high' && !task.status
        })
    }
    if(filterPriority === 'high' && filterStatus === 'completed') {
        tasksForRender=tasksForRender.filter((task)=>{
            //task.priority === 'high' && task.status === true ? true : false
            return task.priority === 'high' && task.status
        })
    }
    if(filterPriority === 'medium' && filterStatus === 'all') {
        tasksForRender=tasksForRender.filter((task)=>{
            //task.priority === 'medium' ? true : false
            return task.priority === 'medium'
        })
    }
    if(filterPriority === 'medium' && filterStatus === 'active') {
        tasksForRender=tasksForRender.filter((task)=>{
            //task.priority === 'medium' && task.status === false? true : false
            return task.priority === 'medium' && !task.status
        })
    }
    if(filterPriority === 'medium' && filterStatus === 'completed') {
        tasksForRender=tasksForRender.filter((task)=>{
            //task.priority === 'medium' && task.status === true? true : false
            return task.priority === 'medium' && task.status
        })
    }
    if(filterPriority === 'low' && filterStatus === 'all') {
        tasksForRender=tasksForRender.filter((task)=>{
            //task.priority === 'low' ? true : false
            return task.priority === 'low'
        })
    }
    if(filterPriority === 'low' && filterStatus === 'active') {
        tasksForRender=tasksForRender.filter((task)=>{
            //task.priority === 'low' && task.status === false ? true : false
            return task.priority === 'low' && !task.status
        })
    }
    if(filterPriority === 'low' && filterStatus === 'completed') {
        tasksForRender=tasksForRender.filter((task)=>{
            //task.priority === 'low' && task.status === true ? true : false
            return task.priority === 'low' && task.status
        })
    }

    return (
        <div>
            <h1 className={cx('tw-flex tw-justify-center tw-mt-6 tw-mb-6')}>Список дел</h1>
            <AddItemForm setFilterPriority={setFilterPriority} setFilterStatus={setFilterStatus}/>
            <Tasks tasksForRender={tasksForRender}/>
            <div
                className={cx('tw-flex tw-justify-center tw-mt-6')}
            >
                <button onClick={()=> onFilterStatusHandler('all')}
                        className={cx('tw-bg-purple-300 hover:tw-bg-purple-500 tw-text-white tw-font-bold ' +
                            'tw-py-2 tw-px-4 tw-mx-6 tw-rounded-full', filterStatus === 'all' && 'tw-border-2 tw-border-rose-950' )}>ALL</button>
                <button onClick={()=> onFilterStatusHandler('active')}
                        className={cx('tw-bg-blue-300 hover:tw-bg-blue-500 tw-text-white tw-font-bold ' +
                            'tw-py-2 tw-px-4 tw-mx-6 tw-rounded-full', filterStatus === 'active' && 'tw-border-2 tw-border-rose-950' )}>ACTIVE</button>
                <button onClick={()=> onFilterStatusHandler('completed')}
                        className={cx('tw-bg-orange-300 hover:tw-bg-orange-500 tw-text-white tw-font-bold ' +
                            'tw-py-2 tw-px-4 tw-mx-6 tw-rounded-full', filterStatus === 'completed' && 'tw-border-2 tw-border-rose-950') }>COMPLETED</button>
            </div>
            <div className={cx('tw-flex tw-justify-center tw-mt-6')}>
                <button onClick={() => onFilterPriorityHandler('all')}
                        className={cx( 'tw-bg-purple-300 hover:tw-bg-purple-500 tw-text-white tw-font-bold ' +
                            'tw-py-2 tw-px-4 tw-mx-6 tw-rounded-full', filterPriority === 'all' && 'tw-border-2 tw-border-rose-950' )}>ALL</button>
                <button onClick={() => onFilterPriorityHandler('high')}
                        className={cx('tw-bg-red-300 hover:tw-bg-red-500 tw-text-white tw-font-bold ' +
                            'tw-py-2 tw-px-4 tw-mx-6 tw-rounded-full',  filterPriority === 'high' && 'tw-border-2 tw-border-rose-950')}>HIGH</button>
                <button onClick={() => onFilterPriorityHandler('medium')}
                        className={cx('tw-bg-yellow-300 hover:tw-bg-yellow-500 tw-text-white tw-font-bold ' +
                            'tw-py-2 tw-px-4 tw-mx-6 tw-rounded-full', filterPriority === 'medium' && 'tw-border-2 tw-border-rose-950')}>MEDIUM</button>
                <button onClick={() => onFilterPriorityHandler('low')}
                        className={cx('tw-bg-green-300 hover:tw-bg-green-500 tw-text-white tw-font-bold ' +
                            'tw-py-2 tw-px-4 tw-mx-6 tw-rounded-full', filterPriority === 'low' && 'tw-border-2 tw-border-rose-950')}>LOW</button>
            </div>
        </div>
    );
}

export default App;

