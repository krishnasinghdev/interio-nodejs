import express from "express";
const router = new express.Router();
import loginAuth from "../middleware/loginAuth.js";
import * as MC from "../controller/messageController.js";

router.get("/:chatId", MC.allMessages);
router.post("/", loginAuth, MC.sendMessage);

export default router;
