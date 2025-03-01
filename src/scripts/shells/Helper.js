
// Import Scripts
import Fmt from "/src/scripts/Fmt.js";
import Mapper from "/src/scripts/Mapper.js";
import Type from "/src/scripts/Type.js";

/**
 * Return command usage.
 *
 * @params String name
 *  Command name.
 * @params Object options
 *  Command options.
 *
 * @return Array
 */
var usage = function( name, options ) {
	
	var usages = [ name ];
	
	// Check if command has options.
	if( Type( options, Object ) ) {
		
		// Mapping options.
		Mapper( options, function( index, name, option ) {
			if( Type( option.alias, String ) ) {
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
			usages.push( Fmt( "{}=[{}]", name, typeof option.type === "function" ? option.type.name : "Mixed" ) );
		});
	}
	else {
		usages.push( "[...Mixed<argv>]" );
	}
	return [ "\x20", usages.join( "\x20" ), "\x20" ];
}

/**
 * Return command options.
 *
 * @params Object options
 *  Command options.
 *
 * @return Array
 */
function option( options ) {
	
	var result = "";
	
	// Check if command has options.
	if( Type( options, Object ) ) {
		
		result = "Options:";
		
		// Mapping options.
		Mapper( options, function( index, name, option ) {
			if( Type( option.usage, String ) ) {
				result += Fmt( "\n \x1b[0;38;5;190m·\x1b[37m {}", option.usage );
				if( Type( option.alias, String ) ) {
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
	return result.split( "\n" );
}

/**
 * Allow a program/ command to display information about itself.
 *
 * @params Object self
 * @params Object command
 *
 * @return Object
 */
export default function( self, command ) {
	
	let stdout = [];
	
	// Push command usage.
	stdout.push( ...usage( command.name, command.options ) );
	
	// If command has abouts.
	Type( command.abouts, String, 
		() => stdout.push( Fmt( "About: {}", command.abouts ) )
	);
	
	// If command has author.
	if( Type( command.author, Object ) ) {
		Type( command.author.name, String, 
			() => stdout.push( Fmt( "Author: {}", command.author.name ) )
		);
	}
	
	// If command has version.
	Type( command.version, [ Number, String ], 
		() => stdout.push( Fmt( "Version: {}", command.version ) )
	);
	
	// If command has release date.
	Type( command.release, [ Number, String ], 
		() => stdout.push( Fmt( "Release: {}", command.release ) )
	);
	
	// Colorize text.
	var colored = self.$root.colorableAnsi( [ ...stdout, ...option( command.options ) ].join( "\x0a" ) );
		stdout = colored.split( "\x0a" );
	if( colored.length > 3 ) {
		stdout.push( "\x20" );
	}
	return {
		stdin: null,
		stderr: null,
		stdout: stdout,
		prompt: null
	};
};