import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import './index.css'
import { AuthContext } from '../../context/authContext'

export default function Navbar() {
  const { currUser, logout } = useContext(AuthContext);

  return (
    <div className='navbar'>
      <div className='container'>
        <div className='logo'>
          <Link to={'/'}><img src='/img/logo.png' alt="" /></Link>
        </div>
        <div className='links'>
          <Link className='link' to={'/?cat=art'}>
            <h6>ART</h6>
          </Link>
          <Link className='link' to={'/?cat=science'}>
            <h6>SCIENCE</h6>
          </Link>
          <Link className='link' to={'/?cat=tech'}>
            <h6>TECHNOLOGY</h6>
          </Link>
          <Link className='link' to={'/?cat=cinema'}>
            <h6>CINEMA</h6>
          </Link>
          <Link className='link' to={'/?cat=food'}>
            <h6>FOOD</h6>
          </Link>
          <span>{currUser?.user.username}</span>
          {currUser ? <span onClick={logout}>Logout</span> : <Link className='link' to='/login'>Login</Link>}
          <span className='write_btn'>
            <Link className='link' to={'/write'}>Write</Link>
          </span>
          
        </div>
      </div>
    </div>
  )
}
