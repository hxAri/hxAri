/*
 * Bash utility.
 *
 * Instance virtual command line interface.
 *
 * @version 1.0.9
 */
const $Bash = function( input )
{
    if( $Is( input, String ) && this.spaces( input ) !== "" )
    {
        input = this.spaces( input );
        
        if( input === "*" )
        {
            var commands = [];
            
            this.commands.forEach( command => commands.push( $f( "\\e[02m{}", command.name === "liana" ? "リアナリー" : ( command.name === "chintya" ? "チンティア" : command.name ) ) ) );
            
            this.result.push({
                input: input,
                output: $f( "\n{}\n\n", commands.join( "\\e[08m,\n" ) )
            }); 
        } else {
            input.split( "&&" ).forEach( input => this.result.push({ input: this.spaces( input ), output: this.execute( this.spaces( input ) ) }) );
        }
    }
};

/* Bash Command line prompt. */
$Bash.prototype.prompt = "\\e[05mhxari\\e[04m@github.io\\e[01m:\\e[08m~\\e[00m$";

/* Bash Command line results. */
$Bash.prototype.result = [
    {
        input: false,
        output: [
            "\\e[00m             ::                                \\e[00m",
            "\\e[00m            ~JJ^... :~^                        \\e[00m",
            "\\e[00m      .^::~7JJJJJJ??JJJ^                       \\e[00m",
            "\\e[00m      7JJJYYJ?77??JJJJJJ?!!??:                 \\e[00m",
            "\\e[00m      :JJJ?^.     .^!?JJJJJJ?.                 \\e[00m",
            "\\e[00m    :^?JJJ.    ~7^   .~?JJJJJ?: ..             \\e[00m",
            "\\e[00m   .?JJJJJ^  .!JY7     .?JJJJ~::^::.           \\e[00m",
            "\\e[00m    ..^?JJJ??JJJJ:      :JJJ7.:~!~::.          \\e[00m",
            "\\e[00m       :JJJ?J?7JJ~       7JJ?^:::::.           \\e[00m",
            "\\e[00m       .!7^..  :^.       ?JJ?!!~~^             \\e[00m",
            "\\e[00m                        :JJJ7!!!!!             \\e[00m",
            "\\e[00m                       .?JJ?!!!~~~.            \\e[00m",
            "\\e[00m                      ^?JJ?!!^:::::.           \\e[00m",
            "\\e[00m                    :7JJJ7!!~.:~!~::.          \\e[00m",
            "\\e[00m                  .!JJJJ7!!!!^::^::.           \\e[00m",
            "\\e[00m                .~JJJJJ7!!!!!!!^ .             \\e[00m",
            "\\e[00m               ^?JJJJ?!!!!!!!!^                \\e[00m",
            "\\e[00m             :7JJJJJ?!!!~^^:^^                 \\e[00m",
            "\\e[00m           .!JJJJJJ7!!!^::~~::.                \\e[00m",
            "\\e[00m          ~?JJJJJJ7!!!!^.^!!^:.                \\e[00m",
            "\\e[00m        ^?JJJJJJJ7!!!!!!^:::..                 \\e[00m",
            "\\e[00m      :7JJJJJJJ?!!!!!!!!^                      \\e[00m",
            "\\e[00m      7JJJJJJJ?!!!!!!!~:                       \\e[00m",
        ]
    }
];

/*
 * Remove all whitespace at the beginning or end of the string.
 *
 * @params String $input
 *
 * @return String
 */
$Bash.prototype.spaces = function( input )
{
    return( ( input = ( input[0] === " " ? input = input.slice( 1 ) : ( input[( input.length -1 )] === " " ? input = input.slice( 0, -1 ) : input ) ) )[0] === " " || input[( input.length -1 )] === " " ? this.spaces( input ) : input );
};

/*
 * Execute the given command.
 *
 * @params String $input
 *
 * @return Mixed
 */
$Bash.prototype.execute = function( input )
{
    var name; name = $Is( name = input.split( " " ), Array ) ? name[0] : name;
    
    for( let command of this.commands )
    {
        if( command.name === name )
        {
            var parameter = {};
            
            if( $Is( parameter = this.parameter( input, command ), Object ) )
            {
                return( command.callback( parameter ) );
            }
            return( parameter );
        }
    }
    return( this.message( "sh", name, "Command error not found." ) );
};

