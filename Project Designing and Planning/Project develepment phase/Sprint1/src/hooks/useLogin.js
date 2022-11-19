import { useEffect, useState } from "react"
import { projectAuth } from '../firebase/config'
import { useAuthContext } from './useAuthContext'


export const useLogin = () => {
    const [error,setError] = useState(null)
    const [ispending, setisPending] = useState(false)
    const { dispatch } = useAuthContext()
    const [iscancelled, setIsCancelled] = useState(false)

    const login = async (email,password) => {
        setError(null)
        setisPending(true)
    

    //sign user out
    try {

       const res = await projectAuth.signInWithEmailAndPassword(email,password)

        // dispatch login action
        dispatch({ type: 'LOGIN', payload: res.user })

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

    return { login, error, ispending }
}