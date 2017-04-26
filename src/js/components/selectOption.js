'use strict';

var notSettable = require('../util/notSettable');

// pick from a toggling-button group
function selectOption(s,props,title,opts,extracls){

    var $picker = $('<div class="editboxselector pickoption '+(extracls||'')+'">'+
            ((title) ? ('<div class="editboxtitle">'+title+'</div>') : '')+
            '<div class="btn-group"></div></div>'),
        $pickbg = $picker.find('.btn-group');

    props.forEach( function (prop, idx) {
        var val = prop.get();

        // do not draw this item at all (and return undefined) if there's no value
        if(notSettable(val)) return;
        var o = opts[idx];
        var ob = $('<button class="btn btn--plain btn--small editboxbutton' +
                (val===o.activeVal ? ' active' : '')+'">' +
                o.name+'</button>'
            ).appendTo($pickbg);
        ob.click(function() {
            var innerVal;
            if (ob.hasClass('active')) innerVal = o.inactiveVal;
            else innerVal = o.activeVal;
            $(s).parents('.slideout')[0].applyChange({astr: prop.astr, val: innerVal});
        });
    });

    if (!$pickbg.find('button').length) return null;

    $picker.appendTo(s);
    $picker.parents('.empty-item').toggleClass('empty-item', false);

    return $picker[0];
}

module.exports = selectOption;
