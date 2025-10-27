
/**
 * 
 * hxAri | lexer.js
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
import { Token, TokenGroup, TokenProcessSubtitution, TokenType } from "./token";

/**
 * 
 * Pure JavaScript lexer intended to approximate GNU Bash lexical rules.
 *
 * Token types:
 * - WORD (unquoted word or combined pieces)
 * - STRING_SINGLE, STRING_DOUBLE, STRING_ANSI, STRING_LOCALE ($"")
 * - OP (control/operator like && || ; | & etc.)
 * - REDIR (>, <, >>, <<, >&, <&, <> , >&N, etc.)
 * - HEREDOC_START (the << token + delimiter metadata)
 * - HEREDOC_BODY
 * - SUBSHELL (value is inner source, e.g. $(...))
 * - BACKTICK (inline `...`)
 * - PARAM ( ${...} )
 * - VARIABLE ( $NAME )
 * - ARITH ( $(( ... )) )
 * - PROCESS_SUB ( <(...) or >(...) content inside parentheses )
 * - COMMENT
 * - NEWLINE
 * - EOF
 *
 * @example
 * >>> const lexer = new Lexer( "echo \"Hello $USER\" <<'EOF'\\nline\\nEOF" );
 * >>> const tokenized = lexer.tokenize();
 * >>> console.debug( JSON.stringify( tokenized, null, 4 ) );
 */
class Lexer {
	
	/** @type {Number} */
	column;
	
	/** @type {Boolean} */
	currentFirstWordPending;
	
	/** @type {Boolean} */
	historyExpansion;
	
	/** @type {String} */
	input;
	
	/** @type {Number} */
	length;
	
	/** @type {Number} */
	line;
	
	/** @type {Number} */
	position;
	
	/** @type {Set<String>} */
	reservedWords;
	
	/** @type {Array<Token>} */
	tokens;
	
	/**
	 * Construct method of class Lexer
	 * 
	 * @param {Boolean} historyExpansion
	 * 
	 */
	constructor( input, historyExpansion ) {
		this.column = 1;
		this.currentFirstWordPending = true
		this.historyExpansion = historyExpansion; // whether to process '!' expansions (lexer just marks)
		this.input = input;
		this.length = input.length;
		this.line = 1;
		this.position = 0;
		this.reservedWords = new Set([
			"case",
			"coproc",
			"do",
			"done",
			"elif",
			"else",
			"esac",
			"fi",
			"for",
			"function",
			"if",
			"in",
			"select",
			"then",
			"time",
			"until",
			"while"
		]);
		this.tokens = [];
	}
	
	/** Advance cursor column and position */
	advance() {
		this.position++;
		this.column++;
	}
	
	/**
	 * Consume current character
	 * 
	 * @returns {?String}
	 * 
	 */
	consume() {
		const ch = this.peek();
		this.position++;
		this.column++;
		return ch;
	}
	
	/**
	 * Returns error message from lexer
	 * 
	 * @param {String} message
	 * 
	 * @returns {SyntaxError}
	 * 
	 */
	error( message ) {
		return new SyntaxError( Fmt( "${} at line ${}, col ${}", message, this.line, this.column ) );
	}
	
	/**
	 * Returns whether operator is dommand delimiter
	 * 
	 * @param {String} operator
	 * 
	 * @returns {Boolean}
	 * 
	 */
	isCommandDelimiter( operator ) {
		var delimiters = new Set([
			";",
			"&",
			"&&",
			"||",
			"|",
			"\n"
		]);
		return delimiters.has( operator );
	}
	
	/**
	 * Returns whether comment is valid
	 * 
	 * @returns {Boolean}
	 * 
	 */
	isCommentValid() {
		// valid if at start, after whitespace/newline, or last non-space token is operator/redirection
		if( this.position === 0 ) {
			return true;
		}
		var prevChar = this.input[this.position - 1];
		if( prevChar === "\n" || this.isWhitespace( prevChar ) ) {
			return true;
		}
		var lastTok = this.lastNonSpaceToken();
		if( lastTok === null ) {
			return true;
		}
		// check grouped categories rather than legacy string names
		if( lastTok.grouped === TokenGroup.OPERATOR ||
			lastTok.grouped === TokenGroup.REDIRECTION ) {
			return true;
		}
		return false;
	}
	
