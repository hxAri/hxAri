
import { createApp } from "vue/dist/vue.esm-bundler";

// Import Stylesheets
import "/src/styles/hxari.shell.css";
import "/src/styles/hxari.light.css";
import "/src/styles/hxari.dark.css";
import "/src/styles/hxari.font.css";
import "/src/styles/hxari.css";
import "/src/styles/hxari.style.css";

// Import Application
import App from "/src/App.vue";

// Import Directives
import LazyLoad from "/src/directives/LazyLoad.js";
import ScrollReveal from "/src/directives/ScrollReveal.js";

// Import Router
import router from "/src/router/router.js";

// The application instance.
const app = createApp( App );

// Register vue directives.
app.directive( "lazyload", LazyLoad );
app.directive( "scroll-reveal", ScrollReveal );

// Install the object instance as a plugin.
app.use( router );

// Mount element.
app.mount( "#root" );