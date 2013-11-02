// Configure this stuff to simulate a lobby
// Also, I recommend that you rename this plugin to "LobbyManager", so you don't
// need to switch between "LobbyManagerSimulator" and "LobbyManager" all the time.
// We can't distribute it as "LobbyManager" because it'd override our own.

const PLAYER_DATA = "";

// List of plugins returned by getLobbyPlugins, those plugins won't actually be loaded
const LOBBY_PLUGINS = ["MyPluginIdentifier"];
const LOBBY_OPTIONS = {
	"MyPluginIdentifier": {
		"Multiplier": "x5.0"
	}
};

// Don't edit below this line
var timers = require("timers");
plugin.expose({
	getLobbyPlugins: function(){
		return LOBBY_PLUGINS.concat();
	},
	
	getOptions: function(){
		throw new Error("Use getOptionsForPlugin for now");
		return LOBBY_OPTIONS[plugin.getCallerIdentifier()] || {};
	},
	
	getOptionsForPlugin: function(id){ // Deprecated, use getOptions
		if(id != plugin.getCallerIdentifier()) throw new Error("You can only get options for your own plugin.");
		return LOBBY_OPTIONS[id] || {};
	},
	
	setPlayerData: function(client, data){
		// This is not the actual check done in our LobbyManager, don't even try to bypass it
		if(!client.getAuthString) throw new Error("Object is not a client");
		
		if(typeof data != 'string') throw new Error("Data must be a string");
		if(data.length > 256) throw new Error("Data must have at most 256 characters");
		
		if(client.__cantSaveData) throw new Error("You cannot save data for a player more often than once every 60 in-game seconds");
		
		if(!client.__lobbyData) client.__lobbyData = {};
		client.__lobbyData[plugin.getCallerIdentifier()] = data;
		
		client.__cantSaveData = true;
		timers.setTimeout(function(){client.__cantSaveData = false;}, 59000);
	},
	
	getPlayerData: function(client){
		if(!client.getAuthString) throw new Error("Object is not a client");
		return (client.__lobbyData && client.__lobbyData[plugin.getCallerIdentifier()]) || PLAYER_DATA;
	}
});