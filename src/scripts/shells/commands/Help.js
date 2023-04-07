
// Import Scripts
import Fmt from "/src/scripts/Fmt.js";
import Mapper from "/src/scripts/Mapper.js";
import Not from "/src/scripts/logics/Not.js";
import Type from "/src/scripts/Type.js";

export default {
	name: "help",
	type: "file",
	abouts: [
		"Show all available commands"
	],
	mounted: function()
	{
		var outputs = [];
		var commands = this.$root.commands;
		
		// Mapping all commands.
		for( let i in commands )
		{
			// Command option stacks.
			var options = [];
			
			// Mapping command options.
			Mapper( commands[i].options ?? Object.create({}), function( i, name, option )
			{
				var names = [
					name.length > 1 ? `--${name}` : `-${name}`
				];
				
				// Check if option has alias name.
				if( Type( option.alias, String ) )
				{
					names.push( option.alias.length > 1 ? `--${option.alias}` : `-${option.alias}` );
				}
				
				// If option has type.
				if( Not( option.type, "Undefined" ) )
				{
					options.push( 
						Fmt( "[{} {}]", ...[
							names.join( "|" ),
							option.type.name
						])
					);
				}
				else {
					options.push( Fmt( "[{}]", names.join( "|" ) ) );
				}
			});
			outputs.push(
				Fmt( "\x1b[32m{}\x20\x1b[37m{}", ...[
					commands[i].name,
					options.join( "\x20" )
				])
			);
		}
		return( outputs );
	}
};
