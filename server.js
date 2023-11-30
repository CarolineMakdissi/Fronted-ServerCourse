const express = require("express"); // Installing express
const app = express(); // Create a express server-object
const port = 3600; // Wich is running at "port 3600"
const mysql = require("mysql"); // Install mysql
const fs = require("fs");

// Needed to process data that is handled with GET
app.use(express.static('public'));
app.listen(port, () => { 
  console.log(`Server is running on port ${port}`);
});

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "forum_db",
});

app.use(express.urlencoded({ extended: true })); // behövs för att processa data som skickats med POST

app.get("/", function (req, res) {
  const htmlTemplatePath = __dirname + "/guestbook.html";
  fs.readFile(htmlTemplatePath, "utf8", (err, htmlData) => {
    if (err) {
      return res.status(500).send("Error reading the HTML file");
    }

    db.query("SELECT * FROM guestbook", [], (err, results) => {
      if (err) throw err;

      // om inga inlägg skicka orginal html
      if (results.length === 0) {
        res.send(htmlData);
      } else {
        let commentHTML = "";
        results.forEach((item) => {
          commentHTML =
            commentHTML +
            `<div>${item.message} - skriven av: ${item.name} (${item.email})</div><br />`;
        });
        // vi lägger in kommentarer i htmlen
        const finalHTML = htmlData.replace("<!-- NODEJS-DATA-->", commentHTML);

        // Skicka hela html till klienten
        res.send(finalHTML);
      }
    });
  });
});

app.post("/submit-guestbook-form", function (req, res) {
  const { namn, email, message } = req.body;
  // använd ? metoden för att undvika mysql injections
  const query = "INSERT INTO guestbook (name, email, message) VALUES (?, ?, ?)";

  db.query(query, [namn, email, message], (err) => {
    if (err) throw err;
    // IF everything is ok we refresh guestbook page
    res.redirect(`/`);
  });
});