
"use strict";

import { Buffer } from "buffer";
import Router from "../src/routing/router";
import { Terminal } from "../src/scripts/terminal";
import { test } from "vitest";


const terminal = new Terminal( null, Router, null );
const kernel = terminal.kernel;
const root = kernel.users.get( 0 );
const user = kernel.users.get( 1000 );


test( "VirtualFileSystem.cd", () => kernel.vfs.cd( user.home, { user: user } ) );
test( "VirtualFileSystem.ls", () => {
	var ls = kernel.vfs.ls( user.home, { user: user } );
	ls.contents = new Map();
	console.debug( "VirtualFileSystem.ls:", ls );
});
test( "VirtualFileSystem.mkdir", () => {
	kernel.vfs.mkdir( user.home, { user: root } );
	kernel.vfs.mkdir( user.home.concat( "/testing" ), { user: root } );
});
test( "VirtualFileSystem.chgrp", () => kernel.vfs.chgrp( user.home, { group: user.gid, user: kernel.root, recursive: true } ) );
test( "VirtualFileSystem.chmod", () => kernel.vfs.chmod( user.home, { modes: 0o700, user: kernel.root, recursive: true } ) );
test( "VirtualFileSystem.chown", () => kernel.vfs.chown( user.home, { owner: user.uid, user: kernel.root, recursive: true } ) );
test( "VirtualFileSystem.touch", () => {
});
test( "VirtualFileSystem.write:Buffer", () => {
	kernel.vfs.write( user.home.concat( "/testing/file-write-buffer" ), { 
		contents: Buffer.from([
			0x48,
			0x65,
			0x6c,
			0x6c,
			0x6f,
			0x20,
			0x57,
			0x6f,
			0x72,
			0x6c,
			0x64,
			0x21
		]), 
		user: user 
	});
});
test( "VirtualFileSystem.append:Buffer", () => {
	kernel.vfs.append( user.home.concat( "/testing/file-write-buffer" ), {
		contents: Buffer.from([
			0x20,
			0x4b,
			0x49,
			0x4d,
			0x43,
			0x49,
			0x4c,
			0x20,
			0x4a,
			0x41,
			0x48,
			0x41,
			0x54,
			0x21,
			0x21,
			0x21
		]),
		user: user
	});
});
test( "VirtualFileSystem.read:Buffer", () => {
	kernel.vfs.read( user.home.concat( "/testing/file-write-buffer" ), {
		encode: "utf-8",
		user: user
	});
});
test( "VirtualFileSystem.write:String", () => {
	kernel.vfs.write( user.home.concat( "/testing/file-write-string" ), { 
		contents: "Hello World!", 
		user: user 
	});
});
test( "VirtualFileSystem.append:String", () => {
	kernel.vfs.append( user.home.concat( "/testing/file-write-string" ), {
		contents: Buffer.from([
			0x20,
			0x4b,
			0x49,
			0x4d,
			0x43,
			0x49,
			0x4c,
			0x20,
			0x4a,
			0x41,
			0x48,
			0x41,
			0x54,
			0x21,
			0x21,
			0x21
		]),
		user: user
	});
});
test( "VirtualFileSystem.read:String", () => {
	kernel.vfs.read( user.home.concat( "/testing/file-write-string" ), { user: user } );
});
// test( "dumps", () => {
// 	console.debug( "/:", JSON.stringify( kernel.vfs.root.object(), null, 4 ) );
// });

