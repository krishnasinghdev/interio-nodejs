import express from "express";
const router = new express.Router();
import loginAuth from "../middleware/loginAuth.js";
import * as SC from "../controller/shotController.js";

router.get("/", SC.get_shot);
router.get("/:id", SC.getshot_byid);

router.post("/", loginAuth, SC.add_shot);
router.post("/like/:shotId/:v_id", loginAuth, SC.like_shot);
router.patch("/", SC.get_shot);

router.delete("/:id", SC.delete_shot);

export default router;
