import express from "express";
import cors from "cors";
import postRouter from "./router/posts.js";
import authRouter from './router/auth.js'
import { expressjwt } from 'express-jwt'
import { ValidationError } from "express-validation";
import cookieParser from 'cookie-parser'
import multer from 'multer'

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser())

// app.use(
//   expressjwt({ secret: 'HelloWorld', algorithms: ["HS256"] }).unless({
//     path: [/^\/api\//],
//   })
// );

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/public/upload')
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    // cb(null, file.fieldname + '-' + uniqueSuffix)
    cb(null, Date.now() + file.originalname)
  }
})

const upload = multer({ storage })

app.post('/api/upload', upload.single('file'), function(req, res, next){
  const file = req.file
  res.status(200).json(file.filename)
})


app.use('/api/auth', authRouter)
app.use("/api/posts", postRouter);

// app.use("/uploads", express.static("./uploads"));

app.get("/test", (req, res) => {
  res.json("Hello World!");
});

app.use(function (err, req, res, next) {
  // handle validation error
  if (err instanceof ValidationError) {
    console.log(err.details);
    return res.status(err.statusCode).send(err.details.body[0].message);
  }
  // handle jwt error
  if (err.name === "UnauthorizedError") {
    return res.json({
      status: 401,
      message: "Invalid token",
    });
  }
  return res.json(err);
});

app.listen(8888, () => {
  console.log("http://127.0.0.1:8888 Connected");
});
