/*
 * Contact component.
 *
 */
const $Contact = {
    data: () => ({
        banner: $f( "url(\"{}\")", $Image.contact.Banner ),
        detail: [
            {
                icon: "bx bxs-map-alt",
                text: "Indonesia, Lampung Province, Pringsewu Regency, Sukoharjo District, 35674"
            },
            {
                icon: "bx bxs-phone",
                text: "+62 8583-9110-30",
                link: "https://wa.me/6285839211030"
            },
            {
                icon: "bx bxs-navigation",
                text: "ari160824@gmail.com",
                link: "mailto:ari160824@gmail.com"
            },
            {
                icon: "bx bx-world",
                text: "https://hxari.github.io/"
            }
        ],
        models: [
            {
                type: "text",
                refer: "ename",
                label: "Name",
                value: ""
            },
            {
                type: "text",
                refer: "subject",
                label: "Subject",
                value: ""
            },
            {
                type: "email",
                refer: "esender",
                label: "Email",
                //regex: /^((([^<>('")[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))$/g,
                value: ""
            },
            {
                type: "textarea",
                refer: "message",
                label: "Email Message",
                value: ""
            },
            {
                type: "button",
                refer: "button",
                label: "Send"
            }
        ],
        options: {
            data: {},
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/x-www-form-urlencoded"
            }
        },
        sending: false,
        posting: "https://formspree.io/f/xoqrezbv",
        trigger: {
            text: null,
            type: false
        }
    }),
    methods: {
        
        /*
         * Disable all input forms.
         *
         * @params Bool $allow
         *
         * @return Void
         */
        allows: function( allow )
        {
            for( let i in this.models )
            {
                this.$refs[this.models[i].refer].disabled = allow;
            }
        },
        
        close: function()
        {
            this.trigger.text = null;
            this.trigger.type = false;
        },
        
        /*
         * Reset form models.
         *
         * @return Void
         */
        resets: function()
        {
            for( let i in this.models )
            {
                this.models[i].value = "";
            }
            this.options.data = {};
        },
        
        /*
         * Handle form submit event.
         *
         * @params Event $e
         *
         * @return Void
         */
        submit: async function( e )
        {
            // Disable or cancel event.
            e.preventDefault();
            
            // Copy self.
            var self = this;
            
            // Reset values.
            self.close();
            self.sending = true;
            
            // Disable all input forms.
            self.allows( false );
            
            // Check whether all input forms are valid.
            if( self.valids() )
            {
                // Waiting.
                await
                
                // Sending message.
                $Request( "POST", self.posting, self.options )
                    .then( r => {
                        self.trigger.text = "Email message has been sent.";
                        self.trigger.type = "success";
                    })
                    .catch( e => {
                        self.trigger.text = "Failed send message!",
                        self.trigger.type = "error";
                    });
                
                // Check if the email message was sent successfully.
                if( self.trigger.type === "success" )
                {
                    // Reset form input.
                    self.resets();
                }
            }
            
            // Allow form input.
            self.allows( true );
            
            // Sending success!
            self.sending = false;
        },
        
        /*
         * Validate all input forms.
         *
         * @return Bool
         */
        valids: function()
        {
            for( let i in this.models )
            {
                // Check if something wrong.
                if( this.trigger.type === "error" )
                {
                    return( false );
                }
                
                // Check if model type is not button.
                if( this.models[i].type !== "button" )
                {
                    // Check if input value is empty.
                    if( this.models[i].value === "" )
                    {
                        this.trigger.text = $f( "The input form for {} cannot be empty!", this.models[i].label );
                        this.trigger.type = "error";
                    }
                    
                    // Check if model has regex.
                    if( this.models[i].regex )
                    {
                        // Check if input value is invalid.
                        if( this.models[i].regex.test( this.models[i].value ) === false )
                        {
                            this.trigger.text = $f( "The input value for {} must be valid!", this.models[i].label );
                            this.trigger.type = "error";
                        }
                    }
                    
                    // Insert data.
                    this.options.data[this.models[i].refer] = this.models[i].value;
                }
            }
            return( true );
        }
        
    },
    template: `
        <div class="template">
            <div class="alert" v-if="trigger.type">
                <div class="alert-group">
                    <div class="alert-single error" v-if="( trigger.type === 'error' )">
                        <div class="alert-slot">
                            {{ trigger.text }}
                        </div>
                        <button class="alert-close flex flex-center" @click="close">
                            <i class="bx bx-x"></i>
                        </button>
                    </div>
                    <div class="alert-single success" v-if="( trigger.type === 'success' )">
                        <div class="alert-slot">
                            {{ trigger.text }}
                        </div>
                        <button class="alert-close flex flex-center" @click="close">
                            <i class="bx bx-x"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div class="contact flex flex-center">
                <div class="contact-wrapper flex flex-center rd-square">
                    <div class="contact-section info" :style="{ backgroundImage: banner }">
                        <div class="contact-cover flex flex-center">
                            <div class="contact-coverable">
                                <div class="contact-group mg-bottom-18">
                                    <h4 class="contact-title mg-bottom-8">Contact information</h4>
                                    <p class="contact-parap">Overall details of my contact information.</p>
                                </div>
                                <div class="contact-detail">
                                    <div class="contact-single flex flex-left" v-for="info in detail">
                                        <div class="contact-icon flex flex-center rd-circle">
                                            <i :class="info.icon"></i>
                                        </div>
                                        <div class="contact-text">
                                            <a v-if="info.link" :href="info.link" target="_blank" rel="noopener noreferrer">{{ info.text }}</a>
                                            <p v-else>{{ info.text }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="contact-section form flex flex-center">
                        <div class="contact-coverable">
                            <div class="contact-group mg-bottom-18">
                                <h4 class="contact-title mg-bottom-8">Contact me</h4>
                                <p class="contact-parap">Send me any suggestions or questions.</p>
                            </div>
                            <form class="contact-form" @submit="submit">
                                <div class="form-group mg-bottom-14 mg-lc-bottom" v-for="( model, index ) in models">
                                    <label class="form-label" v-if="( model.type !== 'button' )">
                                        {{ model.label }}
                                    </label>
                                    <input class="form-input" :type="model.type" :ref="model.refer" v-model="models[index].value" v-if="( model.type !== 'button' && model.type !== 'textarea' )" />
                                    <button class="form-input form-submit" :ref="model.refer" v-if="( model.type === 'button' )">
                                        {{ model.label }}
                                    </button>
                                    <textarea class="form-input form-texta" :ref="model.refer" v-model="models[index].value" v-if="( model.type === 'textarea' )"></textarea>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    components: {
        Avatar: $Avatar
    }
};