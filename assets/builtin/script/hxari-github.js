const $Github = async function( url )
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
};