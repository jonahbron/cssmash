CSSMash
=======

A simple utility that mashes CSS class names to reduce CSS file size.  It generates a JSON file mapping the original class names to the mashed names so that you can pull the correct class names into your code via a helper function.

## Installation

    npm install cssmash --save

## Usage

    var cssmash = require('cssmash');

    var result = cssmash('.css { color: red; }');

    console.log(result.css); // .a { color: red; }
    console.log(result.map); // {"css":"a"}

## Testing

    npm test
