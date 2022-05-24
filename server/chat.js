//Login
//Register
const sqlite3 = require("sqlite3");
const dbMethods = require('./dbConnection');

const db = new sqlite3.Database(
	"users.db",
	sqlite3.OPEN_READWRITE,
	(err) => {
		if (err) {
			return console.error(err.message);
		} else {
			console.log("\nSuccess connected to db!\n");
		}
	}
);

async function newUser(user){
	let validUname = onlyLettersAndNumbers(user.inputUsername); //true / false
	let validPword = onlyLettersAndNumbers(user.inputPassword);
	if (validPword === true && validUname === true) {
		let checkUserExists = await dbMethods.sqlUserExists(user);
		if(checkUserExists[0]!=undefined){
			console.log('Username is already taken');
			return 0
		} else {
			dbMethods.addRow(user.inputUsername, user.inputPassword);
			return 1;
		}
	} else {
		console.log('Username/password cannot contain non letter/number/underscore characters.');
		return 2
	};
}

async function checkUser(user) {

	console.log(`This is the user obj: ${user}`);
	//waits till db loaded
	let validUname = onlyLettersAndNumbers(user.inputUsername); //true / false
	let validPword = onlyLettersAndNumbers(user.inputPassword);

	console.log(`username check: ${validUname}`); 
	console.log(`password check: ${validPword}`);

	//Check if username and password have valid characters
	if (validPword === true && validUname === true) {
		let checkUserExists = await dbMethods.sqlUserExists(user);
	//Check user is in db		
	if(checkUserExists[0]!=undefined){
		//Check password is correct
		if (checkUserExists[0].password === user.inputPassword) {
			console.log('Password Matches');
			return 1;
		} else {
			console.log(`Password does not match`);
			return 0;
		}
	} else {
		console.log('User does not exist');
		return 2;
	}
	} else {
		console.log('Error');
	return new error("Invalid Password/Username");
	};
};

function onlyLettersAndNumbers(str) {
	console.log(`Checking if string is letters and numbers: ${str}`); //! undefined
	return /^[A-Za-z0-9_]*$/.test(str);
}

//db.run("INSERT INTO users(username, password) VALUES('"+loginInput.inputUsername+"', '"+loginInput.inputPassword+"')");

module.exports = {checkUser, newUser};