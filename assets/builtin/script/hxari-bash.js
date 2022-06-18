/*
 * Bash utility.
 *
 * The Instance virtual command line interface.
 */
const $Bash = function( input )
{
    if( $Is( input, String ) && this.spaces( input ) !== "" )
    {
        self = this;
        input = this.spaces( input );
        
        self.history.push({
            prompt: self.prompt,
            command: input
        });
        
        input.split( "&&" ).forEach( input =>
        {
            self.history.push({
                outputs: self.execute( self.spaces( input ) )
            });
        });
    }
};

/*
 * Remove all whitespace at the beginning or end of the string.
 *
 * @params String $input
 *
 * @return String
 */
$Bash.prototype.spaces = input => ( input = ( input[0] === " " ? input = input.slice( 1 ) : ( input[( input.length -1 )] === " " ? input = input.slice( 0, -1 ) : input ) ) )[0] === " " || input[( input.length -1 )] === " " ? $Bash.prototype.spaces( input ) : input;

/*
 * Bash Command line prompt.
 *
 * @values String
 */
$Bash.prototype.prompt = "$";

/*
 * List of all aliases.
 *
 * @values Array
 */
$Bash.prototype.aliases = [];

/*
 * List of all environment variables.
 *
 * @values Array
 */
$Bash.prototype.exports = [];

/*
 * Bash History Command and output program.
 *
 * @values Array
 */
$Bash.prototype.history = [{
    command: false,
    outputs: [
        "\x1b[0;00m                                           ",
        "\x1b[0;00m             ::                            ",
        "\x1b[0;00m            ~JJ^... :~^                    ",
        "\x1b[0;00m      .^::~7JJJJJJ??JJJ^                   ",
        "\x1b[0;00m      7JJJYYJ?77??JJJJJJ?!!??:             ",
        "\x1b[0;00m      :JJJ?^.     .^!?JJJJJJ?.             ",
        "\x1b[0;00m    :^?JJJ.    ~7^   .~?JJJJJ?: ..         ",
        "\x1b[0;00m   .?JJJJJ^  .!JY7     .?JJJJ~::^::.       ",
        "\x1b[0;00m    ..^?JJJ??JJJJ:      :JJJ7.:~!~::.      ",
        "\x1b[0;00m       :JJJ?J?7JJ~       7JJ?^:::::.       ",
        "\x1b[0;00m       .!7^..  :^.       ?JJ?!!~~^         ",
        "\x1b[0;00m                        :JJJ7!!!!!         ",
        "\x1b[0;00m                       .?JJ?!!!~~~.        ",
        "\x1b[0;00m                      ^?JJ?!!^:::::.       ",
        "\x1b[0;00m                    :7JJJ7!!~.:~!~::.      ",
        "\x1b[0;00m                  .!JJJJ7!!!!^::^::.       ",
        "\x1b[0;00m                .~JJJJJ7!!!!!!!^ .         ",
        "\x1b[0;00m               ^?JJJJ?!!!!!!!!^            ",
        "\x1b[0;00m             :7JJJJJ?!!!~^^:^^             ",
        "\x1b[0;00m           .!JJJJJJ7!!!^::~~::.            ",
        "\x1b[0;00m          ~?JJJJJJ7!!!!^.^!!^:.            ",
        "\x1b[0;00m        ^?JJJJJJJ7!!!!!!^:::..             ",
        "\x1b[0;00m      :7JJJJJJJ?!!!!!!!!^                  ",
        "\x1b[0;00m      7JJJJJJJ?!!!!!!!~:                   ",
        "\x1b[0;00m                                           "
    ]
}];

/*
 * Bash string argument pattern.
 *
 * @values RegExp
 */
$Bash.prototype.pattern = /([^\s'"]([^\s'"]*(['"])([^\3]*?)\3)+[^\s'"]*)|[^\s'"]+|(['"])([^\5]*?)\5/gi;

/*
 * Bash command executor.
 * Execute the given command.
 *
 * @params String $input
 *
 * @return Mixed
 */
