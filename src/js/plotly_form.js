var Polarform = {};

// Spinner
//////////////////////////////////////////////

Polarform.spinner = function(_config){
    var widget = $(_config.selector),
        config = {
            value: 1
        };
    widget.getValue = function(){ return +widget.val(); };
    widget.setValue = function(_value){ return widget.spinner('value', _value); };
    widget.setConfig = function(_config){
        config = Plotly.Lib.extendDeepAll(config, _config);
        widget.spinner({
            min: config.min,
            max: config.max,
            step: config.step || 0.01,
            spin: function( event, ui ) {
    //            widget.trigger('formChange', widget.getValue());
            },
            change: function( event, ui ) {
                widget.trigger('formChange', widget.getValue());
            }
        });
        widget.setValue(config.value)
        return widget;
    };

    widget.setConfig(_config);

    return widget;
};

// Spinner slider combo
//////////////////////////////////////////////

Polarform.spinnerSlider = function(_config){
    var slider = $(_config.selector).siblings('.slider').eq(0),
        spinner = $(_config.selector),
        config = {
            min: 0,
            max: 1,
            step: 0.01,
            value: 1
        };

    spinner.getValue = function(){ return +spinner.val(); };
    spinner.setValue = function(_value){
        slider.slider('option', 'value', _value);
        spinner.spinner('value', _value);
        return spinner;
    };
    spinner.setConfig = function(_config){
        config = Plotly.Lib.extendDeepAll(config, _config);
        spinner.spinner({
            min: config.min,
            max: config.max,
            step: config.step,
            spin: function( event, ui ) {
                slider.slider('option', 'value', ui.value);
            },
            change: function( event, ui ) {
                slider.slider('option', 'value', spinner.getValue());
                spinner.trigger('formChange', spinner.getValue());
            }
        });
        slider.slider({
            min: config.min,
            max: config.max,
            step: config.step || 0.01,
            slide: function( event, ui ) {
                spinner.spinner('value', ui.value);
                spinner.trigger('formChange', spinner.getValue());
            }
        });
        spinner.setValue(config.value);
        return spinner;
    };

    spinner.setConfig(_config);
    return spinner;
};


// Color selector
//////////////////////////////////////////////

Polarform.colorSelector = function(_config){
    var widget = $(_config.selector),
        config = {
            value: 'none'
        };

    var spectrumConfig = {
        showInput: true,
        allowEmpty: true,
        clearText: 'Clear',
        showInitial: false,
        showAlpha: true,
        localStorageKey: 'spectrum.palette',
        showPalette: true,
        showPaletteOnly: false,
        showSelectionPalette: true,
        clickoutFiresChange: true,
        cancelText: 'Cancel',
        showButtons: true,
        preferredFormat: 'rgb',
        maxSelectionSize: 16,
        className: 'spectrum-color-picker',
        palette: [
            //Plotly.Plots.defaultColors,
            ["rgb(0, 0, 0)", "rgb(67, 67, 67)", "rgb(102, 102, 102)",
                "rgb(204, 204, 204)", "rgb(217, 217, 217)","rgb(255, 255, 255)"],
            ["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 153, 0)", "rgb(255, 255, 0)", "rgb(0, 255, 0)",
                "rgb(0, 255, 255)", "rgb(74, 134, 232)", "rgb(0, 0, 255)", "rgb(153, 0, 255)", "rgb(255, 0, 255)"],
            ["rgb(230, 184, 175)", "rgb(244, 204, 204)", "rgb(252, 229, 205)", "rgb(255, 242, 204)", "rgb(217, 234, 211)",
                "rgb(208, 224, 227)", "rgb(201, 218, 248)", "rgb(207, 226, 243)", "rgb(217, 210, 233)", "rgb(234, 209, 220)",
                "rgb(221, 126, 107)", "rgb(234, 153, 153)", "rgb(249, 203, 156)", "rgb(255, 229, 153)", "rgb(182, 215, 168)",
                "rgb(162, 196, 201)", "rgb(164, 194, 244)", "rgb(159, 197, 232)", "rgb(180, 167, 214)", "rgb(213, 166, 189)",
                "rgb(204, 65, 37)", "rgb(224, 102, 102)", "rgb(246, 178, 107)", "rgb(255, 217, 102)", "rgb(147, 196, 125)",
                "rgb(118, 165, 175)", "rgb(109, 158, 235)", "rgb(111, 168, 220)", "rgb(142, 124, 195)", "rgb(194, 123, 160)",
                "rgb(166, 28, 0)", "rgb(204, 0, 0)", "rgb(230, 145, 56)", "rgb(241, 194, 50)", "rgb(106, 168, 79)",
                "rgb(69, 129, 142)", "rgb(60, 120, 216)", "rgb(61, 133, 198)", "rgb(103, 78, 167)", "rgb(166, 77, 121)",
                "rgb(91, 15, 0)", "rgb(102, 0, 0)", "rgb(120, 63, 4)", "rgb(127, 96, 0)", "rgb(39, 78, 19)",
                "rgb(12, 52, 61)", "rgb(28, 69, 135)", "rgb(7, 55, 99)", "rgb(32, 18, 77)", "rgb(76, 17, 48)"]]
    };

    widget.getValue = function(){
        var color = widget.spectrum('get');
        return (color) ? color.toRgbString() : 'none';
    };
    widget.setValue = function(_value){
        var value = (_value === 'none') ? null : _value;
        return widget.spectrum('set', value)
    };
    widget.setConfig = function(_config){
        config = Plotly.Lib.extendDeepAll(config, _config);
        widget.spectrum(spectrumConfig);
        widget.setValue(config.value);
        return widget;
    };

    widget.setConfig(_config);
    widget.on('change', function(event){
        widget.trigger('formChange', widget.getValue());
    });
    return widget;
};


