const $Projects = [
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
];

const $Project = {
    data: () => ({
        projects: $Projects
    }),
    mounted: function()
    {
    },
    methods: {},
    components: {
        Avatar: $Avatar
    },
    template: `
        <div class="projects">
            <div class="bantle flex flex-center">
                <h1 class="title">Projects</h1>
            </div>
            <div class="section">
                <div class="content">
                    <p class="paragraph">
                        I've been studying programming for over 2 years, and here are some of the projects I've created and are still developing.
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
};