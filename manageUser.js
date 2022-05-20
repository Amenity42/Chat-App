//Login
//Register
const { exists } = require("dottie");
const sqlite3 = require("sqlite3");

//connect to DB
const db = new sqlite3.Database(
	"./users.db",
	sqlite3.OPEN_READWRITE,
	(err) => {
		if (err) {
			return console.error(err.message);
		} else {
			console.log("\nSuccess!\n"); 
		}
	}
);

let loginInput = {loginUsername:"testUsername", loginPassword:"testPassword"}

let existsUser = db.run(`SELECT EXISTS (SELECT 1 FROM users WHERE username = 'testUsername')`);

console.log(existsUser);

//db.run("INSERT INTO users(username, password) VALUES('"+loginInput.loginUsername+"', '"+loginInput.loginPassword+"')");