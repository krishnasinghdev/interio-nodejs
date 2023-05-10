import express from 'express';
const router = new express.Router();
import * as UV from '../controller/vendorController.js';
import loginAuth from '../middleware/loginAuth.js';

router.get('/', loginAuth, UV.get_vendor);
router.get('/:tab', loginAuth, UV.get_tabs);

router.post('/', UV.add_vendor);
router.post('/edit', loginAuth, UV.edit_vendor);
router.post('/login', UV.login);
router.post('/logout', loginAuth, UV.logout);
router.post('/update-password', loginAuth, UV.update_password);

export default router;
