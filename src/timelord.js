//@header
(function (glob) {
    // initialise constants
    var DAY_SECONDS = 86400,
        parsers = {},
        reCommands = /^[\+\-]/,
        reDaySeconds = /^([\d\.]+)d\s*([\d\.]*)s?$/,
        reISO8601 = /^PT?\d+/;
    
    //= core/duration
    
    //= parsers/8601
    
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
    
    //@export timelord
})(this);