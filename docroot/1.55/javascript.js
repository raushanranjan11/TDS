$(document).ready(function(){
  $("#submit-form").submit(function() {
    if ($('input[id=fcheckb]').is(':checked')) {
      //botcheck
      real = $.session.get('12real12');
      if(!real)real = 0;
      real = parseInt(real);
      real++;
      $.session.set('12real12', real);
      return true;
    }
    //open alert
    alert("You must agree to the Terms of Use");
    return false;
  });

  //close botcheck
    $("#confirm").click(function(){
    $.session.delete('12real12');
    $(".captcha, .bgmask").fadeOut(500, function() {
		$('.bgmask').remove();
	});
   });

  //open popup - support
  $("#support").click(function(){
    $('.pop-up').fadeIn(250);
    $('body').append('<div class="bgmask" onclick="removeMask()"></div>');
    $('.bgmask').fadeIn(250);
    positionPopup();
  });

  //close popup - support
  $("#close").click(function(){
    $(".pop-up, .bgmask").fadeOut(500, function() {
		$('.bgmask').remove();
	});
  });
});

function positionPopup(){
  if(!$(".pop-up").is(':visible')){
  $(".captcha").css({
      left: ($(window).width() - $('.captcha').width()) / 2,
      top: ($(window).height() - $('.captcha').height()) / 1.8,
      position:'absolute'
  });
  return;
  }
  $(".pop-up").css({
      left: ($(window).width() - $('.pop-up').width()) / 2,
      top: ($(window).height() - $('.pop-up').height()) / 1.8,
      position:'absolute'
  });
}

//maintain the popup at center of the page when browser resized
$(window).bind('resize',positionPopup);

function removeMask(){
    $(".pop-up, .bgmask").fadeOut(500, function() {
		$('.bgmask').remove();
	});
}

$(window).load(function () {
    //loader
    $('#loader').fadeOut(2000, function() {
      //botcheck
      real = $.session.get('12real12');
      if(!real)real = 0;
      real = parseInt(real);
      if(real >= 5){
           $('.captcha').fadeIn(250);
           $('body').append('<div class="bgmask""></div>');
           $('.bgmask').fadeIn(250);
           positionPopup();
         }
    });
});