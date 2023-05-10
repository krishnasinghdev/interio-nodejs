import express from "express";
const router = new express.Router();
import loginAuth from "../middleware/loginAuth.js";
import * as CC from "../controller/chatController.js";

router.get("/:_id", CC.fetchChats);
router.get("/start/:chatId/:to", CC.firstChat);

router.post("/", loginAuth, CC.newChat);

export default router;
