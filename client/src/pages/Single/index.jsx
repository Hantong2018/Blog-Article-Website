import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Menu from '../../components/Menu'
import './index.css'
import axios from 'axios'
import moment from 'moment'
import { AuthContext } from '../../context/authContext'

export default function Single() {
  const [post, setPost] = React.useState([])

  const location = useLocation()

  const navigate = useNavigate()

  const postId = location.pathname.split('/')[2]

  const { currUser } = React.useContext(AuthContext);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`)
        setPost(res.data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchData()
  }, [postId])

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${postId}/${currUser.token}`)
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  }

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html')
    return doc.body.textContent
  }

  return (
    <div className='single'>
      <div className="content">
        <img src={`/upload/${post?.img}`} alt="" />
        <div className="tool">
          <div className="user">
            {/* <img src='/img/4.JPG' alt=''></img> */}
            {post.userAvatar && <img src={post.userAvatar} alt=''></img>}
            <div className="info">
              <span>{post.username}</span>
              <p>Posted {moment(post.date).fromNow()}</p>
            </div>
          </div>
          {currUser?.user.username === post.username && <div className="edit">
            <Link className='link' to={`/write?edit=2`} state={post}>
              <button className='edit'>Edit</button>
            </Link>
            <button onClick={handleDelete} className='delete'>Delete</button>
          </div>}
        </div>

        <h1>{post.title}</h1>
        {getText(post.desc)}
      </div>
     
      <Menu cat={post.cat}/>
      
    </div>
  )
}
