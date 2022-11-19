import { useReducer, useEffect, useState  } from "react";
import { projectFirestore, timestamp} from '../firebase/config'

let initialState = {
    document: null,
    ispending: false,
    error:null,
    success:null
}


const firestoreReducer = ( state, action ) => {
    switch (action.type) {
        case 'IS_PENDING':
        return { ispending: true, document: null, success: false, error: null } 
        
        case 'ADDED_DOCUMENT':
        return { ispending: false, document: action.payload, success: true, error: null }

        case "DELETED DOCUMENT":
            return { ispending: false, document: null, success: true, error: null }

        case 'ERROR':
            return { ispending: false, document: null, success: false, error: action.payload }

        default:
            return state
    }
}

export const useFirestore = (collection) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState)
    const [iscancelled, setIscancelled] = useState(false)
    
    //collection ref
    const ref = projectFirestore.collection(collection)


    // only dipatch is not cancelled
    const dispatchIfNotCancelled = async(action) => {
        if(!iscancelled) {
            dispatch(action)
        }
   
    }


    //add a document
    const addDocument = async(doc) => {
        dispatch({ type:"IS_PENDING" })

    try {
        const createdAt = timestamp.fromDate(new Date())
          await ref.add({ ...doc, createdAt })
         dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT' })


    }
    catch(err) {
        dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
    }

    }

    //delete a document
    const deleteDocument = async(id) => {
        dispatch({ type: "IS_PENDING" })

        try {

            const deleteDocument = await ref.doc(id).delete()
            dispatchIfNotCancelled({ type:"DELECTED_DOCUMENT",  payload: deleteDocument })

        }

        catch (err){
            dispatchIfNotCancelled({ type: "ERROR", payload: 'could not delete'})
        }

    }

    useEffect (() => {
        return () => setIscancelled(true)
    },[])

    return { addDocument, deleteDocument, response }

}