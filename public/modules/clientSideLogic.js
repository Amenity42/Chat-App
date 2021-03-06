
const socket = io('http://localhost:8080');
const messageInput = document.getElementById('messageInput');
const messageContainer = document.getElementById('messageContainer');
const sendBtn = document.getElementById('messageSend');
const logOutBtn = document.getElementById('logOut');

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

//prevent user opening chat page without logging in
if(username===undefined || username ===null || username ==="null"){
	window.location.href = './index.html';
}


if (sendBtn !== null || messageInput !== null) {

	sendBtn.addEventListener('click', handleMessage);
	messageInput.addEventListener('keydown', (key) => {
		if (key.keyCode === 13) {
			//keycode is depreciated ---  need to use something else ...

			handleMessage();

		}
	});

}

if (logOutBtn !== null) { //log out
	logOutBtn.addEventListener('click', logOut);
}

function logOut(){
	setUserName(null)
	localStorage.setItem('userName', null);
	window.location.href = './index.html';
}

function handleMessage() {
	let fromUser = 'yes';

	if (messageInput.value === '' || messageInput.value === null) {
		console.log('No message to display');
		return;
	}

	console.log(messageInput.value);

	const message = new Message(messageInput.value, username); // To change to user

	postMessageToChat(message, fromUser);

	messageInput.value = null;

	sendDataToServer(message);
}

function postMessageToChat(message, fromUser) {

	const messagePacket = document.createElement('div');

	messagePacket.id = 'message';
	messagePacket.className = 'message';

	
	//Check if message is external or from client
	if(fromUser === 'yes'){

		messagePacket.style.background = 'rgba(181, 180, 180, 0.562)';

	}
	else{

		messagePacket.style.background = '#a1dcfeb7';

	}

	messagePacket.innerHTML = `<b>${message.user}:</b> &nbsp;  ${message.message} &nbsp;`;

	messageContainer.appendChild(messagePacket);

	messageContainer.scrollTop = messageContainer.scrollHeight;

	console.table(message);
}

function notifications(notification) {

	const notificationElement = document.getElementById("notification");
	const notificationText = document.getElementById('notificationText');

	if (notification !== undefined) {
		notificationsArray.push(notification);
	}

	console.log(notificationsArray);

	if (animCounter === 0) {
		animCounter = 1;
		//Display notification

		notificationElement.style.display = 'block';

		notificationText.innerHTML = `${notificationsArray[notificationsArray.length - 1]} Just logged in!`;

		//Animation timers 
		setTimeout(() => {

			notificationElement.style.opacity = 1;
			notificationText.style.opacity = 1;
			notificationElement.style.width = '300px';

		}, 100);

		setTimeout(() => {

			notificationElement.style.opacity = 0;
			notificationElement.style.width = '0px';

		}, 2000);

		setTimeout(() => {

			notificationElement.style.display = 'none';

			notificationsArray.pop();

			console.log(notificationsArray);
			animCounter = 0;

			if (notificationsArray.length > 0) {
				notifications();
			}

		}, 3000);


	}



}




//*------------------------Sockets------------------------
function sendDataToServer(message) {

	socket.emit('message', message);

}

function onlineNotification() {

	socket.emit('userLoggedIn', username);

}


socket.on('recMessage', (message) => {

	postMessageToChat(message);

});

//Display notifications to screen
socket.on('notification', (notification) => {

	notifications(notification);

});

const icons = ["../icons/Icon1.png", "../icons/Icon2.png", "../icons/Icon3.png", "../icons/Icon4.png"];
let randomIcon = icons[Math.floor(Math.random() * icons.length)];
document.getElementById("userIcon").src = randomIcon;