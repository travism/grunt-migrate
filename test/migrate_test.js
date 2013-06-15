/**
 * Module dependencies.
 */

module.exports = {
    setUp: function (callback) {
        callback();
    },
    tearDown: function (callback) {
        // clean up
        callback();
    },
    test1: function (test) {
        test.equals(1, 1);
        test.done();
    }
};