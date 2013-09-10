/*
 * RADIANT HARD CAMP FIRST - [ -1096.3 -4473.1 1164.7 ]
 * ROSHAN PIT
 * 6 oclock     : x=2405, y=-730
 * 8 o'clock    : x=2070, y=-400
 * 10           : x=2060, y=-135
 * 12           : x=2345, y=110
 * 3            : x=2715, y=-95
 * 4            : x=2835, y=-300
 * 5            : x=2815, y=-550  
 */

DF = {};

require('timers');
require('math.js');
require('utils.js');

var cvCreepsNoSpawning  = console.findConVar("dota_creeps_no_spawning"),
    cvWaiting           = console.findConVar("dota_wait_for_players_to_load_timeout");

DF.branch_combo = {};
DF.centaur_sensai = [];
DF.initialized = {};

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
    centaur_sensai = dota.createUnit("npc_dota_neutral_centaur_khan", 1),
    originWaypoint = game.createEntity('info_target'),
    skewer = dota.createAbility(centaur_sensai, "magnataur_shockwave");

    dota.removeAll('npc_dota_tower');

    server.print(centaur_sensai.netprops.m_hItems[0]);

    dota.giveItemToHero("item_basher", centaur_sensai);
    dota.giveItemToHero("item_hyperstone", centaur_sensai);
    dota.giveItemToHero("item_bfury", centaur_sensai);

    DF.mega_stone = centaur_sensai.netprops.m_hItems[1];

    skewer.netprops.m_iLevel = 4;
    dota.setAbilityByIndex(centaur_sensai, skewer, 0);

    centaur_sensai.netprops.m_iLevel = 30;
    centaur_sensai.changeTeam(dota.TEAM_DIRE);
};
game.hook("OnMapStart", DF.onMapStart);

DF.onUnitPreThink = function(unit) {
    //temporary until we have our own AI spawner
    if (unit.getClassname() == "npc_dota_roshan") {
        dota.remove(unit);
    }
};
game.hook("Dota_OnUnitPreThink", DF.onUnitPreThink);

DF.onUnitThink = function(unit) {
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

DF.onHeroSpawn = function(hero) {
    if (hero.getClassname() == "npc_dota_hero_abaddon" && !DF.initialized[hero]) {
        var furion_teleport = dota.createAbility(hero, "furion_teleportation"),
            lone_druid_spirit_bear = dota.createAbility(hero, "lone_druid_spirit_bear"),
            visage_summon_familiars = dota.createAbility(hero, "visage_summon_familiars");

        game.hookEnt(furion_teleport, dota.ENT_HOOK_GET_COOLDOWN, function(level){ return 1; });
        game.hookEnt(furion_teleport, dota.ENT_HOOK_GET_CAST_POINT, function(level) { return 0; });
        dota.setAbilityByIndex(hero, furion_teleport, 1);

        game.hookEnt(lone_druid_spirit_bear, dota.ENT_HOOK_GET_COOLDOWN, function(level) { return 7; });
        game.hookEnt(lone_druid_spirit_bear, dota.ENT_HOOK_GET_MANA_COST, function(level) { return 50; });
        dota.setAbilityByIndex(hero, lone_druid_spirit_bear, 2);

        game.hookEnt(visage_summon_familiars, dota.ENT_HOOK_GET_COOLDOWN, function(level) { return 7; });
        game.hookEnt(visage_summon_familiars, dota.ENT_HOOK_GET_MANA_COST, function(level) { return 50; });
        dota.setAbilityByIndex(hero, visage_summon_familiars, 3);

        hero.netprops.m_iCurrentLevel = 50;
        hero.netprops.m_iAbilityPoints = 50;

        //hero.netprops.m_iMaxLevel = 50;

        DF.initialized[hero] = true;

        //var client = dota.findClientByPlayerID(-1);
        //var index = dota.createParticleEffect(hero, furion_teleport.netprops.m_hEffectEntity.getClassname(), 1);
        //dota.setParticleControl(server.clients[0], index, 0, hero.netprops.m_vecOrigin);   
        //dota.setParticleControlEnt(hero, 0, 1, "attach_head", 1, index);
    }
};
game.hook("Dota_OnHeroSpawn", DF.onHeroSpawn);

DF.onHeroPicked = function(hero) {
    
};
game.hook("Dota_OnHeroPicked", DF.onHeroPicked);

DF.onGameFrame = function() {
    DF.dropped_items = game.findEntitiesByClassname("dota_item_drop");

    if (DF.dropped_items[0]) {
        var matched = {};
        for(var i = 0; i < DF.dropped_items.length; i++) {
            var _item = DF.dropped_items[i],
                item = _item.netprops.m_hItem;
            
            if (item.getClassname() == "item_branches") {
                if (DF.isItemInPit(_item)) {
                    DF.branch_combo[item.netprops.m_vecOrigin] = _item;
                }
            }   
            
            if (Object.keys(DF.branch_combo).length == 2) {
                server.print('YEA NIGGA SMOKE THAT WEED');

                Object.keys(DF.branch_combo).forEach(function(key) {
                    matched[key] = DF.branch_combo[key];
                });

                //reset a nigga
                DF.branch_combo = {};
                dota.findClearSpaceForUnit(centaur_sensai, 2415, -330, 4);
            }
        }

        Object.keys(matched).forEach(function(key){
            dota.remove(matched[key]);
        });
        
    }

	if ( game.rules.props.m_nGameState === dota.STATE_INIT )
    {
		cvWaiting.setInt( 8 );
    }
    cvCreepsNoSpawning.setInt(0);
};
game.hook("OnGameFrame", DF.onGameFrame);

DF.onLastHit = function(event) {
    for (property in event) {
        server.print(property);
        server.print(event[property]);
    }
    // if (EntKilled == DF.centaur_sensai) {
    //     var mega_stone_physical = game.createEntity('dota_item_drop');
    //     mega_stone_physical.netprops.m_hItem = DF.mega_stone;
    //     server.print('yo');
    //     server.print(mega_stone_physical);
    //     server.print(mega_stone_physical.netprops.m_hItem);
    //     dota.findClearSpaceForUnit(mega_stone_physical, DF.centaur_sensai.netprops.m_vecOrigin);
    // }
};
game.hookEvent("last_hit", DF.onLastHit, true);