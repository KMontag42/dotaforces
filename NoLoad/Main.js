game.hook("OnGameFrame", onGameFrame);

function onGameFrame(){
	server.command("dota_wait_for_players_to_load_count 1");
}