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

( function( root, factory )
{
    if( typeof define === "function" && define.amd )
    {
        // AMD. Register as an anonymous module.
        define( ['e'], function( e )
        {
            return( root.hxAri = factory( e ) );
        });
    }
    else if( typeof module === "object" && module.exports )
    {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory( require( "e" ) );
    }
    else {
        
        // Browser globals
        root.hxAri = factory( root.e );
    }
}( typeof main !== "undefined" ? main : this, function( e )
{
    
    // Check if value is null.
    const Null = x => typeof x === "null";
    
    // Check if value is defined.
    const Defined = x => typeof x !== "undefined";
    
    // Check if value is undefined.
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
    
    // Shorthand for JSON Stringify and parse
    const $JSON = {
        encode: JSON.stringify,
        decode: JSON.parse
    };
    
    /*
     * Cookie utility
     *
     * A utility that provides various APIs for managing cookies.
     *
     * @params Array $set
     * @params String $del
     */
    const $Cookie = function( set, del )
    {
        // Clone self.
        var self = this;
        
        if( $Is( document, Undefined ) )
        {
            throw new TypeError( "Object Document is not defined." );
        }
        
        // Set cookies.
        if( $Is( set, Array ) )
        {
            self.set.apply( self, set );
        }
        
        // Delete cookies.
        if( $Is( del, Array ) )
        {
            del.forEach( cookie =>
            {
                self.del( cookie );
            });
        }
        
        // Load all available cookies.
        this.load();
    };
    
    /*
     * Get cookie value.
     *
     * @params String $name
     *
     * @return String|False
     */
    $Cookie.prototype.get = function( name )
    {
        if( $Is( name, String ) )
        {
            if( $Is( result = document.cookie.split( ";" ).find( r => r.replace( /\s/g, "" ).startsWith( encodeURIComponent( name ) + "=" ) ), Defined ) )
            {
                return( decodeURIComponent( result.split( "=" )[1] ) );
            }
            return( false );
        }
        throw new TypeError( "Invalid cookie name." );
    };
    
    /*
     * Load all the cookies that have been set.
     *
     * @return Object
     */
    $Cookie.prototype.load = function()
    {
        // Clone self.
        var self = this;
            self.loaded = {};
        
        // Explode all cookies.
        document.cookie.split( ";" ).map( part =>
        {
            // Set cookie orders.
            self.loaded[decodeURIComponent( part.split( "=" )[0].replace( /\s/g, "" ) )] = decodeURIComponent( part.split( "=" )[1] );
        });
        
        return( self.loaded );
    };
    
    /*
     * List of cookies that have been set.
     *
     * @values Object
     */
    $Cookie.prototype.loaded = {};
    
    /*
     * Set one or more than one cookie.
     *
     * @params String $name
     * @params String $value
     * @params Object $options
     *
     * @return String
     */
    $Cookie.prototype.set = function( name, value, { comment, domain, expires, maxage, httponly, path = "/", samesite, secure, version = "4.1.6" } = {} )
    {
        // Clone self.
        var self = this;
        
        // If cookies are multiple, all
        // arguments will be ignored except name.
        if( $Is( name, Array ) )
        {
            
            // Set cookies by order.
            name.forEach( group =>
            {
                
                // If the group values   do not match.
                if( $Is( group ) !== "Array" )
                {
                    throw new TypeError( $f( "Multiple cookie group value must be type Object, \"{}\" given.", $Is( group ) ) );
                }
                
                // Recall the cookie set function.
                self.set.apply( self, group );
            });
            
        } else {
            if( $Is( name, String ) )
            {
                // Raw Cookie Header.
                var header = "";
                
                // Check if the cookie name is valid.
                if( /^(?:([a-z\_])([a-z0-9\_]*))$/i.test( name ) )
                {
                    if( $Is( value, String ) )
                    {
                        header = $f( "{}={}", encodeURIComponent( name ), encodeURIComponent( value ) );
                    } else {
                        header = $f( "{}=None", encodeURIComponent( name ) );
                        expires = -1;
                    }
                } else {
                    throw new TypeError( "Invalid cookie name." );
                }
                
                // If the cookie has a comment.
                if( $Is( comment, String ) )
                {
                    header += $f( "; Comment=\"{}\"", comment );
                }
                
                // If the cookie has a domain name.
                if( $Is( domain, String ) )
                {
                    header += $f( "; Domain={}", domain );
                }
                
                // If the cookie has an expiration date.
                if( $Is( expires, Number ) )
                {
                    // Parse date to UTCString.
                    header += $f( "; expires={}", new Date( Date.now() + expires * 864e5 ).toUTCString() );
                }
                
                // If the cookie is read only the server.
                if( $Is( httponly, Boolean ) )
                {
                    header += httponly ? "; HttpOnly" : "";
                }
                
                // ....
                if( $Is( maxage, Number ) )
                {
                    header += $f( "; Max-Age={}", maxage );
                }
                
                // If cookies are only set in certain locations.
                if( $Is( path, String ) )
                {
                    // If the location path name is valid.
                    if( /(?:^(\/\w+){0,}\/?)$/g.test( path ) )
                    {
                        header += $f( "; Path={}", path );;
                    } else {
                        throw new TypeError( "Invalid path name." );
                    }
                }
                
                if( $Is( samesite, String ) )
                {
                    switch( samesite )
                    {
                        case "Lax":
                            header += "; SameSite=Lax"; break;
                        case "None":
                            header += "; SameSite=None"; break;
                        case "Strict":
                            header += "; SameSite=Strict"; break;
                        default:
                            throw new TypeError( "Invalid cookie SameSite." );
                    }
                }
                
                // Otherwise the cookie is only sent
                // to the server when a request is made.
                if( $Is( secure, Boolean ) )
                {
                    header += secure ? "; Secure" : "";
                }
                
                // If cookie has a version.
                if( $Is( version, String ) )
                {
                    header += $f( "; Version={}", version );
                }
                
                // Set cookie header.
                document.cookie = header;
                
                // Load all available cookies.
                this.load();
                
                // Returns the cookie's raw header value.
                return( header );
                
            } else {
                throw new TypeError( "Cookie name cannot be empty or null." );
            }
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
    const $Theme = function({ set } = {})
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
        // Get current theme color from cookie.
        var token = $Cookie.prototype.get( this.name );
        
        if( $Is( token, String ) )
        {
            if( token === this.theme.dark.token )
            {
                return( "dark" );
            }
        } else {
            if( window.matchMedia )
            {
                if( window.matchMedia( "(prefers-color-scheme:dark)" ).matches )
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
            $Cookie.prototype.set(
                this.name,
                this.theme[color].token,
                {
                    path: "/",
                    expires: 30
                }
            );
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
    
    // Tab scroll.
    const $Scroll = { left: 0 };
    
    /*
     * Date utility.
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
        
        // Return string replaced.
        return( string.replace( /\%([a-zA-Z])/g, matched =>
        {
            // String sliced.
            var sliced = matched.slice( 1 );
            
            // Check if.format is supported.
            if( $Is( self.format.formats[sliced], Function ) )
            {
                return( this.format.formats[sliced]( self ) );
            }
            return( $f( "Invalid format date \"{}\"", matched ) );
        }));
    };
    
    /*
     * Datetime format supported.
     *
     */
    $Date.prototype.format.formats = {
        
        // Locale's abbreviated weekday name (e.g., Sun)
        a: self => self.day( "a" ),
        
        // Locale's full weekday name (e.g., Sunday)
        A: self => self.day( "A" ),
        
        // Locale's abbreviated month name (e.g., Jan)
        b: self => self.month( "b" ),
        
        // Locale's full month name (e.g., January)
        B: self => self.month( "B" ),
        
        // Day of month (e.g., 01)
        d: self => self.day( "d" ),
        
        // Display date as mm/dd/yy.
        D: self => self.day( "D" ),
        
        // Day of year (001..366)
        j: self => self.day( "j" ),
        
        // Day of week (1..7)
        u: self => self.day( "u" ),
        
        // Year (2022)
        Y: self => self.years( "Y" ),
        
        // Last two digits of year (22)
        y: self => self.years( "y" ),
        
        // Month (01..12)
        m: self => self.month( "m" ),
        
        // Hour (00..23)
        H: self => self.hours( "H" ),
        I: self => self.hours( "I" ),
        
        // Minute (00..59)
        M: self => self.minute(),
        
        /// Second (00..60)
        S: self => self.second()
        
    };
    
    /*
     * Request
     *
     * Send asynchronous requests using XMLHttpRequest.
     *
     * @params String $method
     * @params String $url
     * @params Object $options
     *
     * @return Promise
     */
    const $Request = async function( method, url, options = {} )
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
    
    /*
     * Request response.
     *
     */
    const $Response = {
        data: null,
        headers: {}
    };
    
    /*
     * List image url sources.
     *
     */
    const $Image = {
        avatar: [
            "https://github.com/hxAri/hxAri/raw/main/assets/images/1653507238;c0LQ8rTUcU.png",
            "https://github.com/hxAri/hxAri/raw/main/assets/images/1653507326;74GVGUB1E..png"
        ],
        banner: [
            "https://github.com/hxAri/hxAri/raw/main/assets/images/1644890644;6errNcC6Uw.png",
            "https://github.com/hxAri/hxAri/raw/main/assets/images/1644890644;abFVZSCJpK.png"
        ],
        charts: {
            Donut: "https://github.com/hxAri/hxAri/raw/main/assets/images/1644890644;a0VaZi.joK.png",
        },
        contact: {
            Banner: "https://github.com/hxAri/hxAri/raw/main/assets/images/1660492578;8dQ5zSgFZa.jpg",
        },
        home: {
            Banner: "https://github.com/hxAri/hxAri/raw/main/assets/images/1660408878;1587jsCq5G.png"
        },
        myself: {
            Avatar: "https://github.com/hxAri/hxAri/raw/main/assets/images/1654575068;fcTEqRsuqp.jpg",
            Banner: [
                "https://github.com/hxAri/hxAri/raw/main/assets/images/1644890644;6errNcC6Uw.jpg",
                "https://github.com/hxAri/hxAri/raw/main/assets/images/1644890644;abFVZSCJpK.jpg"
            ]
        },
        terminal: {
            Code: [
                "https://github.com/hxAri/hxAri/raw/main/assets/images/1644890644;09IIMQF2zZ.png",
                "https://github.com/hxAri/hxAri/raw/main/assets/images/1644890644;9fw19XORPM.png"
            ]
        },
        language: {
            Java: {
                Banner: "https://github.com/hxAri/hxAri/raw/main/assets/images/1644890644;b1YKRNbb5E.png",
            },
            JavaSript: {
                Banner: "https://github.com/hxAri/hxAri/raw/main/assets/images/1644890644;f403IB5ECP.png",
                NodeJS: "https://github.com/hxAri/hxAri/raw/main/assets/images/1644890644;1cw.Ei59IY.png",
                ReactJS: "https://github.com/hxAri/hxAri/raw/main/assets/images/1644890644;35.QAZFici.jpg",
                VueJS: "https://github.com/hxAri/hxAri/raw/main/assets/images/1644890644;daoXMXJzwc.png"
            },
            PHP: {
                Banner: "https://github.com/hxAri/hxAri/raw/main/assets/images/1644890644;75R1GnLOIZ.png",
                CodeIgniter: "",
                Laravel: "https://github.com/hxAri/hxAri/raw/main/assets/images/1644890644;570Yms8Pnh.jpg"
            },
            Python: {
                Banner: "https://github.com/hxAri/hxAri/raw/main/assets/images/1644890644;c3nT0xbpbV.png",
                Django: "https://github.com/hxAri/hxAri/raw/main/assets/images/1644890644;76Fg4NAgw..png",
                Flask: "https://github.com/hxAri/hxAri/raw/main/assets/images/1644890644;24SdpuDDcZ.png"
            },
            Ruby: {
                Banner: "https://github.com/hxAri/hxAri/raw/main/assets/images/1644890644;eb4CHDYoyx.png",
                RubyOnRails: ""
            },
            Shell: {
                Banner: "https://github.com/hxAri/hxAri/raw/main/assets/images/1654842477;a3DPZwX2qo.png",
                Termux: ""
            }
        },
        projects: {
            Eremento: "https://github.com/hxAri/hxAri/raw/main/assets/images/1653507202;5fe1yJwN3F.png",
            Kanashi: "https://github.com/hxAri/hxAri/raw/main/assets/images/1654820424;51ydWrxRcv.png",
            Syntax: "https://github.com/hxAri/hxAri/raw/main/assets/images/1653507368;93pj5COKfQ.png",
            Tree: "https://github.com/hxAri/hxAri/raw/main/assets/images/1653507345;50XUUPql.z.png",
            TreeJS: "https://github.com/hxAri/hxAri/raw/main/assets/images/1654840678;6cht26BtwN.png",
            Yume: "https://github.com/hxAri/hxAri/raw/main/assets/images/1653507383;6bi9u6QnWb.png",
        }
    };
    
    // My Social media links.
    const $Medsos = [
        {
            link: "https://instagram.com/hx.are",
            icon: "bx bxl-instagram"
        },
        {
            link: "https://facebook.com/hx.are",
            icon: "bx bxl-facebook"
        },
        {
            link: "https://twitter.com/hxxAre",
            icon: "bx bxl-twitter"
        },
        {
            link: "https://github.com/hxAri",
            icon: "bx bxl-github"
        },
        {
            link: "https://www.tiktok.com/@hxare",
            icon: "bx bxl-tiktok"
        }
    ];
    
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
    $Bash.prototype.declare = [];
    
    /*
     * Bash History Command and output program.
     *
     * @values Array
     */
    $Bash.prototype.history = [{
        command: false,
        outputs: [
            "",
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
            ""
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
        // Regular expression to capture variable name.
        var regex = /(?:\$([a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*))/g;
        var match = null;
        
        // Find variables using pattern.
        while( match = regex.exec( input ) )
        {
            if( this.declare.length > 0 )
            {
                for( let i in this.declare )
                {
                    // If the environment variable is found.
                    if( match[1] === this.declare[i].env )
                    {
                        // Rename variable with variable value.
                        input = input.replace( match[0], this.declare[i].val );
                    } else {
                        if( parseInt( i +1 ) === this.declare.length )
                        {
                            // Rename variable with blank.
                            // Because the variable is undefined or not set.
                            input = input.replace( match[0], "" );
                        }
                    }
                }
            } else {
                    
                // Rename variable with blank.
                input = input.replace( match[0], "" );
            }
        }
        
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
                        
                        // Command reference.
                        $refs: $Is( command.defined, Object ) ? command.defined : {},
                        
                        // If the command has methods.
                        ...$Is( command.methods, Object ) ? command.methods : {}
                        
                    };
                    
                    // If the command has options.
                    if( $Is( command.opts, Object ) )
                    {
                        // Parse arguments.
                        var parse = this.argument.parser( argv, command.opts );
                        
                        for( let i in parse )
                        {
                            if( i !== "argv" )
                            {
                                args[0][i.replace( /^([-]*)/, "" )] = $Is( parse[i], String ) ? ( ( match = parse[i].match( /^\"(.*)\"$|^\'(.*)\'$/ ) ) ? ( match[1] ? match[1] : match[2] ) : parse[i] ) : parse[i];
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
    $Bash.prototype.argument.parser = function( argv, opts, { permissive = false, stopAtPositional = false } = {} )
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
                alias[key] = opts[key]; continue;
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
                            .map( a => $f( "-{}", a ) );
                
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
            return( string.replace( /\&|\"|\<|\>/g, m => m === "&" ? "&amp" : ( m === "\"" ? "&quot" : ( m === "\<" ? "&lt" : "&gt" ) ) ) );
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
            string = this.inputs( string );
            
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
     * Help
     *
     * Displays help text for usage.
     */
    $Bash.prototype.commands.push({
        name: "help",
        mounted: function()
        {
            return([
                "",
                "Type a star * to display all available commands. If you are not familiar with the Linux command line please add the --help or -h option to display help using the command.",
                "",
                "If you are visiting this page using an Android device please use the Hacker's Keyboard app for a better experience.",
                "",
                "Double click the terminal screen to paste the text from the clipboard.",
                ""
            ]);
        }
    });
    
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
                        if( split[0].match( /^(?:([a-zA-Z0-9\-\_]+))$/ ) === null )
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
     * Export
     *
     * Ensure the environment variables and functions to be passed to child processes.
     */
    $Bash.prototype.commands.push({
        name: "export",
        allowed: true,
        mounted: function()
        {
            // Clone self.
            var self = this;
            
            // Declared variables.
            var declares = [];
            
            if( this.$args !== "" )
            {
                self.$bash.argument( self.$args ).forEach( argv =>
                {
                    // If the arguments match.
                    if(( split = argv.split( "=" )).length === 2 )
                    {
                        // If the variable name is invalid.
                        if( split[0].match( /^(?:([a-zA-Z0-9\_]+))$/ ) === null )
                        {
                            throw new Error( "Invalid variable name." );
                        }
                        
                        // If the variable value is not empty.
                        if( split[1] !== "" )
                        {
                            for( let i in self.$bash.declare )
                            {
                                if( self.$bash.declare[i].env === split[0] )
                                {
                                    // Delete old declare.
                                    delete self.$bash.declare[i];
                                }
                            }
                            
                            // Add variable to environment variable list.
                            self.$bash.declare.push({
                                env: split[0],
                                val: split[1]
                            });
                        }
                    }
                });
            } else {
                this.$bash.declare.forEach( dec =>
                {
                    declares.push( $f( "declare -X {}={}", dec.env, dec.val ) );
                });
            }
            return( declares );
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
     * Cookie
     *
     * Set, Get, and Delete cookie.
     */
    $Bash.prototype.commands.push({
        name: "cookie",
        opts: {
            
            // Cookie execute options.
            "--del": Boolean,
            "--get": Boolean,
            "--set": Boolean,
            
            // Cookie execute value options.
            "--name": String,
            "--value": String,
            "--comment": String,
            "--domain": String,
            "--path": String,
            "--samesite": String,
            "--version": String,
            "--expires": Number,
            "--maxage": Number,
            "--httponly": Boolean,
            "--secure": Boolean
            
        },
        allowed: true,
        defined: {
            instance: new $Cookie()
        },
        mounted: function({ del, get, set, name, value, comment, domain, expires, maxage, httponly, path, samesite, secure, version } = {})
        {
            // Cookie loaded raws.
            var loaded = [];
            
            if( $Is( set, Boolean ) && set )
            {
                return( $f( "Set-Cookie: {}", this.$refs.instance.set( name, value, { comment: comment, domain: domain, expires: expires, maxage: maxage, httponly: httponly, path: path, samesite: samesite, secure: secure, version: version } ) ) );
            }
            
            for( let name in this.$refs.instance.loaded )
            {
                loaded.push( $f( "Set-Cookie: {}={}", name, this.$refs.instance.loaded[name] ) );
            }
            
            return( loaded );
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
     * Date
     *
     * Displays and sets the system date and time.
     */
    $Bash.prototype.commands.push({
        name: "date",
        opts: {
            
            // Longhand options.
            "--time": Number,
            "--format": String,
            
            // Shorthand options.
            "-t": "--time",
            "-f": "--format"
            
        },
        allowed: true,
        mounted: function({ time, t, format, f } = {})
        {
            var date = new $Date( time ? time : ( t ? t : Math.round( Date.now() /1000 ) ) );
            
            if( $Is( format, String ) || $Is( f, String ) )
            {
                return( date.format( format ? format : f ) );
            }
            return( String( date.date ) ).replace( /\(|\)/g, "" );
        }
    });
    
    /*
     * Echo
     *
     * Used to display line of text/string
     * that are passed as an argument.
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
            return([
                "",
                "Remember, falling in love because of",
                "faith is much more beautiful than",
                "falling in love because of lust.",
                ""
            ]);
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
     * Theme
     *
     * Set theme color.
     */
    $Bash.prototype.commands.push({
        name: "theme",
        allowed: true,
        defined: {
            instance: new $Theme()
        },
        mounted: function()
        {
            if( this.$args !== "" )
            {
                if( this.$args === "dark" || this.$args === "light" )
                {
                    this.$refs.instance.set( this.$args );
                } else {
                    throw new Error( "Invalid theme color" );
                }
            }
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
            // Clone self.
            self = this;
            
            // Execute the command.
            self.executor();
        },
        methods: {
            
            /*
             * Trigger android soft keyboard.
             *
             * @params InputEvent $e
             *
             * @return Void
             */
            trigger: function( e )
            {
                this.$refs.input.focus();
            },
            
            /*
             * Paste text from cliboard.
             *
             * @params InputEvent $e
             *
             * @return Void
             */
            pasting: function( e )
            {
                // Clone self.
                var self = this;
                
                navigator.clipboard.readText()
                    
                    // Paste text into input model.
                    .then( clipText => 
                    {
                        self.model = $f( "{}{}", self.model, clipText );
                    })
                    
                    // If error.
                    .catch( e => 
                    {
                        self.bash.history.push({
                            outputs: $f( "sh: paste: {}: {}", e.name, e.message )
                        });
                    });
                
            },
            
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
                
                this.endrange({ target: this.$refs.input });
                
            },
            
            /*
             * Terminal ONInput
             *
             * @params InputEvent $e
             *
             * @return String
             */
            oninputs: function( e )
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
                e.target.focus();
                e.target.setSelectionRange( -1, -1 );
            }
        },
        template: ([
            `<div class="terminal">`,
                `<pre class="terminal-screen" @click="trigger" @dblclick="pasting">`,
                    `<div class="terminal-output fs-14" v-html="onrender()"></div>`,
                    `<div class="terminal-form">`,
                        `<label class="terminal-prompt">`,
                            `{{ oninputs() }}`,
                        `</label>`,
                        `<input class="terminal-input" type="text" v-model="model" autocapitalize="off" ref="input" @click="endrange" @keyup="endrange" @focus="endrange" @input="endrange" @change="endrange" @keypress="endrange" @keydown="executor" />`,
                    `</div>`,
                `</pre>`,
            `</div>`
        ]).join( "" )
    };    
        
    /*    
     * Alert component.    
     *    
     * @options Array $alerts    
     */    
    const $Alerts = {    
        props: {    
            alerts: Array    
        },    
        methods: {    
        },    
        template: `    
            <div class="alert">    
                <div class="alert-group">    
                </div>    
            </div>    
        `    
    };    
        
    /*    
     * Avatar component.    
     *    
     * @options Object $inject, $link|$route, $title, $alt, $src    
     */    
    const $Avatar = {    
        props: {    
            options: {    
                type: Object,    
                require: true    
            }    
        },    
        computed: {    
            binding: function()    
            {    
                return({    
                    template: this.building()    
                });    
            }    
        },    
        methods: {    
            building: function()    
            {    
                // Avatar stack.    
                var stack = "";    
                    
                if( $Is( this.options, Object ) )    
                {    
                    // Class injection.    
                    this.options.inject = $f( "avatar-wrapper flex flex-center {}", this.options.inject ? this.options.inject : "" );    
                        
                    // ...    
                    if( $Is( this.options.link, String ) )    
                    {    
                        // ...    
                        stack += "<div class=\"avatar\">";    
                            stack += "<div class=\"{}\">";    
                                stack += "<a href=\"{}\" target=\"_blank\" rel=\"noopener noreferrer\">";    
                                    stack += "<img class=\"avatar-image\" title=\"{}\" alt=\"{}\" src=\"{}\" />";    
                                    stack += "<div class=\"avatar-cover\"></div>";    
                                stack += "</a>";    
                            stack += "</div>";    
                        stack += "</div>";    
                            
                        // ...    
                        return( $f( stack,     
                            this.options.inject,    
                            this.options.link,    
                            this.options.title,    
                            this.options.alt,    
                            this.options.src    
                        ));    
                    }    
                        
                    // ...    
                    if( $Is( this.options.route, String ) )    
                    {    
                        // ...    
                        stack += "<div class=\"avatar\">";    
                            stack += "<div class=\"{}\">";    
                                stack += "<router-link to=\"{}\">";    
                                    stack += "<img class=\"avatar-image\" title=\"{}\" alt=\"{}\" src=\"{}\" />";    
                                    stack += "<div class=\"avatar-cover\"></div>";    
                                stack += "</router-link>";    
                            stack += "</div>";    
                        stack += "</div>";    
                            
                        // ...    
                        return( $f( stack,     
                            this.options.inject,    
                            this.options.route,    
                            this.options.title,    
                            this.options.alt,    
                            this.options.src    
                        ));    
                    }    
                        
                    // ...    
                    stack += "<div class=\"avatar\">";    
                        stack += "<div class=\"{}\">";    
                            stack += "<img class=\"avatar-image\" title=\"{}\" alt=\"{}\" src=\"{}\" />";    
                            stack += "<div class=\"avatar-cover\"></div>";    
                        stack += "</div>";    
                    stack += "</div>";    
                        
                    // ...    
                    return( $f( stack,     
                        this.options.inject,    
                        this.options.title,    
                        this.options.alt,    
                        this.options.src    
                    ));    
                }    
                return( "<div class=\"avatar\"></div>" );    
            }    
        },    
        template: `<component v-bind:is="binding"></component>`    
    };    
        
    /*    
     * Iterator list component.    
     *    
     * @options Array $lists    
     */    
    const $Iterator = {    
        props: {    
            lists: Array    
        },    
        computed: {    
            binding: function()    
            {    
                return({ template: this.iterate( this.lists ) });    
            }    
        },    
        methods: {    
                
            /*    
             * Get list icon/ image.    
             *    
             * @params Object $list    
             *    
             * @return String    
             */    
            icon: function( list )    
            {    
                // Check if the list has an icon.    
                if( $Is( list.include.icon, Object ) )    
                {    
                    // Get list icon.    
                    var icon = list.include.icon.icon;    
                        
                    // If list icon is image type.    
                    if( list.include.icon.type === "image" )    
                    {    
                        return( $f( "<img class=\"list-icon list-icon-type-image\" src=\"{}\" alt=\"\" title=\"\" />", icon ) );    
                    }    
                    return( $f( "<i class=\"list-icon {} fc-01\"></i>", icon ) );    
                }    
                return( "" );    
            },    
                
            /*    
             * Build menu iteration.    
             *    
             * @params Array $lists    
             *    
             * @return String    
             */    
            iterate: function( lists )    
            {    
                // Menu stack.    
                var menu = "";    
                    
                // Mapping the whole list.    
                lists.forEach( list =>    
                {    
                    // Check if the list is a list.    
                    if( $Is( list.name, String ) && list.name !== "error" )    
                    {    
                        // Check if the menu has children.    
                        if( $Is( list.children, Array ) && list.children.length > 0 )    
                        {    
                            // Build dropdown menu template.    
                            menu += "<li class=\"list dropdown\">";    
                                menu += "<li class=\"list dropdown-display flex flex-left\">";    
                                    menu += "{}";    
                                    menu += "<router-link to=\"{}\">{}</router-link>";    
                                    menu += "<i class=\"bx bx-chevron-down\"></i>";    
                                menu += "</li>";    
                                menu += "<li class=\"list dropdown-content\">";    
                                    menu += "{}";    
                                menu += "</li>";    
                            menu += "</li>";    
                                
                            // Format the entire stack menu.    
                            menu = $f( menu, this.icon( list ), list.path, list.name.charAt( 0 ).toUpperCase() + list.name.slice( 1 ), this.iterate( list.children ) );    
                        } else {    
                                
                            // Build single list template.    
                            menu += "<li class=\"list flex flex-left\">";    
                                menu += "{}";    
                                    menu += "<router-link to=\"{}\">";    
                                    menu += "{}";    
                                menu += "</router-link>";    
                            menu += "</li>";    
                                
                            // Format the entire stack menu.    
                            menu = $f( menu, this.icon( list ), list.path, list.name.charAt( 0 ).toUpperCase() + list.name.slice( 1 ) );    
                        }    
                    }    
                });    
                    
                return( menu );    
            }    
        },    
        template: `<component v-bind:is="binding"></component>`    
    };    
        
    // Loader Error component.    
    const $Loaderr = {    
        template: `    
            <div class="loaderr flex flex-center">    
                <div class="loaderr-block">    
                    <div class="loaderr-icon flex flex-center">    
                        <i class="bx bx-confused"></i>    
                    </div>    
                    <div class="loaderr-slot">    
                        <slot></slot>    
                    </div>    
                </div>    
            </div>    
        `    
    };    
        
    /*    
     * About    
     *    
     * Explain about the web that was built.    
     */    
    const $About = {    
        template: `    
            <div class="about">    
                <p class="">About hxAri</p>    
                <p class="">    
                    Hello, Dear friends, Welcome to <router-link to="/">hxAri</router-link> also, we are happy you want to know something more about our site.    
                    So, basically, nowadays people are more dependent on online products and services that's why we also, take forward a step to help you.    
                    Our first wish is to provide you with a better solution to solve your problem. So, kindly if you don't get any solution then mention it in the comment section.    
                    Also, we are trying to provide fresh & latest content that provides you ideas about all updated information that's happening in the world.    
                    In the below section you can get more ideas about our site like our website category and content category.    
                    If you have additional questions or require more information about our About Us Page, do not hesitate to contact us through email at <a href="mailto:ari160824@gmail.com">ari160824@gmail.com</a> There are millions of websites created every day, also, there is much fake content spread on the internet.    
                    So, Our main goal is to provide you with 100% Original and Safe content that provides you a great and better experience on the world wide web. We mainly focus on our service so and improving it regularly to provide a better user experience to all users.    
                    We are mainly focused on the Programming category so, we provide Programming related content if you are interested in the News category then you can visit daily to get more latest information.    
                    Finally, this is our complete about us page about details are showing what is the motive to create <router-link to="/">hxAri</router-link>.    
                    If you want to contact us then you can email us at <a href="mailto:ari160824@gmail.com">ari160824@gmail.com</a> also, you can contact us by our contact us form.    
                </p>    
                <p class="">Thanks for visiting our About Us Page</p>    
                <p class="">    
                    Sincerely,    
                    <b>Ari Setiawan</b>    
                </p>    
            </div>    
        `    
    };    
        
    /*    
     * Contact component.    
     *    
     */    
    const $Contact = {    
        data: () => ({    
            banner: $f( "url(\"{}\")", $Image.contact.Banner ),    
            detail: [    
                {    
                    icon: "bx bxs-map-alt",    
                    text: "Indonesia, Lampung Province, Pringsewu Regency, Sukoharjo District, 35674"    
                },    
                {    
                    icon: "bx bxs-phone",    
                    text: "+62 8583-9110-30",    
                    link: "https://wa.me/6285839211030"    
                },    
                {    
                    icon: "bx bxs-navigation",    
                    text: "ari160824@gmail.com",    
                    link: "mailto:ari160824@gmail.com"    
                },    
                {    
                    icon: "bx bx-world",    
                    text: "https://hxari.github.io/"    
                }    
            ],    
            models: [    
                {    
                    type: "text",    
                    refer: "ename",    
                    label: "Name",    
                    value: ""    
                },    
                {    
                    type: "text",    
                    refer: "subject",    
                    label: "Subject",    
                    value: ""    
                },    
                {    
                    type: "email",    
                    refer: "esender",    
                    label: "Email",    
                    //regex: /^((([^<>('")[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))$/g,    
                    value: ""    
                },    
                {    
                    type: "textarea",    
                    refer: "message",    
                    label: "Email Message",    
                    value: ""    
                },    
                {    
                    type: "button",    
                    refer: "button",    
                    label: "Send"    
                }    
            ],    
            options: {    
                data: {},    
                headers: {    
                    "Accept": "application/json",    
                    "Content-Type": "application/x-www-form-urlencoded"    
                }    
            },    
            sending: false,    
            posting: "https://formspree.io/f/xoqrezbv",    
            trigger: {    
                text: null,    
                type: false    
            }    
        }),    
        methods: {    
                
            /*    
             * Disable all input forms.    
             *    
             * @params Bool $allow    
             *    
             * @return Void    
             */    
            allows: function( allow )    
            {    
                for( let i in this.models )    
                {    
                    this.$refs[this.models[i].refer].disabled = allow;    
                }    
            },    
                
            close: function()    
            {    
                this.trigger.text = null;    
                this.trigger.type = false;    
            },    
                
            /*    
             * Reset form models.    
             *    
             * @return Void    
             */    
            resets: function()    
            {    
                for( let i in this.models )    
                {    
                    this.models[i].value = "";    
                }    
                this.options.data = {};    
            },    
                
            /*    
             * Handle form submit event.    
             *    
             * @params Event $e    
             *    
             * @return Void    
             */    
            submit: async function( e )    
            {    
                // Disable or cancel event.    
                e.preventDefault();    
                    
                // Copy self.    
                var self = this;    
                    
                // Reset values.    
                self.close();    
                self.sending = true;    
                    
                // Disable all input forms.    
                self.allows( false );    
                    
                // Check whether all input forms are valid.    
                if( self.valids() )    
                {    
                    // Waiting.    
                    await    
                        
                    // Sending message.    
                    $Request( "POST", self.posting, self.options )    
                        .then( r => {    
                            self.trigger.text = "Email message has been sent.";    
                            self.trigger.type = "success";    
                        })    
                        .catch( e => {    
                            self.trigger.text = "Failed send message!",    
                            self.trigger.type = "error";    
                        });    
                        
                    // Check if the email message was sent successfully.    
                    if( self.trigger.type === "success" )    
                    {    
                        // Reset form input.    
                        self.resets();    
                    }    
                }    
                    
                // Allow form input.    
                self.allows( true );    
                    
                // Sending success!    
                self.sending = false;    
            },    
                
            /*    
             * Validate all input forms.    
             *    
             * @return Bool    
             */    
            valids: function()    
            {    
                for( let i in this.models )    
                {    
                    // Check if something wrong.    
                    if( this.trigger.type === "error" )    
                    {    
                        return( false );    
                    }    
                        
                    // Check if model type is not button.    
                    if( this.models[i].type !== "button" )    
                    {    
                        // Check if input value is empty.    
                        if( this.models[i].value === "" )    
                        {    
                            this.trigger.text = $f( "The input form for {} cannot be empty!", this.models[i].label );    
                            this.trigger.type = "error";    
                        }    
                            
                        // Check if model has regex.    
                        if( this.models[i].regex )    
                        {    
                            // Check if input value is invalid.    
                            if( this.models[i].regex.test( this.models[i].value ) === false )    
                            {    
                                this.trigger.text = $f( "The input value for {} must be valid!", this.models[i].label );    
                                this.trigger.type = "error";    
                            }    
                        }    
                            
                        // Insert data.    
                        this.options.data[this.models[i].refer] = this.models[i].value;    
                    }    
                }    
                return( true );    
            }    
                
        },    
        template: `    
            <div class="template">    
                <div class="alert" v-if="trigger.type">    
                    <div class="alert-group">    
                        <div class="alert-single error" v-if="( trigger.type === 'error' )">    
                            <div class="alert-slot">    
                                {{ trigger.text }}    
                            </div>    
                            <button class="alert-close flex flex-center" @click="close">    
                                <i class="bx bx-x"></i>    
                            </button>    
                        </div>    
                        <div class="alert-single success" v-if="( trigger.type === 'success' )">    
                            <div class="alert-slot">    
                                {{ trigger.text }}    
                            </div>    
                            <button class="alert-close flex flex-center" @click="close">    
                                <i class="bx bx-x"></i>    
                            </button>    
                        </div>    
                    </div>    
                </div>    
                <div class="contact flex flex-center">    
                    <div class="contact-wrapper flex flex-center rd-square">    
                        <div class="contact-section info" :style="{ backgroundImage: banner }">    
                            <div class="contact-cover flex flex-center">    
                                <div class="contact-coverable">    
                                    <div class="contact-group mg-bottom-18">    
                                        <h4 class="contact-title mg-bottom-8">Contact information</h4>    
                                        <p class="contact-parap">Overall details of my contact information.</p>    
                                    </div>    
                                    <div class="contact-detail">    
                                        <div class="contact-single flex flex-left" v-for="info in detail">    
                                            <div class="contact-icon flex flex-center rd-circle">    
                                                <i :class="info.icon"></i>    
                                            </div>    
                                            <div class="contact-text">    
                                                <a v-if="info.link" :href="info.link" target="_blank" rel="noopener noreferrer">{{ info.text }}</a>    
                                                <p v-else>{{ info.text }}</p>    
                                            </div>    
                                        </div>    
                                    </div>    
                                </div>    
                            </div>    
                        </div>    
                        <div class="contact-section form flex flex-center">    
                            <div class="contact-coverable">    
                                <div class="contact-group mg-bottom-18">    
                                    <h4 class="contact-title mg-bottom-8">Contact me</h4>    
                                    <p class="contact-parap">Send me any suggestions or questions.</p>    
                                </div>    
                                <form class="contact-form" @submit="submit">    
                                    <div class="form-group mg-bottom-14 mg-lc-bottom" v-for="( model, index ) in models">    
                                        <label class="form-label" v-if="( model.type !== 'button' )">    
                                            {{ model.label }}    
                                        </label>    
                                        <input class="form-input" :type="model.type" :ref="model.refer" v-model="models[index].value" v-if="( model.type !== 'button' && model.type !== 'textarea' )" />    
                                        <button class="form-input form-submit" :ref="model.refer" v-if="( model.type === 'button' )">    
                                            {{ model.label }}    
                                        </button>    
                                        <textarea class="form-input form-texta" :ref="model.refer" v-model="models[index].value" v-if="( model.type === 'textarea' )"></textarea>    
                                    </div>    
                                </form>    
                            </div>    
                        </div>    
                    </div>    
                </div>    
            </div>    
        `,    
        components: {    
            Avatar: $Avatar    
        }    
    };    
        
    /*    
     * Portofolio component.    
     *    
     */    
    const $Portofolio = {    
        data: () => ({    
            language: {},    
            projects: false    
        }),    
        mounted: function()    
        {    
            // Copy all programming language images.    
            this.language = $Image.language;    
                
            // Copy all project page routes.    
            this.projects = $Projects.select();    
        },    
        methods: {    
            test: function( e )    
            {    
                console.log( $JSON.encode( this.projects, null, 4 ) );    
            }    
        },    
        template: `    
            <div class="portof dp-flex">    
                <div class="portof-section profile">    
                    <div class="portof-wrapper">    
                        <div class="portof-picture flex flex-center rd-circle">    
                            <div class="portof-picture-border flex flex-center rd-circle">    
                                <div class="portof-picture-spaces flex flex-center rd-circle">    
                                    <div class="avatar">    
                                        <div class="avatar-wrapper flex flex-center rd-circle">    
                                            <div class="avatar-background"></div>    
                                        </div>    
                                    </div>    
                                </div>    
                            </div>    
                        </div>    
                        <div class="portof-github">    
                            <p class="fullname fc-sh-00m fs-14 fb-45 mg-0">Ari Setiawan</p>    
                            <p class="biography fc-sh-00m fs-14 fb-35">A Junior Backend Developer</p>    
                        </div>    
                    </div>    
                    <div class="portof-about">    
                        <button class="portof-about-button-resume fb-45 flex flex-center mg-bottom-20 pd-10 rd-square">    
                            View Resume    
                        </button>    
                        <div class="portof-about-group">    
                            <div class="portof-about-single flex mg-bottom-8">    
                                <i class="bx bxs-map mg-right-8"></i> Indonesian    
                            </div>    
                            <div class="portof-about-single flex mg-bottom-8">    
                                <i class="bx bxs-phone mg-right-8"></i> +62 8583 9211 030    
                            </div>    
                            <div class="portof-about-single flex">    
                                <i class="bx bx-mail-send mg-right-8"></i> ari160824@gmail.com     
                            </div>    
                        </div>    
                    </div>    
                </div>    
                <div class="portof-section content">    
                    <PortofolioTabs />    
                    <div class="portof-super">    
                        <div class="portof-bantle flex flex-center">    
                            <h1 class="portof-title">Abouts</h1>    
                        </div>    
                        <div class="portof-single rd-square" id="abouts">    
                            <p class="portof-parap">    
                                Hello, my name is Ari Setiawan.    
                                I am a Junior Backend Programmer from Indonesia who happened to be passing by.    
                                I am currently studying at the Software Engineering Vocational High School.    
                                I prefer to work alone but I can also work in a team.    
                            </p>    
                        </div>    
                        <div class="portof-bantle flex flex-center">    
                            <h1 class="portof-title">Projects</h1>    
                        </div>    
                        <div class="portof-single rd-square" id="projects">    
                            <p class="portof-parap">    
                                I've been studying programming for over 2 years, and here are some of the projects I've created and are still developing.    
                                Every project is open source anyone can use it or contribute.    
                            </p>    
                            <div class="portof-project project-super dp-grid">    
                                <div class="project-single rd-square" v-for="project in projects">    
                                    <Avatar :options="{     
                                        src: project.include.icon.icon,     
                                        alt: project.name,     
                                        title: project.name,     
                                        route: project.path,    
                                        inject: 'project-avatar' }" />    
                                    <div class="project-deeper">    
                                        <p class="project-title flex flex-left">    
                                            <Avatar :options="{    
                                                src: language[project.include.configs.language].Banner,    
                                                alt: project.include.configs.language,    
                                                title: project.include.configs.language,    
                                                inject: 'project-language' }" />    
                                            <router-link :to="{ path: project.path }">    
                                                {{ project.include.configs.name }}    
                                            </router-link>    
                                        </p>    
                                        <p class="project-title flex flex-left">    
                                            <i class="bx bxs-star"></i>    
                                            {{ project.include.configs.stargazers_count }} Stars    
                                        </p>    
                                        <p class="project-title flex flex-left">    
                                            <i class="bx bx-code-alt"></i>    
                                            {{ project.include.configs.language }} Language    
                                        </p>    
                                        <p class="project-parap description">    
                                            {{ project.include.configs.description }}    
                                        </p>    
                                    </div>    
                                </div>    
                            </div>    
                        </div>    
                        <div class="portof-bantle flex flex-center">    
                            <h1 class="portof-title">Experience</h1>    
                        </div>    
                        <div class="portof-single rd-square" id="experience">    
                            <p class="portof-parap">    
                                Apart from that, I have also done or have experience doing Industrial Work Practices at    
                                <a href="https://www.darmajaya.ac.id/" target="_blank" rel="noopener noreferrer">The Darmajaya Institute of Informatics and Business</a> Bandar Lampung in the Campus Computer Lab section for 4 months.    
                            </p>    
                        </div>    
                        <div class="portof-bantle flex flex-center">    
                            <h1 class="portof-title">Certificate</h1>    
                        </div>    
                        <div class="portof-single rd-square" id="experience">    
                            <p class="portof-parap">    
                                // ...    
                            </p>    
                        </div>    
                    </div>    
                </div>    
            </div>    
        `,    
        components: {    
            Avatar: $Avatar,    
            PortofolioTabs: {    
                computed: {    
                    binding: function()    
                    {    
                        return({    
                            mounted: function()    
                            {    
                                this.$refs.portofTab.scrollLeft = $Scroll.left;    
                            },    
                            methods: {    
                                    
                                /*    
                                 * Save left scroll value.    
                                 *    
                                 * @params Event $e    
                                 *    
                                 * @return Number    
                                 */    
                                scroll: e => $Scroll.left = e.target.scrollLeft    
                            },    
                            template: this.create()    
                        });    
                    }    
                },    
                methods: {    
                        
                    /*    
                     * Create raw template component    
                     *    
                     * @return String    
                     */    
                    create: function()    
                    {    
                        // Parent tab     
                        var stack = "";    
                            stack += "<div class=\"portof-tab flex flex-left\" ref=\"portofTab\" @scroll=\"scroll\">";    
                                stack += "{}";    
                            stack += "</div>";    
                            
                        return( $f( stack, this.iterate( $Routes ) ) );    
                    },    
                        
                    /*    
                     * Iterate all routes.    
                     *    
                     * @params Array $tabs    
                     *    
                     * @return String    
                     */    
                    iterate: function( tabs )    
                    {    
                        // Tab stack.    
                        var stack = "";    
                            
                        for( let i in tabs )    
                        {    
                            // Get route option.    
                            var tab = tabs[i];    
                                
                            if( tab.name !== "error" )    
                            {    
                                // Building single tab.    
                                stack += "<router-link class=\"portof-tab-link\" to=\"{}\">";    
                                    stack += "<div class=\"portof-tab-single flex flex-center fb-45 fc-0m\">";    
                                        stack += "<i class=\"portof-tab-icon {} mg-right-14\"></i>";    
                                        stack += "{}";    
                                    stack += "</div>";    
                                stack += "</router-link>";    
                                    
                                // Format stack value.    
                                stack = $f( stack,     
                                    tab.path,    
                                    tab.include.icon.icon,    
                                    tab.name.charAt( 0 ).toUpperCase() + tab.name.slice( 1 )    
                                );    
                            }    
                        }    
                            
                        return( stack );    
                    }    
                },    
                template: `<component v-bind:is="binding"></component>`    
            }    
        }    
    };    
        
        
    /*    
     * Projects configurations.    
     *    
     * @values Object    
     */    
    const $Projects = {    
            
        request: {    
            response: null,    
            headers: {}    
        },    
            
        /*    
         * Check if project is exists.    
         *    
         * @params String $name    
         *    
         * @return Boolean    
         */    
        exists: function( name )    
        {    
            // Check if variable $Routes is defined.    
            if( $Is( $Routes, Array ) )    
            {    
                for( let route in $Routes )    
                {    
                    // Check if route path is project.    
                    if( $Routes[route].path === "/projects" )    
                    {    
                        for( let child in $Routes[route].children )    
                        {    
                            // If project name is same.    
                            if( $Routes[route].children[child].name === name )    
                            {    
                                return( true );    
                            }    
                        }    
                    }    
                }    
            }    
            return( false );    
        },    
            
        /*    
         * Select all route project.    
         *    
         * @return Array    
         */    
        select: function()    
        {    
            // Check if variable $Routes is defined.    
            if( $Is( $Routes, Array ) )    
            {    
                for( let i in $Routes )    
                {    
                    // Check if route path is project.    
                    if( $Routes[i].path === "/projects" )    
                    {    
                        // Mapping all project page routes.    
                        return( $Routes[i].children.map( route =>    
                        {    
                            // ...    
                            route.path = $f( "/projects/{}", route.path.replace( /^\/projects\//i, "" ) );    
                                
                            return( route );    
                        }));    
                    }    
                }    
            }    
        },    
            
        updated: false,    
            
        /*    
         * Update route project.    
         *    
         * @params String $name    
         * @params Object $repos    
         *    
         * @return Void    
         */    
        update: function( name, repos )    
        {    
            // Check if variable $Routes is defined.    
            if( $Is( $Routes, Array ) )    
            {    
                // Parent route iteration.    
                var i = 0;    
                    
                // Mapping routes.    
                $Routes.forEach( route =>    
                {    
                    // Check if route path is project.    
                    if( route.path === "/projects" )    
                    {    
                        // Children route iteration.    
                        var u = 0;    
                            
                        // Mapping children projects.    
                        route.children.forEach( child =>    
                        {    
                            // If project name is same.    
                            if( child.name === name )    
                            {    
                                $Routes[i].children[u].include.icon = {    
                                    icon: $Image.projects[name],    
                                    type: "image"    
                                };    
                                $Routes[i].children[u].include.configs = repos;    
                            }    
                            u++;    
                        });    
                    }    
                    i++;    
                });    
            }    
        }    
    };    
        
    /*    
     * Project component.    
     *    
     */    
    const $Project = {    
        data: () => ({    
            language: {},    
            projects: false    
        }),    
        mounted: function()    
        {    
            // Copy all programming language images.    
            this.language = $Image.language;    
                
            // Copy all project page routes.    
            this.projects = $Projects.select();    
                
            console.clear();    
            console.info( $JSON.encode( this.projects, null, 4 ) );    
        },    
        template: `    
            <div class="project">    
                <div class="project-display" v-if="( $route.path === '/projects' )">    
                    <div class="portof-bantle flex flex-center">    
                        <h1 class="portof-title">Projects</h1>    
                    </div>    
                    <div class="project-wrapper">    
                        <div class="project-about">    
                            I've been studying programming for over 2 years, and here are some of the projects I've created and are still developing.    
                            Every project is open source anyone can use it or contribute.    
                        </div>    
                        <div class="project-super dp-grid">    
                            <div class="project-single rd-square" v-for="project in projects">    
                                <Avatar :options="{     
                                    src: project.include.icon.icon,     
                                    alt: project.name,     
                                    title: project.name,     
                                    route: project.path,    
                                    inject: 'project-avatar' }" />    
                                <div class="project-deeper">    
                                    <p class="project-title flex flex-left">    
                                        <Avatar :options="{    
                                            src: language[project.include.configs.language].Banner,    
                                            alt: project.include.configs.language,    
                                            title: project.include.configs.language,    
                                            inject: 'project-language' }" />    
                                        <router-link :to="{ path: project.path }">    
                                            {{ project.include.configs.name }}    
                                        </router-link>    
                                    </p>    
                                    <p class="project-title flex flex-left">    
                                        <i class="bx bxs-star"></i>    
                                        {{ project.include.configs.stargazers_count }} Stars    
                                    </p>    
                                    <p class="project-title flex flex-left">    
                                        <i class="bx bx-code-alt"></i>    
                                        {{ project.include.configs.language }} Language    
                                    </p>    
                                    <p class="project-parap description">    
                                        {{ project.include.configs.description }}    
                                    </p>    
                                </div>    
                            </div>    
                        </div>    
                    </div>    
                </div>    
                <div class="project-view" v-else>    
                    <router-view />    
                </div>    
            </div>    
        `,    
        components: {    
            Avatar: $Avatar    
        }    
    };    
        
    const $Home = {    
        data: () => ({    
            banner: {    
                src: $Image.home.Banner,    
                title: "Home Banner",    
                alt: "Welcome to the board!"    
            }    
        }),    
        mounted: function()    
        {    
            // ....    
        },    
        methods: {},    
        components: {    
            Avatar: $Avatar    
        },    
        template: `    
            <div class="home">    
                <div class="home-banner flex flex-left">    
                    <div class="home-banner-image flex flex-center">    
                        <Avatar :options="banner" />    
                    </div>    
                    <div class="home-banner-content flex flex-center">    
                        <div class="home-banner-block">    
                            <div class="group">    
                                <h6 class="title">Welcome to,</h6>    
                                <h1 class="title fb-55">hxAri</h1>    
                            </div>    
                            <div class="group">    
                                <p class="text">    
                                    This site is a documentation site for every open source project I have uploaded or published on Github, as well as a Portfolio for myself.    
                                    Thank you for taking your time to visit this page.    
                                </p>    
                                <p class="text mg-top-20">    
                                    Have a nice your live!    
                                </p>    
                            </div>    
                        </div>    
                    </div>    
                </div>    
            </div>    
        `    
    };    
    
    
    // The router instance.
    const $Router = $Bash.prototype.router = VueRouter.createRouter({
        
        // Router history mode.
        history: VueRouter.createWebHistory(),
        
        // Define some routes.
        // Each route should map to a component.
        routes: $Routes = [
            {
                path: "/",
                name: "home",
                include: {
                    icon: {
                        icon: "bx bx-home"
                    },
                    footer: {
                        slot: "Home"
                    }
                },
                component: $Home
            },
            {
                path: "/about",
                name: "about",
                include: {
                    icon: {
                        icon: "bx bx-info-circle"
                    },
                    footer: {
                        slot: "About"
                    }
                },
                component: {}
            },
            {
                path: "/portofolio",
                name: "portofolio",
                include: {
                    icon: {
                        icon: "bx bx-user"
                    }
                },
                children: [{
                    path: "certificate",
                    name: "Certificate",
                    include: {
                        icon: {
                            icon: "bx bx-check-double"
                        }
                    },
                    children: [],
                    component: {
                        template: `
                            <div class="">
                                Certificate
                            </div>
                        `
                    }
                }],
                component: $Portofolio
            },
            {
                path: "/projects",
                name: "projects",
                include: {
                    icon: {
                        icon: "bx bx-code-alt"
                    }
                },
                children: [
                    {
                        path: "kanashi",
                        name: "Kanashi",
                        include: {
                            configs: {}
                        },
                        children: [],
                        component: {
                            template: `
                                <div class="">
                                    Kanashi
                                </div>
                            `
                        }
                    },
                    {
                        path: "tree",
                        name: "Tree",
                        include: {
                            configs: {}
                        },
                        children: [],
                        component: {
                            template: `
                                <div class="">
                                    Tree
                                </div>
                            `
                        }
                    },
                    {
                        path: "yume",
                        name: "Yume",
                        include: {
                            configs: {}
                        },
                        children: [],
                        component: {
                            template: `
                                <div class="">
                                    Yume
                                </div>
                            `
                        }
                    }
                ],
                component: $Project
            },
            {
                path: "/terminal",
                name: "terminal",
                include: {
                    icon: {
                        icon: "bx bx-terminal"
                    }
                },
                component: $Terminal
            },
            {
                path: "/donation",
                name: "donation",
                include: {
                    icon: {
                        icon: "bx bx-dollar"
                    }
                },
                component: {}
            },
            {
                path: "/contact",
                name: "contact",
                include: {
                    icon: {
                        icon: "bx bx-phone"
                    },
                    footer: {
                        slot: "Contact"
                    }
                },
                component: $Contact
            },
            {
                path: "/privacy",
                name: "privacy",
                include: {
                    icon: {
                        icon: "bx bx-lock"
                    },
                    footer: {
                        slot: "Privacy"
                    }
                },
                component: {}
            },
            {
                path: "/sitemap",
                name: "sitemap",
                include: {
                    icon: {
                        icon: "bx bx-link"
                    },
                    footer: {
                        slot: "Sitemap"
                    }
                },
                component: {}
            },
            {
                path: "/:e(.*)*",
                name: "error",
                include: {},
                component: {
                    template: `
                        <div class="error">
                            <Loaderr>
                                No such file or directory <b>{{ $route.path }}</b>
                            </Loaderr>
                        </div>
                    `,
                    components: {
                        Loaderr: $Loaderr
                    }
                }
            }
        ]
        
    });
    
    // The application instance.
    const $Object = Vue.createApp({
        data: () => ({
            date: new $Date().format( "2021 - %Y" ),
            error: false,
            theme: $Theme.prototype.get(),
            footer: [],
            medsos: $Medsos,
            routes: $Routes,
            results: null,
            loading: true
        }),
        mounted: async function()
        {
            // Copy self.
            var self = this;
            
            // Iteration start.
            var i = 0;
            
            // Map all parent routes.
            self.routes.forEach( route =>
            {
                if( $Is( route.include, Object ) )
                {
                    // Check if route is footer.
                    if( $Is( route.include.footer, Object ) )
                    {
                        // Push footer route.
                        self.footer.push({
                            path: route.path,
                            slot: route.include.footer.slot
                        });
                    }
                }
            });
            
            // Check if the previous request response is still there.
            if( $Is( $Projects.request.results, Object ) === false )
            {
                // Getting all projects.
                await $Request( "GET", "https://api.github.com/users/hxAri/repos" )
                    
                    .then( xhr =>
                    {
                        // Decode response json from api.
                        $Projects.request.results = $JSON.decode( xhr.response );
                    })
                    .catch( xhr =>
                    {
                        self.error = true;
                    });
                
            }
            
            // Mapping loaded projects.
            $Projects.request.results.forEach( project =>
            {
                // ...
                if( $Projects.exists( project.name ) )
                {
                    $Projects.update( project.name, project );
                }
                i++;
            });
            
            // Disable loading page.
            self.loading = false;
        },
        methods: {
            
            /*
             * Show/ hidden navbar menu.
             *
             * @return Void
             */
            buttonBurgerHandle: function()
            {
                if( this.$refs.burger.className !== "button burger" )
                {
                    this.$refs.burger.className = "button burger";
                    this.$refs.navbar.className = "navbar";
                    this.$refs.navbarMain.className = "navbar navbar-main";
                } else {
                    this.$refs.burger.className = "button burger burger-active";
                    this.$refs.navbar.className = "navbar navbar-active";
                    this.$refs.navbarMain.className = "navbar navbar-main navbar-active";
                }
            },
            
            /*
             * Switch theme color.
             *
             * @return Void
             */
            buttonSwitchTheme: function()
            {
                $Theme.prototype.set( this.theme = this.theme !== "dark" ? "dark" : "light" );
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
                        <button class="button burger" ref="burger" @click="buttonBurgerHandle" v-if="( loading === false )">
                            <span class="burger-line"></span>
                            <span class="burger-line"></span>
                            <span class="burger-line"></span>
                        </button>
                    </div>
                </div>
                <div class="breakr"></div>
                <div class="groups" v-if="( $route.path !== '/terminal' && loading === false )">
                    <div class="banner">
                        <div class="album"></div>
                        <div class="cover"></div>
                    </div>
                </div>
                <div class="parent">
                    <div class="loading flex flex-center pd-24" v-if="( loading !== false )">
                        <div class="animate">
                            <div class="spinner"></div>
                        </div>
                    </div>
                    <Loaderr v-if="( error !== false )">
                        UPS! Sorry, failed to load content.
                    </Loaderr>
                    <div class="navbar" ref="navbar" v-if="( loading === false )">
                        <div class="navbar-exit" @click="buttonBurgerHandle"></div>
                        <div class="navbar navbar-main" ref="navbarMain">
                            <div class="navbar-header flex flex-left">
                                <h5 class="navbar-title mg-0">
                                    <router-link to="/">
                                        hxAri
                                    </router-link>
                                </h5>
                                <button class="navbar-switch" @click="buttonSwitchTheme">
                                    <i class="bx bx-sun" v-if="( theme === 'dark' )"></i>
                                    <i class="bx bx-moon" v-else></i>
                                </button>
                            </div>
                            <div class="list-group">
                                <Iterator :lists="routes" />
                            </div>
                        </div>
                    </div>
                    <router-view v-if="( loading === false && error === false )"/>
                </div>
                <div class="footer flex flex-center">
                    <div class="footer-wrapper">
                        <div class="footer-content dp-flex">
                            <div class="footer-group pd-14">
                                <h5 class="mg-bottom-8">Pages</h5>
                                <p class="fc-1m">Some important pages.</p>
                                <li class="li dp-inline-block mg-right-10" v-for="route in footer">
                                    <router-link :to="{ path: route.path }" class="fs-14">{{ route.slot }}</router-link>
                                </li>
                            </div>
                            <div class="footer-group pd-14">
                                <h5 class="mg-bottom-8">Follow Me</h5>
                                <p class="">Stay connected with me.</p>
                                <li class="li dp-inline-block mg-right-10" v-for="i in medsos">
                                    <a :href="i.link" target="_blank" rel="noopener noreferrer">
                                        <i :class="i.icon"></i>
                                    </a>
                                </li>
                            </div>
                        </div>
                        <div class="footer-single">
                            <p class="">&copy hxAri {{ date }}</p>
                        </div>
                    </div>
                </div>
            </div>
        `,
        components: {
            Loaderr: $Loaderr,
            Iterator: $Iterator
        }
    });
    
    // Install the object instance as a plugin.
    $Object.use( $Router );
    
    // Mount element.
    $Object.mount( "#root" );
    
    return {};
}));