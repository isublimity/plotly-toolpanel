(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

;$ = global.$ = require("/var/www/streambed/shelly/toolpanel/static/toolpanel/dist/temp/jquery-1.8.3.min.js");
;var __browserify_shim_require__ = require;(function browserifyShim(module, define, require) {
  /*!
   * bootstrap-select v1.5.4
   * http://silviomoreto.github.io/bootstrap-select/
   *
   * Copyright 2013 bootstrap-select
   * Licensed under the MIT license
   */
  ;!function (b) {
    b.expr[":"].icontains = function (e, c, d) {
      return b(e).text().toUpperCase().indexOf(d[3].toUpperCase()) >= 0;
    };var a = function a(d, c, f) {
      if (f) {
        f.stopPropagation();f.preventDefault();
      }this.$element = b(d);this.$newElement = null;this.$button = null;this.$menu = null;this.$lis = null;this.options = b.extend({}, b.fn.selectpicker.defaults, this.$element.data(), (typeof c === "undefined" ? "undefined" : _typeof(c)) == "object" && c);if (this.options.title === null) {
        this.options.title = this.$element.attr("title");
      }this.val = a.prototype.val;this.render = a.prototype.render;this.refresh = a.prototype.refresh;this.setStyle = a.prototype.setStyle;this.selectAll = a.prototype.selectAll;this.deselectAll = a.prototype.deselectAll;this.init();
    };a.prototype = { constructor: a, init: function init() {
        var c = this,
            d = this.$element.attr("id");this.$element.hide();this.multiple = this.$element.prop("multiple");this.autofocus = this.$element.prop("autofocus");this.$newElement = this.createView();this.$element.after(this.$newElement);this.$menu = this.$newElement.find("> .dropdown-menu");this.$button = this.$newElement.find("> button");this.$searchbox = this.$newElement.find("input");if (d !== undefined) {
          this.$button.attr("data-id", d);b('label[for="' + d + '"]').click(function (f) {
            f.preventDefault();c.$button.focus();
          });
        }this.checkDisabled();this.clickListener();if (this.options.liveSearch) {
          this.liveSearchListener();
        }this.render();this.liHeight();this.setStyle();this.setWidth();if (this.options.container) {
          this.selectPosition();
        }this.$menu.data("this", this);this.$newElement.data("this", this);
      }, createDropdown: function createDropdown() {
        var c = this.multiple ? " show-tick" : "";var d = this.$element.parent().hasClass("input-group") ? " input-group-btn" : "";var i = this.autofocus ? " autofocus" : "";var h = this.options.header ? '<div class="popover-title"><button type="button" class="close" aria-hidden="true">&times;</button>' + this.options.header + "</div>" : "";var g = this.options.liveSearch ? '<div class="bootstrap-select-searchbox"><input type="text" class="input-block-level form-control" /></div>' : "";var f = this.options.actionsBox ? '<div class="bs-actionsbox"><div class="btn-group btn-block"><button class="actions-btn bs-select-all btn btn-sm btn-default">Select All</button><button class="actions-btn bs-deselect-all btn btn-sm btn-default">Deselect All</button></div></div>' : "";var e = '<div class="btn-group bootstrap-select' + c + d + '"><button type="button" class="btn dropdown-toggle selectpicker" data-toggle="dropdown"' + i + '><span class="filter-option pull-left"></span>&nbsp;<span class="caret"></span></button><div class="dropdown-menu open">' + h + g + f + '<ul class="dropdown-menu inner selectpicker" role="menu"></ul></div></div>';return b(e);
      }, createView: function createView() {
        var c = this.createDropdown();var d = this.createLi();c.find("ul").append(d);return c;
      }, reloadLi: function reloadLi() {
        this.destroyLi();var c = this.createLi();this.$menu.find("ul").append(c);
      }, destroyLi: function destroyLi() {
        this.$menu.find("li").remove();
      }, createLi: function createLi() {
        var d = this,
            e = [],
            c = "";this.$element.find("option").each(function () {
          var i = b(this);var g = i.attr("class") || "";var h = i.attr("style") || "";var m = i.data("content") ? i.data("content") : i.html();var k = i.data("subtext") !== undefined ? '<small class="muted text-muted">' + i.data("subtext") + "</small>" : "";var j = i.data("icon") !== undefined ? '<i class="' + d.options.iconBase + " " + i.data("icon") + '"></i> ' : "";if (j !== "" && (i.is(":disabled") || i.parent().is(":disabled"))) {
            j = "<span>" + j + "</span>";
          }if (!i.data("content")) {
            m = j + '<span class="text">' + m + k + "</span>";
          }if (d.options.hideDisabled && (i.is(":disabled") || i.parent().is(":disabled"))) {
            e.push('<a style="min-height: 0; padding: 0"></a>');
          } else {
            if (i.parent().is("optgroup") && i.data("divider") !== true) {
              if (i.index() === 0) {
                var l = i.parent().attr("label");var n = i.parent().data("subtext") !== undefined ? '<small class="muted text-muted">' + i.parent().data("subtext") + "</small>" : "";var f = i.parent().data("icon") ? '<i class="' + i.parent().data("icon") + '"></i> ' : "";l = f + '<span class="text">' + l + n + "</span>";if (i[0].index !== 0) {
                  e.push('<div class="div-contain"><div class="divider"></div></div><dt>' + l + "</dt>" + d.createA(m, "opt " + g, h));
                } else {
                  e.push("<dt>" + l + "</dt>" + d.createA(m, "opt " + g, h));
                }
              } else {
                e.push(d.createA(m, "opt " + g, h));
              }
            } else {
              if (i.data("divider") === true) {
                e.push('<div class="div-contain"><div class="divider"></div></div>');
              } else {
                if (b(this).data("hidden") === true) {
                  e.push("<a></a>");
                } else {
                  e.push(d.createA(m, g, h));
                }
              }
            }
          }
        });b.each(e, function (g, h) {
          var f = h === "<a></a>" ? 'class="hide is-hidden"' : "";c += '<li rel="' + g + '"' + f + ">" + h + "</li>";
        });if (!this.multiple && this.$element.find("option:selected").length === 0 && !this.options.title) {
          this.$element.find("option").eq(0).prop("selected", true).attr("selected", "selected");
        }return b(c);
      }, createA: function createA(e, c, d) {
        return '<a tabindex="0" class="' + c + '" style="' + d + '">' + e + '<i class="' + this.options.iconBase + " " + this.options.tickIcon + ' icon-ok check-mark"></i></a>';
      }, render: function render(e) {
        var d = this;if (e !== false) {
          this.$element.find("option").each(function (i) {
            d.setDisabled(i, b(this).is(":disabled") || b(this).parent().is(":disabled"));d.setSelected(i, b(this).is(":selected"));
          });
        }this.tabIndex();var h = this.$element.find("option:selected").map(function () {
          var k = b(this);var j = k.data("icon") && d.options.showIcon ? '<i class="' + d.options.iconBase + " " + k.data("icon") + '"></i> ' : "";var i;if (d.options.showSubtext && k.attr("data-subtext") && !d.multiple) {
            i = ' <small class="muted text-muted">' + k.data("subtext") + "</small>";
          } else {
            i = "";
          }if (k.data("content") && d.options.showContent) {
            return k.data("content");
          } else {
            if (k.attr("title") !== undefined) {
              return k.attr("title");
            } else {
              return j + k.html() + i;
            }
          }
        }).toArray();var g = !this.multiple ? h[0] : h.join(this.options.multipleSeparator);if (this.multiple && this.options.selectedTextFormat.indexOf("count") > -1) {
          var c = this.options.selectedTextFormat.split(">");var f = this.options.hideDisabled ? ":not([disabled])" : "";if (c.length > 1 && h.length > c[1] || c.length == 1 && h.length >= 2) {
            g = this.options.countSelectedText.replace("{0}", h.length).replace("{1}", this.$element.find('option:not([data-divider="true"]):not([data-hidden="true"])' + f).length);
          }
        }this.options.title = this.$element.attr("title");if (!g) {
          g = this.options.title !== undefined ? this.options.title : this.options.noneSelectedText;
        }this.$button.attr("title", b.trim(g));this.$newElement.find(".filter-option").html(g);
      }, setStyle: function setStyle(e, d) {
        if (this.$element.attr("class")) {
          this.$newElement.addClass(this.$element.attr("class").replace(/selectpicker|mobile-device/gi, ""));
        }var c = e ? e : this.options.style;if (d == "add") {
          this.$button.addClass(c);
        } else {
          if (d == "remove") {
            this.$button.removeClass(c);
          } else {
            this.$button.removeClass(this.options.style);this.$button.addClass(c);
          }
        }
      }, liHeight: function liHeight() {
        if (this.options.size === false) {
          return;
        }var f = this.$menu.parent().clone().find("> .dropdown-toggle").prop("autofocus", false).end().appendTo("body"),
            g = f.addClass("open").find("> .dropdown-menu"),
            e = g.find("li > a").outerHeight(),
            d = this.options.header ? g.find(".popover-title").outerHeight() : 0,
            h = this.options.liveSearch ? g.find(".bootstrap-select-searchbox").outerHeight() : 0,
            c = this.options.actionsBox ? g.find(".bs-actionsbox").outerHeight() : 0;f.remove();this.$newElement.data("liHeight", e).data("headerHeight", d).data("searchHeight", h).data("actionsHeight", c);
      }, setSize: function setSize() {
        var i = this,
            d = this.$menu,
            j = d.find(".inner"),
            u = this.$newElement.outerHeight(),
            f = this.$newElement.data("liHeight"),
            s = this.$newElement.data("headerHeight"),
            m = this.$newElement.data("searchHeight"),
            h = this.$newElement.data("actionsHeight"),
            l = d.find("li .divider").outerHeight(true),
            r = parseInt(d.css("padding-top")) + parseInt(d.css("padding-bottom")) + parseInt(d.css("border-top-width")) + parseInt(d.css("border-bottom-width")),
            p = this.options.hideDisabled ? ":not(.disabled)" : "",
            o = b(window),
            g = r + parseInt(d.css("margin-top")) + parseInt(d.css("margin-bottom")) + 2,
            q,
            v,
            t,
            k = function k() {
          v = i.$newElement.offset().top - o.scrollTop();t = o.height() - v - u;
        };k();if (this.options.header) {
          d.css("padding-top", 0);
        }if (this.options.size == "auto") {
          var e = function e() {
            var x,
                w = i.$lis.not(".hide");k();q = t - g;if (i.options.dropupAuto) {
              i.$newElement.toggleClass("dropup", v > t && q - g < d.height());
            }if (i.$newElement.hasClass("dropup")) {
              q = v - g;
            }if (w.length + w.find("dt").length > 3) {
              x = f * 3 + g - 2;
            } else {
              x = 0;
            }d.css({ "max-height": q + "px", overflow: "hidden", "min-height": x + s + m + h + "px" });j.css({ "max-height": q - s - m - h - r + "px", "overflow-y": "auto", "min-height": Math.max(x - r, 0) + "px" });
          };e();this.$searchbox.off("input.getSize propertychange.getSize").on("input.getSize propertychange.getSize", e);b(window).off("resize.getSize").on("resize.getSize", e);b(window).off("scroll.getSize").on("scroll.getSize", e);
        } else {
          if (this.options.size && this.options.size != "auto" && d.find("li" + p).length > this.options.size) {
            var n = d.find("li" + p + " > *").filter(":not(.div-contain)").slice(0, this.options.size).last().parent().index();var c = d.find("li").slice(0, n + 1).find(".div-contain").length;q = f * this.options.size + c * l + r;if (i.options.dropupAuto) {
              this.$newElement.toggleClass("dropup", v > t && q < d.height());
            }d.css({ "max-height": q + s + m + h + "px", overflow: "hidden" });j.css({ "max-height": q - r + "px", "overflow-y": "auto" });
          }
        }
      }, setWidth: function setWidth() {
        if (this.options.width == "auto") {
          this.$menu.css("min-width", "0");var e = this.$newElement.clone().appendTo("body");var c = e.find("> .dropdown-menu").css("width");var d = e.css("width", "auto").find("> button").css("width");e.remove();this.$newElement.css("width", Math.max(parseInt(c), parseInt(d)) + "px");
        } else {
          if (this.options.width == "fit") {
            this.$menu.css("min-width", "");this.$newElement.css("width", "").addClass("fit-width");
          } else {
            if (this.options.width) {
              this.$menu.css("min-width", "");this.$newElement.css("width", this.options.width);
            } else {
              this.$menu.css("min-width", "");this.$newElement.css("width", "");
            }
          }
        }if (this.$newElement.hasClass("fit-width") && this.options.width !== "fit") {
          this.$newElement.removeClass("fit-width");
        }
      }, selectPosition: function selectPosition() {
        var e = this,
            d = "<div />",
            f = b(d),
            h,
            g,
            c = function c(i) {
          f.addClass(i.attr("class").replace(/form-control/gi, "")).toggleClass("dropup", i.hasClass("dropup"));h = i.offset();g = i.hasClass("dropup") ? 0 : i[0].offsetHeight;f.css({ top: h.top + g, left: h.left, width: i[0].offsetWidth, position: "absolute" });
        };this.$newElement.on("click", function () {
          if (e.isDisabled()) {
            return;
          }c(b(this));f.appendTo(e.options.container);f.toggleClass("open", !b(this).hasClass("open"));f.append(e.$menu);
        });b(window).resize(function () {
          c(e.$newElement);
        });b(window).on("scroll", function () {
          c(e.$newElement);
        });b("html").on("click", function (i) {
          if (b(i.target).closest(e.$newElement).length < 1) {
            f.removeClass("open");
          }
        });
      }, mobile: function mobile() {
        this.$element.addClass("mobile-device").appendTo(this.$newElement);if (this.options.container) {
          this.$menu.hide();
        }
      }, refresh: function refresh() {
        this.$lis = null;this.reloadLi();this.render();this.setWidth();this.setStyle();this.checkDisabled();this.liHeight();
      }, update: function update() {
        this.reloadLi();this.setWidth();this.setStyle();this.checkDisabled();this.liHeight();
      }, setSelected: function setSelected(c, d) {
        if (this.$lis == null) {
          this.$lis = this.$menu.find("li");
        }b(this.$lis[c]).toggleClass("selected", d);
      }, setDisabled: function setDisabled(c, d) {
        if (this.$lis == null) {
          this.$lis = this.$menu.find("li");
        }if (d) {
          b(this.$lis[c]).addClass("disabled").find("a").attr("href", "#").attr("tabindex", -1);
        } else {
          b(this.$lis[c]).removeClass("disabled").find("a").removeAttr("href").attr("tabindex", 0);
        }
      }, isDisabled: function isDisabled() {
        return this.$element.is(":disabled");
      }, checkDisabled: function checkDisabled() {
        var c = this;if (this.isDisabled()) {
          this.$button.addClass("disabled").attr("tabindex", -1);
        } else {
          if (this.$button.hasClass("disabled")) {
            this.$button.removeClass("disabled");
          }if (this.$button.attr("tabindex") == -1) {
            if (!this.$element.data("tabindex")) {
              this.$button.removeAttr("tabindex");
            }
          }
        }this.$button.click(function () {
          return !c.isDisabled();
        });
      }, tabIndex: function tabIndex() {
        if (this.$element.is("[tabindex]")) {
          this.$element.data("tabindex", this.$element.attr("tabindex"));this.$button.attr("tabindex", this.$element.data("tabindex"));
        }
      }, clickListener: function clickListener() {
        var c = this;b("body").on("touchstart.dropdown", ".dropdown-menu", function (d) {
          d.stopPropagation();
        });this.$newElement.on("click", function () {
          c.setSize();if (!c.options.liveSearch && !c.multiple) {
            setTimeout(function () {
              c.$menu.find(".selected a").focus();
            }, 10);
          }
        });this.$menu.on("click", "li a", function (n) {
          var t = b(this).parent().index(),
              m = c.$element.val(),
              i = c.$element.prop("selectedIndex");if (c.multiple) {
            n.stopPropagation();
          }n.preventDefault();if (!c.isDisabled() && !b(this).parent().hasClass("disabled")) {
            var l = c.$element.find("option"),
                d = l.eq(t),
                f = d.prop("selected"),
                r = d.parent("optgroup"),
                p = c.options.maxOptions,
                h = r.data("maxOptions") || false;if (!c.multiple) {
              l.prop("selected", false);d.prop("selected", true);c.$menu.find(".selected").removeClass("selected");c.setSelected(t, true);
            } else {
              d.prop("selected", !f);c.setSelected(t, !f);if (p !== false || h !== false) {
                var o = p < l.filter(":selected").length,
                    j = h < r.find("option:selected").length,
                    s = c.options.maxOptionsText,
                    g = s[0].replace("{n}", p),
                    q = s[1].replace("{n}", h),
                    k = b('<div class="notify"></div>');if (p && o || h && j) {
                  if (s[2]) {
                    g = g.replace("{var}", s[2][p > 1 ? 0 : 1]);q = q.replace("{var}", s[2][h > 1 ? 0 : 1]);
                  }d.prop("selected", false);c.$menu.append(k);if (p && o) {
                    k.append(b("<div>" + g + "</div>"));c.$element.trigger("maxReached.bs.select");
                  }if (h && j) {
                    k.append(b("<div>" + q + "</div>"));c.$element.trigger("maxReachedGrp.bs.select");
                  }setTimeout(function () {
                    c.setSelected(t, false);
                  }, 10);k.delay(750).fadeOut(300, function () {
                    b(this).remove();
                  });
                }
              }
            }if (!c.multiple) {
              c.$button.focus();
            } else {
              if (c.options.liveSearch) {
                c.$searchbox.focus();
              }
            }if (m != c.$element.val() && c.multiple || i != c.$element.prop("selectedIndex") && !c.multiple) {
              c.$element.change();
            }
          }
        });this.$menu.on("click", "li.disabled a, li dt, li .div-contain, .popover-title, .popover-title :not(.close)", function (d) {
          if (d.target == this) {
            d.preventDefault();d.stopPropagation();if (!c.options.liveSearch) {
              c.$button.focus();
            } else {
              c.$searchbox.focus();
            }
          }
        });this.$menu.on("click", ".popover-title .close", function () {
          c.$button.focus();
        });this.$searchbox.on("click", function (d) {
          d.stopPropagation();
        });this.$menu.on("click", ".actions-btn", function (d) {
          if (c.options.liveSearch) {
            c.$searchbox.focus();
          } else {
            c.$button.focus();
          }d.preventDefault();d.stopPropagation();if (b(this).is(".bs-select-all")) {
            c.selectAll();
          } else {
            c.deselectAll();
          }c.$element.change();
        });this.$element.change(function () {
          c.render(false);
        });
      }, liveSearchListener: function liveSearchListener() {
        var d = this,
            c = b('<li class="no-results"></li>');this.$newElement.on("click.dropdown.data-api", function () {
          d.$menu.find(".active").removeClass("active");if (!!d.$searchbox.val()) {
            d.$searchbox.val("");d.$lis.not(".is-hidden").removeClass("hide");if (!!c.parent().length) {
              c.remove();
            }
          }if (!d.multiple) {
            d.$menu.find(".selected").addClass("active");
          }setTimeout(function () {
            d.$searchbox.focus();
          }, 10);
        });this.$searchbox.on("input propertychange", function () {
          if (d.$searchbox.val()) {
            d.$lis.not(".is-hidden").removeClass("hide").find("a").not(":icontains(" + d.$searchbox.val() + ")").parent().addClass("hide");if (!d.$menu.find("li").filter(":visible:not(.no-results)").length) {
              if (!!c.parent().length) {
                c.remove();
              }c.html(d.options.noneResultsText + ' "' + d.$searchbox.val() + '"').show();d.$menu.find("li").last().after(c);
            } else {
              if (!!c.parent().length) {
                c.remove();
              }
            }
          } else {
            d.$lis.not(".is-hidden").removeClass("hide");if (!!c.parent().length) {
              c.remove();
            }
          }d.$menu.find("li.active").removeClass("active");d.$menu.find("li").filter(":visible:not(.divider)").eq(0).addClass("active").find("a").focus();b(this).focus();
        });this.$menu.on("mouseenter", "a", function (f) {
          d.$menu.find(".active").removeClass("active");b(f.currentTarget).parent().not(".disabled").addClass("active");
        });this.$menu.on("mouseleave", "a", function () {
          d.$menu.find(".active").removeClass("active");
        });
      }, val: function val(c) {
        if (c !== undefined) {
          this.$element.val(c);this.$element.change();return this.$element;
        } else {
          return this.$element.val();
        }
      }, selectAll: function selectAll() {
        if (this.$lis == null) {
          this.$lis = this.$menu.find("li");
        }this.$element.find("option:enabled").prop("selected", true);b(this.$lis).filter(":not(.disabled)").addClass("selected");this.render(false);
      }, deselectAll: function deselectAll() {
        if (this.$lis == null) {
          this.$lis = this.$menu.find("li");
        }this.$element.find("option:enabled").prop("selected", false);b(this.$lis).filter(":not(.disabled)").removeClass("selected");this.render(false);
      }, keydown: function keydown(p) {
        var q,
            o,
            i,
            n,
            k,
            j,
            r,
            f,
            h,
            m,
            d,
            s,
            g = { 32: " ", 48: "0", 49: "1", 50: "2", 51: "3", 52: "4", 53: "5", 54: "6", 55: "7", 56: "8", 57: "9", 59: ";", 65: "a", 66: "b", 67: "c", 68: "d", 69: "e", 70: "f", 71: "g", 72: "h", 73: "i", 74: "j", 75: "k", 76: "l", 77: "m", 78: "n", 79: "o", 80: "p", 81: "q", 82: "r", 83: "s", 84: "t", 85: "u", 86: "v", 87: "w", 88: "x", 89: "y", 90: "z", 96: "0", 97: "1", 98: "2", 99: "3", 100: "4", 101: "5", 102: "6", 103: "7", 104: "8", 105: "9" };q = b(this);i = q.parent();if (q.is("input")) {
          i = q.parent().parent();
        }m = i.data("this");if (m.options.liveSearch) {
          i = q.parent().parent();
        }if (m.options.container) {
          i = m.$menu;
        }o = b("[role=menu] li:not(.divider) a", i);s = m.$menu.parent().hasClass("open");if (!s && /([0-9]|[A-z])/.test(String.fromCharCode(p.keyCode))) {
          if (!m.options.container) {
            m.setSize();m.$menu.parent().addClass("open");s = m.$menu.parent().hasClass("open");
          } else {
            m.$newElement.trigger("click");
          }m.$searchbox.focus();
        }if (m.options.liveSearch) {
          if (/(^9$|27)/.test(p.keyCode) && s && m.$menu.find(".active").length === 0) {
            p.preventDefault();m.$menu.parent().removeClass("open");m.$button.focus();
          }o = b("[role=menu] li:not(.divider):visible", i);if (!q.val() && !/(38|40)/.test(p.keyCode)) {
            if (o.filter(".active").length === 0) {
              o = m.$newElement.find("li").filter(":icontains(" + g[p.keyCode] + ")");
            }
          }
        }if (!o.length) {
          return;
        }if (/(38|40)/.test(p.keyCode)) {
          n = o.index(o.filter(":focus"));j = o.parent(":not(.disabled):visible").first().index();r = o.parent(":not(.disabled):visible").last().index();k = o.eq(n).parent().nextAll(":not(.disabled):visible").eq(0).index();f = o.eq(n).parent().prevAll(":not(.disabled):visible").eq(0).index();h = o.eq(k).parent().prevAll(":not(.disabled):visible").eq(0).index();if (m.options.liveSearch) {
            o.each(function (e) {
              if (b(this).is(":not(.disabled)")) {
                b(this).data("index", e);
              }
            });n = o.index(o.filter(".active"));j = o.filter(":not(.disabled):visible").first().data("index");r = o.filter(":not(.disabled):visible").last().data("index");k = o.eq(n).nextAll(":not(.disabled):visible").eq(0).data("index");f = o.eq(n).prevAll(":not(.disabled):visible").eq(0).data("index");h = o.eq(k).prevAll(":not(.disabled):visible").eq(0).data("index");
          }d = q.data("prevIndex");if (p.keyCode == 38) {
            if (m.options.liveSearch) {
              n -= 1;
            }if (n != h && n > f) {
              n = f;
            }if (n < j) {
              n = j;
            }if (n == d) {
              n = r;
            }
          }if (p.keyCode == 40) {
            if (m.options.liveSearch) {
              n += 1;
            }if (n == -1) {
              n = 0;
            }if (n != h && n < k) {
              n = k;
            }if (n > r) {
              n = r;
            }if (n == d) {
              n = j;
            }
          }q.data("prevIndex", n);if (!m.options.liveSearch) {
            o.eq(n).focus();
          } else {
            p.preventDefault();if (!q.is(".dropdown-toggle")) {
              o.removeClass("active");o.eq(n).addClass("active").find("a").focus();q.focus();
            }
          }
        } else {
          if (!q.is("input")) {
            var c = [],
                l,
                t;o.each(function () {
              if (b(this).parent().is(":not(.disabled)")) {
                if (b.trim(b(this).text().toLowerCase()).substring(0, 1) == g[p.keyCode]) {
                  c.push(b(this).parent().index());
                }
              }
            });l = b(document).data("keycount");l++;b(document).data("keycount", l);t = b.trim(b(":focus").text().toLowerCase()).substring(0, 1);if (t != g[p.keyCode]) {
              l = 1;b(document).data("keycount", l);
            } else {
              if (l >= c.length) {
                b(document).data("keycount", 0);if (l > c.length) {
                  l = 1;
                }
              }
            }o.eq(c[l - 1]).focus();
          }
        }if (/(13|32|^9$)/.test(p.keyCode) && s) {
          if (!/(32)/.test(p.keyCode)) {
            p.preventDefault();
          }if (!m.options.liveSearch) {
            b(":focus").click();
          } else {
            if (!/(32)/.test(p.keyCode)) {
              m.$menu.find(".active a").click();q.focus();
            }
          }b(document).data("keycount", 0);
        }if (/(^9$|27)/.test(p.keyCode) && s && (m.multiple || m.options.liveSearch) || /(27)/.test(p.keyCode) && !s) {
          m.$menu.parent().removeClass("open");m.$button.focus();
        }
      }, hide: function hide() {
        this.$newElement.hide();
      }, show: function show() {
        this.$newElement.show();
      }, destroy: function destroy() {
        this.$newElement.remove();this.$element.remove();
      } };b.fn.selectpicker = function (e, f) {
      var c = arguments;var g;var d = this.each(function () {
        if (b(this).is("select")) {
          var m = b(this),
              l = m.data("selectpicker"),
              h = (typeof e === "undefined" ? "undefined" : _typeof(e)) == "object" && e;if (!l) {
            m.data("selectpicker", l = new a(this, h, f));
          } else {
            if (h) {
              for (var j in h) {
                l.options[j] = h[j];
              }
            }
          }if (typeof e == "string") {
            var k = e;if (l[k] instanceof Function) {
              [].shift.apply(c);g = l[k].apply(l, c);
            } else {
              g = l.options[k];
            }
          }
        }
      });if (g !== undefined) {
        return g;
      } else {
        return d;
      }
    };b.fn.selectpicker.defaults = { style: "btn-default", size: "auto", title: null, selectedTextFormat: "values", noneSelectedText: "Nothing selected", noneResultsText: "No results match", countSelectedText: "{0} of {1} selected", maxOptionsText: ["Limit reached ({n} {var} max)", "Group limit reached ({n} {var} max)", ["items", "item"]], width: false, container: false, hideDisabled: false, showSubtext: false, showIcon: true, showContent: true, dropupAuto: true, header: false, liveSearch: false, actionsBox: false, multipleSeparator: ", ", iconBase: "glyphicon", tickIcon: "glyphicon-ok", maxOptions: false };b(document).data("keycount", 0).on("keydown", ".bootstrap-select [data-toggle=dropdown], .bootstrap-select [role=menu], .bootstrap-select-searchbox input", a.prototype.keydown).on("focusin.modal", ".bootstrap-select [data-toggle=dropdown], .bootstrap-select [role=menu], .bootstrap-select-searchbox input", function (c) {
      c.stopPropagation();
    });
  }(window.jQuery);
}).call(global, module, undefined, undefined);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"/var/www/streambed/shelly/toolpanel/static/toolpanel/dist/temp/jquery-1.8.3.min.js":3}],2:[function(require,module,exports){
(function (global){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

;$ = global.$ = require("/var/www/streambed/shelly/toolpanel/static/toolpanel/dist/temp/jquery-1.8.3.min.js");
;var __browserify_shim_require__ = require;(function browserifyShim(module, define, require) {
  /**
  * Bootstrap.js by @fat & @mdo
  * plugins: bootstrap-transition.js, bootstrap-modal.js, bootstrap-dropdown.js, bootstrap-scrollspy.js, bootstrap-tab.js, bootstrap-tooltip.js, bootstrap-popover.js, bootstrap-affix.js, bootstrap-alert.js, bootstrap-button.js, bootstrap-collapse.js, bootstrap-carousel.js, bootstrap-typeahead.js
  * Copyright 2012 Twitter, Inc.
  * http://www.apache.org/licenses/LICENSE-2.0.txt
  */
  !function (a) {
    a(function () {
      a.support.transition = function () {
        var a = function () {
          var a = document.createElement("bootstrap"),
              b = { WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "oTransitionEnd otransitionend", transition: "transitionend" },
              c;for (c in b) {
            if (a.style[c] !== undefined) return b[c];
          }
        }();return a && { end: a };
      }();
    });
  }(window.jQuery), !function (a) {
    var b = function b(_b, c) {
      this.options = c, this.$element = a(_b).delegate('[data-dismiss="modal"]', "click.dismiss.modal", a.proxy(this.hide, this)), this.options.remote && this.$element.find(".modal-body").load(this.options.remote);
    };b.prototype = { constructor: b, toggle: function toggle() {
        return this[this.isShown ? "hide" : "show"]();
      }, show: function show() {
        var b = this,
            c = a.Event("show");this.$element.trigger(c);if (this.isShown || c.isDefaultPrevented()) return;a("body").addClass("modal-open"), this.isShown = !0, this.escape(), this.backdrop(function () {
          var c = a.support.transition && b.$element.hasClass("fade");b.$element.parent().length || b.$element.appendTo(document.body), b.$element.show(), c && b.$element[0].offsetWidth, b.$element.addClass("in").attr("aria-hidden", !1).focus(), b.enforceFocus(), c ? b.$element.one(a.support.transition.end, function () {
            b.$element.trigger("shown");
          }) : b.$element.trigger("shown");
        });
      }, hide: function hide(b) {
        b && b.preventDefault();var c = this;b = a.Event("hide"), this.$element.trigger(b);if (!this.isShown || b.isDefaultPrevented()) return;this.isShown = !1, a("body").removeClass("modal-open"), this.escape(), a(document).off("focusin.modal"), this.$element.removeClass("in").attr("aria-hidden", !0), a.support.transition && this.$element.hasClass("fade") ? this.hideWithTransition() : this.hideModal();
      }, enforceFocus: function enforceFocus() {
        var b = this;a(document).on("focusin.modal", function (a) {
          b.$element[0] !== a.target && !b.$element.has(a.target).length && b.$element.focus();
        });
      }, escape: function escape() {
        var a = this;this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.modal", function (b) {
          b.which == 27 && a.hide();
        }) : this.isShown || this.$element.off("keyup.dismiss.modal");
      }, hideWithTransition: function hideWithTransition() {
        var b = this,
            c = setTimeout(function () {
          b.$element.off(a.support.transition.end), b.hideModal();
        }, 500);this.$element.one(a.support.transition.end, function () {
          clearTimeout(c), b.hideModal();
        });
      }, hideModal: function hideModal(a) {
        this.$element.hide().trigger("hidden"), this.backdrop();
      }, removeBackdrop: function removeBackdrop() {
        this.$backdrop.remove(), this.$backdrop = null;
      }, backdrop: function backdrop(b) {
        var c = this,
            d = this.$element.hasClass("fade") ? "fade" : "";if (this.isShown && this.options.backdrop) {
          var e = a.support.transition && d;this.$backdrop = a('<div class="modal-backdrop ' + d + '" />').appendTo(document.body), this.options.backdrop != "static" && this.$backdrop.click(a.proxy(this.hide, this)), e && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), e ? this.$backdrop.one(a.support.transition.end, b) : b();
        } else !this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(a.support.transition.end, a.proxy(this.removeBackdrop, this)) : this.removeBackdrop()) : b && b();
      } }, a.fn.modal = function (c) {
      return this.each(function () {
        var d = a(this),
            e = d.data("modal"),
            f = a.extend({}, a.fn.modal.defaults, d.data(), (typeof c === "undefined" ? "undefined" : _typeof(c)) == "object" && c);e || d.data("modal", e = new b(this, f)), typeof c == "string" ? e[c]() : f.show && e.show();
      });
    }, a.fn.modal.defaults = { backdrop: !0, keyboard: !0, show: !0 }, a.fn.modal.Constructor = b, a(function () {
      a("body").on("click.modal.data-api", '[data-toggle="modal"]', function (b) {
        var c = a(this),
            d = c.attr("href"),
            e = a(c.attr("data-target") || d && d.replace(/.*(?=#[^\s]+$)/, "")),
            f = e.data("modal") ? "toggle" : a.extend({ remote: !/#/.test(d) && d }, e.data(), c.data());b.preventDefault(), e.modal(f).one("hide", function () {
          c.focus();
        });
      });
    });
  }(window.jQuery), !function (a) {
    function d() {
      a(b).each(function () {
        e(a(this)).removeClass("open");
      });
    }function e(b) {
      var c = b.attr("data-target"),
          d;return c || (c = b.attr("href"), c = c && /#/.test(c) && c.replace(/.*(?=#[^\s]*$)/, "")), d = a(c), d.length || (d = b.parent()), d;
    }var b = "[data-toggle=dropdown]",
        c = function c(b) {
      var c = a(b).on("click.dropdown.data-api", this.toggle);a("html").on("click.dropdown.data-api", function () {
        c.parent().removeClass("open");
      });
    };c.prototype = { constructor: c, toggle: function toggle(b) {
        var c = a(this),
            f,
            g;if (c.is(".disabled, :disabled")) return;return f = e(c), g = f.hasClass("open"), d(), g || (f.toggleClass("open"), c.focus()), !1;
      }, keydown: function keydown(b) {
        var c, d, f, g, h, i;if (!/(38|40|27)/.test(b.keyCode)) return;c = a(this), b.preventDefault(), b.stopPropagation();if (c.is(".disabled, :disabled")) return;g = e(c), h = g.hasClass("open");if (!h || h && b.keyCode == 27) return c.click();d = a("[role=menu] li:not(.divider) a", g);if (!d.length) return;i = d.index(d.filter(":focus")), b.keyCode == 38 && i > 0 && i--, b.keyCode == 40 && i < d.length - 1 && i++, ~i || (i = 0), d.eq(i).focus();
      } }, a.fn.dropdown = function (b) {
      return this.each(function () {
        var d = a(this),
            e = d.data("dropdown");e || d.data("dropdown", e = new c(this)), typeof b == "string" && e[b].call(d);
      });
    }, a.fn.dropdown.Constructor = c, a(function () {
      a("html").on("click.dropdown.data-api touchstart.dropdown.data-api", d), a("body").on("click.dropdown touchstart.dropdown.data-api", ".dropdown form", function (a) {
        a.stopPropagation();
      }).on('touchstart.dropdown.data-api', '.dropdown-menu', function (e) {
        e.stopPropagation();
      }).on("click.dropdown.data-api touchstart.dropdown.data-api", b, c.prototype.toggle).on("keydown.dropdown.data-api touchstart.dropdown.data-api", b + ", [role=menu]", c.prototype.keydown);
    });
  }(window.jQuery), !function (a) {
    function b(b, c) {
      var d = a.proxy(this.process, this),
          e = a(b).is("body") ? a(window) : a(b),
          f;this.options = a.extend({}, a.fn.scrollspy.defaults, c), this.$scrollElement = e.on("scroll.scroll-spy.data-api", d), this.selector = (this.options.target || (f = a(b).attr("href")) && f.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li > a", this.$body = a("body"), this.refresh(), this.process();
    }b.prototype = { constructor: b, refresh: function refresh() {
        var b = this,
            c;this.offsets = a([]), this.targets = a([]), c = this.$body.find(this.selector).map(function () {
          var b = a(this),
              c = b.data("target") || b.attr("href"),
              d = /^#\w/.test(c) && a(c);return d && d.length && [[d.position().top, c]] || null;
        }).sort(function (a, b) {
          return a[0] - b[0];
        }).each(function () {
          b.offsets.push(this[0]), b.targets.push(this[1]);
        });
      }, process: function process() {
        var a = this.$scrollElement.scrollTop() + this.options.offset,
            b = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight,
            c = b - this.$scrollElement.height(),
            d = this.offsets,
            e = this.targets,
            f = this.activeTarget,
            g;if (a >= c) return f != (g = e.last()[0]) && this.activate(g);for (g = d.length; g--;) {
          f != e[g] && a >= d[g] && (!d[g + 1] || a <= d[g + 1]) && this.activate(e[g]);
        }
      }, activate: function activate(b) {
        var c, d;this.activeTarget = b, a(this.selector).parent(".active").removeClass("active"), d = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]', c = a(d).parent("li").addClass("active"), c.parent(".dropdown-menu").length && (c = c.closest("li.dropdown").addClass("active")), c.trigger("activate");
      } }, a.fn.scrollspy = function (c) {
      return this.each(function () {
        var d = a(this),
            e = d.data("scrollspy"),
            f = (typeof c === "undefined" ? "undefined" : _typeof(c)) == "object" && c;e || d.data("scrollspy", e = new b(this, f)), typeof c == "string" && e[c]();
      });
    }, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.defaults = { offset: 10 }, a(window).on("load", function () {
      a('[data-spy="scroll"]').each(function () {
        var b = a(this);b.scrollspy(b.data());
      });
    });
  }(window.jQuery), !function (a) {
    var b = function b(_b2) {
      this.element = a(_b2);
    };b.prototype = { constructor: b, show: function show() {
        var b = this.element,
            c = b.closest("ul:not(.dropdown-menu)"),
            d = b.attr("data-target"),
            e,
            f,
            g;d || (d = b.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, ""));if (b.parent("li").hasClass("active")) return;e = c.find(".active a").last()[0], g = a.Event("show", { relatedTarget: e }), b.trigger(g);if (g.isDefaultPrevented()) return;f = a(d), this.activate(b.parent("li"), c), this.activate(f, f.parent(), function () {
          b.trigger({ type: "shown", relatedTarget: e });
        });
      }, activate: function activate(b, c, d) {
        function g() {
          e.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), b.addClass("active"), f ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"), b.parent(".dropdown-menu") && b.closest("li.dropdown").addClass("active"), d && d();
        }var e = c.find("> .active"),
            f = d && a.support.transition && e.hasClass("fade");f ? e.one(a.support.transition.end, g) : g(), e.removeClass("in");
      } }, a.fn.tab = function (c) {
      return this.each(function () {
        var d = a(this),
            e = d.data("tab");e || d.data("tab", e = new b(this)), typeof c == "string" && e[c]();
      });
    }, a.fn.tab.Constructor = b, a(function () {
      a("body").on("click.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function (b) {
        b.preventDefault(), a(this).tab("show");
      });
    });
  }(window.jQuery), !function (a) {
    var b = function b(a, _b3) {
      this.init("tooltip", a, _b3);
    };b.prototype = { constructor: b, init: function init(b, c, d) {
        var e, f;this.type = b, this.$element = a(c), this.options = this.getOptions(d), this.enabled = !0, this.options.trigger == "click" ? this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this)) : this.options.trigger != "manual" && (e = this.options.trigger == "hover" ? "mouseenter" : "focus", f = this.options.trigger == "hover" ? "mouseleave" : "blur", this.$element.on(e + "." + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(f + "." + this.type, this.options.selector, a.proxy(this.leave, this))), this.options.selector ? this._options = a.extend({}, this.options, { trigger: "manual", selector: "" }) : this.fixTitle();
      }, getOptions: function getOptions(b) {
        return b = a.extend({}, a.fn[this.type].defaults, b, this.$element.data()), b.delay && typeof b.delay == "number" && (b.delay = { show: b.delay, hide: b.delay }), b;
      }, enter: function enter(b) {
        var c = a(b.currentTarget)[this.type](this._options).data(this.type);if (!c.options.delay || !c.options.delay.show) return c.show();clearTimeout(this.timeout), c.hoverState = "in", this.timeout = setTimeout(function () {
          c.hoverState == "in" && c.show();
        }, c.options.delay.show);
      }, leave: function leave(b) {
        var c = a(b.currentTarget)[this.type](this._options).data(this.type);this.timeout && clearTimeout(this.timeout);if (!c.options.delay || !c.options.delay.hide) return c.hide();c.hoverState = "out", this.timeout = setTimeout(function () {
          c.hoverState == "out" && c.hide();
        }, c.options.delay.hide);
      }, show: function show() {
        var a, b, c, d, e, f, g;if (this.hasContent() && this.enabled) {
          a = this.tip(), this.setContent(), this.options.animation && a.addClass("fade"), f = typeof this.options.placement == "function" ? this.options.placement.call(this, a[0], this.$element[0]) : this.options.placement, b = /in/.test(f), a.remove().css({ top: 0, left: 0, display: "block" }).appendTo(b ? this.$element : document.body), c = this.getPosition(b), d = a[0].offsetWidth, e = a[0].offsetHeight;switch (b ? f.split(" ")[1] : f) {case "bottom":
              g = { top: c.top + c.height, left: c.left + c.width / 2 - d / 2 };break;case "top":
              g = { top: c.top - e, left: c.left + c.width / 2 - d / 2 };break;case "left":
              g = { top: c.top + c.height / 2 - e / 2, left: c.left - d };break;case "right":
              g = { top: c.top + c.height / 2 - e / 2, left: c.left + c.width };}a.css(g).addClass(f).addClass("in");
        }
      }, setContent: function setContent() {
        var a = this.tip(),
            b = this.getTitle();a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right");
      }, hide: function hide() {
        function d() {
          var b = setTimeout(function () {
            c.off(a.support.transition.end).remove();
          }, 500);c.one(a.support.transition.end, function () {
            clearTimeout(b), c.remove();
          });
        }var b = this,
            c = this.tip();return c.removeClass("in"), a.support.transition && this.$tip.hasClass("fade") ? d() : c.remove(), this;
      }, fixTitle: function fixTitle() {
        var a = this.$element;(a.attr("title") || typeof a.attr("data-original-title") != "string") && a.attr("data-original-title", a.attr("title") || "").removeAttr("title");
      }, hasContent: function hasContent() {
        return this.getTitle();
      }, getPosition: function getPosition(b) {
        return a.extend({}, b ? { top: 0, left: 0 } : this.$element.offset(), { width: this.$element[0].offsetWidth, height: this.$element[0].offsetHeight });
      }, getTitle: function getTitle() {
        var a,
            b = this.$element,
            c = this.options;return a = b.attr("data-original-title") || (typeof c.title == "function" ? c.title.call(b[0]) : c.title), a;
      }, tip: function tip() {
        return this.$tip = this.$tip || a(this.options.template);
      }, validate: function validate() {
        this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null);
      }, enable: function enable() {
        this.enabled = !0;
      }, disable: function disable() {
        this.enabled = !1;
      }, toggleEnabled: function toggleEnabled() {
        this.enabled = !this.enabled;
      }, toggle: function toggle() {
        this[this.tip().hasClass("in") ? "hide" : "show"]();
      }, destroy: function destroy() {
        this.hide().$element.off("." + this.type).removeData(this.type);
      } }, a.fn.tooltip = function (c) {
      return this.each(function () {
        var d = a(this),
            e = d.data("tooltip"),
            f = (typeof c === "undefined" ? "undefined" : _typeof(c)) == "object" && c;e || d.data("tooltip", e = new b(this, f)), typeof c == "string" && e[c]();
      });
    }, a.fn.tooltip.Constructor = b, a.fn.tooltip.defaults = { animation: !0, placement: "top", selector: !1, template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>', trigger: "hover", title: "", delay: 0, html: !0 };
  }(window.jQuery), !function (a) {
    var b = function b(a, _b4) {
      this.init("popover", a, _b4);
    };b.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype, { constructor: b, setContent: function setContent() {
        var a = this.tip(),
            b = this.getTitle(),
            c = this.getContent();a.find(".popover-title")[this.options.html ? "html" : "text"](b), a.find(".popover-content > *")[this.options.html ? "html" : "text"](c), a.removeClass("fade top bottom left right in");
      }, hasContent: function hasContent() {
        return this.getTitle() || this.getContent();
      }, getContent: function getContent() {
        var a,
            b = this.$element,
            c = this.options;return a = b.attr("data-content") || (typeof c.content == "function" ? c.content.call(b[0]) : c.content), a;
      }, tip: function tip() {
        return this.$tip || (this.$tip = a(this.options.template)), this.$tip;
      }, destroy: function destroy() {
        this.hide().$element.off("." + this.type).removeData(this.type);
      } }), a.fn.popover = function (c) {
      return this.each(function () {
        var d = a(this),
            e = d.data("popover"),
            f = (typeof c === "undefined" ? "undefined" : _typeof(c)) == "object" && c;e || d.data("popover", e = new b(this, f)), typeof c == "string" && e[c]();
      });
    }, a.fn.popover.Constructor = b, a.fn.popover.defaults = a.extend({}, a.fn.tooltip.defaults, { placement: "right", trigger: "click", content: "", template: '<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>' });
  }(window.jQuery), !function (a) {
    var b = function b(_b5, c) {
      this.options = a.extend({}, a.fn.affix.defaults, c), this.$window = a(window).on("scroll.affix.data-api", a.proxy(this.checkPosition, this)), this.$element = a(_b5), this.checkPosition();
    };b.prototype.checkPosition = function () {
      if (!this.$element.is(":visible")) return;var b = a(document).height(),
          c = this.$window.scrollTop(),
          d = this.$element.offset(),
          e = this.options.offset,
          f = e.bottom,
          g = e.top,
          h = "affix affix-top affix-bottom",
          i;(typeof e === "undefined" ? "undefined" : _typeof(e)) != "object" && (f = g = e), typeof g == "function" && (g = e.top()), typeof f == "function" && (f = e.bottom()), i = this.unpin != null && c + this.unpin <= d.top ? !1 : f != null && d.top + this.$element.height() >= b - f ? "bottom" : g != null && c <= g ? "top" : !1;if (this.affixed === i) return;this.affixed = i, this.unpin = i == "bottom" ? d.top - c : null, this.$element.removeClass(h).addClass("affix" + (i ? "-" + i : ""));
    }, a.fn.affix = function (c) {
      return this.each(function () {
        var d = a(this),
            e = d.data("affix"),
            f = (typeof c === "undefined" ? "undefined" : _typeof(c)) == "object" && c;e || d.data("affix", e = new b(this, f)), typeof c == "string" && e[c]();
      });
    }, a.fn.affix.Constructor = b, a.fn.affix.defaults = { offset: 0 }, a(window).on("load", function () {
      a('[data-spy="affix"]').each(function () {
        var b = a(this),
            c = b.data();c.offset = c.offset || {}, c.offsetBottom && (c.offset.bottom = c.offsetBottom), c.offsetTop && (c.offset.top = c.offsetTop), b.affix(c);
      });
    });
  }(window.jQuery), !function (a) {
    var b = '[data-dismiss="alert"]',
        c = function c(_c) {
      a(_c).on("click", b, this.close);
    };c.prototype.close = function (b) {
      function f() {
        e.trigger("closed").remove();
      }var c = a(this),
          d = c.attr("data-target"),
          e;d || (d = c.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, "")), e = a(d), b && b.preventDefault(), e.length || (e = c.hasClass("alert") ? c : c.parent()), e.trigger(b = a.Event("close"));if (b.isDefaultPrevented()) return;e.removeClass("in"), a.support.transition && e.hasClass("fade") ? e.on(a.support.transition.end, f) : f();
    }, a.fn.alert = function (b) {
      return this.each(function () {
        var d = a(this),
            e = d.data("alert");e || d.data("alert", e = new c(this)), typeof b == "string" && e[b].call(d);
      });
    }, a.fn.alert.Constructor = c, a(function () {
      a("body").on("click.alert.data-api", b, c.prototype.close);
    });
  }(window.jQuery), !function (a) {
    var b = function b(_b6, c) {
      this.$element = a(_b6), this.options = a.extend({}, a.fn.button.defaults, c);
    };b.prototype.setState = function (a) {
      var b = "disabled",
          c = this.$element,
          d = c.data(),
          e = c.is("input") ? "val" : "html";a += "Text", d.resetText || c.data("resetText", c[e]()), c[e](d[a] || this.options[a]), setTimeout(function () {
        a == "loadingText" ? c.addClass(b).attr(b, b) : c.removeClass(b).removeAttr(b);
      }, 0);
    }, b.prototype.toggle = function () {
      var a = this.$element.closest('[data-toggle="buttons-radio"]');a && a.find(".active").removeClass("active"), this.$element.toggleClass("active");
    }, a.fn.button = function (c) {
      return this.each(function () {
        var d = a(this),
            e = d.data("button"),
            f = (typeof c === "undefined" ? "undefined" : _typeof(c)) == "object" && c;e || d.data("button", e = new b(this, f)), c == "toggle" ? e.toggle() : c && e.setState(c);
      });
    }, a.fn.button.defaults = { loadingText: "loading..." }, a.fn.button.Constructor = b, a(function () {
      a("body").on("click.button.data-api", "[data-toggle^=button]", function (b) {
        var c = a(b.target);c.hasClass("btn") || (c = c.closest(".btn")), c.button("toggle");
      });
    });
  }(window.jQuery), !function (a) {
    var b = function b(_b7, c) {
      this.$element = a(_b7), this.options = a.extend({}, a.fn.collapse.defaults, c), this.options.parent && (this.$parent = a(this.options.parent)), this.options.toggle && this.toggle();
    };b.prototype = { constructor: b, dimension: function dimension() {
        var a = this.$element.hasClass("width");return a ? "width" : "height";
      }, show: function show() {
        var b, c, d, e;if (this.transitioning) return;b = this.dimension(), c = a.camelCase(["scroll", b].join("-")), d = this.$parent && this.$parent.find("> .accordion-group > .in");if (d && d.length) {
          e = d.data("collapse");if (e && e.transitioning) return;d.collapse("hide"), e || d.data("collapse", null);
        }this.$element[b](0), this.transition("addClass", a.Event("show"), "shown"), a.support.transition && this.$element[b](this.$element[0][c]);
      }, hide: function hide() {
        var b;if (this.transitioning) return;b = this.dimension(), this.reset(this.$element[b]()), this.transition("removeClass", a.Event("hide"), "hidden"), this.$element[b](0);
      }, reset: function reset(a) {
        var b = this.dimension();return this.$element.removeClass("collapse")[b](a || "auto")[0].offsetWidth, this.$element[a !== null ? "addClass" : "removeClass"]("collapse"), this;
      }, transition: function transition(b, c, d) {
        var e = this,
            f = function f() {
          c.type == "show" && e.reset(), e.transitioning = 0, e.$element.trigger(d);
        };this.$element.trigger(c);if (c.isDefaultPrevented()) return;this.transitioning = 1, this.$element[b]("in"), a.support.transition && this.$element.hasClass("collapse") ? this.$element.one(a.support.transition.end, f) : f();
      }, toggle: function toggle() {
        this[this.$element.hasClass("in") ? "hide" : "show"]();
      } }, a.fn.collapse = function (c) {
      return this.each(function () {
        var d = a(this),
            e = d.data("collapse"),
            f = (typeof c === "undefined" ? "undefined" : _typeof(c)) == "object" && c;e || d.data("collapse", e = new b(this, f)), typeof c == "string" && e[c]();
      });
    }, a.fn.collapse.defaults = { toggle: !0 }, a.fn.collapse.Constructor = b, a(function () {
      a("body").on("click.collapse.data-api", "[data-toggle=collapse]", function (b) {
        var c = a(this),
            d,
            e = c.attr("data-target") || b.preventDefault() || (d = c.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""),
            f = a(e).data("collapse") ? "toggle" : c.data();c[a(e).hasClass("in") ? "addClass" : "removeClass"]("collapsed"), a(e).collapse(f);
      });
    });
  }(window.jQuery), !function (a) {
    var b = function b(_b8, c) {
      this.$element = a(_b8), this.options = c, this.options.slide && this.slide(this.options.slide), this.options.pause == "hover" && this.$element.on("mouseenter", a.proxy(this.pause, this)).on("mouseleave", a.proxy(this.cycle, this));
    };b.prototype = { cycle: function cycle(b) {
        return b || (this.paused = !1), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), this;
      }, to: function to(b) {
        var c = this.$element.find(".item.active"),
            d = c.parent().children(),
            e = d.index(c),
            f = this;if (b > d.length - 1 || b < 0) return;return this.sliding ? this.$element.one("slid", function () {
          f.to(b);
        }) : e == b ? this.pause().cycle() : this.slide(b > e ? "next" : "prev", a(d[b]));
      }, pause: function pause(b) {
        return b || (this.paused = !0), this.$element.find(".next, .prev").length && a.support.transition.end && (this.$element.trigger(a.support.transition.end), this.cycle()), clearInterval(this.interval), this.interval = null, this;
      }, next: function next() {
        if (this.sliding) return;return this.slide("next");
      }, prev: function prev() {
        if (this.sliding) return;return this.slide("prev");
      }, slide: function slide(b, c) {
        var d = this.$element.find(".item.active"),
            e = c || d[b](),
            f = this.interval,
            g = b == "next" ? "left" : "right",
            h = b == "next" ? "first" : "last",
            i = this,
            j = a.Event("slide", { relatedTarget: e[0] });this.sliding = !0, f && this.pause(), e = e.length ? e : this.$element.find(".item")[h]();if (e.hasClass("active")) return;if (a.support.transition && this.$element.hasClass("slide")) {
          this.$element.trigger(j);if (j.isDefaultPrevented()) return;e.addClass(b), e[0].offsetWidth, d.addClass(g), e.addClass(g), this.$element.one(a.support.transition.end, function () {
            e.removeClass([b, g].join(" ")).addClass("active"), d.removeClass(["active", g].join(" ")), i.sliding = !1, setTimeout(function () {
              i.$element.trigger("slid");
            }, 0);
          });
        } else {
          this.$element.trigger(j);if (j.isDefaultPrevented()) return;d.removeClass("active"), e.addClass("active"), this.sliding = !1, this.$element.trigger("slid");
        }return f && this.cycle(), this;
      } }, a.fn.carousel = function (c) {
      return this.each(function () {
        var d = a(this),
            e = d.data("carousel"),
            f = a.extend({}, a.fn.carousel.defaults, (typeof c === "undefined" ? "undefined" : _typeof(c)) == "object" && c),
            g = typeof c == "string" ? c : f.slide;e || d.data("carousel", e = new b(this, f)), typeof c == "number" ? e.to(c) : g ? e[g]() : f.interval && e.cycle();
      });
    }, a.fn.carousel.defaults = { interval: 5e3, pause: "hover" }, a.fn.carousel.Constructor = b, a(function () {
      a("body").on("click.carousel.data-api", "[data-slide]", function (b) {
        var c = a(this),
            d,
            e = a(c.attr("data-target") || (d = c.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, "")),
            f = !e.data("modal") && a.extend({}, e.data(), c.data());e.carousel(f), b.preventDefault();
      });
    });
  }(window.jQuery), !function (a) {
    var b = function b(_b9, c) {
      this.$element = a(_b9), this.options = a.extend({}, a.fn.typeahead.defaults, c), this.matcher = this.options.matcher || this.matcher, this.sorter = this.options.sorter || this.sorter, this.highlighter = this.options.highlighter || this.highlighter, this.updater = this.options.updater || this.updater, this.$menu = a(this.options.menu).appendTo("body"), this.source = this.options.source, this.shown = !1, this.listen();
    };b.prototype = { constructor: b, select: function select() {
        var a = this.$menu.find(".active").attr("data-value");return this.$element.val(this.updater(a)).change(), this.hide();
      }, updater: function updater(a) {
        return a;
      }, show: function show() {
        var b = a.extend({}, this.$element.offset(), { height: this.$element[0].offsetHeight });return this.$menu.css({ top: b.top + b.height, left: b.left }), this.$menu.show(), this.shown = !0, this;
      }, hide: function hide() {
        return this.$menu.hide(), this.shown = !1, this;
      }, lookup: function lookup(b) {
        var c;return this.query = this.$element.val(), !this.query || this.query.length < this.options.minLength ? this.shown ? this.hide() : this : (c = a.isFunction(this.source) ? this.source(this.query, a.proxy(this.process, this)) : this.source, c ? this.process(c) : this);
      }, process: function process(b) {
        var c = this;return b = a.grep(b, function (a) {
          return c.matcher(a);
        }), b = this.sorter(b), b.length ? this.render(b.slice(0, this.options.items)).show() : this.shown ? this.hide() : this;
      }, matcher: function matcher(a) {
        return ~a.toLowerCase().indexOf(this.query.toLowerCase());
      }, sorter: function sorter(a) {
        var b = [],
            c = [],
            d = [],
            e;while (e = a.shift()) {
          e.toLowerCase().indexOf(this.query.toLowerCase()) ? ~e.indexOf(this.query) ? c.push(e) : d.push(e) : b.push(e);
        }return b.concat(c, d);
      }, highlighter: function highlighter(a) {
        var b = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");return a.replace(new RegExp("(" + b + ")", "ig"), function (a, b) {
          return "<strong>" + b + "</strong>";
        });
      }, render: function render(b) {
        var c = this;return b = a(b).map(function (b, d) {
          return b = a(c.options.item).attr("data-value", d), b.find("a").html(c.highlighter(d)), b[0];
        }), b.first().addClass("active"), this.$menu.html(b), this;
      }, next: function next(b) {
        var c = this.$menu.find(".active").removeClass("active"),
            d = c.next();d.length || (d = a(this.$menu.find("li")[0])), d.addClass("active");
      }, prev: function prev(a) {
        var b = this.$menu.find(".active").removeClass("active"),
            c = b.prev();c.length || (c = this.$menu.find("li").last()), c.addClass("active");
      }, listen: function listen() {
        this.$element.on("blur", a.proxy(this.blur, this)).on("keypress", a.proxy(this.keypress, this)).on("keyup", a.proxy(this.keyup, this)), (a.browser.chrome || a.browser.webkit || a.browser.msie) && this.$element.on("keydown", a.proxy(this.keydown, this)), this.$menu.on("click", a.proxy(this.click, this)).on("mouseenter", "li", a.proxy(this.mouseenter, this));
      }, move: function move(a) {
        if (!this.shown) return;switch (a.keyCode) {case 9:case 13:case 27:
            a.preventDefault();break;case 38:
            a.preventDefault(), this.prev();break;case 40:
            a.preventDefault(), this.next();}a.stopPropagation();
      }, keydown: function keydown(b) {
        this.suppressKeyPressRepeat = ! ~a.inArray(b.keyCode, [40, 38, 9, 13, 27]), this.move(b);
      }, keypress: function keypress(a) {
        if (this.suppressKeyPressRepeat) return;this.move(a);
      }, keyup: function keyup(a) {
        switch (a.keyCode) {case 40:case 38:
            break;case 9:case 13:
            if (!this.shown) return;this.select();break;case 27:
            if (!this.shown) return;this.hide();break;default:
            this.lookup();}a.stopPropagation(), a.preventDefault();
      }, blur: function blur(a) {
        var b = this;setTimeout(function () {
          b.hide();
        }, 150);
      }, click: function click(a) {
        a.stopPropagation(), a.preventDefault(), this.select();
      }, mouseenter: function mouseenter(b) {
        this.$menu.find(".active").removeClass("active"), a(b.currentTarget).addClass("active");
      } }, a.fn.typeahead = function (c) {
      return this.each(function () {
        var d = a(this),
            e = d.data("typeahead"),
            f = (typeof c === "undefined" ? "undefined" : _typeof(c)) == "object" && c;e || d.data("typeahead", e = new b(this, f)), typeof c == "string" && e[c]();
      });
    }, a.fn.typeahead.defaults = { source: [], items: 8, menu: '<ul class="typeahead dropdown-menu"></ul>', item: '<li><a href="#"></a></li>', minLength: 1 }, a.fn.typeahead.Constructor = b, a(function () {
      a("body").on("focus.typeahead.data-api", '[data-provide="typeahead"]', function (b) {
        var c = a(this);if (c.data("typeahead")) return;b.preventDefault(), c.typeahead(c.data());
      });
    });
  }(window.jQuery);
}).call(global, module, undefined, undefined);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"/var/www/streambed/shelly/toolpanel/static/toolpanel/dist/temp/jquery-1.8.3.min.js":3}],3:[function(require,module,exports){
(function (global){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

;var __browserify_shim_require__ = require;(function browserifyShim(module, exports, require, define, browserify_shim__define__module__export__) {
  /*! jQuery v1.8.3 jquery.com | jquery.org/license */
  (function (e, t) {
    function _(e) {
      var t = M[e] = {};return v.each(e.split(y), function (e, n) {
        t[n] = !0;
      }), t;
    }function H(e, n, r) {
      if (r === t && e.nodeType === 1) {
        var i = "data-" + n.replace(P, "-$1").toLowerCase();r = e.getAttribute(i);if (typeof r == "string") {
          try {
            r = r === "true" ? !0 : r === "false" ? !1 : r === "null" ? null : +r + "" === r ? +r : D.test(r) ? v.parseJSON(r) : r;
          } catch (s) {}v.data(e, n, r);
        } else r = t;
      }return r;
    }function B(e) {
      var t;for (t in e) {
        if (t === "data" && v.isEmptyObject(e[t])) continue;if (t !== "toJSON") return !1;
      }return !0;
    }function et() {
      return !1;
    }function tt() {
      return !0;
    }function ut(e) {
      return !e || !e.parentNode || e.parentNode.nodeType === 11;
    }function at(e, t) {
      do {
        e = e[t];
      } while (e && e.nodeType !== 1);return e;
    }function ft(e, t, n) {
      t = t || 0;if (v.isFunction(t)) return v.grep(e, function (e, r) {
        var i = !!t.call(e, r, e);return i === n;
      });if (t.nodeType) return v.grep(e, function (e, r) {
        return e === t === n;
      });if (typeof t == "string") {
        var r = v.grep(e, function (e) {
          return e.nodeType === 1;
        });if (it.test(t)) return v.filter(t, r, !n);t = v.filter(t, r);
      }return v.grep(e, function (e, r) {
        return v.inArray(e, t) >= 0 === n;
      });
    }function lt(e) {
      var t = ct.split("|"),
          n = e.createDocumentFragment();if (n.createElement) while (t.length) {
        n.createElement(t.pop());
      }return n;
    }function Lt(e, t) {
      return e.getElementsByTagName(t)[0] || e.appendChild(e.ownerDocument.createElement(t));
    }function At(e, t) {
      if (t.nodeType !== 1 || !v.hasData(e)) return;var n,
          r,
          i,
          s = v._data(e),
          o = v._data(t, s),
          u = s.events;if (u) {
        delete o.handle, o.events = {};for (n in u) {
          for (r = 0, i = u[n].length; r < i; r++) {
            v.event.add(t, n, u[n][r]);
          }
        }
      }o.data && (o.data = v.extend({}, o.data));
    }function Ot(e, t) {
      var n;if (t.nodeType !== 1) return;t.clearAttributes && t.clearAttributes(), t.mergeAttributes && t.mergeAttributes(e), n = t.nodeName.toLowerCase(), n === "object" ? (t.parentNode && (t.outerHTML = e.outerHTML), v.support.html5Clone && e.innerHTML && !v.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : n === "input" && Et.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : n === "option" ? t.selected = e.defaultSelected : n === "input" || n === "textarea" ? t.defaultValue = e.defaultValue : n === "script" && t.text !== e.text && (t.text = e.text), t.removeAttribute(v.expando);
    }function Mt(e) {
      return typeof e.getElementsByTagName != "undefined" ? e.getElementsByTagName("*") : typeof e.querySelectorAll != "undefined" ? e.querySelectorAll("*") : [];
    }function _t(e) {
      Et.test(e.type) && (e.defaultChecked = e.checked);
    }function Qt(e, t) {
      if (t in e) return t;var n = t.charAt(0).toUpperCase() + t.slice(1),
          r = t,
          i = Jt.length;while (i--) {
        t = Jt[i] + n;if (t in e) return t;
      }return r;
    }function Gt(e, t) {
      return e = t || e, v.css(e, "display") === "none" || !v.contains(e.ownerDocument, e);
    }function Yt(e, t) {
      var n,
          r,
          i = [],
          s = 0,
          o = e.length;for (; s < o; s++) {
        n = e[s];if (!n.style) continue;i[s] = v._data(n, "olddisplay"), t ? (!i[s] && n.style.display === "none" && (n.style.display = ""), n.style.display === "" && Gt(n) && (i[s] = v._data(n, "olddisplay", nn(n.nodeName)))) : (r = Dt(n, "display"), !i[s] && r !== "none" && v._data(n, "olddisplay", r));
      }for (s = 0; s < o; s++) {
        n = e[s];if (!n.style) continue;if (!t || n.style.display === "none" || n.style.display === "") n.style.display = t ? i[s] || "" : "none";
      }return e;
    }function Zt(e, t, n) {
      var r = Rt.exec(t);return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t;
    }function en(e, t, n, r) {
      var i = n === (r ? "border" : "content") ? 4 : t === "width" ? 1 : 0,
          s = 0;for (; i < 4; i += 2) {
        n === "margin" && (s += v.css(e, n + $t[i], !0)), r ? (n === "content" && (s -= parseFloat(Dt(e, "padding" + $t[i])) || 0), n !== "margin" && (s -= parseFloat(Dt(e, "border" + $t[i] + "Width")) || 0)) : (s += parseFloat(Dt(e, "padding" + $t[i])) || 0, n !== "padding" && (s += parseFloat(Dt(e, "border" + $t[i] + "Width")) || 0));
      }return s;
    }function tn(e, t, n) {
      var r = t === "width" ? e.offsetWidth : e.offsetHeight,
          i = !0,
          s = v.support.boxSizing && v.css(e, "boxSizing") === "border-box";if (r <= 0 || r == null) {
        r = Dt(e, t);if (r < 0 || r == null) r = e.style[t];if (Ut.test(r)) return r;i = s && (v.support.boxSizingReliable || r === e.style[t]), r = parseFloat(r) || 0;
      }return r + en(e, t, n || (s ? "border" : "content"), i) + "px";
    }function nn(e) {
      if (Wt[e]) return Wt[e];var t = v("<" + e + ">").appendTo(i.body),
          n = t.css("display");t.remove();if (n === "none" || n === "") {
        Pt = i.body.appendChild(Pt || v.extend(i.createElement("iframe"), { frameBorder: 0, width: 0, height: 0 }));if (!Ht || !Pt.createElement) Ht = (Pt.contentWindow || Pt.contentDocument).document, Ht.write("<!doctype html><html><body>"), Ht.close();t = Ht.body.appendChild(Ht.createElement(e)), n = Dt(t, "display"), i.body.removeChild(Pt);
      }return Wt[e] = n, n;
    }function fn(e, t, n, r) {
      var i;if (v.isArray(t)) v.each(t, function (t, i) {
        n || sn.test(e) ? r(e, i) : fn(e + "[" + ((typeof i === "undefined" ? "undefined" : _typeof(i)) == "object" ? t : "") + "]", i, n, r);
      });else if (!n && v.type(t) === "object") for (i in t) {
        fn(e + "[" + i + "]", t[i], n, r);
      } else r(e, t);
    }function Cn(e) {
      return function (t, n) {
        typeof t != "string" && (n = t, t = "*");var r,
            i,
            s,
            o = t.toLowerCase().split(y),
            u = 0,
            a = o.length;if (v.isFunction(n)) for (; u < a; u++) {
          r = o[u], s = /^\+/.test(r), s && (r = r.substr(1) || "*"), i = e[r] = e[r] || [], i[s ? "unshift" : "push"](n);
        }
      };
    }function kn(e, n, r, i, s, o) {
      s = s || n.dataTypes[0], o = o || {}, o[s] = !0;var u,
          a = e[s],
          f = 0,
          l = a ? a.length : 0,
          c = e === Sn;for (; f < l && (c || !u); f++) {
        u = a[f](n, r, i), typeof u == "string" && (!c || o[u] ? u = t : (n.dataTypes.unshift(u), u = kn(e, n, r, i, u, o)));
      }return (c || !u) && !o["*"] && (u = kn(e, n, r, i, "*", o)), u;
    }function Ln(e, n) {
      var r,
          i,
          s = v.ajaxSettings.flatOptions || {};for (r in n) {
        n[r] !== t && ((s[r] ? e : i || (i = {}))[r] = n[r]);
      }i && v.extend(!0, e, i);
    }function An(e, n, r) {
      var i,
          s,
          o,
          u,
          a = e.contents,
          f = e.dataTypes,
          l = e.responseFields;for (s in l) {
        s in r && (n[l[s]] = r[s]);
      }while (f[0] === "*") {
        f.shift(), i === t && (i = e.mimeType || n.getResponseHeader("content-type"));
      }if (i) for (s in a) {
        if (a[s] && a[s].test(i)) {
          f.unshift(s);break;
        }
      }if (f[0] in r) o = f[0];else {
        for (s in r) {
          if (!f[0] || e.converters[s + " " + f[0]]) {
            o = s;break;
          }u || (u = s);
        }o = o || u;
      }if (o) return o !== f[0] && f.unshift(o), r[o];
    }function On(e, t) {
      var n,
          r,
          i,
          s,
          o = e.dataTypes.slice(),
          u = o[0],
          a = {},
          f = 0;e.dataFilter && (t = e.dataFilter(t, e.dataType));if (o[1]) for (n in e.converters) {
        a[n.toLowerCase()] = e.converters[n];
      }for (; i = o[++f];) {
        if (i !== "*") {
          if (u !== "*" && u !== i) {
            n = a[u + " " + i] || a["* " + i];if (!n) for (r in a) {
              s = r.split(" ");if (s[1] === i) {
                n = a[u + " " + s[0]] || a["* " + s[0]];if (n) {
                  n === !0 ? n = a[r] : a[r] !== !0 && (i = s[0], o.splice(f--, 0, i));break;
                }
              }
            }if (n !== !0) if (n && e["throws"]) t = n(t);else try {
              t = n(t);
            } catch (l) {
              return { state: "parsererror", error: n ? l : "No conversion from " + u + " to " + i };
            }
          }u = i;
        }
      }return { state: "success", data: t };
    }function Fn() {
      try {
        return new e.XMLHttpRequest();
      } catch (t) {}
    }function In() {
      try {
        return new e.ActiveXObject("Microsoft.XMLHTTP");
      } catch (t) {}
    }function $n() {
      return setTimeout(function () {
        qn = t;
      }, 0), qn = v.now();
    }function Jn(e, t) {
      v.each(t, function (t, n) {
        var r = (Vn[t] || []).concat(Vn["*"]),
            i = 0,
            s = r.length;for (; i < s; i++) {
          if (r[i].call(e, t, n)) return;
        }
      });
    }function Kn(e, t, n) {
      var r,
          i = 0,
          s = 0,
          o = Xn.length,
          u = v.Deferred().always(function () {
        delete a.elem;
      }),
          a = function a() {
        var t = qn || $n(),
            n = Math.max(0, f.startTime + f.duration - t),
            r = n / f.duration || 0,
            i = 1 - r,
            s = 0,
            o = f.tweens.length;for (; s < o; s++) {
          f.tweens[s].run(i);
        }return u.notifyWith(e, [f, i, n]), i < 1 && o ? n : (u.resolveWith(e, [f]), !1);
      },
          f = u.promise({ elem: e, props: v.extend({}, t), opts: v.extend(!0, { specialEasing: {} }, n), originalProperties: t, originalOptions: n, startTime: qn || $n(), duration: n.duration, tweens: [], createTween: function createTween(t, n, r) {
          var i = v.Tween(e, f.opts, t, n, f.opts.specialEasing[t] || f.opts.easing);return f.tweens.push(i), i;
        }, stop: function stop(t) {
          var n = 0,
              r = t ? f.tweens.length : 0;for (; n < r; n++) {
            f.tweens[n].run(1);
          }return t ? u.resolveWith(e, [f, t]) : u.rejectWith(e, [f, t]), this;
        } }),
          l = f.props;Qn(l, f.opts.specialEasing);for (; i < o; i++) {
        r = Xn[i].call(f, e, l, f.opts);if (r) return r;
      }return Jn(f, l), v.isFunction(f.opts.start) && f.opts.start.call(e, f), v.fx.timer(v.extend(a, { anim: f, queue: f.opts.queue, elem: e })), f.progress(f.opts.progress).done(f.opts.done, f.opts.complete).fail(f.opts.fail).always(f.opts.always);
    }function Qn(e, t) {
      var n, r, i, s, o;for (n in e) {
        r = v.camelCase(n), i = t[r], s = e[n], v.isArray(s) && (i = s[1], s = e[n] = s[0]), n !== r && (e[r] = s, delete e[n]), o = v.cssHooks[r];if (o && "expand" in o) {
          s = o.expand(s), delete e[r];for (n in s) {
            n in e || (e[n] = s[n], t[n] = i);
          }
        } else t[r] = i;
      }
    }function Gn(e, t, n) {
      var r,
          i,
          s,
          o,
          u,
          a,
          f,
          l,
          c,
          h = this,
          p = e.style,
          d = {},
          m = [],
          g = e.nodeType && Gt(e);n.queue || (l = v._queueHooks(e, "fx"), l.unqueued == null && (l.unqueued = 0, c = l.empty.fire, l.empty.fire = function () {
        l.unqueued || c();
      }), l.unqueued++, h.always(function () {
        h.always(function () {
          l.unqueued--, v.queue(e, "fx").length || l.empty.fire();
        });
      })), e.nodeType === 1 && ("height" in t || "width" in t) && (n.overflow = [p.overflow, p.overflowX, p.overflowY], v.css(e, "display") === "inline" && v.css(e, "float") === "none" && (!v.support.inlineBlockNeedsLayout || nn(e.nodeName) === "inline" ? p.display = "inline-block" : p.zoom = 1)), n.overflow && (p.overflow = "hidden", v.support.shrinkWrapBlocks || h.done(function () {
        p.overflow = n.overflow[0], p.overflowX = n.overflow[1], p.overflowY = n.overflow[2];
      }));for (r in t) {
        s = t[r];if (Un.exec(s)) {
          delete t[r], a = a || s === "toggle";if (s === (g ? "hide" : "show")) continue;m.push(r);
        }
      }o = m.length;if (o) {
        u = v._data(e, "fxshow") || v._data(e, "fxshow", {}), "hidden" in u && (g = u.hidden), a && (u.hidden = !g), g ? v(e).show() : h.done(function () {
          v(e).hide();
        }), h.done(function () {
          var t;v.removeData(e, "fxshow", !0);for (t in d) {
            v.style(e, t, d[t]);
          }
        });for (r = 0; r < o; r++) {
          i = m[r], f = h.createTween(i, g ? u[i] : 0), d[i] = u[i] || v.style(e, i), i in u || (u[i] = f.start, g && (f.end = f.start, f.start = i === "width" || i === "height" ? 1 : 0));
        }
      }
    }function Yn(e, t, n, r, i) {
      return new Yn.prototype.init(e, t, n, r, i);
    }function Zn(e, t) {
      var n,
          r = { height: e },
          i = 0;t = t ? 1 : 0;for (; i < 4; i += 2 - t) {
        n = $t[i], r["margin" + n] = r["padding" + n] = e;
      }return t && (r.opacity = r.width = e), r;
    }function tr(e) {
      return v.isWindow(e) ? e : e.nodeType === 9 ? e.defaultView || e.parentWindow : !1;
    }var n,
        r,
        i = e.document,
        s = e.location,
        o = e.navigator,
        u = e.jQuery,
        a = e.$,
        f = Array.prototype.push,
        l = Array.prototype.slice,
        c = Array.prototype.indexOf,
        h = Object.prototype.toString,
        p = Object.prototype.hasOwnProperty,
        d = String.prototype.trim,
        v = function v(e, t) {
      return new v.fn.init(e, t, n);
    },
        m = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,
        g = /\S/,
        y = /\s+/,
        b = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        w = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
        E = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        S = /^[\],:{}\s]*$/,
        x = /(?:^|:|,)(?:\s*\[)+/g,
        T = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
        N = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,
        C = /^-ms-/,
        k = /-([\da-z])/gi,
        L = function L(e, t) {
      return (t + "").toUpperCase();
    },
        A = function A() {
      i.addEventListener ? (i.removeEventListener("DOMContentLoaded", A, !1), v.ready()) : i.readyState === "complete" && (i.detachEvent("onreadystatechange", A), v.ready());
    },
        O = {};v.fn = v.prototype = { constructor: v, init: function init(e, n, r) {
        var s, o, u, a;if (!e) return this;if (e.nodeType) return this.context = this[0] = e, this.length = 1, this;if (typeof e == "string") {
          e.charAt(0) === "<" && e.charAt(e.length - 1) === ">" && e.length >= 3 ? s = [null, e, null] : s = w.exec(e);if (s && (s[1] || !n)) {
            if (s[1]) return n = n instanceof v ? n[0] : n, a = n && n.nodeType ? n.ownerDocument || n : i, e = v.parseHTML(s[1], a, !0), E.test(s[1]) && v.isPlainObject(n) && this.attr.call(e, n, !0), v.merge(this, e);o = i.getElementById(s[2]);if (o && o.parentNode) {
              if (o.id !== s[2]) return r.find(e);this.length = 1, this[0] = o;
            }return this.context = i, this.selector = e, this;
          }return !n || n.jquery ? (n || r).find(e) : this.constructor(n).find(e);
        }return v.isFunction(e) ? r.ready(e) : (e.selector !== t && (this.selector = e.selector, this.context = e.context), v.makeArray(e, this));
      }, selector: "", jquery: "1.8.3", length: 0, size: function size() {
        return this.length;
      }, toArray: function toArray() {
        return l.call(this);
      }, get: function get(e) {
        return e == null ? this.toArray() : e < 0 ? this[this.length + e] : this[e];
      }, pushStack: function pushStack(e, t, n) {
        var r = v.merge(this.constructor(), e);return r.prevObject = this, r.context = this.context, t === "find" ? r.selector = this.selector + (this.selector ? " " : "") + n : t && (r.selector = this.selector + "." + t + "(" + n + ")"), r;
      }, each: function each(e, t) {
        return v.each(this, e, t);
      }, ready: function ready(e) {
        return v.ready.promise().done(e), this;
      }, eq: function eq(e) {
        return e = +e, e === -1 ? this.slice(e) : this.slice(e, e + 1);
      }, first: function first() {
        return this.eq(0);
      }, last: function last() {
        return this.eq(-1);
      }, slice: function slice() {
        return this.pushStack(l.apply(this, arguments), "slice", l.call(arguments).join(","));
      }, map: function map(e) {
        return this.pushStack(v.map(this, function (t, n) {
          return e.call(t, n, t);
        }));
      }, end: function end() {
        return this.prevObject || this.constructor(null);
      }, push: f, sort: [].sort, splice: [].splice }, v.fn.init.prototype = v.fn, v.extend = v.fn.extend = function () {
      var e,
          n,
          r,
          i,
          s,
          o,
          u = arguments[0] || {},
          a = 1,
          f = arguments.length,
          l = !1;typeof u == "boolean" && (l = u, u = arguments[1] || {}, a = 2), (typeof u === "undefined" ? "undefined" : _typeof(u)) != "object" && !v.isFunction(u) && (u = {}), f === a && (u = this, --a);for (; a < f; a++) {
        if ((e = arguments[a]) != null) for (n in e) {
          r = u[n], i = e[n];if (u === i) continue;l && i && (v.isPlainObject(i) || (s = v.isArray(i))) ? (s ? (s = !1, o = r && v.isArray(r) ? r : []) : o = r && v.isPlainObject(r) ? r : {}, u[n] = v.extend(l, o, i)) : i !== t && (u[n] = i);
        }
      }return u;
    }, v.extend({ noConflict: function noConflict(t) {
        return e.$ === v && (e.$ = a), t && e.jQuery === v && (e.jQuery = u), v;
      }, isReady: !1, readyWait: 1, holdReady: function holdReady(e) {
        e ? v.readyWait++ : v.ready(!0);
      }, ready: function ready(e) {
        if (e === !0 ? --v.readyWait : v.isReady) return;if (!i.body) return setTimeout(v.ready, 1);v.isReady = !0;if (e !== !0 && --v.readyWait > 0) return;r.resolveWith(i, [v]), v.fn.trigger && v(i).trigger("ready").off("ready");
      }, isFunction: function isFunction(e) {
        return v.type(e) === "function";
      }, isArray: Array.isArray || function (e) {
        return v.type(e) === "array";
      }, isWindow: function isWindow(e) {
        return e != null && e == e.window;
      }, isNumeric: function isNumeric(e) {
        return !isNaN(parseFloat(e)) && isFinite(e);
      }, type: function type(e) {
        return e == null ? String(e) : O[h.call(e)] || "object";
      }, isPlainObject: function isPlainObject(e) {
        if (!e || v.type(e) !== "object" || e.nodeType || v.isWindow(e)) return !1;try {
          if (e.constructor && !p.call(e, "constructor") && !p.call(e.constructor.prototype, "isPrototypeOf")) return !1;
        } catch (n) {
          return !1;
        }var r;for (r in e) {}return r === t || p.call(e, r);
      }, isEmptyObject: function isEmptyObject(e) {
        var t;for (t in e) {
          return !1;
        }return !0;
      }, error: function error(e) {
        throw new Error(e);
      }, parseHTML: function parseHTML(e, t, n) {
        var r;return !e || typeof e != "string" ? null : (typeof t == "boolean" && (n = t, t = 0), t = t || i, (r = E.exec(e)) ? [t.createElement(r[1])] : (r = v.buildFragment([e], t, n ? null : []), v.merge([], (r.cacheable ? v.clone(r.fragment) : r.fragment).childNodes)));
      }, parseJSON: function parseJSON(t) {
        if (!t || typeof t != "string") return null;t = v.trim(t);if (e.JSON && e.JSON.parse) return e.JSON.parse(t);if (S.test(t.replace(T, "@").replace(N, "]").replace(x, ""))) return new Function("return " + t)();v.error("Invalid JSON: " + t);
      }, parseXML: function parseXML(n) {
        var r, i;if (!n || typeof n != "string") return null;try {
          e.DOMParser ? (i = new DOMParser(), r = i.parseFromString(n, "text/xml")) : (r = new ActiveXObject("Microsoft.XMLDOM"), r.async = "false", r.loadXML(n));
        } catch (s) {
          r = t;
        }return (!r || !r.documentElement || r.getElementsByTagName("parsererror").length) && v.error("Invalid XML: " + n), r;
      }, noop: function noop() {}, globalEval: function globalEval(t) {
        t && g.test(t) && (e.execScript || function (t) {
          e.eval.call(e, t);
        })(t);
      }, camelCase: function camelCase(e) {
        return e.replace(C, "ms-").replace(k, L);
      }, nodeName: function nodeName(e, t) {
        return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
      }, each: function each(e, n, r) {
        var i,
            s = 0,
            o = e.length,
            u = o === t || v.isFunction(e);if (r) {
          if (u) {
            for (i in e) {
              if (n.apply(e[i], r) === !1) break;
            }
          } else for (; s < o;) {
            if (n.apply(e[s++], r) === !1) break;
          }
        } else if (u) {
          for (i in e) {
            if (n.call(e[i], i, e[i]) === !1) break;
          }
        } else for (; s < o;) {
          if (n.call(e[s], s, e[s++]) === !1) break;
        }return e;
      }, trim: d && !d.call("﻿ ") ? function (e) {
        return e == null ? "" : d.call(e);
      } : function (e) {
        return e == null ? "" : (e + "").replace(b, "");
      }, makeArray: function makeArray(e, t) {
        var n,
            r = t || [];return e != null && (n = v.type(e), e.length == null || n === "string" || n === "function" || n === "regexp" || v.isWindow(e) ? f.call(r, e) : v.merge(r, e)), r;
      }, inArray: function inArray(e, t, n) {
        var r;if (t) {
          if (c) return c.call(t, e, n);r = t.length, n = n ? n < 0 ? Math.max(0, r + n) : n : 0;for (; n < r; n++) {
            if (n in t && t[n] === e) return n;
          }
        }return -1;
      }, merge: function merge(e, n) {
        var r = n.length,
            i = e.length,
            s = 0;if (typeof r == "number") for (; s < r; s++) {
          e[i++] = n[s];
        } else while (n[s] !== t) {
          e[i++] = n[s++];
        }return e.length = i, e;
      }, grep: function grep(e, t, n) {
        var r,
            i = [],
            s = 0,
            o = e.length;n = !!n;for (; s < o; s++) {
          r = !!t(e[s], s), n !== r && i.push(e[s]);
        }return i;
      }, map: function map(e, n, r) {
        var i,
            s,
            o = [],
            u = 0,
            a = e.length,
            f = e instanceof v || a !== t && typeof a == "number" && (a > 0 && e[0] && e[a - 1] || a === 0 || v.isArray(e));if (f) for (; u < a; u++) {
          i = n(e[u], u, r), i != null && (o[o.length] = i);
        } else for (s in e) {
          i = n(e[s], s, r), i != null && (o[o.length] = i);
        }return o.concat.apply([], o);
      }, guid: 1, proxy: function proxy(e, n) {
        var r, i, s;return typeof n == "string" && (r = e[n], n = e, e = r), v.isFunction(e) ? (i = l.call(arguments, 2), s = function s() {
          return e.apply(n, i.concat(l.call(arguments)));
        }, s.guid = e.guid = e.guid || v.guid++, s) : t;
      }, access: function access(e, n, r, i, s, o, u) {
        var a,
            f = r == null,
            l = 0,
            c = e.length;if (r && (typeof r === "undefined" ? "undefined" : _typeof(r)) == "object") {
          for (l in r) {
            v.access(e, n, l, r[l], 1, o, i);
          }s = 1;
        } else if (i !== t) {
          a = u === t && v.isFunction(i), f && (a ? (a = n, n = function n(e, t, _n2) {
            return a.call(v(e), _n2);
          }) : (n.call(e, i), n = null));if (n) for (; l < c; l++) {
            n(e[l], r, a ? i.call(e[l], l, n(e[l], r)) : i, u);
          }s = 1;
        }return s ? e : f ? n.call(e) : c ? n(e[0], r) : o;
      }, now: function now() {
        return new Date().getTime();
      } }), v.ready.promise = function (t) {
      if (!r) {
        r = v.Deferred();if (i.readyState === "complete") setTimeout(v.ready, 1);else if (i.addEventListener) i.addEventListener("DOMContentLoaded", A, !1), e.addEventListener("load", v.ready, !1);else {
          i.attachEvent("onreadystatechange", A), e.attachEvent("onload", v.ready);var n = !1;try {
            n = e.frameElement == null && i.documentElement;
          } catch (s) {}n && n.doScroll && function o() {
            if (!v.isReady) {
              try {
                n.doScroll("left");
              } catch (e) {
                return setTimeout(o, 50);
              }v.ready();
            }
          }();
        }
      }return r.promise(t);
    }, v.each("Boolean Number String Function Array Date RegExp Object".split(" "), function (e, t) {
      O["[object " + t + "]"] = t.toLowerCase();
    }), n = v(i);var M = {};v.Callbacks = function (e) {
      e = typeof e == "string" ? M[e] || _(e) : v.extend({}, e);var n,
          r,
          i,
          s,
          o,
          u,
          a = [],
          f = !e.once && [],
          l = function l(t) {
        n = e.memory && t, r = !0, u = s || 0, s = 0, o = a.length, i = !0;for (; a && u < o; u++) {
          if (a[u].apply(t[0], t[1]) === !1 && e.stopOnFalse) {
            n = !1;break;
          }
        }i = !1, a && (f ? f.length && l(f.shift()) : n ? a = [] : c.disable());
      },
          c = { add: function add() {
          if (a) {
            var t = a.length;(function r(t) {
              v.each(t, function (t, n) {
                var i = v.type(n);i === "function" ? (!e.unique || !c.has(n)) && a.push(n) : n && n.length && i !== "string" && r(n);
              });
            })(arguments), i ? o = a.length : n && (s = t, l(n));
          }return this;
        }, remove: function remove() {
          return a && v.each(arguments, function (e, t) {
            var n;while ((n = v.inArray(t, a, n)) > -1) {
              a.splice(n, 1), i && (n <= o && o--, n <= u && u--);
            }
          }), this;
        }, has: function has(e) {
          return v.inArray(e, a) > -1;
        }, empty: function empty() {
          return a = [], this;
        }, disable: function disable() {
          return a = f = n = t, this;
        }, disabled: function disabled() {
          return !a;
        }, lock: function lock() {
          return f = t, n || c.disable(), this;
        }, locked: function locked() {
          return !f;
        }, fireWith: function fireWith(e, t) {
          return t = t || [], t = [e, t.slice ? t.slice() : t], a && (!r || f) && (i ? f.push(t) : l(t)), this;
        }, fire: function fire() {
          return c.fireWith(this, arguments), this;
        }, fired: function fired() {
          return !!r;
        } };return c;
    }, v.extend({ Deferred: function Deferred(e) {
        var t = [["resolve", "done", v.Callbacks("once memory"), "resolved"], ["reject", "fail", v.Callbacks("once memory"), "rejected"], ["notify", "progress", v.Callbacks("memory")]],
            n = "pending",
            r = { state: function state() {
            return n;
          }, always: function always() {
            return i.done(arguments).fail(arguments), this;
          }, then: function then() {
            var e = arguments;return v.Deferred(function (n) {
              v.each(t, function (t, r) {
                var s = r[0],
                    o = e[t];i[r[1]](v.isFunction(o) ? function () {
                  var e = o.apply(this, arguments);e && v.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[s + "With"](this === i ? n : this, [e]);
                } : n[s]);
              }), e = null;
            }).promise();
          }, promise: function promise(e) {
            return e != null ? v.extend(e, r) : r;
          } },
            i = {};return r.pipe = r.then, v.each(t, function (e, s) {
          var o = s[2],
              u = s[3];r[s[1]] = o.add, u && o.add(function () {
            n = u;
          }, t[e ^ 1][2].disable, t[2][2].lock), i[s[0]] = o.fire, i[s[0] + "With"] = o.fireWith;
        }), r.promise(i), e && e.call(i, i), i;
      }, when: function when(e) {
        var t = 0,
            n = l.call(arguments),
            r = n.length,
            i = r !== 1 || e && v.isFunction(e.promise) ? r : 0,
            s = i === 1 ? e : v.Deferred(),
            o = function o(e, t, n) {
          return function (r) {
            t[e] = this, n[e] = arguments.length > 1 ? l.call(arguments) : r, n === u ? s.notifyWith(t, n) : --i || s.resolveWith(t, n);
          };
        },
            u,
            a,
            f;if (r > 1) {
          u = new Array(r), a = new Array(r), f = new Array(r);for (; t < r; t++) {
            n[t] && v.isFunction(n[t].promise) ? n[t].promise().done(o(t, f, n)).fail(s.reject).progress(o(t, a, u)) : --i;
          }
        }return i || s.resolveWith(f, n), s.promise();
      } }), v.support = function () {
      var t,
          n,
          r,
          s,
          o,
          u,
          a,
          f,
          l,
          c,
          h,
          p = i.createElement("div");p.setAttribute("className", "t"), p.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", n = p.getElementsByTagName("*"), r = p.getElementsByTagName("a")[0];if (!n || !r || !n.length) return {};s = i.createElement("select"), o = s.appendChild(i.createElement("option")), u = p.getElementsByTagName("input")[0], r.style.cssText = "top:1px;float:left;opacity:.5", t = { leadingWhitespace: p.firstChild.nodeType === 3, tbody: !p.getElementsByTagName("tbody").length, htmlSerialize: !!p.getElementsByTagName("link").length, style: /top/.test(r.getAttribute("style")), hrefNormalized: r.getAttribute("href") === "/a", opacity: /^0.5/.test(r.style.opacity), cssFloat: !!r.style.cssFloat, checkOn: u.value === "on", optSelected: o.selected, getSetAttribute: p.className !== "t", enctype: !!i.createElement("form").enctype, html5Clone: i.createElement("nav").cloneNode(!0).outerHTML !== "<:nav></:nav>", boxModel: i.compatMode === "CSS1Compat", submitBubbles: !0, changeBubbles: !0, focusinBubbles: !1, deleteExpando: !0, noCloneEvent: !0, inlineBlockNeedsLayout: !1, shrinkWrapBlocks: !1, reliableMarginRight: !0, boxSizingReliable: !0, pixelPosition: !1 }, u.checked = !0, t.noCloneChecked = u.cloneNode(!0).checked, s.disabled = !0, t.optDisabled = !o.disabled;try {
        delete p.test;
      } catch (d) {
        t.deleteExpando = !1;
      }!p.addEventListener && p.attachEvent && p.fireEvent && (p.attachEvent("onclick", h = function h() {
        t.noCloneEvent = !1;
      }), p.cloneNode(!0).fireEvent("onclick"), p.detachEvent("onclick", h)), u = i.createElement("input"), u.value = "t", u.setAttribute("type", "radio"), t.radioValue = u.value === "t", u.setAttribute("checked", "checked"), u.setAttribute("name", "t"), p.appendChild(u), a = i.createDocumentFragment(), a.appendChild(p.lastChild), t.checkClone = a.cloneNode(!0).cloneNode(!0).lastChild.checked, t.appendChecked = u.checked, a.removeChild(u), a.appendChild(p);if (p.attachEvent) for (l in { submit: !0, change: !0, focusin: !0 }) {
        f = "on" + l, c = f in p, c || (p.setAttribute(f, "return;"), c = typeof p[f] == "function"), t[l + "Bubbles"] = c;
      }return v(function () {
        var n,
            r,
            s,
            o,
            u = "padding:0;margin:0;border:0;display:block;overflow:hidden;",
            a = i.getElementsByTagName("body")[0];if (!a) return;n = i.createElement("div"), n.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px", a.insertBefore(n, a.firstChild), r = i.createElement("div"), n.appendChild(r), r.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", s = r.getElementsByTagName("td"), s[0].style.cssText = "padding:0;margin:0;border:0;display:none", c = s[0].offsetHeight === 0, s[0].style.display = "", s[1].style.display = "none", t.reliableHiddenOffsets = c && s[0].offsetHeight === 0, r.innerHTML = "", r.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", t.boxSizing = r.offsetWidth === 4, t.doesNotIncludeMarginInBodyOffset = a.offsetTop !== 1, e.getComputedStyle && (t.pixelPosition = (e.getComputedStyle(r, null) || {}).top !== "1%", t.boxSizingReliable = (e.getComputedStyle(r, null) || { width: "4px" }).width === "4px", o = i.createElement("div"), o.style.cssText = r.style.cssText = u, o.style.marginRight = o.style.width = "0", r.style.width = "1px", r.appendChild(o), t.reliableMarginRight = !parseFloat((e.getComputedStyle(o, null) || {}).marginRight)), typeof r.style.zoom != "undefined" && (r.innerHTML = "", r.style.cssText = u + "width:1px;padding:1px;display:inline;zoom:1", t.inlineBlockNeedsLayout = r.offsetWidth === 3, r.style.display = "block", r.style.overflow = "visible", r.innerHTML = "<div></div>", r.firstChild.style.width = "5px", t.shrinkWrapBlocks = r.offsetWidth !== 3, n.style.zoom = 1), a.removeChild(n), n = r = s = o = null;
      }), a.removeChild(p), n = r = s = o = u = a = p = null, t;
    }();var D = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
        P = /([A-Z])/g;v.extend({ cache: {}, deletedIds: [], uuid: 0, expando: "jQuery" + (v.fn.jquery + Math.random()).replace(/\D/g, ""), noData: { embed: !0, object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000", applet: !0 }, hasData: function hasData(e) {
        return e = e.nodeType ? v.cache[e[v.expando]] : e[v.expando], !!e && !B(e);
      }, data: function data(e, n, r, i) {
        if (!v.acceptData(e)) return;var s,
            o,
            u = v.expando,
            a = typeof n == "string",
            f = e.nodeType,
            l = f ? v.cache : e,
            c = f ? e[u] : e[u] && u;if ((!c || !l[c] || !i && !l[c].data) && a && r === t) return;c || (f ? e[u] = c = v.deletedIds.pop() || v.guid++ : c = u), l[c] || (l[c] = {}, f || (l[c].toJSON = v.noop));if ((typeof n === "undefined" ? "undefined" : _typeof(n)) == "object" || typeof n == "function") i ? l[c] = v.extend(l[c], n) : l[c].data = v.extend(l[c].data, n);return s = l[c], i || (s.data || (s.data = {}), s = s.data), r !== t && (s[v.camelCase(n)] = r), a ? (o = s[n], o == null && (o = s[v.camelCase(n)])) : o = s, o;
      }, removeData: function removeData(e, t, n) {
        if (!v.acceptData(e)) return;var r,
            i,
            s,
            o = e.nodeType,
            u = o ? v.cache : e,
            a = o ? e[v.expando] : v.expando;if (!u[a]) return;if (t) {
          r = n ? u[a] : u[a].data;if (r) {
            v.isArray(t) || (t in r ? t = [t] : (t = v.camelCase(t), t in r ? t = [t] : t = t.split(" ")));for (i = 0, s = t.length; i < s; i++) {
              delete r[t[i]];
            }if (!(n ? B : v.isEmptyObject)(r)) return;
          }
        }if (!n) {
          delete u[a].data;if (!B(u[a])) return;
        }o ? v.cleanData([e], !0) : v.support.deleteExpando || u != u.window ? delete u[a] : u[a] = null;
      }, _data: function _data(e, t, n) {
        return v.data(e, t, n, !0);
      }, acceptData: function acceptData(e) {
        var t = e.nodeName && v.noData[e.nodeName.toLowerCase()];return !t || t !== !0 && e.getAttribute("classid") === t;
      } }), v.fn.extend({ data: function data(e, n) {
        var r,
            i,
            s,
            o,
            u,
            a = this[0],
            f = 0,
            l = null;if (e === t) {
          if (this.length) {
            l = v.data(a);if (a.nodeType === 1 && !v._data(a, "parsedAttrs")) {
              s = a.attributes;for (u = s.length; f < u; f++) {
                o = s[f].name, o.indexOf("data-") || (o = v.camelCase(o.substring(5)), H(a, o, l[o]));
              }v._data(a, "parsedAttrs", !0);
            }
          }return l;
        }return (typeof e === "undefined" ? "undefined" : _typeof(e)) == "object" ? this.each(function () {
          v.data(this, e);
        }) : (r = e.split(".", 2), r[1] = r[1] ? "." + r[1] : "", i = r[1] + "!", v.access(this, function (n) {
          if (n === t) return l = this.triggerHandler("getData" + i, [r[0]]), l === t && a && (l = v.data(a, e), l = H(a, e, l)), l === t && r[1] ? this.data(r[0]) : l;r[1] = n, this.each(function () {
            var t = v(this);t.triggerHandler("setData" + i, r), v.data(this, e, n), t.triggerHandler("changeData" + i, r);
          });
        }, null, n, arguments.length > 1, null, !1));
      }, removeData: function removeData(e) {
        return this.each(function () {
          v.removeData(this, e);
        });
      } }), v.extend({ queue: function queue(e, t, n) {
        var r;if (e) return t = (t || "fx") + "queue", r = v._data(e, t), n && (!r || v.isArray(n) ? r = v._data(e, t, v.makeArray(n)) : r.push(n)), r || [];
      }, dequeue: function dequeue(e, t) {
        t = t || "fx";var n = v.queue(e, t),
            r = n.length,
            i = n.shift(),
            s = v._queueHooks(e, t),
            o = function o() {
          v.dequeue(e, t);
        };i === "inprogress" && (i = n.shift(), r--), i && (t === "fx" && n.unshift("inprogress"), delete s.stop, i.call(e, o, s)), !r && s && s.empty.fire();
      }, _queueHooks: function _queueHooks(e, t) {
        var n = t + "queueHooks";return v._data(e, n) || v._data(e, n, { empty: v.Callbacks("once memory").add(function () {
            v.removeData(e, t + "queue", !0), v.removeData(e, n, !0);
          }) });
      } }), v.fn.extend({ queue: function queue(e, n) {
        var r = 2;return typeof e != "string" && (n = e, e = "fx", r--), arguments.length < r ? v.queue(this[0], e) : n === t ? this : this.each(function () {
          var t = v.queue(this, e, n);v._queueHooks(this, e), e === "fx" && t[0] !== "inprogress" && v.dequeue(this, e);
        });
      }, dequeue: function dequeue(e) {
        return this.each(function () {
          v.dequeue(this, e);
        });
      }, delay: function delay(e, t) {
        return e = v.fx ? v.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function (t, n) {
          var r = setTimeout(t, e);n.stop = function () {
            clearTimeout(r);
          };
        });
      }, clearQueue: function clearQueue(e) {
        return this.queue(e || "fx", []);
      }, promise: function promise(e, n) {
        var r,
            i = 1,
            s = v.Deferred(),
            o = this,
            u = this.length,
            a = function a() {
          --i || s.resolveWith(o, [o]);
        };typeof e != "string" && (n = e, e = t), e = e || "fx";while (u--) {
          r = v._data(o[u], e + "queueHooks"), r && r.empty && (i++, r.empty.add(a));
        }return a(), s.promise(n);
      } });var j,
        F,
        I,
        q = /[\t\r\n]/g,
        R = /\r/g,
        U = /^(?:button|input)$/i,
        z = /^(?:button|input|object|select|textarea)$/i,
        W = /^a(?:rea|)$/i,
        X = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
        V = v.support.getSetAttribute;v.fn.extend({ attr: function attr(e, t) {
        return v.access(this, v.attr, e, t, arguments.length > 1);
      }, removeAttr: function removeAttr(e) {
        return this.each(function () {
          v.removeAttr(this, e);
        });
      }, prop: function prop(e, t) {
        return v.access(this, v.prop, e, t, arguments.length > 1);
      }, removeProp: function removeProp(e) {
        return e = v.propFix[e] || e, this.each(function () {
          try {
            this[e] = t, delete this[e];
          } catch (n) {}
        });
      }, addClass: function addClass(e) {
        var t, n, r, i, s, o, u;if (v.isFunction(e)) return this.each(function (t) {
          v(this).addClass(e.call(this, t, this.className));
        });if (e && typeof e == "string") {
          t = e.split(y);for (n = 0, r = this.length; n < r; n++) {
            i = this[n];if (i.nodeType === 1) if (!i.className && t.length === 1) i.className = e;else {
              s = " " + i.className + " ";for (o = 0, u = t.length; o < u; o++) {
                s.indexOf(" " + t[o] + " ") < 0 && (s += t[o] + " ");
              }i.className = v.trim(s);
            }
          }
        }return this;
      }, removeClass: function removeClass(e) {
        var n, r, i, s, o, u, a;if (v.isFunction(e)) return this.each(function (t) {
          v(this).removeClass(e.call(this, t, this.className));
        });if (e && typeof e == "string" || e === t) {
          n = (e || "").split(y);for (u = 0, a = this.length; u < a; u++) {
            i = this[u];if (i.nodeType === 1 && i.className) {
              r = (" " + i.className + " ").replace(q, " ");for (s = 0, o = n.length; s < o; s++) {
                while (r.indexOf(" " + n[s] + " ") >= 0) {
                  r = r.replace(" " + n[s] + " ", " ");
                }
              }i.className = e ? v.trim(r) : "";
            }
          }
        }return this;
      }, toggleClass: function toggleClass(e, t) {
        var n = typeof e === "undefined" ? "undefined" : _typeof(e),
            r = typeof t == "boolean";return v.isFunction(e) ? this.each(function (n) {
          v(this).toggleClass(e.call(this, n, this.className, t), t);
        }) : this.each(function () {
          if (n === "string") {
            var i,
                s = 0,
                o = v(this),
                u = t,
                a = e.split(y);while (i = a[s++]) {
              u = r ? u : !o.hasClass(i), o[u ? "addClass" : "removeClass"](i);
            }
          } else if (n === "undefined" || n === "boolean") this.className && v._data(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : v._data(this, "__className__") || "";
        });
      }, hasClass: function hasClass(e) {
        var t = " " + e + " ",
            n = 0,
            r = this.length;for (; n < r; n++) {
          if (this[n].nodeType === 1 && (" " + this[n].className + " ").replace(q, " ").indexOf(t) >= 0) return !0;
        }return !1;
      }, val: function val(e) {
        var n,
            r,
            i,
            s = this[0];if (!arguments.length) {
          if (s) return n = v.valHooks[s.type] || v.valHooks[s.nodeName.toLowerCase()], n && "get" in n && (r = n.get(s, "value")) !== t ? r : (r = s.value, typeof r == "string" ? r.replace(R, "") : r == null ? "" : r);return;
        }return i = v.isFunction(e), this.each(function (r) {
          var s,
              o = v(this);if (this.nodeType !== 1) return;i ? s = e.call(this, r, o.val()) : s = e, s == null ? s = "" : typeof s == "number" ? s += "" : v.isArray(s) && (s = v.map(s, function (e) {
            return e == null ? "" : e + "";
          })), n = v.valHooks[this.type] || v.valHooks[this.nodeName.toLowerCase()];if (!n || !("set" in n) || n.set(this, s, "value") === t) this.value = s;
        });
      } }), v.extend({ valHooks: { option: { get: function get(e) {
            var t = e.attributes.value;return !t || t.specified ? e.value : e.text;
          } }, select: { get: function get(e) {
            var t,
                n,
                r = e.options,
                i = e.selectedIndex,
                s = e.type === "select-one" || i < 0,
                o = s ? null : [],
                u = s ? i + 1 : r.length,
                a = i < 0 ? u : s ? i : 0;for (; a < u; a++) {
              n = r[a];if ((n.selected || a === i) && (v.support.optDisabled ? !n.disabled : n.getAttribute("disabled") === null) && (!n.parentNode.disabled || !v.nodeName(n.parentNode, "optgroup"))) {
                t = v(n).val();if (s) return t;o.push(t);
              }
            }return o;
          }, set: function set(e, t) {
            var n = v.makeArray(t);return v(e).find("option").each(function () {
              this.selected = v.inArray(v(this).val(), n) >= 0;
            }), n.length || (e.selectedIndex = -1), n;
          } } }, attrFn: {}, attr: function attr(e, n, r, i) {
        var s,
            o,
            u,
            a = e.nodeType;if (!e || a === 3 || a === 8 || a === 2) return;if (i && v.isFunction(v.fn[n])) return v(e)[n](r);if (typeof e.getAttribute == "undefined") return v.prop(e, n, r);u = a !== 1 || !v.isXMLDoc(e), u && (n = n.toLowerCase(), o = v.attrHooks[n] || (X.test(n) ? F : j));if (r !== t) {
          if (r === null) {
            v.removeAttr(e, n);return;
          }return o && "set" in o && u && (s = o.set(e, r, n)) !== t ? s : (e.setAttribute(n, r + ""), r);
        }return o && "get" in o && u && (s = o.get(e, n)) !== null ? s : (s = e.getAttribute(n), s === null ? t : s);
      }, removeAttr: function removeAttr(e, t) {
        var n,
            r,
            i,
            s,
            o = 0;if (t && e.nodeType === 1) {
          r = t.split(y);for (; o < r.length; o++) {
            i = r[o], i && (n = v.propFix[i] || i, s = X.test(i), s || v.attr(e, i, ""), e.removeAttribute(V ? i : n), s && n in e && (e[n] = !1));
          }
        }
      }, attrHooks: { type: { set: function set(e, t) {
            if (U.test(e.nodeName) && e.parentNode) v.error("type property can't be changed");else if (!v.support.radioValue && t === "radio" && v.nodeName(e, "input")) {
              var n = e.value;return e.setAttribute("type", t), n && (e.value = n), t;
            }
          } }, value: { get: function get(e, t) {
            return j && v.nodeName(e, "button") ? j.get(e, t) : t in e ? e.value : null;
          }, set: function set(e, t, n) {
            if (j && v.nodeName(e, "button")) return j.set(e, t, n);e.value = t;
          } } }, propFix: { tabindex: "tabIndex", readonly: "readOnly", "for": "htmlFor", "class": "className", maxlength: "maxLength", cellspacing: "cellSpacing", cellpadding: "cellPadding", rowspan: "rowSpan", colspan: "colSpan", usemap: "useMap", frameborder: "frameBorder", contenteditable: "contentEditable" }, prop: function prop(e, n, r) {
        var i,
            s,
            o,
            u = e.nodeType;if (!e || u === 3 || u === 8 || u === 2) return;return o = u !== 1 || !v.isXMLDoc(e), o && (n = v.propFix[n] || n, s = v.propHooks[n]), r !== t ? s && "set" in s && (i = s.set(e, r, n)) !== t ? i : e[n] = r : s && "get" in s && (i = s.get(e, n)) !== null ? i : e[n];
      }, propHooks: { tabIndex: { get: function get(e) {
            var n = e.getAttributeNode("tabindex");return n && n.specified ? parseInt(n.value, 10) : z.test(e.nodeName) || W.test(e.nodeName) && e.href ? 0 : t;
          } } } }), F = { get: function get(e, n) {
        var r,
            i = v.prop(e, n);return i === !0 || typeof i != "boolean" && (r = e.getAttributeNode(n)) && r.nodeValue !== !1 ? n.toLowerCase() : t;
      }, set: function set(e, t, n) {
        var r;return t === !1 ? v.removeAttr(e, n) : (r = v.propFix[n] || n, r in e && (e[r] = !0), e.setAttribute(n, n.toLowerCase())), n;
      } }, V || (I = { name: !0, id: !0, coords: !0 }, j = v.valHooks.button = { get: function get(e, n) {
        var r;return r = e.getAttributeNode(n), r && (I[n] ? r.value !== "" : r.specified) ? r.value : t;
      }, set: function set(e, t, n) {
        var r = e.getAttributeNode(n);return r || (r = i.createAttribute(n), e.setAttributeNode(r)), r.value = t + "";
      } }, v.each(["width", "height"], function (e, t) {
      v.attrHooks[t] = v.extend(v.attrHooks[t], { set: function set(e, n) {
          if (n === "") return e.setAttribute(t, "auto"), n;
        } });
    }), v.attrHooks.contenteditable = { get: j.get, set: function set(e, t, n) {
        t === "" && (t = "false"), j.set(e, t, n);
      } }), v.support.hrefNormalized || v.each(["href", "src", "width", "height"], function (e, n) {
      v.attrHooks[n] = v.extend(v.attrHooks[n], { get: function get(e) {
          var r = e.getAttribute(n, 2);return r === null ? t : r;
        } });
    }), v.support.style || (v.attrHooks.style = { get: function get(e) {
        return e.style.cssText.toLowerCase() || t;
      }, set: function set(e, t) {
        return e.style.cssText = t + "";
      } }), v.support.optSelected || (v.propHooks.selected = v.extend(v.propHooks.selected, { get: function get(e) {
        var t = e.parentNode;return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null;
      } })), v.support.enctype || (v.propFix.enctype = "encoding"), v.support.checkOn || v.each(["radio", "checkbox"], function () {
      v.valHooks[this] = { get: function get(e) {
          return e.getAttribute("value") === null ? "on" : e.value;
        } };
    }), v.each(["radio", "checkbox"], function () {
      v.valHooks[this] = v.extend(v.valHooks[this], { set: function set(e, t) {
          if (v.isArray(t)) return e.checked = v.inArray(v(e).val(), t) >= 0;
        } });
    });var $ = /^(?:textarea|input|select)$/i,
        J = /^([^\.]*|)(?:\.(.+)|)$/,
        K = /(?:^|\s)hover(\.\S+|)\b/,
        Q = /^key/,
        G = /^(?:mouse|contextmenu)|click/,
        Y = /^(?:focusinfocus|focusoutblur)$/,
        Z = function Z(e) {
      return v.event.special.hover ? e : e.replace(K, "mouseenter$1 mouseleave$1");
    };v.event = { add: function add(e, n, r, i, s) {
        var o, _u, a, f, l, c, h, p, d, m, g;if (e.nodeType === 3 || e.nodeType === 8 || !n || !r || !(o = v._data(e))) return;r.handler && (d = r, r = d.handler, s = d.selector), r.guid || (r.guid = v.guid++), a = o.events, a || (o.events = a = {}), _u = o.handle, _u || (o.handle = _u = function u(e) {
          return typeof v == "undefined" || !!e && v.event.triggered === e.type ? t : v.event.dispatch.apply(_u.elem, arguments);
        }, _u.elem = e), n = v.trim(Z(n)).split(" ");for (f = 0; f < n.length; f++) {
          l = J.exec(n[f]) || [], c = l[1], h = (l[2] || "").split(".").sort(), g = v.event.special[c] || {}, c = (s ? g.delegateType : g.bindType) || c, g = v.event.special[c] || {}, p = v.extend({ type: c, origType: l[1], data: i, handler: r, guid: r.guid, selector: s, needsContext: s && v.expr.match.needsContext.test(s), namespace: h.join(".") }, d), m = a[c];if (!m) {
            m = a[c] = [], m.delegateCount = 0;if (!g.setup || g.setup.call(e, i, h, _u) === !1) e.addEventListener ? e.addEventListener(c, _u, !1) : e.attachEvent && e.attachEvent("on" + c, _u);
          }g.add && (g.add.call(e, p), p.handler.guid || (p.handler.guid = r.guid)), s ? m.splice(m.delegateCount++, 0, p) : m.push(p), v.event.global[c] = !0;
        }e = null;
      }, global: {}, remove: function remove(e, t, n, r, i) {
        var s,
            o,
            u,
            a,
            f,
            l,
            c,
            h,
            p,
            d,
            m,
            g = v.hasData(e) && v._data(e);if (!g || !(h = g.events)) return;t = v.trim(Z(t || "")).split(" ");for (s = 0; s < t.length; s++) {
          o = J.exec(t[s]) || [], u = a = o[1], f = o[2];if (!u) {
            for (u in h) {
              v.event.remove(e, u + t[s], n, r, !0);
            }continue;
          }p = v.event.special[u] || {}, u = (r ? p.delegateType : p.bindType) || u, d = h[u] || [], l = d.length, f = f ? new RegExp("(^|\\.)" + f.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null;for (c = 0; c < d.length; c++) {
            m = d[c], (i || a === m.origType) && (!n || n.guid === m.guid) && (!f || f.test(m.namespace)) && (!r || r === m.selector || r === "**" && m.selector) && (d.splice(c--, 1), m.selector && d.delegateCount--, p.remove && p.remove.call(e, m));
          }d.length === 0 && l !== d.length && ((!p.teardown || p.teardown.call(e, f, g.handle) === !1) && v.removeEvent(e, u, g.handle), delete h[u]);
        }v.isEmptyObject(h) && (delete g.handle, v.removeData(e, "events", !0));
      }, customEvent: { getData: !0, setData: !0, changeData: !0 }, trigger: function trigger(n, r, s, o) {
        if (!s || s.nodeType !== 3 && s.nodeType !== 8) {
          var u,
              a,
              f,
              l,
              c,
              h,
              p,
              d,
              m,
              g,
              y = n.type || n,
              b = [];if (Y.test(y + v.event.triggered)) return;y.indexOf("!") >= 0 && (y = y.slice(0, -1), a = !0), y.indexOf(".") >= 0 && (b = y.split("."), y = b.shift(), b.sort());if ((!s || v.event.customEvent[y]) && !v.event.global[y]) return;n = (typeof n === "undefined" ? "undefined" : _typeof(n)) == "object" ? n[v.expando] ? n : new v.Event(y, n) : new v.Event(y), n.type = y, n.isTrigger = !0, n.exclusive = a, n.namespace = b.join("."), n.namespace_re = n.namespace ? new RegExp("(^|\\.)" + b.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, h = y.indexOf(":") < 0 ? "on" + y : "";if (!s) {
            u = v.cache;for (f in u) {
              u[f].events && u[f].events[y] && v.event.trigger(n, r, u[f].handle.elem, !0);
            }return;
          }n.result = t, n.target || (n.target = s), r = r != null ? v.makeArray(r) : [], r.unshift(n), p = v.event.special[y] || {};if (p.trigger && p.trigger.apply(s, r) === !1) return;m = [[s, p.bindType || y]];if (!o && !p.noBubble && !v.isWindow(s)) {
            g = p.delegateType || y, l = Y.test(g + y) ? s : s.parentNode;for (c = s; l; l = l.parentNode) {
              m.push([l, g]), c = l;
            }c === (s.ownerDocument || i) && m.push([c.defaultView || c.parentWindow || e, g]);
          }for (f = 0; f < m.length && !n.isPropagationStopped(); f++) {
            l = m[f][0], n.type = m[f][1], d = (v._data(l, "events") || {})[n.type] && v._data(l, "handle"), d && d.apply(l, r), d = h && l[h], d && v.acceptData(l) && d.apply && d.apply(l, r) === !1 && n.preventDefault();
          }return n.type = y, !o && !n.isDefaultPrevented() && (!p._default || p._default.apply(s.ownerDocument, r) === !1) && (y !== "click" || !v.nodeName(s, "a")) && v.acceptData(s) && h && s[y] && (y !== "focus" && y !== "blur" || n.target.offsetWidth !== 0) && !v.isWindow(s) && (c = s[h], c && (s[h] = null), v.event.triggered = y, s[y](), v.event.triggered = t, c && (s[h] = c)), n.result;
        }return;
      }, dispatch: function dispatch(n) {
        n = v.event.fix(n || e.event);var r,
            i,
            s,
            o,
            u,
            a,
            f,
            c,
            h,
            p,
            d = (v._data(this, "events") || {})[n.type] || [],
            m = d.delegateCount,
            g = l.call(arguments),
            y = !n.exclusive && !n.namespace,
            b = v.event.special[n.type] || {},
            w = [];g[0] = n, n.delegateTarget = this;if (b.preDispatch && b.preDispatch.call(this, n) === !1) return;if (m && (!n.button || n.type !== "click")) for (s = n.target; s != this; s = s.parentNode || this) {
          if (s.disabled !== !0 || n.type !== "click") {
            u = {}, f = [];for (r = 0; r < m; r++) {
              c = d[r], h = c.selector, u[h] === t && (u[h] = c.needsContext ? v(h, this).index(s) >= 0 : v.find(h, this, null, [s]).length), u[h] && f.push(c);
            }f.length && w.push({ elem: s, matches: f });
          }
        }d.length > m && w.push({ elem: this, matches: d.slice(m) });for (r = 0; r < w.length && !n.isPropagationStopped(); r++) {
          a = w[r], n.currentTarget = a.elem;for (i = 0; i < a.matches.length && !n.isImmediatePropagationStopped(); i++) {
            c = a.matches[i];if (y || !n.namespace && !c.namespace || n.namespace_re && n.namespace_re.test(c.namespace)) n.data = c.data, n.handleObj = c, o = ((v.event.special[c.origType] || {}).handle || c.handler).apply(a.elem, g), o !== t && (n.result = o, o === !1 && (n.preventDefault(), n.stopPropagation()));
          }
        }return b.postDispatch && b.postDispatch.call(this, n), n.result;
      }, props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "), fixHooks: {}, keyHooks: { props: "char charCode key keyCode".split(" "), filter: function filter(e, t) {
          return e.which == null && (e.which = t.charCode != null ? t.charCode : t.keyCode), e;
        } }, mouseHooks: { props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "), filter: function filter(e, n) {
          var r,
              s,
              o,
              u = n.button,
              a = n.fromElement;return e.pageX == null && n.clientX != null && (r = e.target.ownerDocument || i, s = r.documentElement, o = r.body, e.pageX = n.clientX + (s && s.scrollLeft || o && o.scrollLeft || 0) - (s && s.clientLeft || o && o.clientLeft || 0), e.pageY = n.clientY + (s && s.scrollTop || o && o.scrollTop || 0) - (s && s.clientTop || o && o.clientTop || 0)), !e.relatedTarget && a && (e.relatedTarget = a === e.target ? n.toElement : a), !e.which && u !== t && (e.which = u & 1 ? 1 : u & 2 ? 3 : u & 4 ? 2 : 0), e;
        } }, fix: function fix(e) {
        if (e[v.expando]) return e;var t,
            n,
            r = e,
            s = v.event.fixHooks[e.type] || {},
            o = s.props ? this.props.concat(s.props) : this.props;e = v.Event(r);for (t = o.length; t;) {
          n = o[--t], e[n] = r[n];
        }return e.target || (e.target = r.srcElement || i), e.target.nodeType === 3 && (e.target = e.target.parentNode), e.metaKey = !!e.metaKey, s.filter ? s.filter(e, r) : e;
      }, special: { load: { noBubble: !0 }, focus: { delegateType: "focusin" }, blur: { delegateType: "focusout" }, beforeunload: { setup: function setup(e, t, n) {
            v.isWindow(this) && (this.onbeforeunload = n);
          }, teardown: function teardown(e, t) {
            this.onbeforeunload === t && (this.onbeforeunload = null);
          } } }, simulate: function simulate(e, t, n, r) {
        var i = v.extend(new v.Event(), n, { type: e, isSimulated: !0, originalEvent: {} });r ? v.event.trigger(i, null, t) : v.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault();
      } }, v.event.handle = v.event.dispatch, v.removeEvent = i.removeEventListener ? function (e, t, n) {
      e.removeEventListener && e.removeEventListener(t, n, !1);
    } : function (e, t, n) {
      var r = "on" + t;e.detachEvent && (typeof e[r] == "undefined" && (e[r] = null), e.detachEvent(r, n));
    }, v.Event = function (e, t) {
      if (!(this instanceof v.Event)) return new v.Event(e, t);e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.returnValue === !1 || e.getPreventDefault && e.getPreventDefault() ? tt : et) : this.type = e, t && v.extend(this, t), this.timeStamp = e && e.timeStamp || v.now(), this[v.expando] = !0;
    }, v.Event.prototype = { preventDefault: function preventDefault() {
        this.isDefaultPrevented = tt;var e = this.originalEvent;if (!e) return;e.preventDefault ? e.preventDefault() : e.returnValue = !1;
      }, stopPropagation: function stopPropagation() {
        this.isPropagationStopped = tt;var e = this.originalEvent;if (!e) return;e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0;
      }, stopImmediatePropagation: function stopImmediatePropagation() {
        this.isImmediatePropagationStopped = tt, this.stopPropagation();
      }, isDefaultPrevented: et, isPropagationStopped: et, isImmediatePropagationStopped: et }, v.each({ mouseenter: "mouseover", mouseleave: "mouseout" }, function (e, t) {
      v.event.special[e] = { delegateType: t, bindType: t, handle: function handle(e) {
          var n,
              r = this,
              i = e.relatedTarget,
              s = e.handleObj,
              o = s.selector;if (!i || i !== r && !v.contains(r, i)) e.type = s.origType, n = s.handler.apply(this, arguments), e.type = t;return n;
        } };
    }), v.support.submitBubbles || (v.event.special.submit = { setup: function setup() {
        if (v.nodeName(this, "form")) return !1;v.event.add(this, "click._submit keypress._submit", function (e) {
          var n = e.target,
              r = v.nodeName(n, "input") || v.nodeName(n, "button") ? n.form : t;r && !v._data(r, "_submit_attached") && (v.event.add(r, "submit._submit", function (e) {
            e._submit_bubble = !0;
          }), v._data(r, "_submit_attached", !0));
        });
      }, postDispatch: function postDispatch(e) {
        e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && v.event.simulate("submit", this.parentNode, e, !0));
      }, teardown: function teardown() {
        if (v.nodeName(this, "form")) return !1;v.event.remove(this, "._submit");
      } }), v.support.changeBubbles || (v.event.special.change = { setup: function setup() {
        if ($.test(this.nodeName)) {
          if (this.type === "checkbox" || this.type === "radio") v.event.add(this, "propertychange._change", function (e) {
            e.originalEvent.propertyName === "checked" && (this._just_changed = !0);
          }), v.event.add(this, "click._change", function (e) {
            this._just_changed && !e.isTrigger && (this._just_changed = !1), v.event.simulate("change", this, e, !0);
          });return !1;
        }v.event.add(this, "beforeactivate._change", function (e) {
          var t = e.target;$.test(t.nodeName) && !v._data(t, "_change_attached") && (v.event.add(t, "change._change", function (e) {
            this.parentNode && !e.isSimulated && !e.isTrigger && v.event.simulate("change", this.parentNode, e, !0);
          }), v._data(t, "_change_attached", !0));
        });
      }, handle: function handle(e) {
        var t = e.target;if (this !== t || e.isSimulated || e.isTrigger || t.type !== "radio" && t.type !== "checkbox") return e.handleObj.handler.apply(this, arguments);
      }, teardown: function teardown() {
        return v.event.remove(this, "._change"), !$.test(this.nodeName);
      } }), v.support.focusinBubbles || v.each({ focus: "focusin", blur: "focusout" }, function (e, t) {
      var n = 0,
          r = function r(e) {
        v.event.simulate(t, e.target, v.event.fix(e), !0);
      };v.event.special[t] = { setup: function setup() {
          n++ === 0 && i.addEventListener(e, r, !0);
        }, teardown: function teardown() {
          --n === 0 && i.removeEventListener(e, r, !0);
        } };
    }), v.fn.extend({ on: function on(e, n, r, i, s) {
        var o, u;if ((typeof e === "undefined" ? "undefined" : _typeof(e)) == "object") {
          typeof n != "string" && (r = r || n, n = t);for (u in e) {
            this.on(u, n, r, e[u], s);
          }return this;
        }r == null && i == null ? (i = n, r = n = t) : i == null && (typeof n == "string" ? (i = r, r = t) : (i = r, r = n, n = t));if (i === !1) i = et;else if (!i) return this;return s === 1 && (o = i, i = function i(e) {
          return v().off(e), o.apply(this, arguments);
        }, i.guid = o.guid || (o.guid = v.guid++)), this.each(function () {
          v.event.add(this, e, i, r, n);
        });
      }, one: function one(e, t, n, r) {
        return this.on(e, t, n, r, 1);
      }, off: function off(e, n, r) {
        var i, s;if (e && e.preventDefault && e.handleObj) return i = e.handleObj, v(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;if ((typeof e === "undefined" ? "undefined" : _typeof(e)) == "object") {
          for (s in e) {
            this.off(s, n, e[s]);
          }return this;
        }if (n === !1 || typeof n == "function") r = n, n = t;return r === !1 && (r = et), this.each(function () {
          v.event.remove(this, e, r, n);
        });
      }, bind: function bind(e, t, n) {
        return this.on(e, null, t, n);
      }, unbind: function unbind(e, t) {
        return this.off(e, null, t);
      }, live: function live(e, t, n) {
        return v(this.context).on(e, this.selector, t, n), this;
      }, die: function die(e, t) {
        return v(this.context).off(e, this.selector || "**", t), this;
      }, delegate: function delegate(e, t, n, r) {
        return this.on(t, e, n, r);
      }, undelegate: function undelegate(e, t, n) {
        return arguments.length === 1 ? this.off(e, "**") : this.off(t, e || "**", n);
      }, trigger: function trigger(e, t) {
        return this.each(function () {
          v.event.trigger(e, t, this);
        });
      }, triggerHandler: function triggerHandler(e, t) {
        if (this[0]) return v.event.trigger(e, t, this[0], !0);
      }, toggle: function toggle(e) {
        var t = arguments,
            n = e.guid || v.guid++,
            r = 0,
            i = function i(n) {
          var i = (v._data(this, "lastToggle" + e.guid) || 0) % r;return v._data(this, "lastToggle" + e.guid, i + 1), n.preventDefault(), t[i].apply(this, arguments) || !1;
        };i.guid = n;while (r < t.length) {
          t[r++].guid = n;
        }return this.click(i);
      }, hover: function hover(e, t) {
        return this.mouseenter(e).mouseleave(t || e);
      } }), v.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (e, t) {
      v.fn[t] = function (e, n) {
        return n == null && (n = e, e = null), arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t);
      }, Q.test(t) && (v.event.fixHooks[t] = v.event.keyHooks), G.test(t) && (v.event.fixHooks[t] = v.event.mouseHooks);
    }), function (e, t) {
      function nt(e, t, n, r) {
        n = n || [], t = t || g;var i,
            s,
            a,
            f,
            l = t.nodeType;if (!e || typeof e != "string") return n;if (l !== 1 && l !== 9) return [];a = o(t);if (!a && !r) if (i = R.exec(e)) if (f = i[1]) {
          if (l === 9) {
            s = t.getElementById(f);if (!s || !s.parentNode) return n;if (s.id === f) return n.push(s), n;
          } else if (t.ownerDocument && (s = t.ownerDocument.getElementById(f)) && u(t, s) && s.id === f) return n.push(s), n;
        } else {
          if (i[2]) return S.apply(n, x.call(t.getElementsByTagName(e), 0)), n;if ((f = i[3]) && Z && t.getElementsByClassName) return S.apply(n, x.call(t.getElementsByClassName(f), 0)), n;
        }return vt(e.replace(j, "$1"), t, n, r, a);
      }function rt(e) {
        return function (t) {
          var n = t.nodeName.toLowerCase();return n === "input" && t.type === e;
        };
      }function it(e) {
        return function (t) {
          var n = t.nodeName.toLowerCase();return (n === "input" || n === "button") && t.type === e;
        };
      }function st(e) {
        return N(function (t) {
          return t = +t, N(function (n, r) {
            var i,
                s = e([], n.length, t),
                o = s.length;while (o--) {
              n[i = s[o]] && (n[i] = !(r[i] = n[i]));
            }
          });
        });
      }function ot(e, t, n) {
        if (e === t) return n;var r = e.nextSibling;while (r) {
          if (r === t) return -1;r = r.nextSibling;
        }return 1;
      }function ut(e, t) {
        var n,
            r,
            s,
            o,
            u,
            a,
            f,
            l = L[d][e + " "];if (l) return t ? 0 : l.slice(0);u = e, a = [], f = i.preFilter;while (u) {
          if (!n || (r = F.exec(u))) r && (u = u.slice(r[0].length) || u), a.push(s = []);n = !1;if (r = I.exec(u)) s.push(n = new m(r.shift())), u = u.slice(n.length), n.type = r[0].replace(j, " ");for (o in i.filter) {
            (r = J[o].exec(u)) && (!f[o] || (r = f[o](r))) && (s.push(n = new m(r.shift())), u = u.slice(n.length), n.type = o, n.matches = r);
          }if (!n) break;
        }return t ? u.length : u ? nt.error(e) : L(e, a).slice(0);
      }function at(e, t, r) {
        var i = t.dir,
            s = r && t.dir === "parentNode",
            o = w++;return t.first ? function (t, n, r) {
          while (t = t[i]) {
            if (s || t.nodeType === 1) return e(t, n, r);
          }
        } : function (t, r, u) {
          if (!u) {
            var a,
                f = b + " " + o + " ",
                l = f + n;while (t = t[i]) {
              if (s || t.nodeType === 1) {
                if ((a = t[d]) === l) return t.sizset;if (typeof a == "string" && a.indexOf(f) === 0) {
                  if (t.sizset) return t;
                } else {
                  t[d] = l;if (e(t, r, u)) return t.sizset = !0, t;t.sizset = !1;
                }
              }
            }
          } else while (t = t[i]) {
            if (s || t.nodeType === 1) if (e(t, r, u)) return t;
          }
        };
      }function ft(e) {
        return e.length > 1 ? function (t, n, r) {
          var i = e.length;while (i--) {
            if (!e[i](t, n, r)) return !1;
          }return !0;
        } : e[0];
      }function lt(e, t, n, r, i) {
        var s,
            o = [],
            u = 0,
            a = e.length,
            f = t != null;for (; u < a; u++) {
          if (s = e[u]) if (!n || n(s, r, i)) o.push(s), f && t.push(u);
        }return o;
      }function ct(e, t, n, r, i, s) {
        return r && !r[d] && (r = ct(r)), i && !i[d] && (i = ct(i, s)), N(function (s, o, u, a) {
          var f,
              l,
              c,
              h = [],
              p = [],
              d = o.length,
              v = s || dt(t || "*", u.nodeType ? [u] : u, []),
              m = e && (s || !t) ? lt(v, h, e, u, a) : v,
              g = n ? i || (s ? e : d || r) ? [] : o : m;n && n(m, g, u, a);if (r) {
            f = lt(g, p), r(f, [], u, a), l = f.length;while (l--) {
              if (c = f[l]) g[p[l]] = !(m[p[l]] = c);
            }
          }if (s) {
            if (i || e) {
              if (i) {
                f = [], l = g.length;while (l--) {
                  (c = g[l]) && f.push(m[l] = c);
                }i(null, g = [], f, a);
              }l = g.length;while (l--) {
                (c = g[l]) && (f = i ? T.call(s, c) : h[l]) > -1 && (s[f] = !(o[f] = c));
              }
            }
          } else g = lt(g === o ? g.splice(d, g.length) : g), i ? i(null, o, g, a) : S.apply(o, g);
        });
      }function ht(e) {
        var t,
            n,
            r,
            s = e.length,
            o = i.relative[e[0].type],
            u = o || i.relative[" "],
            a = o ? 1 : 0,
            f = at(function (e) {
          return e === t;
        }, u, !0),
            l = at(function (e) {
          return T.call(t, e) > -1;
        }, u, !0),
            h = [function (e, n, r) {
          return !o && (r || n !== c) || ((t = n).nodeType ? f(e, n, r) : l(e, n, r));
        }];for (; a < s; a++) {
          if (n = i.relative[e[a].type]) h = [at(ft(h), n)];else {
            n = i.filter[e[a].type].apply(null, e[a].matches);if (n[d]) {
              r = ++a;for (; r < s; r++) {
                if (i.relative[e[r].type]) break;
              }return ct(a > 1 && ft(h), a > 1 && e.slice(0, a - 1).join("").replace(j, "$1"), n, a < r && ht(e.slice(a, r)), r < s && ht(e = e.slice(r)), r < s && e.join(""));
            }h.push(n);
          }
        }return ft(h);
      }function pt(e, t) {
        var r = t.length > 0,
            s = e.length > 0,
            o = function o(u, a, f, l, h) {
          var p,
              d,
              v,
              m = [],
              y = 0,
              w = "0",
              x = u && [],
              T = h != null,
              N = c,
              C = u || s && i.find.TAG("*", h && a.parentNode || a),
              k = b += N == null ? 1 : Math.E;T && (c = a !== g && a, n = o.el);for (; (p = C[w]) != null; w++) {
            if (s && p) {
              for (d = 0; v = e[d]; d++) {
                if (v(p, a, f)) {
                  l.push(p);break;
                }
              }T && (b = k, n = ++o.el);
            }r && ((p = !v && p) && y--, u && x.push(p));
          }y += w;if (r && w !== y) {
            for (d = 0; v = t[d]; d++) {
              v(x, m, a, f);
            }if (u) {
              if (y > 0) while (w--) {
                !x[w] && !m[w] && (m[w] = E.call(l));
              }m = lt(m);
            }S.apply(l, m), T && !u && m.length > 0 && y + t.length > 1 && nt.uniqueSort(l);
          }return T && (b = k, c = N), x;
        };return o.el = 0, r ? N(o) : o;
      }function dt(e, t, n) {
        var r = 0,
            i = t.length;for (; r < i; r++) {
          nt(e, t[r], n);
        }return n;
      }function vt(e, t, n, r, s) {
        var o,
            u,
            f,
            l,
            c,
            h = ut(e),
            p = h.length;if (!r && h.length === 1) {
          u = h[0] = h[0].slice(0);if (u.length > 2 && (f = u[0]).type === "ID" && t.nodeType === 9 && !s && i.relative[u[1].type]) {
            t = i.find.ID(f.matches[0].replace($, ""), t, s)[0];if (!t) return n;e = e.slice(u.shift().length);
          }for (o = J.POS.test(e) ? -1 : u.length - 1; o >= 0; o--) {
            f = u[o];if (i.relative[l = f.type]) break;if (c = i.find[l]) if (r = c(f.matches[0].replace($, ""), z.test(u[0].type) && t.parentNode || t, s)) {
              u.splice(o, 1), e = r.length && u.join("");if (!e) return S.apply(n, x.call(r, 0)), n;break;
            }
          }
        }return a(e, h)(r, t, s, n, z.test(e)), n;
      }function mt() {}var n,
          r,
          i,
          s,
          o,
          u,
          a,
          f,
          l,
          c,
          h = !0,
          p = "undefined",
          d = ("sizcache" + Math.random()).replace(".", ""),
          m = String,
          g = e.document,
          y = g.documentElement,
          b = 0,
          w = 0,
          E = [].pop,
          S = [].push,
          x = [].slice,
          T = [].indexOf || function (e) {
        var t = 0,
            n = this.length;for (; t < n; t++) {
          if (this[t] === e) return t;
        }return -1;
      },
          N = function N(e, t) {
        return e[d] = t == null || t, e;
      },
          C = function C() {
        var e = {},
            t = [];return N(function (n, r) {
          return t.push(n) > i.cacheLength && delete e[t.shift()], e[n + " "] = r;
        }, e);
      },
          k = C(),
          L = C(),
          A = C(),
          O = "[\\x20\\t\\r\\n\\f]",
          M = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",
          _ = M.replace("w", "w#"),
          D = "([*^$|!~]?=)",
          P = "\\[" + O + "*(" + M + ")" + O + "*(?:" + D + O + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + _ + ")|)|)" + O + "*\\]",
          H = ":(" + M + ")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:" + P + ")|[^:]|\\\\.)*|.*))\\)|)",
          B = ":(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + O + "*((?:-\\d)?\\d*)" + O + "*\\)|)(?=[^-]|$)",
          j = new RegExp("^" + O + "+|((?:^|[^\\\\])(?:\\\\.)*)" + O + "+$", "g"),
          F = new RegExp("^" + O + "*," + O + "*"),
          I = new RegExp("^" + O + "*([\\x20\\t\\r\\n\\f>+~])" + O + "*"),
          q = new RegExp(H),
          R = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,
          U = /^:not/,
          z = /[\x20\t\r\n\f]*[+~]/,
          W = /:not\($/,
          X = /h\d/i,
          V = /input|select|textarea|button/i,
          $ = /\\(?!\\)/g,
          J = { ID: new RegExp("^#(" + M + ")"), CLASS: new RegExp("^\\.(" + M + ")"), NAME: new RegExp("^\\[name=['\"]?(" + M + ")['\"]?\\]"), TAG: new RegExp("^(" + M.replace("w", "w*") + ")"), ATTR: new RegExp("^" + P), PSEUDO: new RegExp("^" + H), POS: new RegExp(B, "i"), CHILD: new RegExp("^:(only|nth|first|last)-child(?:\\(" + O + "*(even|odd|(([+-]|)(\\d*)n|)" + O + "*(?:([+-]|)" + O + "*(\\d+)|))" + O + "*\\)|)", "i"), needsContext: new RegExp("^" + O + "*[>+~]|" + B, "i") },
          K = function K(e) {
        var t = g.createElement("div");try {
          return e(t);
        } catch (n) {
          return !1;
        } finally {
          t = null;
        }
      },
          Q = K(function (e) {
        return e.appendChild(g.createComment("")), !e.getElementsByTagName("*").length;
      }),
          G = K(function (e) {
        return e.innerHTML = "<a href='#'></a>", e.firstChild && _typeof(e.firstChild.getAttribute) !== p && e.firstChild.getAttribute("href") === "#";
      }),
          Y = K(function (e) {
        e.innerHTML = "<select></select>";var t = _typeof(e.lastChild.getAttribute("multiple"));return t !== "boolean" && t !== "string";
      }),
          Z = K(function (e) {
        return e.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>", !e.getElementsByClassName || !e.getElementsByClassName("e").length ? !1 : (e.lastChild.className = "e", e.getElementsByClassName("e").length === 2);
      }),
          et = K(function (e) {
        e.id = d + 0, e.innerHTML = "<a name='" + d + "'></a><div name='" + d + "'></div>", y.insertBefore(e, y.firstChild);var t = g.getElementsByName && g.getElementsByName(d).length === 2 + g.getElementsByName(d + 0).length;return r = !g.getElementById(d), y.removeChild(e), t;
      });try {
        x.call(y.childNodes, 0)[0].nodeType;
      } catch (tt) {
        x = function x(e) {
          var t,
              n = [];for (; t = this[e]; e++) {
            n.push(t);
          }return n;
        };
      }nt.matches = function (e, t) {
        return nt(e, null, null, t);
      }, nt.matchesSelector = function (e, t) {
        return nt(t, null, null, [e]).length > 0;
      }, s = nt.getText = function (e) {
        var t,
            n = "",
            r = 0,
            i = e.nodeType;if (i) {
          if (i === 1 || i === 9 || i === 11) {
            if (typeof e.textContent == "string") return e.textContent;for (e = e.firstChild; e; e = e.nextSibling) {
              n += s(e);
            }
          } else if (i === 3 || i === 4) return e.nodeValue;
        } else for (; t = e[r]; r++) {
          n += s(t);
        }return n;
      }, o = nt.isXML = function (e) {
        var t = e && (e.ownerDocument || e).documentElement;return t ? t.nodeName !== "HTML" : !1;
      }, u = nt.contains = y.contains ? function (e, t) {
        var n = e.nodeType === 9 ? e.documentElement : e,
            r = t && t.parentNode;return e === r || !!(r && r.nodeType === 1 && n.contains && n.contains(r));
      } : y.compareDocumentPosition ? function (e, t) {
        return t && !!(e.compareDocumentPosition(t) & 16);
      } : function (e, t) {
        while (t = t.parentNode) {
          if (t === e) return !0;
        }return !1;
      }, nt.attr = function (e, t) {
        var n,
            r = o(e);return r || (t = t.toLowerCase()), (n = i.attrHandle[t]) ? n(e) : r || Y ? e.getAttribute(t) : (n = e.getAttributeNode(t), n ? typeof e[t] == "boolean" ? e[t] ? t : null : n.specified ? n.value : null : null);
      }, i = nt.selectors = { cacheLength: 50, createPseudo: N, match: J, attrHandle: G ? {} : { href: function href(e) {
            return e.getAttribute("href", 2);
          }, type: function type(e) {
            return e.getAttribute("type");
          } }, find: { ID: r ? function (e, t, n) {
            if (_typeof(t.getElementById) !== p && !n) {
              var r = t.getElementById(e);return r && r.parentNode ? [r] : [];
            }
          } : function (e, n, r) {
            if (_typeof(n.getElementById) !== p && !r) {
              var i = n.getElementById(e);return i ? i.id === e || _typeof(i.getAttributeNode) !== p && i.getAttributeNode("id").value === e ? [i] : t : [];
            }
          }, TAG: Q ? function (e, t) {
            if (_typeof(t.getElementsByTagName) !== p) return t.getElementsByTagName(e);
          } : function (e, t) {
            var n = t.getElementsByTagName(e);if (e === "*") {
              var r,
                  i = [],
                  s = 0;for (; r = n[s]; s++) {
                r.nodeType === 1 && i.push(r);
              }return i;
            }return n;
          }, NAME: et && function (e, t) {
            if (_typeof(t.getElementsByName) !== p) return t.getElementsByName(name);
          }, CLASS: Z && function (e, t, n) {
            if (_typeof(t.getElementsByClassName) !== p && !n) return t.getElementsByClassName(e);
          } }, relative: { ">": { dir: "parentNode", first: !0 }, " ": { dir: "parentNode" }, "+": { dir: "previousSibling", first: !0 }, "~": { dir: "previousSibling" } }, preFilter: { ATTR: function ATTR(e) {
            return e[1] = e[1].replace($, ""), e[3] = (e[4] || e[5] || "").replace($, ""), e[2] === "~=" && (e[3] = " " + e[3] + " "), e.slice(0, 4);
          }, CHILD: function CHILD(e) {
            return e[1] = e[1].toLowerCase(), e[1] === "nth" ? (e[2] || nt.error(e[0]), e[3] = +(e[3] ? e[4] + (e[5] || 1) : 2 * (e[2] === "even" || e[2] === "odd")), e[4] = +(e[6] + e[7] || e[2] === "odd")) : e[2] && nt.error(e[0]), e;
          }, PSEUDO: function PSEUDO(e) {
            var t, n;if (J.CHILD.test(e[0])) return null;if (e[3]) e[2] = e[3];else if (t = e[4]) q.test(t) && (n = ut(t, !0)) && (n = t.indexOf(")", t.length - n) - t.length) && (t = t.slice(0, n), e[0] = e[0].slice(0, n)), e[2] = t;return e.slice(0, 3);
          } }, filter: { ID: r ? function (e) {
            return e = e.replace($, ""), function (t) {
              return t.getAttribute("id") === e;
            };
          } : function (e) {
            return e = e.replace($, ""), function (t) {
              var n = _typeof(t.getAttributeNode) !== p && t.getAttributeNode("id");return n && n.value === e;
            };
          }, TAG: function TAG(e) {
            return e === "*" ? function () {
              return !0;
            } : (e = e.replace($, "").toLowerCase(), function (t) {
              return t.nodeName && t.nodeName.toLowerCase() === e;
            });
          }, CLASS: function CLASS(e) {
            var t = k[d][e + " "];return t || (t = new RegExp("(^|" + O + ")" + e + "(" + O + "|$)")) && k(e, function (e) {
              return t.test(e.className || _typeof(e.getAttribute) !== p && e.getAttribute("class") || "");
            });
          }, ATTR: function ATTR(e, t, n) {
            return function (r, i) {
              var s = nt.attr(r, e);return s == null ? t === "!=" : t ? (s += "", t === "=" ? s === n : t === "!=" ? s !== n : t === "^=" ? n && s.indexOf(n) === 0 : t === "*=" ? n && s.indexOf(n) > -1 : t === "$=" ? n && s.substr(s.length - n.length) === n : t === "~=" ? (" " + s + " ").indexOf(n) > -1 : t === "|=" ? s === n || s.substr(0, n.length + 1) === n + "-" : !1) : !0;
            };
          }, CHILD: function CHILD(e, t, n, r) {
            return e === "nth" ? function (e) {
              var t,
                  i,
                  s = e.parentNode;if (n === 1 && r === 0) return !0;if (s) {
                i = 0;for (t = s.firstChild; t; t = t.nextSibling) {
                  if (t.nodeType === 1) {
                    i++;if (e === t) break;
                  }
                }
              }return i -= r, i === n || i % n === 0 && i / n >= 0;
            } : function (t) {
              var n = t;switch (e) {case "only":case "first":
                  while (n = n.previousSibling) {
                    if (n.nodeType === 1) return !1;
                  }if (e === "first") return !0;n = t;case "last":
                  while (n = n.nextSibling) {
                    if (n.nodeType === 1) return !1;
                  }return !0;}
            };
          }, PSEUDO: function PSEUDO(e, t) {
            var n,
                r = i.pseudos[e] || i.setFilters[e.toLowerCase()] || nt.error("unsupported pseudo: " + e);return r[d] ? r(t) : r.length > 1 ? (n = [e, e, "", t], i.setFilters.hasOwnProperty(e.toLowerCase()) ? N(function (e, n) {
              var i,
                  s = r(e, t),
                  o = s.length;while (o--) {
                i = T.call(e, s[o]), e[i] = !(n[i] = s[o]);
              }
            }) : function (e) {
              return r(e, 0, n);
            }) : r;
          } }, pseudos: { not: N(function (e) {
            var t = [],
                n = [],
                r = a(e.replace(j, "$1"));return r[d] ? N(function (e, t, n, i) {
              var s,
                  o = r(e, null, i, []),
                  u = e.length;while (u--) {
                if (s = o[u]) e[u] = !(t[u] = s);
              }
            }) : function (e, i, s) {
              return t[0] = e, r(t, null, s, n), !n.pop();
            };
          }), has: N(function (e) {
            return function (t) {
              return nt(e, t).length > 0;
            };
          }), contains: N(function (e) {
            return function (t) {
              return (t.textContent || t.innerText || s(t)).indexOf(e) > -1;
            };
          }), enabled: function enabled(e) {
            return e.disabled === !1;
          }, disabled: function disabled(e) {
            return e.disabled === !0;
          }, checked: function checked(e) {
            var t = e.nodeName.toLowerCase();return t === "input" && !!e.checked || t === "option" && !!e.selected;
          }, selected: function selected(e) {
            return e.parentNode && e.parentNode.selectedIndex, e.selected === !0;
          }, parent: function parent(e) {
            return !i.pseudos.empty(e);
          }, empty: function empty(e) {
            var t;e = e.firstChild;while (e) {
              if (e.nodeName > "@" || (t = e.nodeType) === 3 || t === 4) return !1;e = e.nextSibling;
            }return !0;
          }, header: function header(e) {
            return X.test(e.nodeName);
          }, text: function text(e) {
            var t, n;return e.nodeName.toLowerCase() === "input" && (t = e.type) === "text" && ((n = e.getAttribute("type")) == null || n.toLowerCase() === t);
          }, radio: rt("radio"), checkbox: rt("checkbox"), file: rt("file"), password: rt("password"), image: rt("image"), submit: it("submit"), reset: it("reset"), button: function button(e) {
            var t = e.nodeName.toLowerCase();return t === "input" && e.type === "button" || t === "button";
          }, input: function input(e) {
            return V.test(e.nodeName);
          }, focus: function focus(e) {
            var t = e.ownerDocument;return e === t.activeElement && (!t.hasFocus || t.hasFocus()) && !!(e.type || e.href || ~e.tabIndex);
          }, active: function active(e) {
            return e === e.ownerDocument.activeElement;
          }, first: st(function () {
            return [0];
          }), last: st(function (e, t) {
            return [t - 1];
          }), eq: st(function (e, t, n) {
            return [n < 0 ? n + t : n];
          }), even: st(function (e, t) {
            for (var n = 0; n < t; n += 2) {
              e.push(n);
            }return e;
          }), odd: st(function (e, t) {
            for (var n = 1; n < t; n += 2) {
              e.push(n);
            }return e;
          }), lt: st(function (e, t, n) {
            for (var r = n < 0 ? n + t : n; --r >= 0;) {
              e.push(r);
            }return e;
          }), gt: st(function (e, t, n) {
            for (var r = n < 0 ? n + t : n; ++r < t;) {
              e.push(r);
            }return e;
          }) } }, f = y.compareDocumentPosition ? function (e, t) {
        return e === t ? (l = !0, 0) : (!e.compareDocumentPosition || !t.compareDocumentPosition ? e.compareDocumentPosition : e.compareDocumentPosition(t) & 4) ? -1 : 1;
      } : function (e, t) {
        if (e === t) return l = !0, 0;if (e.sourceIndex && t.sourceIndex) return e.sourceIndex - t.sourceIndex;var n,
            r,
            i = [],
            s = [],
            o = e.parentNode,
            u = t.parentNode,
            a = o;if (o === u) return ot(e, t);if (!o) return -1;if (!u) return 1;while (a) {
          i.unshift(a), a = a.parentNode;
        }a = u;while (a) {
          s.unshift(a), a = a.parentNode;
        }n = i.length, r = s.length;for (var f = 0; f < n && f < r; f++) {
          if (i[f] !== s[f]) return ot(i[f], s[f]);
        }return f === n ? ot(e, s[f], -1) : ot(i[f], t, 1);
      }, [0, 0].sort(f), h = !l, nt.uniqueSort = function (e) {
        var t,
            n = [],
            r = 1,
            i = 0;l = h, e.sort(f);if (l) {
          for (; t = e[r]; r++) {
            t === e[r - 1] && (i = n.push(r));
          }while (i--) {
            e.splice(n[i], 1);
          }
        }return e;
      }, nt.error = function (e) {
        throw new Error("Syntax error, unrecognized expression: " + e);
      }, a = nt.compile = function (e, t) {
        var n,
            r = [],
            i = [],
            s = A[d][e + " "];if (!s) {
          t || (t = ut(e)), n = t.length;while (n--) {
            s = ht(t[n]), s[d] ? r.push(s) : i.push(s);
          }s = A(e, pt(i, r));
        }return s;
      }, g.querySelectorAll && function () {
        var e,
            t = vt,
            n = /'|\\/g,
            r = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,
            i = [":focus"],
            s = [":active"],
            u = y.matchesSelector || y.mozMatchesSelector || y.webkitMatchesSelector || y.oMatchesSelector || y.msMatchesSelector;K(function (e) {
          e.innerHTML = "<select><option selected=''></option></select>", e.querySelectorAll("[selected]").length || i.push("\\[" + O + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)"), e.querySelectorAll(":checked").length || i.push(":checked");
        }), K(function (e) {
          e.innerHTML = "<p test=''></p>", e.querySelectorAll("[test^='']").length && i.push("[*^$]=" + O + "*(?:\"\"|'')"), e.innerHTML = "<input type='hidden'/>", e.querySelectorAll(":enabled").length || i.push(":enabled", ":disabled");
        }), i = new RegExp(i.join("|")), vt = function vt(e, r, s, o, u) {
          if (!o && !u && !i.test(e)) {
            var a,
                f,
                l = !0,
                c = d,
                h = r,
                p = r.nodeType === 9 && e;if (r.nodeType === 1 && r.nodeName.toLowerCase() !== "object") {
              a = ut(e), (l = r.getAttribute("id")) ? c = l.replace(n, "\\$&") : r.setAttribute("id", c), c = "[id='" + c + "'] ", f = a.length;while (f--) {
                a[f] = c + a[f].join("");
              }h = z.test(e) && r.parentNode || r, p = a.join(",");
            }if (p) try {
              return S.apply(s, x.call(h.querySelectorAll(p), 0)), s;
            } catch (v) {} finally {
              l || r.removeAttribute("id");
            }
          }return t(e, r, s, o, u);
        }, u && (K(function (t) {
          e = u.call(t, "div");try {
            u.call(t, "[test!='']:sizzle"), s.push("!=", H);
          } catch (n) {}
        }), s = new RegExp(s.join("|")), nt.matchesSelector = function (t, n) {
          n = n.replace(r, "='$1']");if (!o(t) && !s.test(n) && !i.test(n)) try {
            var a = u.call(t, n);if (a || e || t.document && t.document.nodeType !== 11) return a;
          } catch (f) {}return nt(n, null, null, [t]).length > 0;
        });
      }(), i.pseudos.nth = i.pseudos.eq, i.filters = mt.prototype = i.pseudos, i.setFilters = new mt(), nt.attr = v.attr, v.find = nt, v.expr = nt.selectors, v.expr[":"] = v.expr.pseudos, v.unique = nt.uniqueSort, v.text = nt.getText, v.isXMLDoc = nt.isXML, v.contains = nt.contains;
    }(e);var nt = /Until$/,
        rt = /^(?:parents|prev(?:Until|All))/,
        it = /^.[^:#\[\.,]*$/,
        st = v.expr.match.needsContext,
        ot = { children: !0, contents: !0, next: !0, prev: !0 };v.fn.extend({ find: function find(e) {
        var t,
            n,
            r,
            i,
            s,
            o,
            u = this;if (typeof e != "string") return v(e).filter(function () {
          for (t = 0, n = u.length; t < n; t++) {
            if (v.contains(u[t], this)) return !0;
          }
        });o = this.pushStack("", "find", e);for (t = 0, n = this.length; t < n; t++) {
          r = o.length, v.find(e, this[t], o);if (t > 0) for (i = r; i < o.length; i++) {
            for (s = 0; s < r; s++) {
              if (o[s] === o[i]) {
                o.splice(i--, 1);break;
              }
            }
          }
        }return o;
      }, has: function has(e) {
        var t,
            n = v(e, this),
            r = n.length;return this.filter(function () {
          for (t = 0; t < r; t++) {
            if (v.contains(this, n[t])) return !0;
          }
        });
      }, not: function not(e) {
        return this.pushStack(ft(this, e, !1), "not", e);
      }, filter: function filter(e) {
        return this.pushStack(ft(this, e, !0), "filter", e);
      }, is: function is(e) {
        return !!e && (typeof e == "string" ? st.test(e) ? v(e, this.context).index(this[0]) >= 0 : v.filter(e, this).length > 0 : this.filter(e).length > 0);
      }, closest: function closest(e, t) {
        var n,
            r = 0,
            i = this.length,
            s = [],
            o = st.test(e) || typeof e != "string" ? v(e, t || this.context) : 0;for (; r < i; r++) {
          n = this[r];while (n && n.ownerDocument && n !== t && n.nodeType !== 11) {
            if (o ? o.index(n) > -1 : v.find.matchesSelector(n, e)) {
              s.push(n);break;
            }n = n.parentNode;
          }
        }return s = s.length > 1 ? v.unique(s) : s, this.pushStack(s, "closest", e);
      }, index: function index(e) {
        return e ? typeof e == "string" ? v.inArray(this[0], v(e)) : v.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.prevAll().length : -1;
      }, add: function add(e, t) {
        var n = typeof e == "string" ? v(e, t) : v.makeArray(e && e.nodeType ? [e] : e),
            r = v.merge(this.get(), n);return this.pushStack(ut(n[0]) || ut(r[0]) ? r : v.unique(r));
      }, addBack: function addBack(e) {
        return this.add(e == null ? this.prevObject : this.prevObject.filter(e));
      } }), v.fn.andSelf = v.fn.addBack, v.each({ parent: function parent(e) {
        var t = e.parentNode;return t && t.nodeType !== 11 ? t : null;
      }, parents: function parents(e) {
        return v.dir(e, "parentNode");
      }, parentsUntil: function parentsUntil(e, t, n) {
        return v.dir(e, "parentNode", n);
      }, next: function next(e) {
        return at(e, "nextSibling");
      }, prev: function prev(e) {
        return at(e, "previousSibling");
      }, nextAll: function nextAll(e) {
        return v.dir(e, "nextSibling");
      }, prevAll: function prevAll(e) {
        return v.dir(e, "previousSibling");
      }, nextUntil: function nextUntil(e, t, n) {
        return v.dir(e, "nextSibling", n);
      }, prevUntil: function prevUntil(e, t, n) {
        return v.dir(e, "previousSibling", n);
      }, siblings: function siblings(e) {
        return v.sibling((e.parentNode || {}).firstChild, e);
      }, children: function children(e) {
        return v.sibling(e.firstChild);
      }, contents: function contents(e) {
        return v.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : v.merge([], e.childNodes);
      } }, function (e, t) {
      v.fn[e] = function (n, r) {
        var i = v.map(this, t, n);return nt.test(e) || (r = n), r && typeof r == "string" && (i = v.filter(r, i)), i = this.length > 1 && !ot[e] ? v.unique(i) : i, this.length > 1 && rt.test(e) && (i = i.reverse()), this.pushStack(i, e, l.call(arguments).join(","));
      };
    }), v.extend({ filter: function filter(e, t, n) {
        return n && (e = ":not(" + e + ")"), t.length === 1 ? v.find.matchesSelector(t[0], e) ? [t[0]] : [] : v.find.matches(e, t);
      }, dir: function dir(e, n, r) {
        var i = [],
            s = e[n];while (s && s.nodeType !== 9 && (r === t || s.nodeType !== 1 || !v(s).is(r))) {
          s.nodeType === 1 && i.push(s), s = s[n];
        }return i;
      }, sibling: function sibling(e, t) {
        var n = [];for (; e; e = e.nextSibling) {
          e.nodeType === 1 && e !== t && n.push(e);
        }return n;
      } });var ct = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        ht = / jQuery\d+="(?:null|\d+)"/g,
        pt = /^\s+/,
        dt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        vt = /<([\w:]+)/,
        mt = /<tbody/i,
        gt = /<|&#?\w+;/,
        yt = /<(?:script|style|link)/i,
        bt = /<(?:script|object|embed|option|style)/i,
        wt = new RegExp("<(?:" + ct + ")[\\s/>]", "i"),
        Et = /^(?:checkbox|radio)$/,
        St = /checked\s*(?:[^=]|=\s*.checked.)/i,
        xt = /\/(java|ecma)script/i,
        Tt = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,
        Nt = { option: [1, "<select multiple='multiple'>", "</select>"], legend: [1, "<fieldset>", "</fieldset>"], thead: [1, "<table>", "</table>"], tr: [2, "<table><tbody>", "</tbody></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"], area: [1, "<map>", "</map>"], _default: [0, "", ""] },
        Ct = lt(i),
        kt = Ct.appendChild(i.createElement("div"));Nt.optgroup = Nt.option, Nt.tbody = Nt.tfoot = Nt.colgroup = Nt.caption = Nt.thead, Nt.th = Nt.td, v.support.htmlSerialize || (Nt._default = [1, "X<div>", "</div>"]), v.fn.extend({ text: function text(e) {
        return v.access(this, function (e) {
          return e === t ? v.text(this) : this.empty().append((this[0] && this[0].ownerDocument || i).createTextNode(e));
        }, null, e, arguments.length);
      }, wrapAll: function wrapAll(e) {
        if (v.isFunction(e)) return this.each(function (t) {
          v(this).wrapAll(e.call(this, t));
        });if (this[0]) {
          var t = v(e, this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
            var e = this;while (e.firstChild && e.firstChild.nodeType === 1) {
              e = e.firstChild;
            }return e;
          }).append(this);
        }return this;
      }, wrapInner: function wrapInner(e) {
        return v.isFunction(e) ? this.each(function (t) {
          v(this).wrapInner(e.call(this, t));
        }) : this.each(function () {
          var t = v(this),
              n = t.contents();n.length ? n.wrapAll(e) : t.append(e);
        });
      }, wrap: function wrap(e) {
        var t = v.isFunction(e);return this.each(function (n) {
          v(this).wrapAll(t ? e.call(this, n) : e);
        });
      }, unwrap: function unwrap() {
        return this.parent().each(function () {
          v.nodeName(this, "body") || v(this).replaceWith(this.childNodes);
        }).end();
      }, append: function append() {
        return this.domManip(arguments, !0, function (e) {
          (this.nodeType === 1 || this.nodeType === 11) && this.appendChild(e);
        });
      }, prepend: function prepend() {
        return this.domManip(arguments, !0, function (e) {
          (this.nodeType === 1 || this.nodeType === 11) && this.insertBefore(e, this.firstChild);
        });
      }, before: function before() {
        if (!ut(this[0])) return this.domManip(arguments, !1, function (e) {
          this.parentNode.insertBefore(e, this);
        });if (arguments.length) {
          var e = v.clean(arguments);return this.pushStack(v.merge(e, this), "before", this.selector);
        }
      }, after: function after() {
        if (!ut(this[0])) return this.domManip(arguments, !1, function (e) {
          this.parentNode.insertBefore(e, this.nextSibling);
        });if (arguments.length) {
          var e = v.clean(arguments);return this.pushStack(v.merge(this, e), "after", this.selector);
        }
      }, remove: function remove(e, t) {
        var n,
            r = 0;for (; (n = this[r]) != null; r++) {
          if (!e || v.filter(e, [n]).length) !t && n.nodeType === 1 && (v.cleanData(n.getElementsByTagName("*")), v.cleanData([n])), n.parentNode && n.parentNode.removeChild(n);
        }return this;
      }, empty: function empty() {
        var e,
            t = 0;for (; (e = this[t]) != null; t++) {
          e.nodeType === 1 && v.cleanData(e.getElementsByTagName("*"));while (e.firstChild) {
            e.removeChild(e.firstChild);
          }
        }return this;
      }, clone: function clone(e, t) {
        return e = e == null ? !1 : e, t = t == null ? e : t, this.map(function () {
          return v.clone(this, e, t);
        });
      }, html: function html(e) {
        return v.access(this, function (e) {
          var n = this[0] || {},
              r = 0,
              i = this.length;if (e === t) return n.nodeType === 1 ? n.innerHTML.replace(ht, "") : t;if (typeof e == "string" && !yt.test(e) && (v.support.htmlSerialize || !wt.test(e)) && (v.support.leadingWhitespace || !pt.test(e)) && !Nt[(vt.exec(e) || ["", ""])[1].toLowerCase()]) {
            e = e.replace(dt, "<$1></$2>");try {
              for (; r < i; r++) {
                n = this[r] || {}, n.nodeType === 1 && (v.cleanData(n.getElementsByTagName("*")), n.innerHTML = e);
              }n = 0;
            } catch (s) {}
          }n && this.empty().append(e);
        }, null, e, arguments.length);
      }, replaceWith: function replaceWith(e) {
        return ut(this[0]) ? this.length ? this.pushStack(v(v.isFunction(e) ? e() : e), "replaceWith", e) : this : v.isFunction(e) ? this.each(function (t) {
          var n = v(this),
              r = n.html();n.replaceWith(e.call(this, t, r));
        }) : (typeof e != "string" && (e = v(e).detach()), this.each(function () {
          var t = this.nextSibling,
              n = this.parentNode;v(this).remove(), t ? v(t).before(e) : v(n).append(e);
        }));
      }, detach: function detach(e) {
        return this.remove(e, !0);
      }, domManip: function domManip(e, n, r) {
        e = [].concat.apply([], e);var i,
            s,
            o,
            u,
            a = 0,
            f = e[0],
            l = [],
            c = this.length;if (!v.support.checkClone && c > 1 && typeof f == "string" && St.test(f)) return this.each(function () {
          v(this).domManip(e, n, r);
        });if (v.isFunction(f)) return this.each(function (i) {
          var s = v(this);e[0] = f.call(this, i, n ? s.html() : t), s.domManip(e, n, r);
        });if (this[0]) {
          i = v.buildFragment(e, this, l), o = i.fragment, s = o.firstChild, o.childNodes.length === 1 && (o = s);if (s) {
            n = n && v.nodeName(s, "tr");for (u = i.cacheable || c - 1; a < c; a++) {
              r.call(n && v.nodeName(this[a], "table") ? Lt(this[a], "tbody") : this[a], a === u ? o : v.clone(o, !0, !0));
            }
          }o = s = null, l.length && v.each(l, function (e, t) {
            t.src ? v.ajax ? v.ajax({ url: t.src, type: "GET", dataType: "script", async: !1, global: !1, "throws": !0 }) : v.error("no ajax") : v.globalEval((t.text || t.textContent || t.innerHTML || "").replace(Tt, "")), t.parentNode && t.parentNode.removeChild(t);
          });
        }return this;
      } }), v.buildFragment = function (e, n, r) {
      var s,
          o,
          u,
          a = e[0];return n = n || i, n = !n.nodeType && n[0] || n, n = n.ownerDocument || n, e.length === 1 && typeof a == "string" && a.length < 512 && n === i && a.charAt(0) === "<" && !bt.test(a) && (v.support.checkClone || !St.test(a)) && (v.support.html5Clone || !wt.test(a)) && (o = !0, s = v.fragments[a], u = s !== t), s || (s = n.createDocumentFragment(), v.clean(e, n, s, r), o && (v.fragments[a] = u && s)), { fragment: s, cacheable: o };
    }, v.fragments = {}, v.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function (e, t) {
      v.fn[e] = function (n) {
        var r,
            i = 0,
            s = [],
            o = v(n),
            u = o.length,
            a = this.length === 1 && this[0].parentNode;if ((a == null || a && a.nodeType === 11 && a.childNodes.length === 1) && u === 1) return o[t](this[0]), this;for (; i < u; i++) {
          r = (i > 0 ? this.clone(!0) : this).get(), v(o[i])[t](r), s = s.concat(r);
        }return this.pushStack(s, e, o.selector);
      };
    }), v.extend({ clone: function clone(e, t, n) {
        var r, i, s, o;v.support.html5Clone || v.isXMLDoc(e) || !wt.test("<" + e.nodeName + ">") ? o = e.cloneNode(!0) : (kt.innerHTML = e.outerHTML, kt.removeChild(o = kt.firstChild));if ((!v.support.noCloneEvent || !v.support.noCloneChecked) && (e.nodeType === 1 || e.nodeType === 11) && !v.isXMLDoc(e)) {
          Ot(e, o), r = Mt(e), i = Mt(o);for (s = 0; r[s]; ++s) {
            i[s] && Ot(r[s], i[s]);
          }
        }if (t) {
          At(e, o);if (n) {
            r = Mt(e), i = Mt(o);for (s = 0; r[s]; ++s) {
              At(r[s], i[s]);
            }
          }
        }return r = i = null, o;
      }, clean: function clean(e, t, n, r) {
        var s,
            o,
            u,
            a,
            f,
            l,
            c,
            h,
            p,
            d,
            m,
            g,
            y = t === i && Ct,
            b = [];if (!t || typeof t.createDocumentFragment == "undefined") t = i;for (s = 0; (u = e[s]) != null; s++) {
          typeof u == "number" && (u += "");if (!u) continue;if (typeof u == "string") if (!gt.test(u)) u = t.createTextNode(u);else {
            y = y || lt(t), c = t.createElement("div"), y.appendChild(c), u = u.replace(dt, "<$1></$2>"), a = (vt.exec(u) || ["", ""])[1].toLowerCase(), f = Nt[a] || Nt._default, l = f[0], c.innerHTML = f[1] + u + f[2];while (l--) {
              c = c.lastChild;
            }if (!v.support.tbody) {
              h = mt.test(u), p = a === "table" && !h ? c.firstChild && c.firstChild.childNodes : f[1] === "<table>" && !h ? c.childNodes : [];for (o = p.length - 1; o >= 0; --o) {
                v.nodeName(p[o], "tbody") && !p[o].childNodes.length && p[o].parentNode.removeChild(p[o]);
              }
            }!v.support.leadingWhitespace && pt.test(u) && c.insertBefore(t.createTextNode(pt.exec(u)[0]), c.firstChild), u = c.childNodes, c.parentNode.removeChild(c);
          }u.nodeType ? b.push(u) : v.merge(b, u);
        }c && (u = c = y = null);if (!v.support.appendChecked) for (s = 0; (u = b[s]) != null; s++) {
          v.nodeName(u, "input") ? _t(u) : typeof u.getElementsByTagName != "undefined" && v.grep(u.getElementsByTagName("input"), _t);
        }if (n) {
          m = function m(e) {
            if (!e.type || xt.test(e.type)) return r ? r.push(e.parentNode ? e.parentNode.removeChild(e) : e) : n.appendChild(e);
          };for (s = 0; (u = b[s]) != null; s++) {
            if (!v.nodeName(u, "script") || !m(u)) n.appendChild(u), typeof u.getElementsByTagName != "undefined" && (g = v.grep(v.merge([], u.getElementsByTagName("script")), m), b.splice.apply(b, [s + 1, 0].concat(g)), s += g.length);
          }
        }return b;
      }, cleanData: function cleanData(e, t) {
        var n,
            r,
            i,
            s,
            o = 0,
            u = v.expando,
            a = v.cache,
            f = v.support.deleteExpando,
            l = v.event.special;for (; (i = e[o]) != null; o++) {
          if (t || v.acceptData(i)) {
            r = i[u], n = r && a[r];if (n) {
              if (n.events) for (s in n.events) {
                l[s] ? v.event.remove(i, s) : v.removeEvent(i, s, n.handle);
              }a[r] && (delete a[r], f ? delete i[u] : i.removeAttribute ? i.removeAttribute(u) : i[u] = null, v.deletedIds.push(r));
            }
          }
        }
      } }), function () {
      var e, t;v.uaMatch = function (e) {
        e = e.toLowerCase();var t = /(chrome)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || e.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [];return { browser: t[1] || "", version: t[2] || "0" };
      }, e = v.uaMatch(o.userAgent), t = {}, e.browser && (t[e.browser] = !0, t.version = e.version), t.chrome ? t.webkit = !0 : t.webkit && (t.safari = !0), v.browser = t, v.sub = function () {
        function e(t, n) {
          return new e.fn.init(t, n);
        }v.extend(!0, e, this), e.superclass = this, e.fn = e.prototype = this(), e.fn.constructor = e, e.sub = this.sub, e.fn.init = function (r, i) {
          return i && i instanceof v && !(i instanceof e) && (i = e(i)), v.fn.init.call(this, r, i, t);
        }, e.fn.init.prototype = e.fn;var t = e(i);return e;
      };
    }();var Dt,
        Pt,
        Ht,
        Bt = /alpha\([^)]*\)/i,
        jt = /opacity=([^)]*)/,
        Ft = /^(top|right|bottom|left)$/,
        It = /^(none|table(?!-c[ea]).+)/,
        qt = /^margin/,
        Rt = new RegExp("^(" + m + ")(.*)$", "i"),
        Ut = new RegExp("^(" + m + ")(?!px)[a-z%]+$", "i"),
        zt = new RegExp("^([-+])=(" + m + ")", "i"),
        Wt = { BODY: "block" },
        Xt = { position: "absolute", visibility: "hidden", display: "block" },
        Vt = { letterSpacing: 0, fontWeight: 400 },
        $t = ["Top", "Right", "Bottom", "Left"],
        Jt = ["Webkit", "O", "Moz", "ms"],
        Kt = v.fn.toggle;v.fn.extend({ css: function css(e, n) {
        return v.access(this, function (e, n, r) {
          return r !== t ? v.style(e, n, r) : v.css(e, n);
        }, e, n, arguments.length > 1);
      }, show: function show() {
        return Yt(this, !0);
      }, hide: function hide() {
        return Yt(this);
      }, toggle: function toggle(e, t) {
        var n = typeof e == "boolean";return v.isFunction(e) && v.isFunction(t) ? Kt.apply(this, arguments) : this.each(function () {
          (n ? e : Gt(this)) ? v(this).show() : v(this).hide();
        });
      } }), v.extend({ cssHooks: { opacity: { get: function get(e, t) {
            if (t) {
              var n = Dt(e, "opacity");return n === "" ? "1" : n;
            }
          } } }, cssNumber: { fillOpacity: !0, fontWeight: !0, lineHeight: !0, opacity: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0 }, cssProps: { "float": v.support.cssFloat ? "cssFloat" : "styleFloat" }, style: function style(e, n, r, i) {
        if (!e || e.nodeType === 3 || e.nodeType === 8 || !e.style) return;var s,
            o,
            u,
            a = v.camelCase(n),
            f = e.style;n = v.cssProps[a] || (v.cssProps[a] = Qt(f, a)), u = v.cssHooks[n] || v.cssHooks[a];if (r === t) return u && "get" in u && (s = u.get(e, !1, i)) !== t ? s : f[n];o = typeof r === "undefined" ? "undefined" : _typeof(r), o === "string" && (s = zt.exec(r)) && (r = (s[1] + 1) * s[2] + parseFloat(v.css(e, n)), o = "number");if (r == null || o === "number" && isNaN(r)) return;o === "number" && !v.cssNumber[a] && (r += "px");if (!u || !("set" in u) || (r = u.set(e, r, i)) !== t) try {
          f[n] = r;
        } catch (l) {}
      }, css: function css(e, n, r, i) {
        var s,
            o,
            u,
            a = v.camelCase(n);return n = v.cssProps[a] || (v.cssProps[a] = Qt(e.style, a)), u = v.cssHooks[n] || v.cssHooks[a], u && "get" in u && (s = u.get(e, !0, i)), s === t && (s = Dt(e, n)), s === "normal" && n in Vt && (s = Vt[n]), r || i !== t ? (o = parseFloat(s), r || v.isNumeric(o) ? o || 0 : s) : s;
      }, swap: function swap(e, t, n) {
        var r,
            i,
            s = {};for (i in t) {
          s[i] = e.style[i], e.style[i] = t[i];
        }r = n.call(e);for (i in t) {
          e.style[i] = s[i];
        }return r;
      } }), e.getComputedStyle ? Dt = function Dt(t, n) {
      var r,
          i,
          s,
          o,
          u = e.getComputedStyle(t, null),
          a = t.style;return u && (r = u.getPropertyValue(n) || u[n], r === "" && !v.contains(t.ownerDocument, t) && (r = v.style(t, n)), Ut.test(r) && qt.test(n) && (i = a.width, s = a.minWidth, o = a.maxWidth, a.minWidth = a.maxWidth = a.width = r, r = u.width, a.width = i, a.minWidth = s, a.maxWidth = o)), r;
    } : i.documentElement.currentStyle && (Dt = function Dt(e, t) {
      var n,
          r,
          i = e.currentStyle && e.currentStyle[t],
          s = e.style;return i == null && s && s[t] && (i = s[t]), Ut.test(i) && !Ft.test(t) && (n = s.left, r = e.runtimeStyle && e.runtimeStyle.left, r && (e.runtimeStyle.left = e.currentStyle.left), s.left = t === "fontSize" ? "1em" : i, i = s.pixelLeft + "px", s.left = n, r && (e.runtimeStyle.left = r)), i === "" ? "auto" : i;
    }), v.each(["height", "width"], function (e, t) {
      v.cssHooks[t] = { get: function get(e, n, r) {
          if (n) return e.offsetWidth === 0 && It.test(Dt(e, "display")) ? v.swap(e, Xt, function () {
            return tn(e, t, r);
          }) : tn(e, t, r);
        }, set: function set(e, n, r) {
          return Zt(e, n, r ? en(e, t, r, v.support.boxSizing && v.css(e, "boxSizing") === "border-box") : 0);
        } };
    }), v.support.opacity || (v.cssHooks.opacity = { get: function get(e, t) {
        return jt.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : "";
      }, set: function set(e, t) {
        var n = e.style,
            r = e.currentStyle,
            i = v.isNumeric(t) ? "alpha(opacity=" + t * 100 + ")" : "",
            s = r && r.filter || n.filter || "";n.zoom = 1;if (t >= 1 && v.trim(s.replace(Bt, "")) === "" && n.removeAttribute) {
          n.removeAttribute("filter");if (r && !r.filter) return;
        }n.filter = Bt.test(s) ? s.replace(Bt, i) : s + " " + i;
      } }), v(function () {
      v.support.reliableMarginRight || (v.cssHooks.marginRight = { get: function get(e, t) {
          return v.swap(e, { display: "inline-block" }, function () {
            if (t) return Dt(e, "marginRight");
          });
        } }), !v.support.pixelPosition && v.fn.position && v.each(["top", "left"], function (e, t) {
        v.cssHooks[t] = { get: function get(e, n) {
            if (n) {
              var r = Dt(e, t);return Ut.test(r) ? v(e).position()[t] + "px" : r;
            }
          } };
      });
    }), v.expr && v.expr.filters && (v.expr.filters.hidden = function (e) {
      return e.offsetWidth === 0 && e.offsetHeight === 0 || !v.support.reliableHiddenOffsets && (e.style && e.style.display || Dt(e, "display")) === "none";
    }, v.expr.filters.visible = function (e) {
      return !v.expr.filters.hidden(e);
    }), v.each({ margin: "", padding: "", border: "Width" }, function (e, t) {
      v.cssHooks[e + t] = { expand: function expand(n) {
          var r,
              i = typeof n == "string" ? n.split(" ") : [n],
              s = {};for (r = 0; r < 4; r++) {
            s[e + $t[r] + t] = i[r] || i[r - 2] || i[0];
          }return s;
        } }, qt.test(e) || (v.cssHooks[e + t].set = Zt);
    });var rn = /%20/g,
        sn = /\[\]$/,
        on = /\r?\n/g,
        un = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
        an = /^(?:select|textarea)/i;v.fn.extend({ serialize: function serialize() {
        return v.param(this.serializeArray());
      }, serializeArray: function serializeArray() {
        return this.map(function () {
          return this.elements ? v.makeArray(this.elements) : this;
        }).filter(function () {
          return this.name && !this.disabled && (this.checked || an.test(this.nodeName) || un.test(this.type));
        }).map(function (e, t) {
          var n = v(this).val();return n == null ? null : v.isArray(n) ? v.map(n, function (e, n) {
            return { name: t.name, value: e.replace(on, "\r\n") };
          }) : { name: t.name, value: n.replace(on, "\r\n") };
        }).get();
      } }), v.param = function (e, n) {
      var r,
          i = [],
          s = function s(e, t) {
        t = v.isFunction(t) ? t() : t == null ? "" : t, i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t);
      };n === t && (n = v.ajaxSettings && v.ajaxSettings.traditional);if (v.isArray(e) || e.jquery && !v.isPlainObject(e)) v.each(e, function () {
        s(this.name, this.value);
      });else for (r in e) {
        fn(r, e[r], n, s);
      }return i.join("&").replace(rn, "+");
    };var ln,
        cn,
        hn = /#.*$/,
        pn = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
        dn = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
        vn = /^(?:GET|HEAD)$/,
        mn = /^\/\//,
        gn = /\?/,
        yn = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        bn = /([?&])_=[^&]*/,
        wn = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
        En = v.fn.load,
        Sn = {},
        xn = {},
        Tn = ["*/"] + ["*"];try {
      cn = s.href;
    } catch (Nn) {
      cn = i.createElement("a"), cn.href = "", cn = cn.href;
    }ln = wn.exec(cn.toLowerCase()) || [], v.fn.load = function (e, n, r) {
      if (typeof e != "string" && En) return En.apply(this, arguments);if (!this.length) return this;var i,
          s,
          o,
          u = this,
          a = e.indexOf(" ");return a >= 0 && (i = e.slice(a, e.length), e = e.slice(0, a)), v.isFunction(n) ? (r = n, n = t) : n && (typeof n === "undefined" ? "undefined" : _typeof(n)) == "object" && (s = "POST"), v.ajax({ url: e, type: s, dataType: "html", data: n, complete: function complete(e, t) {
          r && u.each(r, o || [e.responseText, t, e]);
        } }).done(function (e) {
        o = arguments, u.html(i ? v("<div>").append(e.replace(yn, "")).find(i) : e);
      }), this;
    }, v.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function (e, t) {
      v.fn[t] = function (e) {
        return this.on(t, e);
      };
    }), v.each(["get", "post"], function (e, n) {
      v[n] = function (e, r, i, s) {
        return v.isFunction(r) && (s = s || i, i = r, r = t), v.ajax({ type: n, url: e, data: r, success: i, dataType: s });
      };
    }), v.extend({ getScript: function getScript(e, n) {
        return v.get(e, t, n, "script");
      }, getJSON: function getJSON(e, t, n) {
        return v.get(e, t, n, "json");
      }, ajaxSetup: function ajaxSetup(e, t) {
        return t ? Ln(e, v.ajaxSettings) : (t = e, e = v.ajaxSettings), Ln(e, t), e;
      }, ajaxSettings: { url: cn, isLocal: dn.test(ln[1]), global: !0, type: "GET", contentType: "application/x-www-form-urlencoded; charset=UTF-8", processData: !0, async: !0, accepts: { xml: "application/xml, text/xml", html: "text/html", text: "text/plain", json: "application/json, text/javascript", "*": Tn }, contents: { xml: /xml/, html: /html/, json: /json/ }, responseFields: { xml: "responseXML", text: "responseText" }, converters: { "* text": e.String, "text html": !0, "text json": v.parseJSON, "text xml": v.parseXML }, flatOptions: { context: !0, url: !0 } }, ajaxPrefilter: Cn(Sn), ajaxTransport: Cn(xn), ajax: function ajax(e, n) {
        function T(e, n, s, a) {
          var l,
              y,
              b,
              w,
              S,
              T = n;if (E === 2) return;E = 2, u && clearTimeout(u), o = t, i = a || "", x.readyState = e > 0 ? 4 : 0, s && (w = An(c, x, s));if (e >= 200 && e < 300 || e === 304) c.ifModified && (S = x.getResponseHeader("Last-Modified"), S && (v.lastModified[r] = S), S = x.getResponseHeader("Etag"), S && (v.etag[r] = S)), e === 304 ? (T = "notmodified", l = !0) : (l = On(c, w), T = l.state, y = l.data, b = l.error, l = !b);else {
            b = T;if (!T || e) T = "error", e < 0 && (e = 0);
          }x.status = e, x.statusText = (n || T) + "", l ? d.resolveWith(h, [y, T, x]) : d.rejectWith(h, [x, T, b]), x.statusCode(g), g = t, f && p.trigger("ajax" + (l ? "Success" : "Error"), [x, c, l ? y : b]), m.fireWith(h, [x, T]), f && (p.trigger("ajaxComplete", [x, c]), --v.active || v.event.trigger("ajaxStop"));
        }(typeof e === "undefined" ? "undefined" : _typeof(e)) == "object" && (n = e, e = t), n = n || {};var r,
            i,
            s,
            o,
            u,
            a,
            f,
            l,
            c = v.ajaxSetup({}, n),
            h = c.context || c,
            p = h !== c && (h.nodeType || h instanceof v) ? v(h) : v.event,
            d = v.Deferred(),
            m = v.Callbacks("once memory"),
            g = c.statusCode || {},
            b = {},
            w = {},
            E = 0,
            S = "canceled",
            x = { readyState: 0, setRequestHeader: function setRequestHeader(e, t) {
            if (!E) {
              var n = e.toLowerCase();e = w[n] = w[n] || e, b[e] = t;
            }return this;
          }, getAllResponseHeaders: function getAllResponseHeaders() {
            return E === 2 ? i : null;
          }, getResponseHeader: function getResponseHeader(e) {
            var n;if (E === 2) {
              if (!s) {
                s = {};while (n = pn.exec(i)) {
                  s[n[1].toLowerCase()] = n[2];
                }
              }n = s[e.toLowerCase()];
            }return n === t ? null : n;
          }, overrideMimeType: function overrideMimeType(e) {
            return E || (c.mimeType = e), this;
          }, abort: function abort(e) {
            return e = e || S, o && o.abort(e), T(0, e), this;
          } };d.promise(x), x.success = x.done, x.error = x.fail, x.complete = m.add, x.statusCode = function (e) {
          if (e) {
            var t;if (E < 2) for (t in e) {
              g[t] = [g[t], e[t]];
            } else t = e[x.status], x.always(t);
          }return this;
        }, c.url = ((e || c.url) + "").replace(hn, "").replace(mn, ln[1] + "//"), c.dataTypes = v.trim(c.dataType || "*").toLowerCase().split(y), c.crossDomain == null && (a = wn.exec(c.url.toLowerCase()), c.crossDomain = !(!a || a[1] === ln[1] && a[2] === ln[2] && (a[3] || (a[1] === "http:" ? 80 : 443)) == (ln[3] || (ln[1] === "http:" ? 80 : 443)))), c.data && c.processData && typeof c.data != "string" && (c.data = v.param(c.data, c.traditional)), kn(Sn, c, n, x);if (E === 2) return x;f = c.global, c.type = c.type.toUpperCase(), c.hasContent = !vn.test(c.type), f && v.active++ === 0 && v.event.trigger("ajaxStart");if (!c.hasContent) {
          c.data && (c.url += (gn.test(c.url) ? "&" : "?") + c.data, delete c.data), r = c.url;if (c.cache === !1) {
            var N = v.now(),
                C = c.url.replace(bn, "$1_=" + N);c.url = C + (C === c.url ? (gn.test(c.url) ? "&" : "?") + "_=" + N : "");
          }
        }(c.data && c.hasContent && c.contentType !== !1 || n.contentType) && x.setRequestHeader("Content-Type", c.contentType), c.ifModified && (r = r || c.url, v.lastModified[r] && x.setRequestHeader("If-Modified-Since", v.lastModified[r]), v.etag[r] && x.setRequestHeader("If-None-Match", v.etag[r])), x.setRequestHeader("Accept", c.dataTypes[0] && c.accepts[c.dataTypes[0]] ? c.accepts[c.dataTypes[0]] + (c.dataTypes[0] !== "*" ? ", " + Tn + "; q=0.01" : "") : c.accepts["*"]);for (l in c.headers) {
          x.setRequestHeader(l, c.headers[l]);
        }if (!c.beforeSend || c.beforeSend.call(h, x, c) !== !1 && E !== 2) {
          S = "abort";for (l in { success: 1, error: 1, complete: 1 }) {
            x[l](c[l]);
          }o = kn(xn, c, n, x);if (!o) T(-1, "No Transport");else {
            x.readyState = 1, f && p.trigger("ajaxSend", [x, c]), c.async && c.timeout > 0 && (u = setTimeout(function () {
              x.abort("timeout");
            }, c.timeout));try {
              E = 1, o.send(b, T);
            } catch (k) {
              if (!(E < 2)) throw k;T(-1, k);
            }
          }return x;
        }return x.abort();
      }, active: 0, lastModified: {}, etag: {} });var Mn = [],
        _n = /\?/,
        Dn = /(=)\?(?=&|$)|\?\?/,
        Pn = v.now();v.ajaxSetup({ jsonp: "callback", jsonpCallback: function jsonpCallback() {
        var e = Mn.pop() || v.expando + "_" + Pn++;return this[e] = !0, e;
      } }), v.ajaxPrefilter("json jsonp", function (n, r, i) {
      var s,
          o,
          u,
          a = n.data,
          f = n.url,
          l = n.jsonp !== !1,
          c = l && Dn.test(f),
          h = l && !c && typeof a == "string" && !(n.contentType || "").indexOf("application/x-www-form-urlencoded") && Dn.test(a);if (n.dataTypes[0] === "jsonp" || c || h) return s = n.jsonpCallback = v.isFunction(n.jsonpCallback) ? n.jsonpCallback() : n.jsonpCallback, o = e[s], c ? n.url = f.replace(Dn, "$1" + s) : h ? n.data = a.replace(Dn, "$1" + s) : l && (n.url += (_n.test(f) ? "&" : "?") + n.jsonp + "=" + s), n.converters["script json"] = function () {
        return u || v.error(s + " was not called"), u[0];
      }, n.dataTypes[0] = "json", e[s] = function () {
        u = arguments;
      }, i.always(function () {
        e[s] = o, n[s] && (n.jsonpCallback = r.jsonpCallback, Mn.push(s)), u && v.isFunction(o) && o(u[0]), u = o = t;
      }), "script";
    }), v.ajaxSetup({ accepts: { script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript" }, contents: { script: /javascript|ecmascript/ }, converters: { "text script": function textScript(e) {
          return v.globalEval(e), e;
        } } }), v.ajaxPrefilter("script", function (e) {
      e.cache === t && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1);
    }), v.ajaxTransport("script", function (e) {
      if (e.crossDomain) {
        var n,
            r = i.head || i.getElementsByTagName("head")[0] || i.documentElement;return { send: function send(s, o) {
            n = i.createElement("script"), n.async = "async", e.scriptCharset && (n.charset = e.scriptCharset), n.src = e.url, n.onload = n.onreadystatechange = function (e, i) {
              if (i || !n.readyState || /loaded|complete/.test(n.readyState)) n.onload = n.onreadystatechange = null, r && n.parentNode && r.removeChild(n), n = t, i || o(200, "success");
            }, r.insertBefore(n, r.firstChild);
          }, abort: function abort() {
            n && n.onload(0, 1);
          } };
      }
    });var Hn,
        Bn = e.ActiveXObject ? function () {
      for (var e in Hn) {
        Hn[e](0, 1);
      }
    } : !1,
        jn = 0;v.ajaxSettings.xhr = e.ActiveXObject ? function () {
      return !this.isLocal && Fn() || In();
    } : Fn, function (e) {
      v.extend(v.support, { ajax: !!e, cors: !!e && "withCredentials" in e });
    }(v.ajaxSettings.xhr()), v.support.ajax && v.ajaxTransport(function (n) {
      if (!n.crossDomain || v.support.cors) {
        var _r;return { send: function send(i, s) {
            var o,
                u,
                a = n.xhr();n.username ? a.open(n.type, n.url, n.async, n.username, n.password) : a.open(n.type, n.url, n.async);if (n.xhrFields) for (u in n.xhrFields) {
              a[u] = n.xhrFields[u];
            }n.mimeType && a.overrideMimeType && a.overrideMimeType(n.mimeType), !n.crossDomain && !i["X-Requested-With"] && (i["X-Requested-With"] = "XMLHttpRequest");try {
              for (u in i) {
                a.setRequestHeader(u, i[u]);
              }
            } catch (f) {}a.send(n.hasContent && n.data || null), _r = function r(e, i) {
              var u, f, l, c, h;try {
                if (_r && (i || a.readyState === 4)) {
                  _r = t, o && (a.onreadystatechange = v.noop, Bn && delete Hn[o]);if (i) a.readyState !== 4 && a.abort();else {
                    u = a.status, l = a.getAllResponseHeaders(), c = {}, h = a.responseXML, h && h.documentElement && (c.xml = h);try {
                      c.text = a.responseText;
                    } catch (p) {}try {
                      f = a.statusText;
                    } catch (p) {
                      f = "";
                    }!u && n.isLocal && !n.crossDomain ? u = c.text ? 200 : 404 : u === 1223 && (u = 204);
                  }
                }
              } catch (d) {
                i || s(-1, d);
              }c && s(u, f, c, l);
            }, n.async ? a.readyState === 4 ? setTimeout(_r, 0) : (o = ++jn, Bn && (Hn || (Hn = {}, v(e).unload(Bn)), Hn[o] = _r), a.onreadystatechange = _r) : _r();
          }, abort: function abort() {
            _r && _r(0, 1);
          } };
      }
    });var qn,
        Rn,
        Un = /^(?:toggle|show|hide)$/,
        zn = new RegExp("^(?:([-+])=|)(" + m + ")([a-z%]*)$", "i"),
        Wn = /queueHooks$/,
        Xn = [Gn],
        Vn = { "*": [function (e, t) {
        var n,
            r,
            i = this.createTween(e, t),
            s = zn.exec(t),
            o = i.cur(),
            u = +o || 0,
            a = 1,
            f = 20;if (s) {
          n = +s[2], r = s[3] || (v.cssNumber[e] ? "" : "px");if (r !== "px" && u) {
            u = v.css(i.elem, e, !0) || n || 1;do {
              a = a || ".5", u /= a, v.style(i.elem, e, u + r);
            } while (a !== (a = i.cur() / o) && a !== 1 && --f);
          }i.unit = r, i.start = u, i.end = s[1] ? u + (s[1] + 1) * n : n;
        }return i;
      }] };v.Animation = v.extend(Kn, { tweener: function tweener(e, t) {
        v.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");var n,
            r = 0,
            i = e.length;for (; r < i; r++) {
          n = e[r], Vn[n] = Vn[n] || [], Vn[n].unshift(t);
        }
      }, prefilter: function prefilter(e, t) {
        t ? Xn.unshift(e) : Xn.push(e);
      } }), v.Tween = Yn, Yn.prototype = { constructor: Yn, init: function init(e, t, n, r, i, s) {
        this.elem = e, this.prop = n, this.easing = i || "swing", this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = s || (v.cssNumber[n] ? "" : "px");
      }, cur: function cur() {
        var e = Yn.propHooks[this.prop];return e && e.get ? e.get(this) : Yn.propHooks._default.get(this);
      }, run: function run(e) {
        var t,
            n = Yn.propHooks[this.prop];return this.options.duration ? this.pos = t = v.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : Yn.propHooks._default.set(this), this;
      } }, Yn.prototype.init.prototype = Yn.prototype, Yn.propHooks = { _default: { get: function get(e) {
          var t;return e.elem[e.prop] == null || !!e.elem.style && e.elem.style[e.prop] != null ? (t = v.css(e.elem, e.prop, !1, ""), !t || t === "auto" ? 0 : t) : e.elem[e.prop];
        }, set: function set(e) {
          v.fx.step[e.prop] ? v.fx.step[e.prop](e) : e.elem.style && (e.elem.style[v.cssProps[e.prop]] != null || v.cssHooks[e.prop]) ? v.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now;
        } } }, Yn.propHooks.scrollTop = Yn.propHooks.scrollLeft = { set: function set(e) {
        e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
      } }, v.each(["toggle", "show", "hide"], function (e, t) {
      var n = v.fn[t];v.fn[t] = function (r, i, s) {
        return r == null || typeof r == "boolean" || !e && v.isFunction(r) && v.isFunction(i) ? n.apply(this, arguments) : this.animate(Zn(t, !0), r, i, s);
      };
    }), v.fn.extend({ fadeTo: function fadeTo(e, t, n, r) {
        return this.filter(Gt).css("opacity", 0).show().end().animate({ opacity: t }, e, n, r);
      }, animate: function animate(e, t, n, r) {
        var i = v.isEmptyObject(e),
            s = v.speed(t, n, r),
            o = function o() {
          var t = Kn(this, v.extend({}, e), s);i && t.stop(!0);
        };return i || s.queue === !1 ? this.each(o) : this.queue(s.queue, o);
      }, stop: function stop(e, n, r) {
        var i = function i(e) {
          var t = e.stop;delete e.stop, t(r);
        };return typeof e != "string" && (r = n, n = e, e = t), n && e !== !1 && this.queue(e || "fx", []), this.each(function () {
          var t = !0,
              n = e != null && e + "queueHooks",
              s = v.timers,
              o = v._data(this);if (n) o[n] && o[n].stop && i(o[n]);else for (n in o) {
            o[n] && o[n].stop && Wn.test(n) && i(o[n]);
          }for (n = s.length; n--;) {
            s[n].elem === this && (e == null || s[n].queue === e) && (s[n].anim.stop(r), t = !1, s.splice(n, 1));
          }(t || !r) && v.dequeue(this, e);
        });
      } }), v.each({ slideDown: Zn("show"), slideUp: Zn("hide"), slideToggle: Zn("toggle"), fadeIn: { opacity: "show" }, fadeOut: { opacity: "hide" }, fadeToggle: { opacity: "toggle" } }, function (e, t) {
      v.fn[e] = function (e, n, r) {
        return this.animate(t, e, n, r);
      };
    }), v.speed = function (e, t, n) {
      var r = e && (typeof e === "undefined" ? "undefined" : _typeof(e)) == "object" ? v.extend({}, e) : { complete: n || !n && t || v.isFunction(e) && e, duration: e, easing: n && t || t && !v.isFunction(t) && t };r.duration = v.fx.off ? 0 : typeof r.duration == "number" ? r.duration : r.duration in v.fx.speeds ? v.fx.speeds[r.duration] : v.fx.speeds._default;if (r.queue == null || r.queue === !0) r.queue = "fx";return r.old = r.complete, r.complete = function () {
        v.isFunction(r.old) && r.old.call(this), r.queue && v.dequeue(this, r.queue);
      }, r;
    }, v.easing = { linear: function linear(e) {
        return e;
      }, swing: function swing(e) {
        return .5 - Math.cos(e * Math.PI) / 2;
      } }, v.timers = [], v.fx = Yn.prototype.init, v.fx.tick = function () {
      var e,
          n = v.timers,
          r = 0;qn = v.now();for (; r < n.length; r++) {
        e = n[r], !e() && n[r] === e && n.splice(r--, 1);
      }n.length || v.fx.stop(), qn = t;
    }, v.fx.timer = function (e) {
      e() && v.timers.push(e) && !Rn && (Rn = setInterval(v.fx.tick, v.fx.interval));
    }, v.fx.interval = 13, v.fx.stop = function () {
      clearInterval(Rn), Rn = null;
    }, v.fx.speeds = { slow: 600, fast: 200, _default: 400 }, v.fx.step = {}, v.expr && v.expr.filters && (v.expr.filters.animated = function (e) {
      return v.grep(v.timers, function (t) {
        return e === t.elem;
      }).length;
    });var er = /^(?:body|html)$/i;v.fn.offset = function (e) {
      if (arguments.length) return e === t ? this : this.each(function (t) {
        v.offset.setOffset(this, e, t);
      });var n,
          r,
          i,
          s,
          o,
          u,
          a,
          f = { top: 0, left: 0 },
          l = this[0],
          c = l && l.ownerDocument;if (!c) return;return (r = c.body) === l ? v.offset.bodyOffset(l) : (n = c.documentElement, v.contains(n, l) ? (typeof l.getBoundingClientRect != "undefined" && (f = l.getBoundingClientRect()), i = tr(c), s = n.clientTop || r.clientTop || 0, o = n.clientLeft || r.clientLeft || 0, u = i.pageYOffset || n.scrollTop, a = i.pageXOffset || n.scrollLeft, { top: f.top + u - s, left: f.left + a - o }) : f);
    }, v.offset = { bodyOffset: function bodyOffset(e) {
        var t = e.offsetTop,
            n = e.offsetLeft;return v.support.doesNotIncludeMarginInBodyOffset && (t += parseFloat(v.css(e, "marginTop")) || 0, n += parseFloat(v.css(e, "marginLeft")) || 0), { top: t, left: n };
      }, setOffset: function setOffset(e, t, n) {
        var r = v.css(e, "position");r === "static" && (e.style.position = "relative");var i = v(e),
            s = i.offset(),
            o = v.css(e, "top"),
            u = v.css(e, "left"),
            a = (r === "absolute" || r === "fixed") && v.inArray("auto", [o, u]) > -1,
            f = {},
            l = {},
            c,
            h;a ? (l = i.position(), c = l.top, h = l.left) : (c = parseFloat(o) || 0, h = parseFloat(u) || 0), v.isFunction(t) && (t = t.call(e, n, s)), t.top != null && (f.top = t.top - s.top + c), t.left != null && (f.left = t.left - s.left + h), "using" in t ? t.using.call(e, f) : i.css(f);
      } }, v.fn.extend({ position: function position() {
        if (!this[0]) return;var e = this[0],
            t = this.offsetParent(),
            n = this.offset(),
            r = er.test(t[0].nodeName) ? { top: 0, left: 0 } : t.offset();return n.top -= parseFloat(v.css(e, "marginTop")) || 0, n.left -= parseFloat(v.css(e, "marginLeft")) || 0, r.top += parseFloat(v.css(t[0], "borderTopWidth")) || 0, r.left += parseFloat(v.css(t[0], "borderLeftWidth")) || 0, { top: n.top - r.top, left: n.left - r.left };
      }, offsetParent: function offsetParent() {
        return this.map(function () {
          var e = this.offsetParent || i.body;while (e && !er.test(e.nodeName) && v.css(e, "position") === "static") {
            e = e.offsetParent;
          }return e || i.body;
        });
      } }), v.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (e, n) {
      var r = /Y/.test(n);v.fn[e] = function (i) {
        return v.access(this, function (e, i, s) {
          var o = tr(e);if (s === t) return o ? n in o ? o[n] : o.document.documentElement[i] : e[i];o ? o.scrollTo(r ? v(o).scrollLeft() : s, r ? s : v(o).scrollTop()) : e[i] = s;
        }, e, i, arguments.length, null);
      };
    }), v.each({ Height: "height", Width: "width" }, function (e, n) {
      v.each({ padding: "inner" + e, content: n, "": "outer" + e }, function (r, i) {
        v.fn[i] = function (i, s) {
          var o = arguments.length && (r || typeof i != "boolean"),
              u = r || (i === !0 || s === !0 ? "margin" : "border");return v.access(this, function (n, r, i) {
            var s;return v.isWindow(n) ? n.document.documentElement["client" + e] : n.nodeType === 9 ? (s = n.documentElement, Math.max(n.body["scroll" + e], s["scroll" + e], n.body["offset" + e], s["offset" + e], s["client" + e])) : i === t ? v.css(n, r, i, u) : v.style(n, r, i, u);
          }, n, o ? i : t, o, null);
        };
      });
    }), e.jQuery = e.$ = v, typeof define == "function" && define.amd && define.amd.jQuery && define("jquery", [], function () {
      return v;
    });
  })(window);
  ;browserify_shim__define__module__export__(typeof $ != "undefined" ? $ : window.$);
}).call(global, undefined, undefined, undefined, undefined, function defineExport(ex) {
  module.exports = ex;
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],4:[function(require,module,exports){
(function (global){
"use strict";var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol?"symbol":typeof obj;};;$=global.$=require("/var/www/streambed/shelly/toolpanel/static/toolpanel/dist/temp/jquery-1.8.3.min.js");;var __browserify_shim_require__=require;(function browserifyShim(module,exports,require,define,browserify_shim__define__module__export__){ /*! jQuery UI - v1.8.23 - 2012-08-15
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.core.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */(function(a,b){function c(b,c){var e=b.nodeName.toLowerCase();if("area"===e){var f=b.parentNode,g=f.name,h;return !b.href||!g||f.nodeName.toLowerCase()!=="map"?!1:(h=a("img[usemap=#"+g+"]")[0],!!h&&d(h));}return (/input|select|textarea|button|object/.test(e)?!b.disabled:"a"==e?b.href||c:c)&&d(b);}function d(b){return !a(b).parents().andSelf().filter(function(){return a.curCSS(this,"visibility")==="hidden"||a.expr.filters.hidden(this);}).length;}a.ui=a.ui||{};if(a.ui.version)return;a.extend(a.ui,{version:"1.8.23",keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91}}),a.fn.extend({propAttr:a.fn.prop||a.fn.attr,_focus:a.fn.focus,focus:function focus(b,c){return typeof b=="number"?this.each(function(){var d=this;setTimeout(function(){a(d).focus(),c&&c.call(d);},b);}):this._focus.apply(this,arguments);},scrollParent:function scrollParent(){var b;return a.browser.msie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?b=this.parents().filter(function(){return (/(relative|absolute|fixed)/.test(a.curCSS(this,"position",1))&&/(auto|scroll)/.test(a.curCSS(this,"overflow",1)+a.curCSS(this,"overflow-y",1)+a.curCSS(this,"overflow-x",1)));}).eq(0):b=this.parents().filter(function(){return (/(auto|scroll)/.test(a.curCSS(this,"overflow",1)+a.curCSS(this,"overflow-y",1)+a.curCSS(this,"overflow-x",1)));}).eq(0),/fixed/.test(this.css("position"))||!b.length?a(document):b;},zIndex:function zIndex(c){if(c!==b)return this.css("zIndex",c);if(this.length){var d=a(this[0]),e,f;while(d.length&&d[0]!==document){e=d.css("position");if(e==="absolute"||e==="relative"||e==="fixed"){f=parseInt(d.css("zIndex"),10);if(!isNaN(f)&&f!==0)return f;}d=d.parent();}}return 0;},disableSelection:function disableSelection(){return this.bind((a.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(a){a.preventDefault();});},enableSelection:function enableSelection(){return this.unbind(".ui-disableSelection");}}),a("<a>").outerWidth(1).jquery||a.each(["Width","Height"],function(c,d){function h(b,c,d,f){return a.each(e,function(){c-=parseFloat(a.curCSS(b,"padding"+this,!0))||0,d&&(c-=parseFloat(a.curCSS(b,"border"+this+"Width",!0))||0),f&&(c-=parseFloat(a.curCSS(b,"margin"+this,!0))||0);}),c;}var e=d==="Width"?["Left","Right"]:["Top","Bottom"],f=d.toLowerCase(),g={innerWidth:a.fn.innerWidth,innerHeight:a.fn.innerHeight,outerWidth:a.fn.outerWidth,outerHeight:a.fn.outerHeight};a.fn["inner"+d]=function(c){return c===b?g["inner"+d].call(this):this.each(function(){a(this).css(f,h(this,c)+"px");});},a.fn["outer"+d]=function(b,c){return typeof b!="number"?g["outer"+d].call(this,b):this.each(function(){a(this).css(f,h(this,b,!0,c)+"px");});};}),a.extend(a.expr[":"],{data:a.expr.createPseudo?a.expr.createPseudo(function(b){return function(c){return !!a.data(c,b);};}):function(b,c,d){return !!a.data(b,d[3]);},focusable:function focusable(b){return c(b,!isNaN(a.attr(b,"tabindex")));},tabbable:function tabbable(b){var d=a.attr(b,"tabindex"),e=isNaN(d);return (e||d>=0)&&c(b,!e);}}),a(function(){var b=document.body,c=b.appendChild(c=document.createElement("div"));c.offsetHeight,a.extend(c.style,{minHeight:"100px",height:"auto",padding:0,borderWidth:0}),a.support.minHeight=c.offsetHeight===100,a.support.selectstart="onselectstart" in c,b.removeChild(c).style.display="none";}),a.curCSS||(a.curCSS=a.css),a.extend(a.ui,{plugin:{add:function add(b,c,d){var e=a.ui[b].prototype;for(var f in d){e.plugins[f]=e.plugins[f]||[],e.plugins[f].push([c,d[f]]);}},call:function call(a,b,c){var d=a.plugins[b];if(!d||!a.element[0].parentNode)return;for(var e=0;e<d.length;e++){a.options[d[e][0]]&&d[e][1].apply(a.element,c);}}},contains:function contains(a,b){return document.compareDocumentPosition?a.compareDocumentPosition(b)&16:a!==b&&a.contains(b);},hasScroll:function hasScroll(b,c){if(a(b).css("overflow")==="hidden")return !1;var d=c&&c==="left"?"scrollLeft":"scrollTop",e=!1;return b[d]>0?!0:(b[d]=1,e=b[d]>0,b[d]=0,e);},isOverAxis:function isOverAxis(a,b,c){return a>b&&a<b+c;},isOver:function isOver(b,c,d,e,f,g){return a.ui.isOverAxis(b,d,f)&&a.ui.isOverAxis(c,e,g);}});})(jQuery);; /*! jQuery UI - v1.8.23 - 2012-08-15
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.widget.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */(function(a,b){if(a.cleanData){var c=a.cleanData;a.cleanData=function(b){for(var d=0,e;(e=b[d])!=null;d++){try{a(e).triggerHandler("remove");}catch(f){}}c(b);};}else {var d=a.fn.remove;a.fn.remove=function(b,c){return this.each(function(){return c||(!b||a.filter(b,[this]).length)&&a("*",this).add([this]).each(function(){try{a(this).triggerHandler("remove");}catch(b){}}),d.call(a(this),b,c);});};}a.widget=function(b,c,d){var e=b.split(".")[0],f;b=b.split(".")[1],f=e+"-"+b,d||(d=c,c=a.Widget),a.expr[":"][f]=function(c){return !!a.data(c,b);},a[e]=a[e]||{},a[e][b]=function(a,b){arguments.length&&this._createWidget(a,b);};var g=new c();g.options=a.extend(!0,{},g.options),a[e][b].prototype=a.extend(!0,g,{namespace:e,widgetName:b,widgetEventPrefix:a[e][b].prototype.widgetEventPrefix||b,widgetBaseClass:f},d),a.widget.bridge(b,a[e][b]);},a.widget.bridge=function(c,d){a.fn[c]=function(e){var f=typeof e=="string",g=Array.prototype.slice.call(arguments,1),h=this;return e=!f&&g.length?a.extend.apply(null,[!0,e].concat(g)):e,f&&e.charAt(0)==="_"?h:(f?this.each(function(){var d=a.data(this,c),f=d&&a.isFunction(d[e])?d[e].apply(d,g):d;if(f!==d&&f!==b)return h=f,!1;}):this.each(function(){var b=a.data(this,c);b?b.option(e||{})._init():a.data(this,c,new d(e,this));}),h);};},a.Widget=function(a,b){arguments.length&&this._createWidget(a,b);},a.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",options:{disabled:!1},_createWidget:function _createWidget(b,c){a.data(c,this.widgetName,this),this.element=a(c),this.options=a.extend(!0,{},this.options,this._getCreateOptions(),b);var d=this;this.element.bind("remove."+this.widgetName,function(){d.destroy();}),this._create(),this._trigger("create"),this._init();},_getCreateOptions:function _getCreateOptions(){return a.metadata&&a.metadata.get(this.element[0])[this.widgetName];},_create:function _create(){},_init:function _init(){},destroy:function destroy(){this.element.unbind("."+this.widgetName).removeData(this.widgetName),this.widget().unbind("."+this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass+"-disabled "+"ui-state-disabled");},widget:function widget(){return this.element;},option:function option(c,d){var e=c;if(arguments.length===0)return a.extend({},this.options);if(typeof c=="string"){if(d===b)return this.options[c];e={},e[c]=d;}return this._setOptions(e),this;},_setOptions:function _setOptions(b){var c=this;return a.each(b,function(a,b){c._setOption(a,b);}),this;},_setOption:function _setOption(a,b){return this.options[a]=b,a==="disabled"&&this.widget()[b?"addClass":"removeClass"](this.widgetBaseClass+"-disabled"+" "+"ui-state-disabled").attr("aria-disabled",b),this;},enable:function enable(){return this._setOption("disabled",!1);},disable:function disable(){return this._setOption("disabled",!0);},_trigger:function _trigger(b,c,d){var e,f,g=this.options[b];d=d||{},c=a.Event(c),c.type=(b===this.widgetEventPrefix?b:this.widgetEventPrefix+b).toLowerCase(),c.target=this.element[0],f=c.originalEvent;if(f)for(e in f){e in c||(c[e]=f[e]);}return this.element.trigger(c,d),!(a.isFunction(g)&&g.call(this.element[0],c,d)===!1||c.isDefaultPrevented());}};})(jQuery);; /*! jQuery UI - v1.8.23 - 2012-08-15
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.mouse.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */(function(a,b){var c=!1;a(document).mouseup(function(a){c=!1;}),a.widget("ui.mouse",{options:{cancel:":input,option",distance:1,delay:0},_mouseInit:function _mouseInit(){var b=this;this.element.bind("mousedown."+this.widgetName,function(a){return b._mouseDown(a);}).bind("click."+this.widgetName,function(c){if(!0===a.data(c.target,b.widgetName+".preventClickEvent"))return a.removeData(c.target,b.widgetName+".preventClickEvent"),c.stopImmediatePropagation(),!1;}),this.started=!1;},_mouseDestroy:function _mouseDestroy(){this.element.unbind("."+this.widgetName),this._mouseMoveDelegate&&a(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate);},_mouseDown:function _mouseDown(b){if(c)return;this._mouseStarted&&this._mouseUp(b),this._mouseDownEvent=b;var d=this,e=b.which==1,f=typeof this.options.cancel=="string"&&b.target.nodeName?a(b.target).closest(this.options.cancel).length:!1;if(!e||f||!this._mouseCapture(b))return !0;this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){d.mouseDelayMet=!0;},this.options.delay));if(this._mouseDistanceMet(b)&&this._mouseDelayMet(b)){this._mouseStarted=this._mouseStart(b)!==!1;if(!this._mouseStarted)return b.preventDefault(),!0;}return !0===a.data(b.target,this.widgetName+".preventClickEvent")&&a.removeData(b.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(a){return d._mouseMove(a);},this._mouseUpDelegate=function(a){return d._mouseUp(a);},a(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate),b.preventDefault(),c=!0,!0;},_mouseMove:function _mouseMove(b){return !a.browser.msie||document.documentMode>=9||!!b.button?this._mouseStarted?(this._mouseDrag(b),b.preventDefault()):(this._mouseDistanceMet(b)&&this._mouseDelayMet(b)&&(this._mouseStarted=this._mouseStart(this._mouseDownEvent,b)!==!1,this._mouseStarted?this._mouseDrag(b):this._mouseUp(b)),!this._mouseStarted):this._mouseUp(b);},_mouseUp:function _mouseUp(b){return a(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,b.target==this._mouseDownEvent.target&&a.data(b.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(b)),!1;},_mouseDistanceMet:function _mouseDistanceMet(a){return Math.max(Math.abs(this._mouseDownEvent.pageX-a.pageX),Math.abs(this._mouseDownEvent.pageY-a.pageY))>=this.options.distance;},_mouseDelayMet:function _mouseDelayMet(a){return this.mouseDelayMet;},_mouseStart:function _mouseStart(a){},_mouseDrag:function _mouseDrag(a){},_mouseStop:function _mouseStop(a){},_mouseCapture:function _mouseCapture(a){return !0;}});})(jQuery);; /*! jQuery UI - v1.8.23 - 2012-08-15
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.position.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */(function(a,b){a.ui=a.ui||{};var c=/left|center|right/,d=/top|center|bottom/,e="center",f={},g=a.fn.position,h=a.fn.offset;a.fn.position=function(b){if(!b||!b.of)return g.apply(this,arguments);b=a.extend({},b);var h=a(b.of),i=h[0],j=(b.collision||"flip").split(" "),k=b.offset?b.offset.split(" "):[0,0],l,m,n;return i.nodeType===9?(l=h.width(),m=h.height(),n={top:0,left:0}):i.setTimeout?(l=h.width(),m=h.height(),n={top:h.scrollTop(),left:h.scrollLeft()}):i.preventDefault?(b.at="left top",l=m=0,n={top:b.of.pageY,left:b.of.pageX}):(l=h.outerWidth(),m=h.outerHeight(),n=h.offset()),a.each(["my","at"],function(){var a=(b[this]||"").split(" ");a.length===1&&(a=c.test(a[0])?a.concat([e]):d.test(a[0])?[e].concat(a):[e,e]),a[0]=c.test(a[0])?a[0]:e,a[1]=d.test(a[1])?a[1]:e,b[this]=a;}),j.length===1&&(j[1]=j[0]),k[0]=parseInt(k[0],10)||0,k.length===1&&(k[1]=k[0]),k[1]=parseInt(k[1],10)||0,b.at[0]==="right"?n.left+=l:b.at[0]===e&&(n.left+=l/2),b.at[1]==="bottom"?n.top+=m:b.at[1]===e&&(n.top+=m/2),n.left+=k[0],n.top+=k[1],this.each(function(){var c=a(this),d=c.outerWidth(),g=c.outerHeight(),h=parseInt(a.curCSS(this,"marginLeft",!0))||0,i=parseInt(a.curCSS(this,"marginTop",!0))||0,o=d+h+(parseInt(a.curCSS(this,"marginRight",!0))||0),p=g+i+(parseInt(a.curCSS(this,"marginBottom",!0))||0),q=a.extend({},n),r;b.my[0]==="right"?q.left-=d:b.my[0]===e&&(q.left-=d/2),b.my[1]==="bottom"?q.top-=g:b.my[1]===e&&(q.top-=g/2),f.fractions||(q.left=Math.round(q.left),q.top=Math.round(q.top)),r={left:q.left-h,top:q.top-i},a.each(["left","top"],function(c,e){a.ui.position[j[c]]&&a.ui.position[j[c]][e](q,{targetWidth:l,targetHeight:m,elemWidth:d,elemHeight:g,collisionPosition:r,collisionWidth:o,collisionHeight:p,offset:k,my:b.my,at:b.at});}),a.fn.bgiframe&&c.bgiframe(),c.offset(a.extend(q,{using:b.using}));});},a.ui.position={fit:{left:function left(b,c){var d=a(window),e=c.collisionPosition.left+c.collisionWidth-d.width()-d.scrollLeft();b.left=e>0?b.left-e:Math.max(b.left-c.collisionPosition.left,b.left);},top:function top(b,c){var d=a(window),e=c.collisionPosition.top+c.collisionHeight-d.height()-d.scrollTop();b.top=e>0?b.top-e:Math.max(b.top-c.collisionPosition.top,b.top);}},flip:{left:function left(b,c){if(c.at[0]===e)return;var d=a(window),f=c.collisionPosition.left+c.collisionWidth-d.width()-d.scrollLeft(),g=c.my[0]==="left"?-c.elemWidth:c.my[0]==="right"?c.elemWidth:0,h=c.at[0]==="left"?c.targetWidth:-c.targetWidth,i=-2*c.offset[0];b.left+=c.collisionPosition.left<0?g+h+i:f>0?g+h+i:0;},top:function top(b,c){if(c.at[1]===e)return;var d=a(window),f=c.collisionPosition.top+c.collisionHeight-d.height()-d.scrollTop(),g=c.my[1]==="top"?-c.elemHeight:c.my[1]==="bottom"?c.elemHeight:0,h=c.at[1]==="top"?c.targetHeight:-c.targetHeight,i=-2*c.offset[1];b.top+=c.collisionPosition.top<0?g+h+i:f>0?g+h+i:0;}}},a.offset.setOffset||(a.offset.setOffset=function(b,c){/static/.test(a.curCSS(b,"position"))&&(b.style.position="relative");var d=a(b),e=d.offset(),f=parseInt(a.curCSS(b,"top",!0),10)||0,g=parseInt(a.curCSS(b,"left",!0),10)||0,h={top:c.top-e.top+f,left:c.left-e.left+g};"using" in c?c.using.call(b,h):d.css(h);},a.fn.offset=function(b){var c=this[0];return !c||!c.ownerDocument?null:b?a.isFunction(b)?this.each(function(c){a(this).offset(b.call(this,c,a(this).offset()));}):this.each(function(){a.offset.setOffset(this,b);}):h.call(this);}),a.curCSS||(a.curCSS=a.css),function(){var b=document.getElementsByTagName("body")[0],c=document.createElement("div"),d,e,g,h,i;d=document.createElement(b?"div":"body"),g={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"},b&&a.extend(g,{position:"absolute",left:"-1000px",top:"-1000px"});for(var j in g){d.style[j]=g[j];}d.appendChild(c),e=b||document.documentElement,e.insertBefore(d,e.firstChild),c.style.cssText="position: absolute; left: 10.7432222px; top: 10.432325px; height: 30px; width: 201px;",h=a(c).offset(function(a,b){return b;}).offset(),d.innerHTML="",e.removeChild(d),i=h.top+h.left+(b?2e3:0),f.fractions=i>21&&i<22;}();})(jQuery);; /*! jQuery UI - v1.8.23 - 2012-08-15
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.draggable.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */(function(a,b){a.widget("ui.draggable",a.ui.mouse,{widgetEventPrefix:"drag",options:{addClasses:!0,appendTo:"parent",axis:!1,connectToSortable:!1,containment:!1,cursor:"auto",cursorAt:!1,grid:!1,handle:!1,helper:"original",iframeFix:!1,opacity:!1,refreshPositions:!1,revert:!1,revertDuration:500,scope:"default",scroll:!0,scrollSensitivity:20,scrollSpeed:20,snap:!1,snapMode:"both",snapTolerance:20,stack:!1,zIndex:!1},_create:function _create(){this.options.helper=="original"&&!/^(?:r|a|f)/.test(this.element.css("position"))&&(this.element[0].style.position="relative"),this.options.addClasses&&this.element.addClass("ui-draggable"),this.options.disabled&&this.element.addClass("ui-draggable-disabled"),this._mouseInit();},destroy:function destroy(){if(!this.element.data("draggable"))return;return this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"),this._mouseDestroy(),this;},_mouseCapture:function _mouseCapture(b){var c=this.options;return this.helper||c.disabled||a(b.target).is(".ui-resizable-handle")?!1:(this.handle=this._getHandle(b),this.handle?(c.iframeFix&&a(c.iframeFix===!0?"iframe":c.iframeFix).each(function(){a('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({width:this.offsetWidth+"px",height:this.offsetHeight+"px",position:"absolute",opacity:"0.001",zIndex:1e3}).css(a(this).offset()).appendTo("body");}),!0):!1);},_mouseStart:function _mouseStart(b){var c=this.options;return this.helper=this._createHelper(b),this.helper.addClass("ui-draggable-dragging"),this._cacheHelperProportions(),a.ui.ddmanager&&(a.ui.ddmanager.current=this),this._cacheMargins(),this.cssPosition=this.helper.css("position"),this.scrollParent=this.helper.scrollParent(),this.offset=this.positionAbs=this.element.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},a.extend(this.offset,{click:{left:b.pageX-this.offset.left,top:b.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.originalPosition=this.position=this._generatePosition(b),this.originalPageX=b.pageX,this.originalPageY=b.pageY,c.cursorAt&&this._adjustOffsetFromHelper(c.cursorAt),c.containment&&this._setContainment(),this._trigger("start",b)===!1?(this._clear(),!1):(this._cacheHelperProportions(),a.ui.ddmanager&&!c.dropBehaviour&&a.ui.ddmanager.prepareOffsets(this,b),this._mouseDrag(b,!0),a.ui.ddmanager&&a.ui.ddmanager.dragStart(this,b),!0);},_mouseDrag:function _mouseDrag(b,c){this.position=this._generatePosition(b),this.positionAbs=this._convertPositionTo("absolute");if(!c){var d=this._uiHash();if(this._trigger("drag",b,d)===!1)return this._mouseUp({}),!1;this.position=d.position;}if(!this.options.axis||this.options.axis!="y")this.helper[0].style.left=this.position.left+"px";if(!this.options.axis||this.options.axis!="x")this.helper[0].style.top=this.position.top+"px";return a.ui.ddmanager&&a.ui.ddmanager.drag(this,b),!1;},_mouseStop:function _mouseStop(b){var c=!1;a.ui.ddmanager&&!this.options.dropBehaviour&&(c=a.ui.ddmanager.drop(this,b)),this.dropped&&(c=this.dropped,this.dropped=!1);var d=this.element[0],e=!1;while(d&&(d=d.parentNode)){d==document&&(e=!0);}if(!e&&this.options.helper==="original")return !1;if(this.options.revert=="invalid"&&!c||this.options.revert=="valid"&&c||this.options.revert===!0||a.isFunction(this.options.revert)&&this.options.revert.call(this.element,c)){var f=this;a(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){f._trigger("stop",b)!==!1&&f._clear();});}else this._trigger("stop",b)!==!1&&this._clear();return !1;},_mouseUp:function _mouseUp(b){return this.options.iframeFix===!0&&a("div.ui-draggable-iframeFix").each(function(){this.parentNode.removeChild(this);}),a.ui.ddmanager&&a.ui.ddmanager.dragStop(this,b),a.ui.mouse.prototype._mouseUp.call(this,b);},cancel:function cancel(){return this.helper.is(".ui-draggable-dragging")?this._mouseUp({}):this._clear(),this;},_getHandle:function _getHandle(b){var c=!this.options.handle||!a(this.options.handle,this.element).length?!0:!1;return a(this.options.handle,this.element).find("*").andSelf().each(function(){this==b.target&&(c=!0);}),c;},_createHelper:function _createHelper(b){var c=this.options,d=a.isFunction(c.helper)?a(c.helper.apply(this.element[0],[b])):c.helper=="clone"?this.element.clone().removeAttr("id"):this.element;return d.parents("body").length||d.appendTo(c.appendTo=="parent"?this.element[0].parentNode:c.appendTo),d[0]!=this.element[0]&&!/(fixed|absolute)/.test(d.css("position"))&&d.css("position","absolute"),d;},_adjustOffsetFromHelper:function _adjustOffsetFromHelper(b){typeof b=="string"&&(b=b.split(" ")),a.isArray(b)&&(b={left:+b[0],top:+b[1]||0}),"left" in b&&(this.offset.click.left=b.left+this.margins.left),"right" in b&&(this.offset.click.left=this.helperProportions.width-b.right+this.margins.left),"top" in b&&(this.offset.click.top=b.top+this.margins.top),"bottom" in b&&(this.offset.click.top=this.helperProportions.height-b.bottom+this.margins.top);},_getParentOffset:function _getParentOffset(){this.offsetParent=this.helper.offsetParent();var b=this.offsetParent.offset();this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0])&&(b.left+=this.scrollParent.scrollLeft(),b.top+=this.scrollParent.scrollTop());if(this.offsetParent[0]==document.body||this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&a.browser.msie)b={top:0,left:0};return {top:b.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:b.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)};},_getRelativeOffset:function _getRelativeOffset(){if(this.cssPosition=="relative"){var a=this.element.position();return {top:a.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:a.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()};}return {top:0,left:0};},_cacheMargins:function _cacheMargins(){this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0,right:parseInt(this.element.css("marginRight"),10)||0,bottom:parseInt(this.element.css("marginBottom"),10)||0};},_cacheHelperProportions:function _cacheHelperProportions(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()};},_setContainment:function _setContainment(){var b=this.options;b.containment=="parent"&&(b.containment=this.helper[0].parentNode);if(b.containment=="document"||b.containment=="window")this.containment=[b.containment=="document"?0:a(window).scrollLeft()-this.offset.relative.left-this.offset.parent.left,b.containment=="document"?0:a(window).scrollTop()-this.offset.relative.top-this.offset.parent.top,(b.containment=="document"?0:a(window).scrollLeft())+a(b.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(b.containment=="document"?0:a(window).scrollTop())+(a(b.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top];if(!/^(document|window|parent)$/.test(b.containment)&&b.containment.constructor!=Array){var c=a(b.containment),d=c[0];if(!d)return;var e=c.offset(),f=a(d).css("overflow")!="hidden";this.containment=[(parseInt(a(d).css("borderLeftWidth"),10)||0)+(parseInt(a(d).css("paddingLeft"),10)||0),(parseInt(a(d).css("borderTopWidth"),10)||0)+(parseInt(a(d).css("paddingTop"),10)||0),(f?Math.max(d.scrollWidth,d.offsetWidth):d.offsetWidth)-(parseInt(a(d).css("borderLeftWidth"),10)||0)-(parseInt(a(d).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(f?Math.max(d.scrollHeight,d.offsetHeight):d.offsetHeight)-(parseInt(a(d).css("borderTopWidth"),10)||0)-(parseInt(a(d).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom],this.relative_container=c;}else b.containment.constructor==Array&&(this.containment=b.containment);},_convertPositionTo:function _convertPositionTo(b,c){c||(c=this.position);var d=b=="absolute"?1:-1,e=this.options,f=this.cssPosition=="absolute"&&(this.scrollParent[0]==document||!a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,g=/(html|body)/i.test(f[0].tagName);return {top:c.top+this.offset.relative.top*d+this.offset.parent.top*d-(a.browser.safari&&a.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():g?0:f.scrollTop())*d),left:c.left+this.offset.relative.left*d+this.offset.parent.left*d-(a.browser.safari&&a.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():g?0:f.scrollLeft())*d)};},_generatePosition:function _generatePosition(b){var c=this.options,d=this.cssPosition=="absolute"&&(this.scrollParent[0]==document||!a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,e=/(html|body)/i.test(d[0].tagName),f=b.pageX,g=b.pageY;if(this.originalPosition){var h;if(this.containment){if(this.relative_container){var i=this.relative_container.offset();h=[this.containment[0]+i.left,this.containment[1]+i.top,this.containment[2]+i.left,this.containment[3]+i.top];}else h=this.containment;b.pageX-this.offset.click.left<h[0]&&(f=h[0]+this.offset.click.left),b.pageY-this.offset.click.top<h[1]&&(g=h[1]+this.offset.click.top),b.pageX-this.offset.click.left>h[2]&&(f=h[2]+this.offset.click.left),b.pageY-this.offset.click.top>h[3]&&(g=h[3]+this.offset.click.top);}if(c.grid){var j=c.grid[1]?this.originalPageY+Math.round((g-this.originalPageY)/c.grid[1])*c.grid[1]:this.originalPageY;g=h?j-this.offset.click.top<h[1]||j-this.offset.click.top>h[3]?j-this.offset.click.top<h[1]?j+c.grid[1]:j-c.grid[1]:j:j;var k=c.grid[0]?this.originalPageX+Math.round((f-this.originalPageX)/c.grid[0])*c.grid[0]:this.originalPageX;f=h?k-this.offset.click.left<h[0]||k-this.offset.click.left>h[2]?k-this.offset.click.left<h[0]?k+c.grid[0]:k-c.grid[0]:k:k;}}return {top:g-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(a.browser.safari&&a.browser.version<526&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollTop():e?0:d.scrollTop()),left:f-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(a.browser.safari&&a.browser.version<526&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():e?0:d.scrollLeft())};},_clear:function _clear(){this.helper.removeClass("ui-draggable-dragging"),this.helper[0]!=this.element[0]&&!this.cancelHelperRemoval&&this.helper.remove(),this.helper=null,this.cancelHelperRemoval=!1;},_trigger:function _trigger(b,c,d){return d=d||this._uiHash(),a.ui.plugin.call(this,b,[c,d]),b=="drag"&&(this.positionAbs=this._convertPositionTo("absolute")),a.Widget.prototype._trigger.call(this,b,c,d);},plugins:{},_uiHash:function _uiHash(a){return {helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs};}}),a.extend(a.ui.draggable,{version:"1.8.23"}),a.ui.plugin.add("draggable","connectToSortable",{start:function start(b,c){var d=a(this).data("draggable"),e=d.options,f=a.extend({},c,{item:d.element});d.sortables=[],a(e.connectToSortable).each(function(){var c=a.data(this,"sortable");c&&!c.options.disabled&&(d.sortables.push({instance:c,shouldRevert:c.options.revert}),c.refreshPositions(),c._trigger("activate",b,f));});},stop:function stop(b,c){var d=a(this).data("draggable"),e=a.extend({},c,{item:d.element});a.each(d.sortables,function(){this.instance.isOver?(this.instance.isOver=0,d.cancelHelperRemoval=!0,this.instance.cancelHelperRemoval=!1,this.shouldRevert&&(this.instance.options.revert=!0),this.instance._mouseStop(b),this.instance.options.helper=this.instance.options._helper,d.options.helper=="original"&&this.instance.currentItem.css({top:"auto",left:"auto"})):(this.instance.cancelHelperRemoval=!1,this.instance._trigger("deactivate",b,e));});},drag:function drag(b,c){var d=a(this).data("draggable"),e=this,f=function f(b){var c=this.offset.click.top,d=this.offset.click.left,e=this.positionAbs.top,f=this.positionAbs.left,g=b.height,h=b.width,i=b.top,j=b.left;return a.ui.isOver(e+c,f+d,i,j,g,h);};a.each(d.sortables,function(f){this.instance.positionAbs=d.positionAbs,this.instance.helperProportions=d.helperProportions,this.instance.offset.click=d.offset.click,this.instance._intersectsWith(this.instance.containerCache)?(this.instance.isOver||(this.instance.isOver=1,this.instance.currentItem=a(e).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item",!0),this.instance.options._helper=this.instance.options.helper,this.instance.options.helper=function(){return c.helper[0];},b.target=this.instance.currentItem[0],this.instance._mouseCapture(b,!0),this.instance._mouseStart(b,!0,!0),this.instance.offset.click.top=d.offset.click.top,this.instance.offset.click.left=d.offset.click.left,this.instance.offset.parent.left-=d.offset.parent.left-this.instance.offset.parent.left,this.instance.offset.parent.top-=d.offset.parent.top-this.instance.offset.parent.top,d._trigger("toSortable",b),d.dropped=this.instance.element,d.currentItem=d.element,this.instance.fromOutside=d),this.instance.currentItem&&this.instance._mouseDrag(b)):this.instance.isOver&&(this.instance.isOver=0,this.instance.cancelHelperRemoval=!0,this.instance.options.revert=!1,this.instance._trigger("out",b,this.instance._uiHash(this.instance)),this.instance._mouseStop(b,!0),this.instance.options.helper=this.instance.options._helper,this.instance.currentItem.remove(),this.instance.placeholder&&this.instance.placeholder.remove(),d._trigger("fromSortable",b),d.dropped=!1);});}}),a.ui.plugin.add("draggable","cursor",{start:function start(b,c){var d=a("body"),e=a(this).data("draggable").options;d.css("cursor")&&(e._cursor=d.css("cursor")),d.css("cursor",e.cursor);},stop:function stop(b,c){var d=a(this).data("draggable").options;d._cursor&&a("body").css("cursor",d._cursor);}}),a.ui.plugin.add("draggable","opacity",{start:function start(b,c){var d=a(c.helper),e=a(this).data("draggable").options;d.css("opacity")&&(e._opacity=d.css("opacity")),d.css("opacity",e.opacity);},stop:function stop(b,c){var d=a(this).data("draggable").options;d._opacity&&a(c.helper).css("opacity",d._opacity);}}),a.ui.plugin.add("draggable","scroll",{start:function start(b,c){var d=a(this).data("draggable");d.scrollParent[0]!=document&&d.scrollParent[0].tagName!="HTML"&&(d.overflowOffset=d.scrollParent.offset());},drag:function drag(b,c){var d=a(this).data("draggable"),e=d.options,f=!1;if(d.scrollParent[0]!=document&&d.scrollParent[0].tagName!="HTML"){if(!e.axis||e.axis!="x")d.overflowOffset.top+d.scrollParent[0].offsetHeight-b.pageY<e.scrollSensitivity?d.scrollParent[0].scrollTop=f=d.scrollParent[0].scrollTop+e.scrollSpeed:b.pageY-d.overflowOffset.top<e.scrollSensitivity&&(d.scrollParent[0].scrollTop=f=d.scrollParent[0].scrollTop-e.scrollSpeed);if(!e.axis||e.axis!="y")d.overflowOffset.left+d.scrollParent[0].offsetWidth-b.pageX<e.scrollSensitivity?d.scrollParent[0].scrollLeft=f=d.scrollParent[0].scrollLeft+e.scrollSpeed:b.pageX-d.overflowOffset.left<e.scrollSensitivity&&(d.scrollParent[0].scrollLeft=f=d.scrollParent[0].scrollLeft-e.scrollSpeed);}else {if(!e.axis||e.axis!="x")b.pageY-a(document).scrollTop()<e.scrollSensitivity?f=a(document).scrollTop(a(document).scrollTop()-e.scrollSpeed):a(window).height()-(b.pageY-a(document).scrollTop())<e.scrollSensitivity&&(f=a(document).scrollTop(a(document).scrollTop()+e.scrollSpeed));if(!e.axis||e.axis!="y")b.pageX-a(document).scrollLeft()<e.scrollSensitivity?f=a(document).scrollLeft(a(document).scrollLeft()-e.scrollSpeed):a(window).width()-(b.pageX-a(document).scrollLeft())<e.scrollSensitivity&&(f=a(document).scrollLeft(a(document).scrollLeft()+e.scrollSpeed));}f!==!1&&a.ui.ddmanager&&!e.dropBehaviour&&a.ui.ddmanager.prepareOffsets(d,b);}}),a.ui.plugin.add("draggable","snap",{start:function start(b,c){var d=a(this).data("draggable"),e=d.options;d.snapElements=[],a(e.snap.constructor!=String?e.snap.items||":data(draggable)":e.snap).each(function(){var b=a(this),c=b.offset();this!=d.element[0]&&d.snapElements.push({item:this,width:b.outerWidth(),height:b.outerHeight(),top:c.top,left:c.left});});},drag:function drag(b,c){var d=a(this).data("draggable"),e=d.options,f=e.snapTolerance,g=c.offset.left,h=g+d.helperProportions.width,i=c.offset.top,j=i+d.helperProportions.height;for(var k=d.snapElements.length-1;k>=0;k--){var l=d.snapElements[k].left,m=l+d.snapElements[k].width,n=d.snapElements[k].top,o=n+d.snapElements[k].height;if(!(l-f<g&&g<m+f&&n-f<i&&i<o+f||l-f<g&&g<m+f&&n-f<j&&j<o+f||l-f<h&&h<m+f&&n-f<i&&i<o+f||l-f<h&&h<m+f&&n-f<j&&j<o+f)){d.snapElements[k].snapping&&d.options.snap.release&&d.options.snap.release.call(d.element,b,a.extend(d._uiHash(),{snapItem:d.snapElements[k].item})),d.snapElements[k].snapping=!1;continue;}if(e.snapMode!="inner"){var p=Math.abs(n-j)<=f,q=Math.abs(o-i)<=f,r=Math.abs(l-h)<=f,s=Math.abs(m-g)<=f;p&&(c.position.top=d._convertPositionTo("relative",{top:n-d.helperProportions.height,left:0}).top-d.margins.top),q&&(c.position.top=d._convertPositionTo("relative",{top:o,left:0}).top-d.margins.top),r&&(c.position.left=d._convertPositionTo("relative",{top:0,left:l-d.helperProportions.width}).left-d.margins.left),s&&(c.position.left=d._convertPositionTo("relative",{top:0,left:m}).left-d.margins.left);}var t=p||q||r||s;if(e.snapMode!="outer"){var p=Math.abs(n-i)<=f,q=Math.abs(o-j)<=f,r=Math.abs(l-g)<=f,s=Math.abs(m-h)<=f;p&&(c.position.top=d._convertPositionTo("relative",{top:n,left:0}).top-d.margins.top),q&&(c.position.top=d._convertPositionTo("relative",{top:o-d.helperProportions.height,left:0}).top-d.margins.top),r&&(c.position.left=d._convertPositionTo("relative",{top:0,left:l}).left-d.margins.left),s&&(c.position.left=d._convertPositionTo("relative",{top:0,left:m-d.helperProportions.width}).left-d.margins.left);}!d.snapElements[k].snapping&&(p||q||r||s||t)&&d.options.snap.snap&&d.options.snap.snap.call(d.element,b,a.extend(d._uiHash(),{snapItem:d.snapElements[k].item})),d.snapElements[k].snapping=p||q||r||s||t;}}}),a.ui.plugin.add("draggable","stack",{start:function start(b,c){var d=a(this).data("draggable").options,e=a.makeArray(a(d.stack)).sort(function(b,c){return (parseInt(a(b).css("zIndex"),10)||0)-(parseInt(a(c).css("zIndex"),10)||0);});if(!e.length)return;var f=parseInt(e[0].style.zIndex)||0;a(e).each(function(a){this.style.zIndex=f+a;}),this[0].style.zIndex=f+e.length;}}),a.ui.plugin.add("draggable","zIndex",{start:function start(b,c){var d=a(c.helper),e=a(this).data("draggable").options;d.css("zIndex")&&(e._zIndex=d.css("zIndex")),d.css("zIndex",e.zIndex);},stop:function stop(b,c){var d=a(this).data("draggable").options;d._zIndex&&a(c.helper).css("zIndex",d._zIndex);}});})(jQuery);; /*! jQuery UI - v1.8.23 - 2012-08-15
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.droppable.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */(function(a,b){a.widget("ui.droppable",{widgetEventPrefix:"drop",options:{accept:"*",activeClass:!1,addClasses:!0,greedy:!1,hoverClass:!1,scope:"default",tolerance:"intersect"},_create:function _create(){var b=this.options,c=b.accept;this.isover=0,this.isout=1,this.accept=a.isFunction(c)?c:function(a){return a.is(c);},this.proportions={width:this.element[0].offsetWidth,height:this.element[0].offsetHeight},a.ui.ddmanager.droppables[b.scope]=a.ui.ddmanager.droppables[b.scope]||[],a.ui.ddmanager.droppables[b.scope].push(this),b.addClasses&&this.element.addClass("ui-droppable");},destroy:function destroy(){var b=a.ui.ddmanager.droppables[this.options.scope];for(var c=0;c<b.length;c++){b[c]==this&&b.splice(c,1);}return this.element.removeClass("ui-droppable ui-droppable-disabled").removeData("droppable").unbind(".droppable"),this;},_setOption:function _setOption(b,c){b=="accept"&&(this.accept=a.isFunction(c)?c:function(a){return a.is(c);}),a.Widget.prototype._setOption.apply(this,arguments);},_activate:function _activate(b){var c=a.ui.ddmanager.current;this.options.activeClass&&this.element.addClass(this.options.activeClass),c&&this._trigger("activate",b,this.ui(c));},_deactivate:function _deactivate(b){var c=a.ui.ddmanager.current;this.options.activeClass&&this.element.removeClass(this.options.activeClass),c&&this._trigger("deactivate",b,this.ui(c));},_over:function _over(b){var c=a.ui.ddmanager.current;if(!c||(c.currentItem||c.element)[0]==this.element[0])return;this.accept.call(this.element[0],c.currentItem||c.element)&&(this.options.hoverClass&&this.element.addClass(this.options.hoverClass),this._trigger("over",b,this.ui(c)));},_out:function _out(b){var c=a.ui.ddmanager.current;if(!c||(c.currentItem||c.element)[0]==this.element[0])return;this.accept.call(this.element[0],c.currentItem||c.element)&&(this.options.hoverClass&&this.element.removeClass(this.options.hoverClass),this._trigger("out",b,this.ui(c)));},_drop:function _drop(b,c){var d=c||a.ui.ddmanager.current;if(!d||(d.currentItem||d.element)[0]==this.element[0])return !1;var e=!1;return this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function(){var b=a.data(this,"droppable");if(b.options.greedy&&!b.options.disabled&&b.options.scope==d.options.scope&&b.accept.call(b.element[0],d.currentItem||d.element)&&a.ui.intersect(d,a.extend(b,{offset:b.element.offset()}),b.options.tolerance))return e=!0,!1;}),e?!1:this.accept.call(this.element[0],d.currentItem||d.element)?(this.options.activeClass&&this.element.removeClass(this.options.activeClass),this.options.hoverClass&&this.element.removeClass(this.options.hoverClass),this._trigger("drop",b,this.ui(d)),this.element):!1;},ui:function ui(a){return {draggable:a.currentItem||a.element,helper:a.helper,position:a.position,offset:a.positionAbs};}}),a.extend(a.ui.droppable,{version:"1.8.23"}),a.ui.intersect=function(b,c,d){if(!c.offset)return !1;var e=(b.positionAbs||b.position.absolute).left,f=e+b.helperProportions.width,g=(b.positionAbs||b.position.absolute).top,h=g+b.helperProportions.height,i=c.offset.left,j=i+c.proportions.width,k=c.offset.top,l=k+c.proportions.height;switch(d){case "fit":return i<=e&&f<=j&&k<=g&&h<=l;case "intersect":return i<e+b.helperProportions.width/2&&f-b.helperProportions.width/2<j&&k<g+b.helperProportions.height/2&&h-b.helperProportions.height/2<l;case "pointer":var m=(b.positionAbs||b.position.absolute).left+(b.clickOffset||b.offset.click).left,n=(b.positionAbs||b.position.absolute).top+(b.clickOffset||b.offset.click).top,o=a.ui.isOver(n,m,k,i,c.proportions.height,c.proportions.width);return o;case "touch":return (g>=k&&g<=l||h>=k&&h<=l||g<k&&h>l)&&(e>=i&&e<=j||f>=i&&f<=j||e<i&&f>j);default:return !1;}},a.ui.ddmanager={current:null,droppables:{"default":[]},prepareOffsets:function prepareOffsets(b,c){var d=a.ui.ddmanager.droppables[b.options.scope]||[],e=c?c.type:null,f=(b.currentItem||b.element).find(":data(droppable)").andSelf();g: for(var h=0;h<d.length;h++){if(d[h].options.disabled||b&&!d[h].accept.call(d[h].element[0],b.currentItem||b.element))continue;for(var i=0;i<f.length;i++){if(f[i]==d[h].element[0]){d[h].proportions.height=0;continue g;}}d[h].visible=d[h].element.css("display")!="none";if(!d[h].visible)continue;e=="mousedown"&&d[h]._activate.call(d[h],c),d[h].offset=d[h].element.offset(),d[h].proportions={width:d[h].element[0].offsetWidth,height:d[h].element[0].offsetHeight};}},drop:function drop(b,c){var d=!1;return a.each(a.ui.ddmanager.droppables[b.options.scope]||[],function(){if(!this.options)return;!this.options.disabled&&this.visible&&a.ui.intersect(b,this,this.options.tolerance)&&(d=this._drop.call(this,c)||d),!this.options.disabled&&this.visible&&this.accept.call(this.element[0],b.currentItem||b.element)&&(this.isout=1,this.isover=0,this._deactivate.call(this,c));}),d;},dragStart:function dragStart(b,c){b.element.parents(":not(body,html)").bind("scroll.droppable",function(){b.options.refreshPositions||a.ui.ddmanager.prepareOffsets(b,c);});},drag:function drag(b,c){b.options.refreshPositions&&a.ui.ddmanager.prepareOffsets(b,c),a.each(a.ui.ddmanager.droppables[b.options.scope]||[],function(){if(this.options.disabled||this.greedyChild||!this.visible)return;var d=a.ui.intersect(b,this,this.options.tolerance),e=!d&&this.isover==1?"isout":d&&this.isover==0?"isover":null;if(!e)return;var f;if(this.options.greedy){var g=this.element.parents(":data(droppable):eq(0)");g.length&&(f=a.data(g[0],"droppable"),f.greedyChild=e=="isover"?1:0);}f&&e=="isover"&&(f.isover=0,f.isout=1,f._out.call(f,c)),this[e]=1,this[e=="isout"?"isover":"isout"]=0,this[e=="isover"?"_over":"_out"].call(this,c),f&&e=="isout"&&(f.isout=0,f.isover=1,f._over.call(f,c));});},dragStop:function dragStop(b,c){b.element.parents(":not(body,html)").unbind("scroll.droppable"),b.options.refreshPositions||a.ui.ddmanager.prepareOffsets(b,c);}};})(jQuery);; /*! jQuery UI - v1.8.23 - 2012-08-15
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.resizable.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */(function(a,b){a.widget("ui.resizable",a.ui.mouse,{widgetEventPrefix:"resize",options:{alsoResize:!1,animate:!1,animateDuration:"slow",animateEasing:"swing",aspectRatio:!1,autoHide:!1,containment:!1,ghost:!1,grid:!1,handles:"e,s,se",helper:!1,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:1e3},_create:function _create(){var b=this,c=this.options;this.element.addClass("ui-resizable"),a.extend(this,{_aspectRatio:!!c.aspectRatio,aspectRatio:c.aspectRatio,originalElement:this.element,_proportionallyResizeElements:[],_helper:c.helper||c.ghost||c.animate?c.helper||"ui-resizable-helper":null}),this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)&&(this.element.wrap(a('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),top:this.element.css("top"),left:this.element.css("left")})),this.element=this.element.parent().data("resizable",this.element.data("resizable")),this.elementIsWrapper=!0,this.element.css({marginLeft:this.originalElement.css("marginLeft"),marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom")}),this.originalElement.css({marginLeft:0,marginTop:0,marginRight:0,marginBottom:0}),this.originalResizeStyle=this.originalElement.css("resize"),this.originalElement.css("resize","none"),this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"})),this.originalElement.css({margin:this.originalElement.css("margin")}),this._proportionallyResize()),this.handles=c.handles||(a(".ui-resizable-handle",this.element).length?{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",nw:".ui-resizable-nw"}:"e,s,se");if(this.handles.constructor==String){this.handles=="all"&&(this.handles="n,e,s,w,se,sw,ne,nw");var d=this.handles.split(",");this.handles={};for(var e=0;e<d.length;e++){var f=a.trim(d[e]),g="ui-resizable-"+f,h=a('<div class="ui-resizable-handle '+g+'"></div>');h.css({zIndex:c.zIndex}),"se"==f&&h.addClass("ui-icon ui-icon-gripsmall-diagonal-se"),this.handles[f]=".ui-resizable-"+f,this.element.append(h);}}this._renderAxis=function(b){b=b||this.element;for(var c in this.handles){this.handles[c].constructor==String&&(this.handles[c]=a(this.handles[c],this.element).show());if(this.elementIsWrapper&&this.originalElement[0].nodeName.match(/textarea|input|select|button/i)){var d=a(this.handles[c],this.element),e=0;e=/sw|ne|nw|se|n|s/.test(c)?d.outerHeight():d.outerWidth();var f=["padding",/ne|nw|n/.test(c)?"Top":/se|sw|s/.test(c)?"Bottom":/^e$/.test(c)?"Right":"Left"].join("");b.css(f,e),this._proportionallyResize();}if(!a(this.handles[c]).length)continue;}},this._renderAxis(this.element),this._handles=a(".ui-resizable-handle",this.element).disableSelection(),this._handles.mouseover(function(){if(!b.resizing){if(this.className)var a=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);b.axis=a&&a[1]?a[1]:"se";}}),c.autoHide&&(this._handles.hide(),a(this.element).addClass("ui-resizable-autohide").hover(function(){if(c.disabled)return;a(this).removeClass("ui-resizable-autohide"),b._handles.show();},function(){if(c.disabled)return;b.resizing||(a(this).addClass("ui-resizable-autohide"),b._handles.hide());})),this._mouseInit();},destroy:function destroy(){this._mouseDestroy();var b=function b(_b){a(_b).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove();};if(this.elementIsWrapper){b(this.element);var c=this.element;c.after(this.originalElement.css({position:c.css("position"),width:c.outerWidth(),height:c.outerHeight(),top:c.css("top"),left:c.css("left")})).remove();}return this.originalElement.css("resize",this.originalResizeStyle),b(this.originalElement),this;},_mouseCapture:function _mouseCapture(b){var c=!1;for(var d in this.handles){a(this.handles[d])[0]==b.target&&(c=!0);}return !this.options.disabled&&c;},_mouseStart:function _mouseStart(b){var d=this.options,e=this.element.position(),f=this.element;this.resizing=!0,this.documentScroll={top:a(document).scrollTop(),left:a(document).scrollLeft()},(f.is(".ui-draggable")||/absolute/.test(f.css("position")))&&f.css({position:"absolute",top:e.top,left:e.left}),this._renderProxy();var g=c(this.helper.css("left")),h=c(this.helper.css("top"));d.containment&&(g+=a(d.containment).scrollLeft()||0,h+=a(d.containment).scrollTop()||0),this.offset=this.helper.offset(),this.position={left:g,top:h},this.size=this._helper?{width:f.outerWidth(),height:f.outerHeight()}:{width:f.width(),height:f.height()},this.originalSize=this._helper?{width:f.outerWidth(),height:f.outerHeight()}:{width:f.width(),height:f.height()},this.originalPosition={left:g,top:h},this.sizeDiff={width:f.outerWidth()-f.width(),height:f.outerHeight()-f.height()},this.originalMousePosition={left:b.pageX,top:b.pageY},this.aspectRatio=typeof d.aspectRatio=="number"?d.aspectRatio:this.originalSize.width/this.originalSize.height||1;var i=a(".ui-resizable-"+this.axis).css("cursor");return a("body").css("cursor",i=="auto"?this.axis+"-resize":i),f.addClass("ui-resizable-resizing"),this._propagate("start",b),!0;},_mouseDrag:function _mouseDrag(b){var c=this.helper,d=this.options,e={},f=this,g=this.originalMousePosition,h=this.axis,i=b.pageX-g.left||0,j=b.pageY-g.top||0,k=this._change[h];if(!k)return !1;var l=k.apply(this,[b,i,j]),m=a.browser.msie&&a.browser.version<7,n=this.sizeDiff;this._updateVirtualBoundaries(b.shiftKey);if(this._aspectRatio||b.shiftKey)l=this._updateRatio(l,b);return l=this._respectSize(l,b),this._propagate("resize",b),c.css({top:this.position.top+"px",left:this.position.left+"px",width:this.size.width+"px",height:this.size.height+"px"}),!this._helper&&this._proportionallyResizeElements.length&&this._proportionallyResize(),this._updateCache(l),this._trigger("resize",b,this.ui()),!1;},_mouseStop:function _mouseStop(b){this.resizing=!1;var c=this.options,d=this;if(this._helper){var e=this._proportionallyResizeElements,f=e.length&&/textarea/i.test(e[0].nodeName),g=f&&a.ui.hasScroll(e[0],"left")?0:d.sizeDiff.height,h=f?0:d.sizeDiff.width,i={width:d.helper.width()-h,height:d.helper.height()-g},j=parseInt(d.element.css("left"),10)+(d.position.left-d.originalPosition.left)||null,k=parseInt(d.element.css("top"),10)+(d.position.top-d.originalPosition.top)||null;c.animate||this.element.css(a.extend(i,{top:k,left:j})),d.helper.height(d.size.height),d.helper.width(d.size.width),this._helper&&!c.animate&&this._proportionallyResize();}return a("body").css("cursor","auto"),this.element.removeClass("ui-resizable-resizing"),this._propagate("stop",b),this._helper&&this.helper.remove(),!1;},_updateVirtualBoundaries:function _updateVirtualBoundaries(a){var b=this.options,c,e,f,g,h;h={minWidth:d(b.minWidth)?b.minWidth:0,maxWidth:d(b.maxWidth)?b.maxWidth:Infinity,minHeight:d(b.minHeight)?b.minHeight:0,maxHeight:d(b.maxHeight)?b.maxHeight:Infinity};if(this._aspectRatio||a)c=h.minHeight*this.aspectRatio,f=h.minWidth/this.aspectRatio,e=h.maxHeight*this.aspectRatio,g=h.maxWidth/this.aspectRatio,c>h.minWidth&&(h.minWidth=c),f>h.minHeight&&(h.minHeight=f),e<h.maxWidth&&(h.maxWidth=e),g<h.maxHeight&&(h.maxHeight=g);this._vBoundaries=h;},_updateCache:function _updateCache(a){var b=this.options;this.offset=this.helper.offset(),d(a.left)&&(this.position.left=a.left),d(a.top)&&(this.position.top=a.top),d(a.height)&&(this.size.height=a.height),d(a.width)&&(this.size.width=a.width);},_updateRatio:function _updateRatio(a,b){var c=this.options,e=this.position,f=this.size,g=this.axis;return d(a.height)?a.width=a.height*this.aspectRatio:d(a.width)&&(a.height=a.width/this.aspectRatio),g=="sw"&&(a.left=e.left+(f.width-a.width),a.top=null),g=="nw"&&(a.top=e.top+(f.height-a.height),a.left=e.left+(f.width-a.width)),a;},_respectSize:function _respectSize(a,b){var c=this.helper,e=this._vBoundaries,f=this._aspectRatio||b.shiftKey,g=this.axis,h=d(a.width)&&e.maxWidth&&e.maxWidth<a.width,i=d(a.height)&&e.maxHeight&&e.maxHeight<a.height,j=d(a.width)&&e.minWidth&&e.minWidth>a.width,k=d(a.height)&&e.minHeight&&e.minHeight>a.height;j&&(a.width=e.minWidth),k&&(a.height=e.minHeight),h&&(a.width=e.maxWidth),i&&(a.height=e.maxHeight);var l=this.originalPosition.left+this.originalSize.width,m=this.position.top+this.size.height,n=/sw|nw|w/.test(g),o=/nw|ne|n/.test(g);j&&n&&(a.left=l-e.minWidth),h&&n&&(a.left=l-e.maxWidth),k&&o&&(a.top=m-e.minHeight),i&&o&&(a.top=m-e.maxHeight);var p=!a.width&&!a.height;return p&&!a.left&&a.top?a.top=null:p&&!a.top&&a.left&&(a.left=null),a;},_proportionallyResize:function _proportionallyResize(){var b=this.options;if(!this._proportionallyResizeElements.length)return;var c=this.helper||this.element;for(var d=0;d<this._proportionallyResizeElements.length;d++){var e=this._proportionallyResizeElements[d];if(!this.borderDif){var f=[e.css("borderTopWidth"),e.css("borderRightWidth"),e.css("borderBottomWidth"),e.css("borderLeftWidth")],g=[e.css("paddingTop"),e.css("paddingRight"),e.css("paddingBottom"),e.css("paddingLeft")];this.borderDif=a.map(f,function(a,b){var c=parseInt(a,10)||0,d=parseInt(g[b],10)||0;return c+d;});}if(!a.browser.msie||!a(c).is(":hidden")&&!a(c).parents(":hidden").length)e.css({height:c.height()-this.borderDif[0]-this.borderDif[2]||0,width:c.width()-this.borderDif[1]-this.borderDif[3]||0});else continue;}},_renderProxy:function _renderProxy(){var b=this.element,c=this.options;this.elementOffset=b.offset();if(this._helper){this.helper=this.helper||a('<div style="overflow:hidden;"></div>');var d=a.browser.msie&&a.browser.version<7,e=d?1:0,f=d?2:-1;this.helper.addClass(this._helper).css({width:this.element.outerWidth()+f,height:this.element.outerHeight()+f,position:"absolute",left:this.elementOffset.left-e+"px",top:this.elementOffset.top-e+"px",zIndex:++c.zIndex}),this.helper.appendTo("body").disableSelection();}else this.helper=this.element;},_change:{e:function e(a,b,c){return {width:this.originalSize.width+b};},w:function w(a,b,c){var d=this.options,e=this.originalSize,f=this.originalPosition;return {left:f.left+b,width:e.width-b};},n:function n(a,b,c){var d=this.options,e=this.originalSize,f=this.originalPosition;return {top:f.top+c,height:e.height-c};},s:function s(a,b,c){return {height:this.originalSize.height+c};},se:function se(b,c,d){return a.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[b,c,d]));},sw:function sw(b,c,d){return a.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[b,c,d]));},ne:function ne(b,c,d){return a.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[b,c,d]));},nw:function nw(b,c,d){return a.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[b,c,d]));}},_propagate:function _propagate(b,c){a.ui.plugin.call(this,b,[c,this.ui()]),b!="resize"&&this._trigger(b,c,this.ui());},plugins:{},ui:function ui(){return {originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition};}}),a.extend(a.ui.resizable,{version:"1.8.23"}),a.ui.plugin.add("resizable","alsoResize",{start:function start(b,c){var d=a(this).data("resizable"),e=d.options,f=function f(b){a(b).each(function(){var b=a(this);b.data("resizable-alsoresize",{width:parseInt(b.width(),10),height:parseInt(b.height(),10),left:parseInt(b.css("left"),10),top:parseInt(b.css("top"),10)});});};_typeof(e.alsoResize)=="object"&&!e.alsoResize.parentNode?e.alsoResize.length?(e.alsoResize=e.alsoResize[0],f(e.alsoResize)):a.each(e.alsoResize,function(a){f(a);}):f(e.alsoResize);},resize:function resize(b,c){var d=a(this).data("resizable"),e=d.options,f=d.originalSize,g=d.originalPosition,h={height:d.size.height-f.height||0,width:d.size.width-f.width||0,top:d.position.top-g.top||0,left:d.position.left-g.left||0},i=function i(b,d){a(b).each(function(){var b=a(this),e=a(this).data("resizable-alsoresize"),f={},g=d&&d.length?d:b.parents(c.originalElement[0]).length?["width","height"]:["width","height","top","left"];a.each(g,function(a,b){var c=(e[b]||0)+(h[b]||0);c&&c>=0&&(f[b]=c||null);}),b.css(f);});};_typeof(e.alsoResize)=="object"&&!e.alsoResize.nodeType?a.each(e.alsoResize,function(a,b){i(a,b);}):i(e.alsoResize);},stop:function stop(b,c){a(this).removeData("resizable-alsoresize");}}),a.ui.plugin.add("resizable","animate",{stop:function stop(b,c){var d=a(this).data("resizable"),e=d.options,f=d._proportionallyResizeElements,g=f.length&&/textarea/i.test(f[0].nodeName),h=g&&a.ui.hasScroll(f[0],"left")?0:d.sizeDiff.height,i=g?0:d.sizeDiff.width,j={width:d.size.width-i,height:d.size.height-h},k=parseInt(d.element.css("left"),10)+(d.position.left-d.originalPosition.left)||null,l=parseInt(d.element.css("top"),10)+(d.position.top-d.originalPosition.top)||null;d.element.animate(a.extend(j,l&&k?{top:l,left:k}:{}),{duration:e.animateDuration,easing:e.animateEasing,step:function step(){var c={width:parseInt(d.element.css("width"),10),height:parseInt(d.element.css("height"),10),top:parseInt(d.element.css("top"),10),left:parseInt(d.element.css("left"),10)};f&&f.length&&a(f[0]).css({width:c.width,height:c.height}),d._updateCache(c),d._propagate("resize",b);}});}}),a.ui.plugin.add("resizable","containment",{start:function start(b,d){var e=a(this).data("resizable"),f=e.options,g=e.element,h=f.containment,i=h instanceof a?h.get(0):/parent/.test(h)?g.parent().get(0):h;if(!i)return;e.containerElement=a(i);if(/document/.test(h)||h==document)e.containerOffset={left:0,top:0},e.containerPosition={left:0,top:0},e.parentData={element:a(document),left:0,top:0,width:a(document).width(),height:a(document).height()||document.body.parentNode.scrollHeight};else {var j=a(i),k=[];a(["Top","Right","Left","Bottom"]).each(function(a,b){k[a]=c(j.css("padding"+b));}),e.containerOffset=j.offset(),e.containerPosition=j.position(),e.containerSize={height:j.innerHeight()-k[3],width:j.innerWidth()-k[1]};var l=e.containerOffset,m=e.containerSize.height,n=e.containerSize.width,o=a.ui.hasScroll(i,"left")?i.scrollWidth:n,p=a.ui.hasScroll(i)?i.scrollHeight:m;e.parentData={element:i,left:l.left,top:l.top,width:o,height:p};}},resize:function resize(b,c){var d=a(this).data("resizable"),e=d.options,f=d.containerSize,g=d.containerOffset,h=d.size,i=d.position,j=d._aspectRatio||b.shiftKey,k={top:0,left:0},l=d.containerElement;l[0]!=document&&/static/.test(l.css("position"))&&(k=g),i.left<(d._helper?g.left:0)&&(d.size.width=d.size.width+(d._helper?d.position.left-g.left:d.position.left-k.left),j&&(d.size.height=d.size.width/d.aspectRatio),d.position.left=e.helper?g.left:0),i.top<(d._helper?g.top:0)&&(d.size.height=d.size.height+(d._helper?d.position.top-g.top:d.position.top),j&&(d.size.width=d.size.height*d.aspectRatio),d.position.top=d._helper?g.top:0),d.offset.left=d.parentData.left+d.position.left,d.offset.top=d.parentData.top+d.position.top;var m=Math.abs((d._helper?d.offset.left-k.left:d.offset.left-k.left)+d.sizeDiff.width),n=Math.abs((d._helper?d.offset.top-k.top:d.offset.top-g.top)+d.sizeDiff.height),o=d.containerElement.get(0)==d.element.parent().get(0),p=/relative|absolute/.test(d.containerElement.css("position"));o&&p&&(m-=d.parentData.left),m+d.size.width>=d.parentData.width&&(d.size.width=d.parentData.width-m,j&&(d.size.height=d.size.width/d.aspectRatio)),n+d.size.height>=d.parentData.height&&(d.size.height=d.parentData.height-n,j&&(d.size.width=d.size.height*d.aspectRatio));},stop:function stop(b,c){var d=a(this).data("resizable"),e=d.options,f=d.position,g=d.containerOffset,h=d.containerPosition,i=d.containerElement,j=a(d.helper),k=j.offset(),l=j.outerWidth()-d.sizeDiff.width,m=j.outerHeight()-d.sizeDiff.height;d._helper&&!e.animate&&/relative/.test(i.css("position"))&&a(this).css({left:k.left-h.left-g.left,width:l,height:m}),d._helper&&!e.animate&&/static/.test(i.css("position"))&&a(this).css({left:k.left-h.left-g.left,width:l,height:m});}}),a.ui.plugin.add("resizable","ghost",{start:function start(b,c){var d=a(this).data("resizable"),e=d.options,f=d.size;d.ghost=d.originalElement.clone(),d.ghost.css({opacity:.25,display:"block",position:"relative",height:f.height,width:f.width,margin:0,left:0,top:0}).addClass("ui-resizable-ghost").addClass(typeof e.ghost=="string"?e.ghost:""),d.ghost.appendTo(d.helper);},resize:function resize(b,c){var d=a(this).data("resizable"),e=d.options;d.ghost&&d.ghost.css({position:"relative",height:d.size.height,width:d.size.width});},stop:function stop(b,c){var d=a(this).data("resizable"),e=d.options;d.ghost&&d.helper&&d.helper.get(0).removeChild(d.ghost.get(0));}}),a.ui.plugin.add("resizable","grid",{resize:function resize(b,c){var d=a(this).data("resizable"),e=d.options,f=d.size,g=d.originalSize,h=d.originalPosition,i=d.axis,j=e._aspectRatio||b.shiftKey;e.grid=typeof e.grid=="number"?[e.grid,e.grid]:e.grid;var k=Math.round((f.width-g.width)/(e.grid[0]||1))*(e.grid[0]||1),l=Math.round((f.height-g.height)/(e.grid[1]||1))*(e.grid[1]||1);/^(se|s|e)$/.test(i)?(d.size.width=g.width+k,d.size.height=g.height+l):/^(ne)$/.test(i)?(d.size.width=g.width+k,d.size.height=g.height+l,d.position.top=h.top-l):/^(sw)$/.test(i)?(d.size.width=g.width+k,d.size.height=g.height+l,d.position.left=h.left-k):(d.size.width=g.width+k,d.size.height=g.height+l,d.position.top=h.top-l,d.position.left=h.left-k);}});var c=function c(a){return parseInt(a,10)||0;},d=function d(a){return !isNaN(parseInt(a,10));};})(jQuery);; /*! jQuery UI - v1.8.23 - 2012-08-15
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.selectable.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */(function(a,b){a.widget("ui.selectable",a.ui.mouse,{options:{appendTo:"body",autoRefresh:!0,distance:0,filter:"*",tolerance:"touch"},_create:function _create(){var b=this;this.element.addClass("ui-selectable"),this.dragged=!1;var c;this.refresh=function(){c=a(b.options.filter,b.element[0]),c.addClass("ui-selectee"),c.each(function(){var b=a(this),c=b.offset();a.data(this,"selectable-item",{element:this,$element:b,left:c.left,top:c.top,right:c.left+b.outerWidth(),bottom:c.top+b.outerHeight(),startselected:!1,selected:b.hasClass("ui-selected"),selecting:b.hasClass("ui-selecting"),unselecting:b.hasClass("ui-unselecting")});});},this.refresh(),this.selectees=c.addClass("ui-selectee"),this._mouseInit(),this.helper=a("<div class='ui-selectable-helper'></div>");},destroy:function destroy(){return this.selectees.removeClass("ui-selectee").removeData("selectable-item"),this.element.removeClass("ui-selectable ui-selectable-disabled").removeData("selectable").unbind(".selectable"),this._mouseDestroy(),this;},_mouseStart:function _mouseStart(b){var c=this;this.opos=[b.pageX,b.pageY];if(this.options.disabled)return;var d=this.options;this.selectees=a(d.filter,this.element[0]),this._trigger("start",b),a(d.appendTo).append(this.helper),this.helper.css({left:b.clientX,top:b.clientY,width:0,height:0}),d.autoRefresh&&this.refresh(),this.selectees.filter(".ui-selected").each(function(){var d=a.data(this,"selectable-item");d.startselected=!0,!b.metaKey&&!b.ctrlKey&&(d.$element.removeClass("ui-selected"),d.selected=!1,d.$element.addClass("ui-unselecting"),d.unselecting=!0,c._trigger("unselecting",b,{unselecting:d.element}));}),a(b.target).parents().andSelf().each(function(){var d=a.data(this,"selectable-item");if(d){var e=!b.metaKey&&!b.ctrlKey||!d.$element.hasClass("ui-selected");return d.$element.removeClass(e?"ui-unselecting":"ui-selected").addClass(e?"ui-selecting":"ui-unselecting"),d.unselecting=!e,d.selecting=e,d.selected=e,e?c._trigger("selecting",b,{selecting:d.element}):c._trigger("unselecting",b,{unselecting:d.element}),!1;}});},_mouseDrag:function _mouseDrag(b){var c=this;this.dragged=!0;if(this.options.disabled)return;var d=this.options,e=this.opos[0],f=this.opos[1],g=b.pageX,h=b.pageY;if(e>g){var i=g;g=e,e=i;}if(f>h){var i=h;h=f,f=i;}return this.helper.css({left:e,top:f,width:g-e,height:h-f}),this.selectees.each(function(){var i=a.data(this,"selectable-item");if(!i||i.element==c.element[0])return;var j=!1;d.tolerance=="touch"?j=!(i.left>g||i.right<e||i.top>h||i.bottom<f):d.tolerance=="fit"&&(j=i.left>e&&i.right<g&&i.top>f&&i.bottom<h),j?(i.selected&&(i.$element.removeClass("ui-selected"),i.selected=!1),i.unselecting&&(i.$element.removeClass("ui-unselecting"),i.unselecting=!1),i.selecting||(i.$element.addClass("ui-selecting"),i.selecting=!0,c._trigger("selecting",b,{selecting:i.element}))):(i.selecting&&((b.metaKey||b.ctrlKey)&&i.startselected?(i.$element.removeClass("ui-selecting"),i.selecting=!1,i.$element.addClass("ui-selected"),i.selected=!0):(i.$element.removeClass("ui-selecting"),i.selecting=!1,i.startselected&&(i.$element.addClass("ui-unselecting"),i.unselecting=!0),c._trigger("unselecting",b,{unselecting:i.element}))),i.selected&&!b.metaKey&&!b.ctrlKey&&!i.startselected&&(i.$element.removeClass("ui-selected"),i.selected=!1,i.$element.addClass("ui-unselecting"),i.unselecting=!0,c._trigger("unselecting",b,{unselecting:i.element})));}),!1;},_mouseStop:function _mouseStop(b){var c=this;this.dragged=!1;var d=this.options;return a(".ui-unselecting",this.element[0]).each(function(){var d=a.data(this,"selectable-item");d.$element.removeClass("ui-unselecting"),d.unselecting=!1,d.startselected=!1,c._trigger("unselected",b,{unselected:d.element});}),a(".ui-selecting",this.element[0]).each(function(){var d=a.data(this,"selectable-item");d.$element.removeClass("ui-selecting").addClass("ui-selected"),d.selecting=!1,d.selected=!0,d.startselected=!0,c._trigger("selected",b,{selected:d.element});}),this._trigger("stop",b),this.helper.remove(),!1;}}),a.extend(a.ui.selectable,{version:"1.8.23"});})(jQuery);; /*! jQuery UI - v1.8.23 - 2012-08-15
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.sortable.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */(function(a,b){a.widget("ui.sortable",a.ui.mouse,{widgetEventPrefix:"sort",ready:!1,options:{appendTo:"parent",axis:!1,connectWith:!1,containment:!1,cursor:"auto",cursorAt:!1,dropOnEmpty:!0,forcePlaceholderSize:!1,forceHelperSize:!1,grid:!1,handle:!1,helper:"original",items:"> *",opacity:!1,placeholder:!1,revert:!1,scroll:!0,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1e3},_create:function _create(){var a=this.options;this.containerCache={},this.element.addClass("ui-sortable"),this.refresh(),this.floating=this.items.length?a.axis==="x"||/left|right/.test(this.items[0].item.css("float"))||/inline|table-cell/.test(this.items[0].item.css("display")):!1,this.offset=this.element.offset(),this._mouseInit(),this.ready=!0;},destroy:function destroy(){a.Widget.prototype.destroy.call(this),this.element.removeClass("ui-sortable ui-sortable-disabled"),this._mouseDestroy();for(var b=this.items.length-1;b>=0;b--){this.items[b].item.removeData(this.widgetName+"-item");}return this;},_setOption:function _setOption(b,c){b==="disabled"?(this.options[b]=c,this.widget()[c?"addClass":"removeClass"]("ui-sortable-disabled")):a.Widget.prototype._setOption.apply(this,arguments);},_mouseCapture:function _mouseCapture(b,c){var d=this;if(this.reverting)return !1;if(this.options.disabled||this.options.type=="static")return !1;this._refreshItems(b);var e=null,f=this,g=a(b.target).parents().each(function(){if(a.data(this,d.widgetName+"-item")==f)return e=a(this),!1;});a.data(b.target,d.widgetName+"-item")==f&&(e=a(b.target));if(!e)return !1;if(this.options.handle&&!c){var h=!1;a(this.options.handle,e).find("*").andSelf().each(function(){this==b.target&&(h=!0);});if(!h)return !1;}return this.currentItem=e,this._removeCurrentsFromItems(),!0;},_mouseStart:function _mouseStart(b,c,d){var e=this.options,f=this;this.currentContainer=this,this.refreshPositions(),this.helper=this._createHelper(b),this._cacheHelperProportions(),this._cacheMargins(),this.scrollParent=this.helper.scrollParent(),this.offset=this.currentItem.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},a.extend(this.offset,{click:{left:b.pageX-this.offset.left,top:b.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.helper.css("position","absolute"),this.cssPosition=this.helper.css("position"),this.originalPosition=this._generatePosition(b),this.originalPageX=b.pageX,this.originalPageY=b.pageY,e.cursorAt&&this._adjustOffsetFromHelper(e.cursorAt),this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]},this.helper[0]!=this.currentItem[0]&&this.currentItem.hide(),this._createPlaceholder(),e.containment&&this._setContainment(),e.cursor&&(a("body").css("cursor")&&(this._storedCursor=a("body").css("cursor")),a("body").css("cursor",e.cursor)),e.opacity&&(this.helper.css("opacity")&&(this._storedOpacity=this.helper.css("opacity")),this.helper.css("opacity",e.opacity)),e.zIndex&&(this.helper.css("zIndex")&&(this._storedZIndex=this.helper.css("zIndex")),this.helper.css("zIndex",e.zIndex)),this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML"&&(this.overflowOffset=this.scrollParent.offset()),this._trigger("start",b,this._uiHash()),this._preserveHelperProportions||this._cacheHelperProportions();if(!d)for(var g=this.containers.length-1;g>=0;g--){this.containers[g]._trigger("activate",b,f._uiHash(this));}return a.ui.ddmanager&&(a.ui.ddmanager.current=this),a.ui.ddmanager&&!e.dropBehaviour&&a.ui.ddmanager.prepareOffsets(this,b),this.dragging=!0,this.helper.addClass("ui-sortable-helper"),this._mouseDrag(b),!0;},_mouseDrag:function _mouseDrag(b){this.position=this._generatePosition(b),this.positionAbs=this._convertPositionTo("absolute"),this.lastPositionAbs||(this.lastPositionAbs=this.positionAbs);if(this.options.scroll){var c=this.options,d=!1;this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML"?(this.overflowOffset.top+this.scrollParent[0].offsetHeight-b.pageY<c.scrollSensitivity?this.scrollParent[0].scrollTop=d=this.scrollParent[0].scrollTop+c.scrollSpeed:b.pageY-this.overflowOffset.top<c.scrollSensitivity&&(this.scrollParent[0].scrollTop=d=this.scrollParent[0].scrollTop-c.scrollSpeed),this.overflowOffset.left+this.scrollParent[0].offsetWidth-b.pageX<c.scrollSensitivity?this.scrollParent[0].scrollLeft=d=this.scrollParent[0].scrollLeft+c.scrollSpeed:b.pageX-this.overflowOffset.left<c.scrollSensitivity&&(this.scrollParent[0].scrollLeft=d=this.scrollParent[0].scrollLeft-c.scrollSpeed)):(b.pageY-a(document).scrollTop()<c.scrollSensitivity?d=a(document).scrollTop(a(document).scrollTop()-c.scrollSpeed):a(window).height()-(b.pageY-a(document).scrollTop())<c.scrollSensitivity&&(d=a(document).scrollTop(a(document).scrollTop()+c.scrollSpeed)),b.pageX-a(document).scrollLeft()<c.scrollSensitivity?d=a(document).scrollLeft(a(document).scrollLeft()-c.scrollSpeed):a(window).width()-(b.pageX-a(document).scrollLeft())<c.scrollSensitivity&&(d=a(document).scrollLeft(a(document).scrollLeft()+c.scrollSpeed))),d!==!1&&a.ui.ddmanager&&!c.dropBehaviour&&a.ui.ddmanager.prepareOffsets(this,b);}this.positionAbs=this._convertPositionTo("absolute");if(!this.options.axis||this.options.axis!="y")this.helper[0].style.left=this.position.left+"px";if(!this.options.axis||this.options.axis!="x")this.helper[0].style.top=this.position.top+"px";for(var e=this.items.length-1;e>=0;e--){var f=this.items[e],g=f.item[0],h=this._intersectsWithPointer(f);if(!h)continue;if(g!=this.currentItem[0]&&this.placeholder[h==1?"next":"prev"]()[0]!=g&&!a.ui.contains(this.placeholder[0],g)&&(this.options.type=="semi-dynamic"?!a.ui.contains(this.element[0],g):!0)){this.direction=h==1?"down":"up";if(this.options.tolerance=="pointer"||this._intersectsWithSides(f))this._rearrange(b,f);else break;this._trigger("change",b,this._uiHash());break;}}return this._contactContainers(b),a.ui.ddmanager&&a.ui.ddmanager.drag(this,b),this._trigger("sort",b,this._uiHash()),this.lastPositionAbs=this.positionAbs,!1;},_mouseStop:function _mouseStop(b,c){if(!b)return;a.ui.ddmanager&&!this.options.dropBehaviour&&a.ui.ddmanager.drop(this,b);if(this.options.revert){var d=this,e=d.placeholder.offset();d.reverting=!0,a(this.helper).animate({left:e.left-this.offset.parent.left-d.margins.left+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollLeft),top:e.top-this.offset.parent.top-d.margins.top+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollTop)},parseInt(this.options.revert,10)||500,function(){d._clear(b);});}else this._clear(b,c);return !1;},cancel:function cancel(){var b=this;if(this.dragging){this._mouseUp({target:null}),this.options.helper=="original"?this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper"):this.currentItem.show();for(var c=this.containers.length-1;c>=0;c--){this.containers[c]._trigger("deactivate",null,b._uiHash(this)),this.containers[c].containerCache.over&&(this.containers[c]._trigger("out",null,b._uiHash(this)),this.containers[c].containerCache.over=0);}}return this.placeholder&&(this.placeholder[0].parentNode&&this.placeholder[0].parentNode.removeChild(this.placeholder[0]),this.options.helper!="original"&&this.helper&&this.helper[0].parentNode&&this.helper.remove(),a.extend(this,{helper:null,dragging:!1,reverting:!1,_noFinalSort:null}),this.domPosition.prev?a(this.domPosition.prev).after(this.currentItem):a(this.domPosition.parent).prepend(this.currentItem)),this;},serialize:function serialize(b){var c=this._getItemsAsjQuery(b&&b.connected),d=[];return b=b||{},a(c).each(function(){var c=(a(b.item||this).attr(b.attribute||"id")||"").match(b.expression||/(.+)[-=_](.+)/);c&&d.push((b.key||c[1]+"[]")+"="+(b.key&&b.expression?c[1]:c[2]));}),!d.length&&b.key&&d.push(b.key+"="),d.join("&");},toArray:function toArray(b){var c=this._getItemsAsjQuery(b&&b.connected),d=[];return b=b||{},c.each(function(){d.push(a(b.item||this).attr(b.attribute||"id")||"");}),d;},_intersectsWith:function _intersectsWith(a){var b=this.positionAbs.left,c=b+this.helperProportions.width,d=this.positionAbs.top,e=d+this.helperProportions.height,f=a.left,g=f+a.width,h=a.top,i=h+a.height,j=this.offset.click.top,k=this.offset.click.left,l=d+j>h&&d+j<i&&b+k>f&&b+k<g;return this.options.tolerance=="pointer"||this.options.forcePointerForContainers||this.options.tolerance!="pointer"&&this.helperProportions[this.floating?"width":"height"]>a[this.floating?"width":"height"]?l:f<b+this.helperProportions.width/2&&c-this.helperProportions.width/2<g&&h<d+this.helperProportions.height/2&&e-this.helperProportions.height/2<i;},_intersectsWithPointer:function _intersectsWithPointer(b){var c=this.options.axis==="x"||a.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,b.top,b.height),d=this.options.axis==="y"||a.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,b.left,b.width),e=c&&d,f=this._getDragVerticalDirection(),g=this._getDragHorizontalDirection();return e?this.floating?g&&g=="right"||f=="down"?2:1:f&&(f=="down"?2:1):!1;},_intersectsWithSides:function _intersectsWithSides(b){var c=a.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,b.top+b.height/2,b.height),d=a.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,b.left+b.width/2,b.width),e=this._getDragVerticalDirection(),f=this._getDragHorizontalDirection();return this.floating&&f?f=="right"&&d||f=="left"&&!d:e&&(e=="down"&&c||e=="up"&&!c);},_getDragVerticalDirection:function _getDragVerticalDirection(){var a=this.positionAbs.top-this.lastPositionAbs.top;return a!=0&&(a>0?"down":"up");},_getDragHorizontalDirection:function _getDragHorizontalDirection(){var a=this.positionAbs.left-this.lastPositionAbs.left;return a!=0&&(a>0?"right":"left");},refresh:function refresh(a){return this._refreshItems(a),this.refreshPositions(),this;},_connectWith:function _connectWith(){var a=this.options;return a.connectWith.constructor==String?[a.connectWith]:a.connectWith;},_getItemsAsjQuery:function _getItemsAsjQuery(b){var c=this,d=[],e=[],f=this._connectWith();if(f&&b)for(var g=f.length-1;g>=0;g--){var h=a(f[g]);for(var i=h.length-1;i>=0;i--){var j=a.data(h[i],this.widgetName);j&&j!=this&&!j.options.disabled&&e.push([a.isFunction(j.options.items)?j.options.items.call(j.element):a(j.options.items,j.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),j]);}}e.push([a.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):a(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),this]);for(var g=e.length-1;g>=0;g--){e[g][0].each(function(){d.push(this);});}return a(d);},_removeCurrentsFromItems:function _removeCurrentsFromItems(){var a=this.currentItem.find(":data("+this.widgetName+"-item)");for(var b=0;b<this.items.length;b++){for(var c=0;c<a.length;c++){a[c]==this.items[b].item[0]&&this.items.splice(b,1);}}},_refreshItems:function _refreshItems(b){this.items=[],this.containers=[this];var c=this.items,d=this,e=[[a.isFunction(this.options.items)?this.options.items.call(this.element[0],b,{item:this.currentItem}):a(this.options.items,this.element),this]],f=this._connectWith();if(f&&this.ready)for(var g=f.length-1;g>=0;g--){var h=a(f[g]);for(var i=h.length-1;i>=0;i--){var j=a.data(h[i],this.widgetName);j&&j!=this&&!j.options.disabled&&(e.push([a.isFunction(j.options.items)?j.options.items.call(j.element[0],b,{item:this.currentItem}):a(j.options.items,j.element),j]),this.containers.push(j));}}for(var g=e.length-1;g>=0;g--){var k=e[g][1],l=e[g][0];for(var i=0,m=l.length;i<m;i++){var n=a(l[i]);n.data(this.widgetName+"-item",k),c.push({item:n,instance:k,width:0,height:0,left:0,top:0});}}},refreshPositions:function refreshPositions(b){this.offsetParent&&this.helper&&(this.offset.parent=this._getParentOffset());for(var c=this.items.length-1;c>=0;c--){var d=this.items[c];if(d.instance!=this.currentContainer&&this.currentContainer&&d.item[0]!=this.currentItem[0])continue;var e=this.options.toleranceElement?a(this.options.toleranceElement,d.item):d.item;b||(d.width=e.outerWidth(),d.height=e.outerHeight());var f=e.offset();d.left=f.left,d.top=f.top;}if(this.options.custom&&this.options.custom.refreshContainers)this.options.custom.refreshContainers.call(this);else for(var c=this.containers.length-1;c>=0;c--){var f=this.containers[c].element.offset();this.containers[c].containerCache.left=f.left,this.containers[c].containerCache.top=f.top,this.containers[c].containerCache.width=this.containers[c].element.outerWidth(),this.containers[c].containerCache.height=this.containers[c].element.outerHeight();}return this;},_createPlaceholder:function _createPlaceholder(b){var c=b||this,d=c.options;if(!d.placeholder||d.placeholder.constructor==String){var e=d.placeholder;d.placeholder={element:function element(){var b=a(document.createElement(c.currentItem[0].nodeName)).addClass(e||c.currentItem[0].className+" ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];return e||(b.style.visibility="hidden"),b;},update:function update(a,b){if(e&&!d.forcePlaceholderSize)return;b.height()||b.height(c.currentItem.innerHeight()-parseInt(c.currentItem.css("paddingTop")||0,10)-parseInt(c.currentItem.css("paddingBottom")||0,10)),b.width()||b.width(c.currentItem.innerWidth()-parseInt(c.currentItem.css("paddingLeft")||0,10)-parseInt(c.currentItem.css("paddingRight")||0,10));}};}c.placeholder=a(d.placeholder.element.call(c.element,c.currentItem)),c.currentItem.after(c.placeholder),d.placeholder.update(c,c.placeholder);},_contactContainers:function _contactContainers(b){var c=null,d=null;for(var e=this.containers.length-1;e>=0;e--){if(a.ui.contains(this.currentItem[0],this.containers[e].element[0]))continue;if(this._intersectsWith(this.containers[e].containerCache)){if(c&&a.ui.contains(this.containers[e].element[0],c.element[0]))continue;c=this.containers[e],d=e;}else this.containers[e].containerCache.over&&(this.containers[e]._trigger("out",b,this._uiHash(this)),this.containers[e].containerCache.over=0);}if(!c)return;if(this.containers.length===1)this.containers[d]._trigger("over",b,this._uiHash(this)),this.containers[d].containerCache.over=1;else if(this.currentContainer!=this.containers[d]){var f=1e4,g=null,h=this.positionAbs[this.containers[d].floating?"left":"top"];for(var i=this.items.length-1;i>=0;i--){if(!a.ui.contains(this.containers[d].element[0],this.items[i].item[0]))continue;var j=this.containers[d].floating?this.items[i].item.offset().left:this.items[i].item.offset().top;Math.abs(j-h)<f&&(f=Math.abs(j-h),g=this.items[i],this.direction=j-h>0?"down":"up");}if(!g&&!this.options.dropOnEmpty)return;this.currentContainer=this.containers[d],g?this._rearrange(b,g,null,!0):this._rearrange(b,null,this.containers[d].element,!0),this._trigger("change",b,this._uiHash()),this.containers[d]._trigger("change",b,this._uiHash(this)),this.options.placeholder.update(this.currentContainer,this.placeholder),this.containers[d]._trigger("over",b,this._uiHash(this)),this.containers[d].containerCache.over=1;}},_createHelper:function _createHelper(b){var c=this.options,d=a.isFunction(c.helper)?a(c.helper.apply(this.element[0],[b,this.currentItem])):c.helper=="clone"?this.currentItem.clone():this.currentItem;return d.parents("body").length||a(c.appendTo!="parent"?c.appendTo:this.currentItem[0].parentNode)[0].appendChild(d[0]),d[0]==this.currentItem[0]&&(this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")}),(d[0].style.width==""||c.forceHelperSize)&&d.width(this.currentItem.width()),(d[0].style.height==""||c.forceHelperSize)&&d.height(this.currentItem.height()),d;},_adjustOffsetFromHelper:function _adjustOffsetFromHelper(b){typeof b=="string"&&(b=b.split(" ")),a.isArray(b)&&(b={left:+b[0],top:+b[1]||0}),"left" in b&&(this.offset.click.left=b.left+this.margins.left),"right" in b&&(this.offset.click.left=this.helperProportions.width-b.right+this.margins.left),"top" in b&&(this.offset.click.top=b.top+this.margins.top),"bottom" in b&&(this.offset.click.top=this.helperProportions.height-b.bottom+this.margins.top);},_getParentOffset:function _getParentOffset(){this.offsetParent=this.helper.offsetParent();var b=this.offsetParent.offset();this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0])&&(b.left+=this.scrollParent.scrollLeft(),b.top+=this.scrollParent.scrollTop());if(this.offsetParent[0]==document.body||this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&a.browser.msie)b={top:0,left:0};return {top:b.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:b.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)};},_getRelativeOffset:function _getRelativeOffset(){if(this.cssPosition=="relative"){var a=this.currentItem.position();return {top:a.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:a.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()};}return {top:0,left:0};},_cacheMargins:function _cacheMargins(){this.margins={left:parseInt(this.currentItem.css("marginLeft"),10)||0,top:parseInt(this.currentItem.css("marginTop"),10)||0};},_cacheHelperProportions:function _cacheHelperProportions(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()};},_setContainment:function _setContainment(){var b=this.options;b.containment=="parent"&&(b.containment=this.helper[0].parentNode);if(b.containment=="document"||b.containment=="window")this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,a(b.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(a(b.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top];if(!/^(document|window|parent)$/.test(b.containment)){var c=a(b.containment)[0],d=a(b.containment).offset(),e=a(c).css("overflow")!="hidden";this.containment=[d.left+(parseInt(a(c).css("borderLeftWidth"),10)||0)+(parseInt(a(c).css("paddingLeft"),10)||0)-this.margins.left,d.top+(parseInt(a(c).css("borderTopWidth"),10)||0)+(parseInt(a(c).css("paddingTop"),10)||0)-this.margins.top,d.left+(e?Math.max(c.scrollWidth,c.offsetWidth):c.offsetWidth)-(parseInt(a(c).css("borderLeftWidth"),10)||0)-(parseInt(a(c).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,d.top+(e?Math.max(c.scrollHeight,c.offsetHeight):c.offsetHeight)-(parseInt(a(c).css("borderTopWidth"),10)||0)-(parseInt(a(c).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top];}},_convertPositionTo:function _convertPositionTo(b,c){c||(c=this.position);var d=b=="absolute"?1:-1,e=this.options,f=this.cssPosition=="absolute"&&(this.scrollParent[0]==document||!a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,g=/(html|body)/i.test(f[0].tagName);return {top:c.top+this.offset.relative.top*d+this.offset.parent.top*d-(a.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():g?0:f.scrollTop())*d),left:c.left+this.offset.relative.left*d+this.offset.parent.left*d-(a.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():g?0:f.scrollLeft())*d)};},_generatePosition:function _generatePosition(b){var c=this.options,d=this.cssPosition=="absolute"&&(this.scrollParent[0]==document||!a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,e=/(html|body)/i.test(d[0].tagName);this.cssPosition=="relative"&&(this.scrollParent[0]==document||this.scrollParent[0]==this.offsetParent[0])&&(this.offset.relative=this._getRelativeOffset());var f=b.pageX,g=b.pageY;if(this.originalPosition){this.containment&&(b.pageX-this.offset.click.left<this.containment[0]&&(f=this.containment[0]+this.offset.click.left),b.pageY-this.offset.click.top<this.containment[1]&&(g=this.containment[1]+this.offset.click.top),b.pageX-this.offset.click.left>this.containment[2]&&(f=this.containment[2]+this.offset.click.left),b.pageY-this.offset.click.top>this.containment[3]&&(g=this.containment[3]+this.offset.click.top));if(c.grid){var h=this.originalPageY+Math.round((g-this.originalPageY)/c.grid[1])*c.grid[1];g=this.containment?h-this.offset.click.top<this.containment[1]||h-this.offset.click.top>this.containment[3]?h-this.offset.click.top<this.containment[1]?h+c.grid[1]:h-c.grid[1]:h:h;var i=this.originalPageX+Math.round((f-this.originalPageX)/c.grid[0])*c.grid[0];f=this.containment?i-this.offset.click.left<this.containment[0]||i-this.offset.click.left>this.containment[2]?i-this.offset.click.left<this.containment[0]?i+c.grid[0]:i-c.grid[0]:i:i;}}return {top:g-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(a.browser.safari&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollTop():e?0:d.scrollTop()),left:f-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(a.browser.safari&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():e?0:d.scrollLeft())};},_rearrange:function _rearrange(a,b,c,d){c?c[0].appendChild(this.placeholder[0]):b.item[0].parentNode.insertBefore(this.placeholder[0],this.direction=="down"?b.item[0]:b.item[0].nextSibling),this.counter=this.counter?++this.counter:1;var e=this,f=this.counter;window.setTimeout(function(){f==e.counter&&e.refreshPositions(!d);},0);},_clear:function _clear(b,c){this.reverting=!1;var d=[],e=this;!this._noFinalSort&&this.currentItem.parent().length&&this.placeholder.before(this.currentItem),this._noFinalSort=null;if(this.helper[0]==this.currentItem[0]){for(var f in this._storedCSS){if(this._storedCSS[f]=="auto"||this._storedCSS[f]=="static")this._storedCSS[f]="";}this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper");}else this.currentItem.show();this.fromOutside&&!c&&d.push(function(a){this._trigger("receive",a,this._uiHash(this.fromOutside));}),(this.fromOutside||this.domPosition.prev!=this.currentItem.prev().not(".ui-sortable-helper")[0]||this.domPosition.parent!=this.currentItem.parent()[0])&&!c&&d.push(function(a){this._trigger("update",a,this._uiHash());});if(!a.ui.contains(this.element[0],this.currentItem[0])){c||d.push(function(a){this._trigger("remove",a,this._uiHash());});for(var f=this.containers.length-1;f>=0;f--){a.ui.contains(this.containers[f].element[0],this.currentItem[0])&&!c&&(d.push(function(a){return function(b){a._trigger("receive",b,this._uiHash(this));};}.call(this,this.containers[f])),d.push(function(a){return function(b){a._trigger("update",b,this._uiHash(this));};}.call(this,this.containers[f])));}}for(var f=this.containers.length-1;f>=0;f--){c||d.push(function(a){return function(b){a._trigger("deactivate",b,this._uiHash(this));};}.call(this,this.containers[f])),this.containers[f].containerCache.over&&(d.push(function(a){return function(b){a._trigger("out",b,this._uiHash(this));};}.call(this,this.containers[f])),this.containers[f].containerCache.over=0);}this._storedCursor&&a("body").css("cursor",this._storedCursor),this._storedOpacity&&this.helper.css("opacity",this._storedOpacity),this._storedZIndex&&this.helper.css("zIndex",this._storedZIndex=="auto"?"":this._storedZIndex),this.dragging=!1;if(this.cancelHelperRemoval){if(!c){this._trigger("beforeStop",b,this._uiHash());for(var f=0;f<d.length;f++){d[f].call(this,b);}this._trigger("stop",b,this._uiHash());}return this.fromOutside=!1,!1;}c||this._trigger("beforeStop",b,this._uiHash()),this.placeholder[0].parentNode.removeChild(this.placeholder[0]),this.helper[0]!=this.currentItem[0]&&this.helper.remove(),this.helper=null;if(!c){for(var f=0;f<d.length;f++){d[f].call(this,b);}this._trigger("stop",b,this._uiHash());}return this.fromOutside=!1,!0;},_trigger:function _trigger(){a.Widget.prototype._trigger.apply(this,arguments)===!1&&this.cancel();},_uiHash:function _uiHash(b){var c=b||this;return {helper:c.helper,placeholder:c.placeholder||a([]),position:c.position,originalPosition:c.originalPosition,offset:c.positionAbs,item:c.currentItem,sender:b?b.element:null};}}),a.extend(a.ui.sortable,{version:"1.8.23"});})(jQuery);; /*! jQuery UI - v1.8.23 - 2012-08-15
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.autocomplete.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */(function(a,b){var c=0;a.widget("ui.autocomplete",{options:{appendTo:"body",autoFocus:!1,delay:300,minLength:1,position:{my:"left top",at:"left bottom",collision:"none"},source:null},pending:0,_create:function _create(){var b=this,c=this.element[0].ownerDocument,d;this.isMultiLine=this.element.is("textarea"),this.element.addClass("ui-autocomplete-input").attr("autocomplete","off").attr({role:"textbox","aria-autocomplete":"list","aria-haspopup":"true"}).bind("keydown.autocomplete",function(c){if(b.options.disabled||b.element.propAttr("readOnly"))return;d=!1;var e=a.ui.keyCode;switch(c.keyCode){case e.PAGE_UP:b._move("previousPage",c);break;case e.PAGE_DOWN:b._move("nextPage",c);break;case e.UP:b._keyEvent("previous",c);break;case e.DOWN:b._keyEvent("next",c);break;case e.ENTER:case e.NUMPAD_ENTER:b.menu.active&&(d=!0,c.preventDefault());case e.TAB:if(!b.menu.active)return;b.menu.select(c);break;case e.ESCAPE:b.element.val(b.term),b.close(c);break;default:clearTimeout(b.searching),b.searching=setTimeout(function(){b.term!=b.element.val()&&(b.selectedItem=null,b.search(null,c));},b.options.delay);}}).bind("keypress.autocomplete",function(a){d&&(d=!1,a.preventDefault());}).bind("focus.autocomplete",function(){if(b.options.disabled)return;b.selectedItem=null,b.previous=b.element.val();}).bind("blur.autocomplete",function(a){if(b.options.disabled)return;clearTimeout(b.searching),b.closing=setTimeout(function(){b.close(a),b._change(a);},150);}),this._initSource(),this.menu=a("<ul></ul>").addClass("ui-autocomplete").appendTo(a(this.options.appendTo||"body",c)[0]).mousedown(function(c){var d=b.menu.element[0];a(c.target).closest(".ui-menu-item").length||setTimeout(function(){a(document).one("mousedown",function(c){c.target!==b.element[0]&&c.target!==d&&!a.ui.contains(d,c.target)&&b.close();});},1),setTimeout(function(){clearTimeout(b.closing);},13);}).menu({focus:function focus(a,c){var d=c.item.data("item.autocomplete");!1!==b._trigger("focus",a,{item:d})&&/^key/.test(a.originalEvent.type)&&b.element.val(d.value);},selected:function selected(a,d){var e=d.item.data("item.autocomplete"),f=b.previous;b.element[0]!==c.activeElement&&(b.element.focus(),b.previous=f,setTimeout(function(){b.previous=f,b.selectedItem=e;},1)),!1!==b._trigger("select",a,{item:e})&&b.element.val(e.value),b.term=b.element.val(),b.close(a),b.selectedItem=e;},blur:function blur(a,c){b.menu.element.is(":visible")&&b.element.val()!==b.term&&b.element.val(b.term);}}).zIndex(this.element.zIndex()+1).css({top:0,left:0}).hide().data("menu"),a.fn.bgiframe&&this.menu.element.bgiframe(),b.beforeunloadHandler=function(){b.element.removeAttr("autocomplete");},a(window).bind("beforeunload",b.beforeunloadHandler);},destroy:function destroy(){this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete").removeAttr("role").removeAttr("aria-autocomplete").removeAttr("aria-haspopup"),this.menu.element.remove(),a(window).unbind("beforeunload",this.beforeunloadHandler),a.Widget.prototype.destroy.call(this);},_setOption:function _setOption(b,c){a.Widget.prototype._setOption.apply(this,arguments),b==="source"&&this._initSource(),b==="appendTo"&&this.menu.element.appendTo(a(c||"body",this.element[0].ownerDocument)[0]),b==="disabled"&&c&&this.xhr&&this.xhr.abort();},_initSource:function _initSource(){var b=this,c,d;a.isArray(this.options.source)?(c=this.options.source,this.source=function(b,d){d(a.ui.autocomplete.filter(c,b.term));}):typeof this.options.source=="string"?(d=this.options.source,this.source=function(c,e){b.xhr&&b.xhr.abort(),b.xhr=a.ajax({url:d,data:c,dataType:"json",success:function success(a,b){e(a);},error:function error(){e([]);}});}):this.source=this.options.source;},search:function search(a,b){a=a!=null?a:this.element.val(),this.term=this.element.val();if(a.length<this.options.minLength)return this.close(b);clearTimeout(this.closing);if(this._trigger("search",b)===!1)return;return this._search(a);},_search:function _search(a){this.pending++,this.element.addClass("ui-autocomplete-loading"),this.source({term:a},this._response());},_response:function _response(){var a=this,b=++c;return function(d){b===c&&a.__response(d),a.pending--,a.pending||a.element.removeClass("ui-autocomplete-loading");};},__response:function __response(a){!this.options.disabled&&a&&a.length?(a=this._normalize(a),this._suggest(a),this._trigger("open")):this.close();},close:function close(a){clearTimeout(this.closing),this.menu.element.is(":visible")&&(this.menu.element.hide(),this.menu.deactivate(),this._trigger("close",a));},_change:function _change(a){this.previous!==this.element.val()&&this._trigger("change",a,{item:this.selectedItem});},_normalize:function _normalize(b){return b.length&&b[0].label&&b[0].value?b:a.map(b,function(b){return typeof b=="string"?{label:b,value:b}:a.extend({label:b.label||b.value,value:b.value||b.label},b);});},_suggest:function _suggest(b){var c=this.menu.element.empty().zIndex(this.element.zIndex()+1);this._renderMenu(c,b),this.menu.deactivate(),this.menu.refresh(),c.show(),this._resizeMenu(),c.position(a.extend({of:this.element},this.options.position)),this.options.autoFocus&&this.menu.next(new a.Event("mouseover"));},_resizeMenu:function _resizeMenu(){var a=this.menu.element;a.outerWidth(Math.max(a.width("").outerWidth()+1,this.element.outerWidth()));},_renderMenu:function _renderMenu(b,c){var d=this;a.each(c,function(a,c){d._renderItem(b,c);});},_renderItem:function _renderItem(b,c){return a("<li></li>").data("item.autocomplete",c).append(a("<a></a>").text(c.label)).appendTo(b);},_move:function _move(a,b){if(!this.menu.element.is(":visible")){this.search(null,b);return;}if(this.menu.first()&&/^previous/.test(a)||this.menu.last()&&/^next/.test(a)){this.element.val(this.term),this.menu.deactivate();return;}this.menu[a](b);},widget:function widget(){return this.menu.element;},_keyEvent:function _keyEvent(a,b){if(!this.isMultiLine||this.menu.element.is(":visible"))this._move(a,b),b.preventDefault();}}),a.extend(a.ui.autocomplete,{escapeRegex:function escapeRegex(a){return a.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&");},filter:function filter(b,c){var d=new RegExp(a.ui.autocomplete.escapeRegex(c),"i");return a.grep(b,function(a){return d.test(a.label||a.value||a);});}});})(jQuery),function(a){a.widget("ui.menu",{_create:function _create(){var b=this;this.element.addClass("ui-menu ui-widget ui-widget-content ui-corner-all").attr({role:"listbox","aria-activedescendant":"ui-active-menuitem"}).click(function(c){if(!a(c.target).closest(".ui-menu-item a").length)return;c.preventDefault(),b.select(c);}),this.refresh();},refresh:function refresh(){var b=this,c=this.element.children("li:not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role","menuitem");c.children("a").addClass("ui-corner-all").attr("tabindex",-1).mouseenter(function(c){b.activate(c,a(this).parent());}).mouseleave(function(){b.deactivate();});},activate:function activate(a,b){this.deactivate();if(this.hasScroll()){var c=b.offset().top-this.element.offset().top,d=this.element.scrollTop(),e=this.element.height();c<0?this.element.scrollTop(d+c):c>=e&&this.element.scrollTop(d+c-e+b.height());}this.active=b.eq(0).children("a").addClass("ui-state-hover").attr("id","ui-active-menuitem").end(),this._trigger("focus",a,{item:b});},deactivate:function deactivate(){if(!this.active)return;this.active.children("a").removeClass("ui-state-hover").removeAttr("id"),this._trigger("blur"),this.active=null;},next:function next(a){this.move("next",".ui-menu-item:first",a);},previous:function previous(a){this.move("prev",".ui-menu-item:last",a);},first:function first(){return this.active&&!this.active.prevAll(".ui-menu-item").length;},last:function last(){return this.active&&!this.active.nextAll(".ui-menu-item").length;},move:function move(a,b,c){if(!this.active){this.activate(c,this.element.children(b));return;}var d=this.active[a+"All"](".ui-menu-item").eq(0);d.length?this.activate(c,d):this.activate(c,this.element.children(b));},nextPage:function nextPage(b){if(this.hasScroll()){if(!this.active||this.last()){this.activate(b,this.element.children(".ui-menu-item:first"));return;}var c=this.active.offset().top,d=this.element.height(),e=this.element.children(".ui-menu-item").filter(function(){var b=a(this).offset().top-c-d+a(this).height();return b<10&&b>-10;});e.length||(e=this.element.children(".ui-menu-item:last")),this.activate(b,e);}else this.activate(b,this.element.children(".ui-menu-item").filter(!this.active||this.last()?":first":":last"));},previousPage:function previousPage(b){if(this.hasScroll()){if(!this.active||this.first()){this.activate(b,this.element.children(".ui-menu-item:last"));return;}var c=this.active.offset().top,d=this.element.height(),e=this.element.children(".ui-menu-item").filter(function(){var b=a(this).offset().top-c+d-a(this).height();return b<10&&b>-10;});e.length||(e=this.element.children(".ui-menu-item:first")),this.activate(b,e);}else this.activate(b,this.element.children(".ui-menu-item").filter(!this.active||this.first()?":last":":first"));},hasScroll:function hasScroll(){return this.element.height()<this.element[a.fn.prop?"prop":"attr"]("scrollHeight");},select:function select(a){this._trigger("selected",a,{item:this.active});}});}(jQuery);; /*! jQuery UI - v1.8.23 - 2012-08-15
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.slider.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */(function(a,b){var c=5;a.widget("ui.slider",a.ui.mouse,{widgetEventPrefix:"slide",options:{animate:!1,distance:0,max:100,min:0,orientation:"horizontal",range:!1,step:1,value:0,values:null},_create:function _create(){var b=this,d=this.options,e=this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),f="<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>",g=d.values&&d.values.length||1,h=[];this._keySliding=!1,this._mouseSliding=!1,this._animateOff=!0,this._handleIndex=null,this._detectOrientation(),this._mouseInit(),this.element.addClass("ui-slider ui-slider-"+this.orientation+" ui-widget"+" ui-widget-content"+" ui-corner-all"+(d.disabled?" ui-slider-disabled ui-disabled":"")),this.range=a([]),d.range&&(d.range===!0&&(d.values||(d.values=[this._valueMin(),this._valueMin()]),d.values.length&&d.values.length!==2&&(d.values=[d.values[0],d.values[0]])),this.range=a("<div></div>").appendTo(this.element).addClass("ui-slider-range ui-widget-header"+(d.range==="min"||d.range==="max"?" ui-slider-range-"+d.range:"")));for(var i=e.length;i<g;i+=1){h.push(f);}this.handles=e.add(a(h.join("")).appendTo(b.element)),this.handle=this.handles.eq(0),this.handles.add(this.range).filter("a").click(function(a){a.preventDefault();}).hover(function(){d.disabled||a(this).addClass("ui-state-hover");},function(){a(this).removeClass("ui-state-hover");}).focus(function(){d.disabled?a(this).blur():(a(".ui-slider .ui-state-focus").removeClass("ui-state-focus"),a(this).addClass("ui-state-focus"));}).blur(function(){a(this).removeClass("ui-state-focus");}),this.handles.each(function(b){a(this).data("index.ui-slider-handle",b);}),this.handles.keydown(function(d){var e=a(this).data("index.ui-slider-handle"),f,g,h,i;if(b.options.disabled)return;switch(d.keyCode){case a.ui.keyCode.HOME:case a.ui.keyCode.END:case a.ui.keyCode.PAGE_UP:case a.ui.keyCode.PAGE_DOWN:case a.ui.keyCode.UP:case a.ui.keyCode.RIGHT:case a.ui.keyCode.DOWN:case a.ui.keyCode.LEFT:d.preventDefault();if(!b._keySliding){b._keySliding=!0,a(this).addClass("ui-state-active"),f=b._start(d,e);if(f===!1)return;}}i=b.options.step,b.options.values&&b.options.values.length?g=h=b.values(e):g=h=b.value();switch(d.keyCode){case a.ui.keyCode.HOME:h=b._valueMin();break;case a.ui.keyCode.END:h=b._valueMax();break;case a.ui.keyCode.PAGE_UP:h=b._trimAlignValue(g+(b._valueMax()-b._valueMin())/c);break;case a.ui.keyCode.PAGE_DOWN:h=b._trimAlignValue(g-(b._valueMax()-b._valueMin())/c);break;case a.ui.keyCode.UP:case a.ui.keyCode.RIGHT:if(g===b._valueMax())return;h=b._trimAlignValue(g+i);break;case a.ui.keyCode.DOWN:case a.ui.keyCode.LEFT:if(g===b._valueMin())return;h=b._trimAlignValue(g-i);}b._slide(d,e,h);}).keyup(function(c){var d=a(this).data("index.ui-slider-handle");b._keySliding&&(b._keySliding=!1,b._stop(c,d),b._change(c,d),a(this).removeClass("ui-state-active"));}),this._refreshValue(),this._animateOff=!1;},destroy:function destroy(){return this.handles.remove(),this.range.remove(),this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider"),this._mouseDestroy(),this;},_mouseCapture:function _mouseCapture(b){var c=this.options,d,e,f,g,h,i,j,k,l;return c.disabled?!1:(this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()},this.elementOffset=this.element.offset(),d={x:b.pageX,y:b.pageY},e=this._normValueFromMouse(d),f=this._valueMax()-this._valueMin()+1,h=this,this.handles.each(function(b){var c=Math.abs(e-h.values(b));f>c&&(f=c,g=a(this),i=b);}),c.range===!0&&this.values(1)===c.min&&(i+=1,g=a(this.handles[i])),j=this._start(b,i),j===!1?!1:(this._mouseSliding=!0,h._handleIndex=i,g.addClass("ui-state-active").focus(),k=g.offset(),l=!a(b.target).parents().andSelf().is(".ui-slider-handle"),this._clickOffset=l?{left:0,top:0}:{left:b.pageX-k.left-g.width()/2,top:b.pageY-k.top-g.height()/2-(parseInt(g.css("borderTopWidth"),10)||0)-(parseInt(g.css("borderBottomWidth"),10)||0)+(parseInt(g.css("marginTop"),10)||0)},this.handles.hasClass("ui-state-hover")||this._slide(b,i,e),this._animateOff=!0,!0));},_mouseStart:function _mouseStart(a){return !0;},_mouseDrag:function _mouseDrag(a){var b={x:a.pageX,y:a.pageY},c=this._normValueFromMouse(b);return this._slide(a,this._handleIndex,c),!1;},_mouseStop:function _mouseStop(a){return this.handles.removeClass("ui-state-active"),this._mouseSliding=!1,this._stop(a,this._handleIndex),this._change(a,this._handleIndex),this._handleIndex=null,this._clickOffset=null,this._animateOff=!1,!1;},_detectOrientation:function _detectOrientation(){this.orientation=this.options.orientation==="vertical"?"vertical":"horizontal";},_normValueFromMouse:function _normValueFromMouse(a){var b,c,d,e,f;return this.orientation==="horizontal"?(b=this.elementSize.width,c=a.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)):(b=this.elementSize.height,c=a.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)),d=c/b,d>1&&(d=1),d<0&&(d=0),this.orientation==="vertical"&&(d=1-d),e=this._valueMax()-this._valueMin(),f=this._valueMin()+d*e,this._trimAlignValue(f);},_start:function _start(a,b){var c={handle:this.handles[b],value:this.value()};return this.options.values&&this.options.values.length&&(c.value=this.values(b),c.values=this.values()),this._trigger("start",a,c);},_slide:function _slide(a,b,c){var d,e,f;this.options.values&&this.options.values.length?(d=this.values(b?0:1),this.options.values.length===2&&this.options.range===!0&&(b===0&&c>d||b===1&&c<d)&&(c=d),c!==this.values(b)&&(e=this.values(),e[b]=c,f=this._trigger("slide",a,{handle:this.handles[b],value:c,values:e}),d=this.values(b?0:1),f!==!1&&this.values(b,c,!0))):c!==this.value()&&(f=this._trigger("slide",a,{handle:this.handles[b],value:c}),f!==!1&&this.value(c));},_stop:function _stop(a,b){var c={handle:this.handles[b],value:this.value()};this.options.values&&this.options.values.length&&(c.value=this.values(b),c.values=this.values()),this._trigger("stop",a,c);},_change:function _change(a,b){if(!this._keySliding&&!this._mouseSliding){var c={handle:this.handles[b],value:this.value()};this.options.values&&this.options.values.length&&(c.value=this.values(b),c.values=this.values()),this._trigger("change",a,c);}},value:function value(a){if(arguments.length){this.options.value=this._trimAlignValue(a),this._refreshValue(),this._change(null,0);return;}return this._value();},values:function values(b,c){var d,e,f;if(arguments.length>1){this.options.values[b]=this._trimAlignValue(c),this._refreshValue(),this._change(null,b);return;}if(!arguments.length)return this._values();if(!a.isArray(arguments[0]))return this.options.values&&this.options.values.length?this._values(b):this.value();d=this.options.values,e=arguments[0];for(f=0;f<d.length;f+=1){d[f]=this._trimAlignValue(e[f]),this._change(null,f);}this._refreshValue();},_setOption:function _setOption(b,c){var d,e=0;a.isArray(this.options.values)&&(e=this.options.values.length),a.Widget.prototype._setOption.apply(this,arguments);switch(b){case "disabled":c?(this.handles.filter(".ui-state-focus").blur(),this.handles.removeClass("ui-state-hover"),this.handles.propAttr("disabled",!0),this.element.addClass("ui-disabled")):(this.handles.propAttr("disabled",!1),this.element.removeClass("ui-disabled"));break;case "orientation":this._detectOrientation(),this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-"+this.orientation),this._refreshValue();break;case "value":this._animateOff=!0,this._refreshValue(),this._change(null,0),this._animateOff=!1;break;case "values":this._animateOff=!0,this._refreshValue();for(d=0;d<e;d+=1){this._change(null,d);}this._animateOff=!1;}},_value:function _value(){var a=this.options.value;return a=this._trimAlignValue(a),a;},_values:function _values(a){var b,c,d;if(arguments.length)return b=this.options.values[a],b=this._trimAlignValue(b),b;c=this.options.values.slice();for(d=0;d<c.length;d+=1){c[d]=this._trimAlignValue(c[d]);}return c;},_trimAlignValue:function _trimAlignValue(a){if(a<=this._valueMin())return this._valueMin();if(a>=this._valueMax())return this._valueMax();var b=this.options.step>0?this.options.step:1,c=(a-this._valueMin())%b,d=a-c;return Math.abs(c)*2>=b&&(d+=c>0?b:-b),parseFloat(d.toFixed(5));},_valueMin:function _valueMin(){return this.options.min;},_valueMax:function _valueMax(){return this.options.max;},_refreshValue:function _refreshValue(){var b=this.options.range,c=this.options,d=this,e=this._animateOff?!1:c.animate,f,g={},h,i,j,k;this.options.values&&this.options.values.length?this.handles.each(function(b,i){f=(d.values(b)-d._valueMin())/(d._valueMax()-d._valueMin())*100,g[d.orientation==="horizontal"?"left":"bottom"]=f+"%",a(this).stop(1,1)[e?"animate":"css"](g,c.animate),d.options.range===!0&&(d.orientation==="horizontal"?(b===0&&d.range.stop(1,1)[e?"animate":"css"]({left:f+"%"},c.animate),b===1&&d.range[e?"animate":"css"]({width:f-h+"%"},{queue:!1,duration:c.animate})):(b===0&&d.range.stop(1,1)[e?"animate":"css"]({bottom:f+"%"},c.animate),b===1&&d.range[e?"animate":"css"]({height:f-h+"%"},{queue:!1,duration:c.animate}))),h=f;}):(i=this.value(),j=this._valueMin(),k=this._valueMax(),f=k!==j?(i-j)/(k-j)*100:0,g[d.orientation==="horizontal"?"left":"bottom"]=f+"%",this.handle.stop(1,1)[e?"animate":"css"](g,c.animate),b==="min"&&this.orientation==="horizontal"&&this.range.stop(1,1)[e?"animate":"css"]({width:f+"%"},c.animate),b==="max"&&this.orientation==="horizontal"&&this.range[e?"animate":"css"]({width:100-f+"%"},{queue:!1,duration:c.animate}),b==="min"&&this.orientation==="vertical"&&this.range.stop(1,1)[e?"animate":"css"]({height:f+"%"},c.animate),b==="max"&&this.orientation==="vertical"&&this.range[e?"animate":"css"]({height:100-f+"%"},{queue:!1,duration:c.animate}));}}),a.extend(a.ui.slider,{version:"1.8.23"});})(jQuery);; /*! jQuery UI - v1.8.23 - 2012-08-15
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.tabs.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */(function(a,b){function e(){return ++c;}function f(){return ++d;}var c=0,d=0;a.widget("ui.tabs",{options:{add:null,ajaxOptions:null,cache:!1,cookie:null,collapsible:!1,disable:null,disabled:[],enable:null,event:"click",fx:null,idPrefix:"ui-tabs-",load:null,panelTemplate:"<div></div>",remove:null,select:null,show:null,spinner:"<em>Loading&#8230;</em>",tabTemplate:"<li><a href='#{href}'><span>#{label}</span></a></li>"},_create:function _create(){this._tabify(!0);},_setOption:function _setOption(a,b){if(a=="selected"){if(this.options.collapsible&&b==this.options.selected)return;this.select(b);}else this.options[a]=b,this._tabify();},_tabId:function _tabId(a){return a.title&&a.title.replace(/\s/g,"_").replace(/[^\w\u00c0-\uFFFF-]/g,"")||this.options.idPrefix+e();},_sanitizeSelector:function _sanitizeSelector(a){return a.replace(/:/g,"\\:");},_cookie:function _cookie(){var b=this.cookie||(this.cookie=this.options.cookie.name||"ui-tabs-"+f());return a.cookie.apply(null,[b].concat(a.makeArray(arguments)));},_ui:function _ui(a,b){return {tab:a,panel:b,index:this.anchors.index(a)};},_cleanup:function _cleanup(){this.lis.filter(".ui-state-processing").removeClass("ui-state-processing").find("span:data(label.tabs)").each(function(){var b=a(this);b.html(b.data("label.tabs")).removeData("label.tabs");});},_tabify:function _tabify(c){function m(b,c){b.css("display",""),!a.support.opacity&&c.opacity&&b[0].style.removeAttribute("filter");}var d=this,e=this.options,f=/^#.+/;this.list=this.element.find("ol,ul").eq(0),this.lis=a(" > li:has(a[href])",this.list),this.anchors=this.lis.map(function(){return a("a",this)[0];}),this.panels=a([]),this.anchors.each(function(b,c){var g=a(c).attr("href"),h=g.split("#")[0],i;h&&(h===location.toString().split("#")[0]||(i=a("base")[0])&&h===i.href)&&(g=c.hash,c.href=g);if(f.test(g))d.panels=d.panels.add(d.element.find(d._sanitizeSelector(g)));else if(g&&g!=="#"){a.data(c,"href.tabs",g),a.data(c,"load.tabs",g.replace(/#.*$/,""));var j=d._tabId(c);c.href="#"+j;var k=d.element.find("#"+j);k.length||(k=a(e.panelTemplate).attr("id",j).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").insertAfter(d.panels[b-1]||d.list),k.data("destroy.tabs",!0)),d.panels=d.panels.add(k);}else e.disabled.push(b);}),c?(this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all"),this.list.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"),this.lis.addClass("ui-state-default ui-corner-top"),this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom"),e.selected===b?(location.hash&&this.anchors.each(function(a,b){if(b.hash==location.hash)return e.selected=a,!1;}),typeof e.selected!="number"&&e.cookie&&(e.selected=parseInt(d._cookie(),10)),typeof e.selected!="number"&&this.lis.filter(".ui-tabs-selected").length&&(e.selected=this.lis.index(this.lis.filter(".ui-tabs-selected"))),e.selected=e.selected||(this.lis.length?0:-1)):e.selected===null&&(e.selected=-1),e.selected=e.selected>=0&&this.anchors[e.selected]||e.selected<0?e.selected:0,e.disabled=a.unique(e.disabled.concat(a.map(this.lis.filter(".ui-state-disabled"),function(a,b){return d.lis.index(a);}))).sort(),a.inArray(e.selected,e.disabled)!=-1&&e.disabled.splice(a.inArray(e.selected,e.disabled),1),this.panels.addClass("ui-tabs-hide"),this.lis.removeClass("ui-tabs-selected ui-state-active"),e.selected>=0&&this.anchors.length&&(d.element.find(d._sanitizeSelector(d.anchors[e.selected].hash)).removeClass("ui-tabs-hide"),this.lis.eq(e.selected).addClass("ui-tabs-selected ui-state-active"),d.element.queue("tabs",function(){d._trigger("show",null,d._ui(d.anchors[e.selected],d.element.find(d._sanitizeSelector(d.anchors[e.selected].hash))[0]));}),this.load(e.selected)),a(window).bind("unload",function(){d.lis.add(d.anchors).unbind(".tabs"),d.lis=d.anchors=d.panels=null;})):e.selected=this.lis.index(this.lis.filter(".ui-tabs-selected")),this.element[e.collapsible?"addClass":"removeClass"]("ui-tabs-collapsible"),e.cookie&&this._cookie(e.selected,e.cookie);for(var g=0,h;h=this.lis[g];g++){a(h)[a.inArray(g,e.disabled)!=-1&&!a(h).hasClass("ui-tabs-selected")?"addClass":"removeClass"]("ui-state-disabled");}e.cache===!1&&this.anchors.removeData("cache.tabs"),this.lis.add(this.anchors).unbind(".tabs");if(e.event!=="mouseover"){var i=function i(a,b){b.is(":not(.ui-state-disabled)")&&b.addClass("ui-state-"+a);},j=function j(a,b){b.removeClass("ui-state-"+a);};this.lis.bind("mouseover.tabs",function(){i("hover",a(this));}),this.lis.bind("mouseout.tabs",function(){j("hover",a(this));}),this.anchors.bind("focus.tabs",function(){i("focus",a(this).closest("li"));}),this.anchors.bind("blur.tabs",function(){j("focus",a(this).closest("li"));});}var k,l;e.fx&&(a.isArray(e.fx)?(k=e.fx[0],l=e.fx[1]):k=l=e.fx);var n=l?function(b,c){a(b).closest("li").addClass("ui-tabs-selected ui-state-active"),c.hide().removeClass("ui-tabs-hide").animate(l,l.duration||"normal",function(){m(c,l),d._trigger("show",null,d._ui(b,c[0]));});}:function(b,c){a(b).closest("li").addClass("ui-tabs-selected ui-state-active"),c.removeClass("ui-tabs-hide"),d._trigger("show",null,d._ui(b,c[0]));},o=k?function(a,b){b.animate(k,k.duration||"normal",function(){d.lis.removeClass("ui-tabs-selected ui-state-active"),b.addClass("ui-tabs-hide"),m(b,k),d.element.dequeue("tabs");});}:function(a,b,c){d.lis.removeClass("ui-tabs-selected ui-state-active"),b.addClass("ui-tabs-hide"),d.element.dequeue("tabs");};this.anchors.bind(e.event+".tabs",function(){var b=this,c=a(b).closest("li"),f=d.panels.filter(":not(.ui-tabs-hide)"),g=d.element.find(d._sanitizeSelector(b.hash));if(c.hasClass("ui-tabs-selected")&&!e.collapsible||c.hasClass("ui-state-disabled")||c.hasClass("ui-state-processing")||d.panels.filter(":animated").length||d._trigger("select",null,d._ui(this,g[0]))===!1)return this.blur(),!1;e.selected=d.anchors.index(this),d.abort();if(e.collapsible){if(c.hasClass("ui-tabs-selected"))return e.selected=-1,e.cookie&&d._cookie(e.selected,e.cookie),d.element.queue("tabs",function(){o(b,f);}).dequeue("tabs"),this.blur(),!1;if(!f.length)return e.cookie&&d._cookie(e.selected,e.cookie),d.element.queue("tabs",function(){n(b,g);}),d.load(d.anchors.index(this)),this.blur(),!1;}e.cookie&&d._cookie(e.selected,e.cookie);if(g.length)f.length&&d.element.queue("tabs",function(){o(b,f);}),d.element.queue("tabs",function(){n(b,g);}),d.load(d.anchors.index(this));else throw "jQuery UI Tabs: Mismatching fragment identifier.";a.browser.msie&&this.blur();}),this.anchors.bind("click.tabs",function(){return !1;});},_getIndex:function _getIndex(a){return typeof a=="string"&&(a=this.anchors.index(this.anchors.filter("[href$='"+a+"']"))),a;},destroy:function destroy(){var b=this.options;return this.abort(),this.element.unbind(".tabs").removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible").removeData("tabs"),this.list.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"),this.anchors.each(function(){var b=a.data(this,"href.tabs");b&&(this.href=b);var c=a(this).unbind(".tabs");a.each(["href","load","cache"],function(a,b){c.removeData(b+".tabs");});}),this.lis.unbind(".tabs").add(this.panels).each(function(){a.data(this,"destroy.tabs")?a(this).remove():a(this).removeClass(["ui-state-default","ui-corner-top","ui-tabs-selected","ui-state-active","ui-state-hover","ui-state-focus","ui-state-disabled","ui-tabs-panel","ui-widget-content","ui-corner-bottom","ui-tabs-hide"].join(" "));}),b.cookie&&this._cookie(null,b.cookie),this;},add:function add(c,d,e){e===b&&(e=this.anchors.length);var f=this,g=this.options,h=a(g.tabTemplate.replace(/#\{href\}/g,c).replace(/#\{label\}/g,d)),i=c.indexOf("#")?this._tabId(a("a",h)[0]):c.replace("#","");h.addClass("ui-state-default ui-corner-top").data("destroy.tabs",!0);var j=f.element.find("#"+i);return j.length||(j=a(g.panelTemplate).attr("id",i).data("destroy.tabs",!0)),j.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide"),e>=this.lis.length?(h.appendTo(this.list),j.appendTo(this.list[0].parentNode)):(h.insertBefore(this.lis[e]),j.insertBefore(this.panels[e])),g.disabled=a.map(g.disabled,function(a,b){return a>=e?++a:a;}),this._tabify(),this.anchors.length==1&&(g.selected=0,h.addClass("ui-tabs-selected ui-state-active"),j.removeClass("ui-tabs-hide"),this.element.queue("tabs",function(){f._trigger("show",null,f._ui(f.anchors[0],f.panels[0]));}),this.load(0)),this._trigger("add",null,this._ui(this.anchors[e],this.panels[e])),this;},remove:function remove(b){b=this._getIndex(b);var c=this.options,d=this.lis.eq(b).remove(),e=this.panels.eq(b).remove();return d.hasClass("ui-tabs-selected")&&this.anchors.length>1&&this.select(b+(b+1<this.anchors.length?1:-1)),c.disabled=a.map(a.grep(c.disabled,function(a,c){return a!=b;}),function(a,c){return a>=b?--a:a;}),this._tabify(),this._trigger("remove",null,this._ui(d.find("a")[0],e[0])),this;},enable:function enable(b){b=this._getIndex(b);var c=this.options;if(a.inArray(b,c.disabled)==-1)return;return this.lis.eq(b).removeClass("ui-state-disabled"),c.disabled=a.grep(c.disabled,function(a,c){return a!=b;}),this._trigger("enable",null,this._ui(this.anchors[b],this.panels[b])),this;},disable:function disable(a){a=this._getIndex(a);var b=this,c=this.options;return a!=c.selected&&(this.lis.eq(a).addClass("ui-state-disabled"),c.disabled.push(a),c.disabled.sort(),this._trigger("disable",null,this._ui(this.anchors[a],this.panels[a]))),this;},select:function select(a){a=this._getIndex(a);if(a==-1)if(this.options.collapsible&&this.options.selected!=-1)a=this.options.selected;else return this;return this.anchors.eq(a).trigger(this.options.event+".tabs"),this;},load:function load(b){b=this._getIndex(b);var c=this,d=this.options,e=this.anchors.eq(b)[0],f=a.data(e,"load.tabs");this.abort();if(!f||this.element.queue("tabs").length!==0&&a.data(e,"cache.tabs")){this.element.dequeue("tabs");return;}this.lis.eq(b).addClass("ui-state-processing");if(d.spinner){var g=a("span",e);g.data("label.tabs",g.html()).html(d.spinner);}return this.xhr=a.ajax(a.extend({},d.ajaxOptions,{url:f,success:function success(f,g){c.element.find(c._sanitizeSelector(e.hash)).html(f),c._cleanup(),d.cache&&a.data(e,"cache.tabs",!0),c._trigger("load",null,c._ui(c.anchors[b],c.panels[b]));try{d.ajaxOptions.success(f,g);}catch(h){}},error:function error(a,f,g){c._cleanup(),c._trigger("load",null,c._ui(c.anchors[b],c.panels[b]));try{d.ajaxOptions.error(a,f,b,e);}catch(g){}}})),c.element.dequeue("tabs"),this;},abort:function abort(){return this.element.queue([]),this.panels.stop(!1,!0),this.element.queue("tabs",this.element.queue("tabs").splice(-2,2)),this.xhr&&(this.xhr.abort(),delete this.xhr),this._cleanup(),this;},url:function url(a,b){return this.anchors.eq(a).removeData("cache.tabs").data("load.tabs",b),this;},length:function length(){return this.anchors.length;}}),a.extend(a.ui.tabs,{version:"1.8.23"}),a.extend(a.ui.tabs.prototype,{rotation:null,rotate:function rotate(a,b){var c=this,d=this.options,e=c._rotate||(c._rotate=function(b){clearTimeout(c.rotation),c.rotation=setTimeout(function(){var a=d.selected;c.select(++a<c.anchors.length?a:0);},a),b&&b.stopPropagation();}),f=c._unrotate||(c._unrotate=b?function(a){e();}:function(a){a.clientX&&c.rotate(null);});return a?(this.element.bind("tabsshow",e),this.anchors.bind(d.event+".tabs",f),e()):(clearTimeout(c.rotation),this.element.unbind("tabsshow",e),this.anchors.unbind(d.event+".tabs",f),delete this._rotate,delete this._unrotate),this;}});})(jQuery);; /*! jQuery UI - v1.8.23 - 2012-08-15
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.datepicker.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */(function($,undefined){function Datepicker(){this.debug=!1,this._curInst=null,this._keyEvent=!1,this._disabledInputs=[],this._datepickerShowing=!1,this._inDialog=!1,this._mainDivId="ui-datepicker-div",this._inlineClass="ui-datepicker-inline",this._appendClass="ui-datepicker-append",this._triggerClass="ui-datepicker-trigger",this._dialogClass="ui-datepicker-dialog",this._disableClass="ui-datepicker-disabled",this._unselectableClass="ui-datepicker-unselectable",this._currentClass="ui-datepicker-current-day",this._dayOverClass="ui-datepicker-days-cell-over",this.regional=[],this.regional[""]={closeText:"Done",prevText:"Prev",nextText:"Next",currentText:"Today",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su","Mo","Tu","We","Th","Fr","Sa"],weekHeader:"Wk",dateFormat:"mm/dd/yy",firstDay:0,isRTL:!1,showMonthAfterYear:!1,yearSuffix:""},this._defaults={showOn:"focus",showAnim:"fadeIn",showOptions:{},defaultDate:null,appendText:"",buttonText:"...",buttonImage:"",buttonImageOnly:!1,hideIfNoPrevNext:!1,navigationAsDateFormat:!1,gotoCurrent:!1,changeMonth:!1,changeYear:!1,yearRange:"c-10:c+10",showOtherMonths:!1,selectOtherMonths:!1,showWeek:!1,calculateWeek:this.iso8601Week,shortYearCutoff:"+10",minDate:null,maxDate:null,duration:"fast",beforeShowDay:null,beforeShow:null,onSelect:null,onChangeMonthYear:null,onClose:null,numberOfMonths:1,showCurrentAtPos:0,stepMonths:1,stepBigMonths:12,altField:"",altFormat:"",constrainInput:!0,showButtonPanel:!1,autoSize:!1,disabled:!1},$.extend(this._defaults,this.regional[""]),this.dpDiv=bindHover($('<div id="'+this._mainDivId+'" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'));}function bindHover(a){var b="button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";return a.bind("mouseout",function(a){var c=$(a.target).closest(b);if(!c.length)return;c.removeClass("ui-state-hover ui-datepicker-prev-hover ui-datepicker-next-hover");}).bind("mouseover",function(c){var d=$(c.target).closest(b);if($.datepicker._isDisabledDatepicker(instActive.inline?a.parent()[0]:instActive.input[0])||!d.length)return;d.parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"),d.addClass("ui-state-hover"),d.hasClass("ui-datepicker-prev")&&d.addClass("ui-datepicker-prev-hover"),d.hasClass("ui-datepicker-next")&&d.addClass("ui-datepicker-next-hover");});}function extendRemove(a,b){$.extend(a,b);for(var c in b){if(b[c]==null||b[c]==undefined)a[c]=b[c];}return a;}function isArray(a){return a&&($.browser.safari&&(typeof a==="undefined"?"undefined":_typeof(a))=="object"&&a.length||a.constructor&&a.constructor.toString().match(/\Array\(\)/));}$.extend($.ui,{datepicker:{version:"1.8.23"}});var PROP_NAME="datepicker",dpuuid=new Date().getTime(),instActive;$.extend(Datepicker.prototype,{markerClassName:"hasDatepicker",maxRows:4,log:function log(){this.debug&&console.log.apply("",arguments);},_widgetDatepicker:function _widgetDatepicker(){return this.dpDiv;},setDefaults:function setDefaults(a){return extendRemove(this._defaults,a||{}),this;},_attachDatepicker:function _attachDatepicker(target,settings){var inlineSettings=null;for(var attrName in this._defaults){var attrValue=target.getAttribute("date:"+attrName);if(attrValue){inlineSettings=inlineSettings||{};try{inlineSettings[attrName]=eval(attrValue);}catch(err){inlineSettings[attrName]=attrValue;}}}var nodeName=target.nodeName.toLowerCase(),inline=nodeName=="div"||nodeName=="span";target.id||(this.uuid+=1,target.id="dp"+this.uuid);var inst=this._newInst($(target),inline);inst.settings=$.extend({},settings||{},inlineSettings||{}),nodeName=="input"?this._connectDatepicker(target,inst):inline&&this._inlineDatepicker(target,inst);},_newInst:function _newInst(a,b){var c=a[0].id.replace(/([^A-Za-z0-9_-])/g,"\\\\$1");return {id:c,input:a,selectedDay:0,selectedMonth:0,selectedYear:0,drawMonth:0,drawYear:0,inline:b,dpDiv:b?bindHover($('<div class="'+this._inlineClass+' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')):this.dpDiv};},_connectDatepicker:function _connectDatepicker(a,b){var c=$(a);b.append=$([]),b.trigger=$([]);if(c.hasClass(this.markerClassName))return;this._attachments(c,b),c.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker",function(a,c,d){b.settings[c]=d;}).bind("getData.datepicker",function(a,c){return this._get(b,c);}),this._autoSize(b),$.data(a,PROP_NAME,b),b.settings.disabled&&this._disableDatepicker(a);},_attachments:function _attachments(a,b){var c=this._get(b,"appendText"),d=this._get(b,"isRTL");b.append&&b.append.remove(),c&&(b.append=$('<span class="'+this._appendClass+'">'+c+"</span>"),a[d?"before":"after"](b.append)),a.unbind("focus",this._showDatepicker),b.trigger&&b.trigger.remove();var e=this._get(b,"showOn");(e=="focus"||e=="both")&&a.focus(this._showDatepicker);if(e=="button"||e=="both"){var f=this._get(b,"buttonText"),g=this._get(b,"buttonImage");b.trigger=$(this._get(b,"buttonImageOnly")?$("<img/>").addClass(this._triggerClass).attr({src:g,alt:f,title:f}):$('<button type="button"></button>').addClass(this._triggerClass).html(g==""?f:$("<img/>").attr({src:g,alt:f,title:f}))),a[d?"before":"after"](b.trigger),b.trigger.click(function(){return $.datepicker._datepickerShowing&&$.datepicker._lastInput==a[0]?$.datepicker._hideDatepicker():$.datepicker._datepickerShowing&&$.datepicker._lastInput!=a[0]?($.datepicker._hideDatepicker(),$.datepicker._showDatepicker(a[0])):$.datepicker._showDatepicker(a[0]),!1;});}},_autoSize:function _autoSize(a){if(this._get(a,"autoSize")&&!a.inline){var b=new Date(2009,11,20),c=this._get(a,"dateFormat");if(c.match(/[DM]/)){var d=function d(a){var b=0,c=0;for(var d=0;d<a.length;d++){a[d].length>b&&(b=a[d].length,c=d);}return c;};b.setMonth(d(this._get(a,c.match(/MM/)?"monthNames":"monthNamesShort"))),b.setDate(d(this._get(a,c.match(/DD/)?"dayNames":"dayNamesShort"))+20-b.getDay());}a.input.attr("size",this._formatDate(a,b).length);}},_inlineDatepicker:function _inlineDatepicker(a,b){var c=$(a);if(c.hasClass(this.markerClassName))return;c.addClass(this.markerClassName).append(b.dpDiv).bind("setData.datepicker",function(a,c,d){b.settings[c]=d;}).bind("getData.datepicker",function(a,c){return this._get(b,c);}),$.data(a,PROP_NAME,b),this._setDate(b,this._getDefaultDate(b),!0),this._updateDatepicker(b),this._updateAlternate(b),b.settings.disabled&&this._disableDatepicker(a),b.dpDiv.css("display","block");},_dialogDatepicker:function _dialogDatepicker(a,b,c,d,e){var f=this._dialogInst;if(!f){this.uuid+=1;var g="dp"+this.uuid;this._dialogInput=$('<input type="text" id="'+g+'" style="position: absolute; top: -100px; width: 0px;"/>'),this._dialogInput.keydown(this._doKeyDown),$("body").append(this._dialogInput),f=this._dialogInst=this._newInst(this._dialogInput,!1),f.settings={},$.data(this._dialogInput[0],PROP_NAME,f);}extendRemove(f.settings,d||{}),b=b&&b.constructor==Date?this._formatDate(f,b):b,this._dialogInput.val(b),this._pos=e?e.length?e:[e.pageX,e.pageY]:null;if(!this._pos){var h=document.documentElement.clientWidth,i=document.documentElement.clientHeight,j=document.documentElement.scrollLeft||document.body.scrollLeft,k=document.documentElement.scrollTop||document.body.scrollTop;this._pos=[h/2-100+j,i/2-150+k];}return this._dialogInput.css("left",this._pos[0]+20+"px").css("top",this._pos[1]+"px"),f.settings.onSelect=c,this._inDialog=!0,this.dpDiv.addClass(this._dialogClass),this._showDatepicker(this._dialogInput[0]),$.blockUI&&$.blockUI(this.dpDiv),$.data(this._dialogInput[0],PROP_NAME,f),this;},_destroyDatepicker:function _destroyDatepicker(a){var b=$(a),c=$.data(a,PROP_NAME);if(!b.hasClass(this.markerClassName))return;var d=a.nodeName.toLowerCase();$.removeData(a,PROP_NAME),d=="input"?(c.append.remove(),c.trigger.remove(),b.removeClass(this.markerClassName).unbind("focus",this._showDatepicker).unbind("keydown",this._doKeyDown).unbind("keypress",this._doKeyPress).unbind("keyup",this._doKeyUp)):(d=="div"||d=="span")&&b.removeClass(this.markerClassName).empty();},_enableDatepicker:function _enableDatepicker(a){var b=$(a),c=$.data(a,PROP_NAME);if(!b.hasClass(this.markerClassName))return;var d=a.nodeName.toLowerCase();if(d=="input")a.disabled=!1,c.trigger.filter("button").each(function(){this.disabled=!1;}).end().filter("img").css({opacity:"1.0",cursor:""});else if(d=="div"||d=="span"){var e=b.children("."+this._inlineClass);e.children().removeClass("ui-state-disabled"),e.find("select.ui-datepicker-month, select.ui-datepicker-year").removeAttr("disabled");}this._disabledInputs=$.map(this._disabledInputs,function(b){return b==a?null:b;});},_disableDatepicker:function _disableDatepicker(a){var b=$(a),c=$.data(a,PROP_NAME);if(!b.hasClass(this.markerClassName))return;var d=a.nodeName.toLowerCase();if(d=="input")a.disabled=!0,c.trigger.filter("button").each(function(){this.disabled=!0;}).end().filter("img").css({opacity:"0.5",cursor:"default"});else if(d=="div"||d=="span"){var e=b.children("."+this._inlineClass);e.children().addClass("ui-state-disabled"),e.find("select.ui-datepicker-month, select.ui-datepicker-year").attr("disabled","disabled");}this._disabledInputs=$.map(this._disabledInputs,function(b){return b==a?null:b;}),this._disabledInputs[this._disabledInputs.length]=a;},_isDisabledDatepicker:function _isDisabledDatepicker(a){if(!a)return !1;for(var b=0;b<this._disabledInputs.length;b++){if(this._disabledInputs[b]==a)return !0;}return !1;},_getInst:function _getInst(a){try{return $.data(a,PROP_NAME);}catch(b){throw "Missing instance data for this datepicker";}},_optionDatepicker:function _optionDatepicker(a,b,c){var d=this._getInst(a);if(arguments.length==2&&typeof b=="string")return b=="defaults"?$.extend({},$.datepicker._defaults):d?b=="all"?$.extend({},d.settings):this._get(d,b):null;var e=b||{};typeof b=="string"&&(e={},e[b]=c);if(d){this._curInst==d&&this._hideDatepicker();var f=this._getDateDatepicker(a,!0),g=this._getMinMaxDate(d,"min"),h=this._getMinMaxDate(d,"max");extendRemove(d.settings,e),g!==null&&e.dateFormat!==undefined&&e.minDate===undefined&&(d.settings.minDate=this._formatDate(d,g)),h!==null&&e.dateFormat!==undefined&&e.maxDate===undefined&&(d.settings.maxDate=this._formatDate(d,h)),this._attachments($(a),d),this._autoSize(d),this._setDate(d,f),this._updateAlternate(d),this._updateDatepicker(d);}},_changeDatepicker:function _changeDatepicker(a,b,c){this._optionDatepicker(a,b,c);},_refreshDatepicker:function _refreshDatepicker(a){var b=this._getInst(a);b&&this._updateDatepicker(b);},_setDateDatepicker:function _setDateDatepicker(a,b){var c=this._getInst(a);c&&(this._setDate(c,b),this._updateDatepicker(c),this._updateAlternate(c));},_getDateDatepicker:function _getDateDatepicker(a,b){var c=this._getInst(a);return c&&!c.inline&&this._setDateFromField(c,b),c?this._getDate(c):null;},_doKeyDown:function _doKeyDown(a){var b=$.datepicker._getInst(a.target),c=!0,d=b.dpDiv.is(".ui-datepicker-rtl");b._keyEvent=!0;if($.datepicker._datepickerShowing)switch(a.keyCode){case 9:$.datepicker._hideDatepicker(),c=!1;break;case 13:var e=$("td."+$.datepicker._dayOverClass+":not(."+$.datepicker._currentClass+")",b.dpDiv);e[0]&&$.datepicker._selectDay(a.target,b.selectedMonth,b.selectedYear,e[0]);var f=$.datepicker._get(b,"onSelect");if(f){var g=$.datepicker._formatDate(b);f.apply(b.input?b.input[0]:null,[g,b]);}else $.datepicker._hideDatepicker();return !1;case 27:$.datepicker._hideDatepicker();break;case 33:$.datepicker._adjustDate(a.target,a.ctrlKey?-$.datepicker._get(b,"stepBigMonths"):-$.datepicker._get(b,"stepMonths"),"M");break;case 34:$.datepicker._adjustDate(a.target,a.ctrlKey?+$.datepicker._get(b,"stepBigMonths"):+$.datepicker._get(b,"stepMonths"),"M");break;case 35:(a.ctrlKey||a.metaKey)&&$.datepicker._clearDate(a.target),c=a.ctrlKey||a.metaKey;break;case 36:(a.ctrlKey||a.metaKey)&&$.datepicker._gotoToday(a.target),c=a.ctrlKey||a.metaKey;break;case 37:(a.ctrlKey||a.metaKey)&&$.datepicker._adjustDate(a.target,d?1:-1,"D"),c=a.ctrlKey||a.metaKey,a.originalEvent.altKey&&$.datepicker._adjustDate(a.target,a.ctrlKey?-$.datepicker._get(b,"stepBigMonths"):-$.datepicker._get(b,"stepMonths"),"M");break;case 38:(a.ctrlKey||a.metaKey)&&$.datepicker._adjustDate(a.target,-7,"D"),c=a.ctrlKey||a.metaKey;break;case 39:(a.ctrlKey||a.metaKey)&&$.datepicker._adjustDate(a.target,d?-1:1,"D"),c=a.ctrlKey||a.metaKey,a.originalEvent.altKey&&$.datepicker._adjustDate(a.target,a.ctrlKey?+$.datepicker._get(b,"stepBigMonths"):+$.datepicker._get(b,"stepMonths"),"M");break;case 40:(a.ctrlKey||a.metaKey)&&$.datepicker._adjustDate(a.target,7,"D"),c=a.ctrlKey||a.metaKey;break;default:c=!1;}else a.keyCode==36&&a.ctrlKey?$.datepicker._showDatepicker(this):c=!1;c&&(a.preventDefault(),a.stopPropagation());},_doKeyPress:function _doKeyPress(a){var b=$.datepicker._getInst(a.target);if($.datepicker._get(b,"constrainInput")){var c=$.datepicker._possibleChars($.datepicker._get(b,"dateFormat")),d=String.fromCharCode(a.charCode==undefined?a.keyCode:a.charCode);return a.ctrlKey||a.metaKey||d<" "||!c||c.indexOf(d)>-1;}},_doKeyUp:function _doKeyUp(a){var b=$.datepicker._getInst(a.target);if(b.input.val()!=b.lastVal)try{var c=$.datepicker.parseDate($.datepicker._get(b,"dateFormat"),b.input?b.input.val():null,$.datepicker._getFormatConfig(b));c&&($.datepicker._setDateFromField(b),$.datepicker._updateAlternate(b),$.datepicker._updateDatepicker(b));}catch(d){$.datepicker.log(d);}return !0;},_showDatepicker:function _showDatepicker(a){a=a.target||a,a.nodeName.toLowerCase()!="input"&&(a=$("input",a.parentNode)[0]);if($.datepicker._isDisabledDatepicker(a)||$.datepicker._lastInput==a)return;var b=$.datepicker._getInst(a);$.datepicker._curInst&&$.datepicker._curInst!=b&&($.datepicker._curInst.dpDiv.stop(!0,!0),b&&$.datepicker._datepickerShowing&&$.datepicker._hideDatepicker($.datepicker._curInst.input[0]));var c=$.datepicker._get(b,"beforeShow"),d=c?c.apply(a,[a,b]):{};if(d===!1)return;extendRemove(b.settings,d),b.lastVal=null,$.datepicker._lastInput=a,$.datepicker._setDateFromField(b),$.datepicker._inDialog&&(a.value=""),$.datepicker._pos||($.datepicker._pos=$.datepicker._findPos(a),$.datepicker._pos[1]+=a.offsetHeight);var e=!1;$(a).parents().each(function(){return e|=$(this).css("position")=="fixed",!e;}),e&&$.browser.opera&&($.datepicker._pos[0]-=document.documentElement.scrollLeft,$.datepicker._pos[1]-=document.documentElement.scrollTop);var f={left:$.datepicker._pos[0],top:$.datepicker._pos[1]};$.datepicker._pos=null,b.dpDiv.empty(),b.dpDiv.css({position:"absolute",display:"block",top:"-1000px"}),$.datepicker._updateDatepicker(b),f=$.datepicker._checkOffset(b,f,e),b.dpDiv.css({position:$.datepicker._inDialog&&$.blockUI?"static":e?"fixed":"absolute",display:"none",left:f.left+"px",top:f.top+"px"});if(!b.inline){var g=$.datepicker._get(b,"showAnim"),h=$.datepicker._get(b,"duration"),i=function i(){var a=b.dpDiv.find("iframe.ui-datepicker-cover");if(!!a.length){var c=$.datepicker._getBorders(b.dpDiv);a.css({left:-c[0],top:-c[1],width:b.dpDiv.outerWidth(),height:b.dpDiv.outerHeight()});}};b.dpDiv.zIndex($(a).zIndex()+1),$.datepicker._datepickerShowing=!0,$.effects&&$.effects[g]?b.dpDiv.show(g,$.datepicker._get(b,"showOptions"),h,i):b.dpDiv[g||"show"](g?h:null,i),(!g||!h)&&i(),b.input.is(":visible")&&!b.input.is(":disabled")&&b.input.focus(),$.datepicker._curInst=b;}},_updateDatepicker:function _updateDatepicker(a){var b=this;b.maxRows=4;var c=$.datepicker._getBorders(a.dpDiv);instActive=a,a.dpDiv.empty().append(this._generateHTML(a)),this._attachHandlers(a);var d=a.dpDiv.find("iframe.ui-datepicker-cover");!d.length||d.css({left:-c[0],top:-c[1],width:a.dpDiv.outerWidth(),height:a.dpDiv.outerHeight()}),a.dpDiv.find("."+this._dayOverClass+" a").mouseover();var e=this._getNumberOfMonths(a),f=e[1],g=17;a.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""),f>1&&a.dpDiv.addClass("ui-datepicker-multi-"+f).css("width",g*f+"em"),a.dpDiv[(e[0]!=1||e[1]!=1?"add":"remove")+"Class"]("ui-datepicker-multi"),a.dpDiv[(this._get(a,"isRTL")?"add":"remove")+"Class"]("ui-datepicker-rtl"),a==$.datepicker._curInst&&$.datepicker._datepickerShowing&&a.input&&a.input.is(":visible")&&!a.input.is(":disabled")&&a.input[0]!=document.activeElement&&a.input.focus();if(a.yearshtml){var h=a.yearshtml;setTimeout(function(){h===a.yearshtml&&a.yearshtml&&a.dpDiv.find("select.ui-datepicker-year:first").replaceWith(a.yearshtml),h=a.yearshtml=null;},0);}},_getBorders:function _getBorders(a){var b=function b(a){return {thin:1,medium:2,thick:3}[a]||a;};return [parseFloat(b(a.css("border-left-width"))),parseFloat(b(a.css("border-top-width")))];},_checkOffset:function _checkOffset(a,b,c){var d=a.dpDiv.outerWidth(),e=a.dpDiv.outerHeight(),f=a.input?a.input.outerWidth():0,g=a.input?a.input.outerHeight():0,h=document.documentElement.clientWidth+(c?0:$(document).scrollLeft()),i=document.documentElement.clientHeight+(c?0:$(document).scrollTop());return b.left-=this._get(a,"isRTL")?d-f:0,b.left-=c&&b.left==a.input.offset().left?$(document).scrollLeft():0,b.top-=c&&b.top==a.input.offset().top+g?$(document).scrollTop():0,b.left-=Math.min(b.left,b.left+d>h&&h>d?Math.abs(b.left+d-h):0),b.top-=Math.min(b.top,b.top+e>i&&i>e?Math.abs(e+g):0),b;},_findPos:function _findPos(a){var b=this._getInst(a),c=this._get(b,"isRTL");while(a&&(a.type=="hidden"||a.nodeType!=1||$.expr.filters.hidden(a))){a=a[c?"previousSibling":"nextSibling"];}var d=$(a).offset();return [d.left,d.top];},_hideDatepicker:function _hideDatepicker(a){var b=this._curInst;if(!b||a&&b!=$.data(a,PROP_NAME))return;if(this._datepickerShowing){var c=this._get(b,"showAnim"),d=this._get(b,"duration"),e=function e(){$.datepicker._tidyDialog(b);};$.effects&&$.effects[c]?b.dpDiv.hide(c,$.datepicker._get(b,"showOptions"),d,e):b.dpDiv[c=="slideDown"?"slideUp":c=="fadeIn"?"fadeOut":"hide"](c?d:null,e),c||e(),this._datepickerShowing=!1;var f=this._get(b,"onClose");f&&f.apply(b.input?b.input[0]:null,[b.input?b.input.val():"",b]),this._lastInput=null,this._inDialog&&(this._dialogInput.css({position:"absolute",left:"0",top:"-100px"}),$.blockUI&&($.unblockUI(),$("body").append(this.dpDiv))),this._inDialog=!1;}},_tidyDialog:function _tidyDialog(a){a.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar");},_checkExternalClick:function _checkExternalClick(a){if(!$.datepicker._curInst)return;var b=$(a.target),c=$.datepicker._getInst(b[0]);(b[0].id!=$.datepicker._mainDivId&&b.parents("#"+$.datepicker._mainDivId).length==0&&!b.hasClass($.datepicker.markerClassName)&&!b.closest("."+$.datepicker._triggerClass).length&&$.datepicker._datepickerShowing&&(!$.datepicker._inDialog||!$.blockUI)||b.hasClass($.datepicker.markerClassName)&&$.datepicker._curInst!=c)&&$.datepicker._hideDatepicker();},_adjustDate:function _adjustDate(a,b,c){var d=$(a),e=this._getInst(d[0]);if(this._isDisabledDatepicker(d[0]))return;this._adjustInstDate(e,b+(c=="M"?this._get(e,"showCurrentAtPos"):0),c),this._updateDatepicker(e);},_gotoToday:function _gotoToday(a){var b=$(a),c=this._getInst(b[0]);if(this._get(c,"gotoCurrent")&&c.currentDay)c.selectedDay=c.currentDay,c.drawMonth=c.selectedMonth=c.currentMonth,c.drawYear=c.selectedYear=c.currentYear;else {var d=new Date();c.selectedDay=d.getDate(),c.drawMonth=c.selectedMonth=d.getMonth(),c.drawYear=c.selectedYear=d.getFullYear();}this._notifyChange(c),this._adjustDate(b);},_selectMonthYear:function _selectMonthYear(a,b,c){var d=$(a),e=this._getInst(d[0]);e["selected"+(c=="M"?"Month":"Year")]=e["draw"+(c=="M"?"Month":"Year")]=parseInt(b.options[b.selectedIndex].value,10),this._notifyChange(e),this._adjustDate(d);},_selectDay:function _selectDay(a,b,c,d){var e=$(a);if($(d).hasClass(this._unselectableClass)||this._isDisabledDatepicker(e[0]))return;var f=this._getInst(e[0]);f.selectedDay=f.currentDay=$("a",d).html(),f.selectedMonth=f.currentMonth=b,f.selectedYear=f.currentYear=c,this._selectDate(a,this._formatDate(f,f.currentDay,f.currentMonth,f.currentYear));},_clearDate:function _clearDate(a){var b=$(a),c=this._getInst(b[0]);this._selectDate(b,"");},_selectDate:function _selectDate(a,b){var c=$(a),d=this._getInst(c[0]);b=b!=null?b:this._formatDate(d),d.input&&d.input.val(b),this._updateAlternate(d);var e=this._get(d,"onSelect");e?e.apply(d.input?d.input[0]:null,[b,d]):d.input&&d.input.trigger("change"),d.inline?this._updateDatepicker(d):(this._hideDatepicker(),this._lastInput=d.input[0],_typeof(d.input[0])!="object"&&d.input.focus(),this._lastInput=null);},_updateAlternate:function _updateAlternate(a){var b=this._get(a,"altField");if(b){var c=this._get(a,"altFormat")||this._get(a,"dateFormat"),d=this._getDate(a),e=this.formatDate(c,d,this._getFormatConfig(a));$(b).each(function(){$(this).val(e);});}},noWeekends:function noWeekends(a){var b=a.getDay();return [b>0&&b<6,""];},iso8601Week:function iso8601Week(a){var b=new Date(a.getTime());b.setDate(b.getDate()+4-(b.getDay()||7));var c=b.getTime();return b.setMonth(0),b.setDate(1),Math.floor(Math.round((c-b)/864e5)/7)+1;},parseDate:function parseDate(a,b,c){if(a==null||b==null)throw "Invalid arguments";b=(typeof b==="undefined"?"undefined":_typeof(b))=="object"?b.toString():b+"";if(b=="")return null;var d=(c?c.shortYearCutoff:null)||this._defaults.shortYearCutoff;d=typeof d!="string"?d:new Date().getFullYear()%100+parseInt(d,10);var e=(c?c.dayNamesShort:null)||this._defaults.dayNamesShort,f=(c?c.dayNames:null)||this._defaults.dayNames,g=(c?c.monthNamesShort:null)||this._defaults.monthNamesShort,h=(c?c.monthNames:null)||this._defaults.monthNames,i=-1,j=-1,k=-1,l=-1,m=!1,n=function n(b){var c=s+1<a.length&&a.charAt(s+1)==b;return c&&s++,c;},o=function o(a){var c=n(a),d=a=="@"?14:a=="!"?20:a=="y"&&c?4:a=="o"?3:2,e=new RegExp("^\\d{1,"+d+"}"),f=b.substring(r).match(e);if(!f)throw "Missing number at position "+r;return r+=f[0].length,parseInt(f[0],10);},p=function p(a,c,d){var e=$.map(n(a)?d:c,function(a,b){return [[b,a]];}).sort(function(a,b){return -(a[1].length-b[1].length);}),f=-1;$.each(e,function(a,c){var d=c[1];if(b.substr(r,d.length).toLowerCase()==d.toLowerCase())return f=c[0],r+=d.length,!1;});if(f!=-1)return f+1;throw "Unknown name at position "+r;},q=function q(){if(b.charAt(r)!=a.charAt(s))throw "Unexpected literal at position "+r;r++;},r=0;for(var s=0;s<a.length;s++){if(m)a.charAt(s)=="'"&&!n("'")?m=!1:q();else switch(a.charAt(s)){case "d":k=o("d");break;case "D":p("D",e,f);break;case "o":l=o("o");break;case "m":j=o("m");break;case "M":j=p("M",g,h);break;case "y":i=o("y");break;case "@":var t=new Date(o("@"));i=t.getFullYear(),j=t.getMonth()+1,k=t.getDate();break;case "!":var t=new Date((o("!")-this._ticksTo1970)/1e4);i=t.getFullYear(),j=t.getMonth()+1,k=t.getDate();break;case "'":n("'")?q():m=!0;break;default:q();}}if(r<b.length)throw "Extra/unparsed characters found in date: "+b.substring(r);i==-1?i=new Date().getFullYear():i<100&&(i+=new Date().getFullYear()-new Date().getFullYear()%100+(i<=d?0:-100));if(l>-1){j=1,k=l;do {var u=this._getDaysInMonth(i,j-1);if(k<=u)break;j++,k-=u;}while(!0);}var t=this._daylightSavingAdjust(new Date(i,j-1,k));if(t.getFullYear()!=i||t.getMonth()+1!=j||t.getDate()!=k)throw "Invalid date";return t;},ATOM:"yy-mm-dd",COOKIE:"D, dd M yy",ISO_8601:"yy-mm-dd",RFC_822:"D, d M y",RFC_850:"DD, dd-M-y",RFC_1036:"D, d M y",RFC_1123:"D, d M yy",RFC_2822:"D, d M yy",RSS:"D, d M y",TICKS:"!",TIMESTAMP:"@",W3C:"yy-mm-dd",_ticksTo1970:(718685+Math.floor(492.5)-Math.floor(19.7)+Math.floor(4.925))*24*60*60*1e7,formatDate:function formatDate(a,b,c){if(!b)return "";var d=(c?c.dayNamesShort:null)||this._defaults.dayNamesShort,e=(c?c.dayNames:null)||this._defaults.dayNames,f=(c?c.monthNamesShort:null)||this._defaults.monthNamesShort,g=(c?c.monthNames:null)||this._defaults.monthNames,h=function h(b){var c=m+1<a.length&&a.charAt(m+1)==b;return c&&m++,c;},i=function i(a,b,c){var d=""+b;if(h(a))while(d.length<c){d="0"+d;}return d;},j=function j(a,b,c,d){return h(a)?d[b]:c[b];},k="",l=!1;if(b)for(var m=0;m<a.length;m++){if(l)a.charAt(m)=="'"&&!h("'")?l=!1:k+=a.charAt(m);else switch(a.charAt(m)){case "d":k+=i("d",b.getDate(),2);break;case "D":k+=j("D",b.getDay(),d,e);break;case "o":k+=i("o",Math.round((new Date(b.getFullYear(),b.getMonth(),b.getDate()).getTime()-new Date(b.getFullYear(),0,0).getTime())/864e5),3);break;case "m":k+=i("m",b.getMonth()+1,2);break;case "M":k+=j("M",b.getMonth(),f,g);break;case "y":k+=h("y")?b.getFullYear():(b.getYear()%100<10?"0":"")+b.getYear()%100;break;case "@":k+=b.getTime();break;case "!":k+=b.getTime()*1e4+this._ticksTo1970;break;case "'":h("'")?k+="'":l=!0;break;default:k+=a.charAt(m);}}return k;},_possibleChars:function _possibleChars(a){var b="",c=!1,d=function d(b){var c=e+1<a.length&&a.charAt(e+1)==b;return c&&e++,c;};for(var e=0;e<a.length;e++){if(c)a.charAt(e)=="'"&&!d("'")?c=!1:b+=a.charAt(e);else switch(a.charAt(e)){case "d":case "m":case "y":case "@":b+="0123456789";break;case "D":case "M":return null;case "'":d("'")?b+="'":c=!0;break;default:b+=a.charAt(e);}}return b;},_get:function _get(a,b){return a.settings[b]!==undefined?a.settings[b]:this._defaults[b];},_setDateFromField:function _setDateFromField(a,b){if(a.input.val()==a.lastVal)return;var c=this._get(a,"dateFormat"),d=a.lastVal=a.input?a.input.val():null,e,f;e=f=this._getDefaultDate(a);var g=this._getFormatConfig(a);try{e=this.parseDate(c,d,g)||f;}catch(h){this.log(h),d=b?"":d;}a.selectedDay=e.getDate(),a.drawMonth=a.selectedMonth=e.getMonth(),a.drawYear=a.selectedYear=e.getFullYear(),a.currentDay=d?e.getDate():0,a.currentMonth=d?e.getMonth():0,a.currentYear=d?e.getFullYear():0,this._adjustInstDate(a);},_getDefaultDate:function _getDefaultDate(a){return this._restrictMinMax(a,this._determineDate(a,this._get(a,"defaultDate"),new Date()));},_determineDate:function _determineDate(a,b,c){var d=function d(a){var b=new Date();return b.setDate(b.getDate()+a),b;},e=function e(b){try{return $.datepicker.parseDate($.datepicker._get(a,"dateFormat"),b,$.datepicker._getFormatConfig(a));}catch(c){}var d=(b.toLowerCase().match(/^c/)?$.datepicker._getDate(a):null)||new Date(),e=d.getFullYear(),f=d.getMonth(),g=d.getDate(),h=/([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,i=h.exec(b);while(i){switch(i[2]||"d"){case "d":case "D":g+=parseInt(i[1],10);break;case "w":case "W":g+=parseInt(i[1],10)*7;break;case "m":case "M":f+=parseInt(i[1],10),g=Math.min(g,$.datepicker._getDaysInMonth(e,f));break;case "y":case "Y":e+=parseInt(i[1],10),g=Math.min(g,$.datepicker._getDaysInMonth(e,f));}i=h.exec(b);}return new Date(e,f,g);},f=b==null||b===""?c:typeof b=="string"?e(b):typeof b=="number"?isNaN(b)?c:d(b):new Date(b.getTime());return f=f&&f.toString()=="Invalid Date"?c:f,f&&(f.setHours(0),f.setMinutes(0),f.setSeconds(0),f.setMilliseconds(0)),this._daylightSavingAdjust(f);},_daylightSavingAdjust:function _daylightSavingAdjust(a){return a?(a.setHours(a.getHours()>12?a.getHours()+2:0),a):null;},_setDate:function _setDate(a,b,c){var d=!b,e=a.selectedMonth,f=a.selectedYear,g=this._restrictMinMax(a,this._determineDate(a,b,new Date()));a.selectedDay=a.currentDay=g.getDate(),a.drawMonth=a.selectedMonth=a.currentMonth=g.getMonth(),a.drawYear=a.selectedYear=a.currentYear=g.getFullYear(),(e!=a.selectedMonth||f!=a.selectedYear)&&!c&&this._notifyChange(a),this._adjustInstDate(a),a.input&&a.input.val(d?"":this._formatDate(a));},_getDate:function _getDate(a){var b=!a.currentYear||a.input&&a.input.val()==""?null:this._daylightSavingAdjust(new Date(a.currentYear,a.currentMonth,a.currentDay));return b;},_attachHandlers:function _attachHandlers(a){var b=this._get(a,"stepMonths"),c="#"+a.id.replace(/\\\\/g,"\\");a.dpDiv.find("[data-handler]").map(function(){var a={prev:function prev(){window["DP_jQuery_"+dpuuid].datepicker._adjustDate(c,-b,"M");},next:function next(){window["DP_jQuery_"+dpuuid].datepicker._adjustDate(c,+b,"M");},hide:function hide(){window["DP_jQuery_"+dpuuid].datepicker._hideDatepicker();},today:function today(){window["DP_jQuery_"+dpuuid].datepicker._gotoToday(c);},selectDay:function selectDay(){return window["DP_jQuery_"+dpuuid].datepicker._selectDay(c,+this.getAttribute("data-month"),+this.getAttribute("data-year"),this),!1;},selectMonth:function selectMonth(){return window["DP_jQuery_"+dpuuid].datepicker._selectMonthYear(c,this,"M"),!1;},selectYear:function selectYear(){return window["DP_jQuery_"+dpuuid].datepicker._selectMonthYear(c,this,"Y"),!1;}};$(this).bind(this.getAttribute("data-event"),a[this.getAttribute("data-handler")]);});},_generateHTML:function _generateHTML(a){var b=new Date();b=this._daylightSavingAdjust(new Date(b.getFullYear(),b.getMonth(),b.getDate()));var c=this._get(a,"isRTL"),d=this._get(a,"showButtonPanel"),e=this._get(a,"hideIfNoPrevNext"),f=this._get(a,"navigationAsDateFormat"),g=this._getNumberOfMonths(a),h=this._get(a,"showCurrentAtPos"),i=this._get(a,"stepMonths"),j=g[0]!=1||g[1]!=1,k=this._daylightSavingAdjust(a.currentDay?new Date(a.currentYear,a.currentMonth,a.currentDay):new Date(9999,9,9)),l=this._getMinMaxDate(a,"min"),m=this._getMinMaxDate(a,"max"),n=a.drawMonth-h,o=a.drawYear;n<0&&(n+=12,o--);if(m){var p=this._daylightSavingAdjust(new Date(m.getFullYear(),m.getMonth()-g[0]*g[1]+1,m.getDate()));p=l&&p<l?l:p;while(this._daylightSavingAdjust(new Date(o,n,1))>p){n--,n<0&&(n=11,o--);}}a.drawMonth=n,a.drawYear=o;var q=this._get(a,"prevText");q=f?this.formatDate(q,this._daylightSavingAdjust(new Date(o,n-i,1)),this._getFormatConfig(a)):q;var r=this._canAdjustMonth(a,-1,o,n)?'<a class="ui-datepicker-prev ui-corner-all" data-handler="prev" data-event="click" title="'+q+'"><span class="ui-icon ui-icon-circle-triangle-'+(c?"e":"w")+'">'+q+"</span></a>":e?"":'<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="'+q+'"><span class="ui-icon ui-icon-circle-triangle-'+(c?"e":"w")+'">'+q+"</span></a>",s=this._get(a,"nextText");s=f?this.formatDate(s,this._daylightSavingAdjust(new Date(o,n+i,1)),this._getFormatConfig(a)):s;var t=this._canAdjustMonth(a,1,o,n)?'<a class="ui-datepicker-next ui-corner-all" data-handler="next" data-event="click" title="'+s+'"><span class="ui-icon ui-icon-circle-triangle-'+(c?"w":"e")+'">'+s+"</span></a>":e?"":'<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="'+s+'"><span class="ui-icon ui-icon-circle-triangle-'+(c?"w":"e")+'">'+s+"</span></a>",u=this._get(a,"currentText"),v=this._get(a,"gotoCurrent")&&a.currentDay?k:b;u=f?this.formatDate(u,v,this._getFormatConfig(a)):u;var w=a.inline?"":'<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" data-handler="hide" data-event="click">'+this._get(a,"closeText")+"</button>",x=d?'<div class="ui-datepicker-buttonpane ui-widget-content">'+(c?w:"")+(this._isInRange(a,v)?'<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" data-handler="today" data-event="click">'+u+"</button>":"")+(c?"":w)+"</div>":"",y=parseInt(this._get(a,"firstDay"),10);y=isNaN(y)?0:y;var z=this._get(a,"showWeek"),A=this._get(a,"dayNames"),B=this._get(a,"dayNamesShort"),C=this._get(a,"dayNamesMin"),D=this._get(a,"monthNames"),E=this._get(a,"monthNamesShort"),F=this._get(a,"beforeShowDay"),G=this._get(a,"showOtherMonths"),H=this._get(a,"selectOtherMonths"),I=this._get(a,"calculateWeek")||this.iso8601Week,J=this._getDefaultDate(a),K="";for(var L=0;L<g[0];L++){var M="";this.maxRows=4;for(var N=0;N<g[1];N++){var O=this._daylightSavingAdjust(new Date(o,n,a.selectedDay)),P=" ui-corner-all",Q="";if(j){Q+='<div class="ui-datepicker-group';if(g[1]>1)switch(N){case 0:Q+=" ui-datepicker-group-first",P=" ui-corner-"+(c?"right":"left");break;case g[1]-1:Q+=" ui-datepicker-group-last",P=" ui-corner-"+(c?"left":"right");break;default:Q+=" ui-datepicker-group-middle",P="";}Q+='">';}Q+='<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix'+P+'">'+(/all|left/.test(P)&&L==0?c?t:r:"")+(/all|right/.test(P)&&L==0?c?r:t:"")+this._generateMonthYearHeader(a,n,o,l,m,L>0||N>0,D,E)+'</div><table class="ui-datepicker-calendar"><thead>'+"<tr>";var R=z?'<th class="ui-datepicker-week-col">'+this._get(a,"weekHeader")+"</th>":"";for(var S=0;S<7;S++){var T=(S+y)%7;R+="<th"+((S+y+6)%7>=5?' class="ui-datepicker-week-end"':"")+">"+'<span title="'+A[T]+'">'+C[T]+"</span></th>";}Q+=R+"</tr></thead><tbody>";var U=this._getDaysInMonth(o,n);o==a.selectedYear&&n==a.selectedMonth&&(a.selectedDay=Math.min(a.selectedDay,U));var V=(this._getFirstDayOfMonth(o,n)-y+7)%7,W=Math.ceil((V+U)/7),X=j?this.maxRows>W?this.maxRows:W:W;this.maxRows=X;var Y=this._daylightSavingAdjust(new Date(o,n,1-V));for(var Z=0;Z<X;Z++){Q+="<tr>";var _=z?'<td class="ui-datepicker-week-col">'+this._get(a,"calculateWeek")(Y)+"</td>":"";for(var S=0;S<7;S++){var ba=F?F.apply(a.input?a.input[0]:null,[Y]):[!0,""],bb=Y.getMonth()!=n,bc=bb&&!H||!ba[0]||l&&Y<l||m&&Y>m;_+='<td class="'+((S+y+6)%7>=5?" ui-datepicker-week-end":"")+(bb?" ui-datepicker-other-month":"")+(Y.getTime()==O.getTime()&&n==a.selectedMonth&&a._keyEvent||J.getTime()==Y.getTime()&&J.getTime()==O.getTime()?" "+this._dayOverClass:"")+(bc?" "+this._unselectableClass+" ui-state-disabled":"")+(bb&&!G?"":" "+ba[1]+(Y.getTime()==k.getTime()?" "+this._currentClass:"")+(Y.getTime()==b.getTime()?" ui-datepicker-today":""))+'"'+((!bb||G)&&ba[2]?' title="'+ba[2]+'"':"")+(bc?"":' data-handler="selectDay" data-event="click" data-month="'+Y.getMonth()+'" data-year="'+Y.getFullYear()+'"')+">"+(bb&&!G?"&#xa0;":bc?'<span class="ui-state-default">'+Y.getDate()+"</span>":'<a class="ui-state-default'+(Y.getTime()==b.getTime()?" ui-state-highlight":"")+(Y.getTime()==k.getTime()?" ui-state-active":"")+(bb?" ui-priority-secondary":"")+'" href="#">'+Y.getDate()+"</a>")+"</td>",Y.setDate(Y.getDate()+1),Y=this._daylightSavingAdjust(Y);}Q+=_+"</tr>";}n++,n>11&&(n=0,o++),Q+="</tbody></table>"+(j?"</div>"+(g[0]>0&&N==g[1]-1?'<div class="ui-datepicker-row-break"></div>':""):""),M+=Q;}K+=M;}return K+=x+($.browser.msie&&parseInt($.browser.version,10)<7&&!a.inline?'<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>':""),a._keyEvent=!1,K;},_generateMonthYearHeader:function _generateMonthYearHeader(a,b,c,d,e,f,g,h){var i=this._get(a,"changeMonth"),j=this._get(a,"changeYear"),k=this._get(a,"showMonthAfterYear"),l='<div class="ui-datepicker-title">',m="";if(f||!i)m+='<span class="ui-datepicker-month">'+g[b]+"</span>";else {var n=d&&d.getFullYear()==c,o=e&&e.getFullYear()==c;m+='<select class="ui-datepicker-month" data-handler="selectMonth" data-event="change">';for(var p=0;p<12;p++){(!n||p>=d.getMonth())&&(!o||p<=e.getMonth())&&(m+='<option value="'+p+'"'+(p==b?' selected="selected"':"")+">"+h[p]+"</option>");}m+="</select>";}k||(l+=m+(f||!i||!j?"&#xa0;":""));if(!a.yearshtml){a.yearshtml="";if(f||!j)l+='<span class="ui-datepicker-year">'+c+"</span>";else {var q=this._get(a,"yearRange").split(":"),r=new Date().getFullYear(),s=function s(a){var b=a.match(/c[+-].*/)?c+parseInt(a.substring(1),10):a.match(/[+-].*/)?r+parseInt(a,10):parseInt(a,10);return isNaN(b)?r:b;},t=s(q[0]),u=Math.max(t,s(q[1]||""));t=d?Math.max(t,d.getFullYear()):t,u=e?Math.min(u,e.getFullYear()):u,a.yearshtml+='<select class="ui-datepicker-year" data-handler="selectYear" data-event="change">';for(;t<=u;t++){a.yearshtml+='<option value="'+t+'"'+(t==c?' selected="selected"':"")+">"+t+"</option>";}a.yearshtml+="</select>",l+=a.yearshtml,a.yearshtml=null;}}return l+=this._get(a,"yearSuffix"),k&&(l+=(f||!i||!j?"&#xa0;":"")+m),l+="</div>",l;},_adjustInstDate:function _adjustInstDate(a,b,c){var d=a.drawYear+(c=="Y"?b:0),e=a.drawMonth+(c=="M"?b:0),f=Math.min(a.selectedDay,this._getDaysInMonth(d,e))+(c=="D"?b:0),g=this._restrictMinMax(a,this._daylightSavingAdjust(new Date(d,e,f)));a.selectedDay=g.getDate(),a.drawMonth=a.selectedMonth=g.getMonth(),a.drawYear=a.selectedYear=g.getFullYear(),(c=="M"||c=="Y")&&this._notifyChange(a);},_restrictMinMax:function _restrictMinMax(a,b){var c=this._getMinMaxDate(a,"min"),d=this._getMinMaxDate(a,"max"),e=c&&b<c?c:b;return e=d&&e>d?d:e,e;},_notifyChange:function _notifyChange(a){var b=this._get(a,"onChangeMonthYear");b&&b.apply(a.input?a.input[0]:null,[a.selectedYear,a.selectedMonth+1,a]);},_getNumberOfMonths:function _getNumberOfMonths(a){var b=this._get(a,"numberOfMonths");return b==null?[1,1]:typeof b=="number"?[1,b]:b;},_getMinMaxDate:function _getMinMaxDate(a,b){return this._determineDate(a,this._get(a,b+"Date"),null);},_getDaysInMonth:function _getDaysInMonth(a,b){return 32-this._daylightSavingAdjust(new Date(a,b,32)).getDate();},_getFirstDayOfMonth:function _getFirstDayOfMonth(a,b){return new Date(a,b,1).getDay();},_canAdjustMonth:function _canAdjustMonth(a,b,c,d){var e=this._getNumberOfMonths(a),f=this._daylightSavingAdjust(new Date(c,d+(b<0?b:e[0]*e[1]),1));return b<0&&f.setDate(this._getDaysInMonth(f.getFullYear(),f.getMonth())),this._isInRange(a,f);},_isInRange:function _isInRange(a,b){var c=this._getMinMaxDate(a,"min"),d=this._getMinMaxDate(a,"max");return (!c||b.getTime()>=c.getTime())&&(!d||b.getTime()<=d.getTime());},_getFormatConfig:function _getFormatConfig(a){var b=this._get(a,"shortYearCutoff");return b=typeof b!="string"?b:new Date().getFullYear()%100+parseInt(b,10),{shortYearCutoff:b,dayNamesShort:this._get(a,"dayNamesShort"),dayNames:this._get(a,"dayNames"),monthNamesShort:this._get(a,"monthNamesShort"),monthNames:this._get(a,"monthNames")};},_formatDate:function _formatDate(a,b,c,d){b||(a.currentDay=a.selectedDay,a.currentMonth=a.selectedMonth,a.currentYear=a.selectedYear);var e=b?(typeof b==="undefined"?"undefined":_typeof(b))=="object"?b:this._daylightSavingAdjust(new Date(d,c,b)):this._daylightSavingAdjust(new Date(a.currentYear,a.currentMonth,a.currentDay));return this.formatDate(this._get(a,"dateFormat"),e,this._getFormatConfig(a));}}),$.fn.datepicker=function(a){if(!this.length)return this;$.datepicker.initialized||($(document).mousedown($.datepicker._checkExternalClick).find("body").append($.datepicker.dpDiv),$.datepicker.initialized=!0);var b=Array.prototype.slice.call(arguments,1);return typeof a!="string"||a!="isDisabled"&&a!="getDate"&&a!="widget"?a=="option"&&arguments.length==2&&typeof arguments[1]=="string"?$.datepicker["_"+a+"Datepicker"].apply($.datepicker,[this[0]].concat(b)):this.each(function(){typeof a=="string"?$.datepicker["_"+a+"Datepicker"].apply($.datepicker,[this].concat(b)):$.datepicker._attachDatepicker(this,a);}):$.datepicker["_"+a+"Datepicker"].apply($.datepicker,[this[0]].concat(b));},$.datepicker=new Datepicker(),$.datepicker.initialized=!1,$.datepicker.uuid=new Date().getTime(),$.datepicker.version="1.8.23",window["DP_jQuery_"+dpuuid]=$;})(jQuery);; /*! jQuery UI - v1.8.23 - 2012-08-15
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.progressbar.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */(function(a,b){a.widget("ui.progressbar",{options:{value:0,max:100},min:0,_create:function _create(){this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({role:"progressbar","aria-valuemin":this.min,"aria-valuemax":this.options.max,"aria-valuenow":this._value()}),this.valueDiv=a("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element),this.oldValue=this._value(),this._refreshValue();},destroy:function destroy(){this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"),this.valueDiv.remove(),a.Widget.prototype.destroy.apply(this,arguments);},value:function value(a){return a===b?this._value():(this._setOption("value",a),this);},_setOption:function _setOption(b,c){b==="value"&&(this.options.value=c,this._refreshValue(),this._value()===this.options.max&&this._trigger("complete")),a.Widget.prototype._setOption.apply(this,arguments);},_value:function _value(){var a=this.options.value;return typeof a!="number"&&(a=0),Math.min(this.options.max,Math.max(this.min,a));},_percentage:function _percentage(){return 100*this._value()/this.options.max;},_refreshValue:function _refreshValue(){var a=this.value(),b=this._percentage();this.oldValue!==a&&(this.oldValue=a,this._trigger("change")),this.valueDiv.toggle(a>this.min).toggleClass("ui-corner-right",a===this.options.max).width(b.toFixed(0)+"%"),this.element.attr("aria-valuenow",a);}}),a.extend(a.ui.progressbar,{version:"1.8.23"});})(jQuery);;;browserify_shim__define__module__export__(typeof $.ui!="undefined"?$.ui:window.$.ui);}).call(global,undefined,undefined,undefined,undefined,function defineExport(ex){module.exports=ex;});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"/var/www/streambed/shelly/toolpanel/static/toolpanel/dist/temp/jquery-1.8.3.min.js":3}],5:[function(require,module,exports){
(function (global){
'use strict';

;$ = global.$ = require("/var/www/streambed/shelly/toolpanel/static/toolpanel/dist/temp/jquery-1.8.3.min.js");
;var __browserify_shim_require__ = require;(function browserifyShim(module, define, require) {
    // tipsy, facebook style tooltips for jquery
    // version 1.0.0a
    // (c) 2008-2010 jason frame [jason@onehackoranother.com]
    // released under the MIT license

    (function ($) {

        function maybeCall(thing, ctx) {
            return typeof thing == 'function' ? thing.call(ctx) : thing;
        };

        function isElementInDOM(ele) {
            while (ele = ele.parentNode) {
                if (ele == document) return true;
            }
            return false;
        };

        function Tipsy(element, options) {
            this.$element = $(element);
            this.options = options;
            this.enabled = true;
            this.fixTitle();
        };

        Tipsy.prototype = {
            show: function show() {
                var title = this.getTitle();
                if (title && this.enabled) {
                    var $tip = this.tip();

                    $tip.find('.tipsy-inner')[this.options.html ? 'html' : 'text'](title);
                    $tip[0].className = 'tipsy'; // reset classname in case of dynamic gravity
                    $tip.remove().css({ top: 0, left: 0, visibility: 'hidden', display: 'block' }).prependTo(document.body);

                    var pos = $.extend({}, this.$element.offset(), {
                        width: this.$element[0].offsetWidth,
                        height: this.$element[0].offsetHeight
                    });

                    var actualWidth = $tip[0].offsetWidth,
                        actualHeight = $tip[0].offsetHeight,
                        gravity = maybeCall(this.options.gravity, this.$element[0]);

                    var tp;
                    switch (gravity.charAt(0)) {
                        case 'n':
                            tp = { top: pos.top + pos.height + this.options.offset, left: pos.left + pos.width / 2 - actualWidth / 2 };
                            break;
                        case 's':
                            tp = { top: pos.top - actualHeight - this.options.offset, left: pos.left + pos.width / 2 - actualWidth / 2 };
                            break;
                        case 'e':
                            tp = { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth - this.options.offset };
                            break;
                        case 'w':
                            tp = { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width + this.options.offset };
                            break;
                    }

                    if (gravity.length == 2) {
                        if (gravity.charAt(1) == 'w') {
                            tp.left = pos.left + pos.width / 2 - 15;
                        } else {
                            tp.left = pos.left + pos.width / 2 - actualWidth + 15;
                        }
                    }

                    $tip.css(tp).addClass('tipsy-' + gravity);
                    $tip.find('.tipsy-arrow')[0].className = 'tipsy-arrow tipsy-arrow-' + gravity.charAt(0);
                    if (this.options.className) {
                        $tip.addClass(maybeCall(this.options.className, this.$element[0]));
                    }

                    if (this.options.fade) {
                        $tip.stop().css({ opacity: 0, display: 'block', visibility: 'visible' }).animate({ opacity: this.options.opacity });
                    } else {
                        $tip.css({ visibility: 'visible', opacity: this.options.opacity });
                    }
                }
            },

            hide: function hide() {
                if (this.options.fade) {
                    this.tip().stop().fadeOut(function () {
                        $(this).remove();
                    });
                } else {
                    this.tip().remove();
                }
            },

            fixTitle: function fixTitle() {
                var $e = this.$element;
                if ($e.attr('title') || typeof $e.attr('original-title') != 'string') {
                    $e.attr('original-title', $e.attr('title') || '').removeAttr('title');
                }
            },

            getTitle: function getTitle() {
                var title,
                    $e = this.$element,
                    o = this.options;
                this.fixTitle();
                var title,
                    o = this.options;
                if (typeof o.title == 'string') {
                    title = $e.attr(o.title == 'title' ? 'original-title' : o.title);
                } else if (typeof o.title == 'function') {
                    title = o.title.call($e[0]);
                }
                title = ('' + title).replace(/(^\s*|\s*$)/, "");
                return title || o.fallback;
            },

            tip: function tip() {
                if (!this.$tip) {
                    this.$tip = $('<div class="tipsy"></div>').html('<div class="tipsy-arrow"></div><div class="tipsy-inner"></div>');
                    this.$tip.data('tipsy-pointee', this.$element[0]);
                }
                return this.$tip;
            },

            validate: function validate() {
                if (!this.$element[0].parentNode) {
                    this.hide();
                    this.$element = null;
                    this.options = null;
                }
            },

            enable: function enable() {
                this.enabled = true;
            },
            disable: function disable() {
                this.enabled = false;
            },
            toggleEnabled: function toggleEnabled() {
                this.enabled = !this.enabled;
            }
        };

        $.fn.tipsy = function (options) {

            if (options === true) {
                return this.data('tipsy');
            } else if (typeof options == 'string') {
                var tipsy = this.data('tipsy');
                if (tipsy) tipsy[options]();
                return this;
            }

            options = $.extend({}, $.fn.tipsy.defaults, options);

            function get(ele) {
                var tipsy = $.data(ele, 'tipsy');
                if (!tipsy) {
                    tipsy = new Tipsy(ele, $.fn.tipsy.elementOptions(ele, options));
                    $.data(ele, 'tipsy', tipsy);
                }
                return tipsy;
            }

            function enter() {
                var tipsy = get(this);
                tipsy.hoverState = 'in';
                if (options.delayIn == 0) {
                    tipsy.show();
                } else {
                    tipsy.fixTitle();
                    setTimeout(function () {
                        if (tipsy.hoverState == 'in') tipsy.show();
                    }, options.delayIn);
                }
            };

            function leave() {
                var tipsy = get(this);
                tipsy.hoverState = 'out';
                if (options.delayOut == 0) {
                    tipsy.hide();
                } else {
                    setTimeout(function () {
                        if (tipsy.hoverState == 'out') tipsy.hide();
                    }, options.delayOut);
                }
            };

            if (!options.live) this.each(function () {
                get(this);
            });

            if (options.trigger != 'manual') {
                var binder = options.live ? 'live' : 'bind',
                    eventIn = options.trigger == 'hover' ? 'mouseenter' : 'focus',
                    eventOut = options.trigger == 'hover' ? 'mouseleave' : 'blur';
                this[binder](eventIn, enter)[binder](eventOut, leave);
            }

            return this;
        };

        $.fn.tipsy.defaults = {
            className: null,
            delayIn: 0,
            delayOut: 0,
            fade: false,
            fallback: '',
            gravity: 'n',
            html: false,
            live: false,
            offset: 0,
            opacity: 0.8,
            title: 'title',
            trigger: 'hover'
        };

        $.fn.tipsy.revalidate = function () {
            $('.tipsy').each(function () {
                var pointee = $.data(this, 'tipsy-pointee');
                if (!pointee || !isElementInDOM(pointee)) {
                    $(this).remove();
                }
            });
        };

        // Overwrite this method to provide options on a per-element basis.
        // For example, you could store the gravity in a 'tipsy-gravity' attribute:
        // return $.extend({}, options, {gravity: $(ele).attr('tipsy-gravity') || 'n' });
        // (remember - do not modify 'options' in place!)
        $.fn.tipsy.elementOptions = function (ele, options) {
            return $.metadata ? $.extend({}, options, $(ele).metadata()) : options;
        };

        $.fn.tipsy.autoNS = function () {
            return $(this).offset().top > $(document).scrollTop() + $(window).height() / 2 ? 's' : 'n';
        };

        $.fn.tipsy.autoWE = function () {
            return $(this).offset().left > $(document).scrollLeft() + $(window).width() / 2 ? 'e' : 'w';
        };

        /**
         * yields a closure of the supplied parameters, producing a function that takes
         * no arguments and is suitable for use as an autogravity function like so:
         *
         * @param margin (int) - distance from the viewable region edge that an
         *        element should be before setting its tooltip's gravity to be away
         *        from that edge.
         * @param prefer (string, e.g. 'n', 'sw', 'w') - the direction to prefer
         *        if there are no viewable region edges effecting the tooltip's
         *        gravity. It will try to vary from this minimally, for example,
         *        if 'sw' is preferred and an element is near the right viewable
         *        region edge, but not the top edge, it will set the gravity for
         *        that element's tooltip to be 'se', preserving the southern
         *        component.
         */
        $.fn.tipsy.autoBounds = function (margin, prefer) {
            return function () {
                var dir = { ns: prefer[0], ew: prefer.length > 1 ? prefer[1] : false },
                    boundTop = $(document).scrollTop() + margin,
                    boundLeft = $(document).scrollLeft() + margin,
                    $this = $(this);

                if ($this.offset().top < boundTop) dir.ns = 'n';
                if ($this.offset().left < boundLeft) dir.ew = 'w';
                if ($(window).width() + $(document).scrollLeft() - $this.offset().left < margin) dir.ew = 'e';
                if ($(window).height() + $(document).scrollTop() - $this.offset().top < margin) dir.ns = 's';

                return dir.ns + (dir.ew ? dir.ew : '');
            };
        };
    })(jQuery);
}).call(global, module, undefined, undefined);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"/var/www/streambed/shelly/toolpanel/static/toolpanel/dist/temp/jquery-1.8.3.min.js":3}],6:[function(require,module,exports){
(function (global){
"use strict";

;$ = global.$ = require("/var/www/streambed/shelly/toolpanel/static/toolpanel/dist/temp/jquery-1.8.3.min.js");
;var __browserify_shim_require__ = require;(function browserifyShim(module, define, require) {
	/*
  * jQuery UI Spinner 1.9m3
  *
  * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
  * Dual licensed under the MIT (MIT-LICENSE.txt)
  * and GPL (GPL-LICENSE.txt) licenses.
  *
  * http://docs.jquery.com/UI/Spinner
  *
  * Depends:
  *  jquery.ui.core.js
  *  jquery.ui.widget.js
  */
	(function ($) {

		// shortcut constants
		var pageModifier = 10;

		$.widget('ui.spinner', {
			options: {
				incremental: true,
				max: null,
				min: null,
				numberformat: null,
				step: null,
				value: null
			},

			_create: function _create() {
				this._draw();
				this._markupOptions();
				this._mousewheel();
				this._aria();
			},

			_markupOptions: function _markupOptions() {
				var _this = this;
				$.each({
					min: -Number.MAX_VALUE,
					max: Number.MAX_VALUE,
					step: 1
				}, function (attr, defaultValue) {
					if (_this.options[attr] === null) {
						var value = _this.element.attr(attr);
						_this.options[attr] = typeof value == "string" && value.length > 0 ? _this._parse(value) : defaultValue;
					}
				});
				this.value(this.options.value !== null ? this.options.value : this.element.val() || 0);
			},

			_draw: function _draw() {
				var self = this,
				    options = self.options;

				var uiSpinner = this.uiSpinner = self.element.addClass('ui-spinner-input').attr('autocomplete', 'off').wrap(self._uiSpinnerHtml()).parent()
				// add buttons
				.append(self._buttonHtml())
				// add behaviours
				.hover(function () {
					if (!options.disabled) {
						$(this).addClass('ui-state-hover');
					}
					self.hovered = true;
				}, function () {
					$(this).removeClass('ui-state-hover');
					self.hovered = false;
				});

				// TODO: move to theme, ask FG how
				// fix inline-block issues for IE. Since IE8 supports inline-block we need to exclude it.
				if (!$.support.opacity && uiSpinner.css('display') == 'inline-block' && $.browser.version < 8) {
					uiSpinner.css('display', 'inline');
				}

				this.element.bind('keydown.spinner', function (event) {
					if (self.options.disabled) {
						return;
					}
					if (self._start(event)) {
						return self._keydown(event);
					}
					return true;
				}).bind('keyup.spinner', function (event) {
					if (self.options.disabled) {
						return;
					}
					if (self.spinning) {
						self._stop(event);
						self._change(event);
					}
				}).bind('focus.spinner', function () {
					uiSpinner.addClass('ui-state-active');
					self.focused = true;
				}).bind('blur.spinner', function (event) {
					self.value(self.element.val());
					if (!self.hovered) {
						uiSpinner.removeClass('ui-state-active');
					}
					self.focused = false;
				});

				// button bindings
				this.buttons = uiSpinner.find('.ui-spinner-button').attr("tabIndex", -1).button().removeClass("ui-corner-all").bind('mousedown', function (event) {
					if (self.options.disabled) {
						return;
					}
					if (self._start(event) === false) {
						return false;
					}
					self._repeat(null, $(this).hasClass('ui-spinner-up') ? 1 : -1, event);
				}).bind('mouseup', function (event) {
					if (self.options.disabled) {
						return;
					}
					if (self.spinning) {
						self._stop(event);
						self._change(event);
					}
				}).bind("mouseenter", function () {
					if (self.options.disabled) {
						return;
					}
					// button will add ui-state-active if mouse was down while mouseleave and kept down
					if ($(this).hasClass("ui-state-active")) {
						if (self._start(event) === false) {
							return false;
						}
						self._repeat(null, $(this).hasClass('ui-spinner-up') ? 1 : -1, event);
					}
				}).bind("mouseleave", function () {
					if (self.spinning) {
						self._stop(event);
						self._change(event);
					}
				});

				// disable spinner if element was already disabled
				if (options.disabled) {
					this.disable();
				}
			},

			_keydown: function _keydown(event) {
				var o = this.options,
				    KEYS = $.ui.keyCode;

				switch (event.keyCode) {
					case KEYS.UP:
						this._repeat(null, 1, event);
						return false;
					case KEYS.DOWN:
						this._repeat(null, -1, event);
						return false;
					case KEYS.PAGE_UP:
						this._repeat(null, pageModifier, event);
						return false;
					case KEYS.PAGE_DOWN:
						this._repeat(null, -pageModifier, event);
						return false;

					case KEYS.ENTER:
						this.value(this.element.val());
				}

				return true;
			},

			_mousewheel: function _mousewheel() {
				// need the delta normalization that mousewheel plugin provides
				if (!$.fn.mousewheel) {
					return;
				}
				var self = this;
				this.element.bind("mousewheel.spinner", function (event, delta) {
					if (self.options.disabled) {
						return;
					}
					if (!self.spinning && !self._start(event)) {
						return false;
					}
					self._spin((delta > 0 ? 1 : -1) * self.options.step, event);
					clearTimeout(self.timeout);
					self.timeout = setTimeout(function () {
						if (self.spinning) {
							self._stop(event);
							self._change(event);
						}
					}, 100);
					event.preventDefault();
				});
			},

			_uiSpinnerHtml: function _uiSpinnerHtml() {
				return '<div role="spinbutton" class="ui-spinner ui-state-default ui-widget ui-widget-content ui-corner-all"></div>';
			},

			_buttonHtml: function _buttonHtml() {
				return '<a class="ui-spinner-button ui-spinner-up ui-corner-tr"><span class="ui-icon ui-icon-triangle-1-n">&#9650;</span></a>' + '<a class="ui-spinner-button ui-spinner-down ui-corner-br"><span class="ui-icon ui-icon-triangle-1-s">&#9660;</span></a>';
			},

			_start: function _start(event) {
				if (!this.spinning && this._trigger('start', event) !== false) {
					if (!this.counter) {
						this.counter = 1;
					}
					this.spinning = true;
					return true;
				}
				return false;
			},

			_repeat: function _repeat(i, steps, event) {
				var self = this;
				i = i || 500;

				clearTimeout(this.timer);
				this.timer = setTimeout(function () {
					self._repeat(40, steps, event);
				}, i);

				self._spin(steps * self.options.step, event);
			},

			_spin: function _spin(step, event) {
				if (!this.counter) {
					this.counter = 1;
				}

				// TODO refactor, maybe figure out some non-linear math
				var newVal = this.value() + step * (this.options.incremental && this.counter > 20 ? this.counter > 100 ? this.counter > 200 ? 100 : 10 : 2 : 1);

				if (this._trigger('spin', event, { value: newVal }) !== false) {
					this.value(newVal);
					this.counter++;
				}
			},

			_stop: function _stop(event) {
				this.counter = 0;
				if (this.timer) {
					window.clearTimeout(this.timer);
				}
				this.element[0].focus();
				this.spinning = false;
				this._trigger('stop', event);
			},

			_change: function _change(event) {
				this._trigger('change', event);
			},

			_setOption: function _setOption(key, value) {
				if (key == 'value') {
					value = this._parse(value);
					if (value < this.options.min) {
						value = this.options.min;
					}
					if (value > this.options.max) {
						value = this.options.max;
					}
				}
				if (key == 'disabled') {
					if (value) {
						this.element.attr("disabled", true);
						this.buttons.button("disable");
					} else {
						this.element.removeAttr("disabled");
						this.buttons.button("enable");
					}
				}
				$.Widget.prototype._setOption.call(this, key, value);
			},

			_setOptions: function _setOptions(options) {
				$.Widget.prototype._setOptions.call(this, options);
				if ("value" in options) {
					this._format(this.options.value);
				}
				this._aria();
			},

			_aria: function _aria() {
				this.uiSpinner.attr('aria-valuemin', this.options.min).attr('aria-valuemax', this.options.max).attr('aria-valuenow', this.options.value);
			},

			_parse: function _parse(val) {
				var input = val;
				if (typeof val == 'string') {
					// special case for currency formatting until Globalization handles currencies
					if (this.options.numberformat == "C" && window.Globalization) {
						// parseFloat should accept number format, including currency
						var culture = Globalization.culture || Globalization.cultures['default'];
						val = val.replace(culture.numberFormat.currency.symbol, "");
					}
					val = window.Globalization && this.options.numberformat ? Globalization.parseFloat(val) : +val;
				}
				return isNaN(val) ? null : val;
			},

			_format: function _format(num) {
				var num = this.options.value;
				this.element.val(window.Globalization && this.options.numberformat ? Globalization.format(num, this.options.numberformat) : num);
			},

			destroy: function destroy() {
				this.element.removeClass('ui-spinner-input').removeAttr('disabled').removeAttr('autocomplete');
				$.Widget.prototype.destroy.call(this);
				this.uiSpinner.replaceWith(this.element);
			},

			stepUp: function stepUp(steps) {
				this._spin((steps || 1) * this.options.step);
			},

			stepDown: function stepDown(steps) {
				this._spin((steps || 1) * -this.options.step);
			},

			pageUp: function pageUp(pages) {
				this.stepUp((pages || 1) * pageModifier);
			},

			pageDown: function pageDown(pages) {
				this.stepDown((pages || 1) * pageModifier);
			},

			value: function value(newVal) {
				if (!arguments.length) {
					return this._parse(this.element.val());
				}
				this.option('value', newVal);
			},

			widget: function widget() {
				return this.uiSpinner;
			}
		});
	})(jQuery);
}).call(global, module, undefined, undefined);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"/var/www/streambed/shelly/toolpanel/static/toolpanel/dist/temp/jquery-1.8.3.min.js":3}],7:[function(require,module,exports){
(function (global){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

;$ = global.$ = require("/var/www/streambed/shelly/toolpanel/static/toolpanel/dist/temp/jquery-1.8.3.min.js");
;var __browserify_shim_require__ = require;(function browserifyShim(module, define, require) {
    // Spectrum Colorpicker v1.7.0
    // https://github.com/bgrins/spectrum
    // Author: Brian Grinstead
    // License: MIT

    (function (factory) {
        "use strict";

        if (typeof define === 'function' && define.amd) {
            // AMD
            define(['jquery'], factory);
        } else if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) == "object" && (typeof module === "undefined" ? "undefined" : _typeof(module)) == "object") {
            // CommonJS
            module.exports = factory;
        } else {
            // Browser
            factory(jQuery);
        }
    })(function ($, undefined) {
        "use strict";

        var defaultOpts = {

            // Callbacks
            beforeShow: noop,
            move: noop,
            change: noop,
            show: noop,
            hide: noop,

            // Options
            color: false,
            flat: false,
            showInput: false,
            allowEmpty: false,
            showButtons: true,
            clickoutFiresChange: true,
            showInitial: false,
            showPalette: false,
            showPaletteOnly: false,
            hideAfterPaletteSelect: false,
            togglePaletteOnly: false,
            showSelectionPalette: true,
            localStorageKey: false,
            appendTo: "body",
            maxSelectionSize: 7,
            cancelText: "cancel",
            chooseText: "choose",
            togglePaletteMoreText: "more",
            togglePaletteLessText: "less",
            clearText: "Clear Color Selection",
            noColorSelectedText: "No Color Selected",
            preferredFormat: false,
            className: "", // Deprecated - use containerClassName and replacerClassName instead.
            containerClassName: "",
            replacerClassName: "",
            showAlpha: false,
            theme: "sp-light",
            palette: [["#ffffff", "#000000", "#ff0000", "#ff8000", "#ffff00", "#008000", "#0000ff", "#4b0082", "#9400d3"]],
            selectionPalette: [],
            disabled: false,
            offset: null
        },
            spectrums = [],
            IE = !!/msie/i.exec(window.navigator.userAgent),
            rgbaSupport = function () {
            function contains(str, substr) {
                return !! ~('' + str).indexOf(substr);
            }

            var elem = document.createElement('div');
            var style = elem.style;
            style.cssText = 'background-color:rgba(0,0,0,.5)';
            return contains(style.backgroundColor, 'rgba') || contains(style.backgroundColor, 'hsla');
        }(),
            replaceInput = ["<div class='sp-replacer'>", "<div class='sp-preview'><div class='sp-preview-inner'></div></div>", "<div class='sp-dd'>&#9660;</div>", "</div>"].join(''),
            markup = function () {

            // IE does not support gradients with multiple stops, so we need to simulate
            //  that for the rainbow slider with 8 divs that each have a single gradient
            var gradientFix = "";
            if (IE) {
                for (var i = 1; i <= 6; i++) {
                    gradientFix += "<div class='sp-" + i + "'></div>";
                }
            }

            return ["<div class='sp-container sp-hidden'>", "<div class='sp-palette-container'>", "<div class='sp-palette sp-thumb sp-cf'></div>", "<div class='sp-palette-button-container sp-cf'>", "<button type='button' class='sp-palette-toggle'></button>", "</div>", "</div>", "<div class='sp-picker-container'>", "<div class='sp-top sp-cf'>", "<div class='sp-fill'></div>", "<div class='sp-top-inner'>", "<div class='sp-color'>", "<div class='sp-sat'>", "<div class='sp-val'>", "<div class='sp-dragger'></div>", "</div>", "</div>", "</div>", "<div class='sp-clear sp-clear-display'>", "</div>", "<div class='sp-hue'>", "<div class='sp-slider'></div>", gradientFix, "</div>", "</div>", "<div class='sp-alpha'><div class='sp-alpha-inner'><div class='sp-alpha-handle'></div></div></div>", "</div>", "<div class='sp-input-container sp-cf'>", "<input class='sp-input' type='text' spellcheck='false'  />", "</div>", "<div class='sp-initial sp-thumb sp-cf'></div>", "<div class='sp-button-container sp-cf'>", "<a class='sp-cancel' href='#'></a>", "<button type='button' class='sp-choose'></button>", "</div>", "</div>", "</div>"].join("");
        }();

        function paletteTemplate(p, color, className, opts) {
            var html = [];
            for (var i = 0; i < p.length; i++) {
                var current = p[i];
                if (current) {
                    var tiny = tinycolor(current);
                    var c = tiny.toHsl().l < 0.5 ? "sp-thumb-el sp-thumb-dark" : "sp-thumb-el sp-thumb-light";
                    c += tinycolor.equals(color, current) ? " sp-thumb-active" : "";
                    var formattedString = tiny.toString(opts.preferredFormat || "rgb");
                    var swatchStyle = rgbaSupport ? "background-color:" + tiny.toRgbString() : "filter:" + tiny.toFilter();
                    html.push('<span title="' + formattedString + '" data-color="' + tiny.toRgbString() + '" class="' + c + '"><span class="sp-thumb-inner" style="' + swatchStyle + ';" /></span>');
                } else {
                    var cls = 'sp-clear-display';
                    html.push($('<div />').append($('<span data-color="" style="background-color:transparent;" class="' + cls + '"></span>').attr('title', opts.noColorSelectedText)).html());
                }
            }
            return "<div class='sp-cf " + className + "'>" + html.join('') + "</div>";
        }

        function hideAll() {
            for (var i = 0; i < spectrums.length; i++) {
                if (spectrums[i]) {
                    spectrums[i].hide();
                }
            }
        }

        function instanceOptions(o, callbackContext) {
            var opts = $.extend({}, defaultOpts, o);
            opts.callbacks = {
                'move': bind(opts.move, callbackContext),
                'change': bind(opts.change, callbackContext),
                'show': bind(opts.show, callbackContext),
                'hide': bind(opts.hide, callbackContext),
                'beforeShow': bind(opts.beforeShow, callbackContext)
            };

            return opts;
        }

        function spectrum(element, o) {

            var opts = instanceOptions(o, element),
                flat = opts.flat,
                showSelectionPalette = opts.showSelectionPalette,
                localStorageKey = opts.localStorageKey,
                theme = opts.theme,
                callbacks = opts.callbacks,
                resize = throttle(reflow, 10),
                visible = false,
                isDragging = false,
                dragWidth = 0,
                dragHeight = 0,
                dragHelperHeight = 0,
                slideHeight = 0,
                slideWidth = 0,
                alphaWidth = 0,
                alphaSlideHelperWidth = 0,
                slideHelperHeight = 0,
                currentHue = 0,
                currentSaturation = 0,
                currentValue = 0,
                currentAlpha = 1,
                palette = [],
                paletteArray = [],
                paletteLookup = {},
                selectionPalette = opts.selectionPalette.slice(0),
                maxSelectionSize = opts.maxSelectionSize,
                draggingClass = "sp-dragging",
                shiftMovementDirection = null;

            var doc = element.ownerDocument,
                body = doc.body,
                boundElement = $(element),
                disabled = false,
                container = $(markup, doc).addClass(theme),
                pickerContainer = container.find(".sp-picker-container"),
                dragger = container.find(".sp-color"),
                dragHelper = container.find(".sp-dragger"),
                slider = container.find(".sp-hue"),
                slideHelper = container.find(".sp-slider"),
                alphaSliderInner = container.find(".sp-alpha-inner"),
                alphaSlider = container.find(".sp-alpha"),
                alphaSlideHelper = container.find(".sp-alpha-handle"),
                textInput = container.find(".sp-input"),
                paletteContainer = container.find(".sp-palette"),
                initialColorContainer = container.find(".sp-initial"),
                cancelButton = container.find(".sp-cancel"),
                clearButton = container.find(".sp-clear"),
                chooseButton = container.find(".sp-choose"),
                toggleButton = container.find(".sp-palette-toggle"),
                isInput = boundElement.is("input"),
                isInputTypeColor = isInput && boundElement.attr("type") === "color" && inputTypeColorSupport(),
                shouldReplace = isInput && !flat,
                replacer = shouldReplace ? $(replaceInput).addClass(theme).addClass(opts.className).addClass(opts.replacerClassName) : $([]),
                offsetElement = shouldReplace ? replacer : boundElement,
                previewElement = replacer.find(".sp-preview-inner"),
                initialColor = opts.color || isInput && boundElement.val(),
                colorOnShow = false,
                preferredFormat = opts.preferredFormat,
                currentPreferredFormat = preferredFormat,
                clickoutFiresChange = !opts.showButtons || opts.clickoutFiresChange,
                isEmpty = !initialColor,
                allowEmpty = opts.allowEmpty && !isInputTypeColor;

            function applyOptions() {

                if (opts.showPaletteOnly) {
                    opts.showPalette = true;
                }

                toggleButton.text(opts.showPaletteOnly ? opts.togglePaletteMoreText : opts.togglePaletteLessText);

                if (opts.palette) {
                    palette = opts.palette.slice(0);
                    paletteArray = $.isArray(palette[0]) ? palette : [palette];
                    paletteLookup = {};
                    for (var i = 0; i < paletteArray.length; i++) {
                        for (var j = 0; j < paletteArray[i].length; j++) {
                            var rgb = tinycolor(paletteArray[i][j]).toRgbString();
                            paletteLookup[rgb] = true;
                        }
                    }
                }

                container.toggleClass("sp-flat", flat);
                container.toggleClass("sp-input-disabled", !opts.showInput);
                container.toggleClass("sp-alpha-enabled", opts.showAlpha);
                container.toggleClass("sp-clear-enabled", allowEmpty);
                container.toggleClass("sp-buttons-disabled", !opts.showButtons);
                container.toggleClass("sp-palette-buttons-disabled", !opts.togglePaletteOnly);
                container.toggleClass("sp-palette-disabled", !opts.showPalette);
                container.toggleClass("sp-palette-only", opts.showPaletteOnly);
                container.toggleClass("sp-initial-disabled", !opts.showInitial);
                container.addClass(opts.className).addClass(opts.containerClassName);

                reflow();
            }

            function initialize() {

                if (IE) {
                    container.find("*:not(input)").attr("unselectable", "on");
                }

                applyOptions();

                if (shouldReplace) {
                    boundElement.after(replacer).hide();
                }

                if (!allowEmpty) {
                    clearButton.hide();
                }

                if (flat) {
                    boundElement.after(container).hide();
                } else {

                    var appendTo = opts.appendTo === "parent" ? boundElement.parent() : $(opts.appendTo);
                    if (appendTo.length !== 1) {
                        appendTo = $("body");
                    }

                    appendTo.append(container);
                }

                updateSelectionPaletteFromStorage();

                offsetElement.bind("click.spectrum touchstart.spectrum", function (e) {
                    if (!disabled) {
                        toggle();
                    }

                    e.stopPropagation();

                    if (!$(e.target).is("input")) {
                        e.preventDefault();
                    }
                });

                if (boundElement.is(":disabled") || opts.disabled === true) {
                    disable();
                }

                // Prevent clicks from bubbling up to document.  This would cause it to be hidden.
                container.click(stopPropagation);

                // Handle user typed input
                textInput.change(setFromTextInput);
                textInput.bind("paste", function () {
                    setTimeout(setFromTextInput, 1);
                });
                textInput.keydown(function (e) {
                    if (e.keyCode == 13) {
                        setFromTextInput();
                    }
                });

                cancelButton.text(opts.cancelText);
                cancelButton.bind("click.spectrum", function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    revert();
                    hide();
                });

                clearButton.attr("title", opts.clearText);
                clearButton.bind("click.spectrum", function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    isEmpty = true;
                    move();

                    if (flat) {
                        //for the flat style, this is a change event
                        updateOriginalInput(true);
                    }
                });

                chooseButton.text(opts.chooseText);
                chooseButton.bind("click.spectrum", function (e) {
                    e.stopPropagation();
                    e.preventDefault();

                    if (IE && textInput.is(":focus")) {
                        textInput.trigger('change');
                    }

                    if (isValid()) {
                        updateOriginalInput(true);
                        hide();
                    }
                });

                toggleButton.text(opts.showPaletteOnly ? opts.togglePaletteMoreText : opts.togglePaletteLessText);
                toggleButton.bind("click.spectrum", function (e) {
                    e.stopPropagation();
                    e.preventDefault();

                    opts.showPaletteOnly = !opts.showPaletteOnly;

                    // To make sure the Picker area is drawn on the right, next to the
                    // Palette area (and not below the palette), first move the Palette
                    // to the left to make space for the picker, plus 5px extra.
                    // The 'applyOptions' function puts the whole container back into place
                    // and takes care of the button-text and the sp-palette-only CSS class.
                    if (!opts.showPaletteOnly && !flat) {
                        container.css('left', '-=' + (pickerContainer.outerWidth(true) + 5));
                    }
                    applyOptions();
                });

                draggable(alphaSlider, function (dragX, dragY, e) {
                    currentAlpha = dragX / alphaWidth;
                    isEmpty = false;
                    if (e.shiftKey) {
                        currentAlpha = Math.round(currentAlpha * 10) / 10;
                    }

                    move();
                }, dragStart, dragStop);

                draggable(slider, function (dragX, dragY) {
                    currentHue = parseFloat(dragY / slideHeight);
                    isEmpty = false;
                    if (!opts.showAlpha) {
                        currentAlpha = 1;
                    }
                    move();
                }, dragStart, dragStop);

                draggable(dragger, function (dragX, dragY, e) {

                    // shift+drag should snap the movement to either the x or y axis.
                    if (!e.shiftKey) {
                        shiftMovementDirection = null;
                    } else if (!shiftMovementDirection) {
                        var oldDragX = currentSaturation * dragWidth;
                        var oldDragY = dragHeight - currentValue * dragHeight;
                        var furtherFromX = Math.abs(dragX - oldDragX) > Math.abs(dragY - oldDragY);

                        shiftMovementDirection = furtherFromX ? "x" : "y";
                    }

                    var setSaturation = !shiftMovementDirection || shiftMovementDirection === "x";
                    var setValue = !shiftMovementDirection || shiftMovementDirection === "y";

                    if (setSaturation) {
                        currentSaturation = parseFloat(dragX / dragWidth);
                    }
                    if (setValue) {
                        currentValue = parseFloat((dragHeight - dragY) / dragHeight);
                    }

                    isEmpty = false;
                    if (!opts.showAlpha) {
                        currentAlpha = 1;
                    }

                    move();
                }, dragStart, dragStop);

                if (!!initialColor) {
                    _set(initialColor);

                    // In case color was black - update the preview UI and set the format
                    // since the set function will not run (default color is black).
                    updateUI();
                    currentPreferredFormat = preferredFormat || tinycolor(initialColor).format;

                    addColorToSelectionPalette(initialColor);
                } else {
                    updateUI();
                }

                if (flat) {
                    show();
                }

                function paletteElementClick(e) {
                    if (e.data && e.data.ignore) {
                        _set($(e.target).closest(".sp-thumb-el").data("color"));
                        move();
                    } else {
                        _set($(e.target).closest(".sp-thumb-el").data("color"));
                        move();
                        updateOriginalInput(true);
                        if (opts.hideAfterPaletteSelect) {
                            hide();
                        }
                    }

                    return false;
                }

                var paletteEvent = IE ? "mousedown.spectrum" : "click.spectrum touchstart.spectrum";
                paletteContainer.delegate(".sp-thumb-el", paletteEvent, paletteElementClick);
                initialColorContainer.delegate(".sp-thumb-el:nth-child(1)", paletteEvent, { ignore: true }, paletteElementClick);
            }

            function updateSelectionPaletteFromStorage() {

                if (localStorageKey && window.localStorage) {

                    // Migrate old palettes over to new format.  May want to remove this eventually.
                    try {
                        var oldPalette = window.localStorage[localStorageKey].split(",#");
                        if (oldPalette.length > 1) {
                            delete window.localStorage[localStorageKey];
                            $.each(oldPalette, function (i, c) {
                                addColorToSelectionPalette(c);
                            });
                        }
                    } catch (e) {}

                    try {
                        selectionPalette = window.localStorage[localStorageKey].split(";");
                    } catch (e) {}
                }
            }

            function addColorToSelectionPalette(color) {
                if (showSelectionPalette) {
                    var rgb = tinycolor(color).toRgbString();
                    if (!paletteLookup[rgb] && $.inArray(rgb, selectionPalette) === -1) {
                        selectionPalette.push(rgb);
                        while (selectionPalette.length > maxSelectionSize) {
                            selectionPalette.shift();
                        }
                    }

                    if (localStorageKey && window.localStorage) {
                        try {
                            window.localStorage[localStorageKey] = selectionPalette.join(";");
                        } catch (e) {}
                    }
                }
            }

            function getUniqueSelectionPalette() {
                var unique = [];
                if (opts.showPalette) {
                    for (var i = 0; i < selectionPalette.length; i++) {
                        var rgb = tinycolor(selectionPalette[i]).toRgbString();

                        if (!paletteLookup[rgb]) {
                            unique.push(selectionPalette[i]);
                        }
                    }
                }

                return unique.reverse().slice(0, opts.maxSelectionSize);
            }

            function drawPalette() {

                var currentColor = get();

                var html = $.map(paletteArray, function (palette, i) {
                    return paletteTemplate(palette, currentColor, "sp-palette-row sp-palette-row-" + i, opts);
                });

                updateSelectionPaletteFromStorage();

                if (selectionPalette) {
                    html.push(paletteTemplate(getUniqueSelectionPalette(), currentColor, "sp-palette-row sp-palette-row-selection", opts));
                }

                paletteContainer.html(html.join(""));
            }

            function drawInitial() {
                if (opts.showInitial) {
                    var initial = colorOnShow;
                    var current = get();
                    initialColorContainer.html(paletteTemplate([initial, current], current, "sp-palette-row-initial", opts));
                }
            }

            function dragStart() {
                if (dragHeight <= 0 || dragWidth <= 0 || slideHeight <= 0) {
                    reflow();
                }
                isDragging = true;
                container.addClass(draggingClass);
                shiftMovementDirection = null;
                boundElement.trigger('dragstart.spectrum', [get()]);
            }

            function dragStop() {
                isDragging = false;
                container.removeClass(draggingClass);
                boundElement.trigger('dragstop.spectrum', [get()]);
            }

            function setFromTextInput() {

                var value = textInput.val();

                if ((value === null || value === "") && allowEmpty) {
                    _set(null);
                    updateOriginalInput(true);
                } else {
                    var tiny = tinycolor(value);
                    if (tiny.isValid()) {
                        _set(tiny);
                        updateOriginalInput(true);
                    } else {
                        textInput.addClass("sp-validation-error");
                    }
                }
            }

            function toggle() {
                if (visible) {
                    hide();
                } else {
                    show();
                }
            }

            function show() {
                var event = $.Event('beforeShow.spectrum');

                if (visible) {
                    reflow();
                    return;
                }

                boundElement.trigger(event, [get()]);

                if (callbacks.beforeShow(get()) === false || event.isDefaultPrevented()) {
                    return;
                }

                hideAll();
                visible = true;

                $(doc).bind("keydown.spectrum", onkeydown);
                $(doc).bind("click.spectrum", clickout);
                $(window).bind("resize.spectrum", resize);
                replacer.addClass("sp-active");
                container.removeClass("sp-hidden");

                reflow();
                updateUI();

                colorOnShow = get();

                drawInitial();
                callbacks.show(colorOnShow);
                boundElement.trigger('show.spectrum', [colorOnShow]);
            }

            function onkeydown(e) {
                // Close on ESC
                if (e.keyCode === 27) {
                    hide();
                }
            }

            function clickout(e) {
                // Return on right click.
                if (e.button == 2) {
                    return;
                }

                // If a drag event was happening during the mouseup, don't hide
                // on click.
                if (isDragging) {
                    return;
                }

                if (clickoutFiresChange) {
                    updateOriginalInput(true);
                } else {
                    revert();
                }
                hide();
            }

            function hide() {
                // Return if hiding is unnecessary
                if (!visible || flat) {
                    return;
                }
                visible = false;

                $(doc).unbind("keydown.spectrum", onkeydown);
                $(doc).unbind("click.spectrum", clickout);
                $(window).unbind("resize.spectrum", resize);

                replacer.removeClass("sp-active");
                container.addClass("sp-hidden");

                callbacks.hide(get());
                boundElement.trigger('hide.spectrum', [get()]);
            }

            function revert() {
                _set(colorOnShow, true);
            }

            function _set(color, ignoreFormatChange) {
                if (tinycolor.equals(color, get())) {
                    // Update UI just in case a validation error needs
                    // to be cleared.
                    updateUI();
                    return;
                }

                var newColor, newHsv;
                if (!color && allowEmpty) {
                    isEmpty = true;
                } else {
                    isEmpty = false;
                    newColor = tinycolor(color);
                    newHsv = newColor.toHsv();

                    currentHue = newHsv.h % 360 / 360;
                    currentSaturation = newHsv.s;
                    currentValue = newHsv.v;
                    currentAlpha = newHsv.a;
                }
                updateUI();

                if (newColor && newColor.isValid() && !ignoreFormatChange) {
                    currentPreferredFormat = preferredFormat || newColor.getFormat();
                }
            }

            function get(opts) {
                opts = opts || {};

                if (allowEmpty && isEmpty) {
                    return null;
                }

                return tinycolor.fromRatio({
                    h: currentHue,
                    s: currentSaturation,
                    v: currentValue,
                    a: Math.round(currentAlpha * 100) / 100
                }, { format: opts.format || currentPreferredFormat });
            }

            function isValid() {
                return !textInput.hasClass("sp-validation-error");
            }

            function move() {
                updateUI();

                callbacks.move(get());
                boundElement.trigger('move.spectrum', [get()]);
            }

            function updateUI() {

                textInput.removeClass("sp-validation-error");

                updateHelperLocations();

                // Update dragger background color (gradients take care of saturation and value).
                var flatColor = tinycolor.fromRatio({ h: currentHue, s: 1, v: 1 });
                dragger.css("background-color", flatColor.toHexString());

                // Get a format that alpha will be included in (hex and names ignore alpha)
                var format = currentPreferredFormat;
                if (currentAlpha < 1 && !(currentAlpha === 0 && format === "name")) {
                    if (format === "hex" || format === "hex3" || format === "hex6" || format === "name") {
                        format = "rgb";
                    }
                }

                var realColor = get({ format: format }),
                    displayColor = '';

                //reset background info for preview element
                previewElement.removeClass("sp-clear-display");
                previewElement.css('background-color', 'transparent');

                if (!realColor && allowEmpty) {
                    // Update the replaced elements background with icon indicating no color selection
                    previewElement.addClass("sp-clear-display");
                } else {
                    var realHex = realColor.toHexString(),
                        realRgb = realColor.toRgbString();

                    // Update the replaced elements background color (with actual selected color)
                    if (rgbaSupport || realColor.alpha === 1) {
                        previewElement.css("background-color", realRgb);
                    } else {
                        previewElement.css("background-color", "transparent");
                        previewElement.css("filter", realColor.toFilter());
                    }

                    if (opts.showAlpha) {
                        var rgb = realColor.toRgb();
                        rgb.a = 0;
                        var realAlpha = tinycolor(rgb).toRgbString();
                        var gradient = "linear-gradient(left, " + realAlpha + ", " + realHex + ")";

                        if (IE) {
                            alphaSliderInner.css("filter", tinycolor(realAlpha).toFilter({ gradientType: 1 }, realHex));
                        } else {
                            alphaSliderInner.css("background", "-webkit-" + gradient);
                            alphaSliderInner.css("background", "-moz-" + gradient);
                            alphaSliderInner.css("background", "-ms-" + gradient);
                            // Use current syntax gradient on unprefixed property.
                            alphaSliderInner.css("background", "linear-gradient(to right, " + realAlpha + ", " + realHex + ")");
                        }
                    }

                    displayColor = realColor.toString(format);
                }

                // Update the text entry input as it changes happen
                if (opts.showInput) {
                    textInput.val(displayColor);
                }

                if (opts.showPalette) {
                    drawPalette();
                }

                drawInitial();
            }

            function updateHelperLocations() {
                var s = currentSaturation;
                var v = currentValue;

                if (allowEmpty && isEmpty) {
                    //if selected color is empty, hide the helpers
                    alphaSlideHelper.hide();
                    slideHelper.hide();
                    dragHelper.hide();
                } else {
                    //make sure helpers are visible
                    alphaSlideHelper.show();
                    slideHelper.show();
                    dragHelper.show();

                    // Where to show the little circle in that displays your current selected color
                    var dragX = s * dragWidth;
                    var dragY = dragHeight - v * dragHeight;
                    dragX = Math.max(-dragHelperHeight, Math.min(dragWidth - dragHelperHeight, dragX - dragHelperHeight));
                    dragY = Math.max(-dragHelperHeight, Math.min(dragHeight - dragHelperHeight, dragY - dragHelperHeight));
                    dragHelper.css({
                        "top": dragY + "px",
                        "left": dragX + "px"
                    });

                    var alphaX = currentAlpha * alphaWidth;
                    alphaSlideHelper.css({
                        "left": alphaX - alphaSlideHelperWidth / 2 + "px"
                    });

                    // Where to show the bar that displays your current selected hue
                    var slideY = currentHue * slideHeight;
                    slideHelper.css({
                        "top": slideY - slideHelperHeight + "px"
                    });
                }
            }

            function updateOriginalInput(fireCallback) {
                var color = get(),
                    displayColor = '',
                    hasChanged = !tinycolor.equals(color, colorOnShow);

                if (color) {
                    displayColor = color.toString(currentPreferredFormat);
                    // Update the selection palette with the current color
                    addColorToSelectionPalette(color);
                }

                if (isInput) {
                    boundElement.val(displayColor);
                }

                if (fireCallback && hasChanged) {
                    callbacks.change(color);
                    boundElement.trigger('change', [color]);
                }
            }

            function reflow() {
                dragWidth = dragger.width();
                dragHeight = dragger.height();
                dragHelperHeight = dragHelper.height();
                slideWidth = slider.width();
                slideHeight = slider.height();
                slideHelperHeight = slideHelper.height();
                alphaWidth = alphaSlider.width();
                alphaSlideHelperWidth = alphaSlideHelper.width();

                if (!flat) {
                    container.css("position", "absolute");
                    if (opts.offset) {
                        container.offset(opts.offset);
                    } else {
                        container.offset(getOffset(container, offsetElement));
                    }
                }

                updateHelperLocations();

                if (opts.showPalette) {
                    drawPalette();
                }

                boundElement.trigger('reflow.spectrum');
            }

            function destroy() {
                boundElement.show();
                offsetElement.unbind("click.spectrum touchstart.spectrum");
                container.remove();
                replacer.remove();
                spectrums[spect.id] = null;
            }

            function option(optionName, optionValue) {
                if (optionName === undefined) {
                    return $.extend({}, opts);
                }
                if (optionValue === undefined) {
                    return opts[optionName];
                }

                opts[optionName] = optionValue;
                applyOptions();
            }

            function enable() {
                disabled = false;
                boundElement.attr("disabled", false);
                offsetElement.removeClass("sp-disabled");
            }

            function disable() {
                hide();
                disabled = true;
                boundElement.attr("disabled", true);
                offsetElement.addClass("sp-disabled");
            }

            function setOffset(coord) {
                opts.offset = coord;
                reflow();
            }

            initialize();

            var spect = {
                show: show,
                hide: hide,
                toggle: toggle,
                reflow: reflow,
                option: option,
                enable: enable,
                disable: disable,
                offset: setOffset,
                set: function set(c) {
                    _set(c);
                    updateOriginalInput();
                },
                get: get,
                destroy: destroy,
                container: container
            };

            spect.id = spectrums.push(spect) - 1;

            return spect;
        }

        /**
        * checkOffset - get the offset below/above and left/right element depending on screen position
        * Thanks https://github.com/jquery/jquery-ui/blob/master/ui/jquery.ui.datepicker.js
        */
        function getOffset(picker, input) {
            var extraY = 0;
            var dpWidth = picker.outerWidth();
            var dpHeight = picker.outerHeight();
            var inputHeight = input.outerHeight();
            var doc = picker[0].ownerDocument;
            var docElem = doc.documentElement;
            var viewWidth = docElem.clientWidth + $(doc).scrollLeft();
            var viewHeight = docElem.clientHeight + $(doc).scrollTop();
            var offset = input.offset();
            offset.top += inputHeight;

            offset.left -= Math.min(offset.left, offset.left + dpWidth > viewWidth && viewWidth > dpWidth ? Math.abs(offset.left + dpWidth - viewWidth) : 0);

            offset.top -= Math.min(offset.top, offset.top + dpHeight > viewHeight && viewHeight > dpHeight ? Math.abs(dpHeight + inputHeight - extraY) : extraY);

            return offset;
        }

        /**
        * noop - do nothing
        */
        function noop() {}

        /**
        * stopPropagation - makes the code only doing this a little easier to read in line
        */
        function stopPropagation(e) {
            e.stopPropagation();
        }

        /**
        * Create a function bound to a given object
        * Thanks to underscore.js
        */
        function bind(func, obj) {
            var slice = Array.prototype.slice;
            var args = slice.call(arguments, 2);
            return function () {
                return func.apply(obj, args.concat(slice.call(arguments)));
            };
        }

        /**
        * Lightweight drag helper.  Handles containment within the element, so that
        * when dragging, the x is within [0,element.width] and y is within [0,element.height]
        */
        function draggable(element, onmove, onstart, onstop) {
            onmove = onmove || function () {};
            onstart = onstart || function () {};
            onstop = onstop || function () {};
            var doc = document;
            var dragging = false;
            var offset = {};
            var maxHeight = 0;
            var maxWidth = 0;
            var hasTouch = 'ontouchstart' in window;

            var duringDragEvents = {};
            duringDragEvents["selectstart"] = prevent;
            duringDragEvents["dragstart"] = prevent;
            duringDragEvents["touchmove mousemove"] = move;
            duringDragEvents["touchend mouseup"] = stop;

            function prevent(e) {
                if (e.stopPropagation) {
                    e.stopPropagation();
                }
                if (e.preventDefault) {
                    e.preventDefault();
                }
                e.returnValue = false;
            }

            function move(e) {
                if (dragging) {
                    // Mouseup happened outside of window
                    if (IE && doc.documentMode < 9 && !e.button) {
                        return stop();
                    }

                    var t0 = e.originalEvent && e.originalEvent.touches && e.originalEvent.touches[0];
                    var pageX = t0 && t0.pageX || e.pageX;
                    var pageY = t0 && t0.pageY || e.pageY;

                    var dragX = Math.max(0, Math.min(pageX - offset.left, maxWidth));
                    var dragY = Math.max(0, Math.min(pageY - offset.top, maxHeight));

                    if (hasTouch) {
                        // Stop scrolling in iOS
                        prevent(e);
                    }

                    onmove.apply(element, [dragX, dragY, e]);
                }
            }

            function start(e) {
                var rightclick = e.which ? e.which == 3 : e.button == 2;

                if (!rightclick && !dragging) {
                    if (onstart.apply(element, arguments) !== false) {
                        dragging = true;
                        maxHeight = $(element).height();
                        maxWidth = $(element).width();
                        offset = $(element).offset();

                        $(doc).bind(duringDragEvents);
                        $(doc.body).addClass("sp-dragging");

                        move(e);

                        prevent(e);
                    }
                }
            }

            function stop() {
                if (dragging) {
                    $(doc).unbind(duringDragEvents);
                    $(doc.body).removeClass("sp-dragging");

                    // Wait a tick before notifying observers to allow the click event
                    // to fire in Chrome.
                    setTimeout(function () {
                        onstop.apply(element, arguments);
                    }, 0);
                }
                dragging = false;
            }

            $(element).bind("touchstart mousedown", start);
        }

        function throttle(func, wait, debounce) {
            var timeout;
            return function () {
                var context = this,
                    args = arguments;
                var throttler = function throttler() {
                    timeout = null;
                    func.apply(context, args);
                };
                if (debounce) clearTimeout(timeout);
                if (debounce || !timeout) timeout = setTimeout(throttler, wait);
            };
        }

        function inputTypeColorSupport() {
            return $.fn.spectrum.inputTypeColorSupport();
        }

        /**
        * Define a jQuery plugin
        */
        var dataID = "spectrum.id";
        $.fn.spectrum = function (opts, extra) {

            if (typeof opts == "string") {

                var returnValue = this;
                var args = Array.prototype.slice.call(arguments, 1);

                this.each(function () {
                    var spect = spectrums[$(this).data(dataID)];
                    if (spect) {
                        var method = spect[opts];
                        if (!method) {
                            throw new Error("Spectrum: no such method: '" + opts + "'");
                        }

                        if (opts == "get") {
                            returnValue = spect.get();
                        } else if (opts == "container") {
                            returnValue = spect.container;
                        } else if (opts == "option") {
                            returnValue = spect.option.apply(spect, args);
                        } else if (opts == "destroy") {
                            spect.destroy();
                            $(this).removeData(dataID);
                        } else {
                            method.apply(spect, args);
                        }
                    }
                });

                return returnValue;
            }

            // Initializing a new instance of spectrum
            return this.spectrum("destroy").each(function () {
                var options = $.extend({}, opts, $(this).data());
                var spect = spectrum(this, options);
                $(this).data(dataID, spect.id);
            });
        };

        $.fn.spectrum.load = true;
        $.fn.spectrum.loadOpts = {};
        $.fn.spectrum.draggable = draggable;
        $.fn.spectrum.defaults = defaultOpts;
        $.fn.spectrum.inputTypeColorSupport = function inputTypeColorSupport() {
            if (typeof inputTypeColorSupport._cachedResult === "undefined") {
                var colorInput = $("<input type='color' value='!' />")[0];
                inputTypeColorSupport._cachedResult = colorInput.type === "color" && colorInput.value !== "!";
            }
            return inputTypeColorSupport._cachedResult;
        };

        $.spectrum = {};
        $.spectrum.localization = {};
        $.spectrum.palettes = {};

        $.fn.spectrum.processNativeColorInputs = function () {
            var colorInputs = $("input[type=color]");
            if (colorInputs.length && !inputTypeColorSupport()) {
                colorInputs.spectrum({
                    preferredFormat: "hex6"
                });
            }
        };

        // TinyColor v1.1.2
        // https://github.com/bgrins/TinyColor
        // Brian Grinstead, MIT License

        (function () {

            var trimLeft = /^[\s,#]+/,
                trimRight = /\s+$/,
                tinyCounter = 0,
                math = Math,
                mathRound = math.round,
                mathMin = math.min,
                mathMax = math.max,
                mathRandom = math.random;

            var tinycolor = function tinycolor(color, opts) {

                color = color ? color : '';
                opts = opts || {};

                // If input is already a tinycolor, return itself
                if (color instanceof tinycolor) {
                    return color;
                }
                // If we are called as a function, call using new instead
                if (!(this instanceof tinycolor)) {
                    return new tinycolor(color, opts);
                }

                var rgb = inputToRGB(color);
                this._originalInput = color, this._r = rgb.r, this._g = rgb.g, this._b = rgb.b, this._a = rgb.a, this._roundA = mathRound(100 * this._a) / 100, this._format = opts.format || rgb.format;
                this._gradientType = opts.gradientType;

                // Don't let the range of [0,255] come back in [0,1].
                // Potentially lose a little bit of precision here, but will fix issues where
                // .5 gets interpreted as half of the total, instead of half of 1
                // If it was supposed to be 128, this was already taken care of by `inputToRgb`
                if (this._r < 1) {
                    this._r = mathRound(this._r);
                }
                if (this._g < 1) {
                    this._g = mathRound(this._g);
                }
                if (this._b < 1) {
                    this._b = mathRound(this._b);
                }

                this._ok = rgb.ok;
                this._tc_id = tinyCounter++;
            };

            tinycolor.prototype = {
                isDark: function isDark() {
                    return this.getBrightness() < 128;
                },
                isLight: function isLight() {
                    return !this.isDark();
                },
                isValid: function isValid() {
                    return this._ok;
                },
                getOriginalInput: function getOriginalInput() {
                    return this._originalInput;
                },
                getFormat: function getFormat() {
                    return this._format;
                },
                getAlpha: function getAlpha() {
                    return this._a;
                },
                getBrightness: function getBrightness() {
                    var rgb = this.toRgb();
                    return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
                },
                setAlpha: function setAlpha(value) {
                    this._a = boundAlpha(value);
                    this._roundA = mathRound(100 * this._a) / 100;
                    return this;
                },
                toHsv: function toHsv() {
                    var hsv = rgbToHsv(this._r, this._g, this._b);
                    return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this._a };
                },
                toHsvString: function toHsvString() {
                    var hsv = rgbToHsv(this._r, this._g, this._b);
                    var h = mathRound(hsv.h * 360),
                        s = mathRound(hsv.s * 100),
                        v = mathRound(hsv.v * 100);
                    return this._a == 1 ? "hsv(" + h + ", " + s + "%, " + v + "%)" : "hsva(" + h + ", " + s + "%, " + v + "%, " + this._roundA + ")";
                },
                toHsl: function toHsl() {
                    var hsl = rgbToHsl(this._r, this._g, this._b);
                    return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this._a };
                },
                toHslString: function toHslString() {
                    var hsl = rgbToHsl(this._r, this._g, this._b);
                    var h = mathRound(hsl.h * 360),
                        s = mathRound(hsl.s * 100),
                        l = mathRound(hsl.l * 100);
                    return this._a == 1 ? "hsl(" + h + ", " + s + "%, " + l + "%)" : "hsla(" + h + ", " + s + "%, " + l + "%, " + this._roundA + ")";
                },
                toHex: function toHex(allow3Char) {
                    return rgbToHex(this._r, this._g, this._b, allow3Char);
                },
                toHexString: function toHexString(allow3Char) {
                    return '#' + this.toHex(allow3Char);
                },
                toHex8: function toHex8() {
                    return rgbaToHex(this._r, this._g, this._b, this._a);
                },
                toHex8String: function toHex8String() {
                    return '#' + this.toHex8();
                },
                toRgb: function toRgb() {
                    return { r: mathRound(this._r), g: mathRound(this._g), b: mathRound(this._b), a: this._a };
                },
                toRgbString: function toRgbString() {
                    return this._a == 1 ? "rgb(" + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ")" : "rgba(" + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ", " + this._roundA + ")";
                },
                toPercentageRgb: function toPercentageRgb() {
                    return { r: mathRound(bound01(this._r, 255) * 100) + "%", g: mathRound(bound01(this._g, 255) * 100) + "%", b: mathRound(bound01(this._b, 255) * 100) + "%", a: this._a };
                },
                toPercentageRgbString: function toPercentageRgbString() {
                    return this._a == 1 ? "rgb(" + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%)" : "rgba(" + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%, " + this._roundA + ")";
                },
                toName: function toName() {
                    if (this._a === 0) {
                        return "transparent";
                    }

                    if (this._a < 1) {
                        return false;
                    }

                    return hexNames[rgbToHex(this._r, this._g, this._b, true)] || false;
                },
                toFilter: function toFilter(secondColor) {
                    var hex8String = '#' + rgbaToHex(this._r, this._g, this._b, this._a);
                    var secondHex8String = hex8String;
                    var gradientType = this._gradientType ? "GradientType = 1, " : "";

                    if (secondColor) {
                        var s = tinycolor(secondColor);
                        secondHex8String = s.toHex8String();
                    }

                    return "progid:DXImageTransform.Microsoft.gradient(" + gradientType + "startColorstr=" + hex8String + ",endColorstr=" + secondHex8String + ")";
                },
                toString: function toString(format) {
                    var formatSet = !!format;
                    format = format || this._format;

                    var formattedString = false;
                    var hasAlpha = this._a < 1 && this._a >= 0;
                    var needsAlphaFormat = !formatSet && hasAlpha && (format === "hex" || format === "hex6" || format === "hex3" || format === "name");

                    if (needsAlphaFormat) {
                        // Special case for "transparent", all other non-alpha formats
                        // will return rgba when there is transparency.
                        if (format === "name" && this._a === 0) {
                            return this.toName();
                        }
                        return this.toRgbString();
                    }
                    if (format === "rgb") {
                        formattedString = this.toRgbString();
                    }
                    if (format === "prgb") {
                        formattedString = this.toPercentageRgbString();
                    }
                    if (format === "hex" || format === "hex6") {
                        formattedString = this.toHexString();
                    }
                    if (format === "hex3") {
                        formattedString = this.toHexString(true);
                    }
                    if (format === "hex8") {
                        formattedString = this.toHex8String();
                    }
                    if (format === "name") {
                        formattedString = this.toName();
                    }
                    if (format === "hsl") {
                        formattedString = this.toHslString();
                    }
                    if (format === "hsv") {
                        formattedString = this.toHsvString();
                    }

                    return formattedString || this.toHexString();
                },

                _applyModification: function _applyModification(fn, args) {
                    var color = fn.apply(null, [this].concat([].slice.call(args)));
                    this._r = color._r;
                    this._g = color._g;
                    this._b = color._b;
                    this.setAlpha(color._a);
                    return this;
                },
                lighten: function lighten() {
                    return this._applyModification(_lighten, arguments);
                },
                brighten: function brighten() {
                    return this._applyModification(_brighten, arguments);
                },
                darken: function darken() {
                    return this._applyModification(_darken, arguments);
                },
                desaturate: function desaturate() {
                    return this._applyModification(_desaturate, arguments);
                },
                saturate: function saturate() {
                    return this._applyModification(_saturate, arguments);
                },
                greyscale: function greyscale() {
                    return this._applyModification(_greyscale, arguments);
                },
                spin: function spin() {
                    return this._applyModification(_spin, arguments);
                },

                _applyCombination: function _applyCombination(fn, args) {
                    return fn.apply(null, [this].concat([].slice.call(args)));
                },
                analogous: function analogous() {
                    return this._applyCombination(_analogous, arguments);
                },
                complement: function complement() {
                    return this._applyCombination(_complement, arguments);
                },
                monochromatic: function monochromatic() {
                    return this._applyCombination(_monochromatic, arguments);
                },
                splitcomplement: function splitcomplement() {
                    return this._applyCombination(_splitcomplement, arguments);
                },
                triad: function triad() {
                    return this._applyCombination(_triad, arguments);
                },
                tetrad: function tetrad() {
                    return this._applyCombination(_tetrad, arguments);
                }
            };

            // If input is an object, force 1 into "1.0" to handle ratios properly
            // String input requires "1.0" as input, so 1 will be treated as 1
            tinycolor.fromRatio = function (color, opts) {
                if ((typeof color === "undefined" ? "undefined" : _typeof(color)) == "object") {
                    var newColor = {};
                    for (var i in color) {
                        if (color.hasOwnProperty(i)) {
                            if (i === "a") {
                                newColor[i] = color[i];
                            } else {
                                newColor[i] = convertToPercentage(color[i]);
                            }
                        }
                    }
                    color = newColor;
                }

                return tinycolor(color, opts);
            };

            // Given a string or object, convert that input to RGB
            // Possible string inputs:
            //
            //     "red"
            //     "#f00" or "f00"
            //     "#ff0000" or "ff0000"
            //     "#ff000000" or "ff000000"
            //     "rgb 255 0 0" or "rgb (255, 0, 0)"
            //     "rgb 1.0 0 0" or "rgb (1, 0, 0)"
            //     "rgba (255, 0, 0, 1)" or "rgba 255, 0, 0, 1"
            //     "rgba (1.0, 0, 0, 1)" or "rgba 1.0, 0, 0, 1"
            //     "hsl(0, 100%, 50%)" or "hsl 0 100% 50%"
            //     "hsla(0, 100%, 50%, 1)" or "hsla 0 100% 50%, 1"
            //     "hsv(0, 100%, 100%)" or "hsv 0 100% 100%"
            //
            function inputToRGB(color) {

                var rgb = { r: 0, g: 0, b: 0 };
                var a = 1;
                var ok = false;
                var format = false;

                if (typeof color == "string") {
                    color = stringInputToObject(color);
                }

                if ((typeof color === "undefined" ? "undefined" : _typeof(color)) == "object") {
                    if (color.hasOwnProperty("r") && color.hasOwnProperty("g") && color.hasOwnProperty("b")) {
                        rgb = rgbToRgb(color.r, color.g, color.b);
                        ok = true;
                        format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
                    } else if (color.hasOwnProperty("h") && color.hasOwnProperty("s") && color.hasOwnProperty("v")) {
                        color.s = convertToPercentage(color.s);
                        color.v = convertToPercentage(color.v);
                        rgb = hsvToRgb(color.h, color.s, color.v);
                        ok = true;
                        format = "hsv";
                    } else if (color.hasOwnProperty("h") && color.hasOwnProperty("s") && color.hasOwnProperty("l")) {
                        color.s = convertToPercentage(color.s);
                        color.l = convertToPercentage(color.l);
                        rgb = hslToRgb(color.h, color.s, color.l);
                        ok = true;
                        format = "hsl";
                    }

                    if (color.hasOwnProperty("a")) {
                        a = color.a;
                    }
                }

                a = boundAlpha(a);

                return {
                    ok: ok,
                    format: color.format || format,
                    r: mathMin(255, mathMax(rgb.r, 0)),
                    g: mathMin(255, mathMax(rgb.g, 0)),
                    b: mathMin(255, mathMax(rgb.b, 0)),
                    a: a
                };
            }

            // Conversion Functions
            // --------------------

            // `rgbToHsl`, `rgbToHsv`, `hslToRgb`, `hsvToRgb` modified from:
            // <http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript>

            // `rgbToRgb`
            // Handle bounds / percentage checking to conform to CSS color spec
            // <http://www.w3.org/TR/css3-color/>
            // *Assumes:* r, g, b in [0, 255] or [0, 1]
            // *Returns:* { r, g, b } in [0, 255]
            function rgbToRgb(r, g, b) {
                return {
                    r: bound01(r, 255) * 255,
                    g: bound01(g, 255) * 255,
                    b: bound01(b, 255) * 255
                };
            }

            // `rgbToHsl`
            // Converts an RGB color value to HSL.
            // *Assumes:* r, g, and b are contained in [0, 255] or [0, 1]
            // *Returns:* { h, s, l } in [0,1]
            function rgbToHsl(r, g, b) {

                r = bound01(r, 255);
                g = bound01(g, 255);
                b = bound01(b, 255);

                var max = mathMax(r, g, b),
                    min = mathMin(r, g, b);
                var h,
                    s,
                    l = (max + min) / 2;

                if (max == min) {
                    h = s = 0; // achromatic
                } else {
                        var d = max - min;
                        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                        switch (max) {
                            case r:
                                h = (g - b) / d + (g < b ? 6 : 0);break;
                            case g:
                                h = (b - r) / d + 2;break;
                            case b:
                                h = (r - g) / d + 4;break;
                        }

                        h /= 6;
                    }

                return { h: h, s: s, l: l };
            }

            // `hslToRgb`
            // Converts an HSL color value to RGB.
            // *Assumes:* h is contained in [0, 1] or [0, 360] and s and l are contained [0, 1] or [0, 100]
            // *Returns:* { r, g, b } in the set [0, 255]
            function hslToRgb(h, s, l) {
                var r, g, b;

                h = bound01(h, 360);
                s = bound01(s, 100);
                l = bound01(l, 100);

                function hue2rgb(p, q, t) {
                    if (t < 0) t += 1;
                    if (t > 1) t -= 1;
                    if (t < 1 / 6) return p + (q - p) * 6 * t;
                    if (t < 1 / 2) return q;
                    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                    return p;
                }

                if (s === 0) {
                    r = g = b = l; // achromatic
                } else {
                        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                        var p = 2 * l - q;
                        r = hue2rgb(p, q, h + 1 / 3);
                        g = hue2rgb(p, q, h);
                        b = hue2rgb(p, q, h - 1 / 3);
                    }

                return { r: r * 255, g: g * 255, b: b * 255 };
            }

            // `rgbToHsv`
            // Converts an RGB color value to HSV
            // *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
            // *Returns:* { h, s, v } in [0,1]
            function rgbToHsv(r, g, b) {

                r = bound01(r, 255);
                g = bound01(g, 255);
                b = bound01(b, 255);

                var max = mathMax(r, g, b),
                    min = mathMin(r, g, b);
                var h,
                    s,
                    v = max;

                var d = max - min;
                s = max === 0 ? 0 : d / max;

                if (max == min) {
                    h = 0; // achromatic
                } else {
                        switch (max) {
                            case r:
                                h = (g - b) / d + (g < b ? 6 : 0);break;
                            case g:
                                h = (b - r) / d + 2;break;
                            case b:
                                h = (r - g) / d + 4;break;
                        }
                        h /= 6;
                    }
                return { h: h, s: s, v: v };
            }

            // `hsvToRgb`
            // Converts an HSV color value to RGB.
            // *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
            // *Returns:* { r, g, b } in the set [0, 255]
            function hsvToRgb(h, s, v) {

                h = bound01(h, 360) * 6;
                s = bound01(s, 100);
                v = bound01(v, 100);

                var i = math.floor(h),
                    f = h - i,
                    p = v * (1 - s),
                    q = v * (1 - f * s),
                    t = v * (1 - (1 - f) * s),
                    mod = i % 6,
                    r = [v, q, p, p, t, v][mod],
                    g = [t, v, v, q, p, p][mod],
                    b = [p, p, t, v, v, q][mod];

                return { r: r * 255, g: g * 255, b: b * 255 };
            }

            // `rgbToHex`
            // Converts an RGB color to hex
            // Assumes r, g, and b are contained in the set [0, 255]
            // Returns a 3 or 6 character hex
            function rgbToHex(r, g, b, allow3Char) {

                var hex = [pad2(mathRound(r).toString(16)), pad2(mathRound(g).toString(16)), pad2(mathRound(b).toString(16))];

                // Return a 3 character hex if possible
                if (allow3Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1)) {
                    return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
                }

                return hex.join("");
            }
            // `rgbaToHex`
            // Converts an RGBA color plus alpha transparency to hex
            // Assumes r, g, b and a are contained in the set [0, 255]
            // Returns an 8 character hex
            function rgbaToHex(r, g, b, a) {

                var hex = [pad2(convertDecimalToHex(a)), pad2(mathRound(r).toString(16)), pad2(mathRound(g).toString(16)), pad2(mathRound(b).toString(16))];

                return hex.join("");
            }

            // `equals`
            // Can be called with any tinycolor input
            tinycolor.equals = function (color1, color2) {
                if (!color1 || !color2) {
                    return false;
                }
                return tinycolor(color1).toRgbString() == tinycolor(color2).toRgbString();
            };
            tinycolor.random = function () {
                return tinycolor.fromRatio({
                    r: mathRandom(),
                    g: mathRandom(),
                    b: mathRandom()
                });
            };

            // Modification Functions
            // ----------------------
            // Thanks to less.js for some of the basics here
            // <https://github.com/cloudhead/less.js/blob/master/lib/less/functions.js>

            function _desaturate(color, amount) {
                amount = amount === 0 ? 0 : amount || 10;
                var hsl = tinycolor(color).toHsl();
                hsl.s -= amount / 100;
                hsl.s = clamp01(hsl.s);
                return tinycolor(hsl);
            }

            function _saturate(color, amount) {
                amount = amount === 0 ? 0 : amount || 10;
                var hsl = tinycolor(color).toHsl();
                hsl.s += amount / 100;
                hsl.s = clamp01(hsl.s);
                return tinycolor(hsl);
            }

            function _greyscale(color) {
                return tinycolor(color).desaturate(100);
            }

            function _lighten(color, amount) {
                amount = amount === 0 ? 0 : amount || 10;
                var hsl = tinycolor(color).toHsl();
                hsl.l += amount / 100;
                hsl.l = clamp01(hsl.l);
                return tinycolor(hsl);
            }

            function _brighten(color, amount) {
                amount = amount === 0 ? 0 : amount || 10;
                var rgb = tinycolor(color).toRgb();
                rgb.r = mathMax(0, mathMin(255, rgb.r - mathRound(255 * -(amount / 100))));
                rgb.g = mathMax(0, mathMin(255, rgb.g - mathRound(255 * -(amount / 100))));
                rgb.b = mathMax(0, mathMin(255, rgb.b - mathRound(255 * -(amount / 100))));
                return tinycolor(rgb);
            }

            function _darken(color, amount) {
                amount = amount === 0 ? 0 : amount || 10;
                var hsl = tinycolor(color).toHsl();
                hsl.l -= amount / 100;
                hsl.l = clamp01(hsl.l);
                return tinycolor(hsl);
            }

            // Spin takes a positive or negative amount within [-360, 360] indicating the change of hue.
            // Values outside of this range will be wrapped into this range.
            function _spin(color, amount) {
                var hsl = tinycolor(color).toHsl();
                var hue = (mathRound(hsl.h) + amount) % 360;
                hsl.h = hue < 0 ? 360 + hue : hue;
                return tinycolor(hsl);
            }

            // Combination Functions
            // ---------------------
            // Thanks to jQuery xColor for some of the ideas behind these
            // <https://github.com/infusion/jQuery-xcolor/blob/master/jquery.xcolor.js>

            function _complement(color) {
                var hsl = tinycolor(color).toHsl();
                hsl.h = (hsl.h + 180) % 360;
                return tinycolor(hsl);
            }

            function _triad(color) {
                var hsl = tinycolor(color).toHsl();
                var h = hsl.h;
                return [tinycolor(color), tinycolor({ h: (h + 120) % 360, s: hsl.s, l: hsl.l }), tinycolor({ h: (h + 240) % 360, s: hsl.s, l: hsl.l })];
            }

            function _tetrad(color) {
                var hsl = tinycolor(color).toHsl();
                var h = hsl.h;
                return [tinycolor(color), tinycolor({ h: (h + 90) % 360, s: hsl.s, l: hsl.l }), tinycolor({ h: (h + 180) % 360, s: hsl.s, l: hsl.l }), tinycolor({ h: (h + 270) % 360, s: hsl.s, l: hsl.l })];
            }

            function _splitcomplement(color) {
                var hsl = tinycolor(color).toHsl();
                var h = hsl.h;
                return [tinycolor(color), tinycolor({ h: (h + 72) % 360, s: hsl.s, l: hsl.l }), tinycolor({ h: (h + 216) % 360, s: hsl.s, l: hsl.l })];
            }

            function _analogous(color, results, slices) {
                results = results || 6;
                slices = slices || 30;

                var hsl = tinycolor(color).toHsl();
                var part = 360 / slices;
                var ret = [tinycolor(color)];

                for (hsl.h = (hsl.h - (part * results >> 1) + 720) % 360; --results;) {
                    hsl.h = (hsl.h + part) % 360;
                    ret.push(tinycolor(hsl));
                }
                return ret;
            }

            function _monochromatic(color, results) {
                results = results || 6;
                var hsv = tinycolor(color).toHsv();
                var h = hsv.h,
                    s = hsv.s,
                    v = hsv.v;
                var ret = [];
                var modification = 1 / results;

                while (results--) {
                    ret.push(tinycolor({ h: h, s: s, v: v }));
                    v = (v + modification) % 1;
                }

                return ret;
            }

            // Utility Functions
            // ---------------------

            tinycolor.mix = function (color1, color2, amount) {
                amount = amount === 0 ? 0 : amount || 50;

                var rgb1 = tinycolor(color1).toRgb();
                var rgb2 = tinycolor(color2).toRgb();

                var p = amount / 100;
                var w = p * 2 - 1;
                var a = rgb2.a - rgb1.a;

                var w1;

                if (w * a == -1) {
                    w1 = w;
                } else {
                    w1 = (w + a) / (1 + w * a);
                }

                w1 = (w1 + 1) / 2;

                var w2 = 1 - w1;

                var rgba = {
                    r: rgb2.r * w1 + rgb1.r * w2,
                    g: rgb2.g * w1 + rgb1.g * w2,
                    b: rgb2.b * w1 + rgb1.b * w2,
                    a: rgb2.a * p + rgb1.a * (1 - p)
                };

                return tinycolor(rgba);
            };

            // Readability Functions
            // ---------------------
            // <http://www.w3.org/TR/AERT#color-contrast>

            // `readability`
            // Analyze the 2 colors and returns an object with the following properties:
            //    `brightness`: difference in brightness between the two colors
            //    `color`: difference in color/hue between the two colors
            tinycolor.readability = function (color1, color2) {
                var c1 = tinycolor(color1);
                var c2 = tinycolor(color2);
                var rgb1 = c1.toRgb();
                var rgb2 = c2.toRgb();
                var brightnessA = c1.getBrightness();
                var brightnessB = c2.getBrightness();
                var colorDiff = Math.max(rgb1.r, rgb2.r) - Math.min(rgb1.r, rgb2.r) + Math.max(rgb1.g, rgb2.g) - Math.min(rgb1.g, rgb2.g) + Math.max(rgb1.b, rgb2.b) - Math.min(rgb1.b, rgb2.b);

                return {
                    brightness: Math.abs(brightnessA - brightnessB),
                    color: colorDiff
                };
            };

            // `readable`
            // http://www.w3.org/TR/AERT#color-contrast
            // Ensure that foreground and background color combinations provide sufficient contrast.
            // *Example*
            //    tinycolor.isReadable("#000", "#111") => false
            tinycolor.isReadable = function (color1, color2) {
                var readability = tinycolor.readability(color1, color2);
                return readability.brightness > 125 && readability.color > 500;
            };

            // `mostReadable`
            // Given a base color and a list of possible foreground or background
            // colors for that base, returns the most readable color.
            // *Example*
            //    tinycolor.mostReadable("#123", ["#fff", "#000"]) => "#000"
            tinycolor.mostReadable = function (baseColor, colorList) {
                var bestColor = null;
                var bestScore = 0;
                var bestIsReadable = false;
                for (var i = 0; i < colorList.length; i++) {

                    // We normalize both around the "acceptable" breaking point,
                    // but rank brightness constrast higher than hue.

                    var readability = tinycolor.readability(baseColor, colorList[i]);
                    var readable = readability.brightness > 125 && readability.color > 500;
                    var score = 3 * (readability.brightness / 125) + readability.color / 500;

                    if (readable && !bestIsReadable || readable && bestIsReadable && score > bestScore || !readable && !bestIsReadable && score > bestScore) {
                        bestIsReadable = readable;
                        bestScore = score;
                        bestColor = tinycolor(colorList[i]);
                    }
                }
                return bestColor;
            };

            // Big List of Colors
            // ------------------
            // <http://www.w3.org/TR/css3-color/#svg-color>
            var names = tinycolor.names = {
                aliceblue: "f0f8ff",
                antiquewhite: "faebd7",
                aqua: "0ff",
                aquamarine: "7fffd4",
                azure: "f0ffff",
                beige: "f5f5dc",
                bisque: "ffe4c4",
                black: "000",
                blanchedalmond: "ffebcd",
                blue: "00f",
                blueviolet: "8a2be2",
                brown: "a52a2a",
                burlywood: "deb887",
                burntsienna: "ea7e5d",
                cadetblue: "5f9ea0",
                chartreuse: "7fff00",
                chocolate: "d2691e",
                coral: "ff7f50",
                cornflowerblue: "6495ed",
                cornsilk: "fff8dc",
                crimson: "dc143c",
                cyan: "0ff",
                darkblue: "00008b",
                darkcyan: "008b8b",
                darkgoldenrod: "b8860b",
                darkgray: "a9a9a9",
                darkgreen: "006400",
                darkgrey: "a9a9a9",
                darkkhaki: "bdb76b",
                darkmagenta: "8b008b",
                darkolivegreen: "556b2f",
                darkorange: "ff8c00",
                darkorchid: "9932cc",
                darkred: "8b0000",
                darksalmon: "e9967a",
                darkseagreen: "8fbc8f",
                darkslateblue: "483d8b",
                darkslategray: "2f4f4f",
                darkslategrey: "2f4f4f",
                darkturquoise: "00ced1",
                darkviolet: "9400d3",
                deeppink: "ff1493",
                deepskyblue: "00bfff",
                dimgray: "696969",
                dimgrey: "696969",
                dodgerblue: "1e90ff",
                firebrick: "b22222",
                floralwhite: "fffaf0",
                forestgreen: "228b22",
                fuchsia: "f0f",
                gainsboro: "dcdcdc",
                ghostwhite: "f8f8ff",
                gold: "ffd700",
                goldenrod: "daa520",
                gray: "808080",
                green: "008000",
                greenyellow: "adff2f",
                grey: "808080",
                honeydew: "f0fff0",
                hotpink: "ff69b4",
                indianred: "cd5c5c",
                indigo: "4b0082",
                ivory: "fffff0",
                khaki: "f0e68c",
                lavender: "e6e6fa",
                lavenderblush: "fff0f5",
                lawngreen: "7cfc00",
                lemonchiffon: "fffacd",
                lightblue: "add8e6",
                lightcoral: "f08080",
                lightcyan: "e0ffff",
                lightgoldenrodyellow: "fafad2",
                lightgray: "d3d3d3",
                lightgreen: "90ee90",
                lightgrey: "d3d3d3",
                lightpink: "ffb6c1",
                lightsalmon: "ffa07a",
                lightseagreen: "20b2aa",
                lightskyblue: "87cefa",
                lightslategray: "789",
                lightslategrey: "789",
                lightsteelblue: "b0c4de",
                lightyellow: "ffffe0",
                lime: "0f0",
                limegreen: "32cd32",
                linen: "faf0e6",
                magenta: "f0f",
                maroon: "800000",
                mediumaquamarine: "66cdaa",
                mediumblue: "0000cd",
                mediumorchid: "ba55d3",
                mediumpurple: "9370db",
                mediumseagreen: "3cb371",
                mediumslateblue: "7b68ee",
                mediumspringgreen: "00fa9a",
                mediumturquoise: "48d1cc",
                mediumvioletred: "c71585",
                midnightblue: "191970",
                mintcream: "f5fffa",
                mistyrose: "ffe4e1",
                moccasin: "ffe4b5",
                navajowhite: "ffdead",
                navy: "000080",
                oldlace: "fdf5e6",
                olive: "808000",
                olivedrab: "6b8e23",
                orange: "ffa500",
                orangered: "ff4500",
                orchid: "da70d6",
                palegoldenrod: "eee8aa",
                palegreen: "98fb98",
                paleturquoise: "afeeee",
                palevioletred: "db7093",
                papayawhip: "ffefd5",
                peachpuff: "ffdab9",
                peru: "cd853f",
                pink: "ffc0cb",
                plum: "dda0dd",
                powderblue: "b0e0e6",
                purple: "800080",
                rebeccapurple: "663399",
                red: "f00",
                rosybrown: "bc8f8f",
                royalblue: "4169e1",
                saddlebrown: "8b4513",
                salmon: "fa8072",
                sandybrown: "f4a460",
                seagreen: "2e8b57",
                seashell: "fff5ee",
                sienna: "a0522d",
                silver: "c0c0c0",
                skyblue: "87ceeb",
                slateblue: "6a5acd",
                slategray: "708090",
                slategrey: "708090",
                snow: "fffafa",
                springgreen: "00ff7f",
                steelblue: "4682b4",
                tan: "d2b48c",
                teal: "008080",
                thistle: "d8bfd8",
                tomato: "ff6347",
                turquoise: "40e0d0",
                violet: "ee82ee",
                wheat: "f5deb3",
                white: "fff",
                whitesmoke: "f5f5f5",
                yellow: "ff0",
                yellowgreen: "9acd32"
            };

            // Make it easy to access colors via `hexNames[hex]`
            var hexNames = tinycolor.hexNames = flip(names);

            // Utilities
            // ---------

            // `{ 'name1': 'val1' }` becomes `{ 'val1': 'name1' }`
            function flip(o) {
                var flipped = {};
                for (var i in o) {
                    if (o.hasOwnProperty(i)) {
                        flipped[o[i]] = i;
                    }
                }
                return flipped;
            }

            // Return a valid alpha value [0,1] with all invalid values being set to 1
            function boundAlpha(a) {
                a = parseFloat(a);

                if (isNaN(a) || a < 0 || a > 1) {
                    a = 1;
                }

                return a;
            }

            // Take input from [0, n] and return it as [0, 1]
            function bound01(n, max) {
                if (isOnePointZero(n)) {
                    n = "100%";
                }

                var processPercent = isPercentage(n);
                n = mathMin(max, mathMax(0, parseFloat(n)));

                // Automatically convert percentage into number
                if (processPercent) {
                    n = parseInt(n * max, 10) / 100;
                }

                // Handle floating point rounding errors
                if (math.abs(n - max) < 0.000001) {
                    return 1;
                }

                // Convert into [0, 1] range if it isn't already
                return n % max / parseFloat(max);
            }

            // Force a number between 0 and 1
            function clamp01(val) {
                return mathMin(1, mathMax(0, val));
            }

            // Parse a base-16 hex value into a base-10 integer
            function parseIntFromHex(val) {
                return parseInt(val, 16);
            }

            // Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
            // <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
            function isOnePointZero(n) {
                return typeof n == "string" && n.indexOf('.') != -1 && parseFloat(n) === 1;
            }

            // Check to see if string passed in is a percentage
            function isPercentage(n) {
                return typeof n === "string" && n.indexOf('%') != -1;
            }

            // Force a hex value to have 2 characters
            function pad2(c) {
                return c.length == 1 ? '0' + c : '' + c;
            }

            // Replace a decimal with it's percentage value
            function convertToPercentage(n) {
                if (n <= 1) {
                    n = n * 100 + "%";
                }

                return n;
            }

            // Converts a decimal to a hex value
            function convertDecimalToHex(d) {
                return Math.round(parseFloat(d) * 255).toString(16);
            }
            // Converts a hex value to a decimal
            function convertHexToDecimal(h) {
                return parseIntFromHex(h) / 255;
            }

            var matchers = function () {

                // <http://www.w3.org/TR/css3-values/#integers>
                var CSS_INTEGER = "[-\\+]?\\d+%?";

                // <http://www.w3.org/TR/css3-values/#number-value>
                var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";

                // Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.
                var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";

                // Actual matching.
                // Parentheses and commas are optional, but not required.
                // Whitespace can take the place of commas or opening paren
                var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
                var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";

                return {
                    rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
                    rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
                    hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
                    hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
                    hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
                    hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
                    hex3: /^([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
                    hex6: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
                    hex8: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
                };
            }();

            // `stringInputToObject`
            // Permissive string parsing.  Take in a number of formats, and output an object
            // based on detected format.  Returns `{ r, g, b }` or `{ h, s, l }` or `{ h, s, v}`
            function stringInputToObject(color) {

                color = color.replace(trimLeft, '').replace(trimRight, '').toLowerCase();
                var named = false;
                if (names[color]) {
                    color = names[color];
                    named = true;
                } else if (color == 'transparent') {
                    return { r: 0, g: 0, b: 0, a: 0, format: "name" };
                }

                // Try to match string input using regular expressions.
                // Keep most of the number bounding out of this function - don't worry about [0,1] or [0,100] or [0,360]
                // Just return an object and let the conversion functions handle that.
                // This way the result will be the same whether the tinycolor is initialized with string or object.
                var match;
                if (match = matchers.rgb.exec(color)) {
                    return { r: match[1], g: match[2], b: match[3] };
                }
                if (match = matchers.rgba.exec(color)) {
                    return { r: match[1], g: match[2], b: match[3], a: match[4] };
                }
                if (match = matchers.hsl.exec(color)) {
                    return { h: match[1], s: match[2], l: match[3] };
                }
                if (match = matchers.hsla.exec(color)) {
                    return { h: match[1], s: match[2], l: match[3], a: match[4] };
                }
                if (match = matchers.hsv.exec(color)) {
                    return { h: match[1], s: match[2], v: match[3] };
                }
                if (match = matchers.hsva.exec(color)) {
                    return { h: match[1], s: match[2], v: match[3], a: match[4] };
                }
                if (match = matchers.hex8.exec(color)) {
                    return {
                        a: convertHexToDecimal(match[1]),
                        r: parseIntFromHex(match[2]),
                        g: parseIntFromHex(match[3]),
                        b: parseIntFromHex(match[4]),
                        format: named ? "name" : "hex8"
                    };
                }
                if (match = matchers.hex6.exec(color)) {
                    return {
                        r: parseIntFromHex(match[1]),
                        g: parseIntFromHex(match[2]),
                        b: parseIntFromHex(match[3]),
                        format: named ? "name" : "hex"
                    };
                }
                if (match = matchers.hex3.exec(color)) {
                    return {
                        r: parseIntFromHex(match[1] + '' + match[1]),
                        g: parseIntFromHex(match[2] + '' + match[2]),
                        b: parseIntFromHex(match[3] + '' + match[3]),
                        format: named ? "name" : "hex"
                    };
                }

                return false;
            }

            window.tinycolor = tinycolor;
        })();

        $(function () {
            if ($.fn.spectrum.load) {
                $.fn.spectrum.processNativeColorInputs();
            }
        });
    });
}).call(global, module, undefined, undefined);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"/var/www/streambed/shelly/toolpanel/static/toolpanel/dist/temp/jquery-1.8.3.min.js":3}],8:[function(require,module,exports){
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

},{"bootstrap":2,"bootstrap-select":1,"jquery":3,"jquery-ui":4,"jquery-ui-spinner":6,"spectrum":7,"tipsy":5}]},{},[8]);
