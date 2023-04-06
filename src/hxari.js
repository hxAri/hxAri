
import { createApp } from "vue/dist/vue.esm-bundler";

// Import Stylesheets
import "./styles/hxari.shell.css";
import "./styles/hxari.light.css";
import "./styles/hxari.dark.css";
import "./styles/hxari.font.css";
import "./styles/hxari.css";
import "./styles/hxari.style.css";

// Import Application
import App from "./App.vue";

// Import Directives
import LazyLoad from "./directives/LazyLoad.js";
import ScrollReveal from "./directives/ScrollReveal.js";

// Import Router
import router from "./router/router.js";

// The application instance.
const app = createApp( App );

// Register vue directives.
app.directive( "lazyload", LazyLoad );
app.directive( "scroll-reveal", ScrollReveal );

// Install the object instance as a plugin.
app.use( router );

// Mount element.
app.mount( "#root" );