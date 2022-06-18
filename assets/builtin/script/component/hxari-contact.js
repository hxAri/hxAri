

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
		target: "https://formspree.io/f/xoqrezbv",
		ivalid: "dp-block form-label",
		alerts: [],
		models: {
			subject: {
				name: "subject",
				label: "Email Subject",
				value: ""
			},
			email: {
				name: "email",
				label: "Email Address",
				regex: /^((([^<>('")[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))$/g,
				value: ""
			},
			message: {
				type: "textarea",
				name: "sender",
				label: "Email Message",
				value: ""
			}
		}
	}),
	methods: {
		icon: function( i )
		{
			return( $f( "{} fs-20", i ) );
		},
		freset: function()
		{
			for( let i in this.models )
			{
				this.models[i].value = "";
			}
		},
		submit: function( e )
		{
			
			// Reset alerts
			this.alerts = [];
			
			// Disable or cancel event.
			e.preventDefault();
			
			for( let i in this.models )
			{
				// Check whether the input value is empty or not.
				if( this.models[i].value.replace( /\s/g, "" ) === "" )
				{
					this.alerts.push({
						type: "warning",
						message: $f( "The {} form cannot be empty.", this.models[i].label )
					});
					return;
				}
			}
			
			// If email have pattern.
			if( $Is( this.models.email.regex, RegExp ) )
			{
				// Use regular expressions to check if the email address is valid.
				if( this.models.email.value.match( this.models.email.regex ) === null )
				{
					this.alerts.push({
						type: "warning",
						message: $f( "Invalid {}!", this.models.email.label )
					});
					return;
				}
			}
			
			// Send request handler.
			this.onpost();
			
		},
		onpost: async function()
		{
			let self = this;
			let options = {
				data: {
					email: self.models.email.value,
					subject: self.models.subject.value,
					message: self.models.message.value
				},
				events: {},
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/x-www-form-urlencoded"
				}
			};
			let request = await $Request( "POST", self.target, options )
				.then( e =>
				{
					if( e.status === 200 )
					{
						self.alerts.push({ type: "success", message: "The request has been sent successfully." });
					} else {
						self.alerts.push({ type: "warning", message: $f( "Warning status code {}: {}", e.status, e.statusText ) });
					}
					self.freset();
				})
				.catch( e =>
				{
					self.alerts.push({ type: "error", message: "Failed to send request." });
				});
		}
	},
	components: {
		Alert: $Alert
	},
	template: `
		<div class="contact bg-02m">
			<div class="bantle flex flex-center">
				<h1 class="title">Contact</h1>
			</div>
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
						<form class="form pd-top-22" @submit="submit">
							<div class="form-group mg-bottom-20 mg-lc-bottom">
								<label class="dp-block form-label">Email Subject</label>
								<input class="dp-block form-input" type="text" v-model="this.models.subject.value">
							</div>
							<div class="form-group mg-bottom-20 mg-lc-bottom">
								<label class="dp-block form-label">Email Address</label>
								<input class="dp-block form-input" type="email" v-model="this.models.email.value">
							</div>
							<div class="form-group mg-bottom-20 mg-lc-bottom">
								<label class="dp-block form-label">Email Message</label>
								<textarea class="dp-block form-input form-texta" v-model="this.models.message.value"></textarea>
							</div>
							<div class="form-group mg-bottom-20 mg-lc-bottom">
								<button class="form-input form-submit" disable="">Send Mail</button>
							</div>
						</form>
						<Alert :errors="alerts" v-if="( alerts.length > 0 )" />
					</div>
				</div>
			</div>
		</div>
	`
};