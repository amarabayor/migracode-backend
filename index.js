const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const app = express();
app.use(bodyParser.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'migracode',
  password: 'migracode',
  port: 5432
});

// ... Post Students ... ////
// ... insert a student into the students table
  app.post("/students", function (req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const address = req.body.address;
    const phone_number = req.body.phone_number;
    const batch  = req.body.batch;
    const status = req.body.status;
  
     pool
      .query("SELECT * FROM students WHERE name=$1", [name])
      .then((result) => {
        if (result.rows.length > 0) {
          return res
            .status(400)
            .send("An students with the same name already exists!");
        } else {
          const query =
            "INSERT INTO students (name, email, address, phone_number, batch, status) VALUES ($1, $2, $3, $4, $5, $6)";
          pool
            .query(query, [name,email,address,phone_number,batch,status])
            .then(() => res.send("students created!"))
            .catch((e) => res.status(400).send(e.message));
        }
      });
  });
// .. get students ///
app.get("/students", function (req, res) {
  pool
    .query("SELECT * FROM students;")
    .then((result) => res.json(result.rows))
    .catch((err) => {
      console.error(err.message);
      res.status(500).send("Internal Server Error");
    });
});

// "Put" update a student in the students table ??///
app.put("/students/:studentsId", function (req, res) {
  const studentsId = req.params.studentsId;
  const email = req.body.email;
  const address = req.body.address;
  const phone_number= req.body.phone_number;
  

  pool
    .query("UPDATE students SET email=$1,address=$2,phone_number=$3 WHERE id=$4", [email,address,phone_number])
    .then(() => res.send(`Student ${studentsId} updated!`))
    .catch((e) => res.status(400).send(e.message));

});

// .. Delete Students by Id .. ??//
app.delete("/students/:studentId", function (req, res) {
  const studentId = req.params.studentId;

  pool
    .query("DELETE FROM students WHERE id=$1", [studentId])
    .then(() => {
      pool
        .query("DELETE FROM students WHERE id=$1", [studentId])
        .then(() => res.send(`students ${studentId} deleted!`))
        .catch((e) => res.status(400).send(e.message));
    })
    .catch((e) => res.status(400).send(e.message));
});

// .. Post Languages ... //
app.post("/languages", function (req, res) {
  const name = req.body.name;
  pool
    .query("SELECT * FROM languages WHERE name=$1", [name])
    .then((result) => {
      if (result.rows.length > 0) {
        return res
          .status(400)
          .send("languages already exists!");
      } else {
        const query =
          "INSERT INTO languages (name) VALUES ($1)";
        pool
          .query(query, [name])
          .then(() => res.send("languages created!"))
          .catch((e) => res.status(400).send(e.message));
      }
    });
});

// ..get languages .. /// 
app.get("/languages", function (req, res) {
pool
  .query("SELECT * FROM languages;")
  .then((result) => res.json(result.rows))
  .catch((err) => {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  });
});


// Delete language by ID ??//
app.delete("/languages/:languageId", function (req, res) {
  const languageId = req.params.languageId;

  pool
    .query("DELETE FROM languages WHERE id=$1", [languageId])
    .then(() => {
      pool
        .query("DELETE FROM languages WHERE id=$1", [languageId])
        .then(() => res.send(`Language ${languageId} deleted!`))
        .catch((e) => console.error(e));
    })
    .catch((e) => res.status(400).send("Something went wrong"));
});

 // post teachers ... insert a teacher into the teachers table...///
app.post("/teachers", function (req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const country = req.body.country;
  const language= req.body.language;
  

   pool
    .query("SELECT * FROM teachers WHERE name=$1", [name])
    .then((result) => {
      if (result.rows.length > 0) {
        return res
          .status(400)
          .send("teachers with the same name already exists!");
      } else {
        const query =
          "INSERT INTO teachers (name, email, country, language) VALUES ($1, $2, $3, $4)";
        pool
          .query(query, [name,email,country,language])
          .then(() => res.send("teachers created!"))
          .catch((e) => res.status(400).send(e.message));
      }
    });
});

// get teachers ... select all teachers from the teachers table
app.get("/teachers", function (req, res) {
  pool
    .query("SELECT * FROM teachers;")
    .then((result) => res.json(result.rows))
    .catch((err) => {
      console.error(err.message);
    res.status(500).send("Internal Server Error");
  });
});

// put, //  update a teacher in the teachers table ??
app.put("/teachers/:teacherId", function (req, res) {
  const teacherId = req.params.teacherId;
  const name = req.body.name;
  const email = req.body.email;
  

  pool
    .query("UPDATE teachers SET name=$1,email=$2 WHERE id=$3", [name,email,teacherId])
    .then(() => res.send(`teacher ${teacherId} updated!`))
    .catch((e) => res.status(400).send(e.message));

});

// "delete"  // ... delete a teacher from the teachers table ??
app.delete("/teachers/:teacherId", function (req, res) {
  const teacherId = req.params.teacherId;

  pool
    .query("DELETE FROM teachers WHERE id=$1", [teacherId])
    .then(() => {
      pool
        .query("DELETE FROM teachers WHERE id=$1", [teacherId])
        .then(() => res.send(`teacher ${teacherId} deleted!`))
        .catch((e) => console.error(e));
    })
    .catch((e) => res.status(400).send("Something went wrong"));
});
//  post staff... insert a staff member into the staff table
app.post("/staff", function (req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const address = req.body.address
  const bank_account = req.body.bank_account;
  const phone_number = req.body.phone_number;
  const position = req.body.position;
  const language = req.body.language;

  

   pool
    .query("SELECT * FROM staff WHERE name=$1", [name])
    .then((result) => {
      if (result.rows.length > 0) {
        return res
          .status(400)
          .send("the staff name already exists!");
      } else {
        const query =
          "INSERT INTO staff (name, email, address, bank_account, phone_number,position,language) VALUES ($1, $2, $3, $4, $5,$6,$7)";
        pool
          .query(query, [name,email,address,bank_account,phone_number,position,language])
          .then(() => res.send("staff created!"))
          .catch((e) => res.status(400).send(e.message));
      }
    });
});

