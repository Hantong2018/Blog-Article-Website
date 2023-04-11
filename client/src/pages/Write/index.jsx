import React, { useState } from "react";
import "./index.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import moment from "moment";
import { AuthContext } from '../../context/authContext'
import { Link, useNavigate } from 'react-router-dom'

export default function Write() {
  const state = useLocation().state;
  const [title, setTitle] = useState(state?.title || "");
  const [value, setValue] = useState(state?.desc || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");

  const { currUser } = React.useContext(AuthContext);

  const navigate = useNavigate()

  React.useEffect(() => {
    setTitle(state?.title || "");
    setValue(state?.desc || "");
    setFile(null);
    setCat(state?.cat || "");
  }, [state]);

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload", formData);
      return res.data
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    const imgUrl = await upload();
    try {
      state
        ? await axios.put(`/posts/${state.id}/${currUser.token}`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
          })
        : await axios.post(`/posts/${currUser.token}`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
        
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  };

  const handleCat = (e) => {
    setCat(e.target.value);
  };



  return (
    <div className="write">
      <div className="content">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b>Draft
          </span>
          <span>
            <b>Visibility: </b>Public
          </span>
          <div className="buttons">
            <input
              style={{ display: "none" }}
              type="file"
              name=""
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label className="file" htmlFor="file">
              Upload Image
            </label>
            {/* <button onClick={handleSubmit}>Save as draft</button> */}
            <button onClick={handleSubmit}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div>
            <input
              type="radio"
              checked={cat === "art"}
              name="category"
              value="art"
              id="art"
              onClick={(e) => handleCat(e)}
            />
            <label htmlFor="art">Art</label>
          </div>
          <div>
            <input
              type="radio"
              checked={cat === "science"}
              name="category"
              value="science"
              id="science"
              onClick={(e) => handleCat(e)}
            />
            <label htmlFor="science">Science</label>
          </div>
          <div>
            <input
              type="radio"
              checked={cat === "tech"}
              name="category"
              value="tech"
              id="tech"
              onClick={(e) => handleCat(e)}
            />
            <label htmlFor="tech">Technology</label>
          </div>
          <div>
            <input
              type="radio"
              checked={cat === "cinema"}
              name="category"
              value="cinema"
              id="cinema"
              onClick={(e) => handleCat(e)}
            />
            <label htmlFor="cinema">Cinema</label>
          </div>
          <div>
            <input
              type="radio"
              checked={cat === "food"}
              name="category"
              value="food"
              id="food"
              onClick={(e) => handleCat(e)}
            />
            <label htmlFor="food">Food</label>
          </div>
        </div>
      </div>
    </div>
  );
}
