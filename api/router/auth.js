import express from "express";
import { validate } from 'express-validation'
import { login, logout, register } from "../router_handler/auth.js";
import { reg_schema, login_schema } from "../schema/index.js";

const router = express.Router();

router.post("/register", validate(reg_schema), register);
router.post("/login", validate(login_schema), login);
router.post("/logout", logout);

export default router
