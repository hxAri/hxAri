/*
 * Portofolio component.
 *
 */
const $Portofolio = {
    data: () => ({
        language: {},
        projects: []
    }),
    mounted: function()
    {
        // Copy all programming language images.
        this.language = $Image.language;
        
        // Copy all project page routes.
        this.projects = $Projects.select();
        
        // Mapping all project page routes.
        for( let i in this.projects )
        {
            this.projects[i].path = $f( "/projects/{}", this.projects[i].path );
        }
    },
    methods: {
        test: function( e )
        {
            console.log( $JSON.encode( this.projects, null, 4 ) );
        }
    },
    template: `
        <div class="portof dp-flex">
            <div class="portof-section profile">
                <div class="portof-wrapper">
                    <div class="portof-picture flex flex-center rd-circle">
                        <div class="portof-picture-border flex flex-center rd-circle">
                            <div class="portof-picture-spaces flex flex-center rd-circle">
                                <div class="avatar">
                                    <div class="avatar-wrapper flex flex-center rd-circle">
                                        <div class="avatar-background"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="portof-github">
                        <p class="fullname fc-sh-00m fs-14 fb-45 mg-0">Ari Setiawan</p>
                        <p class="biography fc-sh-00m fs-14 fb-35">A Junior Backend Developer</p>
                    </div>
                </div>
                <div class="portof-about">
                    <button class="portof-about-button-resume fb-45 flex flex-center mg-bottom-20 pd-10 rd-square">
                        View Resume
                    </button>
                    <div class="portof-about-group">
                        <div class="portof-about-single flex mg-bottom-8">
                            <i class="bx bxs-map mg-right-8"></i> Indonesian
                        </div>
                        <div class="portof-about-single flex mg-bottom-8">
                            <i class="bx bxs-phone mg-right-8"></i> +62 8583 9211 030
                        </div>
                        <div class="portof-about-single flex">
                            <i class="bx bx-mail-send mg-right-8"></i> ari160824@gmail.com 
                        </div>
                    </div>
                </div>
            </div>
            <div class="portof-section content">
                <PortofolioTabs />
                <div class="portof-super">
                    <div class="portof-bantle flex flex-center">
                        <h1 class="portof-title">Abouts</h1>
                    </div>
                    <div class="portof-single rd-square" id="abouts">
                        <p class="portof-parap">
                            Hello, my name is Ari Setiawan.
                            I am a Junior Backend Programmer from Indonesia who happened to be passing by.
                            I am currently studying at the Software Engineering Vocational High School.
                            I prefer to work alone but I can also work in a team.
                        </p>
                    </div>
                    <div class="portof-bantle flex flex-center">
                        <h1 class="portof-title">Projects</h1>
                    </div>
                    <div class="portof-single rd-square" id="projects">
                        <p class="portof-parap">
                            I've been studying programming for over 2 years, and here are some of the projects I've created and are still developing.
                            Every project is open source anyone can use it or contribute.
                        </p>
                        <div class="portof-project project-super dp-grid">
                            <div class="project-single rd-square" v-for="project in projects">
                                <Avatar :options="{ 
                                    src: project.include.icon.icon, 
                                    alt: project.name, 
                                    title: project.name, 
                                    route: project.path,
                                    inject: 'project-avatar' }" />
                                <div class="project-deeper">
                                    <p class="project-title flex flex-left">
                                        <Avatar :options="{
                                            src: language[project.include.configs.language].Banner,
                                            alt: project.include.configs.language,
                                            title: project.include.configs.language,
                                            inject: 'project-language' }" />
                                        <router-link :to="{ path: project.path }">
                                            {{ project.include.configs.name }}
                                        </router-link>
                                    </p>
                                    <p class="project-title flex flex-left">
                                        <i class="bx bxs-star"></i>
                                        {{ project.include.configs.stargazers_count }} Stars
                                    </p>
                                    <p class="project-title flex flex-left">
                                        <i class="bx bx-code-alt"></i>
                                        {{ project.include.configs.language }} Language
                                    </p>
                                    <p class="project-parap description">
                                        {{ project.include.configs.description }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="portof-bantle flex flex-center">
                        <h1 class="portof-title">Experience</h1>
                    </div>
                    <div class="portof-single rd-square" id="experience">
                        <p class="portof-parap">
                            Apart from that, I have also done or have experience doing Industrial Work Practices at
                            <a href="https://www.darmajaya.ac.id/" target="_blank" rel="noopener noreferrer">The Darmajaya Institute of Informatics and Business</a> Bandar Lampung in the Campus Computer Lab section for 4 months.
                        </p>
                    </div>
                    <div class="portof-bantle flex flex-center">
                        <h1 class="portof-title">Certificate</h1>
                    </div>
                    <div class="portof-single rd-square" id="experience">
                        <p class="portof-parap">
                            // ...
                        </p>
                    </div>
                </div>
            </div>
        </div>
    `,
    components: {
        Avatar: $Avatar,
        PortofolioTabs: {
            computed: {
                binding: function()
                {
                    return({
                        mounted: function()
                        {
                            this.$refs.portofTab.scrollLeft = $Scroll.left;
                        },
                        methods: {
                            
                            /*
                             * Save left scroll value.
                             *
                             * @params Event $e
                             *
                             * @return Number
                             */
                            scroll: e => $Scroll.left = e.target.scrollLeft
                        },
                        template: this.create()
                    });
                }
            },
            methods: {
                
                /*
                 * Create raw template component
                 *
                 * @return String
                 */
                create: function()
                {
                    // Parent tab 
                    var stack = "";
                        stack += "<div class=\"portof-tab flex flex-left\" ref=\"portofTab\" @scroll=\"scroll\">";
                            stack += "{}";
                        stack += "</div>";
                    
                    return( $f( stack, this.iterate( $Routes ) ) );
                },
                
                /*
                 * Iterate all routes.
                 *
                 * @params Array $tabs
                 *
                 * @return String
                 */
                iterate: function( tabs )
                {
                    // Tab stack.
                    var stack = "";
                    
                    for( let i in tabs )
                    {
                        // Get route option.
                        var tab = tabs[i];
                        
                        if( tab.name !== "error" )
                        {
                            // Building single tab.
                            stack += "<router-link class=\"portof-tab-link\" to=\"{}\">";
                                stack += "<div class=\"portof-tab-single flex flex-center fb-45 fc-0m\">";
                                    stack += "<i class=\"portof-tab-icon {} mg-right-14\"></i>";
                                    stack += "{}";
                                stack += "</div>";
                            stack += "</router-link>";
                            
                            // Format stack value.
                            stack = $f( stack, 
                                tab.path,
                                tab.include.icon.icon,
                                tab.name.charAt( 0 ).toUpperCase() + tab.name.slice( 1 )
                            );
                        }
                    }
                    
                    return( stack );
                }
            },
            template: `<component v-bind:is="binding"></component>`
        }
    }
};