(function (DateProto) {
if (!DateProto.getLongMonth) {
	DateProto.getLongMonth = function () {
		var m = [];
		m[0] = 'January';
		m[1] = 'February';
		m[2] = 'March';
		m[3] = 'April';
		m[4] = 'May';
		m[5] = 'June';
		m[6] = 'July';
		m[7] = 'August';
		m[8] = 'September';
		m[9] = 'October';
		m[10] = 'November';
		m[11] = 'December';
		return m[this.getMonth()];
	}
}
if (!DateProto.getShortMonth) {
	DateProto.getShortMonth = function () {
		var m = [];
		m[0] = 'Jan';
		m[1] = 'Feb';
		m[2] = 'Mar';
		m[3] = 'Apr';
		m[4] = 'May';
		m[5] = 'Jun';
		m[6] = 'Jul';
		m[7] = 'Aug';
		m[8] = 'Sept';
		m[9] = 'Oct';
		m[10] = 'Nov';
		m[11] = 'Dec';
		return m[this.getMonth()];
	}
}
if (!DateProto.getLongDay) {
	DateProto.getLongDay = function () {
		var d = [];
		d[0] = 'Sunday';
		d[1] = 'Monday';
		d[2] = 'Tuesday';
		d[3] = 'Wednesday';
		d[4] = 'Thursday';
		d[5] = 'Friday';
		d[6] = 'Saturday';
		return d[this.getDay()];
	}
}
if (!DateProto.getShortDay) {
	DateProto.getShortDay = function () {
		var d = [];
		d[0] = 'Sun';
		d[1] = 'Mon';
		d[2] = 'Tue';
		d[3] = 'Wed';
		d[4] = 'Thu';
		d[5] = 'Fri';
		d[6] = 'Sat';
		return d[this.getDay()];
	}
}
if (!DateProto.getMeridian) {
	DateProto.getMeridian = function (shouldCap) {
		var mer = this.getHours() > 11 ? 'pm' : 'am';	
		return shouldCap ? mer.toUpperCase() : mer;
	}
}

/*
 * Php style date formatting
 */
if (!DateProto.format) {
	DateProto.format = function (str) {
		'use strict';
		var self = this,
			replace = {
				// day
				d: function () { return self.getDate() < 10 ? '0' + self.getDate() : self.getDate(); },
				D: function () { return self.getShortDay(); },
				j: function () { return self.getDate(); },
				l: function () { return self.getLongDay(); },
				N: function () { return self.getDay() + 1; },
				S: function () { 
					var d = this.getDate() % 10;
					return (d === 1 && d !== 11 ? 'st' : (d === 2 && d !== 12 ? 'nd' : (d === 3 && d != 13 ? 'rd' : 'th')));
				},
				// week
				w: function () { return self.getDay(); },
				//z: function () {}, // day of year
				//W: function () {}, // ISO week num	 
				// month
				F: function () { return self.getLongMonth(); },
				m: function () { return self.getMonth() + 1 < 10 ? '0' + (self.getMonth() + 1) : self.getMonth(); },
				M: function () { return self.getShortMonth(); },
				n: function () { return self.getMonth() + 1; },
				//t: function () {}, num days in month
				// year
				//L: function() {}, leap year  return bool
				//o: function() {}, iso year num
				Y: function () { return self.getFullYear(); },
				y: function () { return self.getFullYear().substr(2); },
				// time
				a: function () { return self.getMeridian(); },
				A: function () { return self.getMerdian(true); },
				//B
				g: function () {
					var h = self.getHours();
					if (h > 12) {
						return h - 12;
					} else if (h === 0) {
						return 12;
					}
					return h;
				}, 
				G: function () { return self.getHours(); },
				h: function () { return this.g() < 10 ? '0' + this.g() : this.g(); },
				H: function () { return this.G() < 10 ? '0' + this.G() : this.G(); },
				i: function () { return self.getMinutes() < 10 ? '0' + self.getMinutes() : self.getMinutes(); },	
				s: function () { return self.getSeconds() < 10 ? '0' + self.getSeconds() : self.getSeconds(); },
				u: function () { return self.getMilliseconds() < 10 ? '0' + self.getMilliseconds() : self.getMilliseconds(); },
				// timezone
				//e
				//I
				//O
				//P
				//T
				//Z
				// full date/time
				//c
				r: function () { return self.toString(); }
				//U
			},
			i = 0, n = str.length, retStr = '', c;
		for (i; i < n; i++) {
			c = str.charAt(i);
			if (i - 1 >= 0 && str.charAt(i - 1) == '\\') { // check for escaped character
				retStr += c;
			} else if (replace.hasOwnProperty(c)) { // if method exists for formatting
				retStr += replace[c]();
			} else if (c !== '\\') { // add the character if not escaped or has method
				retStr += c;
			}	
		} // END FOR
		return retStr;
	}
}

/*
if (!Date.prototype.fromMySQL) {
	Date.prototype.fromMySQL = function (str) {
		if (!str || typeof str !== 'string') {
			throw new Exception('MySQLDate.constructor: String expected. ' + str + ' given.');
		}
		var split = str.split(' '),
			d = split[0].split('-'), t = split[1].split(':');
		if (d.length === 3) { // date
			this.setFullYear(d[0], (d[1] -1), d[2]);
		} 
		if (t.length >= 2) { // time
			this.setHours(t[0]);
			this.setMinutes(t[1]);
			if (t.length === 3) {
				this.setMilliseconds(t[2]);
			}
		} 
		return this; // allow chain
	}
}

if (!Date.prototype.toMySQL) {
	Date.prototype.toMySQL = function () {
		return this.getFullYear() + '-' + (this.getMonth() + 1) + '-' + this.getDate() + 
				' ' + this.getHours() + ':' + this.getMinutes() + ':' + this.getMilliseconds().toString().substr(0,2); 
	};
}

*/
if (!DateProto.getThirtyInt) {
	// returns an int from 0 -47 representing the time 00:00 to 23:30
	DateProto.getThirtyInt = function () {
		var hours = this.getHours(),
			min = this.getMinutes() > 30 ? 1 : 0;
		return (hours * 2) + min;
	};
}

if (!DateProto.fromThirtyInt) {
	// converts an int from 0 - 47 to time
	DateProto.fromThirtyInt = function (num) {
		if (num !== undefined && num >= 0 && num <= 47) { 
			var hours = num / 2, min;
				
			min = hours % 1 !== 0 ? 30 : 0; // check for decimals
			hours = parseInt(hours, 10);

			this.setHours(hours, min);
		}
		return this;
	};
}

if ( !Date.now ) {
	Date.now = function() {
		return +(new Date);
	};
}

function ISODateString(d){
  function pad(n){return n<10 ? '0'+n : n}
  return d.getUTCFullYear()+'-'
      + pad(d.getUTCMonth()+1)+'-'
      + pad(d.getUTCDate())+'T'
      + pad(d.getUTCHours())+':'
      + pad(d.getUTCMinutes())+':'
      + pad(d.getUTCSeconds())+'Z'
}

if ( !DateProto.toISOString ) {
	DateProto.toISOString = function () {

		function pad( n ) { return n < 10 ? '0' + n : n }
		return this.getUTCFullYear()+'-'
		    + pad(this.getUTCMonth()+1)+'-'
		    + pad(this.getUTCDate())+'T'
		    + pad(this.getUTCHours())+':'
		    + pad(this.getUTCMinutes())+':'
		    + pad(this.getUTCSeconds())+'Z';
		
	};
}
// http://stackoverflow.com/questions/5802461/javascript-which-browsers-support-parsing-of-iso-8601-date-string-with-date-par
if ( !Date.fromISO ) {
	Date.fromISO = (function () {
		// Chrom
		var testISO = '2011-04-26T13:16:50Z',
			isoDate = Date.parse( testISO ),
			knownDate = 1303823810000;
		if ( isoDate == knownDate ) { // check a known date
			return function ( ts ) {
				return new Date( Date.parse( ts ) );
			};
		}

		// JS 1.8 gecko
		var noOffset = function ( ts ) {
			var day = ts.slice( 0, -5 ).split(/\D/).map(function ( digit ) {
				return parseInt( digit, 10 ) || 0;
			});

			day[ 1 ] -= 1;
			day = new Date( Date.UTC.apply( Date, day )); 
			var offsetStr = ts.slice( -5 ),
				offset = parseInt( offsetStr, 10 ) / 100;
			if ( offsetStr.slice( 0, 1 ) === "+" ) {
				offset *= -1;
			}
			day.setHours( day.getHours() + offset );
			return day.getTime();
		};

		if ( noOffset( testISO ) === knownDate ) {
			return noOffset;
		}

		return function ( ts ) {
			var day, tz,
				regx = /^(\d{4}\-\d\d\-\d\d([tT][\d:\.]*)?)([zZ]|([+\-])(\d\d):?(\d\d))?$/,
				p = regx.exec( ts ) || [];

			if ( p[ 1 ] ) {
				day = p[ 1 ].split(/\D/).map(function ( digit ) {
					return parseInt( digit, 10 ) || 0;
				});
				day[ 1 ] -= 1;
				day = new Date( Date.UTC.apply( Date, day ));
				if ( !day.getDate() ) {
					return NaN;
				}
				if ( p[5] ) {
					tz = parseInt( p[5], 10 ) / 100 * 60;
					if ( p[6] ) {
						tz += parseInt( p[6], 10 );
					}
					if (p[4] === "+") {
						tz *= -1;
					}
					if ( tz ) {
						day.setUTCMinutes( day.getUTCMinutes() + tz );
					}
				} // END IF
				return day;
			}
			return NaN;

		};

	})();
}


if (!DateProto.since) {
	// @param {String} skipSlot - a string representing the time slots to skip and show the date
	DateProto.since = function ( skipSlot, timeSep, fullDateLen ) {
		var sec = 1000,
			min = sec * 60,
			hour = min * 60,
			day = hour * 24,
			week = day * 7,
			max = week * 3, // genius.mp3
			msg, time,
			slots = ['now', 'sec', 'min', 'hour', 'day', 'week'],
			fullDates = ['short', 'long'];

		time = Date.now() - this;

		skipSlot = slots.indexOf( skipSlot ) !== -1 ? skipSlot : '';
		timeSep = timeSep || ', ';

		function shouldSkip( slot ) {
			var selectedIndex = slots.indexOf( skipSlot ),
				slotIndex = slots.indexOf( slot );
			if ( selectedIndex === -1 || !slot ) {
				return false;
			}

			return slotIndex > selectedIndex; 
		}

		if ( time < sec && slots && !shouldSkip('now') ) { 
			
			msg = 'just now';

		} else if ( time >= sec && time < min && !shouldSkip('sec') ) {
			msg = 'less than a minute ago';

		} else if ( time >= min && time < hour && !shouldSkip('min') ) {

			time = Math.floor(time / min);
			msg = 'about ' + time;
			msg += time > 1 ? ' minutes' : ' minute';
			msg += ' ago';

		} else if ( time >= hour && time < day && !shouldSkip('hour') ) {
			time = Math.floor(time / hour);
			msg = 'about ' + time;
			msg += time > 1 ? ' hours' : ' hour';
			msg += ' ago';

		} else if ( time >= day && time < week && !shouldSkip('day')) {
			time = Math.floor(time / day);
			msg = 'about ' + time;
			msg += time > 1 ? ' days' : ' day';
			msg += ' ago';

		} else if ( time >= week && time < max && !shouldSkip('week')) {

			time = Math.floor(time / week);
			msg = 'about ' + time
			msg += time > 1 ? ' weeks' : ' week';
			msg += ' ago';

		} else {
			return this.format('M j, Y' + timeSep + 'g\:ia');
		}

		return msg;
	}
}

Date.isDate = function (date) {
	return Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date);
};

DateProto.getNumDaysInMonth = function () {
	return 32 - new Date( this.getFullYear(), this.getMonth(), 32 ).getDate();
};
Date.getNumDaysInMonth = function () {
	var date = new Date;
	return 32 - new Date( date.getFullYear(), date.getMonth(), 32 ).getDate();
}

}(Date.prototype));
