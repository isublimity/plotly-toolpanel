'use strict';

/* global Plotly:false */

var colorbrewerByType = require('./lib/colorbrewer_by_type');

var color1 = 'rgb(0,179,227)';
var color2 = 'rgb(0,77,113)';

var colorPalette1 = makePalette(color1);
var colorPalette2 = makePalette(color2);

/**
 * Toolpanel style options used by Janus
 *
 */
module.exports = {

    pickColorColors: [
        Plotly.Color.defaults,
        [
            color1, color2, 'rgb(211,94,19)'
        ],
        colorPalette1,
        colorPalette2
    ],

    pickColorMaxSelectionSize: 6,

    paletteTypeToNames: {
        qualitative: ['Default', 'Primary', 'Comp'].concat(colorbrewerByType.qualitative),
        sequential: colorbrewerByType.sequential,
        diverging: colorbrewerByType.diverging
    },

    // i.e. non-colorbrewer
    additionalColorPalettes: {
        Default: Plotly.Color.defaults,
        Primary: colorPalette1,
        Comp: colorPalette2
    }
};

function makePalette(color) {
    var palette = [1, 0.75, 0.5, 0.25].map(function(opacity) {
        return Plotly.Color.addOpacity(color, opacity);
    });

    return palette;
}
