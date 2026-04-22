
/**
 * 
 * hxAri | alias.js
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

import { test } from "vitest";

import { Fmt } from "/src/scripts/formatter";
import { Lexer } from "/src/scripts/terminal";


const commands = {
	AMPERSAND: "command argv --options &",
	ANSI_C_QUOTED: "command $'string'",
	ARITHMETIC_EXPANSION: "command $((1 + 2))",
	ASSIGNMENT_WORD: "variable=value",
	ASSIGNMENT_WORD_QUOTED: "variable=\"value\"",
	CASE: "case expression in match) statement;; esac",
	COMMAND_SUBSTITUTION: "command $(command subtituted $(command inner))",
	COMMENT: "# Single-Line comment",
	COPROC: "coproc myproc { command; }",
	DECLARE: "declare -i count=10",
	DO: "for i in 1 2 3; do echo $i; done",
	DONE: "while true; do break; done",
	DOUBLE_AMPERSAND: "make && echo \"done\"",
	DOUBLE_PIPE: "make || echo \"failed\"",
	DOUBLE_QUOTED: "command \"Hello $USER\"",
	ELIF: "if [[ $? -eq 0 ]]; then echo -e \"success\"; elif [[ $? -ne 1 ]]; then echo -e \"failed\"; fi",
	ELSE: "if [[ $? -eq 0 ]]; then echo -e \"success\"; else; then echo -e \"failed\"; fi",
	EOF: "\0",
	ESAC: "case expression in match) statement;; esac",
	EXPANSION_OPERATOR: "${USER:-guest}",
	EXPORT: "export PATH=${PATH}:/${USER}/bin/",
	FI: "if [[ $? -eq 0 ]]; then echo -e \"success\"; fi",
	FOR: "for i in 1 2 3; do echo -e $i; done",
	FUNCTION: "function greet() { echo -e Hello World; }",
	GREATER: "echo -e Hello World > file.txt",
	GREATER_AND: "echo -e Hello World >&2",
	GREATER_GREATER: "echo -e Hello World >> file.txt",
	HEREDOC: "cat <<-EOF \nHeredoc Body\nEOF; additional", 
	HEREDOC_BODY: "<<EOF \nHeredoc Body\nEOF", 
	// HEREDOC_DELIM: "<<EOF", 
	HEREDOC_END: "EOF", 
	HEREDOC_START: "<<", 
	HERE_STRING: "cat <<< \"hello\"", 
	IF: "if [ $x -eq 1 ]; then statements; fi",
	IN: "for x in {1...3}; do statements; done",
	LEFT_PAREN: "(cd /tmp; ls)",
	LESS: "cat < file.txt",
	LESS_AND: "exec 3<&0",
	LESS_GREATER: "exec 3<>file.txt",
	LESS_LESS: "cat <<EOF\nEOF", 
	LINE_CONTINUATION: "echo foo \`something else here!`bar",
	LOCAL: "local count=5",
	LOCALE_QUOTED: "echo -e $\"Hello\"",
	NEWLINE: "\n",
	OP_AND: "[[ expression ]] && [[ expression ]]",
	OP_ASSIGN: "x=10",
	OP_DIV: "$((10 / 2))",
	OP_EQ: "[[ $x == \"hi\" ]]",
	OP_GE: "$((x >= 2))",
	OP_GT: "$((x > 0))",
	OP_LE: "$((x <= 10))",
	OP_LT: "$((x < 5))",
	OP_MINUS: "$((x - 1))",
	OP_MOD: "$((x % 2))",
	OP_MUL: "$((x * 2))",
	OP_NE: "[[ $x != \"no\" ]]",
	OP_NOT: "! true",
	OP_OR: "command || command",
	OP_PLUS: "$((x + 1))",
	PARAM_EXPANSION: "${HOME}",
	PIPE: "echo -e \"Hello World!\" | grep -i hello",
	PIPE_AND: "echo -e \"Hello World!\" |& grep -i hello",
	PROCESS_SUBSTITUTION: "diff <(ls) <(ls /tmp); diff >(ls) >(ls /tmp)",
	QUOTED_PART: "QUOTED_PART",
	READONLY: "readonly VAR=value",
	REDIR_APPEND: "echo Hello World >> file.txt",
	REDIR_DUP_INPUT: "<&1",
	REDIR_DUP_OUTPUT: ">&2",
	// REDIR_HEREDOC: "<<EOF", 
	// REDIR_HEREDOC_STRIP: "<<-EOF", 
	REDIR_IN: "<",
	REDIR_OUT: ">",
	REDIR_READ_WRITE: "<>",
	RIGHT_PAREN: ")",
	SELECT: "select opt in a b; do statements; done",
	SEMICOLON: "command; command",
	SEMI_AMP: "case expression in a) statements ;& b) statements ;; esac",
	SEMI_SEMI: "a) echo a ;;",
	SEMI_SEMI_AMP: ";;&",
	SHEBANG: "#!/usr/bin/env bash",
	SINGLE_QUOTED: "echo -e 'Hello World'",
	SUBSHELL_END: "puts \"(ls)\"",
	SUBSHELL_START: "puts \"(ls)\"",
	THEN: "if [[ expression ]]; then statement; fi",
	TIME: "time ls",
	UNTIL: "until false; do # statements here\ndone",
	VARIABLE_EXPANSION: "$VARIABLE",
	WHILE: "while true; do # statements here\ndone",
	WHITESPACE: "\t",
	WORD: "echo",
	WORD_PIECE: "echo -e \"Uwuw Uwuwww\""
};

for( const keyset of Object.keys( commands ) ) {
	const command = commands[keyset];
	const identifier = Fmt( "TokenType.{} Lexer.tokenize( \"{}\" )", keyset, command.replaceAll( /\"/g, "\\\"" ) );
	test.only( identifier, function() {
		const lexer = new Lexer( command, true );
		      lexer.tokenize();
	});
}
