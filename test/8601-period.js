var timelord = require('../timelord'),
    expect = require('expect.js');

describe('ISO8601 parsing (period section)', function() {
    it('can parse 1 day', function() {
        var test = timelord('P1D');
        
        expect(test).to.be.ok();
        expect(test.days).to.equal(1);
    });
    
    it('can parse 3 days', function() {
        var test = timelord('P3D');
        
        expect(test).to.be.ok();
        expect(test.days).to.equal(3);
    });
    
    it('can parse 1 week', function() {
        var test = timelord('P1W');
        
        expect(test).to.be.ok();
        expect(test.days).to.equal(7);
    });
    
    it('can parse 3 weeks', function() {
        var test = timelord('P3W');
        
        expect(test).to.be.ok();
        expect(test.days).to.equal(21);
    });
});