
import { createStore } from "vuex";

// Import Scripts
import Fmt from "/src/scripts/Fmt.js";
import Json from "/src/scripts/Json.js";
import Mapper from "/src/scripts/Mapper.js";
import Request from "/src/scripts/Request.js";
import MultiRequest from "/src/scripts/MultiRequest.js";
import Type from "/src/scripts/Type.js";

// Create new Store instance.
export default createStore({
	state: () => ({
		error: false,
		loading: true,
		targets: [
			{
				method: "GET",
				name: "organization",
				url: "https://raw.githubusercontent.com/hxAri/hxAri/main/organizations.json"
			},
			{
				method: "GET",
				name: "projects",
				url: "https://raw.githubusercontent.com/hxAri/hxAri/main/projects.json"
			},
			{
				method: "GET",
				name: "profile",
				url: "https://api.github.com/users/hxAri"
			}
		],
		profile: {},
		requests: [],
		projects: [],
		responses: {},
		organization: []
	}),
	getters: {
		
		/*
		 * Return if the request has been made.
		 *
		 * @params Object state
		 *
		 * @return Boolean
		 */
		requested: state => state.requests.length >= state.targets.length && state.loading === false
	},
	actions: {
		
		/*
		 * Make multiple requests synchronously to all request targets.
		 *
		 * @params Object state, dispatch
		 *
		 * @return Promise
		 */
		requests: async function({ state, dispatch })
		{
			try
			{
				// Create multiple requests.
				await MultiRequest( state.targets )
				
				// Handle all request responses.
				.then( r => Mapper( r,
					
					/*
					 * Mapping request reponses.
					 *
					 * @params Number i
					 * @params XMLHttpRequest request
					 *
					 * @return Void
					 */
					function( i, request )
					{
						// Push request.
						state.requests.push( request );
						
						// Check if somethimg wrong.
						if( request.status !== 200 )
						{
							throw Request.StatusText( request.status );
						}
						
						// Push request responses.
						state.responses[state.targets[i].name] = Json.decode( request.response );
						
						// If request sent is profile.
						if( state.targets[i].name === "profile" )
						{
							// Set profile data.
							state.profile = state.responses.profile;
						}
					}
				))
				
				// Throws back to stop the
				// execution of the next request.
				.catch( e => { throw e; });
				
				// Dispatch project and organization actions.
				await dispatch( "project" );
				await dispatch( "organization" );
			}
			catch( error )
			{
				state.error = Type( error, XMLHttpRequest, () => "No Internet Connection", () => error );
			}
			state.loading = false;
		},
		
		/*
		 * Get all projects info.
		 *
		 * @params Object state
		 *
		 * @return Promise
		 */
		project: async function({ state })
		{
			for( let i in state.responses.projects )
			{
				// Get all organization profile.
				await Request( "GET", Fmt( "https://api.github.com/repos/{}", state.responses.projects[i] ) )
					
				// Handle all request responses.
				.then( request =>
				{
					// Push request.
					state.requests.push( request );
					
					// Check if somethimg wrong.
					if( request.status !== 200 )
					{
						throw Request.StatusText( request.status );
					}
					
					// Decode response.
					var response = Json.decode( request.response );
					
					// Push response.
					state.projects.push(
						state.responses[response.name] = response
					);
				})
				
				// Throws back to stop the
				// execution of the next request.
				.catch( e => { throw e; });
			}
		},
		
		/*
		 * Get all organizations profile info.
		 *
		 * @params Object state
		 *
		 * @return Promise
		 */
		organization: async function({ state })
		{
			for( let u in state.responses.organization )
			{
				// Get organization name.
				var name = state.responses.organization[u];
				
				// Get all organization profile.
				await Request( "GET", Fmt( "https://api.github.com/orgs/{}", name ) )
					
				// Handle all request responses.
				.then( request =>
				{
					// Push request.
					state.requests.push( request );
					
					// Check if somethimg wrong.
					if( request.status !== 200 )
					{
						throw Request.StatusText( request.status );
					}
					state.organization.push( state.responses[name] = Json.decode( request.response ) );
				})
				
				// Throws back to stop the
				// execution of the next request.
				.catch( e => { throw e; });
			}
		}
	},
	mutations: {}
});