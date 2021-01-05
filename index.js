const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");

const pool = new Pool({
  user: "",
  host: "localhost",
  database: "migracode",
  password: "",
  port: 5432,
});

const app = express();
app.use(bodyParser.json());

app.post("/students", function (req, res) {
  // ... insert a student into the students table
});

app.get("/students", function (req, res) {
  pool
    .query("SELECT * FROM students;")
    .then((result) => res.json(result.rows))
    .catch((err) => {
      console.error(err.message);
      res.status(500).send("Internal Server Error");
    });
});

app.put("/students/:studentId", function (req, res) {
  // ... update a student in the students table
});

app.delete("/students/:studentId", function (req, res) {
  // ... delete a student from the students table
});

app.post("/languages", function (req, res) {
  // ... insert a language into the languages table
});

app.get("/languages", function (req, res) {
  // ... select all languages from the languages table
});

app.delete("/languages/:languageId", function (req, res) {
  // ... delete a language from the languages table
});

app.post("/teachers", function (req, res) {
  // ... insert a teacher into the teachers table
});

app.get("/teachers", function (req, res) {
  // ... select all teachers from the teachers table
});

app.put("/teachers/:teacherId", function (req, res) {
  // ... update a teacher in the teachers table
});

app.delete("/teachers/:teacherId", function (req, res) {
  // ... delete a teacher from the teachers table
});

app.post("/staff", function (req, res) {
  // ... insert a staff member into the staff table
});

app.get("/staff", function (req, res) {
  // ... select all staff members from the staff table
});

app.put("/staffs/:staffId", function (req, res) {
  // ... update a staff member in the staff table
});

app.delete("/staffs/:staffId", function (req, res) {
  // ... delete a staff member from the staff table
});

app.post("/modules", function (req, res) {
  // ... insert a module into the modules table
});

app.get("/modules", function (req, res) {
  // ... select all modules from the modules table
});

app.put("/modules/:moduleId", function (req, res) {
  // ... update a module in the modules table
});

app.delete("/modules/:moduleId", function (req, res) {
  // ... delete a module from the modules table
});

app.post("/classes", function (req, res) {
  // ... insert a class into the classes table
});

app.get("/classes", function (req, res) {
  // ... select all classes from the classes table
});

app.post("/attendances", function (req, res) {
  // ... record a student's attendance of a class in the attendances table
});

app.get("/attendances", function (req, res) {
  // ... select all attendances from the attendances table
});

// Trickier:
// get all attendance records of a given class

app.listen(3000, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});
