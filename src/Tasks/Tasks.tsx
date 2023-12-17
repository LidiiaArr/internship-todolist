import React from 'react';
import Task from "./Task";
import {TaskType} from "../app/tasks.reducer";

type Props = {
    tasksForRender: TaskType[]
}
const Tasks = (props: Props) => {
    const tasksForRender = props.tasksForRender
        return (
            <>
                {tasksForRender?.map((task:TaskType)=> {
                        return <Task
                            key={task?.id}
                            title={task?.title}
                            date={task?.date}
                            priority={task?.priority}
                            id={task?.id}
                            status={task?.status}
                        />
                    }
                )}
            </>
        );
};

export default Tasks;