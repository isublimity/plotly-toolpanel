'use strict';


var optionStyle = require('./optionStyle');
var notSettable = require('../util/notSettable');

// pick from a button group showing drawn trace styles (ie flattened styleBoxDrop)
/* global Plotly */
function pickStyle(s, cls, title, d0, d, extracls) {
    var activeVal = Plotly.Lib.nestedProperty(d0[0].trace, cls).get();

    // do not draw this item at all if there's no value
    if(notSettable(activeVal)) return s;

    var popover = s.parents('.slideout'),
        thisVal = function(i){
            return Plotly.Lib.nestedProperty(d[i][0].trace, cls).get();
        },
        row = Plotly.d3.select(s[0]).append('div')
            .classed('pickoption', true)
            .classed('editboxselector', true);
    if(extracls) row.classed(extracls, true);
    if(title) {
        row.append('div')
            .classed('pull-left', true)
            .classed('editboxtitle', true)
            .text(title);
    }
    var pickbg = row.append('div')
        .classed('pull-left', true)
        .classed('btn-group', true);
    pickbg.selectAll('button')
        .data(d)
      .enter().append('button')
        .classed('btn', true)
        .classed('editboxbutton', true)
        .classed('btn--plain', true)
        .classed('active', function(d, i){ return thisVal(i)===activeVal; })
        .style('padding', '0')
        .call(optionStyle, popover)
        .on('click',function(d, i){
            if(thisVal(i)!==activeVal) {
                popover[0].applyChange({astr: cls, val: thisVal(i)});
            }
        })
        .selectAll('svg').style('margin', '3px -5px -3px -2px');

    $(row.node()).parents('.empty-item').toggleClass('empty-item', false);
    return row.node();
}

module.exports = pickStyle;
