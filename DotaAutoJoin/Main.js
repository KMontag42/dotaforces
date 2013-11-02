game.hook("OnClientPutInServer", onClientPutInServer)

function onClientPutInServer(client){
	if(client.isFake() || client.isSourceTV() || client.isReplay()) return;
	if(game.getTeamClientCount(2) < game.getTeamClientCount(3)){
		client.fakeCommand("jointeam good");
	}else{
		client.fakeCommand("jointeam good");
	}
}

function OnGameFrame(){ server.command("dota_wait_for_players_to_load_count 1"); }