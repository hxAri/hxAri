/*
 * https://hxAri.github.io/
 *
 * @author hxAri
 * @create 15.02-2022
 * @update -
 * @github https://github.com/hxAri/{hxAri}
 *
 * All source code license under MIT.
 * Please see the MIT documentation for details.
 *
 * Copyright (c) 2022 hxAri <ari160824@gmail.com>
 *
 * I -py ? Basically you don't think of me at all, I hate that.
 */

(() =>
{    
        
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
     * String Formater    
     *    
     * @params String $string    
     * @params String ...    
     *     
     * @return String    
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
        
    const $T = {};    
        
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
    };/*    
     * Cookie utility.    
     *    
     * @author hxAri    
     * @create -    
     * @update -    
     * @source https://github.com/hxAri/{hxAri}    
     *    
     * A utility that provides various APIs for managing cookies.    
     *    
     * All source code is under the MIT license, please see the original for more details.    
     *    
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
        
    // Cookie default option.    
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
    };/*    
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
            set = this.get();    
        }    
        this.set( set );    
    };    
        
    /*    
     * Theme alias name.    
     *    
     * @values String    
     */    
    $Theme.prototype.name = "dGhlbWU";    
        
    /*    
     * Theme colors.    
     *    
     * @values Object    
     */    
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
        
    /*    
     * Theme contructor results.    
     *    
     * @value Mixed    
     */    
    $Theme.prototype.result = null;    
        
    /*    
     * Theme default color.    
     *    
     * @values String    
     */    
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
        } else {    
            if( window.matchMedia )    
            {    
                if( window.matchMedia( "(prefers-color-scheme: dark)" ).matches )    
                {    
                    return( "dark" );    
                }    
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
     *    
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
    };const $Scroll = { left: 0 };const $Github = async function( url )    
    {    
        return( new Promise( async function( resolve, reject )    
        {    
            // The constructor initializes.    
            var xhr = new XMLHttpRequest();    
                    
                // Initializes a request.    
                xhr.open( "GET", $f( "https://api.github.com/users/{}", url ) );    
                    
                // Sends the request.    
                xhr.send();    
                    
                // Fired when an XMLHttpRequest transaction completes successfully.    
                xhr.onload = evt => resolve( evt, xhr );    
                    
                // Fired when the request encountered an error.    
                xhr.onerror = evt => reject( evt, xhr );    
        }));    
    };/*    
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
    };/*    
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
    };const $Request = async function( method, url, options = {} )    
    {    
        return( new Promise( await function( resolve, reject )    
        {    
            // The constructor initializes.    
            var xhr = new XMLHttpRequest();    
                
            // Initializes a request.    
            xhr.open( method, url );    
                
            if( $Is( options.headers, Object ) )    
            {    
                for( let header in options.headers )    
                {    
                    // Sets the value of an HTTP request header.    
                    xhr.setRequestHeader( header, options.headers[header] );    
                }    
            }    
                
            if( $Is( options.data, Object ) )    
            {    
                // Data pairs.    
                var data = [];    
                    
                for( let key in options.data )    
                {    
                    // Encode URI Commponent.    
                    data.push( encodeURIComponent( key ) + "=" + encodeURIComponent( options.data[key] ) );    
                }    
                    
                // Sends the request with data.    
                xhr.send( data.join( "&" ) );    
            } else {    
                    
                // Sends the request without data.    
                xhr.send();    
            }    
                
            if( $Is( options.events, Object ) )    
            {    
                for( let i in options.events )    
                {    
                    // Allow set events except loaded & error.    
                    if( i !== "loaded" && i !== "error" )    
                    {    
                        // Sets up a function that will be called whenever    
                        // The specified event is delivered to the target.    
                        xhr.addEventListener( i, ( e ) =>     
                        {    
                            var handler = options.events[i];    
                                    
                                // Call handler function.    
                                handler( e, xhr );    
                        });    
                    }    
                }    
            }    
                
            // Fired when an XMLHttpRequest transaction completes successfully.    
            xhr.onload = evt => resolve( xhr );    
                
            // Fired when the request encountered an error.    
            xhr.onerror = evt => reject( xhr );    
                
        }));    
    };    
    $T.create = {    
        index: `    
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
        banner: `    
            <div class="banner">    
                <div class="album"></div>    
                <div class="cover"></div>    
            </div>    
        `,    
        footer: `    
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
        `,    
        parent: `    
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
                            <p class="fullname fc-sh-00m ff-latto fs-24 fb-50 fc-1m mg-0">Ari | Backdev</p>    
                            <p class="username fc-sh-00m ff-latto fs-20 fb-35">hxAri</p>    
                        </div>    
                    </div>    
                    <div class="abouts">    
                        <button class="button resume fb-45 flex flex-center mg-bottom-20 pd-10 rd-square">    
                            View Resume    
                        </button>    
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
                    </div>    
                </div>    
                <div class="viewer">    
                    <Tabs />    
                    <router-view :style="{ marginTop: '-4px' }" />    
                </div>    
            </div>    
        `    
    };$T.widget = {    
        avatar: `    
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
    };const $Sidebr = {    
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
    };const $Alerts = function( i )    
    {    
        if( $Is( i, Boolean ) )    
        {    
            this.data = [];    
        } else {    
            this.data = i;    
        }    
        return( this );    
    };    
        
    $Alerts.prototype.data = [    
        {    
            type: "info",    
            message: "Alert info type."    
        },    
        {    
            type: "error",    
            message: "Alert error type."    
        },    
        {    
            type: "success",    
            message: "Alert success type."    
        },    
        {    
            type: "warning",    
            message: "Alert warning type."    
        }    
    ];    
        
    const $Alert = {    
        data: () => ({    
            alerts: []    
        }),    
        props: {    
            errors: {    
                type: Array,    
                require: true    
            }    
        },    
        mounted: function()    
        {    
            this.alerts = $Alerts( this.errors ).data;    
        },    
        methods: {    
            close: function( i )    
            {    
                    
            }    
        },    
        template: `    
            <div class="alerts">    
                {{ alerts }}    
            </div>    
        `    
    };const $Abouts = {    
        data: () => ({    
        }),    
        mounted: function()    
        {    
            // ....    
        },    
        methods: {},    
        template: `    
            <div class="about">    
                <div class="bantle flex flex-center">    
                    <h1 class="title">About</h1>    
                </div>    
                <div class="section">    
                    <div class="content">    
                        <p class="paragraph">    
                            Hello, introduce my name is <h2 class="title mg-top-14 mg-bottom-14">Ari Setiawan</h2>    
                            I am a Junior Backend Programmer from Indonesia who happened to pass by.    
                            I am currently undergoing a Software Engineering Vocational High School.    
                            I prefer to work alone but I can also work in a team.    
                        </p>    
                    </div>    
                </div>    
            </div>    
        `    
    };    
        
    const $Contact = {    
        data: () => ({    
            info: [    
                {    
                    icon: "bx bxs-map",    
                    info: "Indonesian, Lampung, Pringsewu."    
                },    
                {    
                    icon: "bx bxs-phone",    
                    info: "+62 8583 9211 030"    
                },    
                {    
                    icon: "bx bx-mail-send",    
                    info: "ari160824@gmail.com"    
                }    
            ],    
            target: "https://formspree.io/f/xoqrezbv",    
            ivalid: "dp-block form-label",    
            alerts: [],    
            models: {    
                subject: {    
                    name: "subject",    
                    label: "Email Subject",    
                    value: ""    
                },    
                email: {    
                    name: "email",    
                    label: "Email Address",    
                    regex: /^((([^<>('")[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))$/g,    
                    value: ""    
                },    
                message: {    
                    type: "textarea",    
                    name: "sender",    
                    label: "Email Message",    
                    value: ""    
                }    
            }    
        }),    
        methods: {    
            icon: function( i )    
            {    
                return( $f( "{} fs-20", i ) );    
            },    
            freset: function()    
            {    
                for( let i in this.models )    
                {    
                    this.models[i].value = "";    
                }    
            },    
            submit: function( e )    
            {    
                    
                // Reset alerts    
                this.alerts = [];    
                    
                // Disable or cancel event.    
                e.preventDefault();    
                    
                for( let i in this.models )    
                {    
                    // Check whether the input value is empty or not.    
                    if( this.models[i].value.replace( /\s/g, "" ) === "" )    
                    {    
                        this.alerts.push({    
                            type: "warning",    
                            message: $f( "The {} form cannot be empty.", this.models[i].label )    
                        });    
                        return;    
                    }    
                }    
                    
                // If email have pattern.    
                if( $Is( this.models.email.regex, RegExp ) )    
                {    
                    // Use regular expressions to check if the email address is valid.    
                    if( this.models.email.value.match( this.models.email.regex ) === null )    
                    {    
                        this.alerts.push({    
                            type: "warning",    
                            message: $f( "Invalid {}!", this.models.email.label )    
                        });    
                        return;    
                    }    
                }    
                    
                // Send request handler.    
                this.onpost();    
                    
            },    
            onpost: async function()    
            {    
                let self = this;    
                let options = {    
                    data: {    
                        email: self.models.email.value,    
                        subject: self.models.subject.value,    
                        message: self.models.message.value    
                    },    
                    events: {},    
                    headers: {    
                        "Accept": "application/json",    
                        "Content-Type": "application/x-www-form-urlencoded"    
                    }    
                };    
                let request = await $Request( "POST", self.target, options )    
                    .then( e =>    
                    {    
                        if( e.status === 200 )    
                        {    
                            self.alerts.push({ type: "success", message: "The request has been sent successfully." });    
                        } else {    
                            self.alerts.push({ type: "warning", message: $f( "Warning status code {}: {}", e.status, e.statusText ) });    
                        }    
                        self.freset();    
                    })    
                    .catch( e =>    
                    {    
                        self.alerts.push({ type: "error", message: "Failed to send request." });    
                    });    
            }    
        },    
        components: {    
            Alert: $Alert    
        },    
        template: `    
            <div class="contact bg-02m">    
                <div class="bantle flex flex-center">    
                    <h1 class="title">Contact</h1>    
                </div>    
                <div class="wrapper flex flex-center">    
                    <div class="content flex flex-center">    
                        <div class="section">    
                            <div class="single flex mg-bottom-32 mg-lc-bottom" v-for="( map, i ) in info">    
                                <div class="icon mg-right-20 flex flex-center">    
                                    <i :class="icon( map.icon )"></i>    
                                </div>    
                                <div class="info fb-45">    
                                    {{ map.info }}    
                                </div>    
                            </div>    
                        </div>    
                    </div>    
                    <div class="content flex flex-center">    
                        <div class="section">    
                            <div class="center flex flex-center mg-bottom-32">    
                                <div class="avatar">    
                                    <div class="avatar-wrapper flex flex-center rd-circle bg-02m">    
                                        <i class="bx bx-mail-send fc-sh-00m fs-22"></i>    
                                    </div>    
                                </div>    
                            </div>    
                            <form class="form pd-top-22" @submit="submit">    
                                <div class="form-group mg-bottom-20 mg-lc-bottom">    
                                    <label class="dp-block form-label">Email Subject</label>    
                                    <input class="dp-block form-input" type="text" v-model="this.models.subject.value">    
                                </div>    
                                <div class="form-group mg-bottom-20 mg-lc-bottom">    
                                    <label class="dp-block form-label">Email Address</label>    
                                    <input class="dp-block form-input" type="email" v-model="this.models.email.value">    
                                </div>    
                                <div class="form-group mg-bottom-20 mg-lc-bottom">    
                                    <label class="dp-block form-label">Email Message</label>    
                                    <textarea class="dp-block form-input form-texta" v-model="this.models.message.value"></textarea>    
                                </div>    
                                <div class="form-group mg-bottom-20 mg-lc-bottom">    
                                    <button class="form-input form-submit" disable="">Send Mail</button>    
                                </div>    
                            </form>    
                            <Alert :errors="alerts" v-if="( alerts.length > 0 )" />    
                        </div>    
                    </div>    
                </div>    
            </div>    
        `    
    };const $Projects = [    
        {    
            name: "Yume",    
            repo: "https://github.com/hxAri/Yume",    
            lang: {    
                name: "PHP",    
                icon: "https://raw.githubusercontent.com/hxAri/hxAri/main/assets/images/1644890644;75R1GnLOIZ.png"    
            },    
            path: "/projects/yume",    
            logo: "https://raw.githubusercontent.com/hxAri/hxAri/main/assets/images/1653507383;6bi9u6QnWb.png",    
            info: "Yume is a simple framework for building Websites built using the PHP Programming Language."    
        },    
        {    
            name: "Kanashi",    
            repo: "https://github.com/hxAri/Kanashi",    
            lang: {    
                name: "Python",    
                icon: "https://raw.githubusercontent.com/hxAri/hxAri/main/assets/images/1644890644;c3nT0xbpbV.png"    
            },    
            path: "/projects/kanashi",    
            logo: "https://raw.githubusercontent.com/hxAri/hxAri/main/assets/images/1654820424;51ydWrxRcv.png",    
            info: "Kanashi is an open source project that can be used to login to real Instagram accounts via Linux Terminal and Android Termux."    
        },    
        {    
            name: "Sheru",    
            repo: "https://github.com/hxAri/Sheru",    
            lang: {    
                name: "Bash/ Shell",    
                icon: "https://raw.githubusercontent.com/hxAri/hxAri/main/assets/images/1654842477;a3DPZwX2qo.png"    
            },    
            path: "/projects/sheru",    
            logo: "https://raw.githubusercontent.com/hxAri/hxAri/main/assets/images/",    
            info: "Undefined"    
        },    
        {    
            name: "Tree",    
            repo: "https://github.com/hxAri/Tree",    
            lang: {    
                name: "PHP",    
                icon: "https://raw.githubusercontent.com/hxAri/hxAri/main/assets/images/1644890644;75R1GnLOIZ.png"    
            },    
            path: "/projects/tree",    
            logo: "https://raw.githubusercontent.com/hxAri/hxAri/main/assets/images/1653507345;50XUUPql.z.png",    
            info: "Create a Tree structure using an Array."    
        },    
        {    
            name: "Faiba",    
            repo: "https://github.com/hxAri/Faiba",    
            lang: {    
                name: "JavaScript",    
                icon: "https://raw.githubusercontent.com/hxAri/hxAri/main/assets/images/1644890644;f403IB5ECP.png"    
            },    
            path: "/projects/faiba",    
            logo: "https://raw.githubusercontent.com/hxAri/hxAri/main/assets/images/1654840678;6cht26BtwN.png",    
            info: "Create a Tree structure using an Array or Object. This is an implementation of the Tree project built using JavaScript with almost the same functionality."    
        }    
    ];    
        
    const $Project = {    
        data: () => ({    
            projects: $Projects    
        }),    
        mounted: function()    
        {    
        },    
        methods: {},    
        components: {    
            Avatar: $Avatar    
        },    
        template: `    
            <div class="projects">    
                <div class="bantle flex flex-center">    
                    <h1 class="title">Projects</h1>    
                </div>    
                <div class="section">    
                    <div class="content">    
                        <p class="paragraph">    
                            I've been studying programming for over 2 years, and here are some of the projects I've created and are still developing.    
                        </p>    
                    </div>    
                    <div class="content deep dp-grid">    
                        <div class="project rd-square" v-for="( project, i ) in projects">    
                            <Avatar :alt="project.info" :src="project.logo" :route="project.path" inject="project-logo" />    
                            <h5 class="title">    
                                {{ project.name }}    
                            </h5>    
                            <p class="paragraph flex flex-left">    
                                {{ project.lang.name }} Language <img class="project-lang" :alt="project.logo.name" :src="project.lang.icon" />    
                            </p>    
                            <p class="paragraph">    
                                <a :href="project.repo" target="_blank" rel="noopener noreferrer">    
                                    {{ project.repo }}    
                                </a>    
                            </p>    
                            <p class="paragraph">    
                                {{ project.info }}    
                            </p>    
                        </div>    
                    </div>    
                </div>    
            </div>    
        `    
    };const $Home = {    
        data: () => ({    
        }),    
        mounted: function()    
        {    
        },    
        methods: {},    
        components: {    
            Abouts: $Abouts,    
            Project: $Project,    
            Contact: $Contact    
        },    
        template: `    
            <div class="home">    
                <Abouts />    
                <Project />    
                <Contact />    
            </div>    
        `    
    };// Define some routes.    
    // Each route should map to a component.    
    const $Routes = [    
        {    
            path: "/",    
            icon: [    
                "bx bx-home",    
                "bx bxs-home"    
            ],    
            slot: "Home",    
            component: $Home    
        },    
        {    
            path: "/about",    
            icon: [    
                "bx bx-user",    
                "bx bxs-user"    
            ],    
            slot: "About",    
            component: $Abouts    
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
            component: $Project    
        },    
        {    
            path: "/contact",    
            icon: [    
                "bx bx-phone",    
                "bx bxs-phone"    
            ],    
            slot: "Contact",    
            component: $Contact    
        },    
        {    
            path: "/terminal",    
            icon: [    
                "bx bx-terminal",    
                "bx bxs-terminal"    
            ],    
            slot: "Terminal",    
            component: $Terminal    
        },    
        {    
            path: "/privacy",    
            icon: [    
                "bx bx-lock-open",    
                "bx bxs-lock-open"    
            ],    
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
        
    const $Create = {    
        data: () => ({    
            pages: $Routes,    
            error: false    
        }),    
        mounted: function()    
        {    
        },    
        methods: {    
            match: function()    
            {    
                return( this.$route.path.match( /^\/projects\/[a-z\_\-]+/gi ) ? false : true );    
            }    
        },    
        template: $T.create.index,    
        components: {    
            Banner: {    
                template: $T.create.banner    
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
                template: $T.create.footer    
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
                template: $T.create.parent    
            }    
        }    
    };    
        
    // The application instance.    
    const $Object = Vue.createApp( $Create );    
              
          // Install the object instance as a plugin.    
          $Object.use( $Router );    
              
          // Mount element.    
          $Object.mount( "#root" );    
    
})();