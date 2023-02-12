import { TasksContext } from "../Context/taskContext";
import { useContext } from "react";

export const useTasksContext = () => {
    const context = useContext(TasksContext)

    if (!context){
        throw Error('Error 1')
    }

    return context
}