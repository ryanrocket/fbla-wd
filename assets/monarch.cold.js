// Ryan Wans (C) 2019

(function() {
	$(document).ready(function(){
		console['log']('[!] Configuring Carousel');
		

		// carousel

		/*
		<img data-aos="fade-down" data-aos-duration="1000" data-aos-delay="10" src="/static/pjet.jpg" alt="newyork" width="1000" height="530" id="fp"/>  
        <img data-aos="fade-down" data-aos-duration="1000" data-aos-delay="10" src="/static/ipjt.jpg" alt="newyork" width="1000" height="530" id="fp"/>  
		*/

		(function() {

			console['log']("[!] C_PILOTFLAME");

			let __c, __x = 1;
			__c = setInterval(function() {

				// console['log']("[!] C_INTERATION");

				let _slides = [
					'<img data-aos="fade-down" data-aos-duration="1000" data-aos-delay="10" src="/static/neqy.png" alt="newyork" width="1000" height="530" id="fp"/>',
					'<img data-aos="fade-down" data-aos-duration="1000" data-aos-delay="10" src="/static/pjet.jpg" alt="newyork" width="1000" height="530" id="fp"/>',
					'<img data-aos="fade-down" data-aos-duration="1000" data-aos-delay="10" src="/static/ipjt.jpg" alt="newyork" width="1000" height="530" id="fp"/>'
				];

				let _max = _slides.length;

				
				$('.goforlogo').html(_slides[__x]);

				__x++;

				if(__x == 3) { __x = 0; }

				// console['log'](__x);

			}, 5000);
		
		})();
		
	  });
	  
})();