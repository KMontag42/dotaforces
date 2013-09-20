var INTERVAL = 30,
    TOTAL_FRAMES = 100,
    curInterval = 0,
    ProjectileModel = 'ranged_tower_good',
    curFrame = 0;

DF.spawners = {
	radiant_close_camp : {
		building : 'npc_dota_badguys_fillers',
	    spawnList : [{
	        creep: {
                className: 'npc_dota_necronomicon_archer_3',
                keys: {
			'Model' : 'models/heroes/warlock/warlock_demon.mdl',
                	'StatusHealthRegen' : 8,
                	'ModelScale'  : .8,
			'AttackRange' : 900,
			'AttackAcquisitionRange' : 1000,
			'ProjectileModel' : ProjectileModel,
			'ProjectileSpeed' : 1500
                },
                netprops : {
                	'm_iMaxHealth' : 500,
    				'm_iHealth' : 500,
    				'm_iMaxMana' : 2000,
    				'm_iMana' : 2000
                }
	        },
	        // %, 100 = every interval, 1 = once a measure, 150 = alternating 1, 2, 1, 2...
	        frequency: 30
	    }, {
	        creep: {
                className: 'npc_dota_neutral_blue_dragonspawn_sorcerer',
                keys: {
                	'StatusHealthRegen' : 8,
                	'ModelScale'   : 1.3
                },
                netprops : {
                	'm_iMaxHealth' : 1000,
    				'm_iHealth' : 1000,
    				'm_iMaxMana' : 2000,
    				'm_iMana' : 2000
                }
	        },
	        // %, 100 = every interval, 1 = once a measure, 150 = alternating 1, 2, 1, 2...
	        frequency: 15
	    }],
	    spawnPoint : [ -1200, -4000, dota.TEAM_DIRE ],

	    radiTarget : [ -5860, -5365 ]
	}
};

// calculates which creeps to spawn this frame
DF.getSpawnsForThisFrame = function(spawner) {
    var result = [],
        i, j, percent, interval, spawnCount;

    for (i = 0; i < spawner.spawnList.length; ++i) {
    	var _spawn = spawner.spawnList[i];
		// get a % of how often it should happen
        percent = _spawn.frequency / TOTAL_FRAMES;
        // get its inverse, the "creep ever X frames" value
        interval = 1/percent;

        spawnCount = Math.floor(curFrame / interval) - Math.floor((curFrame - 1) / interval);

        for (j = 0; j < spawnCount; ++j) {
            result.push(_spawn.creep);                    
        }
    }

    return result;
};

// do the actual stuff
DF.spawnCreeps = function (spawner) {
	if (!(spawner in DF.spawners)) {
		server.print('WTF NIGGA');
		return;
	}

	spawner = DF.spawners[spawner];

    var thisFrame = DF.getSpawnsForThisFrame(spawner),
            ent, i, j, spawnPoint;

    for (i = 0; i < thisFrame.length; ++i) {
        ent = dota.createUnit(thisFrame[i].className, dota.TEAM_DIRE);
        Object.keys(thisFrame[i].keys).forEach(function(key) {
        	ent.keyvalues[key] = thisFrame[i].keys[key];
        });

        Object.keys(thisFrame[i].netprops).forEach(function(key) {
        	ent.netprops[key] = thisFrame[i].netprops[key];
        });

        dota.findClearSpaceForUnit(ent, spawner.spawnPoint[0], spawner.spawnPoint[1], 0);

        ent.netprops.m_iIsControllableByPlayer = 1 << 24;

        dota.setUnitWaypoint(ent, DF.radiantBaseWaypoint);
    }
};

// fire on an interval
game.hook("OnGameFrame", function() {
    curInterval++;

    if (curInterval >= INTERVAL) {
            curInterval = 0;

            for (spawn in DF.spawners) {
            	DF.spawnCreeps(spawn);
            }

            curFrame++;
    }
    if (curFrame >= TOTAL_FRAMES) {
            curFrame = 0;
    }
});