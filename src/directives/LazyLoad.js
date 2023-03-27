
/*
 * Lazyload directive that loads images lazily.
 *
 */
export default {
	
	/*
	 * The mounted hook.
	 *
	 * @params HTMLElement el
	 *	The element to apply the directive to.
	 */
	mounted: function( el )
	{
		const image = new Image();
		
		image.src = el.dataset.src;
		image.onload = () =>
		{
			el.src = image.src;
			el.classList.add( "lazy-loaded" );
		};
	}
};
