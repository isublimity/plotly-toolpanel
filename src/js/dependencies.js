'use strict';

/**
 * This is just a wrapper for the toolpanel module. Used for creating a
 * standalone-browserified bundle, it requires in all of the browser deps.
 *
 * Here we're require'ing in all of the manual dependencies.
 * see package.json `browserify-shim` field. These dependencies
 * are sourced from our local plugin src files, then browserified into the bundle.
 *
 */
require('jquery');
require('jquery-ui');
require('bootstrap');
require('bootstrap-select');
require('jquery-ui-spinner');
require('tipsy');
require('spectrum')($);
