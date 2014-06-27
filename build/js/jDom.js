// some utilities wrapped up in bows: 
var jDom = (function(exports,w,d,c){
    var trim, extend, getAttrs, getKeys, getTypeOfObject, getByClassName, getWithData, addEvent, getArrayFromSpaceSeparated, creator, createElem;  

    /* 
        Our Public Functions: 
            -jDom.create(String | {}): create a dom node as specified via obj or string
            -jDom.getByClassName(classes,context): classes is space separated values, context is an element (not required) 
            -jDom.ready(function): enqueues loadEvents on domready
            -jDom.extend(object,object,...)
            -jDom.getData(elem)
            -jDom.getKeys(obj)
            -jDom.addClass(elem,classes) classes is space separated string
            -jDom.removeClass(elem,classes) classes is space separated string
            -jDom.getWithData(key,val,context,type);
            -jDom.trigger(context,eventType); 
    */

    exports.on = function(elem,eventType,func) { 
        addEvent(elem,eventType,func); 
        return elem; 
    }; 

    exports.trigger = function(context,eventType) { 
        var event; // The custom event that will be created
        if (d.createEvent) {
            event = d.createEvent("HTMLEvents");
            event.initEvent(eventType, true, true);
        } else {
            event = d.createEventObject();
            event.eventType = eventType;
        }

        event.eventName = eventType;

        if (d.createEvent) {
            context.dispatchEvent(event);
        } else {
            context.fireEvent("on" + event.eventType, event);
        }
        return context;
    }; 

    exports.extend = function() { 
        /* 
            this extend can handle nested objects & any 
            number of objects passed as arguments
        */
        return extend(arguments); 
    }

    exports.getKeys = function(obj) { 
        return getKeys(obj); 
    }; 

    exports.getData = function(elem) { 
        var attrs, keys, data = { }; 
        attrs = getAttrs(elem); 
        keys = getKeys(attrs); 
        for(var i=0; i < keys.length; ++i) { 
            if(keys[i].indexOf('data-') == 0) { 
                data[keys[i].substring(5,keys[i].length)] = attrs[keys[i]]; 
            }
        }
        return data; 
    }; 

    exports.getWithData = function(key,val,context,type) { 
        val = (typeof val == 'undefined') ? null : val; 
        context = (typeof context == 'undefined') ? d : context; 
        type = (typeof type == 'undefined') ? '*' : type; 
        return getWithData(key,val,context,type); 
    }; 

    exports.addClass = function(elem,classes) { 
        var currentClasses; 
        currentClasses = ' ' + getArrayFromSpaceSeparated(elem.className).join(' ') + ' '; 
        classes = getArrayFromSpaceSeparated(classes); 
        for(var i=0; i < classes.length; ++i) { 
            if(currentClasses.indexOf(' ' + classes[i] + ' ') < 0) { 
                currentClasses += classes[i] + ' '; 
            }
        }
        elem.className = trim(currentClasses); 
        return elem; 
    }; 

    exports.removeClass = function(elem,classes) { 
        var current, numRemovedInner, numRemoved = 0;
        classes = getArrayFromSpaceSeparated(classes); 
        current = getArrayFromSpaceSeparated(elem.className);  
        for(var i=0; i < current.length; ++i) { 
            numRemovedInner = 0; 
            for(var j=0; j < classes.length; ++j) { 
                if(current[i-numRemoved] == classes[j]) { 
                    current.splice(i-numRemoved,1);
                    classes.splice(j,1); 
                    ++numRemoved; 
                    break; 
                }
            }
        } 
        elem.className = (current.length) ? current.join(' ') : ""; 
        return elem; 
    }; 

    exports.ready = function(func) { 
        var oldonload = window.onload;
        if (typeof window.onload != 'function' ) {
            window.onload = func;
        } else {
            window.onload = function() {
                oldonload();
                func();
            }
        }
    }; 

    exports.getByClassName = function(str,context) { 
        var elems = [ ]; 
        context = (typeof context == 'undefined') ? d : context; 
        if(d.getElementsByClassName) { 
            return elems = context.getElementsByClassName(str); 
        } else { 
            return getByClassName(str,context); 
        }
    }; 

    exports.create = function(obj) {
        return creator(obj);
    };

    /* Our Private Methods: */
    trim = function(str) { 
        return str.replace(/^\s+|\s+$/g,''); 
    }; 

    getAttrs = function(elem) { 
        var attrs, obj = {}; 
        attrs = elem.attributes; 
        for(var i=0; i < attrs.length; ++i) { 
            var attr = attrs.item(i); 
            obj[attr.nodeName] = attr.nodeValue; 
        }
        return obj; 
    }; 

    getKeys = function(obj) { 
        if(Object.keys) { 
            return Object.keys(obj); 
        } else { 
            arr = []; 
            for(var key in obj) { 
                arr.push(key); 
            }
            return arr; 
        }
    }; 

    extend = function(args) { 
        for(var i=args.length-1; i > 0; --i) { 
            for(var key in args[i]) { 
                var simpleExtend = true; 
                if(typeof args[i-1][key] != 'undefined') { 
                    if(typeof args[i][key] == 'object' && typeof args[i-1][key] == 'object') { 
                        if(!isObjectAnArray(args[i]) && !isObjectAnArray(args[i-1])) { 
                            simpleExtend = false; 
                            args[i-1][key] = jDom.extend(args[i-1][key],args[i][key]); 
                        }
                    }
                }
                if(simpleExtend) { 
                    args[i-1][key] = args[i][key]; 
                } 
            }
        } 
        return (args.length) ? args[0] : {}; 
    }; 

    isObjectAnArray = function(obj) { 
        if(Array.isArray) { 
            return Array.isArray(obj); 
        } else { 
            return v instanceof Array; 
        }
    }; 

    getArrayFromSpaceSeparated = function(str) { 
        return trim(str).replace(/[ ]+/,' ').split(' ');  
    }; 

    getByClassName = function(str,context) { 
        var candidates, foundElems = []; 
        candidates = context.getElementsByTagName('*'); 
        str = getArrayFromSpaceSeparated(str); 
        for(var i=0; i < candidates.length; ++i) { 
            var thisClass, compliant = true; 
            thisClass = ' ' + getArrayFromSpaceSeparated(candidates[i].className).join(' ') + ' '; 
            for(var j=0; j < str.length; ++j) { 
                var requirement = ' ' + str[j] + ' '; 
                if(thisClass.indexOf(requirement) == -1) { 
                    compliant = false; 
                    break; 
                }
            }
            if(compliant) { 
                foundElems.push(candidates[i]); 
            }
        }
        return foundElems; 
    }; 

    getWithData = function(key,val,context,type) { 
        var candidates, elems = []; 
        candidates = context.getElementsByTagName(type); 
        for(var i=0; i < candidates.length; ++i) { 
            if(candidates[i].getAttribute('data-' + key)) {
                if(val != null) { 
                    if(candidates[i].getAttribute('data-'+key) == val) { 
                        elems.push(candidates[i]); 
                    }
                } else { 
                    elems.push(candidates[i]); 
                }
            }
        }
        return elems; 
    }; 

    creator = function(obj) { 
        var elem, contains, i, contentsObj, innerElem; 
        obj.contains = (obj.contains == null) ? [] : obj.contains; 
        obj.attributes = (obj.attributes == null) ? {} : obj.attributes; 
        obj.type = (obj.type == null) ? 'div' : obj.type; 
        
        elem = createElem(obj.type, obj.attributes); 
        contains = obj.contains; 

        if(typeof contains == "string") { 
            elem.appendChild(d.createTextNode(contains)); 
        } else { 
            for(i=0; i < contains.length; ++i) {
                contentsObj = contains[i]; 
                if(typeof contentsObj == 'object') { 
                    innerElem = create(contentsObj); 
                    elem.appendChild(innerElem); 
                } else { 
                    elem.appendChild(d.createTextNode(contentsObj)); 
                }
            }
        }
        return elem; 
    }; 

    createElem = function(type, attributes) {
        var elem, key, val;
        elem = d.createElement(type);
        if (typeof attributes !== "undefined") {
            for (key in attributes) {
                val = attributes[key];
                elem.setAttribute(key, val);
            }
        }
        return elem;
    };

    addEvent = (function( w, d ) { 
        if (d.addEventListener) { 
            return function(elem, type, cb) { 
                if ((elem && !elem.length) || elem === w) { 
                    elem.addEventListener(type, cb, false); 
                } 
                else if (elem && elem.length) { 
                    var len = elem.length; 
                    for (var i = 0; i < len; i++) { 
                        addEvent(elem[i], type, cb); 
                    } 
                } 
            }; 
        } else if (d.attachEvent) { 
            return function (elem, type, cb) { 
                if ((elem && !elem.length) || elem === w) { 
                    elem.attachEvent('on' + type, function() { return cb.call(elem, w.event) }); 
                } 
                else if (elem.length) { 
                    var len = elem.length; 
                    for (var i = 0; i < len; i++) { 
                        addEvent(elem[i], type, cb); 
                    } 
                } 
            }; 
        } 
    })(this, d); 
    
    /*Interpreter removed*/

    // return our public functions: 
    return exports; 
})(jDom || {}, window,document,console); 