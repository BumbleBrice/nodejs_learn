import fs from "fs";

const hostname = "localhost";
const port = 8000;
const BASE_URL = `http://${hostname}:${port}`;

export default (req, res) => {
    const kittens = JSON.parse(fs.readFileSync(`./Data/kittens.json`, "utf-8"));
    res.render('index.ejs', {base_url:BASE_URL, kittens:kittens});
}