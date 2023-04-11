import db from "../db/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  // Get user information
  const userInfo = req.body;

  // Check if username, password valid format
  if (!userInfo.username || !userInfo.password || !userInfo.email) {
    return res.json("Username, password, and email cannot be empty!");
  }

  const q = "SELECT username FROM users WHERE username=?";

  console.log(1);

  db.query(q, userInfo.username, (err, data) => {
    if (err) return res.json(err);
    // Check if username exists
    if (data.length > 0)
      return res.status(409).json("Username already exists!");

    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    userInfo.password = bcrypt.hashSync(userInfo.password, salt);

    const q = "INSERT INTO users (`username`, `password`, `email`) VALUES (?)";
    const values = [userInfo.username, userInfo.password, userInfo.email];

    db.query(q, [values], (err, data) => {
      if (err) return res.json(err);
      // register failed
      if (data.affectedRows !== 1)
        return res.json("Register error, please try again!");
      // register success
      res.status(200).json("Register success!");
    });
  });
};

export const login = (req, res) => {
  // Get user information
  const userInfo = req.body;
  // Load data from database
  const q = "SELECT * FROM users WHERE username=?";
  db.query(q, userInfo.username, (err, data) => {
    if (err) return res.json(err);
    if (data.length !== 1) return res.json("Login error, please try again!");
    // check password
    const compareResult = bcrypt.compareSync(
      userInfo.password,
      data[0].password
    );
    if (!compareResult) {
      return res.status(400).json("Password incorrect!");
    }

    const user = { ...data[0], password: "" };

    const tokenStr = jwt.sign(user, "HelloWorld", { expiresIn: "24h" });

    res.cookie('access_token', user, {
        expires  : new Date(Date.now() + 9999999),
        httpOnly: false,
      })
      .status(200).json({
        user,
        token: tokenStr
      });
    // .json({
    //   status: 200,
    //   msg: "Login success",
    //   // token: "Bearer " + tokenStr,
    //   token: user,
    // });
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User logout");
};
