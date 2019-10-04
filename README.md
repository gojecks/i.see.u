I SEE U
=========

A small library that for validating application BundleID simple for IPAPatch
requires cordova-plugin-buildInfo to function

## Installation

  `npm install i.see.u`

## Usage

    var iseeu = require('i.see.u');
    iseeu('/output/path/', BUILD_CONFIG, removeOldFile)
    .then(()=> {
        // doSomethingElse()
    });

## Tests

  `npm test`

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.