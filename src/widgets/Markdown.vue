
<script>
	
	import hljs from "highlight.js";
	import MarkdownIt from "markdown-it";
	
	import { Fmt } from "/src/scripts/formatter";

	export default {
		data: () => ({
			markdown: null
		}),
		props: {
			content: {
				type: String,
				required: true
			}
		},
		computed: {
			binding: function() {
				return {
					template: Fmt( "<div class=\"markdown pd-14\">{}</div>", this.markdown.render( this.content ) )
				};
			}
		},
		created: function() {
			this.markdown = new MarkdownIt({
				highlight: function( code, lang ) {
					if( lang, hljs.getLanguage( lang ) ) {
						try {
							return hljs.highlight( code, { language: lang } ).value;
						}
						catch( e ) {
						}
					}
					return "";
				},
				html: true,
				langPrefix: "language-"
			});
			// this.markdown.use();
		},
		template: "<component v-bind:is=\"binding\"></component>"
	};
	
</script>
