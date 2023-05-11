import express from 'express';
const router = new express.Router();

import adminRouter from './adminRoutes.js';
import vendorRouter from './vendorRoutes.js';
import shotRouter from './shotRoutes.js';
import chatRouter from './chatRoutes.js';
import messageRouter from './messageRoutes.js';

router.get('/', (req, res) => {
  try {
    res.status(200).send(`
    <div
      style="display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; height: 100vh; background-color: #f7f7f7;">
      <h1 style="font-size: 4rem; margin-bottom: 2rem; color: #222;">Welcome to Interio Server!</h1>
      <p style="font-size: 1.5rem; color: #666;">Proudly developed by <a href="https://www.evenbeam.com"
          style="color: #222;">EvenBeam</a></p>
    </div>
    `);
  } catch (error) {
    res.status(500).send(`
    <div
      style="display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; height: 100vh; background-color: #f7f7f7;">
      <h1 style="font-size: 4rem; margin-bottom: 2rem; color: #FF0000;">Something went wrong !</h1>
      <p style="font-size: 1.5rem; color: #666;">Proudly developed by <a href="https://www.evenbeam.com"
          style="color: #222;">EvenBeam</a></p>
    </div>
    `);
  }
});

router.use('/admin', adminRouter);
router.use('/vendor', vendorRouter);
router.use('/shot', shotRouter);
router.use('/chat', chatRouter);
router.use('/message', messageRouter);

export default router;
