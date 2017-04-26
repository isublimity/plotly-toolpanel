'use strict';

function isPolar () {
    var gd = this.gd;
    var framework = gd.framework;
    return !!framework && !!framework.isPolar;
}

exports.isPolar = isPolar;

// this function is purely for temporarily short-circuiting
// popovers while they are being integrated. This may be removed
// once they are integrated. Also setting layout._hasGL3D is graph_obj
// can likewise be removed.
function isGL3D () {
    var gd = this.gd;
    return (gd._fullLayout && gd._fullLayout._hasGL3D) === true;
}

exports.isGL3D = isGL3D;

function isGeo () {
    var gd = this.gd;
    return (gd._fullLayout && gd._fullLayout._hasGeo) === true;
}

exports.isGeo = isGeo;

function toCamelCase(_str){
    function formatter(match, group1) {
         return group1.toUpperCase();
    }

    return _str.toLowerCase().replace(/-(.)/g, formatter);
}

exports.toCamelCase = toCamelCase;

function jsHook(_el){
    var hook = _el.className.match(/js-[^ ]+/);

    return (hook) ? hook[0] : null;
}

exports.jsHook = jsHook;
