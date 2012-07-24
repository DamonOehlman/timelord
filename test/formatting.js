var timelord = require('../dist/commonjs/timelord'),
    expect = require('expect.js');

describe('duration formatting', function() {
    it('can preserve formatting for: 10d5s', function() {
        var test = timelord('10d5s');
        
        expect(test.toString(false)).to.equal('10d5s');
    });
    
    it('can normalize formatting for: 10d', function() {
        var test = timelord('10d');

        expect(test.toString(false)).to.equal('10d0s');
    });
    
    it('formatting works after cloning', function() {
        var test1 = timelord('10d5s'),
            test2 = test1.clone();
            
        expect(test2.toString(false)).to.equal('10d5s');
    });
    
    it('formatting functions as expected for durations initialized from an object', function() {
        var test = timelord({ d: 10, s: 5 });
        
        expect(test.toString(false)).to.equal('10d5s');
    });
    
    it('formatting normalizes for large second values', function() {
        var test = timelord({ s: 1000000 });
        
        expect(test.toString(false)).to.equal('11d49600s');
    });
    
    it('parses and formats strings using IS08601 definitions', function() {
        var test = timelord('P0DT0H0M49S');
        
        expect(test.toString()).to.equal('49 sec');
    });
    
    it('parses and formats strings using IS08601 definitions', function() {
        var test = timelord('P0DT2H42M12S');
        
        expect(test.toString()).to.equal('2 hrs 42 min');
    });
});