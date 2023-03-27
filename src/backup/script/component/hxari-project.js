
/*
 * Projects configurations.
 *
 * @values Object
 */
const $Projects = {
	
	request: {
		response: null,
		headers: {}
	},
	
	/*
	 * Check if project is exists.
	 *
	 * @params String $name
	 *
	 * @return Boolean
	 */
	exists: function( name )
	{
		// Check if variable $Routes is defined.
		if( $Is( $Routes, Array ) )
		{
			for( let route in $Routes )
			{
				// Check if route path is project.
				if( $Routes[route].path === "/projects" )
				{
					for( let child in $Routes[route].children )
					{
						// If project name is same.
						if( $Routes[route].children[child].name === name )
						{
							return( true );
						}
					}
				}
			}
		}
		return( false );
	},
	
	/*
	 * Select all route project.
	 *
	 * @return Array
	 */
	select: function()
	{
		// Check if variable $Routes is defined.
		if( $Is( $Routes, Array ) )
		{
			for( let i in $Routes )
			{
				// Check if route path is project.
				if( $Routes[i].path === "/projects" )
				{
					// Mapping all project page routes.
					return( $Routes[i].children.map( route =>
					{
						// ...
						route.path = $f( "/projects/{}", route.path.replace( /^\/projects\//i, "" ) );
						
						return( route );
					}));
				}
			}
		}
	},
	
	updated: false,
	
	/*
	 * Update route project.
	 *
	 * @params String $name
	 * @params Object $repos
	 *
	 * @return Void
	 */
	update: function( name, repos )
	{
		// Check if variable $Routes is defined.
		if( $Is( $Routes, Array ) )
		{
			// Parent route iteration.
			var i = 0;
			
			// Mapping routes.
			$Routes.forEach( route =>
			{
				// Check if route path is project.
				if( route.path === "/projects" )
				{
					// Children route iteration.
					var u = 0;
					
					// Mapping children projects.
					route.children.forEach( child =>
					{
						// If project name is same.
						if( child.name === name )
						{
							$Routes[i].children[u].include.icon = {
								icon: $Image.projects[name],
								type: "image"
							};
							$Routes[i].children[u].include.configs = repos;
						}
						u++;
					});
				}
				i++;
			});
		}
	}
};

/*
 * Project component.
 *
 */
const $Project = {
	data: () => ({
		language: {},
		projects: false
	}),
	mounted: function()
	{
		// Copy all programming language images.
		this.language = $Image.language;
		
		// Copy all project page routes.
		this.projects = $Projects.select();
		
		console.clear();
		console.info( $JSON.encode( this.projects, null, 4 ) );
	},
	template: `
		<div class="project">
			<div class="project-display" v-if="( $route.path === '/projects' )">
				<div class="portof-bantle flex flex-center">
					<h1 class="portof-title">Projects</h1>
				</div>
				<div class="project-wrapper">
					<div class="project-about">
						I've been studying programming for over 2 years, and here are some of the projects I've created and are still developing.
						Every project is open source anyone can use it or contribute.
					</div>
					<div class="project-super dp-grid">
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
			</div>
			<div class="project-view" v-else>
				<router-view />
			</div>
		</div>
	`,
	components: {
		Avatar: $Avatar
	}
};