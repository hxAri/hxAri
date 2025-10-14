
<script>
	
	import { mapState } from "vuex";
	
	// Import HightlighterJs.
	import hljs from "highlight.js";
	
	// Import Jsonpath.
	import Jsonpath from "jsonpath";
	
	// Import Scripts.
	import Common from "/src/scripts/Common.js";
	import UnixTime from "/src/scripts/UnixTime.js";
	import Fmt from "/src/scripts/Fmt.js";
	import Not from "/src/scripts/logics/Not.js";
	import Shorttext from "/src/scripts/Shorttext.js";
	import Type from "/src/scripts/Type.js";
	import Value from "/src/scripts/logics/Value.js";
	
	// Import Swiper CSS.
	import "swiper/css";
	
	// Import Swiper Vue.
	import { Swiper, SwiperSlide } from "swiper/vue";
	
	export default {
		data: () => ({
			alert: {
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
			draft: null,
			filenames: [],
			lineno: "",
			metadata: ( filename, contents, created=0 ) => {
				if( created === 0 ) {
					created = new UnixTime().timestamp();
				}
				return {
					owner: "union",
					contents: contents,
					filename: filename,
					metadata: {
						created: created,
						updated: new UnixTime().timestamp()
					}
				};
			},
			models: {
				filename: "",
				replace: "",
				jsonpath: {
					schema: "$.",
					preview: "[]"
				},
				search: "",
				textarea: {
					editable: ""
				}
			},
			preview: {
				editable: ""
			},
			setting: {
				default: {
					filename: "New File",
					contents: JSON.stringify( { union: [ 0x2, 0xe, 0x10 ] }, null, 4 )
				},
				header: 0x1,
				headers: {
					editable: 0x1,
					jsonpath: 0x2,
					searching: 0x4
				},
				keysets: {
					draft: Fmt( "0x{}", Common.bin2hex( "draft" ) ),
					filename: Fmt( "0x{}", Common.bin2hex( "filename" ) ),
					fileopen: Fmt( "0x{}", Common.bin2hex( "fileopen" ) )
				},
				mode: 0x1,
				modes: {
					editable: 0x1,
					jsonpath: 0x2,
					structure: 0x3
				},
				position: null,
				previous: {
					header: 0x1,
					mode: 0x1
				}
			}
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
			
			...mapState([
				"configs",
				"terminal"
			]),
			
			/**
			 * Return current header keyset name.
			 *
			 * @return String
			 */
			header: function() {
				for( let keyset of Object.keys( this.setting.headers ) ) {
					if( this.setting.header === this.setting.headers[keyset] ) {
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
				return [ this.setting.modes.editable, this.setting.modes.jsonpath ].indexOf( this.setting.mode ) >= 0;
			},
			
			/**
			 * Return if efitor is Editable or Structure mode.
			 *
			 * @return Boolean
			 */
			isEditableOrStructureMode: function() {
				return [ this.setting.modes.editable, this.setting.modes.structure ].indexOf( this.setting.mode ) >= 0;
			},
			
			/**
			 * Return if editor is Editable mode.
			 *
			 * @return Boolean
			 */
			isEditableMode: function() {
				return this.setting.mode === this.setting.modes.editable;
			},
			
			/**
			 * Return if editor is Editable header.
			 *
			 * @return Boolean
			 */
			isEditableHeader: function() {
				return this.setting.header === this.setting.headers.editable;
			},
			
			/**
			 * Return if editor is Jsonpath mode.
			 *
			 * @return Boolean
			 */
			isJsonpathMode: function() {
				return this.setting.mode === this.setting.modes.jsonpath;
			},
			
			/**
			 * Return if editor is Jsonpath header.
			 *
			 * @return Boolean
			 */
			isJsonpathHeader: function() {
				return this.setting.header === this.setting.headers.jsonpath;
			},
			
			/**
			 * Return if editor is Structure mode.
			 *
			 * @return Boolean
			 */
			isStructureMode: function() {
				return this.setting.mode === this.setting.modes.structure;
			},
			
			/**
			 * Return if editor is Searching header.
			 *
			 * @return Boolean
			 */
			isSearchingHeader: function() {
				return this.setting.header === this.setting.headers.searching;
			},
			
			/**
			 * Return list of line number.
			 *
			 * @return Array<String>
			 */
			lines: function() {
				return this.splitline( this.models.textarea.editable.split( "\x0a" ) );
			},
			
			/**
			 * Return list of line number jsonpath preview.
			 *
			 * @return Array<String>
			 */
			lineOfJsonpathPreview: function() {
				if( this.isJsonpathMode ) {
					return this.splitline( this.models.jsonpath.preview.split( "\x0a" ) );
				}
				return [];
			},
			
			/**
			 * Return current mode keyset name.
			 *
			 * @return String
			 */
			 mode: function() {
			 	for( let keyset of Object.keys( this.setting.modes ) ) {
			 		if( this.setting.modes[keyset] === this.setting.mode ) {
			 			return keyset;
			 		}
			 	}
			 }
			
		},
		directives: {
			
			/**
			 * Auto highlight html element.
			 *
			 * @param {HTMLElement} el
			 * @param {Object} binding
			 *
			 * @return Void
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
					if( Value.isNotEmpty( el.dataset.error ) ) {
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
			
			fsize: function( file ) {
				return new TextEncoder().encode( file.contents ).length
			},
			
			/**
			 * Minify Json string.
			 *
			 * @return Void
			 */
			minify: function() {
				if( this.isEditableOrJsonpathMode ) {
					if( Value.isEmpty( this.alert.error.message ) ) {
						this.models.textarea.editable = JSON.stringify( JSON.parse( this.models.textarea.editable ) );
					}
				}
			},
			
			/**
			 * Close current opened file.
			 *
			 * @param {PointerEvent} e
			 *
			 * @return Void
			 */
			onclose: function( e ) {
				if( Type( this.setting.position, Number ) ) {
					this.save();
					this.setting.position = null;
					if( Type( this.draft, Object ) ) {
						this.models.filename = this.draft.filename;
						this.models.textarea.editable = this.draft.contents;
						localStorage.removeItem( this.setting.keysets.fileopen );
					}
					else {
						this.onnew( e );
					}
				}
				else {
					this.onnew( e );
				}
				this.validator();
			},
			
			/**
			 * Handle change mode or header.
			 *
			 * @param {Number} mode
			 * @param {Number} header
			 *
			 * @return Void
			 */
			onchange: function( mode, header ) {
				if( Type( mode, Number ) ) {
					this.setting.previous.mode = this.setting.mode;
					this.setting.mode = mode;
				}
				if( Type( header, Number ) ) {
					this.setting.previous.header = this.setting.header;
					this.setting.header = header;
				}
			},
			
			/**
			 * Handle copy text into clipboard.
			 *
			 * @param {PointerEvent} e
			 *
			 * @return Void
			 */
			oncopy: function( e ) {
				var self = this;
				var contents = this.models.textarea.editable;
				var textarea = null;
				switch( this.setting.mode ) {
					case this.setting.modes.editable:
						textarea = this.$refs.editorEditableTextarea;
						break;
					case this.setting.modes.jsonpath:
						textarea = this.$refs.editorJsonpathTextarea;
						break;
				}
				if( textarea !== null ) {
					var selectionEnd = textarea.selectionEnd;
					var selectionStart = textarea.selectionStart;
					if( selectionEnd !== selectionStart ) {
						contents = contents.substring( selectionStart, selectionEnd );
					}
					window.navigator.clipboard.writeText( contents )
						.then( function() {
							self.alert.info = {
								display: true,
								message: "Text copied into clipboard"
							};
						})
						.catch( function( error ) {
							self.alert.error = {
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
						});
				}
			},
			
			/**
			 * Handle textarea input event.
			 *
			 * @param {InputEvent} e
			 *
			 * @return Void
			 */
			oninput: function( e ) {
				this.models.textarea.editable = this.models.textarea.editable.replaceAll( /\t/gms, "\x20".repeat( 4 ) );
				this.save();
				this.validator();
				this.onscroll( e );
			},
			
			/**
			 * Handle textarea keyboard event.
			 *
			 * @param {KeyboardEvent} e
			 *
			 * @return Void
			 */
			onkeydown: function( e ) {
				var textarea = null;
				switch( this.setting.mode ) {
					case this.setting.modes.editable:
						textarea = this.$refs.editorEditableTextarea;
						break;
					case this.setting.modes.jsonpath:
						textarea = this.$refs.editorJsonpathTextarea;
						break;
				}
				if( textarea !== null ) {
					var position = textarea.selectionStart;
					var positionUpdated = position;
					var explodedEnd = this.models.textarea.editable.substring( textarea.selectionEnd );
					var explodedMidle = this.models.textarea.editable.substring( position, textarea.selectionEnd );
					var explodedStart = this.models.textarea.editable.substring( 0, position );
					switch( e.keyCode ) {
						case 8:
							if( textarea.selectionStart === textarea.selectionEnd ) {
								var char = explodedStart[( explodedStart.length -1 )];
								if( [ "\x5b", "\x7b" ].indexOf( char ) >= 0 ) {
									this.models.textarea.editable = explodedStart.substring( 0, explodedStart.length-1 );
									var lines = explodedEnd.split( "\x0a" );
									if( lines[0][0] === "\x5d" && char === "\x5b" ||
										lines[0][0] === "\x7d" && char === "\x7b" ) {
										lines[0] = lines[0].slice( 1, lines[0].length )
										this.models.textarea.editable+= lines.join( "\x0a" );
									}
									else {
										this.models.textarea.editable+= explodedEnd;
									}
									positionUpdated--;
								}
							}
							break;
						case 9:
							this.models.textarea.editable = this.models.textarea.editable.substring( 0, position ) + "\x20".repeat( 4 ) + this.models.textarea.editable.substring( position );
							positionUpdated+=4;
							break;
						case 13:
							var char = [];
							var splited = explodedStart.split( "\x0a" ).pop();
							var matches = splited.match( /^(?:\t|\x20+)/ );
							var matchar = splited.match( /(?:[\r\x20\t]*)(?<prefix>(?:(?:\"(?:(?:[^\"\\\\]|\\.)*)\"(?:[\r\x20\t]*)\:))|(?<schar>\[))?(?:[\r\x20\t]*)(?<char>\[|\{)(?:[\r\x20\t]*)?$/ );
							if( matches !== null ) {
								this.models.textarea.editable = explodedStart;
								this.models.textarea.editable+= "\x0a";
								this.models.textarea.editable+= matches[0];
								positionUpdated = this.models.textarea.editable.length;
								if( matchar !== null ) {
									if( Value.isNotEmpty( matchar.groups.schar ) ) {
										console.log({
											splited: "\"" + splited + "\"",
											matches: matches,
											matchar: matchar
										});
										if( matchar.groups.schar === "\x5b" && [ "\x5b", "\x7b" ].indexOf( matchar.groups.char ) >= 0 ) {
											if( matchar.groups.char === "\x5b" ) {
												alert( "schar == && indexOf >= && char ==" );
											}
											else {
												alert( "schar == && indexOf >= && char !=" );
											}
										}
										else {
											alert( "Matchar char available" );
										}
									}
									else {
										var endlines = explodedEnd.split( "\x0a" );
										var endline = "";
										if( Value.isNotEmpty( endlines ) ) {
											for( let line of endlines ) {
												if( Value.isNotEmpty( line ) ) {
													endline = line;
													break;
												}
											}
										}
										var charstart = [ matchar.groups.char === "\x5b" ? "\x5d" : "\x7d" ];
											charstart.push( new RegExp( `^(?:[\\x20]{${matches[0].length}})?\\${charstart[0]}` ) );
										console.log({
											charstart: charstart,
											endline: Fmt( "\"{}\"", endline ),
											testing: charstart[1].test( endline )
										});
										this.models.textarea.editable+= "\x20".repeat( 4 );
										if( charstart[1].test( endline ) === false ) {
											this.models.textarea.editable+= "\x0a";
											this.models.textarea.editable+= matches[0];
											this.models.textarea.editable+= charstart[0];
										}
										else {
											if( endline.length === 1 && endlines.indexOf( endline ) === 1 ) {
												this.models.textarea.editable+= "\x0a";
												this.models.textarea.editable+= matches[0];
												this.models.textarea.editable+= charstart[0];
											}
											else {
												this.models.textarea.editable+= "\x0a";
												this.models.textarea.editable+= matches[0];
											}
										}
										positionUpdated+= 4;
									}
								}
								else {
									positionUpdated = this.models.textarea.editable.length;
								}
								this.models.textarea.editable+= explodedEnd;
							}
							else if( Value.isNotEmpty( matchar ) ) {
								if( Value.isNotEmpty( matchar.groups.char ) ) {
									var endlines = explodedEnd.split( "\x0a" );
										var endline = "";
										if( Value.isNotEmpty( endlines ) ) {
											for( let line of endlines ) {
												if( Value.isNotEmpty( line ) ) {
													endline = line;
													break;
												}
											}
										}
									var charstart = [ matchar.groups.char === "\x5b" ? "\x5d" : "\x7d" ];
										charstart.push( new RegExp( `^\\${charstart[0]}` ) );
									if( charstart[1].test( endline ) === false ) {
										this.models.textarea.editable = explodedStart;
										this.models.textarea.editable+= "\x0a";
										this.models.textarea.editable+= "\x20".repeat( 4 );
										this.models.textarea.editable+= "\x0a";
										this.models.textarea.editable+= charstart[0];
									}
									else {
										this.models.textarea.editable = explodedStart;
										this.models.textarea.editable+= "\x0a";
										this.models.textarea.editable+= "\x20".repeat( 4 );
										this.models.textarea.editable+= "\x0a";
									}
									this.models.textarea.editable+= explodedEnd;
									positionUpdated+=4;
								}
								else {
									alert( "No matchar" )
								}
							}
							else {
							}
							break;
						case 219:
							if( textarea.selectionStart === textarea.selectionEnd ) {
								var char = e.key === "\x5b" ? "\x5d" : ( e.key === "\x7b" ? "\x7d" : "" );
								this.models.textarea.editable = explodedStart;
								this.models.textarea.editable+= e.key;
								this.models.textarea.editable+= explodedEnd[0] !== char ? char : "";
								this.models.textarea.editable+= explodedEnd;
								positionUpdated++;
							}
							break;
						case 222:
							if( e.key === "\x22" ) {
								if( textarea.selectionStart === textarea.selectionEnd ) {
									this.models.textarea.editable = explodedStart;
									if( explodedStart[( explodedStart.length -1 )] === "\x22" ) {
										if( explodedEnd[0] !== "\x22" ) {
											this.models.textarea.editable+= "\x22";
										}
									}
									else {
										this.models.textarea.editable+= "\x22";
										if( explodedEnd[0] !== "\x22" ) {
											this.models.textarea.editable+= "\x22";
										}
									}
									this.models.textarea.editable+= explodedEnd;
									positionUpdated++;
								}
								else {
									this.models.textarea.editable = explodedStart;
									this.models.textarea.editable+= "\x22";
									this.models.textarea.editable+= explodedMidle;
									this.models.textarea.editable+= "\x22";
									this.models.textarea.editable+= explodedEnd;
									positionUpdated = [ explodedStart, explodedMidle ].join( "" ).length +2;
								}
							}
							break;
						default:
							// console.log( e. );
							break;
					}
					this.save();
					this.validator();
					this.$nextTick(() => {
						if( position !== positionUpdated ) {
							textarea.selectionStart = textarea.selectionEnd = positionUpdated;
							e.preventDefault();
						}
					});
				}
			},
			
			/**
			 * Handle create new file.
			 *
			 * @param {PointerEvent} e
			 *
			 * @return Void
			 */
			onnew: function( e ) {
				this.models.filename = this.setting.default.filename;
				this.models.textarea.editable = this.setting.default.contents;
				this.setting.position = null;
				localStorage.removeItem( this.setting.keysets.fileopen );
			},
			
			/**
			 * Handle open existing file.
			 *
			 * @param {Object} file
			 * @param {Number} index
			 *
			 * @return Void
			 */
			onopen: function( file, index ) {
				this.save();
				this.models.filename = file.filename;
				this.models.textarea.editable = file.contents;
				this.setting.position = index;
				this.save();
				this.validator();
			},
			
			/**
			 * Handle paste text from clipboard.
			 *
			 * @param {PointerEvent} e
			 *
			 * @return Void
			 */
			onpaste: function( e ) {
				var self = this;
				var contents = this.models.textarea.editable;
				var textarea = null;
				switch( this.setting.mode ) {
					case this.setting.modes.editable:
						textarea = this.$refs.editorEditableTextarea;
						break;
					case this.setting.modes.jsonpath:
						textarea = this.$refs.editorJsonpathTextarea;
						break;
				}
				if( textarea !== null ) {
					var selectedEnd = contents.substring( textarea.selectionEnd );
					var selectedStart = contents.substring( 0, textarea.selectionStart );
					window.navigator.clipboard.readText()
						.then( function( text ) {
							self.models.textarea.editable = contents = selectedStart;
							self.models.textarea.editable+= text;
							self.models.textarea.editable+= selectedEnd;
						})
						.catch( function( error ) {
							self.alert.error = {
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
						});
				}
			},
			
			/**
			 * Handle jsonpath scheme on change and input.
			 *
			 * @param {Event} e
			 *
			 * @returns {Void}
			 */
			onpath: function( e ) {
				if( Value.isEmpty( this.alert.error.message ) ) {
					try {
						var object = JSON.parse( this.models.textarea.editable );
						var result = Jsonpath.query( object, this.models.jsonpath.schema );
						this.models.jsonpath.preview = JSON.stringify( result, null, 4 );
					}
					catch( error ) {
						this.models.jsonpath.preview = "[]";
					}
				}
			},
			
			/**
			 * Handle save file contents.
			 *
			 * @param {Event} e
			 *
			 * @return {Void}
			 */
			onsave: function( e ) {
				if( Value.isNotEmpty( this.models.filename ) ) {
					var message = "Successfully saved to localStorage";
					if( Not( this.setting.position, Number ) ) {
						if( this.filenames.some( file => file.filename === this.models.filename ) ) {
							alert( "Filename Exists" );
						}
						else {
							this.setting.position = this.filenames.push(
								this.metadata(
									this.models.filename,
									this.models.textarea.editable
								)
							);
							this.setting.position-= 1;
							this.models.filename = this.filenames[this.setting.position].filename;
							this.draft = null;
							
							localStorage.setItem( this.setting.keysets.fileopen, this.filenames[this.setting.position].filename );
							localStorage.setItem( this.setting.keysets.filename, JSON.stringify( this.filenames ) );
							localStorage.removeItem( this.setting.keysets.draft );
						}
					}
					else {
						this.save();
						message = Fmt( "{}: updated content localStorage", this.filenames[this.setting.position].filename );
					}
					this.alert.info = {
						display: true,
						message: message
					};
				}
				else {
					this.alert.error = {
						info: {
							line: 0,
							column: 0,
							position: 0,
							expected: null,
							unexpected: null
						},
						display: true,
						message: "Filename can't be empty"
					};
				}
			},
			
			/**
			 * Handle scroll syncronization.
			 *
			 * @param {Event|FocusEvent} e
			 *
			 * @return {Void}
			 */
			onscroll: function( e ) {
				switch( this.setting.mode ) {
					case this.setting.modes.editable:
						this.$refs.editorEditablePre.scrollTop = e.target.scrollTop;
						this.$refs.editorEditablePre.scrollLeft = e.target.scrollLeft;
						break;
					case this.setting.modes.jsonpath:
						this.$refs.editorJsonpathPre.scrollTop = e.target.scrollTop;
						this.$refs.editorJsonpathPre.scrollLeft = e.target.scrollLeft;
						break;
				}
			},
			
			/**
			 * Parse JSONError.
			 *
			 * @param {Error} error
			 *
			 * @return {Object}
			 */
			parserr: function( error ) {
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
					if( Value.isNotEmpty( matches.groups.expected ) ) {
					}
					if( Value.isNotEmpty( matches.groups.unexpected ) && 
						Value.isNotEmpty( matches.groups.token ) ) {
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
			
			/**
			 * Prettify Json string.
			 *
			 * @return Void
			 */
			prettify: function() {
				if( this.isEditableOrJsonpathMode ) {
					if( Value.isEmpty( this.alert.error.message ) ) {
						this.models.textarea.editable = JSON.stringify( JSON.parse( this.models.textarea.editable ), null, 4 );
					}
				}
			},
			
			/**
			 * Shorttext filename.
			 *
			 * @param {String} filename
			 *
			 * @return String
			 */
			shorttext: function( filename ) {
				if( Common.isMobileUserAgent() ) {
					return Shorttext( filename, 23 );
				}
				return Shorttext( filename, 48 );
			},
			
			showFileDetail: function( index ) {
				var element = document.getElementById( Fmt( "editor-filename-item-{}", index ) );
				if( Type( element, HTMLDivElement ) ) {
					element.classList.toggle( "active" );
				}
			},
			
			/**
			 * Save current file.
			 *
			 * @return Void
			 */
			save: function() {
				var textarea = this.models.textarea.editable;
				var filename = this.models.filename;
				var position = this.setting.position;
				if( Type( position, Number ) ) {
					if( Value.isEmpty( filename ) ) {
						filename = this.filenames[position].filename;
					}
					this.filenames[position] = this.metadata( filename, textarea, this.filenames[position].metadata.created );
					localStorage.setItem( this.setting.keysets.fileopen, filename );
					localStorage.setItem( this.setting.keysets.filename, JSON.stringify( this.filenames ) );
				}
				else {
					var created = 0;
					if( Value.isEmpty( filename ) ) {
						filename = this.setting.default.filename;
					}
					if( Type( this.draft, Object ) ) {
						created = this.draft.metadata.created;
					}
					this.draft = this.metadata( filename, textarea, created );
					localStorage.setItem( this.setting.keysets.draft, JSON.stringify( this.draft ) );
				}
			},
			
			/**
			 * Split content as lines.
			 * 
			 * @param {String} contents 
			 * 
			 * @returns {Array<String>}
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
			
			strftime: function( timestamp ) {
				if( Common.isMobile() ) {
					return new UnixTime( timestamp ).format( "%d, %m %Y %H:%M:%S" );
				}
				return new UnixTime( timestamp ).format( "%d, %B %Y %H:%M:%S" );
			},
			
			/**
			 * Validate JSON string.
			 *
			 * @return Void
			 */
			validator: function() {
				
				var language = "json";
				var contents = this.models.textarea.editable;
				var explodes = contents.split( "\x0a" );
				var heading = explodes[0];
				var matches = null;
				
				if( ( matches = /\.(?<language>[a-zA-Z]+)$/.exec( this.models.filename ) ) !== null ) {
					language = matches.groups.language;
				}
				else if( ( matches = /^#\!\/usr\/bin\/env\x20+(?<language>[a-zA-Z]+)[\x20\t]?$/i.exec( heading ) ) !== null ) {
					language = matches.groups.language;
				}
				
				try {
					if( Value.isNotEmpty( contents ) && language === "json" ) {
						JSON.parse( contents );
					}
					this.alert.error = {
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
					this.alert.error = {
						info: this.parserr( e ),
						display: true,
						message: new String( e )
					};
				}
			}
			
		},
		created: function() {
			var draft = localStorage.getItem( this.setting.keysets.draft );
			if( Type( draft, String ) ) {
				try {
					this.draft = JSON.parse( draft );
					this.models.filename = this.draft.filename;
					this.models.textarea.editable = this.draft.contents;
				}
				catch( e ) {
					this.draft = null;
					this.models.filename = this.setting.default.filename;
					this.models.textarea.editable = this.setting.default.contents;
				}
			}
			else {
				this.models.filename = this.setting.default.filename;
				this.models.textarea.editable = this.setting.default.contents;
			}
			var filenames = localStorage.getItem( this.setting.keysets.filename );
			if( Type( filenames, String ) ) {
				try {
					this.filenames = JSON.parse( filenames );
					this.filenames = this.filenames.filter( file => Value.isNotEmpty( file ) );
				}
				catch( e ) {
					this.filenames = [];
				}
				localStorage.setItem( this.setting.keysets.filename, JSON.stringify( this.filenames ) );
			}
			var fileopen = localStorage.getItem( this.setting.keysets.fileopen );
			if( Type( fileopen, String ) ) {
				if( Value.isNotEmpty( this.filenames ) ) {
					for( let i in this.filenames ) {
						var file = this.filenames[i];
						if( file.filename === fileopen ) {
							this.models.filename = file.filename;
							this.models.textarea.editable = file.contents;
							this.setting.position = parseInt( i ); // seriuosly Number from iteration is String? Fuck JavaScript!
							break;
						}
					}
				}
				if( Not( this.setting.position, Number ) ) {
					this.alert.error = {
						info: {
							line: 0,
							column: 0,
							position: 0,
							expected: null,
							unexpected: null
						},
						display: true,
						message: Fmt( "{}: No such file or directory", fileopen )
					};
				}
			}
			var home = null;
			// try {
			// 	home = this.terminal.ls( Fmt( "/home/{}/.editor", this.terminal.user ) );
			// 	home.child = [];
			// }
			// catch( e ) {
			// 	home = this.terminal.ls( Fmt( "/home/{}", this.terminal.user ) );
			// 	home.push({
			// 		name: ".editor",
			// 		type: "path",
			// 		meta: {
			// 			mode: 755,
			// 			group: this.terminal.user,
			// 			owner: this.terminal.user
			// 		},
			// 		child: [
			// 		]
			// 	});
			// }
			// home.child = [
			// 	{
			// 		name: this.setting.keysets.draft,
			// 		type: "file",
			// 		meta: {
			// 			mode: 755,
			// 			group: this.terminal.user,
			// 			owner: this.terminal.user
			// 		},
			// 		read: this.draft
			// 	},
			// 	{
			// 		name: this.setting.keysets.filename,
			// 		type: "path",
			// 		meta: {
			// 			mode: 755,
			// 			group: this.terminal.user,
			// 			owner: this.terminal.user
			// 		},
			// 		child: this.filenames
			// 			.filter( file => Value.isNotEmpty( file ) )
			// 			.map( file => ({
			// 			name: file.filename,
			// 			type: "file",
			// 			meta: {
			// 				mode: 755,
			// 				group: this.terminal.user,
			// 				owner: this.terminal.user
			// 			},
			// 			read: file.contents
			// 		}))
			// 	}
			// ];
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
						Local Storage
					</div>
				</div>
				<div class="editor-menu-filenames scroll-x scroll-hidden">
					<div class="editor-filename-item" :id="( 'editor-filename-item-' + index )" v-for="file, index in this.filenames">
						<div class="editor-filename-column flex flex-left pd-14">
							<p class="editor-filename-title text" @click="onopen( file, index )">{{ shorttext( file.filename ) }}</p>
							<div class="editor-filename-options flex flex-center">
								<i class="bx bx-trash fs-22" @click="" title="Remove File"></i>
								<i class="bx bx-info-circle fs-22" @click="showFileDetail( index )" title="File Options"></i>
							</div>
						</div>
						<div class="editor-filename-detail" :id="( 'editor-filename-detail-' + index )">
							<div class="editor-filename-detail-container flex flex-center">
								<div class="editor-filename-detail-wrapper">
									<div class="editor-filename-detail-info pd-14">
										<p class="editor-filename-detail-info text">
											- Owner <span class="fb-45">{{ file.owner }}</span>
										</p>
										<hr class="editor-filename-detail-hr mg-bottom-14 mg-top-14" />
										<p class="editor-filename-detail-info text">
											- Sizes <span class="fb-45">{{ fsize( file ) }}</span>
										</p>
										<hr class="editor-filename-detail-hr mg-bottom-14 mg-top-14" />
										<p class="editor-filename-detail-info text">
											- Created <span class="fb-45">{{ strftime( file.metadata.created ) }}</span>
										</p>
										<hr class="editor-filename-detail-hr mg-bottom-14 mg-top-14" />
										<p class="editor-filename-detail-info text">
											- Updated <span class="fb-45">{{ strftime( file.metadata.updated ) }}</span>
										</p>
									</div>
									<hr class="editor-filename-detail-hr-end" />
									<div class="editor-filename-detail-closeable flex flex-center pd-14" @click="showFileDetail( index )">
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
									<input class="editor-main-header-form-input" ref="filename" type="text" autocomplete="off" autocorrect="off" :spellcheck="false" @change="onsave" v-model="models.filename" />
									<div class="editor-main-header-form-icon flex flex-center">
										<i class="bx bx-x fs-22" @click="onclose" title="Close File"></i>
									</div>
								</div>
							</div>
						</div>
						<div class="editor-main-header-tools flex flex-center">
							<i class="bx bx-plus fs-22" @click="onnew" title="New File"></i>
							<i class="bx bx-file fs-22" @click="" title="Open File"></i>
							<i class="bx bx-align-right fs-22" @click="minify" title="Minify"></i>
							<i class="bx bx-align-middle fs-22" @click="prettify" title="Prettify"></i>
							<i class="bx bx-cloud-download fs-22" @click="onsave" title="Save to localStorage"></i>
							<i class="bx bx-copy fs-22" @click="oncopy" title="Copy to Clipboard"></i>
							<i class="bx bx-paste fs-22" @click="onpaste" title="Paste from Clipboard"></i>
							<i class="bx bx-search fs-22" @click="onchange( null, setting.headers.searching )" title="Search"></i>
							<i class="bx bx-vector fs-22" @click="onchange( setting.modes.jsonpath, setting.modes.jsonpath )" title="Jsonpath"></i>
							<i class="bx bxs-extension fs-22" @click="onchange( setting.modes.editable, setting.headers.editable )" title="Close Tree Mode" v-if="isStructureMode"></i>
							<i class="bx bx-extension fs-22" @click="onchange( setting.modes.structure, setting.headers.editable )" title="Tree Mode" v-else></i>
						</div>
					</div>
					<div class="editor-main-header-wrapper jsonpath flex flex-left pd-14" v-else-if="( isJsonpathMode && isJsonpathHeader )">
						<div class="editor-main-header-single-form flex flex-left">
							<div class="editor-main-header-form flex">
								<div class="editor-main-header-form-group flex">
									<label class="editor-main-header-form-label" for="schema">Schema</label>
									<input class="editor-main-header-form-input" ref="schema" type="text" autocomplete="off" autocorrect="off" placeholder="$." :spellcheck="false" @change="onpath" @input="onpath" v-model="models.jsonpath.schema" />
									<div class="editor-main-header-form-icon flex flex-center">
										<i class="bx bx-hash fs-22"></i>
									</div>
								</div>
							</div>
						</div>
						<div class="editor-main-header-tools flex flex-center">
							<i class="bx bx-arrow-back fs-22" @click="onchange( setting.previous.mode, setting.previous.header )" title="Back"></i>
							<i class="bx bx-align-right fs-22" @click="minify" title="Minify"></i>
							<i class="bx bx-align-middle fs-22" @click="prettify" title="Prettify"></i>
							<i class="bx bx-cloud-download fs-22" @click="onsave" title="Save to localStorage"></i>
							<i class="bx bx-copy fs-22" @click="oncopy" title="Copy to Clipboard"></i>
							<i class="bx bx-paste fs-22" @click="onpaste" title="Paste from Clipboard"></i>
							<i class="bx bx-extension fs-22" @click="onchange( setting.modes.structure, setting.headers.editable )" title="Tree Mode"></i>
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
							<i class="bx bx-arrow-back fs-22" @click="onchange( null, setting.previous.header )" title="Back"></i>
							<i class="bx bx-align-right fs-22" @click="minify" title="Minify"></i>
							<i class="bx bx-align-middle fs-22" @click="prettify" title="Prettify"></i>
							<i class="bx bx-cloud-download fs-22" @click="onsave" title="Save to localStorage"></i>
							<i class="bx bx-copy fs-22" @click="oncopy" title="Copy to Clipboard"></i>
							<i class="bx bx-paste fs-22" @click="onpaste" title="Paste from Clipboard"></i>
							<i class="bx bx-vector fs-22" @click="onchange( setting.modes.jsonpath, setting.modes.jsonpath )" title="Path"></i>
							<i class="bx bxs-extension fs-22" @click="onchange( setting.modes.editable, setting.modes.editable )" title="Close Tree Mode" v-if="isStructureMode"></i>
							<i class="bx bx-extension fs-22" @click="onchange( setting.modes.structure, setting.modes.editable )" title="Tree Mode" v-else></i>
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
								<p class="editor-main-line-number" :style="{ color: alert.error.info.line === parseInt( line ) ? 'var(--hljs-red)' : 'var(--text-2)' }" v-for="line in lines">{{ line }}</p>
							</div>
							<div class="editor-editable-container">
								<pre class="editor-editable-preview-pre" 
									 ref="editorEditablePre"><code 
									 class="editor-editable-preview-code" 
									 ref="editorEditableCode" 
									 :data-error="JSON.stringify( alert.error.info )" 
									 :data-filename="models.filename" 
									 v-highlighter="models.textarea.editable"></code></pre>
								<textarea 
									class="editor-editable-textarea scroll-hidden" 
									autocapitalize="off" 
									autocomplete="off" 
									autocorrect="off" 
									id="editable" 
									spellcheck="false" 
									ref="editorEditableTextarea" 
									v-model="models.textarea.editable" 
									:data-mode="setting.modes.editable" 
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
								<p class="editor-main-line-number" :style="{ color: alert.error.info.line === parseInt( line ) ? 'var(--hljs-red)' : 'var(--text-2)' }" v-for="line in lines">{{ line }}</p>
							</div>
							<!-- container -->
							<div class="editor-jsonpath-container">
								<!-- preview -->
								<pre class="editor-jsonpath-preview-pre"
									 ref="editorJsonpathPre"><code 
									 class="editor-jsonpath-preview-code" 
									 ref="editorJsonpathCode" 
									 :data-error="JSON.stringify( alert.error.info )" 
									 :data-filename="models.filename" 
									 v-highlighter="models.textarea.editable"></code></pre>
								<!-- textarea -->
								<textarea 
									class="editor-jsonpath-textarea scroll-hidden" 
									autocapitalize="off" 
									autocomplete="off" 
									autocorrect="off" 
									id="editable" 
									spellcheck="false" 
									ref="editorJsonpathTextarea" 
									v-model="models.textarea.editable" 
									:data-mode="setting.modes.jsonpath" 
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
									 :data-filename="models.filename" 
									 v-highlighter="models.jsonpath.preview"></code></pre>
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
					<div class="alert-group">
						<div class="alert-single flex flex-left error" v-if="alert.error.display">
							<div class="alert-slot">
								{{ alert.error.message }}
							</div>
							<button class="alert-close flex flex-center" @click="[ alert.error.display = false ]">
								<i class="bx bx-x"></i>
							</button>
						</div>
						<div class="alert-single flex flex-left info" v-if="alert.info.display">
							<div class="alert-slot">
								{{ alert.info.message }}
							</div>
							<button class="alert-close flex flex-center" @click="[ alert.info.display = false ]">
								<i class="bx bx-x"></i>
							</button>
						</div>
						<div class="alert-single flex flex-left success" v-if="alert.success.display">
							<div class="alert-slot">
								{{ alert.success.message }}
							</div>
							<button class="alert-close flex flex-center" @click="[ alert.success.display = false ]">
								<i class="bx bx-x"></i>
							</button>
						</div>
						<div class="alert-single flex flex-left warning" v-if="alert.warning.display">
							<div class="alert-slot">
								{{ alert.warning.message }}
							</div>
							<button class="alert-close flex flex-center" @click="[ alert.warning.display = false ]">
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
				height: 640px;
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
						height: 42.6%;
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
			.editable .editor-main-header-tools,
			.jsonpath .editor-main-header-tools,
			.searching .editor-main-header-tools {
				/** background: teal; */
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
