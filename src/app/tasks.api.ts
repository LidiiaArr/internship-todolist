import {TaskType} from "./tasks.reducer";
import {v1} from "uuid";

export const tasksAPI = {
    fetchTasks() {
        const tasks:TaskType[] = []
        const tasksString = localStorage.getItem('tasks');
        if(tasksString) {
            const tasksObject = JSON.parse(tasksString);
            tasksObject[0].forEach((t:TaskType)=>{
                         tasks.push(t)
                     })
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
        const tasksString = localStorage.getItem('tasks')

        if(tasksString === null){
            localStorage.setItem('tasks',  JSON.stringify({0: [task]}));
        } else {
            const tasksObject = JSON.parse(tasksString); //{0: Array(1)}
            const tasksArray = tasksObject[0];//[{}]
            tasksArray.unshift(task);
            localStorage.setItem('tasks',  JSON.stringify({0: tasksArray}))
        }
        let promise: Promise<TaskType> = new Promise((resolve, reject)=> {
            console.log(task)
            resolve(task as TaskType)
        })
        return promise
    },
    deleteTask(id:string) {
        const tasksString = localStorage.getItem('tasks')
        if(tasksString === null){
            new Error('task not found')
        }else{
            const tasksObject = JSON.parse(tasksString);
            const tasksArray = tasksObject[0];
            const newArray = tasksArray.filter((t:TaskType)=> {
                return t.id !== id
            })
            console.log(newArray, "deleteArr")
            localStorage.setItem('tasks',  JSON.stringify({0: newArray}))
        }
        let promise: Promise<string>  = new Promise((resolve, reject)=> {
            console.log(id)
            resolve(id)
        })
        return promise
    },
    changeStatus(id: string, status: boolean){
        const tasksString = localStorage.getItem('tasks')
        if(tasksString === null){
            new Error('task not found')
        }else{
            const tasksObject = JSON.parse(tasksString);
            const tasksArray = tasksObject[0];
            const newArray = tasksArray.map((t:TaskType)=> {
                return t.id === id ? {...t, status: !status} : t
            })
            localStorage.setItem('tasks',  JSON.stringify({0: newArray}))
        }
        let promise: Promise<{id:string, status:boolean}> = new Promise((resolve, reject)=> {
            console.log(id)
            resolve({id,status})
        })
        return promise
    }


};