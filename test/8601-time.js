var timelord = require('../pkg/cjs/timelord'),
    expect = require('expect.js');

describe('ISO8601 parsing (time section)', function() {
    it('can parse 1 minute', function() {
        var test = timelord('PT1M');
        
        expect(test).to.be.ok();
        expect(test.seconds).to.equal(60);
    });
    
    it('can parse 2 minutes 10 seconds', function() {
        var test = timelord('PT2M10S');
        
        expect(test).to.be.ok();
        expect(test.seconds).to.equal(130);
    });
    
    it('can parse 5 hours 10 minutes and 23 seconds', function() {
        var test = timelord('PT5H10M23S');
        
        expect(test).to.be.ok();
        expect(test.seconds).to.equal(18623);
    });
});