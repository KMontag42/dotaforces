DF.chatLog = function(output) {
	for(i = 0; i < server.clients.length; ++i) {
		client = server.clients[i];
		if (client && client.isInGame()) {
			client.printToChat("output");
		}
	}
};