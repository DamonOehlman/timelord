/**
# TL.Duration
A Timelord duration is what IMO is a sensible and usable representation of a 
period of "human-time".  A duration value contains both days and seconds values.

## Methods
*/
function Duration(p1, p2) {
    if (typeof p1 == 'number') {
        this.days = p1 || 0;
        this.seconds = p2 || 0;
    }
    else if (typeof p1 != 'undefined') {
        this.days = p1.days || 0;
        this.seconds = p1.seconds || 0;
    } // if..else
} // Duration

Duration.prototype = {
    /**
    ### add(args*)
    The add method returns a new Duration object that is the value of the current
    duration plus the days and seconds value provided.
    */
    add: function() {
        var result = new Duration(this.days, this.seconds);
        
        // iterate through the arguments and add their days and seconds values to the result
        for (var ii = arguments.length; ii--; ) {
            result.days += arguments[ii].days;
            result.seconds += arguments[ii].seconds;
        } // for
        
        return result;
    },
    
    /**
    ### toString()
    Convert the duration to it's string represenation
    
    __TODO__:
    - Improve the implementation
    - Add internationalization support
    */
    toString: function() {
        // TODO: Im sure this can be implemented better....
        
        var days, hours, minutes, totalSeconds,
            output = '';
            
        if (this.days) {
            output = this.days + ' days ';
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
                output = output + hours + 
                    (hours > 1 ? ' hrs ' : ' hr ') + 
                    (minutes ? 
                        (minutes > 10 ? 
                            minutes : 
                            '0' + minutes) + ' min ' 
                        : '');
            }
            else if (minutes) {
                output = output + minutes + ' min';
            }
            else if (totalSeconds > 0) {
                output = output + 
                    (totalSeconds > 10 ? 
                        totalSeconds : 
                        '0' + totalSeconds) + ' sec';
            } // if..else
        } // if
        
        return output;
    }
};