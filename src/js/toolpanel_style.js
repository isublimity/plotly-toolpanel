'use strict';

var ToolPanelStyle = {};

// custom styling injected via envify
switch(process.env.PLOTLY_CUSTOM_STYLE) {
    case 'open-office-2015':
        ToolPanelStyle = require('./styles/open_office_2015');
        break;

    case 'chromite':
        ToolPanelStyle = require('./styles/chromite');
        break;

    case 'astrophyllite':
        ToolPanelStyle = require('./styles/astrophyllite');
        break;

    default:
        ToolPanelStyle = require('./styles/default');
}

module.exports = ToolPanelStyle;
