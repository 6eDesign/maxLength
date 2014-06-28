var demo = (function(w,d,c,$){
	var init, animate;

	animate = function(dom) { 
		jDom.addClass(dom.header,'animate'); 
		w.setTimeout(function(){
			jDom.addClass(dom.brand,'animate'); 
			w.setTimeout(function(){
				for(var i=0; i < dom.poweredbys.length; ++i) { 
					jDom.addClass(dom.poweredbys[i],'animate'); 
				}				
			},350); 
		},250); 
	};  

	init = function() { 
		var input, markdownContainer, logo = {};
		logo.header = jDom.getByClassName('header')[0]; 
		logo.brand = jDom.getByClassName('brand',logo.header)[0]; 
		logo.poweredbys = jDom.getByClassName('poweredby',logo.header); 
		animate(logo); 

		input = d.getElementById('markdown'); 
		markdownContainer = d.getElementById('markdownContainer'); 
		markdownContainer.innerHTML = Markdown(input.value); 
	};
	$.ready(init); 
})(window,document,console,jDom); 