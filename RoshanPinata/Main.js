game.hook("OnGameFrame", onGameFrame);

var itemClassnames = [
"item_abyssal_blade",
"item_aegis",
"item_ancient_janggo",
"item_arcane_boots",
"item_armlet",
"item_assault",
"item_basher",
"item_belt_of_strength",
"item_bfury",
"item_black_king_bar",
"item_blade_mail",
"item_blade_of_alacrity",
"item_blades_of_attack",
"item_blink",
"item_bloodstone",
"item_boots",
"item_boots_of_elves",
"item_bottle",
"item_bracer",
"item_branches",
"item_broadsword",
"item_buckler",
"item_butterfly",
"item_chainmail",
"item_cheese",
"item_circlet",
"item_clarity",
"item_claymore",
"item_cloak",
"item_courier",
"item_cyclone",
"item_dagon",
"item_dagon_2",
"item_dagon_3",
"item_dagon_4",
"item_dagon_5",
"item_demon_edge",
"item_desolator",
"item_diffusal_blade",
"item_diffusal_blade_2",
"item_dust",
"item_eagle",
"item_energy_booster",
"item_ethereal_blade",
"item_flask",
"item_flying_courier",
"item_force_staff",
"item_gauntlets",
"item_gem",
"item_ghost",
"item_gloves",
"item_greater_crit",
"item_hand_of_midas",
"item_headdress",
"item_heart",
"item_heavens_halberd",
"item_helm_of_iron_will",
"item_helm_of_the_dominator",
"item_hood_of_defiance",
"item_hyperstone",
"item_invis_sword",
"item_javelin",
"item_lesser_crit",
"item_lifesteal",
"item_maelstrom",
"item_magic_stick",
"item_magic_wand",
"item_manta",
"item_mantle",
"item_mask_of_madness",
"item_medallion_of_courage",
"item_mekansm",
"item_mithril_hammer",
"item_mjollnir",
"item_monkey_king_bar",
"item_mystic_staff",
"item_necronomicon",
"item_necronomicon_2",
"item_necronomicon_3",
"item_null_talisman",
"item_oblivion_staff",
"item_ogre_axe",
"item_orb_of_venom",
"item_orchid",
"item_pers",
"item_phase_boots",
"item_pipe",
"item_platemail",
"item_point_booster",
"item_poor_mans_shield",
"item_power_treads",
"item_quarterstaff",
"item_quelling_blade",
"item_radiance",
"item_rapier",
"item_reaver",
"item_refresher",
"item_relic",
"item_ring_of_aquila",
"item_ring_of_basilius",
"item_ring_of_health",
"item_ring_of_protection",
"item_ring_of_regen",
"item_robe",
"item_rod_of_atos",
"item_sange",
"item_sange_and_yasha",
"item_satanic",
"item_sheepstick",
"item_shivas_guard",
"item_skadi",
"item_slippers",
"item_smoke_of_deceit",
"item_sobi_mask",
"item_soul_booster",
"item_soul_ring",
"item_sphere",
"item_staff_of_wizardry",
"item_stout_shield",
"item_talisman_of_evasion",
"item_tango",
"item_tpscroll",
"item_tranquil_boots",
"item_travel_boots",
"item_ultimate_orb",
"item_ultimate_scepter",
"item_urn_of_shadows",
"item_vanguard",
"item_veil_of_discord",
"item_vitality_booster",
"item_vladmir",
"item_void_stone",
"item_ward_observer",
"item_ward_sentry",
"item_wraith_band",
"item_yasha"
];

var once = false;
var timer;

function onGameFrame() {
	var gameTime = game.rules.props.m_fGameTime;
	if (!once && game.rules.props.m_nGameState == dota.STATE_PRE_GAME) {
		once = true;
		timer = game.rules.props.m_fGameTime;
	}
	if (gameTime >= timer) {
		timer += 2;
		var roshan = game.findEntityByClassname(-1, "npc_dota_roshan");
		if (roshan != null) {
			for (var i = 0; i < 6; ++i) {
				if (roshan.netprops.m_hItems[i] == null) {
					dota.giveItemToHero(getRandomItemClassname(), roshan, roshan);
				}
			}
		}
	}
}

function getRandomItemClassname() {
	return itemClassnames[getRandomInt(itemClassnames.length)];
}

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}