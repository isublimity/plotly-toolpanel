'use strict';

/* Grab the Plotly and ToolPanel objects from the window scope */
var Plotly = window.Plotly;
var ToolPanel = window.ToolPanel;

/* Grab the containers we'll be using */
var containerDiv = document.getElementById('main');
var graphDiv = document.getElementById('graphContainer');
var toolDiv = document.getElementById('toolMenuContainer');

/* Get a graph Figure from somewhere */
var figureURL = 'https://plot.ly/~demos/3200.json';

$.getJSON(figureURL, function (figure) {

    /* Plot the graph */
    Plotly.newPlot(graphDiv, figure.data, figure.layout);

    /* Create an instance of ToolPanel */
    var toolPanel = new ToolPanel(Plotly, graphDiv, {
        standalone: true,
        popoverContainer: containerDiv,
        menuStyle: 'minimal',
        orientation: 'horizontal'
    });

    /* Initialize the ToolPanel's menu */
    graphDiv.toolPanel.makeMenu({
        toolMenuContainer: toolDiv
    });

    /* Start creating some buttons and menuItems! */
    toolPanel.createMenuMultiButton([
        {
            labelContent: 'Undo',
            iconClass: 'icon-rotate-left',
            handler: toolPanel.undo
        },
        {
            labelContent: 'Redo',
            iconClass: 'icon-rotate-right',
            handler: toolPanel.redo
        }
    ]);

    /* Create the default graph editing buttons */
    toolPanel.createMenuButtons(toolPanel.getPanelButtonSpecs());
});
