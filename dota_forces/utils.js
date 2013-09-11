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

// http://stackoverflow.com/a/17980268
Array.prototype.equals = function (array, strict) {
    if (!array)
        return false;

    if (arguments.length == 1)
        strict = true;

    if (this.length != array.length)
        return false;

    for (var i = 0; i < this.length; i++) {
        if (this[i] instanceof Array && array[i] instanceof Array) {
            if (!this[i].equals(array[i], strict))
                return false;
        }
        else if (strict && this[i] != array[i]) {
            return false;
        }
        else if (!strict) {
            return this.sort().equals(array.sort(), true);
        }
    }
    return true;
}