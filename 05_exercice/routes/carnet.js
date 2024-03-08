import fs from "fs";
import express from "express";

const router = express.Router();

import HomeController from "../controllers/home.js";
import DetailController from "../controllers/details.js";
import DeleteController from "../controllers/deleteContact.js";
import {addContact, addContactSubmit} from "../controllers/addContact.js";
import {updateContact, updateContactSubmit} from "../controllers/updateContact.js";


const hostname = "localhost";
const port = 8000;
const BASE_URL = `http://${hostname}:${port}`;

router.get("/", HomeController);
  
router.get("/addContact", addContact);

router.post("/ajout", addContactSubmit);

router.post("/supContact", DeleteController);

router.get('/details/:id',DetailController);
  
router.get('/modifContact/:id',updateContact);

router.post('/modif/:id', updateContactSubmit);

export default router;