$Bash.prototype.execute = function( input )
{
    // Parse string into argv.
    var argv = this.argument( input );
    
    // Searching for command name matching with alias.
    for( let i in this.aliases )
    {
        var alias = this.aliases[i];
        
        // If alias is available or found.
        if( alias.alias === argv[0] )
        {
            return( this.execute( $f( "{} {}", alias.inalias, input.replace( /^([\S]+)\s*/g, "" ) ) ) );
        }
    }
    
    // Search command name.
    for( let command of this.commands )
    {
        // If the command is available or found.
        if( command.name === argv[0] )
        {
            try {
                
                // The argument structure for the function.
                var args = [{}];
                
                // Command self.
                var self = {
                    
                    // Bash instance.
                    $bash: this,
                    
                    // Command raw arguments.
                    $args: this.spaces( input.replace( /^([\S]+)\s*/g, "" ) ),
                    $argv: argv,
                    
                    // If the command has methods.
                    ...$Is( command.methods, Object ) ? command.methods : {}
                    
                };
                
                // If the command has options.
                if( $Is( command.opts, Object ) )
                {
                    // Parse arguments.
                    var parse = this.argparser( argv, command.opts );
                    
                    for( let i in parse )
                    {
                        if( i !== "argv" )
                        {
                            args[0][i.replace( /^([-]*)/, "" )] = ( match = parse[i].match( /^\"(.*)\"$|^\'(.*)\'$/ ) ) ? ( match[1] ? match[1] : match[2] ) : parse[i];
                        }
                    }
                } else {
                    
                    // If the command has no arguments.
                    // But there are arguments given.
                    if( argv.length > 1 && command.allowed !== true )
                    {
                        throw new Error( "To many arguments." );
                    }
                    
                }
                
                return( command.mounted.apply( self, args ) );
                
            } catch( e ) {
                return( $f( "sh: {}: {}", argv[0], e ) );
            }
        }
    }
    
    return( $f( "sh: {}: Command not found.", argv[0] ) );
    
};

/*
 * Parse string to argv array.
 *
 * @params String $argument
 *
 * @return Array
 */
$Bash.prototype.argument = function( argument )
{
    var match = null;
    var result = [];
    
    while( match = this.pattern.exec( argument ) )
    {
        result.push((( argv = [] ) =>
        {
            for( let i in match )
            {
                argv.push( match[i] );
            }
            for( let i in argv )
            {
                if( $Is( argv[i], String ) )
                {
                    return( argv[i] );
                }
            }
            return( argv );
        })());
    }
    
    return( result );
};

/*
 * Argument parser
 *
 * @params Object $argv
 * @params Object $opts
 * @params Object ...
 *
 * @return Object
 *
 * This is the source code of vercel which was
 * later remade please see the original source
 * code for official documentation.
 *
 * @source https://github.com/vercel/arg
 */
$Bash.prototype.argparser = function( argv, opts, { permissive = false, stopAtPositional = false } = {} )
{
    var alias = {};
    var handle = {};
    var result = { argv: [] };
    var symbol = Symbol( "arg flag" );
    
    for( let key of Object.keys( opts ) )
    {
        
        // If key is empty.
        if( key === false || key === "" || key === null || key === "undefined" )
        {
            throw new Error( "Argument key cannot be an empty string." );
        }
        
        // If the argument key is not prefixed with (-).
        if( key[0] !== "-" )
        {
            throw new Error( $f( "Argument key must start with \"-\" but found: \"{}\"", key ) );
        }
        
        // If the argument key length is only one.
        if( key.length === 1 )
        {
            throw new Error( $f( "Argument key must have a name; singular \"-\" keys are not allowed: \"{}\"", key ) );
        }
        
        // If the argument key is a string.
        // Skiped.
        if( $Is( opts[key], String ) )
        {
            alias[key] = opt[key]; continue;
        }
        
        let type = opts[key];
        let flag = false;
        
        // If the argument value is Array.
        // If the value of the Array argument is only one.
        // If the value of the first Array of type arguments is a Function.
        if( $Is( type, Array ) && type.length === 1 && $Is( type[0], Function ) )
        {
            
            var [fn] = type;
            
            // Type function.
            type = ( value, name, prev = [] ) =>
            {
                
                // Push prefix.
                prev.push( fn( value, name, prev[( prev.length -1 )] ) );
                
                // Return all prefixes.
                return prev;
            };
            
            flag = fn === Boolean || fn[symbol] === true;
            
        } else {
            
            // If type is a Function.
            if( $Is( type, Function ) )
            {
                flag = type === Boolean || type[symbol] === true;
            } else {
                throw new Error( `Type missing or not a function or valid array type: \"${key}\"` );
            }
        }
        
        // If the short argument is invalid.
        if( key[0] !== "-" && key.length > 2 )
        {
            throw new Error( `Short argument keys (with a single hyphen) must have only one character: \"${key}\"` );
        }
        
        handle[key] = [ type, flag ];
        
    }
    
    for( let i = 0, len = argv.length; i < len; i++ )
    {
        
        const wholeArg = argv[i];
        
        if( stopAtPositional && result.argv.length > 0 )
        {
            result.argv = result.argv.concat( argv.slice( i ) );
            break;
        }
        
        if( wholeArg === "--" )
        {
            result.argv = result.argv.concat( argv.slice( i +1 ) );
            break;
        }
        
        if( wholeArg.length > 1 && wholeArg[0] === "-" )
        {
            var separatedArguments = 
                wholeArg[1] === "-" || wholeArg.length === 2 ? 
                    [wholeArg] : 
                    wholeArg
                        .slice( 1 )
                        .split( "" )
                        .map( a => $f( "{}", a ) );
            
            for( let j = 0; j < separatedArguments.length; j++ )
            {
                var arg = separatedArguments[j];
                var [
                    originalArgName,
                    argStr
                ] = arg[1] === "-" ? arg.split( /=(.*)/, 2 ) : [ arg, undefined ];
                
                var argName = originalArgName;
                
                // Looping for all aliases.
                while( argName in alias )
                {
                    // Take value from alias.
                    argName = alias[argName];
                }
                
                if( ( argName in handle ) === false )
                {
                    if( permissive )
                    {
                        result.argv.push( arg ); continue;
                    } else {
                        throw new Error( $f( "Unknown or unexpected option: \"{}\"", originalArgName ) );
                    }
                }
                
                const [ type, flag ] = handle[argName];
                
                if( flag === false && j +1 < separatedArguments.length )
                {
                    throw new Error( $f( "Option requires argument ( but was followed by another short argument ) : \"{}\"", originalArgName ) );
                }
                
                // If flag is true.
                if( flag )
                {
                    result[argName] = type( true, argName, result[argName] );
                } else {
                    
                    // If argument string is undefined.
                    if( argStr === undefined )
                    {
                        var xxx = argv.length < i + 2 ||
                        (
                            argv[( i +1 )].length > 1 &&
                            argv[( i +1 )][0] === "-" &&
                            (
                                argv[( i +1 )].match( /^-?\d*(\.(?=\d))?\d*$/ ) &&
                                (
                                    type === Number ||
                                    (
                                        $Is( BigInt, Defined ) && type === BigInt 
                                    )
                                )
                            ) === false
                        );
                        
                        if( xxx )
                        {
                            throw new Error( $f( "Option requires argument: \"{}\" {}", originalArgName, originalArgName === argName ? "" : $f( "( alias for {})", argName ) ) );
                        }
                        
                        result[argName] = type( argv[( i +1 )], argName, result[argName] );
                        
                        ++i;
                    } else {
                        result[argName] = type( argStr, argName, result[argName] );
                    }
                }
            }
        } else {
            result.argv.push( wholeArg );
        }
    }
    
    return( result );
    
};

$Bash.prototype.replable = {
    
    color: null,
    
    /*
     * Give color to the input text that matches.
     *
     * @params String $string
     *
     * @return String
     */
    inputs: function( string )
    {
        return( string );
    },
    
    /*
     * Give color to the highlighted text output.
     *
     * @params String $string
     *
     * @return String
     */
    output: function( string )
    {
        if( $Is( this.regexp, Array ) )
        {
            this.regexp.forEach( r =>
            {
                while( match = r.regexp.exec( string ) )
                {
                    string = r.handle.apply( $Bash.prototype.replable, [{ string, match }] );
                }
            });
            return( string );
        }
        throw new Error( "Failed to construct $Colorize, please don't use the \"new\" operator." );
    },
    
    /*
     * Prefix for the string to be colored.
     *
     * @params String $color
     *
     * @return String
     */
    prefix: function( color )
    {
        return( "<span style=\"color:" + color + ";\">" );
    },
    
    /*
     * Color patterns and handler.
     *
     * @values Array
     */
    regexp: [
        {
            /*
             * Terminal Font Styles.
             *
             *  0 | \x1b[0;31m | =Regular
             * ---+------------+-------------
             *  1 | \x1b[1;31m | =Bold
             * ---+------------+-------------
             *  2 | \x1b[2;31m | =Low Intensity
             * ---+------------+-------------
             *  3 | \x1b[3;31m | =Italic
             * ---+------------+-------------
             *  4 | \x1b[4;31m | =Underline
             * ---+------------+-------------
             *  5 | \x1b[5;31m | =Blinking
             * ---+------------+-------------
             *  6 | \x1b[6;31m.| =Reverse
             * ---+------------+-------------
             *  7 | \x1b[7;31m | =Background
             * ---+------------+-------------
             *  8 | \x1b[8;31m | =Invisible
             */
            
            /*
             * Terminal Font Bg & Colors.
             *
             *  fc=30 | fb=40 | fc=90 | fb=100 | =Black   
             * -------+-------+-------+--------+----------
             *  fc=31 | fb=41 | fc=91 | fb=101 | =Red 
             * -------+-------+-------+--------+----------
             *  fc=32 | fb=42 | fc=92 | fb=102 | =Green 
             * -------+-------+-------+--------+----------
             *  fc=33 | fb=43 | fc=93 | fb=103 | =Yello 
             * -------+-------+-------+--------+----------
             *  fc=34 | fb=44 | fc=94 | fb=104 | =Blue 
             * -------+-------+-------+--------+----------
             *  fc=35 | fb=35 | fc=95 | fb=105 | =Magenta 
             * -------+-------+-------+--------+----------
             *  fc=36 | fb=36 | fc=96 | fb=106 | =Cyan 
             * -------+-------+-------+--------+----------
             *  fc=37 | fb=36 | fc=97 | fb=107 | =White 
             */
            
            regexp: /(?:\x1b\[((?<solo>([0-9]+))|(?<duo>([0-9]+)\;([0-9]+))|(?<trio>([0-9]+)\;([0-9]+)\;([0-9]+)))\m)/gi,
            handle: ({ string, match }) =>
            {
                // Syntax \x1b[0m
                if( match[3] )
                {
                    //return( $f( "\"sh-fc-{}\"" ) );
                }
                
                // Syntax \x1b[0;32m
                if( match[5] && match[6] )
                {
                    if( match[5] === "7" )
                    {
                        alert()
                    }
                    //return( $f( "\"sh-fs-{} sh-fc-{}\"", match[5], match[6] ) );
                }
                
                // Syntax \x1b[0;32;47m
                if( match[8] && match[9] && match[10] )
                {
                    //return( $f( "\"sh-fs-{} sh-fc-{} sh-fb-{}\"", match[8], match[9], match[10] ) );
                }
                return( string.replace( match[0], "" ) );
            }
        },
        {
            // Example usage rgba[0,45,67;
            regexp: /(?:rgb[a]*\[([0-9]{1,3})\,([0-9]{1,3})\,([0-9]{1,3})\;)/gi,
            handle: function({ string, match })
            {
                return( $f( "{}</span>", string.replace( match[0], this.prefix( $f( "rgba( {}, {}, {} )", match[1], match[2], match[3] ) ) ) ) );
            }
        },
        {
            // Example usage hsla[1,45,67;
            regexp: /(?:hsl[a]*\[([0-9]{1,3})\,([0-9]{1,3})\%*\,([0-9]{1,3})\%*\;)/gi,
            handle: function({ string, match })
            {
                return( string.replace( match[0], this.prefix( "hsla(" + match[1] + ", " + match[2] + "%, " + match[3] + "%)" ) ) + "</span>" );
            }
        },
        {
            // Example usage hex[8490FFFF;
            regexp: /(?:hex[a]*\[([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})\;)/gi,
            handle: function({ string, match })
            {
                return( string.replace( match[0], this.prefix( "#" + match[1] ) ) + "</span>" );
            }
        }
    ]
    
};

/*
 * List of available commands.
 *
 * @values Array
 */
$Bash.prototype.commands = [{
    name: "*",
    allowed: true,
    mounted: function()
    {
        var commands = [];
        
        for( let command of this.$bash.commands )
        {
            if( command.name !== "*" )
            {
                commands.push( command.name );
            }
        }
        
        return( commands );
    }
}];

/*
 * CD
 *
 * Change the current working directory 
 */
$Bash.prototype.commands.push({
    name: "cd",
    mounted: function()
    {
        if( $Is( $Bash.prototype.router, Defined ) )
        {
            var matched = $Bash.prototype.router.resolve({ path: ( $ = $Is( $, Undefined ) ? "/" : ( $[0] !== "/" ? `/${$}` : $ ) ) }).matched;
            
            if( matched.length > 0 && matched[0].name !== "error" )
            {
                $Bash.prototype.router.push( $ ); return;
            }
            return( $Bash.prototype.message( "cd", $, "No such file or directory." ) );
        } else {
            return( $Bash.prototype.message( "cd", "router", "" ) );
        }
    }
});

/*
 * PWD
 *
 * Print Working Directory.
 */
$Bash.prototype.commands.push({
    name: "pwd",
    mounted: function()
    {
        return( location.pathname.replace( /\/(index\.html)/g, "" ) );
    }
});

/*
 * Alias
 *
 * Alias is a shortcut that references a command.
 */
$Bash.prototype.commands.push({
    name: "alias",
    allowed: true,
    mounted: function()
    {
        
        // Clone self.
        var self = this;
        
        if( self.$args !== "" )
        {
            self.$bash.argument( self.$args ).forEach( argv =>
            {
                // If the arguments match.
                if(( split = argv.split( "=" )).length === 2 )
                {
                    // If the alias name is invalid.
                    if( split[0].match( /^(?:([a-z0-9])([\S]*))$/i ) === null )
                    {
                        throw new Error( "Invalid alias name." );
                    }
                    
                    // If the alias value is not empty.
                    if( split[1] !== "" )
                    {
                        for( let i in self.$bash.aliases )
                        {
                            if( self.$bash.aliases[i].alias === split[0] )
                            {
                                // Delete old alias.
                                delete self.$bash.aliases[i];
                            }
                        }
                        
                        // Add alias to alias list.
                        self.$bash.aliases.push({
                            alias: split[0],
                            inalias: ( match = split[1].match( /^\"(.*)\"$|^\'(.*)\'$/ ) ) ? ( match[1] ? match[1] : match[2] ) : split[1]
                        });
                    }
                }
            });
        }
    }
});

/*
 * Unalias
 *
 * Remove the alias from the alias list.
 */
$Bash.prototype.commands.push({
    name: "unalias",
    allowed: true,
    mounted: function()
    {
        for( let i in this.$bash.aliases )
        {
            if( this.$bash.aliases[i].alias === this.$args )
            {
                // Delete alias.
                delete this.$bash.aliases[i];
            }
        }
    }
});

/*
 * Clear
 *
 * Clear the terminal screen.
 */
$Bash.prototype.commands.push({
    name: "clear",
    mounted: function()
    {
        $Bash.prototype.history = [];
    }
});

/*
 * Tree
 *
 * Displays the directory structure.
 */
$Bash.prototype.commands.push({
    name: "tree",
    mounted: function()
    {
        // ....
    }
});

/*
 * Echo
 *
 * Used to display line of text/string
 * that are passed as an argument.
 *
 * @option -e String
 * @option -n String
 */
$Bash.prototype.commands.push({
    name: "echo",
    opts: {
        "-e": String,
        "-n": String
    },
    methods: {
        unescape: function( string )
        {
            var regexp = [
                {
                    pattern: /\\a/g,
                    replace: "\a"
                },
                {
                    pattern: /\\b/g,
                    replace: "\b"
                },
                {
                    pattern: /\\c/g,
                    replace: "\c"
                },
                {
                    pattern: /\\e/g,
                    replace: "\e"
                },
                {
                    pattern: /\\f/g,
                    replace: "\f"
                },
                {
                    pattern: /\\n/g,
                    replace: "\n"
                },
                {
                    pattern: /\\r/g,
                    replace: "\r"
                },
                {
                    pattern: /\\t/g,
                    replace: "\t"
                },
                {
                    pattern: /\\v/g,
                    replace: "\v"
                },
                {
                    pattern: /\\x1b/g,
                    replace: "\x1b"
                }
            ];
            
            regexp.forEach( re => string = string.replace( re.pattern, re.replace ) );
            
            return( string );
        }
    },
    mounted: function({ e, n } = {} )
    {
        if( $Is( e, String ) && $Is( n, String ) )
        {
            return( "\n" );
        } else {
            if( $Is( e, String ) )
            {
                return( this.unescape( e ) );
            }
            return( n ? n : this.$args );
        }
    }
});

$Bash.prototype.commands.push({
    name: "liana",
    mounted: function()
    {
        return( "sh: liana: The command has confused the system." );
    }
});

$Bash.prototype.commands.push({
    name: "chintya",
    mounted: function()
    {
        return( "sh: chintya: The command has angered the system." );
    }
});

/*
 * Terminal Command Prompt Component.
 *
 * @values Object
 */
const $Terminal = {
    data: () => ({
        bash: null,
        model: "",
        prompt: "",
        history: []
    }),
    props: {
        command: Array
    },
    mounted: function()
    {
        this.executor();
    },
    methods: {
        
        /*
         * Execute input command.
         *
         * @params InputEvent $e
         *
         * @return Void
         */
        executor: function( e )
        {
            
            // If input key is enter.
            if( $Is( e, Undefined ) || e.key === "Enter" )
            {
                // Create new Bash instance.
                this.bash = new $Bash( this.model );
                
                // Get Bash command history.
                this.history = this.bash.history;
                
                // Get Bash prompt.
                this.prompt = this.bash.prompt;
                
                // Reset Input.
                this.model = "";
            }
        },
        
        /*
         * Terminal ONInput
         *
         * @return String
         */
        oninputs: function()
        {
            return( $f( "{} {}", this.prompt, this.model ) );
        },
        
        /*
         * Render Terminal command input and output.
         *
         * @params String $c
         *
         * @return String
         */
        onrender: function( c = "" )
        {
            
            // Line iterator start.
            var i = 0;
            
            for( let history of this.history )
            {
                c += "<div class=\"terminal-screen-group\">";
                    if( $Is( history.command, String ) )
                    {
                        c += "<div class=\"terminal-inputs\">";
                            c += "<span class=\"terminal-prompt\">";
                                c += history.prompt;
                            c += "</span> ";
                            c += "<span class=\"terminal-command\">";
                                c += this.bash.replable.inputs( history.command );
                            c += "</span>";
                        c += "</div>";
                    }
                    if( $Is( history.outputs, String ) )
                    {
                        c += "<div class=\"terminal-outputs\">";
                            c += this.bash.replable.output( history.outputs );
                        c += "</div>";
                    } else {
                        if( $Is( history.outputs, Array ) )
                        {
                            history.outputs.forEach( output =>
                            {
                                if( output !== "" )
                                {
                                    c += "<div class=\"terminal-outputs\">";
                                        c += this.bash.replable.output( output );
                                    c += "</div>";
                                } else {
                                    c += "<br/>";
                                }
                            });
                        }
                    }
                c += "</div>";
            }
            
            return( c );
        },
        
        /*
         * Set input text selection to end.
         *
         * @params InputEvent $e
         *
         * @return Void
         */
        endrange: function( e )
        {
            e.target.setSelectionRange( -1, -1 );
        }
    },
    template: ([
        `<div class="terminal">`,
            `<pre class="terminal-screen" ref="pre">`,
                `<div class="terminal-output fs-14" v-html="onrender()"></div>`,
                `<div class="terminal-form">`,
                    `<label class="terminal-prompt">`,
                        `{{ oninputs() }}`,
                    `</label>`,
                    `<input class="terminal-input" type="text" v-model="model" autocapitalize="off" @click="endrange" @keyup="endrange" @focus="endrange" @input="endrange" @change="endrange" @keypress="endrange" @keydown="executor" />`,
                `</div>`,
            `</pre>`,
        `</div>`
    ]).join( "" )
};