// Font selector
//////////////////////////////////////////////

Polarform.fontSelector = function(_config){
    var widget = $(_config.selector),
        config = {
            value: 'auto'
        };

    var fonts = ['Arial, sans-serif', 'Courier New, monospace', 'Droid Sans, sans-serif', 'Droid Serif, serif',
        'Droid Sans Mono, sans-serif', 'Georgia, serif', 'Gravitas One, cursive', 'Impact, Charcoal, sans-serif',
        'Lucida Console, Monaco, monospace', 'Old Standard TT, serif', 'Open Sans, sans-serif',
        'PT Sans Narrow, sans-serif', 'Raleway, sans-serif', 'Times New Roman, Times, serif', 'Verdana, , sans-serif'
    ];

    widget.getValue = function(){
        var val = widget.find("option:selected").val();
        var selectedFontFamily = fonts.filter(function(d, i){ return d.indexOf(val) != -1; })[0];
        return selectedFontFamily;
    };
    widget.setValue = function(_value){ return widget.selectpicker('val', _value.split(',')[0]); };
    widget.setConfig = function(_config){
        config = Plotly.Lib.extendDeepAll(config, _config);
        var fontFamilyHTML = fonts.map(function(d, i){
            var font = d.split(',')[0];
            return '<option ' + ((d.indexOf(_config.value) > -1) ? 'selected ' : '')
                + 'value="'+font+'" data-content="<span style=\'font-family: '
                + d + ';\'>'+ d.split(',')[0]+'</span>"></option>';
        });
        widget.html('').append(fontFamilyHTML);
        widget.selectpicker();
        widget.setValue(config.value);
        widget.selectpicker('refresh');
        return widget;
    };

    widget.setConfig(_config);
    widget.on('change', function(event, ui){ widget.trigger('formChange', widget.getValue()); });
    return widget;
};


// Trace selector
//////////////////////////////////////////////

Polarform.traceSelector = function(_config){
    var widget = $(_config.selector),
    config = {
        value: 'all',
        traces: ['a', 'b', 'c']
    };

    widget.getValue = function(){ return widget.val(); };
    widget.setValue = function(_value){ return widget.selectpicker('val', _value); };
    widget.setConfig = function(_config){
        config = Plotly.Lib.extendDeepAll(config, _config);
        var traceArray = config.traces;
        traceArray.unshift('all')
        var tracesHTML = traceArray.map(function(d, i){
            //return '<option ' + ((false) ? 'selected ' : '')
            return '<option value="'+d+'">'+d+'</option>';
        });
        widget.html('').append(tracesHTML);
        widget.selectpicker();
        widget.setValue(config.value);
        widget.selectpicker('refresh');
        return widget;
    };

    widget.setConfig(_config);
    widget.on('change', function(event, ui){ widget.trigger('formChange', widget.getValue()); });
    return widget;
};


