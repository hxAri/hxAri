
// Import Router
import Router from "../router/router.js";

// Import Scripts
import Fmt from "./Fmt.js";
import Datime from "./Datime.js";
import HTMLEntity from "./HTMLEntity.js";
import Match from "./Match.js";
import Mapper from "./Mapper.js";
import Type from "./Type.js";
import Value from "./logics/Value.js";

/*
 * Virtual Terminal.
 *
 * @return Terminal
 */
function Terminal()
{
	// ...
};

Terminal.prototype.aliases = {};
Terminal.prototype.author = "Ari Setiawan (hxAri)";

/*
 * Automatic colorize text, number, and symbols in the string.
 *
 * @params String text
 *
 * @return String
 */
Terminal.prototype.colorable = function( text )
{
	var index = 0;
	var match = null;
	var result = "";
	var patterns = {
		number: {
			pattern: "(?<number>\\b(?<!\\\\(x1b|033)|\\;|\\[)(\\d+)\\b)",
			colorize: "var(--shell-c-38-61m)"
		},
		define: {
			pattern: "(?<define>(\\@|\\$)[a-zA-Z0-9_-]+)",
			colorize: "var(--shell-c-38-111m"
		},
		symbol: {
			pattern: "(?<symbol>(\\\\(?<!x1b)|(\\\\(?<!033)))|\\:|\\*|\\-|\\+|\\/|\\&|\\%|\\=|((?<!\\d)\;(?<!\\d))|\\,|\\.|\\?|\\!|\\<|\\>)",
			colorize: "var(--shell-c-38-69m)"
		},
		bracket: {
			pattern: "(?<bracket>\\{|\\}|(((?<!\\\\\x1b)\\[)|\\])|\\(|\\))",
			colorize: "var(--shell-c-38-214m)"
		},
		type: {
			pattern: "(?<type>\\b(False|True)\\b)",
			colorize: "var(--shell-c-38-199m)"
		},
		string: {
			pattern: "(?<string>(?<!\\\\)(\"(.*?)(?<!\\\\)\")|(\'(.*?)(?<!\\\\)\')|(\`(.*?)(?<!\\\\)\`))",
			colorize: "var(--shell-c-38-220m)",
			handler: match => match[0].replaceAll( /(?<!\\)(\\"|\\'|\\`|\\r|\\t|\\n|\\s)/g, m => Fmt( "<span style=\"color: var(--shell-c-38-208m)\">{}</span>", m ) )
		}
	};
	try
	{
		// Create regular expression.
		var regexp = new RegExp( "(?:" + Object.values( Mapper( patterns, ( i, k, val ) => val.pattern ) ).join( "|" ) + ")", "g" );
		
		while( ( match = regexp.exec( text ) ) !== null )
		{
			// Default color for text.
			var color = "var(--shell-c-37m)";
			
			// Check if match has groups.
			if( Type( match.groups, Object ) )
			{
				// Get all group names.
				var groups = Object.keys( match.groups );
				
				for( let i in groups )
				{
					// Get group name.
					var group = groups[i];
					
					// Check if group is available.
					if( Type( patterns[group], Object ) &&
						Type( match.groups[group], String ) )
					{
						color = patterns[group].colorize;
						break;
					}
				}
				
				// Check group has handler.
				if( Type( patterns[group].handler, [ Function, "handler" ] ) )
				{
					result += Fmt( "{}<span style=\"color: {}\">{}</span>", text.substring( index, regexp.lastIndex - match[0].length ), color, patterns[group].handler( match ) );
					index = regexp.lastIndex;
					continue;
				}
			}
			result += Fmt( "{}<span style=\"color: {}\">{}</span>", text.substring( index, regexp.lastIndex - match[0].length ), color, match[0] );
			index = regexp.lastIndex;
		}
	}
	catch( e )
	{
		console.error( e );
	}
	return( result + text.substring( index ) );
};

/*
 * Colorize string.
 *
 * @params String string
 *
 * @return String
 */
Terminal.prototype.colorize = function( string )
{
	return( string );
};

Terminal.prototype.commands = {};
Terminal.prototype.date = new Datime();
Terminal.prototype.directory = {};
Terminal.prototype.exports = {
	HOME: "/terminal"
};
Terminal.prototype.hostname = "localhost";

/*
 * Prompt formater.
 *
 * @params String format
 *
 * @return String
 */
Terminal.prototype.prompt = function( format )
{
	var self = this;
	var index = 0;
	var match = null;
	var prompt = "";
	var regexp = /(?<backslash>\\)(?!(e|x1b|033))(?<format>[^\s]{0,1})/g;
	
	while( ( match = regexp.exec( format ) ) !== null )
	{
		// When the escape is not supported.
		var value = "";
		
		switch( match.groups.format )
		{
			case "d": value = this.date.format( "%a %b %d" ); break;
			case "h":
			case "H": value = this.hostname; break;
			case "w": value = this.router.currentRoute.path !== this.exports.HOME ? this.router.currentRoute.path.replace( this.exports.HOME, "" ) : "~"; break;
			case "W": value = this.router.currentRoute.path !== this.exports.HOME ? this.router.currentRoute.path.replace( this.exports.HOME, "" ).split( "/" ).pop() : "~"; break;
			case "u": value = this.user; break;
		}
		prompt += format.substring( index, regexp.lastIndex - match[0].length ) + value;
		index = regexp.lastIndex;
	}
	return( prompt + format.substring( index ) );
};

Terminal.prototype.router = Router;
Terminal.prototype.shell = "bash";
Terminal.prototype.user = "root";
Terminal.prototype.version = "4.0";
Terminal.prototype.versionRelease = "4.0.0";

export default Terminal;
