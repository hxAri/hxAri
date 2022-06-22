/*
 * About
 *
 * Explain about the web that was built.
 */
const $About = {
    
};

/*
 * Abouts
 *
 * Explain who I am.
 */
const $Abouts = {
    data: () => ({
        
        // My fullname.
        name: "Ari Setiawan",
        
        // Greetings visitors.
        greetings: "Hello, introduce my name is ",
        
        // Explain about myself.
        descriptions: [
            [
                "I am a Junior Backend Programmer from Indonesia who happened to pass by.",
                "I am currently undergoing a Software Engineering Vocational High School.",
                "I prefer to work alone but I can also work in a team."
            ],
            // "And I'm not a lucky person in the world of love."
        ]
        
    }),
    methods: {},
    template: `
        <div class="about">
            <div class="bantle flex flex-center">
                <h1 class="title">About</h1>
            </div>
            <div class="section">
                <div class="content">
                    <p class="paragraph">
                        {{ greetings }}
                    </p>
                    <h2 class="title mg-top-14 mg-bottom-14">
                        {{ name }}
                    </h2>
                    <p class="paragraph    mg-bottom-14 mg-lc-bottom" v-for="( group, i ) in descriptions">
                        {{ group.join( ' ' ) }}
                    </p>
                </div>
            </div>
        </div>
    `
};