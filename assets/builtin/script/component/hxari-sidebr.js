const $Sidebr = {
    name: "Sidebr",
    props: {
        pages: {
            type: Array,
            require: true
        },
        left: {
            type: Number,
            require: true
        }
    },
    data: function()
    {
        return({
            className: ""
        });
    },
    computed: {
        loop: function()
        {
            return({
                template: this.self( this.pages, this.left )
            });
        }
    },
    methods: {
        self: function( pages, left )
        {
            var template = "<div class=\"" + ( left === 0 ? "pd-14" : "dropdown-content pd-left-" + left ) + "\">";
            
            for( let page in pages )
            {
                if( $Is( pages[page].children, Array ) )
                {
                    template += "<div class=\"dropdown\">";
                        template += "<div class=\"li\">";
                            template += "<i class=\"" + ( this.$route.path === pages[page].path ? pages[page].icon[1] : pages[page].icon[0] ) + " mg-right-14\"></i>" + pages[page].slot;
                        template += "</div>";
                        template += this.self( pages[page].children, left === 0 ? 28 : left + 2 );
                    template += "</div>";
                } else {
                    if( $Is( pages[page].slot, Undefined ) )
                    {
                        continue;
                    }
                    template += "<div class=\"li\">";
                        template += "<router-link to=\"" + pages[page].path + "\">";
                            template += "<i class=\"" + ( this.$route.path === pages[page].path ? pages[page].icon[1] : pages[page].icon[0] ) + " mg-right-14\"></i>" + pages[page].slot;
                        template += "</router-link>";
                    template += "</div>";
                }
            }
            return( template + "</div>" );
        }
    },
    template: `<component v-bind:is="loop"></component>`
};