
// Import Scripts
import Commands from "./Commands.js";

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
				child: Commands
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