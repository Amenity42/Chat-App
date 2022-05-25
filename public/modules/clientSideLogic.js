
const socket = io('http://localhost:8080');
const messageInput = document.getElementById('messageInput');
const messageContainer = document.getElementById('messageContainer');
const sendBtn = document.getElementById('messageSend');

let username = undefined;
let animCounter = 0;
let notificationsArray = [];

class Message {
	constructor(message, user) {
		this.message = message;
		this.user = user;
	}
}


//Set user name at top of screen
function setUserName(name) {

	const userNameDisplay = document.getElementById('userNameDisplay')

	username = name;

	// console.log(`Username: ${username}`);

	userNameDisplay.innerHTML = username;

}

//Set the user name then let the server know who logged in so it can be broadcast
setUserName(localStorage.getItem('userName'));
onlineNotification();

<<<<<<< HEAD



if(sendBtn !== null || messageInput !== null){
=======
//prevent user opening chat page without logging in
if(username===undefined || username ===null){
	window.location.href = './index.html';
}


if (sendBtn !== null || messageInput !== null) {
>>>>>>> main

	sendBtn.addEventListener('click', handleMessage);
	messageInput.addEventListener('keydown', (key) => {
		if (key.keyCode === 13) {
			//keycode is depreciated ---  need to use something else ...
<<<<<<< HEAD
	
			handleMessage();
			
=======

			handleMessage();

>>>>>>> main
		}
	});

}


function handleMessage() {

	if (messageInput.value === '' || messageInput.value === null) {
		console.log('No message to display');
		return;
	}

	console.log(messageInput.value);

	const message = new Message(messageInput.value, username); // To change to user

	postMessageToChat(message);

	messageInput.value = null;

	sendDataToServer(message);
}

function postMessageToChat(message) {

	const messagePacket = document.createElement('div');

	messagePacket.id = 'message';
	messagePacket.className = 'message';

	messagePacket.innerHTML = `${message.user}: ${message.message}`;

	messageContainer.appendChild(messagePacket);

	console.table(message);
}

<<<<<<< HEAD
function notifications(notification){
=======
function notifications(notification) {
>>>>>>> main

	const notificationElement = document.getElementById("notification");
	const notificationText = document.getElementById('notificationText');

<<<<<<< HEAD
	if(notification !== undefined){
		notificationsArray.push(notification);
	}
	
	console.log(notificationsArray);

	if(animCounter === 0){
=======
	if (notification !== undefined) {
		notificationsArray.push(notification);
	}

	console.log(notificationsArray);

	if (animCounter === 0) {
>>>>>>> main
		animCounter = 1;
		//Display notification

		notificationElement.style.display = 'block';

<<<<<<< HEAD
		notificationText.innerHTML = `${notificationsArray[notificationsArray.length -1]} Just logged in!`;
=======
		notificationText.innerHTML = `${notificationsArray[notificationsArray.length - 1]} Just logged in!`;
>>>>>>> main

		//Animation timers 
		setTimeout(() => {

			notificationElement.style.opacity = 1;
			notificationText.style.opacity = 1;
			notificationElement.style.width = '300px';
<<<<<<< HEAD
			
=======

>>>>>>> main
		}, 100);

		setTimeout(() => {

			notificationElement.style.opacity = 0;
<<<<<<< HEAD
			notificationElement.style.width = '0px'; 
			
		}, 2000);
		
=======
			notificationElement.style.width = '0px';

		}, 2000);

>>>>>>> main
		setTimeout(() => {

			notificationElement.style.display = 'none';

			notificationsArray.pop();

			console.log(notificationsArray);
			animCounter = 0;

<<<<<<< HEAD
			if(notificationsArray.length > 0){
=======
			if (notificationsArray.length > 0) {
>>>>>>> main
				notifications();
			}

		}, 3000);


	}



<<<<<<< HEAD
	}
=======
}
>>>>>>> main




//*------------------------Sockets------------------------
<<<<<<< HEAD
function sendDataToServer(message){
=======
function sendDataToServer(message) {
>>>>>>> main

	socket.emit('message', message);

}

<<<<<<< HEAD
function onlineNotification(){
=======
function onlineNotification() {
>>>>>>> main

	socket.emit('userLoggedIn', username);

}


socket.on('recMessage', (message) => {

	postMessageToChat(message);

<<<<<<< HEAD
} );
=======
});
>>>>>>> main

//Display notifications to screen
socket.on('notification', (notification) => {

	notifications(notification);

<<<<<<< HEAD
} );





=======
});

const icons = ["Icon1.png", "Icon2.png", "Icon3.png", "Icon4.png"];
let randomIcon = icons[Math.floor(Math.random() * icons.length)];
document.getElementById("userIcon").src = randomIcon;
>>>>>>> main
