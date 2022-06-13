const $Home = {
	data: () => ({
	}),
	mounted: function()
	{
	},
	methods: {},
	components: {
		Abouts: $Abouts,
		Project: $Project,
		Contact: $Contact
	},
	template: `
		<div class="home">
			<Abouts />
			<Project />
			<Contact />
		</div>
	`
};