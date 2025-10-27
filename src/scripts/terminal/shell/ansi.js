
/**
 * 
 * hxAri | ansi.js
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

import { Fmt } from "../../formatter";
import { Mapper } from "../../mapper";
import { Typed } from "../../types";

class ANSI {
	
	/**
	 * Automatic colorize text, number, and symbols in the string
	 * 
	 * @param {String} string
	 * 
	 * @returns {String}
	 * 
	 */
	colorize( string ) {
		var patterns = {
			urls: {
				pattern: "(?<urls>\\bhttps?:\\/{2}(?:(?<subdomain>[a-zA-Z0-9]{1,})\\.)?(?<domain>[a-zA-Z0-9\\-\\.]{0,}[a-zA-Z0-9]{1})\\.(?<extension>[a-zA-Z0-9]+)(?<pathname>[a-zA-Z0-9\\-\\/\\_\\.\\@]+)?(?:\\?(?<queries>[^\\s]+)?|\\#(?<segments>[^\\s]+)?)?)",
				styling: "var(--link-2)"
			},
			comment: {
				pattern: "(?<comment>(?:\\/\\/[^\\x0a]*)|(?:\\/\\*.*?\\*\\/))",
				styling: "var(--shell-c-38-240m)"
			},
			number: {
				pattern: "(?<number>\\b(?:\\d+)\\b)",
				styling: "var(--shell-c-38-61m)"
			},
			define: {
				pattern: "(?<define>(?:\\@|\\$)[a-zA-Z_](?:[a-zA-Z0-9_\\-\\.]*[a-zA-Z0-9_]{1})*)",
				styling: "var(--shell-c-38-111m)",
				rematch: [
					"symbol"
				]
			},
			symbol: {
				pattern: "(?<symbol>\\\\|\\:|\\*|\\-|\\+|\\/|\\&|\\%|\\=|\\;|\\,|\\.|\\?|\\!|\\||\\<|\\>|\\~)",
				styling: "var(--shell-c-38-69m)"
			},
			bracket: {
				pattern: "(?<bracket>\\{|\\}|\\[|\\]|\\(|\\))",
				styling: "var(--shell-c-38-214m)"
			},
			boolean: {
				pattern: "(?<boolean>\\b(?:[fF]alse|[tT]rue|[nN]ull|[uU]ndefined)\\b)",
				styling: "var(--shell-c-38-199m)"
			},
			hxari: {
				pattern: "(?<hxari>\\b(?:hx[aA]ri)\\b)",
				styling: "var(--shell-c-38-105m)"
			},
			type: {
				pattern: "(?<type>\\b(?:Array|Date|String|Number|Bigint|Boolean|Undefined|Null|Symbol|Object)\\b)",
				styling: "var(--shell-c-38-213m)"
			},
			version: {
				pattern: "(?<version>\\b[vV][\\d]+(?:[\\d\\.]+[\\d+])*\\b)",
				styling: "var(--shell-c-38-112m)",
				handler: {
					floating: {
						pattern: "(?<floating>[\\d\\.]+)",
						styling: "var(--shell-c-38-190m)"
					}
				}
			},
			string: {
				pattern: "(?<string>(?<!\\\\)(\\\".*?(?<!\\\\)\\\"|\\'.*?(?<!\\\\)\\'|\\`.*?(?<!\\\\)\\`))",
				styling: "var(--shell-c-38-220m)",
				handler: {
					curly: {
						pattern: "(?<curly>(?<!\\\\)\\{(?:(?:[^\\}\\\\]|\\.)*)\\})",
						styling: "var(--shell-c-38-214m)",
						handler: {
							chars: {
								pattern: "(?<chars>[a-zA-Z][a-zA-Z0-9\\_]*)",
								styling: "var(--shell-c-38-11m)",
							},
							define: {
								pattern: "(?<define>\\$[a-zA-Z_][a-zA-Z0-9_]*)",
								styling: "var(--shell-c-38-111m)",
							},
							number: {
								pattern: "(?<number>\\b(?:\\d+)\\b)",
								styling: "var(--shell-c-38-61m)"
							},
							symbol: {
								pattern: "(?<symbol>\\{|\\}|\\[|\\]|\\(|\\)|\\<|\\>|\\-)",
								styling: "var(--shell-c-38-214m)"
							},
							bracket: {
								pattern: "(?<bracket>\\{|\\}|\\[|\\]|\\(|\\))",
								styling: "var(--shell-c-38-214m)"
							},
							mismatch: {
								pattern: "(?<mismatch>.)",
								styling: "var(--shell-c-38-220m)"
							}
						}
					},
					bracket: {
						pattern: "(?<bracket>(?<!\\\\)\\[(?:(?:[^\\]\\\\]|\\.)*)\\])",
						styling: "var(--shell-c-38-214m)",
						handler: {
							chars: {
								pattern: "(?<chars>[a-zA-Z][a-zA-Z0-9\\_]*)",
								styling: "var(--shell-c-38-11m)",
							},
							define: {
								pattern: "(?<define>\\$[a-zA-Z_][a-zA-Z0-9_]*)",
								styling: "var(--shell-c-38-111m)",
							},
							number: {
								pattern: "(?<number>\\b(?:\\d+)\\b)",
								styling: "var(--shell-c-38-61m)"
							},
							symbol: {
								pattern: "(?<symbol>\\{|\\}|\\[|\\]|\\(|\\)|\\<|\\>|\\-)",
								styling: "var(--shell-c-38-214m)"
							},
							mismatch: {
								pattern: "(?<mismatch>.)",
								styling: "var(--shell-c-38-220m)"
							}
						}
					},
					hexadec: {
						pattern: "(?<hexadec>\\\\x[a-fA-F0-9]{2})",
						styling: "var(--shell-c-38-85m)"
					},
					escape: {
						pattern: "(?<escape>\\\\(?:040|40|7|11|011|0113|113|377|81|[aA]|[bB]|cx|[dD]|ddd|e|f|g|[hH]|k|n|[pP]|[rR]|[sS]|t|[vV]|[wW]|xhh|Z))",
						styling: "var(--shell-c-38-208m)"
					},
					define: {
						pattern: "(?<define>\\$[a-zA-Z_][a-zA-Z0-9_]*)",
						styling: "var(--shell-c-38-111m)",
					}
				}
			}
		};
		function handler( match, escape, patterns ) {
			// Check if match has groups.
			if( Typed( match.groups, Object ) ) {
				// Get all group names.
				var groups = Object.keys( match.groups );
				var group = null;
				
				for( let i in groups ) {
					group = groups[i];
					if( Typed( patterns[groups[i]], Object ) &&
						Typed( match.groups[groups[i]], String ) ) {
						// escape = patterns[group].styling;
						break;
					}
				}
				var chars = match.groups[group];
				var color = patterns[group].styling;
				if( Typed( patterns[group].handler, [ Function, "handler", Object ] ) ) {
					if( Typed( patterns[group].handler, Object ) ) {
						var regexps = [];
						for( let i in patterns[group].handler ) {
							if( Typed( patterns[group].handler[i], Window ) ) {
								chars = patterns[group].handler[i].call( chars );
							}
							else {
								regexps.push( patterns[group].handler[i] );
							}
						}
						if( regexps.length >= 1 ) {
							var result = "";
							var reindex = 0;
							var rematch = null;
							var pattern = new RegExp( Fmt( "(?:{})", regexps.map( r => r.pattern ).join( "|" ) ), "gms" );
							while( ( rematch = pattern.exec( chars ) ) !== null ) {
								result+= chars.substring( reindex, pattern.lastIndex - rematch[0].length );
								result+= Fmt( "<span style=\"color: {}\" data-group=\"{}\">{}</span>", color, group, handler( rematch, color, patterns[group].handler ) );
								reindex = pattern.lastIndex;
							}
							chars = result + chars.substring( reindex );
						}
					}
					else {
						chars = patterns[group].handler( chars );
					}
				}
				if( Typed( patterns[group].rematch, Array ) ) {
					var result = "";
					var reindex = 0;
					var rematch = null;
					var pattern = new RegExp( Fmt( "(?:{})", patterns[group].rematch.map( r => patterns[r].pattern ).join( "|" ) ), "gms" );
					while( ( rematch = pattern.exec( chars ) ) !== null ) {
						result+= chars.substring( reindex, pattern.lastIndex - rematch[0].length );
						result+= handler( rematch, color, patterns );
						reindex = pattern.lastIndex;
					}
					chars = result.concat( chars.substring( reindex ) );
				}
				return Fmt( "<span style=\"color: {}\" data-group=\"{}\">{}</span>", color, group, chars );
			}
			return "";
		};
		var index = 0;
		var match = null;
		var result = "";
		var escape = "var(--shell-c-0-37m)";
		var string = Typed( string, String, () => string, () => "" );
		var pattern = new RegExp( Fmt( "(?:{})", Object.values( Mapper( patterns, ( i, k, val ) => val.pattern ) ).join( "|" ) ), "gms" );
		while( ( match = pattern.exec( string ) ) !== null ) {
			result+= string.substring( index, pattern.lastIndex - match[0].length );
			result+= Fmt( "<span style=\"color: {}\" data-group=\"{}\">{}</span>", escape, "captured", handler( match, escape, patterns ) );
			index = pattern.lastIndex;
		}
		return result.concat( string.substring( index ) );
	}
	
	/**
	 * Render ANSI text into html text with replaced ANSI color into HTML tag
	 * 
	 * @param {String} string
	 * 
	 * @returns {String}
	 * 
	 */
	render( string ) {
		var lastcol = null;
		var results = [];
		for( let splited of this.splits( string ) ) {
			var pattern = /(?<format>\x1b|\\x1b|\\e|((\0|\\0)33))((?:\[|\\\[)(?<code>.*?)(?<type>m)(?<text>[^\n]*))/g;
			var replace = splited.replaceAll( /\!\[(bx|bxl|bxs)\]\(([a-zA-Z0-9\-\s]+)\)/g, "<i class=\"bx $1-$2\"></i>" );
			var matches = pattern.exec( replace );
			if( matches !== null ) {
				var escaped = "";
				var styling = this.styles( matches.groups.code );
				if( Typed( matches.groups.text, String ) ) {
					escaped = this.render( matches.groups.text );
				}
				if( lastcol ) {
					if( styling ) {
						results.push( Fmt( "<span class=\"terminal-text text\" style=\"{}\">{}</span>", lastcol, Fmt( "{}<span class=\"terminal-text text\" style=\"{}\">{}</span>", replace.substring( 0, pattern.lastIndex - matches[0].length ), styling, escaped ) ) );
						lastcol = styling;
					}
					else {
						results.push( Fmt( "{}<span class=\"terminal-text text\" style=\"{}\">{}</span>", replace.substring( 0, pattern.lastIndex - matches[0].length ), lastcol, escaped ) );
					}
				}
				else if( styling ) {
					lastcol = styling;
					results.push( Fmt( "{}<span class=\"terminal-text text\" style=\"{}\">{}</span>", replace.substring( 0, pattern.lastIndex - matches[0].length ), styling, escaped ) );
				}
				else {
					results.push( replace.substring( 0, pattern.lastIndex - matches[0].length ) + escaped );
				}
			}
			else {
				if( lastcol ) {
					results.push( Fmt( "<span class=\"terminal-text text\" style=\"{}\">{}</span>", lastcol, replace ) );
					continue;
				}
				results.push( replace );
			}
		}
		return results.join( "" );
	}
	
	/**
	 * Split links
	 * 
	 * @param {String} string
	 * 
	 * @returns {Array<String>}
	 * 
	 */
	splits( string ) {
		var indexed = 0;
		var pattern = /(?<urls>\bhttps?:\/{2}(?:(?<subdomain>[a-zA-Z0-9]{1,})\.)?(?<domain>[a-zA-Z0-9\-\.]{0,}[a-zA-Z0-9]{1})\.(?<extension>[a-zA-Z0-9]+)(?<pathname>[a-zA-Z0-9\-\/\_\.\@]+)?(?:\?(?<queries>[^\s]+)?|\#(?<segments>[^\s]+)?)?)/gm;
		var results = [];
		var matches = null;
		while( ( matches = pattern.exec( string ) ) !== null ) {
			results.push( string.substring( indexed, pattern.lastIndex - matches[0].length ) );
			results.push( Fmt( "<a class=\"text-underline\" href=\"{0}\" target=\"_blank\" rel=\"noopener noreferrer\">{0}</a>", matches[0] ) );
			indexed = pattern.lastIndex;
			pattern.lastIndex++;
		}
		return results.concat( string.substring( indexed ) );
	}
	
	/**
	 * Returns CSS style color property
	 * 
	 * @param {String} code
	 * 
	 * @returns {false|String}
	 * 
	 */
	styles( code ) {
		var pattern = /^(?:\d{1,2}|[01]\d|2[0-4])(;(?:\d|[0-5]\d)(?:;(?:\d{1,3})){0,2})*$/;
		if( pattern.test( code ) ) {
			var codes = code.split( "\x3b" ).map( part => parseInt( part ) );
			var color = null;
			var format = null;
			switch( codes.length ) {
				case 1:
					if( codes[0] >= 0 && codes[0] <= 9 ) {
						format = ANSIFormats[codes[0]];
					}
					else if( codes[0] >= 30 && codes[0] <= 37 ) {
						format = ANSIColors.e0gte30lte37[codes[0]]
					}
					else if( codes[0] >= 40 && codes[0] <= 47 ) {
						format = ANSIColors.e0gte40lte47[codes[0]]
					}
					break
				case 2:
					if( codes[0] >= 0 && codes[0] <= 9 ) {
						format = ANSIFormats[codes[0]];
	
						if( codes[1] >= 30 && codes[1] <= 37 ) {
							color = ANSIColors.e0gte30lte37[codes[1]]
						}
						else if( codes[1] >= 40 && codes[1] <= 47 ) {
							color = ANSIColors.e0gte40lte47[codes[1]]
						}
					}
					break
				case 3:
					break
				case 4:
					if( codes[0] >= 0 && codes[0] <= 9 ) {
						format = ANSIFormats[codes[0]];
					}
					if( codes[1] === 38 ) {
						if( codes[2] >= 0 && codes[2] <= 7 ) {
							if( codes[2] === 5 ) {
								color = Fmt( ANSIProperties.e38e5, codes[3] );
							}
							else if( codes[2] === 7 ) {
								color = Fmt( ANSIProperties.e38e7, codes[3] );
							}
							else {
								format = ANSIFormats[codes[2]];
								color = Fmt( ANSIProperties.e38e5, codes[3] );
							}
						}
					}
					break
			}
			return color !== null && color !== false &&
				format !== null && format !== false ?
					Fmt( "{}; {}", format, color ) :
					(
						color !== null && color !== false ?
							color :
						(
							format !== null && format !== false ?
							format :
							false
						)
					)
			;
		}
		return false;
	}
	
}

/**
 * 
 * @property {Object} e0gte30lte37
 * @property {String} e0gte30lte37.30
 * @property {String} e0gte30lte37.31
 * @property {String} e0gte30lte37.32
 * @property {String} e0gte30lte37.33
 * @property {String} e0gte30lte37.34
 * @property {String} e0gte30lte37.35
 * @property {String} e0gte30lte37.36
 * @property {String} e0gte30lte37.37
 * @property {Object} e1gte30lte37
 * @property {String} e1gte30lte37.30
 * @property {String} e1gte30lte37.31
 * @property {String} e1gte30lte37.32
 * @property {String} e1gte30lte37.33
 * @property {String} e1gte30lte37.34
 * @property {String} e1gte30lte37.35
 * @property {String} e1gte30lte37.36
 * @property {String} e1gte30lte37.37
 * @property {Object} e0gte40lte47
 * @property {String} e0gte40lte47.40
 * @property {String} e0gte40lte47.41
 * @property {String} e0gte40lte47.42
 * @property {String} e0gte40lte47.43
 * @property {String} e0gte40lte47.44
 * @property {String} e0gte40lte47.45
 * @property {String} e0gte40lte47.46
 * @property {String} e0gte40lte47.47
 * @property {Object} e1gte40lte47
 * @property {String} e1gte40lte47.0
 * @property {String} e1gte40lte47.1
 * @property {String} e1gte40lte47.2
 * @property {String} e1gte40lte47.3
 * @property {String} e1gte40lte47.4
 * @property {String} e1gte40lte47.5
 * @property {String} e1gte40lte47.6
 * @property {String} e1gte40lte47.7
 * 
 * @typedef {ANSIColors}
 *
 */
const ANSIColors = {
	e0gte30lte37: {
		30: "color: var(--shell-c-0-30m)",
		31: "color: var(--shell-c-0-31m)",
		32: "color: var(--shell-c-0-32m)",
		33: "color: var(--shell-c-0-33m)",
		34: "color: var(--shell-c-0-34m)",
		35: "color: var(--shell-c-0-35m)",
		36: "color: var(--shell-c-0-36m)",
		37: "color: var(--shell-c-0-37m)"
	},
	e1gte30lte37: {
		30: "color: var(--shell-c-1-30m)",
		31: "color: var(--shell-c-1-31m)",
		32: "color: var(--shell-c-1-32m)",
		33: "color: var(--shell-c-1-33m)",
		34: "color: var(--shell-c-1-34m)",
		35: "color: var(--shell-c-1-35m)",
		36: "color: var(--shell-c-1-36m)",
		37: "color: var(--shell-c-1-37m)"
	},
	e0gte40lte47: {
		40: "background-color: var(--shell-c-0-30m)",
		41: "background-color: var(--shell-c-0-31m)",
		42: "background-color: var(--shell-c-0-32m)",
		43: "background-color: var(--shell-c-0-33m)",
		44: "background-color: var(--shell-c-0-34m)",
		45: "background-color: var(--shell-c-0-35m)",
		46: "background-color: var(--shell-c-0-36m)",
		47: "background-color: var(--shell-c-0-37m)"
	},
	e1gte40lte47: {
		40: "background-color: var(--shell-c-1-30m)",
		41: "background-color: var(--shell-c-1-31m)",
		42: "background-color: var(--shell-c-1-32m)",
		43: "background-color: var(--shell-c-1-33m)",
		44: "background-color: var(--shell-c-1-34m)",
		45: "background-color: var(--shell-c-1-35m)",
		46: "background-color: var(--shell-c-1-36m)",
		47: "background-color: var(--shell-c-1-37m)"
	}
};

/**
 * 
 * @property {String} 0
 * @property {String} 1
 * @property {String} 2
 * @property {String} 3
 * @property {String} 4
 * @property {String} 5
 * @property {String} 6
 * @property {String} 7
 * @property {String} 8
 * @property {String} 9
 * 
 * @typedef {ANSIFormats}
 * 
 */
const ANSIFormats = {
	0: "font-weight: normal; font-style: normal; text-decoration: none; text-decoration-line: none; color: var(--shell-c-37m); opacity: 1",
	1: "font-weight: 550",
	2: "opacity: .8",
	3: "font-style: italic",
	4: "text-decoration-line: underline",
	5: "font-weight: 550",
	6: "font-weight: normal; font-style: normal; text-decoration-line: none; color: var(--shell-c-37m); opacity: 1",
	7: "background-color: var(--shell-c-37m); color: var(--shell-c-30m)",
	8: "background-color: var(--shell-c-30m); color: var(--shell-c-30m)",
	9: "text-decoration-line: line-through"
};

/**
 * 
 * @property {String} e38e5
 * @property {String} e38e7
 * 
 * @typedef {ANSIProperties}
 * 
 */
const ANSIProperties = {
	e38e5: "color: var(--shell-c-38-{}m)",
	e38e7: "background-color: var(--shell-c-38-{}m)"
};

export {
	ANSI,
	ANSIColors,
	ANSIFormats,
	ANSIProperties
};
