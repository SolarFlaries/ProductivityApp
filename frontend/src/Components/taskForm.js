import { useState } from "react"
import { useTasksContext } from "../Hooks/useTaskContext"
import { useAuthContext } from "../Hooks/userAuthContext"


const TaskForm = () => {
    const { dispatch } = useTasksContext()
    const { user } = useAuthContext()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [priority, setPriority] = useState('')
    const [error, setError] = useState(null)


    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
        }


        const task = {title, description, priority}

        const response = await fetch('/api/tasks', {
            method: 'POST',
            body: JSON.stringify(task),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setTitle('')
            setDescription('')
            setPriority('')
            setError(null)
            console.log('New task added')
            dispatch({type: 'CREATE_TASK', payload: json})
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h2>Add a new task</h2>

            <label>Title:</label>
            <input type='text' onChange={(e) => setTitle(e.target.value)} value={title}/>
            <label>Description:</label>
            <input type='text' onChange={(e) => setDescription(e.target.value)} value={description}/>
            <label>Due:</label>
            <input type='date' onChange={(e) => setPriority(e.target.value)} value={priority}/>
            <button>Add Task</button>
            {error && <div className="error">{error}</div> }
        </form>
    )
}

export default TaskForm