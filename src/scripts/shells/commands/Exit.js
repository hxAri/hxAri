
// Import Scripts
import Author from "/src/scripts/Author.js";

export default {
	name: "exit",
	type: "binary",
	author: Author,
	abouts: "Close current terminal tab",
	mounted: function()
	{
		window.close();
	}
};