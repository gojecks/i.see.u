'use strict';

var expect = require('chai').expect;
var hideMyAss = require('../index');

describe('#hideMyAss', function() {
    it('should create hideMyAss File', function() {
        hideMyAss('./test/result.js', {
            packageName: "com.i.see.u",
            name: "hidemyass"
        }, true).then(function(succ) {
            expect(succ).to.true;
        }, function() {
            expect(1).to.equal(0);
        });
    });
});