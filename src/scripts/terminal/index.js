
/**
 * 
 * hxAri | index.js
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

"use strict";

import { Buffer  } from "buffer";

// Import Scripts
// import Author from "/src/scripts/Author.js";
// import Banner from "/src/scripts/shells/Banner.js";
import { bin2hex } from "/src/scripts/common";
import { Fmt } from "/src/scripts/formatter";
import { UnixTime } from "../unixtime";
// import Directory from "/src/scripts/shells/Directory.js";
// import Helper from "/src/scripts/shells/Helper.js"
import { Mapper } from "../mapper";
import { Router } from "/src/routing";
import { Typed } from "/src/scripts/types";
import { isEmpty, isNotEmpty } from "/src/scripts/logics";


/**
 * Terminal banner
 * 
 * @type {Array<String>}
 */
const Banner = [
	"",
	"\x1b\x5b\x31\x3b\x33\x31\x6d\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x7b\x7d",
	"\x1b\x5b\x31\x3b\x33\x31\x6d\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x2e\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x31\x37\x37\x6d\x5e\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x2e\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x2e\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x31\x37\x37\x6d\x5e\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x2e\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x7b\x7d",
	"\x1b\x5b\x31\x3b\x33\x31\x6d\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x31\x37\x37\x6d\x5e\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x3a\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x31\x37\x37\x6d\x5e\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x2e\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x31\x37\x37\x6d\x5e\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x31\x37\x37\x6d\x5e\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x2e\x20\x20\x20\x20\x20\x20\x20\x20\x20\x7b\x7d",
	"\x1b\x5b\x31\x3b\x33\x31\x6d\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x3a\x3a\x3a\x3a\x3a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x34\x32\x6d\x2e\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x31\x37\x37\x6d\x5e\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x34\x32\x6d\x2e\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x34\x38\x6d\x20\x20\x2e\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x31\x37\x37\x6d\x5e\x5e\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x3a\x3a\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x3a\x2e\x20\x20\x20\x20\x20\x20\x20\x20\x20\x7b\x7d",
	"\x1b\x5b\x31\x3b\x33\x31\x6d\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x3a\x3a\x3a\x3a\x3a\x20\x20\x20\x20\x20\x20\x20\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x31\x37\x37\x6d\x5e\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x34\x32\x6d\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x31\x37\x37\x6d\x5e\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x34\x38\x6d\x3a\x3a\x3a\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x31\x37\x37\x6d\x5e\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x3a\x3a\x3a\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x2e\x20\x20\x20\x20\x20\x20\x20\x20\x20\x7b\x7d",
	"\x1b\x5b\x31\x3b\x33\x31\x6d\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x3a\x3a\x3a\x3a\x3a\x20\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x34\x30\x6d\x2e\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x31\x37\x37\x6d\x5e\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x3a\x2e\x20\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x34\x32\x6d\x3a\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x31\x37\x37\x6d\x5e\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x34\x38\x6d\x3a\x3a\x3a\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x31\x37\x37\x6d\x5e\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x3a\x3a\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x2e\x20\x20\x20\x20\x20\x20\x20\x20\x20\x7b\x7d",
	"\x1b\x5b\x31\x3b\x33\x31\x6d\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x31\x37\x37\x6d\x5e\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x3a\x3a\x3a\x3a\x3a\x20\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x34\x30\x6d\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x3a\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x34\x32\x6d\x2e\x3a\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x31\x37\x37\x6d\x5e\x20\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x34\x38\x6d\x3a\x3a\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x31\x37\x37\x6d\x5e\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x3a\x3a\x3a\x2e\x20\x20\x20\x20\x20\x20\x20\x20\x20\x7b\x7d",
	"\x1b\x5b\x31\x3b\x33\x31\x6d\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x31\x37\x37\x6d\x5e\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x35\x30\x6d\x3a\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x31\x37\x37\x6d\x5e\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x3a\x3a\x3a\x20\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x34\x30\x6d\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x3a\x3a\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x34\x32\x6d\x2e\x3a\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x31\x37\x37\x6d\x5e\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x34\x30\x6d\x2e\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x34\x38\x6d\x3a\x3a\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x31\x37\x37\x6d\x5e\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x3a\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x31\x37\x37\x6d\x5e\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x2e\x20\x20\x20\x20\x20\x20\x20\x20\x7b\x7d",
	"\x1b\x5b\x31\x3b\x33\x31\x6d\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x31\x37\x37\x6d\x5e\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x3a\x3a\x3a\x3a\x3a\x20\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x3a\x3a\x3a\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x34\x32\x6d\x2e\x3a\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x31\x37\x37\x6d\x5e\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x34\x30\x6d\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x34\x38\x6d\x3a\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x31\x37\x37\x6d\x5e\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x3a\x3a\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x31\x37\x37\x6d\x5e\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x3a\x3a\x2e\x20\x20\x20\x20\x20\x20\x7b\x7d",
	"\x1b\x5b\x31\x3b\x33\x31\x6d\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x2e\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x31\x37\x37\x6d\x5e\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x3a\x3a\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x31\x37\x37\x6d\x5e\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x3a\x3a\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x34\x30\x6d\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x34\x32\x6d\x2e\x3a\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x31\x37\x37\x6d\x5e\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x34\x30\x6d\x3a\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x34\x38\x6d\x3a\x3a\x20\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x3a\x3a\x3a\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x31\x37\x37\x6d\x5e\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x3a\x3a\x3a\x3a\x2e\x20\x20\x20\x20\x7b\x7d",
	"\x1b\x5b\x31\x3b\x33\x31\x6d\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x31\x37\x37\x6d\x5e\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x3a\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x31\x37\x37\x6d\x5e\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x3a\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x34\x30\x6d\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x34\x32\x6d\x2e\x3a\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x31\x37\x37\x6d\x5e\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x34\x30\x6d\x3a\x3a\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x34\x38\x6d\x3a\x20\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x3a\x3a\x3a\x3a\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x31\x37\x37\x6d\x5e\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x3a\x3a\x3a\x2e\x20\x20\x20\x20\x7b\x7d",
	"\x1b\x5b\x31\x3b\x33\x31\x6d\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x31\x37\x37\x6d\x5e\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x3a\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x31\x37\x37\x6d\x5e\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x34\x30\x6d\x3a\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x34\x32\x6d\x2e\x3a\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x31\x37\x37\x6d\x5e\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x34\x30\x6d\x3a\x3a\x3a\x3a\x3a\x20\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x3a\x3a\x3a\x3a\x3a\x2e\x20\x20\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x2e\x20\x20\x20\x20\x20\x20\x7b\x7d",
	"\x1b\x5b\x31\x3b\x33\x31\x6d\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x31\x37\x37\x6d\x5e\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x3a\x3a\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x31\x37\x37\x6d\x5e\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x34\x30\x6d\x3a\x3a\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x34\x32\x6d\x2e\x3a\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x31\x37\x37\x6d\x5e\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x34\x38\x6d\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x34\x30\x6d\x3a\x3a\x3a\x3a\x20\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x3a\x3a\x3a\x3a\x3a\x2e\x20\x20\x20\x20\x20\x20\x20\x20\x20\x7b\x7d",
	"\x1b\x5b\x31\x3b\x33\x31\x6d\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x2e\x3a\x3a\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x3a\x3a\x3a\x20\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x34\x30\x6d\x3a\x3a\x3a\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x34\x32\x6d\x2e\x3a\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x31\x37\x37\x6d\x5e\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x34\x38\x6d\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x34\x30\x6d\x3a\x3a\x3a\x20\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x3a\x3a\x3a\x3a\x2e\x20\x20\x20\x20\x20\x20\x20\x20\x20\x7b\x7d",
	"\x1b\x5b\x31\x3b\x33\x31\x6d\x20\x20\x20\x20\x20\x20\x20\x20\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x2e\x3a\x3a\x3a\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x3a\x3a\x3a\x3a\x20\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x34\x30\x6d\x3a\x3a\x3a\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x34\x32\x6d\x2e\x3a\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x31\x37\x37\x6d\x5e\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x34\x38\x6d\x3a\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x34\x30\x6d\x3a\x3a\x20\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x3a\x3a\x3a\x2e\x20\x20\x20\x20\x20\x20\x20\x20\x20\x7b\x7d",
	"\x1b\x5b\x31\x3b\x33\x31\x6d\x20\x20\x20\x20\x20\x20\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x2e\x3a\x3a\x3a\x3a\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x3a\x3a\x3a\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x31\x37\x37\x6d\x5e\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x34\x30\x6d\x3a\x3a\x3a\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x34\x32\x6d\x2e\x3a\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x31\x37\x37\x6d\x5e\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x34\x38\x6d\x3a\x3a\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x34\x30\x6d\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x31\x37\x37\x6d\x5e\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x34\x30\x6d\x3a\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x3a\x3a\x2e\x20\x20\x20\x20\x20\x20\x20\x20\x20\x7b\x7d",
	"\x1b\x5b\x31\x3b\x33\x31\x6d\x20\x20\x20\x20\x20\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x31\x37\x37\x6d\x5e\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x3a\x3a\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x31\x37\x37\x6d\x5e\x20\x20\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x3a\x3a\x3a\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x31\x37\x37\x6d\x5e\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x34\x30\x6d\x3a\x3a\x3a\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x34\x32\x6d\x2e\x3a\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x31\x37\x37\x6d\x5e\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x34\x38\x6d\x2e\x3a\x3a\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x31\x37\x37\x6d\x5e\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x34\x30\x6d\x3a\x3a\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x3a\x2e\x20\x20\x20\x20\x20\x20\x20\x20\x20\x7b\x7d",
	"\x1b\x5b\x31\x3b\x33\x31\x6d\x20\x20\x20\x20\x20\x20\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x31\x37\x37\x6d\x5e\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x31\x37\x37\x6d\x5e\x20\x20\x20\x20\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x3a\x3a\x3a\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x31\x37\x37\x6d\x5e\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x34\x30\x6d\x3a\x3a\x3a\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x34\x32\x6d\x2e\x3a\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x31\x37\x37\x6d\x5e\x20\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x31\x37\x37\x6d\x5e\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x34\x38\x6d\x3a\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x31\x37\x37\x6d\x5e\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x34\x30\x6d\x3a\x3a\x3a\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x31\x37\x37\x6d\x5e\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x34\x30\x6d\x2e\x20\x20\x20\x20\x20\x20\x20\x20\x7b\x7d",
	"\x1b\x5b\x31\x3b\x33\x31\x6d\x20\x20\x20\x20\x20\x20\x20\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x31\x37\x37\x6d\x5e\x20\x20\x20\x20\x5e\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x3a\x3a\x3a\x3a\x3a\x20\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x31\x37\x37\x6d\x5e\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x34\x30\x6d\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x31\x37\x37\x6d\x5e\x20\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x34\x32\x6d\x2e\x3a\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x31\x37\x37\x6d\x5e\x20\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x34\x38\x6d\x2e\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x31\x37\x37\x6d\x5e\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x34\x38\x6d\x3a\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x34\x30\x6d\x3a\x3a\x3a\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x31\x37\x37\x6d\x5e\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x34\x30\x6d\x2e\x20\x20\x20\x20\x20\x20\x7b\x7d",
	"\x1b\x5b\x31\x3b\x33\x31\x6d\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x31\x37\x37\x6d\x5e\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x3a\x3a\x3a\x3a\x3a\x20\x20\x20\x20\x20\x20\x20\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x34\x32\x6d\x3a\x3a\x3a\x2e\x20\x20\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x31\x37\x37\x6d\x5e\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x34\x38\x6d\x3a\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x3a\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x34\x30\x6d\x3a\x3a\x3a\x3a\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x31\x37\x37\x6d\x5e\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x34\x30\x6d\x2e\x20\x20\x20\x20\x7b\x7d",
	"\x1b\x5b\x31\x3b\x33\x31\x6d\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x3a\x3a\x3a\x3a\x3a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x34\x38\x6d\x2e\x2e\x20\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x3a\x3a\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x34\x30\x6d\x3a\x3a\x3a\x3a\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x31\x37\x37\x6d\x5e\x20\x20\x20\x20\x20\x20\x7b\x7d",
	"\x1b\x5b\x31\x3b\x33\x31\x6d\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x3a\x3a\x3a\x3a\x3a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x3a\x3a\x3a\x3a\x3a\x2e\x20\x20\x20\x20\x20\x20\x20\x20\x20\x7b\x7d",
	"\x1b\x5b\x31\x3b\x33\x31\x6d\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x3a\x3a\x3a\x3a\x3a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x1b\x5b\x31\x3b\x33\x38\x3b\x35\x3b\x32\x33\x36\x6d\x3a\x3a\x3a\x3a\x3a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x7b\x7d",
	"\x1b\x5b\x31\x3b\x33\x31\x6d\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x7b\x7d",
	""
];

class Alias {
	
	/** @type {String} */
	alias;
	
	/** @type {Boolean} */
	display;
	
	/** @type {String} */
	name;
	
	/** @type {Boolean} */
	overridable;
	
	/**
	 * Construct method of class Alias
	 * 
	 * @param {String} alias
	 * @param {Boolean} display
	 * @param {String} name
	 * @param {Boolean} overridable
	 * 
	 */
	constructor( alias, display, name, overridable=true ) {
		this.alias = alias;
		this.display = display;
		this.name = name;
		this.overridable = overridable;
	}
	
	/**
	 * Returns a string representation of a Alias
	 * 
	 * @returns {String}
	 * 
	 */
	toString() {
		return Fmt( "alias {name}={alias}", this );
	}
	
}

class ANSI {
	
	/** @type {Map<String,Map<Number,String>} */
	colors;
	
	/** @type {Map<Number,String>} */
	formats;
	
	/** @type {Map<String,String>} */
	properties;
	
	/** Construct method of class ANSI */
	constructor() {
		this.colors = Object.assign( new Map(), {
			e0gte30lte37: Object.assign( new Map(), {
				30: "color: var(--shell-c-0-30m)",
				31: "color: var(--shell-c-0-31m)",
				32: "color: var(--shell-c-0-32m)",
				33: "color: var(--shell-c-0-33m)",
				34: "color: var(--shell-c-0-34m)",
				35: "color: var(--shell-c-0-35m)",
				36: "color: var(--shell-c-0-36m)",
				37: "color: var(--shell-c-0-37m)"
			}),
			e1gte30lte37: Object.assign( new Map(), {
				30: "color: var(--shell-c-1-30m)",
				31: "color: var(--shell-c-1-31m)",
				32: "color: var(--shell-c-1-32m)",
				33: "color: var(--shell-c-1-33m)",
				34: "color: var(--shell-c-1-34m)",
				35: "color: var(--shell-c-1-35m)",
				36: "color: var(--shell-c-1-36m)",
				37: "color: var(--shell-c-1-37m)"
			}),
			e0gte40lte47: Object.assign( new Map(), {
				40: "background-color: var(--shell-c-0-30m)",
				41: "background-color: var(--shell-c-0-31m)",
				42: "background-color: var(--shell-c-0-32m)",
				43: "background-color: var(--shell-c-0-33m)",
				44: "background-color: var(--shell-c-0-34m)",
				45: "background-color: var(--shell-c-0-35m)",
				46: "background-color: var(--shell-c-0-36m)",
				47: "background-color: var(--shell-c-0-37m)"
			}),
			e1gte40lte47: Object.assign( new Map(), {
				40: "background-color: var(--shell-c-1-30m)",
				41: "background-color: var(--shell-c-1-31m)",
				42: "background-color: var(--shell-c-1-32m)",
				43: "background-color: var(--shell-c-1-33m)",
				44: "background-color: var(--shell-c-1-34m)",
				45: "background-color: var(--shell-c-1-35m)",
				46: "background-color: var(--shell-c-1-36m)",
				47: "background-color: var(--shell-c-1-37m)"
			})
		});
		this.formats = Object.assign( new Map(), {
			0: "font-weight: normal; font-style: normal; text-decoration: none; text-decoration-line: none; color: var(--shell-c-37m); opacity: 1",
			1: "font-weight: 550",
			2: "opacity: .8",
			3: "font-style: italic",
			4: "text-decoration-line: underline",
			5: "font-weight: 550",
			6: "font-weight: normal; font-style: normal; text-decoration-line: none; color: var(--shell-c-37m); opacity: 1",
			7: "background-color: var(--shell-c-37m); color: var(--shell-c-30m)",
			8: "background-color: var(--shell-c-30m); color: var(--shell-c-30m)",
			9: "text-decoration-line: line-through"
		});
		this.properties = Object.assign( new Map(), {
			e38e5: "color: var(--shell-c-38-{}m)",
			e38e7: "background-color: var(--shell-c-38-{}m)"
		});
	}
	
