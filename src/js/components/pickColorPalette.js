'use strict';

/* global Plotly:true */

var notSettable = require('../util/notSettable');
var dropdown = require('../components/dropdown');
var ToolPanelStyle = require('../toolpanel_style');
var Colorbrewer = require('../styles/lib/colorbrewer');


/**
 * Pick a color palette (using a dropdown)
 *
 * @param {DOM container} s
 * @param {nested property} prop
 * @param {string} title to show up in the main box
 * @param {number} selected index or indices (array) of selected traces
 */
function pickColorPalette(s, prop, title, selected) {
    var popover = s.parents('.slideout')[0],
        gd = popover.gd,
        fullData = gd._fullData,
        calcData = gd.calcdata,
        astr = prop.astr,
        val = prop.get();

    var isMultipleTraces = Array.isArray(selected);

    // do not draw if there's no value
    if(notSettable(val, true)) return;

    var selectedData, selectedLength;

    // get the traces corresponding to the selected indices
    if(isMultipleTraces) {

        // do not draw if any props are array themselves (not supported yet)
        if(fullData.some(function(trace) {
            return Array.isArray(Plotly.Lib.nestedProperty(trace, astr).get());
        })) return;

        selectedLength = selected.length;
        selectedData = fullData.filter(function(trace) {
            return selected.indexOf(trace.index) !== -1;
        });
    }
    // turn the current colors into 'traces'
    else {
        var fullTrace = fullData[selected],
            calcTrace = calcData[selected];

        selectedLength = calcTrace.length;
        selectedData = calcData[selected].map(function(pt) {
            var traceCopy = Plotly.Lib.minExtend(fullTrace);

            // only works for pies
            Plotly.Lib.nestedProperty(traceCopy, astr).set(pt.color);

            return traceCopy;
        });
    }

    // do not draw if the selected data does not support a palette
    if(selectedData.filter(function(trace) {
        return Plotly.Lib.nestedProperty(trace, astr).get() !== undefined;
    }).length < 2) return;

    // generate dropdown
    var dd = Plotly.d3.select(
        $(dropdown('select-colorpalette', title)).appendTo(s)[0]
    );

    // draw the current palette
    dd.select('span.selected-val').call(drawPalette, astr, selectedData);

    var paletteTypeToNames = ToolPanelStyle.paletteTypeToNames;

    // generate columns
    var cols = dd.select('ul')
        .classed('dropdown-menu--grid', true)
        .selectAll('li')
            .data(Object.keys(paletteTypeToNames))
        .enter().append('li');

    // write column headers
    cols.append('span')
        .text(function(d) {
            return Plotly.Lib.titleCase(Plotly.util.plainText(d));
        });

    // generate rows
    cols.selectAll('li')
            .data(function(d) { return paletteTypeToNames[d]; })
        .enter().append('li')
        .append('a')
        .append('span')
        .text(function(d) { return Plotly.util.plainText(d); })
        .style('width', '60px');

    cols.selectAll('a').each(function(d) {
        var s = Plotly.d3.select(this),
            paletteFunc = makeColorPaletteFunc(d, selectedLength);

        var paletteData = selectedData.map(function(trace, i) {
            var traceCopy = Plotly.Lib.minExtend(trace),
                prop = Plotly.Lib.nestedProperty(traceCopy, astr);

            // apply palette color only if astr exist
            if(prop.get() !== undefined) prop.set(paletteFunc(i));

            return traceCopy;
        });

        // draw each palette option
        s.call(drawPalette, astr, paletteData);

        // add click handler
        s.on('click', function() {
            var val = selectedData.map(function(_, i) {
                return paletteFunc(i);
            });

            popover.applyChange({
                astr: astr,
                val: isMultipleTraces ? val : [val]
            });
        });
    });
}

function drawPalette(s, astr, data) {
    var maxNumberOfBlocks = 15,
        pad = 2,            // padding around blocks
        twHalfUnit = 12,    // half width of 1 block
        thUnit = 20;        // height of 1 block

    if(data.length > maxNumberOfBlocks) {
        data = data.slice(0, maxNumberOfBlocks);
    }

    var numberOfBlocks = data.length;

    s.append('svg')
        .attr('width', (numberOfBlocks + pad) * (2 * twHalfUnit))
        .attr('height', thUnit)
        .append('g')
        .attr('transform', 'translate('+ [twHalfUnit, 0.5 * thUnit] +')')
        .selectAll('.paletteblock')
            .data(data)
        .enter().append('path')
        .classed('paletteblock', true)
        .attr('d', function() { return [
            'M', twHalfUnit, ',', twHalfUnit, 'H-', twHalfUnit,
            'V-', twHalfUnit, 'H', twHalfUnit, 'Z'
        ].join(''); })
        .attr('transform', function(_, i) {
            return 'translate(' + (2 * twHalfUnit + pad) * i + ',0)';
        })
        .style('fill', function(d) {
            return Plotly.Lib.nestedProperty(d, astr).get() || '#fff';
        });
}

function makeColorPaletteFunc(name, len) {
    var colorPalette;

    var additionalColorPalettes = ToolPanelStyle.additionalColorPalettes;

    if(additionalColorPalettes[name]) {
        colorPalette = additionalColorPalettes[name];
        return function(index) {
            return colorPalette[index % colorPalette.length];
        };
    }

    var cbFamily = Colorbrewer[name],
        keys = Object.keys(cbFamily);

    // Pick the color brewer set closest to length 'len'.
    // If 'len' is smaller (greater) than the sets available,
    // pick the min (max) set.
    // The following algorithm only works because the
    // colorbrewer json is ordered and w/o holes.
    colorPalette = cbFamily[Math.min(Math.max(len, keys[0]), keys[keys.length-1])];

    return function(index) {
        return colorPalette[index % colorPalette.length];
    };
}

module.exports = pickColorPalette;
