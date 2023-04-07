
// Import Views
import Home from "/src/views/Home.vue";

export default [
	{
		path: "/",
		name: "home",
		icon: {
			active: [ "bx", "bxs-home" ],
			default: [ "bx", "bx-home" ]
		},
		component: Home
	},
	{
		path: "/about",
		name: "about",
		icon: {
			active: [ "bx", "bxs-info-circle" ],
			default: [ "bx", "bx-info-circle" ]
		},
		component: () => import( "/src/views/About.vue" )
	},
	{
		path: "/contact",
		name: "contact",
		icon: {
			active: [ "bx", "bxs-phone" ],
			default: [ "bx", "bx-phone" ]
		},
		component: () => import( "/src/views/Contact.vue" )
	},
	{
		path: "/privacy",
		name: "privacy",
		icon: {
			active: [ "bx", "bxs-lock" ],
			default: [ "bx", "bx-lock" ]
		},
		component: () => import( "/src/views/Privacy.vue" )
	},
	{
		path: "/sitemap",
		name: "sitemap",
		icon: {
			active: [ "bx", "bx-link-alt" ],
			default: [ "bx", "bx-link" ]
		},
		component: () => import( "/src/views/Sitemap.vue" )
	},
	{
		path: "/projects",
		name: "projects",
		icon: {
			active: [ "bx", "bxs-flag" ],
			default: [ "bx", "bx-flag" ]
		},
		component: () => import( "/src/views/Project.vue" )
	},
	{
		path: "/terminal",
		name: "terminal",
		icon: {
			active: [ "bx", "bxs-terminal" ],
			default: [ "bx", "bx-terminal" ]
		},
		readable: false,
		component: () => import( "/src/views/Terminal.vue" ),
		children: [
			{
				path: ":terminalPath(.*?)*",
				name: "terminal-path",
				readable: false,
				component: {}
			}
		]
	},
	{
		path: "/:none(.*?)*",
		name: "none",
		visible: false,
		readable: false,
		component: () => import( "/src/views/None.vue" )
	}
];