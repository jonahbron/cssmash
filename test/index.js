var should = require('chai').should(),
    cssmash = require('../index'),
    fs = require('fs');

describe('#cssmash', function() {

    it('reduces classes outside of curly brackets', function() {
        var result = cssmash('.test .class { property: value; } .another_class {}');
        result.css.should.equal('.a .b { property: value; } .c {}');
    });

    it('generates map', function() {
        var result = cssmash('.test .class { property: value; } .another_class {}');
        result.map.should.eql({test: 'a', class: 'b', another_class: 'c'});
    });

    it('ignores classes within curly braces', function() {
        var result = cssmash('.test .class { property: value; .dummy } .another_class {}');
        result.css.should.equal('.a .b { property: value; .dummy } .c {}');
    });

    it('consistently maps classes', function() {
        var result = cssmash('.test .class { property: value; .dummy } .test {}');
        result.css.should.equal('.a .b { property: value; .dummy } .a {}');
    });

});
