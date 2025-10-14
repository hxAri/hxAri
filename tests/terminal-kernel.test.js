
"use strict";

import Router from "../src/routing/router";
import { Terminal } from "../src/scripts/terminal";
import { test } from "vitest";


const terminal = new Terminal( null, Router, null );
const kernel = terminal.kernel;
const root = kernel.root;
const self = terminal.hxari;


test( "Kernel.allocateGID", () => kernel.allocateGID() );
test( "Kernel.allocatePID", () => kernel.allocatePID() );
test( "Kernel.allocateUID", () => kernel.allocateUID() );
test( "Kernel.groupadd", () => {
	kernel.groupadd( "testing", { user: root } );
});
test( "Kernel.groupdel", () => {
	kernel.groupdel( "testing", { user: root } );
});
test( "Kernel.groupmod", () => {
});
test( "Kernel.kill", () => {
});
test( "Kernel.spawn", () => {
});
test( "Kernel.switch", () => { // <<< su
	kernel.switch( self.username );
});
test( "Kernel.useradd", () => {
	kernel.useradd( "virtual", {
		password: "KIMCIL JAHAT!",
		user: root
	});
});
test( "Kernel.userdel", () => {
	kernel.userdel( "virtual", { user: root } );
});
test( "Kernel.usermod", () => {
	kernel.usermod( self.username, {
		group: "sudo",
		user: root
	});
	console.debug( "/:", JSON.stringify( kernel.vfs.root.object(), null, 4 ) );
});
