import { useEffect, useState } from "react"
import { projectAuth } from '../firebase/config'
import { useAuthContext } from './useAuthContext'


export const useLogout = () => {
    const [error,setError] = useState(null)
    const [ispending, setisPending] = useState(false)
    const { dispatch } = useAuthContext()
    const [iscancelled, setIsCancelled] = useState(false)

    const logout = async () => {
        setError(null)
        setisPending(true)
    

    //sign user out
    try {
        await projectAuth.signOut()

        // dispatch logout action
        dispatch({ type: 'LOGOUT' })

        //update state

        if(!iscancelled){
        setisPending(false)
        setError(null)
        }
        
    } 
    catch(err) {
        if(!iscancelled){
            console.log(err.message)
            setError(err.message)
            setisPending(false)
        }
       
    }
}
    useEffect(() => {
        return() => setIsCancelled(true)
    })

    return { logout, error, ispending }
}