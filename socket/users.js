let users = [];

export const userConnected = socket => {
	users.push(socket.id);
	socket.broadcast.emit('userConnected', users);
	console.log(`Online users`, users);
};
export const userDisConnected = socket => {
	users = users.filter(id => id !== socket.id);

	socket.broadcast.emit('userDisConnected', users);
	console.log(`Online users:`, users);

	socket.disconnect();
};
