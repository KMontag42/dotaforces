// Clearly this is dennis mode.

var score = require('victory.js').Score;
require('items.js');
require('map.js');
require('respawn.js');

var cvCreepsNoSpawning = console.findConVar("dota_creeps_no_spawning"),
	cvEasyMode = console.findConVar("dota_easy_mode"),
	frameCount = 0;

game.hook("OnGameFrame", onGameFrame);
game.hook("Dota_OnHeroPicked", onHeroPicked);

function onGameFrame() {
	var client, hero, i, myScore, xp, lvl;

	cvCreepsNoSpawning.setInt(1);
	cvEasyMode.setInt(1);
/*
	frameCount++;

	if (frameCount % 10 === 0) {
		for (i = 0; i < server.clients.length; ++i) {
			client = server.clients[i];
			if (!client) { continue; }

			hero = client.netprops.m_hAssignedHero;
			if (!hero) { continue; }

			myScore = (hero.netprops.m_iTeamNum === dota.TEAM_DIRE) ? score.radiant : score.dire;

			myScore /= 10;
			myScore += 1;
			myScore *= 10;

			print (" adding " + myScore);

			xp = hero.netprops.m_iCurrentXP;
			lvl = hero.netprops.m_iCurrentLevel;

			xp = xp + myScore;
			xp = Math.min(dota.getTotalExpRequiredForLevel(lvl + 1), xp);

			hero.netprops.m_iCurrentXP = xp;
		}
	}
*/
}

function onHeroPicked(client) {
	client.printToChat("Welcome to MNI Mode! This is an arena game mode where, after leaving the well, you will be teleported into a small battle area. Fight to the death, try to hold the center valley, and remember that you can only buy consumables with starting gold!");
	client.printToChat("The secret shop is at the tower in the center.");
}
