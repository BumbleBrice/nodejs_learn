import express from 'express';
import mysql from 'mysql2/promise';
import tasksRouter from './routes/tasksRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3002

const pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'todolist',
	waitForConnections: true,
	connectionLimit: 100,
	queueLimit: 0
})

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', tasksRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});