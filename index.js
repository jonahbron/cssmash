
'use strict';

var fs = require('fs');
var async = require('async');

function nextClass(i) {
    var className;
    do {
        i++;
        className = i.toString(36);
    } while (className.substring(0, 1).match(/\d/));
    return i;
}

module.exports = function(input, output, map, complete) {

    fs.readFile(input, 'utf8', function(err, data) {
        var classIncrement = 10;
        var classMap = {};
        var chunks = data.split('{');
        var parts;
        for (var i in chunks) {
            parts = chunks[i].split('}');

            parts[parts.length - 1] = parts[parts.length - 1].replace(
                /(?:\.)(-?[_a-z]+[_a-z0-9-]*)/ig,
                function(match, p1) {
                    classMap[p1] = classIncrement.toString(36);
                    classIncrement = nextClass(classIncrement);
                    return '.' + classMap[p1];
                }
            );

            chunks[i] = parts.join('}');
        }

        data = chunks.join('{');

        async.series(
            [
                function(callback) {
                    fs.writeFile(output, data, callback);
                },
                function(callback) {
                    fs.writeFile(map, JSON.stringify(classMap), callback);
                }
            ],
            function(err, results) {
                complete();
            }
        );
    });

};
