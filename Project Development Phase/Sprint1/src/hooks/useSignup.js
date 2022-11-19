import { useState,useEffect } from "react"
import { projectAuth } from "../firebase/config"
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
    const[error, setError] = useState(null)
    const[ispending, setisPending] = useState(false)
    const { dispatch } = useAuthContext() 
    const [iscancelled, setIsCancelled] = useState(false)

    const signup = async(email, password, name) => {
        setError(null)
        setisPending(true)

        try {
            //signup user

           const res = await projectAuth.createUserWithEmailAndPassword(email, password)
            
            if(!res) {
                throw new Error('Could not complete signup')
            }

            //add name to user
            await res.user.updateProfile({ displayName: name})

            // dispatch login action

            dispatch({ type:'LOGIN', payload: res.user })

            //update state
            if(!iscancelled){
            setisPending(false)
            setError(null)
            }     
        }

        catch (err) {
            if(!iscancelled){
                console.log(err.message)
                setError(err.message)
                setisPending(false)
            }
           }
        }

        useEffect(()=> {
            return() => setIsCancelled(true)
        })

    return { error, ispending, signup }
}