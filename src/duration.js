/**
# TL.Duration
A Timelord duration is what IMO is a sensible and usable representation of a 
period of "human-time".  A duration value contains both days and seconds values.

## Methods
*/
function Duration(days, seconds) {
    this.days = days || 0;
    this.seconds = seconds || 0;
} // Duration

Duration.prototype = {
    /**
    ### add(days, seconds)
    The add method returns a new Duration object that is the value of the current
    duration plus the days and seconds value provided.
    */
    add: function(days, seconds) {
        return new Duration(
            this.days + (days || 0),
            this.seconds + (seconds || 0)
        );
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
            
        if (duration.days) {
            output = duration.days + ' days ';
        } // if
        
        if (duration.seconds) {
            totalSeconds = duration.seconds;

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