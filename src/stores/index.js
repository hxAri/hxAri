
/**
 * 
 * hxAri | index.js
 * 
 * @author hxAri
 * @github https://github.com/hxAri/hxAri
 * @license MIT
 * 
 * Copyright (c) 2022 Ari Setiawan | hxAri
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 */

import { createStore } from "vuex";

import { Router } from "../routing";
import { bin2hex } from "../scripts/common";
import { Configs, ProjectItem, ProjectReadme } from "../scripts/configs";
import { Cookie } from "../scripts/cookie";
import { Fmt } from "/src/scripts/formatter";
import { isNotEmpty, Not } from "/src/scripts/logics";
import { Mapper } from "../scripts/mapper";
import { Request } from "../scripts/request";
import { Requests } from "../scripts/requests";
import { Terminal } from "../scripts/terminal";
import { Theme } from "../scripts/theme";
import { Typed } from "../scripts/types";

// import { Store } from "/src/store/store.js";


/**
 * Find project by name or endpoint.
 *
 * @param {Property} state
 * @param {String} project
 *
 * @returns {?ProjectItem}
 * 
 */
function finder( state, project ) {
	
	// Normalize project name.
	project = project.toLowerCase();
	
	// Find project by name.
	for( let element of state.configs.project.items ) {
		if( project === element.name.toLowerCase() ||
			project === element.endpoint.toLowerCase().split( "/" ).pop() ) {
			return element;
		}
	}
}


class Action {
	
	/** @type {Boolean} */
	error;
	
	/** @type {Boolean} */
	loading;
	
	/**
	 * Construct method of class Action
	 * 
	 * @param {Object} kwargs 
	 * @param {Boolean} kwargs.error
	 * @param {Boolean} kwargs.loading
	 * 
	 */
	constructor( kwargs={} ) {
		this.error = kwargs?.error ?? false;
		this.loading = kwargs?.loading ?? false;
	}
	
}

class Property {
	
	/** @type {Action} */
	action;
	
	/** @type {Configs} */
	configs;
	
	/** @type {Cookie} */
	cookie;
	
	/** @type {Object} */
	documents;
	
	/** @type {String} */
	environment;
	
	/** @type {Array<String>} */
	keysets;
	
	/** @type {Array<Object>} */
	organizations;
	
	/** @type {Router} */
	router;
	
	/** @type {Object} */
	requests;
	
	/** @type {Object} */
	profile;
	
	/** @type {Signature} */
	signature;
	
	/** @type {Map<String,Target>} */
	targets;
	
	/** @type {Terminal} */
	terminal;
	
	/** @type {Theme} */
	theme;
	
	/** @type {Object} */
	vectors;
	
	/**
	 * Construct method of class Property
	 * 
	 * @param {Object} kwargs
	 * @param {Action} kwargs.action
	 * @param {Cookie} kwargs.cookie
	 * @param {Configs} kwargs.configs
	 * @param {Object} kwargs.documents
	 * @param {Array<String>} kwargs.keysets
	 * @param {Array<Object>} kwargs.organizations
	 * @param {Object} kwargs.profile
	 * @param {Router} kwargs.router
	 * @param {Object} kwargs.requests
	 * @param {Signature} kwargs.signature
	 * @param {Map<String,Target>} kwargs.targets
	 * @param {Terminal} kwargs.terminal
	 * @param {Theme} kwargs.theme
	 * @param {Object} kwargs.vectors
	 * 
	 */
	constructor( kwargs={} ) {
		this.action = kwargs?.action;
		this.configs = kwargs?.configs;
		this.cookie = kwargs?.cookie;
		this.documents = kwargs?.documents || {};
		this.environment = process.env.NODE_ENV;
		this.keysets = kwargs?.keysets || [];
		this.organizations = kwargs?.organizations || [];
		this.profile = kwargs?.profile;
		this.router = kwargs?.router;
		this.requests = kwargs?.requests;
		this.signature = kwargs?.signature || new Signature();
		this.targets = kwargs?.targets || new Map();
		this.terminal = kwargs?.terminal;
		this.theme = kwargs?.theme;
		this.vectors = kwargs?.vectors;
	}
	
}

