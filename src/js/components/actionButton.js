'use strict';

/**
 * Creates a row with a single button which a function can be added to.
 *
 * @param s
 * @param {String} title The title for the row.
 * @param {String} buttonName The name that goes in the button.
 * @param {Function} clickHandler Gets called when button is clicked.
 * @returns {*|jQuery}
 */
function actionButton (s, title, buttonName, clickHandler) {
    var picker = $('<div class="editboxselector pickoption">'+
            (title ? ('<div class="editboxtitle">' + title + '</div>') : '')+
            '<div class="btn-group"></div></div>').appendTo(s);
    var pickbg = picker.find('.btn-group');
    $('<button class="btn btn--plain btn--small editboxbutton">' +
            buttonName + '</button>')
        .appendTo(pickbg)
        .click(clickHandler);
    return picker;
}

module.exports = actionButton;
