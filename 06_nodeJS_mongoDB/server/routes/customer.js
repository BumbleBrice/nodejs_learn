import express from 'express';
const router = express.Router();

import {
  homepage,
  addCustomer,
  postCustomer,
  view,
  deleteCustomer,
  searchCustomers
} from '../controllers/customerController.js';

router.get('/', homepage);
router.get('/add', addCustomer);
router.post('/add', postCustomer);
router.get('/view/:id', view);

router.post('/delete/:userId', deleteCustomer);

router.post('/search', searchCustomers);


export default router;
