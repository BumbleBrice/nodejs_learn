import fs from "fs";

const hostname = "localhost";
const port = 8000;
const BASE_URL = `http://${hostname}:${port}`;


export default (req, res) => {
	 const { id } = req.params;
        const kitten = JSON.parse(fs.readFileSync(`./Data/${id}.json`, "utf-8"));
   res.render('kitten.ejs', {base_url:BASE_URL, kitten:kitten});
}