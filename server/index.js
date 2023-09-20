const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
const AWS = require('aws-sdk');


const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const bucket = process.env.S3_BUCKET;

// middleware
app.use(cors());
app.use(express.json()); // needed to get access to req.body

// ROUTES

// create a todo
app.post('/todos', async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description]);
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// get all todos
app.get('/todos', async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// get a todo
app.get('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
        res.json(todo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// update a todo
app.put('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]);
        res.json("Todo was updated!");
    } catch (err) {
        console.error(err.message);
    }
});

// delete a todo
app.delete('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
        res.json("Todo was deleted!");
    } catch (err) {
        console.error(err.message);
    }
});

// Configure AWS SDK
AWS.config.update({
    region: 'eu-north-1', // or your desired region
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey
});

const s3 = new AWS.S3();

const uploadToS3 = async (fileName, fileContent) => {
    const params = {
        Bucket: bucket,
        Key: fileName,
        Body: fileContent,
    };

    try {
        const response = await s3.upload(params).promise();
        console.log('File uploaded successfully:', response.Location);
        return response.Location;
    } catch (error) {
        console.error('Error uploading file to S3:', error);
        throw error;
    }
};

app.post('/todos/save', async (req, res) => {
    const todos = req.body.todos; // Assuming you send the todos in the request body

    // Save todos to S3
    try {
        const fileContent = JSON.stringify(todos);
        const fileName = 'todos.json';
        const s3Url = await uploadToS3(fileName, fileContent);
        res.json({ message: 'Todos saved to S3', s3Url });
    } catch (error) {
        res.status(500).json({ error: 'Error saving todos to S3' });
    }
});


// start the server on port 5000
app.listen(5050, () => {
    console.log('server started on port 5050');
});