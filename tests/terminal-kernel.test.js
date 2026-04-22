
/**
 * 
 * hxAri | alias.js
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

import { expect, test } from "vitest";

import { Router } from "/src/routing/router";
import { Kernel } from "/src/scripts/terminal/kernel";


const kernel = new Kernel( Router );
const group = kernel.group;
const root = kernel.root;


test.only( "Kernel.allocateGID", function() {
	expect( kernel.allocateGID() ).toBe( 1001 ); 
});

test.only( "Kernel.allocatePID", function() {
	expect( kernel.allocatePID() ).toBe( 101 );
});

test.only( "Kernel.allocateUID", function() {
	expect( kernel.allocateUID() ).toBe( 1000 );
});

test.only( "Kernel.groupadd", function() {
	kernel.groupadd( "testing", { user: root } );
});

test.only( "Kernel.groupdel", function() {
	kernel.groupdel( "testing", { user: root } );
});

test.only( "Kernel.groupmod", function() {
	kernel.groupmod( root.group, { user: root } );
});

test.only( "Kernel.groupres", function() {
	expect( kernel.groupres( root.group ) ).toBe( group.gid );
});

test.only( "Kernel.switch", function() {
	kernel.switch( "root" );
});

test.only( "Kernel.user", function() {
	expect( kernel.user() ).toBe( root );
});

test.only( "Kernel.useradd", function() {
	kernel.useradd( "testing", { user: root } );
});

test.only( "Kernel.userdel", function() {
	kernel.userdel( "testing", { user: root } );
});

test.only( "Kernel.usermod", function() {
	kernel.usermod( root.username, { home: "/home/root", user: root } );
});

