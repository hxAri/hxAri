// Define some routes.
// Each route should map to a component.
const $Routes = [
    {
        path: "/",
        icon: [
            "bx bx-home",
            "bx bxs-home"
        ],
        slot: "Home",
        component: {
            data: () => ({
                projects: [
                    {
                        name: "Yume",
                        repo: "https://github.com/hxAri/Yume",
                        lang: {
                            name: "PHP",
                            icon: "https://raw.githubusercontent.com/hxAri/hxAri/main/assets/images/1644890644;75R1GnLOIZ.png"
                        },
                        path: "/projects/yume",
                        logo: "https://raw.githubusercontent.com/hxAri/hxAri/main/assets/images/1653507383;6bi9u6QnWb.png",
                        info: "Yume is a simple framework for building Websites built using the PHP Programming Language."
                    },
                    {
                        name: "Kanashi",
                        repo: "https://github.com/hxAri/Kanashi",
                        lang: {
                            name: "Python",
                            icon: "https://raw.githubusercontent.com/hxAri/hxAri/main/assets/images/1644890644;c3nT0xbpbV.png"
                        },
                        path: "/projects/kanashi",
                        logo: "https://raw.githubusercontent.com/hxAri/hxAri/main/assets/images/1654820424;51ydWrxRcv.png",
                        info: "Kanashi is an open source project that can be used to login to real Instagram accounts via Linux Terminal and Android Termux."
                    },
                    {
                        name: "Sheru",
                        repo: "https://github.com/hxAri/Sheru",
                        lang: {
                            name: "Bash/ Shell",
                            icon: "https://raw.githubusercontent.com/hxAri/hxAri/main/assets/images/1654842477;a3DPZwX2qo.png"
                        },
                        path: "/projects/sheru",
                        logo: "https://raw.githubusercontent.com/hxAri/hxAri/main/assets/images/",
                        info: "Undefined"
                    },
                    {
                        name: "Tree",
                        repo: "https://github.com/hxAri/Tree",
                        lang: {
                            name: "PHP",
                            icon: "https://raw.githubusercontent.com/hxAri/hxAri/main/assets/images/1644890644;75R1GnLOIZ.png"
                        },
                        path: "/projects/tree",
                        logo: "https://raw.githubusercontent.com/hxAri/hxAri/main/assets/images/1653507345;50XUUPql.z.png",
                        info: "Create a Tree structure using an Array."
                    },
                    {
                        name: "Faiba",
                        repo: "https://github.com/hxAri/Faiba",
                        lang: {
                            name: "JavaScript",
                            icon: "https://raw.githubusercontent.com/hxAri/hxAri/main/assets/images/1644890644;f403IB5ECP.png"
                        },
                        path: "/projects/faiba",
                        logo: "https://raw.githubusercontent.com/hxAri/hxAri/main/assets/images/1654840678;6cht26BtwN.png",
                        info: "Create a Tree structure using an Array or Object. This is an implementation of the Tree project built using JavaScript with almost the same functionality."
                    }
                ]
            }),
            mounted: function() {},
            methods: {},
            components: {
                Avatar: $Avatar
            },
            template: `
                <div class="home">
                    <div class="section">
                        <h2 class="title">Abouts</h2>
                        <div class="content">
                            <p class="paragraph">
                                Hello, introduce my name is Ari Setiawan.
                                I am a Junior Backend Programmer from Indonesia who happened to pass by.
                                I am currently undergoing a Software Engineering Vocational High School.
                                I prefer to work alone but I can also work in a team.
                            </p>
                        </div>
                    </div>
                    <div class="section">
                        <h2 class="title">Skills</h2>
                        <div class="content">
                            <p class="paragraph">
                                For more than two years I have studied Programming Languages such as PHP, Java, JS, and Python.
                                Apart from that I have also learned how to implement and use various frameworks from the programming languages I am learning.
                            </p>
                        </div>
                        <div class="content">
                            ++-
                        </div>
                    </div>
                    <div class="section">
                        <h2 class="title">Projects</h2>
                        <div class="content">
                            <p class="paragraph">
                                ++-
                            </p>
                        </div>
                        <div class="content deep dp-grid">
                            <div class="project rd-square" v-for="( project, i ) in projects">
                                <Avatar :alt="project.info" :src="project.logo" :route="project.path" inject="project-logo" />
                                <h5 class="title">
                                    {{ project.name }}
                                </h5>
                                <p class="paragraph flex flex-left">
                                    {{ project.lang.name }} Language <img class="project-lang" :alt="project.logo.name" :src="project.lang.icon" />
                                </p>
                                <p class="paragraph">
                                    <a :href="project.repo" target="_blank" rel="noopener noreferrer">
                                        {{ project.repo }}
                                    </a>
                                </p>
                                <p class="paragraph">
                                    {{ project.info }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            `
        }
    },
    {
        path: "/about",
        icon: [
            "bx bx-user",
            "bx bxs-user"
        ],
        slot: "Abouts",
        component: {}
    },
    {
        path: "/contact",
        icon: [
            "bx bx-phone",
            "bx bxs-phone"
        ],
        slot: "Contact",
        component: {}
    },
    {
        path: "/projects",
        icon: [
            "bx bx-code",
            "bx bx-code-alt"
        ],
        slot: "Projects",
        children: [
            {
                path: "yume",
                icon: [],
                slot: "Yume",
                component: {}
            }
        ],
        component: {}
    },
    {
        path: "/terminal",
        icon: [
            "bx bx-terminal",
            "bx bxs-terminal"
        ],
        slot: "Terminal",
        component: $Bash.prototype.template
    },
    {
        path: "/privacy",
        icon: [
            "bx bx-lock-open",
            "bx bxs-lock-open"
        ],
        slot: "Privacy",
        component: {}
    },
    {
        path: "/sitemap",
        icon: [
            "bx bx-link",
            "bx bx-link-alt"
        ],
        slot: "Sitemap",
        component: {}
    },
    {
        name: "error",
        path: "/:e(.*)*",
        icon: [],
        component: {},
        props: route => ({
            command: [{
                output: [ "", `cd: ${route.path}: No such file or directory.`, "" ]
            }]
        })
    }
];

