
/**
 * 
 * hxAri | unixtime.js
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

import { Fmt } from "/src/scripts/formatter";
import { Typed } from "/src/scripts/types";


/**
 * Datetime format supported
 *
 * @property {Function} a
 * @property {Function} A
 * @property {Function} b
 * @property {Function} B
 * @property {Function} d
 * @property {Function} D
 * @property {Function} j
 * @property {Function} u
 * @property {Function} Y
 * @property {Function} y
 * @property {Function} m
 * @property {Function} H
 * @property {Function} I
 * @property {Function} M
 * @property {Function} S
 * 
 * @typedef {Object} UnixFormat
 * 
 */
const UnixFormat = {
   
   /** Locale's abbreviated weekday name (e.g., Sun) */
   a: self => self.day( "a" ),
   
   /** Locale's full weekday name (e.g., Sunday) */
   A: self => self.day( "A" ),
   
   /** Locale's abbreviated month name (e.g., Jan) */
   b: self => self.month( "b" ),
   
   /** Locale's full month name (e.g., January) */
   B: self => self.month( "B" ),
   
   /** Day of month (e.g., 01) */
   d: self => self.day( "d" ),
   
   /** Display date as mm/dd/yy */
   D: self => self.day( "D" ),
   
   /** Day of year (001..366) */
   j: self => self.day( "j" ),
   
   /** Day of week (1..7) */
   u: self => self.day( "u" ),
   
   /** Year (2022) */
   Y: self => self.years( "Y" ),
   
   /** Last two digits of year (22) */
   y: self => self.years( "y" ),
   
   /** Month (01..12) */
   m: self => self.month( "m" ),
   
   /** Hour (00..23) */
   H: self => self.hours( "H" ),
   
   /** Hour (00..23) */
   I: self => self.hours( "I" ),
   
   /** Minute (00..59) */
   M: self => self.minute(),
   
   /** Second (00..60) */
   S: self => self.second()
   
};

class UnixTime {
	
	/** @type {Date} */
	date;
	
	
	/**
	 * Construct method of class UnixTime
	 * 
	 * @param {Date|Number} datetime 
	 * 
	 */
	constructor( datetime ) {
		if( Typed( datetime, Number ) ) {
			if( new String( datetime ).length <= 10 ) {
				this.date = new Date( datetime * 1000 );
			}
			else {
				this.date = new Date( datetime );
			}
		}
		else if( Typed( datetime, String ) ) {
			this.date = new Date( datetime );
		}
		else {
			this.date = new Date();
		}
	}
	
	/**
	 * Date day with format
	 *
	 * @param {String} f
	 *
	 * @returns {String}
	 * 
	 */
	day( f ) {
		if( Typed( f, String ) ) {
			switch( f ) {
				
				// Display date as mm/dd/yy
				case "D": return Fmt( "{}/{}/{}", this.month( "m" ), this.day( "d" ), this.years( "y" ) );
				
				// Day of week
				case "u": return this.date.getDay();
				
				// Day of month
				case "d":
					var day = new String( this.date.getDate() );
					return day.length === 1 ? Fmt( "0{}", day ) : day;
				
				// Day of year
				case "j":
					
					// Current DateTime
					var n = this.date;
					
					// Starting DateTime by fullYear
					var s = new Date( n.getFullYear(), 0, 0 );
					
					// Calculate now with start
					var d = n - s;
					
					// Calculate one day
					var o = 1000 * 60 * 60 * 24;
					
					return Math.floor( d / o );
				
				// Full weekday name
				case "A": return ([ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ][this.date.getDay()] );
				
				// Short weekday name
				case "a": return ([ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ][this.date.getDay()] );
			}
			throw new TypeError( Fmt( "Invalid format day {}", f ) );
		}
		return this.date.getDate();
	}
	
	/**
	 * Date format
	 *
	 * @param {String} string
	 *
	 * @returns {String}
	 * 
	 */
	format( string ) {
		
		// Self instance
		var self = this;
		
		// Return string replaced
		return string.replace( /(?<!\\)\%([a-zA-Z])/g, matched => {
			
			// String sliced
			var sliced = matched.slice( 1 );
			
			// Check if.format is supported
			if( Typed( UnixFormat[sliced], [ Function, Window, sliced ] ) ) {
				return UnixFormat[sliced]( self );
			}
			return Fmt( "Invalid format date \"{}\"", matched );
		});
	}
	
	/**
	 * Date hours with format
	 *
	 * @param {String} f
	 *
	 * @returns {String}
	 * 
	 */
	hours( f ) {
		if( Typed( f, String ) ) {
			switch( f ) {
				case "H":
					var hours = new String( this.date.getHours() );
					return hours.length === 1 ? Fmt( "0{}", hours ) : hours;
				case "I": return ( this.date.getHours() +11 ) % 12 + 1;
			}
			throw new TypeError( Fmt( "Invalid format hours {}", f ) );
		}
		return this.date.getHours();
	}
	
	/**
	 * Date minute without format
	 *
	 * @returns {String}
	 * 
	 */
	minute() {
		return this.date.getMinutes();
	}
	
	/**
	 * Date month with format
	 *
	 * @param {String} f
	 *
	 * @returns {String}
	 * 
	 */
	month( f ) {
		if( Typed( f, String ) ) {
			switch( f ) {
				case "m": return this.month();
				case "B": return [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ][this.date.getMonth()];
				case "b": return [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ][this.date.getMonth()];
			}
			throw new TypeError( Fmt( "Invalid format month {}", f ) );
		}
		return String( this.date.getMonth() +1 ).length === 1 ? Fmt( "0{}", this.date.getMonth() +1 ) : this.date.getMonth() +1;
	}
	
	/**
	 * Date second without format
	 *
	 * @returns {String}
	 * 
	 */
	second() {
		return this.date.getSeconds();
	}
	
	/**
	 * Return datetime timestamp
	 *
	 * @param {Boolean} epoch
	 *
	 * @returns {Number}
	 * 
	 */
	timestamp( epoch ) {
		if( epoch ) {
			return this.date.getTime();
		}
		return parseInt( this.timestamp( true ) / 1000 );
	}
	
	/**
	 * Date year with format
	 *
	 * @param {String} f
	 *
	 * @returns {String}
	 * 
	 */
	years( f ) {
		if( Typed( f, String ) ) {
			switch( f ) {
				case "Y": return this.date.getFullYear();
				case "y": return this.years();
			}
			throw new TypeError( Fmt( "Invalid format year {}", f ) );
		}
		return String( this.date.getFullYear() ).slice( 2 );
	}
	
}

export {
	UnixFormat,
	UnixTime
};

