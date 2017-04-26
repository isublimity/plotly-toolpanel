'use strict';


function annotationBox (_name) {
    var gd = this.gd;

    var panelSelector = '.' + _name + '-panel';
    var framework = gd.framework;
    var polarConfig = framework.getConfig();
    $('.sp-container').remove();
    this.panel(_name, 'polar');

    var widgets = this.autoBinding(panelSelector, 'polar');

//    // Radial tick suffix
//    Polarform.textInput({
//            selector: panelSelector + ' .js-radial-label-suffix',
//            value: Plotly.Lib.nestedProperty(polarConfig, 'layout.radialaxis.suffix').get()
//        })
//        .on('formChange', function(event, msg){
//            framework({layout: {radialaxis: {suffix: msg}}});
//        });
//
//    // Angular tick suffix
//    Polarform.textInput({
//            selector: panelSelector + ' .js-angular-label-suffix',
//            value: Plotly.Lib.nestedProperty(polarConfig, 'layout.angularaxis.suffix').get()
//        })
//        .on('formChange', function(event, msg){
//            framework({layout: {angularaxis: {suffix: msg}}});
//        });
}

module.exports = annotationBox;
