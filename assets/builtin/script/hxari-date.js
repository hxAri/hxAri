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
