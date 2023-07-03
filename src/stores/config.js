
import { createStore } from "vuex";

// Import Scripts
import Fmt from "/src/scripts/Fmt.js";
import Json from "/src/scripts/Json.js";
import Mapper from "/src/scripts/Mapper.js";
import Request from "/src/scripts/Request.js";
import MultiRequest from "/src/scripts/MultiRequest.js";
import Type from "/src/scripts/Type.js";

// Create new Stord instance.
export default createStore({
	state: () => ({
		error: false,
		configs: null,
		profile: null,
		loading: false,
		request: [],
		targets: {
			configs: {
				error: false,
				request: null,
				method: "GET",
				url: "/config.json"//"https://raw.githubusercontent.com/hxAri/hxAri/main/config.json"
			},
			profile: {
				error: false,
				request: null,
				method: "GET",
				url: "https://api.github.com/users/hxAri"
			}
		},
		projects: {},
		organizations: null
	}),
	getters: {
		
		/*
		 * Return if config has requested.
		 *
		 * @params Object state
		 *
		 * @return Boolean
		 */
		hasConfig: state =>
		{
			return Type( state.configs, Object ) &&
				   Type( state.targets.configs.request, XMLHttpRequest ) &&
				   		 state.targets.configs.error === false;
		},
		
		/*
		 * Return if profile has requested.
		 *
		 * @params Object state
		 *
		 * @return Boolean
		 */
		hasProfile: state =>
		{
			return Type( state.profile, Object ) &&
				   Type( state.targets.profile.request, XMLHttpRequest ) &&
				   		 state.targets.profile.error === false;
		},
		
		/*
		 * Return if organization has requested.
		 *
		 * @params Object state
		 *
		 * @return Boolean
		 */
		hasOrganization: state => Type( state.organizations, Array )
		
	},
	actions: {
		
		/*
		 * Get profile and configuration application.
		 *
		 * @params Object state, dispatch
		 *
		 * @return Promise
		 */
		priority: async function({ state, dispatch })
		{
			try
			{
				// Remove previous error.
				state.error = false;
				
				// Enable loading request.
				state.loading = true;
				
				// Get object keys.
				var keys = Object.keys( state.targets );
				
				// Create multiple requests.
				await MultiRequest( Object.values( state.targets ) )
				
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
						// Parse request response and update
						// state data based on key iteration.
						state[keys[i]] = Json.decode( request.response );
						
						// Update priority targets by key iteration.
						state.targets[keys[i]].error = false;
						state.targets[keys[i]].request = request;
						state.targets[keys[i]].response = request.response;
					}
				))
				
				// Throws back to stop the
				// execution of the next request.
				.catch( e => { throw e; });
			}
			catch( error )
			{
				// Set throwned error.
				state.error = error;
			}
			
			// Disable loading.
			state.loading = false;
		},
		
		/*
		 * Get all project informations.
		 *
		 * @params Object state, dispatch
		 * @params String project
		 *
		 * @return Promise
		 */
		project: async function({ state, dispatch }, project )
		{
			// Check if project name is String type.
			if( Type( project, String ) )
			{
				// Find project by name.
				for( let i in state.configs.projects )
				{
					// Check if project name is Valid.
					if( project === state.configs.projects[i].name )
					{
						project = state.configs.projects[i];
					}
					
					// Break the request project when project does not Found.
					if( i +1 === state.configs.projects.length )
					{
						return;
					}
				}
			}
			
			// If project has requested previously.
			if( Type( state.projects[project.endpoint ? project.endpoint : project.name], Object ) ) return;
			
			// Enable loading request.
			project.loading = true;
			
			// Trying get project info.
			await Request( "GET", Fmt( "https://api.github.com/repos/{}", project.endpoint ? project.endpoint : project.name ) )
				
				// Handle request response.
				.then( request =>
				{
					// Parse request response.
					state.projects[project.endpoint ? project.endpoint : project.name] = Json.decode( request.response );
				})
				
				// Set error occured on project.
				.catch( e => { project.error = e; } );
			
			// Disable loading request.
			project.loading = false;
		},
		
		/*
		 * Get all organization informations.
		 *
		 * @params Object state, dispatch
		 *
		 * @return Promise
		 */
		organization: async function({ state, dispatch, getters, commit })
		{
			// Check if priority requests does not made.
			if( getters.hasConfig === false &&
				state.loading === false )
			{
				// Dispatch priority requests.
				await dispatch( "priority" );
			}
			
			// Check if something wrongs.
			if( state.error ||
				state.loading )
			{
				return;
			}
			for( let u in state.configs.organizations )
			{
				// Get all organization profile.
				await Request( "GET", Fmt( "https://api.github.com/orgs/{}", state.configs.organizations[u] ) )
						
					// Handle request response.
					.then( request => commit( "organization", request.response ) )
					
					// Stop the next request execution.
					.catch( e => { state.configs.organizations[u] = e; } );
				
				// If request succesfull created.
				if( Type( state.configs.organizations[u], String ) )
				{
					continue;
				}
				break;
			}
		}
	},
	
	mutations: {
		
		project: function({ state }, project )
		{},
		
		organization: function( state, organization )
		{
			// Change organizations as Array.
			if( Type( state.organizations, Array ) === false ) state.organizations = [];
			
			// Parse request response.
			if( Type( organization, String ) ) organization = Json.decode( organization );
			
			// Push organization.
			state.organizations.push( organization );
		}
	}
	
});
