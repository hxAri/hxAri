
/**
 * 
 * hxAri | token.js
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

class Token {
	
	/** @type {TokenGroup} */
	grouped;
	
	/** @type {String} */
	lexeme;
	
	/** @type {Array<Token>} */
	pieces;
	
	/** @type {Number} */
	position;
	
	/** @type {TokenType} */
	typed;
	
	/**
	 * Construct method of class Token
	 * 
	 * @param {TokenGroup} grouped
	 * @param {String} lexeme
	 * @param {Array<Token>} pieces
	 * @param {Number} position
	 * @param {TokenType} typed
	 * 
	 */
	constructor( grouped, lexeme, pieces, position, typed ) {
		this.grouped = grouped;
		this.lexeme = lexeme;
		this.pieces = pieces;
		this.position = position;
		this.typed = typed;
	}
	
}

class TokenProcessSubtitution extends Token {
	
	/** @type {Token} */
	sign; // read (<), write (>)
	
	/**
	 * Construct method of class Token
	 * 
	 * @param {TokenGroup} grouped
	 * @param {String} lexeme
	 * @param {Array<Token>} pieces
	 * @param {Number} position
	 * @param {Token} sign
	 *  Operator sign-like read (<), write (>)
	 * @param {TokenType} typed
	 * 
	 */
	constructor( grouped, lexeme, pieces, position, sign, typed ) {
		super(
			grouped,
			lexeme,
			pieces,
			position,
			typed
		);
		this.sign = sign;
	}
	
};

/**
 * Map of token types.
 * 
 * Defines all lexical token types recognized by the Bash-compatible lexer.
 * Each token represents a syntactic unit in a Bash command line.
 * 
 * @property {String} AMPERSAND
 * @property {String} ANSI_C_QUOTED
 * @property {String} ARITHMETIC_EXPANSION
 * @property {String} ASSIGNMENT_WORD
 * @property {String} BACKTICK
 * @property {String} CASE
 * @property {String} COMMAND_SUBSTITUTION
 * @property {String} COMMENT
 * @property {String} COMPOSITE
 * @property {String} COPROC
 * @property {String} DECLARE
 * @property {String} DO
 * @property {String} DONE
 * @property {String} DOUBLE_AMPERSAND
 * @property {String} DOUBLE_PIPE
 * @property {String} DOUBLE_QUOTED
 * @property {String} ELIF
 * @property {String} ELSE
 * @property {String} EOF
 * @property {String} ESAC
 * @property {String} EXPANSION_OPERATOR
 * @property {String} EXPORT
 * @property {String} FI
 * @property {String} FOR
 * @property {String} FUNCTION
 * @property {String} GREATER
 * @property {String} GREATER_AND
 * @property {String} GREATER_GREATER
 * @property {String} HEREDOC_BODY
 * @property {String} HEREDOC_DELIM
 * @property {String} HEREDOC_END
 * @property {String} HEREDOC_START
 * @property {String} HERE_STRING
 * @property {String} IF
 * @property {String} IN
 * @property {String} LEFT_PAREN
 * @property {String} LESS
 * @property {String} LESS_AND
 * @property {String} LESS_GREATER
 * @property {String} LESS_LESS
 * @property {String} LINE_CONTINUATION
 * @property {String} LOCAL
 * @property {String} LOCALE_QUOTED
 * @property {String} NEWLINE
 * @property {String} OP_AND
 * @property {String} OP_ASSIGN
 * @property {String} OP_DIV
 * @property {String} OP_EQ
 * @property {String} OP_GE
 * @property {String} OP_GT
 * @property {String} OP_LE
 * @property {String} OP_LT
 * @property {String} OP_MINUS
 * @property {String} OP_MOD
 * @property {String} OP_MUL
 * @property {String} OP_NE
 * @property {String} OP_NOT
 * @property {String} OP_OR
 * @property {String} OP_PLUS
 * @property {String} PARAM_EXPANSION
 * @property {String} PIPE
 * @property {String} PIPE_AND
 * @property {String} PROCESS_SUBSTITUTION
 * @property {String} QUOTED_PART
 * @property {String} READONLY
 * @property {String} REDIR_APPEND
 * @property {String} REDIR_DUP_INPUT
 * @property {String} REDIR_DUP_OUTPUT
 * @property {String} REDIR_HEREDOC
 * @property {String} REDIR_HEREDOC_STRIP
 * @property {String} REDIR_IN
 * @property {String} REDIR_OUT
 * @property {String} REDIR_READ_WRITE
 * @property {String} RIGHT_PAREN
 * @property {String} SELECT
 * @property {String} SEMICOLON
 * @property {String} SEMI_AMP
 * @property {String} SEMI_SEMI
 * @property {String} SEMI_SEMI_AMP
 * @property {String} SHEBANG
 * @property {String} SINGLE_QUOTED
 * @property {String} SUBSHELL_END
 * @property {String} SUBSHELL_START
 * @property {String} THEN
 * @property {String} TIME
 * @property {String} UNKNOWN
 * @property {String} UNTIL
 * @property {String} VARIABLE_EXPANSION
 * @property {String} WHILE
 * @property {String} WHITESPACE
 * @property {String} WORD
 * @property {String} WORD_PIECE
 * 
 * @typedef {Map<String,String>} TokenType
 * 
 */
