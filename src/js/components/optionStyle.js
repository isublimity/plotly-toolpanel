'use strict';

/* global Plotly */
function optionStyle(s){
    var tw = 40,
        th = 20;

    s.append('svg')
        .attr('width', tw)
        .attr('height', th)
        .append('g').attr('transform', 'translate(0,'+th/2+')')
        .call(Plotly.Legend.style);

    s.append('span')
        .text(function(d){ return Plotly.util.plainText(d[0].trace.name) + '\u00A0'; });
}

module.exports = optionStyle;
