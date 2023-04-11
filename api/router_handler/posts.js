import db from "../db/index.js";
import jwt from "jsonwebtoken";

export const getPosts = (req, res) => {
  const q = req.query.cat
    ? "SELECT * FROM posts WHERE cat=?"
    : "SELECT * FROM posts";

  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};

export const getPostById = (req, res) => {
  const q =
    "SELECT p.id, `username`, `title`, `desc`, p.img, u.img AS userAvatar, `cat`, `date` FROM users u JOIN posts p ON u.id=p.uid WHERE p.id=?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data[0]);
  });
};

export const addPost = (req, res) => {
  const token = req.params.token;
  if (!token) return res.status(401).json("Not authenticated!");
  jwt.verify(token, "HelloWorld", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "INSERT INTO posts (`title`, `desc`, `img`, `date`, `uid`, `cat`) VALUES (?)";
    const value = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.date,
      userInfo.id,
      req.body.cat,
    ]

    db.query(q, [value], (err, data) => {
      if (err) return res.json(err);
      if (data.affectedRows !== 1) return res.json("Failed");


      return res.json("Post has been created!");
    });
  });
};

export const deletePost = (req, res) => {
  const token = req.params.token;
  if (!token) return res.status(401).json("Not authenticated!");
  jwt.verify(token, "HelloWorld", (err, userInfo) => {
    if (!token) return res.status(403).json("Token is not valid!");
    console.log(userInfo);
    const postId = req.params.id;
    const q = "DELETE FROM posts WHERE `id`=? AND `uid`=?";
    db.query(q, [postId, userInfo.id], (err, data) => {
      if (err) return res.status(403).json("No authorization!");

      if (data.affectedRows !== 1) return res.json("Failed");

      return res.json("Post deleted!");
    });
  });
};

export const updatePost = (req, res) => {
  console.log(1);
  const token = req.params.token;
  if (!token) return res.status(401).json("Not authenticated!");
  jwt.verify(token, "HelloWorld", (err, userInfo) => {
    console.log(2);
    if (!token) return res.status(403).json("Token is not valid!");

    const postId = req.params.id;

    const q = "UPDATE posts SET `title`=?, `desc`=?, `img`=?, `cat`=? WHERE `id`=? AND `uid`=?";
    const value = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.cat,
    ]
    db.query(q, [...value, postId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);

      if (data.affectedRows !== 1) return res.json("Failed");

      return res.json("Post has been updated!");
    });
  });
};
