function hx()
{
    return Object.create({
        theme: function() {
            // .
        },
        toggle: function() {
            document.getElementsByClassName( "sidebar-area" )[0].classList.toggle( "sidebar-show" );
            document.getElementsByClassName( "sidebar-main" )[0].classList.toggle( "sidebar-show" );
        },
        hidden: function( i ) {
            document.getElementsByClassName( "card-hidden" )[i].classList.toggle( "card-show" );
            document.getElementsByClassName( "card-hidden-main" )[i].classList.toggle( "card-show" );
        }
    });
}

// Header avatar onclick.
document.getElementsByClassName( "header-avatar" )[0].onclick = function() { hx().toggle(); };

// Sidebar exit onclick.
document.getElementsByClassName( "sidebar-exit" )[0].onclick = function() { hx().toggle(); };

// Get all elements needed.
var cards = document.getElementsByClassName( "card-area" );
var close = document.getElementsByClassName( "card-hidden-exit" );

for( let i = 0; i < cards.length; i++ ) {
    
    // Single card on click.
    // Show project description.
    cards[i].onclick = function() { hx().hidden( i ); };
    
    // Hidden project description.
    close[i].onclick = function() { hx().hidden( i ); };
}
