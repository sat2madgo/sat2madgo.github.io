/* 

Vanilla Template

https://templatemo.com/tm-526-vanilla

*/

jQuery(document).ready(function($) {

	'use strict';
countDown();
heartAnimation();
    var top_header = $('.parallax-content');
    top_header.css({'background-position':'center center'}); // better use CSS
function scrollHandler(){
	   var st = $(window).scrollTop();
	    
	 top_header.each(function(){
		/* if((st-this.offsetTop)<(this.clientHeight+10) && (st-this.offsetTop)>-10)
		 {*/
	   $(this).css({'background-position':'center calc(50% + '+((st-this.offsetTop)*.5)+'px)'});
		/* }*/
    });
}
    $(window).scroll(function () {
	    
    
	       window.requestAnimationFrame(scrollHandler);

   
    });


    $('body').scrollspy({ 
        target: '.fixed-side-navbar,.panel-body',
        offset: 200
    });
      
      // smoothscroll on sidenav click
 // Add smooth scrolling to all links
  $(".tabs-content a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){

       
      });
    } // End if
  });
	
    $('.tabgroup > div').hide();
        $('.tabgroup > div:first-of-type').show();
        $('.tabs a').click(function(e){
          e.preventDefault();
            var $this = $(this),
            tabgroup = '#'+$this.parents('.tabs').data('tabgroup'),
            others = $this.closest('li').siblings().children('a'),
            target = $this.attr('href');
        others.removeClass('active');
        $this.addClass('active');
        $(tabgroup).children('div').hide();
        $(target).show();
      
    })

    var owl = $("#owl-testimonials");

      owl.owlCarousel({
        
        pagination : true,
        paginationNumbers: false,
        autoPlay: 6000, //Set AutoPlay to 3 seconds
        items : 3, //10 items above 1000px browser width
        itemsDesktop : [1000,3], //5 items between 1000px and 901px
        itemsDesktopSmall : [900,2], // betweem 900px and 601px
        itemsTablet: [600,1], //2 items between 600 and 0
        itemsMobile : false // itemsMobile disabled - inherit from itemsTablet option
        
    });


});


function countDown(){
	const second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24;

let countDown = new Date('DEC 02, 2019 16:43:00').getTime(),
    x = setInterval(function() {

      let now = new Date().getTime(),
          distance = countDown - now;

      document.getElementById('days').innerText = Math.floor(distance / (day)),
        document.getElementById('hours').innerText = Math.floor((distance % (day)) / (hour)),
        document.getElementById('minutes').innerText = Math.floor((distance % (hour)) / (minute)),
        document.getElementById('seconds').innerText = Math.floor((distance % (minute)) / second);
      
      //do something later when date is reached
      //if (distance < 0) {
      //  clearInterval(x);
      //  'IT'S MY BIRTHDAY!;
      //}

    }, second)
}

  // Get random number between 2 ranges
  function randomNum(m, n) {
    m = parseInt(m);
    n = parseInt(n);
    return Math.floor(Math.random() * (n - m + 1)) + m;
  }
  
  function heartAnimation() {
    $this = $('.the-heart-welcome-content');
    var heartCount = ($this.width()/50)*5;
    for (var i = 0; i< heartCount; i++) {
      var heartSize = (randomNum(60, 120) / 10);
      var classnum = randomNum(1, 2);
      $this.append('<span class="tiny-heart tiny-heart'+classnum+'" style="top: '+ randomNum(80, 100) +'%; left: '+ randomNum(0, 100) +'%; width: '+ heartSize +'px; height: '+ heartSize +'px ; animation-delay: -'+ randomNum(0, 3) +'s; animation-duration: '+ randomNum(2, 5) +'s"></span>')
    }
	setTimeout(channgeCol,100);
  }
  function channgeCol(){
	  
$(".tiny-heart").each(function(){
var ops=$(this).css("opacity");
if(ops<0.1){
$(this).toggleClass("tiny-heart1");
$(this).toggleClass("tiny-heart2");
}
});
	setTimeout(channgeCol, randomNum(1, 10)*300);
}
  
