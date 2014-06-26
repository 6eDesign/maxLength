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
                        $(state[id].counters[i].el).addClass(state[id].counters[i].opts.warnclass); 
                    } else { 
                        $(state[id].counters[i].el).removeClass(state[id].counters[i].opts.warnclass); 
                    }
                }
            }
        }
    }; 
    init = function() { 
        /*
            Looks for: 
                <textarea id='myTextarea' maxlength='650'/>
                <span class='maxLength' data-textareaid='myTextarea' data-string='#{left} of #{limit} characters remaining.'>
                </span>
        */
        $('.maxLength').each(function(){
            var id, opts = $.extend({},settings,$(this).data()); 
            if(typeof state[opts.textareaid] == 'undefined') { 
                var input = d.getElementById(opts.textareaid); 
                input.setAttribute('data-lengthmonitored','true'); 
                state[opts.textareaid] = { 
                    input: input, 
                    limit: parseInt(input.getAttribute('maxlength')), 
                    current: -1, 
                    counters: [] 
                };
                $(state[opts.textareaid].input).on('keyup',updateTextarea);
                $(state[opts.textareaid].input).on('paste cut',function(){
                    window.setTimeout(function(){ $('textarea[data-lengthmonitored]').trigger('keyup'); },0)
                }); 
            }
            state[opts.textareaid].counters.push({ opts: opts, el: this}); 
        });
        $("textarea[data-lengthmonitored]").trigger('keyup'); 
    }; 
    $(d).ready(init); 
})(window,document,console,jQuery); 