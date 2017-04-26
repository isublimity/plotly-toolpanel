'use strict';

/* global Plotly:false */

var colorbrewerByType = require('./lib/colorbrewer_by_type');

var defaultColors = Plotly.Color.defaults;


/**
 * Toolpanel style options used by King Games
 *
 */
module.exports = {

    pickColorColors: [
        defaultColors,
        makePalette(defaultColors[0]),
        makePalette(defaultColors[1]),
        makePalette(defaultColors[2]),
        makePalette(defaultColors[3]),
        makePalette(defaultColors[4]),
    ],

    pickColorMaxSelectionSize: 6,

    paletteTypeToNames: {
        qualitative: ['Default'].concat(colorbrewerByType.qualitative),
        sequential: colorbrewerByType.sequential,
        diverging: colorbrewerByType.diverging
    },

    // i.e. non-colorbrewer
    additionalColorPalettes: {
        Default: Plotly.Color.defaults
    }
};

function makePalette(color) {
    var palette = [1, 0.8, 0.6, 0.4, 0.2].map(function(opacity) {
        return Plotly.Color.addOpacity(color, opacity);
    });

    return palette;
}
