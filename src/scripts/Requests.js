
/**
 * 
 * hxAri | requests.js
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

// Import Scripts
import { Fmt } from "/src/scripts/formatter";
import Mapper from "/src/scripts/Mapper.js";
import Request from "/src/scripts/Request.js";
import { Typed } from "/src/scripts/types";

/**
 * Send multiple requests.
 *
 * @param {Array<Object>} requests
 *
 * @returns {Array<Promise<XMLHttpRequest>>}
 *
 * @throws {TypeError}
 * 
 */
export default async function MultiRequest( requests ) {
	if( Typed( requests, Array ) ) {
		return await Promise.all( Mapper( requests,
			
			/**
			 * Handle mapping.
			 *
			 * @param {Number} i
			 * @param {Object} request
			 *
			 */
			async function( i, request ) {
				if( Typed( request, Object ) ) {
					var url = Typed( request.url, String, () => request.url, () => "" );
					var method = Typed( request.method, String, () => request.method, () => "GET" );
					var options = Typed( request.options, Object, () => request.options, () => Object.create({}) );
				}
				else {
					var url = request;
					var method = "GET";
					var options = {};
				}
				return await Request( method, url, options );
			}
		));
	}
	else {
		throw new TypeError( Fmt( "Parameter $requests must be type Array, {} given", Typed( requests ) ) );
	}
};
