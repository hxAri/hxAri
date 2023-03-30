
import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

export default defineConfig({
	plugins: [
		vue({
			template: {
				compilerOptions: {
					isCustomElement: (tag) => tag.includes( "-" )
				}
			}
		}),
		vueJsx(),
	],
	resolve: {
		alias: {
			"@": fileURLToPath( new URL( "./src", import.meta.url ) )
		}
	}
});
