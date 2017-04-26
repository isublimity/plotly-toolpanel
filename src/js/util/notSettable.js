'use strict';

// an option is not settable if it's either:
// - missing (so is irrelevant given other settings)
// - an array (so contains data that you don't want to override)
function notSettable(val, arrayOk) {
    return val===undefined || (Array.isArray(val) && !arrayOk);
}

module.exports = notSettable;
