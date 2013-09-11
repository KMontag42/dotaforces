// stores the association and combo arrays for all of the different item combination bosses
DF.itemCombos = {};

DF.itemCombos.checkForMatch = function(droppedItems, combo) {
	var item_names = [];

    for(var i = 0; i < droppedItems.length; i++) {
        var _item = droppedItems[i],
            item = _item.netprops.m_hItem;
        
        if (item) {
        	if (DF.isItemInPit(_item))
            	item_names.push(item.getClassname());
        }
    }

    if (combo.equals(item_names, false)) {
    	server.print('YEA NIGGA SMOKE THAT WEED');
    	DF.bosses.centaur_sensei.spawnXYZ(2415, -330, 4);
    	droppedItems.forEach(function(item){
        	dota.remove(item);
    	});
    }

    server.print(item_names);
}

DF.itemCombos.branch_combo = [
	'item_branches',
	'item_branches'
];

DF.itemCombos.basher_hyperstone = [
	'item_basher',
	'item_hyperstone'
];