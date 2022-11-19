import styles from './Home.module.css'

import React from 'react'

import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext'



export default function Home() {

  const { user } = useAuthContext()
  const { documents, error } = useCollection(
    'transactions',
    ["uid" , "==" , user.uid],
    ["createdAt", "desc"]
  )

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        
        {error && <p>{error}</p>}

      </div>

      <div className={styles.sidebar}>

       
        
        
      </div>
<div className="text">
<p className={styles.para}>
          Parkinsons disease is a brain disorder that causes unintended or uncontrollable movements,
           such as shaking, stiffness, and difficulty with balance and coordination. Symptoms usually begin gradually and worsen over time. As the disease progresses,
          people may have difficulty walking and talking. 
          They may also have mental and behavioral changes, sleep problems, 
          depression, memory difficulties, and fatigue.
          <br/>
          <br/>
         <h3> What causes Parkinsons disease?</h3>
         
          The most prominent signs and symptoms of Parkinson’s disease occur when nerve cells in the basal ganglia, an area of the brain that controls
          movement, become impaired and/or die. 
          Normally, these nerve cells, or neurons, produce an important brain chemical known as dopamine. 
          
          </p>
</div>
     


    </div>
  )
}
 