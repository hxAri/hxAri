export default {
	name: "clear",
	type: "file",
	abouts: [
		"Clear the terminal screen"
	],
	mounted: function()
	{
		this.$root.history = [];
	}
};