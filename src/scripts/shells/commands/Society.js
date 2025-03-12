
// Import Scripts
import Author from "/src/scripts/Author.js";
import Request from "/src/scripts/Request.js";

export default {
	name: "society",
	type: "binary",
	data: {
	},
	author: Author,
	abouts: "Society is an Open-Source project for doing various things related to Facebook",
	options: {
		h: {
			type: Boolean,
			alias: "help",
			usage: "Show this help",
			require: false
		},
		password: {
			type: String,
			alias: "p",
			usage: "Facebook account password",
			require: false
		},
		t: {
			type: Boolean,
			alias: "token",
			usage: "Facebook access token utilities",
			require: false
		},
		tak: {
			type: String,
			alias: "token-api-key",
			usage: "Facebook token API Key",
			require: false
		},
		tas: {
			type: String,
			alias: "token-api-secret",
			usage: "Facebook token APi Secret",
			require: false
		},
		tg: {
			type: Boolean,
			alias: "token-generate",
			usage: "Facebook generate new access token",
			require: false
		},
		username: {
			type: String,
			alias: "u",
			usage: "Facebook account username",
			require: false
		}
	},
	methods: {
		generateAccessToken: function( apiKey, apiSecret, username, password ) {
			async function handler() {
				var payload = {
					"api_key": apiKey,
					"email": username,
					"format": "JSON",
					"locale": "vi_vn",
					"method": "auth.login",
					"password": password,
					"return_ssl_resources": 0,
					"v": "1.0"
				};
				payload.sig = Hash.MD5( new String()
					.concat( ...Object
						.keys( payload )
						.map( keyset => Fmt( "{}={}", keyset, payload[keyset] ) ) 
					)
					.concat( apiSecret )
				);
				var parameter = Object.keys( payload ).map( keyset => Fmt( "{}={}", keyset, payload[keyset] ) ).join( "\x26" );
				await Request( "GET", Fmt( "https://api.facebook.com/restserver.php?{}", parameter ) )
					.then( request => {
						this.$echo( ...request.response.split( "\x0a" ) );
					})
					.catch( error => { throw error });
			};
			handler();
		}
	},
	mounted: function({ h }) {
		if( h ) {
			return this.$help();
		}
	}
};