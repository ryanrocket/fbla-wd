// Ryan Wans (C) 2019

(function(monarch) {
	window.monarch = window.monarch || monarch || [];
	if (window.location.pathname === '' || window.location.pathname === '/') {
		let head = document.querySelector('head');
		var s = document.createElement('script');
		s.setAttribute('src', 'https://cdn.jsdelivr.net/npm/airport-autocomplete-js@latest/dist/index.browser.min.js');
		head.appendChild(s);
		window.monarch.push({ EXTERN_DEP: 'AIRPORT-AUTOCOMPLETE-JS', v: '@latest||~v2' });
	} else {
	}
})();

window.console.error = (a) => {
	window.monarch = window.monarch || [];
	window.monarch.push({ err: a });
	Error = null;
	return [ true, a ];
};

(function() {
	$(document).ready(function(){
		$('.your-class').slick({
		});
	  });
})();