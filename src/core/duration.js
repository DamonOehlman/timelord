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
    var output = [];
    
    // ensure normalized
    this.normalize();

    // if the format is not defined, return the simple format
    if (! format) {
        return this.days + 'd' + this.seconds + 's';
    }
    else {
        var hours, minutes;
        
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
    }
    
    return output;
};