// Generic selector
//////////////////////////////////////////////

Polarform.genericSelector = function(_config){
    var widget = $(_config.selector),
    config = {
        value: 'a'
    };

    widget.getValue = function(){ return widget.val(); };
    widget.setValue = function(_value){ return widget.selectpicker('val', _value); };
    widget.setConfig = function(_config){
        config = Plotly.Lib.extendDeepAll(config, _config);
        widget.selectpicker();
        widget.setValue(config.value);
        widget.selectpicker('refresh');
        return widget;
    };

    widget.setConfig(_config);
    widget.on('change', function(event, ui){ widget.trigger('formChange', widget.getValue()); });
    return widget;
};


// Checkbox
//////////////////////////////////////////////

Polarform.checkbox = function(_config){
    var widget = $(_config.selector),
    config = {
        value: true
    };

    widget.getValue = function(){ return widget.get(0).checked };
    widget.setValue = function(_bool){
        if(typeof _bool === 'undefined') _bool = config.value;
        widget.prop('checked', _bool);
        return widget;
    };
     widget.setConfig = function(_config){
        config = Plotly.Lib.extendDeepAll(config, _config);
        widget.setValue(config.value);
        return widget;
     };

    widget.setConfig(_config);
    widget.on('change', function(event, ui){ widget.trigger('formChange', widget.getValue()); });
    return widget;
};


// Radio buttons
//////////////////////////////////////////////

Polarform.radioButton = function(_config){
    var firstWidget = $(_config.selector),
        config = {
            value: 'all'
        };
    var widget = firstWidget.parent().siblings().find('[type=radio]').add(firstWidget);
    widget.getValue = function(){ return widget.filter("input:checked").val(); };
    widget.setValue = function(_value){
        widget.each(function(idx, val){
            var isChecked = (_value === $(this).val());
            $(this).prop("checked", isChecked);
        });
        return widget;
    };
     widget.setConfig = function(_config){
        config = Plotly.Lib.extendDeepAll(config, _config);
        widget.setValue(config.value);
        return widget;
     };

    widget.setConfig(_config);
    widget.change(function(event, ui){
        firstWidget.trigger('formChange', widget.getValue());
    });
    return widget;
};


// Button
//////////////////////////////////////////////

Polarform.button = function(_config){
    var widget = $(_config.selector),
            config = {
                value: widget.prop('name') || 'Text',
            };

    widget.getValue = function(){ return widget.get(0).name; };
    widget.setValue = function(_value){
        if(typeof _value === 'undefined') _value = _config.value;
        widget.prop({name: _value});
        return widget;
    };
    widget.setConfig = function(_config){
        config = Plotly.Lib.extendDeepAll(config, _config);
        widget.setValue(config.value);
        return widget;
    };

    widget.setConfig(_config);
    widget.on('click', function(event, ui){
        widget.trigger('formChange', this.name);
    });
    return widget;
};

Polarform.toggleButton = function(_config){
    console.log('not implemented');
    var widget = $(_config.selector);
    widget.getValue = function(){ return widget.get(0).name; };
    widget.setValue = function(_value){
        if(typeof _value === 'undefined') _value = _config.value;
        widget.prop({name: _value});
        return widget;
    };

    widget.setValue(_config.value);
    widget.on('click', function(event, ui){
        widget.trigger('formChange', this.name);
    });
    return widget;
};


// Text input
//////////////////////////////////////////////

Polarform.textInput = function(_config){
    var widget = $(_config.selector),
        config = {
            value: 'Text',
        };
    widget.getValue = function(){ return widget.val(); };
    widget.setValue = function(_value){
        if(typeof _value === 'undefined') _value = _config.value;
        widget.val(_value);
        return widget;
    };
     widget.setConfig = function(_config){
        config = Plotly.Lib.extendDeepAll(config, _config);
        widget.setValue(config.value);
        return widget;
     };

    widget.setConfig(_config);
    widget.on('change keyup', function(event, ui){
        widget.trigger('formChange', widget.getValue());
    });
    return widget;
};

module.exports = Polarform;
