
// Import Scripts
import Fmt from "/src/scripts/Fmt.js";
import Mapper from "/src/scripts/Mapper.js";
import Type from "/src/scripts/Type.js";

/*
 * Allow a program/ command to display information about itself.
 *
 * @params Object command
 *
 * @return Array
 */
export default function( command )
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
		var result = "Options:";
		
		// Check if command has options.
		if( Type( options, Object ) )
		{
			// Mapping options.
			Mapper( options, ( idx, name, option ) =>
			{
				// Check if option has usage.
				if( Type( option.usage, String ) )
				{
					// Set option usage.
					result += Fmt( "\n  · {}", option.usage );
					
					// Check if command has alias name.
					if( Type( option.alias, String ) )
					{
						result += Fmt( "\n    {0}{1}|{2}{3}", ...[
							name.length === 1 ? "-" : "--",
							name,
							option.alias.length === 1 ? "-" : "--",
							option.alias
						]);
					}
					else {
						result += Fmt( "\n  {0}{1}", name.length === 1 ? "-" : "--", name );
					}
					result += Fmt( "=[{}]", typeof option.type === "function" ? option.type.name : "Mixed" );
				}
			});
		}
		return( result.split( "\n" ) );
	};
	
	result.push( ...usage( command.name, command.options ) );
	result.push( ...option( command.options ) );
	
	return( result.length > 3 ? [ ...result, "\x20" ] : result );
};