	/**
	 * Automatic colorize text, number, and symbols in the string
	 * 
	 * @param {String} string
	 * 
	 * @returns {String}
	 * 
	 */
	colorize( string ) {
		var patterns = {
			comment: {
				pattern: "(?<comment>(?:\\/\\/[^\\x0a]*)|(?:\\/\\*.*?\\*\\/))",
				styling: "var(--shell-c-38-240m)"
			},
			number: {
				pattern: "(?<number>\\b(?:\\d+)\\b)",
				styling: "var(--shell-c-38-61m)"
			},
			define: {
				pattern: "(?<define>(?:\\@|\\$)[a-zA-Z_](?:[a-zA-Z0-9_\\-\\.]*[a-zA-Z0-9_]{1})*)",
				styling: "var(--shell-c-38-111m)",
				rematch: [
					"symbol"
				]
			},
			symbol: {
				pattern: "(?<symbol>\\\\|\\:|\\*|\\-|\\+|\\/|\\&|\\%|\\=|\\;|\\,|\\.|\\?|\\!|\\||\\<|\\>|\\~)",
				styling: "var(--shell-c-38-69m)"
			},
			bracket: {
				pattern: "(?<bracket>\\{|\\}|\\[|\\]|\\(|\\))",
				styling: "var(--shell-c-38-214m)"
			},
			boolean: {
				pattern: "(?<boolean>\\b(?:[fF]alse|[tT]rue|[nN]ull|[uU]ndefined)\\b)",
				styling: "var(--shell-c-38-199m)"
			},
			hxari: {
				pattern: "(?<hxari>\\b(?:hx[aA]ri)\\b)",
				styling: "var(--shell-c-38-105m)"
			},
			type: {
				pattern: "(?<type>\\b(?:Array|Date|String|Number|Bigint|Boolean|Undefined|Null|Symbol|Object)\\b)",
				styling: "var(--shell-c-38-213m)"
			},
			version: {
				pattern: "(?<version>\\b[vV][\\d]+(?:[\\d\\.]+[\\d+])*\\b)",
				styling: "var(--shell-c-38-112m)",
				handler: {
					floating: {
						pattern: "(?<floating>[\\d\\.]+)",
						styling: "var(--shell-c-38-190m)"
					}
				}
			},
			string: {
				pattern: "(?<string>(?<!\\\\)(\\\".*?(?<!\\\\)\\\"|\\'.*?(?<!\\\\)\\'|\\`.*?(?<!\\\\)\\`))",
				styling: "var(--shell-c-38-220m)",
				handler: {
					curly: {
						pattern: "(?<curly>(?<!\\\\)\\{(?:(?:[^\\}\\\\]|\\.)*)\\})",
						styling: "var(--shell-c-38-214m)",
						handler: {
							chars: {
								pattern: "(?<chars>[a-zA-Z][a-zA-Z0-9\\_]*)",
								styling: "var(--shell-c-38-11m)",
							},
							define: {
								pattern: "(?<define>\\$[a-zA-Z_][a-zA-Z0-9_]*)",
								styling: "var(--shell-c-38-111m)",
							},
							number: {
								pattern: "(?<number>\\b(?:\\d+)\\b)",
								styling: "var(--shell-c-38-61m)"
							},
							symbol: {
								pattern: "(?<symbol>\\{|\\}|\\[|\\]|\\(|\\)|\\<|\\>|\\-)",
								styling: "var(--shell-c-38-214m)"
							},
							bracket: {
								pattern: "(?<bracket>\\{|\\}|\\[|\\]|\\(|\\))",
								styling: "var(--shell-c-38-214m)"
							},
							mismatch: {
								pattern: "(?<mismatch>.)",
								styling: "var(--shell-c-38-220m)"
							}
						}
					},
					bracket: {
						pattern: "(?<bracket>(?<!\\\\)\\[(?:(?:[^\\]\\\\]|\\.)*)\\])",
						styling: "var(--shell-c-38-214m)",
						handler: {
							chars: {
								pattern: "(?<chars>[a-zA-Z][a-zA-Z0-9\\_]*)",
								styling: "var(--shell-c-38-11m)",
							},
							define: {
								pattern: "(?<define>\\$[a-zA-Z_][a-zA-Z0-9_]*)",
								styling: "var(--shell-c-38-111m)",
							},
							number: {
								pattern: "(?<number>\\b(?:\\d+)\\b)",
								styling: "var(--shell-c-38-61m)"
							},
							symbol: {
								pattern: "(?<symbol>\\{|\\}|\\[|\\]|\\(|\\)|\\<|\\>|\\-)",
								styling: "var(--shell-c-38-214m)"
							},
							mismatch: {
								pattern: "(?<mismatch>.)",
								styling: "var(--shell-c-38-220m)"
							}
						}
					},
					hexadec: {
						pattern: "(?<hexadec>\\\\x[a-fA-F0-9]{2})",
						styling: "var(--shell-c-38-85m)"
					},
					escape: {
						pattern: "(?<escape>\\\\(?:040|40|7|11|011|0113|113|377|81|[aA]|[bB]|cx|[dD]|ddd|e|f|g|[hH]|k|n|[pP]|[rR]|[sS]|t|[vV]|[wW]|xhh|Z))",
						styling: "var(--shell-c-38-208m)"
					},
					define: {
						pattern: "(?<define>\\$[a-zA-Z_][a-zA-Z0-9_]*)",
						styling: "var(--shell-c-38-111m)",
					}
				}
			}
		};
		function handler( match, escape, patterns ) {
			// Check if match has groups.
			if( Typed( match.groups, Object ) ) {
				// Get all group names.
				var groups = Object.keys( match.groups );
				var group = null;
				
				for( let i in groups ) {
					group = groups[i];
					if( Typed( patterns[groups[i]], Object ) &&
						Typed( match.groups[groups[i]], String ) ) {
						// escape = patterns[group].styling;
						break;
					}
				}
				var chars = match.groups[group];
				var color = patterns[group].styling;
				if( Typed( patterns[group].handler, [ Function, "handler", Object ] ) ) {
					if( Typed( patterns[group].handler, Object ) ) {
						var regexps = [];
						for( let i in patterns[group].handler ) {
							if( Typed( patterns[group].handler[i], Window ) ) {
								chars = patterns[group].handler[i].call( chars );
							}
							else {
								regexps.push( patterns[group].handler[i] );
							}
						}
						if( regexps.length >= 1 ) {
							var result = "";
							var reindex = 0;
							var rematch = null;
							var pattern = new RegExp( Fmt( "(?:{})", regexps.map( r => r.pattern ).join( "|" ) ), "gms" );
							while( ( rematch = pattern.exec( chars ) ) !== null ) {
								result+= chars.substring( reindex, pattern.lastIndex - rematch[0].length );
								result+= Fmt( "<span style=\"color: {}\" data-group=\"{}\">{}</span>", color, group, handler( rematch, color, patterns[group].handler ) );
								reindex = pattern.lastIndex;
							}
							chars = result + chars.substring( reindex );
						}
					}
					else {
						chars = patterns[group].handler( chars );
					}
				}
				if( Typed( patterns[group].rematch, Array ) ) {
					var result = "";
					var reindex = 0;
					var rematch = null;
					var pattern = new RegExp( Fmt( "(?:{})", patterns[group].rematch.map( r => patterns[r].pattern ).join( "|" ) ), "gms" );
					while( ( rematch = pattern.exec( chars ) ) !== null ) {
						result+= chars.substring( reindex, pattern.lastIndex - rematch[0].length );
						result+= handler( rematch, color, patterns );
						reindex = pattern.lastIndex;
					}
					chars = result.concat( chars.substring( reindex ) );
				}
				return Fmt( "<span style=\"color: {}\" data-group=\"{}\">{}</span>", color, group, chars );
			}
			return "";
		};
		var index = 0;
		var match = null;
		var result = "";
		var escape = "var(--shell-c-0-37m)";
		var string = Typed( string, String, () => string, () => "" );
		var pattern = new RegExp( Fmt( "(?:{})", Object.values( Mapper( patterns, ( i, k, val ) => val.pattern ) ).join( "|" ) ), "gms" );
		while( ( match = pattern.exec( string ) ) !== null ) {
			result+= string.substring( index, pattern.lastIndex - match[0].length );
			result+= Fmt( "<span style=\"color: {}\" data-group=\"{}\">{}</span>", escape, "captured", handler( match, escape, patterns ) );
			index = pattern.lastIndex;
		}
		return result.concat( string.substring( index ) );
	}
	
