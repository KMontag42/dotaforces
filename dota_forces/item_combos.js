// stores the association and combo arrays for all of the different item combination bosses
DF.itemCombos = {};

DF.itemCombos.checkForMatch = function(droppedItems, combo) {
	var info = {
        item_names : [],
        item_entities : []
    };

    for(var i = 0; i < droppedItems.length; i++) {
        var _item = droppedItems[i],
            item = _item.netprops.m_hItem;
        
        if (item) {
        	if (DF.isItemInPit(_item)) {
            	info.item_names.push(item.getClassname());
                info.item_entities.push(_item);
            }
        }
    }

    if (combo.equals(info.item_names, false)) {
    	server.print('YEA NIGGA SMOKE THAT WEED');
    	DF.bosses.centaur_sensei.spawnXYZ(2415, -330, 4);
    	info.item_entities.forEach(function(item){
        	dota.remove(item);
    	});
    }
}

DF.itemCombos.branch_combo = [
	'item_branches',
	'item_branches'
];

DF.itemCombos.basher_hyperstone = [
	'item_basher',
	'item_hyperstone'
];