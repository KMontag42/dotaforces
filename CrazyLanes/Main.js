/*

	Some documentation on how the lane spawners work:
	clsname of those entities: path_corner
	targetnames regex: lane_(bot|mid|top)_pathcorner_(goodguys|badguys)_([0-5]b?1?)
	
	
	lane_bot_goodguys_melee_spawner -> lane_bot_pathcorner_goodguys_1 -> lane_bot_pathcorner_goodguys_6 -> lane_bot_pathcorner_goodguys_2 -> lane_bot_pathcorner_goodguys_5 -> lane_bot_pathcorner_goodguys_5 -> lane_bot_pathcorner_goodguys_7 -> lane_bot_pathcorner_goodguys_3 -> lane_bot_pathcorner_goodguys_4
	
	lane_mid_goodguys_melee_spawner -> lane_mid_pathcorner_goodguys_1 -> lane_mid_pathcorner_goodguys_9 -> lane_mid_pathcorner_goodguys_2 -> lane_mid_pathcorner_goodguys_3 -> lane_mid_pathcorner_goodguys_4 -> lane_mid_pathcorner_goodguys_5 -> lane_mid_pathcorner_goodguys_8 -> lane_mid_pathcorner_goodguys_6 -> lane_mid_pathcorner_goodguys_7
	
	lane_top_goodguys_melee_spawner -> lane_top_pathcorner_goodguys_1 -> lane_top_pathcorner_goodguys_5 -> lane_top_pathcorner_goodguys_6 -> lane_top_pathcorner_goodguys_7 -> lane_top_pathcorner_goodguys_2 -> lane_top_pathcorner_goodguys_2b -> lane_top_pathcorner_goodguys_2b1 -> lane_top_pathcorner_goodguys_3 -> lane_top_pathcorner_goodguys_4
	
	lane_top_badguys_melee_spawner -> lane_top_pathcorner_badguys_1 -> lane_top_pathcorner_badguys_5 -> lane_top_pathcorner_badguys_6 -> lane_top_pathcorner_badguys_2 -> lane_top_pathcorner_badguys_2b -> lane_top_pathcorner_badguys_2b1 -> lane_top_pathcorner_badguys_3 -> lane_top_pathcorner_badguys_4
	
	lane_mid_badguys_melee_spawner -> lane_mid_pathcorner_badguys_1 -> lane_mid_pathcorner_badguys_8 -> lane_mid_pathcorner_badguys_2 -> lane_mid_pathcorner_badguys_3 -> lane_mid_pathcorner_badguys_4 -> lane_mid_pathcorner_badguys_5 -> lane_mid_pathcorner_badguys_6 -> lane_mid_pathcorner_badguys_7
	
	lane_bot_badguys_melee_spawner -> lane_bot_pathcorner_badguys_1 -> lane_bot_pathcorner_badguys_2 -> lane_bot_pathcorner_badguys_7 -> lane_bot_pathcorner_badguys_12 -> lane_bot_pathcorner_badguys_10 -> lane_bot_pathcorner_badguys_11 -> lane_bot_pathcorner_badguys_5 -> lane_bot_pathcorner_badguys_6 -> lane_bot_pathcorner_badguys_3 -> lane_bot_pathcorner_badguys_4
	
	
*/

var lanes = keyvalue.parseKVFile('lanes.kv');

game.hook("OnMapStart", onMapStart);



function onMapStart(){
	for(i in lanes){
		setupTower(i, lanes[i]);
	}
}


function setupTower(targetname, data){
	var tower = game.findEntityByTargetname(targetname);
	if(tower == null){
		throw new Error("Couldn't find tower " + targetname);
	}
	
	var pos = data.positions[Math.floor(data.positions.length * Math.random())];
	
	tower.teleport(pos.x, pos.y, pos.z);
	
	for(var i = 0; i < data.waypoints.length; ++i){
		var wp = game.findEntityByTargetname(data.waypoints[i]);
		if(wp == null) throw new Error("Couldn't find waypoint " + data.waypoints[i]);
		
		wp.teleport(pos.x, pos.y, pos.z);
	}
}