//Login
//Register
const sqlite3 = require("sqlite3");

const db = new sqlite3.Database(
	"server/users.db",
	sqlite3.OPEN_READWRITE,
	(err) => {
		if (err) {
			return console.error(err.message);
		} else {
			console.log("\nSuccess!\n");
		}
	}
);

let loginInput = {
	loginUsername: "testUsername",
	loginPassword: "testPassword",
}; //test data from front end

checkUser(loginInput);




async function checkUser(user) {
	//waits till db loaded
	let validUname = onlyLettersAndNumbers(user.loginUsername);
	let validPword = onlyLettersAndNumbers(user.loginPassword);
	if (validPword === true && validUname === true) {
		let exists = await sqlUserExists(user);
		if (exists[0].password === user.loginPassword) {
			return 1;
		} else {
			return 0;
		}
	}else{
        return new error("Invalid Password/Username");
    };
};

function sqlUserExists(user) {
	//return 1 or 0 based on if user exists
	const sqlStatement = `SELECT * FROM users WHERE username = '${user.loginUsername}'`;
	return new Promise((res, rej) => {
		db.all(sqlStatement, (err, rows) => {
			if (err) {
				rej(new Error(err.message));
			} else {
				res(rows);
			}
		});
	});
}

function onlyLettersAndNumbers(str) {
	return /^[A-Za-z0-9]*$/.test(str);
}

//db.run("INSERT INTO users(username, password) VALUES('"+loginInput.loginUsername+"', '"+loginInput.loginPassword+"')");
