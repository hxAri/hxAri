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