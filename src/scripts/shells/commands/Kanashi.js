
// Import Scripts
import Author from "/src/scripts/Author.js";

export default {
	name: "kanashi",
	type: "binary",
	data: {
	},
	author: Author,
	abouts: "Kanashi is an Open-Source project for doing various things related to Instagram",
	options: {
		h: {
			type: Boolean,
			alias: "help",
			usage: "Show this help",
			require: false
		}
	},
	methods: {
	},
	mounted: function({ h }) {
		if( h ) {
			return this.$help();
		}
	}
};