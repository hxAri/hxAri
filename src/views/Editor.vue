
<script>
	
	import "swiper/css";
	
	import hljs from "highlight.js";
	import Jsonpath from "jsonpath";
	import { Swiper, SwiperSlide } from "swiper/vue";
	
	import { bin2hex, isMobile, isMobileUserAgent, shorttext } from "../scripts/common";
	import { Configs } from "../scripts/configs";
	import { Fmt } from "../scripts/formatter";
	import { isEmpty, isNotEmpty, Not } from "../scripts/logics";
	import { Terminal } from "../scripts/terminal";
	import { User } from "../scripts/terminal/kernel/index.js";
	import { VirtualFileSystem, VirtualNode } from "../scripts/terminal/kernel/index.js";
	import { Typed } from "../scripts/types";
	import { UnixTime } from "../scripts/unixtime.js";
	
	export default {
		data: () => ({
			
			alerts: {
				error: {
					info: {
						line: 0,
						column: 0,
						position: 0,
						expected: null,
						unexpected: null
					},
					display: false,
					message: null
				},
				info: {
					display: false,
					message: null
				},
				success: {
					display: false,
					message: null
				},
				warning: {
					display: false,
					message: null
				}
			},
			
			/** @type {Configs} */
			configs: null,
			
			default: {
				contents: JSON.stringify({
					"entryId": "tweet-1979042243366294007",
					"sortIndex": "1979496057083527165",
					"content": {
						"entryType": "TimelineTimelineItem",
						"__typename": "TimelineTimelineItem",
						"itemContent": {
							"itemType": "TimelineTweet",
							"__typename": "TimelineTweet",
							"tweet_results": {
								"result": {
									"__typename": "Tweet",
									"rest_id": "1979042243366294007",
									"post_image_description": "Grid of eight close-up anime character portraits depicting Upper Moon demons. Top row: Red-haired female demon with multiple yellow spider-like eyes and sharp teeth; white-haired male demon with golden eyes, scars, and fangs; blue-skinned demon with intricate purple facial patterns and smiling expression. Middle row: Purple-haired demon with horn-like hair and multiple eyes; black-haired female demon with violin; orange demon with single large eye and horns. Bottom row: Purple-haired female demon with multiple eyes and tentacles; green demon with mask-like face and tendrils.",
									"core": {
										"user_results": {
											"result": {
												"__typename": "User",
												"id": "VXNlcjoxMTMzMzU1MDYwNzMyMzU0NTYw",
												"rest_id": "1133355060732354560",
												"affiliates_highlighted_label": {},
												"avatar": {
													"image_url": "https://pbs.twimg.com/profile_images/1819726682690859008/5p_ElaV4_normal.jpg"
												},
												"core": {
													"created_at": "Tue May 28 12:51:17 +0000 2019",
													"name": "Anime Daily",
													"screen_name": "anime_psts"
												},
												"dm_permissions": {
													"can_dm": true
												},
												"has_graduated_access": true,
												"is_blue_verified": true,
												"legacy": {
													"default_profile": true,
													"default_profile_image": false,
													"description": "Daily Anime Posts ⛩️",
													"entities": {
														"description": {
															"urls": []
														},
														"url": {
															"urls": [
																{
																	"display_url": "instagram.com/anime_psts",
																	"expanded_url": "http://instagram.com/anime_psts",
																	"url": "https://t.co/mqVxcbyjdV",
																	"indices": [
																		0,
																		23
																	]
																}
															]
														}
													},
													"fast_followers_count": 0,
													"favourites_count": 5076,
													"followers_count": 739261,
													"friends_count": 46,
													"has_custom_timelines": true,
													"is_translator": false,
													"listed_count": 561,
													"media_count": 7763,
													"normal_followers_count": 739261,
													"pinned_tweet_ids_str": [
														"1979268760583168017"
													],
													"possibly_sensitive": false,
													"profile_banner_url": "https://pbs.twimg.com/profile_banners/1133355060732354560/1756921958",
													"profile_interstitial_type": "",
													"statuses_count": 8140,
													"translator_type": "none",
													"url": "https://t.co/mqVxcbyjdV",
													"want_retweets": false,
													"withheld_in_countries": []
												},
												"location": {
													"location": ""
												},
												"media_permissions": {
													"can_media_tag": false
												},
												"parody_commentary_fan_label": "None",
												"profile_image_shape": "Circle",
												"professional": {
													"rest_id": "1947787022518915522",
													"professional_type": "Creator",
													"category": []
												},
												"privacy": {
													"protected": false
												},
												"relationship_perspectives": {
													"following": false
												},
												"tipjar_settings": {},
												"super_follow_eligible": true,
												"verification": {
													"verified": false
												}
											}
										}
									},
									"unmention_data": {},
									"edit_control": {
										"edit_tweet_ids": [
											"1979042243366294007"
										],
										"editable_until_msecs": "1760679014000",
										"is_edit_eligible": true,
										"edits_remaining": "5"
									},
									"is_translatable": false,
									"views": {
										"count": "65904",
										"state": "EnabledWithCount"
									},
									"source": "<a href=\"https://buffer.com\" rel=\"nofollow\">Buffer</a>",
									"grok_analysis_button": true,
									"legacy": {
										"bookmark_count": 188,
										"bookmarked": false,
										"created_at": "Fri Oct 17 04:30:14 +0000 2025",
										"conversation_id_str": "1979042243366294007",
										"display_text_range": [
											0,
											34
										],
										"entities": {
											"hashtags": [],
											"media": [
												{
													"display_url": "pic.x.com/0PTB1IImwN",
													"expanded_url": "https://x.com/DemonSlayerSc/status/1979042243366294007/photo/1",
													"id_str": "1979042240455446528",
													"indices": [
														35,
														58
													],
													"media_key": "3_1979042240455446528",
													"media_url_https": "https://pbs.twimg.com/media/G3b4bqnXEAA2TRh.jpg",
													"type": "photo",
													"url": "https://t.co/0PTB1IImwN",
													"ext_media_availability": {
														"status": "Available"
													},
													"features": {
														"large": {
															"faces": []
														},
														"medium": {
															"faces": []
														},
														"small": {
															"faces": []
														},
														"orig": {
															"faces": []
														}
													},
													"sizes": {
														"large": {
															"h": 1159,
															"w": 875,
															"resize": "fit"
														},
														"medium": {
															"h": 1159,
															"w": 875,
															"resize": "fit"
														},
														"small": {
															"h": 680,
															"w": 513,
															"resize": "fit"
														},
														"thumb": {
															"h": 150,
															"w": 150,
															"resize": "crop"
														}
													},
													"original_info": {
														"height": 1159,
														"width": 875,
														"focus_rects": [
															{
																"x": 0,
																"y": 0,
																"w": 875,
																"h": 490
															},
															{
																"x": 0,
																"y": 0,
																"w": 875,
																"h": 875
															},
															{
																"x": 0,
																"y": 0,
																"w": 875,
																"h": 998
															},
															{
																"x": 0,
																"y": 0,
																"w": 580,
																"h": 1159
															},
															{
																"x": 0,
																"y": 0,
																"w": 875,
																"h": 1159
															}
														]
													},
													"media_results": {
														"result": {
															"media_key": "3_1979042240455446528"
														}
													}
												}
											],
											"symbols": [],
											"timestamps": [],
											"urls": [],
											"user_mentions": []
										},
										"extended_entities": {
											"media": [
												{
													"display_url": "pic.x.com/0PTB1IImwN",
													"expanded_url": "https://x.com/DemonSlayerSc/status/1979042243366294007/photo/1",
													"id_str": "1979042240455446528",
													"indices": [
														35,
														58
													],
													"media_key": "3_1979042240455446528",
													"media_url_https": "https://pbs.twimg.com/media/G3b4bqnXEAA2TRh.jpg",
													"type": "photo",
													"url": "https://t.co/0PTB1IImwN",
													"ext_media_availability": {
														"status": "Available"
													},
													"features": {
														"large": {
															"faces": []
														},
														"medium": {
															"faces": []
														},
														"small": {
															"faces": []
														},
														"orig": {
															"faces": []
														}
													},
													"sizes": {
														"large": {
															"h": 1159,
															"w": 875,
															"resize": "fit"
														},
														"medium": {
															"h": 1159,
															"w": 875,
															"resize": "fit"
														},
														"small": {
															"h": 680,
															"w": 513,
															"resize": "fit"
														},
														"thumb": {
															"h": 150,
															"w": 150,
															"resize": "crop"
														}
													},
													"original_info": {
														"height": 1159,
														"width": 875,
														"focus_rects": [
															{
																"x": 0,
																"y": 0,
																"w": 875,
																"h": 490
															},
															{
																"x": 0,
																"y": 0,
																"w": 875,
																"h": 875
															},
															{
																"x": 0,
																"y": 0,
																"w": 875,
																"h": 998
															},
															{
																"x": 0,
																"y": 0,
																"w": 580,
																"h": 1159
															},
															{
																"x": 0,
																"y": 0,
																"w": 875,
																"h": 1159
															}
														]
													},
													"media_results": {
														"result": {
															"media_key": "3_1979042240455446528"
														}
													}
												}
											]
										},
										"favorite_count": 3720,
										"favorited": false,
										"full_text": "Which Upper Moon is your favorite? https://t.co/0PTB1IImwN",
										"is_quote_status": false,
										"lang": "en",
										"possibly_sensitive": false,
										"possibly_sensitive_editable": true,
										"quote_count": 97,
										"reply_count": 216,
										"retweet_count": 179,
										"retweeted": false,
										"user_id_str": "1133355060732354560",
										"id_str": "1979042243366294007"
									}
								}
							},
							"tweetDisplayType": "Tweet"
						},
						"feedbackInfo": {
							"feedbackKeys": [
								"-1684986710"
							]
						},
						"clientEventInfo": {
							"component": "for_you_simclusters",
							"element": "tweet",
							"details": {
								"timelinesDetails": {
									"injectionType": "ForYouSimclusters",
									"controllerData": "DAACDAABDAABCgABBAAAQkICAAEKAAIAAAAAAAAgAAoACfJY5ONwYCgdCgAKAAABmfbhs/UIAAsAAAADDwAMAwAAACMBAAJCQgAABAAgAAAAAAAAAAAAAAAAAACAAAAAAADggQAAIAoADgrggwGKYkTJCgAQY73/jQ4CS4UAAAAA"
								}
							}
						}
					}
				}, null, 4 ),
				filename: "New File"
			},
			
			jsonpath: {
				schema: "$.",
				preview: "[]"
			},
			
			keysets: {
				active: "active",
				content: "content",
				prefix: ".editor",
				setting: "setting",
				temporary: "temporary"
			},
			
			models: {
				
				/** @type {VirtualNode} */
				draft: null,
				
				/** @type {VirtualNode} */
				fopen: null
			},
			
			settings: {
				header: 0x1,
				headers: {
					editable: 0x1,
					jsonpath: 0x2,
					searching: 0x4
				},
				mode: 0x1,
				modes: {
					editable: 0x1,
					jsonpath: 0x2,
					structure: 0x3
				},
				previously: [
					
				],
				previous: {
					header: 0x1,
					mode: 0x1
				}
			},
			
			/** @type {Terminal} */
			terminal: null,
			
			/** @type {User} */
			user: null,
			
			/** @type {VirtualFileSystem} */
			vfs: null,
			
			/** @type {VirtualNode} */
			vnode: null,
			
			x: null
			
		}),
		setup: function( props, {} ) {
			return {
			};
		},
		watch: {
			title: {
				immediate: true,
				handler: function() {
					document.title = "hxAri · Editor";
				}
			}
		},
		computed: {
			
			fileActive: function() {
				return this.concat( this.bin2hex( this.keysets.active ) );
			},
			
			fileSetting: function() {
				return this.concat( this.bin2hex( this.keysets.setting ) );
			},
			
			fileTemporary: function() {
				return this.concat( this.bin2hex( this.keysets.temporary ) );
			},
			
			/**
			 * Return current header keyset name.
			 *
			 * @return String
			 */
			header: function() {
				for( let keyset of Object.keys( this.settings.headers ) ) {
					if( this.settings.header === this.settings.headers[keyset] ) {
						return keyset;
					}
				}
			},
			
			/**
			 * Return if editor is Editable or Jsonpath mode.
			 *
			 * @return Boolean
			 */
			isEditableOrJsonpathMode: function() {
				return [ this.settings.modes.editable, this.settings.modes.jsonpath ].indexOf( this.settings.mode ) >= 0;
			},
			
			/**
			 * Return if efitor is Editable or Structure mode.
			 *
			 * @return Boolean
			 */
			isEditableOrStructureMode: function() {
				return [ this.settings.modes.editable, this.settings.modes.structure ].indexOf( this.settings.mode ) >= 0;
			},
			
			/**
			 * Return if editor is Editable mode.
			 *
			 * @return Boolean
			 */
			isEditableMode: function() {
				return this.settings.mode === this.settings.modes.editable;
			},
			
			/**
			 * Return if editor is Editable header.
			 *
			 * @return Boolean
			 */
			isEditableHeader: function() {
				return this.settings.header === this.settings.headers.editable;
			},
			
			/**
			 * Return if editor is Jsonpath mode.
			 *
			 * @return Boolean
			 */
			isJsonpathMode: function() {
				return this.settings.mode === this.settings.modes.jsonpath;
			},
			
			/**
			 * Return if editor is Jsonpath header.
			 *
			 * @return Boolean
			 */
			isJsonpathHeader: function() {
				return this.settings.header === this.settings.headers.jsonpath;
			},
			
			/**
			 * Return if editor is Structure mode.
			 *
			 * @return Boolean
			 */
			isStructureMode: function() {
				return this.settings.mode === this.settings.modes.structure;
			},
			
			/**
			 * Return if editor is Searching header.
			 *
			 * @return Boolean
			 */
			isSearchingHeader: function() {
				return this.settings.header === this.settings.headers.searching;
			},
			
			/**
			 * Return list of line number.
			 *
			 * @return Array<String>
			 */
			lines: function() {
				return this.splitline( this.models.fopen.contents.split( "\x0a" ) );
			},
			
			/**
			 * Return list of line number jsonpath preview.
			 *
			 * @return Array<String>
			 */
			lineOfJsonpathPreview: function() {
				if( this.isJsonpathMode ) {
					return this.splitline( this.jsonpath.preview.split( "\x0a" ) );
				}
				return [];
			},
			
			/**
			 * Return current mode keyset name.
			 *
			 * @return String
			 */
			mode: function() {
				for( let keyset of Object.keys( this.settings.modes ) ) {
					if( this.settings.modes[keyset] === this.settings.mode ) {
						return keyset;
					}
				}
			},
			
			pathsaved: function() {
				return this.user.home.concat( "/".concat( this.keysets.prefix.concat( "/".concat( this.keysets.content ) ) ) );
			},
			
			pathtoterminal: function() {
				return Fmt( "/terminal?command=ls -l {}", this.pathsaved );
			}
			
		},
		directives: {
			
			/**
			 * Auto highlight html element.
			 *
			 * @param {HTMLElement} el
			 * @param {Object} binding
			 *
			 * @return {void}
			 * 
			 */
			highlighter: function( el, binding ) {
				var language = "json";
				var contents = binding.value;
				var explodes = contents.split( "\x0a" );
				var heading = explodes[0];
				var matches = null;
				if( ( matches = /\.(?<language>[a-zA-Z]+)$/.exec( el.dataset.filename ) ) !== null ) {
					language = matches.groups.language;
				}
				else if( ( matches = /^#\!\/usr\/bin\/env\x20+(?<language>[a-zA-Z]+)[\x20\t]?$/i.exec( heading ) ) !== null ) {
					language = matches.groups.language;
				}
				el.innerHTML = contents;
				if( language === "json" ) {
					if( isNotEmpty( el.dataset.error ) ) {
						var errnoset = JSON.parse( el.dataset.error );
						for( let line=0; line<explodes.length; line++ ) {
							if( line+1 === errnoset.line ) {
								explodes[line] = Fmt( "<span style=\"color: var(--hljs-red);\">{}</span>", explodes[line] );
							}
							else {
								explodes[line] = hljs.highlight( explodes[line], { language: "json" } ).value;
							}
						}
						el.innerHTML = explodes.join( "\x0a" );
					}
					else {
						el.innerHTML = hljs.highlight( contents, { language: "json" } ).value;
					}
				}
				else {
					try {
						el.innerHTML = hljs.highlight( contents, { language: language } ).value;
					}
					catch( e ) {
						el.innerHTML = contents;
					}
				}
			}
		},
		methods: {
			
			bin2hex: function( string ) {
				return "0x".concat( bin2hex( string ) );
			},
			
			concat: function( pathname ) {
				if( isNotEmpty( pathname ) ) {
					return this.user.home.concat( "/".concat( this.keysets.prefix.concat( "/".concat( pathname ) ) ) );
				}
				return this.user.home.concat( "/".concat( this.keysets.prefix ) );
			},
			
			concatContent: function( filename ) {
				if( isNotEmpty( filename ) ) {
					return this.concat( this.bin2hex( this.keysets.content ).concat( "/".concat( this.bin2hex( filename ) ) ) );
				}
				return this.concat( this.bin2hex( this.keysets.content ) );
			},
			
			/**
			 * Download filenode into local device storage
			 * 
			 * @param {VirtualNode} filenode 
			 * 
			 */
			download: function( filenode ) {
				if( filenode.type === "file" ) {
					var element = document.createElement( "a" );
						element.setAttribute( "href", Fmt( "data:text/plain;charset=utf-8,{}", filenode.contents ) );
						element.setAttribute( "download", filenode.name );
						element.click();
				}
				else {
					this.alerts.error.display = true;
					this.alerts.error.message = "Unallowed download directory node";
				}
			},
			
			/** @inheritdoc */
			fmt: Fmt,
			
			fsize: function( filenode ) {
				return new TextEncoder().encode( filenode.contents ).length
			},
			
			isdir: function( pathname ) {
				return this.vfs.isdir( pathname );
			},
			
			isfile: function( pathname ) {
				return this.vfs.isfile( pathname );
			},
			
			/** Minify Json string */
			minify: function() {
				if( this.isEditableOrJsonpathMode ) {
					if( isEmpty( this.alerts.error.message ) ) {
						this.models.fopen.contents = JSON.stringify( JSON.parse( this.models.fopen.contents ) );
					}
				}
			},
			
			mkdir: function( pathname ) {
				this.vfs.mkdir( pathname, { user: this.user } );
			},
			
			/**
			 * Create new temporary file
			 * 
			 * NOTE: All temporary file will replace old temporary file
			 * 
			 */
			newfile: function() {
				if( this.isfile( this.fileTemporary ) ) {
					this.remove( this.fileTemporary );
				}
				this.write( this.fileTemporary, this.default.contents );
				this.models.draft = this.vfs.walk( this.fileTemporary );
				this.models.draft.name = this.default.filename;
				this.vfs.persist();
			},
			
			onbacktoprev: function() {
				var previously = this.settings.previously.at( -1 );
				if( Typed( previously, Object ) ) {
					this.settings.header = previously?.header ?? this.settings.header ?? this.settings.headers.editable;
					this.settings.mode = previously?.mode ?? this.settings.mode ?? this.settings.modes.editable;
					this.settings.previously.pop();
				}
				else {
					this.settings.header = this.settings.headers.editable;
					this.settings.mode = this.settings.modes.editable;
				}
				this.onsetting();
			},
			
			/**
			 * Handle change mode or header.
			 *
			 * @param {?Number} header
			 * @param {?Number} mode
			 *
			 * @return {void}
			 * 
			 */
			onchange: function( header, mode ) {
				for( let object of Object.values( this.alerts ) ) {
					object.display = false;
					object.message = null;
				}
				this.settings.previously.push({ 
					header: this.settings.header, 
					mode: this.settings.mode 
				});
				if( Typed( header, Number ) && Typed( mode, Number ) ) {
					this.settings.header = header;
					this.settings.mode = mode;
				}
				else if( Typed( header, Number ) ) {
					this.settings.header = header;
				}
				else if( Typed( mode, Number ) ) {
					this.settings.mode = mode;
				}
				this.onsetting();
			},
			
			/**
			 * Download opened file
			 * 
			 * @param {PointerEvent} e
			 * 
			 */
			ondownload: function( e ) {
				this.download( this.models.fopen );
			},
			
			/**
			 * Close opened file or draft file
			 * 
			 * @param {PointerEvent} e
			 * 
			 */
			onclose: function( e ) {
				if( this.models.fopen === this.models.draft ) {
					this.newfile();
				}
				this.onsave( e );
				this.remove( this.fileActive );
				this.alerts.success.display = false;
				this.alerts.success.message = null;
				this.models.fopen = this.models.draft;
			},
			
			/**
			 * Close opened file or draft file and create new file.
			 * 
			 * @param {PointerEvent} e
			 * 
			 */
			onnew: function( e ) {
				this.onclose( e );
			},
			
			onopen: function( filenode, keyset ) {
				if( this.models.draft !== this.models.fopen ) {
					this.onsave();
				}
				this.models.fopen = this.vfs.walk( this.concatContent( filenode.name ) );
				this.write( this.fileActive, this.concatContent( filenode.name ) );
				this.onsave();
			},
			
			/**
			 * Handle jsonpath scheme on change and input.
			 *
			 * @param {?Event} e
			 *
			 * @returns {Void}
			 * 
			 */
			onpath: function( e ) {
				try {
					var object = JSON.parse( this.models.fopen.contents );
					var result = Jsonpath.query( object, this.jsonpath.schema );
					this.alerts.error = {
						info: {
							line: 0,
							column: 0,
							position: 0,
							expected: null,
							unexpected: null
						},
						display: false,
						message: null
					};
					this.jsonpath.preview = JSON.stringify( result, null, 4 );
				}
				catch( error ) {
					this.alerts.error = {
						info: {
							line: 0,
							column: 0,
							position: 0,
							expected: null,
							unexpected: null
						},
						display: true,
						message: new String( error )
					};
					this.jsonpath.preview = "[]";
				}
				finally {
					this.onsetting();
				}
			},
			
			onremove: function( filenode, keyset ) {
				if( this.models.fopen === filenode ) {
					if( this.models.draft === null ) {
						this.newfile();
					}
					this.models.fopen = this.models.draft;
				}
				this.remove( this.fileActive );
				this.remove( this.concatContent().concat( "/".concat( keyset ) ) );
			},
			
			onsave: function( e ) {
				try {
					if( isEmpty( this.models.fopen.name ) ) {
						throw new TypeError( "filename can't be empty" );
					}
					var keyset = this.bin2hex( this.models.fopen.name );
					var filename = this.models.fopen.name;
					var pathname = this.concatContent( this.models.fopen.name );
					if( this.models.draft === this.models.fopen ) {
						if( this.vnode.contents.has( keyset ) === false ) {
							this.vnode.contents.set( keyset, this.models.draft );
							this.models.draft = null;
						}
						else {
							throw new TypeError( Fmt( "{}: filename exists", filename ) );
						}
					}
					else {
						for( let [ keyfile, filenode ] of this.vnode.contents.entries() ) {
							if( filenode === this.models.fopen ) {
								if( keyfile !== keyset ) {
									if( this.vnode.contents.has( keyfile ) && this.vnode.contents.get( keyfile ) !== this.models.fopen ) {
										throw new TypeError( Fmt( "{}: xfilename exists", filename ) );
									}
									this.vnode.contents.delete( keyfile );
									this.vnode.contents.set( keyset, this.models.fopen );
								}
								break;
							}
						}
						this.write( pathname, this.models.fopen.contents );
					}
					this.write( this.fileActive, pathname );
					this.models.fopen = this.vfs.walk( pathname );
					this.models.fopen.name = filename;
					this.alerts.success = { display: true, message: "Successfully saved to localStorage" };
					this.vfs.persist();
				}
				catch( e ) {
					this.alerts.error = {
						info: {
							line: 0,
							column: 0,
							position: 0,
							expected: null,
							unexpected: null
						},
						display: true,
						message: new String( e )
					};
				}
			},
			
			onsetting: function() {
				this.write( this.fileSetting, JSON.stringify({ 
					header: this.settings.header,
					jsonpath: { 
						schema: this.jsonpath.schema 
					}, 
					mode: this.settings.mode,
					previously: this.settings.previously 
					}) 
				);
			},
			
			/**
			 * Handle scroll syncronization.
			 *
			 * @param {Event|FocusEvent} e
			 *
			 * @return {Void}
			 * 
			 */
			onscroll: function( e ) {
				switch( this.settings.mode ) {
					case this.settings.modes.editable:
						this.$refs.editorEditablePre.scrollTop = e.target.scrollTop;
						this.$refs.editorEditablePre.scrollLeft = e.target.scrollLeft;
						break;
					case this.settings.modes.jsonpath:
						this.$refs.editorJsonpathPre.scrollTop = e.target.scrollTop;
						this.$refs.editorJsonpathPre.scrollLeft = e.target.scrollLeft;
						break;
				}
			},
			
			/** Prettify Json string */
			prettify: function() {
				if( this.isEditableOrJsonpathMode ) {
					if( isEmpty( this.alerts.error.message ) ) {
						this.models.fopen.contents = JSON.stringify( JSON.parse( this.models.fopen.contents ), null, 4 );
					}
				}
			},
			
			remove: function( pathname ) {
				this.vfs.remove( pathname, { user: this.user } );
			},
			
			/**
			 * Shorttext filename.
			 *
			 * @param {String} filename
			 *
			 * @returns {String}
			 * 
			 */
			shorttext: function( filename ) {
				if( isMobileUserAgent() ) {
					return shorttext( filename, 23 );
				}
				return shorttext( filename, 48 );
			},
			
			/**
			 * Show hide file detail info
			 * 
			 * @param {String} keyset
			 * 
			 * @returns {void}
			 * 
			 */
			showFileDetail: function( keyset ) {
				var element = document.getElementById( Fmt( "editor-filename-item-{}", keyset ) );
				if( Typed( element, HTMLDivElement ) ) {
					element.classList.toggle( "active" );
				}
			},
			
			/**
			 * Split content as lines.
			 * 
			 * @param {String} contents 
			 * 
			 * @returns {Array<String>}
			 * 
			 */
			splitline: function( contents ) {
				var lines = [];
				var contentLength = contents.length;
				var contentLineLength = new String( contentLength ).length;
				for( let line=0; line<contentLength; line++ ) {
					var lineno = new String( line+1 );
					var lineLength = lineno.length;
					if( lineLength < contentLineLength ) {
						lineno = "\x30".repeat( contentLineLength - lineLength ) + lineno;
					}
					lines.push( lineno );
				}
				return lines;
			},
			
			/**
			 * Returns formatted UnixTime instance
			 * 
			 * @param {UnixTime} unixtime 
			 * 
			 * @returns {String}
			 * 
			 */
			strftime: function( unixtime ) {
				if( isMobile() ) {
					return unixtime.format( "%d, %m %Y %H:%M:%S" );
				}
				return unixtime.format( "%d, %B %Y %H:%M:%S" );
			},
			
			touch: function( filename ) {
				this.vfs.touch( filename, { user: this.user } );
			},
			
			/**
			 * Parse JSONError.
			 *
			 * @param {Error} error
			 *
			 * @return {Object}
			 * 
			 */
			traceback: function( error ) {
				var message = new String( error );
				var pattern = /(?:Expected\x20+(?<expected>(?:\'[^\']+\'(?:\x20+or\x20\'[^\']+\')?)).*)?at\x20+position\x20+(?<position>[0-9]+)\x20+\(\x20?line\x20+(?<line>[0-9]+)\x20+column\x20(?<column>[0-9]+)\x20?\)|(?:Unexpected\x20+token\x20+\'(?<token>.*)\'\,\x20?\.{3}\"(?<unexpected>.*)\"\x20?\.{3}\x20+is\x20+not\x20+valid\x20+JSON)/igms;
				var matches = pattern.exec( message );
				if( matches !== null ) {
					var results = {
						line: parseInt( matches.groups.line ?? 0 ),
						column: parseInt( matches.groups.column ?? 0 ),
						position: parseInt( matches.groups.position ?? 0 ),
						expected: matches.groups.expected ?? null,
						unexpected: matches.groups.unexpected ?? null
					};
					if( isNotEmpty( matches.groups.expected ) ) {
					}
					if( isNotEmpty( matches.groups.unexpected ) && 
						isNotEmpty( matches.groups.token ) ) {
						var token = matches.groups.token;
						var tokenLength = token.length;
						var textarea = this.models.textarea.editable;
						var unexpected = matches.groups.unexpected;
						var unexpectedPosition = this.models.textarea.editable.indexOf( unexpected );
						var unexpectedPositionStart = unexpectedPosition;
							unexpectedPositionStart+= unexpected.indexOf( token );
						var unexpectedPositionEnd = unexpectedPositionStart;
							unexpectedPositionEnd+= tokenLength;
						var exploded = textarea.substring( 0, unexpectedPositionEnd );
						var explodes = exploded.split( "\x0a" );
						results.line = explodes.length;
						results.column = explodes.pop().length;
						results.position = unexpectedPositionEnd;
						results.unexpected = token;
					}
					return results;
				}
				return {
					line: 0,
					column: 0,
					position: 0,
					expected: null,
					unexpected: null
				};
			},
			
			/** Validate JSON string */
			validator: function() {
				
				var language = "json";
				var contents = this.models.fopen.contents;
				var explodes = contents.split( "\x0a" );
				var heading = explodes[0];
				var matches = null;
				
				if( ( matches = /\.(?<language>[a-zA-Z]+)$/.exec( this.models.fopen.name ) ) !== null ) {
					language = matches.groups.language;
				}
				else if( ( matches = /^#\!\/usr\/bin\/env\x20+(?<language>[a-zA-Z]+)[\x20\t]?$/i.exec( heading ) ) !== null ) {
					language = matches.groups.language;
				}
				
				try {
					if( isNotEmpty( contents ) && language === "json" ) {
						JSON.parse( contents );
					}
					this.alerts.error = {
						info: {
							line: 0,
							column: 0,
							position: 0,
							expected: null,
							unexpected: null
						},
						display: false,
						message: null
					};
				}
				catch( e ) {
					this.alerts.error = {
						info: this.traceback( e ),
						display: true,
						message: new String( e )
					};
				}
			},
			
			write: function( filename, contents ) {
				this.vfs.write( filename, { contents: contents, user: this.user } );
			}
			
		},
		created: function() {
			this.configs = this.$store.state.configs;
			this.terminal = this.$store.state.terminal;
			this.user = this.terminal.hxari;
			this.vfs = this.terminal.kernel.vfs;
			if( this.isdir( this.concatContent() ) === false ) {
				this.mkdir( this.concatContent() );
			}
			this.x = this.vfs.walk( this.concat() );
			this.vnode = this.vfs.walk( this.concatContent() );
			if( this.isfile( this.fileSetting ) ) {
				var fileSetting = this.vfs.walk( this.fileSetting );
				var fileSettingContents = JSON.parse( fileSetting.contents );
				this.settings.header = fileSettingContents?.header ?? this.settings.header;
				this.settings.mode = fileSettingContents?.mode ?? this.settings.mode;
				this.settings.previously = fileSettingContents?.previously ?? this.settings.previously;
				this.jsonpath.schema = fileSettingContents?.jsonpath?.schema ?? this.jsonpath.schema;
			}
			else {
				this.onsetting();
			}
			if( this.isfile( this.fileTemporary ) ) {
				this.models.draft = this.vfs.walk( this.fileTemporary );
			}
			else {
				this.newfile();
			}
			if( this.isfile( this.fileActive ) ) {
				var filename = this.vfs.read( this.fileActive, { user: this.user } );
				if( this.isfile( filename ) ) {
					this.models.fopen = this.vfs.walk( filename );
				}
				else {
					this.remove( this.fileActive );
					this.models.fopen = this.models.draft;
				}
			}
			else {
				this.models.fopen = this.models.draft;
			}
		},
		mounted: function() {
			this.validator();
		},
		components: {
			Swiper,
			SwiperSlide
		}
	};
	
</script>

<template>
	<div class="editor">
		<Swiper class="editor-swiper" slidesPerView="auto" :initialSlide="1" :resistanceRatio="0" :slideToClickedSlide="true">
			<SwiperSlide class="editor-swiper-slide editor-swiper-menu">
				<div class="editor-menu-header">
					<div class="editor-menu-header-wrapper flex flex-left pd-14">
						<RouterLink :to="pathtoterminal">
							{{ pathsaved }}
						</RouterLink>
					</div>
				</div>
				<div class="editor-menu-filenames scroll-x scroll-hidden">
					<div class="editor-filename-item" :id="fmt( 'editor-filename-item-{}', keyset )" v-for="filenode, keyset in Object.fromEntries( vnode.contents )">
						<div class="editor-filename-column flex flex-left pd-14">
							<p class="editor-filename-title text" @click="onopen( filenode, keyset )">{{ shorttext( filenode.name ) }}</p>
							<div class="editor-filename-options flex flex-center">
								<i class="bx bx-cloud-download fs-22" @click="download( filenode )" title="Remove File"></i>
								<i class="bx bx-trash fs-22" @click="onremove( filenode, keyset )" title="Remove File"></i>
								<i class="bx bx-info-circle fs-22" @click="showFileDetail( keyset )" title="File Options"></i>
							</div>
						</div>
						<div class="editor-filename-detail" :id="fmt( 'editor-filename-detail-{}', keyset )">
							<div class="editor-filename-detail-container flex flex-center">
								<div class="editor-filename-detail-wrapper">
									<div class="editor-filename-detail-info pd-14">
										<p class="editor-filename-detail-info fb-45 subtitle">
											Ownership
										</p>
										<p class="editor-filename-detail-info text">
											- Group <span class="fb-45">0o{{ filenode.gid.toString( 8 ) }}</span>
										</p>
										<p class="editor-filename-detail-info text">
											- Modes <span class="fb-45">0o{{ filenode.mode.toString( 8 ) }}</span>
										</p>
										<p class="editor-filename-detail-info text">
											- Owner <span class="fb-45">0o{{ filenode.uid.toString( 8 ) }}</span>
										</p>
										<hr class="editor-filename-detail-hr mg-bottom-14 mg-top-14" />
										<p class="editor-filename-detail-info text">
											- Sizes <span class="fb-45">{{ fsize( filenode ) }}</span>
										</p>
										<hr class="editor-filename-detail-hr mg-bottom-14 mg-top-14" />
										<p class="editor-filename-detail-info text">
											- Keyset <span class="fb-45">{{ keyset }}</span>
										</p>
										<hr class="editor-filename-detail-hr mg-bottom-14 mg-top-14" />
										<p class="editor-filename-detail-info text">
											- Created <span class="fb-45">{{ strftime( filenode.ctime ) }}</span>
										</p>
										<hr class="editor-filename-detail-hr mg-bottom-14 mg-top-14" />
										<p class="editor-filename-detail-info text">
											- Updated <span class="fb-45">{{ strftime( filenode.utime ) }}</span>
										</p>
									</div>
									<hr class="editor-filename-detail-hr-end" />
									<div class="editor-filename-detail-closeable flex flex-center pd-14" @click="showFileDetail( keyset )">
										<i class="bx bx-chevrons-up fs-20"></i>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</SwiperSlide>
			<SwiperSlide class="editor-swiper-slide editor-swiper-main">
				<div class="editor-main-header">
					<div class="editor-main-header-wrapper editable flex flex-left pd-14" v-if="( isEditableOrStructureMode && isEditableHeader )">
						<div class="editor-main-header-single-form flex flex-left">
							<div class="editor-main-header-form flex">
								<div class="editor-main-header-form-group flex">
									<label class="editor-main-header-form-label" for="filename">Filename</label>
									<input class="editor-main-header-form-input" ref="filename" type="text" autocomplete="off" autocorrect="off" :spellcheck="false" v-model="models.fopen.name" />
									<div class="editor-main-header-form-icon flex flex-center">
										<i class="bx bx-x fs-22" @click="onclose" title="Close File"></i>
									</div>
								</div>
							</div>
						</div>
						<div class="editor-main-header-tools flex flex-center">
							<i class="bx bx-arrow-back fs-22" @click="onbacktoprev()" title="Back" v-if="settings.previously.length"></i>
							<i class="bx bx-plus fs-22" @click="onnew" title="New File"></i>
							<i class="bx bx-align-right fs-22" @click="minify" title="Minify"></i>
							<i class="bx bx-align-middle fs-22" @click="prettify" title="Prettify"></i>
							<i class="bx bx-file fs-22" @click="" title="Open File"></i>
							<i class="bx bx-server fs-22" @click="onsave" title="Save to localStorage"></i>
							<i class="bx bx-cloud-download fs-22" @click="ondownload" title="Download File"></i>
							<i class="bx bx-copy fs-22" @click="oncopy" title="Copy to Clipboard"></i>
							<i class="bx bx-paste fs-22" @click="onpaste" title="Paste from Clipboard"></i>
							<i class="bx bx-search fs-22" @click="onchange( settings.headers.searching, null )" title="Search"></i>
							<!-- <i class="bx bx-vector fs-22" @click="[ onchange( settings.headers.jsonpath, settings.modes.jsonpath ), onpath() ]" title="Jsonpath"></i> -->
							<i class="bx bxs-extension fs-22" @click="onchange( settings.headers.editable, settings.modes.editable )" title="Close Tree Mode" v-if="isStructureMode"></i>
							<i class="bx bx-extension fs-22" @click="onchange( settings.headers.editable, settings.modes.structure )" title="Tree Mode" v-else></i>
						</div>
					</div>
					<div class="editor-main-header-wrapper jsonpath flex flex-left pd-14" v-else-if="( isJsonpathMode && isJsonpathHeader )">
						<div class="editor-main-header-single-form flex flex-left">
							<div class="editor-main-header-form flex">
								<div class="editor-main-header-form-group flex">
									<label class="editor-main-header-form-label" for="schema">Schema</label>
									<input class="editor-main-header-form-input" ref="schema" type="text" autocomplete="off" autocorrect="off" placeholder="$." :spellcheck="false" @change="onpath" @input="onpath" v-model="jsonpath.schema" />
									<div class="editor-main-header-form-icon flex flex-center">
										<i class="bx bx-hash fs-22"></i>
									</div>
								</div>
							</div>
						</div>
						<div class="editor-main-header-tools flex flex-center">
							<i class="bx bx-arrow-back fs-22" @click="onbacktoprev()" title="Back" v-if="settings.previously.length"></i>
							<i class="bx bx-plus fs-22" @click="onnew" title="New File"></i>
							<i class="bx bx-align-right fs-22" @click="minify" title="Minify"></i>
							<i class="bx bx-align-middle fs-22" @click="prettify" title="Prettify"></i>
							<i class="bx bx-file fs-22" @click="" title="Open File"></i>
							<i class="bx bx-server fs-22" @click="onsave" title="Save to localStorage"></i>
							<i class="bx bx-cloud-download fs-22" @click="ondownload" title="Download File"></i>
							<i class="bx bx-copy fs-22" @click="oncopy" title="Copy to Clipboard"></i>
							<i class="bx bx-paste fs-22" @click="onpaste" title="Paste from Clipboard"></i>
							<i class="bx bx-extension fs-22" @click="onchange( settings.headers.editable, settings.modes.structure )" title="Tree Mode"></i>
						</div>
					</div>
					<div class="editor-main-header-wrapper searching flex flex-left pd-14" v-else-if="( isEditableOrStructureMode && isSearchingHeader )">
						<div class="editor-main-header-multiforms">
							<div class="editor-main-header-form flex">
								<div class="editor-main-header-form-group flex">
									<label class="editor-main-header-form-label" for="search">Search</label>
									<input class="editor-main-header-form-input" ref="search" type="text" autocomplete="off" autocorrect="off" :spellcheck="false" @change="" @input="" v-model="models.search" />
									<div class="editor-main-header-form-icon flex flex-center">
										<i class="bx bx-dollar fs-22" @click="" title="Pattern"></i>
									</div>
									<div class="editor-main-header-form-icon flex flex-center">
										<i class="bx bx-search fs-22" @click="" title="Search"></i>
									</div>
								</div>
							</div>
							<div class="editor-main-header-form flex">
								<div class="editor-main-header-form-group flex">
									<label class="editor-main-header-form-label" for="replace">Replace</label>
									<input class="editor-main-header-form-input" ref="replace" type="text" autocomplete="off" autocorrect="off" :spellcheck="false" v-model="models.replace" />
									<div class="editor-main-header-form-icon flex flex-center">
										<i class="bx bx-refresh fs-22" @click="" title="Replace"></i>
									</div>
									<div class="editor-main-header-form-icon flex flex-center">
										<i class="bx bx-search-alt fs-22" @click="" title="Replace all"></i>
									</div>
								</div>
							</div>
						</div>
						<div class="editor-main-header-tools flex flex-center">
							<i class="bx bx-arrow-back fs-22" @click="onbacktoprev()" title="Back" v-if="settings.previously.length"></i>
							<i class="bx bx-plus fs-22" @click="onnew" title="New File"></i>
							<i class="bx bx-align-right fs-22" @click="minify" title="Minify"></i>
							<i class="bx bx-align-middle fs-22" @click="prettify" title="Prettify"></i>
							<i class="bx bx-file fs-22" @click="" title="Open File"></i>
							<i class="bx bx-server fs-22" @click="onsave" title="Save to localStorage"></i>
							<i class="bx bx-cloud-download fs-22" @click="ondownload" title="Download File"></i>
							<i class="bx bx-copy fs-22" @click="oncopy" title="Copy to Clipboard"></i>
							<i class="bx bx-paste fs-22" @click="onpaste" title="Paste from Clipboard"></i>
							<!-- <i class="bx bx-vector fs-22" @click="[ onchange( settings.headers.jsonpath, settings.modes.jsonpath ), onpath() ]" title="Path"></i> -->
							<i class="bx bxs-extension fs-22" @click="onchange( settings.headers.editable, settings.modes.editable )" title="Close Tree Mode" v-if="isStructureMode"></i>
							<i class="bx bx-extension fs-22" @click="onchange( settings.headers.editable, settings.modes.structure )" title="Tree Mode" v-else></i>
						</div>
					</div>
					<div class="" v-else>
						<pre><code>-ne mode={{ mode }}; header={{ header }}</code></pre>
					</div>
				</div>
				<div class="editor-main-content" :data-header="header" :data-mode="mode">
					<div class="editor-main-editable pd-14 scroll-hidden" v-if="isEditableMode">
						<div class="editor-editable-wrapper flex scroll-hidden" ref="editorEditableWrapper">
							<div class="editor-main-line">
								<p class="editor-main-line-number" :style="{ color: alerts.error.info.line === parseInt( line ) ? 'var(--hljs-red)' : 'var(--text-2)' }" v-for="line in lines">{{ line }}</p>
							</div>
							<div class="editor-editable-container">
								<pre class="editor-editable-preview-pre" 
									 ref="editorEditablePre"><code 
									 class="editor-editable-preview-code" 
									 ref="editorEditableCode" 
									 :data-error="JSON.stringify( alerts.error.info )" 
									 :data-filename="models.fopen.name" 
									 v-highlighter="models.fopen.contents"></code></pre>
								<textarea 
									class="editor-editable-textarea scroll-hidden" 
									autocapitalize="off" 
									autocomplete="off" 
									autocorrect="off" 
									id="editable" 
									spellcheck="false" 
									ref="editorEditableTextarea" 
									v-model="models.fopen.contents" 
									:data-mode="settings.modes.editable" 
									:rows="lines.length" 
									@input="oninput" 
									@keydown="onkeydown" 
									@focus="onscroll"
									@scroll="onscroll">
								</textarea>
							</div>
						</div>
					</div>
					<div class="editor-main-jsonpath flex flex-center pd-14 scroll-hidden" v-else-if="isJsonpathMode">
						<!-- source -->
						<div class="editor-jsonpath-wrapper flex scroll-hidden" data-section="editable">
							<!-- lineno -->
							<div class="editor-main-line">
								<p class="editor-main-line-number" :style="{ color: alerts.error.info.line === parseInt( line ) ? 'var(--hljs-red)' : 'var(--text-2)' }" v-for="line in lines">{{ line }}</p>
							</div>
							<!-- container -->
							<div class="editor-jsonpath-container">
								<!-- preview -->
								<pre class="editor-jsonpath-preview-pre"
									 ref="editorJsonpathPre"><code 
									 class="editor-jsonpath-preview-code" 
									 ref="editorJsonpathCode" 
									 :data-error="JSON.stringify( alerts.error.info )" 
									 :data-filename="models.fopen.name" 
									 v-highlighter="models.fopen.contents"></code></pre>
								<!-- textarea -->
								<textarea 
									class="editor-jsonpath-textarea scroll-hidden" 
									autocapitalize="off" 
									autocomplete="off" 
									autocorrect="off" 
									id="editable" 
									spellcheck="false" 
									ref="editorJsonpathTextarea" 
									v-model="models.fopen.contents" 
									:data-mode="settings.modes.jsonpath" 
									:rows="lines.length" 
									@input="oninput" 
									@keydown="onkeydown" 
									@focus="onscroll"
									@scroll="onscroll"></textarea>
							</div>
						</div>
						<!-- results -->
						<div class="editor-jsonpath-wrapper flex scroll-hidden" data-section="preview">
							<!-- lineno -->
							<div class="editor-main-line">
								<p class="editor-main-line-number" style="color: var(--text-2)" v-for="line in lineOfJsonpathPreview">{{ line }}</p>
							</div>
							<!-- container -->
							<div class="editor-jsonpath-container">
								<!-- preview -->
								<pre class="editor-jsonpath-preview-pre"
									 ref="editorJsonpathPreviewPre"><code 
									 class="editor-jsonpath-preview-code" 
									 ref="editorJsonpathPreviewCode" 
									 data-error="" 
									 :data-filename="models.fopen.name" 
									 v-highlighter="jsonpath.preview"></code></pre>
							</div>
						</div>
					</div>
					<div class="editor-main-structure" v-else-if="isStructureMode">
						<div class="edit-structure-wrapper"></div>
					</div>
					<div class="editor-main-nomode" v-else>
						<pre><code>-ne mode={{ mode }}; header={{ header }}</code></pre>
					</div>
				</div>
				<div class="alert">
					<div class="alert-group" v-if="Object.values( alerts ).filter( element => Boolean( element.message ) ).length >= 1">
						<div class="alert-single flex flex-left error" v-if="alerts.error.display">
							<div class="alert-slot">
								{{ alerts.error.message }}
							</div>
							<button class="alert-close flex flex-center" @click="[ alerts.error.display = false, alerts.error.message = null ]">
								<i class="bx bx-x"></i>
							</button>
						</div>
						<div class="alert-single flex flex-left info" v-if="alerts.info.display">
							<div class="alert-slot">
								{{ alerts.info.message }}
							</div>
							<button class="alert-close flex flex-center" @click="[ alerts.info.display = false, alerts.info.message = null ]">
								<i class="bx bx-x"></i>
							</button>
						</div>
						<div class="alert-single flex flex-left success" v-if="alerts.success.display">
							<div class="alert-slot">
								{{ alerts.success.message }}
							</div>
							<button class="alert-close flex flex-center" @click="[ alerts.success.display = false, alerts.success.message = null ]">
								<i class="bx bx-x"></i>
							</button>
						</div>
						<div class="alert-single flex flex-left warning" v-if="alerts.warning.display">
							<div class="alert-slot">
								{{ alerts.warning.message }}
							</div>
							<button class="alert-close flex flex-center" @click="[ alerts.warning.display = false, alerts.warning.message = null ]">
								<i class="bx bx-x"></i>
							</button>
						</div>
					</div>
				</div>
			</SwiperSlide>
		</Swiper>
	</div>
</template>

<style scoped>
	
	/*
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 * Editor Styling
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 *
	 */
	 .editor {
	}
	
	/*
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 * Editor SwiperJs Styling
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 *
	 */
	.swiper {
		width: 100%;
		height: 100%;
	}
		.editor-swiper-slide {
			height: 800px;
		}
		@media( max-width: 750px ) {
			.editor-swiper-slide {
				height: 660px;
			}
		}
		.editor-swiper-menu {
			min-width: 100px;
			width: 70%;
			max-width: 460px;
			background: var(--background-3);
			border-right: 1px solid var(--border-3);
		}
			.editor-main-header,
			.editor-menu-header {
				width: 100%;
				background: var(--background-2);
				border-bottom: 1px solid var(--border-2);
			}
				.editor-menu-header-wrapper {
					height: 71px;
				}
				.editor-menu-filenames {
					height: 94%;
				}
					.editor-filename-item {
						overflow: hidden;
						height: 7.2%;
						border-bottom: 1px solid var(--border-2);
						background: var(--background-3);
						position: relative;
						transition: background .4s ease, height .3s ease-in-out;
					}
					.editor-filename-item:hover {
						background: var(--background-4);
					}
					.editor-filename-item.active {
						background: var(--background-4);
						height: 60%;
					}
						.editor-filename-column {
							overflow: hidden;
						}
							.editor-filename-title {
								width: 86%;
							}
							@media( max-width: 750px ) {
								.editor-filename-title {
									width: 74%;
								}
							}
							.editor-filename-options {
								border: 0;
								background: inherit;
								gap: 7px;
								position: absolute;
								right: 14px;
							}
						.editor-filename-detail {
							border-top: 1px solid var(--border-4);
							background: var(--background-4);
						}
							.editor-filename-detail-container {
							}
								.editor-filename-detail-wrapper {
									width: 100%;
									overflow: hidden;
								}
									.editor-filename-detail-info {
									}
										.editor-filename-detail-hr,
										.editor-filename-detail-hr-end {
											width: 100%;
											border-top: 1px solid var(--border-4);
										}
										.editor-filename-detail-hr-end {
											width: 50%;
										}
									.editor-filename-detail-closeable {
										background: var(--background-4);
									}
			/* .editor-menu-filenames {
			}
				.editor-filename-column {
					
				}
					.editor-filename-title {
						
					}
					@media( max-width: 750px ) {
						.editor-filename-title {
							width: 74%;
						}
					}
					.editor-filename-options {
						border: 0;
						background: inherit;
						gap: 7px;
						position: absolute;
						right: 14px;
					} */
		.editor-swiper-main {
		}
	
	/*
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 * Editor Main Header Styling
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 *
	 */
	.editor-main-header {
		height: fit-content;
		position: relative;
	}
		.editor-main-header-wrapper {
			height: inherit;
			padding-top: 8px;
			position: relative;
		}
		@media( max-width: 750px ) {
			.editor-main-header-wrapper {
				display: block;
			}
		}
		.editor-main-header-wrapper.editable {
			/** background: aqua; */
		}
			.editable .editor-main-header-single-form, 
			.jsonpath .editor-main-header-single-form {
				/** background: red; */
				width: 38%;
			}
			@media( max-width: 750px ) {
				.editable .editor-main-header-single-form, 
				.jsonpath .editor-main-header-single-form {
					margin-bottom: 14px;
					width: 100%;
				}
			}
				.editable .editor-main-header-form,
				.jsonpath .editor-main-header-form,
				.searching .editor-main-header-form {
					/** background: teal; */
					position: relative;
					width: 100%;
				}
					.editable .editor-main-header-form-group,
					.jsonpath .editor-main-header-form-group,
					.searching .editor-main-header-form-group {
						/** background: purple; */
						padding-top: 10px;
						width: inherit;
					}
						.editable .editor-main-header-form-label,
						.jsonpath .editor-main-header-form-label,
						.searching .editor-main-header-form-label {
							top: .5px;
							left: 6.7px;
							color: var(--color-1);
							padding: 0px 4px 0px 4px;
							position: absolute;
							background: var(--background-2);
							font-weight: 450;
							font-size: 14px;
							font-family: var(--font-poppins);
						}
						.editable .editor-main-header-form-input,
						.jsonpath .editor-main-header-form-input,
						.searching .editor-main-header-form-input {
							width: 88%;
							padding-top: 8px;
							padding-left: 10px;
							padding-right: 10px;
							padding-bottom: 8px;
							letter-spacing: .1px;
							outline: none;
							border-radius: 4px 0px 0px 4px;
							border: 1px solid var(--border-1);
							background: var(--background-2);
							color: var(--color-2);
							font-size: 14px;
							font-family: var(--font-poppins);
							transition: all .3s;
						}
						.editable .editor-main-header-form-input:focus,
						.jsonpath .editor-main-header-form-input:focus,
						.searching .editor-main-header-form-input:focus {
							border-color: #007bff;
							color: var(--color-1);
						}
						.editable .editor-main-header-form-icon,
						.jsonpath .editor-main-header-form-icon,
						.searching .editor-main-header-form-icon {
							border: 1px solid var(--border-1);
							border-left: 0px;
							border-radius: 0px 4px 4px 0px;
							background: var(--background-3);
							width: 12%;
						}
							.editable .editor-main-header-form-icon .bx,
							.jsonpath .editor-main-header-form-icon .bx,
							.searching .editor-main-header-form-icon .bx {
							}
			/* .editable .editor-main-header-fszie,
			.jsonpath .editor-main-header-fszie */
			.searching .editor-main-header-fszie {
				left: 424px;
				position: absolute;
				background: red;
				top: 27px;
			}
			/* @media( max-width: 750px ) {
				.editable .editor-main-header-fszie,
				.jsonpath .editor-main-header-fszie,
				.searching .editor-main-header-fszie {
					display: none;
				}
			} */
			.editable .editor-main-header-tools,
			.jsonpath .editor-main-header-tools,
			.searching .editor-main-header-tools {
				/* background: teal; */
				gap: 14px;
				padding: 10px;
				position: absolute;
				right: 14px;
				top: 15px;
			}
			@media( max-width: 750px ) {
				.editable .editor-main-header-tools,
				.jsonpath .editor-main-header-tools,
				.searching .editor-main-header-tools {
					gap: 10.4px;
					padding: 0;
					position: static;
					width: 100%;
				}
			}
				.editable .editor-main-header-tools .bx,
				.jsonpath .editor-main-header-tools .bx,
				.searching .editor-main-header-tools .bx {
					/** background: lime; */
				}
		.editor-main-header-wrapper.jsonpath {
		}
			.jsonpath .editor-main-header-single-form {
			}
				.jsonpath .editor-main-header-form {
				}
					.jsonpath .editor-main-header-form-group {
					}
						.jsonpath .editor-main-header-form-label {
						}
						.jsonpath .editor-main-header-form-input {
						}
					.jsonpath .editor-main-header-form-icon {
					}
						.jsonpath .editor-main-header-form-icon .bx {
						}
			.jsonpath .editor-main-header-tools {
			}
		.editor-main-header-wrapper.searching {
			/** background: blue; */
		}
			.searching .editor-main-header-multiforms {
				/** background: lime; */
				width: 38%;
			}
			@media( max-width: 750px ) {
				.searching .editor-main-header-multiforms {
					margin-bottom: 14px;
					width: 100%;
				}
			}
				.searching .editor-main-header-form {
					/** background: orange; */
				}
				.searching .editor-main-header-form:first-child {
					margin-bottom: 14px;
				}
					.searching .editor-main-header-form-group {
					}
						.searching .editor-main-header-form-label {
						}
						.searching .editor-main-header-form-input {
							width: 76%;
						}
					.searching .editor-main-header-form-icon {
						border-radius: 0;
					}
					.searching .editor-main-header-form-icon:last-child {
						border-radius: 0px 4px 4px 0px;
					}
						.searching .editor-main-header-form-icon .bx {
						}
			.searching .editor-main-header-tools {
			}
	
	/*
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 * Editor Main Content Styling
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 *
	 */
	.editor-main-content {
		overflow: hidden;
	}
	.editor-main-content[data-header="editable"],
	.editor-main-content[data-header="jsonpath"] {
		height: 91.1%;
	}
	.editor-main-content[data-header="searching"] {
		height: 83.2%;
	}
	@media( max-width: 360px ) {
		.editor-main-content[data-header="editable"],
		.editor-main-content[data-header="jsonpath"] {
			height: 83.1%;
		}
		.editor-main-content[data-header="searching"] {
			height: 73.3%;
		}
	}
		.editor-main-editable {
			background: var(--hljs-background);
			height: 100%;
		}
		@media( max-width: 750px ) {
			.editor-main-editable,
			.editor-main-jsonpath {
				padding: 8px;
			}
		}
			.editor-editable-wrapper {
				background: var(--hljs-background);
				height: 100%;
				overflow: scroll;
				transition: scroll 0 ease;
				width: 100%;
			}
				.editor-main-line {
					width: 8%;
					height: fit-content;
					text-align: center;
				}
				@media( max-width: 1920px ) {
					.editor-main-line {
						width: 4%;
					}
				}
				@media( max-width: 1080px ) {
					.editor-main-line {
						width: 6%;
					}
				}
				@media( max-width: 360px ) {
					.editor-main-line {
						width: 16%;
					}
				}
					.editor-main-line-number {
						background: var(--hljs-background);
						border-right: 1px solid var(--border-3);
						color: var(--color-1);
						font-family: var(--font-fira);
						font-size: 14px;
						line-height: 2;
						text-align: center;
						width: 90%;
					}
				.editor-editable-container {
					background: var(--hljs-background);
					height: fit-content;
					/** margin-left: -38.4px; */
					/** opacity: .4; */
					position: relative;
					width: 92%;
				}
					@media( max-width: 1080px ) and ( max-width: 1080px ) {
						.editor-editable-container {
							width: 94%;
						}
					}
					@media( max-width: 360px ) {
						.editor-editable-container {
							width: 84%;
						}
					}
					.editor-editable-preview-pre,
					.editor-editable-preview-code,
					.editor-jsonpath-preview-pre,
					.editor-jsonpath-preview-code {
						
						scroll-behavior: auto;
						
						white-space: pre;
						word-spacing: normal;
						word-break: normal;
						word-wrap: normal;
						
						-moz-tab-size: 4;
						-o-tab-size: 4;
						tab-size: 4;
						
						-webkit-hyphens: none;
						-moz-hyphens: none;
						-ms-hyphens: none;
						hyphens: none;
					}
					.editor-editable-preview-pre,
					.editor-jsonpath-preview-pre {
						overflow-y: auto;
						pointer-events: none;
						white-space: normal;
						width: 100%;
					}
						.editor-editable-preview-code,
						.editor-jsonpath-preview-code {
							color: var(--hljs-color);
							font-family: var(--font-fira);
							font-size: 14px;
							line-height: 2;
							overflow: hidden;
							pointer-events: none;
						}
					.editor-editable-textarea,
					.editor-jsonpath-textarea {
						background: transparent;
						border: 0;
						border-radius: 0;
						caret-color: var(--hljs-color);
						color: transparent;
						/*field-sizing: fixed;*/
						font-family: var(--font-fira);
						font-size: 14px;
						height: auto;
						left: 0;
						line-height: 2;
						outline: none;
						overflow-y: scroll;
						overflow-wrap: break-word;
						position: absolute;
						/*resize: none;*/
						scroll-behavior: auto;
						-webkit-text-fill-color: transparent;
						top: 0;
						width: 100%;
						white-space: nowrap;
						word-wrap: brak-word;
						/**background: red;
						opacity: .4;*/
					}
					
		.editor-main-jsonpath {
			background: #e5e6e9;
			gap: 14px;
			height: 100%;
			/* flex-wrap: wrap; */
		}
		[data-theme="dark"] .editor-main-jsonpath {
			background: #2e2f38;
		}
		@media( max-width: 360px ) {
			.editor-main-jsonpath {
				display: block;
				overflow-x: scroll;
			}
		}
			.editor-jsonpath-wrapper {
				background: var(--hljs-background);
				border-radius: 4px;
				height: 100%;
				overflow: scroll;
				transition: scroll 0 ease;
				width: 50%;
			}
			@media( max-width: 360px ) {
				.editor-jsonpath-wrapper {
					width: 100%;
				}
				.editor-jsonpath-wrapper:first-child {
					margin-bottom: 8px;
				}
			}
				.editor-jsonpath-wrapper .editor-main-line {
					width: 8%;
				}
				@media( max-width: 1080px ) {
					.editor-jsonpath-wrapper .editor-main-line {
						width: 14%;
					}
				}
				@media( max-width: 360px ) {
					.editor-jsonpath-wrapper .editor-main-line {
						width: 16%;
					}
				}
				.editor-jsonpath-container {
					background: var(--hljs-background);
					height: fit-content;
					/** margin-left: -38.4px; */
					/** opacity: .4; */
					position: relative;
					width: 92%;
				}
				@media( max-width: 1080px ) {
					.editor-jsonpath-container {
						width: 86%;
					}
				}
				@media( max-width: 360px ) {
					.editor-jsonpath-container {
						width: 84%;
					}
				}
					.editor-jsonpath-preview-pre {
					}
						.editor-jsonpath-preview-code {
						}
					.editor-jsonpath-textarea {
					}
			.editor-jsonpath-wrapper {
			}
				.editor-main-line {
				}
				.editor-jsonpath-container {
				}
					.editor-jsonpath-preview-pre {
					}
						.editor-jsonpath-preview-code {
						}
		.editor-main-structure {
			display: none;
		}
			.edit-structure-wrapper {
			}
		.editor-main-nomode {
			display: none;
		}
	
	/*
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 * Editor Alert Styling
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 *
	 */
	.alert {
		top: unset;
		bottom: 0;
	}
	
</style>
