'use strict';

function legendBox (_name) {
    var gd = this.gd;
    var panelSelector = '.' + _name + '-panel';
    var framework = gd.framework;
    var polarConfig = framework.getConfig();
    $('.sp-container').remove();
    this.panel(_name, 'polar');

    var widgets = this.autoBinding(panelSelector, 'polar');

    widgets.show.setConfig({ value: polarConfig.layout.showlegend })
        .on('formChange', function(event, msg){
            framework({layout: {showlegend: msg}});
            gd.changed = true;
        });

    widgets.traceOrder.setConfig({
            value: Plotly.Lib.nestedProperty(polarConfig, 'layout.legend.traceorder').get() || 'normal'
        })
        .on('formChange', function(event, msg){
            framework({layout: {legend: {traceorder: msg}}});
            gd.changed = true;
        });
};

module.exports = legendBox;
