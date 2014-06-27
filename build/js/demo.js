var demo = (function(w,d,c,$){
	var init; 
	init = function() { 
		var input, markdownContainer; 
		input = d.getElementById('markdown'); 
		markdownContainer = d.getElementById('markdownContainer'); 
		markdownContainer.innerHTML = Markdown(input.value); 
	};
	$.ready(init); 
})(window,document,console,jDom); 