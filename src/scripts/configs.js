
/**
 * 
 * hxAri | configs.js
 * 
 * @author hxAri
 * @github https://github.com/hxAri/hxAri
 * @license MIT
 * 
 * Copyright (c) 2022 Ari Setiawan | hxAri
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 */


/** ... */
class Address {
	
	/** @type {String} */
	country;
	
	/** @type {String} */
	district;
	
	/** @type {Number} */
	postcode;
	
	/** @type {String} */
	province;
	
	/** @type {String} */
	regency;
	
	/** @type {String} */
	universe;
	
	/**
	 * Construct method of class Address
	 * 
	 * @param {Object} kwargs 
	 * @param {String} kwargs.country
	 * @param {String} kwargs.district
	 * @param {Number} kwargs.postcode
	 * @param {String} kwargs.province
	 * @param {String} kwargs.regency
	 * @param {String} kwargs.universe
	 * 
	 */
	constructor( kwargs={} ) {
		this.country = kwargs?.country;
		this.district = kwargs?.district;
		this.postcode = kwargs?.postcode;
		this.province = kwargs?.province;
		this.regency = kwargs?.regency;
		this.universe = kwargs?.universe;
	}
	
}

/** ... */
class Author {
	
	/** @type {Array<String>} */
	abouts;
	
	/** @type {Address} */
	address;
	
	/** @type {String} */
	alias;
	
	/** @type {String} */
	company;
	
	/** @type {Contact} */
	contact;
	
	/** @type {String} */
	headline;
	
	/** @type {String} */
	name;
	
	/** @type {Socmed} */
	socmed;
	
	/** @type {Object} */
	status;
	
	/**
	 * Construct method of class Author
	 * 
	 * @param {Object} kwargs 
	 * @param {Array<String>} kwargs.abouts
	 * @param {Address} kwargs.address
	 * @param {String} kwargs.alias
	 * @param {String} kwargs.company
	 * @param {Contact} kwargs.contact
	 * @param {String} kwargs.headline
	 * @param {String} kwargs.name
	 * @param {Socmed} kwargs.socmed
	 * @param {Object} kwargs.status
	 * 
	 */
	constructor( kwargs={} ) {
		this.abouts = kwargs?.abouts;
		this.address = kwargs?.address;
		if( this.address instanceof Address === false ) {
			this.address = new Address( this.address || {} );
		}
		this.alias = kwargs?.alias;
		this.company = kwargs?.company;
		this.contact = kwargs?.contact;
		if( this.contact instanceof Contact === false ) {
			this.contact = new Contact( this.contact || {} );
		}
		this.headline = kwargs?.headline;
		this.name = kwargs?.name;
		this.socmed = kwargs?.socmed;
		if( this.socmed instanceof Socmed === false ) {
			this.socmed = new Socmed( this.socmed || {} );
		}
		this.status = kwargs?.status;
	}
	
}

class Certificate {
	
	/** @type {Array<CertificateItem>} */
	items;
	
	/** @type {Object} */
	sources;
	
	/**
	 * Construct method of class Certificate
	 * 
	 * @param {Object} kwargs 
	 * @param {Array<CertificateItem>} kwargs.items
	 * @param {Object} kwargs.sources
	 * 
	 */
	constructor( kwargs={} ) {
		this.items = kwargs?.items || [];
		this.items = this.items.map( element => element instanceof CertificateItem ? element : new CertificateItem( element || {} ) );
		this.sources = kwargs?.sources || {};
	}
	
}

class CertificateItem {
	
	/** @type {Array<String>} */
	description;
	
	/** @type {String} */
	filename;
	
	/** @type {Array<Galery>} */
	galery;
	
	/** @type {?CertificateSource} */
	source;
	
	/** @type {String} */
	thumbnail;
	
	/** @type {Number} */
	timestamp;
	
	/** @type {String} */
	title;
	
