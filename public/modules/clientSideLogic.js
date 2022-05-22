class Message {
	constructor(message, user) {
		this.message = message;
		this.user = user;
	}
}

const messageInput = document.getElementById('messageInput');
const messageContainer = document.getElementById('messageContainer');

const sendBtn = document
	.getElementById('messageSend')
	.addEventListener('click', handleMessage);
const enterBtn = messageInput.addEventListener('keydown', (key) => {
	if (key.keyCode === 13) {
		//keycode is depreciated ---  need to use something else ...

		handleMessage();
	}
});

function handleMessage() {
	
	if (messageInput.value === '' || messageInput.value === null) {
		console.log('No message to display');
		return;
	}

	console.log(messageInput.value);

	const message = new Message(messageInput.value, 'Richard');

	postMessageToChat(message);

	messageInput.value = null;
}

function postMessageToChat(message) {
    
	const messagePacket = document.createElement('div');

	messagePacket.id = 'message';
	messagePacket.className = 'message';

	messagePacket.innerHTML = `${message.user}: ${message.message}`;

	messageContainer.appendChild(messagePacket);

	console.table(message);
}
