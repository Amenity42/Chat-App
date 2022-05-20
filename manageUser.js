//Login
//Register

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

//let existsUser = db.run(`SELECT * FROM users`);

getData();
getSelectedUserData();

//Handle get all data back from database
async function getData(){

	let myVar = await handleGetAllData();

	console.log(myVar);

}

//Handle get selected data back from database
async function getSelectedUserData(){

	let myVar = await handleGetSelectedUserData();

	console.log(myVar);

}


//Handle get selected data back from database
function handleGetSelectedUserData(){
      const  selectSql = `SELECT * FROM users WHERE username = 'testUsername'`;

      return new Promise( (resolve, reject) => {    

                  db.all(selectSql, (err, rows) => {
            
                         if(err){
                  
                              reject(new Error(err.message));
                  
                         } else {
      
                              resolve(rows);
                  
                         } 
      
                   });

            });
      };


//Hanlde get all data back from database
function handleGetAllData(){
      const  selectSql = `SELECT * FROM users`;

      return new Promise( (resolve, reject) => {    

                  db.all(selectSql, (err, rows) => {
            
                         if(err){
                  
                              reject(new Error(err.message));
                  
                         } else {
      
                              resolve(rows);
                  
                         } 
      
                   });

            });
      };

//db.run("INSERT INTO users(username, password) VALUES('"+loginInput.loginUsername+"', '"+loginInput.loginPassword+"')");