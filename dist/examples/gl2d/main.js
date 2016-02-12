(function() {

/* global Plotly:false */

'use strict';

var graphDiv = document.getElementById('graph');

var N = 1e6;  // 1 million points

var x = new Array(N),
    y = new Array(N);

for(var i=0; i<N; i++) {
    x[i] = Math.random();
    y[i] = Math.random();
}

console.time('1e6');
Plotly.plot(graphDiv, [{
    type: 'scattergl',
    mode: 'markers',
    x: x,
    y: y
}], {
    title: '1 million random points',
    xaxis: { range: [-0.1,1.1] },
    yaxis: { range: [-0.1,1.1] }
});
console.timeEnd('1e6');

})();