// The router instance.
const $Router = $Bash.prototype.router = VueRouter.createRouter({
    
    // Router history mode.
    history: VueRouter.createWebHistory(),
    
    routes: $Routes
    
});

const $Create = {
    data: () => ({
        pages: $Routes,
        error: false
    }),
    mounted: function()
    {
    },
    methods: {
        match: function()
        {
            return( this.$route.path.match( /^\/projects\/[a-z\_\-]+/gi ) ? false : true );
        }
    },
    template: `
        <div class="template">
            <div class="header">
                <div class="header-banner flex pd-14">
                    <div class="avatar">
                        <div class="avatar-wrapper flex flex-center rd-circle">
                            <router-link to="/">
                                <div class="avatar-background"></div>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
            <div class="breakr"></div>
            <Banner />
            <Parent v-if="match()" />
            <Burogu v-else />
            <Footer />
        </div>
    `,
    components: {
        Banner: {
            template: `
                <div class="banner">
                    <div class="album"></div>
                    <div class="cover"></div>
                </div>
            `
        },
        Burogu: {
            template: ""
        },
        Footer: {
            name: "Footer",
            data: function()
            {
                return({
                    pages: [
                        { path: "/", slot: "Home" },
                        { path: "/abouts", slot: "Abouts" },
                        { path: "/contact", slot: "Contact" },
                        { path: "/privacy", slot: "Privacy" },
                        { path: "/sitemap", slot: "Sitemap" }
                    ],
                    socmed: [
                        { link: "https://instagram.com/hx.ari", icon: "bx bxl-instagram" },
                        { link: "https://facebook.com/hx.are", icon: "bx bxl-facebook" },
                        { link: "https://twitter.com/hxxAre", icon: "bx bxl-twitter" },
                        { link: "https://github.com/hxAri", icon: "bx bxl-github" }
                    ]
                });
            },
            template: `
                <div class="footer flex flex-center">
                    <div class="footer-wrapper">
                        <div class="footer-content dp-flex">
                            <div class="footer-group pd-14">
                                <h5 class="mg-bottom-8">Pages</h5>
                                <p class="fc-1m">Some important pages.</p>
                                <li class="li dp-inline-block mg-right-10" v-for="i in pages">
                                    <router-link :to="{ path: i.path }" class="fs-14">{{ i.slot }}</router-link>
                                </li>
                            </div>
                            <div class="footer-group pd-14">
                                <h5 class="mg-bottom-8">Follow Me</h5>
                                <p class="">Stay connected with me.</p>
                                <li class="li dp-inline-block mg-right-10" v-for="i in socmed">
                                    <a :href="i.link" target="_blank" rel="noopener noreferrer">
                                        <i :class="i.icon"></i>
                                    </a>
                                </li>
                            </div>
                        </div>
                        <div class="footer-single">
                            <p class="">&copy hxAri 2022</p>
                        </div>
                    </div>
                </div>
            `
        },
        Parent: {
            components: {
                Tabs: {
                    computed: {
                        loop: function()
                        {
                            return({
                                mounted: function()
                                {
                                    this.$refs.tab.scrollLeft = $Scroll.left;
                                },
                                methods: {
                                    scroll: e =>
                                    {
                                        $Scroll.left = e.target.scrollLeft;
                                    }
                                },
                                template: "<div class=\"tabs flex flex-center\" ref=\"tab\" @scroll=\"scroll\">" + this.self() + "</div>"
                            });
                        }
                    },
                    mounted: function() {},
                    methods: {
                        self: function( div = "" )
                        {
                            for( let i in $Routes )
                            {
                                var route = $Routes[i];
                                
                                if( $Is( route.slot, Defined ) )
                                {
                                    div += "<router-link to=\"" + route.path + "\">";
                                        div += "<div class=\"tab single flex flex-center fb-45 fc-0m\">";
                                            div += "<i class=\"" + ( this.$route.path === route.path ? route.icon[1] : route.icon[0] ) + " mg-right-14\"></i>";
                                            div += route.slot;
                                        div += "</div>";
                                    div += "</router-link>";
                                }
                            }
                            return( div );
                        }
                    },
                    template: `<component v-bind:is="loop"></component>`
                }
            },
            template: `
                <div class="parent">
                    <div class="sidebr">
                        <div class="wrapper">
                            <div class="picture flex flex-center rd-circle">
                                <div class="border flex flex-center rd-circle">
                                    <div class="spaces flex flex-center rd-circle">
                                        <div class="avatar">
                                            <div class="avatar-wrapper flex flex-center rd-circle">
                                                <div class="avatar-background"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="github">
                                <p class="fullname fc-sh-00m ff-latto fs-24 fb-50 fc-1m mg-0">Ari | Backdev</p>
                                <p class="username fc-sh-00m ff-latto fs-20 fb-35">hxAri</p>
                            </div>
                        </div>
                        <div class="abouts">
                            <button class="button resume fb-45 flex flex-center mg-bottom-20 pd-10 rd-square">
                                View Resume
                            </button>
                            <div class="group">
                                <div class="single flex mg-bottom-8">
                                    <i class="bx bxs-map mg-right-8"></i> Indonesian
                                </div>
                                <div class="single flex mg-bottom-8">
                                    <i class="bx bxs-phone mg-right-8"></i> +62 8583 9211 030
                                </div>
                                <div class="single flex mg-bottom-8">
                                    <i class="bx bx-mail-send mg-right-8"></i> ari160824@gmail.com 
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="viewer">
                        <Tabs />
                        <router-view :style="{ marginTop: '-2px' }" />
                    </div>
                </div>
            `
        }
    }
};

// The application instance.
const $Object = Vue.createApp( $Create );
      
      // Install the object instance as a plugin.
      $Object.use( $Router );
      
      // Mount element.
      $Object.mount( "#root" );