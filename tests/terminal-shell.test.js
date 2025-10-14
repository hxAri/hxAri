
"use strict";

import Router from "../src/routing/router";
import { Terminal } from "../src/scripts/terminal";
import { test } from "vitest";


const terminal = new Terminal( null, Router, null );
const shell = terminal.shell;


test( "Shell.execute", () => {
});
