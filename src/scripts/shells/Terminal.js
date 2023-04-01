
// Import Router
import Router from "/src/router/router.js";

// Import Scripts
import Argument from "/src/scripts/shells/Argument.js";
import Fmt from "/src/scripts/Fmt.js";
import Datime from "/src/scripts/Datime.js";
import Directory from "/src/scripts/shells/Directory.js";
import HTMLEntity from "/src/scripts/HTMLEntity.js";
import Match from "/src/scripts/Match.js";
import Mapper from "/src/scripts/Mapper.js";
import Type from "/src/scripts/Type.js";
import Value from "/src/scripts/logics/Value.js";

/*
 * Virtual Terminal.
 *
 * @return Terminal
 */
function Terminal()
{
	this.commands = this.ls( "/bin" );
	this.router.push(
		"/terminal/root"
	);
	console.info( Fmt( "Terminal v{} started.", this.version ) );
};

/*
 * Container for the entire alias name.
 *
 * @values Array
 */
Terminal.prototype.aliases = [];

/*
 * Terminal argument functions.
 *
 * @values Object<Function>
 */
Terminal.prototype.argument = Argument;

/*
 * Terminal author info
 *
 * @values Object
 */
Terminal.prototype.author = {
	name: "Ari Setiawan",
	alias: "hxAri",
	email: "ari160824@gmail.com"
};

/*
 * Terminal vue component instance.
 *
 * @values Object
 */
Terminal.prototype.binding = {};

/*
 * Automatic colorize text, number, and symbols in the string.
 *
 * @params String format
 *
 * @return String
 */
Terminal.prototype.colorable = function( format )
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
		
		while( ( match = regexp.exec( format ) ) !== null )
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
					result += Fmt( "{}<span style=\"color: {}\">{}</span>", format.substring( index, regexp.lastIndex - match[0].length ), color, patterns[group].handler( match ) );
					index = regexp.lastIndex;
					continue;
				}
			}
			result += Fmt( "{}<span style=\"color: {}\">{}</span>", format.substring( index, regexp.lastIndex - match[0].length ), color, match[0] );
			index = regexp.lastIndex;
		}
	}
	catch( e )
	{
		console.error( e );
	}
	return( result + format.substring( index ) );
};

/*
 * Container for the entire available commands.
 *
 * @values Array
 */
Terminal.prototype.commands = [];

/*
 * Date instance.
 *
 * @values Datime
 */
Terminal.prototype.date = new Datime();

/*
 * Container for the entire terminal directoies.
 *
 * @values Array
 */
Terminal.prototype.directory = Directory;

/*
 * Replace environment name in the command name.
 *
 * @params String command
 *
 * @return String
 */
