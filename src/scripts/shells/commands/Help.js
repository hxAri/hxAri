
// Import Scripts
import Author from "/src/scripts/Author.js";
import Banner from "/src/scripts/shells/Banner.js";
import Fmt from "/src/scripts/Fmt.js";
import Mapper from "/src/scripts/Mapper.js";
import Not from "/src/scripts/logics/Not.js";
import Type from "/src/scripts/Type.js";

export default {
	name: "help",
	type: "binary",
	data: {
		banner: Banner,
		abouts: [
			"\x20"
		]
	},
	author: Author,
	abouts: "Show all available commands",
	methods: {
		
		/*
		 * Return all available commands with options.
		 *
		 * @return Array
		 */
		commands: function()
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
					Fmt( "\x20\x1b[0;38;5;190m·\x20\x1b[32m{}\x20\x1b[37m{}", ...[
						commands[i].name,
						options.join( "\x20" )
					])
				);
			}
			return( outputs );
		}
	},
	mounted: function()
	{
		// Clear terminal screen.
		this.$exec( "clear" );
		
		// Colorize text.
		var abouts = this.$root.colorableAnsi([ ...this.abouts, ...this.commands(), "\x20" ].join( "\n" ) );
			abouts = abouts.split( "\n" );
		
		return([
			...this.banner,
			...abouts
		]);
	}
};
