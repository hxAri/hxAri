
// Import Scripts
import Author from "/src/scripts/Author.js";
import Fmt from "/src/scripts/Fmt.js";
import Not from "/src/scripts/logics/Not.js";

export default {
	name: "cd",
	type: "binary",
	author: Author,
	abouts: "Change the shell working directory",
	methods: {
		
		/*
		 * Resolve pathname.
		 *
		 * @params String path
		 *
		 * @return String
		 */
		resolve: function( path )
		{
			// Check if target destination is old destination.
			if( path === "-" )
			{
				path = this.$envs['PWD-OLD'] ?? this.$root.pwd();
			}
			
			// Split pathname with slash.
			var names = Fmt( "{}{}", path[0] !== "/" ? this.$root.pwd() + "/" : "", path ).split( "/" );
			var result = [];
			
			// Mapping path names.
			for( let i in names )
			{
				if( names[i] === "." ) continue;
				if( names[i] === ".." )
				{
					if( result[( i -1 )] )
					{
						delete result[( i -1 )];
					}
					continue;
				}
				result.push( names[i] );
			}
			return( result.length ? result : [ "/" ] ).join( "/" ).replace( /^\/\//, "" );
		}
	},
	mounted: function()
	{
		// Remove command name from argument values.
		var argv = this.$argv.slice( 1 );
		
		try
		{
			// Check for avoid to many arguments.
			if( argv.length > 1 ) throw "To many arguments";
			
			// Resolve pathname.
			var name = this.resolve( argv[0] = argv[0] ?? this.$envs.HOME );
			
			// Try to check directory.
			var path = this.$root.ls( name );
			
			// Check if path is not path.
			if( Not( path, Array ) )
			{
				throw Fmt( "{}: Is not a directory", argv[0] );
			}
			
			// Save old directory destination.
			this.$envs['PWD-OLD'] = this.$root.pwd();
			
			// Push route path.
			this.$root.router.push(
				Fmt( "/terminal/{}", name ).replaceAll( /\/\//g, "/" )
			);
		}
		catch( error )
		{
			throw Fmt( "cd: {}", error );
		}
	}
};