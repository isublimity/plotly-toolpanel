'use strict';

var TRACE_LABEL;
var TRACES_LABEL;
var SHOW_DELETE_TRACE_UI;
var SHOW_TRACE_TYPE_SWITCHING;

if (process.env.PLOTLY_PHX_BUILD) {
    TRACE_LABEL = 'Series';
    TRACES_LABEL = 'Series';
    SHOW_DELETE_TRACE_UI = false;
    SHOW_TRACE_TYPE_SWITCHING = false;
} else {
    TRACE_LABEL = 'Trace';
    TRACES_LABEL = 'Traces';
    SHOW_DELETE_TRACE_UI = true;
    SHOW_TRACE_TYPE_SWITCHING = true;
}

exports.TRACE_LABEL = TRACE_LABEL;
exports.TRACES_LABEL = TRACES_LABEL;
exports.SHOW_DELETE_TRACE_UI = SHOW_DELETE_TRACE_UI;
exports.SHOW_TRACE_TYPE_SWITCHING = SHOW_TRACE_TYPE_SWITCHING;

const DEFAULT_MENU_ITEMS = [
    {
        name: 'traces',
        buttonClass: 'js-traces-box',
        iconClass: 'icon-plot-line',
        labelContent: TRACES_LABEL,
        horizontalFloat: 'right'
    },
    {
        name: 'layout',
        buttonClass: 'js-layout-box',
        iconClass: 'icon-file',
        labelContent: 'Layout',
        horizontalFloat: 'right'
    },
    {
        name: 'axes',
        buttonClass: 'js-axes-box',
        iconClass: 'icon-axes',
        labelContent: 'Axes',
        horizontalFloat: 'right'
    },
    {
        name: 'notes',
        buttonClass: 'js-notes-box',
        iconClass: 'icon-annotate',
        labelContent: 'Notes',
        horizontalFloat: 'left'
    },
    {
        name: 'legend',
        buttonClass: 'js-legend-box',
        iconClass: 'icon-reorder',
        labelContent: 'Legend',
        horizontalFloat: 'right'
    }
];

exports.DEFAULT_MENU_ITEMS = DEFAULT_MENU_ITEMS;

const ORIENTATION = {
    VERTICAL: 'vertical',
    HORIZONTAL: 'horizontal'
};

exports.ORIENTATION = ORIENTATION;

const VALID_ORIENTATION = [
    ORIENTATION.VERTICAL,
    ORIENTATION.HORIZONTAL
];

exports.VALID_ORIENTATION = VALID_ORIENTATION;

const MENU_STYLE = {
    DESCRIPTIVE: 'descriptive',
    MINIMAL: 'minimal'
};

exports.MENU_STYLE = MENU_STYLE;

const VALID_MENU_STYLE = [
    MENU_STYLE.DESCRIPTIVE,
    MENU_STYLE.MINIMAL
];

exports.VALID_MENU_STYLE = VALID_MENU_STYLE;

const SLIDEOUT_DIRECTION = {
    LEFT: 'left',
    RIGHT: 'right',
    BOTTOM: 'bottom',
    TOP: 'top'
};

exports.SLIDEOUT_DIRECTION = SLIDEOUT_DIRECTION;

const VALID_SLIDEOUT_DIRECTIONS = [
    SLIDEOUT_DIRECTION.LEFT,
    SLIDEOUT_DIRECTION.RIGHT,
    SLIDEOUT_DIRECTION.BOTTOM,
    SLIDEOUT_DIRECTION.TOP
];

exports.VALID_SLIDEOUT_DIRECTIONS = VALID_SLIDEOUT_DIRECTIONS;

exports.SLIDEOUT_IS_ACTIVE = 'is-active';

exports.CONTOUR_OPERATIONS = [
    {name: '=', val: '=', scalar: true},
    {name: '<', val: '<', scalar: true},
    {name: '<=', val: '<=', scalar: true},
    {name: '>', val: '>', scalar: true},
    {name: '>=', val: '>=', scalar: true},
    {name: '[]', val: '[]', scalar: false},
    {name: '()', val: '()', scalar: false},
    {name: '[)', val: '[)', scalar: false},
    {name: '(]', val: '(]', scalar: false},
    {name: '][', val: '][', scalar: false},
    {name: ')(', val: ')(', scalar: false},
    {name: '](', val: '](', scalar: false},
    {name: ')[', val: ')[', scalar: false}
];