	/**
	 * Construct method of class CertificateItem
	 * 
	 * @param {Object} kwargs 
	 * @param {Array<String>} kwargs.description
	 * @param {String} kwargs.filename
	 * @param {Array<Galery>} kwargs.galery
	 * @param {?CertificateSource} kwargs.source
	 * @param {String} kwargs.thumbnail
	 * @param {Number} kwargs.timestamp
	 * @param {String} kwargs.title
	 * 
	 */
	constructor( kwargs={} ) {
		this.description = kwargs?.description || [];
		this.filename = kwargs?.filename;
		this.galery = kwargs?.galery || [];
		this.galery = this.galery.map( element => element instanceof Galery ? element : new Galery( element || {} ) );
		this.source = kwargs?.source || {};
		if( this.source instanceof CertificateSource === false ) {
			this.source = new CertificateSource( this.source || {} );
		}
		this.thumbnail = kwargs?.thumbnail;
		this.timestamp = kwargs?.timestamp;
		this.title = kwargs?.title;
	}
	
}

class CertificateSource {
	
	/** @type {String} */
	name;
	
	/** @type {String} */
	url;
	
	/**
	 * Construct method of class CertificateSource
	 * 
	 * @param {Object} kwargs 
	 * @param {String} kwargs.name
	 * @param {String} kwargs.url
	 * 
	 */
	constructor( kwargs={} ) {
		this.name = kwargs?.name;
		this.url = kwargs?.url;
	}
	
}

class Configs {
	
	/** @type {Author} */
	author;
	
	/** @type {Certificate} */
	certificate;
	
	/** @type {ContactDisplay} */
	contact;
	
	/** @type {Array<ExperienceItem>} */
	experiences;
	
	/** @type {HomeDisplay} */
	home;
	
	/** @type {Image} */
	image;
	
	/** @type {Maintenance} */
	maintenance;
	
	/** @type {Array<String>} */
	organizations;
	
	/** @type {Project} */
	project;
	
	/** @type {Programming} */
	programming;
	
	/** @type {Object} */
	resume;
	
	/** @type {Map<String,Array<Route>>} */
	routes;
	
	/** @type {Service} */
	service;
	
	/** @type {Technology} */
	technology;
	
	/** @type {Object} */
	terminal;
	
	/** @type {Array<Thirdparty>} */
	thirdparty;
	
	/**
	 * Construct method of class Configs
	 * 
	 * @param {Object} kwargs 
	 * @param {Author} kwargs.author
	 * @param {Certificate} kwargs.certificate
	 * @param {ContactDisplay} kwargs.contact
	 * @param {Array<ExperienceItem>} kwargs.experiences
	 * @param {HomeDisplay} kwargs.home
	 * @param {Image} kwargs.image
	 * @param {Maintenance} kwargs.maintenance
	 * @param {Array<String>} kwargs.organizations
	 * @param {Project} kwargs.project
	 * @param {Programming} kwargs.programming
	 * @param {Object} kwargs.resume
	 * @param {Map<String,Array<Route>>} kwargs.routes
	 * @param {Service} kwargs.service
	 * @param {Technology} kwargs.technology
	 * @param {Object} kwargs.terminal
	 * @param {Array<Thirdparty>} kwargs.thirdparty
	 * 
	 */
	constructor( kwargs={} ) {
		this.author = kwargs?.author;
		if( this.author instanceof Author === false ) {
			this.author = new Author( this.author || {} );
		}
		this.certificate = kwargs?.certificate;
		if( this.certificate instanceof Certificate === false ) {
			this.certificate = new Certificate( this.certificate || {} );
		}
		this.contact = kwargs?.contact;
		if( this.contact instanceof ContactDisplay === false ) {
			this.contact = new ContactDisplay( this.contact || {} );
		}
		this.experiences = kwargs?.experiences || [];
		this.experiences = this.experiences.map( element => {
			if( element instanceof ExperienceItem === false ) {
				return new ExperienceItem( element || {} );
			}
			return element;
		});
		this.home = kwargs?.home;
		if( this.home instanceof HomeDisplay === false ) {
			this.home = new HomeDisplay( this.home || {} );
		}
		this.image = kwargs?.image;
		if( this.image instanceof Image === false ) {
			this.image = new Image( this.image || {} );
		}
		this.maintenance = kwargs?.maintenance;
		if( this.maintenance instanceof Maintenance === false ) {
			this.maintenance = new Maintenance( this.maintenance || {} );
		}
		this.organizations = kwargs?.organizations || [];
		this.project = kwargs?.project;
		if( this.project instanceof Project === false ) {
			this.project = new Project( this.project || {} );
		}
		this.programming = kwargs?.programming;
		if( this.programming instanceof Programming === false ) {
			this.programming = new Programming( this.programming || {} );
		}
		this.resume = kwargs?.resume || {};
		this.routes = kwargs?.routes || new Map();
		if( this.routes instanceof Map === false ) {
			this.routes = new Map();
			for( let keyset of Object.keys( kwargs?.routes || {} ) ) {
				var routes = kwargs.routes[keyset] || [];
					routes = routes.map( element => {
						if( element instanceof Route === false ) {
							return new Route( element || {} );
						}
						return element;
					});
				this.routes.set( keyset,  routes );
			}
		}
		this.service = kwargs?.service;
		if( this.service instanceof Service === false ) {
			this.service = new Service( this.service || {} );
		}
		this.technology = kwargs?.technology;
		if( this.technology instanceof Technology === false ) {
			this.technology = new Technology( this.technology || {} );
		}
		this.terminal = kwargs?.terminal || {};
		this.thirdparty = kwargs?.thirdparty || [];
		this.thirdparty = this.thirdparty.map( element => {
			if( element instanceof Thirdparty === false ) {
				return new Thirdparty( element || {} );
			}
			return element;
		});
	}
	
}