const TokenType = {
	/** `&` — Runs a command in the background. Example: `sleep 10 &` */
	AMPERSAND: "AMPERSAND",
	
	/** `$'string'` — ANSI-C quoted string supporting escape sequences. Example: `$'Hello\nWorld'` */
	ANSI_C_QUOTED: "ANSI_C_QUOTED",
	
	/** `$(( expression ))` — Arithmetic expansion. Example: `$((1 + 2))` */
	ARITHMETIC_EXPANSION: "ARITHMETIC_EXPANSION",
	
	/** `VAR=value` — Variable assignment. Example: `PATH=/usr/bin` */
	ASSIGNMENT_WORD: "ASSIGNMENT_WORD",
	
	/** `case` — Begins a case statement. Example: `case $x in ... esac` */
	CASE: "CASE",
	
	/** `$(command)` or `` `command` `` — Command substitution. Example: `echo $(date)` */
	COMMAND_SUBSTITUTION: "COMMAND_SUBSTITUTION",
	
	/** `# comment` — Shell comment. Example: `# this is a comment` */
	COMMENT: "COMMENT",
	
	COMPOSITE: "COMPOSITE",
	
	/** `coproc` — Starts a coprocess. Example: `coproc myproc { command; }` */
	COPROC: "COPROC",
	
	BACKTICK: "BACKTICK",
	
	/** `declare` — Declares variables or attributes. Example: `declare -i count=10` */
	DECLARE: "DECLARE",
	
	/** `do` — Marks the start of a loop body. Example: `for i in 1 2 3; do echo $i; done` */
	DO: "DO",
	
	/** `done` — Marks the end of a loop body. Example: `while true; do break; done` */
	DONE: "DONE",
	
	/** `&&` — Logical AND operator. Example: `make && echo 'done'` */
	DOUBLE_AMPERSAND: "DOUBLE_AMPERSAND",
	
	/** `||` — Logical OR operator. Example: `make || echo 'failed'` */
	DOUBLE_PIPE: "DOUBLE_PIPE",
	
	/** `"string"` — Double-quoted string, allows variable expansion. Example: `"Hello $USER"` */
	DOUBLE_QUOTED: "DOUBLE_QUOTED",
	
	/** `elif` — Else-if clause in if-then construct. Example: `if ...; then ...; elif ...; fi` */
	ELIF: "ELIF",
	
	/** `else` — Else clause in if-then construct. Example: `if ...; then ...; else ...; fi` */
	ELSE: "ELSE",
	
	/** End of file/input. */
	EOF: "EOF",
	
	/** `esac` — Ends a case statement. Example: `case ... in ... esac` */
	ESAC: "ESAC",
	
	/** `${var:-default}` — Parameter expansion operator. Example: `${USER:-guest}` */
	EXPANSION_OPERATOR: "EXPANSION_OPERATOR",
	
	/** `export` — Exports a variable to the environment. Example: `export PATH` */
	EXPORT: "EXPORT",
	
	/** `fi` — Ends an if-then construct. Example: `if ...; then ...; fi` */
	FI: "FI",
	
	/** `for` — Starts a for loop. Example: `for i in 1 2 3; do ...; done` */
	FOR: "FOR",
	
	/** `function` — Declares a function. Example: `function greet() { echo hi; }` */
	FUNCTION: "FUNCTION",
	
	/** `>` — Output redirection. Example: `echo hi > file.txt` */
	GREATER: "GREATER",
	
	/** `>&` — Duplicates output stream. Example: `echo hi >&2` */
	GREATER_AND: "GREATER_AND",
	
	/** `>>` — Appends to a file. Example: `echo hi >> file.txt` */
	GREATER_GREATER: "GREATER_GREATER",
	
	/** Body content inside a here-document (`<<EOF` ... `EOF`). */
	HEREDOC_BODY: "HEREDOC_BODY",
	
	/** The heredoc delimiter identifier (`<<EOF`). */
	HEREDOC_DELIM: "HEREDOC_DELIM",
	
	/** Closing heredoc marker (`EOF`). */
	HEREDOC_END: "HEREDOC_END",
	
	/** Start of a here-document (`<<`). */
	HEREDOC_START: "HEREDOC_START",
	
	/** `<<< string` — Here-string redirection. Example: `cat <<< "hello"` */
	HERE_STRING: "HERE_STRING",
	
	/** `if` — Starts an if-then construct. Example: `if [ $x -eq 1 ]; then ... fi` */
	IF: "IF",
	
	/** `in` — Used in a for loop. Example: `for x in a b c; do ... done` */
	IN: "IN",
	
	/** `(` — Opens a subshell or grouping. Example: `(cd /tmp; ls)` */
	LEFT_PAREN: "LEFT_PAREN",
	
	/** `<` — Input redirection. Example: `cat < file.txt` */
	LESS: "LESS",
	
	/** `<&` — Duplicates input descriptor. Example: `exec 3<&0` */
	LESS_AND: "LESS_AND",
	
	/** `<>` — Opens a file for both reading and writing. Example: `exec 3<>file.txt` */
	LESS_GREATER: "LESS_GREATER",
	
	/** `<<` — Here-document redirection. Example: `cat <<EOF ... EOF` */
	LESS_LESS: "LESS_LESS",
	
	/** `\` at end of line — Line continuation. Example: `echo foo \` `bar` */
	LINE_CONTINUATION: "LINE_CONTINUATION",
	
	/** `local` — Declares a variable as local within a function. Example: `local count=5` */
	LOCAL: "LOCAL",
	
	/** `$"string"` — Localizable string literal. Example: `$"Hello"` */
	LOCALE_QUOTED: "LOCALE_QUOTED",
	
	/** Newline (`\n`) — Separates commands. */
	NEWLINE: "NEWLINE",
	
	/** `&&` — Logical AND operator inside expressions. */
	OP_AND: "OP_AND",
	
	/** `=` — Assignment operator. Example: `x=10` */
	OP_ASSIGN: "OP_ASSIGN",
	
	/** `/` — Division operator. Example: `$((10 / 2))` */
	OP_DIV: "OP_DIV",
	
	/** `==` — Equality comparison. Example: `[[ $x == "hi" ]]` */
	OP_EQ: "OP_EQ",
	
	/** `>=` — Greater than or equal. Example: `$((x >= 2))` */
	OP_GE: "OP_GE",
	
	/** `>` — Greater than comparison. Example: `$((x > 0))` */
	OP_GT: "OP_GT",
	
	/** `<=` — Less than or equal. Example: `$((x <= 10))` */
	OP_LE: "OP_LE",
	
	/** `<` — Less than comparison. Example: `$((x < 5))` */
	OP_LT: "OP_LT",
	
	/** `-` — Subtraction operator. Example: `$((x - 1))` */
	OP_MINUS: "OP_MINUS",
	
	/** `%` — Modulo operator. Example: `$((x % 2))` */
	OP_MOD: "OP_MOD",
	
	/** `*` — Multiplication operator. Example: `$((x * 2))` */
	OP_MUL: "OP_MUL",
	
	/** `!=` — Not equal comparison. Example: `[[ $x != "no" ]]` */
	OP_NE: "OP_NE",
	
	/** `!` — Logical negation. Example: `! true` */
	OP_NOT: "OP_NOT",
	
	/** `||` — Logical OR operator. Example: `cmd1 || cmd2` */
	OP_OR: "OP_OR",
	
	/** `+` — Addition operator. Example: `$((x + 1))` */
	OP_PLUS: "OP_PLUS",
	
	/** `${var}` — Parameter expansion. Example: `${HOME}` */
	PARAM_EXPANSION: "PARAM_EXPANSION",
	
	/** `|` — Pipe operator. Example: `echo hi | grep h` */
	PIPE: "PIPE",
	
	/** `|&` — Pipe both stdout and stderr. Example: `cmd1 |& cmd2` */
	PIPE_AND: "PIPE_AND",
	
	/** `<(cmd)` or `>(cmd)` — Process substitution. Example: `diff <(ls) <(ls /tmp)` */
	PROCESS_SUBSTITUTION: "PROCESS_SUBSTITUTION",
	
	/** Quoted string content component. */
	QUOTED_PART: "QUOTED_PART",
	
	/** `readonly` — Marks a variable as read-only. Example: `readonly VAR=value` */
	READONLY: "READONLY",
	
	/** `>>` — Append redirection operator. Example: `echo hi >> file.txt` */
	REDIR_APPEND: "REDIR_APPEND",
	
	/** `<&n` — Duplicate input descriptor. */
	REDIR_DUP_INPUT: "REDIR_DUP_INPUT",
	
	/** `>&n` — Duplicate output descriptor. */
	REDIR_DUP_OUTPUT: "REDIR_DUP_OUTPUT",
	
	/** `<<EOF` — Here-document redirection. */
	REDIR_HEREDOC: "REDIR_HEREDOC",
	
	/** `<<-EOF` — Here-document with leading tab stripping. */
	REDIR_HEREDOC_STRIP: "REDIR_HEREDOC_STRIP",
	
	/** `<` — Input redirection operator. */
	REDIR_IN: "REDIR_IN",
	
	/** `>` — Output redirection operator. */
	REDIR_OUT: "REDIR_OUT",
	
	/** `<>` — Read-write redirection operator. */
	REDIR_READ_WRITE: "REDIR_READ_WRITE",
	
	/** `)` — Closes subshell or grouping. */
	RIGHT_PAREN: "RIGHT_PAREN",
	
	/** `select` — Starts a select loop. Example: `select opt in a b; do ... done` */
	SELECT: "SELECT",
	
	/** `;` — Command separator. Example: `cmd1; cmd2` */
	SEMICOLON: "SEMICOLON",
	
	/** `;&` — Fallthrough case terminator. Example: `case ... in a) ... ;& b) ... ;; esac` */
	SEMI_AMP: "SEMI_AMP",
	
	/** `;;` — Ends a case pattern. Example: `a) echo a ;;` */
	SEMI_SEMI: "SEMI_SEMI",
	
	/** `;;&` — Conditional fallthrough case terminator. */
	SEMI_SEMI_AMP: "SEMI_SEMI_AMP",
	
	/** `'string'` — Single-quoted literal string. Example: `'Hello World'` */
	SINGLE_QUOTED: "SINGLE_QUOTED",
	
	SHEBANG: "SHEBANG",
	
	/** `)` — End of subshell expression. Example: `(cd /tmp)` */
	SUBSHELL_END: "SUBSHELL_END",
	
	/** `(` — Start of subshell expression. Example: `(ls)` */
	SUBSHELL_START: "SUBSHELL_START",
	
	/** `then` — Marks if-then block body. Example: `if ...; then ... fi` */
	THEN: "THEN",
	
	/** `time` — Measures execution time. Example: `time ls` */
	TIME: "TIME",
	
	/** Unknown or invalid token. */
	UNKNOWN: "UNKNOWN",
	
	/** `until` — Begins an until loop. Example: `until false; do ...; done` */
	UNTIL: "UNTIL",
	
	/** `$VAR` — Variable expansion. Example: `$HOME` */
	VARIABLE_EXPANSION: "VARIABLE_EXPANSION",
	
	/** `while` — Begins a while loop. Example: `while true; do ...; done` */
	WHILE: "WHILE",
	
	/** Whitespace (spaces, tabs, etc.). */
	WHITESPACE: "WHITESPACE",
	
	/** General word (command or argument). Example: `echo`, `ls`, `file.txt` */
	WORD: "WORD",
	
	/** Partial word segment, used for internal token merging. */
	WORD_PIECE: "WORD_PIECE"
};

