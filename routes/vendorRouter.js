import express from "express";
const router = new express.Router()
import * as UC from '../controller/vendorController.js'
import loginAuth from '../middleware/loginAuth.js'

router.get('/vendor', UC.get_vendor)
router.post('/vendor', UC.add_vendor)

router.post('/vendor/login', loginAuth, UC.login)
router.post('/vendor/logout', loginAuth, UC.logout)



export default router