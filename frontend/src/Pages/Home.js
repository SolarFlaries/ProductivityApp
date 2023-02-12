import { useEffect } from "react"
import { useTasksContext } from "../Hooks/useTaskContext"
import { useAuthContext } from "../Hooks/userAuthContext"

import TaskDetails from '../Components/taskDetails'
import TaskForm from '../Components/taskForm'

const Home = () => {
    const {tasks, dispatch} = useTasksContext()
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await fetch('/api/tasks', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                },
            })
            const json = await response.json()
            if (response.ok) {
                dispatch({type: 'SET_TASKS', payload: json})
            }
        }
        if (user) {
            fetchTasks()
        }
    }, [dispatch, user])


    return (
        <div className="home">
            <div className="tasks">
                {tasks && tasks.map((task) => (
                    <TaskDetails key={task._id} task={task}/>
                ))}
            </div>
            <TaskForm />
        </div>
    )
}

export default Home