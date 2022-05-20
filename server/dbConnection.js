
const sqlite = require("sqlite3");
let db = undefined;

//*------Connect to db--------

function connectToDb(){

      db = new sqlite.Database("users.db", sqlite.OPEN_READWRITE, (err) => {

            if(err){
            
                  return console.error(err.message);
            
            } else {
            
                  console.log("Success!");            
            
            }
      
      });

}

      


//*-------------------------------[ List all Tables ]--------------------------------------

function getTables(){
      //Get tables from db

      if(db === undefined){

            console.error('Db has not yet been connected');

      } else {

            db.serialize(() => {

                  db.each("SELECT name FROM sqlite_schema WHERE type='table'", (err, data) => console.log(data));

            });

      }

}


//*------------------------------[ Get data from table ]---------------------------------


//Uses promises
function getAllData(){
      const  selectSql = `SELECT * FROM users`;

      return new Promise((resolve, reject) => {    
            if (!db) {

                  reject(new Error('Db has not yet been connected'));

             } else {
      
                  db.all(selectSql, (err, rows) => {
            
                         if(err){
                  
                              reject(new Error(err.message));
                  
                         } else {
      
                              resolve(rows);
                  
                         } 
      
                   });

            }
      });


}


//*----------------------------[ Add data row table ]-----------------------------------


function addRow(Name, imagelink){

      const InsertSqlData = `INSERT INTO users (NAME, imagelink) VALUES('${Name}', '${imagelink}')`

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


//Uses promises
function getDataById(id){
      const  selectSql = `SELECT * FROM users WHERE id = ${id}`;

      return new Promise((resolve, reject) => {    
            if (!db) {

                  reject(new Error('Db has not yet been connected'));

             } else {
      
                  db.all(selectSql, (err, rows) => {
            
                         if(err){
                  
                              reject(new Error(err.message));
                  
                         } else {
      
                              resolve(rows);
                  
                         } 
      
                   });

            }
      });


}


//*-----------------------------------[ Edit data ]--------------------------------------


function editData(propertyName, newProperty, id){

      const table = 'users';
      const editSql = `UPDATE ${table} SET ${propertyName} = '${newProperty}' WHERE id = ${id};`


      return new Promise((resolve, reject) => {    
            if (!db) {

                  reject(new Error('Db has not yet been connected'));

             } else {
      
                  db.run(editSql, (err, rows) => {
            
                         if(err){
                  
                              reject(new Error(err.message));
                  
                         } else {
      
                              resolve(console.log('Row updated'));
                  
                         } 
      
                   });

            }

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


module.exports = {getAllData, getTables, connectToDb, getDataById, editData, addRow};



