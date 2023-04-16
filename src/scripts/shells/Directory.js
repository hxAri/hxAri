
// Import Terminal Commands
import Alias from "/src/scripts/shells/commands/Alias.js";
import Clear from "/src/scripts/shells/commands/Clear.js";
import Echo from "/src/scripts/shells/commands/Echo.js";
import Help from "/src/scripts/shells/commands/Help.js";
import Js from "/src/scripts/shells/commands/Js.js";
import Theme from "/src/scripts/shells/commands/Theme.js";
import Unalias from "/src/scripts/shells/commands/Unalias.js";

/*
 * Terminal Directory Structure.
 *
 * @values Array
 */
export default [
	{
		name: "bin",
		type: "symlink",
		from: "/usr/bin"
	},
	{
		name: "boot",
		type: "path",
		child: []
	},
	{
		name: "data",
		type: "path",
		child: []
	},
	{
		name: "dev",
		type: "path",
		child: []
	},
	{
		name: "etc",
		type: "path",
		child: []
	},
	{
		name: "home",
		type: "path",
		child: []
	},
	{
		name: "lib",
		type: "symlink",
		from: "/usr/lib"
	},
	{
		name: "media",
		type: "path",
		child: []
	},
	{
		name: "mnt",
		type: "path",
		child: []
	},
	{
		name: "opt",
		type: "path",
		child: []
	},
	{
		name: "proc",
		type: "path",
		child: []
	},
	{
		name: "root",
		type: "path",
		child: [
			{
				name: ".bashrc",
				type: "bashrc"
			},
			{
				name: ".bash_history",
				type: "text"
			}
		]
	},
	{
		name: "run",
		type: "symlink",
		from: "/var/run"
	},
	{
		name: "sbin",
		type: "symlink",
		from: "/usr/sbin"
	},
	{
		name: "srv",
		type: "path",
		child: []
	},
	{
		name: "sys",
		type: "path",
		child: []
	},
	{
		name: "tmp",
		type: "path",
		child: []
	},
	{
		name: "usr",
		type: "path",
		child: [
			{
				name: "bin",
				type: "path",
				
				/*
				 * Terminal Commands.
				 *
				 * @include alias +
				 * @include cd
				 * @include cp
				 * @include clear +
				 * @include contact
				 * @include cookie
				 * @include date
				 * @include echo +
				 * @include eruda
				 * @include exit
				 * @include export
				 * @include help +
				 * @include hostname
				 * @include js +
				 * @include ls
				 * @include mkdir
				 * @include mv
				 * @include request
				 * @include rmdir
				 * @include test
				 * @include theme
				 * @include tree
				 * @include unalias +
				 * @include unexport
				 */
				child: [
					Alias,
					Clear,
					Echo,
					Help,
					Js,
					Theme,
					Unalias
				]
			},
			{
				name: "lib",
				type: "path",
				child: [],
			},
			{
				name: "sbin",
				type: "path",
				child: []
			}
		]
	},
	{
		name: "var",
		type: "path",
		child: [
			{
				name: "run",
				type: "path",
				child: []
			}
		]
	}
];