// Define some routes.
// Each route should map to a component.
const $Routes = [
	{
		path: "/",
		icon: [
			"bx bx-home",
			"bx bxs-home"
		],
		slot: "Home",
		component: $Home
	},
	{
		path: "/about",
		icon: [
			"bx bx-user",
			"bx bxs-user"
		],
		slot: "About",
		component: $Abouts
	},
	{
		path: "/projects",
		icon: [
			"bx bx-code",
			"bx bx-code-alt"
		],
		slot: "Projects",
		children: [
			{
				path: "yume",
				icon: [],
				slot: "Yume",
				component: {}
			}
		],
		component: $Project
	},
	{
		path: "/contact",
		icon: [
			"bx bx-phone",
			"bx bxs-phone"
		],
		slot: "Contact",
		component: $Contact
	},
	{
		path: "/terminal",
		icon: [
			"bx bx-terminal",
			"bx bxs-terminal"
		],
		slot: "Terminal",
		component: $Terminal
	},
	{
		path: "/privacy",
		icon: [
			"bx bx-lock-open",
			"bx bxs-lock-open"
		],
		component: {}
	},
	{
		path: "/sitemap",
		icon: [
			"bx bx-link",
			"bx bx-link-alt"
		],
		slot: "Sitemap",
		component: {}
	},
	{
		name: "error",
		path: "/:e(.*)*",
		icon: [],
		component: {},
		props: route => ({
			command: [{
				output: [ "", `cd: ${route.path}: No such file or directory.`, "" ]
			}]
		})
	}
];

// The router instance.
const $Router = $Bash.prototype.router = VueRouter.createRouter({
	
	// Router history mode.
	history: VueRouter.createWebHistory(),
	
	routes: $Routes
	
});

const $Create = {
	data: () => ({
		pages: $Routes,
		error: false
	}),
	mounted: function()
	{
	},
	methods: {
		match: function()
		{
			return( this.$route.path.match( /^\/projects\/[a-z\_\-]+/gi ) ? false : true );
		}
	},
	template: $T.create.index,
	components: {
		Banner: {
			template: $T.create.banner
		},
		Burogu: {
			template: ""
		},
		Footer: {
			name: "Footer",
			data: function()
			{
				return({
					pages: [
						{ path: "/", slot: "Home" },
						{ path: "/abouts", slot: "Abouts" },
						{ path: "/contact", slot: "Contact" },
						{ path: "/privacy", slot: "Privacy" },
						{ path: "/sitemap", slot: "Sitemap" }
					],
					socmed: [
						{ link: "https://instagram.com/hx.ari", icon: "bx bxl-instagram" },
						{ link: "https://facebook.com/hx.are", icon: "bx bxl-facebook" },
						{ link: "https://twitter.com/hxxAre", icon: "bx bxl-twitter" },
						{ link: "https://github.com/hxAri", icon: "bx bxl-github" }
					]
				});
			},
			template: $T.create.footer
		},
		Parent: {
			components: {
				Tabs: {
					computed: {
						loop: function()
						{
							return({
								mounted: function()
								{
									this.$refs.tab.scrollLeft = $Scroll.left;
								},
								methods: {
									scroll: e =>
									{
										$Scroll.left = e.target.scrollLeft;
									}
								},
								template: "<div class=\"tabs flex flex-center\" ref=\"tab\" @scroll=\"scroll\">" + this.self() + "</div>"
							});
						}
					},
					mounted: function() {},
					methods: {
						self: function( div = "" )
						{
							for( let i in $Routes )
							{
								var route = $Routes[i];
								
								if( $Is( route.slot, Defined ) )
								{
									div += "<router-link to=\"" + route.path + "\">";
										div += "<div class=\"tab single flex flex-center fb-45 fc-0m\">";
											div += "<i class=\"" + ( this.$route.path === route.path ? route.icon[1] : route.icon[0] ) + " mg-right-14\"></i>";
											div += route.slot;
										div += "</div>";
									div += "</router-link>";
								}
							}
							return( div );
						}
					},
					template: `<component v-bind:is="loop"></component>`
				}
			},
			template: $T.create.parent
		}
	}
};

// The application instance.
const $Object = Vue.createApp( $Create );
	  
	  // Install the object instance as a plugin.
	  $Object.use( $Router );
	  
	  // Mount element.
	  $Object.mount( "#root" );