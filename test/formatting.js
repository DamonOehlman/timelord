var timelord = require('../pkg/cjs/timelord'),
    expect = require('expect.js');

describe('duration formatting', function() {
    it('can be initialized with days and seconds as numeric values', function() {
        var test = timelord('10d5s');
        
        expect(test.toString(false)).to.equal('10d5s');
    });
    
    it('can be initialized with just days', function() {
        var test = timelord('10d');

        expect(test.toString(false)).to.equal('10d0s');
    });
    
    it('can be initialized from an existing duration object', function() {
        var test1 = timelord('10d5s'),
            test2 = test1.clone();
            
        expect(test2.toString(false)).to.equal('10d5s');
    });
    
    it('can be initialized from a valid object literal', function() {
        var test = timelord({ d: 10, s: 5 });
        
        expect(test.toString(false)).to.equal('10d5s');
    });
    
    it('can be initialized with many seconds, but be normalized', function() {
        var test = timelord({ s: 1000000 });
        
        expect(test.toString(false)).to.equal('11d49600s');
    });
});