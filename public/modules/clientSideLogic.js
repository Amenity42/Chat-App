

const socket = io('http://localhost:8080');
let username = undefined;

class Message {
	constructor(message, user) {
		this.message = message;
		this.user = user;
	}
}



function setUserName(name) {

	username = name;

	console.log(`Username: ${username}`);

}

setUserName(localStorage.getItem('userName'));

console.log(`Username: ${username}`);


const messageInput = document.getElementById('messageInput');
const messageContainer = document.getElementById('messageContainer');
const sendBtn = document.getElementById('messageSend');

if(sendBtn !== null || messageInput !== null){

	sendBtn.addEventListener('click', handleMessage);
	messageInput.addEventListener('keydown', (key) => {
		if (key.keyCode === 13) {
			//keycode is depreciated ---  need to use something else ...
	
			handleMessage();
			
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

function sendDataToServer(message){

	socket.emit('message', message);

}

socket.on('recMessage', (message) => {

	postMessageToChat(message);

} );