/**
 * Map of token group names.
 * 
 * @property {String} COMMENT
 * @property {String} EXPANSION
 * @property {String} HEREDOC
 * @property {String} METACHARACTER
 * @property {String} MISC
 * @property {String} OPERATOR
 * @property {String} QUOTED
 * @property {String} REDIRECTION
 * @property {String} RESERVED_WORD
 * @property {String} SUBSHELL
 * @property {String} WHITESPACE
 * @property {String} WORD
 * 
 * @typedef {Map<String,String>} TokenGroup
 * 
 */
const TokenGroup = Object.freeze({
	COMMENT: "COMMENT",
	EXPANSION: "EXPANSION",
	HEREDOC: "HEREDOC",
	METACHARACTER: "METACHARACTER",
	MISC: "MISC",
	OPERATOR: "OPERATOR",
	QUOTED: "QUOTED",
	REDIRECTION: "REDIRECTION",
	RESERVED_WORD: "RESERVED_WORD",
	SUBSHELL: "SUBSHELL",
	WHITESPACE: "WHITESPACE",
	WORD: "WORD"
});

/**
 * Map of grouped tokens.
 * 
 * @property {Array<TokenType>} COMMENT
 * @property {Array<TokenType>} EXPANSION
 * @property {Array<TokenType>} HEREDOC
 * @property {Array<TokenType>} METACHARACTER
 * @property {Array<TokenType>} MISC
 * @property {Array<TokenType>} OPERATOR
 * @property {Array<TokenType>} QUOTED
 * @property {Array<TokenType>} REDIRECTION
 * @property {Array<TokenType>} RESERVED_WORD
 * @property {Array<TokenType>} SUBSHELL
 * @property {Array<TokenType>} WHITESPACE
 * @property {Array<TokenType>} WORD
 * 
 * @typedef {Map<TokenGroup,Array<TokenType>>}
 * 
 */
