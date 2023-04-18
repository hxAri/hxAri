
// Import Scripts
import Fmt from "/src/scripts/Fmt.js";
import Mapper from "/src/scripts/Mapper.js";
import Type from "/src/scripts/Type.js";

/*
 * Allow a program/ command to display information about itself.
 *
 * @params Object self
 * @params Object command
 *
 * @return Array
 */
export default function( self, command )
{
	let result = [];
	
	/*
	 * Return command usage.
	 *
	 * @params String name
	 *  Command name.
	 * @params Object options
	 *  Command options.
	 *
	 * @return Array
	 */
	var usage = function( name, options )
	{
		var usage = [ name ];
		
		// Check if command has options.
		if( Type( options, Object ) )
		{
			// Mapping options.
			Mapper( options, ( idx, name, option ) =>
			{
				// Check if option has alias name.
				if( Type( option.alias, String ) )
				{
					name = Fmt( "{0}{1}|{2}{3}", ...[
						name.length === 1 ? "-" : "--",
						name,
						option.alias.length === 1 ? "-" : "--",
						option.alias
					]);
				}
				else {
					name = Fmt( "{0}{1}", name.length === 1 ? "-" : "--", name );
				}
				
				// Push option usage.
				usage.push( Fmt( "{}=[{}]", name, typeof option.type === "function" ? option.type.name : "Mixed" ) );
			});
		}
		else {
			usage.push( "[...Mixed<argv>]" );
		}
		return([ "\x20", usage.join( "\x20" ), "\x20" ]);
	};
	
	/*
	 * Return command options.
	 *
	 * @params Object options
	 *  Command options.
	 *
	 * @return Array
	 */
	var option = function( options )
	{
		var result = "";
		
		// Check if command has options.
		if( Type( options, Object ) )
		{
			result = "Options:";
			
			// Mapping options.
			Mapper( options, ( idx, name, option ) =>
			{
				// Check if option has usage.
				if( Type( option.usage, String ) )
				{
					// Set option usage.
					result += Fmt( "\n \x1b[0;38;5;190m·\x1b[37m {}", option.usage );
					
					// Check if command has alias name.
					if( Type( option.alias, String ) )
					{
						result += Fmt( "\n   {0}\x1b[32m{1}|{2}\x1b[32m{3}", ...[
							name.length === 1 ? "-" : "--",
							name,
							option.alias.length === 1 ? "-" : "--",
							option.alias
						]);
					}
					else {
						result += Fmt( "\n   {0}\x1b[32m{1}", name.length === 1 ? "-" : "--", name );
					}
					result += Fmt( "=[{}]", typeof option.type === "function" ? option.type.name : "Mixed" );
				}
			});
		}
		return( result.split( "\n" ) );
	};
	
	// Push command usage.
	result.push( ...usage( command.name, command.options ) );
	
	// If command has abouts.
	Type( command.abouts, String, () => result.push( Fmt( "About: {}", command.abouts ) ) );
	
	// If command has author.
	if( Type( command.author, Object ) )
	{
		Type( command.author.name, String, () => result.push( Fmt( "Author: {}", command.author.name ) ) );
	}
	
	// If command has version.
	Type( command.version, [ Number, String ], () => result.push( Fmt( "Version: {}", command.version ) ) );
	
	// If command has release date.
	Type( command.release, [ Number, String ], () => result.push( Fmt( "Release: {}", command.release ) ) );
	
	// Colorize text.
	result = self.$root.colorableAnsi( [ ...result, ...option( command.options ) ].join( "\n" ) );
	
	return( result.length > 3 ? [ ...result.split( "\n" ), "\x20" ] : result.split( "\n" ) );
};