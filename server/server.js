const express = require('express');
const sqlite3 = require("sqlite3");
const dbMethods = require("./dbConnection");
const app = express();
const port = 3000;


app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
});

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

//*--------------------DB Connection-----------------------


dbMethods.connectToDb();


//*-------------------------API---------------------------



//*------- Get Requests ---------

// * Promise based
app.get("/getusers/:id", async (request, response) => {

      const test = await dbMethods.getDataById(request.params.id); //Parses in a obj
      
      response.json(cafes);

});

// * Promise based
app.get("/getAllUsers", async (request, response) => {

      const test = await dbMethods.getAllData(); //Parses in a obj
      
      response.json(test);

});

