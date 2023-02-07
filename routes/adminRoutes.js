import express from "express";
const router = new express.Router()
import * as AC from "../controller/adminController.js";
import loginAuth from '../middleware/loginAuth.js'

router.get('/_admin', AC.get_admin)
router.post('/_admin', AC.add_admin)

router.post('/admin/login', loginAuth, AC.login)
router.post('/admin/logout', loginAuth, AC.logout)



export default router