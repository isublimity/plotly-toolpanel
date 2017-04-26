'use strict';

module.exports = function dropdown(cls, title) {
    return '<div class="editboxselector '+cls.replace(/[\.]/g,'-')+'">'+
        ((title) ? ('<div class="editboxtitle">'+title+'</div>') : '')+
        '<div class="btn-group">'+
            '<a class="btn btn--plain btn--small dropdown-toggle" data-toggle="dropdown" href="#">'+
                '<span class="selected-val"></span>'+
                '<span class="caret"></span>'+
            '</a>'+
            '<ul class="dropdown-menu"></ul>'+
        '</div>'+
    '</div>';
};
