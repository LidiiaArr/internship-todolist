import React, {useEffect, useState} from "react";
import {AddItemForm} from "../Tasks/AddItemForm";
import Tasks from "../Tasks/Tasks";
import {useSelector} from "react-redux";
import {tasksThunks, TaskType} from "./tasks.reducer";
import {AppRootStateType, useAppDispatch} from "./store";
import cx from "classnames"
import {TasksFiltering} from "../helper";
import {ButtonFilterStatus} from "../ButtonFilterStatus";
import ButtonFilterPriority from "../ButtonFilterPriority";

export type filterPriorityType = 'high' | 'medium' | 'low' | 'all';
export type filterStatusType = 'all' | 'active'| 'completed'

function App() {
    const dispatch = useAppDispatch()
    let allTasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks)
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

    const tasksForRender = TasksFiltering(allTasks, filterPriority, filterStatus)

    return (
        <div>
            <h1 className={cx('tw-flex tw-justify-center tw-mt-6 tw-mb-6')}>Список дел</h1>
            <AddItemForm setFilterPriority={setFilterPriority} setFilterStatus={setFilterStatus}/>
            <Tasks tasksForRender={tasksForRender}/>
            <div
                className={cx('tw-flex tw-justify-center tw-mt-6')}
            >
                <ButtonFilterStatus title={'all'}
                                    className={'tw-bg-purple-300 hover:tw-bg-purple-500'}
                                    onFilterStatusHandler={onFilterStatusHandler}
                                    filterStatus={filterStatus} />
                <ButtonFilterStatus title={'active'}
                                    className={'tw-bg-blue-300 hover:tw-bg-blue-500'}
                                    onFilterStatusHandler={onFilterStatusHandler}
                                    filterStatus={filterStatus}/>
                <ButtonFilterStatus title={'completed'}
                                    className={'tw-bg-orange-300 hover:tw-bg-orange-500'}
                                    onFilterStatusHandler={onFilterStatusHandler}
                                    filterStatus={filterStatus} />
            </div>
            <div className={cx('tw-flex tw-justify-center tw-mt-6')}>
                <ButtonFilterPriority title={'all'}
                                      className={'tw-bg-purple-300 hover:tw-bg-purple-500'}
                                      filterPriority={filterPriority}
                                      onFilterPriorityHandler={ onFilterPriorityHandler} />
                <ButtonFilterPriority title={'high'}
                                      className={'tw-bg-red-300 hover:tw-bg-red-500'}
                                      filterPriority={filterPriority}
                                      onFilterPriorityHandler={onFilterPriorityHandler} />
                <ButtonFilterPriority title={'medium'}
                                      className={'tw-bg-yellow-300 hover:tw-bg-yellow-500'}
                                      filterPriority={filterPriority}
                                      onFilterPriorityHandler={onFilterPriorityHandler} />
                <ButtonFilterPriority title={'low'}
                                      className={'tw-bg-green-300 hover:tw-bg-green-500'}
                                      filterPriority={filterPriority}
                                      onFilterPriorityHandler={onFilterPriorityHandler}/>
            </div>
        </div>
    );
}

export default App;

