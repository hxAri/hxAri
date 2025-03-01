
import { createStore } from "vuex";

// Import Router
import Router from "/src/routing/router.js";

// Import Scripts
import Common from "/src/scripts/Common.js";
import Cookie from "/src/scripts/Cookie.js";
import Fmt from "/src/scripts/Fmt.js";
import Json from "/src/scripts/Json.js";
import Mapper from "/src/scripts/Mapper.js";
import Request from "/src/scripts/Request.js";
import Requests from "/src/scripts/Requests.js";
import Terminal from  "/src/scripts/shells/Terminal.js";
import Theme from "/src/scripts/Theme.js";
import Type from "/src/scripts/Type.js";
import Value from "/src/scripts/logics/Value.js";

/**
 * Find project by name or endpoint.
 *
 * @param Object state
 * @param String project
 *
 * @return Object|Undefined
 */
function finder( state, project ) {
	
	// Normalize project name.
	project = project.toLowerCase();
	
	// Find project by name.
	for( let i in state.configs.projects ) {
		if( project === state.configs.projects[i].name.toLowerCase() ||
			project === state.configs.projects[i].endpoint.toLowerCase().split( "/" ).pop() ) {
			return state.configs.projects[i];
		}
	}
}

// Create new Stord instance.
export default createStore({
	state: () => ({
		error: false,
		configs: null,
		cookie: new Cookie(),
		documents: {},
		keysets: [
			"profile"
		],
		loading: false,
		organizations: null,
		profile: null,
		projects: {},
		readmes: {},
		routes: Router,
		request: [],
		targets: {
			configs: {
				url: process.env.NODE_ENV === "production" ? "https://raw.githubusercontent.com/hxAri/hxAri/main/config.json" : "/config.json",
				error: false,
				request: null,
				method: "GET",
				handler: configs => {
					if( process.env.NODE_ENV == "development" ) {
						configs.image.source = "/public/images"
					}
					return configs;
				}
			},
			profile: {
				url: process.env.NODE_ENV === "production" ? "https://api.github.com/users/hxAri" : "/github/hxari.json",
				url: "https://api.github.com/users/hxAri",
				error: false,
				request: null,
				method: "GET"
			}
		},
		terminal: new Terminal( null, Router ),
		theme: new Theme(),
		vector: {
			base64: {
				error: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDUwNS43NiA1NDkuMzgiPgo8cG9seWdvbiBmaWxsPSJub25lIiBzdHJva2U9IiM4NDkwZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBwb2ludHM9Ijg2LjgsMTQyIDE0LjIsMTgyLjQgMTUsMTM1LjIgODEuMSw4NCIvPgo8cG9seWdvbiBmaWxsPSJub25lIiBzdHJva2U9IiM4NDkwZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBwb2ludHM9IjcuMSw4LjEgNjIuMSw5NCA4MS4yLDc5LjciLz4KPHBvbHlnb24gZmlsbD0ibm9uZSIgc3Ryb2tlPSIjODQ5MGZmIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgcG9pbnRzPSI4NC4yLDgxLjcgOTAuNywxNDIuMyA3OC45LDMwMS45IDEzNi4yLDI3MS4zIDE2Mi44LDE3Mi45IDEyNC45LDk4LjciLz4KPHBvbHlnb24gZmlsbD0ibm9uZSIgc3Ryb2tlPSIjODQ5MGZmIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgcG9pbnRzPSIxNjksMjUyLjMgMTM5LjYsMjY5LjEgMTY1LjQsMTc0LjMgMjAyLjMsMTc3LjciLz4KPHBvbHlnb24gZmlsbD0ibm9uZSIgc3Ryb2tlPSIjODQ5MGZmIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgcG9pbnRzPSIxNjUuOCwyNTguNyA3OC45LDMwNy43IDExNS45LDMyNi40IDM2LjMsNTQyIDIwMC4zLDM3OS43IDE2OC42LDM4Mi40Ii8+Cjxwb2x5Z29uIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzg0OTBmZiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHBvaW50cz0iMTc0LjQsMzc3LjggMTg5LjksMzYzIDIwMS43LDM3NS44Ii8+Cjxwb2x5Z29uIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzg0OTBmZiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHBvaW50cz0iMTY5LjksMjU5LjMgMTcyLjQsMzc0IDIyMS4yLDMyOS4zIi8+Cjxwb2x5Z29uIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzg0OTBmZiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHBvaW50cz0iMTcxLjQsMjU1LjUgMjA0LjQsMjI3LjUgMjIxLjIsMzIzLjgiLz4KPHBvbHlnb24gZmlsbD0ibm9uZSIgc3Ryb2tlPSIjODQ5MGZmIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgcG9pbnRzPSIyMDcuOSwyMjkgMjIxLjcsMzAzLjkgMjU1LjIsMjc5LjUiLz4KPHBvbHlnb24gZmlsbD0ibm9uZSIgc3Ryb2tlPSIjODQ5MGZmIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgcG9pbnRzPSIyMjIuNCwzMDcuNSAyMjYuMiwzMjkuMyAxOTMuMiwzNjAuMyAxOTYuNiwzNjQgMjM0LjcsMzM2LjggMzYzLjQsMzI5LjkgMjQ4LjIsMjY2LjUgMjYwLjQsMjc5LjgiLz4KPHBvbHlnb24gZmlsbD0ibm9uZSIgc3Ryb2tlPSIjODQ5MGZmIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgcG9pbnRzPSIxOTguMywzNjYgMjA1LjIsMzc0LjMgMzUyLjQsMzMzLjcgMjM1LjksMzM5LjgiLz4KPHBvbHlnb24gZmlsbD0ibm9uZSIgc3Ryb2tlPSIjODQ5MGZmIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgcG9pbnRzPSIyMjYuMiwyNDMuOCAyNDAuOSwyNTkuMyAzNjMuNCwzMjYuOSAyNDguNywyMzQiLz4KPHBvbHlnb24gZmlsbD0ibm9uZSIgc3Ryb2tlPSIjODQ5MGZmIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgcG9pbnRzPSIyNzkuMSwyNTQuNSAzNTkuNCwzMjAuMyAzMTIuNywyNTQuNSIvPgo8cG9seWdvbiBmaWxsPSJub25lIiBzdHJva2U9IiM4NDkwZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBwb2ludHM9IjMxNi45LDI1NC41IDM3MS42LDMzMi40IDI3MC45LDM1OS43IDMxMC4zLDQxNy43IDM4My42LDQwMi40IDM3Ny42LDM1NC40IDUwMC45LDM5OCAzNzAuNiwyNjIuNyIvPgo8cG9seWdvbiBmaWxsPSJub25lIiBzdHJva2U9IiM4NDkwZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBwb2ludHM9IjMxNi42LDQxOS43IDM5OC4zLDU0MiAzODIuMyw0MDYuNCIvPgo8L3N2Zz4="
			}
		}
	}),
	getters: {
		
		/**
		 * Return if config has requested.
		 *
		 * @param Object state
		 *
		 * @return Boolean
		 */
		hasConfig: state => {
			if( Type( state.configs, Object ) &&
				Type( state.targets.configs.request, XMLHttpRequest ) ) {
					return state.targets.configs.error === false;
			}
			return Type( state.configs, Object ) && state.targets.configs.error === false;
		},
		
		/**
		 * Return if profile has requested.
		 *
		 * @param Object state
		 *
		 * @return Boolean
		 */
		hasProfile: state => {
			if( Type( state.profile, Object ) &&
				Type( state.targets.profile.request, XMLHttpRequest ) ) {
				return state.targets.profile.error === false;
			}
			return Type( state.profile, Object ) && state.targets.profile.error === false;
		},
		
		/**
		 * Return if organization has requested.
		 *
		 * @param Object state
		 *
		 * @return Boolean
		 */
		hasOrganization: state => Type( state.organizations, Array ) && Value.isNotEmpty( state.organizations )
		
	},
	actions: {
		
		/**
		 * Get project json documentation.
		 *
		 * @param Object state
		 * @param Object|String project
		 *
		 * @return Promise
		 */
		document: async function({ state }, project ) {
			
			// Check if project name is String type.
			if( Type( project, String ) ) {
				if( project = finder( state, project ) ) {
					return await dispatch( "project", project );
				}
				return;
			}
			
			// If project document has requested previously.
			if( Type( state.documents[project.endpoint ? project.endpoint : project.name], Object ) ) return;
			
			// If project is on request.
			if( project.loading ) await project.loading;
			if( project.document_loading ) return;
			
			// Reset error info.
			project.document_error = false;
			
			// Enable loading request.
			// And trying get project info.
			project.document_loading = Request( "GET", Fmt( "{}/{}", process.env.NODE_ENV === "production" ? "https://raw.githubusercontent.com/hxAri/hxAri/main/public/globals/docs" : "", project.document_url ) );
			
			// Awaiting request.
			await project.document_loading 
				
				// Handle request response.
				.then( request => {
					
					// Save previous response.
					state.documents[project.endpoint ? project.endpoint : project.name] = request.response;
					
					// Parse request response.
					state.documents[project.endpoint ? project.endpoint : project.name] = Json.decode( request.response );
				})
				
				// Set error occured on project.
				.catch( e => { project.document_error = e; } );
			
			// Disable loading request.
			project.document_loading = false;
		},
		
		/**
		 * Initialize before sent request.
		 *
		 * @param Object state, dispatch, getters, commit
		 *
		 * @return Promise
		 */
		initialize: async function({ state, dispatch, getters, commit }) {
			for( let i in state.keysets ) {
				var keyset = Fmt( "\x78\x7b\x7d", Common.bin2hex( state.keysets[i] ) );
				var value = state.cookie.get( keyset );
				if( Value.isNotEmpty( value ) ) {
					try {
						var decoded = atob( value );
							value = decoded;
					}
					catch( e ) {
					}
					switch( state.keysets[i] ) {
						case "profile":
							state.profile = Json.decode( value );
							state.targets.profile.response = value;
							break;
					}
				}
			}
			await dispatch( "priority" );
		},
		
		/**
		 * Get all organization informations.
		 *
		 * @param Object state, dispatch, getters, commit })
		 *
		 * @return Promise
		 */
		organization: async function({ state, dispatch, getters, commit }) {
			
			var url = process.env.NODE_ENV === "production" ? "https://api.github.com/orgs/{}" : "/github/{}.json";
			var cookie = Fmt( "\x78\x7b\x7d", Common.bin2hex( "organizations" ) );
			var values = state.cookie.get( cookie );
			var organizations = [];
			
			// Check if priority requests does not made.
			if( getters.hasConfig === false && state.loading === false ) {
				await dispatch( "priority" );
			}
			
			// Check if something wrongs.
			if( state.error || state.loading ) {
				return;
			}
			
			if( Value.isNotEmpty( values ) ) {
				try {
					try {
						var decoded = atob( values );
							values = decoded;
					}
					catch( e ) {
					}
					values = Json.decode( values );
					if( Type( values, Array ) && Value.isNotEmpty( values ) ) {
						for( let organization of values ) {
							if( state.configs.organizations.indexOf( organization.login ) >= 0 ) {
								commit( "organization", organization );
								organizations.push( organization.login );
							}
						}
					}
				}
				catch( e ) {
				}
			}
			
			for( let u in state.configs.organizations ) {
				if( organizations.indexOf( state.configs.organizations[u] ) >= 0 ) {
					continue;
				}
				await Request( "GET", Fmt( url, state.configs.organizations[u] ) )
					
					// Handle request response.
					.then( request => commit( "organization", request.response ) )
					
					// Stop the next request execution.
					.catch( e => { state.configs.organizations[u] = e; } );
				
				// If request succesfull created.
				if( Type( state.configs.organizations[u], String ) ) {
					try {
						state.cookie.set( cookie, btoa( Json.encode( state.organizations ) ), { expires: 1, path: "/" } );
					}
					catch( e ) {
					}
					continue;
				}
				break;
			}
		},
		
		/**
		 * Get profile and configuration application.
		 *
		 * @param Object state, getters
		 *
		 * @return Promise
		 */
		priority: async function({ state, getters }) {
			try {
				
				// Remove previous error.
				state.error = false;
				
				// Enable loading request.
				state.loading = true;
				
				var keys = [];
				var targets = [];
				
				for( let target of Object.keys( state.targets ) ) {
					var getter = Fmt( "has{}{}", target.charAt( 0 ).toUpperCase(), target.slice( 1 ) );
					if( getters[getter] ) {
						continue;
					}
					keys.push( target );
					targets.push( state.targets[target] );
				}
				
				// Create multiple requests.
				await Requests( targets )
				
				// Handle all request responses.
				.then( r => Mapper( r,
					
					/**
					 * Mapping request reponses.
					 *
					 * @param Number i
					 * @param XMLHttpRequest request
					 *
					 * @return Void
					 */
					function( i, request ) {
						
						// Parse request response and update
						// state data based on key iteration.
						state[keys[i]] = Json.decode( request.response );
						
						// Update priority targets by key iteration.
						state.targets[keys[i]].error = false;
						state.targets[keys[i]].request = request;
						state.targets[keys[i]].response = request.response;
						
						// Check if request target has interceptor for handle response.
						if( Type( state.targets[keys[i]].handler, "handler" ) ) {
							state[keys[i]] = state.targets[keys[i]].handler( state[keys[i]] );
						}
						
						// Save request response into cookies.
						if( state.keysets.indexOf( keys[i] ) >= 0 ) {
							try {
								state.cookie.set( Fmt( "x{}", Common.bin2hex( keys[i] ) ), btoa( Json.encode( state[keys[i]] ) ), { expires: 1, path: "/" } );
							}
							catch( e ) {
								try {
									state.cookie.set( Fmt( "x{}", Common.bin2hex( keys[i] ) ), Json.encode( state[keys[i]] ), { expires: 1, path: "/" } );
								}
								catch( e ) {
								}
							}
						}
					}
				))
				
				// Throws back to stop the
				// execution of the next request.
				.catch( e => { throw e; });
			}
			catch( error ) {
				state.error = error;
			}
			state.loading = false;
		},
		
		/**
		 * Get project informations.
		 *
		 * @param Object state, dispatch
		 * @param String project
		 *
		 * @return Promise
		 */
		project: async function({ state, dispatch }, project ) {
			
			// Check if project name is String type.
			if( Type( project, String ) ) {
				if( project = finder( state, project ) ) {
					return await dispatch( "project", project );
				}
				return;
			}
			
			// If project has requested previously.
			if( Type( state.projects[project.endpoint ? project.endpoint : project.name], Object ) ) return;
			
			// If project is on request.
			if( project.loading ) return;
			
			project.error = false;
			project.handler = [
				request => state.projects[project.endpoint ? project.endpoint : project.name] = Json.decode( request.response ),
				request => state.readmes[project.endpoint ? project.endpoint : project.name] = request.response
			];
			
			// If project has readme file documentation.
			if( Type( project.readme_url, String ) ) {
				project.loading = Requests([ Fmt( "https://api.github.com/repos/{}", project.endpoint ? project.endpoint : project.name ), project.readme_url ]);
				await project.loading
					.then( r => Mapper( r, ( i, request ) => project.handler[i]( request ) ) )
					.catch( e => { project.error = e; } )
					.finally( () => { project.loading = false; } );
			}
			else {
				project.loading = Request( "GET", Fmt( "https://api.github.com/repos/{}", project.endpoint ? project.endpoint : project.name ) );
				await project.loading
					.then( request => state.projects[project.endpoint ? project.endpoint : project.name] = Json.decode( request.response ) )
					.catch( e => { project.error = e; } )
					.finally( () => { project.loading = false; } );
			}
		}
	},
	mutations: {
		
		/**
		 * Organization mutation.
		 *
		 * @param Object state
		 * @param Object|String organization
		 *  Parsed json organization from API.
		 *
		 * @return Void
		 */
		organization: function( state, organization ) {
			
			// Change organizations as Array.
			if( Type( state.organizations, Array ) === false ) state.organizations = [];
			
			// Parse request response.
			if( Type( organization, String ) ) {
				organization = Json.decode( organization );
			}
			state.organizations.push( organization );
		}
	}
	
});
