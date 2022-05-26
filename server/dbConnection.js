
const sqlite = require("sqlite3");
let db = undefined;

//*------Connect to db--------

function connectToDb(){

      db = new sqlite.Database("./users.db", sqlite.OPEN_READWRITE, (err) => {

            if(err){
            
                  return console.error(err.message);
            
            } else {
            
                  console.log("Success!");            
            
            }
      
      });

}

      


//*-------------------------------[ List all Tables ]--------------------------------------

// function getTables(){
//       //Get tables from db

//       if(db === undefined){

//             console.error('Db has not yet been connected');

//       } else {

//             db.serialize(() => {

//                   db.each("SELECT name FROM sqlite_schema WHERE type='table'", (err, data) => console.log(data));

//             });

//       }

// }


//*------------------------------[ Get data from table ]---------------------------------


// //Uses promises
// function getAllData(){
//       const  selectSql = `SELECT * FROM users`;

//       return new Promise((resolve, reject) => {    
//             if (!db) {

//                   reject(new Error('Db has not yet been connected'));

//              } else {
      
//                   db.all(selectSql, (err, rows) => {
            
//                          if(err){
                  
//                               reject(new Error(err.message));
                  
//                          } else {
      
//                               resolve(rows);
                  
//                          } 
      
//                    });

//             }
//       });


// }


//*----------------------------[ Add data row table ]-----------------------------------


function addRow(usn, pwd){

      const InsertSqlData = `INSERT INTO users (username, password) VALUES('${usn}', '${pwd}')`

      return new Promise((resolve, reject) => {    
            if (!db) {

                  reject(new Error('Db has not yet been connected'));

                  } else {
      
                  db.run(InsertSqlData, (err, rows) => {
            
                              if(err){
                  
                              reject(new Error(err.message));
                  
                              } else {
      
                              resolve(`Row Created!`);
                  
                              } 
      
                        });

            }
      });

}

//*------------------------------[ Get by ID from table ]---------------------------------


// //Uses promises
// function getDataById(id){
//       const  selectSql = `SELECT * FROM users WHERE id = ${id}`;

//       return new Promise((resolve, reject) => {    
//             if (!db) {

//                   reject(new Error('Db has not yet been connected'));

//              } else {
      
//                   db.all(selectSql, (err, rows) => {
            
//                          if(err){
                  
//                               reject(new Error(err.message));
                  
//                          } else {
      
//                               resolve(rows);
                  
//                          } 
      
//                    });

//             }
//       });


// }


//*-----------------------------------[ Edit data ]--------------------------------------


// function editData(propertyName, newProperty, id){

//       const table = 'users';
//       const editSql = `UPDATE ${table} SET ${propertyName} = '${newProperty}' WHERE id = ${id};`


//       return new Promise((resolve, reject) => {    
//             if (!db) {

//                   reject(new Error('Db has not yet been connected'));

//              } else {
      
//                   db.run(editSql, (err, rows) => {
            
//                          if(err){
                  
//                               reject(new Error(err.message));
                  
//                          } else {
      
//                               resolve(console.log('Row updated'));
                  
//                          } 
      
//                    });

//             }

//       });


// }

//------Check user exists based on username

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



//Call back function

// function getAllData(callback){
//       const  selectSql = `SELECT * FROM Restaurant`;

//       if (!db) {

//             callback(new Error('Db has not yet been connected'));

//       } else {

//             db.all(selectSql, (err, rows) => {
      
//                         if(err){
            
//                         callback(new Error(err.message));
            
//                         } else {

//                         callback(rows);
            
//                         } 

//                   });

//       }


// }



//*---------------------------


module.exports = {connectToDb, addRow, sqlUserExists};



