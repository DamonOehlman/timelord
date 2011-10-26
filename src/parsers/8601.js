// the period regex (the front half of the ISO8601 post the T-split)
var periodRegex = /^P(\d+Y)?(\d+M)?(\d+D)?$/,
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
    // TODO: add handling for more than just days here but for the moment
    // that is all that is required
    days = days + (periodMatches[3] ? parseInt(periodMatches[3].slice(0, -1), 10) : 0);
    
    // parse the time part
    timeRegex.lastIndex = -1;
    timeMatches = timeRegex.exec(durationParts[1]);
    
    // increment the time by the required number of hour, minutes and seconds
    seconds = seconds + (timeMatches[1] ? parseInt(timeMatches[1].slice(0, -1), 10) * 3600 : 0);
    seconds = seconds + (timeMatches[2] ? parseInt(timeMatches[2].slice(0, -1), 10) * 60 : 0);
    seconds = seconds + (timeMatches[3] ? parseInt(timeMatches[3].slice(0, -1), 10) : 0);

    return new Duration(days, seconds);
};