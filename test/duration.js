var timelord = require('../timelord'),
    expect = require('expect.js');

describe('simple duration parsing and initialization', function() {
    it('can be initialized with days and seconds as numeric values', function() {
        var test = timelord('10d5s');
        
        expect(test.days).to.equal(10);
        expect(test.seconds).to.equal(5);
    });
    
    it('can be initialized with just days', function() {
        var test = timelord('10d');
        
        expect(test.days).to.equal(10);
        expect(test.seconds).to.equal(0);
    });
    
    it('can be initialized from an existing duration object', function() {
        var test1 = timelord('10d5s'),
            test2 = test1.clone();
            
        expect(test1.days).to.equal(10);
        expect(test1.seconds).to.equal(5);
        expect(test2.days).to.equal(test1.days);
        expect(test2.seconds).to.equal(test1.seconds);
    });
    
    it('can be initialized from a valid object literal', function() {
        var test = timelord({ d: 10, s: 5 });
        
        expect(test.days).to.equal(10);
        expect(test.seconds).to.equal(5);
    });
    
    it('can be initialized with many seconds, but be normalized', function() {
        var test = timelord({ s: 1000000 });
        
        expect(test.days).to.equal(11);
        expect(test.seconds).to.equal(49600);
    });
    
    it('can be converted to ticks (milliseconds)', function() {
        var test = timelord({ s: 1000 });
        
        expect(test.ticks()).to.equal(1000000);
    });
});