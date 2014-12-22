CSSMash
=======

A simple utility that mashes CSS class names to reduce CSS file size.  It generates a JSON file mapping the original class names to the mashed names so that you can pull the correct class names into your code via a helper function.

## Installation

    npm install cssmash --save

## Usage

    var cssmash = require('cssmash');
    cssmash('style.css', 'output.mash.css', 'classmap.json', function() {
        // Mash complete!
    });

## Testing

    npm test
