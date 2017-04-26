'use strict';

var notSettable = require('../util/notSettable');
var ToolPanelStyle = require('../toolpanel_style');

// pick a color (using spectrum)
// s: container
// astr: attribute string
// title: to show up in the main box
// title2: to show up inside spectrum box
// TODO: click on a color from the palette and color changes right away... click again and it doesn't
function pickColor(s, prop, title, title2, args){
    var astr = prop.astr,
        val = prop.get();

    // do not draw this item at all if there's no value
    if(notSettable(val)) return;

    var dd = $('<div class="editboxselector">'+
            ((title) ? ('<div class="editboxtitle">'+title+'</div>') : '')+
            '<input class="pickcolor" type="text" />'+
            '</div>'
        ).appendTo(s);
    dd.find('input').spectrum({
        color: val,
        showInput: true,
        showInitial: false,
        showAlpha: true,
        localStorageKey: 'spectrum.palette',
        showPalette: true,
        showPaletteOnly: false,
        showSelectionPalette: true,
        clickoutFiresChange: true,
        cancelText: 'Cancel',
        chooseText: title2 ? ('Set '+title2) : 'OK',
        showButtons: true,
        preferredFormat: 'rgb',
        maxSelectionSize: ToolPanelStyle.pickColorMaxSelectionSize,
        palette: ToolPanelStyle.pickColorColors,
        change: function(color){
            var po = dd.parents('.slideout')[0];
            var astrSplit, astrCont, astrColor;

            if(astr.indexOf('.') !== -1) {
                astrSplit = astr.split('.');
                astrCont = astrSplit[0] + '.';
                astrColor = astrSplit[1];
            } else {
                astrCont = '';
                astrColor = astr;
            }

            if(astrColor === 'mincolor' || astrColor === 'maxcolor') {
                var scl = args;

                if (typeof(scl)==='string') scl = JSON.parse(scl);

                scl = [[0, scl[0][1]], [1, scl[scl.length-1][1]]];

                scl[astrColor==='mincolor' ? 0 : 1][1] = color.toRgbString();

                if(po) po.applyChange({astr: astrCont + 'colorscale', val:[scl]});
            }
            else {
                if(po) po.applyChange({astr: astr, val: color.toRgbString()});
            }
        }
    });

    dd.parents('.empty-item').toggleClass('empty-item', false);
    return dd[0];
}

module.exports = pickColor;
