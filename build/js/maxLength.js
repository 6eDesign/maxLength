var maxLength = (function(w,d,c,$){
    var init, updateTextarea, getString, getTrueLength, settings, state = {}; 
    settings = { 
        string: '#{left} of #{limit} characters remaining.', 
        warnclass: false, 
        warnthreshold: 50
    }; 
    getTrueLength = function(str) { 
        var newlines,length; 
        length = str.length; 
        newlines = str.match(/(\r\n|\n|\r)/g);
        length += (newlines != null) ? newlines.length : 0; 
        return (length < 0) ? 0 : length;  
    }; 
    getString = function(str,obj) { 
        for(var key in obj) { 
            str = str.replace('#{'+key+'}',obj[key]); 
        }
        return str; 
    }; 
    updateTextarea = function() { 
        var id, newlength, newlines; 
        id = this.getAttribute('id'); 
        newlength = getTrueLength(this.value); 
        if(newlength > state[id].limit) { 
            var diff = newlength - state[id].limit; 
            newlength = state[id].limit;    
            this.value = this.value.substring(0,this.value.length-diff);             
        }
        if(newlength != state[id].current) {   
            state[id].current = newlength;   
            var data = { left: state[id].limit - state[id].current, limit: state[id].limit, current: state[id].current };  
            for(var i=0; i < state[id].counters.length; ++i) { 
                state[id].counters[i].el.innerHTML = getString(state[id].counters[i].opts.string, data); 
                if(state[id].counters[i].opts.warnclass != false) { 
                    if(data.left <= state[id].counters[i].opts.warnthreshold) { 
                        $.addClass(state[id].counters[i].el, state[id].counters[i].opts.warnclass); 
                    } else { 
                        $.removeClass(state[id].counters[i].el, state[id].counters[i].opts.warnclass); 
                    }
                }
            }
        }
    }; 
    init = function() { 
        /*
            Looks for: 
                <textarea id='myTextarea' maxlength='650'><textarea/>
                <span class='maxLength' data-textareaid='myTextarea' data-string='#{left} of #{limit} characters remaining.'>
                </span>
        */
        var counterElems = jDom.getByClassName('maxLength'); 
        for(var i=0; i < counterElems.length; ++i) { 
            var id, opts = $.extend({},settings,$.getData(counterElems[i])); 
            if(typeof state[opts.textareaid] == 'undefined') { 
                var input, max; 
                input = d.getElementById(opts.textareaid); 
                max = (input.getAttribute('maxlength')) ? input.getAttribute('maxlength') : input.getAttribute('max-length'); 
                input.setAttribute('data-lengthmonitored','true'); 
                state[opts.textareaid] = { 
                    input: input, 
                    limit: parseInt(max), 
                    current: -1, 
                    counters: [] 
                };
                $.on(state[opts.textareaid].input,'keyup',updateTextarea); 
                $.on(state[opts.textareaid].input,'paste',updateTextarea); 
                $.on(state[opts.textareaid].input,'cut',updateTextarea); 
            }
            state[opts.textareaid].counters.push({ opts: opts, el: counterElems[i]}); 
        }; 
        var textareas = jDom.getElementsByData('lengthmonitored','true',d,'textarea');         
        for(var i=0; i < textareas.length; ++i) { 
            jDom.trigger(textareas[i],'keyup'); 
        }
    }; 
    $.ready(init); 
})(window,document,console,jDom); 