class Signature {
	
	/** @type {?String} */
	cookie;
	
	/** @type {?String} */
	editor;
	
	/** @type {?String} */
	vinode;
	
	/**
	 * Construct method of class Signature
	 * 
	 * @param {Object} kwargs 
	 * @param {?String} kwargs.cookie
	 * @param {?String} kwargs.editor
	 * @param {?String} kwargs.vinode
	 * 
	 */
	constructor( kwargs={} ) {
		this.cookie = kwargs?.cookie;
		this.editor = kwargs?.editor;
		this.vinode = kwargs?.vinode;
	}
	
}

class Target {
	
	/** @type {Boolean} */
	error;
	
	/** @type {?Function} */
	handler;
	
	/** @type {String} */
	method;
	
	/** @type {Object} */
	request;
	
	/** @type {Object} */
	response;
	
	/** @type {String} */
	url;
	
	/**
	 * Construct method of class Target
	 * 
	 * @param {Object} kwargs
	 * @param {Boolean} kwargs.error
	 * @param {?Function} kwargs.handler
	 * @param {String} kwargs.method
	 * @param {Object} kwargs.request
	 * @param {String} kwargs.url
	 * 
	 */
	constructor( kwargs={} ) {
		this.error = kwargs?.error ?? false;
		this.handler = kwargs?.handler;
		this.method = kwargs?.method;
		this.request = kwargs?.request;
		this.response = null;
		this.url = kwargs?.url;
	}
	
}

