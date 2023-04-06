
// Import Scripts
import Mapper from "/src/scripts/Mapper.js";
import Type from "/src/scripts/Type.js";

export default {
	name: "echo",
	type: "file",
	data: {
		regexp: /(?:(?<backslash>\\\\)|\\(?<escaped>b|n|r|t|v))/g
	},
	options: {
		e: {
			type: Boolean,
			usage: "Enable interpretation of backslash escapes",
			require: false
		},
		n: {
			type: Boolean,
			usage: "Do not print the trailing newline",
			require: false
		}
	},
	mounted: function({ e, n } = {})
	{
		if( e === true && n === true ) throw "To many arguments";
		if( e === true )
		{
			// ...
		}
		else {
			// ...
		}
	}
};
