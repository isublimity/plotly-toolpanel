(function() {

'use strict';

/* global Plotly:false */

// Grab internal Color module
var Color = Plotly.Color;

// override the default trace-to-trace color palette
Color.defaults = [
    'red',
    'blue',
    'green'
];

var data = [];
for(var i = 0; i < 12; i++) {
    data.push(makeTrace(i));
}

Plotly.plot('graph', data);

function makeTrace(i) { 
    return { 
        x: [1,2,3], y: [1+i,2+i,1+i],
        type: (i % 2) ? 'scatter' : 'bar'
    };
}

})();
