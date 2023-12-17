import {TaskType} from "./app/tasks.reducer";
import {filterPriorityType, filterStatusType} from "./app/App";

export const TasksFiltering = (tasks: TaskType[],filterPriority:filterPriorityType, filterStatus:filterStatusType ) => {
    if(filterPriority === 'all' && filterStatus === 'all') {
        tasks=tasks.filter((task:TaskType)=>{
            return true
        })
    }
    if(filterPriority === 'all' && filterStatus === 'active') {
        tasks=tasks.filter((task)=>{
            return !task.status;
        })
    }
    if(filterPriority === 'all' && filterStatus === 'completed') {
        tasks=tasks.filter((task)=>{
            //task.status === true ? true : false
            return task.status
        })
    }
    if(filterPriority === 'high' && filterStatus === 'all') {
        tasks=tasks.filter((task)=>{
            //task.priority === 'high' ? true : false
            return task.priority === 'high'
        })
    }

    if(filterPriority === 'high' && filterStatus === 'active') {
        tasks=tasks.filter((task)=>{
            //task.priority === 'high' && task.status === false ? true : false
            return task.priority === 'high' && !task.status
        })
    }
    if(filterPriority === 'high' && filterStatus === 'completed') {
        tasks=tasks.filter((task)=>{
            //task.priority === 'high' && task.status === true ? true : false
            return task.priority === 'high' && task.status
        })
    }
    if(filterPriority === 'medium' && filterStatus === 'all') {
        tasks=tasks.filter((task)=>{
            //task.priority === 'medium' ? true : false
            return task.priority === 'medium'
        })
    }
    if(filterPriority === 'medium' && filterStatus === 'active') {
        tasks=tasks.filter((task)=>{
            //task.priority === 'medium' && task.status === false? true : false
            return task.priority === 'medium' && !task.status
        })
    }
    if(filterPriority === 'medium' && filterStatus === 'completed') {
        tasks=tasks.filter((task)=>{
            //task.priority === 'medium' && task.status === true? true : false
            return task.priority === 'medium' && task.status
        })
    }
    if(filterPriority === 'low' && filterStatus === 'all') {
        tasks=tasks.filter((task)=>{
            //task.priority === 'low' ? true : false
            return task.priority === 'low'
        })
    }
    if(filterPriority === 'low' && filterStatus === 'active') {
        tasks=tasks.filter((task)=>{
            //task.priority === 'low' && task.status === false ? true : false
            return task.priority === 'low' && !task.status
        })
    }
    if(filterPriority === 'low' && filterStatus === 'completed') {
        tasks=tasks.filter((task)=>{
            //task.priority === 'low' && task.status === true ? true : false
            return task.priority === 'low' && task.status
        })
    }
    return tasks
}