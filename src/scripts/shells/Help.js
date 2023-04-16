
// Import Scripts
import Fmt from "/src/scripts/Fmt.js";
import Mapper from "/src/scripts/Mapper.js";
import Type from "/src/scripts/Type.js";

export default function Help( shell )
{
	var info = [];
	var sets = {
		usage: [
			shell.name
		],
		author: [],
		abouts: [],
		version: [],
		options: []
	}
	
	// Check if shell has options.
	if( Type( shell.options, Object ) )
	{
		// Mapping shell options.
		Mapper( shell.options, ( idx, name, option ) =>
		{
			
			// Check if option has value type.
			if( typeof option.type === "function" )
			{
				sets.usage.push( Fmt( "[{}]", option.type.name ) );
			}
		});
	}
	else {
		sets.usage.push( "[argv]" );
	}
	
	// Mapping sets.
	for( let key of Object.keys( sets ) )
	{
		// If list is not empty.
		if( sets[key].length )
		{
			if( key === "usage" )
			{
				info.push( ...[ "\x20", sets.usage.join( "\x20" ), "\x20" ] );
			}
			else {
				info.push( Fmt( "{}{}", key.charAt( 0 ).toUpperCase(), key.slice( 1 ) ) );
				info.push( ...sets[key] );
			}
		}
	}
	return( info );
};
