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

// < ORDER FUCKING MATTERS >
require('timers');
require('utils.js');
require('math.js');
require('bosses.js');
require('item_combos.js');
// </ ORDER FUCKING MATTERS >

var cvCreepsNoSpawning  = console.findConVar("dota_creeps_no_spawning"),
    cvWaiting           = console.findConVar("dota_wait_for_players_to_load_timeout");

DF.__custom_unit_flag = false;

DF.branch_combo = {};
DF.initialized = {};
DF.heroes = [];
DF.master_ai = {
    heroClass : 'npc_dota_hero_doom',
    hero : [],
    playerID : 1 << 24
};

DF.onMapStart = function() {

    // init all bosses
    Object.keys(DF.bosses).forEach(function(key) {
        var boss = DF.bosses[key];
        boss.initialize();
    });

    dota.removeAll('npc_dota_tower');
    DF.mega_stone = [];
    server.print(DF.mega_stone);
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
    if(DF.bosses.centaur_sensei.readyToDrop) {
        DF.bosses.centaur_sensei.itemDrops.forEach(function(_item) {
            server.print(DF.bosses.centaur_sensei.killer);
            DF.bosses.centaur_sensei.drops.push(
                dota.createItemDrop(
                    DF.bosses.centaur_sensei.killer, 
                    _item,
                    DF.bosses.centaur_sensei.killer.netprops.m_vecOrigin
                )
            );
        });
        DF.bosses.centaur_sensei.readyToDrop = false;
        DF.bosses.centaur_sensei.initialize();
    }
};
game.hook("Dota_OnUnitThink", DF.onUnitThink);

DF.onHeroSpawn = function(hero) {
    if (!DF.initialized[hero]) {
        var furion_teleport = dota.createAbility(hero, "furion_teleportation"),
            lone_druid_spirit_bear = dota.createAbility(hero, "lone_druid_spirit_bear"),
            visage_summon_familiars = dota.createAbility(hero, "skeleton_king_reincarnation");

        game.hookEnt(furion_teleport, dota.ENT_HOOK_GET_COOLDOWN, function(level){ return 1; });
        game.hookEnt(furion_teleport, dota.ENT_HOOK_GET_CAST_POINT, function(level) { return 0; });
        dota.setAbilityByIndex(hero, furion_teleport, 1);

        game.hookEnt(lone_druid_spirit_bear, dota.ENT_HOOK_GET_COOLDOWN, function(level) { return 7; });
        game.hookEnt(lone_druid_spirit_bear, dota.ENT_HOOK_GET_MANA_COST, function(level) { return 50; });
        dota.setAbilityByIndex(hero, lone_druid_spirit_bear, 2);

        game.hookEnt(visage_summon_familiars, dota.ENT_HOOK_GET_COOLDOWN, function(level) { return 1; });
        game.hookEnt(visage_summon_familiars, dota.ENT_HOOK_GET_MANA_COST, function(level) { return 0; });
        dota.setAbilityByIndex(hero, visage_summon_familiars, 3);

        hero.netprops.m_iCurrentLevel = 50;
        hero.netprops.m_iAbilityPoints = 50;

        dota.createItemDrop(hero, 'item_basher', -6570, -6010, 12);
        dota.createItemDrop(hero, 'item_hyperstone', -6570, -6010, 12);

        dota.createItemDrop(hero, 'item_hyperstone', -6570, -6010, 12);
        dota.createItemDrop(hero, 'item_heart', -6570, -6010, 12);
        dota.createItemDrop(hero, 'item_heart', -6570, -6010, 12);
        dota.createItemDrop(hero, 'item_greater_crit', -6570, -6010, 12);
        dota.createItemDrop(hero, 'item_greater_crit', -6570, -6010, 12);
        dota.createItemDrop(hero, 'item_greater_crit', -6570, -6010, 12);
        dota.createItemDrop(hero, 'item_greater_crit', -6570, -6010, 12);

        DF.initialized[hero] = true;
    }
};
game.hook("Dota_OnHeroSpawn", DF.onHeroSpawn);

DF.onHeroPicked = function(hero) {
    
};
game.hook("Dota_OnHeroPicked", DF.onHeroPicked);

// used for the event trigger for dropped items
var __dropped_items = [];
DF.onGameFrame = function() {

    var dropped_items = game.findEntitiesByClassname("dota_item_drop");
    if (dropped_items.length != __dropped_items.length) {
        __dropped_items = dropped_items;
        DF.onItemDrop(dropped_items);
    }

    if ( game.rules.props.m_nGameState === dota.STATE_INIT )
    {
		cvWaiting.setInt( 8 );
    }
    cvCreepsNoSpawning.setInt(0);
};
game.hook("OnGameFrame", DF.onGameFrame);

DF.onLastHit = function(event) {
    var unit_killed = game.getEntityByIndex(event.getInt('EntKilled')),
        killer = game.getEntityByIndex(event.getInt("PlayerID"));
    if (unit_killed.netprops.m_vecOrigin == DF.bosses.centaur_sensei.entity.netprops.m_vecOrigin) {
        DF.bosses.centaur_sensei.killer = killer;
        DF.bosses.centaur_sensei.lastHit();
    }
};
game.hookEvent("last_hit", DF.onLastHit, true);

DF.onItemDrop = function(dropped_items) {
    server.print('item drop event');
    DF.itemCombos.checkForMatch(dropped_items, DF.itemCombos.basher_hyperstone);
};

DF.onUnitParsed = function(unit, keyvalues) {

};
game.hook("Dota_OnUnitParsed", DF.onUnitParsed);

DF.onGetAbilityValue = function(entity, abilityName, field, values) {
    if (DF.bosses.centaur_sensei.drops) {
        for (drop in DF.bosses.centaur_sensei.drops) {
            var item = drop.netprops.m_hItem,
                item_owner = item.netprops.m_hOwnerEntity;

            if (entity.netprops.m_hOwnerEntity.getClassname() == item_owner.getClassname()) {
                if (abilityName == 'item_reaver' && field == "bonus_strength") {
                    return [300];
                }
            }
        }
        server.print(abilityName);
        server.print(entity.netprops.m_hOwnerEntity.getClassname());
        server.print(DF.dick_lick.netprops.m_hItem.netprops.m_hOwnerEntity.getClassname());
        
    }
};
game.hook("Dota_OnGetAbilityValue", DF.onGetAbilityValue);