
/*
 * https://hxAri.github.io/
 *
 * @author hxAri
 * @create 15.02-2022
 * @update 08.06-2022
 * @github https://github.com/hxAri
 *
 * @version 4.0.5
 *
 * All source code license under MIT.
 * Please see the MIT documentation for details.
 *
 * Copyright (c) 2022 hxAri <ari160824@gmail.com>
 *
 * I -py ? Basically you don't think of me at all, I hate that.
 */
try {
    
    
    const Null = x => typeof x === "null";
    const Defined = x => typeof x !== "undefined";
    const Undefined = x => typeof x === "undefined";
    
    /*
     * Get value type or match value type.
     *
     * @params Mixed $params
     * @params Function $object
     * @params Function $handler
     * @params Function $catcher
     *
     * @return Mixed
     */
    const $Is = function( params, object, handler, catcher )
    {
        var closure = {
            handler: () => typeof handler === "function" ? handler( params ) : true,
            catcher: () => typeof catcher === "function" ? catcher( params ) : false
        };
        
        if( typeof object === "function" )
        {
            if( object.name === "Defined" || object.name === "Undefined" )
            {
                return( object( params ) ? closure.handler() : closure.catcher() );
            }
            return( $Is( params ) === object.name ? closure.handler() : closure.catcher() );
        } else {
            if( typeof object === "object" )
            {
                for( let i in object )
                {
                    if( $Is( params, object[i] ) )
                    {
                        return( closure.handler() );
                    }
                }
                return( closure.catcher() );
            }
        }
        return( Object.prototype.toString.call( params ).replace( /\[object\s*(.*?)\]/, `$1` ) );
    };
    
    /*
     * String Formater utility
     *
     * @params String $string
     * @params String ...
     * 
     * @return String
     * 
     * @version 1.0.0
     */
    const $f = function()
    {
        var i = 1;
        var args = arguments;
        
        return( args[0].replace( /{}/g, function ()
        {
            return( typeof args[i] !== "undefined" ? args[i++] : "" );
        }));
    };
    
    /*
     * ....
     *
     * @params Array, Object, String $v
     * 
     * @return String
     */
    const $v = function( v )
    {
        if( $Is( v, Array ) )
        {
            for( let i in v )
            {
                if( $Is( v[i], Function ) )
                {
                    v[i] = v[i].name;
                }
            }
            v = v.join( "|" );
        } else {
            if( $Is( v, Function ) )
            {
                v = v.name;
            }
        }
        return( v );
    };
    
    /*
     * A collection of error lists that can be used.
     *
     * @values Object.
     */
    const $E = {
        TypeError: {
            
            /*
             * When a function returns the wrong phone.
             *
             * @params String $__OBJECT__
             * @params String $name
             * @params Object $type
             * @params Mixed $given
             * 
             * @return Void
             */
            return: ( __OBJECT__, name, type, given ) => 
            {
                console.error( $f( "{}: The return value of function {} must be of type {}, {} is returned.", __OBJECT__, name, $v( type ), $Is( given ) ) );
            },
            
            /*
             * When the value of an attribute, parameter,
             * or variable does not match.
             * 
             * @params String $__OBJECT__
             * @params String $name
             * @params Mixed $value
             * @params Mixed $given
             * 
             * @return Void
             */
            value: ( __OBJECT__, name, value, given ) => 
            {
                console.error( $f( "{}: The value of {} must contain {}, {} is given.", __OBJECT__, name, $v( value ), given ) );
            }
        },
        AttributeError: {
            catch: ( __OBJECT__, name ) => 
            {
                console.error( $f( "{}: The {} attribute is undefined or may be deleted.", __OBJECT__, name ) );
            },
            value: ( __OBJECT__, name, value, given ) => 
            {
                console.error( $f( "{}: The .{} attribute must have a value of /{}/, {} is given.", __OBJECT__, name, $v( value ), given ) );
            }
        },
        CallbackError: {},
        ParameterError: {},
        ReferenceError: ( __OBJECT__, name ) => 
        {
            console.error( $f( "{}: Reference of {} undefined.", __OBJECT__, name ) );
        },
        ConnectionError: {},
        UnexpectedError: {}
    };
    
    const $JSON = {
        encode: JSON.stringify,
        decode: JSON.parse
    };
    
    /*
     * Cookie utility.
     *
     * A utility that provides various
     * APIs for managing cookies.
     *
     * @version 1.0.0
     */
    const $Cookie = function( $args )
    {
        if( $Is( $args, Object ) )
        {
            if( $Is( $args.del, Defined ) )
            {
                return( this.result = this.del( $args.del ) );
            }
            if( $Is( $args.get, Defined ) )
            {
                return( this.result = this.get( $args.get ) );
            }
            if( $Is( $args.set, Defined ) )
            {
                return( this.result = this.set( $args.set ) );
            }
        }
    };
    
    $Cookie.prototype.option = {
        path: true,
        domain: true,
        expires: true,
        samesite: true
    };
    
    /*
     * Delete one or even more than one cookies.
     *
     * @params Array, Object
     *
     * @return Object, String
     */
    $Cookie.prototype.del = function( params )
    {
        if( $Is( params, Array ) )
        {
            for( let i in params )
            {
                params[i] = this.set( params[i] );
            }
            return( params );
        }
        if( $Is( params, Object ) )
        {
            if( $Is( params.opt, Undefined ) )
            {
                params.opt = {};
            }
            params.opt.expires = -1;
            
            return( this.set( params ) );
        }
    };
    
    /*
     * Take cookies based on the name of the cookie, or take all cookies.
     *
     * @params Array, String $params
     *
     * @return Object, String
     */
    $Cookie.prototype.get = function( params )
    {
        var result = {};
        
        if( $Is( params, Array ) )
        {
            for( let i in params )
            {
                result[i] = this.set( params[i] );
            }
            return( result );
        }
        if( $Is( params, String ) )
        {
            if( $Is( result = document.cookie.split( ";" ).find( r => ( r[0] === " " ? r.slice( 1 ) : r ).startsWith( encodeURIComponent( params ) + "=" ) ), Defined ) )
            {
                result = decodeURIComponent( result.split( "=" )[1] );
            }
            return( result );
        }
        document.cookie.split( ";" ).map( part =>
        {
            result[decodeURIComponent( part.split( "=" )[0] )] = decodeURIComponent( part.split( "=" )[1] );
        });
        return( result );
    };
    
    /*
     * Set one or more than one kuuki.
     *
     * @params Array, Object
     *
     * @return Object, String
     */
    $Cookie.prototype.set = function( params )
    {
        
        var string = "";
        var result = {};
        
        if( $Is( params, Array ) )
        {
            for( let i in params )
            {
                result[i] = this.set( params[i] );
            }
            return( result );
        }
        if( $Is( params, Object ) )
        {
            if( $Is( params.key, String ) )
            {
                params.key = encodeURIComponent( params.key );//.replace( /%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent ).replace( /[\(\)]/g, escape );
            } else {
                return( $E.TypeError.value( "$Cookie::set", ".key", String, params.key ) );
            }
            if( $Is( params.val, String ) )
            {
                params.val = encodeURIComponent( params.val );//.replace( /%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent );
            } else {
                params.val = "None";
                params.opt.expires = -1;
            }
            if( $Is( params.opt, Object ) )
            {
                if( $Is( params.opt.path, String ) )
                {
                    if( params.opt.path === "" )
                    {
                        delete params.opt.path;
                    }
                }
                if( $Is( params.opt.domain, String ) )
                {
                    if( params.opt.domain === "" )
                    {
                        delete params.opt.domain;
                    }
                }
                if( $Is( params.opt.expires, Number ) )
                {
                    var dateTime = new Date();
                        dateTime.setMilliseconds( dateTime.getMilliseconds() + params.opt.expires * 864e+5 );
                    
                    params.opt.expires = dateTime.toUTCString();
                } else {
                    delete params.opt.expires;
                }
                if( $Is( params.opt.samesite, String ) )
                {
                    if( params.opt.samesite === "" )
                    {
                        delete params.opt.samesite;
                    }
                }
                for( let i in params.opt )
                {
                    if( $Is( this.option[i], Boolean ) )
                    {
                        string += "; " + i + "=" + params.opt[i];
                    }
                }
            }
            return( document.cookie = params.key + "=" + params.val + string );
        }
    };
    
    /*
     * Command line for cookie.
     *
     * @values Object
     */
    $Cookie.prototype.command = {
        name: "cookie",
        argument: [
            {
                name: "--del",
                type: String
            },
            {
                name: "--get",
                type: String
            },
            {
                name: "--set",
                type: Object
            }
        ],
        usage: [
            "",
            "",
            "Cookie \\e[09mutility",
            "",
            "A utility that provides various",
            "APIs for managing cookies.",
            "",
            "Usage\\e[01m:",
            "",
            "\\e[05m--del \\e[08m[\\e[03mString\\e[08m] \\e[00mDelete cookie.",
            "\\e[05m--get \\e[08m[\\e[03mString\\e[08m] \\e[00mGet cookie.",
            "\\e[05m--set \\e[08m[\\e[03mObject\\e[08m] \\e[00mSet cookie.",
            ""
        ],
        instance: new $Cookie(),
        callback: function({ $$del, $$get, $$set }, output = [] )
        {
            if( $Is( $$del, String ) )
            {
                output.push( $Bash.prototype.message( "--del", $$del, this.instance.del({ key: $$del }) ) );
            }
            if( $Is( $$set, Object ) )
            {
                output.push( $Bash.prototype.message( "--set", $$set.key, this.instance.set( $$set ) ) );
            }
            if( $Is( $$get, String ) )
            {
                output.push( $Bash.prototype.message( "--get", $$get, this.instance.get( $$get ) ) );
            }
            if( output.length === 0 )
            {
                output = this.usage;
            }
            return( output );
        }
    };
    
    /*
     * Theme utility
     *
     * Preference themes that support
     * detection of theme colors on the device.
     *
     * @version 1.0.8
     */
    const $Theme = function({ set })
    {
        if( $Is( set, Undefined ) )
        {
            if( window.matchMedia )
            {
                if( window.matchMedia( "(prefers-color-scheme: dark)" ).matches )
                {
                    set = "dark";
                } else {
                    set = this.get();
                }
            } else {
                set = this.get();
            }
        }
        this.set( set );
    };
    
    /* Theme alias name. */
    $Theme.prototype.name = "dGhlbWU";
    
    /* Theme colors. */
    $Theme.prototype.theme = {
        dark: {
            color: "#202521",
            token: "7a51da870ccc24c22518717d3cf56d29"
        },
        light: {
            color: "#eeeeee",
            token: "73fe8a55fee50b1e4b81af2e2446ea04"
        }
    };
    
    /* Theme contructor results. */
    $Theme.prototype.result = null;
    
    /* Theme default color. */
    $Theme.prototype.default = "light";
    
    /*
     * Get current theme token.
     *
     * @return String
     */
    $Theme.prototype.get = function()
    {
        var token = $Cookie.prototype.get( this.name );
        
        if( $Is( token, Defined ) )
        {
            if( token === this.theme.dark.token )
            {
                return( "dark" );
            }
        }
        return( "light" );
    };
    
    /*
     * Set theme color.
     *
     * @params String $color
     *
     * @return Void
     */
    $Theme.prototype.set = function( color )
    {
        var cookie = $Cookie.prototype.get( this.name );
        
        if( $Is( color, Undefined ) )
        {
            color = this.default;
        }
        if( cookie !== this.theme[color].token )
        {
            $Cookie.prototype.set({
                key: this.name,
                val: this.theme[color].token,
                opt: {
                    path: "/",
                    expires: 30
                }
            });
        }
        this.set.prototype.html( color );
        this.set.prototype.meta( color );
    };
    
    /*
     * Set theme color to HTMLHeadElement.
     * @params String $color
     *
     * @return Void
     */
    $Theme.prototype.set.prototype.html = color => document.documentElement.dataset.theme = color;
    
    /*
     * Set theme color to HTMLMetaElement.
     *
     * @params String $color
     *
     * @return Void
     */
    $Theme.prototype.set.prototype.meta = color =>
    {
        var meta = null;
        
        // Check if HTMLMetaElement has been created.
        if( $Is( meta = document.querySelector( "meta[name=\"theme-color\"]" ), Null ) )
        {
            
            // Create new HTMLMetaElement.
            meta = document.createElement( "meta" );
            
            // Set meta attribute.
            meta.setAttribute( "name", "theme-color" );
            
            // Append HTMLMetaElement to HTMLHeadElement.
            document.head.appendChild( meta );
        }
        
        // Set meta attribute content value.
        meta.setAttribute( "content", $Theme.prototype.theme[color].color );
        
    };
    
    /*
     * Command line for theme
     *
     * @values Object
     */
    $Theme.prototype.command = {
        name: "theme",
        argument: [{
            name: "$",
            type: String
        }],
        usage: [
            "",
            "",
            "Theme \\e[09mutility",
            "",
            "\\e[02mtheme \\e[03mString\\e[08m[\\e[05mdark\\e[04m|\\e[05mlight\\e[08m]",
            ""
        ],
        instance: new $Theme({}),
        callback: function({ $ })
        {
            if( $Is( $, String ) )
            {
                switch( $ )
                {
                    case "dark":
                    case "light":
                        this.instance.set( $ ); return( $Bash.prototype.message( "theme", $, "Theme was changed\\e[01m!" ) );
                    default:
                        return( "Invalid theme or unsupported theme." );
                }
            }
            return( this.usage );
        }
    };
    
    $Scroll = { left: 0 };
    
    $Requests = function()
    {
        
    };
    
    $Response = {};
    
    /*
     * Date utility.
     *
     *
     */
    const $Date = function( timestamp )
    {
        this.date = $Is( timestamp, Number ) ? new Date( timestamp * 1000 ) : new Date();
    };
    
    /*
     * Date instance.
     *
     * @values Date
     */
    $Date.prototype.date = null;
    
    /*
     * Date day with format.
     *
     * @params String $f
     *
     * @return String
     */
    $Date.prototype.day = function( f )
    {
        if( $Is( f, String ) )
        {
            switch( f )
            {
                
                // Display date as mm/dd/yy
                case "D": return( $f( "{}/{}/{}", this.month( "m" ), this.day( "d" ), this.years( "y" ) ) );
                
                // Day of week.
                case "u": return( this.date.getDay() );
                
                // Day of month.
                case "d": return( this.date.getDate() );
                
                // Day of year.
                case "j":
                    
                    // Current DateTime.
                    var n = this.date;
                    
                    // Starting DateTime by fullYear.
                    var s = new Date( n.getFullYear(), 0, 0 );
                    
                    // Calculate now with start.
                    var d = n - s;
                    
                    // Calculate one day.
                    var o = 1000 * 60 * 60 * 24;
                    
                    return( Math.floor( d / o ) );
                
                // Full weekday namw.
                case "A": return( ([ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ])[this.date.getDay()] );
                
                // Short weekday name.
                case "a": return( ([ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ])[this.date.getDay()] );
                
            }
            return( $f( "Invalid format day {}", f ) );
        }
        return( this.date.getDate() );
    };
    
    /*
     * Date month with format.
     *
     * @params String $f
     *
     * @return String
     */
    $Date.prototype.month = function( f )
    {
        if( $Is( f, String ) )
        {
            switch( f )
            {
                
                // Month.
                case "m": return( this.month() );
                
                // Long month.
                case "B": return([ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ])[this.date.getMonth()];
                
                // Short month.
                case "b": return([ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ])[this.date.getMonth()];
                
            }
            return( $f( "Invalid format month {}", f ) );
        }
        return( String( this.date.getMonth() +1 ).length === 1 ? $f( "0{}", this.date.getMonth() +1 ) : this.date.getMonth() +1 );
    };
    
    /*
     * Date year with format.
     *
     * @params String $f
     *
     * @return String
     */
    $Date.prototype.years = function( f )
    {
        if( $Is( f, String ) )
        {
            switch( f )
            {
                // Fullyear.
                case "Y": return( this.date.getFullYear() );
                
                // Shortyear.
                case "y": return( this.years() );
            }
            return( $f( "Invalid format year {}", f ) );
        }
        return( String( this.date.getFullYear() ).slice( 2 ) );
    };
    
    /*
     * Date hours with format.
     *
     * @params String $f
     *
     * @return String
     */
    $Date.prototype.hours = function( f )
    {
        if( $Is( f, String ) )
        {
            switch( f )
            {
                case "H": return( this.date.getHours() );
                case "I": return( this.date.getHours() +11 ) % 12 + 1;
            }
            return( $f( "Invalid format hours {}", f ) );
        }
        return( this.date.getHours() );
    };
    
    /*
     * Date minute without format.
     *
     * @return String
     */
    $Date.prototype.minute = function()
    {
        return( this.date.getMinutes() );
    };
    
    /*
     * Date second without format.
     *
     * @return String
     */
    $Date.prototype.second = function()
    {
        return( this.date.getSeconds() );
    };
    
    /*
     * Date format.
     *
     * @params String $string
     *
     * @return String
     */
    $Date.prototype.format = function( string )
    {
        // Self instance.
        var self = this;
        
        // Get format prototypes.
        var format = this.format.prototype;
            
            // Replace format.
            string = string.replace( /\%([a-zA-Z])/g, matched =>
            {
                switch( matched.slice( 1 ) )
                {
                    case "D": return( self.day( "D" ) );
                    case "Y": return( self.years( "Y" ) );
                    case "y": return( self.years( "y" ) );
                    case "m": return( self.month( "m" ) );
                    case "B": return( self.month( "B" ) );
                    case "b": return( self.month( "b" ) );
                    case "d": return( self.day( "d" ) );
                    case "j": return( self.day( "j" ) );
                    case "u": return( self.day( "u" ) );
                    case "A": return( self.day( "A" ) );
                    case "a": return( self.day( "a" ) );
                    case "H": return( self.hours( "H" ) );
                    case "I": return( self.hours( "I" ) );
                    case "M": return( self.minute() );
                    case "S": return( self.second() );
                }
                return( $f( "Invalid format date \\e[04m{}", matched ) );
            });
        
        return( string );
    };
    
    /*
     * Command line for Date.
     *
     * @values Object
     */
    $Date.prototype.command = {
        name: "date",
        usage: [
            "",
            "",
            "JavaScript \\e[09mDate",
            "",
            "\\e[02mdate \\e[04m-t \\e[08m[\\e[03mNumber\\e[08m] \\e[04m-f \\e[08m[\\e[03mString\\e[08m]",
            "",
            "\\e[04m-t \\e[00mTimestamp.",
            "\\e[04m-f \\e[00mFormat String.",
            "",
            "   \\e[04m%D \\e[00m- Display date as \\e[09mmm/dd/yy",
            "   \\e[04m%Y \\e[00m- Year \\e[09me.g., 2020",
            "   \\e[04m%y \\e[00m- Year \\e[09me.g., 20",
            "   \\e[04m%m \\e[00m- Month \\e[09m01-12",
            "   \\e[04m%B \\e[00m- Long month name \\e[09me.g., November",
            "   \\e[04m%b \\e[00m- Short month name \\e[09me.g., Nov",
            "   \\e[04m%d \\e[00m- Day of month \\e[09me.g., 01",
            "   \\e[04m%j \\e[00m- Day of year \\e[09m001-366",
            "   \\e[04m%u \\e[00m- Day of week \\e[09m1-7",
            "   \\e[04m%A \\e[00m- Full weekday name \\e[09me.g., Friday",
            "   \\e[04m%a \\e[00m- Short weekday name \\e[09me.g., Fri",
            "   \\e[04m%H \\e[00m- Hour \\e[09m00-23",
            "   \\e[04m%I \\e[00m- Hour \\e[09m01-12",
            "   \\e[04m%M \\e[00m- Minute \\e[09m00-59",
            "   \\e[04m%S \\e[00m- Second \\e[09m00-60",
            ""
        ],
        argument: [
            {
                name: "-t",
                type: Number
            },
            {
                name: "-f",
                type: String
            },
            {
                name: "-h",
                type: Boolean
            }
        ],
        instance: new $Date(),
        callback: function({ $t, $f, $h })
        {
            if( $Is( $t, Number ) )
            {
                this.instance = new $Date( $t );
            } else {
                this.instance = new $Date();
            }
            if( $Is( $f, String ) )
            {
                return( this.instance.format( $f ) );
            }
            if( $Is( $h, Boolean ) && $h )
            {
                return( this.usage );
            }
            return( String( this.instance.date ) ).replace( /\(|\)/g, "" );
        }
    };
    
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
                "\\e[09m * \\e[08m@version \\e[02mv4.0.5",
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
    
    ;( function( global, factory )
    {
        if( typeof exports === "object" && typeof module !== "undefined" )
        {
            factory();
        } else {
            if( typeof define === "function" && define.amd )
            {
                define( factory );
            } else {
                factory();
            }
        }
    }( this, function() {
        
        "use strict";
        
        const $Avatar = {
            name: "Avatar",
            data: function()
            {
                return({
                    EMPTY: "",
                    className: "avatar-wrapper flex flex-center"
                });
            },
            props: {
                src: {
                    type: String,
                    require: true
                },
                alt: String,
                link: String,
                route: String,
                title: String,
                inject: String
            },
            mounted: function()
            {
                if( $Is( this.inject, String ) )
                {
                    this.className += " ";
                    this.className += this.inject;
                }
            },
            template: `
                <div class="avatar">
                    <div :class="className" v-if="route">
                        <router-link :to="{ path: route }">
                            <img class="avatar-image" :src="( src ? src : EMPTY )" :alt="( alt ? alt : EMPTY )" :title="( title ? title : EMPTY )" />
                            <div class="avatar-cover"></div>
                        </router-link>
                    </div>
                    <div :class="className" v-else-if="link">
                        <a :href="link" target="_blank" rel="noopener noreferrer">
                            <img class="avatar-image" :src="( src ? src : EMPTY )" :alt="( alt ? alt : EMPTY )" :title="( title ? title : EMPTY )" />
                            <div class="avatar-cover"></div>
                        </a>
                    </div>
                </div>
            `
        };
        
        const $Sidebr = {
            name: "Sidebr",
            props: {
                pages: {
                    type: Array,
                    require: true
                },
                left: {
                    type: Number,
                    require: true
                }
            },
            data: function()
            {
                return({
                    className: ""
                });
            },
            computed: {
                loop: function()
                {
                    return({
                        template: this.self( this.pages, this.left )
                    });
                }
            },
            methods: {
                self: function( pages, left )
                {
                    var template = "<div class=\"" + ( left === 0 ? "pd-14" : "dropdown-content pd-left-" + left ) + "\">";
                    
                    for( let page in pages )
                    {
                        if( $Is( pages[page].children, Array ) )
                        {
                            template += "<div class=\"dropdown\">";
                                template += "<div class=\"li\">";
                                    template += "<i class=\"" + ( this.$route.path === pages[page].path ? pages[page].icon[1] : pages[page].icon[0] ) + " mg-right-14\"></i>" + pages[page].slot;
                                template += "</div>";
                                template += this.self( pages[page].children, left === 0 ? 28 : left + 2 );
                            template += "</div>";
                        } else {
                            if( $Is( pages[page].slot, Undefined ) )
                            {
                                continue;
                            }
                            template += "<div class=\"li\">";
                                template += "<router-link to=\"" + pages[page].path + "\">";
                                    template += "<i class=\"" + ( this.$route.path === pages[page].path ? pages[page].icon[1] : pages[page].icon[0] ) + " mg-right-14\"></i>" + pages[page].slot;
                                template += "</router-link>";
                            template += "</div>";
                        }
                    }
                    return( template + "</div>" );
                }
            },
            template: `<component v-bind:is="loop"></component>`
        };
        
        // Define some routes.
        // Each route should map to a component.
        const $Routes = [
            {
                path: "/",
                icon: [
                    "bx bx-home",
                    "bx bxs-home"
                ],
                slot: "Home",
                component: {
                    template: `
                        <div class="home">
                            <div class="section">
                                <div class="content">
                                    X
                                </div>
                            </div>
                            <div class="section">
                                <div class="content">
                                    X
                                </div>
                            </div>
                        </div>
                    `
                }
            },
            {
                path: "/about",
                icon: [
                    "bx bx-user",
                    "bx bxs-user"
                ],
                slot: "Abouts",
                component: {}
            },
            {
                path: "/contact",
                icon: [
                    "bx bx-phone",
                    "bx bxs-phone"
                ],
                slot: "Contact",
                component: {}
            },
            {
                path: "/projects",
                icon: [
                    "bx bx-code",
                    "bx bx-code-alt"
                ],
                slot: "Projects",
                children: [
                    {
                        path: "yume",
                        icon: [],
                        slot: "Yume",
                        component: {}
                    }
                ],
                component: {}
            },
            {
                path: "/terminal",
                icon: [
                    "bx bx-terminal",
                    "bx bxs-terminal"
                ],
                slot: "Terminal",
                component: $Bash.prototype.template
            },
            {
                path: "/privacy",
                icon: [
                    "bx bx-lock-open",
                    "bx bxs-lock-open"
                ],
                slot: "Privacy",
                component: {}
            },
            {
                path: "/sitemap",
                icon: [
                    "bx bx-link",
                    "bx bx-link-alt"
                ],
                slot: "Sitemap",
                component: {}
            },
            {
                name: "error",
                path: "/:e(.*)*",
                icon: [],
                component: {},
                props: route => ({
                    command: [{
                        output: [ "", `cd: ${route.path}: No such file or directory.`, "" ]
                    }]
                })
            }
        ];
        
        // The router instance.
        const $Router = $Bash.prototype.router = VueRouter.createRouter({
            
            // Router history mode.
            history: VueRouter.createWebHistory(),
            
            routes: $Routes
            
        });
        
        // The application instance.
        const 
            $Object = Vue.createApp({
                data: function()
                {
                    return({
                        pages: $Routes,
                    });
                },
                mounted: function() {},
                methods: {
                    match: function()
                    {
                        return( this.$route.path.match( /^\/projects\/[a-z\_\-]+/gi ) ? false : true );
                    }
                },
                template: `
                    <div class="template">
                        <div class="header">
                            <div class="header-banner flex pd-14">
                                <div class="avatar">
                                    <div class="avatar-wrapper flex flex-center rd-circle">
                                        <router-link to="/">
                                            <div class="avatar-background"></div>
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="breakr"></div>
                        <Banner />
                        <Parent v-if="match()" />
                        <Burogu v-else />
                        <Footer />
                    </div>
                `,
                components: {
                    Banner: {
                        template: `
                            <div class="banner">
                                <div class="album"></div>
                                <div class="cover"></div>
                            </div>
                        `
                    },
                    Burogu: {
                        template: ""
                    },
                    Footer: {
                        name: "Footer",
                        data: function()
                        {
                            return({
                                pages: [
                                    { path: "/", slot: "Home" },
                                    { path: "/abouts", slot: "Abouts" },
                                    { path: "/contact", slot: "Contact" },
                                    { path: "/privacy", slot: "Privacy" },
                                    { path: "/sitemap", slot: "Sitemap" }
                                ],
                                socmed: [
                                    { link: "https://instagram.com/hx.ari", icon: "bx bxl-instagram" },
                                    { link: "https://facebook.com/hx.are", icon: "bx bxl-facebook" },
                                    { link: "https://twitter.com/hxxAre", icon: "bx bxl-twitter" },
                                    { link: "https://github.com/hxAri", icon: "bx bxl-github" }
                                ]
                            });
                        },
                        template: `
                            <div class="footer flex flex-center">
                                <div class="footer-wrapper">
                                    <div class="footer-content dp-flex">
                                        <div class="footer-group pd-14">
                                            <h5 class="mg-bottom-8">Pages</h5>
                                            <p class="fc-1m">Some important pages.</p>
                                            <li class="li dp-inline-block mg-right-10" v-for="i in pages">
                                                <router-link :to="{ path: i.path }" class="fs-14">{{ i.slot }}</router-link>
                                            </li>
                                        </div>
                                        <div class="footer-group pd-14">
                                            <h5 class="mg-bottom-8">Follow Me</h5>
                                            <p class="">Stay connected with me.</p>
                                            <li class="li dp-inline-block mg-right-10" v-for="i in socmed">
                                                <a :href="i.link" target="_blank" rel="noopener noreferrer">
                                                    <i :class="i.icon"></i>
                                                </a>
                                            </li>
                                        </div>
                                    </div>
                                    <div class="footer-single">
                                        <p class="">&copy hxAri 2022</p>
                                    </div>
                                </div>
                            </div>
                        `
                    },
                    Parent: {
                        components: {
                            Tabs: {
                                computed: {
                                    loop: function()
                                    {
                                        return({
                                            mounted: function()
                                            {
                                                this.$refs.tab.scrollLeft = $Scroll.left;
                                            },
                                            methods: {
                                                scroll: e =>
                                                {
                                                    $Scroll.left = e.target.scrollLeft;
                                                }
                                            },
                                            template: "<div class=\"tabs flex flex-center\" ref=\"tab\" @scroll=\"scroll\">" + this.self() + "</div>"
                                        });
                                    }
                                },
                                mounted: function() {},
                                methods: {
                                    self: function( div = "" )
                                    {
                                        for( let i in $Routes )
                                        {
                                            var route = $Routes[i];
                                            
                                            if( $Is( route.slot, Defined ) )
                                            {
                                                div += "<router-link to=\"" + route.path + "\">";
                                                    div += "<div class=\"tab single flex flex-center fb-45 fc-0m\">";
                                                        div += "<i class=\"" + ( this.$route.path === route.path ? route.icon[1] : route.icon[0] ) + " mg-right-14\"></i>";
                                                        div += route.slot;
                                                    div += "</div>";
                                                div += "</router-link>";
                                            }
                                        }
                                        return( div );
                                    }
                                },
                                template: `<component v-bind:is="loop"></component>`
                            }
                        },
                        template: `
                            <div class="parent">
                                <div class="sidebr">
                                    <div class="wrapper">
                                        <div class="picture flex flex-center rd-circle">
                                            <div class="border flex flex-center rd-circle">
                                                <div class="spaces flex flex-center rd-circle">
                                                    <div class="avatar">
                                                        <div class="avatar-wrapper flex flex-center rd-circle">
                                                            <div class="avatar-background"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="github">
                                            <p class="fullname fc-sh-00m ff-latto fs-24 fb-55 fc-1m mg-0">Ari | Backdev</p>
                                            <p class="username fc-sh-00m ff-latto fs-20 fb-35">hxAri</p>
                                        </div>
                                    </div>
                                    <div class="abouts">
                                        <hr class="mg-bottom-14" />
                                        <div class="group">
                                            <div class="single flex mg-bottom-8">
                                                <i class="bx bxs-map mg-right-8"></i> Indonesian
                                            </div>
                                            <div class="single flex mg-bottom-8">
                                                <i class="bx bxs-phone mg-right-8"></i> +62 8583 9211 030
                                            </div>
                                            <div class="single flex mg-bottom-8">
                                                <i class="bx bx-mail-send mg-right-8"></i> ari160824@gmail.com 
                                            </div>
                                        </div>
                                        <hr class="mg-top-14" />
                                        <button class="button resume fb-45 flex flex-center mg-top-14 pd-10 rd-square">
                                            View Resume
                                        </button>
                                    </div>
                                </div>
                                <div class="viewer">
                                    <Tabs />
                                    <router-view :style="{ marginTop: '-2px' }" />
                                </div>
                            </div>
                        `
                    }
                }
            });
            
            // Make sure to "use" the router instance.
            $Object.use( $Router );
            
            // Mount element.
            $Object.mount( "#root" );
        
    }));
    
} catch( e ) {
    
    console.error( e );
}