	/**
	 * Returns whether character is start operator
	 * 
	 * @param {String} char
	 * 
	 * @returns {Boolean}
	 * 
	 */
	isOperatorStart( char ) {
		var operators = new Set([
			"|",
			"&",
			";",
			"<",
			">",
			"(",
			")"
		]);
		return operators.has( char );
	}
	
	/**
	 * Returns whether character is whitespace
	 * 
	 * @param {String} char
	 * 
	 * @returns {Boolean}
	 * 
	 */
	isWhitespace( char ) {
		var whitespaces = new Set([
			"\x20",
			"\t",
			"\r",
			"\v",
			"\f"
		]);
		return whitespaces.has( char );
	}
	
	/**
	 * Returns whether token is piece word token
	 * 
	 * @param {Token} token
	 * 
	 * @returns {Boolean}
	 * 
	 */
	isWordPieceToken( token ) {
		const allowed = new Set([
			TokenType.ANSI_C_QUOTED,
			TokenType.ARITHMETIC_EXPANSION,
			TokenType.BACKTICK,
			TokenType.COMMAND_SUBSTITUTION,
			TokenType.COMPOSITE,
			TokenType.DOUBLE_QUOTED,
			TokenType.LOCALE_QUOTED,
			TokenType.PARAM_EXPANSION,
			TokenType.PROCESS_SUBSTITUTION,
			TokenType.SINGLE_QUOTED,
			TokenType.VARIABLE_EXPANSION,
			TokenType.WORD_PIECE,
		]);
		return allowed.has( token?.typed );
	}
	
	/**
	 * Returns last non-space token
	 * 
	 * @returns {?Token}
	 * 
	 */
	lastNonSpaceToken() {
		for( let i=this.tokens.length-1; i>=0; i-- ) {
			var token = this.tokens[i];
			if( token && token.typed !== TokenType.WHITESPACE ) {
				return token;
			}
		}
		return null;
	}
	
	/**
	 * Returns merged tokens
	 * 
	 * @param {Array<Token>} tokens
	 * 
	 * @returns {Array<Token>}
	 * 
	 */
	mergeWordPieces( tokens ) {
		const results = [];
		let i = 0;
		while( i<tokens.length ) {
			const token = tokens[i];
			if( this.isWordPieceToken( token ) ) {
				var position = 0;
				const pieces = [];
				while( i<tokens.length && this.isWordPieceToken( tokens[i] ) ) {
					var piece = tokens[i++];
					if( piece.typed === TokenType.COMPOSITE ) {
						for( const element of piece.pieces ) {
							pieces.push( element );
						}
						continue;
					}
					pieces.push( piece );
				}
				if( pieces.length >= 1 ) {
					position = pieces[0].position;
				}
				const flatten = pieces.map( piece => {
					switch( piece.typed ) {
						case TokenType.WORD_PIECE:
						case TokenType.SINGLE_QUOTED:
						case TokenType.DOUBLE_QUOTED:
						case TokenType.ANSI_C_QUOTED:
						case TokenType.LOCALE_QUOTED:
							return piece.lexeme;
						case TokenType.VARIABLE_EXPANSION:
							return Fmt( "${}", piece.lexeme );
						case TokenType.PARAM_EXPANSION:
							return Fmt( "$\\{{}\\}", piece.lexeme )
						case TokenType.COMMAND_SUBSTITUTION:
							return Fmt( "$({})", piece.lexeme );
						case TokenType.BACKTICK:
							return Fmt( "$`{}`", piece.lexeme );
						case TokenType.ARITHMETIC_EXPANSION:
							return Fmt( "$(({}))", piece.lexeme );
						case TokenType.PROCESS_SUBSTITUTION:
							if( piece.sign.lexeme === ">" ) {
								return Fmt( ">({})", piece.lexeme );
							}
							return "<(";
						default:
							return piece.lexeme || "";
					}
				});
				const raw = flatten.join( "" );
				const structured = pieces;
				const firstWordCandidate = raw.split( /\s+/ )[0];
				const wordToken = new Token(TokenGroup.WORD, raw, structured, position, TokenType.WORD);
				if( this.currentFirstWordPending && this.reservedWords.has( firstWordCandidate ) ) {
					this.currentFirstWordPending = false;
					wordToken.reserved = true;
				}
				else {
					this.currentFirstWordPending = false;
				}
				results.push( wordToken );
				continue;
			}
			results.push( token );
			i++;
		}
		
		// detect heredoc starts and extract bodies
		return this.processHeredocs( results );
	}
	
