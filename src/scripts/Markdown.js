
export default function Markdown( string )
{
	var self = {
		groups: {
			bold: {
				pattern: "\\*\\*[^\\*\\*\\\\]+",
				handler: function( match )
				{}
			},
			code: {
				pattern: "(?<!\\\\)(?<code_begin>[\\`]{1,2,3})(?:(?<code_block>[^\k{code_begin}\\\\]|\\.)*)*(?<!\\\\)(?<code_end>\k{code_begin})",
				handler: function( match )
				{}
			}
		},
		pattern: [],
		compile: null
	};
	self.pattern = Object.keys( self.groups ).map( group => Fmt( "(?<{}>{})", self.group, self.groups[group] ) );
	self.compile = Fmt( "(?:{})", self.pattern.join( "|" ) );
	self.regexp = new RegExp( self.compile, "ig" );
};
