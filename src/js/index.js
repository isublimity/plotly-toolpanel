'use strict';

var EventEmitter = require('events').EventEmitter;

var notSettable = require('./util/notSettable');
var Utils = require('./util/utils');

var actionButton = require('./components/actionButton');
var dropdown = require('./components/dropdown');
var pickColor = require('./components/pickColor');
var pickOption = require('./components/pickOption');
var selectOption = require('./components/selectOption');
var pickColorPalette = require('./components/pickColorPalette');
var pickStyle = require('./components/pickStyle');
var optionStyle = require('./components/optionStyle');

var fs = require('fs');
var polarTemplates = fs.readFileSync(__dirname + '/../html/polar_templates.html');
var Polarform = require('./plotly_form');
window.Polarform = Polarform;

var makeAxesTemplate = fs.readFileSync(
    __dirname + '/../html/make_axes.html', {encoding: 'utf8'}
);

function noopProp() {
    return {
        val: true,
        get: function() { return this.val; },
        set: function(val) { this.val = val; return this;}
    };
}

/*
 * Toolpanel Constants allow customization of Toolpanel primitives
 * by setting environment variables. See ToolPanelConstants src
 * for more information.
 */
const ToolPanelConstants = require('./constants/ToolPanelConstants');

const DEFAULT_MENU_ITEMS = ToolPanelConstants.DEFAULT_MENU_ITEMS;
const ORIENTATION = ToolPanelConstants.ORIENTATION;
const VALID_ORIENTATION = ToolPanelConstants.VALID_ORIENTATION;
const MENU_STYLE = ToolPanelConstants.MENU_STYLE;
const VALID_MENU_STYLE = ToolPanelConstants.VALID_MENU_STYLE;
const SLIDEOUT_DIRECTION = ToolPanelConstants.SLIDEOUT_DIRECTION;
const VALID_SLIDEOUT_DIRECTIONS = ToolPanelConstants.VALID_SLIDEOUT_DIRECTIONS;
const SLIDEOUT_IS_ACTIVE = ToolPanelConstants.CSS_IS_ACTIVE_SLIDEOUT;
const TRACE_LABEL = ToolPanelConstants.TRACE_LABEL;
const TRACES_LABEL = ToolPanelConstants.TRACES_LABEL;
const SHOW_DELETE_TRACE_UI = ToolPanelConstants.SHOW_DELETE_TRACE_UI;
const CONTOUR_OPERATIONS = ToolPanelConstants.CONTOUR_OPERATIONS;

function killPopovers() {
    var $slideouts = $('.slideout');
    if ($slideouts.length) {
        $slideouts.find('.pickcolor').spectrum('destroy');
        $('.sp-container,.tipsy').remove();
        $slideouts.remove();
    }

    // Remove the active class from any button that may be active.
    $('.toolmenu-button.--is-active').removeClass('--is-active');
}

/**
 * @param {orientation} String of orientation
 * @return {boolean} if the orientation is valid
 */
function isValidSlideoutDirection (direction) {
    return (VALID_SLIDEOUT_DIRECTIONS.indexOf(direction) !== -1);
}

/**
 * @param {orientation} String of orientation
 * @returns {boolean} if the menuStyle string is valid or not
 */
function isValidOrientation (orientation) {
    if (VALID_ORIENTATION.indexOf(orientation) === -1) return false;
    else return true;
}

/**
 * @param {menuStyle} String of menuStyle
 * @returns {boolean} if the menuStyle string is valid or not
 */
function isValidMenuStyle (menuStyle) {
    if (VALID_MENU_STYLE.indexOf(menuStyle) === -1) return false;
    else return true;
}

