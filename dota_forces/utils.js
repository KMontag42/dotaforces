// some static ass shit
DF.rosh_spawn_x        = [2405, 2070, 2060, 2345, 2715, 2835, 2815];
DF.rosh_spawn_y        = [-730, -400, -135, 110, -95, -300, -550];

DF.isItemInPit = function(item) {
	var answer = DF.isInArea(DF.rosh_spawn_y.length, DF.rosh_spawn_x, DF.rosh_spawn_y, item.netprops.m_vecOrigin.x, item.netprops.m_vecOrigin.y);

	if (answer === 0) {
		return false;		
	}
	return answer;
}

Array.prototype.getUnique = function(){
   var u = {}, a = [];
   for(var i = 0, l = this.length; i < l; ++i){
      if(u.hasOwnProperty(this[i])) {
         continue;
      }
      a.push(this[i]);
      u[this[i]] = 1;
   }
   return a;
}