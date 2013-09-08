/*
 * RADIANT HARD CAMP FIRST - [ -1096.3 -4473.1 1164.7 ]
 * 
 */

DF = {};

require('timers');
_ = require('underscore.js');

var cvCreepsNoSpawning  = console.findConVar("dota_creeps_no_spawning"),
    cvWaiting           = console.findConVar("dota_wait_for_players_to_load_timeout");

// http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html
// DF.towerMan = (function() {
//     var my = {};

//     my.blah = function() {
//         server.print('blah)');
//     }

//     return my;
// }());
// DF.towerMan.blah();
// DF.towerMan = (function() {} (DF.towerMan));
// DF.towerMan.blah();

DF.onMapStart = function() {
    var centaur_sensai = dota.createUnit("npc_dota_neutral_centaur_khan", 1),
        originWaypoint = game.createEntity('info_target'),
        skewer = dota.createAbility(centaur_sensai, "magnataur_shockwave");

    towers = game.findEntitiesByClassname('npc_dota_tower');
    // if (towers[0]) {
    //     towers.forEach(function(tower) {
    //         var tower_friend = game.createEntity("npc_dota_barracks");

    //         switch (tower.getClassname()) {
    //             case "dota_goodguys_tower4":
    //                 server.print('###################### hit switch');
    //                 tower.teleport(-5000,-5000,128);
    //                 break;
    //             case "dota_goodguys_tower2_mid":
    //                 var headshot = dota.createAbility(tower_2, "huskar_burning_spear");
    //                 headshot.netprops.m_bInAbilityPhase = true;
    //                 headshot.netprops.m_bAutoCastState = true;
    //                 headshot.netprops.m_iLevel = 4;
    //                 dota.setAbilityByIndex(tower_2, headshot, 0);
    //                 break;
    //             default:
    //                 break;
    //         }

    //         dota.findClearSpaceForUnit(tower_friend, tower.netprops.m_vecOrigin);
    //         dota.giveItemToHero("item_greater_crit", tower);
    //         dota.giveItemToHero("item_basher", tower);
    //         dota.giveItemToHero("item_desolator", tower);
    //         dota.giveItemToHero("item_hyperstone", tower);
    //         tower.changeTeam(dota.TEAM_DIRE);
    //         dota.removeModifier(tower, "invulnerable");
    //     });
    // }

    dota.removeAll('npc_dota_tower');

    dota.findClearSpaceForUnit(centaur_sensai, 1500,1500,16);
    originWaypoint.teleport(0, 0, 0);
    dota.setUnitWaypoint(centaur_sensai, originWaypoint);
    dota.giveItemToHero("item_basher", centaur_sensai);
    dota.giveItemToHero("item_hyperstone", centaur_sensai);
    dota.giveItemToHero("item_bfury", centaur_sensai);
    skewer.netprops.m_iLevel = 4;
    dota.setAbilityByIndex(centaur_sensai, skewer, 0);
    centaur_sensai.netprops.m_iLevel = 30;
    centaur_sensai.changeTeam(dota.TEAM_DIRE);
};
game.hook("OnMapStart", DF.onMapStart);

DF.onUnitThink = function() {
    towers = game.findEntityByTargetname("dota_goodguys_tower2_mid");
    if (towers) {
        dota.setUnitState(towers, dota.UNIT_STATE_INVULNERABLE, false);
    }

    goodguys_fort = game.findEntityByTargetname("npc_dota_goodguys_fort");
    if (goodguys_fort) {
        dota.setUnitState(goodguys_fort, dota.UNIT_STATE_INVULNERABLE, false);
    }



    player = game.findEntitiesByClassname("npc_dota_hero_abaddon");
    if (player[0]) {
        
    }
};
game.hook("Dota_OnUnitThink", DF.onUnitThink);

DF.onGameFrame = function() {
	if ( game.rules.props.m_nGameState === dota.STATE_INIT )
    {
		cvWaiting.setInt( 8 );
    }
    cvCreepsNoSpawning.setInt(0);
};
game.hook("OnGameFrame", DF.onGameFrame);