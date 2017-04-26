'use strict';

function axesBox (_name){
    var gd = this.gd;
    var panelSelector = '.' + _name + '-panel';
    var framework = gd.framework;
    var polarConfig = framework.getConfig();
    var polarLiveConfig = framework.getLiveConfig();
    $('.sp-container').remove();
    this.panel(_name, 'polar');

    var widgets = this.autoBinding(panelSelector, 'polar');

    widgets.orientation.setConfig({
            value: polarConfig.layout.orientation,
            min: -360,
            max: 360,
            step: 10
        })
        .on('formChange', function(event, msg){
            framework({layout: {orientation: msg}});
            gd.changed = true;
        });

    widgets.direction.setConfig({ value: polarConfig.layout.direction || 'clockwise' })
        .on('formChange', function(event, msg){
            framework({layout: {direction: msg}});
            gd.changed = true;
        });

    var plotlyScales = framework.getLiveScales();
    var radialDomain = plotlyScales.r.range().slice();
    var radialSpan = radialDomain[1] - radialDomain[0];
    widgets.radialDomainMin.setConfig({
            value: radialDomain[0],
            step: radialSpan / 100
        })
        .on('formChange', function(event, msg){
            framework({layout: {radialaxis: {range: [msg, widgets.radialDomainMax.getValue()]}}});
            gd.changed = true;
        });

    widgets.radialDomainMax.setConfig({
            value: radialDomain[1],
            step: radialSpan / 100
        })
        .on('formChange', function(event, msg){
            framework({layout: {radialaxis: {range: [widgets.radialDomainMin.getValue(), msg]}}});
            gd.changed = true;
        });

    widgets.radialDomainToDataExtent
        .on('formChange', function(){
            framework({layout: {radialaxis: {range: null}}});
            radialDomain = framework.getLiveScales().r.domain().slice();
            widgets.radialDomainMin.setValue(radialDomain[0]);
            widgets.radialDomainMax.setValue(radialDomain[1]);
            gd.changed = true;
        });

    var angularDomain = plotlyScales.t.domain().slice();
    var angularSpan = angularDomain[1] - angularDomain[0];
    widgets.angularDomainMin.setConfig({
            value: angularDomain[0],
            step: angularSpan / 100
        })
        .on('formChange', function(event, msg){
            var endPadding =  Plotly.Lib.nestedProperty(polarLiveConfig, 'layout.angularaxis.endpadding').get();
            framework({layout: {angularaxis: {range: [msg, widgets.angularDomainMax.getValue() - endPadding]}}});
        });

    widgets.angularDomainMax.setConfig({
            value: angularDomain[1],
            step: angularSpan / 100
        })
        .on('formChange', function(event, msg){
            var endPadding =  Plotly.Lib.nestedProperty(polarLiveConfig, 'layout.angularaxis.endpadding').get();
            framework({layout: {angularaxis: {range: [widgets.angularDomainMin.getValue(), msg - endPadding]}}});
            gd.changed = true;
        });

    widgets.angularDomainToDataExtent
        .on('formChange', function(){
            framework({layout: {angularaxis: {range: null}}});
            angularDomain = framework.getLiveScales().t.domain().slice();
            widgets.angularDomainMin.setValue(angularDomain[0]);
            widgets.angularDomainMax.setValue(angularDomain[1]);
            gd.changed = true;
        });

    widgets.radialAxisOrientation.setConfig({
            value: Plotly.Lib.nestedProperty(polarLiveConfig, 'layout.radialaxis.orientation').get(),
            min: -360,
            max: 360,
            step: 10
        })
        .on('formChange', function(event, msg){
            framework({layout: {radialaxis: {orientation: msg}}});
            gd.changed = true;
        });

//    widgets.angularMajorTicksCount.setConfig({
//            value: Plotly.Lib.nestedProperty(polarConfig, 'layout.angularaxis.tickCount').get(),
//            step: 1
//        })
//        .on('formChange', function(event, msg){ framework({layout: {angularaxis: {tickCount: msg}}}); });
//
//    widgets.angularMinorTicksCount.setConfig({
//            value: Plotly.Lib.nestedProperty(polarConfig, 'layout.angularaxis.minorTickCount').get(),
//            step: 1
//        })
//        .on('formChange', function(event, msg){ framework({layout: {angularaxis: {minorTickCount: msg}}}); });

//    widgets.endSpacing.setConfig({value: polarConfig.layout.needsEndSpacing || true})
//        .on('formChange', function(event, msg){
//            framework({layout: {needsEndSpacing: msg}});
//            angularDomain = framework.getLiveScales().x.domain().slice();
//            widgets.angularDomainMin.setValue(angularDomain[0]);
//            widgets.angularDomainMax.setValue(angularDomain[1]);
//        });
}

module.exports = axesBox;
