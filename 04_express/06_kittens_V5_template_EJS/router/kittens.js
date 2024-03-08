import fs from 'fs'
import express from 'express'

const router = express.Router()

import HommeController from '../controllers/home.js'
import KittenController from '../controllers/kitten.js'
import { addCat, addCatSubmit } from '../controllers/addcat.js'

const hostname = "localhost";
const port = 8000;
const BASE_URL = `http://${hostname}:${port}`;


router.get('/', HommeController)

router.get("/kitten/:id", KittenController)

router.get('/add/cat', addCat)

router.post('/add/cat', addCatSubmit)

export default router