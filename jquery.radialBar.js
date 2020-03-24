/*--------------------------------------------------------------------
 *JAVASCRIPT "jquery.radialBar.js"
 *Version:    0.1.0 - 2020
 *author:     Ahed Kabalan
 *Licensed MIT 
-----------------------------------------------------------------------*/

;(function ($) {
    "use strict";

    var pluginName = 'radialBar';

    var svgNS = "http://www.w3.org/2000/svg";

    var RadialBar = function (element, options) {
        var self = this;
        self.element = element;
        self.$element = $(element);
        self._init(options);
    };

    RadialBar.prototype = {
        constructor: RadialBar,
        _init: function (options) {
            var self = this, $el = self.$element.addClass('');
            self.options = options;
            $.each(options, function (key, value) {
                self[key] = value;
            });

            self._build();

            var $container = self.$container = $(document.createElement("div")).insertBefore($el);
            $(document.createElement("div")).attr('class', 'radia-bar-container').appendTo($container)
                .append(self.svgContainer);

            return $el.removeClass('radia-bar-loading');
        },

        _build: function(){
            var self = this;
            
            var w = typeof self.options.width === 'undefined' ? "200" : self.options.width,
                h = typeof self.options.height === 'undefined' ? "200" : self.options.height;

            if (w > $(window).width()) {
              w = $(window).width();
            }

            var r = self.radius = w / 3, paddingLabel = r + 20;
            var scale = "-"+ (r * 1.5) +" -"+ (r) +" "+ w +" "+ h +"";
            var strokeWidth = self.strokeWidth = self.options.strokeWidth || 12;

            self._buildSvg(w, h, scale);

            var length = self.options["data"].length;
            var padding = self.options.padding || 20;
            var division = (r - padding) / length;

            for(var i = 0; i < length; i++){
                var object = self.options["data"][i];
                self._buildCircle(object, r);
                self._buildLabel(object, paddingLabel);
                paddingLabel += 20;

                r = r - division;
            }
        },

        _buildSvg: function(width, height, scale){
            var self = this;
            var svgElem = self.svgContainer = document.createElementNS(svgNS, "svg");
            svgElem.setAttributeNS(null, "width", width);
            svgElem.setAttributeNS(null, "height", height);
            svgElem.setAttributeNS(null, "viewBox", scale);
        },

        _buildCircle: function(object, r){
            var self = this;
            var radius = r -10;
            var circumference = radius * 2 * Math.PI;

            var offset = circumference - object.progress / 100 * circumference;

            var circle = document.createElementNS(svgNS,"circle");
            circle.setAttribute("cy", 0);
            circle.setAttribute("cx", 0);
            circle.setAttribute("r", radius);
            circle.setAttribute("stroke-width", self.strokeWidth);
            circle.setAttribute("fill", "none");
            circle.setAttribute("stroke", object.secondaryColor);

            var clonedCircle = $(circle).clone()[0];
            clonedCircle.setAttribute("stroke", object.primaryColor);
            clonedCircle.setAttribute("transform", "rotate(-90 0 0)")
            clonedCircle.setAttribute("stroke-dasharray", circumference+" "+circumference);
            clonedCircle.setAttribute("stroke-dashoffset", offset);
            clonedCircle.setAttribute("stroke-linecap", "round");
            clonedCircle.setAttribute("style", "transition: stroke-dashoffset 1s ease-out 0s;");

            self.svgContainer.appendChild(circle);
            self.svgContainer.appendChild(clonedCircle);
        },

        _buildLabel: function(object, padding){
            var self = this;

            var circle = document.createElementNS(svgNS,"circle");
            circle.setAttribute("cy", padding);
            circle.setAttribute("cx", -self.radius);
            circle.setAttribute("r", 5);
            circle.setAttribute("stroke-width", 8);
            circle.setAttribute("fill", "none");
            circle.setAttribute("stroke", object.secondaryColor);

            var clonedCircle = $(circle).clone()[0];
            clonedCircle.setAttribute("stroke", object.primaryColor);
            clonedCircle.setAttribute("r", 3);
            clonedCircle.setAttribute("fill", object.primaryColor);

            var text = document.createElementNS(svgNS,"text");
            text.setAttribute("y", padding + 5);
            text.setAttribute("x", -self.radius + 10);
            text.setAttribute("font-size", 12);
            var textNode = document.createTextNode(object.labelText);
            text.appendChild(textNode);

            self.svgContainer.appendChild(circle);
            self.svgContainer.appendChild(clonedCircle);
            self.svgContainer.appendChild(text);
        },

        destroy: function() {
            
        },

    };

    $.fn[pluginName] = function (options) {

        var args = arguments;

        if (options === undefined || typeof options === 'object') {
            return this.each(function() {
                if (!$.data(this, 'plugin_' + pluginName)) {
                    $.extend({}, $.fn[pluginName].defaults, options);
                    $.data(this, 'plugin_' + pluginName, new RadialBar(this, options));
                }
            });
        } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
            return this.each(function() {
                var instance = $.data(this, 'plugin_' + pluginName);
                if (instance instanceof Progressing && typeof instance[options] === 'function') {
                    instance[options].apply(instance, Array.prototype.slice.call(args, 1));
                }
            });
        }
    };

    $.fn[pluginName].defaults = {
        
    };

    $.fn[pluginName].Constructor = RadialBar;
}(jQuery));