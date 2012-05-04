/*
P0DT0H0M49S
P0DT0H0M22S
P0DT0H0M8S
P0DT0H1M17S
P0DT0H0M10S
P0DT0H2M24S
P0DT0H1M55S
P0DT0H10M35S
P0DT0H8M15S
P0DT0H10M21S
P0DT0H46M32S
P0DT2H17M14S
P0DT0H0M13S
P0DT0H0M1S
P0DT0H0M26S
P0DT0H38M1S
P0DT0H19M32S
P0DT0H3M52S
P0DT0H15M19S
P0DT0H23M43S
P0DT0H0M24S
P0DT0H31M56S
P0DT0H2M27S
P0DT0H4M38S
P0DT0H0M30S
P0DT2H42M12S
P0DT0H6M15S
P0DT0H3M44S
P0DT1H6M32S
P0DT0H0M11S
P0DT0H14M13S
P0DT0H7M41S
P0DT0H0M18S
P0DT0H0M1S
P0DT0H0M3S
P0DT0H0M31S
P0DT0H0M12S
P0DT0H0M57S
*/

var timelord = require('../pkg/cjs/timelord'),
    expect = require('expect.js');

describe('ISO8601 parsing (compound samples)', function() {
    it('can parse P0DT0H0M49S', function() {
        var test = timelord('P0DT0H0M49S');
        
        expect(test).to.be.ok();
        expect(test.days).to.equal(0);
        expect(test.seconds).to.equal(49);
    });
    
    it('can parse P0DT2H42M12S', function() {
        var test = timelord('P0DT2H42M12S');
        
        expect(test).to.be.ok();
        expect(test.days).to.equal(0);
        expect(test.seconds).to.equal(9732);
    });
});