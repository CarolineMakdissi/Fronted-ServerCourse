const express = require("express"); // Installing express
const app = express(); // Create a express server-object
const port = 3600; // Wich is running at "port 3600"

app.use(express.static("guestbook")); // Needed to process data that is handled with GET
app.use(express.urlencoded({ extended: true })); // needed to process data that is send with POST


/**** GET ****/
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/guestbook/guestbook.html"); //Informatin from guestbook.html file
});


/**** POST ****/
app.post("/submit-form", function (req, res) {
  const { namn, email, homepage, tel, message } = req.body;
  //Building the HTML string for the user information
  const userData = `
  <p>Namn: ${namn}</p>
  <p>Email: ${email}</p>
  <p>Homepage: ${homepage}</p>
  <p>Tel: ${tel}</p>
  <p>Kommentar: ${message}</p>
`;

res.send(userData); 
});


app.listen(port, () => { 
console.log(`Server is running on port ${port}`);
});



