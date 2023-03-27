
import { createRouter, createWebHistory } from "vue-router";

// Import Routes.
import Routes from "./routes.js";

// The router instance.
const router = createRouter({
	
	// Router history mode.
	history: createWebHistory(import.meta.env.BASE_URL),
	
	// Define some routes.
	// Each route should map to a component.
	routes: Routes,
	
	/*
	 * Scroll Behavior.
	 *
	 * @params Mixed to
	 * @params Mixed from
	 * @params Mixed save
	 *
	 * @return Mixed
	 */
	scrollBehavior: function( to, from, save )
	{
		// If target has hash.
		if( to.hash )
		{
			return({
				el: to.hash,
				behavior: "smooth"
			});
		}
		else {
			
			// If previous position is available.
			if( save )
			{
				return( save );
			}
		}
		return({
			top: 0,
			behavior: "smooth"
		});
	}
})

export default router;