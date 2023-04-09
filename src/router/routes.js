
// Import Views
import About from "/src/views/About.vue";
import Contact from "/src/views/Contact.vue";
import Home from "/src/views/Home.vue";
import None from "/src/views/None.vue";
import Privacy from "/src/views/Privacy.vue";
import Project from "/src/views/Project.vue";
import Sitemap from "/src/views/Sitemap.vue";
import Terminal from "/src/views/Terminal.vue";

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
		component: About
	},
	{
		path: "/contact",
		name: "contact",
		icon: {
			active: [ "bx", "bxs-phone" ],
			default: [ "bx", "bx-phone" ]
		},
		component: Contact
	},
	{
		path: "/privacy",
		name: "privacy",
		icon: {
			active: [ "bx", "bxs-lock" ],
			default: [ "bx", "bx-lock" ]
		},
		component: Privacy
	},
	{
		path: "/sitemap",
		name: "sitemap",
		icon: {
			active: [ "bx", "bx-link-alt" ],
			default: [ "bx", "bx-link" ]
		},
		component: Sitemap
	},
	{
		path: "/projects",
		name: "projects",
		icon: {
			active: [ "bx", "bxs-flag" ],
			default: [ "bx", "bx-flag" ]
		},
		component: Project
	},
	{
		path: "/terminal",
		name: "terminal",
		icon: {
			active: [ "bx", "bxs-terminal" ],
			default: [ "bx", "bx-terminal" ]
		},
		readable: false,
		component: Terminal,
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
		component: None
	}
];