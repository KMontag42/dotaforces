function OnClientPutInServer(client){
	if(client.isFake() || client.isSourceTV() || client.isReplay()) return;
	if(game.getTeamClientCount(2) < game.getTeamClientCount(3)){
		client.fakeCommand("jointeam good");
	}else{
		client.fakeCommand("jointeam bad");
	}
}