var Timelord = (function() {
    // initialise constants
    var DAY_SECONDS = 86400,
        parsers = {},
        reDaySeconds = /^([\d\.]+)d\s*([\d\.]*)s?$/;
    
    //= core/duration
    
    //= parsers/8601
    
    function _guessParser(duration) {
        if (reDaySeconds.test(duration)) {
            return _parseSimple;
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
    
    function _parseSimple(text) {
        var match = reDaySeconds.exec(text);

        return new Duration(parseInt(match[1], 10), parseInt(match[2], 10));
    } // _parseSimple
    
    /* exports */

    return function() {
        var args = Array.prototype.slice.call(arguments, 0);
        
        // if we have been passed a string, then pass to internal parser
        if (typeof args[0] == 'string' || args[0] instanceof String) {
            return _parse.apply(null, args);
        }
        else if (typeof args[0] == 'object') {
            return new Duration(args[0]);
        }
        
        return {
            
        };
    };
})();