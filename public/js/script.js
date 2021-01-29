$(document).ready(function() {

  /* For the sticky navigation */

$('.js--section-features').waypoint(function(direction) {
  if (direction == "down") {
      $('nav').addClass('sticky');
  } else {
      $('nav').removeClass('sticky');   
  }
}, {
offset: '60px;' 
    });   

/* Scroll on button */
$('.js--scrol-to-1').click(function () {
    $('html, body').animate({scrollTop:  
    $('.js--section-1')
    .offset().top}, 1000) 
});

$('.js--scrol-to-2').click(function () {
  $('html, body').animate({scrollTop: 
  $('.js--section-2')
  .offset().top}, 1000) 
});


/* HIDE TEXT */ 

$('.text-reveal').click(function () {  
  $('.about-text').toggle("active");     
});

 
/* ANIMATION ON SCROLL */

  $('.js--wp-4').waypoint(function(direction) { 
    console.log('pulse');
    $('.js--wp-4').addClass('animated pulse');    
  }, {
    offset: '90%'
  });   

  
/* HIDE notification-box*/ 

$('.remove_modal').click(function () {   
  $('.modal_strip').addClass('hide_modal_strip');        
});



});   

const swiper = new Swiper('.swiper-container', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});

