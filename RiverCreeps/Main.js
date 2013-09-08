game.hook("OnMapStart", onMapStart);

var timers = require('timers');
var kv = keyvalue.parseKVFile('data.kv');
var mapStarted = false;
var waypoints;
var originWaypoint;
var minCreeps = 1;

function onMapStart(){
	mapStarted = true;
	waypoints = new Array(kv.positions.length);
	
	originWaypoint = game.createEntity('info_target');
	originWaypoint.teleport(0, 0, 0);
	
	for(var i = 0; i < kv.positions.length; ++i){
		var wp = game.createEntity('info_target');
		wp.teleport(kv.positions[i]);
		waypoints[i] = wp;
	}
}

timers.setInterval(function(){
	if(game.rules.props.m_nGameState != 5) return;
	
	var spawnPoint = kv.positions[Math.floor(kv.positions.length * Math.random())];
	var waypoint = waypoints[Math.floor(waypoints.length * Math.random())];
	
	var numUnits = Math.floor(Math.random() * 3) + minCreeps;
	for(var i = 0; i < numUnits; ++i){
		var unit = dota.createUnit(kv.units[Math.floor(kv.units.length * Math.random())], 4);
		dota.findClearSpaceForUnit(unit, spawnPoint);
		dota.setUnitWaypoint(unit, waypoint);
		unit.changeTeam(1);
	}
	
}, 15000);

timers.setInterval(function(){
	if(game.rules.props.m_nGameState != 5) return;
	
	if(minCreeps > 3) return;
	minCreeps++;
}, 90000);
