const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const cors = require('cors');

PORT=8080;

// connect to db
let db;
(async () => {
	db = await open({
		filename: 'data.sqlite',
		driver: sqlite3.Database
	});
})();

app = express();
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.json());
app.use(cors());

app.get('/getData', async(req, res) => {
	const cData = await db.all('SELECT * FROM course');
	const iData = await db.all('SELECT * FROM instructor');
	const sData = await db.all('SELECT * FROM section');
	res.json({course: cData, instructor: iData, section:sData});
})

app.post('/delete', async (req,res) => {
	const result = await db.run("DELETE FROM section where id = ?", [req.body.id]);
	console.log(result);
	if(result.changes == 0){
		res.json({'status': 'None'})
	} else{
		res.json({'status': 'Ok'})
	}
});

app.post('/add', async (req,res) => {
	const result = await db.run("INSERT INTO section (course_id, instructor_id) VALUES (?,?)", [req.body.course, req.body.instructor]);
	console.log(result);
	if(result.changes == 0){
		res.json({'status': 'None'})
	} else{
		res.json({'status': 'Ok', 'nextID' : result.lastID})
	}
});

app.post('/addCourse', async (req,res) => {
	const result = await db.run("INSERT INTO course (name) VALUES (?)", [req.body.name]);
	console.log(result);
	if(result.changes == 0){
		res.json({'status': 'None'})
	} else{
		res.json({'status': 'Ok', 'nextID' : result.lastID})
	}
});

app.post('/changeInstructor', async (req,res) => {
	const result = await db.run("UPDATE section SET (instructor_id) = (?) WHERE id = (?)", [req.body.instructor, req.body.id]);
	console.log(result);
	if(result.changes == 0){
		res.json({'status': 'None'})
	} else{
		res.json({'status': 'Ok', 'nextID' : result.lastID})
	}
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
