'use strict';

function layoutBox (_name) {
    var gd = this.gd;
    var panelSelector = '.' + _name + '-panel';
    var framework = gd.framework;
    var polarConfig = framework.getConfig();
    $('.sp-container').remove();
    this.panel(_name, 'polar');

    var widgets = this.autoBinding(panelSelector, 'polar');

    widgets.plotColor.setConfig({value: polarConfig.layout.plot_bgcolor || 'white'})
        .on('formChange', function(event, msg){
            framework({layout: {plot_bgcolor: msg}});
            gd.changed = true;
        });

    widgets.marginColor.setConfig({value: polarConfig.layout.paper_bgcolor || 'white'})
        .on('formChange', function(event, msg){
            framework({layout: {paper_bgcolor: msg}});
            gd._context.setBackground(gd, msg);
            gd.changed = true;
        });

    widgets.fontSize.setConfig({
            value: Plotly.Lib.nestedProperty(polarConfig, 'layout.font.size').get() || 12,
            min: 0,
            max: 36,
            step: 1
        })
        .on('formChange', function(event, msg){
            framework({layout: {font: {size: msg}}});
            framework.setUndoPoint();
            gd.changed = true;
        });

    widgets.fontColor.setConfig({
            value: Plotly.Lib.nestedProperty(polarConfig, 'layout.font.color').get() || 'black'
        })
        .on('formChange', function(event, msg){
            framework({layout: {font: {color: msg}}});
            gd.changed = true;
        });

    widgets.fontFamily.setConfig({
            value: Plotly.Lib.nestedProperty(polarConfig, 'layout.font.family').get() || 'Arial'
        })
        .on('formChange', function(event, msg){
            framework({layout: {font: {family: msg}}});
            gd.changed = true;
        });

    widgets.width.setConfig({
            value: polarConfig.layout.width,
            min: 0,
            max: 1000,
            step: 1
        })
        .on('formChange', function(event, msg){
            framework({layout: {width: msg}});
            gd.layout._paperdiv.style({width: msg + 'px'});
            gd.changed = true;
        });

    widgets.height.setConfig({
            value: polarConfig.layout.height,
            min: 0,
            max: 1000,
            step: 1
        })
        .on('formChange', function(event, msg){
            framework({layout: {height: msg}});
            gd.layout._paperdiv.style({height: msg + 'px'});
            gd.changed = true;
        });

    widgets.padding.setConfig({
            value: Plotly.Lib.nestedProperty(polarConfig, 'layout.margin.t').get(),
            min: 0,
            max: 200,
            step: 1
        })
        .on('formChange', function(event, msg){
            framework({layout: {margin: {t: msg, r: msg, b: msg, l: msg, pad: msg}}});
            gd.changed = true;
        });
}

module.exports = layoutBox;
