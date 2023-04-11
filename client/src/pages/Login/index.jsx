import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './index.css'
import { AuthContext } from '../../context/authContext'

export default function Login() {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  })

  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const { login } = useContext(AuthContext);

  const handleChange = e => {
    setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try{
      await login(inputs)
      navigate('/')
    } catch(err) {
      setError(err.response.data)
      console.log(err.response.data);
    }
    
  }

  return (
    <div className='auth'>
      <h1>Login</h1>
      <form action="">
        <input type="text" placeholder='username' name='username' onChange={handleChange} />
        <input type="password" placeholder='password' name='password' onChange={handleChange} />
        <button onClick={handleSubmit}>Login</button>
        {error && <p>{error}</p>}
        <span>Need a account? <Link to={'/register'}>Register</Link></span>
      </form>
    </div>
  )
}
