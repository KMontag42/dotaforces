//=========== (C) Copyright 2005 Valve, L.L.C. All rights reserved. ===========
//
// The copyright to the contents herein is the property of Valve, L.L.C.
// The contents may be used and/or copied only with the written permission of
// Valve, L.L.C., or in accordance with the terms and conditions stipulated in
// the agreement/contract under which the contents have been supplied.
//=============================================================================

// No spaces in event names, max length 32
// All strings are case sensitive
//
// valid data key types are:
//   string : a zero terminated string
//   bool   : unsigned int, 1 bit
//   byte   : unsigned int, 8 bit
//   short  : signed int, 16 bit
//   long   : signed int, 32 bit
//   float  : float, 32 bit
//   local  : any data, but not networked to clients
//
// following key names are reserved:
//   local      : if set to 1, event is not networked to clients
//   unreliable : networked, but unreliable
//   suppress   : never fire this event
//   time	: firing server time
//   eventid	: holds the event ID

"ModEvents"
{
	"modifier_event"
	{
		"eventname"	"string"
		"caster"	"short"	
		"ability"	"short"
	}

	"dota_player_kill"
	{
		"victim_userid"		"short"
		"killer1_userid"	"short"	
		"killer2_userid"	"short"	
		"killer3_userid"	"short"	
		"killer4_userid"	"short"	
		"killer5_userid"	"short"	
		"bounty"			"short"
		"neutral"			"short"
		"greevil"			"short"
	}

	"dota_player_deny"
	{
		"killer_userid"	"short"	
		"victim_userid"	"short"
	}

	"dota_barracks_kill"
	{
		"barracks_id"	"short"
	}

	"dota_tower_kill"
	{
		"killer_userid"	"short"	
		"teamnumber"	"short"
		"gold"			"short"
	}

	"dota_roshan_kill"
	{
		"teamnumber"	"short"
		"gold"			"short"
	}

	"dota_courier_lost"
	{
		"teamnumber"	"short"
	}

	"dota_courier_respawned"
	{
		"teamnumber"	"short"
	}

	"dota_glyph_used"
	{
		"teamnumber"	"short"
	}

	"dota_super_creeps"
	{
		"teamnumber"	"short"
	}

	"dota_item_purchase"
	{
		"userid"		"short"
		"itemid"		"short"
	}

	"dota_item_gifted"
	{
		"userid"		"short"
		"itemid"		"short"
		"sourceid"		"short"
	}

	"dota_rune_pickup"
	{
		"userid"		"short"
		"type"			"short"
		"rune"			"short"
	}

	"dota_rune_spotted"
	{
		"userid"		"short"
		"rune"			"short"
	}

	"dota_item_spotted"
	{
		"userid"		"short"
		"itemid"		"short"
	}

	"dota_no_battle_points"
	{
		"userid"		"short"
		"reason"		"short"
	}

	"dota_chat_informational"
	{
		"userid"		"short"
		"type"		"short"
	}

	"dota_action_item"
	{
		"reason"		"short"
		"itemdef"		"short"
		"message"		"short"
	}
	
	"dota_chat_event"
	{
		"userid"		"short"
		"gold"			"short"
		"message"		"short"
	}

	"dota_chat_timed_reward"
	{
		"userid"		"short"
		"itmedef"		"short"
		"message"		"short"
	}

	"dota_pause_event"
	{
		"userid"		"short"
		"value"			"short"
		"message"		"short"
	}
	
	"dota_chat_kill_streak"
	{
		"gold"				"short"
		"killer_id"			"short"
		"killer_streak"		"short"
		"killer_multikill"	"short"
		"victim_id"			"short"
		"victim_streak"		"short"
	}

	"dota_chat_first_blood"
	{
		"gold"				"short"
		"killer_id"			"short"
		"victim_id"			"short"
	}

	"dota_player_update_hero_selection"
	{
		"tabcycle"		"bool"
	}

	"dota_player_update_selected_unit"
	{
	}

	"dota_player_update_query_unit"
	{
	}
	
	"dota_player_update_killcam_unit"
	{
	}
	
	"dota_player_take_tower_damage"
	{
		"PlayerID"		"short"
		"damage"		"short"
	}
	
	"dota_hud_error_message"
	{
		"reason"	"byte"
		"message"	"string"
	}

	"dota_action_success"
	{
	}
	
	"dota_money_changed"
	{
	}
	
	"dota_portrait_unit_stats_changed"
	{
	}

	"dota_portrait_unit_modifiers_changed"
	{
	}

	"dota_force_portrait_update"
	{
	}
	
	"dota_inventory_changed"
	{
	}

	"dota_inventory_item_changed"
	{
		"entityIndex"	"short"
	}

	"dota_ability_changed"
	{
	}
	
	"dota_portrait_ability_layout_changed"
	{
	}
	
	"dota_inventory_item_added"
	{
		"itemname"	"string"
	}
	
	"dota_inventory_changed_query_unit"
	{
	}
	
	"dota_link_clicked"
	{
		"link"		"string"
		"nav"		"bool"		// internal to item panel - preserve the nav stack
		"nav_back"	"bool"		// internal to item panel - preserve the nav stack
		"recipe"	"short"
		"shop"		"short"		// show the item in a particular shop
	}
	
	"dota_set_quick_buy"
	{
		"item"		"string"
		"recipe"	"byte"
		"toggle"	"bool"
	}
	
	"dota_quick_buy_changed"
	{
		"item"		"string"
		"recipe"	"byte"
	}
	
	//"dota_insert_link"			// chat listens and inserts links to dota assets - items, heroes, spells etc in heropedia and/or shop
	//{
	//	"link"		"string"
	//}
	
	"dota_player_shop_changed"
	{
		"prevshopmask"	"byte"
		"shopmask"	"byte"
	}
	
	"dota_player_show_killcam"
	{
		"nodes"		"byte"
		"player"	"short"	
	}
	
	"dota_player_show_minikillcam"
	{
		"nodes"		"byte"
		"player"	"short"	
	}
	"gc_user_session_created"
	{
	}
	"team_data_updated"
	{
	}
	"match_history_updated"
	{
		"SteamID"	"uint64"
	}
	"match_details_updated"
	{
		"matchID"	"uint64"
		"result"	"byte"
	}
	"live_games_updated"
	{
	}
	"recent_matches_updated"
	{
		"Page"		"short"
	}
	"news_updated"
	{
	}
	"persona_updated"
	{
		"SteamID"	"uint64"
	}
	"tournament_state_updated"
	{
		
	}
	"party_updated"
	{
	}
	"lobby_updated"
	{
	}
	"dashboard_caches_cleared"
	{
	}
	"last_hit"	
	{
		"PlayerID"		"short"
		"EntKilled"		"short"
		"FirstBlood"	"bool"
		"HeroKill"		"bool"
		"TowerKill"		"bool"
	}

	"player_completed_game"	
	{
		"PlayerID"		"short"
		"Winner"		"byte"
	}

	"nommed_tree"
	{
		"PlayerID"		"short"
	}
	"dota_rune_activated_server"
	{
		"PlayerID"		"short"
		"rune"			"short"
	}

	"dota_player_gained_level"
	{
		"PlayerID"		"short"
		"level"			"short"
	}

	"dota_player_learned_ability"
	{
		"PlayerID"		"short"
		"abilityname"	"string"
	}	

	"dota_player_used_ability"
	{
		"PlayerID"		"short"
		"abilityname"	"string"
	}	
	"dota_player_killed"
	{
		"PlayerID"		"short"
		"HeroKill"		"bool"
		"TowerKill"		"bool"
	}
	"bindpanel_open"
	{
	}
	
	"bindpanel_close"
	{
	}
	
	"keybind_changed"
	{
	}
	
	"dota_item_drag_begin"
	{
	}
	
	"dota_item_drag_end"
	{
	}
	
	"dota_shop_item_drag_begin"
	{
	}
	
	"dota_shop_item_drag_end"
	{
	}

	"dota_item_purchased"
	{
		"PlayerID"		"short"
		"itemname"		"string"
		"itemcost"		"short"
	}

	"dota_item_used"
	{
		"PlayerID"		"short"
		"itemname"		"string"
	}

	"dota_item_auto_purchase"
	{
		"item_id"		"short"
	}
	
	"dota_unit_event"
	{
		"victim"		"short"
		"attacker"		"short"
		"priority"		"short"
	}
	
	"gameui_activated"
	{
	}
	
	"gameui_hidden"
	{
	}
	
	"player_fullyjoined"
	{
		"userid"	"short"		// user ID on server
		"name"		"string"	// player name
	}

	"dota_spectate_hero"
	{
		"entindex"	"byte"
	}

	"dota_match_done"
	{
		"winningteam"	"byte"	// The ID of the winning team
	}

	"dota_match_done_client"
	{
	}

	"set_instructor_group_enabled"
	{
		"group"		"string"
		"enabled"	"short"
	}
	"joined_chat_channel"
	{
		"channelName"	"string"
	}
	"left_chat_channel"
	{
		"channelName"	"string"
	}
	"gc_chat_channel_list_updated"
	{
	}
	"today_messages_updated"
	{
		"num_messages"	"short"
	}
	"file_downloaded"
	{
		"success"			"bool"
		"local_filename"	"string"
		"remote_url"		"string"
	}
	"player_report_counts_updated"
	{
		"positive_remaining"	"byte"
		"negative_remaining"	"byte"
		"positive_total"		"short"
		"negative_total"		"short"
	}

	"item_purchased"
	{
		"itemid"		"short"
	}
	"gc_mismatched_version"
	{
	}

	"demo_skip"
	{
		"local"					"1"
		"playback_tick"			"long"	// current playback tick
		"skipto_tick"			"long"	// tick we're going to
		"user_message_list"		"local"	// CSVCMsgList_UserMessages
		"dota_hero_chase_list"	"local"	// CSVCMsgList_GameEvents
	}

	"demo_start"
	{
		"local"					"1"
		"dota_combatlog_list"	"local"	// CSVCMsgList_GameEvents that are combat log events
		"dota_hero_chase_list"	"local"	// CSVCMsgList_GameEvents
		"dota_pick_hero_list"	"local"	// CSVCMsgList_GameEvents
	}
	"demo_stop"
	{

	}

	"map_shutdown"
	{
	}

	"dota_workshop_fileselected"
	{
		"filename"		"string"
	}
	"dota_workshop_filecanceled"
	{
	}

	"rich_presence_updated"
	{
	}

	"dota_hero_random"
	{
		"userid"		"short"
		"heroid"		"short"
	}

	"dota_rd_chat_turn"
	{
		"userid"		"short"
	}

	"dota_favorite_heroes_updated"
	{
	}

	"profile_closed"
	{
	}

	"item_preview_closed"
	{
	}

	"dashboard_switched_section"
	{
		"section"		"short"
	}

	"dota_tournament_item_event"
	{
		"winner_name"			"string"
		"event_type"			"short"
	}

	"dota_hero_swap"
	{
		"playerid1"		"byte"
		"playerid2"		"byte"
	}

	"dota_item_alerted"
	{
		"userid"		"short"
		"itemid"		"short"
		"xpos"		"float"
		"ypos"		"float"
		"server"	"bool"
	}

	"halloween_high_score_received"
	{
    "round"   "short"
	}

	"halloween_phase_end"
	{
		"phase"		"byte"
		"team"		"byte"
	}
	
	"halloween_high_score_request_failed"
	{
    "round"   "short"
	}

	"dota_hud_skin_changed"
	{
		"skin"	"string"
	}

	"dota_inventory_player_got_item"
	{
		"itemname"	"string"
	}

	"player_is_experienced"
	{
	}

	"player_is_notexperienced"
	{
	}

	"dota_tutorial_lesson_start"
	{
	}
	"map_location_updated"
	{
	}

	"richpresence_custom_updated"
	{
	}

	"game_end_visible"
	{
	}

	"antiaddiction_update"
	{
	}
}