	/**
	 * Return token type by operator character given
	 * 
	 * @param {String} character
	 * 
	 * @returns
	 */
	operatorTokenType( character ) {
		switch( character ) {
			case "(":
				return TokenType.LEFT_PAREN;
			case ")":
				return TokenType.RIGHT_PAREN;
			case ">":
				return TokenType.REDIR_OUT;
			case "<":
				return TokenType.REDIR_IN;
			case "|":
				return TokenType.PIPE;
		}
		return TokenType.UNKNOWN;
	}
	
	/**
	 * Peek current character
	 * 
	 * @returns {?String}
	 * 
	 */
	peek() {
		if( this.position >= this.length ) {
			return null;
		}
		return this.input[this.position];
	}
	
	/**
	 * Peek ahead character
	 * 
	 * @param {Number} n
	 * 
	 * @returns {?String}
	 */
	peekAhead( n ) {
		var position = this.position + n;
		if( position >= this.length ) {
			return null;
		}
		return this.input[position];
	}
	
	/**
	 * Process heredocs tokens.
	 * 
	 * @param {Array<Token>} tokens
	 * 
	 * @returns {Array<Token>}
	 * 
	 */
	processHeredocs( tokens ) {
		const results = [];
		for( let i=0; i<tokens.length; i++ ) {
			var token = tokens[i];
			if( token.typed === TokenType.REDIR_HEREDOC ||
				token.typed === TokenType.REDIR_HEREDOC_STRIP ) {
				let j = i+1;
				while( j<tokens.length && tokens[j].typed === TokenType.COMMENT ) j++;
				if( j <= tokens.length ) {
					if( tokens[j].typed !== TokenType.WORD ) {
						results.push( token );
						continue;
					}
					var pieces = [];
					// var quoted = tokens[j].pieces.some( part =>
					// 	part.typed === TokenType.SINGLE_QUOTED ||
					// 	part.typed === TokenType.DOUBLE_QUOTED ||
					// 	part.typed === TokenType.ANSI_C_QUOTED ||
					// 	part.typed === TokenType.LOCALE_QUOTED
					// );
					// var position = tokens[j].position;
					var tokenDelimiterEnd = null;
					var tokenDelimiterStart = tokens[j];
					let u = j+1;
					for( u; u<tokens.length; u++ ) {
						if( tokens[u].typed === TokenType.NEWLINE &&
							tokens[u+1]?.typed === TokenType.WORD &&
							tokens[u+1]?.pieces[0].lexeme === tokenDelimiterStart.pieces[0].lexeme ) {
							tokenDelimiterEnd = tokens[u+1];
							break;
						}
						pieces.push( tokens[u] );
					}
					var lexeme = pieces.map( piece => piece.lexeme ).join( "" );
					if( tokenDelimiterEnd !== null ) {
						results.push( new Token( TokenGroup.HEREDOC, token.lexeme, token.pieces, token.position, TokenType.HEREDOC_START ) );
						results.push( new Token( TokenGroup.HEREDOC, tokenDelimiterStart.lexeme, tokenDelimiterStart.pieces, tokenDelimiterStart.position, TokenType.HEREDOC_DELIM ) );
						results.push( new Token( TokenGroup.HEREDOC, lexeme, pieces, pieces[0]?.position, TokenType.HEREDOC_BODY ) );
						results.push( new Token( TokenGroup.HEREDOC, tokenDelimiterEnd.lexeme, tokenDelimiterEnd.pieces, tokenDelimiterEnd.position, TokenType.HEREDOC_END ) );
					}
					else {
						console.debug( JSON.stringify( tokens, null, 4 ) );
						throw new SyntaxError( "Unterminated heredoc string" );
					}
					i = u+1;
					continue;
				}
			}
			results.push( token );
		}
		return results;
	}
	
	/**
	 * Push token
	 * 
	 * @param {Token} token
	 * 
	 */
	push( token ) {
		// keep as-is; debug logging removed to focus pada fungsional
		this.tokens.push( token );
	}
	
	/**
	 * Push word piece tokens
	 * 
	 * @param {Token} piece
	 * 
	 */
	pushWordPiece( piece ) {
		this.push( piece );
		this.currentFirstWordPending = false;
	}
	