function ToolPanel (Plotly, gd, opts) {
    if (!opts) opts = {};

    if (!Plotly) throw new Error('ToolPanel was not passed Plotly... Cannot create ToolPanel.');
    if (!gd) throw new Error('ToolPanel was not passed a div... Cannot create ToolPanel.');

    var queue = Plotly.Queue;


    /* Default slideoutDirection to `right` */
    if (!isValidSlideoutDirection(opts.slideoutDirection)) {
        opts.slideoutDirection = SLIDEOUT_DIRECTION.RIGHT;
    }

    /* Do a check to make sure initial style and orientation values are OK */
    if (!isValidMenuStyle(opts.menuStyle)) opts.menuStyle = MENU_STYLE.DESCRIPTIVE;
    if (!isValidOrientation(opts.orientation)) opts.orientation = ORIENTATION.VERTICAL;
    if (opts.menuStyle === MENU_STYLE.DESCRIPTIVE && opts.orientation === ORIENTATION.HORIZONTAL) {
        throw new Error('horizontal orientation is not available in descriptive style yet...');
    }

    var toolPanel = {
        toolMenuContainer: null,
        notifier: opts.notifier || Plotly.Lib.notifier,
        isStandalone: opts.standalone || false,
        activePanelName: null, // Gets set in `toolPanel.toggle`
        polar: {
            widgets: {}
        },
        cartesian: {
            widgets: {}
        },
        gd: gd,
        toolMenuItems: [],
        slideoutDirection: opts.slideoutDirection,
        orientation: opts.orientation,
        menuStyle: opts.menuStyle,
        emitter: new EventEmitter()
    };

    toolPanel.polar.tracesBox = require('./panels/polar/tracesBox').bind(toolPanel);
    toolPanel.polar.layoutBox = require('./panels/polar/layoutBox').bind(toolPanel);
    toolPanel.polar.axesBox = require('./panels/polar/axesBox').bind(toolPanel);
    toolPanel.polar.annotationBox = require('./panels/polar/annotationBox').bind(toolPanel);
    toolPanel.polar.legendBox = require('./panels/polar/legendBox').bind(toolPanel);

    toolPanel.isPolar = Utils.isPolar.bind(toolPanel);
    toolPanel.isGL3D = Utils.isGL3D.bind(toolPanel);
    toolPanel.isGeo = Utils.isGeo.bind(toolPanel);

    // html for a bootstrap dropdown with class cls
    toolPanel.dropdown = dropdown.bind(toolPanel);

    toolPanel.viewJson = require('./panels/viewJson').bind(toolPanel);

    // Attach the toolmenu to the provided gd
    gd.toolPanel = toolPanel;

    toolPanel.makeMenu = function (opts, onComplete) {

        if (!onComplete) onComplete = function () {};

        toolPanel.toolMenuContainer = opts.toolMenuContainer || gd;
        var $toolMenu = $(toolPanel.toolMenuContainer);

        /*
         * Attach the Polar Templates to the DOM
         * TODO: Remove this, as it forces us to use brfs
         */
        var polarDOMTemplates = document.createElement('div');
        polarDOMTemplates.innerHTML = polarTemplates;
        $toolMenu.append(polarDOMTemplates);

        var menuContainerInner = document.createElement('div');
        menuContainerInner.className = 'toolmenu';
        $toolMenu.prepend(menuContainerInner);

        var buttonList = document.createElement('ul');

        buttonList.className = 'toolmenu-list';
        $(menuContainerInner).append(buttonList);

        var slideoutContainer = document.createElement('div');
        slideoutContainer.className = 'slideout-container --slide-' + toolPanel.slideoutDirection;
        $toolMenu.append(slideoutContainer);
        toolPanel.slideoutContainer = slideoutContainer;

        /*
         * Here we call setSlideoutDirection to set up the initail positioning of the
         * slideout container
         */
        toolPanel.setSlideoutDirection(toolPanel.slideoutDirection);

        onComplete(gd);
    };

    /**
      * @param {orientation} One of ['horizontal', 'vertical']
      * @returns {toolPanel} the toolPanel instance so you can chain the calls together
      *
      * Sets the menu orientation.
      */
    toolPanel.setOrientation = function (orientation) {

        var isValid = isValidOrientation(orientation);
        if (!isValid) throw new Error('Not a valid orientation! Must be one of ' + VALID_ORIENTATION.join(', '));

        if (orientation === ORIENTATION.HORIZONTAL && toolPanel.menuStyle === MENU_STYLE.DESCRIPTIVE) {
            throw new Error('horizontal orientation is not available in descriptive style yet...');
        }

        toolPanel.orientation = orientation;
        toolPanel.renderMenu();

        return toolPanel;
    };

    /**
      * @param {style} One of ['descriptive', 'minimal']
      * @returns {toolPanel} the toolPanel instance so you can chain the calls together
      *
      * Sets the menuStyle to one of the predetermined styles.
      */
    toolPanel.style = function (menuStyle) {

        if (!isValidMenuStyle(menuStyle)) {
            let validStyles = VALID_MENU_STYLE.join(', ');
            let errString = 'Not a valid menu style! Must be one of ' + validStyles;
            throw new Error(errString);
        }

        toolPanel.menuStyle = menuStyle;
        toolPanel.renderMenu();

        return toolPanel;
    };

    toolPanel.restyleMenu = function () {

        /**
         * @param {elementClass} CSS class string
         * @returns {string}sanitized classname with only the base class.
         */
        function cleanClasses (elementClass) {

            /* All of the possible modifiers a toolpanel button may have */
            var allLayoutOptions = [
                ' --minimal',
                ' --minimal-mini',
                ' --iframe --horizontal',
                ' --iframe',
                ' --horizontal'
            ];

            /* Strip em off! */
            allLayoutOptions.forEach(currentOption => {
                elementClass = elementClass.replace(currentOption, '');
            });

            return elementClass;
        }

        /**
         * Get the style of a menu item based on the menu's style and orientation
         * @returns item CSS classname modifier
         *
         * TODO: Make this more robust.
         */
        function getItemStyle () {

            if (toolPanel.menuStyle === MENU_STYLE.DESCRIPTIVE) {

                if (toolPanel.orientation === ORIENTATION.VERTICAL) return '';
                if (toolPanel.orientation === ORIENTATION.HORIZONTAL) return '';

            }

            if (toolPanel.menuStyle === MENU_STYLE.MINIMAL) {

                if (toolPanel.orientation === ORIENTATION.HORIZONTAL) return ' --horizontal';
                if (toolPanel.orientation === ORIENTATION.VERTICAL) return ' --minimal';

            }
        }

        /**
         * @param {element} DOM element to configure the tooltip for
         */
        function setToolTip (element) {

            let $element = $(element);

            /* For the horizontal toolMenu, we want to tooltip orientation based on float side */
            if (toolPanel.orientation === ORIENTATION.HORIZONTAL) {
                if (element.horizontalFloat === 'right') $element.tipsy({gravity: 'w'});
                else $element.tipsy({gravity: 'e'});
            }

            /* If its just a minimal toolMenu, tooltip should be on bottom */
            else $element.tipsy();

        }

        var toolPanelElementNames = [
            'toolDiv',
            'toolmenu',
            'toolmenu-button-row',
            'toolmenu-spacer',
            'toolmenu-button',
            'toolmenu-button --mini'
        ];

        /* Iterate through all of the possible elements that may be present */
        toolPanelElementNames.forEach(elementSelector => {

            /* Grab the matching DOM elements if they exist */
            var elements = document.getElementsByClassName(elementSelector);

            /*
             * Clean the classes from the elements and apply the appropriate style
             * Based on the menu's global style
             */
            for (var j = 0; j < elements.length; j++) {
                let element = elements[j];
                element.className = cleanClasses(element.className);
                element.className += getItemStyle();

                let isMiniButton = elementSelector === 'toolmenu-button --mini';
                let isRegularButton = elementSelector === 'toolmenu-button';
                let isClassicStyle = toolPanel.menuStyle === MENU_STYLE.DESCRIPTIVE;

                /* If the element is a minibutton, we need to recalculate the width */
                if (isMiniButton) {

                    element.setAttribute('original-title', element.labelContent);
                    setToolTip(element);

                    if (isClassicStyle) {
                        let numberOfButtons = element.parentNode.children.length || 1;
                        element.style.width = (100 / numberOfButtons) + '%';
                    } else {
                        element.style.width = '';
                    }

                } else if (isRegularButton) {

                    if (isClassicStyle) {
                        /* Remove the tooltip, descriptiveStyle regular buttons have labels. */
                        element.removeAttribute('original-title');
                    } else {
                        /* Regular button but not full descriptive style, we need to add a tooltip */
                        element.setAttribute('original-title', element.labelContent);
                        setToolTip(element);
                    }
                }
            }

        });
    };

    /*
     * Call this everytime `toolPanel.toolMenuItems` is changed.
     * That way, we can change ordering, labels, names etc,
     * and if you call this it will re-render appropriately!
     */
    toolPanel.renderMenu = function () {
        var $toolMenu = $(toolPanel.toolMenuContainer);
        var $buttonList = $toolMenu.find('.toolmenu-list');

        /* Empty the buttonList */
        $buttonList.empty();

        /* Re-append the items */
        $buttonList.append(toolPanel.toolMenuItems);

        /* Make sure its styled properly if there were any changes */
        toolPanel.restyleMenu();
    };

    /**
     * Local method that adds a newly created menuItem to the toolPanel instance's
     * toolMenuItems array. This array is what gets iterated over in the render loop.
     */
    toolPanel.addToToolMenuItems = function (menuItem, menuItemIndex) {
        if (!menuItem) return new Error('no menuItem provided!');

        if (typeof menuItemIndex !== 'number') {
            menuItemIndex = toolPanel.toolMenuItems.length;
        }

        /**
         * Here we're taking the provided menuItem (DOM Elemement),
         * and attaching a `remove` method to it, which when called,
         * removes it from the toolPanelMenu.
         */
        menuItem.remove = function () {
            toolPanel.toolMenuItems.splice(menuItemIndex, 1); // remove the menuItem from the list
            toolPanel.renderMenu(); // Re render without this menuItem in the list!
        };

        /**
          * Add the menuItem to the toolMenuItems list.
          * toolPanel.toolMenuItems is where toolPanel.getMenuItem() queries.
          */
        toolPanel.toolMenuItems.splice(menuItemIndex, 0, menuItem);
    };

    /**
     * @param {array} multiButtonSpecs - List of button specs from which to create the multibutton
     * @param {number} index - The index in the toolPanel.toolMenuItems array to insert the new item.
     *
     * Creates buttons from the buttonSpecs and appends the multibutton as a list item to the toolmenu
     */
    toolPanel.createMenuMultiButton = function (specs, index) {

        var menuItem = document.createElement('li');
        var buttonContainer = document.createElement('div');
        buttonContainer.className = 'toolmenu-button-row';

        specs.forEach(buttonOption => {
            let miniButton = document.createElement('div');
            miniButton.className = 'toolmenu-button --mini';
            miniButton.labelContent = buttonOption.labelContent;

            let icon = document.createElement('i');
            icon.className = buttonOption.iconClass;

            miniButton.appendChild(icon);
            buttonContainer.appendChild(miniButton);
            miniButton.addEventListener('click', buttonOption.handler);
        });

        menuItem.appendChild(buttonContainer);

        // Add the button to the list and attach a remove handler to it!
        toolPanel.addToToolMenuItems(menuItem, index);

        // Render the toolPanel with the new menuItem!
        toolPanel.renderMenu();
    };

    /**
     * @param {array} menuButtonSpecs - List of button specs
     *
     * Creates buttons from the buttonSpecs and appends those to the toolMenu Buttonlist.
     * This is really just a convenience wrapper for toolPanel.createMenuButton()
     */
    toolPanel.createMenuButtons = function (menuButtonSpecs) {
        if (!Array.isArray(menuButtonSpecs) || !menuButtonSpecs.length) return false;

        menuButtonSpecs.forEach(this.createMenuButton);
    };

    /**
     * @param {object} spec - Button properties
     *
     * Creates a button and appends it to the toolMenu
     */
    toolPanel.createMenuButton = function (spec) {

        if (!spec) spec = {};
        if (!spec.eventName) spec.eventName = 'click';
        if (!spec.handler) spec.handler = function () {};

        var menuItem = document.createElement('li');

        var isFloatRight = spec.horizontalFloat === 'right';
        menuItem.className = isFloatRight ? '--right' : '--left';

        var linkItem = document.createElement('a');

        var buttonContainer = document.createElement('div');
        buttonContainer.className = 'toolmenu-button-row ' + spec.buttonClass;

        var buttonInner = document.createElement('div');
        buttonInner.className = 'toolmenu-button';

        /* Attach the labelContent and Float Direction to the element so we can grab it later */
        buttonInner.labelContent = spec.labelContent;
        buttonInner.horizontalFloat = spec.horizontalFloat;

        var iconItem = document.createElement('i');
        var labelItem = document.createElement('p');

        iconItem.className = spec.iconClass;
        labelItem.textContent = spec.labelContent;

        menuItem.appendChild(linkItem);
        linkItem.appendChild(buttonContainer);
        buttonContainer.appendChild(buttonInner);

        buttonInner.appendChild(iconItem);
        buttonInner.appendChild(labelItem);

        linkItem.addEventListener(spec.eventName, spec.handler);

        // Add the button to the list and attach a remove handler to it!
        toolPanel.addToToolMenuItems(menuItem, spec.index);

        // Render the toolPanel with the new menuItem!
        toolPanel.renderMenu();

    };

    /**
     * @param {number} index - the index of toolPanel.toolMenuItems  to inset the spacer into
     *
     * Creates a spacer and appends it to the toolMenu
     */
    toolPanel.createMenuSpacer = function (index) {

        var menuItem = document.createElement('li');
        var linkItem = document.createElement('a');

        var buttonContainer = document.createElement('div');
        buttonContainer.className = 'toolmenu-button-row';

        var buttonInner = document.createElement('div');
        buttonInner.className = 'toolmenu-spacer';

        menuItem.appendChild(linkItem);
        linkItem.appendChild(buttonContainer);
        buttonContainer.appendChild(buttonInner);

        // Add the button to the list and attach a remove handler to it!
        toolPanel.addToToolMenuItems(menuItem, index);

        // Render the toolPanel with the new spacer menuItem!
        toolPanel.renderMenu();
    };

    /**
     * @returns {array} Get the default panel specs with handlers attached. This spec list
     * can then be passed to a createMenuButtons to create the buttons.
     */
    toolPanel.getPanelButtonSpecs = function () {

        // Takes in an incomplete spec and returns a handler function for that buttonSpec
        function createHandler (spec) {

            return function handler () {

                var name = 'js-' + spec.name + '-box';
                var coordinateSystem = toolPanel.isPolar(gd) ? 'polar' : 'cartesian';
                var panel = $('.' + name + '-panel.' + coordinateSystem);

                /* Go and get the content-generating function for the type of editbox we're trying to open */
                var func = toolPanel[coordinateSystem][spec.name + 'Box'];

                /* Not found? Bail and notify that type of editbox is not available */
                if (!func) {
                    return toolPanel.notifier('This feature is currently not supported. Coming soon!', 3000);
                }

                /* Special handling for axes editbox + geo plotType */
                else if (spec.name==='axes' && toolPanel.isGeo(gd)) {
                    toolPanel.geo.axesBox(gd);
                }

                /* No panel open? Let's go for it */
                else if (!panel.length) {
                    func.call(toolPanel, coordinateSystem==='polar' ? name : undefined);
                }

                /* Toggle the slideout */
                toolPanel.toggle(spec.name);

                return false;
            };
        }

        // These are just missing handlers
        var popoverButtonSpecs = DEFAULT_MENU_ITEMS;

        // Assign the generated event handler to the buttonSpec
        popoverButtonSpecs.forEach(spec => spec.handler = createHandler(spec));

        return popoverButtonSpecs;
    };

    toolPanel.getMenuItem = function (index) {
        let menuItem = toolPanel.toolMenuItems[index];
        if (!menuItem) return new Error('no button at index: ' + index);
        return menuItem;
    };


    /**
     * @param {nextPanelName} the name of the panel to open up
     *
     * This will add active classes to the panel to be opened,
     * as well as manipulate position and height/width to make it properly
     * display given the toolPanel's current slideoutDirection value.
     */
    toolPanel.openSlideout = function (nextPanelName) {
        let activeClass = ToolPanelConstants.SLIDEOUT_IS_ACTIVE;
        let menuWidth = $('.toolmenu').width();
        let slideoutWidth = $('.slideout').width();
        let slideoutHeight = $('.slideout').height();

        /* It's not open, there is no active panel, let's open it up! */
        $(toolPanel.slideoutContainer).addClass(activeClass);

        /* Add active class to the newly opened panel button */
        let name = 'js-' + nextPanelName + '-box';
        $(toolPanel.toolMenuContainer)
            .find('.' + name)
            .find('.toolmenu-button')
            .addClass('--is-active');

        /*
         * Here we're going to open the slideout, but the method that it does that
         * is dependent on the slideoutDirection. Based on that, we apply some positioning
         * and width/height changes
         */
        switch (toolPanel.slideoutDirection) {
            case SLIDEOUT_DIRECTION.RIGHT:
                /*
                 * If the slideout directon is right, we want to set the left anchor to
                 * the width of the menu
                 */
                $(toolPanel.slideoutContainer).css('left', menuWidth);
                $(toolPanel.slideoutContainer).css('top', 30);
                break;

            case SLIDEOUT_DIRECTION.LEFT:
                /*
                 * But if the direction is left, we want to adjust the left positioning
                 * so that it anchors itself the correct distance to the left of the menu
                 */
                $(toolPanel.slideoutContainer).css('left', 0 - slideoutWidth);
                break;

            case SLIDEOUT_DIRECTION.TOP:
                $(toolPanel.slideoutContainer).css('top', 0 - slideoutHeight);
                break;

            case SLIDEOUT_DIRECTION.BOTTOM:
                $(toolPanel.slideoutContainer).css('top', 40);
                break;
        }

        /* Set the width to be equal to the inner contents of the slideout */
        $(toolPanel.slideoutContainer).css('width', slideoutWidth);
        $(toolPanel.slideoutContainer).css('height', slideoutHeight);

        setTimeout(() => {
            $(toolPanel.slideoutContainer).css('overflow-x', 'visible');
        }, 300);

        /* Assign the current panel name */
        toolPanel.activePanelName = nextPanelName;
    };

    /**
     * Will close the active slideout, remove active class from the button,
     * and properly set the positioning and width/height to hide it, given
     * its current slideoutDirection value.
     */
    toolPanel.closeSlideout = function () {

        let activeClass = ToolPanelConstants.SLIDEOUT_IS_ACTIVE;

        /* We've clicked on the currently active panel, let's close it up */
        $('.toolmenu-button.--is-active').removeClass('--is-active');
        $(toolPanel.slideoutContainer).removeClass(activeClass);

        /*
         * Here we manipulate the position and width of the slideout to close it
         * depending on the current slideoutDirection.
         */
        switch (toolPanel.slideoutDirection) {

            case SLIDEOUT_DIRECTION.LEFT:
                $(toolPanel.slideoutContainer).css('width', 0);
                $(toolPanel.slideoutContainer).css('left', 0);
                break;

            case SLIDEOUT_DIRECTION.RIGHT:
                $(toolPanel.slideoutContainer).css('width', 0);
                break;

            /* If its going top or bottom, force height 0, closing the slideout */
            case SLIDEOUT_DIRECTION.TOP:
                $(toolPanel.slideoutContainer).css('height', '');
                $(toolPanel.slideoutContainer).css('top', '');
                break;

            case SLIDEOUT_DIRECTION.BOTTOM:
                $(toolPanel.slideoutContainer).css('height', '');
                break;
        }

        toolPanel.activePanelName = null;

        $(toolPanel.slideoutContainer).css('overflow-x', '');
    };

    /**
     * @param {direction} String of the desired direction to change the slideout Direction to.
     * @returns {toolPanel} the toolPanel instance so you can chain calls together
     *
     * Sets the slideoutDirection of the slideoutContainer. one of 'left' or 'right'
     */
    toolPanel.setSlideoutDirection = function (direction) {

        if (!isValidSlideoutDirection(direction)) {
            let validDirections = VALID_SLIDEOUT_DIRECTIONS.join(', ');
            let errString = 'Invalid slideoutDirection, must be one of: ' + validDirections;
            throw new Error(errString);
        }

        /* Set the slideoutDirection and set the class on the slideout-container */
        toolPanel.slideoutDirection = direction;
        toolPanel.slideoutContainer.className = 'slideout-container --slide-' + toolPanel.slideoutDirection;

        /* Reset any positioning that may be different than the current case */
        switch (toolPanel.slideoutDirection) {
            case SLIDEOUT_DIRECTION.LEFT:
                $(toolPanel.slideoutContainer).css('top', 30);
                $(toolPanel.slideoutContainer).css('left', '');
                break;

            case SLIDEOUT_DIRECTION.RIGHT:
                $(toolPanel.slideoutContainer).css('top', 30);
                break;

            case SLIDEOUT_DIRECTION.TOP:
            case SLIDEOUT_DIRECTION.BOTTOM:
                $(toolPanel.slideoutContainer).css('left', 0);
                break;
        }

        /* Close the slideout if its open, we dont want to display with incorrect positining */
        toolPanel.closeSlideout();

        return toolPanel;
    };

    /**
     * @param {nextPanelName} the name of the panel to be opened
     *
     * This method will toggle the active button classes and visibility
     * of the slideoutContainer. If it is currently closed, it will open it.
     * If it is open, and the nextPanel is the same as the current one, it will
     * close the slideoutContainer.
     */
    toolPanel.toggle = function (nextPanelName) {

        let oldPanelName = toolPanel.activePanelName;
        let hasChanged = (nextPanelName !== oldPanelName);

        let activeClass = ToolPanelConstants.SLIDEOUT_IS_ACTIVE;
        let isOpen = $(toolPanel.slideoutContainer).hasClass(activeClass);

        if (isOpen) {

            if (hasChanged) {
                /* Its already opened, but we want a new panel */
                toolPanel.closeSlideout();
                toolPanel.openSlideout(nextPanelName);

            } else {
                /* Its already opened, and we're toggling it closed */
                toolPanel.closeSlideout();
            }

        } else {
            /* Nothing opened, let's open it up! */
            toolPanel.openSlideout(nextPanelName);
        }

    };

    toolPanel.undo = function () {
        queue.undo(gd);
        toolPanel.updatePopover();
    };

    toolPanel.redo = function () {
        queue.redo(gd);
        toolPanel.updatePopover();
    };

    toolPanel.updatePopover = function () {
        // do we need to update a popover?
        var po = $('.slideout');
        if (po.length) po[0].redraw(po[0].selectedObj);
        return false;
    };

    toolPanel.remove = function () {

        // Grab the related toolMenu bar and destroy it
        var toolMenu = $(toolPanel.toolMenuContainer);
        toolMenu.remove();

        // Remove any popovers
        killPopovers();

    };

    toolPanel.panel = function(_name, _coordinateSystem){

        // Popover template
        var popoverSelector = '.' + _name + '-panel.' + _coordinateSystem;
        if(!$(popoverSelector).empty()) $(popoverSelector).remove();
        var templateSelector = '#' + _coordinateSystem + '-' + _name.slice('js-'.length) + '-template';
        var popoverTemplate = $(templateSelector).text();

        $('.slideout').remove();

        /* Create the slideout Container DOM element */
        var slideout = document.createElement('div');
        slideout.className = 'slideout editbox ';
        $(toolPanel.slideoutContainer).append(popoverTemplate);

        var $slideout = $(popoverSelector);

        $slideout.find('.arrow').hide();
        $slideout.find('button.close').on('click', function(){
            killPopovers();
            return false;
        });

        toolPanel.initMinimalTabs($slideout);
        return $slideout;
    };

    toolPanel.initMinimalTabs = function (container) {
        var $container = $(container),
            $tabMenu = $container.find('.js-minimal-tabs-menu');

        $container.find('.js-minimal-tabs-content').not(':first-child').hide();
        $tabMenu.find('li:first-child').addClass('current');

        var $fitRunBtn = $container.find('.js-run-fit-btn');

        $tabMenu.find('a').on('click', function() {
            $(this).parent().addClass('current');
            $(this).parent().siblings().removeClass('current');

            var tab = $(this).attr('href'),
                $tab = $container.find(tab),
                $otherTabs = $('.js-minimal-tabs-content').not(tab);

            $otherTabs.find('.js-has-error-tooltip').each(function() {
                $(this).tipsy('hide');
            });

            toolPanel.removeOverlays();

            $otherTabs.hide();
            $fitRunBtn.tipsy('hide');

            $tab.show();
            $tab.find('.js-has-error-tooltip').each(function() {
                $(this).tipsy('show');
            });
            $fitRunBtn.tipsy('show');

            return false;
        });
    };

    toolPanel.autoBinding = function(_selector, _coordinateSystem){
        var widgets = toolPanel[_coordinateSystem].widgets;
        $(_selector).find('[data-widget]').each(function(i, v){
            var widgetName = Utils.toCamelCase($(v).data().widget);
            var formWidget = Polarform[widgetName];
            var name = Utils.jsHook(this);
            if(formWidget && name){
                var newWidget = formWidget({
                        selector: this
                    })
                    .on('formChange', function(){
                        setTimeout(function(){
                            gd.framework.setUndoPoint();
                        }, 0);
                    });
                var shortName = Utils.toCamelCase(name.slice('js-'.length));
                widgets[shortName] = newWidget;
            }
        });
        return widgets;
    };

    toolPanel.removeOverlays = function() {
        var $slideouts = $('.slideout');
        var overlay = $slideouts.find('.js-minimal-tabs-container')
            .find('.toolpanel-overlay').remove();

        // showing an overlay will hide the current tab. Reshow the tab.
        var $tabMenu = $slideouts.find('.js-minimal-tabs-menu');
        var tab = $tabMenu.find('li.current a').attr('href');
        var $tab = $slideouts.find(tab);
        $tab.show();
    };

    toolPanel.showOverlay = function(overlay) {
        var $slideouts = $('.slideout');

        // Hide the current tab and show the overlay on top
        var $tabMenu = $slideouts.find('.js-minimal-tabs-menu');
        var tab = $tabMenu.find('li.current a').attr('href');
        var $tab = $slideouts.find(tab);
        $tab.hide();

        var $tabContainer = $('.js-minimal-tabs-container');
        // show an overlay instead
        $tabContainer.prepend(overlay);
    };

    // -----------------------------------------------------
    // Popovers and popover controls
    // -----------------------------------------------------

    // renderSlideoutPanel: make a popover in div gd at overall pos ({x,y} or {left,top,width,height}
    // as from getBoundingClientRect, or a DOM element, will call getBoundingClientRect on it)
    // uses cls for styling the popover and calls contentfn(($)popover, contentarg) to fill it
    function renderSlideoutPanel(gd,options) {
        var cls = options.cls;
        var contentfn = options.content;
        var applyfn = options.apply || Plotly.relayout;
        var contentarg = options.arg;
        var tabs = options.tabs || [];

        // if this popover is already showing, quit so it will hide
        if ($('.slideout.'+cls).length) return;

        $('.slideout').remove();

        /*
         * Convert the className to the popoverName
         * i.e., from tracesbox to Traces
         */
        var cls1 = cls.split(' ')[0];
        var popoverName = cls1.slice(0,1).toUpperCase() +
            cls1.split('box')[0].slice(1);

        // if popoverName is traces apply the Traces label
        if (popoverName.toLowerCase() === 'traces') {
            popoverName = TRACES_LABEL;
        }

        /* Create the slideout Container DOM element */
        var slideout = document.createElement('div');
        slideout.className = 'slideout editbox ' + cls;
        toolPanel.slideoutContainer.appendChild(slideout);

        /* Create the slideout content DOM structure */
        var slideoutContent = document.createElement('div');
        slideoutContent.className = 'slideout-content';

        var slideoutHeader = document.createElement('div');
        slideoutHeader.className = 'slideout-header';

        var panelNameDiv = document.createElement('div');
        panelNameDiv.className = 'panel-name';
        panelNameDiv.innerHTML = popoverName;

        var traceDropdown = document.createElement('div');
        traceDropdown.className = 'trace-dropdown';

        var tabMenu = document.createElement('ul');
        tabMenu.className = 'js-minimal-tabs-menu minimal-tabs';

        var tabContainer = document.createElement('div');
        tabContainer.className = 'js-minimal-tabs-container';

        slideoutHeader.appendChild(panelNameDiv);
        slideoutHeader.appendChild(traceDropdown);
        slideoutHeader.appendChild(tabMenu);

        slideoutContent.appendChild(slideoutHeader);
        slideoutContent.appendChild(tabContainer);

        var $slideout = $(slideout);
        $slideout.append(slideoutContent);

        /* For each tab spec, let's create the DOM elements for the tabMenu and tabContainer (content) */
        tabs.forEach((tabName, i) => {
            var tabId = cls1+'-'+i;

            var tabContent = document.createElement('div');
            tabContent.id = tabId;
            tabContent.className = 'js-minimal-tabs-content minimal-tabs__content-panel popover-items';
            tabContainer.appendChild(tabContent);

            var tabMenuItem = document.createElement('li');
            var tabMenuItemLink = document.createElement('a');
            tabMenuItemLink.href = '#' + tabId;
            tabMenuItemLink.className = 'link--tool';
            tabMenuItemLink.innerHTML = tabName;

            tabMenuItem.appendChild(tabMenuItemLink);
            tabMenu.appendChild(tabMenuItem);
        });

        if (tabs.length) {
            toolPanel.initMinimalTabs($slideout[0]);
        } else {

            let tabContent = document.createElement('div');
            tabContent.id = cls1 + '-0';
            tabContent.className = 'js-minimal-tabs-content popover-items';

            tabContainer.appendChild(tabContent);
        }

        $slideout[0].empty = function() {

            /* Kill spectrum elements */
            if ($('.sp-container').length) {
                $slideout.find('.pickcolor').spectrum('destroy');
            }

            /* clear popover-items */
            $(tabContainer).find('.popover-items')
                .html('')
                .toggleClass('empty-item', true);
        };

        $slideout[0].showTabs = function() {
            // show only tabs with contents
            var $firstTab;

            $(tabMenu).find('a').each(function(){
                var $thisHead = $(this),
                    $thisTab = $slideout.find($thisHead.attr('href')),
                    hasContents = !$thisTab.hasClass('empty-item');
                $thisHead.parent().css('display', hasContents ? '' : 'none');
                if($firstTab===undefined && hasContents) $firstTab = $thisHead;
            });

            if($(tabContainer).find('.current').css('display')==='none') $firstTab.click();
        };

        // store the graph and redraw and apply functions for use after changing values
        $slideout[0].gd = gd;
        $slideout[0].redraw = function(arg){

            // remove any overlays
            toolPanel.removeOverlays();

            contentfn($slideout,arg);
            $slideout[0].showTabs();
        };
        // after a change, applyChange gets called with arg {astr, val}
        // astr is an attribute string per restyle or relayout, val is its new value
        $slideout[0].applyfn = applyfn;

        $slideout[0].applyChange = function(o) {

            var selectedObj = $slideout[0].selectedObj,
                astrxyz = o.astr.replace(/_(x|y|z)/, '_?');

            /*
             * Here we build out a payload object of "what changed"
             * We will emit this object once Plotly has applied the change
             * to the gd.
             */
            var changeEventPayload = {
                changeType: applyfn === Plotly.restyle ? 'restyle' : 'relayout',
                attributeString: o.astr,
                value: o.val
            };

            Plotly.Lib.syncOrAsync([

                function() {
                    /* If it is a restyle call, we'll have some selected traces */
                    if (selectedObj) {
                        changeEventPayload.selectedTraces = selectedObj;
                    }

                    /* Apply the change */
                    return applyfn(
                        $slideout[0].gd,
                        o.astr,
                        o.val,
                        selectedObj < 0 ? null : selectedObj
                    );
                },

                function() {

                    /* Emit that change out after gd is updated */
                    toolPanel.emitter.emit('change', changeEventPayload);

                    $slideout[0].redraw(selectedObj);
                }
            ]);
        };

        // create the contents
        $slideout[0].redraw(contentarg);
        $slideout.find('.arrow').remove();

        $('.slideout .dropdown-toggle').each(function(i,v) {
            var minWidth = $(v).outerWidth();
            $(v).next('.dropdown-menu').attr('style', function(i, s) {
                return (s||'')+' min-width: '+minWidth+'px !important;';
            });
        });
    }


    // for a row to contain multiple selectors
    function selectorRow(s, title) {
        return $('<div class="editboxselector selector-row empty-item">'+
                ((title) ? ('<div class="editboxtitle">'+title+'</div>') : '')+
            '</div>').appendTo(s).get(0);
    }

    // make a dropdown select for setting a style attribute
    // s: container
    // cls: class for this attribute
    // d0: the selected element
    // d: the modified styles
    // TODO: user input option
    function styleBoxDrop(s,cls,title,d0,d,clickfn,data){
        var activeVal = cls==='trace' ?
            '' : Plotly.Lib.nestedProperty(d0[0].trace, cls).get();

        // do not draw this item at all if there's no value
        if(notSettable(activeVal)) return;

        // TODO: noset is totally opaque... what does this do?
        var noset=false;
        if (!d) {
            d=d0;
            noset=true;
        }

        var dn = $(toolPanel.dropdown('select-'+cls, title)).appendTo(s).get(0),
            dd = Plotly.d3.select(dn),
            popover = $(s).parents('.slideout'),
            thisVal = function(i){
                return Plotly.Lib.nestedProperty(d[i][0].trace, cls).get();
            };

        function makeOneList(container, d, i0) {
            var opts=container.select('ul').selectAll('li')
                .data(d)
              .enter().append('li')
                .append('a')
                    .on('click',function(dClicked,i) {
                        var cfn = clickfn || popover[0].applyChange,
                            clickArg = {
                                popover:popover,
                                d:dClicked,
                                i:i
                            };
                        if(data) clickArg.data = data[i];

                        if(cls!=='trace') {
                            clickArg.astr = cls;
                            clickArg.val = thisVal(i + (i0||0));
                        }

                        cfn(clickArg);
                    });

            opts.call(optionStyle, popover);
        }
        var drawGrid = cls==='marker.symbol';

        if(drawGrid) {
            // make a grid dropdown for markers
            dd.select('ul').classed('dropdown-menu--grid', true);

            var colLength = 9,
                grid = [],
                colnum = 0;

            d.forEach(function(di) {
                if(!grid[colnum]) grid.push([]);
                grid[colnum].push(di);
                if(grid[colnum].length>=colLength) colnum++;
            });
            var cols = dd.select('ul').selectAll('li')
                .data(grid)
              .enter().append('li');
            cols.append('ul');
            cols.each(function(colData, i){
                makeOneList(Plotly.d3.select(this), colData, colLength*i);
            });

            // minimaler than all the other dropdown elements
            cols.selectAll('svg')
                    .attr('width',25)
                .selectAll('.scatterpts')
                    .attr('transform', 'translate(12,0)');
        }
        else makeOneList(dd,d);

        // set default value
        if (cls!=='trace' && activeVal==='various') {
            $(dn).find('.btn-group .selected-val').html('Various');
        }
        else if(!noset) {
            for(var i=0; i<d.length && thisVal(i)!==activeVal; i++);

            // TODO: add custom entry and use it in this case
            i = i % d.length;

            $(dn).find('.btn-group .selected-val')
                .html($(dn).find(drawGrid ?  'li ul li' : 'li')[i].innerHTML);
        }
        $(dn).find('.btn-group .selected-val').css({padding: '0px'});

        if(cls.indexOf('dash')!==-1) {
            var svg = $(dn).find('svg')
                .attr('width', '70');
            svg.find('path.js-line')
                .attr('d', 'M5,0h60');
            svg.find('path.js-fill')
                .attr('d', 'M5,0h60v6h-60z');
        }

        $(dn).parents('.empty-item').toggleClass('empty-item', false);
        return dn;
    }

    // same for layout dropdowns, which are simpler
    function layoutBoxDrop(s, astr, title, val, opts, clickfn){
        // do not draw this item at all if there's no value
        if(notSettable(val)) return;

        var dn = $(toolPanel.dropdown('select-layout', title)).appendTo(s).get(0),
            dd = Plotly.d3.select(dn),
            popover = $(s).parents('.slideout');
        dn.attr = astr;
        dd.select('ul').selectAll('li')
            .data(opts)
          .enter().append('li')
            .append('a')
                .html(function(d){ return d.name + '\u00A0'; })
                .on('click', function(d, i) {
                    var cfn = clickfn || popover[0].applyChange;
                    cfn({popover: popover, astr: astr, val: d.val, d: d, i: i});
                });
        // set default value
        for(var i=0; i<opts.length && opts[i].val!==val; i++);

        // TODO: add custom entry and use it in this case
        i = i % opts.length;

        $(dd.node()).find('.btn-group .selected-val').html($(dd.node()).find('li')[i].innerHTML);
        $(dd.node()).parents('.empty-item').toggleClass('empty-item', false);
        return dn;
    }

    function fontPicker(s, prop, title, clickfn){
        var astr = prop.astr,
            val = prop.get();

        // do not draw this item at all if there's no value
        if(notSettable(val)) return;

        var fontlist = [
            '',
            'Arial, sans-serif',
            'Balto, sans-serif',
            'Courier New, monospace',
            'Droid Sans, sans-serif', // stand in for Geneva
            'Droid Serif, serif', // stand in for Palitino Linotype
            'Droid Sans Mono, sans-serif', // Another Monofont cause they're cool
            'Gravitas One, cursive', // stand in for Copperplate Gothic
            'Liberation Sans, sans-serif', // alias of Arial
            'Old Standard TT, serif', // Just a nice old font
            'Open Sans, sans-serif', // at Blogger Ben's request
            'Overpass, sans-serif',  // https://github.com/RedHatBrand/overpass
            'PT Sans Narrow, sans-serif', // stand in for Arial narrow
            'Raleway, sans-serif', // stand in for Avant Garde
            'Roboto, sans-serif', // stand in for Akzidenz-Grotesk
            'Times New Roman, Times, serif'
        ],
            sizelist = [0, 8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 28, 32, 36],
            dn = $(toolPanel.dropdown('font-family',title)).appendTo(s).get(0),
            dd = Plotly.d3.select(dn),
            popover = $(s).parents('.slideout'),
            cfn = clickfn || popover[0].applyChange;

        dd.select('.btn-group').style('margin-right', '5px');

        // in case val is null or undefined or something...
        val = val || {family: '', size: 0, color: ''};

        // font family selector
        var familyText = function(d){
            if(Array.isArray(d)) return '<array>';
            return (d||'<auto>').replace(/^"/, '').replace(/[",].*$/, '');
        };

        var setFamily = function(family){
            dd.select('.btn-group .selected-val')
                .text(familyText(family))
                .style({
                    'font-family': family,
                    width: '120px'
                });
        };
        dn.attr = astr;
        dd.select('ul').selectAll('li')
            .data(fontlist)
          .enter().append('li')
            .append('a')
                .attr('href', '#')
                .style('font-family',function(d){ return d; })
                .text(familyText)
                .on('click', function(d,i) {
                    setFamily(d);
                    cfn({popover: popover, astr: astr+'.family', val: d, d: d, i: i});
                    Plotly.d3.event.preventDefault();
                });
        setFamily(val.family);

        // font size selector
        var sn = $(toolPanel.dropdown('font-size', '')).appendTo(dn).get(0),
            sd = Plotly.d3.select(sn);
        var sizeText = function(d){
            if(Array.isArray(d)) return '<array>';
            return (d && $.isNumeric(d)) ?
                d.toFixed(2).replace(/0*$/,'').replace(/[.]$/,'') :
                'auto';
        };
        var setSize = function(size){
            sd.select('.btn-group .selected-val')
                .text(sizeText(size))
                .style('min-width', '35px');
        };
        sn.attr = astr;
        sd.select('ul').selectAll('li')
            .data(sizelist)
          .enter().append('li')
            .on('click',function(d,i) {
                setSize(d);
                cfn({popover: popover, astr:astr+'.size', val:d, d:d, i:i});
            })
            .append('a')
                // ugh, I'm sorry... but I need this !important to override some !important's
                // in _theme.scss that override jqueryUI...
                .style('font-size', function(d){ return (d||14)+'px'; }, 'important')
                .text(sizeText);
        setSize(val.size);

        // font color selector
        pickColor(dn,
            {
                astr: astr+'.color',
                get: function(){ return val.color; }
            },
            '',title+' Color');

        $(dn).parents('.empty-item').toggleClass('empty-item', false);
        return dn;
    }

    // make a slider control with text entry.
    // s - DOM object to append it to
    // astr - attribute to edit
    // title - name of the slider
    // bounds - numeric bounds of the slider
    // digits - number of digits after the decimal to round to (negative allowed)
    // extraval - replace the leftmost slider stop with a 'default' value given by extraval
    // useextraval - the actual property value is extraval, rather than bounds[0]
    function slider(s, prop, title, bounds, digits, extraval, useextraval){
        var astr = prop.astr,
            val = prop.get(),
            stepSize = Math.pow(10, -digits);

        // do not draw this item at all if there's no value
        if(notSettable(val)) return;

        function stepToValue(step){
            if (step==='various' || step==='?') return '?';

            var fmtval = step/Math.pow(10,digits);

            if ((!$.isNumeric(step) || fmtval===bounds[0]) && extraval) return extraval;
            return fmtval;
        }

        function sliderStep(v){
            if(extraval && v===extraval) v = bounds[0];
            else if(!$.isNumeric(v)) v = (bounds[0]+bounds[1])/2;
            return v/stepSize;
        }

        function setSliderValue(v) {
            if($.isNumeric(v)) {
                // round to one extra digit in case of external inputs
                // but avoid long strings of 9's or 0's
                v = Number(v).toFixed(Math.max(digits+1,0));
                if(digits>=0) v = v.replace(/0*$/,'').replace(/[\.]$/,'');
            }
            $slider.children('.slider-val').val(v);
            $slider.children('.slider').slider('value', sliderStep(v));
        }

        function applySlider(v) {
            var valset = input.convertfrominput(v);
            if (valset===bounds[0] && useextraval) valset = extraval;

            setSliderValue(v);
            popover[0].applyChange({astr:astr, val:valset});
        }

        var input = inputBetween(bounds[0],bounds[1],extraval),
            $slider = $(
                '<div class="editboxselector pickslider">'+
                    '<div class="editboxtitle"></div>'+
                    '<input type="text" class="input slider-val"/>'+
                    '<button class="btn btn--plain slider-dn"><i class="icon-minus"></i></button>' +
                    '<button class="btn btn--plain slider-up"><i class="icon-plus"></i></button>' +
                    '<div class="slider"></div>'+
                '</div>'
            ).appendTo(s),
            popover = $slider.parents('.slideout');

        var $title = $slider.children('.editboxtitle');
        if(title) $title.html(title);
        else $title.hide();

        function increment(delta) {
            return function () {
                var oldval = $slider.children('.slider-val').val();

                if(extraval && oldval===extraval) return;
                // give a little buffer around bounds in case of rounding errors
                if(delta>0 && oldval>bounds[1]-stepSize/10) return;
                if(delta<0 && oldval<bounds[0]+stepSize*(extraval ? 1.1 : 0.1)) return;

                applySlider(parseFloat(oldval) + delta);
            };
        }
        $slider.children('.slider-up').click(increment(stepSize));
        $slider.children('.slider-dn').click(increment(-stepSize));

        $slider.children('.slider').slider({
            min: sliderStep(bounds[0]),
            max: sliderStep(bounds[1]),
            value: sliderStep(val),
            slide: function(e, ui){ setSliderValue(stepToValue(ui.value)); },
            stop: function(e, ui){ applySlider(stepToValue(ui.value)); }
        });
        $slider.children('.slider-val').blur(function() {
            var valnew = this.value;

            // do nothing if the value is unchanged
            if (valnew===String(val)) return;

            // clear potential error border
            $(this).css('border', '');

            // revert if value was cleared
            if (valnew==='') this.value = val;
            // take the new val if it passes validation test
            else if (input.test(valnew)) applySlider(valnew);
            else {
                $(this).css('border', '1px solid red');
                // TODO: tooltip broke...
                // $(this).tooltip({placement: 'right', title:input.errortext})
                //     .tooltip('show');
            }
        });
        setSliderValue(val);

        $slider.parents('.empty-item').toggleClass('empty-item', false);
        return $slider[0];
    }

    // Slider for angles in [-180,180] by increments of 10
    function angleSlider(s, prop, title) {
        return slider(s, prop, title, [-190,180], -1, 'auto', true);
    }

    // text input box for numbers
    function textInput(s,prop,title,input,cls,inputcls=''){
        var val = prop.get();
        // do not draw this item at all if there's no value
        if(notSettable(val)) return;

        var popover = $(s).parents('.slideout'),
            row = $('<div class="editboxselector select-layout ' +
                (cls||'').replace(/[\.]/g,'-') + '">' + ((title) ?
                    ('<div class="editboxtitle">'+title+'</div>') : '') +
                `<input class="input inputtext ${inputcls}" type="text" /></div>`)
                .appendTo(s),
            ib = row.find('input');
        if (input) {
            var valin = val==='various' ? '?' :
                (input.converttoinput ? input.converttoinput(val) : val);
            ib.val(valin).blur(input,function() {
                var val = this.value;

                // do nothing if the value is unchanged
                if (val===valin) return;

                // clear potential error border
                $(this).css('border', '');

                // revert if value was cleared
                if (val==='' && !input.blankOk) this.value = valin;
                // take the new val if it passes validation test
                else if (!input.test || input.test(val)) {
                    popover[0].applyChange({
                        astr: prop.astr,
                        val: input.convertfrominput ?
                            input.convertfrominput(val) : val
                    });
                }
                else {
                    $(this).css({border: '1px solid red'})
                        .tooltip({
                            placement: 'right',
                            title: input.errortext
                        })
                        .tooltip('show');
                }
            });
        }
        // no input var means disable this input
        else ib.attr('disabled', true);

        row.parents('.empty-item').toggleClass('empty-item', false);
        return row[0];
    }

    // text input box for numbers
    function twinTextInput(s,prop,title,input,cls,inputcls=''){
        var val = prop.get();

        // do not draw this item at all if there's no value
        if(notSettable(val, true)) return;

        s = selectorRow(s, title);

        var popover = $(s).parents('.slideout'),
            row1 = $('<div class="editboxselector select-layout ' +
                (cls||'').replace(/[\.]/g,'-') + '">' +
                `<input class="input inputtext ${inputcls}" type="text" /></div>`)
            .appendTo(s),
            row2 = $('<div class="editboxselector select-layout ' +
                     (cls||'').replace(/[\.]/g,'-') + '">' +
                `<input class="input inputtext ${inputcls}" type="text" /></div>`)
                .appendTo(s),
            ib1 = row1.find('input'),
            ib2 = row2.find('input');

        if (input) {
            var val1 = Array.isArray(val) ? val[0] : val;
            var val1in = val1==='various' ? '?' :
                (input.converttoinput ? input.converttoinput(val1) : val1);
            var val2 = Array.isArray(val) ? val[1] : undefined;
            var val2in = val2==='various' ? '?' :
                (input.converttoinput ? input.converttoinput(val2) : val2);

            ib1.val(val1in).blur(input,function() {
                var val = this.value;

                // do nothing if the value is unchanged
                if (val===val1in) return;

                // clear potential error border
                $(this).css('border', '');

                // revert if value was cleared
                if (val==='' && !input.blankOk) this.value = val1in;
                // take the new val if it passes validation test
                else if (!input.test || input.test(val)) {
                    val = input.convertfrominput ?
                        input.convertfrominput(val) : val;
                    var twinval = [[val, val2]];

                    popover[0].applyChange({
                        astr: prop.astr,
                        val: twinval
                    });
                }
                else {
                    $(this).css({border: '1px solid red'})
                        .tooltip({
                            placement: 'right',
                            title: input.errortext
                        })
                        .tooltip('show');
                }
            });

            ib2.val(val2in).blur(input,function() {
                var val = this.value;

                // do nothing if the value is unchanged
                if (val===val2in) return;

                // clear potential error border
                $(this).css('border', '');

                // revert if value was cleared
                if (val==='' && !input.blankOk) this.value = val2in;
                // take the new val if it passes validation test
                else if (!input.test || input.test(val)) {
                    val = input.convertfrominput ?
                        input.convertfrominput(val) : val;
                    var twinval = [[val1, val]];

                    popover[0].applyChange({
                        astr: prop.astr,
                        val: twinval
                    });
                }
                else {
                    $(this).css({border: '1px solid red'})
                        .tooltip({
                            placement: 'right',
                            title: input.errortext
                        })
                        .tooltip('show');
                }
            });

        }

        // no input var means disable this input
        else {
            ib1.attr('disabled', true);
            ib2.attr('disabled', true);
        }

        row1.parents('.empty-item').toggleClass('empty-item', false);
        return s;
    }


    // validator for RGB array
    function rgbValidator(){
        return {
            test: function(v){ return typeof(JSON.parse(v))==='object'; },
            errortext: 'This is doesn\'t look like a valid array',
            converttoinput: function(v){ return (v===null) ? '' : JSON.stringify(v); },
            convertfrominput: function(v){ return [JSON.parse(v)]; }
        };
    }

    // validator for bounded numeric range
    // optional: special text to replace vmin (ie 'auto')
    function inputBetween(vmin, vmax, extraval){
        return {
            test: function(v) {
                return (v===extraval) || ($.isNumeric(v) && v>=vmin && v<=vmax);
            },
            errortext: 'Must be between ' + String(vmin) + ' and ' + String(vmax),
            converttoinput: function(v){
                if (v===null) return '';
                else if (v===vmin && extraval) return extraval;
                return String(v);
            },
            convertfrominput: function(v){
                if (v===extraval) return vmin;
                return Number(v);
            }
        };
    }

    // for an unrestricted string
    function inputFreeString() {
        return {blankOk: true};
    }

    // validator for axis range inputs
    function inputAxRange(axtype, nolog){
        if (axtype==='date') {
            return {
                test: Plotly.Lib.isDateTime,
                errortext: 'Must be a date-time (eg "2012-12-31 19:33:01.234", may be truncated)'
            };
        }
        // use nolog flag for values that, even if they apply to a log axis, are not stored as logs.
        // this is generally any data attribute, like histogram bins or heatmap pixel sizes
        else if (axtype==='log' && !nolog) {
            return {
                test: function(v) { return (v>0); },
                errortext: 'Must be a positive number',
                converttoinput: function(v){ return (v===null) ? '' : String(Math.pow(10,v)); },
                convertfrominput: function(v){ return Math.log(Number(v)>0 ? Number(v) : 1e-10)/Math.LN10; }
            };
        }
        // TODO: what should we be doing with categories?
        else if (['linear', 'category', 'log', '-'].indexOf(axtype)!==-1){
            return {
                test: $.isNumeric,
                errortext: 'Must be a number',
                converttoinput: function(v){ return (v===null) ? '' : String(v); },
                convertfrominput: function(v){ return Number(v); }
            };
        }
        // disable setting all axes ranges if different types (flag==null)
        else return false;
    }

    function geoIdToNum(geoId) {
        return geoId==='geo' ? '' : ' (' + geoId.slice(3, geoId.length) + ')';
    }


    // -----------------------------------------------------
    // Trace styling popover
    // -----------------------------------------------------

    // starting with trace tracenum:
    // use tracenum=-1 for all traces, defaults to first trace
    toolPanel.cartesian.tracesBox = function(tracenum) {
        if (!tracenum) tracenum = 0;
        // if there is no data, return
        if (!(gd._fullData||[]).length){
            toolPanel.notifier('No data to style. Upload a file to graph.', 3000);

            // TODO: disable item unless data is present, or link to examples from notifier
            return;
        }

        renderSlideoutPanel(gd, {
            cls: 'tracesbox js-traces-box-panel cartesian',
            content: tracesBoxTraces,
            apply: Plotly.restyle,
            arg: tracenum,
            tabs: ['Mode', 'Range/bins', 'Style', 'Text', 'Error bars', 'Color bar',
                   'Color bar ticks', 'Contour', 'Lighting', 'Dimensions']
        });
    };

    function mergeAttr(intoObj, fromObj, k, inData) {
        var intoVal = intoObj[k],
            fromVal = fromObj[k];

        // don't merge private attrs
        if((typeof k === 'string' && k.charAt(0)==='_') ||
                    typeof intoVal === 'function') {
            return;
        }

        // already a mixture of values, can't get any worse
        if(intoVal==='various') return;
        // if the original doesn't have the key it's because that key
        // doesn't do anything there - so use the new value
        // note that if fromObj doesn't have a key in intoObj we will not
        // attempt to merge them at all, so this behavior makes the merge
        // independent of order.
        else if(intoVal===undefined) intoObj[k] = fromVal;
        // colorscales are arrays... need to stringify before comparing
        // (other vals we don't want to stringify, as differences could
        // potentially be real, like 'false' and false)
        else if(k==='colorscale') {
            if(String(intoVal)!==String(fromVal)) intoObj[k] = 'various';
        }
        else if(Array.isArray(intoVal)) {
            // in data, other arrays are data, which we don't care about
            // for styling purposes
            if(inData) return;
            // in layout though, we need to recurse into arrays
            for(var i=0; i<fromVal.length; i++) {
                mergeAttr(intoVal, fromVal, i, inData);
            }
        }
        // recurse into objects
        else if($.isPlainObject(fromVal)) {
            if(!$.isPlainObject(intoVal)) {
                throw new Error('tried to merge object into non-object: ' + k);
            }
            Object.keys(fromVal).forEach(function(k2) {
                mergeAttr(intoVal, fromVal, k2, inData);
            });
        }
        else if($.isPlainObject(intoVal)) {
            throw new Error('tried to merge non-object into object: ' + k);
        }
        // different non-empty values -
        else if(intoVal!==fromVal) intoObj[k] = 'various';
    }

    function tracesBoxTraces(popover,selectedtraces){
        // same traceData as legend plus extra items for 'all traces' and all of each type
        var gd = popover[0].gd,
            i,
            traceData = gd._fullData.map(function(trace) {
                var traceCopy = Plotly.Lib.minExtend(trace);

                // fully copy the dimensions array but partially copy their contents
                if (Array.isArray(traceCopy.dimensions)) {
                    traceCopy.dimensions = trace.dimensions
                        .map(Plotly.Lib.minExtend);
                }

                // we don't generally WANT _input here, as we could
                // end up overriding some auto-calc quantities if we had it,
                // but we need it in some way for tModifyFix
                traceCopy._inputRef = trace._input;
                return traceCopy;
            }),
            allTraces = traceData.map(function(trace,i) { return i; });

        traceData.forEach(function(trace,i) {
            trace.selected = i;
            if(!trace.name) trace.name = gd.data[i].name || (`${TRACE_LABEL} ${i}`);
        });

        var traceCalc = traceData.map(function(trace) { return [{trace:trace}]; });

        // add 'all traces', and 'all <type>' for each type present
        // at the beginning of the list
        if(traceData.length>1) {
            // collect trace types we have
            var traceTypes = {};
            traceData.forEach(function(trace,i) {
                traceTypes[trace.type] = (traceTypes[trace.type]||[]).concat(i);
            });

            // all traces
            var usedTraceTypes = Object.keys(traceTypes),
                auxData = [Plotly.Lib.minExtend(traceData[0], {
                    name: `All ${TRACES_LABEL.toLowerCase()}`,
                    type: 'various',
                    selected: allTraces
                })];

            // all traces of one type
            if (usedTraceTypes.length>1) {
                usedTraceTypes.forEach(function(tt) {
                    var theseTraces = traceTypes[tt];
                    if(theseTraces.length>1) {
                        auxData.push(Plotly.Lib.minExtend(traceData[theseTraces[0]], {
                            name: 'All ' + tt,
                            type: tt,
                            selected: theseTraces
                        }));
                    }
                });
            }
            else {
                auxData[0].name += ' (' + usedTraceTypes[0] + ')';
                auxData[0].type = usedTraceTypes[0];
            }

            // merge attributes of auxData, so anything that's constant is retained
            // and anything that varies gets 'various'
            var noMerge = ['name', 'uid', 'selected', 'module'];
            auxData.forEach(function(auxTrace) {
                auxTrace.selected.slice(1).forEach(function(i) {
                    var selectedTrace = Plotly.Lib.minExtend(traceData[i]);
                    Object.keys(selectedTrace).forEach(function(k){
                        if(noMerge.indexOf(k)===-1) {
                            mergeAttr(auxTrace, selectedTrace, k, true);
                        }
                    });
                });
            });

            // prepend these extra selections to traceData
            traceData = auxData.concat(traceData);
            traceCalc = auxData.map(function(auxTrace){
                return [{trace: auxTrace}];
            }).concat(traceCalc);
        }

        // make the trace selector dropdown (after removing any previous)
        var pt = popover.find('.trace-dropdown');

        styleBoxDrop(pt.html(''), 'trace', '', traceCalc, null, selectTrace, traceData);

        // select the desired trace or trace set (and build the attribute selectors)
        // choose all (or the only trace) if selectedtraces is invalid
        var iSelected = 0;
        for(i=traceData.length-1; i>0; i--) {
            if (String(traceData[i].selected)===String(selectedtraces)) {
                iSelected = i;
                break;
            }
        }
        selectTrace({
            popover: popover,
            d: traceCalc[iSelected],
            data: traceData[iSelected],
            i: iSelected
        });
    }

    var MOCKLINES = {
        type: 'scatter',
        mode: 'lines',
        fill: 'none',
        name: ''
    };

    var MOCKMARKERS = {
        type: 'scatter',
        mode: 'markers',
        fill: 'none',
        name: ''
    };

    var DASHLIST = ['solid', 'dot', 'dash', 'longdash', 'dashdot', 'longdashdot']
        .map(function(dash) {
            return {line: {dash: dash}};
        });

    var LINEWIDTHLIST = [0, 0.5, 1, 2, 3, 4, 6, 8, 10, 15, 20].map(function(width) {
        return {line: {width: width}, name: String(width)};
    });

    function makeMarkerSizes(num, scale, startingValue) {
        var sizes = [];
        if (startingValue !== undefined) {
            sizes.push({
                marker: {size: startingValue},
                name: String(startingValue)
            });
        }
        for(var i=1; i<=num; i++) {
            sizes.push({
                marker: {size: scale*i},
                name: String(scale*i)
            });
        }
        return sizes;
    }
    var MARKERSIZES2D = makeMarkerSizes(15, 2),
        MARKERSIZES3D = makeMarkerSizes(15, 4);

    var MARKERLINEWIDTHLIST = [0, 0.5, 1, 2, 3].map(function(mlw) {
        return {marker: {line: {width: mlw}}, name: String(mlw)};
    });

    var S_O_LINEWIDTHLIST = [0, 0.5, 1, 2, 3].map(function(mlw) {
        return {marker: {line: {width: mlw, outlierwidth: mlw}}, name: String(mlw)};
    });

    var ERRORBARTHICKLIST = function(axis, fullTrace) {
        var attr = 'error_' + axis,
            cont = fullTrace[attr] || {};

        var list = [0.5, 1, 2, 3, 4, 6].map(function(thick) {
            var obj = {
                line: {
                    width: thick,
                    color: cont.color
                },
                name: String(thick)
            };
            return obj;
        });

        return tModifyFix(fullTrace, list, MOCKLINES).map(function(cd) {
            var trace = cd[0].trace;
            // have to add in the error bar object separately because
            // tModifyFix will strip it out in the 3D case
            cd[0].trace[attr] = {thickness: Number(trace.name)};
            return cd;
        });
    };

    var ERRORBARWIDTHLIST = function(axis, fullTrace) {
        var attr = 'error_' + axis,
            cont = fullTrace[attr] || {};

        var list = [0, 2, 4, 6, 8, 10, 12].map(function(width) {
            var obj = {
                line: {
                    width: cont.thickness,
                    color: cont.color,
                    dash: (2*width) + 'px,100px'
                },
                name: String(width)
            };
            return obj;
        });

        return tModifyFix(fullTrace, list, MOCKLINES).map(function(cd) {
            var trace = cd[0].trace;
            // have to add in the error bar object separately because
            // tModifyFix will strip it out in the 3D case
            cd[0].trace[attr] = {width: Number(trace.name)};
            return cd;
        });
    };

    var BOOLEANONOFF = [
        {name: 'On', val: true},
        {name: 'Off', val: false}
    ];

    var BOOLEANSHOWHIDE = [
        {name: 'Show', val: true},
        {name: 'Hide', val: false}
    ];

    var AXOPTION = function(axId) {
        return {name: axId.toUpperCase(), val: axId};
    };

    function conditionalProp(obj, astr, displayOverride) {
        var prop = Plotly.Lib.nestedProperty(obj, astr);
        if(displayOverride!==undefined) {
            var val;
            if(displayOverride) {
                val = prop.get();
                if(val===undefined) val = '~~override~~';
            }
            return {
                astr: prop.astr,
                get: function(){ return val; },
                set: prop.set
            };
        }
        return prop;
    }

    function selectTrace(o){
        var fullTrace = o.data,
            d = o.d,
            visible = fullTrace.visible,
            type = fullTrace.type,
            popover = o.popover,
            gd = popover[0].gd,
            fullLayout = gd._fullLayout,
            iSelected = o.i,
            scaleName;

        popover.find('.select-trace .selected-val')
            .html(popover.find('.select-trace li > a')[iSelected].innerHTML);

        // save the selection value for later use
        var selected = o.data.selected;
        popover[0].selectedObj = selected;

        function traceProp(astr, displayOverride) {
            return conditionalProp(fullTrace, astr, displayOverride);
        }

        function glPropFromTrace(astr, displayOverride) {
            var prop = conditionalProp(fullLayout, astr, displayOverride);
            prop.astr = 'LAYOUT' + prop.astr;
            return prop;
        }

        // when we change traces remove any overlays and show whatever
        // tab was hidden by the overlay.
        toolPanel.removeOverlays();

        popover[0].empty();


        var tabMode = popover.find('#tracesbox-0'),
            tabRange = popover.find('#tracesbox-1'),
            tabStyle = popover.find('#tracesbox-2'),
            tabText = popover.find('#tracesbox-3'),
            tabError = popover.find('#tracesbox-4'),
            tabColorbar = popover.find('#tracesbox-5'),
            tabColorbar2 = popover.find('#tracesbox-6'),
            tabContour = popover.find('#tracesbox-7'),
            tabLighting = popover.find('#tracesbox-8'),
            tabDimensions = popover.find('#tracesbox-9'),
            numTracesSelected = Array.isArray(selected) ? selected.length : 1,
            deleteButtonTitle;

        var visibleDeleteRow = selectorRow(tabMode, 'Visibility');
        // styling for trace data
        // make each of the attribute selection dropdowns

        var visibilityOptions = BOOLEANSHOWHIDE;

        if (!Plotly.Plots.traceIs(fullTrace, 'notLegendIsolatable')) {
            // Carpet traces, in particular, cannot be isolated in the legend, so only
            // add the legendonly option when it applies:
            visibilityOptions = visibilityOptions.concat([{name: 'Legend Only', val: 'legendonly'}]);
        }

        pickOption(visibleDeleteRow, traceProp('visible'), '', visibilityOptions);

        if (SHOW_DELETE_TRACE_UI) {
            if (numTracesSelected > 1) {
                deleteButtonTitle = `Delete (${numTracesSelected}) ${TRACES_LABEL}`;
            } else {
                deleteButtonTitle = `Delete ${TRACE_LABEL}`;
            }

            actionButton(visibleDeleteRow, '', deleteButtonTitle, function () {
                var indices = Array.isArray(selected) ? selected : [selected];
                Plotly.deleteTraces(gd, indices);

                // if the user deleted the last trace, kill popovers
                // else, at least redraw the popover
                if (!gd.data.length) {
                    killPopovers();
                } else {
                    var po = $('.slideout');
                    if (po.length) po[0].redraw(po[0].selectedObj);
                }

            });
        }

        // swap x/y data - these are special "attributes" that have no value and get
        // dealt with specially by Plotly.restyle (like axis.reverse in Plotly.relayout)
        if (Plotly.Plots.traceIs(type, 'cartesian') &&
            fullTrace.type !== 'carpet') {
            var swapRow = selectorRow(tabMode, 'Swap');
            pickOption(swapRow, traceProp('swapxy', visible), '',
                       [{name: 'X&Y data', val: true}]);
            pickOption(swapRow, traceProp('swapxyaxes', visible), '',
                       [{name: 'Data & axis config', val: true}]);
        }
        // axis selection - list all existing axes plus the option to make a new one
        var xlist = Plotly.Axes.listIds(gd, 'x').map(AXOPTION),
            ylist = Plotly.Axes.listIds(gd, 'y').map(AXOPTION);

        if (fullTrace.type !== 'contourcarpet') {
            var pickAxes = selectorRow(tabMode, 'Axes');
            pickOption(pickAxes, traceProp('xaxis'), '', xlist);
            pickOption(pickAxes, traceProp('yaxis'), '', ylist);
            if(visible) {
                $('<div class="editboxselector btn-group"><button class="btn btn--plain">' +
                        'New Axis/Subplot...</button></div>')
                    .appendTo(pickAxes)
                    .find('.btn').click(function(){ makeNewAxes(gd, popover, selected); });
            }
        }

        if (Plotly.Plots.traceIs(fullTrace, 'carpet')) {
            textInput(tabMode, traceProp('carpetid'), 'Carpet ID', inputFreeString());
        }

        var has2DZ = Array.isArray(fullTrace.z) && Array.isArray(fullTrace.z[0]);
        if (ToolPanelConstants.SHOW_TRACE_TYPE_SWITCHING) {
            if(visible && has2DZ) {
                // types that use a 2D z array
                pickOption(tabMode, traceProp('type'), 'Type',
                           Plotly.Heatmap.hasColumns(fullTrace._inputRef) ?
                           [
                               {name: 'Heatmap', val: 'heatmap'},
                               {name: 'Contour map', val: 'contour'}
                           ] :
                           [
                               {name: 'Heatmap', val: 'heatmap'},
                               {name: 'Contour map', val: 'contour'},
                               {name: '3D Surface', val: 'surface'}
                           ]
                          );
            }
            else if(visible &&
                    !Plotly.Plots.traceIs(type, 'gl3d') &&
                    !Plotly.Plots.traceIs(type, 'geo')) {
                var OkHist2D = fullTrace.x && fullTrace.y;
                pickOption(tabMode, traceProp('type'), 'Type', [
                    {name: 'Scatter', val: 'scatter'},
                    {name: 'Bar', val: 'bar'},
                    {name: 'Pie', val: 'pie'},
                    {name: 'Box', val: 'box'},
                    {name: 'Histogram', val: 'histogram'}
                ], OkHist2D ? 'grouptop' : undefined);
                if(OkHist2D) {
                    pickOption(tabMode, traceProp('type'), '2D Hist.', [
                        {name: 'Heatmap', val: 'histogram2d'},
                        {name: 'Contour map', val: 'histogram2dcontour'}
                    ], 'groupbottom');
                }
            }
        }

        textInput(tabMode, traceProp('cheaterslope'),
                  'Cheater Slope', inputAxRange('linear'));


        // STYLE TAB

        slider(tabStyle, traceProp('opacity'), 'Opacity', [0,1], 2);
        if(fullTrace.opacity === undefined && type === 'scatter') {
            var opacityRow = selectorRow(tabStyle, 'Opacity');
            $(opacityRow).removeClass('empty-item');

            var title = 'Opacity is not supported for ' +
                    `${TRACES_LABEL.toLowerCase()} with fill<br>or that get ` +
                    `filled to by another ${TRACE_LABEL.toLowerCase()}`;

            $(`<i class="icon-ban-circle" title="${title}"></i>`)
                .appendTo(opacityRow)
                .tipsy({gravity: 'w', opacity: 1, html: true});
        }

        pickOption(tabMode, traceProp('boxpoints'), 'Show Points', [
            {name: 'All', val: 'all'},
            {name: 'None', val: false},
            {name: 'All outliers', val: 'outliers'},
            {name: 'Outliers & suspected', val: 'suspectedoutliers'}
        ]);
        pickOption(tabMode, traceProp('boxmean'), 'Show Mean', [
            {name: 'On', val: true},
            {name: 'With &sigma;', val: 'sd'},
            {name: 'Off', val: false}
        ]);

        var isBox = visible && Plotly.Plots.traceIs(type, 'box');

        // layout properties still need to know what kind THIS trace is
        pickOption(tabMode, glPropFromTrace('boxmode', isBox), 'Mode', [
            {name: 'Group', val: 'group'},
            {name: 'Overlay', val: 'overlay'}
        ]);
        slider(tabStyle, glPropFromTrace('boxgap', isBox), 'Box Gap', [0,1], 2);
        slider(tabStyle, glPropFromTrace('boxgroupgap', isBox), 'Group Gap', [0,1], 2);

        slider(tabStyle, traceProp('whiskerwidth'), 'Whisker Width', [0,1], 2);
        var modeModAll = {name: ''},
            modes1 = [
                {mode: 'none'},
                {mode: 'lines'},
                {mode: 'markers'},
                {mode: 'lines+markers'}
            ],
            modes2 = [
                {mode: 'text'},
                {mode: 'lines+text'},
                {mode: 'markers+text'},
                {mode: 'lines+markers+text'}
            ];
        pickStyle(tabMode, 'mode', 'Lines/Markers', d,
                  tModifyFix(fullTrace, modes1, modeModAll),
                  fullTrace.text ? 'grouptop' : null);
        if (fullTrace.text) {
            pickStyle(tabMode, 'mode', '... With text', d,
                      tModifyFix(fullTrace, modes2, modeModAll),
                      'groupbottom');
        }


        ['x','y','z'].forEach( function (axis) {

            selectOption(tabMode, [
                traceProp('projection.'+axis+'.show')
            ], axis.toUpperCase() + ' projection', [
                {name: 'show', activeVal: true, inactiveVal: false}
            ]);

            slider(tabMode, traceProp('projection.'+axis+'.opacity'), 'opacity', [0, 1], 2);
            slider(tabMode, traceProp('projection.'+axis+'.scale'), 'scale', [0, 10], 1);

        });

        pickOption(tabMode, traceProp('surfaceaxis'), 'Surface', [
            {name: 'None', val:-1},
            {name: 'X', val: 0},
            {name: 'Y', val: 1},
            {name: 'Z', val: 2}
        ]);
        pickColor(tabMode, traceProp('surfacecolor'), 'Surface Color', 'Surface Color');
        pickOption(tabMode, traceProp('fill'), 'Fill To', [
            {name: 'None', val: 'none'},
            {name: 'Y=0', val: 'tozeroy'},
            {name: 'X=0', val: 'tozerox'},
            {name: 'Next Y', val: 'tonexty'},
            {name: 'Next X', val: 'tonextx'}
        ]);

        pickColor(tabMode, traceProp('fillcolor'), (isBox ? 'Fill' : '...') + ' Color', 'Fill Color');

        textInput(tabMode, traceProp('label0'), 'First label', inputBetween(-Infinity, Infinity));
        textInput(tabMode, traceProp('dlabel'), 'Label delta', inputBetween(-Infinity, Infinity));

        var d0, d1, domainRow;
        if(fullTrace.domain && Array.isArray(fullTrace.domain.x)) {
            d0 = fullTrace.domain.x[0];
            d1 = fullTrace.domain.x[1];
            domainRow = selectorRow(tabMode, 'X span');
            slider(domainRow, traceProp('domain.x[0]'), '', [0, Math.min(0.98, d1 - 0.01)], 2);
            slider(domainRow, traceProp('domain.x[1]'), '', [Math.max(0.02, d0 + 0.01), 1], 2);
        }

        if(fullTrace.domain && Array.isArray(fullTrace.domain.y)) {
            d0 = fullTrace.domain.y[0];
            d1 = fullTrace.domain.y[1];
            domainRow = selectorRow(tabMode, 'Y span');
            slider(domainRow, traceProp('domain.y[0]'), '', [0, Math.min(0.98, d1 - 0.01)], 2);
            slider(domainRow, traceProp('domain.y[1]'), '', [Math.max(0.02, d0 + 0.01), 1], 2);
        }

        var scaleGroups = {},
            scaleGroupOptions = [{name: 'None', val: ''}],
            pieCount = 0;
        gd._fullData.forEach(function(tracei) {
            if(tracei.scalegroup && !scaleGroups[tracei.scalegroup]) {
                scaleGroups[tracei.scalegroup] = true;
                scaleGroupOptions.push({
                    name: tracei.scalegroup,
                    val: tracei.scalegroup
                });
            }
            if(Plotly.Plots.traceIs(tracei, 'pie')) pieCount++;
        });
        if(pieCount > 1 && fullTrace.scalegroup !== undefined) {
            var scaleGroupRow = selectorRow(tabMode, 'Scaling Group');
            pickOption(scaleGroupRow, traceProp('scalegroup'), '', scaleGroupOptions);
            var newSGProp = {
                astr: 'scalegroup',
                get: function() { return ''; },
                set: Plotly.Lib.nestedProperty(fullTrace, 'scalegroup').set
            };
            textInput(scaleGroupRow, newSGProp, '', inputFreeString());
        }

        fontPicker(tabText, traceProp('textfont'), 'Font');
        fontPicker(tabText, traceProp('insidetextfont'), '... Inside');
        fontPicker(tabText, traceProp('outsidetextfont'), '... Outside');

        if(type === 'scatter') {
            pickOption(tabText, traceProp('textposition'), 'Position', [
                {name: '&#x2196;', val: 'top left'},
                {name: '&#x2191;', val: 'top center'},
                {name: '&#x2197;', val: 'top right'}
            ], 'grouptop pickgrid');
            pickOption(tabText, traceProp('textposition'), '&nbsp;', [
                {name: '&#x2190;', val: 'middle left'},
                {name: '&#x25CB;', val: 'middle center'},
                {name: '&#x2192;', val: 'middle right'}
            ], 'grouptop groupbottom pickgrid');
            pickOption(tabText, traceProp('textposition'), '&nbsp;', [
                {name: '&#x2199;', val: 'bottom left'},
                {name: '&#x2193;', val: 'bottom center'},
                {name: '&#x2198;', val: 'bottom right'}
            ], 'groupbottom pickgrid');
        }
        else if(type === 'pie') {
            pickOption(tabText, traceProp('textposition'), 'Position', [
                {name: 'Inside', val: 'inside'},
                {name: 'Outside', val: 'outside'},
                {name: 'Auto', val: 'auto'},
                {name: 'None', val: 'none'}
            ]);

            // until we have a widget for flaglists, just include the most common
            // textinfo options here in a pickOption
            // TODO: any more?
            var textinfoOpts1 = [
                    {name: 'None', val: 'none'},
                    {name: 'Value', val: 'value'},
                    {name: '%', val: 'percent'},
                    {name: 'Label', val: 'label'}
                ],
                textinfoOpts2 = [
                    {name: 'Label + Val', val: 'label+value'},
                    {name: 'Label + %', val: 'label+percent'},
                    {name: 'Val + %', val: 'value+percent'}
                ];
            if(Array.isArray(fullTrace.text)) {
                textinfoOpts1.push({name: 'Text', val: 'text'});
                textinfoOpts2.push({name: 'Text + %', val: 'text+percent'});
            }

            pickOption(tabText, traceProp('textinfo'), 'Info', textinfoOpts1, 'grouptop');
            pickOption(tabText, traceProp('textinfo'), '&nbsp;', textinfoOpts2, 'groupbottom');
        }

        if(Array.isArray(selected)) {
            pickColorPalette(tabStyle, traceProp('marker.color'),
                'Marker color palette', selected);
            pickColorPalette(tabStyle, traceProp('line.color'),
                'Line color palette', selected);
        }

        // for pie only
        if(Plotly.Plots.traceIs(fullTrace, 'pie')) {
            pickColorPalette(tabStyle, traceProp('marker.colors'),
                'Sector color palette', selected);
        }

        var lineRow = selectorRow(tabStyle, isBox ? 'Box line' : 'Line');
        styleBoxDrop(lineRow, 'line.dash', '', d,
            tModify(fullTrace, DASHLIST, MOCKLINES));

        styleBoxDrop(lineRow, 'line.width', '', d,
            tModify(fullTrace, LINEWIDTHLIST, MOCKLINES));

        pickColor(lineRow, traceProp('line.color'), '', (isBox ? 'Box ' : '') + 'Line Color');

        pickOption(tabStyle, traceProp('line.shape'), 'Shape', [
            {name: '<div style="line-height:20px;">&nbsp;&#x2571;&nbsp;</div>', val: 'linear'},
            {name: '<div style="line-height:20px;">&#x256d;&#x256f;</div>', val: 'spline'},
            {name: '<div style="line-height:20px;">&nbsp;&#x23cc;</div>', val: 'hv'},
            {name: '<div style="line-height:20px;">&#x23be&nbsp;</div>', val: 'vh'},
            {name: '<div style="line-height:20px;transform:rotate(90deg);-webkit-transform:rotate(90deg);' +
                '-moz-transform:rotate(90deg);-ms-transform:rotate(90deg);-o-transform:rotate(90deg);">' +
                '&#x2517;&#x2513;</div>', val: 'hvh'},
            {name: '<div style="line-height:20px;">&#x250f;&#x251b;</div>', val: 'vhv'}
        ]);
        slider(tabStyle, traceProp('line.smoothing'), 'Smoothing', [0,1.3], 1);

        pickOption(tabStyle, traceProp('connectgaps'), 'Data Gaps', [
            {name: 'Connect', val: true},
            {name: 'Blank', val: false}
        ]);

        var markerSizeRow = selectorRow(tabStyle, 'Bubble Scale');
        pickOption(markerSizeRow, traceProp('marker.sizemode'), '', [
            {name: 'Diameter', val: 'diameter'},
            {name: 'Area', val: 'area'}
        ]);
        textInput(markerSizeRow, traceProp('marker.sizeref'), '&nbsp;1 px =&nbsp;',
            inputBetween(0, Infinity), 'side-by-side');

        // find the list of markers that actually make sense to show
        var hasLine = ((fullTrace.marker||{}).line||{}).width>0,
            markerNormal = [],
            markerOpen = [],
            markerDot = [],
            markerOpenDot = [],
            concatMarkerNormals;

        if(Plotly.Plots.traceIs(type, 'gl3d') || Plotly.Plots.traceIs(type, 'gl2d')) {
            concatMarkerNormals = Object.keys(Plotly.Scatter3D.markerSymbols)
                .map(function (symbolName) {
                    return {marker: {symbol: symbolName}};
                });
        }
        else {
            Plotly.Drawing.symbolNames.forEach(function(symbolName,i) {
                if(hasLine || !Plotly.Drawing.symbolNeedLines[i]) {
                    markerNormal.push({marker: {symbol: symbolName}});
                }
                markerOpen.push({marker: {symbol: symbolName+'-open'}});
                if(!Plotly.Drawing.symbolNoDot[i]) {
                    if(hasLine) {
                        markerDot.push({marker: {symbol: symbolName+'-dot'}});
                    }
                    markerOpenDot.push({marker: {symbol: symbolName+'-open-dot'}});
                }
            });

            concatMarkerNormals = markerNormal.concat(markerOpen,markerDot,markerOpenDot);
        }

        var markerRow = selectorRow(tabStyle, (isBox ? 'Outlier ' : '') + 'Marker');

        styleBoxDrop(markerRow, 'marker.symbol', '', d,
            tModify(fullTrace, concatMarkerNormals, MOCKMARKERS));

        styleBoxDrop(markerRow, 'marker.size', '', d,
            tModify(fullTrace,
                    Plotly.Plots.traceIs(type, 'gl3d') ? MARKERSIZES3D : MARKERSIZES2D,
                    MOCKMARKERS));

        var isBar = visible && Plotly.Plots.traceIs(type, 'bar');

        pickColor(markerRow, traceProp('marker.color'), isBar ? 'Fill' : '',
            (isBar ? 'Fill' : 'Marker') + ' color');

        slider(tabStyle, traceProp('marker.maxdisplayed'),
            '... Max # Displayed', [0,200], 0, 'all');

        var showMarkerOpacity = true;
        if (fullTrace._input &&
            fullTrace._input.marker &&
            Array.Array(fullTrace._input.marker.opacity)) {
            showMarkerOpacity = false;
        }

        if (showMarkerOpacity) {
            slider(tabStyle, traceProp('marker.opacity'), '... Opacity', [0, 1], 2);
        }
        slider(tabStyle, traceProp('jitter'), '... Jitter', [0, 1], 1);
        slider(tabStyle, traceProp('pointpos'), '... Offset', [-2, 2], 1);

        var mlRow = selectorRow(tabStyle, 'Outline');
        styleBoxDrop(mlRow, 'marker.line.width', '', d,
            tModify(fullTrace, MARKERLINEWIDTHLIST, !isBar && MOCKMARKERS));
        pickColor(mlRow, traceProp('marker.line.color'), '', 'Outline color');

        pickColor(tabStyle, traceProp('marker.outliercolor'),
            'Suspected Outlier Color', 'Marker Color');

        var solRow = selectorRow(tabStyle, '... Line');
        styleBoxDrop(solRow,
            'marker.line.outlierwidth',
            '',
            d,
            tModify(fullTrace, S_O_LINEWIDTHLIST, {
                mode: 'markers',
                fill: 'none',
                marker: {
                    color: (fullTrace.marker||{}).outliercolor,
                    line: {color: ((fullTrace.marker||{}).line||{}).outliercolor}
                },
                type: 'scatter'
            }));
        pickColor(solRow, traceProp('marker.line.outliercolor'),
            '', 'Suspected Outlier Line Color');

        if (Plotly.Plots.traceIs(type, 'histogram')) {
            var histTypeRowLabel = ToolPanelConstants.SHOW_TRACE_TYPE_SWITCHING
                ? 'Binning mode'
                : 'Type';
            var histTypeRow = selectorRow(tabMode, histTypeRowLabel);

            pickOption(histTypeRow, traceProp('cumulative.enabled'), '', [
                {name: 'PDF', val: false},
                {name: 'CDF', val: true}
            ]);
        }

        pickOption(tabMode, glPropFromTrace('barmode', isBar), 'Mode', [
            {name: 'Stack', val: 'stack'},
            {name: 'Group', val: 'group'},
            {name: 'Overlay', val: 'overlay'}
        ]);

        var showBarnorm = isBar && (fullLayout.barmode!=='overlay');
        pickOption(tabMode, glPropFromTrace('barnorm', showBarnorm), 'Group Normalization', [
            {name: 'None', val: ''},
            {name: 'Fraction', val: 'fraction'},
            {name: '%', val: 'percent'}
        ]);

        var orientRow = selectorRow(tabMode, 'Orientation');
        pickOption(orientRow, traceProp('orientation'), '', [
            {name: 'Vert.', val: 'v'},
            {name: 'Horz.', val: 'h'}
        ]);
        pickOption(orientRow, traceProp('orientationaxes', fullTrace.orientation!==undefined), '',
            [{name: 'Flip bars & axis config', val: true}]);

        slider(tabStyle, glPropFromTrace('bargap', isBar), 'Bar Gap', [0,1], 2);
        slider(tabStyle, glPropFromTrace('bargroupgap', isBar), 'Group Gap', [0,1], 2);

        var useMarkerColor = Plotly.Plots.traceIs(type, '2dMap') &&
                Plotly.Plots.traceIs(type,'histogram') &&
                Array.isArray((fullTrace.marker||{}).color) &&
                !Array.isArray(fullTrace.z),
            hflabel = 'Bin Function' + (useMarkerColor ? '<br>(Marker Color)' : ''),
            aggregateLetter = '(Z)',
            densityMetric = 'A';
        if(type==='various') aggregateLetter = '';
        else if(type==='histogram') {
            aggregateLetter = fullTrace.orientation==='h' ? '(X)' : '(Y)';
            densityMetric = fullTrace.orientation==='h' ? 'y' : 'x';
        }

        pickOption(tabRange, traceProp('histfunc'), hflabel, [
            {name: 'Count', val: 'count'},
            {name: '&Sigma;' + aggregateLetter, val: 'sum'},
            {name: 'Avg' + aggregateLetter, val: 'avg'},
            {name: 'Min' + aggregateLetter, val: 'min'},
            {name: 'Max' + aggregateLetter, val: 'max'}
        ]);

        pickOption(tabRange, traceProp('histnorm'), 'Normalization', [
            {name: 'None', val: ''},
            {name: '%', val: 'percent'},
            {name: 'p', val: 'probability'},
            {name: '1/&Delta;' + densityMetric, val: 'density'},
            {name: 'p/&Delta;' + densityMetric, val: 'probability density'}
        ]);

        pickOption(tabRange, traceProp('autobinx'), 'X bins', [
            {name: 'Auto', val: true},
            {name: 'Manual', val: false}
        ]);
        slider(tabRange, traceProp('nbinsx'), 'Max # X bins', [0, 100], 0, 'auto');

        // get axis type for x/y bins range
        function getAxisType(axLetter) {
            var ax = Plotly.Axes.getFromTrace(gd, fullTrace, axLetter),
                axList,
                axList0Type,
                hasSameType;

            if (ax) return ax.type;

            // handle the 'All traces' case
            axList = Plotly.Axes.list(gd, axLetter);
            axList0Type = (axList[0] || {}).type;
            hasSameType = axList.every(function(ax){
                return ax.type===axList0Type;
            });

            if (hasSameType) return axList0Type;
            else return 'linear';
        }

        var xatype = getAxisType('x'),
            yatype = getAxisType('y');

        var xbRow = selectorRow(tabRange, 'X range');
        textInput(xbRow, traceProp('xbins.start'),
            '', inputAxRange(xatype, 'nolog'));
        textInput(xbRow, traceProp('xbins.end'),
            '', inputAxRange(xatype, 'nolog'));
        textInput(tabRange, traceProp('xbins.size'),
            'X bin size', inputAxRange('linear'));

        pickOption(tabRange, traceProp('autobiny'), 'Y bins', [
            {name: 'Auto', val: true},
            {name: 'Manual', val: false}
        ]);
        slider(tabRange, traceProp('nbinsy'), '... Max #', [0, 100], 0, 'auto');

        var ybRow = selectorRow(tabRange, 'Y range');
        textInput(ybRow, traceProp('ybins.start'),
            '', inputAxRange(yatype, 'nolog'));
        textInput(ybRow, traceProp('ybins.end'),
            '', inputAxRange(yatype, 'nolog'));
        textInput(tabRange, traceProp('ybins.size'),
            'Y bin size', inputAxRange('linear'));

        pickOption(tabRange, traceProp('xtype'), 'X Values', [
            {name: 'Array', val: 'array'},
            {name: 'Scaled', val: 'scaled'}
        ]);

        var x0row = selectorRow(tabRange, 'x0 / dx');
        textInput(x0row, traceProp('x0'),
            '', inputAxRange(xatype, 'nolog'));
        textInput(x0row, traceProp('dx'), '', inputAxRange('linear'));

        pickOption(tabRange, traceProp('ytype'), 'Y Values', [
            {name: 'Array', val: 'array'},
            {name: 'Scaled', val: 'scaled'}
        ]);

        var y0row = selectorRow(tabRange, 'y0 / dy');
        textInput(y0row, traceProp('y0'),
            '', inputAxRange(yatype, 'nolog'));
        textInput(y0row, traceProp('dy'), '', inputAxRange('linear'));

        pickOption(tabRange, traceProp('contours.type'), 'Type', [
            {name: 'Levels', val: 'levels'},
            {name: 'Constraint', val: 'constraint'}
        ]);

        const opIsScalar = op => {
            let isScalar;
            for (let i = 0; i < CONTOUR_OPERATIONS.length; i++) {
                if (CONTOUR_OPERATIONS[i].val === op) {
                    isScalar = CONTOUR_OPERATIONS[i].scalar;
                    break;
                }
            }
            return isScalar;
        };

        pickOption(tabRange, traceProp('contours.operation'), 'Operation',
                   CONTOUR_OPERATIONS, '' , '', function({astr, val}) {
                       const operation = fullTrace.contours.operation;
                       const wasScalar = opIsScalar(operation);
                       const willBeScalar = opIsScalar(val);

                       if (wasScalar !== willBeScalar) {
                           let newval;
                           const oldval = fullTrace.contours.value;

                           // we are moving from scalar to an array reuse
                           // scalar value as first index of new array. Double
                           // wrap arrays as required for Plotly.restyle
                           if (!willBeScalar) {
                               newval = [[oldval, oldval+1]];
                           } else {
                               newval = oldval[0];
                           }
                           const selectedObj = popover[0].selectedObj;
                           popover[0].applyfn(
                               popover[0].gd,
                               'contours.value',
                               newval,
                               selectedObj < 0 ? null : selectedObj
                           );
                       }

                       // apply operation as usual
                       popover[0].applyChange({astr: astr, val: val});
                   });

        if (fullTrace.contours && fullTrace.contours.type === 'constraint') {
            const operation = fullTrace.contours.operation;
            if (!opIsScalar(operation)) {
                twinTextInput(tabRange, traceProp('contours.value'), 'Value',
                              inputAxRange('linear'));
            } else {
                textInput(tabRange, traceProp('contours.value'), 'Value',
                          inputAxRange('linear'));
            }
        }

        pickOption(tabRange, traceProp('autocontour'), 'Contours', [
            {name: 'Auto', val: true},
            {name: 'Manual', val: false}
        ]);

        slider(tabRange, traceProp('ncontours'), '... Max #', [0, 100], 0, 'auto');

        if (fullTrace.contours && fullTrace.contours.type !== 'constraint') {
            var contourRow = selectorRow(tabRange, '... Range');
            textInput(contourRow, traceProp('contours.start'), '', inputAxRange('linear'));
            textInput(contourRow, traceProp('contours.end'), '', inputAxRange('linear'));
            textInput(tabRange, traceProp('contours.size'), '... Size', inputAxRange('linear'));

            var zrange = selectorRow(tabRange, 'Z range');
            pickOption(zrange, traceProp('zauto'), '', [
                {name: 'Auto', val: true},
                {name: 'Manual', val: false}
            ]);
            textInput(zrange, traceProp('zmin'), '', inputAxRange('linear'));
            textInput(zrange, traceProp('zmax'), '', inputAxRange('linear'));
        }

        var mcrange = selectorRow(tabRange, 'Color data range');
        pickOption(mcrange, traceProp('marker.cauto'), '', [
            {name: 'Auto', val: true},
            {name: 'Manual', val: false}
        ]);
        textInput(mcrange, traceProp('marker.cmin'), '',
            inputBetween(-Infinity, Infinity));
        textInput(mcrange, traceProp('marker.cmax'), '',
            inputBetween(-Infinity, Infinity));

        var lcrange = selectorRow(tabRange, 'Color line data range');
        pickOption(lcrange, traceProp('line.cauto'), '', [
            {name: 'Auto', val: true},
            {name: 'Manual', val: false}
        ]);
        textInput(lcrange, traceProp('line.cmin'), '',
            inputBetween(-Infinity, Infinity));
        textInput(lcrange, traceProp('line.cmax'), '',
            inputBetween(-Infinity, Infinity));


        var sclContainer, sclPrefix, scl;

        if(Plotly.Plots.traceIs(type, 'markerColorscale')) {
            sclContainer = fullTrace.marker || {};
            sclPrefix = 'marker.';
        } else if (fullTrace.type === 'parcoords') {
            sclContainer = fullTrace.line || {};
            sclPrefix = 'line.';
        } else {
            sclContainer = fullTrace || {};
            sclPrefix = '';
        }

        scl = sclContainer.colorscale && Plotly.Colorscale.getScale(sclContainer.colorscale);

        if(scl) {
            pickOption(tabStyle, traceProp(sclPrefix + 'autocolorscale'), 'Auto Color', [
                {name: 'On', val: true},
                {name: 'Off', val: false}
            ]);

            var scaleRow = selectorRow(tabStyle, '');
            for(scaleName in Plotly.Colorscale.scales) {
                gradientButton(scaleRow, sclPrefix + 'colorscale', scaleName);
            }

            var colorRangeRow = selectorRow(tabStyle, 'Min/max color');
            pickColor(colorRangeRow,
                {
                    astr: sclPrefix + 'mincolor',
                    get: function(){ return scl[0][1]; }
                },
                '', 'Min color', scl);
            pickColor(colorRangeRow,
                {
                    astr: sclPrefix + 'maxcolor',
                    get: function(){ return scl[scl.length-1][1]; }
                },
                '', 'Max color', scl);

            var sclRow = selectorRow(tabStyle, 'Scale');
            textInput(sclRow, traceProp(sclPrefix + 'colorscale'), 'Scale', rgbValidator());
            pickOption(sclRow, traceProp(sclPrefix + 'reversescale'), '', [
                {name: 'Normal', val: false},
                {name: 'Reversed', val: true}
            ]);
        }

        var coloringOptions = [
            {name: 'Fill', val: 'fill'},
            {name: 'Heatmap', val: 'heatmap'},
            {name: 'Lines', val: 'lines'},
            {name: 'None', val: 'none'}
        ];

        if (fullTrace.type === 'contourcarpet') {
            // Remove the heatmap option if it's a constraint:
            coloringOptions.splice(1, 1);
        }

        pickOption(tabStyle, traceProp('contours.coloring'), 'Coloring', coloringOptions);
        pickOption(tabStyle, traceProp('contours.showlines'), 'Lines', BOOLEANSHOWHIDE);

        pickOption(tabStyle, traceProp('zsmooth'), 'Smooth color', [
            {name: 'Fast', val: 'fast'},
            {name: 'Off', val: false},
            {name: 'Best', val: 'best'}
        ]);

        // pie styling
        pickOption(tabStyle, traceProp('sort'), 'Slice order', [
            {name: 'Sorted', val: true},
            {name: 'Original', val: false}
        ]);
        pickOption(tabStyle, traceProp('direction'), 'Direction', [
            {name: '<b>&#8635;</b>', val: 'clockwise'},
            {name: '<b>&#8634;</b>', val: 'counterclockwise'}
        ]);
        slider(tabStyle, traceProp('rotation'), 'Rotation', [-360, 360], 0);

        slider(tabStyle, traceProp('pull'), 'Pull apart', [0, 1], 2);
        slider(tabStyle, traceProp('hole'), 'Hole', [0, 1], 2);
        slider(tabStyle, traceProp('tilt'), 'Tilt', [0, 90], 0);
        slider(tabStyle, traceProp('tiltaxis'), 'Axis', [-360, 360], 0);
        slider(tabStyle, traceProp('depth'), 'Depth', [0, 5], 1);
        slider(tabStyle, traceProp('shading'), 'Shading', [0, 1], 2);

        // colorbar styling
        var cbContainer = sclContainer.colorbar || {},
            cbPrefix = sclPrefix + 'colorbar.';

        pickOption(tabColorbar, traceProp(sclPrefix + 'showscale'), 'Color bar', BOOLEANSHOWHIDE);
        fontPicker(tabColorbar, traceProp(cbPrefix + 'titlefont'), 'Title Font');
        pickOption(tabColorbar, traceProp(cbPrefix + 'titleside'), 'Title Side', [
            {name: 'Right', val: 'right'},
            {name: 'Top', val: 'top'},
            {name: 'Bottom', val: 'bottom'}
        ]);

        var cbThick = selectorRow(tabColorbar, 'Thickness');
        textInput(cbThick, traceProp(cbPrefix + 'thickness'),
            '', inputBetween(0, cbContainer.thicknessmode==='fraction' ? 2 : 500));
        pickOption(cbThick, traceProp(cbPrefix + 'thicknessmode'), '', [
            {name: 'Pixels', val: 'pixels'},
            {name: 'Plot fraction', val: 'fraction'}
        ]);

        var cbLen = selectorRow(tabColorbar, 'Length');
        textInput(cbLen, traceProp(cbPrefix + 'len'),
            '', inputBetween(0, cbContainer.lengthmode==='fraction' ? 2 : 2000));
        pickOption(cbLen, traceProp(cbPrefix + 'lenmode'), '', [
            {name: 'Pixels', val: 'pixels'},
            {name: 'Plot fraction', val: 'fraction'}
        ]);

        var outlineRow = selectorRow(tabColorbar, 'Outline');
        pickColor(outlineRow, traceProp(cbPrefix + 'outlinecolor'),
            '', 'Outline Color');
        slider(outlineRow, traceProp(cbPrefix + 'outlinewidth'), '', [0, 10], 1);

        slider(tabColorbar, traceProp(cbPrefix + 'x'), 'Horz Position', [-0.5,1.5], 2);
        slider(tabColorbar, traceProp(cbPrefix + 'y'), 'Vert Position', [-0.5,1.5], 2);

        pickOption(tabColorbar, traceProp(cbPrefix + 'xanchor'), 'Horz anchor', [
            {name: 'Left', val: 'left'},
            {name: 'Center', val: 'center'},
            {name: 'Right', val: 'right'}
        ]);
        pickOption(tabColorbar, traceProp(cbPrefix + 'yanchor'), 'Vert anchor', [
            {name: 'Top', val: 'top'},
            {name: 'Middle', val: 'middle'},
            {name: 'Bottom', val: 'bottom'}
        ]);
        slider(tabColorbar, traceProp(cbPrefix + 'xpad'), 'Horz padding', [0, 50], 0);
        slider(tabColorbar, traceProp(cbPrefix + 'ypad'), 'Vert padding', [0, 50], 0);

        var borderRow = selectorRow(tabColorbar, 'Border');
        pickColor(borderRow, traceProp(cbPrefix + 'bordercolor'), '', 'Border Color');
        slider(borderRow, traceProp(cbPrefix + 'borderwidth'), '', [0,10], 1);

        pickColor(tabColorbar, traceProp(cbPrefix + 'bgcolor'),
            'Background', 'Background Color');

        fontPicker(tabColorbar2, traceProp(cbPrefix + 'tickfont'), 'Tick Font');

        var inputRef = fullTrace._inputRef || {};
        pickOption(tabColorbar2, traceProp(cbPrefix + 'autotick'), 'Values',
            tickmodeOptions((
                inputRef.colorbar ||
                (inputRef.marker || {}).colorbar ||
                {}
            ).tickvals, 'linear')
        );

        slider(tabColorbar2, traceProp(cbPrefix + 'nticks'), 'Max #', [0, 50], 0, 'auto');
        textInput(tabColorbar2, traceProp(cbPrefix + 'tick0'),
            'Reference', inputAxRange('linear'));
        textInput(tabColorbar2, traceProp(cbPrefix + 'dtick'),
            'Spacing', inputAxRange('linear'));
        pickOption(tabColorbar2, traceProp(cbPrefix + 'ticks'), 'Position', [
            {name: 'Outside', val: 'outside'},
            {name: 'Inside', val: 'inside'},
            {name: 'None', val: ''}
        ]);
        slider(tabColorbar2, traceProp(cbPrefix + 'ticklen'), 'Length', [1, 20], 0);
        slider(tabColorbar2, traceProp(cbPrefix + 'tickwidth'), 'Width', [0.1, 10], 1);
        pickColor(tabColorbar2, traceProp(cbPrefix + 'tickcolor'),
            'Color', 'Tick Color');

        pickOption(tabColorbar2, traceProp(cbPrefix + 'showticklabels'), 'Tick Labels', BOOLEANONOFF);

        angleSlider(tabColorbar2, traceProp(cbPrefix + 'tickangle'), 'Angle');
        pickOption(tabColorbar2, traceProp(cbPrefix + 'exponentformat'), 'Exponents', [
            {name: '000', val: 'none'},
            {name: 'e+6', val: 'e'},
            {name: 'E+6', val: 'E'},
            {name: '&times;10<sup>6</sup>', val: 'power'},
            {name: 'k/M/G', val: 'SI'},
            {name: 'k/M/B', val: 'B'}
        ]);
        pickOption(tabColorbar2, traceProp(cbPrefix + 'showexponent'), 'Show Exp', [
            {name: 'All', val: 'all'},
            {name: 'First', val: 'first'},
            {name: 'Last', val: 'last'},
            {name: 'None', val: 'none'}
        ]);

        var tickPrefixRow = selectorRow(tabColorbar2, 'Tick Prefixes');
        textInput(tickPrefixRow, traceProp(cbPrefix + 'tickprefix'), '', inputFreeString());
        pickOption(tickPrefixRow, traceProp(cbPrefix + 'showtickprefix'), '', [
            {name: 'All', val: 'all'},
            {name: 'First', val: 'first'},
            {name: 'Last', val: 'last'},
            {name: 'None', val: 'none'}
        ]);

        var tickSuffixRow = selectorRow(tabColorbar2, 'Tick Suffixes');
        textInput(tickSuffixRow, traceProp(cbPrefix + 'ticksuffix'), '', inputFreeString());
        pickOption(tickSuffixRow, traceProp(cbPrefix + 'showticksuffix'), '', [
            {name: 'All', val: 'all'},
            {name: 'First', val: 'first'},
            {name: 'Last', val: 'last'},
            {name: 'None', val: 'none'}
        ]);

        textInput(tabColorbar2, traceProp('colorbar.tickformat'), 'Custom format', inputFreeString());

        // Error bars
        var traceRefArray = gd._fullData.map(function(trace, k){
            var tname = trace.name || trace._input.name ||
                    `${TRACE_LABEL} ${trace.index}`;
            var refs = {traceref: k, tracerefminus: k};

            return Plotly.Lib.minExtend(trace, {
                error_x: refs,
                error_y: refs,
                error_z: refs,
                name: tname.substr(0,12) + (tname.length>12 ? '...' : '')
            });
        });

        ['z', 'y', 'x'].forEach(function(errLetter) {
            var errCont = 'error_' + errLetter + '.',
                errUpper = errLetter.toUpperCase(),
                hasZ = (fullTrace.error_z||{}).visible!==undefined,
                copystyle = hasZ ? 'copy_zstyle' : 'copy_ystyle',
                copyStyleName = hasZ ? 'copy Z' : 'copy Y';
            pickOption(tabError, traceProp(errCont + 'visible'),
                errUpper + ' Errors', BOOLEANSHOWHIDE);

            var errvalRow = selectorRow(tabError, 'Value');
            pickOption(errvalRow, traceProp(errCont + 'type'), '', [
                {name: '%', val: 'percent'},
                {name: '+/-', val: 'constant'},
                {name: '&#8730;', val: 'sqrt'},
                {name: 'Data', val: 'data'}
            ]);
            textInput(errvalRow, traceProp(errCont + 'value'),
                      '', inputBetween(0, Infinity));
            styleBoxDrop(errvalRow, errCont + 'traceref', '', d,
                tModify(fullTrace, traceRefArray));

            var errvalminusRow = selectorRow(tabError, 'Minus value');
            pickOption(errvalminusRow, traceProp(errCont + 'symmetric'), '', [
                {name: 'Same as +', val: true},
                {name: 'Different', val: false}
            ]);
            textInput(errvalminusRow, traceProp(errCont + 'valueminus'),
                      '', inputBetween(0, Infinity));
            styleBoxDrop(errvalminusRow, errCont + 'tracerefminus', '', d,
                tModify(fullTrace, traceRefArray));

            pickOption(tabError, traceProp(errCont + copystyle), 'Style', [
                {name: copyStyleName, val: true},
                {name: 'Independent', val: false}
            ]);

            var errlineRow = selectorRow(tabError, 'Line');
            styleBoxDrop(errlineRow, errCont + 'thickness', '', d,
                ERRORBARTHICKLIST(errLetter, fullTrace));
            pickColor(errlineRow, traceProp(errCont + 'color'), '', 'error bar color');

            styleBoxDrop(tabError, errCont + 'width', 'Width', d,
                ERRORBARWIDTHLIST(errLetter, fullTrace));
        });

        // 3D Contours
        ['x','y','z'].forEach( function (axis) {
            var contourRow = selectorRow(tabContour, 'contour - ' + axis.toUpperCase());
            selectOption(contourRow, [
                traceProp('contours.'+axis+'.show')
            ], '', [
                {name: 'show', activeVal: true, inactiveVal: false}
            ]);
            slider(contourRow, traceProp('contours.'+axis+'.width'), '', [0, 10], 1);
            pickColor(contourRow, traceProp('contours.'+axis+'.color'), '', 'Contour Color');
        });
        ['x','y','z'].forEach( function (axis) {
            var highlightRow = selectorRow(tabContour, 'Dynamic contour - ' + axis.toUpperCase());
            selectOption(highlightRow, [
                traceProp('contours.'+axis+'.highlight')
            ], '', [
                {name: 'show', activeVal: true, inactiveVal: false}
            ]);
            slider(highlightRow, traceProp('contours.'+axis+'.highlightWidth'), '', [0, 10], 1);
            pickColor(highlightRow, traceProp('contours.'+axis+'.highlightColor'), '', 'Highlight Color');
        });


        // SURFACE LIGHTING
        slider(tabLighting, traceProp('lighting.ambient'), 'Ambient', [0.01,0.99], 2);
        slider(tabLighting, traceProp('lighting.diffuse'), 'Diffuse', [0.01,0.99], 2);
        slider(tabLighting, traceProp('lighting.specular'), 'Specular', [0.01,0.99], 2);
        slider(tabLighting, traceProp('lighting.roughness'), 'Roughness', [0.01,0.99], 2);
        slider(tabLighting, traceProp('lighting.fresnel'), 'Fresnel', [0.01,0.99], 2);

        // PARCOORD DIMENSIONS
        const dimensions = fullTrace.dimensions || [];
        const dims = dimensions
              .map((d,i) => ({visible: d.visible, name: d.label, val: i}))
              .filter(d => d.visible !== false);

        let iDim = popover[0].selectedDim;
        if (iDim === undefined && dims.length) {
            iDim = dims[0].val;
        }

        // if iDim is undefined layoutBoxDrop is noop and Dimension tab is not drawn.
        layoutBoxDrop(tabDimensions, '', '', iDim, dims, ({val: iDim}) => {

            popover[0].selectedDim = iDim;

            // rerender the trace popover with added dims data.
            selectTrace({popover, d, data: fullTrace, i: iSelected});
        });

        const dimProp = astr => traceProp(`dimensions[${iDim}].${astr}`);

        textInput(
            tabDimensions, dimProp('label'), 'Label Title',
            inputFreeString(), '', 'input--width-medium'
        );

        var tickFormatRow = selectorRow(tabDimensions, 'Tick Format');

        var formatRowDiv = textInput(
            tickFormatRow, dimProp('tickformat'), '',
            inputFreeString(), '', 'input--width-medium'
        );

        if (formatRowDiv) {
            const link = 'https://github.com/d3/d3-format/blob/master/README.md#locale_format';
            const text = 'See formatting language';
            $(formatRowDiv).append(`&nbsp;<a href=${link} target="_blank">${text}</a>`);
        }

        // CHEATER PLOT DIMENSIONS
        let carpetaxes = [];
        if (fullTrace.aaxis) {
            carpetaxes.push({name: 'aaxis', val: 'aaxis'});
        }

        if (fullTrace.baxis) {
            carpetaxes.push({name: 'baxis', val: 'baxis'});
        }

        // only set selCarpAx if we have carpetaxes in this trace.
        let selCarpAx;
        if (popover[0].selectedCarpetAxes === undefined && carpetaxes.length) {
            selCarpAx = carpetaxes[0].val;
        } else if (carpetaxes.length) {
            selCarpAx = popover[0].selectedCarpetAxes;
        }

        // only set selectedDimensionsTab if we have a selCarpAx
        let selectedDimensionsTab;
        if (popover[0].selectedDimensionsTab === undefined && selCarpAx) {
            selectedDimensionsTab = 'range';
        } else if (selCarpAx) {
            selectedDimensionsTab = popover[0].selectedDimensionsTab;
        }

        const carpAxProp = astr => traceProp(`${selCarpAx}.${astr}`);
        const carpAxRow = selectorRow(tabDimensions, 'Dimension Options');

        // if selCarpAx is undefined layoutBoxDrop is noop and
        // Dimension tab is not drawn.
        layoutBoxDrop(carpAxRow, '', '', selCarpAx, carpetaxes, ({val: v}) => {

            popover[0].selectedCarpetAxes = v;

            // rerender the trace popover with added dims data.
            selectTrace({popover, d, data: fullTrace, i: iSelected});
        });

        const nprop = noopProp().set(selectedDimensionsTab);
        pickOption(carpAxRow, nprop, '', [
            {name: 'Range', val: 'range'},
            {name: 'Lines', val: 'lines'},
            {name: 'Ticks', val: 'ticks'},
            {name: 'Labels', val: 'labels'}
        ], '', false, o => {
            popover[0].selectedDimensionsTab = o.val;

            // rerender the trace popover with added dims data.
            selectTrace({popover, d, data: fullTrace, i: iSelected});
        });

        const axtype = (fullTrace[selCarpAx] || {}).type;
        switch (selectedDimensionsTab) {

        case 'range': {

            pickOption(tabDimensions, carpAxProp('cheatertype'), 'Cheater Type',
                       [
                           {name: 'Index', val: 'index'},
                           {name: 'Value', val: 'value'}
                       ]);

            pickOption(tabDimensions, carpAxProp('categoryorder'), 'Category Order',
                       [
                           {name: TRACE_LABEL, val: 'trace'},
                           {name: 'Ascending', val: 'category ascending'},
                           {name: 'Descending', val: 'category descending'},
                           {name: 'Data', val: 'array'}
                       ]);

            pickOption(tabDimensions, carpAxProp('type'), 'Type', [
                {name: 'Linear', val: 'linear'},
                {name: 'DateTime', val: 'date'},
                {name: 'Category', val: 'category'}
            ]);

            break;
        }

        case 'lines': {

            pickColor(tabDimensions, carpAxProp('color'), 'Color', 'Color');
            const sl = carpAxProp('showline');

            // from the ticks tab, but needed for mirror
            const tp = carpAxProp('ticks');
            const mirrorOptions = [];

            if (sl.get()) {
                mirrorOptions.push({name: 'On', val: true});
                if (tp.get()) {
                    mirrorOptions.push({name: 'With Ticks', val: 'ticks'});
                }
            }

            const axLineRow = selectorRow(tabDimensions, 'Axis line');
            pickOption(axLineRow, sl, '', BOOLEANONOFF);
            pickColor(axLineRow, carpAxProp('linecolor'), '', 'Line Color');
            slider(axLineRow, carpAxProp('linewidth'), '', [0.1,10], 1);

            if (mirrorOptions.length) {
                mirrorOptions.push({name: 'Off', val: false});
                pickOption(tabDimensions, carpAxProp('mirror'),
                           'Mirror', mirrorOptions);
            }

            const backgroundRow = selectorRow(tabDimensions, 'Background');
            pickOption(backgroundRow, carpAxProp('showbackground'),
                       '', BOOLEANONOFF);
            pickColor(backgroundRow, carpAxProp('backgroundcolor'),
                      '', 'Background Color');



            const smoothingRow = selectorRow(tabDimensions, 'Smoothing');
            slider(smoothingRow, carpAxProp('smoothing'), '', [0, 1], 1);

            const gridlineRow = selectorRow(tabDimensions, 'Grid lines');
            pickOption(gridlineRow, carpAxProp('showgrid'), '', BOOLEANONOFF);
            pickColor(gridlineRow, carpAxProp('gridcolor'), '', 'Grid Color');
            slider(gridlineRow, carpAxProp('gridwidth'), '', [0.1, 10], 1);

            const startlineRow = selectorRow(tabDimensions, 'Start line');
            pickOption(startlineRow, carpAxProp('startline'), '', BOOLEANONOFF);
            pickColor(startlineRow, carpAxProp('startlinecolor'), '', 'Start Line Color');
            slider(startlineRow, carpAxProp('startlinewidth'), '', [0.1, 10], 1);

            const endlineRow = selectorRow(tabDimensions, 'End line');
            pickOption(endlineRow, carpAxProp('endline'), '', BOOLEANONOFF);
            pickColor(endlineRow, carpAxProp('endlinecolor'), '', 'End Line Color');
            slider(endlineRow, carpAxProp('endlinewidth'), '', [0.1, 10], 1);

            const minorGridCountRow = selectorRow(tabDimensions, 'Minor grid count');
            slider(minorGridCountRow, carpAxProp('minorgridcount'), '', [0, 10], 0);

            const minorGridRow = selectorRow(tabDimensions, 'Minor Grid');
            pickColor(minorGridRow, carpAxProp('minorgridcolor'), '', 'Minor Grid Color');
            slider(minorGridRow, carpAxProp('minorgridwidth'), '', [0.1, 10], 1);

            break;
        }

        case 'ticks': {
            const tickVals = (gd.data[iSelected][selCarpAx] || {}).tickvals;

            pickOption(tabDimensions, carpAxProp('tickmode'), 'Values', [
                {name: 'Array', val: 'array'},
                {name: 'Linear', val: 'linear'}
            ]);

            slider(tabDimensions, carpAxProp('nticks'), 'Max #', [0,50], 0, 'auto');


            if (carpAxProp('tickmode').get() === 'linear') {
                textInput(tabDimensions, carpAxProp('tick0'), 'Reference', inputAxRange(axtype));

                if (axtype==='linear' || axtype==='category') {
                    textInput(tabDimensions, carpAxProp('dtick'),
                              'Spacing', inputAxRange('linear'));
                }
                else if (axtype === 'date') {
                    pickOption(tabDimensions, carpAxProp('dtick'), 'Spacing', [
                        {name: 'Minute', val: 60000},
                        {name: 'Hour', val: 3600000},
                        {name: 'Day', val: 86400000},
                        {name: 'Week', val: 6.048e8},
                        {name: 'Month', val: 'M1'},
                        {name: 'Year', val: 'M12'}
                    ]);
                }
                else if(axtype === 'log') {
                    pickOption(tabDimensions, carpAxProp('dtick'), 'Spacing', [
                        {name: 'x10', val: 1},
                        {name: '1/2/5', val: 'D2'},
                        {name: 'all digits', val: 'D1'}
                    ]);
                }
            }

            break;
        }

        case 'labels': {
            textInput(tabDimensions, carpAxProp('title'),
                      'Label Title', inputFreeString());
            fontPicker(tabDimensions, carpAxProp('titlefont'), 'Title Font');

            slider(tabDimensions, carpAxProp('titleoffset'), 'Title Offset', [-100, 100], 0);

            pickOption(tabDimensions, carpAxProp('showticklabels'), 'Tick Labels', [
                {name: 'Both', val: 'both'},
                {name: 'Start', val: 'start'},
                {name: 'End', val: 'end'},
                {name: 'None', val: 'none'}
            ]);

            fontPicker(tabDimensions, carpAxProp('tickfont'), 'Tick Font');

            angleSlider(tabDimensions, carpAxProp('tickangle'), 'Angle');

            pickOption(tabDimensions, carpAxProp('exponentformat'), 'Exponents', [
                {name: '000', val: 'none'},
                {name: 'e+6', val: 'e'},
                {name: 'E+6', val: 'E'},
                {name: '&times;10<sup>6</sup>', val: 'power'},
                {name: 'k/M/G', val: 'SI'},
                {name: 'k/M/B', val: 'B'}
            ]);
            pickOption(tabDimensions, carpAxProp('showexponent'), 'Show Exp', [
                {name: 'All', val: 'all'},
                {name: 'First', val: 'first'},
                {name: 'Last', val: 'last'},
                {name: 'None', val: 'none'}
            ]);

            const tickPrefixRow = selectorRow(tabDimensions, 'Tick Prefixes');
            textInput(tickPrefixRow, carpAxProp('tickprefix'),
                      '', inputFreeString());
            pickOption(tickPrefixRow, carpAxProp('showtickprefix'), '', [
                {name: 'All', val: 'all'},
                {name: 'First', val: 'first'},
                {name: 'Last', val: 'last'},
                {name: 'None', val: 'none'}
            ]);

            const tickSuffixRow = selectorRow(tabDimensions, 'Tick Suffixes');
            textInput(tickSuffixRow, carpAxProp('ticksuffix'),
                      '', inputFreeString());
            pickOption(tickSuffixRow, carpAxProp('showticksuffix'), '', [
                {name: 'All', val: 'all'},
                {name: 'First', val: 'first'},
                {name: 'Last', val: 'last'},
                {name: 'None', val: 'none'}
            ]);

            textInput(tabDimensions, carpAxProp('tickformat'),
                      'Custom format', inputFreeString());
            break;
        }

        default:
            break;
        }



        // boom
        popover[0].showTabs();
    }

    function tickmodeOptions(tickvals, axtype) {
        var opts = [{name: 'Auto', val: 'auto'}];

        if (['linear', '-', 'category'].indexOf(axtype)!==-1) {
            opts.push({name: 'Linear', val: 'linear'});
        }

        if(Array.isArray(tickvals)) {
            opts.push({name: 'Array', val: 'array'});
        }

        return opts;
    }

    // pick a colorscale
    function gradientButton(s,astr,scaleName){
        var $s = $(s),
            ob = $('<button class="editboxbutton gradient active '+
            scaleName+'"></button></div>').appendTo($s),
            scale = Plotly.Colorscale.scales[scaleName];


        ob.click(function() {
            // wrap in array so restyle handles properly... otherwise
            // will attempt to pass each part of the array to a separate trace
            var result = {astr:astr, val: [scale]};
            $s.parents('.slideout')[0].applyChange(result);
        });

        $s.toggleClass('empty-item', false);
    }

    // add all of these colorscales to css dynamically,
    // so we don't have to keep them in sync manually
    // dynamic stylesheet, see http://davidwalsh.name/add-rules-stylesheets
    // css syntax from http://www.colorzilla.com/gradient-editor/
    (function() {
        function pct(v){
            return String(Math.round((1 - v[0]) * 100)) + '%';
        }

        for(var scaleName in Plotly.Colorscale.scales) {
            var scale = Plotly.Colorscale.scales[scaleName],
                list1 = '', // color1 0%, color2 12%, ...
                list2 = ''; // color-stop(0%,color1), color-stop(12%,color2) ...

            for(var i=scale.length-1; i>=0; i--) {
                list1 += ', ' + scale[i][1] + ' ' + pct(scale[i]);
                list2 += ', color-stop(' + pct(scale[i]) + ',' + scale[i][1] + ')';
            }

            var rule =
                // old browsers with no supported gradients -
                // shouldn't matter to us as they won't have svg anyway?
                'background: ' + scale[scale.length-1][1] + ';' +
                // FF 3.6+
                'background: -moz-linear-gradient(top' + list1 + ');' +
                // Chrome,Safari4+
                'background: -webkit-gradient(linear, left top, left bottom' + list2 + ');' +
                // Chrome10+,Safari5.1+
                'background: -webkit-linear-gradient(top' + list1 + ');' +
                // Opera 11.10+
                'background: -o-linear-gradient(top' + list1 + ');' +
                // IE10+
                'background: -ms-linear-gradient(top' + list1 + ');' +
                // W3C
                'background: linear-gradient(to bottom' + list1 + ');' +
                // IE6-9 (only gets start and end colors)
                'filter: progid:DXImageTransform.Microsoft.gradient(' +
                    'startColorstr="' + scale[scale.length-1][1] +
                    '",endColorstr="' + scale[0][1] + '",GradientType=0);';

            Plotly.Lib.addStyleRule('.' + scaleName, rule);
        }
    }());

    // routine for making modified-attribute trace lists
    function tModify(tDefault, o, modAll){
        if ($.isPlainObject(o)) o=[o];
        var tModAll = Plotly.Lib.minExtend(tDefault, modAll);

        return o.map(function(oi) {
            return [{trace: Plotly.Lib.minExtend(tModAll, oi)}];
        });
    }

    // extension of tModify that re-fills defaults, in case of containers or
    // attributes that need to be created in the modified trace
    // don't do this unless we need to, as it takes longer
    var DEFAULT_LAYOUT = {};
    Plotly.Plots.supplyLayoutGlobalDefaults({}, DEFAULT_LAYOUT);
    function tModifyFix(tDefault, o, modAll){
        var calcdata = tModify(tDefault._inputRef || tDefault, o, modAll);
        // Plotly.Plots.supplyLayoutGlobalDefaults({}, fullLayout);
        return calcdata.map(function(cd) {
            return [{
                trace: Plotly.Plots.supplyTraceDefaults(cd[0].trace, tDefault.index, DEFAULT_LAYOUT)
            }];
        });
    }

    // -----------------------------------------------------
    // Layout popover
    // -----------------------------------------------------

    toolPanel.cartesian.layoutBox = function() {
        renderSlideoutPanel(gd, {
            cls: 'layoutbox js-layout-box-panel cartesian',
            content: layoutBoxContent,
            tabs: ['General', 'Margins', 'Geo layout', 'Geo style']
        });
    };

    function layoutBoxContent(popover){
        var gd = popover[0].gd,
            fullLayout = gd._fullLayout,
            tabGeneral = popover.find('#layoutbox-0'),
            tabMargins = popover.find('#layoutbox-1'),
            tabBasemap = popover.find('#layoutbox-2'),
            tabBasemapStyle = popover.find('#layoutbox-3'),
            sceneIds = Plotly.Plots.getSubplotIds(fullLayout, 'gl3d'),
            geoIds = Plotly.Plots.getSubplotIds(fullLayout, 'geo');

        popover[0].empty();

        function glProp(astr) {
            return Plotly.Lib.nestedProperty(fullLayout, astr);
        }

        fontPicker(tabGeneral, glProp('font'), 'Global Font');
        fontPicker(tabGeneral, glProp('titlefont'), 'Title Font');
        pickOption(tabGeneral, glProp('autosize'), 'Autosize', BOOLEANONOFF);
        textInput(tabGeneral, glProp('width'), 'Width', inputBetween(10, 10000));
        textInput(tabGeneral, glProp('height'), 'Height', inputBetween(10, 10000));

        var sceneModes = Plotly.Gl3dLayout.layoutAttributes.aspectmode.values.map( function (val) {
            return {name: Plotly.Lib.titleCase(val), val: val};
        });

        var aspectTest = {
            test: function(v) { return (v>0); },
            errortext: 'Must be a positive number',
            converttoinput: function(v){ return (v===null) ? '' : String(v); },
            convertfrominput: function(v){ return Number(v); }
        };

        sceneIds.forEach( function (sceneId) {
            var sceneName = 'S' + sceneId.substr(1);
            pickOption(tabGeneral, glProp(sceneId + '.aspectmode'), sceneName + ' Aspect Mode', sceneModes);
            var aspectRow = selectorRow(tabGeneral, 'Aspect Ratio [x,y,z]');
            textInput(aspectRow, glProp(sceneId + '.aspectratio.x'), '', aspectTest);
            textInput(aspectRow, glProp(sceneId + '.aspectratio.y'), '', aspectTest);
            textInput(aspectRow, glProp(sceneId + '.aspectratio.z'), '', aspectTest);
        });

        sceneIds.forEach( function (sceneId) {
            var title = 'S' + sceneId.substr(1) + ' color';
            pickColor(tabGeneral, glProp(sceneId + '.bgcolor'), title, title);
        });

        geoIds.forEach(function(geoId) {
            var title = 'G' + geoId.substr(1) + ' color';
            pickColor(tabGeneral, glProp(geoId + '.bgcolor'), title, title);
        });

        pickColor(tabGeneral, glProp('plot_bgcolor'), 'Plot Color', 'Plot Color');

        pickOption(tabGeneral, glProp('separators'), '# Format', [
            {name: '1,234.0', val: '.,'},
            {name: '1.234,0', val: ',.'},
            {name: '1 234.0', val: '. '},
            {name: '1 234,0', val: ', '},
            {name: '1234.0', val: '.'}
        ]);
        if(gd.shouldshowsources && !toolPanel.isGL3D(gd)) {
            pickOption(tabGeneral, glProp('hidesources'), 'Source links', [
                {name: 'Show', val: false},
                {name: 'Hide', val: true}
            ]);
        }

        pickColor(tabMargins, glProp('paper_bgcolor'), 'Margin Color', 'Margin Color');

        textInput(tabMargins, glProp('margin.t'), '&nbsp;', inputBetween(0, 1000), 'inputcenter');
        var marginLRRow = selectorRow(tabMargins, 'Margins');
        textInput(marginLRRow, glProp('margin.l'), '', inputBetween(0, 1000));
        textInput(marginLRRow, glProp('margin.r'), '', inputBetween(0,1000));
        textInput(tabMargins, glProp('margin.b'), '&nbsp;', inputBetween(0, 1000), 'inputcenter');

        pickOption(tabMargins, glProp('margin.autoexpand'), 'Auto Expand', BOOLEANONOFF);
        slider(tabMargins, glProp('margin.pad'), 'Plot Padding', [0, 20], 0);

        geoIds.forEach(function(geoId) {
            var num = geoIdToNum(geoId);

            layoutBoxDrop(tabBasemap, geoId + '.scope', 'Scope' + num,
                fullLayout[geoId].scope,
                Plotly.GeoLayout.layoutAttributes.scope.values.map(function(v) {
                    return {
                        name: v==='usa' ? v.toUpperCase() : Plotly.Lib.titleCase(v),
                        val: v
                    };
                })
            );

            layoutBoxDrop(tabBasemap, geoId + '.projection.type', 'Type' + num,
                fullLayout[geoId].projection.type,
                Plotly.GeoLayout.layoutAttributes.projection.type.values.map(function(v) {
                    return {name: Plotly.Lib.titleCase(v), val: v};
                })
            );

            var rotationRow = selectorRow(tabBasemap, 'Rotation' + num);
            textInput(rotationRow, glProp(geoId + '.projection.rotation.lon'), '', inputBetween(-180, 180));
            textInput(rotationRow, glProp(geoId + '.projection.rotation.lat'), '', inputBetween(-90, 90));
            textInput(rotationRow, glProp(geoId + '.projection.rotation.roll'), '', inputBetween(-180, 180));

            var parallelsRow = selectorRow(tabBasemap, 'parallels' + num);
            textInput(parallelsRow, glProp(geoId + '.projection.parallels[0]'), '', inputBetween(-90, 90));
            textInput(parallelsRow, glProp(geoId + '.projection.parallels[1]'), '', inputBetween(-90, 90));
        });

        geoIds.forEach(function(geoId) {
            var num = geoIdToNum(geoId);

            var coastlinesRow = selectorRow(tabBasemapStyle, 'Coastlines' + num);
            pickOption(coastlinesRow, glProp(geoId + '.showcoastlines'), '', BOOLEANONOFF);
            pickColor(coastlinesRow, glProp(geoId + '.coastlinecolor'), '', 'color');
            slider(coastlinesRow, glProp(geoId + '.coastlinewidth'), '', [0.1, 10], 1);

            var oceanRow = selectorRow(tabBasemapStyle, 'Ocean' + num);
            pickOption(oceanRow, glProp(geoId + '.showocean'), '', BOOLEANONOFF);
            pickColor(oceanRow, glProp(geoId + '.oceancolor'), '', 'color');

            var landRow = selectorRow(tabBasemapStyle, 'Land' + num);
            pickOption(landRow, glProp(geoId + '.showland'), '', BOOLEANONOFF);
            pickColor(landRow, glProp(geoId + '.landcolor'), '', 'color');

            var lakesRow = selectorRow(tabBasemapStyle, 'Lakes' + num);
            pickOption(lakesRow, glProp(geoId + '.showlakes'), '', BOOLEANONOFF);
            pickColor(lakesRow, glProp(geoId + '.lakecolor'), '', 'color');

            var riversRow = selectorRow(tabBasemapStyle, 'Rivers' + num);
            pickOption(riversRow, glProp(geoId + '.showrivers'), '', BOOLEANONOFF);
            pickColor(riversRow, glProp(geoId + '.rivercolor'), '', 'color');
            slider(riversRow, glProp(geoId + '.riverwidth'), '', [0.1, 2], 0.2);

            var countriesRow = selectorRow(tabBasemapStyle, 'Countries' + num);
            pickOption(countriesRow, glProp(geoId + '.showcountries'), '', BOOLEANONOFF);
            pickColor(countriesRow, glProp(geoId + '.countrycolor'), '', 'color');
            slider(countriesRow, glProp(geoId + '.countrywidth'), '', [0.1, 5], 1);

            var subunitsRow = selectorRow(tabBasemapStyle, 'Subunits' + num);
            pickOption(subunitsRow, glProp(geoId + '.showsubunits'), '', BOOLEANONOFF);
            pickColor(subunitsRow, glProp(geoId + '.subunitcolor'), '', 'color');
            slider(subunitsRow, glProp(geoId + '.subunitwidth'), '', [0.1, 5], 1);

            var frameRow = selectorRow(tabBasemapStyle, 'Frame' + num);
            pickOption(frameRow, glProp(geoId + '.showframe'), '', BOOLEANONOFF);
            pickColor(frameRow, glProp(geoId + '.framecolor'), '', 'color');
            slider(frameRow, glProp(geoId + '.framewidth'), '', [0.1, 5], 1);
      });

    }

    // -----------------------------------------------------
    // Axes styling popover
    // -----------------------------------------------------

    // axis='allaxes', 'xaxis', 'yaxis', etc
    toolPanel.cartesian.axesBox = function(axis0) {
        var axestabs = ['Range', 'Lines', 'Ticks', 'Labels', 'Layout', 'Spikes'];

        function axesBoxContent(popover, axis){
            var axes = [{name: 'All Axes', val: 'allaxes'}]
                    .concat(Plotly.Axes.list(gd).map(function(ax) {
                        return {
                            name: ax._id.charAt(0).toUpperCase()+' Axis'+
                                (ax._id.length>1 ? ' '+ax._id.substr(1) : ''),
                            val: ax._name
                        };
                    })),
                titlediv = popover.find('.trace-dropdown').html('');
            popover[0].axes = axes;

            if(!axis) axis = popover[0].axis;

            var axdata = axes[0],
                axi = 0;
            axes.forEach(function(a,i){
                if(a.val===axis) {
                    axdata=a;
                    axi=i;
                }
            });

            popover[0].axis = axdata.val;

            // TODO: convert to multi-select along the left side
            layoutBoxDrop(titlediv, '', '', axdata, axes, selectAxis);

            // TODO add +/- scene buttons
            if(!gd._fullLayout._hasGL3D) {

                titlediv.append(
                    '<button class="btn btn--plain btn--neighbor js-axes-button js-new-axis">' +
                        '<i class="icon-plus"></i></button>' +
                    '<button class="btn btn--plain btn--neighbor js-axes-button js-delete-axis">' +
                        '<i class="icon-minus"></i></button>');
                titlediv.find('.js-delete-axis').click(function(){
                    var delaxis = popover[0].selectedObj,
                        axletter = delaxis.charAt(0),
                        axlist = Plotly.Axes.list(gd,axletter);
                    if(delaxis==='allaxes') {
                        return toolPanel.notifier('Select a single axis to remove', 3000);
                    }
                    if(axlist.length===1) {
                        return toolPanel.notifier('Cannot remove the last '+axletter.toUpperCase()+' axis.', 3000);
                    }

                    queue.startSequence(gd);
                    // do we have to move any traces to another axis?
                    var changeTraces = [],
                        prev;
                    (gd._fullData||[]).forEach(function(d,i) {
                        if(d[axletter+'axis']===gd._fullLayout[delaxis]._id) changeTraces.push(i);
                    });
                    if(changeTraces.length) {
                        prev = Plotly.restyle(gd,axletter+'axis', axlist[0]._name, changeTraces);
                    }
                    else prev = Promise.resolve();
                    // relayout to null removes the item from gd.layout
                    prev.then(function(){
                        Plotly.relayout(gd, delaxis, null);
                    }).then(function() {
                        queue.stopSequence(gd);
                        popover[0].redraw();
                    });
                });

                titlediv.find('.js-new-axis').click(function(){ makeNewAxes(gd, popover); });

            }

            selectAxis({popover: popover, d: axdata, i: axi});
        }

        renderSlideoutPanel(gd, {
            cls: 'axesbox js-axes-box-content cartesian',
            content: axesBoxContent,
            arg: axis0||'allaxes',
            tabs: axestabs
        });
    };

    function selectAxis(o) {
        var d = o.d,
            popover = o.popover,
            tabRange = popover.find('#axesbox-0'),
            tabLines = popover.find('#axesbox-1'),
            tabTicks = popover.find('#axesbox-2'),
            tabLabels = popover.find('#axesbox-3'),
            tabLayout = popover.find('#axesbox-4'),
            tabSpikes = popover.find('#axesbox-5'),
            ax = d.val,
            gd = popover[0].gd,
            fullLayout = gd._fullLayout,
            axes = popover[0].axes;

        popover[0].empty();

        popover.find('.trace-dropdown .selected-val')
            .html(popover.find('.trace-dropdown li > a')[o.i].innerHTML);

        // attach the axis objects to axes
        var hasOneAxis = false;
        axes.slice(1).forEach(function(axisObj) {
            var ax  = Plotly.Lib.nestedProperty(
                fullLayout, getAxesSelector(axisObj)).get();
            axisObj.ax = ax;
            if(ax !== undefined) hasOneAxis = true;
        });

        if(!hasOneAxis) {
            toolPanel.notifier('This graph does not have any axes.', 3000);
            killPopovers();
            return;
        }

        if(d.val===axes[0].val) {
            // "all axes" - merge attributes together
            d.ax = $.extend(true, {}, axes[1].ax);
            axes.slice(2).forEach(function(axisObj) {
                Object.keys(axisObj.ax).forEach(function(k) {
                    if(typeof axisObj.ax[k]!=='function' && k.charAt(0)!=='_') {
                        mergeAttr(d.ax, axisObj.ax, k);
                    }
                });
            });
        }
        // single axis - just pluck it out
        else d.ax = axes[o.i].ax;

        function axProp(astr, displayOverride) {
            var prop = conditionalProp(d.ax, astr, displayOverride);
            prop.astr = getAxesSelector(d, astr);
            return prop;
        }

        popover[0].axis = ax;
        popover[0].selectedObj = ax;

        var axtype = d.ax.type,
            axletter = ax.charAt(0),
            ax3D = (axletter==='a' && fullLayout._hasGL3D) || (d.ax._id.indexOf('scene')!==-1),
            parallelAxes = Plotly.Axes.listIds(gd,axletter)
                .filter(function(axId){ return axId!==Plotly.Axes.name2id(ax); }),
            counterAxes = Plotly.Axes.listIds(gd,{x: 'y', y: 'x'}[axletter]);

        // Range tab
        pickOption(tabRange, axProp('type'), 'Type', [
            {name: 'Linear', val: 'linear'},
            {name: 'Log', val: 'log'},
            {name: 'DateTime', val: 'date'},
            {name: 'Category', val: 'category'}
        ]);

        var autorangeRow = selectorRow(tabRange, 'Autorange');
        pickOption(autorangeRow, axProp('autorange'), '', BOOLEANONOFF);

        var axisRangemodeOptions = [
            {name: 'Normal', val: 'normal'},
            {name: 'With Zero', val: 'tozero'},
            {name: 'Non-negative', val: 'nonnegative'}
        ];

        if (ax3D) axisRangemodeOptions.pop();

        pickOption(autorangeRow, axProp('rangemode'), '', axisRangemodeOptions);

        var axrangeRow = selectorRow(tabRange, 'Range');
        textInput(axrangeRow, axProp('range[0]'), '', inputAxRange(axtype));
        textInput(axrangeRow, axProp('range[1]'), '', inputAxRange(axtype));

        if (!ax3D) { // TODO
            pickOption(axrangeRow, axProp('reverse', true), '', [{name: 'Reverse', val: true}]);
        }

        pickOption(tabRange, axProp('fixedrange'), 'Zoom / pan', [
            {name: 'Interactive', val: false},
            {name: 'Fixed', val: true}
        ]);

        // Lines tab
        var sl = axProp('showline'),
            tp = axProp('ticks'), // from the ticks tab, but needed for mirror
            mirrorOptions = [];
        if(sl.get()) {
            mirrorOptions.push({name: 'On', val: true});
            if(tp.get()) mirrorOptions.push({name: 'With Ticks', val: 'ticks'});
        }

        var axLineRow = selectorRow(tabLines, 'Axis line');
        pickOption(axLineRow, sl, '', BOOLEANONOFF);
        pickColor(axLineRow, axProp('linecolor'), '', 'Line Color');
        slider(axLineRow, axProp('linewidth'), '', [0.1,10], 1);

        if(mirrorOptions.length) {
            mirrorOptions.push({name: 'Off', val: false});
            if(counterAxes.length>1) {
                mirrorOptions.push({name: 'All', val: 'all'});
                if(tp.get()) mirrorOptions.push({name: 'All + Ticks', val: 'allticks'});
            }
            pickOption(tabLines, axProp('mirror'), 'Mirror', mirrorOptions);
        }

        var backgroundRow = selectorRow(tabLines, 'Background');
        pickOption(backgroundRow, axProp('showbackground'), '', BOOLEANONOFF);
        pickColor(backgroundRow, axProp('backgroundcolor'), '', 'Background Color');

        var gridlineRow = selectorRow(tabLines, 'Grid lines');
        pickOption(gridlineRow, axProp('showgrid'), '', BOOLEANONOFF);
        pickColor(gridlineRow, axProp('gridcolor'), '', 'Grid Color');
        slider(gridlineRow, axProp('gridwidth'), '', [0.1, 10], 1);

        var zerolineRow = selectorRow(tabLines, 'Zero line');
        pickOption(zerolineRow, axProp('zeroline'), '', BOOLEANONOFF);
        pickColor(zerolineRow, axProp('zerolinecolor'), '', 'Zero Line Color');
        slider(zerolineRow, axProp('zerolinewidth'), '', [0.1,10], 1);

        // Ticks tab
        // var autooptions = [{name: 'Auto', val: true}];
        // if (['linear', '-', 'category'].indexOf(axtype)!==-1) {
        //     autooptions.push({name: 'Manual', val: false});
        // }
        pickOption(tabTicks, axProp('tickmode'), 'Values',
            tickmodeOptions((gd.layout[d.ax._name] || {}).tickvals, axtype));
        slider(tabTicks, axProp('nticks'), 'Max #', [0,50], 0, 'auto');
        textInput(tabTicks, axProp('tick0'), 'Reference', inputAxRange(axtype));
        if(axtype==='linear' || axtype==='category') {
            textInput(tabTicks, axProp('dtick'), 'Spacing', inputAxRange('linear'));
        }
        else if(axtype === 'date') {
            pickOption(tabTicks, axProp('dtick'), 'Spacing', [
                {name: 'Minute', val: 60000},
                {name: 'Hour', val: 3600000},
                {name: 'Day', val: 86400000},
                {name: 'Week', val: 6.048e8},
                {name: 'Month', val: 'M1'},
                {name: 'Year', val: 'M12'}
            ]);
        }
        else if(axtype === 'log') {
            pickOption(tabTicks, axProp('dtick'), 'Spacing', [
                {name: 'x10', val: 1},
                {name: '1/2/5', val: 'D2'},
                {name: 'all digits', val: 'D1'}
            ]);
        }

        var tickPositionOptions = [
            {name: 'Outside', val: 'outside'},
            {name: 'Inside', val: 'inside'},
            {name: 'None', val: ''}
        ];

        if (ax3D) tickPositionOptions.splice(1, 1);

        pickOption(tabTicks, tp, 'Position', tickPositionOptions);

        slider(tabTicks, axProp('ticklen'), 'Length', [0, 20], 0);
        slider(tabTicks, axProp('tickwidth'), 'Width', [0.1, 10], 1);
        pickColor(tabTicks, axProp('tickcolor'), 'Color', 'Tick Color');

        // Labels tab
        textInput(tabLabels, axProp('title'), 'Label Title', inputFreeString());
        fontPicker(tabLabels, axProp('titlefont'), 'Title Font');

        pickOption(tabLabels, axProp('showticklabels'), 'Tick Labels', BOOLEANONOFF);
        fontPicker(tabLabels, axProp('tickfont'), 'Tick Font');

        angleSlider(tabLabels, axProp('tickangle'), 'Angle');

        pickOption(tabLabels, axProp('exponentformat'), 'Exponents', [
            {name: '000', val: 'none'},
            {name: 'e+6', val: 'e'},
            {name: 'E+6', val: 'E'},
            {name: '&times;10<sup>6</sup>', val: 'power'},
            {name: 'k/M/G', val: 'SI'},
            {name: 'k/M/B', val: 'B'}
        ]);
        pickOption(tabLabels, axProp('showexponent'), 'Show Exp', [
            {name: 'All', val: 'all'},
            {name: 'First', val: 'first'},
            {name: 'Last', val: 'last'},
            {name: 'None', val: 'none'}
        ]);

        var tickPrefixRow = selectorRow(tabLabels, 'Tick Prefixes');
        textInput(tickPrefixRow, axProp('tickprefix'), '', inputFreeString());
        pickOption(tickPrefixRow, axProp('showtickprefix'), '', [
            {name: 'All', val: 'all'},
            {name: 'First', val: 'first'},
            {name: 'Last', val: 'last'},
            {name: 'None', val: 'none'}
        ]);

        var tickSuffixRow = selectorRow(tabLabels, 'Tick Suffixes');
        textInput(tickSuffixRow, axProp('ticksuffix'), '', inputFreeString());
        pickOption(tickSuffixRow, axProp('showticksuffix'), '', [
            {name: 'All', val: 'all'},
            {name: 'First', val: 'first'},
            {name: 'Last', val: 'last'},
            {name: 'None', val: 'none'}
        ]);

        textInput(tabLabels, axProp('tickformat'), 'Custom format', inputFreeString());
        textInput(tabLabels, axProp('hoverformat'), 'Hover format', inputFreeString());

        var useSpikes = axProp('showspikes');
        pickOption(tabSpikes, useSpikes, 'Show spikes', BOOLEANONOFF);
        pickOption(tabSpikes, axProp('spikesides'), 'Show sides', BOOLEANONOFF);
        slider(tabSpikes, axProp('spikethickness'), 'Thickness', [0, 10], 1);
        pickColor(tabSpikes, axProp('spikecolor'), 'Color', 'Spike Color');

        if(axletter!=='a' && counterAxes.length) {
            var anchorRow = selectorRow(tabLayout, 'Anchor to');
            pickOption(anchorRow, axProp('anchor'), '',
                [{name: 'Free', val: 'free'}].concat(counterAxes.map(AXOPTION)));
            pickOption(anchorRow,
                axProp('side'),
                '',
                axletter==='x' ?
                    [{name: 'Bottom', val: 'bottom'},{name: 'Top', val: 'top'}] :
                    [{name: 'Left', val: 'left'},{name: 'Right', val: 'right'}]
            );
            slider(tabLayout, axProp('position'), 'Position', [0,1], 2);

            var overlaying = axProp('overlaying');
            if(parallelAxes.length) {
                pickOption(tabLayout, overlaying, 'Overlaying',
                    [{name: 'None', val: false}]
                    .concat(parallelAxes
                        .filter(function(axId){
                            return !fullLayout[Plotly.Axes.id2name(axId)].overlaying;
                        })
                        .map(AXOPTION)
                    )
                );
            }
            if(!(overlaying.get() && parallelAxes.length)) {
                // TODO: two-handled slider
                var d0 = d.ax.domain[0],
                    d1 = d.ax.domain[1];
                var domainRow = selectorRow(tabLayout, 'Span');
                slider(domainRow, axProp('domain[0]'), '', [0,Math.min(0.98,d1-0.01)], 2);
                slider(domainRow, axProp('domain[1]'), '', [Math.max(0.02,d0+0.01),1], 2);
            }
        }

        if(axletter==='a' && Plotly.Axes.list(gd,'',true).length) {
            tabLayout
                .html('<p>Select a single axis to edit its layout properties</p>')
                .toggleClass('empty-item', false);
        }

        popover[0].showTabs();
    }

    // axisObj is the object given created by axesBox that has
    // {name: 'X Axes scene2', val: 'xaxis'} structure.
    // this function will return the nested selector string for an
    // axes object. 'scene2.xaxis.type' or 'xaxis.type'
    function getAxesSelector (axisObj, attr) {
        var scene = axisObj.name.substr(7);
        var axisAttr = (scene.indexOf('scene') > -1) ? (scene + '.') : '';
        axisAttr += axisObj.val + (attr ? '.' + attr : '');
        return axisAttr;
    }

    function nextAxis(gd,axletter){
        var axname = axletter + 'axis',
            axnum = 1;
        while(gd._fullLayout[axname]) {
            axnum++;
            axname = axletter + 'axis'+axnum;
        }
        return axname.replace('axis', '');
    }

    function makeNewAxes(gd,popover,traceset){
        var tabContainer = $('.js-minimal-tabs-container');
        var overlay = $(makeAxesTemplate);

        if($.isNumeric(traceset)) traceset = [traceset];

        var subplots = Plotly.Axes.getSubplots(gd),
            trace0 = traceset && traceset.length ? gd._fullData[traceset[0]] : '',
            tracenames = trace0 &&
                (`For ${TRACE_LABEL.toLowerCase()}: ${trace0.name} ` +
                 (traceset.length>1 ? (` and ${traceset.length-1} more`) : '')),
            baselink = overlay.find('#new-axes-base-subplot').html(''),
            defaultSubplot = trace0 ? trace0.xaxis+trace0.yaxis : subplots[0];

        overlay.find('#new-axes-tracename').text(tracenames);

        if(subplots.length>1) {
            var spgroup = baselink
                .html('<p>Based on: <div class="btn-group"></div></p>')
                .find('.btn-group');

            subplots.forEach(function(sp) {
                $('<button class="btn btn--plain btn--small editboxbutton" data-subplotid="'+sp+'">' + sp.toUpperCase() + '</button>')
                .appendTo(spgroup)
                .toggleClass('active', sp===defaultSubplot)
                .click(function() {
                    $(this).parent().find('.btn').removeClass('active');
                    $(this).addClass('active');
                });
            });
        }

        overlay.find('#new-axes-go')
            .unbind('click.plotly')
            .bind('click.plotly',function(){
                // here's where we make the new axes
                // axtype can be right-y, stacked-y, free-y, top-x, side-x, free-x,
                // stacked-subplot, side-subplot, or inset-subplot
                var fullLayout = gd._fullLayout,
                    axtype = overlay.find('input[name="new-axes"]:checked').val(),
                    baseAxes = (baselink.find('.active').attr('data-subplotid')||'xy')
                        .match(/^(x[0-9]*)(y[0-9]*)$/),
                    baseX = fullLayout[Plotly.Axes.id2name(baseAxes[1])],
                    baseY = fullLayout[Plotly.Axes.id2name(baseAxes[2])],
                    dX = function(frac){ return (1-frac)*baseX.domain[0] + frac*baseX.domain[1]; },
                    dY = function(frac){ return (1-frac)*baseY.domain[0] + frac*baseY.domain[1]; },
                    newxid = nextAxis(gd, 'x'),
                    newyid = nextAxis(gd, 'y'),
                    newx, newy,
                    layoutAttrs = {},
                    styleAttrs = {};
                if(axtype==='right-y') {
                    newy = {
                        overlaying:baseY._id,
                        side: 'right',
                        anchor:baseX._id
                    };
                }
                else if(axtype==='stacked-y') {
                    newy = {
                        anchor:baseX._id,
                        domain:[dY(0.55),dY(1)]
                    };
                    layoutAttrs[baseY._name+'.domain[1]'] = dY(0.45);
                }
                else if(axtype==='free-y') {
                    newy = {
                        overlaying:baseY._id,
                        side: 'left',
                        anchor: 'free',
                        position: dX(0)
                    };
                    layoutAttrs[baseX._name+'.domain[0]'] = dX(0.1);
                }
                else if(axtype==='top-x') {
                    newx = {
                        overlaying:baseX._id,
                        side: 'top',
                        anchor:baseY._id
                    };
                }
                else if(axtype==='side-x') {
                    newx = {
                        anchor:baseY._id,
                        domain:[dX(0.55),dX(1)]
                    };
                    layoutAttrs[baseX._name+'.domain[1]'] = dX(0.45);
                }
                else if(axtype==='free-x') {
                    newx = {
                        overlaying:baseX._id,
                        side: 'bottom',
                        anchor: 'free',
                        position: dY(0)
                    };
                    layoutAttrs[baseY._name+'.domain[0]'] = dY(0.1);
                }
                else if(axtype==='stacked-subplot') {
                    newx = {
                        anchor: newyid,
                        domain: baseX.domain.slice()
                    };
                    newy = {
                        anchor: newxid,
                        domain: [dY(0.55),dY(1)]
                    };
                    layoutAttrs[baseY._name+'.domain[1]'] = dY(0.45);
                }
                else if(axtype==='side-subplot') {
                    newx = {
                        anchor: newyid,
                        domain: [dX(0.55),dX(1)]
                    };
                    newy = {
                        anchor: newxid,
                        domain: baseY.domain.slice()
                    };
                    layoutAttrs[baseX._name+'.domain[1]'] = dX(0.45);
                }
                else if(axtype==='inset-subplot') {
                    newx = {
                        anchor: newyid,
                        domain: [dX(0.6), dX(0.95)]
                    };
                    newy = {
                        anchor: newxid,
                        domain: [dY(0.6), dY(0.95)]
                    };
                }
                else console.log('unrecognized axtype');

                // prepare for and call relayout (and restyle if needed)
                if(newx) {
                    let xname = Plotly.Axes.id2name(newxid);
                    Object.keys(newx).forEach(function(key) {
                        var val = newx[key];
                        layoutAttrs[`${xname}.${key}`] = val;
                    });

                    styleAttrs.xaxis = newxid;
                }
                if(newy) {
                    let yname = Plotly.Axes.id2name(newyid);
                    Object.keys(newy).forEach(function(key) {
                        var val = newy[key];
                        layoutAttrs[`${yname}.${key}`] = val;
                    });
                    styleAttrs.yaxis = newyid;
                }

                queue.startSequence(gd);
                Plotly.relayout(gd, layoutAttrs).then(function(){
                    if(traceset) {
                        return Plotly.restyle(gd, styleAttrs, traceset);
                    }
                }).then(function(){
                    queue.stopSequence(gd);

                    popover[0].redraw(traceset ||
                        (newx && Plotly.Axes.id2name(newxid)) ||
                        (newy && Plotly.Axes.id2name(newyid)));
                });
            });

        overlay.find('.toolpanel-overlay__close').click(function() {
            toolPanel.removeOverlays();
        });

        toolPanel.showOverlay(overlay);
    }

    // -----------------------------------------------------
    // Legend styling popover
    // -----------------------------------------------------

    toolPanel.cartesian.legendBox = function() {
        Plotly.Legend.draw(gd);
        renderSlideoutPanel(gd, {
            cls: 'legendbox js-legend-box cartesian',
            content: legendBoxContent
        });
    };

    function legendBoxContent(popover) {
        var gd = popover[0].gd,
            pc = popover.find('#legendbox-0');

        popover[0].empty();

        function glProp(astr) {
            return Plotly.Lib.nestedProperty(gd._fullLayout, astr);
        }

        pickOption(pc, glProp('showlegend'), 'Visible?', BOOLEANSHOWHIDE);
        pickOption(pc, glProp('legend.traceorder'), `${TRACE_LABEL} order`, [
            {name: 'Normal', val: 'normal'},
            {name: 'Reversed', val: 'reversed'}
        ]);
        fontPicker(pc,glProp('legend.font'), 'Font');
        pickColor(pc, glProp('legend.bgcolor'), 'Background', 'Legend Background');

        var borderRow = selectorRow(pc, 'Border');
        pickColor(borderRow, glProp('legend.bordercolor'), '', 'Legend Border');
        slider(borderRow, glProp('legend.borderwidth'), '', [0, 10], 1);

        slider(pc, glProp('legend.x'), 'Horz position', [-0.5,1.5], 2);
        slider(pc, glProp('legend.y'), 'Vert position', [-0.5,1.5], 2);

        pickOption(pc, glProp('legend.xanchor'), 'Horz anchor', [
            {val: 'auto', name: 'Auto'},
            {val: 'left', name: 'Left'},
            {val: 'center', name: 'Center'},
            {val: 'right', name: 'Right'}
        ]);
        pickOption(pc, glProp('legend.yanchor'), 'Vert anchor', [
            {val: 'auto', name: 'Auto'},
            {val: 'top', name: 'Top'},
            {val: 'middle', name: 'Middle'},
            {val: 'bottom', name: 'Bottom'}
        ]);
    }

    // -----------------------------------------------------
    // Annotation management and styling popover
    // -----------------------------------------------------

    toolPanel.cartesian.notesBox = function(anum) {
        var anns = gd._fullLayout.annotations,
            listLen = anns.length>1 ? anns.length : 0,
            popover;
        if(!$.isNumeric(anum) || anum>listLen) anum = listLen;

        // make the dropdown list of annotations
        function notesContent(po, contentAnum) {
            popover = po;
            var titlediv = popover.find('.trace-dropdown').html(''),
                annotations = gd._fullLayout.annotations;
            if (annotations.length) {
                var annList = mergeAnnotations(annotations).concat(annotations),
                    anndrop = $(toolPanel.dropdown('select-ann')).appendTo(titlediv),
                    anndrop3 = Plotly.d3.select(anndrop[0]);

                anndrop3.select('ul').selectAll('li')
                    .data(annList)
                  .enter().append('li')
                    .on('click',selectAnnotation)
                    .append('a')
                        .text(function(d, i){
                            var dt1 = Plotly.util.plainText(d.text);
                            return (i ? (i+': ') : '') + dt1.substr(0,16) +
                                (dt1.length>16 ? '...' : '');
                        });
                selectAnnotation.call(anndrop.find('li')[contentAnum],annList[contentAnum],contentAnum);
            }
            else {
                popover.find('#notesbox-0')
                    .html('<p>Click "<b>+</b>" to add an annotation</p>')
                    .toggleClass('empty-item', false);
            }
            titlediv.append('<button class="btn btn--plain btn--neighbor js-new-ann">' +
                    '<i class="icon-plus"></i></button>'+
                '<button class="btn btn--plain btn--neighbor js-delete-ann"><b>' +
                    '<i class="icon-minus"></i></b></button>');

            titlediv.find('.js-delete-ann').click(function(e){
                var delnum = popover[0].selectedObj;
                // if annotations.length > 1, popover contains the 'All
                // Annotation item. Hence, decrement delnum.

                if(delnum >= 1) {
                    --delnum;
                    Plotly.relayout(gd, 'annotations['+ delnum +']', 'remove');
                }
                else Plotly.relayout(gd, 'annotations', 'remove');

                popover.remove();
                toolPanel.cartesian.notesBox(gd, delnum + 1);
                Plotly.Lib.pauseEvent(e);
            });

            titlediv.find('.js-new-ann').click(function(e){
                Plotly.Annotations.add(gd);
                popover.remove();
                toolPanel.cartesian.notesBox(gd);
                Plotly.Lib.pauseEvent(e);
            });
        }

        renderSlideoutPanel(gd, {
            cls: 'notesbox js-notes-box-panel cartesian',
            content: notesContent,
            arg: anum,
            tabs: ['General', 'Text']
        });

        function selectAnnotation(d,i){
            var menu = popover.find('.select-ann');
            menu.find('.selected-val').html(menu.find('li')[i].innerHTML);

            // save the selection value for later use
            // i-1 because the first item is 'all annotations'
            popover[0].selectedObj = i;

            popover[0].empty();

            function refAxis(axId) {
                var name = axId.charAt(0).toUpperCase() + ' axis' +
                    (axId.length>1 ? (' ' + axId.substr(1)) : '');
                return {name:name, val:axId};
            }
            function refSubplot(sp) { return {name:sp.toUpperCase(), val:sp}; }

            var showComplexRef = $('.annotation-complex-ref').length ?
                $('.annotation-complex-ref')
                    .filter(function(){ return $(this).css('display')==='block'; })
                    .length>0 :
                ((d.xref==='paper')!==(d.yref==='paper'));
            var tabArrow = popover.find('#notesbox-0'),
                tabText = popover.find('#notesbox-1'),
                a = 'annotations['+(i-1)+'].',
                gd = popover[0].gd,
                xrefs = [{name: 'Page', val: 'paper'}]
                    .concat(Plotly.Axes.listIds(gd, 'x').map(refAxis)),
                yrefs = [{name: 'Page', val: 'paper'}]
                    .concat(Plotly.Axes.listIds(gd, 'y').map(refAxis)),
                plotrefs = [{name: 'Page', val: 'paper'}]
                    .concat(Plotly.Axes.getSubplots(gd).map(refSubplot));
            if(xrefs.length===2) xrefs[1].name = 'Data';
            if(yrefs.length===2) yrefs[1].name = 'Data';
            if(plotrefs.length===2) plotrefs[1].name = 'Data';

            function annProp(astr, val) {
                if(val===undefined) val = Plotly.Lib.nestedProperty(d,astr).get();
                return {
                    astr: a + astr,
                    get: function() { return val; }
                };
            }

            // make each of the attribute selection items

            // simple referencing - either to an existing subplot or to the paper
            pickOption(tabArrow,
                annProp('ref', (d.xref+d.yref).replace('paperpaper', 'paper')),
                'Move with', plotrefs, 'annotation-simple-ref');

            // more complex form of referencing - x and y are independent
            pickOption(tabArrow, annProp('xref'), 'Move X with', xrefs, 'annotation-complex-ref');
            pickOption(tabArrow, annProp('yref'), 'Move Y with', yrefs, 'annotation-complex-ref');

            // toggle visibility of complex references
            $('.annotation-complex-ref').toggle(showComplexRef);
            $('.annotation-simple-ref').append('<a>Advanced...</a>')
                .find('a').click(function(){ $('.annotation-complex-ref').toggle(); });

            var positionRow = selectorRow(tabArrow, 'Position');
            var xa = Plotly.Axes.getFromId(gd, d.xref),
                ya = Plotly.Axes.getFromId(gd, d.yref),
                xRange, yRange;

            if(xa) xRange = inputAxRange(xa.type);
            else if(d.xref==='paper') xRange = inputBetween(-1,2);
            else xRange = inputAxRange('linear');

            if(ya) yRange = inputAxRange(ya.type);
            else if(d.yref==='paper') yRange = inputBetween(-1,2);
            else yRange = inputAxRange('linear');

            textInput(positionRow, annProp('x'), '', xRange);
            textInput(positionRow, annProp('y'), '', yRange);

            slider(tabArrow, annProp('opacity'), 'Opacity', [0,1], 2);

            var showarrowRow = selectorRow(tabArrow, 'Arrow');
            pickOption(showarrowRow,annProp('showarrow'), '', BOOLEANSHOWHIDE);
            pickColor(showarrowRow, annProp('arrowcolor'), '', 'Arrow Color');
            slider(showarrowRow, annProp('arrowwidth'), '', [0,10], 1);

            var arrowVectorRow = selectorRow(tabArrow, '... Vector');
            textInput(arrowVectorRow, annProp('ax'), '', inputBetween(-1000,1000));
            textInput(arrowVectorRow, annProp('ay'), '', inputBetween(-1000,1000));

            layoutBoxDrop(tabArrow, a+'arrowhead', 'Arrowhead', d.arrowhead,
                allArrowheads());
            allArrowheads(tabArrow[0]);
            // this is the only one made by layoutBoxDrop that doesn't want padding
            $('[data-arrowhead]').parents('.selected-val').css('padding', '0px');

            slider(tabArrow, annProp('arrowsize'), '... Scale', [0.3,3], 1);

            pickOption(tabArrow, annProp('xanchor'), 'Horz anchor', [
                {val: 'auto', name: 'Auto'},
                {val: 'left', name: 'Left'},
                {val: 'center', name: 'Center'},
                {val: 'right', name: 'Right'}
            ]);

            pickOption(tabArrow, annProp('yanchor'), 'Vert anchor', [
                {val: 'auto', name: 'Auto'},
                {val: 'top', name: 'Top'},
                {val: 'middle', name: 'Middle'},
                {val: 'bottom', name: 'Bottom'}
            ]);

            fontPicker(tabText, annProp('font'), 'Font');
            pickOption(tabText, annProp('align'), 'Alignment', [
                {val: 'left', name: '<i class="icon-align-left"></i>'},
                {val: 'center', name: '<i class="icon-align-center"></i>'},
                {val: 'right', name: '<i class="icon-align-right"></i>'}
            ]);

            var borderRow = selectorRow(tabText, 'Border');
            pickColor(borderRow, annProp('bordercolor'), '', 'Border Color');
            slider(borderRow, annProp('borderwidth'), '', [0, 10], 1);

            pickColor(tabText, annProp('bgcolor'), 'Background', 'Background Color');
            slider(tabText, annProp('borderpad'), 'Padding', [0, 10], 1);
            angleSlider(tabText, annProp('textangle'), 'Angle');

            popover[0].showTabs();
        }
    };

    // -----------------------------------------------------
    // Geo axes popover
    // -----------------------------------------------------

    // TODO integrate this better with cartesian popovers
    toolPanel.geo = {};
    toolPanel.geo.axesBox = function() {
        renderSlideoutPanel(gd, {
            cls: 'axesbox js-axes-box-content cartesian',
            content: geoAxesBoxContent,
            tabs: ['Range', 'Lines']
        });
    };

    function geoAxesBoxContent(popover) {
        var gd = popover[0].gd,
            fullLayout = gd._fullLayout,
            tabRange = popover.find('#axesbox-0'),
            tabLines = popover.find('#axesbox-1'),
            geoIds = Plotly.Plots.getSubplotIds(fullLayout, 'geo');

        popover[0].empty();

        function glProp(astr) {
            return Plotly.Lib.nestedProperty(fullLayout, astr);
        }

        geoIds.forEach(function(geoId) {
            var num = geoIdToNum(geoId);

            var lonRangeRow = selectorRow(tabRange, 'Longitude<br>range' + num);
            textInput(lonRangeRow, glProp(geoId + '.lonaxis.range[0]'), '', inputBetween(-360, 360));
            textInput(lonRangeRow, glProp(geoId + '.lonaxis.range[1]'), '', inputBetween(-360, 360));

            var latRangeRow = selectorRow(tabRange, 'Latitude<br>range' + num);
            textInput(latRangeRow, glProp(geoId + '.lataxis.range[0]'), '', inputBetween(-180, 180));
            textInput(latRangeRow, glProp(geoId + '.lataxis.range[1]'), '', inputBetween(-180, 180));

            var lonGridlineRow = selectorRow(tabLines, 'Longitude<br>grid' + num);
            pickOption(lonGridlineRow, glProp(geoId + '.lonaxis.showgrid'), '', BOOLEANONOFF);
            pickColor(lonGridlineRow, glProp(geoId + '.lonaxis.gridcolor'), '', 'color');
            slider(lonGridlineRow, glProp(geoId + '.lonaxis.gridwidth'), '', [0.1, 10], 1);
            textInput(tabLines, glProp(geoId + '.lonaxis.tick0'), '... Reference', inputBetween(-180, 180));
            textInput(tabLines, glProp(geoId + '.lonaxis.dtick'), '... Spacing', inputBetween(0, 180));

            var latGridlineRow = selectorRow(tabLines, 'Latitude<br>grid' + num);
            pickOption(latGridlineRow, glProp(geoId + '.lataxis.showgrid'), '', BOOLEANONOFF);
            pickColor(latGridlineRow, glProp(geoId + '.lataxis.gridcolor'), '', 'color');
            slider(latGridlineRow, glProp(geoId + '.lataxis.gridwidth'), '', [0.1, 10], 1);
            textInput(tabLines, glProp(geoId + '.lataxis.tick0'), '... Reference', inputBetween(-180, 180));
            textInput(tabLines, glProp(geoId + '.lataxis.dtick'), '... Spacing', inputBetween(0, 180));
        });

    }


    // allArrowheads: call twice to make an arrowheads dropdown.
    // once (with no container) for the data to send to layoutBoxDrop,
    // and again (with a container) to add arrowheads to the list
    function allArrowheads(container){
        var i,
            s;
        // if a dom element is passed in, add appropriate arrowheads
        // to every arrowhead selector in the container
        if(container) {
            var arrowLines = container.querySelectorAll('[data-arrowhead]');
            for(i = 0; i < arrowLines.length; i++) {
                s = Plotly.d3.select(arrowLines[i]);
                Plotly.Annotations.arrowhead(s.select('line'),
                    Number(s.attr('data-arrowhead')));
            }
            return;
        }
        // with no args, output an array of elements for the dropdown list
        var outArray = new Array(Plotly.Annotations.ARROWPATHS.length);
        for(i = 0; i < Plotly.Annotations.ARROWPATHS.length; i++) {
            outArray[i] = {
                val:i,
                name:'<svg width="40" height="20" data-arrowhead="' + i +
                            '" style="position: relative; top: 2px;">' +
                        '<line stroke="rgb(0,0,0)" style="fill: none;" ' +
                        'x1="5" y1="10" x2="25" y2="10" stroke-width="2">' +
                        '</line>' +
                    '</svg>'
            };
        }
        return outArray;
    }

    function mergeAnnotations(annotations) {
        // 0 or one annotation: nothing to merge
        if(annotations.length < 2) return [];
        var annCommon = Plotly.Lib.minExtend(annotations[0]);
        annotations.slice(1).forEach(function(ann) {
            Object.keys(ann).forEach(function(k) {
                mergeAttr(annCommon, ann, k);
            });
        });

        annCommon.text = 'All Annotations';
        return [annCommon];
    }

    function fitBox(td, pos) {
        /*
         * This is the Plot side Fit bridge. It is called from the Plot View
         * when the fit tool is clicked. FitOps is instantiated and the
         * fitplotcontent is passed to the popover as the content function.
         */

        /* global Tabs:false, Workspace:false */
        var fitPanel = $(td).find('.fitbox');
        var gd = Tabs.getGraph();

        if(!(gd._fullData || []).length){
            toolPanel.notifier('No data to fit. Upload a file to graph.', 3000);

            // TODO: disable item unless data is present, or link to example
        } else if (toolPanel.isPolar(gd) || toolPanel.isGL3D(gd) || toolPanel.isGeo(gd) ||

            !gd._fullLayout._hasCartesian) {
            toolPanel.notifier('Fitting currently works only with cartesian plots.', 3000);

        } else if(!fitPanel.length) {
            /* Fit Panel not open, let's create it and open it */
            var fitOps = Workspace.Fit(td);

            renderSlideoutPanel(gd, {
                pos: pos,
                cls: 'fitbox',
                content: fitOps.initPlotFit
            });

            $('.js-fit-plot-data').addClass('active');
            toolPanel.toggle('fitbox');

        } else {

            /* Fit Panel is open, let's close it */
            toolPanel.toggle('fitbox');
        }

        return false;
    }

    toolPanel.fitBox = fitBox;
    toolPanel.renderSlideoutPanel = renderSlideoutPanel;

    return toolPanel;
}

module.exports = ToolPanel;

ToolPanel.killPopovers = killPopovers;

window.ToolPanel = ToolPanel;