class Contact {
	
	/** @type {?String} */
	email;
	
	/** @type {?String} */
	phone;
	
	/**
	 * Construct method of class Contact
	 * 
	 * @param {Object} kwargs 
	 * @param {?String} kwargs.email
	 * @param {?String} kwargs.phone
	 * 
	 */
	constructor( kwargs={} ) {
		this.email = kwargs?.email;
		this.phone = kwargs?.phone;
	}
	
}

class ContactDisplay {
	
	/** @type {Boolean} */
	address;
	
	/** @type {Boolean} */
	usermail;
	
	/** @type {Boolean} */
	whatsapp;
	
	/**
	 * Construct method of class ContactDisplay
	 * 
	 * @param {Object} kwargs 
	 * @param {Boolean} kwargs.address
	 * @param {Boolean} kwargs.usermail
	 * @param {Boolean} kwargs.whatsapp
	 * 
	 */
	constructor( kwargs={} ) {
		this.address = kwargs?.address ?? false;
		this.usermail = kwargs?.usermail ?? false;
		this.whatsapp = kwargs?.whatsapp ?? false;
	}
	
}

class ExperienceItem {
	
	/** @type {String} */
	address;
	
	/** @type {Array<CertificateItem>} */
	certificates;
	
	/** @type {String} */
	company;
	
	/** @type {Array<String>} */
	description;
	
	/** @type {Array<String>} */
	details;
	
	/** @type {Array<Galery>} */
	galery;
	
	/** @type {?String} */
	gmaplink;
	
	/** @type {?String} */
	logo;
	
	/** @type {?String} */
	position;
	
	/** @type {Array<ExperienceProjectItem>} */
	projects;
	
	/** @type {String} */
	status;
	
	/** @type {Timeframe} */
	timestamp;
	
	/** @type {String} */
	title;
	
	/**
	 * Construct method of class ExperienceItem
	 * 
	 * @param {Object} kwargs 
	 * @param {String} kwargs.address
	 * @param {Array<CertificateItem>} kwargs.certificates
	 * @param {String} kwargs.company
	 * @param {Array<String>} kwargs.description
	 * @param {Array<String>} kwargs.details
	 * @param {Array<Galery>} kwargs.galery
	 * @param {?String} kwargs.gmaplink
	 * @param {?String} kwargs.logo
	 * @param {?String} kwargs.position
	 * @param {Array<ExperienceProjectItem>} kwargs.projects
	 * @param {String} kwargs.status
	 * @param {Timeframe} kwargs.timestamp
	 * @param {String} kwargs.title
	 * 
	 */
	constructor( kwargs={} ) {
		this.address = kwargs?.address;
		this.certificates = kwargs?.certificates || [];
		this.certificates = this.certificates.map( element => element instanceof CertificateItem ? element : new CertificateItem( element || {} ) );
		this.company = kwargs?.company;
		this.description = kwargs?.description || [];
		this.details = kwargs?.details || [];
		this.galery = kwargs?.galery || [];
		this.gmaplink = kwargs?.gmaplink;
		this.logo = kwargs?.logo;
		this.position = kwargs?.position;
		this.projects = kwargs?.projects || [];
		this.projects = this.projects.map( element => element instanceof ExperienceProjectItem ? element : new ExperienceProjectItem( element || {} ) );
		this.status = kwargs?.status;
		this.timestamp = kwargs?.timestamp || [];
		if( this.timestamp instanceof Timeframe === false ) {
			this.timestamp = new Timeframe( this.timestamp || {} );
		}
		this.title = kwargs?.title;
	}
	
}

