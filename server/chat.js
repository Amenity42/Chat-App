//Login
//Register
const sqlite3 = require("sqlite3");

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



async function checkUser(user) {

	console.log(`This is the user obj: ${user}`);
	//waits till db loaded
	let validUname = onlyLettersAndNumbers(user.inputUsername); //true / false
	let validPword = onlyLettersAndNumbers(user.inputPassword);

	console.log(`username check: ${validUname}`); 
	console.log(`password check: ${validPword}`);

	const checkUserExists = await sqlUserExists(user)[0];

	sqlUserExists(user)[0]
	.then(function (success)
	{

	})
	.cat

	if(checkUserExists === undefined){

		console.log(sqlUserExists(user));
		console.log(`user does not exist in db`);
		return 2;

	}

	if (validPword === true && validUname === true) {

		

		if (checkUserExists.password === user.inputPassword) {

			console.log('Password Matches');
			return 1;
		} else {
			console.log(`Password does not match`);
			return 0;
		}
	}else{
		console.log('Error');
	return new error("Invalid Password/Username");
	};


};

function sqlUserExists(user) {

	console.log(`Checking db for user `);
	//return 1 or 0 based on if user exists
	const sqlStatement = `SELECT * FROM users WHERE username = '${user.inputUsername}'`;
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

	console.log(`Checking if string is letters and numbers: ${str}`); //! undefined

	return /^[A-Za-z0-9]*$/.test(str);
}

//db.run("INSERT INTO users(username, password) VALUES('"+loginInput.inputUsername+"', '"+loginInput.inputPassword+"')");


module.exports = {checkUser};