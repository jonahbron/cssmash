var should = require('chai').should(),
    cssmash = require('../index'),
    fs = require('fs');

describe('#cssmash', function() {

    it('reduces classes outside of curly brackets', function(done) {
        fs.writeFile('test.css', '.test .class { property: value; } .another_class {}', function(err) {
            cssmash('test.css', 'test.mash.css', 'test.json', function() {
                fs.readFile('test.mash.css', 'utf8', function(err, data) {
                    data.should.equal('.a .b { property: value; } .c {}');

                    fs.unlinkSync('test.css');
                    fs.unlinkSync('test.mash.css');
                    fs.unlinkSync('test.json');
                    done();
                });
            });
        });
    });

    it('generates map file', function(done) {
        fs.writeFile('test.css', '.test .class { property: value; } .another_class {}', function(err) {
            cssmash('test.css', 'test.mash.css', 'test.json', function() {
                fs.readFile('test.json', 'utf8', function(err, data) {
                    data.should.equal(JSON.stringify({test: 'a', class: 'b', another_class: 'c'}));

                    fs.unlinkSync('test.css');
                    fs.unlinkSync('test.mash.css');
                    fs.unlinkSync('test.json');
                    done();
                });
            });
        });
    });

});
