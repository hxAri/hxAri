
/**
 * 
 * hxAri | routes.js
 * 
 * @author hxAri
 * @github https://github.com/hxAri/hxAri
 * @license MIT
 * 
 * Copyright (c) 2022 Ari Setiawan | hxAri
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 */

import About from "/src/views/About.vue";
import Contact from "/src/views/Contact.vue";
import Document from "/src/views/Document.vue";
import Editor from "/src/views/Editor.vue";
import Home from "/src/views/Home.vue";
import Issues from "/src/views/Issues.vue";
import None from "/src/views/None.vue";
import Privacy from "/src/views/Privacy.vue";
import Project from "/src/views/Project.vue";
import Service from "/src/views/Service.vue";
import Sitemap from "/src/views/Sitemap.vue";
import Terminal from "/src/views/Terminal.vue";
import Testing from "/src/views/Testing.vue";


const routes = [
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
		path: "/editor",
		name: "editor",
		icon: {
			active: [ "bx", "bxs-edit" ],
			default: [ "bx", "bx-edit" ]
		},
		component: Editor
	},
	{
		path: "/issues",
		name: "issues",
		icon: {
			active: [ "bx", "bxs-bug" ],
			default: [ "bx", "bx-bug" ]
		},
		component: Issues
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
		path: "/service",
		name: "service",
		icon: {
			active: [ "bx", "bxs-wrench" ],
			default: [ "bx", "bx-wrench" ]
		},
		component: Service
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
		readable: true,
		component: Project,
		children: []
	},
	{
		path: "/projects/:project/:section(.*?)*",
		name: "project",
		visible: false,
		sensitive: false,
		component: Document
	},
	{
		path: "/terminal",
		name: "terminal",
		icon: {
			active: [ "bx", "bxs-terminal" ],
			default: [ "bx", "bx-terminal" ]
		},
		readable: false,
		sensitive: true,
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
		path: "/testing",
		name: "testing",
		icon: {
			active: [ "bx", "bxs-wrench" ],
			default: [ "bx", "bx-wrench" ]
		},
		readable: true,
		sensitive: true,
		component: Testing
	},
	{
		path: "/:none(.*?)*",
		name: "none",
		visible: false,
		readable: false,
		component: None
	}
];


export { routes as Routes };
