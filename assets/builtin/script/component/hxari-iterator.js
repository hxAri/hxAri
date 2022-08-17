/*
 * Iterator list component.
 *
 * @options Array $lists
 */
const $Iterator = {
    props: {
        lists: Array
    },
    computed: {
        binding: function()
        {
            return({ template: this.iterate( this.lists ) });
        }
    },
    methods: {
        
        /*
         * Get list icon/ image.
         *
         * @params Object $list
         *
         * @return String
         */
        icon: function( list )
        {
            // Check if the list has an icon.
            if( $Is( list.include.icon, Object ) )
            {
                // Get list icon.
                var icon = list.include.icon.icon;
                
                // If list icon is image type.
                if( list.include.icon.type === "image" )
                {
                    return( $f( "<img class=\"list-icon list-icon-type-image\" src=\"{}\" alt=\"\" title=\"\" />", icon ) );
                }
                return( $f( "<i class=\"list-icon {} fc-01\"></i>", icon ) );
            }
            return( "" );
        },
        
        /*
         * Build menu iteration.
         *
         * @params Array $lists
         *
         * @return String
         */
        iterate: function( lists )
        {
            // Menu stack.
            var menu = "";
            
            // Mapping the whole list.
            lists.forEach( list =>
            {
                // Check if the list is a list.
                if( $Is( list.name, String ) && list.name !== "error" )
                {
                    // Check if the menu has children.
                    if( $Is( list.children, Array ) && list.children.length > 0 )
                    {
                        // Build dropdown menu template.
                        menu += "<li class=\"list dropdown\">";
                            menu += "<li class=\"list dropdown-display flex flex-left\">";
                                menu += "{}";
                                menu += "<router-link to=\"{}\">{}</router-link>";
                                menu += "<i class=\"bx bx-chevron-down\"></i>";
                            menu += "</li>";
                            menu += "<li class=\"list dropdown-content\">";
                                menu += "{}";
                            menu += "</li>";
                        menu += "</li>";
                        
                        // Format the entire stack menu.
                        menu = $f( menu, this.icon( list ), list.path, list.name.charAt( 0 ).toUpperCase() + list.name.slice( 1 ), this.iterate( list.children ) );
                    } else {
                        
                        // Build single list template.
                        menu += "<li class=\"list flex flex-left\">";
                            menu += "{}";
                                menu += "<router-link to=\"{}\">";
                                menu += "{}";
                            menu += "</router-link>";
                        menu += "</li>";
                        
                        // Format the entire stack menu.
                        menu = $f( menu, this.icon( list ), list.path, list.name.charAt( 0 ).toUpperCase() + list.name.slice( 1 ) );
                    }
                }
            });
            
            return( menu );
        }
    },
    template: `<component v-bind:is="binding"></component>`
};