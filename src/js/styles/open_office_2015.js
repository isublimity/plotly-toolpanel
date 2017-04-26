'use strict';

/* global Plotly:false */

var colorbrewerByType = require('./lib/colorbrewer_by_type');

var comparableSet = ['#CC0000', '#4e9fdd', '#ffb612', '#92d400', '#7f5fae'];


module.exports = {

    // taken from
    // https://drive.google.com/a/plot.ly/file/d/0B1YlNSSxzXCvclhGVFptaHc4VzQ/view
    pickColorColors: [
        Plotly.Color.defaults,
        comparableSet,
        [
            'rgb(204,0,0)','rgb(0,0,0)','rgb(255,255,255)',
            'rgb(220,220,220)','rgb(76,76,76)','rgb(163,219,232)',
        ], [
            'rgb(0,65,83)','rgb(240,171,0)', 'rgb(0,185,228)',
            'rgb(146,212,0)','rgb(0,122,135)','rgb(59,0,131)'
        ], [
            'rgb(236,122,8)','rgb(240,171,0)','rgb(0,136,206)',
            'rgb(0,185,228)','rgb(63,156,53)','rgb(146,212,0)',
        ], [
            'rgb(240,240,240)','rgb(230,230,230)','rgb(210,210,210)',
            'rgb(190,190,190)','rgb(170,170,170)','rgb(150,150,150)',
        ], [
            'rgb(130,130,130)','rgb(110,110,110)','rgb(90,90,90)',
            'rgb(70,70,70)','rgb(50,50,50)','rgb(30,30,30)',
        ], [
            'rgb(163,0,0)','rgb(130,0,0)','rgb(110,0,0)',
            'rgb(90,0,0)','rgb(70,0,0)','rgb(50,0,0)',
        ], [
            'rgb(232,246,249)','rgb(209,237,244)','rgb(182,226,236)',
            'rgb(128,160,169)','rgb(78,122,134)','rgb(27,85,100)',
        ], [
            'rgb(252,237,205)','rgb(250,229,180)','rgb(249,220,156)',
            'rgb(248,211,132)','rgb(245,194,85)','rgb(242,178,45)',
        ], [
            'rgb(217,245,251)','rgb(192,237,247)','rgb(154,228,243)',
            'rgb(130,221,241)','rgb(104,214,238)','rgb(56,200,232)',
        ], [
            'rgb(234,245,205)','rgb(223,241,180)','rgb(212,236,156)',
            'rgb(202,232,131)','rgb(181,223,86)','rgb(170,219,64)',
        ], [
            'rgb(217,235,237)','rgb(204,235,237)','rgb(179,215,219)',
            'rgb(154,202,207)','rgb(104,175,182)','rgb(54,149,158)',
        ], [
            'rgb(226,218,236)','rgb(205,192,223)','rgb(175,156,203)',
            'rgb(156,130,192)','rgb(136,105,179)','rgb(117,81,166)'
        ]
    ],

    pickColorMaxSelectionSize: 6,

    paletteTypeToNames: {
        qualitative: ['Primary', 'Comp'].concat(colorbrewerByType.qualitative),
        sequential: colorbrewerByType.sequential,
        diverging: colorbrewerByType.diverging
    },

    // i.e. non-colorbrewer
    additionalColorPalettes: {
        Primary: Plotly.Color.defaults,
        Comp: comparableSet
    }
};