	/**
	 * Tokenize syntax
	 * 
	 * @returns {Array<Token>}
	 */
	tokenize() {
		while (true) {
			let position = this.position;
			const ch = this.peek();
			if (ch === null || ch === "\0") {
				this.push(new Token(TokenGroup.MISC, "\0", [], position, TokenType.EOF));
				if( ch === null ) {
					break;
				}
			}

			// newline handling
			if (ch === '\n') {
				this.consume();
				this.push(new Token(TokenGroup.WHITESPACE, "\n", [], position, TokenType.NEWLINE));
				this.currentFirstWordPending = true;
				this.line++;
				this.column = 1;
				continue;
			}

			// skip whitespace (non-newline)
			if (this.isWhitespace(ch)) {
				this.consume();
				continue;
			}

			// comment
			if (ch === '#' && this.isCommentValid()) {
				this.tokenizeComment();
				this.currentFirstWordPending = true;
				continue;
			}

			// operators / redirections / control operators
			if (this.isOperatorStart(ch)) {
				if ((ch === '<' || ch === '>') && this.peekAhead(1) === '(') {
					// process substitution as a word piece
					const proc = this.tokenizeProcessSubstitution();
					this.pushWordPiece(proc);
					continue;
				}
				const opTok = this.tokenizeOperatorOrRedir();
				this.push(opTok);
				// if operator is delimiter, next word is first word
				if (this.isCommandDelimiter(opTok.lexeme)) {
					this.currentFirstWordPending = true;
				}
				continue;
			}

			// line continuation backslash-newline
			if (ch === '\\' && this.peekAhead(1) === '\n') {
				this.consume(); // '\'
				this.consume(); // '\n'
				this.line++;
				this.column = 1;
				continue;
			}

			// quoted token starts (including $' and $" and subshell-start $( not arithmetic)
			if (
				ch === "'" || ch === '"' ||
				(ch === '$' && this.peekAhead(1) === "'") ||
				(ch === '$' && this.peekAhead(1) === '"') ||
				(ch === '$' && this.peekAhead(1) === '(' && this.peekAhead(2) !== '(')
			) {
				const piece = this.tokenizeQuotedOrDollarQuote();
				this.pushWordPiece(piece);
				continue;
			}

			// substitution/variable/arithmetic/backtick
			if (ch === '$' || ch === '`') {
				const piece = this.tokenizeDollarOrBacktick();
				this.pushWordPiece(piece);
				continue;
			}

			// redundant check for process substitution start (kept parity with original)
			if ((ch === '<' || ch === '>') && this.peekAhead(1) === '(') {
				const proc = this.tokenizeProcessSubstitution();
				this.pushWordPiece(proc);
				continue;
			}

			// here-string <<< special case
			if (ch === '<' && this.peekAhead(1) === '<' && this.peekAhead(2) === '<') {
				const t = this.tokenizeOperatorOrRedir(); // will capture '<<<'
				this.push(t);
				this.currentFirstWordPending = false;
				continue;
			}

			// default: word piece
			const wordPiece = this.tokenizeWordPiece();
			this.pushWordPiece(wordPiece);
		}

		// merge pieces into WORD tokens, process heredocs
		return this.mergeWordPieces(this.tokens);
	}
	
	/**
	 * Tokenize ANSI C Escape
	 * 
	 * @returns {String}
	 * 
	 */
	tokenizeAnsiCEscape() {
		const char = this.consume();
		if( char === "n" ) {
			return "\n";
		}
		if( char === "t" ) {
			return "\t";
		}
		if( char === "r" ) {
			return "\r";
		}
		if( char === "0" ) {
			let digs = "";
			for( let i=0; i<2 && /[0-7]/.test( this.peek() ); i++ ) {
				digs+= this.consume();
			}
			return String.fromCharCode( parseInt( digs, 8 ) || 0 );
		}
		if( char === "x" ) {
			let hex = "";
			for( let i=0; i<2 && /[0-9A-Fa-f]/.test( this.peek() ); i++ ) {
				hex+= this.consume();
			}
			return String.fromCharCode( parseInt( hex || "0", 16 ) );
		}
		return char;
	}
	
