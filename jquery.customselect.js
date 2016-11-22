/**
 * Custom Select - jQuery plugin
 * 
 * Creates a visually custom data select
 * 
 * @author Throk <k.borecki@throk.pl>
 * @copyright (c) 2016 Throk
 * @version 1.0
 */

(function ($) {
    
    /*
     * INITIALIZATION
     */
    
    /* Variable initializion */
    var settings = [];

    /* Create prototype */
    $.fn.customselect = function(options) {
        settings = $.extend({
            class_main: ".custom-select",
            class_default: ".default",
            class_value: ".value",
            speed: 550,
            default_text: "- select -"
        }, options );

        initEvents();
        return this.each(function() {
            initSingle($(this));
        });
    };
    
    /* Initialize single Custom Select */
    function initSingle(element){
        element = element.replaceWith(createHtml(element));
    }
    
    /* Prepare main structure of Custom Select */
    function createHtml(element){
        var preparedValue  = "";
        var custom_select  = $("<div>").addClass(settings.class_main.substr(1));
        var custom_value   = $("<div>").addClass("custom-value");
        var default_value  = $("<div>").addClass(settings.class_default.substr(1)).text(settings.default_text);
        var custom_values  = $("<div>").addClass("custom-values");
        var value          = $("<div>").addClass(settings.class_value.substr(1));
        
        var input = $("<input>").attr("type", "hidden").attr("name", element.attr("name"));

        element.children().each(function(){
            if($(this).is(':disabled') && $(this).is(':selected')){
                default_value = default_value.text($(this).text());
                
                preparedValue = value.clone();
                preparedValue.text($(this).text());
                preparedValue.data("value", "");
                
                custom_values.append(preparedValue);
            } else {
                preparedValue = value.clone();
                preparedValue.text($(this).text());

                if(typeof($(this).attr("value")) !== "undefined"){
                    preparedValue.data("value", $(this).attr("value"));
                } else {
                    preparedValue.data("value", $(this).text());
                }

                custom_values.append(preparedValue);
            }
        });
        
        custom_value = custom_value.append(default_value);
        custom_select.append(custom_value).append(custom_values);
        custom_select.prepend(input);
        
        return custom_select;
    }
    
    /* Initialize events */
    function initEvents(){
        
        // Click event on main object
        $("body").on("click", settings.class_main, function(e) {
            eventClickMain($(this));
            e.stopPropagation();
        });
        
        // Click event on value
        $("body").on("click", settings.class_value, function(e) {
            eventClickValue($(this));
            e.stopPropagation();
        });
        
    }
    
    /*
     * EVENTS
     */
    
    /* Click on Main Object */
    function eventClickMain(element){
        if (element.children(".custom-values").is(":visible") !== true) { 
            element.addClass("active").children(".custom-values").slideDown(settings.speed);
        } else {
            element.children(".custom-values").slideUp(settings.speed, function(){
                element.removeClass("active");
            });
        }
    }
    
    /* Click on selected value */
    function eventClickValue(element){
        var thisMain = element.parent().parent();
        
        thisMain.removeClass("active").children("input[type='hidden']").val(element.data("value"));
        
        if(element.data("value") === ""){
            thisMain.find(".default").removeClass("selected").text(element.text());
        } else {
            thisMain.find(".default").addClass("selected").text(element.text());
        }
        thisMain.children(".custom-values").hide();
    }
    
}(jQuery));
