
/**
 * 
 * hxAri | router.js
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

import { createRouter, createWebHistory } from "vue-router";

import { Routes } from "./routes";

// The router instance.
const router = createRouter({
	
	// Router history mode.
	history: createWebHistory(import.meta.env.BASE_URL),
	
	// Define some routes.
	// Each route should map to a component.
	routes: Routes,
	
	/**
	 * Scroll Behavior
	 *
	 * @param {8} to
	 * @param {*} from
	 * @param {*} save
	 *
	 * @returns {Object}
	 * 
	 */
	scrollBehavior: function( to, from, save ) {
		if( to.hash ) {
			return {
				el: to.hash,
				behavior: "smooth"
			};
		}
		else if( to.query.tab ) {
			return {
				el: to.query.tab,
				behavior: "smooth"
			};
		}
		else {
			if( save ) {
				return save;
			}
		}
		return {
			top: 0,
			behavior: "smooth"
		};
	}
});

export { router as Router };
