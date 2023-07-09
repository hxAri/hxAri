
// Import Highlight.js
import hljs from "highlight.js/lib/core";
import bash from "highlight.js/lib/languages/bash";
import c from "highlight.js/lib/languages/c";
import cpp from "highlight.js/lib/languages/cpp";
import css from "highlight.js/lib/languages/css";
import go from "highlight.js/lib/languages/go";
import gradle from "highlight.js/lib/languages/gradle";
import groovy from "highlight.js/lib/languages/groovy";
import java from "highlight.js/lib/languages/java";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import kotlin from "highlight.js/lib/languages/kotlin";
import markdown from "highlight.js/lib/languages/markdown";
import php from "highlight.js/lib/languages/php";
import python from "highlight.js/lib/languages/python";
import ruby from "highlight.js/lib/languages/ruby";
import sql from "highlight.js/lib/languages/sql";
import xml from "highlight.js/lib/languages/xml";

// Import Scripts
import Type from "/src/scripts/Type.js";
import Value from "/src/scripts/logics/Value.js";

// Registering language.
hljs.registerLanguage( "bash", bash );
hljs.registerLanguage( "c", c );
hljs.registerLanguage( "cpp", cpp );
hljs.registerLanguage( "css", css );
hljs.registerLanguage( "go", go );
hljs.registerLanguage( "gradle", gradle );
hljs.registerLanguage( "groovy", groovy );
hljs.registerLanguage( "java", java );
hljs.registerLanguage( "javascript", javascript );
hljs.registerLanguage( "json", json );
hljs.registerLanguage( "kotlin", kotlin );
hljs.registerLanguage( "markdown", markdown );
hljs.registerLanguage( "php", php );
hljs.registerLanguage( "python", python );
hljs.registerLanguage( "ruby", ruby );
hljs.registerLanguage( "sql", sql );
hljs.registerLanguage( "xml", xml );

/*
 * Return if tag name is paired.
 *
 * @params String tag
 *  HTML tag name
 *
 * @return Boolean
 */
const paired = tag => unpaired( tag ) === false;

/*
 * Return if tag name is unpaired.
 *
 * @params String tag
 *  HTML tag name
 *
 * @return Boolean
 */
