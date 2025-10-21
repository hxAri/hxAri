
/**
 * 
 * hxAri | hxari.js
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

import { createApp } from "vue/dist/vue.esm-bundler";

// Import Stylesheets
import "/src/styles/hxari.shell.css";
import "/src/styles/hxari.light.css";
import "/src/styles/hxari.dark.css";
import "/src/styles/hxari.font.css";
import "/src/styles/hxari.hljs.css";
import "/src/styles/hxari.md.css";
import "/src/styles/hxari.css";

// Import Application
import hxAri from "/src/hxari.vue";

// Import Directives
import LazyLoad from "/src/directives/LazyLoad.js";
import ScrollReveal from "/src/directives/ScrollReveal.js";

// Import Stores
import { Store } from "/src/stores";

// Import Router
import { Router } from "/src/routing";

// The application instance.
const app = createApp( hxAri );

// Register vue directives.
app.directive( "lazyload", LazyLoad );
app.directive( "scroll-reveal", ScrollReveal );

// Install the object instance as a plugin.
app.use( Router );
app.use( Store );

// Mount element.
app.mount( "#root" );
