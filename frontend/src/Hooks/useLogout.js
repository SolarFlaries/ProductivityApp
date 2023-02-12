import { useAuthContext } from "./userAuthContext"
import { useTasksContext } from "./useTaskContext"

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: taskDispatch } = useTasksContext()


    const logout = () => {

        localStorage.removeItem('user')

        dispatch({type: 'LOGOUT' })
        taskDispatch({type: 'SET_TASKS', payload: null})
    }

    return { logout }
}