	/**
	 * Tokenize ANSI C Quoted
	 * 
	 * @returns {Token}
	 * 
	 * @throws {SyntaxError} Throws whether quote is unterminated
	 * 
	 */
	tokenizeAnsiCQuoted() {
		// $'...'
		let position = this.position;
		let values = '';
		this.advance(); // $
		this.advance(); // '
		while( true ) {
			const char = this.peek();
			if( char == null ) {
				throw this.error( "Unterminated ANSI-C quote" );
			}
			if( char === "'" ) {
				this.advance();
				break;
			}
			if( char === "\\" ) {
				this.advance();
				values+= this.tokenizeAnsiCEscape();
				continue;
			}
			values+= this.consume();
		}
		return new Token( TokenGroup.QUOTED, values, [], position, TokenType.ANSI_C_QUOTED );
	}
	
	/**
	 * Tokenize backtick syntax
	 * 
	 * @returns {Token}
	 * 
	 * @throws {SyntaxError} Throws whether backtick unterminated
	 * 
	 */
	tokenizeBacktick() {
		let body = "";
		let position = this.position;
		this.advance(); // skip `
		while( true ) {
			const char = this.peek();
			if( char == null ) {
				throw this.error( "Unterminated backtick" );
			}
			if( char === "`" ) {
				this.consume();
				break;
			}
			if( char === "\\" ) {
				body+= this.consume();
				if( this.peek() != null ) {
					body+= this.consume();
				}
				continue;
			}
			body+= this.consume();
		}
		return new Token(TokenGroup.EXPANSION, body, [], position, TokenType.BACKTICK);
	}
	
	/** Tokenize comment syntax */
	tokenizeComment() {
		let position = this.position;
		let s = '';
		while (true) {
			const ch = this.peek();
			if (ch == null || ch === '\n') break;
			s+= this.consume();
		}
		if (s.length >= 3 && s[1] === "!") {
			this.push(new Token(TokenGroup.COMMENT, s, [], position, TokenType.SHEBANG));
		} else {
			this.push(new Token(TokenGroup.COMMENT, s, [], position, TokenType.COMMENT));
		}
	}
	
