// LIBRARIES
const express = require('express');
const app = express();
const mysql = require('mysql2');
const mongoose = require('mongoose');

// ============ SQL CONNECTION ============
// TODO: Create MySQL connection using mysql.createConnection()
// You'll need: host, user, password, and database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Waterpolo123',
    database: 'company_db'
});

// MySQL Connection Verification
function verifyMySQLConnection() {
    connection.connect(function(err) {
        if (err) {
            console.error('Error connecting to MySQL: ' + err.stack);
            return;
        }
        console.log('MySQL connected as id ' + connection.threadId);
    });
}

// ============ MONGODB CONNECTION ============
// TODO: Connect to MongoDB using mongoose.connect()
// Your connection string should point to localhost and the companyDB database
mongoose.connect('mongodb://127.0.0.1:27017/companyDB');

// TODO: Create a Mongoose Schema for projects with name (String) and budget (Number)
const ProjectSchema = new mongoose.Schema({
    name: String,
    budget: Number
});

// TODO: Create a Mongoose Model called 'Project' using the schema
const ProjectModel = mongoose.model('Project', ProjectSchema);

// MongoDB Connection Verification
mongoose.connection.on('connected', () => {
    console.log('MongoDB connected successfully');
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

// ============ ENDPOINTS ============
// Middleware to parse JSON request bodies
app.use(express.json());

// ------ MONGODB ENDPOINTS ------

// TODO: GET all projects from MongoDB
// Use ProjectModel.find({}) and return as JSON
app.get('/projects', async (req, res) => {
    try {
        const projects = await ProjectModel.find({});
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// TODO: POST a new project to MongoDB
// Create a new ProjectModel with req.body, save it, and return with status 201
app.post('/projects', async (req, res) => {
    try {
        const project = new ProjectModel(req.body);
        await project.save();
        res.status(201).json(project);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// TODO: DELETE a project from MongoDB by id
// Use req.params.id and ProjectModel.findByIdAndDelete()
// Return status 200 on success
app.delete('/projects/:id', async (req, res) => {
    try {
        await ProjectModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ------ MYSQL ENDPOINTS ------
// IMPORTANT: Use ? placeholders for user input instead of string concatenation!
// Example: connection.query('SELECT * FROM users WHERE id = ?', [userId], callback)
// This prevents SQL injection attacks where malicious users could insert
// harmful SQL code through input fields and damage your database.

// TODO: GET all employees from MySQL
// Use connection.query() with SELECT * FROM employees
// Return the results as JSON
app.get('/employees', function (req, res) {
    connection.query('SELECT * FROM employees', function (err, results) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// TODO: POST a new employee to MySQL
// Use connection.query() with INSERT INTO
// Return the new employee's id with status 201
app.post('/employees', function (req, res) {
    connection.query('INSERT INTO employees SET ?', req.body, function (err, results) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId });
    });
});

// TODO: DELETE an employee from MySQL by id
// Use req.params.id and DELETE FROM with a WHERE clause
// Return status 200 on success
app.delete('/employees/:id', function (req, res) {
    connection.query('DELETE FROM employees WHERE id = ?', [req.params.id], function (err, results) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Employee deleted successfully' });
    });
});

// ============ START SERVER ============
app.listen(3000, function () {
    console.log('Server is running on http://localhost:3000');
    verifyMySQLConnection();
});
