// handle logic for bosses, their items, and what combos are needed to spawn them
DF.centaur_sensei = (function() {
	entity: dota.createUnit("npc_dota_neutral_centaur_khan", 1),

	combo: [
		'item_branches',
		'item_branches'
	],

	abilities: [
		'elder_titan_echo_stomp',
		'phantom_assassin_coup_de_grace'
	],

	initialize: function() {
		dota.giveItemToHero("item_basher", entity);
		server.print(entity.netprops.m_hItems[0])
    	dota.giveItemToHero("item_bfury", entity);

    	for (var i = 0; i < abilities.length; i++) {
    		dota.setAbilityByIndex(abilities[i], i);
    	}
	},

	go: function () {
		
	}
}());