	/**
	 * Tokenize dollar and backtick syntax
	 * 
	 * @returns {Token}
	 * 
	 * @throws {SyntaxError} Throws whether syntax is unterminated
	 * 
	 */
	tokenizeDollarOrBacktick() {
		let position = this.position;
		var character = this.peek();
		if( character === "`" ) {
			return this.tokenizeBacktick();
		}
		// starts with $
		this.consume(); // skip $
		const next = this.peek();
		// parameter expansion ${...}
		if( next === "{" ) {
			this.consume(); // skip {
			let body = "";
			let depth = 1;
			while( true ) {
				const char = this.peek();
				if( char == null ) {
					throw this.error( "Unterminated ${" );
				}
				if( char === "{" ) {
					depth++;
					body+= this.consume();
					continue;
				}
				if( char === "}" ) {
					depth--;
					if( depth === 0 ) {
						this.consume(); break;
					}
					else {
						body+= this.consume();
						continue;
					}
				}
				body+= this.consume();
			}
			return new Token( TokenGroup.EXPANSION, body, [], position, TokenType.PARAM_EXPANSION );
		}
		
		// arithmetic $(( ... ))
		if( next === "(" && this.peekAhead( 1 ) === "(" ) {
			this.advance(); // (
			this.advance(); // (
			let body = "";
			let depth = 1;
			while( true ) {
				const char = this.peek();
				if( char == null ) {
					throw this.error( "Unterminated $((" );
				}
				if( char === "(" ) {
					depth++;
					body+= this.consume();
					continue;
				}
				if( char === ")" ) {
					if( this.peekAhead( 1 ) === ")" ) {
						this.advance(); // )
						this.advance(); // )
						break;
					}
					else {
						body+= this.consume();
						continue;
					}
				}
				body+= this.consume();
			}
			return new Token( TokenGroup.EXPANSION, body, [], position, TokenType.ARITHMETIC_EXPANSION );
		}
		
		// subshell $( ... )
		if( next === "(" ) {
			this.advance(); // '('
			let body = "";
			let depth = 1;
			while( true ) {
				var char = this.peek();
				if( char == null ) {
					throw this.error( "Unterminated $(" );
				}
				if( char === "(" ) {
					depth++;
					body+= this.consume();
					continue;
				}
				if( char === ")" ) {
					depth--;
					if( depth === 0 ) {
						this.advance();
						break;
					}
					else {
						body+= this.consume();
						continue;
					}
				}
				// nested quotes inside subshell handled conservatively: embed raw with delimiters
				if( char === "'" || char === "\"" ) {
					const quoted = this.tokenizeQuotedOrDollarQuote();
					// `quoted` is Token instance; compare typed then embed lexeme or flatten children
					switch( quoted.typed ) {
						case TokenType.SINGLE_QUOTED:
							body+= Fmt( "'$\{{}\}'", quoted.lexeme );
							continue;
						case TokenType.DOUBLE_QUOTED:
							body+= Fmt( "\"$\{{}\}\"", quoted.lexeme );
							continue;
						case TokenType.ANSI_C_QUOTED:
						case TokenType.LOCALE_QUOTED:
							// keep as original string form (no deep parsing)
							body+= quoted.lexeme;
							continue;
						// composite flatten
						case TokenType.COMPOSITE:
							for( let piece of quoted.pieces ) {
								body+= ( piece.lexeme || '' );
							}
							continue;
					}
				}
				body+= this.consume();
			}
			return new Token( TokenGroup.EXPANSION, body, [], position, TokenType.COMMAND_SUBSTITUTION );
		}
		
		// variable name, positional or special
		if( next != null && /[A-Za-z0-9_@*!#?$\-]/.test( next ) ) {
			let name = "";
			while( this.peek() != null ) {
				if( /[A-Za-z0-9_@*!#?$\-]/.test( this.peek() ) ) {
					name+= this.consume();
					continue;
				}
				break;
			}
			return new Token( TokenGroup.EXPANSION, name, [], position, TokenType.VARIABLE_EXPANSION );
		}
		return new Token( TokenGroup.WORD, "$", [], position, TokenType.WORD_PIECE );
	}
	
	/**
	 * Tokenize double quoted syntax
	 * 
	 * @returns {Token}
	 * 
	 * @throws {SyntaxError} Throws whether quote is unterminated
	 * 
	 */
	tokenizeDoubleQuoted() {
		let pieces = [];
		let position = this.position;
		let values = "";
		this.advance(); // skip "
		while( true ) {
			const char = this.peek();
			if( char === null ) {
				throw this.error( "Unterminated double quote" );
			}
			if( char === "\"" ) {
				this.advance();
				break;
			}
			if( char === "\\" ) {
				this.advance();
				const next = this.peek();
				if( next === null ) {
					break;
				}
				if( next === "$" ||
					next === "`" ||
					next === "\"" ||
					next === "\\" ||
					next === "\n" ) {
					values+= this.consume();
				}
				else {
					values+= "\\".concat( this.consume() );
				}
				continue;
			}
			if( char === "$" ) {
				if( values.length > 0 ) {
					pieces.push( new Token( TokenGroup.QUOTED, values, [], position, TokenType.DOUBLE_QUOTED ) );
					values = "";
				}
				pieces.push( this.tokenizeDollarOrBacktick() );
				continue;
			}
			values+= this.consume();
		}
		if( values.length > 0 ) {
			pieces.push( new Token( TokenGroup.QUOTED, values, [], position, TokenType.DOUBLE_QUOTED ) );
		}
		if( pieces.length === 1 ) {
			return pieces[0];
		}
		// composite -> use TokenGroup.MISC with null lexeme per-instruction
		return new Token( TokenGroup.MISC, null, pieces, position, TokenType.COMPOSITE );
	}
	
	/**
	 * Tokenize locale quoted syntax
	 * 
	 * @returns {Token}
	 * 
	 * @throws {SyntaxError} Throws whether quote unterminated
	 * 
	 */
	tokenizeLocaleQuoted() {
		// $"..." - similar to double quotes but different token type for parts
		let pieces = [];
		let position = this.position;
		let values = "";
		this.advance(); // $
		this.advance(); // "
		while( true ) {
			const char = this.peek();
			if( char === null ) {
				throw this.error( "Unterminated $\" quote" )
			};
			if( char === "\"" ) {
				this.advance(); break;
			}
			if( char === "\\" ) {
				this.advance();
				const next = this.peek();
				if( next === null ) {
					break;
				}
				if( next === "$" ||
					next === "`" ||
					next === "\"" ||
					next === "\\" ||
					next === "\n" ) {
					values+= this.consume();
				}
				else {
					values+= "\\".concat( this.consume() );
				}
				continue;
			}
			if( char === "$" ) {
				if( values.length > 0 ) {
					pieces.push( new Token( TokenGroup.QUOTED, values, [], position, TokenType.LOCALE_QUOTED ) );
					values = "";
				}
				pieces.push( this.tokenizeDollarOrBacktick() );
				continue;
			}
			values+= this.consume();
		}
		if( values.length > 0 ) {
			pieces.push( new Token( TokenGroup.QUOTED, values, [], position, TokenType.LOCALE_QUOTED ) );
		}
		if( pieces.length === 1 ) {
			return pieces[0];
		}
		return new Token(TokenGroup.MISC, null, pieces, position, TokenType.COMPOSITE);
	}
	
	/**
	 * Tokenize operator or redir syntax
	 * 
	 * @returns {Token}
	 * 
	 */
	tokenizeOperatorOrRedir() {
		let position = this.position;
		let start = this.consume();
		let value = start;
		let after = this.peek();
		if( after === null ) {
			return new Token( TokenGroup.OPERATOR, value, [], position, this.operatorTokenType( value ) );
		}
		
		// combinations
		if( ( start === ">" || start === "<" ) && after === ">" ) {
			value+= this.consume();
			if( this.peek() === "&" ) {
				value+= this.consume();
				return new Token( TokenGroup.OPERATOR, value, [], position, TokenType.REDIR_DUP_OUTPUT );
			}
			if( start === ">" ) {
				return new Token( TokenGroup.OPERATOR, value, [], TokenType.REDIR_APPEND );
			}
			return new Token( TokenGroup.OPERATOR, value, [], position, TokenType.LESS_GREATER );
		}
		if( ( start === ">" || start === "<" ) && after === "&" ) {
			value+= this.consume();
			if( start === ">" ) {
				return new Token( TokenGroup.OPERATOR, value, [], position, TokenType.REDIR_DUP_OUTPUT );
			}
			return new Token( TokenGroup.OPERATOR, value, [], TokenType.REDIR_DUP_INPUT );
		}
		if( start === "<" && after === "<" ) {
			value+= this.consume();
			if( this.peek() === "-" ) {
				value+= this.consume();
				return new Token( TokenGroup.OPERATOR, value, [], position, TokenType.REDIR_HEREDOC_STRIP );
			}
			if( this.peek() === "<" ) {
				value+= this.consume();
				return new Token( TokenGroup.OPERATOR, value, [], position, TokenType.HERE_STRING );
			}
			return new Token( TokenGroup.OPERATOR, value, [], position, TokenType.REDIR_HEREDOC );
		}
		if( ( start === "|" || start === "&" ) && after === start ) {
			value+= this.consume();
			if( start === "|" ) {
				return new Token( TokenGroup.OPERATOR, value, [], position, TokenType.DOUBLE_PIPE );
			}
			return new Token( TokenGroup.OPERATOR, value, [], position, TokenType.DOUBLE_AMPERSAND );
		}
		if( start === "|" && after === "&" ) {
			value+= this.consume();
			return new Token( TokenGroup.OPERATOR, value, [], position, TokenType.PIPE_AND );
		}
		if( start === ";" && after === ";" ) {
			value+= this.consume();
			if( this.peek() === "&" ) {
				value+= this.consume();
				return new Token( TokenGroup.OPERATOR, value, [], position, TokenType.SEMI_SEMI_AMP );
			}
			return new Token( TokenGroup.OPERATOR, value, [], position, TokenType.SEMI_SEMI );
		}
		switch( start ) {
			case "(":
				return new Token( TokenGroup.OPERATOR, value, [], position, TokenType.SUBSHELL_START );
			case ")":
				return new Token( TokenGroup.OPERATOR, value, [], position, TokenType.SUBSHELL_END );
			case "|":
				return new Token( TokenGroup.OPERATOR, value, [], position, TokenType.PIPE );
			case "&":
				return new Token( TokenGroup.OPERATOR, value, [], position, TokenType.AMPERSAND );
			case ";":
				return new Token( TokenGroup.OPERATOR, value, [], position, TokenType.SEMICOLON );
			case "<":
				return new Token( TokenGroup.OPERATOR, value, [], position, TokenType.REDIR_IN );
			case ">":
				return new Token( TokenGroup.OPERATOR, value, [], position, TokenType.REDIR_OUT );
		}
		return new Token( TokenGroup.MISC, value, [], position, TokenType.UNKNOWN );
	}
	
	/**
	 * Tokenize process subtitution syntax
	 * 
	 * @returns {Token}
	 * 
	 * @throws {SyntaxError} Throws whether process subtitution is unterminated
	 * 
	 */
	tokenizeProcessSubstitution() {
		// consume <( or >(
		let body = "";
		let depth = 1;
		let position = this.position;
		let consumed = this.consume();
		let sign = new Token( TokenGroup.REDIRECTION, consumed, [], position, consumed === "<" ? TokenType.REDIR_IN : TokenType.REDIR_OUT ); // '<' or '>'
		this.advance(); // '('
		while( true ) {
			const char = this.peek();
			if( char === null ) {
				throw this.error( "Unterminated process substitution" );
			}
			if( char === "(" ) {
				depth++;
				body+= this.consume();
				continue;
			}
			if( char === ")" ) {
				depth--;
				if( depth === 0 ) {
					this.advance();
					break;
				}
				else {
					body+= this.consume();
					continue;
				}
			}
			body+= this.consume();
		}
		return new TokenProcessSubtitution( TokenGroup.EXPANSION, body, [], position, sign, TokenType.PROCESS_SUBSTITUTION );
	}
	
	/**
	 * Tokenize a quoted piece or dollar-quote ($'..' or $"..")
	 * 
	 * @returns {Token}
	 * 
	 */
	tokenizeQuotedOrDollarQuote() {
		let position = this.position;
		const char = this.peek();
		if( char === "'" ) {
			return this.tokenizeSingleQuoted();
		}
		if( char === "\"") {
			return this.tokenizeDoubleQuoted();
		}
		if( char === "$" && this.peekAhead( 1 ) === "'" ) {
			return this.tokenizeAnsiCQuoted();
		}
		if( char === "$" && this.peekAhead( 1 ) === "\"" ) {
			return this.tokenizeLocaleQuoted();
		}
		if( char === "$" && this.peekAhead( 1 ) === "(" ) {
			return this.tokenizeDollarOrBacktick();
		}
		// fallback
		this.position++;
		return new Token( TokenGroup.WORD, "", [], position, TokenType.WORD_PIECE);
	}
	
	/**
	 * Tokenize single quoted syntax
	 * 
	 * @returns {Token}
	 * 
	 * @throws {SyntaxError} Throws whether quote is unterminated
	 * 
	 */
	tokenizeSingleQuoted() {
		let values = "";
		let position = this.position;
		this.advance(); // skip '
		while( true ) {
			const char = this.peek();
			if( char == null ) {
				throw this.error( "Unterminated single quote" );
			}
			if( char === "'" ) {
				this.advance();
				break;
			}
			values+= this.consume();
		}
		return new Token( TokenGroup.QUOTED, values, [], position, TokenType.SINGLE_QUOTED );
	}
	
	/**
	 * Tokenize word piece syntax
	 * 
	 * @returns {Token}
	 * 
	 */
	tokenizeWordPiece() {
		let position = this.position;
		let string = "";
		while (true) {
			const char = this.peek();
			if( char === null ) {
				break;
			}
			if( char === "\n" || this.isWhitespace( char ) || this.isOperatorStart( char ) ) {
				break;
			}
			if( char === "\\" ) {
				this.advance();
				const next = this.peek();
				if( next === null ) {
					break;
				}
				string+= this.consume();
				continue;
			}
			if( char === "'" || char === "\"" ) {
				const quoted = char === "'" ? this.tokenizeSingleQuoted() : this.tokenizeDoubleQuoted();
				// append quoted lexeme into current chunk (caller will treat as piece)
				if( quoted.typed === TokenType.SINGLE_QUOTED ||
					quoted.typed === TokenType.DOUBLE_QUOTED ) {
					string+= quoted.lexeme;
					continue;
				}
			}
			
			// stop at $ to produce piece boundary
			if( char === "$" ) {
				break;
			}
			
			// stop on process substitution start
			if( ( char === "<" || char === ">" ) && this.peekAhead( 1 ) === "(" ) {
				break;
			}
			string+= this.consume();
		}
		return new Token( TokenGroup.WORD, string, [], position, TokenType.WORD_PIECE );
	}
	
}

export {
	Lexer
};
