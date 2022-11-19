import styles from './Navbar.module.css'
import { useLogout } from '../hooks/useLogout'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'

import React from 'react'

export default function Navbar() {

  const { logout } = useLogout()
  const { user } = useAuthContext()

  return (
    <nav className={styles.navbar}>
      <ul>
        <li className={styles.title}>Parkinson's Disease Detector</li>

        { !user && (
          <>
            <li><Link to='/login'>Login</Link></li>
             <li><Link to='/signup'>Signup</Link></li>
          </>
        )}

        { user &&  (
          <>
          <li>Hello, { user.displayName }</li>
           <li> 
         <button className='btn' onClick={logout} >Logout</button>
           </li>
          </>
        )}
      </ul>
    </nav>
  )
}
