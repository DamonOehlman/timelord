describe('duration', function() {
    it('can be initialized with days and seconds as numeric values', function() {
        var test = Timelord('10d5s');
        
        expect(test.days).toEqual(10);
        expect(test.seconds).toEqual(5);
    });
    
    it('can be initialized with just days', function() {
        var test = Timelord('10d');
        
        expect(test.days).toEqual(10);
        expect(test.seconds).toEqual(0);
    });
    
    it('can be initialized from an existing duration object', function() {
        var test1 = Timelord('10d5s'),
            test2 = test1.clone();
            
        expect(test1.days).toEqual(10);
        expect(test1.seconds).toEqual(5);
        expect(test2.days).toEqual(test1.days);
        expect(test2.seconds).toEqual(test1.seconds);
    });
    
    it('can be initialized from a valid object literal', function() {
        var test = Timelord({ d: 10, s: 5 });
        
        expect(test.days).toEqual(10);
        expect(test.seconds).toEqual(5);
    });
});