class ExperienceProjectItem {
	
	/** @type {Array<String>} */
	description;
	
	/** @type {Array<Galery>} */
	galery;
	
	/** @type {String} */
	name;
	
	/** @type {Array<String>} */
	skills;
	
	/** @type {Timeframe} */
	timestamp;
	
	/**
	 * Construct method of class ExperienceProjectItem
	 * 
	 * @param {Object} kwargs 
	 * @param {Array<String>} kwargs.description
	 * @param {Array<Galery>} kwargs.galery
	 * @param {String} kwargs.name
	 * @param {Array<String>} kwargs.skills
	 * @param {Timeframe} kwargs.timestamp
	 */
	constructor( kwargs={} ) {
		this.description = kwargs?.description || [];
		this.galery = kwargs?.galery || [];
		this.galery = this.galery.map( element => element instanceof Galery ? element : new Galery( element || {} ) );
		this.name = kwargs?.name;
		this.skills = kwargs?.skills || [];
		this.timestamp = kwargs?.timestamp;
		if( this.timestamp instanceof Timeframe === false ) {
			this.timestamp = new Timeframe( this.timestamp || {} );
		}
	}
	
}

class Galery {
	
	/** @type {Array<String>} */
	description;
	
	/** @type {String} */
	filename;
	
	/** @type {?Number} */
	timestamp;
	
	/**
	 * Construct method of class Galery
	 * 
	 * @param {Object} kwargs 
	 * @param {Array<String>} kwargs.description
	 * @param {String} kwargs.filename
	 * @param {?Number} kwargs.timestamp
	 * 
	 */
	constructor( kwargs={} ) {
		this.description = kwargs?.description || [];
		this.filename = kwargs?.filename;
		this.timestamp = kwargs?.timestamp;
	}
	
}

class HomeDisplay {
	
	/** @type {Boolean} */
	about;
	
	/** @type {Boolean} */
	certificate;
	
	/** @type {Boolean} */
	experience;
	
	/** @type {Boolean} */
	project;
	
	/** @type {Boolean} */
	programming;
	
	/** @type {Boolean} */
	technology;
	
	/**
	 * Construct method of class HomeDisplay
	 * 
	 * @param {Object} kwargs 
	 * @param {Boolean} kwargs.about
	 * @param {Boolean} kwargs.certificate
	 * @param {Boolean} kwargs.experience
	 * @param {Boolean} kwargs.project
	 * @param {Boolean} kwargs.programming
	 * @param {Boolean} kwargs.technology
	 * 
	 */
	constructor( kwargs={} ) {
		this.about = kwargs?.about ?? false;
		this.certificate = kwargs?.certificate ?? false;
		this.experience = kwargs?.experience ?? false;
		this.project = kwargs?.project ?? false;
		this.programming = kwargs?.programming ?? false;
		this.technology = kwargs?.technology ?? false;
	}
	
}

class Image {
	
	/** @type {Array<Object>} */
	items;
	
	/** @type {String} */
	source;
	
	/**
	 * Construct method of class Image
	 * 
	 * @param {Object} kwargs 
	 * @param {Array<Object>} items
	 * @param {String} source
	 * 
	 */
	constructor( kwargs={} ) {
		this.items = kwargs?.items || [];
		this.source = kwargs?.source;
	}
	
}

class Maintenance {
	
	/** @type {Boolean} */
	about;
	
	/** @type {Boolean} */
	contact;
	
	/** @type {Boolean} */
	editor;
	
	/** @type {Boolean} */
	home;
	
	/** @type {Boolean} */
	none;
	
	/** @type {Boolean} */
	preview;
	
	/** @type {Boolean} */
	privacy;
	
	/** @type {Boolean} */
	project;
	
	/** @type {Boolean} */
	projects;
	
	/** @type {Boolean} */
	service;
	
	/** @type {Boolean} */
	sitemap;
	
	/** @type {Boolean} */
	terminal;
	