const TokenGrouped = Object.freeze( Object.assign( new Map(), {
	[TokenGroup.COMMENT]: [
		TokenType.COMMENT,
		TokenType.SHEBANG
	],
	[TokenGroup.EXPANSION]: [
		TokenType.ARITHMETIC_EXPANSION,
		TokenType.BACKTICK,
		TokenType.COMMAND_SUBSTITUTION,
		TokenType.EXPANSION_OPERATOR,
		TokenType.PARAM_EXPANSION,
		TokenType.PROCESS_SUBSTITUTION,
		TokenType.VARIABLE_EXPANSION
	],
	[TokenGroup.HEREDOC]: [
		TokenType.HEREDOC_BODY,
		TokenType.HEREDOC_DELIM,
		TokenType.HEREDOC_END,
		TokenType.HEREDOC_START
	],
	[TokenGroup.METACHARACTER]: [
		TokenType.SEMICOLON,
		TokenType.AMPERSAND,
		TokenType.PIPE,
		TokenType.DOUBLE_PIPE,
		TokenType.DOUBLE_AMPERSAND,
		TokenType.LEFT_PAREN,
		TokenType.RIGHT_PAREN,
		TokenType.LESS,
		TokenType.GREATER,
		TokenType.LESS_LESS,
		TokenType.GREATER_GREATER,
		TokenType.LESS_AND,
		TokenType.GREATER_AND,
		TokenType.LESS_GREATER,
		TokenType.PIPE_AND,
		TokenType.SEMI_SEMI,
		TokenType.SEMI_AMP,
		TokenType.SEMI_SEMI_AMP
	],
	[TokenGroup.MISC]: [
		TokenType.COMPOSITE,
		TokenType.EOF,
		TokenType.UNKNOWN
	],
	[TokenGroup.OPERATOR]: [
		TokenType.OP_PLUS,
		TokenType.OP_MINUS,
		TokenType.OP_MUL,
		TokenType.OP_DIV,
		TokenType.OP_MOD,
		TokenType.OP_EQ,
		TokenType.OP_NE,
		TokenType.OP_LT,
		TokenType.OP_GT,
		TokenType.OP_LE,
		TokenType.OP_GE,
		TokenType.OP_AND,
		TokenType.OP_OR,
		TokenType.OP_NOT,
		TokenType.OP_ASSIGN
	],
	[TokenGroup.QUOTED]: [
		TokenType.SINGLE_QUOTED,
		TokenType.DOUBLE_QUOTED,
		TokenType.ANSI_C_QUOTED,
		TokenType.LOCALE_QUOTED,
		TokenType.QUOTED_PART
	],
	[TokenGroup.REDIRECTION]: [
		TokenType.REDIR_IN,
		TokenType.REDIR_OUT,
		TokenType.REDIR_APPEND,
		TokenType.REDIR_HEREDOC,
		TokenType.REDIR_HEREDOC_STRIP,
		TokenType.REDIR_DUP_INPUT,
		TokenType.REDIR_DUP_OUTPUT,
		TokenType.REDIR_READ_WRITE,
		TokenType.HERE_STRING
	],
	[TokenGroup.RESERVED_WORD]: [
		TokenType.IF,
		TokenType.THEN,
		TokenType.ELSE,
		TokenType.ELIF,
		TokenType.FI,
		TokenType.FOR,
		TokenType.WHILE,
		TokenType.UNTIL,
		TokenType.DO,
		TokenType.DONE,
		TokenType.CASE,
		TokenType.IN,
		TokenType.ESAC,
		TokenType.FUNCTION,
		TokenType.SELECT,
		TokenType.TIME,
		TokenType.COPROC,
		TokenType.EXPORT,
		TokenType.DECLARE,
		TokenType.LOCAL,
		TokenType.READONLY
	],
	[TokenGroup.SUBSHELL]: [
		TokenType.SUBSHELL_START,
		TokenType.SUBSHELL_END
	],
	[TokenGroup.WHITESPACE]: [
		TokenType.NEWLINE,
		TokenType.LINE_CONTINUATION,
		TokenType.WHITESPACE
	],
	[TokenGroup.WORD]: [
		TokenType.ASSIGNMENT_WORD,
		TokenType.WORD,
		TokenType.WORD_PIECE
	]
}));


export {
	Token,
	TokenGroup,
	TokenGrouped,
	TokenProcessSubtitution,
	TokenType
};
