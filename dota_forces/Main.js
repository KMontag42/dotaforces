/*
 * RADIANT HARD CAMP FIRST - [ -1200, -4000, 8 ]
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
    heroClass : 'npc_dota_hero_doom_bringer',
    hero : [],
    playerID : 1 << 24
};

DF.onMapStart = function() {

    // init all bosses
    Object.keys(DF.bosses).forEach(function(key) {
        var boss = DF.bosses[key];
        boss.initialize();
    });

    DF.bosses.centaur_sensei.spawnXYZ(-1200, -4000, 8);
    // DF.master_ai.hero = dota.createUnit(DF.master_ai.heroClass, dota.TEAM_NEUTRAL);
    // dota.findClearSpaceForUnit(DF.master_ai.hero, 6900, 6400, 12);

    dota.removeAll('npc_dota_tower');
    DF.mega_stone = [];
    server.print(DF.mega_stone);
};
game.hook("OnMapStart", DF.onMapStart);

DF.onUnitPreThink = function(unit) {
    if(DF.bosses.centaur_sensei.readyToDrop && (unit in DF.initialized)) {
        // DF.bosses.centaur_sensei.itemDrops.forEach(function(_item) {
        var dropped_item = dota.createItemDrop(DF.initialized[unit], 'item_reaver', -1200, -4000, 8);
        server.print(dropped_item);
        //DF.bosses.centaur_sensei.drops.push(dropped_item);
        // });
        
        DF.bosses.centaur_sensei.initialize();
        DF.bosses.centaur_sensei.readyToDrop = false;
    }
};
game.hook("Dota_OnUnitPreThink", DF.onUnitPreThink);

DF.onUnitThink = function(unit) {
    
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

        DF.reava = dota.createItemDrop(hero, 'item_reaver', -6570, -6100, 12);
        DF.reava.netprops.m_hItem.keyvalues["bonus_strength"] = 300;

        dota.createItemDrop(hero, 'item_basher', -6570, -6010, 12);
        dota.createItemDrop(hero, 'item_hyperstone', -6570, -6010, 12);

        dota.createItemDrop(hero, 'item_greater_crit', -6570, -6010, 12);
        dota.createItemDrop(hero, 'item_greater_crit', -6570, -6010, 12);
        dota.createItemDrop(hero, 'item_greater_crit', -6570, -6010, 12);
        dota.createItemDrop(hero, 'item_greater_crit', -6570, -6010, 12);

        DF.initialized[hero] = hero;
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
    cvCreepsNoSpawning.setInt(1);
};
game.hook("OnGameFrame", DF.onGameFrame);

DF.onLastHit = function(event) {
    var unit_killed = game.getEntityByIndex(event.getInt('EntKilled')),
        killer = game.getEntityByIndex(event.getInt("PlayerID"));
    if (unit_killed.netprops.m_vecOrigin == DF.bosses.centaur_sensei.entity.netprops.m_vecOrigin) {

        server.print(killer.getClassname());
        DF.bosses.centaur_sensei.lastHit(killer);
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
    if (DF.bosses.centaur_sensei.drops.length > 0) {
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

    if (DF.reava) {
        if (abilityName == 'item_reaver' && field == "bonus_strength") {
            return [300];
        }
        if (abilityName == 'item_reaver' && field == "bonus_agility") {
            return [300];
        }
    }
};
game.hook("Dota_OnGetAbilityValue", DF.onGetAbilityValue);

DF.onPickupItem = function(hero, item) {
    // use dota.setPurchaser(item, unit) to make an item owned by the person picking it up
    // ie when the reaver is picked up you set its purchaser so that they get the stats and shit
};
game.hook("Dota_OnPickupItem", DF.onPickupItem);