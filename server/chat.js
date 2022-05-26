//Login
//Register
const sqlite3 = require("sqlite3");
const dbMethods = require('./dbConnection');


async function newUser(user){
	let validUname = onlyLettersAndNumbers(user.inputUsername); //true / false
	let validPword = onlyLettersAndNumbers(user.inputPassword);
	if(user.inputUsername.length>20){
		return 6
	}
	if(user.inputUsername.length<3){
		return 7
	}
	if(user.inputPassword.length>20){
		return 8
	}
	if(user.inputPassword.length<6){
		return 9
	}
	if (validPword === true && validUname === true) {
		user.inputPassword = random(user.inputPassword);
		let checkUserExists = await dbMethods.sqlUserExists(user);
		if(checkUserExists[0]!=undefined){
			console.log('Username is already taken');
			return 3
		} else {
			dbMethods.addRow(user.inputUsername, user.inputPassword);
			return 4;
		}
	} else {
		console.log('Username/password cannot contain non letter/number/underscore characters.');
		return 5
	};
}

async function checkUser(user) {

	//waits till db loaded
	let validUname = onlyLettersAndNumbers(user.inputUsername); //true / false
	let validPword = onlyLettersAndNumbers(user.inputPassword);

	//Check if username and password have valid characters
	if (validPword === true && validUname === true) {
		user.inputPassword = random(user.inputPassword);
		let checkUserExists = await dbMethods.sqlUserExists(user);
		//Check user is in db		
		if(checkUserExists[0]!=undefined){
			//Check password is correct
			if (checkUserExists[0].password === user.inputPassword.toString()) {
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
	return /^[A-Za-z0-9_]*$/.test(str);
}

function random(seed) {
	let tmpstr="";
	for(i=0;i<seed.length;i++){
		tmpstr += seed.charCodeAt(i)
	}
	var x = Math.sin(tmpstr++) * 10000;
	return x - Math.floor(x);
}

//db.run("INSERT INTO users(username, password) VALUES('"+loginInput.inputUsername+"', '"+loginInput.inputPassword+"')");

module.exports = {checkUser, newUser};