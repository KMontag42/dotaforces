var playerProps = new Array(dota.MAX_PLAYERS);

game.hook("OnMapStart", onMapStart);

game.hookEvent("last_hit", onLastHit);
game.hookEvent("dota_player_kill", onPlayerKill);

function onMapStart(){
	for(var i = 0; i < playerProps.length; ++i){
		playerProps[i] = {
			modelScaleChanged: 0.0
		};
	}
}

function onLastHit(event){
	var playerId = event.getInt("PlayerID");
	
	changeModelScale(playerId, 0.01);
}

function onPlayerKill(event){
	var killer1 = server.userIdToClient(event.getInt("killer1_userid"));
	var killer2 = server.userIdToClient(event.getInt("killer2_userid"));
	var killer3 = server.userIdToClient(event.getInt("killer3_userid"));
	var killer4 = server.userIdToClient(event.getInt("killer4_userid"));
	var killer5 = server.userIdToClient(event.getInt("killer5_userid"));
	var bounty = event.getInt("bounty");
	
	if(killer1) changeModelScale(killer1.netprops.m_iPlayerID, (bounty / 50) * 0.01);
	if(killer2) changeModelScale(killer2.netprops.m_iPlayerID, (bounty / 50) * 0.01);
	if(killer3) changeModelScale(killer3.netprops.m_iPlayerID, (bounty / 50) * 0.01);
	if(killer4) changeModelScale(killer4.netprops.m_iPlayerID, (bounty / 50) * 0.01);
	if(killer5) changeModelScale(killer5.netprops.m_iPlayerID, (bounty / 50) * 0.01);
}

function changeModelScale(playerId, amount){
	if(playerId == -1) return;
	if (playerProps[playerId].modelScaleChanged > 3) return;
	var client = dota.findClientByPlayerID(playerId);
	if(!client) return;
	
	var hero = client.netprops.m_hAssignedHero;
	if (hero && hero.netprops.m_flModelScale){
		hero.netprops.m_flModelScale += amount;
		playerProps[playerId].modelScaleChanged += amount;
	}
}