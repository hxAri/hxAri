

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
};