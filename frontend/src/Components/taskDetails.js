import { useTasksContext } from "../Hooks/useTaskContext"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useAuthContext } from '../Hooks/userAuthContext'

const TaskDetails = ({ task }) => {
    const { dispatch } = useTasksContext()
    const { user } = useAuthContext()

    const handleClick = async () => {

        if (!user) {
            return
        }
        const response = await fetch('/api/tasks/' + task._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok){
            dispatch({type: 'DELETE_TASK', payload: json})
        }
    }

    const split = (task.priority).split('T')[0]

    return (
        <div className="task-details">
            <h4>{task.title}</h4>
            <p><strong>Description: </strong><br></br>{task.description}</p>
            <br></br>
            <p><strong>Due: </strong>{split}</p>
            
            <p>{formatDistanceToNow(new Date(task.createdAt), {  addSuffix: true})}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>close</span>
        </div>
    )
}

export default TaskDetails