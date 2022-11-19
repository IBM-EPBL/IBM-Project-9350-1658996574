import { useState } from 'react'
import { useLogin } from '../../hooks/useLogin'
import styles from './Login.module.css'

import React from 'react'

export default function Login() {

  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('')
  const{ login, error, ispending } = useLogin()

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email,password)
  }

  return (
    <form  onSubmit={handleSubmit} className={styles['login-form']}>
      <h2>Login</h2>
      <label>
        <span>email:</span>
        <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        />
      </label>

      <label>
        <span>password:</span>
        <input type="password" 
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        
        />
      </label>

      {!ispending && <button className='btn'>Login</button> }

      { error && <p>{error}</p> }

      { ispending && <button className='btn' disabled>Loading...</button> }
      
    </form>
  )
}
