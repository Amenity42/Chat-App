const express = require('express');
const sqlite3 = require("sqlite3");
const app = express();
const port = 3000;

let restArray = [];

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
});

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// const db = new sqlite3.Database(
// 	"./users.db",
// 	sqlite3.OPEN_READWRITE,
// 	(err) => {
// 		if (err) {
// 			return console.error(err.message);
// 		} else {
// 			console.log("\nSuccess!\n"); 
// 		}
// 	}
// );

