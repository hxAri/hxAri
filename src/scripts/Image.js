
// Import Scripts.
import Fmt from "/src/scripts/Fmt.js"
import Type from "/src/scripts/Type.js"

/**
 * Image Sources
 *
 */
export default {
	
	/**
	 * Image resolver.
	 *
	 * @params Object $config
	 *  The image configuration
	 * @params String image
	 *  The image pathname
	 *
	 * @return String
	 */
	resolver( $config, image ) {
		return Fmt( "{}/{}", process.env.NODE_ENV === "production" ? $config.source : "/public/images/", image );
	},
	
	/**
	 * The image searcher.
	 *
	 * @params Object $config
	 *  The image configuration
	 * @params String type
	 *  The image category typename
	 * @params String keyset
	 *  The image name
	 * 
	 * @return String
	 */
	search( $config, type, keyset ) {
		if( Type( $config.images[type], Object ) ) {
			if( Type( $config.images[type][keyset], String ) ) {
				return this.resolver( $config, Fmt( "{}/{}", type, $config.images[type][keyset] ) );
			}
		}
	}
	
};

