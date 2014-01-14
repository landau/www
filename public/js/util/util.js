define(function () {
    "use strict"
    return window.util = {
        sprintf: function ( str ) {
            var i = 1, args = arguments;
            return str.replace( /%s/g, function ( str ) {
                return i < args.length ? args[ i++ ] : '';
            });
        },
        date: {
            getShortMonth: function ( date ) {
                var m = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
                            'Aug', 'Sept', 'Oct', 'Nov', 'Dec' ];
                return m[ date.getMonth() ];
            },
            getShortDay: function ( date ) {
                var d = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ];
                return d[ date.getDay() ];
            },

            getMeridian: function ( date, shouldCap ) {
                var mer = date.getHours() > 11 ? 'pm' : 'am';	
                return shouldCap ? mer.toUpperCase() : mer;
            },

            format: function ( date, str) {
                var replace = {
                    // day
                    d: function () { return date.getDate() < 10 ? '0' + date.getDate() : date.getDate(); },
                    D: function () { return this.getShortDay( date ); },
                    j: function () { return date.getDate(); },
                    l: function () { return date.getLongDay(); },
                    N: function () { return date.getDay() + 1; },
                    S: function () { 
                        var d = this.getDate() % 10;
                        return (d === 1 && d !== 11 ? 'st' : (d === 2 && d !== 12 ? 'nd' : (d === 3 && d != 13 ? 'rd' : 'th')));
                    },
                    // week
                    w: function () { return date.getDay(); },
                    //z: function () {}, // day of year
                    //W: function () {}, // ISO week num	 
                    // month
                    F: function () { return date.getLongMonth(); },
                    m: function () { return date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth(); },
                    M: function () { return this.getShortMonth( date ); },
                    n: function () { return date.getMonth() + 1; },
                    //t: function () {}, num days in month
                    // year
                    //L: function() {}, leap year  return bool
                    //o: function() {}, iso year num
                    Y: function () { return date.getFullYear(); },
                    y: function () { return date.getFullYear().substr(2); },
                    // time
                    a: function () { return this.getMeridian( date ); },
                    A: function () { return date.getMerdian(true); },
                    //B
                    g: function () {
                        var h = date.getHours();
                        if (h > 12) {
                            return h - 12;
                        } else if (h === 0) {
                            return 12;
                        }
                        return h;
                    }, 
                    G: function () { return date.getHours(); },
                    h: function () { return this.g() < 10 ? '0' + this.g() : this.g(); },
                    H: function () { return this.G() < 10 ? '0' + this.G() : this.G(); },
                    i: function () { return date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(); },	
                    s: function () { return date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds(); },
                    u: function () { 
                        return date.getMilliseconds() < 10 ? '0' + date.getMilliseconds() : 
                                date.getMilliseconds(); 
                        },
                    r: function () { return date.toString(); }
                },
                i = 0, n = str.length, retStr = '', c;
                for (i; i < n; i++) {
                    c = str.charAt(i);
                    if (i - 1 >= 0 && str.charAt(i - 1) == '\\') { // check for escaped character
                        retStr += c;
                    } else if (replace.hasOwnProperty(c)) { // if method exists for formatting
                        retStr += replace[c].apply( this );
                    } else if (c !== '\\') { // add the character if not escaped or has method
                        retStr += c;
                    }	
                } // END FOR
                return retStr;
            },
            since: function ( date, skipSlot, timeSep, fullDateLen ) {
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
    };
});