	/**
	 * Render ANSI text into html text with replaced ANSI color into HTML tag
	 * 
	 * @param {String} string
	 * 
	 * @returns {String}
	 */
	render( string ) {
		var pattern = /(?<format>\x1b|\\x1b|\\e|((\0|\\0)33))((?:\[|\\\[)(?<code>.*?)(?<type>m)(?<text>[^\n]*))/g;
		var replace = string.replaceAll( /\!\[(bx|bxl|bxs)\]\(([a-zA-Z0-9\-\s]+)\)/g, "<i class=\"bx $1-$2\"></i>" );
		var matches = pattern.exec( replace );
		if( matches !== null ) {
			var escaped = "";
			var styling = this.styles( matches.groups.code );
			if( Typed( matches.groups.text, String ) ) {
				escaped = this.render( matches.groups.text );
			}
			if( styling ) {
				return Fmt( "{}<span class=\"terminal-text text\" style=\"{}\">{}</span>", replace.substring( 0, pattern.lastIndex - matches[0].length ), styling, escaped );
			}
			return replace.substring( 0, pattern.lastIndex - matches[0].length ) + escaped;
		}
		return replace;
	}
	
	/**
	 * Returns CSS style color property
	 * 
	 * @param {String} code
	 * 
	 * @returns {false|String}
	 */
	styles( code ) {
		var pattern = /^(?:\d{1,2}|[01]\d|2[0-4])(;(?:\d|[0-5]\d)(?:;(?:\d{1,3})){0,2})*$/;
		if( pattern.test( code ) ) {
			var codes = code.split( "\x3b" ).map( part => parseInt( part ) );
			var color = null;
			var format = null;
			switch( codes.length ) {
				case 1:
					if( codes[0] >= 0 && codes[0] <= 9 ) {
						format = this.formats[codes[0]];
					}
					else if( codes[0] >= 30 && codes[0] <= 37 ) {
						format = this.colors.e0gte30lte37[codes[0]]
					}
					else if( codes[0] >= 40 && codes[0] <= 47 ) {
						format = this.colors.e0gte40lte47[codes[0]]
					}
					break
				case 2:
					if( codes[0] >= 0 && codes[0] <= 9 ) {
						format = this.formats[codes[0]];
	
						if( codes[1] >= 30 && codes[1] <= 37 ) {
							color = this.colors.e0gte30lte37[codes[1]]
						}
						else if( codes[1] >= 40 && codes[1] <= 47 ) {
							color = this.colors.e0gte40lte47[codes[1]]
						}
					}
					break
				case 3:
					break
				case 4:
					if( codes[0] >= 0 && codes[0] <= 9 ) {
						format = this.formats[codes[0]];
					}
					if( codes[1] === 38 ) {
						if( codes[2] >= 0 && codes[2] <= 7 ) {
							if( codes[2] === 5 ) {
								color = Fmt( this.properties.e38e5, codes[3] );
							}
							else if( codes[2] === 7 ) {
								color = Fmt( this.properties.e38e7, codes[3] );
							}
							else {
								format = this.formats[codes[2]];
								color = Fmt( this.properties.e38e5, codes[3] );
							}
						}
					}
					break
			}
			return color !== null && color !== false &&
				format !== null && format !== false ?
					Fmt( "{}; {}", format, color ) :
					(
						color !== null && color !== false ?
							color :
						(
							format !== null && format !== false ?
							format :
							false
						)
					)
			;
		}
		return false;
	}
	
};

class Group {
	
	/** @type {Number} */
	gid;
	
	/** @type {Set<User>} */
	members;
	
	/** @type {String} */
	username;
	
	/**
	 * Construct method of class Group
	 * 
	 * @param {Number} gid
	 * @param {Array<User>|Set<User>} members
	 * @param {String} username
	 * 
	 */
	constructor( gid, members, username ) {
		this.gid = gid;
		this.members = members;
		if( Typed( members, Array ) ) {
			this.members = new Set( members );
		}
		this.username = username;
	}
	
	/**
	 * Returns a string representation of a Group
	 * 
	 * @returns {String}
	 * 
	 */
	toString() {
		return Fmt( "{}:x:{}:{}", ...[ this.username, this.gid, Array.from( this.members.entries() ).map( member => member[0].username ).join( "\x0a" ) ] );
	}
	
}

class History {
	
	/** @type {?HTMLInputElement|HTMLTextAreaElement} */
	binding;
	
	/** @type {?Number} */
	exit;
	
	/** @type {Stderr} */
	stderr;
	
	/** @type {?String} */
	stdin;
	
	/** @type {Stdout} */
	stdout;
	
	/**
	 * Construct method of class History
	 * 
	 * @param {?HTMLInputElement|HTMLTextAreaElement} binding
	 * @param {?Number} exit
	 * @param {Stderr} stderr
	 * @param {?String} stdin
	 * @param {Stdout} stdout
	 * 
	 */
	constructor( binding, exit, stderr, stdin, stdout ) {
		this.binding = binding;
		this.exit = exit;
		this.stderr = stderr;
		this.stdin = stdin;
		this.stdout = stdout;
	}
	
}

class Kernel {
	
	/** @type {Number} */
	gic; // gid counter
	
	/** @type {Map<Number,Group>} */
	groups;
	
	/** @type {String} */
	hostname;
	
	/** @type {VirtualNodePasswd} */
	passwd;
	
	/** @type {Number} */
	pic; // pid /counter
	
	/** @type {Root} */
	root;
	
	/** @type {Router} */
	router;
	
	/** @type {VirtualNodeShadow} */
	shadow;
	
	/** @type {Map<Number,ProgramMetadata>} */
	table;
	
	/** @type {Number} */
	uic; // uid counter
	
	/** @type {Number} */
	uid;
	
	/** @type {Map<Number,User>} */
	users;
	
	/** @type {VirtualFileSystem} */
	vfs;
	
	/**
	 * Construct method of class Kernel
	 * 
	 * @param {Router} router
	 * 
	 */
	constructor( router ) {
		this.gic = 1000;
		this.groups = new Map();
		this.hostname = window?.location?.host?.split( "\x3a" )[0] ?? "hxari";
		this.pic = 100;
		this.root = new Root();
		this.groups.set( 0, new Group( 0, new Set([ this.root ]), "root" ) );
		this.group = new VirtualNodeGroup( this.groups );
		this.router = router;
		this.table = new Map();
		this.users = new Map();
		this.users.set( this.root.uid, this.root );
		this.passwd = new VirtualNodePasswd( this.users );
		this.shadow = new VirtualNodeShadow( this.users );
		this.uic = 1000;
		this.uid = this.root.uid;
		this.vfs = new VirtualFileSystem( this, this.hostname, this.router );
		this.vfs.mkdir( this.root.home, { mode: 0o700, user: this.root });
		if( this.vfs.isdir( "/etc" ) ) {
			if( this.vfs.isfile( "/etc/group" ) ) {
				var group = this.vfs.read( "/etc/group", { user: this.root } );
				for( let line of group.split( "\x0a" ) ) {
					var parts = line.split( "\x3a" );
					var gid = parseInt( parts[2] );
					this.groups.set( gid, new Group( gid, parts[3].split( "\x2c" ).filter( Boolean ), parts[0] ) );
				}
				this.group.refresh();
			}
			if( this.vfs.isfile( "/etc/passwd" ) ) {
				var passwd = this.vfs.read( "/etc/passwd", { user: this.root } );
				for( let line of passwd.split( "\x0a" ) ) {
					var parts = line.split( "\x3a" );
					console.debug( parts );
					var gid = parseInt( parts[2] );
					var uid = parseInt( parts[3] );
					if( gid !== 0 && uid !== 0 ) {
						this.users.set( uid, new User( {}, parts[4], gid, parts[0], parts[5] || null, null, "user", parts[6], uid, parts[0] ) );
					}
				}
				this.passwd.refresh();
			}
			if( this.vfs.isfile( "/etc/shadow" ) ) {
				var shadow = this.vfs.read( "/etc/shadow", { user: this.root } );
				for( let line of shadow.split( "\x0a" ) ) {
					var parts = line.split( "\x3a" );
					for( let [ _, user ] of this.users.entries() ) {
						if( user.username === parts[0] ) {
							user.password = new Password( parts[0], {
								chipertext: parts[1],
								expired: parts[7] || null,
								inactive: parts[6] || null,
								maximum: parts[4] || 0,
								minimum: parts[3] || 0,
								updated: parts[2] || 19743,
								warning: parts[5] || 7
							});
						}
					}
				}
				this.shadow.refresh();
			}
		}
		else {
			this.vfs.mkdir( "/etc", { mode: 0o755, user: this.root });
		}
		if( this.groups.has( this.groupres( "sudo" ) ) === false ) {
			this.groupadd( "sudo", { user: this.root } );
		}
		this.vfs.walk( "/etc" ).contents.set( "group", this.group );
		this.vfs.walk( "/etc" ).contents.set( "passwd", this.passwd );
		this.vfs.walk( "/etc" ).contents.set( "shadow", this.shadow );
	}
	
	/** 
	 * Returns allocate group id
	 * 
	 * @returns {Number}
	 * 
	 */
	allocateGID() {
		if( this.groups === null || typeof this.groups === "undefined" ) {
			this.groups = new Map();
		}
		while( this.groups.has( this.gic ) ) {
			this.gic++;
		}
		return this.gic;
	}
	
	/** 
	 * Returns allocate program id
	 * 
	 * @returns {Number}
	 * 
	 */
	allocatePID() {
		return ++this.pic;
	}
	
	/** 
	 * Returns allocate user id
	 * 
	 * @returns {Number}
	 * 
	 * @throws {TypeError} Throws whether uid space exhausted
	 * 
	 */
	allocateUID() {
		if( this.users === null || typeof this.users === "undefined" ) {
			this.users = new Map();
		}
		while( this.users.has( this.uic ) ) {
			this.uic++;
			if( this.uic >= 0xFFFF ) {
				throw new TypeError( "uid space exhausted" );
			}
		}
		return this.uic;
	}
	
	/**
	 * ...
	 * 
	 * @param {String} groupname 
	 * @param {Object} options 
	 * @param {?Number} options.gid 
	 * @param {User} [options.user]
	 * 
	 */
	groupadd( groupname, options={} ) {
		if( options.user.root() === false ) {
			throw new TypeError( "operation not permitted: only root can add group" );
		}
		if( /^[a-z_][a-z0-9_-]{0,31}$/.test( groupname ) === false ) {
			throw new TypeError( Fmt( "{}: invalid groupname", groupname ) );
		}
		var gid = options?.gid;
		if( gid && Number.isFinite( gid ) ) {
			if( this.groups.has( gid ) ) {
				throw new TypeError( Fmt( "{}: gid exists", gid ) );
			}
		}
		else {
			gid = this.allocateGID();
		}
		for( let group of this.groups.values() ) {
			if( group.username === groupname ) {
				throw new TypeError( Fmt( "{}: group username exists", groupname ) );
			}
		}
		this.groups.set( gid, new Group( gid, new Set(), groupname ) );
		this.group.refresh();
		this.vfs.persist();
	}
	
	/**
	 * ...
	 * 
	 * @param {String} groupname 
	 * @param {Object} options 
	 * @param {?Boolean} [options.force]
	 * @param {User} [options.user]
	 * 
	 */
	groupdel( groupname, options={} ) {
		options.force = options.force ?? false;
		if( options.user.root() === false ) {
			throw new TypeError( "operation not permitted: only root can delete group" );
		}
		for( let [ gid, group ] of this.groups.entries() ) {
			if( group.username === groupname ) {
				var procs = Array.from( this.table.values() ).filter( table => group.members.has( table.user ) );
				if( procs.length >= 1 ) {
					if( options.force ) {
						for( let process of procs ) {
							this.kill( process.pid, { user: options.user } );
						}
					}
					else {
						throw new TypeError( Fmt( "{}: group has running process", groupname ) );
					}
				}
				this.groups.delete( gid );
				this.group.refresh();
				this.vfs.persist();
				return;
			}
		}
		throw new TypeError( Fmt( "{}: group not found", groupname ) );
	}
	
	/**
	 * ...
	 * 
	 * @param {String} groupname 
	 * @param {Object} options 
	 * @param {?Number} [options.gid]
	 * @param {?String} [options.member]
	 * @param {?String} [options.memberadd]
	 * @param {?String} [options.username]
	 * @param {User} [options.user]
	 * 
	 */
	groupmod( groupname, options={} ) {
		if( options.user.root() === false ) {
			throw new TypeError( "operation not permitted: only root can modify group" );
		}
		this.group.refresh();
		this.vfs.persist();
	}
	
	/**
	 * Return groupid by groupname
	 * 
	 * @param {String} groupname 
	 * 
	 * @returns {?Number}
	 * 
	 */
	groupres( groupname ) {
		for( let [ gid, group ] of this.groups.entries() ) {
			if( group.username === groupname ) {
				return gid;
			}
		}
	}
	
	/**
	 * Kill specific program by process id
	 * 
	 * @param {Number} pid
	 * @param {Object} options
	 * @param {User} [options.user]
	 * 
	 * @returns {void}
	 * 
	 * @throws {TypeError} Throws whether permission denied or pid not found
	 * 
	 */
	kill( pid, options={} ) {
		if( this.table.has( pid ) ) {
			var process = this.table.get( pid );
			if( process.user.uid !== options.user.uid && options.user.root() === false ) {
				throw TypeError( "{}: unallowed kill process", pid );
			}
			process.exit = 1;
			process.state = "killed";
			return;
		}
		throw TypeError( "{}: no such process id", pid );
	}
	
	/**
	 * Returns list of program metadata in the table
	 * 
	 * @returns {Array<ProgramMetadata>}
	 * 
	 */
	list() {
		return Object.values( this.table ).map( element => Object.assign( new Map(), element ) );
	}
	
	/**
	 * Register program into table before execute
	 * 
	 * @param {ProgramMetadata} metadata
	 * 
	 * @returns {Number}
	 * 
	 */
	register( metadata ) {
		const pid = this.allocatePID();
		this.table.set( pid, metadata );
		this.table.get( pid ).pid;
		return pid;
	}
	
	/**
	 * Spawn new program
	 * 
	 * @param {Function} program
	 * @param {Array<String>} args
	 * @param {Object} options
	 * @param {Stderr} [options.stderr]
	 * @param {Stdin} [options.stdin]
	 * @param {Stdout} [options.stdout]
	 * @param {User} user
	 * 
	 * @returns {History}
	 * 
	 */
	spawn( program, args=[], options={}, user ) {
		const stdin = options.stdin || new Stdin();
		const stderr = options.stderr || new Stderr();
		const stdout = options.stdout || new Stdout();
		const history = new History( null, null, stderr, stdin, stdout );
		const datetime = new UnixTime();
		const metadata = new ProgramMetadata( args, program.name, options, null, datetime, "running" );
		const pid = this.register( metadata );
		if( metadata.pid !== pid ) {
			metadata.pid = pid;
		}
		try {
			const context = Object.assign( new Map(), options.env || {}, { kernel: this, shell: options.shell || null, stderr, stdin, stdout });
			const created = program.bind( context );
			const execute = created( ...args );
			history.exit = execute;
		}
		catch( e ) {
			history.exit = 1;
			stderr.write( e );
		}
		this.unregister( pid, history.exit );
		return history;
	}
	
	/**
	 * Switch or change user previlege by username
	 * 
	 * @param {String} username
	 * 
	 * @returns {void}
	 * 
	 * @throws {TypeError} Thrown whether user not found
	 */
	switch( username ) {
		for( const user of this.users.values() ) {
			console.debug( user )
			if( user.username.match( username ) ) {
				this.uid = user.uid;
				this.vfs.cwd = user.home;
				return;
			}
		}
		throw new TypeError( Fmt( "user {} does not exist or the user entry does not contain all the required fields", username ) );
	}
	
	/**
	 * Unregister spawned program
	 * 
	 * @param {Number} pid
	 * @param {Number} exit
	 * 
	 * @returns {void}
	 * 
	 * @throws {TypeError} Throws whether unregistered pid passed
	 * 
	 */
	unregister( pid, exit ) {
		if( this.table.has( pid ) ) {
			const meta = this.table.get( pid );
			meta.exit = exit;
			meta.state = "exit";
			meta.end = new UnixTime();
			return;
		}
		throw TypeError( "{}: failed to unregister with unregistered pid", pid );
	}
	
	/**
	 * Return current user previlege
	 * 
	 * @returns {User}
	 * 
	 */
	user() {
		console.debug( this.uid );
		return this.users.get( this.uid );
	}
	
	/**
	 * 
	 * @param {String} username
	 * @param {Object} options
	 * @param {?String} [options.fullname]
	 * @param {?String} [options.home]
	 * @param {?Number} [options.gid]
	 * @param {?Password|String} [options.password]
	 * @param {?String} [options.shell]
	 * @param {?Number} [options.uid]
	 * @param {User} [options.user]
	 * 
	 * @throws {TypeError}
	 *  Throws whether permission denied, username exists, user id exists, homedir exists
	 * 
	 */
	useradd( username, options={} ) {
		if( options.user.root() === false ) {
			throw new TypeError( "operation not permitted: only root can add user" );
		}
		username = new String( username || "" ).trim();
		if( /^[a-z_][a-z0-9_-]{0,31}$/.test( username ) === false ) {
			throw new TypeError( Fmt( "{}: invalid username", username ) );
		}
		for( let entry of this.users.entries() ) {
			if( entry[1].username === username ) {
				throw new TypeError( Fmt( "{}: username exists", username ) );
			}
		}
		var gid = options?.gid;
		if( gid && Number.isFinite( gid ) ) {
		}
		else {
			gid = this.allocateGID();
		}
		var uid = options?.uid;
		if( uid && Number.isFinite( uid ) ) {
			if( this.users.has( uid ) ) {
				throw new TypeError( Fmt( "{}: user id exists", uid ) );
			}
		}
		else {
			uid = this.allocateUID();
		}
		var name = options?.fullname || username;
		var home = options?.home;
		var passw = options?.password;
		var shell = options?.shell;
		var user = new User( new Map(), name, gid, username, home, passw, "user", shell, uid, username );
		if( this.groups.has( gid ) ) {
			this.groups.get( gid ).members.add( user );
		}
		else {
			this.groups.set( gid, new Group( gid, [ user ], username ) );
		}
		this.users.set( uid, user );
		if( home ) {
			if( this.vfs.exists( home ) ) {
				this.userdel( username );
				throw new TypeError( Fmt( "{}: home directory exists", home ) );
			}
			this.vfs.mkdir( home, { mode: 0o755, user: options.user } );
			this.vfs.chgrp( home, { group: user, recursive: true, user: options.user } );
			this.vfs.chown( home, { owner: user, recursive: true, user: options.user } );
			var maps = new Map([
				[ 
					"/.bashrc", {
						contents: "#!/usr/bin/env bash\n\nif [[ -f /home/${USER}/.bash_aliases ]]; then source /home/${USER}/.bash_aliases; fi", 
						type: "file" 
					} 
				],
				[ "/.bash_aliases", { contents: "#!/usr/bin/env bash\n", type: "file" } ],
				[ "/.bash_history", { contents: "", type: "file" } ],
				[ "/Desktop", { type: "path" } ],
				[ "/Documents", { type: "path" } ],
				[ "/Download", { type: "path" } ],
				[ "/Music", { type: "path" } ],
				[ "/Pictures", { type: "path" } ],
				[ "/Trash", { type: "path" } ],
				[ "/Videos", { type: "path" } ],
			]);
			for( let entry of maps ) {
				switch( entry[1].type ) {
					case "file":
					case "link":
						this.vfs.write( home.concat( entry[0] ), { user: user, contents: entry[1]?.contents } );
						break;
					case "path":
						this.vfs.mkdir( home.concat( entry[0] ), { user: user } );
						break;
				}
			}
		}
		this.group.refresh();
		this.passwd.refresh();
		this.shadow.refresh();
		this.vfs.persist();
	}
	
	/**
	 * Delete user account
	 * 
	 * @param {String} username
	 * @param {Object} options
	 * @param {?Boolean} [options.force]
	 * @param {?Boolean} [options.home]
	 * @param {User} [options.user]
	 * 
	 * @throws {TypeError} 
	 *  Throws whether permission denied, user not found or
	 *  whether user has running process and delete without force deletion
	 * 
	 */
	userdel( username, options={} ) {
		options.force = options.force ?? false;
		if( options.user.root() === false ) {
			throw new TypeError( "operation not permitted: only root can delete user" );
		}
		var users = Array.from( this.users.values() ).filter( user => user.username === username );
		if( users.length <= 0 ) {
			throw new TypeError( Fmt( "{}: user not found", username ) );
		}
		var procs = Array.from( this.table.values() ).filter( table => table.state === "running" && table.user.username === username );
		if( procs >= 1 ) {
			if( options.force === false ) {
				throw new TypeError( Fmt( "{}: user has running process", username ) );
			}
			for( let process of procs ) {
				this.kill( process.pid, { user: options.user } );
			}
		}
		for( let group of this.groups.values() ) {
			if( group.members.has( users[0] ) ) {
				group.members.delete( users[0] );
			}
		}
		if( users[0].home && options?.home ) {
			this.vfs.remove( users[0].home );
		}
		this.users.delete( users[0].uid );
		this.group.refresh();
		this.passwd.refresh();
		this.shadow.refresh();
		this.vfs.persist();
	}
	
	/**
	 * Modify user account
	 * 
	 * @param {String} username
	 * @param {Object} options
	 * @param {?String} [options.fullname]
	 * @param {?Number} [options.gid]
	 * @param {?String} [options.group]
	 * @param {?String} [options.groupadd]
	 * @param {?String} [options.home]
	 * @param {?Password} [options.password]
	 * @param {?String} [options.privilege]
	 * @param {?String} [options.shell]
	 * @param {?Number} [options.uid]
	 * @param {?String} [options.username]
	 * @param {User} [options.user]
	 * 
	 * @throws {TypeError}
	 *  Throws whether permission denied, group not found, 
	 *  user not found, uid exists, home directory exists.
	 * 
	 */
	usermod( username, options={} ) {
		if( options.user.root() === false ) {
			throw new TypeError( "operation not permitted: only root can modify user" );
		}
		if(
			( options.fullname === null || typeof options.fullname === "undefined" ) &&
			( options.gid === null || typeof options.gid === "undefined" ) &&
			( options.group === null || typeof options.group === "undefined" ) &&
			( options.groupadd === null || typeof options.groupadd === "undefined" ) &&
			( options.home === null || typeof options.home === "undefined" ) &&
			( options.password === null || typeof options.password === "undefined" ) &&
			( options.privilege === null || typeof options.privilege === "undefined" ) &&
			( options.shell === null || typeof options.shell === "undefined" ) &&
			( options.uid === null || typeof options.uid === "undefined" ) &&
			( options.username === null || typeof options.username === "undefined" ) ) {
			throw new TypeError( Fmt( "{}: nothing changed", username ) );
		}
		var users = Array.from( this.users.values() ).filter( user => user.username === username );
		if( users.length <= 0 ) {
			throw new TypeError( Fmt( "{}: user not found", username ) );
		}
		var user = users.pop();
		if( options?.fullname ) {
			user.fullname = options.fullname;
		}
		if( options?.gid ) {
			user.gid = options.gid; // some file or directory with old gid keep not change
		}
		if( options?.group ) {
			for( let group of this.groups.values() ) {
				if( group.members.has( user ) ) {
					group.members.delete( user );
				}
			}
			options.groupadd = options.group;
		}
		if( options?.groupadd ) {
			var groups = Array.from( this.groups.values() ).filter( group => group.username === options.groupadd );
			if( groups <= 0 ) {
				throw new TypeError( Fmt( "{}: {}: group not found", username, options.groupadd ) );
			}
			groups[0].members.add( user );
		}
		if( options?.password ) {
			if( Typed( options.password, String ) ) {
				options.password = new Password( username, {
					chipertext: options.password,
					expired: user.expired,    // unhandled at this time!
					inactive: user.inactive,  // unhandled at this time!
					maximum: user.maximum,    // unhandled at this time!
					minimum: user.minimum,    // unhandled at this time!
					updated: user.updated,    // unhandled at this time!
					warning: user.warning     // unhandled at this time!
				});
			}
			user.password = options.password;
		}
		if( options?.privilege ) {
			user.privilege = options.privilege;
		}
		if( options?.shell ) {
			user.shell = options.shell;
		}
		if( options?.uid ) {
			if( this.users.has( options.uid ) ) {
				throw new TypeError( Fmt( "{}: {}: uid exists", username, uid ) );
			}
			user.uid = options.uid;
			this.users.delete( user.uid );
			this.users.set( options.uid, user );
		}
		if( options?.username ) {
			user.username = options.username;
		}
		if( options?.home ) {
			if( this.vfs.isdir( options.home ) ) {
				throw new TypeError( Fmt( "{}: {}: home directory exists", username, options.home ) );
			}
			this.vfs.mkdir( options.home, { mode: 0o755, user: this.root } );
			this.vfs.chgrp( options.home, { group: user.gid, recursive: true, user: this.root } );
			this.vfs.chown( options.home, { owner: user.uid, recursive: true, user: this.root } );
		}
		this.group.refresh();
		this.passwd.refresh();
		this.shadow.refresh();
		this.vfs.persist();
	}
	
}

/**
 * 
 * Pure JavaScript lexer intended to approximate GNU Bash lexical rules.
 *
 * Token types:
 * - WORD (unquoted word or combined pieces)
 * - STRING_SINGLE, STRING_DOUBLE, STRING_ANSI, STRING_LOCALE ($"")
 * - OP (control/operator like && || ; | & etc.)
 * - REDIR (>, <, >>, <<, >&, <&, <> , >&N, etc.)
 * - HEREDOC_START (the << token + delimiter metadata)
 * - HEREDOC_BODY
 * - SUBSHELL (value is inner source, e.g. $(...))
 * - BACKTICK (inline `...`)
 * - PARAM ( ${...} )
 * - VARIABLE ( $NAME )
 * - ARITH ( $(( ... )) )
 * - PROCESS_SUB ( <(...) or >(...) content inside parentheses )
 * - COMMENT
 * - NEWLINE
 * - EOF
 *
 * @example
 * >>> const lexer = new Lexer( "echo \"Hello $USER\" <<'EOF'\\nline\\nEOF" );
 * >>> const tokenized = lexer.tokenize();
 * >>> console.debug( JSON.stringify( tokenized, null, 4 ) );
 */
class Lexer {
	
	/** @type {Number} */
	column;
	
	/** @type {Boolean} */
	currentFirstWordPending;
	
	/** @type {Boolean} */
	historyExpansion;
	
	/** @type {String} */
	input;
	
	/** @type {Number} */
	length;
	
	/** @type {Number} */
	line;
	
	/** @type {Number} */
	position;
	
	/** @type {Set<String>} */
	reservedWords;
	
	/** @type {Array<Token>} */
	tokens;
	
	/**
	 * Construct method of class Lexer
	 * 
	 * @param {Boolean} historyExpansion
	 * 
	 */
	constructor( input, historyExpansion ) {
		this.column = 1;
		this.currentFirstWordPending = true
		this.historyExpansion = historyExpansion; // whether to process '!' expansions (lexer just marks)
		this.input = input;
		this.length = input.length;
		this.line = 1;
		this.position = 0;
		this.reservedWords = new Set([
			"case",
			"coproc",
			"do",
			"done",
			"elif",
			"else",
			"esac",
			"fi",
			"for",
			"function",
			"if",
			"in",
			"select",
			"then",
			"time",
			"until",
			"while"
		]);
		this.tokens = [];
	}
	
	/** Advance cursor column and position */
	advance() {
		this.position++;
		this.column++;
	}
	
	/**
	 * Consume current character
	 * 
	 * @returns {?String}
	 * 
	 */
	consume() {
		const ch = this.peek();
		this.position++;
		this.column++;
		return ch;
	}
	
	/**
	 * Returns error message from lexer
	 * 
	 * @param {String} message
	 * 
	 * @returns {SyntaxError}
	 * 
	 */
	error( message ) {
		return new SyntaxError( Fmt( "${} at line ${}, col ${}", message, this.line, this.column ) );
	}
	
	/**
	 * Returns whether operator is dommand delimiter
	 * 
	 * @param {String} operator
	 * 
	 * @returns {Boolean}
	 * 
	 */
	isCommandDelimiter( operator ) {
		var delimiters = new Set([
			";",
			"&",
			"&&",
			"||",
			"|",
			"\n"
		]);
		return delimiters.has( operator );
	}
	
	/**
	 * Returns whether comment is valid
	 * 
	 * @returns {Boolean}
	 * 
	 */
	isCommentValid() {
		// valid if at start, after whitespace/newline, or last non-space token is operator/redirection
		if( this.position === 0 ) {
			return true;
		}
		var prevChar = this.input[this.position - 1];
		if( prevChar === "\n" || this.isWhitespace( prevChar ) ) {
			return true;
		}
		var lastTok = this.lastNonSpaceToken();
		if( lastTok === null ) {
			return true;
		}
		// check grouped categories rather than legacy string names
		if( lastTok.grouped === TokenGroup.OPERATOR ||
			lastTok.grouped === TokenGroup.REDIRECTION ) {
			return true;
		}
		return false;
	}
	
	/**
	 * Returns whether character is start operator
	 * 
	 * @param {String} char
	 * 
	 * @returns {Boolean}
	 * 
	 */
	isOperatorStart( char ) {
		var operators = new Set([
			"|",
			"&",
			";",
			"<",
			">",
			"(",
			")"
		]);
		return operators.has( char );
	}
	
	/**
	 * Returns whether character is whitespace
	 * 
	 * @param {String} char
	 * 
	 * @returns {Boolean}
	 * 
	 */
	isWhitespace( char ) {
		var whitespaces = new Set([
			"\x20",
			"\t",
			"\r",
			"\v",
			"\f"
		]);
		return whitespaces.has( char );
	}
	
	/**
	 * Returns whether token is piece word token
	 * 
	 * @param {Token} token
	 * 
	 * @returns {Boolean}
	 * 
	 */
	isWordPieceToken( token ) {
		const allowed = new Set([
			TokenType.ANSI_C_QUOTED,
			TokenType.ARITHMETIC_EXPANSION,
			TokenType.BACKTICK,
			TokenType.COMMAND_SUBSTITUTION,
			TokenType.COMPOSITE,
			TokenType.DOUBLE_QUOTED,
			TokenType.LOCALE_QUOTED,
			TokenType.PARAM_EXPANSION,
			TokenType.PROCESS_SUBSTITUTION,
			TokenType.SINGLE_QUOTED,
			TokenType.VARIABLE_EXPANSION,
			TokenType.WORD_PIECE,
		]);
		return allowed.has( token?.typed );
	}
	
	/**
	 * Returns last non-space token
	 * 
	 * @returns {?Token}
	 * 
	 */
	lastNonSpaceToken() {
		for( let i=this.tokens.length-1; i>=0; i-- ) {
			var token = this.tokens[i];
			if( token && token.typed !== TokenType.WHITESPACE ) {
				return token;
			}
		}
		return null;
	}
	
	/**
	 * Returns merged tokens
	 * 
	 * @param {Array<Token>} tokens
	 * 
	 * @returns {Array<Token>}
	 * 
	 */
	mergeWordPieces( tokens ) {
		const results = [];
		let i = 0;
		while( i<tokens.length ) {
			const token = tokens[i];
			if( this.isWordPieceToken( token ) ) {
				var position = 0;
				const pieces = [];
				while( i<tokens.length && this.isWordPieceToken( tokens[i] ) ) {
					var piece = tokens[i++];
					if( piece.typed === TokenType.COMPOSITE ) {
						for( const element of piece.pieces ) {
							pieces.push( element );
						}
						continue;
					}
					pieces.push( piece );
				}
				if( pieces.length >= 1 ) {
					position = pieces[0].position;
				}
				const flatten = pieces.map( piece => {
					switch( piece.typed ) {
						case TokenType.WORD_PIECE:
						case TokenType.SINGLE_QUOTED:
						case TokenType.DOUBLE_QUOTED:
						case TokenType.ANSI_C_QUOTED:
						case TokenType.LOCALE_QUOTED:
							return piece.lexeme;
						case TokenType.VARIABLE_EXPANSION:
							return Fmt( "${}", piece.lexeme );
						case TokenType.PARAM_EXPANSION:
							return Fmt( "$\\{{}\\}", piece.lexeme )
						case TokenType.COMMAND_SUBSTITUTION:
							return Fmt( "$({})", piece.lexeme );
						case TokenType.BACKTICK:
							return Fmt( "$`{}`", piece.lexeme );
						case TokenType.ARITHMETIC_EXPANSION:
							return Fmt( "$(({}))", piece.lexeme );
						case TokenType.PROCESS_SUBSTITUTION:
							if( piece.sign.lexeme === ">" ) {
								return Fmt( ">({})", piece.lexeme );
							}
							return "<(";
						default:
							return piece.lexeme || "";
					}
				});
				const raw = flatten.join( "" );
				const structured = pieces;
				const firstWordCandidate = raw.split( /\s+/ )[0];
				const wordToken = new Token(TokenGroup.WORD, raw, structured, position, TokenType.WORD);
				if( this.currentFirstWordPending && this.reservedWords.has( firstWordCandidate ) ) {
					this.currentFirstWordPending = false;
					wordToken.reserved = true;
				}
				else {
					this.currentFirstWordPending = false;
				}
				results.push( wordToken );
				continue;
			}
			results.push( token );
			i++;
		}
		
		// detect heredoc starts and extract bodies
		return this.processHeredocs( results );
	}
	
	/**
	 * Return token type by operator character given
	 * 
	 * @param {String} character
	 * 
	 * @returns
	 */
	operatorTokenType( character ) {
		switch( character ) {
			case "(":
				return TokenType.LEFT_PAREN;
			case ")":
				return TokenType.RIGHT_PAREN;
			case ">":
				return TokenType.REDIR_OUT;
			case "<":
				return TokenType.REDIR_IN;
			case "|":
				return TokenType.PIPE;
		}
		return TokenType.UNKNOWN;
	}
	
	/**
	 * Peek current character
	 * 
	 * @returns {?String}
	 * 
	 */
	peek() {
		if( this.position >= this.length ) {
			return null;
		}
		return this.input[this.position];
	}
	
	/**
	 * Peek ahead character
	 * 
	 * @param {Number} n
	 * 
	 * @returns {?String}
	 */
	peekAhead( n ) {
		var position = this.position + n;
		if( position >= this.length ) {
			return null;
		}
		return this.input[position];
	}
	
	/**
	 * Process heredocs tokens.
	 * 
	 * @param {Array<Token>} tokens
	 * 
	 * @returns {Array<Token>}
	 * 
	 */
	processHeredocs( tokens ) {
		const results = [];
		for( let i=0; i<tokens.length; i++ ) {
			var token = tokens[i];
			if( token.typed === TokenType.REDIR_HEREDOC ||
				token.typed === TokenType.REDIR_HEREDOC_STRIP ) {
				let j = i+1;
				while( j<tokens.length && tokens[j].typed === TokenType.COMMENT ) j++;
				if( j <= tokens.length ) {
					if( tokens[j].typed !== TokenType.WORD ) {
						results.push( token );
						continue;
					}
					var pieces = [];
					// var quoted = tokens[j].pieces.some( part =>
					// 	part.typed === TokenType.SINGLE_QUOTED ||
					// 	part.typed === TokenType.DOUBLE_QUOTED ||
					// 	part.typed === TokenType.ANSI_C_QUOTED ||
					// 	part.typed === TokenType.LOCALE_QUOTED
					// );
					// var position = tokens[j].position;
					var tokenDelimiterEnd = null;
					var tokenDelimiterStart = tokens[j];
					let u = j+1;
					for( u; u<tokens.length; u++ ) {
						if( tokens[u].typed === TokenType.NEWLINE &&
							tokens[u+1]?.typed === TokenType.WORD &&
							tokens[u+1]?.pieces[0].lexeme === tokenDelimiterStart.pieces[0].lexeme ) {
							tokenDelimiterEnd = tokens[u+1];
							break;
						}
						pieces.push( tokens[u] );
					}
					var lexeme = pieces.map( piece => piece.lexeme ).join( "" );
					if( tokenDelimiterEnd !== null ) {
						results.push( new Token( TokenGroup.HEREDOC, token.lexeme, token.pieces, token.position, TokenType.HEREDOC_START ) );
						results.push( new Token( TokenGroup.HEREDOC, tokenDelimiterStart.lexeme, tokenDelimiterStart.pieces, tokenDelimiterStart.position, TokenType.HEREDOC_DELIM ) );
						results.push( new Token( TokenGroup.HEREDOC, lexeme, pieces, pieces[0]?.position, TokenType.HEREDOC_BODY ) );
						results.push( new Token( TokenGroup.HEREDOC, tokenDelimiterEnd.lexeme, tokenDelimiterEnd.pieces, tokenDelimiterEnd.position, TokenType.HEREDOC_END ) );
					}
					else {
						console.debug( JSON.stringify( tokens, null, 4 ) );
						throw new SyntaxError( "Unterminated heredoc string" );
					}
					i = u+1;
					continue;
				}
			}
			results.push( token );
		}
		return results;
	}
	
	/**
	 * Push token
	 * 
	 * @param {Token} token
	 * 
	 */
	push( token ) {
		// keep as-is; debug logging removed to focus pada fungsional
		this.tokens.push( token );
	}
	
	/**
	 * Push word piece tokens
	 * 
	 * @param {Token} piece
	 * 
	 */
	pushWordPiece( piece ) {
		this.push( piece );
		this.currentFirstWordPending = false;
	}
	
	/**
	 * Tokenize syntax
	 * 
	 * @returns {Array<Token>}
	 */
	tokenize() {
		while (true) {
			let position = this.position;
			const ch = this.peek();
			if (ch === null || ch === "\0") {
				this.push(new Token(TokenGroup.MISC, "\0", [], position, TokenType.EOF));
				if( ch === null ) {
					break;
				}
			}

			// newline handling
			if (ch === '\n') {
				this.consume();
				this.push(new Token(TokenGroup.WHITESPACE, "\n", [], position, TokenType.NEWLINE));
				this.currentFirstWordPending = true;
				this.line++;
				this.column = 1;
				continue;
			}

			// skip whitespace (non-newline)
			if (this.isWhitespace(ch)) {
				this.consume();
				continue;
			}

			// comment
			if (ch === '#' && this.isCommentValid()) {
				this.tokenizeComment();
				this.currentFirstWordPending = true;
				continue;
			}

			// operators / redirections / control operators
			if (this.isOperatorStart(ch)) {
				if ((ch === '<' || ch === '>') && this.peekAhead(1) === '(') {
					// process substitution as a word piece
					const proc = this.tokenizeProcessSubstitution();
					this.pushWordPiece(proc);
					continue;
				}
				const opTok = this.tokenizeOperatorOrRedir();
				this.push(opTok);
				// if operator is delimiter, next word is first word
				if (this.isCommandDelimiter(opTok.lexeme)) {
					this.currentFirstWordPending = true;
				}
				continue;
			}

			// line continuation backslash-newline
			if (ch === '\\' && this.peekAhead(1) === '\n') {
				this.consume(); // '\'
				this.consume(); // '\n'
				this.line++;
				this.column = 1;
				continue;
			}

			// quoted token starts (including $' and $" and subshell-start $( not arithmetic)
			if (
				ch === "'" || ch === '"' ||
				(ch === '$' && this.peekAhead(1) === "'") ||
				(ch === '$' && this.peekAhead(1) === '"') ||
				(ch === '$' && this.peekAhead(1) === '(' && this.peekAhead(2) !== '(')
			) {
				const piece = this.tokenizeQuotedOrDollarQuote();
				this.pushWordPiece(piece);
				continue;
			}

			// substitution/variable/arithmetic/backtick
			if (ch === '$' || ch === '`') {
				const piece = this.tokenizeDollarOrBacktick();
				this.pushWordPiece(piece);
				continue;
			}

			// redundant check for process substitution start (kept parity with original)
			if ((ch === '<' || ch === '>') && this.peekAhead(1) === '(') {
				const proc = this.tokenizeProcessSubstitution();
				this.pushWordPiece(proc);
				continue;
			}

			// here-string <<< special case
			if (ch === '<' && this.peekAhead(1) === '<' && this.peekAhead(2) === '<') {
				const t = this.tokenizeOperatorOrRedir(); // will capture '<<<'
				this.push(t);
				this.currentFirstWordPending = false;
				continue;
			}

			// default: word piece
			const wordPiece = this.tokenizeWordPiece();
			this.pushWordPiece(wordPiece);
		}

		// merge pieces into WORD tokens, process heredocs
		return this.mergeWordPieces(this.tokens);
	}
	
	/**
	 * Tokenize ANSI C Escape
	 * 
	 * @returns {String}
	 * 
	 */
	tokenizeAnsiCEscape() {
		const char = this.consume();
		if( char === "n" ) {
			return "\n";
		}
		if( char === "t" ) {
			return "\t";
		}
		if( char === "r" ) {
			return "\r";
		}
		if( char === "0" ) {
			let digs = "";
			for( let i=0; i<2 && /[0-7]/.test( this.peek() ); i++ ) {
				digs+= this.consume();
			}
			return String.fromCharCode( parseInt( digs, 8 ) || 0 );
		}
		if( char === "x" ) {
			let hex = "";
			for( let i=0; i<2 && /[0-9A-Fa-f]/.test( this.peek() ); i++ ) {
				hex+= this.consume();
			}
			return String.fromCharCode( parseInt( hex || "0", 16 ) );
		}
		return char;
	}
	
	/**
	 * Tokenize ANSI C Quoted
	 * 
	 * @returns {Token}
	 * 
	 * @throws {SyntaxError} Throws whether quote is unterminated
	 * 
	 */
	tokenizeAnsiCQuoted() {
		// $'...'
		let position = this.position;
		let values = '';
		this.advance(); // $
		this.advance(); // '
		while( true ) {
			const char = this.peek();
			if( char == null ) {
				throw this.error( "Unterminated ANSI-C quote" );
			}
			if( char === "'" ) {
				this.advance();
				break;
			}
			if( char === "\\" ) {
				this.advance();
				values+= this.tokenizeAnsiCEscape();
				continue;
			}
			values+= this.consume();
		}
		return new Token( TokenGroup.QUOTED, values, [], position, TokenType.ANSI_C_QUOTED );
	}
	
	/**
	 * Tokenize backtick syntax
	 * 
	 * @returns {Token}
	 * 
	 * @throws {SyntaxError} Throws whether backtick unterminated
	 * 
	 */
	tokenizeBacktick() {
		let body = "";
		let position = this.position;
		this.advance(); // skip `
		while( true ) {
			const char = this.peek();
			if( char == null ) {
				throw this.error( "Unterminated backtick" );
			}
			if( char === "`" ) {
				this.consume();
				break;
			}
			if( char === "\\" ) {
				body+= this.consume();
				if( this.peek() != null ) {
					body+= this.consume();
				}
				continue;
			}
			body+= this.consume();
		}
		return new Token(TokenGroup.EXPANSION, body, [], position, TokenType.BACKTICK);
	}
	
	/** Tokenize comment syntax */
	tokenizeComment() {
		let position = this.position;
		let s = '';
		while (true) {
			const ch = this.peek();
			if (ch == null || ch === '\n') break;
			s+= this.consume();
		}
		if (s.length >= 3 && s[1] === "!") {
			this.push(new Token(TokenGroup.COMMENT, s, [], position, TokenType.SHEBANG));
		} else {
			this.push(new Token(TokenGroup.COMMENT, s, [], position, TokenType.COMMENT));
		}
	}
	
	/**
	 * Tokenize dollar and backtick syntax
	 * 
	 * @returns {Token}
	 * 
	 * @throws {SyntaxError} Throws whether syntax is unterminated
	 * 
	 */
	tokenizeDollarOrBacktick() {
		let position = this.position;
		var character = this.peek();
		if( character === "`" ) {
			return this.tokenizeBacktick();
		}
		// starts with $
		this.consume(); // skip $
		const next = this.peek();
		// parameter expansion ${...}
		if( next === "{" ) {
			this.consume(); // skip {
			let body = "";
			let depth = 1;
			while( true ) {
				const char = this.peek();
				if( char == null ) {
					throw this.error( "Unterminated ${" );
				}
				if( char === "{" ) {
					depth++;
					body+= this.consume();
					continue;
				}
				if( char === "}" ) {
					depth--;
					if( depth === 0 ) {
						this.consume(); break;
					}
					else {
						body+= this.consume();
						continue;
					}
				}
				body+= this.consume();
			}
			return new Token( TokenGroup.EXPANSION, body, [], position, TokenType.PARAM_EXPANSION );
		}
		
		// arithmetic $(( ... ))
		if( next === "(" && this.peekAhead( 1 ) === "(" ) {
			this.advance(); // (
			this.advance(); // (
			let body = "";
			let depth = 1;
			while( true ) {
				const char = this.peek();
				if( char == null ) {
					throw this.error( "Unterminated $((" );
				}
				if( char === "(" ) {
					depth++;
					body+= this.consume();
					continue;
				}
				if( char === ")" ) {
					if( this.peekAhead( 1 ) === ")" ) {
						this.advance(); // )
						this.advance(); // )
						break;
					}
					else {
						body+= this.consume();
						continue;
					}
				}
				body+= this.consume();
			}
			return new Token( TokenGroup.EXPANSION, body, [], position, TokenType.ARITHMETIC_EXPANSION );
		}
		
		// subshell $( ... )
		if( next === "(" ) {
			this.advance(); // '('
			let body = "";
			let depth = 1;
			while( true ) {
				var char = this.peek();
				if( char == null ) {
					throw this.error( "Unterminated $(" );
				}
				if( char === "(" ) {
					depth++;
					body+= this.consume();
					continue;
				}
				if( char === ")" ) {
					depth--;
					if( depth === 0 ) {
						this.advance();
						break;
					}
					else {
						body+= this.consume();
						continue;
					}
				}
				// nested quotes inside subshell handled conservatively: embed raw with delimiters
				if( char === "'" || char === "\"" ) {
					const quoted = this.tokenizeQuotedOrDollarQuote();
					// `quoted` is Token instance; compare typed then embed lexeme or flatten children
					switch( quoted.typed ) {
						case TokenType.SINGLE_QUOTED:
							body+= Fmt( "'$\{{}\}'", quoted.lexeme );
							continue;
						case TokenType.DOUBLE_QUOTED:
							body+= Fmt( "\"$\{{}\}\"", quoted.lexeme );
							continue;
						case TokenType.ANSI_C_QUOTED:
						case TokenType.LOCALE_QUOTED:
							// keep as original string form (no deep parsing)
							body+= quoted.lexeme;
							continue;
						// composite flatten
						case TokenType.COMPOSITE:
							for( let piece of quoted.pieces ) {
								body+= ( piece.lexeme || '' );
							}
							continue;
					}
				}
				body+= this.consume();
			}
			return new Token( TokenGroup.EXPANSION, body, [], position, TokenType.COMMAND_SUBSTITUTION );
		}
		
		// variable name, positional or special
		if( next != null && /[A-Za-z0-9_@*!#?$\-]/.test( next ) ) {
			let name = "";
			while( this.peek() != null ) {
				if( /[A-Za-z0-9_@*!#?$\-]/.test( this.peek() ) ) {
					name+= this.consume();
					continue;
				}
				break;
			}
			return new Token( TokenGroup.EXPANSION, name, [], position, TokenType.VARIABLE_EXPANSION );
		}
		return new Token( TokenGroup.WORD, "$", [], position, TokenType.WORD_PIECE );
	}
	
	/**
	 * Tokenize double quoted syntax
	 * 
	 * @returns {Token}
	 * 
	 * @throws {SyntaxError} Throws whether quote is unterminated
	 * 
	 */
	tokenizeDoubleQuoted() {
		let pieces = [];
		let position = this.position;
		let values = "";
		this.advance(); // skip "
		while( true ) {
			const char = this.peek();
			if( char === null ) {
				throw this.error( "Unterminated double quote" );
			}
			if( char === "\"" ) {
				this.advance();
				break;
			}
			if( char === "\\" ) {
				this.advance();
				const next = this.peek();
				if( next === null ) {
					break;
				}
				if( next === "$" ||
					next === "`" ||
					next === "\"" ||
					next === "\\" ||
					next === "\n" ) {
					values+= this.consume();
				}
				else {
					values+= "\\".concat( this.consume() );
				}
				continue;
			}
			if( char === "$" ) {
				if( values.length > 0 ) {
					pieces.push( new Token( TokenGroup.QUOTED, values, [], position, TokenType.DOUBLE_QUOTED ) );
					values = "";
				}
				pieces.push( this.tokenizeDollarOrBacktick() );
				continue;
			}
			values+= this.consume();
		}
		if( values.length > 0 ) {
			pieces.push( new Token( TokenGroup.QUOTED, values, [], position, TokenType.DOUBLE_QUOTED ) );
		}
		if( pieces.length === 1 ) {
			return pieces[0];
		}
		// composite -> use TokenGroup.MISC with null lexeme per-instruction
		return new Token( TokenGroup.MISC, null, pieces, position, TokenType.COMPOSITE );
	}
	
	/**
	 * Tokenize locale quoted syntax
	 * 
	 * @returns {Token}
	 * 
	 * @throws {SyntaxError} Throws whether quote unterminated
	 * 
	 */
	tokenizeLocaleQuoted() {
		// $"..." - similar to double quotes but different token type for parts
		let pieces = [];
		let position = this.position;
		let values = "";
		this.advance(); // $
		this.advance(); // "
		while( true ) {
			const char = this.peek();
			if( char === null ) {
				throw this.error( "Unterminated $\" quote" )
			};
			if( char === "\"" ) {
				this.advance(); break;
			}
			if( char === "\\" ) {
				this.advance();
				const next = this.peek();
				if( next === null ) {
					break;
				}
				if( next === "$" ||
					next === "`" ||
					next === "\"" ||
					next === "\\" ||
					next === "\n" ) {
					values+= this.consume();
				}
				else {
					values+= "\\".concat( this.consume() );
				}
				continue;
			}
			if( char === "$" ) {
				if( values.length > 0 ) {
					pieces.push( new Token( TokenGroup.QUOTED, values, [], position, TokenType.LOCALE_QUOTED ) );
					values = "";
				}
				pieces.push( this.tokenizeDollarOrBacktick() );
				continue;
			}
			values+= this.consume();
		}
		if( values.length > 0 ) {
			pieces.push( new Token( TokenGroup.QUOTED, values, [], position, TokenType.LOCALE_QUOTED ) );
		}
		if( pieces.length === 1 ) {
			return pieces[0];
		}
		return new Token(TokenGroup.MISC, null, pieces, position, TokenType.COMPOSITE);
	}
	
	/**
	 * Tokenize operator or redir syntax
	 * 
	 * @returns {Token}
	 * 
	 */
	tokenizeOperatorOrRedir() {
		let position = this.position;
		let start = this.consume();
		let value = start;
		let after = this.peek();
		if( after === null ) {
			return new Token( TokenGroup.OPERATOR, value, [], position, this.operatorTokenType( value ) );
		}
		
		// combinations
		if( ( start === ">" || start === "<" ) && after === ">" ) {
			value+= this.consume();
			if( this.peek() === "&" ) {
				value+= this.consume();
				return new Token( TokenGroup.OPERATOR, value, [], position, TokenType.REDIR_DUP_OUTPUT );
			}
			if( start === ">" ) {
				return new Token( TokenGroup.OPERATOR, value, [], TokenType.REDIR_APPEND );
			}
			return new Token( TokenGroup.OPERATOR, value, [], position, TokenType.LESS_GREATER );
		}
		if( ( start === ">" || start === "<" ) && after === "&" ) {
			value+= this.consume();
			if( start === ">" ) {
				return new Token( TokenGroup.OPERATOR, value, [], position, TokenType.REDIR_DUP_OUTPUT );
			}
			return new Token( TokenGroup.OPERATOR, value, [], TokenType.REDIR_DUP_INPUT );
		}
		if( start === "<" && after === "<" ) {
			value+= this.consume();
			if( this.peek() === "-" ) {
				value+= this.consume();
				return new Token( TokenGroup.OPERATOR, value, [], position, TokenType.REDIR_HEREDOC_STRIP );
			}
			if( this.peek() === "<" ) {
				value+= this.consume();
				return new Token( TokenGroup.OPERATOR, value, [], position, TokenType.HERE_STRING );
			}
			return new Token( TokenGroup.OPERATOR, value, [], position, TokenType.REDIR_HEREDOC );
		}
		if( ( start === "|" || start === "&" ) && after === start ) {
			value+= this.consume();
			if( start === "|" ) {
				return new Token( TokenGroup.OPERATOR, value, [], position, TokenType.DOUBLE_PIPE );
			}
			return new Token( TokenGroup.OPERATOR, value, [], position, TokenType.DOUBLE_AMPERSAND );
		}
		if( start === "|" && after === "&" ) {
			value+= this.consume();
			return new Token( TokenGroup.OPERATOR, value, [], position, TokenType.PIPE_AND );
		}
		if( start === ";" && after === ";" ) {
			value+= this.consume();
			if( this.peek() === "&" ) {
				value+= this.consume();
				return new Token( TokenGroup.OPERATOR, value, [], position, TokenType.SEMI_SEMI_AMP );
			}
			return new Token( TokenGroup.OPERATOR, value, [], position, TokenType.SEMI_SEMI );
		}
		switch( start ) {
			case "(":
				return new Token( TokenGroup.OPERATOR, value, [], position, TokenType.SUBSHELL_START );
			case ")":
				return new Token( TokenGroup.OPERATOR, value, [], position, TokenType.SUBSHELL_END );
			case "|":
				return new Token( TokenGroup.OPERATOR, value, [], position, TokenType.PIPE );
			case "&":
				return new Token( TokenGroup.OPERATOR, value, [], position, TokenType.AMPERSAND );
			case ";":
				return new Token( TokenGroup.OPERATOR, value, [], position, TokenType.SEMICOLON );
			case "<":
				return new Token( TokenGroup.OPERATOR, value, [], position, TokenType.REDIR_IN );
			case ">":
				return new Token( TokenGroup.OPERATOR, value, [], position, TokenType.REDIR_OUT );
		}
		return new Token( TokenGroup.MISC, value, [], position, TokenType.UNKNOWN );
	}
	
	/**
	 * Tokenize process subtitution syntax
	 * 
	 * @returns {Token}
	 * 
	 * @throws {SyntaxError} Throws whether process subtitution is unterminated
	 * 
	 */
	tokenizeProcessSubstitution() {
		// consume <( or >(
		let body = "";
		let depth = 1;
		let position = this.position;
		let consumed = this.consume();
		let sign = new Token( TokenGroup.REDIRECTION, consumed, [], position, consumed === "<" ? TokenType.REDIR_IN : TokenType.REDIR_OUT ); // '<' or '>'
		this.advance(); // '('
		while( true ) {
			const char = this.peek();
			if( char === null ) {
				throw this.error( "Unterminated process substitution" );
			}
			if( char === "(" ) {
				depth++;
				body+= this.consume();
				continue;
			}
			if( char === ")" ) {
				depth--;
				if( depth === 0 ) {
					this.advance();
					break;
				}
				else {
					body+= this.consume();
					continue;
				}
			}
			body+= this.consume();
		}
		return new TokenProcessSubtitution( TokenGroup.EXPANSION, body, [], position, sign, TokenType.PROCESS_SUBSTITUTION );
	}
	
	/**
	 * Tokenize a quoted piece or dollar-quote ($'..' or $"..")
	 * 
	 * @returns {Token}
	 * 
	 */
	tokenizeQuotedOrDollarQuote() {
		let position = this.position;
		const char = this.peek();
		if( char === "'" ) {
			return this.tokenizeSingleQuoted();
		}
		if( char === "\"") {
			return this.tokenizeDoubleQuoted();
		}
		if( char === "$" && this.peekAhead( 1 ) === "'" ) {
			return this.tokenizeAnsiCQuoted();
		}
		if( char === "$" && this.peekAhead( 1 ) === "\"" ) {
			return this.tokenizeLocaleQuoted();
		}
		if( char === "$" && this.peekAhead( 1 ) === "(" ) {
			return this.tokenizeDollarOrBacktick();
		}
		// fallback
		this.position++;
		return new Token( TokenGroup.WORD, "", [], position, TokenType.WORD_PIECE);
	}
	
	/**
	 * Tokenize single quoted syntax
	 * 
	 * @returns {Token}
	 * 
	 * @throws {SyntaxError} Throws whether quote is unterminated
	 * 
	 */
	tokenizeSingleQuoted() {
		let values = "";
		let position = this.position;
		this.advance(); // skip '
		while( true ) {
			const char = this.peek();
			if( char == null ) {
				throw this.error( "Unterminated single quote" );
			}
			if( char === "'" ) {
				this.advance();
				break;
			}
			values+= this.consume();
		}
		return new Token( TokenGroup.QUOTED, values, [], position, TokenType.SINGLE_QUOTED );
	}
	
	/**
	 * Tokenize word piece syntax
	 * 
	 * @returns {Token}
	 * 
	 */
	tokenizeWordPiece() {
		let position = this.position;
		let string = "";
		while (true) {
			const char = this.peek();
			if( char === null ) {
				break;
			}
			if( char === "\n" || this.isWhitespace( char ) || this.isOperatorStart( char ) ) {
				break;
			}
			if( char === "\\" ) {
				this.advance();
				const next = this.peek();
				if( next === null ) {
					break;
				}
				string+= this.consume();
				continue;
			}
			if( char === "'" || char === "\"" ) {
				const quoted = char === "'" ? this.tokenizeSingleQuoted() : this.tokenizeDoubleQuoted();
				// append quoted lexeme into current chunk (caller will treat as piece)
				if( quoted.typed === TokenType.SINGLE_QUOTED ||
					quoted.typed === TokenType.DOUBLE_QUOTED ) {
					string+= quoted.lexeme;
					continue;
				}
			}
			
			// stop at $ to produce piece boundary
			if( char === "$" ) {
				break;
			}
			
			// stop on process substitution start
			if( ( char === "<" || char === ">" ) && this.peekAhead( 1 ) === "(" ) {
				break;
			}
			string+= this.consume();
		}
		return new Token( TokenGroup.WORD, string, [], position, TokenType.WORD_PIECE );
	}
	
}

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

class ProgramMetadata {
	
	/** @type {Array<String>} */
	args;
	
	/** @type {String} */
	command;
	
	/** @type {?UnixTime} */
	end;
	
	/** @type {?Number} */
	exit;
	
	/** @type {Object} */
	options;
	
	/** @type {Number} */
	pid;
	
	/** @type {UnixTime} */
	start;
	
	/** @type {String} */
	state; // exit|killed|running
	
	/** @type {User} */
	user;
	
	/**
	 * 
	 * Construct method of class ProgramMetadata
	 * 
	 * @param {Array<String>} args
	 * @param {String} command
	 * @param {Object} options
	 * @param {Number} pid
	 * @param {UnixTime} start
	 * @param {String} state
	 * @param {User} user
	 * 
	 */
	constructor( args, command, options, pid, start, state, user ) {
		this.args = args;
		this.command = command;
		this.end = null;
		this.exit = null;
		this.options = options;
		this.pid = pid;
		this.start = start;
		this.state = state;
		this.user = user;
	}
	
}

class Shell {
	
	/** @type {Map<String,Alias>} */
	aliases;
	
	/** @type {Map<String,String>} */
	env;
	
	/** @type {Map<String,String>} */
	exports;
	
	/** @type {Array<History>} */
	history;
	
	/** @type {Kernel} */
	kernel;
	
	/** @type {Lexer} */
	lexer;
	
	/**
	 * Construct method of class Shell
	 * 
	 * @param {Kernel} kernel
	 * @param {Object} options
	 * 
	 */
	constructor( kernel, options={} ) {
		const user = kernel.user();
		this.aliases = new Map();
		this.env = Object.assign( new Map(), {
			GROUPS: user.gid,
			HOME: user.home,
			HOSTNAME: kernel.hostname,
			OLDPWD: user.home,
			PATH: "/bin:/usr/bin",
			PWD: user.home,
			SHELL: user.shell,
			USER: user.username,
			PS1: "\\[\\e[1;38;5;112m\\]\\u\\[\\e[1;38;5;190m\\]@\\h\\[\\e[1;38;5;214m\\]:\x20\\[\\e[1;32m\\]\\w\\[\\e[1;37m\\]\x20$\x20"
		});
		this.env = Object.assign( this.env, options.env || {}, user.env || {} );
		this.exports = new Map();
		this.history = [];
		for( let element of Banner ) {
			this.history.push( new History( null, null, "", "", element ) );
		}
		this.kernel = kernel;
		this.lexer = new Lexer( false );
	}
	
	/**
	 * Execute given command.
	 * 
	 * @param {String} command
	 * 
	 * @returns {Promise<void>}
	 * 
	 */
	async execute( command ) {
		if( this.history.length >= 100 ) {
			this.history = [];
		}
		const iterator = this.tokenize( command );
		while( true ) {
			const iterated = iterator.next();
			if( iterated.done ) {
				break;
			}
			// do something with command...
			console.log( iterated.value );
		}
	}
	
	/**
	 * 
	 * @param {String} command
	 * 
	 * @returns {Iterator<Array<Token>>}
	 */
	*tokenize( command ) {
		var lexer = new Lexer( command, true );
		var tokenized = lexer.tokenize();
		var stacks = [];
		for( let token of tokenized ) {
			if( token.typed === TokenType.SEMICOLON ) {
				if( stacks.length >= 1 ) {
					yield stacks;
				}
				stacks = [];
				continue;
			}
			stacks.push( token );
		}
		yield stacks;
	}
	
}

class Terminal {
	
	/** @type {Array<Array<String>} */
	aliases;
	
	/** @type {ANSI} */
	ansi;
	
	/** @type {User} */
	hxari;
	
	/** @type {?HTMLInputElement|HTMLTextAreaElement} */
	input;
	
	/** @type {Kernel} */
	kernel;
	
	/** @type {Router} */
	router;
	
	/** @type {Shell} */
	shell;
	
	/** @type {?HTMLDivElement} */
	window;
	
	/**
	 * Construct method of class Terminal
	 *
	 * @param {?HTMLInputElement|HTMLTextAreaElement} input
	 * @param {Router} router
	 * @param {?HTMLDivElement} window
	 * 
	 */
	constructor( input, router, window ) {
		this.aliases = [
			[
				"\\x61\\x64\\x65\\x6c\\x69\\x61",
				"\\x65\\x63\\x68\\x6f\\x20\\x2d\\x65\\x20\\x22\\x61\\x64\\x65\\x6c\\x69\\x61\\x3a\\x20\\x49\\x20\\x6e\\x65\\x76\\x65\\x72\\x20\\x65\\x78\\x70\\x65\\x63\\x74\\x65\\x64\\x20\\x79\\x6f\\x75\\x72\\x20\\x61\\x72\\x72\\x69\\x76\\x61\\x6c\\x20\\x62\\x65\\x66\\x6f\\x72\\x65\\x3b\\x20\\x49\\x27\\x6d\\x20\\x71\\x75\\x69\\x74\\x65\\x20\\x69\\x6e\\x74\\x65\\x72\\x65\\x73\\x74\\x65\\x64\\x20\\x69\\x6e\\x20\\x79\\x6f\\x75\\x72\\x20\\x70\\x65\\x72\\x73\\x6f\\x6e\\x61\\x6c\\x69\\x74\\x79\\x3b\\x20\\x59\\x6f\\x75\\x27\\x72\\x65\\x20\\x61\\x6c\\x73\\x6f\\x20\\x61\\x20\\x63\\x72\\x79\\x65\\x72\\x2c\\x20\\x6c\\x69\\x6b\\x65\\x20\\x74\\x6f\\x20\\x65\\x78\\x70\\x65\\x72\\x69\\x6d\\x65\\x6e\\x74\\x20\\x6c\\x69\\x6b\\x65\\x20\\x62\\x61\\x6b\\x69\\x6e\\x67\\x20\\x61\\x6e\\x64\\x20\\x63\\x6f\\x6f\\x6b\\x69\\x6e\\x67\\x2c\\x20\\x6c\\x6f\\x76\\x69\\x6e\\x67\\x20\\x61\\x6e\\x64\\x20\\x63\\x61\\x72\\x69\\x6e\\x67\\x20\\x61\\x62\\x6f\\x75\\x74\\x20\\x65\\x76\\x65\\x72\\x79\\x6f\\x6e\\x65\\x27\\x73\\x20\\x68\\x65\\x61\\x6c\\x74\\x68\\x2c\\x20\\x70\\x72\\x65\\x66\\x65\\x72\\x20\\x77\\x65\\x61\\x72\\x69\\x6e\\x67\\x20\\x72\\x6f\\x62\\x65\\x73\\x20\\x70\\x65\\x72\\x68\\x61\\x70\\x73\\x3f\\x2c\\x2e\\x20\\x41\\x73\\x20\\x66\\x61\\x72\\x20\\x61\\x73\\x20\\x49\\x20\\x63\\x61\\x6e\\x20\\x73\\x65\\x65\\x2c\\x20\\x79\\x6f\\x75\\x72\\x20\\x69\\x6e\\x74\\x75\\x69\\x74\\x69\\x6f\\x6e\\x20\\x69\\x73\\x20\\x71\\x75\\x69\\x74\\x65\\x20\\x67\\x6f\\x6f\\x64\\x3b\\x20\\x49\\x20\\x68\\x6f\\x70\\x65\\x20\\x79\\x6f\\x75\\x72\\x20\\x61\\x72\\x72\\x69\\x76\\x61\\x6c\\x20\\x69\\x73\\x20\\x74\\x68\\x65\\x20\\x6c\\x61\\x73\\x74\\x20\\x66\\x6f\\x72\\x20\\x6d\\x65\\x22"
			],
			[
				"\\x63\\x68\\x69\\x6e\\x74\\x79\\x61",
				"\\x65\\x63\\x68\\x6f\\x20\\x2d\\x65\\x20\\x22\\x63\\x68\\x69\\x6e\\x74\\x79\\x61\\x3a\\x20\\x59\\x6f\\x75\\x20\\x61\\x72\\x65\\x20\\x62\\x65\\x61\\x75\\x74\\x69\\x66\\x75\\x6c\\x2c\\x20\\x63\\x75\\x74\\x65\\x2c\\x20\\x6b\\x69\\x6e\\x64\\x2c\\x20\\x77\\x68\\x69\\x74\\x65\\x2c\\x20\\x72\\x65\\x64\\x64\\x69\\x73\\x68\\x2c\\x20\\x73\\x6d\\x6f\\x6f\\x74\\x68\\x2c\\x20\\x73\\x6f\\x66\\x74\\x2c\\x20\\x62\\x75\\x74\\x20\\x61\\x6c\\x73\\x6f\\x20\\x76\\x65\\x72\\x79\\x20\\x61\\x6e\\x6e\\x6f\\x79\\x69\\x6e\\x67\\x3b\\x20\\x59\\x6f\\x75\\x20\\x6c\\x69\\x6b\\x65\\x20\\x73\\x6b\\x79\\x20\\x62\\x6c\\x75\\x65\\x3b\\x20\\x41\\x6e\\x64\\x20\\x79\\x6f\\x75\\x20\\x6c\\x69\\x6b\\x65\\x20\\x63\\x6c\\x65\\x61\\x72\\x20\\x73\\x6f\\x75\\x70\\x20\\x77\\x69\\x74\\x68\\x20\\x67\\x72\\x65\\x65\\x6e\\x20\\x73\\x70\\x69\\x6e\\x61\\x63\\x68\\x3b\\x20\\x49\\x20\\x72\\x65\\x61\\x6c\\x6c\\x79\\x20\\x72\\x65\\x61\\x6c\\x6c\\x79\\x20\\x6c\\x69\\x6b\\x65\\x20\\x79\\x6f\\x75\\x20\\x61\\x6e\\x64\\x20\\x77\\x68\\x69\\x6c\\x65\\x20\\x69\\x20\\x73\\x74\\x69\\x6c\\x20\\x6c\\x6f\\x76\\x65\\x20\\x79\\x6f\\x75\\x2c\\x20\\x62\\x75\\x74\\x20\\x73\\x6f\\x20\\x66\\x61\\x72\\x20\\x49\\x20\\x61\\x6d\\x20\\x6d\\x6f\\x72\\x65\\x20\\x64\\x6f\\x6d\\x69\\x6e\\x61\\x6e\\x74\\x20\\x74\\x68\\x61\\x6e\\x20\\x79\\x6f\\x75\\x20\\x61\\x6e\\x64\\x20\\x49\\x20\\x61\\x6d\\x20\\x61\\x6c\\x73\\x6f\\x20\\x64\\x69\\x73\\x61\\x70\\x70\\x6f\\x69\\x6e\\x74\\x65\\x64\\x20\\x77\\x69\\x74\\x68\\x20\\x79\\x6f\\x75\\x72\\x20\\x61\\x74\\x74\\x69\\x74\\x75\\x64\\x65\\x2c\\x20\\x74\\x74\\x27\\x73\\x20\\x6c\\x69\\x6b\\x65\\x20\\x79\\x6f\\x75\\x20\\x64\\x6f\\x6e\\x27\\x74\\x20\\x6d\\x61\\x6b\\x65\\x20\\x61\\x6e\\x79\\x20\\x65\\x66\\x66\\x6f\\x72\\x74\\x20\\x61\\x74\\x20\\x61\\x6c\\x6c\\x20\\x66\\x6f\\x72\\x20\\x6d\\x65\\x22"
			],
			[
				"\\x6c\\x69\\x61\\x6e\\x61",
				"\\x65\\x63\\x68\\x6f\\x20\\x2d\\x65\\x20\\x22\\x6c\\x69\\x61\\x6e\\x61\\x3a\\x20\\x52\\x65\\x6d\\x65\\x6d\\x62\\x65\\x72\\x2c\\x20\\x66\\x61\\x6c\\x6c\\x69\\x6e\\x67\\x20\\x69\\x6e\\x20\\x6c\\x6f\\x76\\x65\\x20\\x62\\x65\\x63\\x61\\x75\\x73\\x65\\x20\\x6f\\x66\\x20\\x66\\x61\\x69\\x74\\x68\\x20\\x69\\x73\\x20\\x6d\\x75\\x63\\x68\\x20\\x6d\\x6f\\x72\\x65\\x20\\x62\\x65\\x61\\x75\\x74\\x69\\x66\\x75\\x6c\\x20\\x74\\x68\\x61\\x6e\\x20\\x66\\x61\\x6c\\x6c\\x69\\x6e\\x67\\x20\\x69\\x6e\\x20\\x6c\\x6f\\x76\\x65\\x20\\x62\\x65\\x63\\x61\\x75\\x73\\x65\\x20\\x6f\\x66\\x20\\x6c\\x75\\x73\\x74\\x3b\\x20\\x59\\x6f\\x75\\x20\\x61\\x72\\x65\\x20\\x61\\x20\\x70\\x65\\x72\\x73\\x6f\\x6e\\x20\\x77\\x68\\x6f\\x20\\x63\\x72\\x69\\x65\\x73\\x20\\x65\\x61\\x73\\x69\\x6c\\x79\\x20\\x66\\x6f\\x72\\x20\\x6e\\x6f\\x20\\x72\\x65\\x61\\x73\\x6f\\x6e\\x2c\\x20\\x62\\x75\\x74\\x20\\x49\\x20\\x6b\\x6e\\x6f\\x77\\x20\\x79\\x6f\\x75\\x20\\x61\\x72\\x65\\x20\\x61\\x6c\\x73\\x6f\\x20\\x74\\x68\\x65\\x20\\x6d\\x6f\\x73\\x74\\x20\\x63\\x68\\x65\\x65\\x72\\x66\\x75\\x6c\\x20\\x70\\x65\\x72\\x73\\x6f\\x6e\\x20\\x49\\x20\\x6b\\x6e\\x6f\\x77\\x2e\\x3b\\x20\\x49\\x20\\x73\\x68\\x6f\\x75\\x6c\\x64\\x20\\x68\\x61\\x76\\x65\\x20\\x75\\x6e\\x64\\x65\\x72\\x73\\x74\\x6f\\x6f\\x64\\x20\\x79\\x6f\\x75\\x72\\x20\\x63\\x6f\\x64\\x65\\x20\\x66\\x72\\x6f\\x6d\\x20\\x74\\x68\\x65\\x20\\x73\\x74\\x61\\x72\\x74\\x3b\\x20\\x4f\\x6e\\x65\\x20\\x6d\\x6f\\x72\\x65\\x20\\x74\\x68\\x69\\x6e\\x67\\x2c\\x20\\x49\\x20\\x6d\\x69\\x73\\x73\\x20\\x79\\x6f\\x75\\x72\\x20\\x76\\x6f\\x69\\x63\\x65\\x22"
			]
		];
		this.ansi = new ANSI();
		this.input = input;
		this.kernel = new Kernel( router );
		if( this.kernel.vfs.isdir( "/home/hxari" ) ) {
			this.kernel.switch( "hxari" );
			this.hxari = this.kernel.user();
		}
		else {
			this.kernel.useradd( "hxari", {
				fullname: "hxAri",
				home: "/home/hxari",
				password: "hxari",
				shell: "/usr/bin/bash",
				user: this.kernel.root
			});
			this.kernel.switch( "hxari" );
			this.hxari = this.kernel.user();
			for( const aliased of this.aliases ) {
				this.kernel.vfs.append( "/home/hxari/.bash_aliases", { contents: Fmt( "\nalias -d 0 -o 0 $'{}'=\"{}\"", ...aliased.map( ( alias, index ) => index === 0 ? alias : alias.replaceAll( /\"/g, "\\\"" ) ) ), user: this.hxari } );
			}	
		}
		this.router = router;
		this.shell = new Shell( this.kernel );
		this.window = window;
	}
	
	ps1() {
		var PS1 = this.shell.env['PS1'];
		var user = this.kernel.user();
		var index = 0;
		var match = null;
		var prompt = "";
		var regexp = /(?<backslash>\\)(?!(e|x1b|033))(?<format>[^\s]{0,1})/g;
		var datetime = new UnixTime();
		while( ( match = regexp.exec( PS1 ) ) !== null ) {
			var value = "";
			switch( match.groups.format ) {
				
				// The date in "Weekday Month Date" format (e.g., "Tue May 26")
				case "d": value = datetime.format( "%a %b %d" ); break;
				
				// The hostname.
				case "h":
				case "H": value = this.kernel.hostname; break;
				
				// New line.
				case "n": value = "<br/>"; break;
				
				// The name of the shell.
				case "s": value = user.shell; break;
				
				// Current working directory.
				// case "w": value = this.pwd() !== this.exports.HOME ? this.pwd() : "~"; break;
				
				// Basename current working directory.
				// case "W": value = this.pwd( true ); break;
				
				// The username of current user.
				case "u": value = user.username; break;
				
				// The current time in 24-hour HH:MM:SS format.
				case "t": value = datetime.format( "%H:%M:%S" ); break;
				
				// The current time in 12-hour HH:MM:SS format.
				case "T": value = datetime.format( "%I:%M:%S" ); break;
				
				// The current time in 12-hour am/pm format.
				case "@": value = Fmt( "{} {}", datetime.format( "%I:%M" ), datetime.hours() >= 12 ? "PM" : "AM" ); break;
				
				// The current time in 24-hour HH:MM format.
				case "A": value = datetime.format( "%H:%M" ); break;
				
				default:
					break;
			}
			prompt+= PS1.substring( index, regexp.lastIndex - match[0].length ) + value;
			index = regexp.lastIndex;
		}
		return this.ansi.render( prompt.concat( PS1.substring( index ) ) );
	}
	
}

class Token {
	
	/** @type {TokenGroup} */
	grouped;
	
	/** @type {String} */
	lexeme;
	
	/** @type {Array<Token>} */
	pieces;
	
	/** @type {Number} */
	position;
	
	/** @type {TokenType} */
	typed;
	
	/**
	 * Construct method of class Token
	 * 
	 * @param {TokenGroup} grouped
	 * @param {String} lexeme
	 * @param {Array<Token>} pieces
	 * @param {Number} position
	 * @param {TokenType} typed
	 * 
	 */
	constructor( grouped, lexeme, pieces, position, typed ) {
		this.grouped = grouped;
		this.lexeme = lexeme;
		this.pieces = pieces;
		this.position = position;
		this.typed = typed;
	}
	
}

class TokenProcessSubtitution extends Token {
	
	/** @type {Token} */
	sign; // read (<), write (>)
	
	/**
	 * Construct method of class Token
	 * 
	 * @param {TokenGroup} grouped
	 * @param {String} lexeme
	 * @param {Array<Token>} pieces
	 * @param {Number} position
	 * @param {Token} sign
	 *  Operator sign-like read (<), write (>)
	 * @param {TokenType} typed
	 * 
	 */
	constructor( grouped, lexeme, pieces, position, sign, typed ) {
		super(
			grouped,
			lexeme,
			pieces,
			position,
			typed
		);
		this.sign = sign;
	}
	
};

/**
 * Map of token types.
 * 
 * Defines all lexical token types recognized by the Bash-compatible lexer.
 * Each token represents a syntactic unit in a Bash command line.
 * 
 * @property {String} AMPERSAND
 * @property {String} ANSI_C_QUOTED
 * @property {String} ARITHMETIC_EXPANSION
 * @property {String} ASSIGNMENT_WORD
 * @property {String} BACKTICK
 * @property {String} CASE
 * @property {String} COMMAND_SUBSTITUTION
 * @property {String} COMMENT
 * @property {String} COMPOSITE
 * @property {String} COPROC
 * @property {String} DECLARE
 * @property {String} DO
 * @property {String} DONE
 * @property {String} DOUBLE_AMPERSAND
 * @property {String} DOUBLE_PIPE
 * @property {String} DOUBLE_QUOTED
 * @property {String} ELIF
 * @property {String} ELSE
 * @property {String} EOF
 * @property {String} ESAC
 * @property {String} EXPANSION_OPERATOR
 * @property {String} EXPORT
 * @property {String} FI
 * @property {String} FOR
 * @property {String} FUNCTION
 * @property {String} GREATER
 * @property {String} GREATER_AND
 * @property {String} GREATER_GREATER
 * @property {String} HEREDOC_BODY
 * @property {String} HEREDOC_DELIM
 * @property {String} HEREDOC_END
 * @property {String} HEREDOC_START
 * @property {String} HERE_STRING
 * @property {String} IF
 * @property {String} IN
 * @property {String} LEFT_PAREN
 * @property {String} LESS
 * @property {String} LESS_AND
 * @property {String} LESS_GREATER
 * @property {String} LESS_LESS
 * @property {String} LINE_CONTINUATION
 * @property {String} LOCAL
 * @property {String} LOCALE_QUOTED
 * @property {String} NEWLINE
 * @property {String} OP_AND
 * @property {String} OP_ASSIGN
 * @property {String} OP_DIV
 * @property {String} OP_EQ
 * @property {String} OP_GE
 * @property {String} OP_GT
 * @property {String} OP_LE
 * @property {String} OP_LT
 * @property {String} OP_MINUS
 * @property {String} OP_MOD
 * @property {String} OP_MUL
 * @property {String} OP_NE
 * @property {String} OP_NOT
 * @property {String} OP_OR
 * @property {String} OP_PLUS
 * @property {String} PARAM_EXPANSION
 * @property {String} PIPE
 * @property {String} PIPE_AND
 * @property {String} PROCESS_SUBSTITUTION
 * @property {String} QUOTED_PART
 * @property {String} READONLY
 * @property {String} REDIR_APPEND
 * @property {String} REDIR_DUP_INPUT
 * @property {String} REDIR_DUP_OUTPUT
 * @property {String} REDIR_HEREDOC
 * @property {String} REDIR_HEREDOC_STRIP
 * @property {String} REDIR_IN
 * @property {String} REDIR_OUT
 * @property {String} REDIR_READ_WRITE
 * @property {String} RIGHT_PAREN
 * @property {String} SELECT
 * @property {String} SEMICOLON
 * @property {String} SEMI_AMP
 * @property {String} SEMI_SEMI
 * @property {String} SEMI_SEMI_AMP
 * @property {String} SHEBANG
 * @property {String} SINGLE_QUOTED
 * @property {String} SUBSHELL_END
 * @property {String} SUBSHELL_START
 * @property {String} THEN
 * @property {String} TIME
 * @property {String} UNKNOWN
 * @property {String} UNTIL
 * @property {String} VARIABLE_EXPANSION
 * @property {String} WHILE
 * @property {String} WHITESPACE
 * @property {String} WORD
 * @property {String} WORD_PIECE
 * 
 * @typedef {Map<String,String>} TokenType
 * 
 */
const TokenType = {
	/** `&` — Runs a command in the background. Example: `sleep 10 &` */
	AMPERSAND: "AMPERSAND",
	
	/** `$'string'` — ANSI-C quoted string supporting escape sequences. Example: `$'Hello\nWorld'` */
	ANSI_C_QUOTED: "ANSI_C_QUOTED",
	
	/** `$(( expression ))` — Arithmetic expansion. Example: `$((1 + 2))` */
	ARITHMETIC_EXPANSION: "ARITHMETIC_EXPANSION",
	
	/** `VAR=value` — Variable assignment. Example: `PATH=/usr/bin` */
	ASSIGNMENT_WORD: "ASSIGNMENT_WORD",
	
	/** `case` — Begins a case statement. Example: `case $x in ... esac` */
	CASE: "CASE",
	
	/** `$(command)` or `` `command` `` — Command substitution. Example: `echo $(date)` */
	COMMAND_SUBSTITUTION: "COMMAND_SUBSTITUTION",
	
	/** `# comment` — Shell comment. Example: `# this is a comment` */
	COMMENT: "COMMENT",
	
	COMPOSITE: "COMPOSITE",
	
	/** `coproc` — Starts a coprocess. Example: `coproc myproc { command; }` */
	COPROC: "COPROC",
	
	BACKTICK: "BACKTICK",
	
	/** `declare` — Declares variables or attributes. Example: `declare -i count=10` */
	DECLARE: "DECLARE",
	
	/** `do` — Marks the start of a loop body. Example: `for i in 1 2 3; do echo $i; done` */
	DO: "DO",
	
	/** `done` — Marks the end of a loop body. Example: `while true; do break; done` */
	DONE: "DONE",
	
	/** `&&` — Logical AND operator. Example: `make && echo 'done'` */
	DOUBLE_AMPERSAND: "DOUBLE_AMPERSAND",
	
	/** `||` — Logical OR operator. Example: `make || echo 'failed'` */
	DOUBLE_PIPE: "DOUBLE_PIPE",
	
	/** `"string"` — Double-quoted string, allows variable expansion. Example: `"Hello $USER"` */
	DOUBLE_QUOTED: "DOUBLE_QUOTED",
	
	/** `elif` — Else-if clause in if-then construct. Example: `if ...; then ...; elif ...; fi` */
	ELIF: "ELIF",
	
	/** `else` — Else clause in if-then construct. Example: `if ...; then ...; else ...; fi` */
	ELSE: "ELSE",
	
	/** End of file/input. */
	EOF: "EOF",
	
	/** `esac` — Ends a case statement. Example: `case ... in ... esac` */
	ESAC: "ESAC",
	
	/** `${var:-default}` — Parameter expansion operator. Example: `${USER:-guest}` */
	EXPANSION_OPERATOR: "EXPANSION_OPERATOR",
	
	/** `export` — Exports a variable to the environment. Example: `export PATH` */
	EXPORT: "EXPORT",
	
	/** `fi` — Ends an if-then construct. Example: `if ...; then ...; fi` */
	FI: "FI",
	
	/** `for` — Starts a for loop. Example: `for i in 1 2 3; do ...; done` */
	FOR: "FOR",
	
	/** `function` — Declares a function. Example: `function greet() { echo hi; }` */
	FUNCTION: "FUNCTION",
	
	/** `>` — Output redirection. Example: `echo hi > file.txt` */
	GREATER: "GREATER",
	
	/** `>&` — Duplicates output stream. Example: `echo hi >&2` */
	GREATER_AND: "GREATER_AND",
	
	/** `>>` — Appends to a file. Example: `echo hi >> file.txt` */
	GREATER_GREATER: "GREATER_GREATER",
	
	/** Body content inside a here-document (`<<EOF` ... `EOF`). */
	HEREDOC_BODY: "HEREDOC_BODY",
	
	/** The heredoc delimiter identifier (`<<EOF`). */
	HEREDOC_DELIM: "HEREDOC_DELIM",
	
	/** Closing heredoc marker (`EOF`). */
	HEREDOC_END: "HEREDOC_END",
	
	/** Start of a here-document (`<<`). */
	HEREDOC_START: "HEREDOC_START",
	
	/** `<<< string` — Here-string redirection. Example: `cat <<< "hello"` */
	HERE_STRING: "HERE_STRING",
	
	/** `if` — Starts an if-then construct. Example: `if [ $x -eq 1 ]; then ... fi` */
	IF: "IF",
	
	/** `in` — Used in a for loop. Example: `for x in a b c; do ... done` */
	IN: "IN",
	
	/** `(` — Opens a subshell or grouping. Example: `(cd /tmp; ls)` */
	LEFT_PAREN: "LEFT_PAREN",
	
	/** `<` — Input redirection. Example: `cat < file.txt` */
	LESS: "LESS",
	
	/** `<&` — Duplicates input descriptor. Example: `exec 3<&0` */
	LESS_AND: "LESS_AND",
	
	/** `<>` — Opens a file for both reading and writing. Example: `exec 3<>file.txt` */
	LESS_GREATER: "LESS_GREATER",
	
	/** `<<` — Here-document redirection. Example: `cat <<EOF ... EOF` */
	LESS_LESS: "LESS_LESS",
	
	/** `\` at end of line — Line continuation. Example: `echo foo \` `bar` */
	LINE_CONTINUATION: "LINE_CONTINUATION",
	
	/** `local` — Declares a variable as local within a function. Example: `local count=5` */
	LOCAL: "LOCAL",
	
	/** `$"string"` — Localizable string literal. Example: `$"Hello"` */
	LOCALE_QUOTED: "LOCALE_QUOTED",
	
	/** Newline (`\n`) — Separates commands. */
	NEWLINE: "NEWLINE",
	
	/** `&&` — Logical AND operator inside expressions. */
	OP_AND: "OP_AND",
	
	/** `=` — Assignment operator. Example: `x=10` */
	OP_ASSIGN: "OP_ASSIGN",
	
	/** `/` — Division operator. Example: `$((10 / 2))` */
	OP_DIV: "OP_DIV",
	
	/** `==` — Equality comparison. Example: `[[ $x == "hi" ]]` */
	OP_EQ: "OP_EQ",
	
	/** `>=` — Greater than or equal. Example: `$((x >= 2))` */
	OP_GE: "OP_GE",
	
	/** `>` — Greater than comparison. Example: `$((x > 0))` */
	OP_GT: "OP_GT",
	
	/** `<=` — Less than or equal. Example: `$((x <= 10))` */
	OP_LE: "OP_LE",
	
	/** `<` — Less than comparison. Example: `$((x < 5))` */
	OP_LT: "OP_LT",
	
	/** `-` — Subtraction operator. Example: `$((x - 1))` */
	OP_MINUS: "OP_MINUS",
	
	/** `%` — Modulo operator. Example: `$((x % 2))` */
	OP_MOD: "OP_MOD",
	
	/** `*` — Multiplication operator. Example: `$((x * 2))` */
	OP_MUL: "OP_MUL",
	
	/** `!=` — Not equal comparison. Example: `[[ $x != "no" ]]` */
	OP_NE: "OP_NE",
	
	/** `!` — Logical negation. Example: `! true` */
	OP_NOT: "OP_NOT",
	
	/** `||` — Logical OR operator. Example: `cmd1 || cmd2` */
	OP_OR: "OP_OR",
	
	/** `+` — Addition operator. Example: `$((x + 1))` */
	OP_PLUS: "OP_PLUS",
	
	/** `${var}` — Parameter expansion. Example: `${HOME}` */
	PARAM_EXPANSION: "PARAM_EXPANSION",
	
	/** `|` — Pipe operator. Example: `echo hi | grep h` */
	PIPE: "PIPE",
	
	/** `|&` — Pipe both stdout and stderr. Example: `cmd1 |& cmd2` */
	PIPE_AND: "PIPE_AND",
	
	/** `<(cmd)` or `>(cmd)` — Process substitution. Example: `diff <(ls) <(ls /tmp)` */
	PROCESS_SUBSTITUTION: "PROCESS_SUBSTITUTION",
	
	/** Quoted string content component. */
	QUOTED_PART: "QUOTED_PART",
	
	/** `readonly` — Marks a variable as read-only. Example: `readonly VAR=value` */
	READONLY: "READONLY",
	
	/** `>>` — Append redirection operator. Example: `echo hi >> file.txt` */
	REDIR_APPEND: "REDIR_APPEND",
	
	/** `<&n` — Duplicate input descriptor. */
	REDIR_DUP_INPUT: "REDIR_DUP_INPUT",
	
	/** `>&n` — Duplicate output descriptor. */
	REDIR_DUP_OUTPUT: "REDIR_DUP_OUTPUT",
	
	/** `<<EOF` — Here-document redirection. */
	REDIR_HEREDOC: "REDIR_HEREDOC",
	
	/** `<<-EOF` — Here-document with leading tab stripping. */
	REDIR_HEREDOC_STRIP: "REDIR_HEREDOC_STRIP",
	
	/** `<` — Input redirection operator. */
	REDIR_IN: "REDIR_IN",
	
	/** `>` — Output redirection operator. */
	REDIR_OUT: "REDIR_OUT",
	
	/** `<>` — Read-write redirection operator. */
	REDIR_READ_WRITE: "REDIR_READ_WRITE",
	
	/** `)` — Closes subshell or grouping. */
	RIGHT_PAREN: "RIGHT_PAREN",
	
	/** `select` — Starts a select loop. Example: `select opt in a b; do ... done` */
	SELECT: "SELECT",
	
	/** `;` — Command separator. Example: `cmd1; cmd2` */
	SEMICOLON: "SEMICOLON",
	
	/** `;&` — Fallthrough case terminator. Example: `case ... in a) ... ;& b) ... ;; esac` */
	SEMI_AMP: "SEMI_AMP",
	
	/** `;;` — Ends a case pattern. Example: `a) echo a ;;` */
	SEMI_SEMI: "SEMI_SEMI",
	
	/** `;;&` — Conditional fallthrough case terminator. */
	SEMI_SEMI_AMP: "SEMI_SEMI_AMP",
	
	/** `'string'` — Single-quoted literal string. Example: `'Hello World'` */
	SINGLE_QUOTED: "SINGLE_QUOTED",
	
	SHEBANG: "SHEBANG",
	
	/** `)` — End of subshell expression. Example: `(cd /tmp)` */
	SUBSHELL_END: "SUBSHELL_END",
	
	/** `(` — Start of subshell expression. Example: `(ls)` */
	SUBSHELL_START: "SUBSHELL_START",
	
	/** `then` — Marks if-then block body. Example: `if ...; then ... fi` */
	THEN: "THEN",
	
	/** `time` — Measures execution time. Example: `time ls` */
	TIME: "TIME",
	
	/** Unknown or invalid token. */
	UNKNOWN: "UNKNOWN",
	
	/** `until` — Begins an until loop. Example: `until false; do ...; done` */
	UNTIL: "UNTIL",
	
	/** `$VAR` — Variable expansion. Example: `$HOME` */
	VARIABLE_EXPANSION: "VARIABLE_EXPANSION",
	
	/** `while` — Begins a while loop. Example: `while true; do ...; done` */
	WHILE: "WHILE",
	
	/** Whitespace (spaces, tabs, etc.). */
	WHITESPACE: "WHITESPACE",
	
	/** General word (command or argument). Example: `echo`, `ls`, `file.txt` */
	WORD: "WORD",
	
	/** Partial word segment, used for internal token merging. */
	WORD_PIECE: "WORD_PIECE"
};

/**
 * Map of token group names.
 * 
 * @property {String} COMMENT
 * @property {String} EXPANSION
 * @property {String} HEREDOC
 * @property {String} METACHARACTER
 * @property {String} MISC
 * @property {String} OPERATOR
 * @property {String} QUOTED
 * @property {String} REDIRECTION
 * @property {String} RESERVED_WORD
 * @property {String} SUBSHELL
 * @property {String} WHITESPACE
 * @property {String} WORD
 * 
 * @typedef {Map<String,String>} TokenGroup
 * 
 */
const TokenGroup = Object.freeze({
	COMMENT: "COMMENT",
	EXPANSION: "EXPANSION",
	HEREDOC: "HEREDOC",
	METACHARACTER: "METACHARACTER",
	MISC: "MISC",
	OPERATOR: "OPERATOR",
	QUOTED: "QUOTED",
	REDIRECTION: "REDIRECTION",
	RESERVED_WORD: "RESERVED_WORD",
	SUBSHELL: "SUBSHELL",
	WHITESPACE: "WHITESPACE",
	WORD: "WORD"
});

/**
 * Map of grouped tokens.
 * 
 * @property {Array<TokenType>} COMMENT
 * @property {Array<TokenType>} EXPANSION
 * @property {Array<TokenType>} HEREDOC
 * @property {Array<TokenType>} METACHARACTER
 * @property {Array<TokenType>} MISC
 * @property {Array<TokenType>} OPERATOR
 * @property {Array<TokenType>} QUOTED
 * @property {Array<TokenType>} REDIRECTION
 * @property {Array<TokenType>} RESERVED_WORD
 * @property {Array<TokenType>} SUBSHELL
 * @property {Array<TokenType>} WHITESPACE
 * @property {Array<TokenType>} WORD
 * 
 * @typedef {Map<TokenGroup,Array<TokenType>>}
 * 
 */
const TokenGrouped = Object.freeze( Object.assign( new Map(), {
	[TokenGroup.COMMENT]: [
		TokenType.COMMENT,
		TokenType.SHEBANG
	],
	[TokenGroup.EXPANSION]: [
		TokenType.ARITHMETIC_EXPANSION,
		TokenType.BACKTICK,
		TokenType.COMMAND_SUBSTITUTION,
		TokenType.EXPANSION_OPERATOR,
		TokenType.PARAM_EXPANSION,
		TokenType.PROCESS_SUBSTITUTION,
		TokenType.VARIABLE_EXPANSION
	],
	[TokenGroup.HEREDOC]: [
		TokenType.HEREDOC_BODY,
		TokenType.HEREDOC_DELIM,
		TokenType.HEREDOC_END,
		TokenType.HEREDOC_START
	],
	[TokenGroup.METACHARACTER]: [
		TokenType.SEMICOLON,
		TokenType.AMPERSAND,
		TokenType.PIPE,
		TokenType.DOUBLE_PIPE,
		TokenType.DOUBLE_AMPERSAND,
		TokenType.LEFT_PAREN,
		TokenType.RIGHT_PAREN,
		TokenType.LESS,
		TokenType.GREATER,
		TokenType.LESS_LESS,
		TokenType.GREATER_GREATER,
		TokenType.LESS_AND,
		TokenType.GREATER_AND,
		TokenType.LESS_GREATER,
		TokenType.PIPE_AND,
		TokenType.SEMI_SEMI,
		TokenType.SEMI_AMP,
		TokenType.SEMI_SEMI_AMP
	],
	[TokenGroup.MISC]: [
		TokenType.COMPOSITE,
		TokenType.EOF,
		TokenType.UNKNOWN
	],
	[TokenGroup.OPERATOR]: [
		TokenType.OP_PLUS,
		TokenType.OP_MINUS,
		TokenType.OP_MUL,
		TokenType.OP_DIV,
		TokenType.OP_MOD,
		TokenType.OP_EQ,
		TokenType.OP_NE,
		TokenType.OP_LT,
		TokenType.OP_GT,
		TokenType.OP_LE,
		TokenType.OP_GE,
		TokenType.OP_AND,
		TokenType.OP_OR,
		TokenType.OP_NOT,
		TokenType.OP_ASSIGN
	],
	[TokenGroup.QUOTED]: [
		TokenType.SINGLE_QUOTED,
		TokenType.DOUBLE_QUOTED,
		TokenType.ANSI_C_QUOTED,
		TokenType.LOCALE_QUOTED,
		TokenType.QUOTED_PART
	],
	[TokenGroup.REDIRECTION]: [
		TokenType.REDIR_IN,
		TokenType.REDIR_OUT,
		TokenType.REDIR_APPEND,
		TokenType.REDIR_HEREDOC,
		TokenType.REDIR_HEREDOC_STRIP,
		TokenType.REDIR_DUP_INPUT,
		TokenType.REDIR_DUP_OUTPUT,
		TokenType.REDIR_READ_WRITE,
		TokenType.HERE_STRING
	],
	[TokenGroup.RESERVED_WORD]: [
		TokenType.IF,
		TokenType.THEN,
		TokenType.ELSE,
		TokenType.ELIF,
		TokenType.FI,
		TokenType.FOR,
		TokenType.WHILE,
		TokenType.UNTIL,
		TokenType.DO,
		TokenType.DONE,
		TokenType.CASE,
		TokenType.IN,
		TokenType.ESAC,
		TokenType.FUNCTION,
		TokenType.SELECT,
		TokenType.TIME,
		TokenType.COPROC,
		TokenType.EXPORT,
		TokenType.DECLARE,
		TokenType.LOCAL,
		TokenType.READONLY
	],
	[TokenGroup.SUBSHELL]: [
		TokenType.SUBSHELL_START,
		TokenType.SUBSHELL_END
	],
	[TokenGroup.WHITESPACE]: [
		TokenType.NEWLINE,
		TokenType.LINE_CONTINUATION,
		TokenType.WHITESPACE
	],
	[TokenGroup.WORD]: [
		TokenType.ASSIGNMENT_WORD,
		TokenType.WORD,
		TokenType.WORD_PIECE
	]
}));

class User {
	
	/** @type {Map<String,String>} */
	env;
	
	/** @type {String} */
	fullname;
	
	/** @type {Number} */
	gid;
	
	/** @type {String} */
	group;
	
	/** @type {String} */
	home;
	
	/** @type {Password} */
	password;
	
	/** @type {String} */
	privilege; // superuser|user
	
	/** @type {String} */
	shell;
	
	/** @type {Number} */
	uid;
	
	/** @type {String} */
	username;
	
	/**
	 * Construct method of class User
	 * 
	 * @param {Map<String,String>} env
	 * @param {String} fullname
	 * @param {Number} gid
	 * @param {String} group
	 * @param {String} home
	 * @param {?Password|String} password
	 * @param {String} privilege
	 * @param {String} shell
	 * @param {Number} uid
	 * @param {String} username
	 * 
	 */
	constructor( env, fullname, gid, group, home, password, privilege, shell, uid, username ) {
		this.env = Object.assign( new Map(), env || {}, {
			HOME: home,
			SHELL: shell,
			PATH: "/bin:/usr/bin",
			PWD: home,
			USER: username
		});
		this.fullname = fullname;
		this.gid = gid;
		this.group = group;
		this.home = home;
		this.password = password;
		if( Typed( password, [ "Null", "String", "Undefined" ] ) ) {
			this.password = new Password( username, { chipertext: password } );
		}
		this.privilege = privilege;
		this.shell = shell;
		this.uid = uid;
		this.username = username;
	}
	
	/**
	 * Return whether user is allowed to execute virtual node
	 * 
	 * @param {VirtualNode} vnode
	 * 
	 * @returns {Boolean}
	 */
	executable( vnode ) {
		if (this.root()) return true;
		if (vnode.uid === this.uid) return (vnode.mode & 0o100) !== 0;
		if (vnode.gid === this.gid) return (vnode.mode & 0o010) !== 0;
		return (vnode.mode & 0o001) !== 0;
	}
	
	/**
	 * Return whether user is allowed to read virtual node
	 * 
	 * @param {VirtualNode} vnode
	 * 
	 * @returns {Boolean}
	 */
	readable( vnode ) {
		if( this.root()) return true;
		if( vnode.uid === this.uid) return (vnode.mode & 0o400) !== 0;
		if( vnode.gid === this.gid) return (vnode.mode & 0o040) !== 0;
		return (vnode.mode & 0o004) !== 0;
	}
	
	/**
	 * Return whether current user is root
	 * 
	 * @returns {Boolean}
	 * 
	 */
	root() {
		return this.privilege.match( /^superuser$/ ) && this.uid === 0;
	}
	
	/**
	 * Returns a string representation of a User
	 * 
	 * @returns {String}
	 * 
	 */
	toString() {
		return Fmt( "{username}:x:{gid}:{uid}:{fullname}:{home}:{shell}", this );
	}
	
	/**
	 * Return whether user is allowed to write content into virtual node
	 * 
	 * @param {VirtualNode} vnode
	 * 
	 * @returns {Boolean}
	 */
	writeable( vnode ) {
		if (this.root()) return true;
		if (vnode.uid === this.uid) return (vnode.mode & 0o200) !== 0;
		if (vnode.gid === this.gid) return (vnode.mode & 0o020) !== 0;
		return (vnode.mode & 0o002) !== 0;
	}
	
}

class Root extends User {
	
	/**
	 * Construct method of class User
	 * 
	 * @param {?String} home
	 * @param {?String} shell
	 * 
	 */
	constructor( home, shell ) {
		super( {}, "Root", 0, "root", home || "/root", "root", "superuser", shell || "/usr/bin/bash", 0, "root" );
	}
	
}

class VirtualFileSystem {
	
	/** @type {String} */
	cwd;
	
	/** @type {Kernel} */
	kernel;
	
	/** @type {?String} */
	pk; // persist key
	
	/** @type {VirtualNode} */
	root;
	
	/** @type {Router} */
	router;
	
	/** @type {UnixTime} */
	time;
	
	/**
	 * Construct method of class VirtualFileSystem
	 * 
	 * @param {Kernel} kernel
	 * @param {?String} pk
	 * @param {?Router} router
	 * 
	 */
	constructor( kernel, pk, router ) {
		var structs = [
			"/bin>>/usr/bin",
			"/boot",
			"/data",
			"/dev",
			"/etc",
			"/etc/alternatives",
			"/etc/profile.d",
			"/home",
			"/media",
			"/proc",
			"/run",
			"/run/lock",
			"/sbin>>/usr/sbin",
			"/self",
			"/self/personal",
			"/tmp",
			"/usr",
			"/usr/bin",
			"/usr/lib",
			"/usr/lib32",
			"/usr/lib64",
			"/usr/local",
			"/usr/local/bin",
			"/usr/local/sbin",
			"/usr/local/share",
			"/usr/sbin",
			"/usr/share",
			"/var",
			"/var/lib",
			"/var/lock>>/run/lock",
			"/var/log",
			"/var/run>>/run"
		];
		var user = kernel.user();
		this.cwd = "/";
		this.kernel = kernel;
		this.pk = pk;
		this.router = router;
		this.time = new UnixTime();
		try {
			this.root = this.revive();
		}
		catch( e ) {
			this.root = new VirtualNode( this.time, user.gid, 0o755, "/", "path", user.uid, this.time, { contents: new Map() } );
			for( let struct of structs ) {
				var paths = struct.split( ">>" );
				this.mkdir( paths[0], { mode: 0o755, user: user } );
				if( paths.length >= 2 ) {
					var walk = this.walk( paths[0] );
					walk.contents = paths[1];
					walk.type = "link";
				}
			}
		}
	}
	
	/**
	 * 
	 * @param {String} filename
	 * @param {Object} options
	 * @param {Buffer|String} [options.contents]
	 * @param {User} [options.user]
	 *  Current user previlege
	 * 
	 * @throws {TypeError}
	 *  Throws whether permission denied or no such file or directory
	 * 
	 */
	append( filename, options={ contents: "", user: null } ) {
		var normalized = this.normalize( filename );
		var basename = this.basename( filename );
		var basepath = "/".concat( this.split( normalized ).slice( 0, -1 ).join( "/" ) );
		var contents = options.contents || "";
		var parent = this.walk( basepath );
		var user = options.user;
		if( user.writeable( parent ) ) {
			if( parent.type === "file" ) {
				throw new TypeError( Fmt( "{}: not a directory", basepath ) );
			}
			var file = parent.contents.get( basename );
			if( file ) {
				if( user.writeable( file ) === false ) {
					throw new TypeError( Fmt( "{}: permission denied", filename ) );
				}
				if( file.type !== "file" ) {
					throw new TypeError( Fmt( "{}: is a directory", filename ) );
				}
				if( Typed( file.contents, String ) ) {
					if( Typed( contents, String ) === false ) {
						contents = contents.toString( "utf-8" );
					}
					file.contents+= contents;
				}
				else {
					if( Typed( contents, String ) === false ) {
						contents = Buffer.from( contents );
					}
					file.contents = Buffer.concat([ file.contents, contents ]);
				}
				file.utime = new UnixTime();
			}
			else {
				file = new VirtualNode( null, user.gid, options.mode ?? parent.mode ?? 0o666, basename, "file", user.uid, null, { contents: contents } );
				parent.contents.set( basename, file );
			}
			this.persist();
		}
		else {
			throw new TypeError( Fmt( "{}: permission denied", basepath ) );
		}
	}
	
	/**
	 * Returns basename of pathname
	 * 
	 * @param {String} pathname
	 * 
	 * @returns {String}
	 * 
	 */
	basename( pathname ) {
		return pathname.split( "/" ).at( -1 );
	}
	
	/**
	 * 
	 * @param {Object} object
	 * @param {Map<String,Object>|Function|String} [object.contents]
	 * @param {UnixTime} [object.ctime]
	 * @param {Number} [object.gid]
	 * @param {Number} [object.mode]
	 * @param {String} [object.name]
	 * @param {Object} [object.options]
	 * @param {Boolean} [object.scripting]
	 * @param {String} [object.type]
	 * @param {Number} [object.uid]
	 * @param {UnixTime} [object.utime]
	 * 
	 * @returns {VirtualNode}
	 * 
	 */
	builder( object={} ) {
		var contents = object.contents;
		if( object.scripting ?? false ) {
			console.warn( "unallowed to transform JavaScript contents into executable code" );
		}
		if( Typed( contents, Object ) ) {
			if( contents?.type === "Buffer" && contents?.data ) {
				contents = Buffer.from( contents.data );
			}
			else {
				contents = new Map();
				for( let keyset of Object.keys( object.contents ) ) {
					contents.set( keyset, this.builder( object.contents[keyset] ) );
				}
			}
		}
		var ctime = new UnixTime();
		if( object?.ctime?.date ) {
			ctime = new UnixTime( Date.parse( object.ctime.date ) );
		}
		var utime = new UnixTime();
		if( object?.utime?.date ) {
			utime = new UnixTime( Date.parse( object.utime.date ) );
		}
		return new VirtualNode( ctime, object.gid, object.mode, object.name, object.type, object.uid, utime, { contents: contents } );
	}
	
	/**
	 * Change the current working directory to DIR
	 * 
	 * @param {String} pathname
	 * @param {Object} options
	 * @param {User} [options.user]
	 * 
	 * @throws {TypeError}
	 *  Throws whether permission denied not pathname is not directory or link
	 * 
	 */
	cd( pathname, options={ user: null } ) {
		var real = this.normalize( pathname, this.cwd );
		var path = this.walk( pathname, this.cwd );
		if( path.type === "file" ) {
			throw new TypeError( Fmt( "{}: not a directory", real ) );
		}
		var user = options.user;
		if( user.readable( path ) ) {
			if( this.router ) {
				this.router.push( "/terminal".concat( real ) );
			}
			this.cwd = real;
		}
		else {
			throw new TypeError( Fmt( "{}: permission denied", real ) );
		}
	}
	
	/**
	 * ...
	 * 
	 * @param {String} pathname
	 * @param {Object} options
	 * @param {Number|String|User} [options.group]
	 * @param {Boolean} [options.recursive]
	 * @param {User} [options.user]
	 * 
	 * @throws {TypeError} Throws whether group not found or permission denied
	 * 
	 */
	chgrp( pathname, options={ group: null, recursive: false, user: null } ) {
		var path = this.walk( pathname );
		var user = null;
		if( Typed( options.group, [ Number, String ] ) ) {
			for( let element of this.kernel.users.values() ) {
				if( ( Typed( options.group, Number ) && element.gid === options.group ) ||
					( Typed( options.group, String ) && element.username === options.group ) ) {
					user = element;
					break;
				}
			}
			if( user === null ) {
				throw new TypeError( Fmt( "{}: group not found", options.group ) );
			}
		}
		else {
			user = options.group;
		}
		if( options.user.root() === false ||
			options.user.gid === user.gid ) {
			throw new TypeError( Fmt( "{}: user is not member of group {}", pathname, options.group ) );
		}
		path.gid = user.gid;
		if( path.type !== "file" && options?.recursive ) {
			for( let element of path.contents.values() ) {
				this.chgrp( pathname.concat( "/".concat( element.name ) ), options );
			}
		}
		this.persist();
	}
	
	/**
	 * 
	 * @param {String} pathname
	 * @param {Object} options
	 * @param {Number|String} [options.modes]
	 * @param {Boolean} [options.recursive]
	 * @param {User} [options.user]
	 * 
	 * @throws {TypeError} Throws whether permission denied
	 * 
	 */
	chmod( pathname, options={ modes: null, recursive: false, user: null } ) {
		var path = this.walk( pathname );
		var mode = this.mode( options.modes, path.mode );
		if( options.user.root() === false ||
			options.user.uid !== path.uid ) {
			throw new TypeError( Fmt( "{}: permission denied", pathname ) );
		}
		path.mode = mode;
		if( path.type !== "file" && options?.recursive ) {
			for( let element of path.contents.values() ) {
				this.chmod( pathname.concat( "/".concat( element.name ) ), options );
			}
		}
		this.persist();
	}
	
	/**
	 * 
	 * @param {String} pathname
	 * @param {Object} options
	 * @param {Number} [options.owner]
	 * @param {Boolean} [options.recursive]
	 * @param {User} [options.user]
	 * 
	 * @throws {TypeError} Throws whether owner not found or permission denied
	 * 
	 */
	chown( pathname, options={ owner: null, recursive: false, user: null } ) {
		var path = this.walk( pathname );
		var user = null;
		if( Typed( options.owner, [ Number, String ] ) ) {
			for( let element of this.kernel.users.values() ) {
				if( ( Typed( options.owner, Number ) && element.uid === options.owner ) ||
					( Typed( options.owner, String ) && element.username === options.owner ) ) {
					user = element;
					break;
				}
			}
			if( user === null ) {
				throw new TypeError( Fmt( "{}: owner not found", options.owner ) );
			}
		}
		else {
			user = options.owner;
		}
		if( options.user.root() === false ) {
			throw new TypeError( Fmt( "{}: permission denied", pathname ) );
		}
		path.uid = user.uid;
		if( path.type !== "file" && options?.recursive ) {
			for( let element of path.contents.values() ) {
				this.chown( pathname.concat( "/".concat( element.name ) ), options );
			}
		}
		this.persist();
	}
	
	/**
	 * Returns whether pathname is exists
	 * 
	 * @param {String} pathname
	 * 
	 * @returns {Boolean}
	 * 
	 */
	exists( pathname ) {
		try {
			this.walk( pathname );
		}
		catch( e ) {
			return false;
		}
		return true;
	}
	
	/**
	 * Returns whether pathname is directory type
	 * 
	 * @param {String} pathname
	 * 
	 * @returns {Boolean}
	 * 
	 */
	isdir( pathname ) {
		try {
			return this.walk( pathname, this.cwd ).type === "path";
		}
		catch( e ) {
		}
		return false;
	}
	
	/**
	 * Returns whether pathname is file type
	 * 
	 * @param {String} pathname
	 * 
	 * @returns {Boolean}
	 * 
	 */
	isfile( pathname ) {
		try {
			return this.walk( pathname, this.cwd ).type === "file";
		}
		catch( e ) {
		}
		return false;
	}
	
	/**
	 * Returns whether pathname is link
	 * 
	 * @param {String} pathname
	 * 
	 * @returns {Boolean}
	 * 
	 */
	islink( pathname ) {
		try {
			return this.walk( pathname, this.cwd, { follow: false } ).type === "link";
		}
		catch( e ) {
		}
		return false;
	}
	
	/**
	 * 
	 * @param {String} pathname
	 * @param {Object} options
	 * @param {User} [options.user]
	 * 
	 * @returns {Array<VirtualNode>|VirtualNode}
	 * 
	 * @throws {TypeError} Throws whether permission denied
	 * 
	 */
	ls( pathname, options={ user: null } ) {
		var path = this.walk( pathname );
		var user = options.user;
		if( user.readable( path ) ) {
			if( path.type !== "file" &&
				pathname.endsWith( "/" ) ) {
				return Array.from( path.contents.values() ).map( entry => entry.copy() );
			}
			return path.copy();
		}
		throw new TypeError( Fmt( "{}: permission denied", this.normalize( pathname ) ) );
	}
	
	/**
	 * Creates a new directory at the specified path
	 * 
	 * This method is used to create directories recursively if needed,
	 * with additional options to specify the user context to be
	 * used when creating the directory.
	 * 
	 * @param {String} pathname
	 *  Full path of the directory to be created
	 * @param {Object} options
	 *  Additional options for directory configuration
	 * @param {Number} [options.mode]
	 *  Directory permission mode
	 * @param {User} [options.user]
	 *  Current user previlege
	 * 
	 * @throws {TypeError}
	 *  Throws whether directory creation fails due to
	 *  permissions or other system errors
	 * 
	 */
	mkdir( pathname, options={} ) {
		var normalized = this.normalize( pathname );
		if( normalized !== "/" ) {
			var passed = "";
			var parent = this.root;
			var parts = this.split( normalized );
			var time = new UnixTime();
			var user = options.user;
			for( let i=0; i<parts.length; i++ ) {
				var part = parts[i];
				if( parent.type === "file" ) {
					throw new TypeError( Fmt( "{}: not a directory", passed || "/" ) );
				}
				if( parent.type === "link" ) {
					passed+= "/".concat( part );
					parent = this.root();
					parts = [ ...this.split( parent.contents, passed ), ...parts.slice( i ) ];
					i = 0;
				}
				else {
					if( parent.contents.has( part ) === false ) {
						if( user.writeable( parent ) ) {
							parent.contents.set( part, new VirtualNode( time, user.gid, options.mode ?? 0o700, part, "path", user.uid, time, { contents: new Map() } ) );
						}
						else {
							throw new TypeError( Fmt( "{}: permission denied", passed || "/" ) );
						}
					}
					passed+= "/".concat( part );
					parent = parent.contents.get( part );
				}
			}
		}
		this.persist();
	}
	
	/**
	 * Returns new mode which is the result of applying the change
	 * if baseMode is provided, or absoluteMode if mode is octal.
	 * 
	 * @param {Number|String} mode
	 *  Accepts octal string or symbolic numbers (u,g,o,a +/- rwx [, ...])
	 * @param {Number} base
	 * 
	 * @returns {Number}
	 * 
	 * @throws {TypeError}
	 *  Throws whether mode is null, or symbolic mode require base mode,
	 *  and whether invalid symbolic mode passed.
	 * 
	 */
	mode( mode, base=null ) {
		if( mode === null ) throw new TypeError( "mode required" );
		if( Typed( mode, String ) ) {
			var normalized = String( mode ).trim();
			if( base === null ) {
				throw new TypeError( Fmt( "{}: symbolic mode requires baseMode", normalized ) );
			}
			
			// oktal: ^0?[0-7]{3,4}$
			if( /^0?[0-7]{3,4}$/.test( normalized ) ) {
				
				// parse as absolute octal
				return parseInt( normalized, 8 ) & 0o7777;
			}
			
			// symbolic: comma separated operations
			// example: u+r,g-w,o+x, a=rw
			let octal = base & 0o7777;
			
			const whoMap = { u: 0o700, g: 0o070, o: 0o007, a: 0o777 };
			const permMap = { r: 4, w: 2, x: 1 };
			
			const ops = normalized.split(",");
			for (const op of ops) {
				const m = op.match(/^([ugoa]*)([+=-])([rwx]+)$/);
				if (!m) throw new TypeError("invalid symbolic mode: " + op);
				let [, who, operator, perms] = m;
				if (!who) who = "a";
				// compute permission bits to affect (for u/g/o)
				let mask = 0;
				for (const c of who) {
					if (c === "u") mask |= 0o700;
					if (c === "g") mask |= 0o070;
					if (c === "o") mask |= 0o007;
					if (c === "a") mask |= 0o777;
				}
				// compute perm bits relative positions
				let permBits = 0;
				for (const p of perms) {
					const v = permMap[p]; // 4/2/1
					if (!v) continue;
					// apply for u/g/o: shift into positions
					// r: 0o400,0o040,0o004 -> pattern: base 0o444 => distributed by who mask
					// We'll apply by mapping each who to respective shifted bits.
					if (mask & 0o700) permBits |= ((v) << 6); // u
					if (mask & 0o070) permBits |= ((v) << 3); // g
					if (mask & 0o007) permBits |= (v);				// o
				}
				
				// But above double-counts if who includes multiple; instead compute per who separately:
				// Simpler approach: compute per who token
				let applied = 0;
				const whos = who.split("");
				for (const w of whos) {
					if (w === "u") {
						for (const p of perms) {
							const v = permMap[p];
							if (v === 4) applied |= 0o400;
							if (v === 2) applied |= 0o200;
							if (v === 1) applied |= 0o100;
						}
					} else if (w === "g") {
						for (const p of perms) {
							const v = permMap[p];
							if (v === 4) applied |= 0o040;
							if (v === 2) applied |= 0o020;
							if (v === 1) applied |= 0o010;
						}
					} else if (w === "o") {
						for (const p of perms) {
							const v = permMap[p];
							if (v === 4) applied |= 0o004;
							if (v === 2) applied |= 0o002;
							if (v === 1) applied |= 0o001;
						}
					} else if (w === "a") {
						for (const p of perms) {
							const v = permMap[p];
							if (v === 4) applied |= 0o444;
							if (v === 2) applied |= 0o222;
							if (v === 1) applied |= 0o111;
						}
					}
				}
				
				if (operator === "+") {
					octal = octal | applied;
				} else if (operator === "-") {
					octal = octal & (~applied);
				} else if (operator === "=") {
					// For '=' we need to clear previous for those who, then set
					// Build clear mask for selected who
					let clearMask = 0;
					const whos2 = who.split("");
					for (const w of whos2) {
						if (w === "u") clearMask |= 0o700;
						if (w === "g") clearMask |= 0o070;
						if (w === "o") clearMask |= 0o007;
						if (w === "a") clearMask |= 0o777;
					}
					// clear r/w/x bits under clearMask
					// compute bits representing r/w/x for those who
					let rwxClear = 0;
					if (clearMask & 0o700) rwxClear |= 0o700;
					if (clearMask & 0o070) rwxClear |= 0o070;
					if (clearMask & 0o007) rwxClear |= 0o007;
					octal = (octal & (~rwxClear)) | applied;
				}
			}
			return octal & 0o7777;
		}
		return mode & 0o7777;
	}	
	
	/**
	 * Normalize pathname
	 * 
	 * @param {String} pathname
	 * @param {?String} cwd
	 * 
	 * @returns {String}
	 * 
	 */
	normalize( pathname, cwd ) {
		if( isEmpty( cwd ) ) {
			cwd = this.cwd;
		}
		if( pathname.startsWith( "/" ) === false ) {
			pathname = cwd.concat( "/".concat( pathname ) );
		}
		var parts = this.split( pathname );
		var value = [];
		for( let part of parts ) {
			if( part === "." ) continue;
			if( part === ".." ) {
				value.pop();
				continue;
			}
			value.push( part );
		}
		return "/".concat( value.join( "/" ) );
	}
	
	persist() {
		if( this.pk ) {
			localStorage.setItem( bin2hex( this.pk ), JSON.stringify( this.root.object(), null , 4 ) );
		}
	}
	
	/**
	 * 
	 * @param {String} filename
	 * @param {Object} options
	 * @param {String} [options.encode]
	 *  Content encoding (Buffer only)
	 * @param {User} [options.user]
	 *  Current user previlege
	 * 
	 * @returns {String}
	 * 
	 * @throws {TypeError}
	 *  Throws whether permission denied or no such file or directory
	 * 
	 */
	read( filename, options={ encode: "utf-8", user: null } ) {
		var normalized = this.normalize( filename );
		var file = this.walk( normalized );
		var user = options.user;
		if( user.readable( file ) ) {
			if( file.type === "file" ) {
				if( Typed( file.contents, String ) ) {
					console.debug( file.contents );
					return new String( file.contents );
				}
				return file.contents.toString( options.encode || "utf-8" );
			}
			throw new TypeError( Fmt( "{}: not a file", normalized ) );
		}
		else {
			throw new TypeError( Fmt( "{}: permission denied", basepath ) );
		}
	}
	
	/**
	 * Returns resolved symbolic links or cannonical file names
	 * 
	 * @param {String} pathname
	 * @param {Object} options
	 * @param {User} [options.user]
	 * 
	 * @returns {?String}
	 * 
	 */
	readlink( pathname, options={} ) {
		var normalize = this.normalize( pathname, this.cwd );
		if( this.islink( pathname ) ) {
			var path = this.walk( pathname, this.cwd, { follow: false } );
			if( options.user.readable( path ) === false ) {
				throw new TypeError( Fmt( "{}: permission denied", normalize ) );
			}
			return this.normalize( path.contents, normalize );
		}
	}
	
	/**
	 * 
	 * @param {String} pathname 
	 * @param {Object} options
	 * @param {Boolean} [options.dir]
	 * @param {Boolean} [options.file]
	 * @param {Boolean} [options.recursive]
	 * @param {User} [options.user]
	 * 
	 * @throws {TypeError} Throws whether permission denied or directory is not empty
	 * 
	 */
	remove( pathname, options={} ) {
		var normalize = this.normalize( pathname, this.cwd );
		var filepath = this.walk( pathname );
		var basepath = this.walk( "/".concat( this.split( normalize ).slice( 0, -1 ).join( "/" ) ) );
		if( options.user.writeable( filepath ) ) {
			if( options?.dir && filepath.type !== "path" ) {
				throw new TypeError( Fmt( "{}: is not a directory", normalize ) );
			}
			if( options?.file && filepath.type === "path" ) {
				throw new TypeError( Fmt( "{}: is not a file", normalize ) );
			}
			if( filepath.type === "path" && filepath.contents.size >= 1 ) {
				if( options.recursive ?? false ) {
				}
				else {
					throw new TypeError( Fmt( "{}: directory is not empty", normalize ) );
				}
			}
			basepath.contents.delete( this.basename( normalize ) );
			this.persist();
		}
		else {
			throw new TypeError( Fmt( "{}: permission denied", normalize ) );
		}
	}
	
	revive() {
		if( this.pk ) {
			try {
				var item = localStorage.getItem( bin2hex( this.pk ) );
				if( item ) {
					return this.builder( JSON.parse( item ) );
				}
			}
			catch( e ) {
				console.error( e );
			}
		}
		throw new TypeError( "Failed revive root node" );
	}
	
	/**
	 * Split pathname
	 * 
	 * @param {String} pathname
	 * 
	 * @returns {Array<String>}
	 * 
	 */
	split( pathname ) {
		return pathname.split( "/" ).filter( Boolean );
	}
	
	/**
	 * 
	 * @param {String} pathname
	 * 
	 */
	stat( pathname ) {
		var walk = this.walk( pathname );
		return {
			ctime: walk.ctime,
			gid: walk.gid,
			mode: walk.mode,
			type: walk.type,
			uid: walk.uid,
			utime: walk.utime
		};
	}
	
	/**
	 * 
	 * @param {String} filename
	 * @param {Object} options
	 * @param {Number} [options.mode]
	 * @param {User} [options.user]
	 *  Current user previlege
	 * 
	 * @throws {TypeError}
	 *  Throws whether permission denied or no such file or directory
	 * 
	 */
	touch( filename, options={ user: null } ) {
		var normalized = this.normalize( filename );
		var basename = this.basename( filename );
		var basepath = "/".concat( this.split( normalized ).slice( 0, -1 ).join( "/" ) );
		var parent = this.walk( basepath );
		var user = options.user;
		if( user.writeable( parent ) ) {
			if( parent.type === "file" ) {
				throw new TypeError( Fmt( "{}: not a directory", basepath ) );
			}
			var file = parent.contents.get( basename );
			if( file ) {
				// Nothing happed here!
			}
			else {
				file = new VirtualNode( null, user.gid, options.mode ?? 0o666, basename, "file", user.uid, null, { contents: "" } );
				parent.contents.set( basename, file );
			}
			this.persist();
		}
		else {
			throw new TypeError( Fmt( "{}: permission denied", basepath ) );
		}
	}
	
	/**
	 * Returns VirtualNode by pathname
	 * 
	 * @param {String} pathname
	 * @param {String} cwd
	 * @param {Object} options
	 * @param {?Boolean} [options.follow]
	 *  Follow whether VirtualNode is symlink (default: true)
	 * 
	 * @returns {VirtualNode}
	 * 
	 */
	walk( pathname, cwd, options={} ) {
		if( isEmpty( cwd ) ) {
			cwd = this.cwd;
		}
		if( pathname === "/" ) {
			return this.root;
		}
		var follow = options.follow ?? true;
		var passed = "";
		var parts = this.split( this.normalize( pathname, cwd ) );
		var root = this.root;
		for( let i=0; i<parts.length; i++ ) {
			var part = parts[i];
			var path = root.contents.get( part );
			passed+= "/".concat( part );
			if( path ) {
				if( path.type === "file" ) {
					if( parts[i+1] ) {
						throw new TypeError( Fmt( "{}: not a directory", passed ) );
					}
				}
				if( path.type === "link" ) {
					if( follow ) {
						root = this.walk( path.contents, passed );
						continue;
					}
				}
				root = path;
				continue;
			}
			throw new TypeError( Fmt( "{}: no such file or directory", passed ) );
		}
		return root;
	}
	
	/**
	 * 
	 * @param {String} filename
	 * @param {Object} options
	 * @param {Buffer|String} [options.contents]
	 * @param {Number} [options.mode]
	 * @param {User} [options.user]
	 *  Current user previlege
	 * 
	 * @throws {TypeError}
	 *  Throws whether permission denied or no such file or directory
	 * 
	 */
	write( filename, options={ contents: "", mode: 0o666, user: null } ) {
		var normalized = this.normalize( filename );
		var basename = this.basename( filename );
		var basepath = "/".concat( this.split( normalized ).slice( 0, -1 ).join( "/" ) );
		var contents = options.contents || "";
		var parent = this.walk( basepath );
		var user = options.user;
		if( user.writeable( parent ) ) {
			if( parent.type === "file" ) {
				throw new TypeError( Fmt( "{}: not a directory", basepath ) );
			}
			var file = parent.contents.get( basename );
			if( file ) {
				if( user.writeable( file ) === false ) {
					throw new TypeError( Fmt( "{}: permission denied", filename ) );
				}
				if( file.type !== "file" ) {
					throw new TypeError( Fmt( "{}: is a directory", filename ) );
				}
				file.contents = contents;
				file.utime = new UnixTime();
			}
			else {
				file = new VirtualNode( null, user.gid, options.mode ?? parent.mode ?? 0o666, basename, "file", user.uid, null, { contents: contents } );
				parent.contents.set( basename, file );
			}
			this.persist();
		}
		else {
			throw new TypeError( Fmt( "{}: permission denied", basepath ) );
		}
	}
	
}

class VirtualNode {
	
	/** @type {Buffer|Function|Map<String,VirtualNode>|String} */
	contents;
	
	/** @type {UnixTime} */
	ctime;
	
	/** @type {Number} */
	gid;
	
	/** @type {Number} */
	mode;
	
	/** @type {String} */
	name;
	
	/** @type {String} */
	type; // file|link|path
	
	/** @type {Number} */
	uid;
	
	/** @type {UnixTime} */
	utime;
	
	/**
	 * Construct method of class VirtualNode
	 * 
	 * @param {?UnixTime} ctime
	 * @param {Number} gid
	 * @param {Number} mode
	 * @param {String} name
	 * @param {String} type
	 * @param {Number} uid
	 * @param {?UnixTime} utime
	 * @param {Object} options
	 * @param {?Buffer|Function|Map<String,VirtualNode>|String} [options.contents]
	 * 
	 */
	constructor( ctime, gid, mode, name, type, uid, utime, options={} ) {
		this.contents = typeof options.contents !== "undefined" ? options.contents : ( type === "file" ? "" : ( type === "link" ? "" : {} ) );
		this.ctime = ctime || new UnixTime();
		this.gid = gid;
		this.mode = mode;
		this.name = name;
		this.type = type;
		this.uid = uid;
		this.utime = utime || new UnixTime();
	}
	
	/**
	 * Returns copied instance
	 * 
	 * This will include all content that is under the parent
	 * 
	 * @returns {VirtualNode}
	 * 
	 */
	copy() {
		var contents = this.contents;
		if( this.type === "path" ) {
			contents = new Map();
			for( let keyset of this.contents.keys() ) {
				contents.set( keyset, this.contents.get( keyset ).copy() );
			}
		}
		return new VirtualNode( this.ctime, this.gid, this.mode, this.name, this.type, this.uid, this.utime, { contents: contents } );
	}
	
	/**
	 * Returns object representation
	 * 
	 * @returns {Object}
	 * 
	 */
	object() {
		var contents = this.contents;
		var scripting = false;
		if( this.type === "file" ) {
			if( contents instanceof Buffer ) {
			}
			if( contents instanceof Function ) {
				contents = contents.toString();
				scripting = true;
			}
		}
		if( this.type === "path" ) {
			contents = {};
			for( let keyset of this.contents.keys() ) {
				contents[keyset] = this.contents.get( keyset ).object();
			}
		}
		return {
			contents: contents,
			ctime: this.ctime,
			gid: this.gid,
			mode: this.mode,
			name: this.name,
			scripting: scripting,
			type: this.type,
			uid: this.uid,
			utime: this.utime
		};
	}
	
	/**
	 * Returns pathname
	 * 
	 * @returns {String}
	 * 
	 */
	qualified() {
		return this.name === "/" ? "/" : this.name;
	}
	
}

class VirtualNodeGroup extends VirtualNode {
	
	/** @type {Map<Number,Group>} */
	groups;
	
	/**
	 * Construct method of class VirtualNodePasswd
	 * 
	 * @param {Map<Number,Group>} groups
	 * 
	 * @throws {TypeError} Throws whether root group not found
	 * 
	 */
	constructor( groups ) {
		if( groups.has( 0 ) ) {
			super( null, 0, 0o644, "group", "file", 0, null, { contents: "" } );
			this.groups = groups;
			this.refresh();
		}
		else {
			throw new TypeError( "unable to instantiate group" );
		}
	}
	
	/** Refresh saved group information */
	refresh() {
		this.contents = Array.from( this.groups.values() ).join( "\x0a" );
		this.utime = new UnixTime();
	}
	
}

class VirtualNodePasswd extends VirtualNode {
	
	/** @type {Map<Number,User>} */
	users;
	
	/**
	 * Construct method of class VirtualNodePasswd
	 * 
	 * @param {Map<Number,User>} users
	 * 
	 * @throws {TypeError} Throws whether root user not found
	 * 
	 */
	constructor( users ) {
		if( users.has( 0 ) ) {
			var user = users.get( 0 );
			super( null, user.gid, 0o644, "passwd", "file", user.uid, null, { contents: "" } );
			this.users = users;
			this.refresh();
		}
		else {
			throw new TypeError( "unable to instantiate passwd" );
		}
	}
	
	/** Refresh saved user account information */
	refresh() {
		this.contents = Array.from( this.users.values() ).join( "\x0a" );
		this.utime = new UnixTime();
	}
	
}

class VirtualNodeShadow extends VirtualNode {
	
	/** @type {Map<Number,User>} */
	users;
	
	/**
	 * Construct method of class VirtualNodeShadow
	 * 
	 * @param {Map<Number,User>} users
	 * 
	 * @throws {TypeError} Throws whether root user not found
	 * 
	 */
	constructor( users ) {
		if( users.has( 0 ) ) {
			var user = users.get( 0 );
			super( null, user.gid, 0o640, "shadow", "file", user.uid, null, { contents: "" } );
			this.users = users;
			this.refresh();
		}
		else {
			throw new TypeError( "unable to instantiate shadow" );
		}
	}
	
	/** Refresh saved sensitive user account information */
	refresh() {
		this.contents = Array.from( this.users.values() ).map( user => user.password ).join( "\x0a" );
		this.utime = new UnixTime();
	}
	
}

class VirtualStream {
	
	/** @type {Array<String>} */
	buffer;
	
	/** @type {Boolean} */
	closed;
	
	/** @type {Map<String,Set<Function>>} */
	listeners;
	
	/** @type {String} */
	name;
	
	/**
	 * Construct method of class VirtualStream
	 * 
	 * @param {String} name
	 * @param {String} contents
	 * 
	 */
	constructor( name, contents ) {
		this.buffer = [];
		this.closed = false;
		this.listeners = new Map();
		this.listeners.set( "read", new Set() );
		this.listeners.set( "write", new Set() );
		this.name = name;
		if( isNotEmpty( contents ) ) {
			this.buffer.push( contents );
		}
	}
	
	/**
	 * Close virtual stream
	 * 
	 * @throws {TypeError} Throws whether stream has been closed
	 */
	close() {
		if( this.closed ) {
			throw new TypeError( Fmt( "{}: stream has been closed", this.name ) );
		}
		this.clear();
		this.closed = true;
		delete this.buffer;
	}
	
	/**
	 * Clear virtual stream buffer
	 * 
	 * @throws {TypeError} Throws whether stream has been closed
	 */
	clear() {
		if( this.closed ) {
			throw new TypeError( Fmt( "{}: unable to clear buffer on closed stream", this.name ) );
		}
		this.buffer = [];
	}
	
	/**
	 * Read virtual stream buffer
	 * 
	 * @param {Number} max
	 * 
	 * @returns {String}
	 * 
	 * @throws {TypeError} Throws whether stream has been closed
	 */
	read( max=-1 ) {
		if( this.closed ) {
			throw new TypeError( Fmt( "{}: unable to read buffer on closed stream", this.name ) );
		}
		let contents = this.buffer.slice( 0, max ).join( "" );
		this.buffer = this.buffer.slice( max, -1 );
		for( const listener of this.listeners.get( "read" ) ) {
			try {
				listener( contents );
			}
			catch( e ) {
				console.error( e );
			}
		}
		return contents;
	}
	
	/**
	 * Register stream listener
	 * 
	 * @param {String} event
	 * @param {Function} listener
	 * 
	 * @returns {never}
	 * 
	 * @throws {TypeError} Throws whether invalid event passed or stream has been closed
	 */
	register( event, listener ) {
		if( this.closed ) {
			throw new TypeError( Fmt( "{}: unable to add listener on closed stream", this.name ) );
		}
		if( this.listeners.has( event ) ) {
			this.listeners.get( event ).add( listener );
			return;
		}
		throw new TypeError( Fmt( "{}: unsupported event listener", event ) );
	}
	
	/**
	 * Write virtual stream buffer
	 * 
	 * @param {String} content
	 * 
	 * @throws {TypeError} Throws whether stream has been closed
	 */
	write( content ) {
		if( this.closed ) {
			throw new TypeError( Fmt( "{}: unable to write buffer on closed stream", this.name ) );
		}
		this.buffer.push( new String( content ) );
		for( const listener of this.listeners.get( "write" ) ) {
			try {
				listener( this.buffer.at( -1 ) );
			}
			catch( e ) {
				console.error( e );
			}
		}
	}
	
}

class Stderr extends VirtualStream {
	
	/**
	 * Construct method of class Stderr
	 * 
	 * @param {?String} contents
	 * 
	 */
	constructor( contents ) {
		super( "stderr", contents );
	}
	
}

class Stdin extends VirtualStream {
	
	/**
	 * Construct method of class Stdin
	 * 
	 * @param {?String} contents
	 * 
	 */
	constructor( contents ) {
		super( "stdin", contents );
	}
	
}

class Stdout extends VirtualStream {
	
	/**
	 * Construct method of class Stdout
	 * 
	 * @param {?String} contents
	 */
	constructor( contents ) {
		super( "stdout", contents );
	}
	
}

export {
	ANSI,
	Kernel,
	Lexer,
	Root,
	Shell,
	Stdin,
	Stderr,
	Stdout,
	Terminal,
	User,
	VirtualFileSystem,
	VirtualNode,
	VirtualStream
};
