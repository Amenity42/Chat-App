const express = require('express');
const sqlite3 = require('sqlite3');

const checkUser = require('./chat')

const dbMethods = require('./dbConnection');
const app = express();
const port = 3000;

const socket = require('socket.io')(8080, {

	cors: { origin: '*' }

});

//Socket.io testing stuff

socket.on('connection', (socket) => {
      
	console.log(socket.id);

      socket.on('message', (message) => {

            console.log(message);
      
      });
      
});



//----------------

app.use(express.static('../public'));

app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}`);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); //Turns recived data back into JS object

//*--------------------DB Connection-----------------------

dbMethods.connectToDb();

//*-------------------------API---------------------------

//*------- Get Requests ---------

// * Promise based
app.get('/getusers/:id', async (request, response) => {
	const test = await dbMethods.getDataById(request.params.id); //Parses in a obj

	response.json(cafes);
});

// * Promise based
app.get('/getAllUsers', async (request, response) => {
	const test = await dbMethods.getAllData(); //Parses in a obj

	response.json(test);
});

// * Promise based
app.post('/userInfo', async (request, response) => {

	const data = request.body;

	//console.log(data);

	const result = await checkUser.checkUser(data);

	console.log(result);

	//response.sendStatus(200);

	response.send(JSON.stringify(result));

});
