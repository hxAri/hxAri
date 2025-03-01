
// Import Terminal Commands
import Alias from "/src/scripts/shells/commands/Alias.js";
import Cd from "/src/scripts/shells/commands/Cd.js";
import Clear from "/src/scripts/shells/commands/Clear.js";
import Cookie from "/src/scripts/shells/commands/Cookie.js";
import Echo from "/src/scripts/shells/commands/Echo.js";
import Exit from "/src/scripts/shells/commands/Exit.js";
import Export from "/src/scripts/shells/commands/Export";
import Help from "/src/scripts/shells/commands/Help.js";
import Js from "/src/scripts/shells/commands/Js.js";
import Kanashi from "/src/scripts/shells/commands/Kanashi.js";
import Ls from "/src/scripts/shells/commands/Ls.js";
import Pwd from "/src/scripts/shells/commands/Pwd.js";
import Society from "/src/scripts/shells/commands/Society.js";
import Theme from "/src/scripts/shells/commands/Theme.js";
import Unalias from "/src/scripts/shells/commands/Unalias.js";

/**
 * Terminal Directory Structure.
 *
 * @values Array
 */
export default [
	{
		name: "bin",
		type: "symlink",
		from: "/usr/bin",
		meta: {
			mode: 0,
			owner: ""
		}
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
		child: [
			{
				name: "profile.d",
				type: "path",
				child: [
					{
						name: "env.js",
						type: "file"
					}
				]
			}
		]
	},
	{
		name: "home",
		type: "path",
		child: [
			{
				name: "hxari",
				type: "path",
				meta: {
					owner: "hxari"
				},
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
			}
		]
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
		meta: {
			mode: 777,
			owner: "hxari"
		},
		child: []
	},
	{
		name: "usr",
		type: "path",
		child: [
			{
				name: "bin",
				type: "path",
				
				/**
				 * Terminal Commands.
				 *
				 * @include alias +
				 * @include browser
				 * @include cd +
				 * @include cp
				 * @include clear +
				 * @include contact
				 * @include cookie +
				 * @include date
				 * @include echo +
				 * @include exit +
				 * @include export +
				 * @include help +
				 * @include hostname
				 * @include js +
				 * @include kanashi +
				 * @include ls +
				 * @include mkdir
				 * @include mv
				 * @include pwd +
				 * @include request
				 * @include rmdir
				 * @include society +
				 * @include test
				 * @include theme +
				 * @include tree
				 * @include unalias +
				 */
				child: [
					Alias,
					Cd,
					Clear,
					Cookie,
					Echo,
					Exit,
					Export,
					Help,
					Js,
					Kanashi,
					Ls,
					Pwd,
					Society,
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