	/**
	 * Construct method of class Maintenance
	 * 
	 * @param {Object} kwargs 
	 * @param {Boolean} kwargs.about
	 * @param {Boolean} kwargs.contact
	 * @param {Boolean} kwargs.editor
	 * @param {Boolean} kwargs.home
	 * @param {Boolean} kwargs.none
	 * @param {Boolean} kwargs.preview
	 * @param {Boolean} kwargs.privacy
	 * @param {Boolean} kwargs.project
	 * @param {Boolean} kwargs.projects
	 * @param {Boolean} kwargs.service
	 * @param {Boolean} kwargs.sitemap
	 * @param {Boolean} kwargs.terminal
	 * 
	 */
	constructor( kwargs={} ) {
		this.about = kwargs?.about ?? false;
		this.contact = kwargs?.contact ?? false;
		this.editor = kwargs?.editor ?? false;
		this.home = kwargs?.home ?? false;
		this.none = kwargs?.none ?? false;
		this.preview = kwargs?.preview ?? false;
		this.privacy = kwargs?.privacy ?? false;
		this.project = kwargs?.project ?? false;
		this.projects = kwargs?.projects ?? false;
		this.service = kwargs?.service ?? false;
		this.sitemap = kwargs?.sitemap ?? false;
		this.terminal = kwargs?.terminal ?? false;
	}
	
}

class Programming {
	
	/** @type {Array<String>} */
	description;
	
	/** @type {Array<ProgrammingExpertice>} */
	expertices;
	
	/** @type {Number} */
	percentage;
	
	/**
	 * Construct method of class Programming
	 * 
	 * @param {Object} kwargs 
	 * @param {Array<String>} description
	 * @param {Array<ProgrammingExpertice>} expertices
	 * @param {Number} percentage
	 * 
	 */
	constructor( kwargs={} ) {
		this.description = kwargs?.description || [];
		this.expertices = kwargs?.expertices || [];
		this.expertices = this.expertices.map( element => element instanceof ProgrammingExpertice ? element : new ProgrammingExpertice( element || {} ) );
		this.percentage = kwargs?.percentage;
	}
	
}

class ProgrammingExpertice {
	
	/** @type {Array<CertificateItem>} */
	certificates;
	
	/** @type {Array<String>} */
	descriptions;
	
	/** @type {Stirng} */
	logo;
	
	/** @type {String} */
	name;
	
	/**
	 * Construct method of class ProgrammingExpertice
	 * 
	 * @param {Object} kwargs 
	 * @param {Array<CertificateItem>} certificates
	 * @param {Array<String>} descriptions
	 * @param {Stirng} logo
	 * @param {String} name
	 * 
	 */
	constructor( kwargs={} ) {
		this.certificates = kwargs?.certificates || [];
		this.certificates = this.certificates.map( element => element instanceof CertificateItem ? element : new CertificateItem( element || {} ) );
		this.descriptions = kwargs?.descriptions || [];
		this.logo = kwargs?.logo;
		this.name = kwargs?.name;
	}
	
}

class Project {
	
	/** @type {Array<String>} */
	description;
	
	/** @type {Array<ProjectItem>} */
	items;
	
	/**
	 * Construct method of class Project
	 * 
	 * @param {Object} kwargs 
	 * @param {Array<String>} kwargs.description
	 * @param {Array<ProjectItem>} kwargs.items
	 * 
	 */
	constructor( kwargs={} ) {
		this.description = kwargs?.description || [];
		this.items = kwargs?.items || [];
		this.items = this.items.map( element => element instanceof ProjectItem ? element : new ProjectItem( element || {} ) );
	}
	
}

class ProjectItem {
	
	/** @type {?Object} */
	api;
	
	/** @type {?ProjectDocument} */
	document;
	
	/** @type {String} */
	endpoint;
	
	/** @type {String} */
	homepage;
	
	/** @type {Boolean} */
	include;
	
	/** @type {String} */
	language;
	
	/** @type {String} */
	name;
	
	/** @type {Array<ProjectPreviewItem>} */
	previews;
	
	/** @type {ProjectReadme} */
	readme;
	
	/** @type {String} */
	thumbnail;
	
