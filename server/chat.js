//Login
//Register
const sqlite3 = require("sqlite3");
let db = undefined;
//connect to DB
async function connectToDb(){
    db = new sqlite3.Database("server/users.db", sqlite3.OPEN_READWRITE, (err) => {
          if(err){
                return console.error(err.message);
          } else {
                console.log("Success!");            
          }
    });
}

let loginInput = {loginUsername:"testUsername", loginPassword:"testPassword"} //test data from front end

async function getUserExists(user) { //return 1 or 0 based on if user exists
	
	const djsad =  db.run(`SELECT * FROM users`);
	return db.run(`SELECT EXISTS (SELECT 1 FROM users WHERE username = '${user.loginUsername}')`);

}

connectToDb()

setTimeout(() => {
    let userExists = getUserExists(loginInput)
    console.table(userExists);
}, 100);


//db.run("INSERT INTO users(username, password) VALUES('"+loginInput.loginUsername+"', '"+loginInput.loginPassword+"')");