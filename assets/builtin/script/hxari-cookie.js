/*
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
};