// get staff // ... select all staff members from the staff table
app.get("/staff",function (req, res) {
  pool
    .query("SELECT * FROM staff")
    .then((result) => res.json(result.rows))
    .catch((e) => res.status(400).send(e.message));
});

  // put // ... update a staff member in the staff table
app.put("/staff/:staffId", function (req, res) {
  const staffId = req.params.staffId;
  const bank_account = req.body.bank_account;
  const phone_number = req.body.phone_number;
  const position = req.body.position;
  pool
    .query("UPDATE staff SET bank_account=$1,phone_number=$2,position=$3 WHERE id=$4", [bank_account,phone_number,position,staffId])
    .then(() => res.send(`staff ${staffId} updated!`))
    .catch((e) => res.status(400).send(e.message));

}); 

// "Delete"... delete a staff member from the staff table
app.delete("/staff/:staffId", function (req, res) {
  const staffId = req.params.staffId;

  pool
    .query("DELETE FROM staff WHERE id=$1", [staffId])
    .then(() => {
      pool
        .query("DELETE FROM staff WHERE id=$1", [staffId])
        .then(() => res.send(`staff ${staffId} deleted!`))
        .catch((e) => console.error(e));
    })
    .catch((e) => res.status(400).send("Something went wrong"));
});
// post inserting in the modules tablem //
app.post("/modules", function (req, res) {
  const name = req.body.name;
  const language = req.body.language;
  
  

   pool
    .query("SELECT * FROM modules WHERE name=$1", [name])
    .then((result) => {
      if (result.rows.length > 0) {
        return res
          .status(400)
          .send("the modules already exists!");
      } else {
        const query =
          "INSERT INTO modules (name, language) VALUES ($1, $2)";
        pool
          .query(query, [name,language])
          .then(() => res.send("modules created!"))
          .catch((e) => res.status(400).send(e.message));
      }
    });
});

// ... select all modules from the modules table

app.get("/modules",function (req, res) {
  pool
    .query("SELECT * FROM modules")
    .then((result) => res.json(result.rows))
    .catch((e) => res.status(400).send(e.message));
});


  // put... update a modules in the modules table
  //  // ... update a staff member in the staff table
  app.put("/modules/:moduleId", function (req, res) {
    const moduleId = req.params.moduleId;
    const name = req.body.name;
    const language = req.body.language;
    
    pool
      .query("UPDATE modules SET name=$1,language=$2 WHERE id=$3", [name,language,moduleId])
      .then(() => res.send(`modules ${moduleId} updated!`))
      .catch((e) => res.status(400).send(e.message));
  
  }); 

 // "Delete" ... delete a module from the modules table
app.delete("/modules/:moduleId", function (req, res) {
  const moduleId = req.params.moduleId;

  pool
    .query("DELETE FROM modules WHERE id=$1", [moduleId])
    .then(() => {
      pool
        .query("DELETE FROM modules WHERE id=$1", [moduleId])
        .then(() => res.send(`modules ${moduleId} deleted!`))
        .catch((e) => console.error(e));
    })
    .catch((e) => res.status(400).send("Something went wrong"));
});
// ."post".. insert a class into the classes table
app.post("/classes", function (req, res) {
  const datetime = req.body.datetime;
  const topic = req.body.topic;
  const teacher = req.body.teacher;
  pool
    .query("SELECT * FROM classes WHERE datetime=$1", [datetime])
    .then((result) => {
      if (result.rows.length > 0) {
        return res
          .status(400)
          .send("the classes already exists!");
      } else {
        const query =
          "INSERT INTO classes (datetime,topic,teacher) VALUES ($1, $2, $3)";
        pool
          .query(query, [datetime,topic,teacher])
          .then(() => res.send("classes is created!"))
          .catch((e) => res.status(400).send(e.message));
      }
    });
});
// get... select all classes from the classes table
app.get("/classes",function (req, res) {
  pool
    .query("SELECT * FROM classes")
    .then((result) => res.json(result.rows))
    .catch((e) => res.status(400).send(e.message));
});
// post... record a student's attendance of a class in the attendances table
app.post("/attendances", function (req, res) {
  const student_id = req.body.student_id;
  const class_id = req.body.class_id;
  pool
    .query("SELECT * FROM attendances  WHERE student_id=$1", [student_id])
    .then((result) => {
      if (result.rows.length > 0) {
        return res
          .status(400)
          .send("the attendances  already exists!");
      } else {
        const query =
          "INSERT INTO attendances  (student_id,class_id) VALUES ($1, $2)";
        pool
          .query(query, [student_id,class_id])
          .then(() => res.send("attendances  created!"))
          .catch((e) => res.status(400).send(e.message));
      }
    });
});
// ... select all attendances from the attendances table
app.get("/attendances",function (req, res) {
  pool
    .query("SELECT * FROM classes")
    .then((result) => res.json(result.rows))
    .catch((e) => res.status(400).send(e.message));
});



// Trickier:
// get all attendance records of a given class

app.listen(5000, function () {
  console.log("Server is listening on port 5000. Ready to accept requests!");
});