/*
 * Output template.
 *
 * @params String $command
 * @params String $value
 * @params String $message
 *
 */
$Bash.prototype.message = ( command, value, message ) => $f( "\\e[08m{}\\e[01m: \\e[00m{}\\e[01m: \\e[09m{}", command, value, message );

/*
 * Replace the icon code on the string.
 *
 * @params String $string
 *
 * @return String
 */
$Bash.prototype.boxicons = function( string )
{
    var regexp = new RegExp( /\\i\[([a-z0-9-]+)\;/g );
    var result = null;
    
    while( result = regexp.exec( string ) )
    {
        string = string.replace( result[0], `<i class="bx ${result[1]}"></i>` );
    }
    return( string );
};

/*
 * Replace the color code on the string.
 *
 * @params String $string
 *
 * @return String
 */
$Bash.prototype.colorable = function( string )
{
    
    var regexp = new RegExp( /\\e\[([0-9]+)m/g );
    var result;
    
    while( result = regexp.exec( string ) )
    {
        string = string.replace( result[0], `<span class="fc-sh-${result[1]}m">` );
        string += "</span>";
    }
    return( this.boxicons( string ) );
};

/*
 * Build parameters for callback function.
 *
 * @params String $input
 * @params Object $command
 *
 * @return Object
 */
$Bash.prototype.parameter = function( input, command )
{
    var results = {};
    var println = this.println;
    
    if( $Is( command.argument, Array ) )
    {
        try {
            
            for( let argument of command.argument )
            {
                if( $Is( argument.type, Function ) )
                {
                    argument.type = argument.type.name;
                }
                if( $Is( this.arguments[argument.type], Object ) )
                {
                    var regexp = new RegExp( this.arguments[argument.type].pattern.replace( /\:\$/g, argument.name ) );
                    var result = null;
                    
                    if( result = input.match( regexp ) )
                    {
                        input = input.replace( result[0], m =>
                        {
                            results[( argument.name.replace( /\-/g, "$" ) )] = this.arguments[argument.type].transform( result[1] ? result[1] : result[2] ); return "";
                        });
                    } else {
                        if( argument.require )
                        {
                            return( this.message( command.name, argument.name, "Argument required." ) );
                        }
                    }
                } else {
                    return( this.message( command.name, argument.name, "Invalid argument type." ) );
                }
            }
            
            /*
             * Unamed argument.
             *
             * Note that this argument will take the entire
             * Contents of the rest of the replaced input arguments.
             */
            var $ = this.spaces( input.replace( new RegExp( "^" + command.name ), "" ) );
            
            for( let argument of command.argument )
            {
                if( argument.name === "$" )
                {
                    if( $ !== "" )
                    {
                        if( $Is( argument.type, Function ) )
                        {
                            argument.type = argument.type.name;
                        }
                        if( $Is( this.arguments[argument.type], Object ) )
                        {
                            results.$ = this.arguments[argument.type].transform( $ );
                        } else {
                            return( this.message( command.name, argument.name, "Invalid argument type." ) );
                        }
                    } else {
                        if( argument.require )
                        {
                            return( this.message( command.name, argument.name, "Argument required." ) );
                        }
                    }
                }
                continue;
            }
            
        } catch( e ) {
            return( this.message( command.name, "argument", e.message ) );
        }
    }
    return( results );
};

/*
 * Various argument types supported.
 *
 * @values Object
 */
$Bash.prototype.arguments = {
    Boolean: {
        pattern: ":$ (false|true)",
        transform: argument => argument === "true" ? true : false
    },
    Object: {
        pattern: ":$ (.*)",
        transform: argument => $JSON.decode( argument )
    },
    String: {
        pattern: ":$ ([a-zA-Z0-9-_]+)|:$ \"(.*)\"",
        transform: argument => argument
    },
    Number: {
        pattern: ":$ ([0-9]+)",
        transform: argument => parseInt( argument )
    },
    Array: {
        pattern: ":$ (.*)",
        transform: argumeny => $JSON.decode( argument )
    }
};

/*
 * List of available commands.
 *
 * @values Array
 */
$Bash.prototype.commands = [
    {
        name: "cd",
        argument: [
            {
                name: "$",
                type: String,
                require: false
            }
        ],
        callback: function({ $ })
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
    },
    {
        name: "pwd",
        argument: [],
        callback: function()
        {
            return( location.pathname.replace( /\/(index\.html)/g, "" ) );
        }
    },
    {
        name: "tree",
        data: {
            root: {
                about: {},
                contact: {},
                projects: {
                    yume: {
                        start: {},
                        install: {}
                    }
                },
                privacy: {},
                sitemap: {}
            }
        },
        argument: [{
            name: "$",
            type: Object
        }],
        callback: function({ $ })
        {
            return( $JSON.encode( $, null, 4 ) );
        }
    },
    {
        name: "echo",
        argument: [{
            name: "$",
            type: String
        }],
        callback: function({ $ })
        {
            return( $ );
        }
    },
    $Theme.prototype.command,
    $Date.prototype.command,
    $Cookie.prototype.command,
    {
        name: "comment",
        argument: [],
        callback: () => ([
            "\\e[09m ",
            "\\e[09m/*",
            "\\e[09m * \\e[00mhttps://\\e[05mhxAri\\e[00m.github.io/",
            "\\e[09m *",
            "\\e[09m * \\e[08m@author \\e[00mhxAri",
            "\\e[09m * \\e[08m@create \\e[00m15.02-2022",
            "\\e[09m * \\e[08m@update \\e[00m19.05-2022",
            "\\e[09m * \\e[08m@github \\e[00mhttps://github.com/\\e[05mhxAri",
            "\\e[09m *",
            "\\e[09m * \\e[08m@version \\e[02mv4.0.2",
            "\\e[09m *",
            "\\e[09m * All source code license under \\e[00mMIT\\e[08m.",
            "\\e[09m * Please see the MIT documentation for details\\e[08m.",
            "\\e[09m *",
            $f( "\\e[09m * Copyright &copy \\e[01m{} \\e[00mhxAri \\e[04m&lt\\e[00mari160824@gmail.com\\e[04m&gt", new Date().getFullYear() ),
            "\\e[09m */",
            "\\e[09m "
        ])
    },
    {
        name: "clear",
        argument: [],
        callback: function()
        {
            $Bash.prototype.result = [];
        }
    },
    {
        name: "liana",
        argument: [],
        callback: function()
        {
            return( $Bash.prototype.message( "sh", "liana", "The command has confused the system." ) );
        }
    },
    {
        name: "chintya",
        argument: [],
        callback: function()
        {
            return( $Bash.prototype.message( "sh", "chintya", "The command has angered the system." ) );
        }
    }
];

$Bash.prototype.template = {
    data: () => ({
        model: null,
        prompt: $Bash.prototype.prompt,
        display: $Bash.prototype.result,
        welcome: [{
            output: [
                "",
                "Please type \\e[09m*\\e[00m to see the entire",
                "list of existing commands.",
                /*
                "Welcome to \\e[09mhxAri\\e[01m!",
                "",
                "A Junior Backend Web Developer\\e[08m.",
                "Just a Programmer from Indonesian 😉",
                "",
                "Hello\\e[08m,\\e[00m I\\e[03m'\\e[00mm \\e[05mAri Setiawan\\e[08m, \\e[00mI\\e[03m'\\e[00mm a Programmer from Indonesian\\e[08m.",
                "I\\e[03m'\\e[00mm currently undergoing a Software Engineering vocational",
                "High school\\e[08m.\\e[00m I usually work on my own projects but I can",
                "Also work with a team\\e[08m.\\e[00m And I\\e[03m'\\e[00mm also a quiet person 😐",
                "",
                "\\i[bx-calendar; 16st August 2004",
                "\\i[bxl-whatsapp; +62 8583 9211 030",
                "\\i[bx-send; ari160824@gmail.com",
                "\\i[bxs-map; Indonesian\\e[08m, \\e[00mLampung\\e[08m, \\e[00mPringsewu",
                */""
            ]
        }]
    }),
    props: {
        command: Array
    },
    mounted: function()
    {
        var self = this;
        
        if( $Is( $Bash.prototype.router, Undefined ) )
        {
            $Bash.prototype.router = self.$router;
        }
        if( $Is( self.command, Array ) )
        {
            self.command.forEach( io =>
                self.display.push({
                    input: io.input,
                    output: io.output
                })
            );
        } else {
            if( self.$route.path === "/terminal" )
            {
                self.welcome.forEach( io => self.display.push( io ) );
            }
        }
    },
    methods: {
        submit: function( e )
        {
            e.preventDefault();
            
            this.display = new $Bash( this.model ).result;
            this.model = null;
        },
        replace: function( input )
        {
            const syntax = [
                {
                    pattern: /(\\"|\\')/g,
                    replace: m => m === "\"" ? "\\&#34" : "\\&#39"
                },
                {
                    pattern: /\"(.*?)\"|\'(.*?)\'/g,
                    replace: "<span class=\"fc-sh-03m\">$</span>"
                },
                {
                    pattern: /(\:|\;)/g,
                    replace: "<span class=\"fc-sh-04m\">$</span>"
                },
                {
                    pattern: /(\,|\.)/g,
                    replace: "<span class=\"fc-sh-01m\">$</span>"
                },
                {
                    pattern: /(\{|\}|\[|\]|\(|\)|\\[r|t|n|e])/g,
                    replace: "<span class=\"fc-sh-08m\">$</span>"
                },
                {
                    pattern: /^([a-zA-Z0-9\-]+)/,
                    replace: "<span class=\"fc-sh-02m\">$</span>"
                },
                {
                    pattern: /\s([\-]+)([a-zA-Z0-9]+)/g,
                    replace: "<span class=\"fc-sh-05m\">$</span>"
                }
            ];
            
            syntax.forEach( self =>
            {
                if( $Is( self.replace, Function ) )
                {
                    input = input.replace( self.pattern, self.replace );
                } else {
                    input = input.replace( self.pattern, m => self.replace.replace( /\$/, m ) );
                }
            });
            
            return( input );
        },
        compile: function()
        {
            var compile = "";
            
            for( let command of this.display )
            {
                compile += "<div class=\"terminal-group\">";
                    if( $Is( command.input, String ) )
                    {
                        compile += "<label class=\"terminal-prompt mg-right-8\">";
                            compile += $Bash.prototype.colorable( this.prompt.replace( /\<|\>/, m => m === "<" ? "&lt" : "&gt" ) );
                        compile += "</label>";
                        compile += "<label class=\"terminal-output\">";
                            compile += this.replace( command.input.replace( /\<|\>/, m => m === "<" ? "&lt" : "&gt" ) );
                        compile += "</label>";
                    }
                    if( $Is( command.output, Array ) )
                    {
                        command.output.forEach( output =>
                        {
                            if( output !== "" )
                            {
                                compile += "<div class=\"terminal-output\">";
                                    compile += $Bash.prototype.colorable( output.replace( /\<|\>/, m => m === "<" ? "&lt" : "&gt" ) );
                                compile += "</div>";
                            } else {
                                compile += "</br>";
                            }
                        });
                    } else {
                        compile += "<div class=\"terminal-output\">";
                            compile += command.output ? $Bash.prototype.colorable( command.output.replace( /\<|\>/, m => m === "<" ? "&lt" : "&gt" ) ) : "";
                        compile += "</div>";
                    }
                compile += "</div>";
            }
            
            return( compile );
        },
        cprompt: function()
        {
            return( $Bash.prototype.colorable( this.prompt.replace( /\<|\>/, m => m === "<" ? "&lt" : "&gt" ) ) );
        }
    },
    template: `
        <div class="bg-01m pd-14 fm-inconsolata">
            <pre class="terminal" ref="terminal"><div class="terminal-display" v-html="compile()"></div><form class="form" @submit="submit" ref="submit"><div class="terminal-form"><label class="terminal-prompt mg-0 fs-16" v-html="cprompt()"></label><input class="terminal-input mg-left-8 fm-inconsolata fs-16" type="text" v-model="model" placeholder="..." autocapitalize="none" /></div></form></pre>
        </div>
    `
};