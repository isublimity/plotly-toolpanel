'use strict';

function viewJSON () {
    var gd = this.gd;
    var figure, iterArray;
    if(gd.framework && gd.framework.isPolar){
        figure = JSON.parse(JSON.stringify(gd.framework.getLiveConfig()));
    } else {
        figure = JSON.parse(Plotly.Plots.graphJson(gd));
    }

    iterArray = Utils.walkObj(figure.data, true, ['stream']);
    for (var i = 0; i < iterArray.length; i++) {
        delete iterArray[i].parent.stream;
    }

    var code = 'var data = ' + Utils.escapeForHtml(JSON.stringify(figure.data)) + ';\n' +
            'var layout = ' + Utils.escapeForHtml(JSON.stringify(figure.layout)) + ';\n' +
            'Plotly.plot(graphDiv, data, layout);';

    var jsonModal = $('#jsonModal');
    var jsonViewer = jsonModal.find('#json-viewer').empty();
    jsonViewer.data('jsontree', '')
        .jsontree(JSON.stringify(figure), {collapsibleOuter:false}).show();
    jsonModal.modal('show');

    var jsonText = jsonModal.find('#json-text')
        .text('').append(code).hide();
    var buttonTexts = ['Switch to Plain Text', 'Switch to JSON Viewer'];
    var viewerToggle = $('.js-plain-text-toggle').text(buttonTexts[0]);

    viewerToggle.off('click').on('click', function(){
        var isPlainText = $(this).text() === buttonTexts[0];
        jsonViewer.toggle(!isPlainText);
        jsonText.toggle(isPlainText);
        jsonText.get(0).select();
        $(this).text(buttonTexts[+isPlainText]);
        return false;
    });

    jsonModal.find('.close').off('click').on('click', function(){
        jsonModal.modal('hide');
        return false;
    });
};

module.exports = viewJSON;