Terminal.prototype.env = function( command )
{
	var value = "";
	var regex = /(?<!\\)(?<variable>\$(?<name>[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*))/g;
	var match = regex.exec( command );
	
	// Check if there are environment in the command.
	if( match !== null )
	{
		// Check if environment is available.
		if( Type( this.exports[match.groups.name], String ) )
		{
			value = this.exports[match.groups.name];
		}
		return( this.env( command.substring( 0, regex.lastIndex - match[0].length ) + value + command.substring( regex.lastIndex ) ) );
	}
	return( command );
};

/*
 * Container for the entire environment names.
 *
 * @values Object
 */
Terminal.prototype.exports = {
	
	/*
	 * Terminal root directory.
	 *
	 * @values String
	 */
	ROOT: "/terminal",
	
	/*
	 * Terminal home directory.
	 *
	 * @values String
	 */
	HOME: "/root",
	
	/*
	 * Current terminal working directory info.
	 *
	 * @values Object
	 */
	PWD: Router.currentRoute,
	
	/*
	 * Terminal prompt.
	 *
	 * @values String
	 */
	PS1: "\\[\\e[0;38;5;112m\\]\\u\\[\\e[0;38;5;190m\\]@\\h\\[\\e[0;38;5;214m\\]: \\[\\e[32m\\]\\w \\[\\e[37m\\]$"
};

/*
 * String formater.
 *
 * @params String format
 *
 * @return String
 */
Terminal.prototype.format = function( format )
{
	// Regex for match escape sequence.
	var regexp = /(?<format>\x1b|\\x1b|\\e|((\0|\\0)33))((?:\[|\\\[)(?<code>.*?)(?<type>m)(?<text>[^\n]*))/g;
	var string = format.replaceAll( /\!\[(bx|bxl|bxs)\]\(([a-zA-Z0-9\-\s]+)\)/g, `<i class="bx $1-$2"></i>` )
	var match = regexp.exec( string );
	
	if( match !== null )
	{
		// Defaulf text is blank for avoid error.
		var text = "";
		
		// Get format style.
		var style = this.formatStyle( match.groups.code );
		
		// If format has text will be 
		if( Type( match.groups.text, String ) )
		{
			text = this.format( match.groups.text );
		}
		
		// Check if format has style.
		if( style )
		{
			return( Fmt( "{}<span class=\"terminal-text text\" style=\"{}\">{}</span>", string.substring( 0, regexp.lastIndex - match[0].length ), style, text ) );
		}
		return( string.substring( 0, regexp.lastIndex - match[0].length ) + text );
	}
	return( string );
};

/*
 * Terminal format styling.
 *
 * @params String code
 *
 * @return False|String
 */
Terminal.prototype.formatStyle = function( code )
{
	var self = this;
	
	// Check if code is valid.
	if( /^(?:\d{1,2}|[01]\d|2[0-4])(;(?:\d|[0-5]\d)(?:;(?:\d{1,3})){0,2})*$/.test( code ) )
	{
		// Split code with semicolon symbol.
		var codes = code.split( ";" );
		
		// If color code has no semicolon.
		if( codes.length === 1 )
		{
			// Check if format code is like \e[0m|\e[00m
			if( this.formatStyleValue[( codes[0].length -1 )] )
			{
				return( this.formatStyleValue[( codes[0].length -1 )][codes[0]] );
			}
		}
		else {
			
			var format = false;
			var color = false;
			
			// If color code has one semicolon.
			if( codes.length === 2 )
			{
				format = Type( self.formatStyleValue[( codes[0].length -1 )], [ Array, Object ], () => self.formatStyleValue[( codes[0].length -1 )][codes[0]], () => false );
				color = Type( self.formatStyleValue[( codes[1].length -1 )], [ Array, Object ], () => self.formatStyleValue[( codes[1].length -1 )][codes[1]], () => false );
			}
			
			// If color code has 3 or more semicolon.
			if( codes.length >= 4 )
			{
				format = Type( self.formatStyleValue[( codes[0].length -1 )], [ Array, Object ], () => self.formatStyleValue[( codes[0].length -1 )][codes[0]], () => false );
				
				if( codes[1] === "38" )
				{
					if( codes[2] === "4" ) color = Fmt( "background-color: var(--shell-c-38-{}m)", codes[3] );
					if( codes[2] === "5" ) color =  Fmt( "color: var(--shell-c-38-{}m)", codes[3] );
					if( codes[2] !== "4" &&
						codes[2] !== "5" )
					{
						if( format )
						{
							format += "; ";
							format += Type( self.formatStyleValue[( codes[2].length -1 )], [ Array, Object ], () => self.formatStyleValue[( codes[2].length -1 )][codes[2]], () => "" );
						}
						else {
							format = Type( self.formatStyleValue[( codes[2].length -1 )], [ Array, Object ], () => self.formatStyleValue[( codes[2].length -1 )][codes[2]], () => false );
						}
					}
				}
			}
			if( format && color )
			{
				return( Fmt( "{}; {}", format, color ) );
			}
			return( format ? format : ( color ? color : false ) );
		}
	}
	return( false );
};

/*
 * Terminal format style value.
 *
 * @values Array<Object>
 */
Terminal.prototype.formatStyleValue = [
	{
		0: "font-weight: normal; font-style: normal; text-decoration: none; text-decoration-line: none; color: var(--shell-c-37m); opacity: 1",
		1: "font-weight: bolder",
		2: "opacity: .8",
		3: "font-style: italic",
		4: "text-decoration-line: underline",
		5: "font-weight: bolder",
		6: "font-weight: normal; font-style: normal; text-decoration-line: none; color: var(--shell-c-37m); opacity: 1",
		7: "background-color: var(--shell-c-37m); color: var(--shell-c-30m)",
		8: "background-color: var(--shell-c-30m); color: var(--shell-c-30m)",
		9: "text-decoration-line: line-through",
	},
	{
		30: "color: var(--shell-c-30m)",
		31: "color: var(--shell-c-31m)",
		32: "color: var(--shell-c-32m)",
		33: "color: var(--shell-c-33m)",
		34: "color: var(--shell-c-34m)",
		35: "color: var(--shell-c-35m)",
		36: "color: var(--shell-c-36m)",
		37: "color: var(--shell-c-37m)",
		
		40: "background-color: var(--shell-c-30m)",
		41: "background-color: var(--shell-c-31m)",
		42: "background-color: var(--shell-c-32m)",
		43: "background-color: var(--shell-c-33m)",
		44: "background-color: var(--shell-c-34m)",
		45: "background-color: var(--shell-c-35m)",
		46: "background-color: var(--shell-c-36m)",
		47: "background-color: var(--shell-c-37m)"
	}
];

/*
 * Terminal History.
 *
 * @values Array
 */
Terminal.prototype.history = [{
	output: [
		"                                           ",
		"             \x1b[0;38;5;240m::                            ",
		"            \x1b[0;38;5;245m^\x1b[0;38;5;255mJJ\x1b[0;38;5;245m^\x1b[0;38;5;240m... :~\x1b[0;38;5;245m^                    ",
		"      \x1b[0;38;5;245m.^\x1b[0;38;5;240m::\x1b[0;38;5;255m~7JJJJJJ??JJJ\x1b[0;38;5;245m^                   ",
		"      \x1b[0;38;5;255m7JJJYYJ?77??JJJJJJ?!!??\x1b[0;38;5;240m:             ",
		"      \x1b[0;38;5;240m:\x1b[0;38;5;255mJJJ?\x1b[0;38;5;245m^.     .^\x1b[0;38;5;255m!?JJLJJJ?\x1b[0;38;5;240m.             ",
		"    \x1b[0;38;5;240m:\x1b[0;38;5;245m^\x1b[0;38;5;255m?JJJ\x1b[0;38;5;245m. \x1b[0;38;5;69m*  \x1b[0;38;5;245m~\x1b[0;38;5;255m7\x1b[0;38;5;245m^   .^\x1b[0;38;5;255m?JIJJJJ?\x1b[0;38;5;240m: ..         ",
		"   \x1b[0;38;5;240m.\x1b[0;38;5;255m?JJJJJ\x1b[0;38;5;245m^  \x1b[0;38;5;240m.\x1b[0;38;5;245m!\x1b[0;38;5;255mJY7     \x1b[0;38;5;245m.\x1b[0;38;5;255m?JAJJ\x1b[0;38;5;245m~::^\x1b[0;38;5;240m::.       ",
		"    \x1b[0;38;5;240m..\x1b[0;38;5;245m^\x1b[0;38;5;255m?JJJ??JJJJ\x1b[0;38;5;245m:      :\x1b[0;38;5;255mJNJ7\x1b[0;38;5;245m^\x1b[0;38;5;240m:\x1b[0;38;5;245m~!~\x1b[0;38;5;240m::.      ",
		"       \x1b[0;38;5;240m:\x1b[0;38;5;255mJJJ?J?7JJ\x1b[0;38;5;245m~       \x1b[0;38;5;255m7AJ?\x1b[0;38;5;245m^\x1b[0;38;5;240m:::::.       ",
		"       \x1b[0;38;5;240m.\x1b[0;38;5;255m!7\x1b[0;38;5;245m^..  :^.       \x1b[0;38;5;255m?JJ?\x1b[0;38;5;245m!!\x1b[0;38;5;240m~~^         ",
		"                        \x1b[0;38;5;245m:\x1b[0;38;5;255mJJJ7\x1b[0;38;5;245m!!!!!         ",
		"                       \x1b[0;38;5;245m:\x1b[0;38;5;255m?JJ?\x1b[0;38;5;245m!!!\x1b[0;38;5;240m~~~.        ",
		"                      \x1b[0;38;5;245m^\x1b[0;38;5;255m?JJ?\x1b[0;38;5;245m!!^\x1b[0;38;5;240m:::::.       ",
		"                    \x1b[0;38;5;245m:\x1b[0;38;5;255m7JJJ7\x1b[0;38;5;245m!!\x1b[0;38;5;240m~.:\x1b[0;38;5;245m~!~\x1b[0;38;5;240m::.      ",
		"                  \x1b[0;38;5;245m:\x1b[0;38;5;255m!JJJJ7\x1b[0;38;5;245m!!!!^::^\x1b[0;38;5;240m::.       ",
		"                \x1b[0;38;5;245m:\x1b[0;38;5;255m~JJCJJ7\x1b[0;38;5;245m!!!!!!!^\x1b[0;38;5;240m.         ",
		"               \x1b[0;38;5;245m^\x1b[0;38;5;255m?JHJJ?\x1b[0;38;5;245m!!!!!!!!^            ",
		"             \x1b[0;38;5;245m:\x1b[0;38;5;255m7JJIJJ?\x1b[0;38;5;245m!!!\x1b[0;38;5;240m^^\x1b[0;38;5;245m::\x1b[0;38;5;240m^^             ",
		"           \x1b[0;38;5;245m^\x1b[0;38;5;255m!JJJNJJ7\x1b[0;38;5;245m!!!^\x1b[0;38;5;240m::\x1b[0;38;5;245m~~\x1b[0;38;5;240m::.            ",
		"          \x1b[0;38;5;245m^\x1b[0;38;5;255m?JJTJJJ7\x1b[0;38;5;245m!!!!^.^!!^\x1b[0;38;5;240m:.            ",
		"        \x1b[0;38;5;245m^\x1b[0;38;5;255m?JJYJJJJ7\x1b[0;38;5;245m!!!!!!^\x1b[0;38;5;240m:::..             ",
		"      \x1b[0;38;5;245m:\x1b[0;38;5;255m7JJAJJJJ?\x1b[0;38;5;245m!!!!!!!!^                  ",
		"      \x1b[0;38;5;255m7JJJJJJJ?\x1b[0;38;5;245m!!!!!!!\x1b[0;38;5;240m~:                   ",
		"\x20",
		"Type \x1b[0;38;4;111m\x1b[37mhelp\x1b[40m \x1b[37mfor available commands",
		"\x20"
	]
}];

/*
 * Terminal Hostname.
 *
 * @values String
 */
Terminal.prototype.hostname = "hxari";

/*
 * Terminal Loading.
 *
 * @values Boolean
 */
Terminal.prototype.loading = false;

/*
 * Terminal directory scanner.
 *
 * @params String path
 *
 * @return Array<Object>
 *  Array list directory contents.
 *
 * @throws Error
 *  Throw when the directory not found.
 */
Terminal.prototype.ls = function( path )
{
	// Split pathname.
	let parts = path.split( "/" ).filter( part => Value.isNotEmpty( part ) );
	let dir = this.directory;
	
	// Mapping parts of pathname.
	for( let i in parts )
	{
		// Get part name.
		var part = parts[i];
		
		// Check if directory value is Object.
		if( Type( dir, Object ) )
		{
			// Check if directory has children.
			if( Type( dir.child, Array ) )
			{
				dir = dir.child;
			}
			else {
				dir = false;
			}
		}
		
		// Check id directory value is Array.
		if( Type( dir, Array ) )
		{
			// Find directory part name.
			dir = dir.find( d => 
			{
				return d.name === part && ( d.type === "path" || d.type === "symlink" );
			});
			
			// Check if directory not found.
			if( Type( dir, [ Array, Object ] ) === false )
			{
				throw new Error( Fmt( "No such file or directory {}", path ) );
			}
		}
		else {
			throw new Error( Fmt( "No such file or directory {}", path ) );
		}
	}
	
	// list the files and directories under the directory.
	let result = [];
	
	// Check if directory is path.
	if( dir.type === "path" )
	{
		return( dir.child );
		// Mapping items form directory.
		for( let item of dir.child )
		{
			if( item.type === "path")
			{
				result.push( item );
			}
			else if( item.type === "symlink" )
			{
				/*let linkTargetParts = item.from.split("/");
				let linkTargetDir = directory;
				for (let i = 0; i < linkTargetParts.length; i++) {
					let linkTargetPart = linkTargetParts[i];
					if (linkTargetPart === "") continue;
					if( !isArray( linkTargetDir ) && typeof linkTargetDir === "object" )
					{
						linkTargetDir = linkTargetDir.child;
					}
					linkTargetDir = linkTargetDir.find(d => d.name === linkTargetPart && d.type === "path");
					if (!linkTargetDir) break; // symlink target directory not found
				}
				if (linkTargetDir) {
					let linkTargetPath = linkTargetParts.slice(linkTargetParts.lastIndexOf("") + 1).join("/");
					let subresult = ls(linkTargetPath);
					subresult = subresult.map(name => item.name + "/" + name);
					result.push(...subresult);
				}
				*/
				result.push( item );
			}
			else {
				result.push( item );
			}
		}
		/*
		// recursively scan the subdirectories
		for (let item of dir.child) {
			if (item.type === "path") {
				let subresult = ls(path + "/" + item.name);
				//subresult = subresult.map(name => item.name + "/" + name);
				result = subresult//.push(...subresult);
			}
		}*/
		return( result );
	}
	else {
		return( dir.type === "symlink" ? this.ls( dir.from ) : dir );
	}
};

/*
 * Normalize alias name in the command.
 * And split command with double-and symbol (&&).
 *
 * @params String command
 *
 * @return Array
 */
Terminal.prototype.normalize = function( command )
{
	// Split command with symbol (&&)
	var commands = command.split( /(?<=^|[^"'`\\\\])\s*&&\s*(?=[^"'`\\\\]|$)/g );
		commands = commands.filter( x => x !== "&&" );
	
	// Mapping commands.
	for( let i in commands )
	{
		// Split command with white space.
		commands[i] = commands[i].split( /\s/ );
		
		// Check if command is alias name.
		if( Type( this.aliases[commands[i][0]], String ) )
		{
			commands[i][0] = this.aliases[commands[i][0]];
		}
		commands[i] = commands[i].join( "\x20" );
		commands[i] = this.env(
			commands[i]
		);
	}
	return( commands );
};

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
			// The date in "Weekday Month Date" format (e.g., "Tue May 26")
			case "d": value = this.date.format( "%a %b %d" ); break;
			
			// The hostname.
			case "h":
			case "H": value = this.hostname; break;
			
			// New line.
			case "n": value = "<br/>"; break;
			
			// The name of the shell.
			case "s": value = this.shell; break;
			
			// Current working directory.
			case "w": value = this.pwd() !== this.exports.HOME ? this.pwd() : "~"; break;
			
			// Basename current working directory.
			case "W": value = this.pwd( true ); break;
			
			// The username of current user.
			case "u": value = this.user; break;
			
			// The current time in 24-hour HH:MM:SS format.
			case "t": value = this.date.format( "%H:%M:%S" ); break;
			
			// The current time in 12-hour HH:MM:SS format.
			case "T": value = this.date.format( "%I:%M:%S" ); break;
			
			// The current time in 12-hour am/pm format.
			case "@": value = Fmt( "{} {}", this.date.format( "%I:%M" ), this.date.hours() >= 12 ? "PM" : "AM" ); break;
			
			// The current time in 24-hour HH:MM format.
			case "A": value = this.date.format( "%H:%M" ); break;
			
			default: break;
		}
		prompt += format.substring( index, regexp.lastIndex - match[0].length ) + value;
		index = regexp.lastIndex;
	}
	return( this.format( prompt + format.substring( index ) ) );
};

/*
 * Terminal current working directory.
 *
 * @params Boolean base
 *
 * @return String
 */
Terminal.prototype.pwd = function( base = false )
{
	// Get current working directory.
	var path = this.exports.PWD.path;
		path = path.replace( new RegExp( "^" + this.exports.ROOT.replaceAll( /\//g, "\\/" ), "i" ), "" );
		path = path === "" ? "/" : path;
	
	if( base )
	{
		return( path.split( "/" ) ).pop();
	}
	return( path );
};

/*
 * Terminal router.
 *
 * @values Router
 */
Terminal.prototype.router = Router;

/*
 * Run terminal with command.
 *
 * @params String input
 *
 * @return Promise
 */
Terminal.prototype.run = async function( input )
{
	// Copy current object instance.
	var self = this;
	
	return( new Promise(
		
		/*
		 * Command runner.
		 *
		 * @params Function resolve
		 * @params Function reject
		 *
		 * @return Void
		 */
		await function( resolve, reject )
		{
			// Normalize command name.
			var commands = self.normalize( input );
			
			// Setup.
			//self.loading = true;
			self.binding.model = "";
			self.history.push({
				prompt: self.exports.PS1,
				inputs: input
			});
			
			// Mapping commands.
			for( let i in commands )
			{
				self.argument.extract.call( self, commands[i] );
			}
		}
	));
};

/*
 * Terminal shell name.
 *
 * @values String
 */
Terminal.prototype.shell = "javascript";

Terminal.prototype.style = "font-weight: normal; font-style: normal; text-decoration: none; text-decoration-line: none; color: var(--shell-c-37m); opacity: 1";

/*
 * Terminal username.
 *
 * @values String
 */
Terminal.prototype.user = "root";

/*
 * Terminal version.
 *
 * @values String
 */
Terminal.prototype.version = "4.0";

/*
 * Terminal version release.
 *
 * @values String
 */
Terminal.prototype.versionRelease = "4.0.0";

export default Terminal;
