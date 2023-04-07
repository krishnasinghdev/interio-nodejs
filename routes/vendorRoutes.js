import express from "express";
const router = new express.Router();
import * as UV from "../controller/vendorController.js";
import loginAuth from "../middleware/loginAuth.js";

router.get("/", UV.get_vendor);
router.post("/", UV.add_vendor);

router.post("/login", UV.login);
router.post("/logout", loginAuth, UV.logout);

export default router;
