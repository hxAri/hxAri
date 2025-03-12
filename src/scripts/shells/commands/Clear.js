
// Import Scripts
import Author from "/src/scripts/Author.js";

export default {
	name: "clear",
	type: "binary",
	data: {
		$console: console
	},
	author: Author,
	abouts: "Clear the terminal screen",
	mounted: function() {
		this.$root.history = [];
		this.$console.clear();
		return {
			stdin: null,
			stderr: [],
			stdout: [
			]
		};
	}
};