const unpaired = tag => /^(?:area|base|br|col|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/i.exec( tag ) !== null;

/*
 * Replace sensitive characters.
 *
 * @params String $string
 *
 * @return String
 */
function replace( string )
{
	return( String( string )
		.replace( /\&/g, "&amp;" )
		.replace( /\</g, "&#60;" )
		.replace( /\>/g, "&#62;" )
		.replace( /\"/g, "&#34;" )
		.replace( /\'/g, "&#39;" )
	);
}

/*
 * Arrange or create raw html syntax.
 *
 * @params Array<HTMLElement|Object>|HTMLElement|Object name
 * @params Object attributes
 *
 * @return String
 *  Html raw string syntax
 */
function arrange( name, attributes = {} )
{
	// If element is multiple or more than one.
	if( Type( name, Array ) )
	{
		var elements = [];
		for( let i in name )
		{
			elements[i] = arrange( name[i].name, Type( name[i].attributes, Object ) ? name[i].attributes : {} );
		}
		return( elements.join( "\n" ) );
	}
	
	// If element is Object type.
	else if( Type( name, Object ) )
	{
		return( arrange( name.name, Type( name.attributes, Object ) ? name.attributes : {} ) );
	}
	
	// If element is HTMLElement.
	else if( Type( name ).match( /^HTML[a-zA-Z]+Element/ ) )
	{
		// Create dummy element.
		var dummy = create( "div", {} );
			dummy.appendChild( name );
		
		// Return innerHTML from dummy.
		return( dummy.innerHTML );
	}
	else {
		
		var element = `<${name}`;
		var innerHTML = "";
		
		for( let key in attributes )
		{
			// If attribute is style.
			if( key.match( /^style$/i ) )
			{
				if( Type( attributes[key], Object ) )
				{
					// Stack styles.
					var styles = "";
					
					// Append style property.
					for( let style in attributes[key] )
					{
						styles += `\x20${style.replace( /[A-Z]/, m => "-" + m.toLowerCase() )}: ${attributes[key][style]};`;
					}
					attributes[key] = styles.trim();
				}
			}
			
			if( key.match( /^innerText$/i ) )
			{
				innerHTML = attributes[key];
				continue;
			}
			
			if( key.match( /^innerHTML$/i ) )
			{
				// If inner is Single Element Object or HTMLElement.
				if( Type( attributes[key] ).match( /^HTML[a-zA-Z]+Element|Object/ ) ) attributes[key] = [ attributes[key] ];
				
				// If inner is Multiple Element Object.
				if( Type( attributes[key], Array ) )
				{
					for( let i in attributes[key] )
					{
						innerHTML += arrange( attributes[key][i] );
					}
				}
				
				// If tag name is Pre or Code.
				else if( name.match( /^code|pre$/i ) )
				{
					try
					{
						var dataset = attributes.data ? attributes.data : attributes.dataset;
						var options = {
							language: dataset.language.toLowerCase()
						};
					}
					catch( e )
					{
						var options = {};
					}
					innerHTML += hljs.highlight( attributes[key], options ).value;
				}
				else {
					//innerHTML += replace( attributes[key] );
					innerHTML += /*replace(*/ attributes[key] //);
				}
				continue;
			}
			
			// If attribute is dataset.
			if( key.match( /^(?:data|dataset)$/i ) )
			{
				// Skip append if dataset is not Object.
				if( Type( attributes[key], Object ) === false ) continue;
				
				// Append datasets.
				for( let data in attributes[key] )
				{
					element += `\x20data-${data}="${attributes[key][data]}"`;
				}
				continue;
			}
			if( Value.isNotEmpty( attributes[key] ) )
			{
				element += `\x20${key}="${attributes[key]}"`;
			}
			else {
				element += `\x20${key}`;
			}
		}
		element += paired( name ) ? `>${innerHTML}</${name}>` : "/>";
	}
	return( element );
}

/*
 * Create HTMLElement.
 *
 * @params String name
 *  HTML Element tag name
 * @params Object attributes
 *  HTML Element attributes
 *
 * @return HTMLElement
 */
function create( name, attributes = {} )
{
	var element = document.createElement( name );
	
	// Check if attribute is Object type.
	if( Type( attributes, Object ) )
	{
		for( let key in attributes )
		{
			var match = null;
			
			// If attribute is dataset.
			if( key.match( /^(?:data|dataset)$/i ) )
			{
				// Skip append if dataset is not Object.
				if( Type( attributes[key], Object ) === false ) continue;
				
				// Append datasets.
				for( let data in attributes[key] )
				{
					element.dataset[data] = attributes[key][data];
				}
				continue;
			}
			
			// If attribute is single dataset.
			else if( match = /^data\-(?<data>[a-zA-Z0-9\-]+)/i.exec( key ) )
			{
				// Add single datasets.
				element.dataset[match.groups.data] = attributes[key];
				continue;
			}
			
			// If attribute is style.
			else if( key.match( /^style$/i ) )
			{
				// Only object can be sets.
				if( Type( attributes[key], Object ) )
				{
					// Append style property.
					for( let style in attributes[key] )
					{
						element.style[style.replace( /\-[a-z]/, m => m[1].toUpperCase() )] = attributes[key][style];
					}
				}
			}
			
			// If attribute name is innerHTML.
			else if( key.match( /^innerHTML$/i ) )
			{
				// If inner is Single Element Object or HTMLElement.
				if( Type( attributes[key] ).match( /^HTML[a-zA-Z]+Element|Object/ ) ) attributes[key] = [ attributes[key] ];
				
				// If inner is Multiple Element Object.
				if( Type( attributes[key], Array ) )
				{
					// Append multiple elements.
					multiple( element, attributes[key] );
				}
				else {
					element.innerHTML = replace( attributes[key] );
				}
				continue;
			}
			
			// If attribute is callable.
			else if( Type( attributes[key], [ Function, key ] ) )
			{
				// Set event listener for element.
				element.addEventListener( key, attributes[key] );
			}
			else {
				
				// Set new attribute for element.
				element.setAttribute( key, attributes[key] );
				
				// Check if attribute does not sets.
				if( element[key] !== attributes[key] )
				{
					// Re-set attribute for element.
					element[key] = attributes[key];
					element.removeAttribute( key );
				}
			}
		}
	}
	return( element );
}

/*
 * Create multiple HTMLElement.
 *
 * @params HTMLElement append
 *  Automatically append element into parent.
 * @params Array<Object> elements
 *  See `create` function
 *
 * @return Array<HTMLElement>
 */
function multiple( append, elements )
{
	if( Type( append, Array ) ) return( multiple( null, append ) );
	if( Type( elements, Array ) )
	{
		for( let i in elements )
		{
			// Create new element.
			elements[i] = create( elements[i].name, elements[i].attributes ? elements[i].attributes : {} );
			
			// If root element is available.
			if( Type( append ).match( /^HTML[a-zA-Z]+Element$/ ) )
			{
				append.appendChild( elements[i] );
			}
		}
	}
	return( elements );
}

export default {
	arrange: arrange,
	create: create,
	paired: paired,
	replace: replace,
	multiple: multiple,
	unpaired: unpaired
};