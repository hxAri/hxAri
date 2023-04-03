
/*
 * Terminal Commands.
 *
 * @include alias
 * @include cd
 * @include cp
 * @include clear
 * @include contact
 * @include cookie
 * @include date
 * @include echo
 * @include eruda
 * @include exit
 * @include export
 * @include help
 * @include hostname
 * @include ls
 * @include mkdir
 * @include mv
 * @include request
 * @include rmdir
 * @include test
 * @include theme
 * @include tree
 * @include unalias
 * @include unexport
 */
export default [
	{
		name: "alias",
		type: "executable",
		abouts: [
			"Define terminal command alias name",
			"No arguments will be return all defined aliases"
		],
		options: {
			help: {
				type: Boolean,
				usage: "Show this help",
				require: false
			},
			print: {
				type: Boolean,
				alias: "p",
				usage: "Print all defined aliases",
				require: false
			}
		},
		methods: {},
		mounted: function({ help, print })
		{
			// Todo code here...
		}
	},
	{
		name: "clear",
		type: "executable",
		mounted: function({})
		{
			this.$shell.history = [];
		}
	}
];
