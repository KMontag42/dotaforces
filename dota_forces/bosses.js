// handle logic for bosses, their items, and what combos are needed to spawn them

DF.bosses = {};

DF.bosses.centaur_sensei = {
	className 	: "npc_dota_neutral_centaur_khan",
	bossName	: "df_boss_centaur_sensei",

	abilityClasses 	: [
		'elder_titan_echo_stomp',
		'phantom_assassin_coup_de_grace'
	],

	entity	: false,
	killer : false,
	drops : [],

	abilities : [],

	itemDrops : [
		'item_reaver'
	],

	readyToDrop : false,
	hasKV		: false,

	initialize 	: function() {
		var self = this;

		this.entity = dota.createUnit(this.className, dota.TEAM_DIRE);
		dota.giveItemToHero("item_basher", this.entity);
    	dota.giveItemToHero("item_bfury", this.entity);

    	for (var i = 0; i < this.abilityClasses.length; i++) {
    		this.abilities.push(dota.createAbility(this.entity, this.abilityClasses[i]));
    		dota.setAbilityByIndex(this.entity, this.abilities[i], i);
    	}

    	this.entity.netprops.m_iLevel = 30;
    	//this.entity.netprops.m_flModelScale += 1;
    	this.entity.netprops.m_iMaxHealth = 7000;
    	this.entity.netprops.m_iHealth = 7000;

    	Object.keys(this.keyValues()).forEach(function(key) {
            var value = self.keyValues()[key];
            self.entity.keyvalues[key] = value;
        });
	},

	lastHit : function(killer) {
		var mega_stone_physical = game.createEntity('dota_item_drop');
		this.killer = killer;
		this.readyToDrop = true;
        //dota.findClearSpaceForUnit(mega_stone_physical, this.entity.netprops.m_vecOrigin);
        //mega_stone_physical.netprops.m_hItem = this.itemDrops[0];
        //server.print(mega_stone_physical.netprops.m_vecOrigin);
        //server.print(mega_stone_physical.netprops.m_hItem);
	},

	keyValues : function() {
		return {
	        'MovementSpeed' : 450,
	        'BountyGoldMin' : 600,
	        'BountyGoldMax' : 700,
	        'BountyXP' : 1000,

	        "AttackDamageMin" : 300,
	        "AttackDamageMax" : 400,
	        "AttackRate" : 1,
	        "AttackAcquisitionRange" : 800,
	        "AttackRange" : 150,
	        "Model" : 'models/props_structures/tower_good.mdl'
    	}
	},

	spawnXYZ : function(x, y, z) {
		dota.findClearSpaceForUnit(this.entity, x, y, z);
	},

	spawnVEC : function(vec) {
		dota.findClearSpaceForUnit(this.entity, vec);
	}
}