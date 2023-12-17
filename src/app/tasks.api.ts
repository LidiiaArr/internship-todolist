import {TaskType} from "./tasks.reducer";
import {v1} from "uuid";


export const tasksAPI = {
    fetchTasks() {
        const tasks:TaskType[] = []
        const tasksString = localStorage.getItem('tasks');
        if(tasksString){
            const tasksObject = JSON.parse(tasksString);
            tasksObject.forEach((t:TaskType)=> {
                tasks.push(t)
            })

        } else {
            localStorage.setItem('tasks',  JSON.stringify(tasks))
        }
        let promise: Promise<TaskType[]> = new Promise((resolve, reject)=>{
            resolve(tasks)
        })
        return promise
    },
    addTask(title:string,priority: string) {
        let id = v1()
        let date = JSON.stringify(new Date())
        let dateForStore = date.slice(1,11)
        const task = {id: id, date: dateForStore, title, priority, status: false}
        const tasksString = localStorage.getItem('tasks');
        if(tasksString === null){
            localStorage.setItem('tasks',  JSON.stringify({0: [task]}));
        } else {
            const tasksObject = JSON.parse(tasksString);
            tasksObject.unshift(task);
            localStorage.setItem('tasks',  JSON.stringify(tasksObject))
        }
        let promise: Promise<TaskType> = new Promise((resolve, reject)=> {
            resolve(task as TaskType)
        })
        return promise
    },
    deleteTask(id:string) {
        const tasksString = localStorage.getItem('tasks');
        if(tasksString === null){
                new Error('tasks not found')
        } else {
            const tasksObject = JSON.parse(tasksString);
            const newArray = tasksObject.filter((t:TaskType)=> {
                         return t.id !== id
                     })
            localStorage.setItem('tasks',  JSON.stringify( newArray))
        }
        let promise: Promise<string>  = new Promise((resolve, reject)=> {
            resolve(id)
        })
        return promise
    },
    changeStatus(id: string, status: boolean){
        const tasksString = localStorage.getItem('tasks')
        if(tasksString === null){
            new Error('tasks not found')
        }else{
            const tasksObject = JSON.parse(tasksString);
            const newArray = tasksObject.map((t:TaskType)=> {
                return t.id === id ? {...t, status: !status} : t
            })
            localStorage.setItem('tasks',  JSON.stringify(newArray))
        }
        let promise: Promise<{id:string, status:boolean}> = new Promise((resolve, reject)=> {
            resolve({id,status})
        })
        return promise
    }
};