	/**
	 * Construct method of class ProjectItem
	 * 
	 * @param {Object} kwargs 
	 * @param {?ProjectDocument} kwargs.document
	 * @param {String} kwargs.endpoint
	 * @param {String} kwargs.homepage
	 * @param {Boolean} kwargs.include
	 * @param {String} kwargs.language
	 * @param {String} kwargs.name
	 * @param {Array<ProjectPreviewItem>} kwargs.previews
	 * @param {ProjectReadme} kwargs.readme
	 * @param {String} kwargs.thumbnail
	 * 
	 */
	constructor( kwargs={} ) {
		this.api = null;
		this.document = kwargs?.document;
		if( this.document instanceof ProjectDocument === false ) {
			this.document = new ProjectDocument( this.document || {} );
		}
		this.endpoint = kwargs?.endpoint;
		this.homepage = kwargs?.homepage;
		this.include = kwargs?.include;
		this.language = kwargs?.language;
		this.name = kwargs?.name;
		this.previews = kwargs?.previews || [];
		this.previews = this.previews.map( element => element instanceof ProjectPreviewItem ? element : new ProjectPreviewItem( element || {} ) );
		this.readme = kwargs?.readme;
		if( this.readme instanceof ProjectReadme === false ) {
			this.readme = new ProjectReadme( this.readme || {} );
		}
		this.thumbnail = kwargs?.thumbnail;
	}
	
}

class ProjectDocument {
	
	/** @type {?Object} */
	contents;
	
	/** @type {String} */
	url;
	
	/**
	 * Construct method of class ProjectDocument
	 * 
	 * @param {Object} kwargs 
	 * @param {?Object} kwargs.contents
	 * @param {String} kwargs.url
	 * 
	 */
	constructor( kwargs={} ) {
		this.contents = kwargs?.contents || {};
		this.url = kwargs?.url;
	}
	
}

class ProjectPreviewItem {
	
	/** @type {Array<String>} */
	descriptions;
	
	/** @type {String} */
	image;
	
	/**
	 * Construct method of class ProjectPreviewItem
	 * 
	 * @param {Object} kwargs 
	 * @param {Array<String>} kwargs.descriptions
	 * @param {String} kwargs.image
	 * 
	 */
	constructor( kwargs={} ) {
		this.descriptions = kwargs?.descriptions || [];
		this.image = kwargs?.image;
	}
	
}

class ProjectReadme {
	
	/** @type {?String} */
	contents;
	
	/** @type {?Error} */
	onerror;
	
	/** @type {Boolean} */
	loading;
	
	/** @type {?XMLHttpRequest} */
	request;
	
	/** @type {String} */
	url;
	
	/**
	 * Construct method of class ProjectReadme
	 * 
	 * @param {Object} kwargs 
	 * @param {?Object} kwargs.contents
	 * @param {String} kwargs.url
	 * 
	 */
	constructor( kwargs={} ) {
		this.contents = kwargs?.contents;
		this.loading = false;
		this.onerror = null;
		this.request = null;
		this.url = kwargs?.url;
	}
	
}

class Route {
	
	/** @type {Array<String>} */
	contents;
	
	/** @type {Boolean} */
	subtitle;
	
	/**
	 * Construct method of class Route
	 * 
	 * @param {Object} kwargs 
	 * @param {Array<String>} kwargs.contents
	 * @param {Boolean} kwargs.subtitle
	 * 
	 */
	constructor( kwargs={} ) {
		this.contents = kwargs?.contents || [];
		this.subtitle = kwargs?.subtitle ?? false;
	}
	
}

class Service {
	
	/**
	 * Construct method of class Service
	 * 
	 * @param {Object} kwargs 
	 * 
	 */
	constructor( kwargs={} ) {
	}
	
}

class Socmed {
	
	/** @type {?String} */
	facebook;
	
	/** @type {?String} */
	github;
	
	/** @type {?String} */
	gitlab;
	
	/** @type {?String} */
	instagram;
	
	/** @type {?String} */
	linkedin;
	
	/** @type {?String} */
	telegram;
	
	/** @type {?String} */
	threads;
	
	/** @type {?String} */
	tiktok;
	
	/** @type {?String} */
	x;
	
	/** @type {?String} */
	youtube;
	
