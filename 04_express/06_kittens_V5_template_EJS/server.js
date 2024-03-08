import express from "express";
import router from "./router/kittens.js"

const app = express();

const port = 8000;
const hostname = "localhost";
const BASE_URL = `http://${hostname}:${port}`;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static("public"));

app.use('/',  router )

app.listen(port, () => {
    console.log(`Example app listening at ${BASE_URL}`);
});