const $Avatar = {
    name: "Avatar",
    data: function()
    {
        return({
            EMPTY: "",
            className: "avatar-wrapper flex flex-center"
        });
    },
    props: {
        src: {
            type: String,
            require: true
        },
        alt: String,
        link: String,
        route: String,
        title: String,
        inject: String
    },
    mounted: function()
    {
        if( $Is( this.inject, String ) )
        {
            this.className += " ";
            this.className += this.inject;
        }
    },
    template: `
        <div class="avatar">
            <div :class="className" v-if="route">
                <router-link :to="{ path: route }">
                    <img class="avatar-image" :src="( src ? src : EMPTY )" :alt="( alt ? alt : EMPTY )" :title="( title ? title : EMPTY )" />
                    <div class="avatar-cover"></div>
                </router-link>
            </div>
            <div :class="className" v-else-if="link">
                <a :href="link" target="_blank" rel="noopener noreferrer">
                    <img class="avatar-image" :src="( src ? src : EMPTY )" :alt="( alt ? alt : EMPTY )" :title="( title ? title : EMPTY )" />
                    <div class="avatar-cover"></div>
                </a>
            </div>
        </div>
    `
};