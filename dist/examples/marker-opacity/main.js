(function() {

'use strict';

/* global Plotly:false */

// Plotly internal modules
var Colorscale = Plotly.Colorscale;
var Color = Plotly.Color;

// some constants
var scale = 'Greens';   // plotly.js color scale name
var cmin = 0;           // color range minimum
var cmax = 10;          // color range maximum
var N = 100;            // number of data point in sample
var trueOpacity = 0.7;  // true opacity scalar value

function randomArray() {
  var out = new Array(N);
  for(var i = 0; i < N; i++) {
    out[i] = Math.random();
  }
  return out;
}

/**
 * @param {array} colorArray numerical array to be mapped to colors
 * @param {array} opacityArray numerical array to be mapped to opacity
 * @param {string or array of arrays} scale plotly.js color scale
 * @param {cmin} cmin color range minimum
 * @param {cmax} cmin color range maximum
 *
 */
function toRGBAScale(colorArray, opacityArray, scale, cmin, cmax) {
  // coerce 'scale' (e.g. from string input to array)
  var scl = Colorscale.getScale(scale);

  // generate color scale function
  var sclFunc = Colorscale.makeScaleFunction(scl, cmin, cmax);

  // turn array of data into array of RGB colors
  var colorsRGB = colorArray.map(sclFunc).map(Color.rgb);

  // blend array of RGB colors with array of opacity
  var colorsRGBA = opacityArray.map(function(opacityItem, i) {
    return Color.addOpacity(colorsRGB[i], opacityItem);
  });

//   console.log(colorsRGBA);

  return colorsRGBA;
}


Plotly.plot('graph',
  [{
    type: 'scatter3d',
    mode: 'markers',
    x: randomArray(),
    y: randomArray(),
    z: randomArray(),
    marker: {
      opacity: trueOpacity,
      size: randomArray().map(function(s) { return s * 30; }),
      color: toRGBAScale(randomArray(), randomArray(), scale, cmin, cmax)
    }
  }],
  {},
  {
    modeBarButtons: [[{
      name: 'transparent-izer',
      icon: Plotly.Icons.camera,
      click: function() {
        var color = toRGBAScale(randomArray(), randomArray(), scale, cmin, cmax);
        Plotly.restyle('graph', 'marker.color', [color]);
      }
    }], [
      'resetCameraDefault3d',
      'hoverClosest3d'
    ]]
  }
);

})();