const Store = createStore({
	actions: {
		
		/**
		 * 
		 * @param {Object} param0 
		 * @param {Property} param0.state
		 * @param {ProjectItem|String} project 
		 * 
		 * @returns {Promise<void>}
		 * 
		 */
		document: async function({ state }, project ) {
			
			// Check if project name is String type.
			if( Typed( project, String ) ) {
				if( project = finder( state, project ) ) {
					return await dispatch( "project", project );
				}
				return;
			}
			
			// If project document has requested previously.
			if( Typed( state.documents[project.endpoint ? project.endpoint : project.name], Object ) ) return;
			
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
					state.documents[project.endpoint ? project.endpoint : project.name] = JSON.parse( request.response );
				})
				
				// Set error occured on project.
				.catch( e => { project.document_error = e; } );
			
			// Disable loading request.
			project.document_loading = false;
		},
		
		/**
		 * Initialize before sent request.
		 *
		 * @param {Object} param0
		 * @param {Property} param0.state
		 * @param {Function} param0.dispatch
		 * @param {Object} param0.getters
		 * @param {Function} param0.commit
		 *
		 * @returns {Promise}
		 * 
		 */
		initialize: async function({ state, dispatch, getters, commit }) {
			var element = document.querySelector( "head>meta[name=\"image:error\"]" );
			if( Typed( element, HTMLMetaElement ) ) {
				state.vectors.base64.error = element.getAttribute( "content" );
				element.parentElement.removeChild( element );
				element = null;
			}
			{};
			for( let keyset of Object.keys( state.signature ) ) {
				var element = document.querySelector( Fmt( "head>meta[name=\"signature:{}\"]", keyset ) );
				if( Typed( element, HTMLMetaElement ) ) {
					state.signature[keyset] = element.getAttribute( "content" );
					element.parentElement.removeChild( element );
					element = null;
				}
			}
			for( let i in state.keysets ) {
				var keyset = Fmt( "\x78\x7b\x7d", bin2hex( state.keysets[i] ) );
				var value = state.cookie.get( keyset );
				if( isNotEmpty( value ) ) {
					try {
						var decoded = atob( value );
						value = decoded;
					}
					catch( e ) {
					}
					if( state.targets.has( state.keysets[i] ) ) {
						var target = state.targets.get( state.keysets[i] );
						switch( state.keysets[i] ) {
							case "profile":
								state.profile = JSON.parse( value );
								target.response = value;
								break;
						}
					}
				}
			}
			await dispatch( "priority" );
		},
		
		/**
		 * Get all organization informations.
		 *
		 * @param {Object} param0
		 * @param {Property} param0.state
		 * @param {Function} param0.dispatch
		 * @param {Object} param0.getters
		 * @param {Function} param0.commit
		 *
		 * @returns {Promise<void>}
		 * 
		 */
		organization: async function({ state, dispatch, getters, commit }) {
			
			var url = process.env.NODE_ENV === "production" ? "https://api.github.com/orgs/{}" : "/github/{}.json";
			var cookie = Fmt( "\x78\x7b\x7d", bin2hex( "organizations" ) );
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
			
			if( isNotEmpty( values ) ) {
				try {
					try {
						var decoded = atob( values );
							values = decoded;
					}
					catch( e ) {
					}
					values = JSON.parse( values );
					if( Typed( values, Array ) && isNotEmpty( values ) ) {
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
				if( Typed( state.configs.organizations[u], String ) ) {
					try {
						state.cookie.set( cookie, btoa( JSON.stringify( state.organizations ) ), { expires: 1, path: "/" } );
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
		 * @param {Object} kwargs
		 * @param {Property} kwargs.state
		 * @param {Object} kwargs.getters
		 *
		 * @returns {Promise}
		 */
		priority: async function( kwargs={}) {
			var getters = kwargs.getters;
			var state = kwargs.state;
			try {
				
				// Remove previous error.
				state.error = false;
				
				// Enable loading request.
				state.loading = true;
				
				var keysets = [];
				var targets = [];
				
				for( let [ keyset, target ] of state.targets.entries() ) {
					var getter = Fmt( "has{}{}", keyset.charAt( 0 ).toUpperCase(), keyset.slice( 1 ) );
					if( getters[getter] ) {
						continue;
					}
					keysets.push( keyset );
					targets.push( target );
				}
				
				// Create multiple requests.
				await Requests( targets )
				
				// Handle all request responses.
				.then( r => Mapper( r,
					
					/**
					 * Mapping request reponses.
					 *
					 * @param {Number} i
					 * @param {XMLHttpRequest} request
					 *
					 */
					function( i, request ) {
						
						var target = state.targets.get( keysets[i] );
						
						// Parse request response and update
						// state data based on key iteration.
						state[keysets[i]] = JSON.parse( request.response );
						
						// Update priority targets by key iteration.
						target.error = false;
						target.request = request;
						target.response = request.response;
						
						// Check if request target has interceptor for handle response.
						if( Typed( target.handler, "handler" ) ) {
							state[keysets[i]] = target.handler( state[keysets[i]] );
						}
						
						// Save request response into cookies.
						if( state.keysets.indexOf( keysets[i] ) >= 0 ) {
							try {
								state.cookie.set( Fmt( "x{}", bin2hex( keysets[i] ) ), btoa( JSON.stringify( state[keysets[i]] ) ), { expires: 1, path: "/" } );
							}
							catch( e ) {
								try {
									state.cookie.set( Fmt( "x{}", bin2hex( keysets[i] ) ), JSON.stringify( state[keysets[i]] ), { expires: 1, path: "/" } );
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
		 * @param {Object} param0
		 * @param {Property} param0.state
		 * @param {*} param0.dispatch
		 * @param {ProjectItem|String} project
		 *
		 * @returns {Promise<void>}
		 * 
		 */
		project: async function({ state, dispatch }, project ) {
			var handlers = [];
			var requests = [];
			if( Typed( project, String ) ) {
				if( project = finder( state, project ) ) {
					return await dispatch( "project", project );
				}
				return;
			}
			
			/** @type {ProjectReadme} */
			var readme = project.readme;
			if( readme.loading ) {
				await readme.request.finally( function () {
					readme.loading = false;
				});
			}
			if( Not( project.api, Object ) ) {
				handlers.push( request => project.api = JSON.parse( request.response ) );
				requests.push( Fmt( "https://api.github.com/repos/{}", project.endpoint ? project.endpoint : project.name ) );
			}
			if( Not( project.readme.contents, String ) ) {
				if( Typed( readme.url, String ) ) {
					handlers.push( request => readme.contents = request.response );
					requests.push( readme.url );
				}
			}
			readme.loading = true;
			readme.request = Requests( requests );
			await readme.request
				.then( function( requests ) {
					Mapper( requests, ( i, request ) => handlers[i]( request ) );
				})
				.catch( function( error ) {
					readme.onerror = error;
				})
				.finally( function () {
					readme.loading = false;
				});
		}
		
	},
	getters: {
		
		/**
		 * Return if config has requested.
		 *
		 * @param {Property} state
		 *
		 * @returns {Boolean}
		 */
		hasConfig: state => {
			if( state.targets.has( "configs" ) ) {
				var target = state.targets.get( "configs" );
				if( target.request instanceof XMLHttpRequest && 
					state.configs instanceof Configs ) {
					return target.error === false;
				}
				return state.configs instanceof Configs && target.error === false;
			}
			return false;
		},
		
		/**
		 * Return if profile has requested.
		 *
		 * @param {Property} state
		 *
		 * @returns {Boolean}
		 * 
		 */
		hasProfile: state => {
			if( state.targets.has( "profile" ) ) {
				var target = state.targets.get( "profile" );
				if( target.request instanceof XMLHttpRequest && 
					state.configs instanceof Object ) {
					return target.error === false;
				}
				return state.profile instanceof Configs && target.error === false;
			}
			return false;
		},
		
		/**
		 * Return if organization has requested.
		 *
		 * @param {Property} state
		 *
		 * @returns {Boolean}
		 * 
		 */
		hasOrganization: state => Typed( state.organizations, Array ) && isNotEmpty( state.organizations )
		
		
	},
	modules: {
	},
	mutations: {
		
		/**
		 * Organization mutation.
		 *
		 * @param {Property} state
		 * @param {Object|String} organization
		 *  Parsed json organization from API.
		 *
		 * @returns {void}
		 * 
		 */
		organization: function( state, organization ) {
			
			// Change organizations as Array.
			if( Typed( state.organizations, Array ) === false ) {
				state.organizations = [];
			}
			
			// Parse request response.
			if( Typed( organization, String ) ) {
				organization = JSON.parse( organization );
			}
			state.organizations.push( organization );
		}
		
	},
	state: () => {
		var action = new Action();
		var cookie = new Cookie();
		var terminal = new Terminal( null, Router, document.createElement( "div" ) );
		var theme = new Theme();
		return new Property({
			action: action,
			configs: null, 
			cookie: cookie,
			keysets: [
				"profile"
			],
			organizations: [],
			profile: null,
			requests: {},
			router: Router,
			signature: new Signature(),
			targets: new Map([
				[ 
					"configs", new Target({
						error: false,
						handler: function( contents ) {
							if( process.env.NODE_ENV == "development" ) {
								contents.image.source = "/public/images";
							}
							return new Configs( contents );
						},
						method: "GET",
						request: null,
						url: process.env.NODE_ENV === "production" ? "https://raw.githubusercontent.com/hxAri/hxAri/main/config.json" : "/config.json"
					}) 
				],
				[
					"profile", new Target({
						error: false,
						handler: null,
						method: "GET",
						request: null,
						url: "https://api.github.com/users/hxAri"
					})
				]
			]),
			terminal: terminal,
			theme: theme,
			vectors: {
				base64: {
					error: null
				}
			}
		});
	}
});

export {
	Action,
	Property,
	Store
};
