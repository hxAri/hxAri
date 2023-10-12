
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
			var name = this.$root.pathResolver( argv[0] = argv[0] ?? this.$envs.HOME, true );
			
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
				Fmt( "/terminal/{}", name ).replaceAll( /\/\//g, "/" ).replace( /\/$/g, "" )
			);
		}
		catch( error )
		{
			throw Fmt( "cd: {}", error );
		}
	}
};