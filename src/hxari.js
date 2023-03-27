
import { createApp } from "vue/dist/vue.esm-bundler";
import { createPinia } from "pinia";

// Importing Stylesheets.
import "./styles/hxari.light.css";
import "./styles/hxari.dark.css";
import "./styles/hxari.font.css";
import "./styles/hxari.css";
import "./styles/hxari.style.css";

// Importing Application.
import App from "./App.vue";

// Import Directives.
import LazyLoad from "./directives/LazyLoad.js";
import ScrollReveal from "./directives/ScrollReveal.js";

// Importing Router.
import router from "./router/router.js";

// The application instance.
const app = createApp( App );

// Register vue directives.
app.directive( "lazyload", LazyLoad );
app.directive( "scroll-reveal", ScrollReveal );

// Install the object instance as a plugin.
app.use( createPinia() );
app.use( router );

// Mount element.
app.mount( "#root" );
