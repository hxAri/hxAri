
// Import Scripts
import Author from "/src/scripts/Author.js";

export default {
	name: "clear",
	type: "file",
	author: Author,
	abouts: "Clear the terminal screen",
	mounted: function()
	{
		this.$root.history = [];
	}
};