'use strict';

var Plotly = window.Plotly;
var ToolPanel = window.ToolPanel;

/* Definition of your custom panel inners */
var customPanel = {
    cls: 'custom',
    content: function ($popover) {

        /*
         * Helper function that returns a DOM element for a row,
         * ready to be appended to
         */
        function createRow(title) {
            var rowComponent = document.createElement('div');
            rowComponent.className = 'editboxselector selector-row';

            var titleComponent = document.createElement('div');
            titleComponent.className = 'editboxtitle';
            titleComponent.innerHTML = title;

            rowComponent.appendChild(titleComponent);
            return rowComponent;
        }

        /* Create a select/option dropdown row */
        var selectRow = createRow('Select');
        var selectComponent = document.createElement('select');

        ['one', 'two', 'three'].map(option => {
            let optionComponent =  document.createElement('option');
            optionComponent.value = option;
            optionComponent.innerHTML = option;
            selectComponent.appendChild(optionComponent);
        });

        selectRow.appendChild(selectComponent);

        /* Create a btngroup row */
        var btnGroup = document.createElement('div');
        btnGroup.className = 'btn-group';
        ['one', 'two', 'three'].map(function (button) {
            let buttonComponent =  document.createElement('button');
            buttonComponent.className = 'btn btn--plain btn--small editboxbuton';
            buttonComponent.innerHTML = button;
            btnGroup.appendChild(buttonComponent);
        });

        var btnRow = createRow('Buttons');
        btnRow.appendChild(btnGroup);

        /* Create an input row */
        var input = document.createElement('input');
        input.className = 'input';

        var inputRow = createRow('Inputs');
        inputRow.appendChild(input);

        /* Append them all to the popover inner */
        var container = $popover.find('.popover-items').get(0);

        [selectRow, btnRow, inputRow].forEach(function (component) {
            container.appendChild(component);
        });

    }
};


/* Creating our workspace DOM elements */
var containerDiv = document.getElementById('main');
var graphDiv = document.createElement('div');
var toolDiv = document.createElement('div');

containerDiv.style.width = '100%';
containerDiv.style.height = '100%';

graphDiv.id = 'graphId';
graphDiv.style.width = '50%';
graphDiv.style.display = 'inline-block';
graphDiv.style.margin = '0px';
graphDiv.style.verticalAlign = 'top';

toolDiv.className = 'toolDiv';
toolDiv.style.display = 'inline-block';
toolDiv.style.position = 'relative';

containerDiv.appendChild(graphDiv);
containerDiv.appendChild(toolDiv);

/* Get a graph Figure from somewhere */
$.getJSON('https://plot.ly/~demos/3200.json', function (figure) {

    var data = figure.data;
    var toolPanel;

    Plotly.newPlot('graphId', data);

    graphDiv.toolPanel = toolPanel = new ToolPanel(Plotly, graphDiv, {
        standalone: true,
        slideoutDirection: 'right',
        popoverContainer: containerDiv,
        menuStyle: 'descriptive',
        orientation: 'vertical'
    });

    graphDiv.toolPanel.makeMenu({
        toolMenuContainer: toolDiv
    });

    /* Create a custom button that opens a custom panel */
    toolPanel.createMenuButton({
        iconClass: 'icon-star',
        labelContent: 'Custom',

        /* This gets called when you click the button */
        handler: function () {

            /* Button has been clicked, we want to populate the slideoutPanel */
            toolPanel.renderSlideoutPanel(graphDiv, customPanel);

            /* We then want to toggle it, so that it opens or closes appropriately*/
            toolPanel.toggle('custom');
        }
    });

});
