
// Import Scripts
import Fmt from "./Fmt.js";
import HTMLEntity from "./HTMLEntity.js";
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

/*
 * Colorize string.
 *
 * @params String text
 *
 * @return String
 */
Terminal.prototype.colorize = function( text )
{
	var index = 0;
	var match = null;
	var result = "";
	var patterns = {
		number: {
			pattern: "(?<number>\\b(?<!\\\\(x1b|033)|\\;|\\[)(\\d+)\\b)",
			colorize: "var(--shell-c-38-61m)"
		},
		symbol: {
			pattern: "(?<symbol>(\\\\(?<!x1b)|(\\\\(?<!033)))|(\\@|\\$)[a-zA-Z0-9_-]+|\\:|\\*|\\-|\\+|\\/|\\&|\\%|\\=|((?<!\\d)\;(?<!\\d))|\\,|\\.|\\?|\\!|\\<|\\>)",
			colorize: "var(--shell-c-38-111m)"
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

export default Terminal;
