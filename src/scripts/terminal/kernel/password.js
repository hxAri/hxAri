
/**
 * 
 * hxAri | password.js
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

import { Fmt } from "/src/scripts/formatter";


class Password {
	
	/** @type {String} */
	chipertext;
	
	/** @type {Number} */
	expired;
	
	/** @type {Number} */
	inactive;
	
	/** @type {Number} */
	maximum;
	
	/** @type {Number} */
	minimum;
	
	/** @type {Number} */
	updated;
	
	/** @type {String} */
	username;
	
	/** @type {Number} */
	warning;
	
	/**
	 * Construct method of class Password
	 * 
	 * @param {String} username
	 * @param {Object} options
	 * @param {String} [options.chipertext]
	 * @param {Number} [options.expired]
	 * @param {Number} [options.inactive]
	 * @param {Number} [options.maximum]
	 * @param {Number} [options.minimum]
	 * @param {Number} [options.updated]
	 * @param {Number} [options.warning]
	 * 
	 */
	constructor( username, options={ chipertext: "!", expired: null, inactive: null, maximum: 0, minimum: 0, updated: 19743, warning: 7 } ) {
		this.chipertext = options.chipertext;
		this.expired = options.expired;
		this.inactive = options.inactive;
		this.maximum = options.maximum;
		this.minimum = options.minimum;
		this.updated = options.updated;
		this.username = username;
		this.warning = options.warning;
	}
	
	/**
	 * Returns a string representation of a Password
	 * 
	 * @returns {String}
	 * 
	 */
	toString() {
		return Fmt( "{}:{}:{}:{}:{}:{}:{}:{}", ...[
			this.username,
			this.chipertext || "!",
			this.updated ?? 19743,
			this.minimum ?? 0,
			this.maximum ?? 0,
			this.warning ?? 7,
			this.inactive ?? "",
			this.expired ?? ""
		]);
	}
	
}

export {
	Password
};