	/**
	 * Construct method of class Socmed
	 * 
	 * @param {Object} kwargs 
	 * @param {?String} kwargs.facebook
	 * @param {?String} kwargs.github
	 * @param {?String} kwargs.gitlab
	 * @param {?String} kwargs.instagram
	 * @param {?String} kwargs.linkedin
	 * @param {?String} kwargs.telegram
	 * @param {?String} kwargs.threads
	 * @param {?String} kwargs.tiktok
	 * @param {?String} kwargs.x
	 * @param {?String} kwargs.youtube
	 * 
	 */
	constructor( kwargs={} ) {
		this.facebook = kwargs?.facebook;
		this.github = kwargs?.github;
		this.gitlab = kwargs?.gitlab;
		this.instagram = kwargs?.instagram;
		this.linkedin = kwargs?.linkedin;
		this.telegram = kwargs?.telegram;
		this.threads = kwargs?.threads;
		this.tiktok = kwargs?.tiktok;
		this.x = kwargs?.x;
		this.youtube = kwargs.youtube;
	}
	
}

class Thirdparty {
	
	/** @type {?String} */
	github;
	
	/** @type {String} */
	name;
	
	/**
	 * Construct method of class Thirdparty
	 * 
	 * @param {Object} kwargs 
	 * @param {?String} kwargs.github
	 * @param {?String} kwargs.name
	 */
	constructor( kwargs={} ) {
		this.github = kwargs?.github;
		this.name = kwargs?.name;
	}
	
}

class Technology {
	
	/** @type {Array<String>} */
	description;
	
	/** @type {Array<TechnologyExpertice>} */
	expertices;
	
	/** @type {Number} */
	percentage;
	
	/**
	 * Construct method of class Technology
	 * 
	 * @param {Object} kwargs 
	 * @param {Array<String>} kwargs.description
	 * @param {Array<TechnologyExpertice>} kwargs.expertices
	 * @param {Number} kwargs.percentage
	 * 
	 */
	constructor( kwargs={} ) {
		this.description = kwargs?.description ?? [];
		this.expertices = kwargs?.expertices ?? [];
		this.expertices = this.expertices.map( element => element instanceof TechnologyExpertice ? element : new TechnologyExpertice( element || {} ) );
		this.percentage = kwargs?.percentage;
	}
	
}

class TechnologyExpertice {
	
	/** @type {Array<CertificateItem>} */
	certificates;
	
	/** @type {Array<String>} */
	descriptions;
	
	/** @type {Array<Galery>} */
	images;
	
	/** @type {Boolean} */
	include;
	
	/** @type {String} */
	logo;
	
	/** @type {String} */
	name;
	
	/** @type {String} */
	type;
	
	/**
	 * Construct method of class TechnologyExpertice
	 * 
	 * @param {Object} kwargs 
	 * @param {Array<CertificateItem>} kwargs.certificates
	 * @param {Array<String>} kwargs.descriptions
	 * @param {Array<Galery>} kwargs.images
	 * @param {Boolean} kwargs.include
	 * @param {String} kwargs.logo
	 * @param {String} kwargs.name
	 * @param {String} kwargs.type
	 * 
	 */
	constructor( kwargs={} ) {
		this.certificates = kwargs?.certificates ?? [];
		this.certificates = this.certificates.map( element => element instanceof CertificateItem ? element : new CertificateItem( element || {} ) );
		this.descriptions = kwargs?.descriptions ?? [];
		this.images = kwargs?.images ?? [];
		this.images = this.images.map( element => element instanceof Galery ? element : new Galery( element || {} ) );
		this.include = kwargs?.include ?? false;
		this.logo = kwargs?.logo;
		this.name = kwargs?.name;
		this.type = kwargs?.type;
	}
	
}

class Timeframe {
	
	/** @type {Number} */
	begin;
	
	/** @type {Number} */
	end;
	
	/**
	 * Construct method of class Timeframe
	 * 
	 * @param {Object} kwargs 
	 * @param {Number} kwargs.begin
	 * @param {Number} kwargs.end
	 * 
	 */
	constructor( kwargs={} ) {
		this.begin = kwargs?.begin;
		this.end = kwargs?.end;
	}
	
}


export {
	Address,
	Author,
	Certificate,
	CertificateItem,
	CertificateSource,
	Configs,
	Contact,
	ContactDisplay,
	ExperienceItem,
	ExperienceProjectItem,
	Galery,
	HomeDisplay,
	Image,
	Maintenance,
	Programming,
	ProgrammingExpertice,
	Project,
	ProjectItem,
	ProjectDocument,
	ProjectPreviewItem,
	ProjectReadme,
	Route,
	Service,
	Socmed,
	Thirdparty,
	Technology,
	TechnologyExpertice,
	Timeframe
};
