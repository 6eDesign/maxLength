var demo = (function(w,d,c,$){
	var init; 
	init = function() { 
		c.log("HELLO"); 
		var input, markdownContainer; 
		input = d.getElementById('markdown'); 
		markdownContainer = d.getElementById('markdownContainer'); 
		c.log(Markdown(input.value)); 
		markdownContainer.innerHTML = Markdown(input.value); 
	};
	$(d).ready(init); 
})(window,document,console,jQuery); 