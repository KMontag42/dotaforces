console.addServerCommand("js_eval", function(client, args){
	print(eval(args.string));
});