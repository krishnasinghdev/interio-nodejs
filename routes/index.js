import express from "express";
const router = new express.Router();

import adminRouter from "./adminRoutes.js";
import vendorRouter from "./vendorRoutes.js";
import shotRouter from "./shotRoutes.js";
import chatRouter from "./chatRoutes.js";
import messageRouter from "./messageRoutes.js";

router.use("/admin", adminRouter);
router.use("/vendor", vendorRouter);
router.use("/shot", shotRouter);
router.use("/chat", chatRouter);
router.use("/message", messageRouter);

export default router;
