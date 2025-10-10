
import Fmt from "../src/scripts/Fmt";
import { expect, test } from "vitest";

test( "Fmt", () => {
	var format = "$\{{}\}";
	var formatted = Fmt( format, "VARIABLE" );
	console.debug( formatted );
});
