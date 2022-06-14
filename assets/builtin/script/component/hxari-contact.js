const $Contact = {
    data: () => ({
        info: [
            {
                icon: "bx bxs-map",
                info: "Indonesian, Lampung, Pringsewu."
            },
            {
                icon: "bx bxs-phone",
                info: "+62 8583 9211 030"
            },
            {
                icon: "bx bx-mail-send",
                info: "ari160824@gmail.com"
            }
        ],
        ivalid: "dp-block form-label",
        models: [
            {
                type: "text",
                name: "sender",
                label: "Email Sender",
                valid: "dp-block form-label",
                value: null
            },
            {
                type: "text",
                name: "subject",
                label: "Email Subject",
                valid: "dp-block form-label",
                value: null
            },
            {
                type: "email",
                name: "email",
                label: "Email Address",
                valid: "dp-block form-label",
                value: null
            },
            {
                type: "textarea",
                name: "sender",
                label: "Email Message",
                valid: "dp-block form-label",
                value: null
            }
        ]
    }),
    methods: {
        icon: function( i )
        {
            return( $f( "{} fs-20", i ) );
        },
        click: function( i )
        {
            this.models[i].valid = "dp-block form-label form-label-valid";
        },
        change: function( i )
        {
            this.models[i].valid = this.models[i].value !== null ? ( this.models[i].value !== "" ? "dp-block form-label form-label-valid" : this.ivalid ) : this.ivalid;
        },
        submit: function( e )
        {
            e.preventDefault();
        }
    },
    template: `
        <div class="contact bg-01m">
            <div class="wrapper flex flex-center">
                <div class="content flex flex-center">
                    <div class="section">
                        <div class="single flex mg-bottom-32 mg-lc-bottom" v-for="( map, i ) in info">
                            <div class="icon mg-right-20 flex flex-center">
                                <i :class="icon( map.icon )"></i>
                            </div>
                            <div class="info fb-45">
                                {{ map.info }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content flex flex-center">
                    <div class="section">
                        <div class="center flex flex-center mg-bottom-32">
                            <div class="avatar">
                                <div class="avatar-wrapper flex flex-center rd-circle bg-02m">
                                    <i class="bx bx-mail-send fc-sh-00m fs-22"></i>
                                </div>
                            </div>
                        </div>
                        <div class="form pd-top-22">
                            <div class="form-group mg-bottom-20 mg-lc-bottom" v-for="( model, i ) in models">
                                <label :class="model.valid">{{ model.label }}</label>
                                <input class="dp-block form-input" :type="model.type" v-model="models[i].value" v-if="( model.type !== 'textarea' )" required />
                                <textarea class="dp-block form-input form-texta" v-model="models[i].value" v-else required>
                                </textarea>
                            </div>
                            <div class="form-group mg-bottom-20 mg-lc-bottom">
                                <button class="form-input form-submit" @submit="submit">Send Mail</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
};