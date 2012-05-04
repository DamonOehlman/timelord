// initialise constants
var DAY_SECONDS = 86400,
    parsers = {},
    reCommands = /^[\+\-]/,
    reDaySeconds = /^([\d\.]+)d\s*([\d\.]*)s?$/,
    reISO8601 = /^PT?\d+/;

function Duration(p1, p2) {
    if (typeof p1 == 'number') {
        this.days = p1 || 0;
        this.seconds = p2 || 0;
    }
    else if (typeof p1 != 'undefined') {
        this.days = p1.d || p1.days || 0;
        this.seconds = p1.s || p1.seconds || 0;
    } // if..else
    
    // normalize
    this.normalize();
} // Duration

Duration.prototype.add = function() {
    var result = new Duration(this.days, this.seconds);
    
    // iterate through the arguments and add their days and seconds values to the result
    for (var ii = arguments.length; ii--; ) {
        result.days += arguments[ii].days;
        result.seconds += arguments[ii].seconds;
    } // for
    
    return result.normalize();
};

Duration.prototype.clone = function() {
    return new Duration(this.days, this.seconds);
}; // clone

Duration.prototype.normalize = function() {
    var secondDays = this.seconds / DAY_SECONDS | 0;
    
    this.days += secondDays;
    this.seconds %= DAY_SECONDS;
    
    return this;
};

Duration.prototype.ticks = function() {
    return (this.days * DAY_SECONDS + this.seconds) * 1000;
};
    
Duration.prototype.toString = function(format) {
    // ensure normalized
    this.normalize();

    // if the format is not defined, return the simple format
    if (typeof format == 'undefined' || format) {
        var hours, minutes, totalSeconds, output = [];
        
        if (this.days) {
            output.push(this.days + ' days');
        } // if
    
        if (this.seconds) {
            totalSeconds = this.seconds;

            // if we have hours, then get them
            if (totalSeconds >= 3600) {
                hours = ~~(totalSeconds / 3600);
                totalSeconds = totalSeconds - (hours * 3600);
            } // if
        
            // if we have minutes then extract those
            if (totalSeconds >= 60) {
                minutes = Math.round(totalSeconds / 60);
                totalSeconds = totalSeconds - (minutes * 60);
            } // if
        
            // format the result
            if (hours) {
                output.push(hours + (hours > 1 ? ' hrs' : ' hr'));
                output.push(
                    (minutes ? 
                        (minutes > 10 ? 
                            minutes : 
                            '0' + minutes) + ' min' 
                        : '')
                );
            }
            else if (minutes) {
                output.push(minutes + 'min');
            }
            else if (totalSeconds > 0) {
                output.push(
                    (totalSeconds > 10 ? 
                        totalSeconds : 
                        '0' + totalSeconds) + ' sec'
                );
            } // if..else
        } // if
    
        return output.join(' ');
    }
    else {
        return this.days + 'd' + this.seconds + 's';
    }
};

// the period regex (the front half of the ISO8601 post the T-split)
var periodRegex = /^P(\d+Y)?(\d+M)?(\w+W)?(\d+D)?$/,
    // the time regex (the back half of the ISO8601 post the T-split)
    timeRegex = /^(\d+H)?(\d+M)?(\d+S)?$/;
    
/*
Used to convert a ISO8601 duration value (not W3C subset)
(see http://en.wikipedia.org/wiki/ISO_8601#Durations) into a
composite value in days and seconds
*/   
parsers['8601'] = function(input) {
    var durationParts = input.split('T'),
        periodMatches = null,
        timeMatches = null,
        days = 0,
        seconds = 0;
    
    // parse the period part
    periodRegex.lastIndex = -1;
    periodMatches = periodRegex.exec(durationParts[0]);
    
    // increment the days by the valid number of years, months and days
    if (periodMatches) {
        days = days + (periodMatches[3] ? parseInt(periodMatches[3].slice(0, -1), 10) * 7 : 0);
        days = days + (periodMatches[4] ? parseInt(periodMatches[4].slice(0, -1), 10) : 0);
    }
    
    // parse the time part
    timeRegex.lastIndex = -1;
    timeMatches = timeRegex.exec(durationParts[1]);
    
    // increment the time by the required number of hour, minutes and seconds
    if (timeMatches) {
        seconds = seconds + (timeMatches[1] ? parseInt(timeMatches[1].slice(0, -1), 10) * 3600 : 0);
        seconds = seconds + (timeMatches[2] ? parseInt(timeMatches[2].slice(0, -1), 10) * 60 : 0);
        seconds = seconds + (timeMatches[3] ? parseInt(timeMatches[3].slice(0, -1), 10) : 0);
    }

    return new Duration(days, seconds);
};

function _guessParser(input) {
    if (reISO8601.test(input)) {
        return parsers['8601'];
    }
} // _guessParser

function _parse(duration, format) {
    var parser = parsers[format] || _guessParser(duration);

    // if we don't have a parser for the requested format, then throw an exception
    if (! parser) {
        throw new Error('No parser found for the duration: ' + duration);
    } // if

    return parser(duration);
} // _parse

function timelord(input) {
    // parse the text
    if (typeof input == 'string' || input instanceof String) {
        var parser = _guessParser(input);
        
        if (parser) {
            return parser(input);
        }
        else {
            var match = reDaySeconds.exec(input);

            return new Duration(parseInt(match[1], 10), parseInt(match[2], 10));
        }
    }
    else if (typeof input == 'object') {
        return new Duration(input);
    }
    
    return undefined;
}

module.exports = timelord;