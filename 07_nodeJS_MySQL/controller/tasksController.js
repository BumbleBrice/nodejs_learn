import mysql from 'mysql2/promise';

const pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'todolist',
	waitForConnections: true,
	connectionLimit: 100,
	queueLimit: 0
});


export async function getAllTasks(req, res) {
		try {
        const [rows] = await pool.query('SELECT * FROM tasks');
        //res.json(rows);
        res.render('index', {tasks: rows})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function createTask(req, res) {
	console.log(req.body)
	const { title } = req.body
	try {
		await pool.execute('INSERT INTO tasks (title) VALUES (?)', [title]);
		res.redirect('/')
	} catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function deleteTask(req, res) {
    const id = req.params.id 
    try {
        await pool.execute('DELETE FROM tasks WHERE id = ?', [id]);
        res.redirect('/')
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function getEditTaskForm(req, res) {
    const taskId = req.params.id;
    try {
        const [rows] = await pool.execute('SELECT * FROM tasks WHERE id = ?', [taskId]);
         if (rows.length === 0) {
            return res.status(404).send('Task not found');
        }
        res.render('editTask', { task: rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function updateTask(req, res) {
    const taskId = req.params.id;
    const { title, completed } = req.body;
    try {
        const isCompleted = completed === 'on' ? 1 : 0;
        await pool.execute('UPDATE tasks SET title = ?, completed = ? WHERE id = ?', [title, isCompleted, taskId]);
        res.redirect('/')
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}