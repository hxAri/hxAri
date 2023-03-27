/*
 * Avatar component.
 *
 * @options Object $inject, $link|$route, $title, $alt, $src
 */
const $Avatar = {
	props: {
		options: {
			type: Object,
			require: true
		}
	},
	computed: {
		binding: function()
		{
			return({
				template: this.building()
			});
		}
	},
	methods: {
		building: function()
		{
			// Avatar stack.
			var stack = "";
			
			if( $Is( this.options, Object ) )
			{
				// Class injection.
				this.options.inject = $f( "avatar-wrapper flex flex-center {}", this.options.inject ? this.options.inject : "" );
				
				// ...
				if( $Is( this.options.link, String ) )
				{
					// ...
					stack += "<div class=\"avatar\">";
						stack += "<div class=\"{}\">";
							stack += "<a href=\"{}\" target=\"_blank\" rel=\"noopener noreferrer\">";
								stack += "<img class=\"avatar-image\" title=\"{}\" alt=\"{}\" src=\"{}\" />";
								stack += "<div class=\"avatar-cover\"></div>";
							stack += "</a>";
						stack += "</div>";
					stack += "</div>";
					
					// ...
					return( $f( stack, 
						this.options.inject,
						this.options.link,
						this.options.title,
						this.options.alt,
						this.options.src
					));
				}
				
				// ...
				if( $Is( this.options.route, String ) )
				{
					// ...
					stack += "<div class=\"avatar\">";
						stack += "<div class=\"{}\">";
							stack += "<router-link to=\"{}\">";
								stack += "<img class=\"avatar-image\" title=\"{}\" alt=\"{}\" src=\"{}\" />";
								stack += "<div class=\"avatar-cover\"></div>";
							stack += "</router-link>";
						stack += "</div>";
					stack += "</div>";
					
					// ...
					return( $f( stack, 
						this.options.inject,
						this.options.route,
						this.options.title,
						this.options.alt,
						this.options.src
					));
				}
				
				// ...
				stack += "<div class=\"avatar\">";
					stack += "<div class=\"{}\">";
						stack += "<img class=\"avatar-image\" title=\"{}\" alt=\"{}\" src=\"{}\" />";
						stack += "<div class=\"avatar-cover\"></div>";
					stack += "</div>";
				stack += "</div>";
				
				// ...
				return( $f( stack, 
					this.options.inject,
					this.options.title,
					this.options.alt,
					this.options.src
				));
			}
			return( "<div class=\"avatar\"></div>" );
		}
	},
	template: `<component v-bind:is="binding"></component>`
};