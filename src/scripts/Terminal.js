
// Import Scripts
import Fmt from "./Fmt.js";
import HTMLEntity from "./HTMLEntity.js";
import Mapper from "./Mapper.js";
import Type from "./Type.js";
import Value from "./logics/Value.js";
	
function Terminal()
{
	
};

Terminal.prototype.colorize = function( text )
{
	var index = 0;
	var match = null;
	var result = "";
	var patterns = [
		{
			pattern: "/(?<number>\b(?<!\\\(x1b|033)|\\;|\\[)(\d+)\b)",
		},
		{
			pattern: "(?<string>(\"(.*?)(?<!\\\\)\")|(\'(.*?)(?<!\\\\)\')|(\`(.*?)(?<!\\\\)\`))"
		}
	];
	try
	{
	var regexp = new RegExp( "(?:" + Object.values( Mapper( patterns, ( i, val ) => val.pattern ) ).join( "|" ) + ")", "g" );
	
	while( ( match = regexp.exec( text ) ) !== null )
	{
		var color = "white";
		
		result += text.substring( index, regexp.lastIndex - match[0].length ) + "<span style=\"color: " + color + "\">" + match[0] + "</span>";
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
