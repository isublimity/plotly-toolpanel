'use strict';

function tracesBox (_name){
    var gd = this.gd;
    var panelSelector = '.' + _name + '-panel';
    var framework = gd.framework;
    var polarConfig = framework.getConfig();
    var polarLiveConfig = framework.getLiveConfig();
    $('.sp-container').remove();

    // Init all widgets and bind callbacks
    this.panel(_name, 'polar');

    var widgets = this.autoBinding(panelSelector, 'polar');

    // Traces
    widgets.traces.setConfig({
            traces: polarConfig.data.map(function(d, i){ return d.name || 'Trace ' + i; }),
            value: 'all'
        })
        .on('formChange', function(event, msg){
            if(msg === 'all') return;
            var traceConfig = getTraceConfig(msg);
            widgets.show.setValue(traceConfig.visible);
            widgets.showInLegend.setValue(traceConfig.visibleInLegend);
            widgets.dash.setValue(Plotly.Lib.nestedProperty(traceConfig, 'marker.line.dash').get());
            widgets.strokeSize.setValue(Plotly.Lib.nestedProperty(traceConfig, 'marker.line.width').get());
            widgets.traceColor.setValue(Plotly.Lib.nestedProperty(traceConfig, 'marker.color').get());
            widgets.traceStrokeColor.setValue(Plotly.Lib.nestedProperty(traceConfig, 'marker.line.color').get());
        });

    function getTraceConfig(_traceName){
        return polarLiveConfig.data.filter(function(d){ return d.name === _traceName; })[0];
    }

    function updateTrace(_callback){
        var selectedTrace = widgets.traces.getValue();
        var polarConfigDataCopy = polarLiveConfig.data.slice();
        polarConfigDataCopy.forEach(function(d, i){
            if(selectedTrace === 'all' || d.name === selectedTrace){
                _callback.call(this, d, i);
            }
        });
        gd.changed = true;
        return polarConfigDataCopy;
    }

    widgets.traceColor.setConfig({value: 'black'})
        .on('formChange', function(event, msg){
            framework({data: updateTrace(function(d){
                    Plotly.Lib.nestedProperty(d, 'marker.color').set(msg);
                })});
        });

    widgets.traceStrokeColor.setConfig({value: 'black'})
        .on('formChange', function(event, msg){
            framework({data: updateTrace(function(d){
                Plotly.Lib.nestedProperty(d, 'marker.line.color').set(msg);
            })});
        });

    widgets.show.setConfig({value: true})
        .on('formChange', function(event, msg){
            framework({data: updateTrace(function(d){ d.visible = msg; })});
        });

    widgets.dash.setConfig({value: 'solid'})
        .on('formChange', function(event, msg){
            framework({data: updateTrace(function(d){
                Plotly.Lib.nestedProperty(d, 'marker.line.dash').set(msg);
            })});
        });

    widgets.showInLegend.setConfig({value: true})
        .on('formChange', function(event, msg){
            framework({data: updateTrace(function(d){ d.showlegend = msg; })});
        });

    widgets.strokeSize.setConfig({
            value: 1,
            min: 0,
            max: 10,
            step: 1
        })
        .on('formChange', function(event, msg){
            framework({data: updateTrace(function(d){
                Plotly.Lib.nestedProperty(d, 'marker.line.width').set(msg);
            })});
        });
}

module.exports = tracesBox;
