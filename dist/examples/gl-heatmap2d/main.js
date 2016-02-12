(function() {

/* global Plotly:false */

'use strict';

var graphDiv = document.getElementById('graph');

var N = 1e3;  // 1000 x 1000

var z = new Array(N)
for(var j=0; j<N; ++j) {
    z[j] = new Array(N);
    for(var i=0; i<N; ++i) {
      z[j][i] = Math.random();
    }
}

console.time('heatmapgl-1e6');
Plotly.plot(graphDiv, [{
    type: 'heatmapgl',
    z: z
}], {
    title: '1 million random points'
});
console.timeEnd('heatmapgl-1e6');

})();
