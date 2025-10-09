
"use strict";

// Import Scripts
import Author from "/src/scripts/Author.js";
// import Banner from "/src/scripts/shells/Banner.js";
import Fmt from "/src/scripts/Fmt.js";
import UnixTime from "/src/scripts/UnixTime.js";
// import Directory from "/src/scripts/shells/Directory.js";
// import Helper from "/src/scripts/shells/Helper.js"
import Mapper from "/src/scripts/Mapper.js";
// import Router from "/src/routing/router.js";
import Type from "/src/scripts/Type.js";
import Value from "/src/scripts/logics/Value.js";


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
	 * Transform instance into String
	 * 
	 * @returns {String}
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
			if( Type( match.groups, Object ) ) {
				// Get all group names.
				var groups = Object.keys( match.groups );
				var group = null;
				
				for( let i in groups ) {
					group = groups[i];
					if( Type( patterns[groups[i]], Object ) &&
						Type( match.groups[groups[i]], String ) ) {
						// escape = patterns[group].styling;
						break;
					}
				}
				var chars = match.groups[group];
				var color = patterns[group].styling;
				if( Type( patterns[group].handler, [ Function, "handler", Object ] ) ) {
					if( Type( patterns[group].handler, Object ) ) {
						var regexps = [];
						for( let i in patterns[group].handler ) {
							if( Type( patterns[group].handler[i], Window ) ) {
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
								result += chars.substring( reindex, pattern.lastIndex - rematch[0].length );
								result += Fmt( "<span style=\"color: {}\" data-group=\"{}\">{}</span>", color, group, handler( rematch, color, patterns[group].handler ) );
								reindex = pattern.lastIndex;
							}
							chars = result + chars.substring( reindex );
						}
					}
					else {
						chars = patterns[group].handler( chars );
					}
				}
				if( Type( patterns[group].rematch, Array ) ) {
					var result = "";
					var reindex = 0;
					var rematch = null;
					var pattern = new RegExp( Fmt( "(?:{})", patterns[group].rematch.map( r => patterns[r].pattern ).join( "|" ) ), "gms" );
					while( ( rematch = pattern.exec( chars ) ) !== null ) {
						result += chars.substring( reindex, pattern.lastIndex - rematch[0].length );
						result += handler( rematch, color, patterns );
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
		var string = Type( string, String, () => string, () => "" );
		var pattern = new RegExp( Fmt( "(?:{})", Object.values( Mapper( patterns, ( i, k, val ) => val.pattern ) ).join( "|" ) ), "gms" );
		while( ( match = pattern.exec( string ) ) !== null ) {
			result += string.substring( index, pattern.lastIndex - match[0].length );
			result += Fmt( "<span style=\"color: {}\" data-group=\"{}\">{}</span>", escape, "captured", handler( match, escape, patterns ) );
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
			if( Type( matches.groups.text, String ) ) {
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
	
	/** @type {String} */
	hostname;
	
	/** @type {Number} */
	pc; // pid counter
	
	/** @type {Root} */
	root;
	
	/** @type {Router} */
	router;
	
	/** @type {Map<Number,ProgramMetadata>} */
	table;
	
	/** @type {Map<Number,User>} */
	users;
	
	/** @type {Number} */
	uid;
	
	/** @type {VirtualFileSystem} */
	vfs;
	
	/**
	 * Construct method of class Kernel
	 * 
	 * @param {Router} router 
	 * 
	 */
	constructor( router ) {
		this.hostname = window?.location?.host?.split( "\x3a" )[0] ?? "hxari";
		this.pc = 100;
		this.root = new Root();
		this.router = router;
		this.table = new Map();
		this.users = new Map();
		this.users.set( this.root.uid, this.root );
		this.users.set( 1001, new User( {}, "hxAri", 1001, "hxari", "/home/hxari", "hxari", "user", "/usr/bin/bash", 1001, "hxari" ) );
		this.uid = this.root.uid;
		this.vfs = new VirtualFileSystem( this.hostname, this.root );
	}
	
	/** 
	 * Returns allocate program id
	 * 
	 * @returns {Number}
	 * 
	 */
	allocate() {
		return ++this.pc;
	}
	
	/**
	 * Kill specific program by process id
	 * 
	 * @param {Number} pid 
	 * 
	 * @returns {void}
	 * 
	 * @throws {TypeError} Throws whether pid not found
	 */
	kill( pid ) {
		if( this.table.has( pid ) ) {
			this.table[pid].exit = 1;
			this.table[pid].state = "killed";
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
		const pid = this.allocate();
		this.table.set( pid, metadata );
		this.table.get( pid ).pid;
		return pid;
	}
	
	/**
	 * Spawn new program
	 * 
	 * @param {Function} program 
	 * @param {Array<String>} args 
	 * @param {Map<String,Object>} options 
	 * 
	 * @returns {History}
	 */
	async spawn( program, args=[], options={} ) {
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
			const context = Object.assign( new Map(), options.env || {}, { kernel: this, shell: options.shell || null, stderr, stdin,  stdout });
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
			if( user.username.match( username ) ) {
				this.uid = user.uid;
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
	 */
	user() {
		return this.users.get( this.uid );
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
	
	/** @type {Array<String>} */
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

	reset() {
		this.input = "";
		this.position = 0;
		this.length = 0;
		this.tokens = [];
		this.line = 1;
		this.column = 1;
		this.currentFirstWordPending = true;
	}

	/**
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
				this.consumeChar();
				this.push(new Token(TokenGroup.WHITESPACE, "\n", [], position, TokenType.NEWLINE));
				this.currentFirstWordPending = true;
				this.line++;
				this.column = 1;
				continue;
			}

			// skip whitespace (non-newline)
			if (this.isWhitespace(ch)) {
				this.consumeChar();
				continue;
			}

			// comment
			if (ch === '#' && this.commentIsValid()) {
				this.readComment();
				this.currentFirstWordPending = true;
				continue;
			}

			// operators / redirections / control operators
			if (this.isOperatorStart(ch)) {
				if ((ch === '<' || ch === '>') && this.peekAhead(1) === '(') {
					// process substitution as a word piece
					const proc = this.readProcessSubstitution();
					this.pushWordPiece(proc);
					continue;
				}
				const opTok = this.readOperatorOrRedir();
				this.push(opTok);
				// if operator is delimiter, next word is first word
				if (this.isCommandDelimiter(opTok.lexeme)) {
					this.currentFirstWordPending = true;
				}
				continue;
			}

			// line continuation backslash-newline
			if (ch === '\\' && this.peekAhead(1) === '\n') {
				this.consumeChar(); // '\'
				this.consumeChar(); // '\n'
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
				const piece = this.readQuotedOrDollarQuote();
				this.pushWordPiece(piece);
				continue;
			}

			// substitution/variable/arithmetic/backtick
			if (ch === '$' || ch === '`') {
				const piece = this.readDollarOrBacktick();
				this.pushWordPiece(piece);
				continue;
			}

			// redundant check for process substitution start (kept parity with original)
			if ((ch === '<' || ch === '>') && this.peekAhead(1) === '(') {
				const proc = this.readProcessSubstitution();
				this.pushWordPiece(proc);
				continue;
			}

			// here-string <<< special case
			if (ch === '<' && this.peekAhead(1) === '<' && this.peekAhead(2) === '<') {
				const t = this.readOperatorOrRedir(); // will capture '<<<'
				this.push(t);
				this.currentFirstWordPending = false;
				continue;
			}

			// default: word piece
			const wordPiece = this.readWordPiece();
			this.pushWordPiece(wordPiece);
		}

		// merge pieces into WORD tokens, process heredocs
		return this.mergeWordPieces(this.tokens);
	}

	// ------------------------
	// Low-level helpers
	// ------------------------
	peek() {
		if (this.position >= this.length) return null;
		return this.input[this.position];
	}

	peekAhead(n) {
		const p = this.position + n;
		if (p >= this.length) return null;
		return this.input[p];
	}

	consumeChar() {
		const ch = this.peek();
		this.position++;
		this.column++;
		return ch;
	}

	push(token) {
		// keep as-is; debug logging removed to focus pada fungsional
		this.tokens.push(token);
	}

	isWhitespace(ch) {
		return ch === ' ' || ch === '\t' || ch === '\r' || ch === '\v' || ch === '\f';
	}

	commentIsValid() {
		// valid if at start, after whitespace/newline, or last non-space token is operator/redirection
		if (this.position === 0) return true;
		const prevChar = this.input[this.position - 1];
		if (prevChar === '\n' || this.isWhitespace(prevChar)) return true;
		const lastTok = this.lastNonSpaceToken();
		if (!lastTok) return true;
		// check grouped categories rather than legacy string names
		if (lastTok.grouped === TokenGroup.OPERATOR || lastTok.grouped === TokenGroup.REDIRECTION) return true;
		return false;
	}

	lastNonSpaceToken() {
		for (let i = this.tokens.length - 1; i >= 0; i--) {
			const t = this.tokens[i];
			if (t && t.typed !== TokenType.WHITESPACE) return t;
		}
		return null;
	}

	// ------------------------
	// Reading components
	// ------------------------
	readComment() {
		let position = this.position;
		let s = '';
		while (true) {
			const ch = this.peek();
			if (ch == null || ch === '\n') break;
			s += this.consumeChar();
		}
		if (s.length >= 3 && s[1] === "!") {
			this.push(new Token(TokenGroup.COMMENT, s, [], position, TokenType.SHEBANG));
		} else {
			this.push(new Token(TokenGroup.COMMENT, s, [], position, TokenType.COMMENT));
		}
	}

	isOperatorStart(ch) {
		return ch === '|' || ch === '&' || ch === ';' || ch === '<' || ch === '>' || ch === '(' || ch === ')';
	}

	isCommandDelimiter(op) {
		const delims = new Set([';', '&', '&&', '||', '|', '\n']);
		return delims.has(op);
	}

	readOperatorOrRedir() {
		let position = this.position;
		const start = this.consumeChar();
		let v = start;
		const a = this.peek();
		if (!a) return new Token(TokenGroup.OPERATOR, v, [], position, this.operatorTokenType(v));

		// combinations
		if ((start === '>' || start === '<') && a === '>') {
			v += this.consumeChar();
			if (this.peek() === '&') {
				v += this.consumeChar();
				return new Token(TokenGroup.OPERATOR, v, [], position, TokenType.REDIR_DUP_OUTPUT);
			}
			if (start === '>') return new Token(TokenGroup.OPERATOR, v, [], TokenType.REDIR_APPEND);
			return new Token(TokenGroup.OPERATOR, v, [], position, TokenType.LESS_GREATER);
		}

		if ((start === '>' || start === '<') && a === '&') {
			v += this.consumeChar();
			if (start === '>') return new Token(TokenGroup.OPERATOR, v, [], position, TokenType.REDIR_DUP_OUTPUT);
			return new Token(TokenGroup.OPERATOR, v, [], TokenType.REDIR_DUP_INPUT);
		}

		if (start === '<' && a === '<') {
			v += this.consumeChar();
			if (this.peek() === '-') {
				v += this.consumeChar();
				return new Token(TokenGroup.OPERATOR, v, [], position, TokenType.REDIR_HEREDOC_STRIP);
			}
			if (this.peek() === '<') {
				v += this.consumeChar();
				return new Token(TokenGroup.OPERATOR, v, [], position, TokenType.HERE_STRING);
			}
			return new Token(TokenGroup.OPERATOR, v, [], position, TokenType.REDIR_HEREDOC);
		}

		if ((start === '|' || start === '&') && a === start) {
			v += this.consumeChar();
			return new Token(TokenGroup.OPERATOR, v, [], position, start === '|' ? TokenType.DOUBLE_PIPE : TokenType.DOUBLE_AMPERSAND);
		}

		if (start === '|' && a === '&') {
			v += this.consumeChar();
			return new Token(TokenGroup.OPERATOR, v, [], position, TokenType.PIPE_AND);
		}

		if (start === ';' && a === ';') {
			v += this.consumeChar();
			if (this.peek() === '&') {
				v += this.consumeChar();
				return new Token(TokenGroup.OPERATOR, v, [], position, TokenType.SEMI_SEMI_AMP);
			}
			return new Token(TokenGroup.OPERATOR, v, [], position, TokenType.SEMI_SEMI);
		}

		// parentheses single tokens
		if (start === '(') return new Token(TokenGroup.OPERATOR, v, [], position, TokenType.SUBSHELL_START);
		if (start === ')') return new Token(TokenGroup.OPERATOR, v, [], position, TokenType.SUBSHELL_END);

		switch (start) {
			case '|': return new Token(TokenGroup.OPERATOR, v, [], position, TokenType.PIPE);
			case '&': return new Token(TokenGroup.OPERATOR, v, [], position, TokenType.AMPERSAND);
			case ';': return new Token(TokenGroup.OPERATOR, v, [], position, TokenType.SEMICOLON);
			case '<': return new Token(TokenGroup.OPERATOR, v, [], position, TokenType.REDIR_IN);
			case '>': return new Token(TokenGroup.OPERATOR, v, [], position, TokenType.REDIR_OUT);
		}

		return new Token(TokenGroup.MISC, v, [], position, TokenType.UNKNOWN);
	}

	operatorTokenType(opChar) {
		if (opChar === '>') return TokenType.REDIR_OUT;
		if (opChar === '<') return TokenType.REDIR_IN;
		if (opChar === '|') return TokenType.PIPE;
		return TokenType.UNKNOWN;
	}

	// read a quoted piece or dollar-quote ($'..' or $"..")
	readQuotedOrDollarQuote() {
		let position = this.position;
		const ch = this.peek();
		if (ch === "'") return this.readSingleQuoted();
		if (ch === '"') return this.readDoubleQuoted();
		if (ch === '$' && this.peekAhead(1) === "'") return this.readAnsiCQuoted();
		if (ch === '$' && this.peekAhead(1) === '"') return this.readLocaleQuoted();
		if (ch === '$' && this.peekAhead(1) === '(') return this.readDollarOrBacktick();
		// fallback
		this.position++;
		return new Token(TokenGroup.WORD, "", [], position, TokenType.WORD_PIECE);
	}

	readSingleQuoted() {
		let position = this.position;
		this.consumeChar(); // skip '
		let v = '';
		while (true) {
			const ch = this.peek();
			if (ch == null) throw this.error("Unterminated single quote");
			if (ch === "'") { this.consumeChar(); break; }
			v += this.consumeChar();
		}
		return new Token(TokenGroup.QUOTED, v, [], position, TokenType.SINGLE_QUOTED);
	}

	readDoubleQuoted() {
		let position = this.position;
		this.consumeChar(); // skip "
		let v = '';
		const pieces = [];
		while (true) {
			const ch = this.peek();
			if (ch == null) throw this.error("Unterminated double quote");
			if (ch === '"') { this.consumeChar(); break; }
			if (ch === '\\') {
				this.consumeChar();
				const next = this.peek();
				if (next == null) break;
				if (next === '$' || next === '`' || next === '"' || next === '\\' || next === '\n') {
					v += this.consumeChar();
				} else {
					v += '\\' + this.consumeChar();
				}
				continue;
			}
			if (ch === '$') {
				if (v.length > 0) {
					pieces.push(new Token(TokenGroup.QUOTED, v, [], position, TokenType.DOUBLE_QUOTED));
					v = '';
				}
				const d = this.readDollarOrBacktick();
				pieces.push(d);
				continue;
			}
			v += this.consumeChar();
		}
		if (v.length > 0) pieces.push(new Token(TokenGroup.QUOTED, v, [], position, TokenType.DOUBLE_QUOTED));
		if (pieces.length === 1) return pieces[0];
		// composite -> use TokenGroup.MISC with null lexeme per instruksi
		return new Token(TokenGroup.MISC, null, pieces, position, TokenType.COMPOSITE);
	}

	readAnsiCQuoted() {
		// $'...'
		let position = this.position;
		this.consumeChar(); // $
		this.consumeChar(); // '
		let v = '';
		while (true) {
			const ch = this.peek();
			if (ch == null) throw this.error("Unterminated ANSI-C quote");
			if (ch === "'") { this.consumeChar(); break; }
			if (ch === '\\') {
				this.consumeChar();
				v += this.readAnsiCEscape();
				continue;
			}
			v += this.consumeChar();
		}
		return new Token(TokenGroup.QUOTED, v, [], position, TokenType.ANSI_C_QUOTED);
	}

	readAnsiCEscape() {
		const c = this.consumeChar();
		if (c === 'n') return '\n';
		if (c === 't') return '\t';
		if (c === 'r') return '\r';
		if (c === '0') {
			let digs = '';
			for (let i = 0; i < 2 && /[0-7]/.test(this.peek()); i++) digs += this.consumeChar();
			const code = parseInt(digs, 8);
			return String.fromCharCode(code || 0);
		}
		if (c === 'x') {
			let hex = '';
			for (let i = 0; i < 2 && /[0-9A-Fa-f]/.test(this.peek()); i++) hex += this.consumeChar();
			return String.fromCharCode(parseInt(hex || '0', 16));
		}
		return c;
	}

	readLocaleQuoted() {
		// $"..." - similar to double quotes but different token type for parts
		let position = this.position;
		this.consumeChar(); // $
		this.consumeChar(); // "
		let v = '';
		const pieces = [];
		while (true) {
			const ch = this.peek();
			if (ch == null) throw this.error("Unterminated $\" quote");
			if (ch === '"') { this.consumeChar(); break; }
			if (ch === '\\') {
				this.consumeChar();
				const next = this.peek();
				if (next == null) break;
				if (next === '$' || next === '`' || next === '"' || next === '\\' || next === '\n') {
					v += this.consumeChar();
				} else {
					v += '\\' + this.consumeChar();
				}
				continue;
			}
			if (ch === '$') {
				if (v.length > 0) { pieces.push(new Token(TokenGroup.QUOTED, v, [], position, TokenType.LOCALE_QUOTED)); v = ''; }
				pieces.push(this.readDollarOrBacktick());
				continue;
			}
			v += this.consumeChar();
		}
		if (v.length > 0) pieces.push(new Token(TokenGroup.QUOTED, v, [], position, TokenType.LOCALE_QUOTED));
		if (pieces.length === 1) return pieces[0];
		return new Token(TokenGroup.MISC, null, pieces, position, TokenType.COMPOSITE);
	}

	readDollarOrBacktick() {
		let position = this.position;
		const ch = this.peek();
		if (ch === '`') {
			return this.readBacktick();
		}

		// starts with $
		this.consumeChar(); // skip $
		const next = this.peek();

		// parameter expansion ${...}
		if (next === '{') {
			this.consumeChar(); // skip {
			let body = '';
			let depth = 1;
			while (true) {
				const c = this.peek();
				if (c == null) throw this.error("Unterminated ${");
				if (c === '{') { depth++; body += this.consumeChar(); continue; }
				if (c === '}') { depth--; if (depth === 0) { this.consumeChar(); break; } else { body += this.consumeChar(); continue; } }
				body += this.consumeChar();
			}
			return new Token(TokenGroup.EXPANSION, body, [], position, TokenType.PARAM_EXPANSION);
		}

		// arithmetic $(( ... ))
		if (next === '(' && this.peekAhead(1) === '(') {
			this.consumeChar(); // (
			this.consumeChar(); // (
			let depth = 1;
			let body = '';
			while (true) {
				const c = this.peek();
				if (c == null) throw this.error("Unterminated $(( ");
				if (c === '(') { depth++; body += this.consumeChar(); continue; }
				if (c === ')') {
					if (this.peekAhead(1) === ')') {
						this.consumeChar(); // )
						this.consumeChar(); // )
						break;
					} else { body += this.consumeChar(); continue; }
				}
				body += this.consumeChar();
			}
			return new Token(TokenGroup.EXPANSION, body, [], position, TokenType.ARITHMETIC_EXPANSION);
		}

		// subshell $( ... )
		if (next === '(') {
			this.consumeChar(); // '('
			let depth = 1;
			let body = '';
			while (true) {
				const c = this.peek();
				if (c == null) throw this.error("Unterminated $( ");
				if (c === '(') { depth++; body += this.consumeChar(); continue; }
				if (c === ')') { depth--; if (depth === 0) { this.consumeChar(); break; } else { body += this.consumeChar(); continue; } }
				// nested quotes inside subshell handled conservatively: embed raw with delimiters
				if (c === "'" || c === '"') {
					const q = this.readQuotedOrDollarQuote();
					// q is Token instance; compare typed then embed lexeme or flatten children
					if (q.typed === TokenType.SINGLE_QUOTED) {
						body += `'${q.lexeme}'`;
						continue;
					}
					if (q.typed === TokenType.DOUBLE_QUOTED) {
						body += `"${q.lexeme}"`;
						continue;
					}
					if (q.typed === TokenType.ANSI_C_QUOTED || q.typed === TokenType.LOCALE_QUOTED) {
						// keep as original string form (no deep parsing)
						body += q.lexeme;
						continue;
					}
					// composite flatten
					if (q.typed === TokenType.COMPOSITE) {
						for (const p of q.pieces) body += (p.lexeme || '');
						continue;
					}
				}
				body += this.consumeChar();
			}
			return new Token(TokenGroup.EXPANSION, body, [], position, TokenType.COMMAND_SUBSTITUTION);
		}

		// variable name, positional or special
		if (next != null && /[A-Za-z0-9_@*!#?$\-]/.test(next)) {
			let name = '';
			while (this.peek() != null && /[A-Za-z0-9_@*!#?$\-]/.test(this.peek())) {
				name += this.consumeChar();
			}
			return new Token(TokenGroup.EXPANSION, name, [], position, TokenType.VARIABLE_EXPANSION);
		}

		// nothing matched: literal $
		return new Token(TokenGroup.WORD, "$", [], position, TokenType.WORD_PIECE);
	}

	readBacktick() {
		let position = this.position;
		this.consumeChar(); // skip `
		let body = '';
		while (true) {
			const ch = this.peek();
			if (ch == null) throw this.error("Unterminated backtick");
			if (ch === '`') { this.consumeChar(); break; }
			if (ch === '\\') {
				body += this.consumeChar();
				if (this.peek() != null) body += this.consumeChar();
				continue;
			}
			body += this.consumeChar();
		}
		return new Token(TokenGroup.EXPANSION, body, [], position, TokenType.BACKTICK);
	}

	readProcessSubstitution() {
		// consume <( or >(
		let position = this.position;
		const sign = this.consumeChar(); // '<' or '>'
		this.consumeChar(); // '('
		let depth = 1;
		let body = '';
		while (true) {
			const c = this.peek();
			if (c == null) throw this.error("Unterminated process substitution");
			if (c === '(') { depth++; body += this.consumeChar(); continue; }
			if (c === ')') { depth--; if (depth === 0) { this.consumeChar(); break; } else { body += this.consumeChar(); continue; } }
			body += this.consumeChar();
		}
		return new TokenProcessSubtitution(TokenGroup.EXPANSION, body, [], position, sign, TokenType.PROCESS_SUBSTITUTION);
	}

	readWordPiece() {
		let position = this.position;
		let s = '';
		while (true) {
			const ch = this.peek();
			if (ch == null) break;
			if (ch === '\n' || this.isWhitespace(ch) || this.isOperatorStart(ch)) break;

			if (ch === '\\') {
				this.consumeChar();
				const next = this.peek();
				if (next == null) break;
				s += this.consumeChar();
				continue;
			}

			if (ch === "'" || ch === '"') {
				const q = (ch === "'") ? this.readSingleQuoted() : this.readDoubleQuoted();
				// append quoted lexeme into current chunk (caller will treat as piece)
				if (q.typed === TokenType.SINGLE_QUOTED || q.typed === TokenType.DOUBLE_QUOTED) {
					s += q.lexeme;
					continue;
				}
			}

			// stop at $ to produce piece boundary
			if (ch === '$') break;

			// stop on process substitution start
			if ((ch === '<' || ch === '>') && this.peekAhead(1) === '(') break;

			s += this.consumeChar();
		}
		return new Token(TokenGroup.WORD, s, [], position, TokenType.WORD_PIECE);
	}

	// ------------------------
	// Token merging: compose sequences of pieces into WORD
	// ------------------------
	pushWordPiece(piece) {
		this.push(piece);
		this.currentFirstWordPending = false;
	}

	mergeWordPieces(tokens) {
		const out = [];
		let i = 0;
		while (i < tokens.length) {
			const t = tokens[i];
			// merge contiguous pieces that form a word
			if (this.isWordPieceToken(t)) {
				var position = 0;
				const pieces = [];
				while (i < tokens.length && this.isWordPieceToken(tokens[i])) {
					const p = tokens[i++];
					// if composite, flatten child pieces
					if (p.typed === TokenType.COMPOSITE) {
						for (const sp of p.pieces) pieces.push(sp);
						continue;
					}
					pieces.push(p);
				}
				if( pieces.length >= 1 ) {
					position = pieces[0].position;
				}
				// flatten to raw string using piece types
				const raw = pieces.map(p => {
					if (p.typed === TokenType.WORD_PIECE) return p.lexeme;
					if (p.typed === TokenType.SINGLE_QUOTED) return p.lexeme;
					if (p.typed === TokenType.DOUBLE_QUOTED) return p.lexeme;
					if (p.typed === TokenType.ANSI_C_QUOTED) return p.lexeme;
					if (p.typed === TokenType.LOCALE_QUOTED) return p.lexeme;
					if (p.typed === TokenType.VARIABLE_EXPANSION) return '$' + p.lexeme;
					if (p.typed === TokenType.PARAM_EXPANSION) return '${' + p.lexeme + '}';
					if (p.typed === TokenType.COMMAND_SUBSTITUTION) return '$(' + p.lexeme + ')';
					if (p.typed === TokenType.BACKTICK) return '`' + p.lexeme + '`';
					if (p.typed === TokenType.ARITHMETIC_EXPANSION) return '$((' + p.lexeme + '))';
					if (p.typed === TokenType.PROCESS_SUBSTITUTION) return (p.sign === '<' ? '<(' : '>(') + p.lexeme + ')';
					// fallback
					return p.lexeme || '';
				}).join('');

				const structured = pieces;
				const firstWordCandidate = raw.split(/\s+/)[0];
				const wordToken = new Token(TokenGroup.WORD, raw, structured, position, TokenType.WORD);
				if (this.currentFirstWordPending && this.reservedWords.has(firstWordCandidate)) {
					wordToken.reserved = true;
					this.currentFirstWordPending = false;
				} else {
					this.currentFirstWordPending = false;
				}
				out.push(wordToken);
				continue;
			}

			// passthrough: OP, REDIR, COMMENT, NEWLINE, EOF
			out.push(t);
			i++;
		}

		// detect heredoc starts and extract bodies
		return this.processHeredocs(out);
	}

	isWordPieceToken(t) {
		if (!t) return false;
		const ok = new Set([
			TokenType.WORD_PIECE,
			TokenType.SINGLE_QUOTED,
			TokenType.DOUBLE_QUOTED,
			TokenType.ANSI_C_QUOTED,
			TokenType.LOCALE_QUOTED,
			TokenType.VARIABLE_EXPANSION,
			TokenType.PARAM_EXPANSION,
			TokenType.COMMAND_SUBSTITUTION,
			TokenType.BACKTICK,
			TokenType.ARITHMETIC_EXPANSION,
			TokenType.PROCESS_SUBSTITUTION,
			TokenType.COMPOSITE
		]);
		return ok.has(t.typed);
	}
	
	/**
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
					var quoted = tokens[j].pieces.some( part =>
						part.typed === TokenType.SINGLE_QUOTED ||
						part.typed === TokenType.DOUBLE_QUOTED ||
						part.typed === TokenType.ANSI_C_QUOTED ||
						part.typed === TokenType.LOCALE_QUOTED
					);
					var position = tokens[j].position;
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
						throw new SyntaxError( "Unterminated heredoc string" );
					}
					i = u+1;
					continue;
				}
			}
			results.push( token );
		}
		return results;
		// const out = [];
		// for (let i = 0; i < tokens.length; i++) {
		// 	const tk = tokens[i];
		// 	out.push(tk);

		// 	if (tk.typed === TokenType.REDIR_HEREDOC || tk.typed === TokenType.REDIR_HEREDOC_STRIP) {
		// 		// next non-space token is delimiter word
		// 		let j = i + 1;
		// 		while (j < tokens.length && tokens[j].typed === TokenType.COMMENT) j++;
		// 		if (j >= tokens.length || tokens[j].typed !== TokenType.WORD) {
		// 			// malformed: skip
		// 			continue;
		// 		}
		// 		const delimTok = tokens[j];
		// 		var position = delimTok.position;
		// 		// check if delimiter contained quoted pieces
		// 		const quoted = delimTok.pieces.some(p =>
		// 			p.typed === TokenType.SINGLE_QUOTED ||
		// 			p.typed === TokenType.DOUBLE_QUOTED ||
		// 			p.typed === TokenType.ANSI_C_QUOTED ||
		// 			p.typed === TokenType.LOCALE_QUOTED
		// 		);
		// 		const delim = delimTok.lexeme;
		// 		// extract rest of input from current lexer position
		// 		const remainder = this.input.substring( this.input.indexOf( tk.lexeme ) + tk.lexeme.length + delim.length );
		// 		console.debug( "Remainder:\"", this.position, ":", remainder, "\"" );
		// 		const lines = remainder.split(/\n/g);
		// 		let bodyLines = [];
		// 		let found = false;
		// 		let compareLine = null;
		// 		for (let k = 0; k < lines.length; k++) {
		// 			let line = lines[k];
		// 			compareLine = line;
		// 			if (tk.typed === TokenType.REDIR_HEREDOC_STRIP ) {
		// 				compareLine = line.replace(/^\t+/, '');
		// 			}
		// 			if (compareLine === delim) {
		// 				// advance this.position by length up to and including delimiter line + newline
		// 				let advanceLen = 0;
		// 				for (let m = 0; m <= k; m++) {
		// 					advanceLen += lines[m].length;
		// 					advanceLen += 1; // account for newline split
		// 				}
		// 				this.position += advanceLen;
		// 				found = true;
		// 				break;
		// 			} else {
		// 				bodyLines.push(line);
		// 			}
		// 		}
		// 		const body = bodyLines.join('\n');
		// 		// push heredoc body token
		// 		out.push(new Token(TokenGroup.HEREDOC, delim, [], position, TokenType.HEREDOC_START ) );
		// 		out.push(new Token(TokenGroup.HEREDOC, body, [], position, TokenType.HEREDOC_BODY ) );
		// 		out.push(new Token(TokenGroup.HEREDOC, compareLine, [], position, TokenType.HEREDOC_END ) );
		// 		// continue loop (lexer position already advanced)
		// 	}
		// }
		// return out;
	}

	error(msg) {
		const e = new Error(`LexerError: ${msg} at line ${this.line}, col ${this.column}`);
		e.name = "LexerError";
		return e;
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
	
	/** @type {Map<String,Number|String>} */
	options;
	
	/** @type {Number} */
	pid;
	
	/** @type {UnixTime} */
	start;
	
	/** @type {String} */
	state; // exit|killed|running
	
	/**
	 * 
	 * Construct method of class ProgramMetadata
	 * 
	 * @param {Array<String>} args 
	 * @param {String} command 
	 * @param {Map<String,Number|String>} options 
	 * @param {Number} pid 
	 * @param {UnixTime} start 
	 * @param {String} state 
	 */
	constructor( args, command, options, pid, start, state ) {
		this.args = args;
		this.command = command;
		this.end = null;
		this.exit = null;
		this.options = options;
		this.pid = pid;
		this.start = start;
		this.state = state;
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
	 * @returns {void}
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
	 * @returns {Iterator<Array<String>>}
	 */
	tokenize( command ) {
		
	}
	
}

class Terminal {
	
	/** @type {Array<Array<String>} */
	aliases;
	
	/** @type {ANSI} */
	ansi;
	
	/** @type {?HTMLInputElement|HTMLTextAreaElement} */
	input;
	
	/** @type {Kernel} */
	kernel;
	
	/** @type {Router} */
	router;
	
	/** @type {Shell} */
	shell;
	
	/** @type {?HTMLDivElement} */
	output;
	
	/**
	 * Construct method of class Terminal
	 *
	 * @param {?HTMLInputElement|HTMLTextAreaElement} input
	 * @param {Router} router
	 * @param {?HTMLDivElement} output
	 * 
	 */
	constructor( input, router, output ) {
		this.aliases = [
			[
				"\x61\x64\x65\x6c\x69\x61",
				"\x65\x63\x68\x6f\x20\x2d\x65\x20\x22\x61\x64\x65\x6c\x69\x61\x3a\x20\x49\x20\x6e\x65\x76\x65\x72\x20\x65\x78\x70\x65\x63\x74\x65\x64\x20\x79\x6f\x75\x72\x20\x61\x72\x72\x69\x76\x61\x6c\x20\x62\x65\x66\x6f\x72\x65\x3b\x20\x49\x27\x6d\x20\x71\x75\x69\x74\x65\x20\x69\x6e\x74\x65\x72\x65\x73\x74\x65\x64\x20\x69\x6e\x20\x79\x6f\x75\x72\x20\x70\x65\x72\x73\x6f\x6e\x61\x6c\x69\x74\x79\x3b\x20\x59\x6f\x75\x27\x72\x65\x20\x61\x6c\x73\x6f\x20\x61\x20\x63\x72\x79\x65\x72\x2c\x20\x6c\x69\x6b\x65\x20\x74\x6f\x20\x65\x78\x70\x65\x72\x69\x6d\x65\x6e\x74\x20\x6c\x69\x6b\x65\x20\x62\x61\x6b\x69\x6e\x67\x20\x61\x6e\x64\x20\x63\x6f\x6f\x6b\x69\x6e\x67\x2c\x20\x6c\x6f\x76\x69\x6e\x67\x20\x61\x6e\x64\x20\x63\x61\x72\x69\x6e\x67\x20\x61\x62\x6f\x75\x74\x20\x65\x76\x65\x72\x79\x6f\x6e\x65\x27\x73\x20\x68\x65\x61\x6c\x74\x68\x2c\x20\x70\x72\x65\x66\x65\x72\x20\x77\x65\x61\x72\x69\x6e\x67\x20\x72\x6f\x62\x65\x73\x20\x70\x65\x72\x68\x61\x70\x73\x3f\x2c\x2e\x20\x41\x73\x20\x66\x61\x72\x20\x61\x73\x20\x49\x20\x63\x61\x6e\x20\x73\x65\x65\x2c\x20\x79\x6f\x75\x72\x20\x69\x6e\x74\x75\x69\x74\x69\x6f\x6e\x20\x69\x73\x20\x71\x75\x69\x74\x65\x20\x67\x6f\x6f\x64\x3b\x20\x49\x20\x68\x6f\x70\x65\x20\x79\x6f\x75\x72\x20\x61\x72\x72\x69\x76\x61\x6c\x20\x69\x73\x20\x74\x68\x65\x20\x6c\x61\x73\x74\x20\x66\x6f\x72\x20\x6d\x65\x22"
			],
			[
				"\x63\x68\x69\x6e\x74\x79\x61", 
				"\x65\x63\x68\x6f\x20\x2d\x65\x20\x22\x63\x68\x69\x6e\x74\x79\x61\x3a\x20\x59\x6f\x75\x20\x61\x72\x65\x20\x62\x65\x61\x75\x74\x69\x66\x75\x6c\x2c\x20\x63\x75\x74\x65\x2c\x20\x6b\x69\x6e\x64\x2c\x20\x77\x68\x69\x74\x65\x2c\x20\x72\x65\x64\x64\x69\x73\x68\x2c\x20\x73\x6d\x6f\x6f\x74\x68\x2c\x20\x73\x6f\x66\x74\x2c\x20\x62\x75\x74\x20\x61\x6c\x73\x6f\x20\x76\x65\x72\x79\x20\x61\x6e\x6e\x6f\x79\x69\x6e\x67\x3b\x20\x59\x6f\x75\x20\x6c\x69\x6b\x65\x20\x73\x6b\x79\x20\x62\x6c\x75\x65\x3b\x20\x41\x6e\x64\x20\x79\x6f\x75\x20\x6c\x69\x6b\x65\x20\x63\x6c\x65\x61\x72\x20\x73\x6f\x75\x70\x20\x77\x69\x74\x68\x20\x67\x72\x65\x65\x6e\x20\x73\x70\x69\x6e\x61\x63\x68\x3b\x20\x49\x20\x72\x65\x61\x6c\x6c\x79\x20\x72\x65\x61\x6c\x6c\x79\x20\x6c\x69\x6b\x65\x20\x79\x6f\x75\x20\x61\x6e\x64\x20\x77\x68\x69\x6c\x65\x20\x69\x20\x73\x74\x69\x6c\x20\x6c\x6f\x76\x65\x20\x79\x6f\x75\x2c\x20\x62\x75\x74\x20\x73\x6f\x20\x66\x61\x72\x20\x49\x20\x61\x6d\x20\x6d\x6f\x72\x65\x20\x64\x6f\x6d\x69\x6e\x61\x6e\x74\x20\x74\x68\x61\x6e\x20\x79\x6f\x75\x20\x61\x6e\x64\x20\x49\x20\x61\x6d\x20\x61\x6c\x73\x6f\x20\x64\x69\x73\x61\x70\x70\x6f\x69\x6e\x74\x65\x64\x20\x77\x69\x74\x68\x20\x79\x6f\x75\x72\x20\x61\x74\x74\x69\x74\x75\x64\x65\x2c\x20\x74\x74\x27\x73\x20\x6c\x69\x6b\x65\x20\x79\x6f\x75\x20\x64\x6f\x6e\x27\x74\x20\x6d\x61\x6b\x65\x20\x61\x6e\x79\x20\x65\x66\x66\x6f\x72\x74\x20\x61\x74\x20\x61\x6c\x6c\x20\x66\x6f\x72\x20\x6d\x65\x22"
			],
			[
				"\x6c\x69\x61\x6e\x61",
				"\x65\x63\x68\x6f\x20\x2d\x65\x20\x22\x6c\x69\x61\x6e\x61\x3a\x20\x52\x65\x6d\x65\x6d\x62\x65\x72\x2c\x20\x66\x61\x6c\x6c\x69\x6e\x67\x20\x69\x6e\x20\x6c\x6f\x76\x65\x20\x62\x65\x63\x61\x75\x73\x65\x20\x6f\x66\x20\x66\x61\x69\x74\x68\x20\x69\x73\x20\x6d\x75\x63\x68\x20\x6d\x6f\x72\x65\x20\x62\x65\x61\x75\x74\x69\x66\x75\x6c\x20\x74\x68\x61\x6e\x20\x66\x61\x6c\x6c\x69\x6e\x67\x20\x69\x6e\x20\x6c\x6f\x76\x65\x20\x62\x65\x63\x61\x75\x73\x65\x20\x6f\x66\x20\x6c\x75\x73\x74\x3b\x20\x59\x6f\x75\x20\x61\x72\x65\x20\x61\x20\x70\x65\x72\x73\x6f\x6e\x20\x77\x68\x6f\x20\x63\x72\x69\x65\x73\x20\x65\x61\x73\x69\x6c\x79\x20\x66\x6f\x72\x20\x6e\x6f\x20\x72\x65\x61\x73\x6f\x6e\x2c\x20\x62\x75\x74\x20\x49\x20\x6b\x6e\x6f\x77\x20\x79\x6f\x75\x20\x61\x72\x65\x20\x61\x6c\x73\x6f\x20\x74\x68\x65\x20\x6d\x6f\x73\x74\x20\x63\x68\x65\x65\x72\x66\x75\x6c\x20\x70\x65\x72\x73\x6f\x6e\x20\x49\x20\x6b\x6e\x6f\x77\x2e\x3b\x20\x49\x20\x73\x68\x6f\x75\x6c\x64\x20\x68\x61\x76\x65\x20\x75\x6e\x64\x65\x72\x73\x74\x6f\x6f\x64\x20\x79\x6f\x75\x72\x20\x63\x6f\x64\x65\x20\x66\x72\x6f\x6d\x20\x74\x68\x65\x20\x73\x74\x61\x72\x74\x3b\x20\x4f\x6e\x65\x20\x6d\x6f\x72\x65\x20\x74\x68\x69\x6e\x67\x2c\x20\x49\x20\x6d\x69\x73\x73\x20\x79\x6f\x75\x72\x20\x76\x6f\x69\x63\x65\x22"
			]
		];
		this.ansi = new ANSI();
		this.input = input;
		this.kernel = new Kernel( router );
		this.kernel.switch( "hxari" );
		this.router = router;
		this.shell = new Shell( this.kernel );
		this.output = output;
		for( const aliased of this.aliases ) {
			this.shell.aliases.set( aliased, new Alias( aliased[1], false, aliased[0], false ) )
		}
		// this.shell.execute( "echo -e \"Hello World!\" | grep -i \"Hello\"" )
		// 	.then( passed => console.info( Fmt( "execute-then: {}", passed ) ) )
		// 	.catch( error => console.error( Fmt( "execute-catch: {}", error ) ) )
		// 	.finally( passed => console.info( Fmt( "execute-finally: {}", passed ) ) );
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
			prompt += PS1.substring( index, regexp.lastIndex - match[0].length ) + value;
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
	
	/** @type {String} */
	sign; // read (<), write (>)
	
	/**
	 * Construct method of class Token
	 * 
	 * @param {TokenGroup} grouped 
	 * @param {String} lexeme 
	 * @param {Array<Token>} pieces 
	 * @param {Number} position 
	 * @param {String} sign
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
 * @property {String} AMPERSAND
 * @property {String} ANSI_C_QUOTED
 * @property {String} ARITHMETIC_EXPANSION
 * @property {String} ASSIGNMENT_WORD
 * @property {String} CASE
 * @property {String} COMMAND_SUBSTITUTION
 * @property {String} COMMENT
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
/**
 * @enum {string}
 * @description Defines all lexical token types recognized by the Bash-compatible lexer.
 * Each token represents a syntactic unit in a Bash command line.
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
	
	/** `coproc` — Starts a coprocess. Example: `coproc myproc { command; }` */
	COPROC: "COPROC",
	
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
		TokenType.COMMENT
	],
	[TokenGroup.EXPANSION]: [
		TokenType.VARIABLE_EXPANSION,
		TokenType.PARAM_EXPANSION,
		TokenType.COMMAND_SUBSTITUTION,
		TokenType.ARITHMETIC_EXPANSION,
		TokenType.PROCESS_SUBSTITUTION,
		TokenType.EXPANSION_OPERATOR
	],
	[TokenGroup.HEREDOC]: [
		TokenType.HEREDOC_START,
		TokenType.HEREDOC_DELIM,
		TokenType.HEREDOC_BODY,
		TokenType.HEREDOC_END
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
	
	/** @type {String} */
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
	 * @param {String} password
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
		if( this.root() ) {
			return true;
		}
		if( vnode.uid === this.uid ) {
			return vnode.mode && 0o100 !== 0;
		}
		if( vnode.gid === this.gid ) {
			return vnode.mode && 0o010 !== 0;
		}
		return vnode.mode && 0o001 !== 0;
	}
	
	/**
	 * Return whether user is allowed to read virtual node
	 * 
	 * @param {VirtualNode} vnode 
	 * 
	 * @returns {Boolean}
	 */
	readable( vnode ) {
		if( this.root() ) {
			return true;
		}
		if( vnode.uid === this.uid ) {
			return vnode.mode && 0o400 !== 0;
		}
		if( vnode.gid === this.gid ) {
			return vnode.mode && 0o040 !== 0;
		}
		return vnode.mode && 0o004 !== 0;
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
	 * Transform instance into String
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
		if( this.root() ) {
			return true;
		}
		if( vnode.uid === this.uid ) {
			return vnode.mode && 0o200 !== 0;
		}
		if( vnode.gid === this.gid ) {
			return vnode.mode && 0o020 !== 0;
		}
		return vnode.mode && 0o002 !== 0;
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
	
	/** @type {UnixTime} */
	datetime;
	
	/** @type {?String} */
	pk; // persist key
	
	/** @type {VirtualNode} */
	root;
	
	/**
	 * Construct method of class VirtualFileSystem
	 * 
	 * @param {?String} pk
	 * @param {Root} user
	 * 
	 */
	constructor( pk, user ) {
		const structs = [
			"/bin>>/usr/bin",
			"/boot",
			"/data",
			"/dev",
			"/dev/null",
			"/dev/random",
			"/dev/urandom",
			"/etc",
			"/etc/profile.d",
			"/home",
			"/media",
			"/proc",
			"/root",
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
		const options = {
			ctime: this.datetime,
			gid: user.gid, 
			mode: 0o644, 
			uid: user.uid, 
			utime: this.datetime
		};
		this.pk = pk;
		this.root = new VirtualNode( "root", "path", { ...options, contents: new Map() });
		for( const struct of structs ) {
			const exploded = struct.split( ">>" );
		}
	}
	
}

class VirtualNode {
	
	/** @type {Function|Map<String,VirtualNode>|String} */
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
	 * @param {UnixTime} ctime 
	 * @param {Number} gid 
	 * @param {Number} mode 
	 * @param {String} name 
	 * @param {String} type 
	 * @param {Number} uid 
	 * @param {UnixTime} utime 
	 * 
	 */
	constructor( ctime, gid, mode, name, type, uid, utime, options={} ) {
		this.ctime = ctime;
		this.gid = gid;
		this.mode = mode;
		this.name = name;
		this.type = type;
		this.uid = uid;
		this.utime = utime;
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
		if( Value.isNotEmpty( contents ) ) {
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
