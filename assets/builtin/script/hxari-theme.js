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