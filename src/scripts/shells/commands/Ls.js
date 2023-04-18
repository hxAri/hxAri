
// Import Scripts
import Author from "/src/scripts/Author.js";
import Fmt from "/src/scripts/Fmt.js";
import Type from "/src/scripts/Type.js";

export default {
	name: "ls",
	type: "file",
	author: Author,
	abouts: "List about information the FILEs",
	version: "1.0",
	options: {
		color: {
			type: Boolean,
			usage: "Colorize file by type",
			require: false
		}
	},
	mounted: function({ color } = {})
	{
		try
		{
			// Get pathname.
			var path = this.$argv.slice( 1 );
			
			// Check if argument is to Many.
			if( path.length > 1 )
			{
				throw Fmt( "lTo many arguments" );
			}
			else {
				
				// Get file list.
				var files = [ ...this.$root.ls( path[0] ?? this.$envs.PWD.path ) ];
				
				// If colorize is activated.
				if( color )
				{
					// Mapping files.
					for( let i in files )
					{
						switch( files[i].type )
						{
							case "": files[i] = Fmt( "\x1b[3m{}", file.name ); break;
							case "": files[i] = Fmt( "\x1b[3m{}", file.name ); break;
							case "": files[i] = Fmt( "\x1b[3m{}", file.name ); break;
							case "": files[i] = Fmt( "\x1b[3m{}", file.name ); break;
							default:
								files[i] = Fmt( "\x1b[37m{}", file.name );
								break;
						}
					}
				}
				else {
					
					// Get file name.
					files = files.map( file => file.name );
				}
				return( files );
			}
		}
		catch( error )
		{
			throw Fmt( "ls: {}", error );
		}
	}
};
