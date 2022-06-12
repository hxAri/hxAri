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