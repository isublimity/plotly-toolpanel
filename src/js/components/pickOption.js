'use strict';

var notSettable = require('../util/notSettable');

// pick from a button group
function pickOption(s,prop,title,opts,extracls,arrayOk, clickfn){
    var val = prop.get();

    // do not draw this item at all (and return undefined) if there's no value
    if(notSettable(val, arrayOk)) return;

    var picker = $('<div class="editboxselector pickoption '+(extracls||'')+'">'+
            ((title) ? ('<div class="editboxtitle">'+title+'</div>') : '')+
            '<div class="btn-group"></div></div>').appendTo(s),
        pickbg = picker.find('.btn-group');
    opts.forEach(function(o){
        var ob = $('<button class="btn btn--plain btn--small editboxbutton' +
                (val===o.val ? ' active' : '')+'">' +
                o.name+'</button>'
            ).appendTo(pickbg);
        if (val!==o.val) {
            if (clickfn) {
                ob.click(function() {
                    clickfn({astr: prop.astr, val: o.val});
                });
            } else {
                ob.click(function() {
                    $(s).parents('.slideout')[0]
                        .applyChange({astr: prop.astr, val: o.val});
                });
            }
        }
    });

    picker.parents('.empty-item').toggleClass('empty-item', false);
    return picker[0];
}

module.exports = pickOption;
