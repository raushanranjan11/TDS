$(document).ready(function(){
  $("#submit-form").submit(function() {
    if ($('input[id=fcheckb]').is(':checked')) {
      return true;
    }
    //open alert
    alert("You must agree to the Terms of Use");
    return false;
  });

  //close botcheck
    $("#confirm").click(function(){
    $.post("botcheck.php", { call: "1",} );
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
    //$('#loader').fadeOut(2000);
    $('#loader').fadeOut(2000, function() {
      //botcheck
       $.getJSON('http://travelbizsystems.com/loginArenaPage/botcheck.php', function(data) {
       response = data.param1;
       if(!response){
           $('.captcha').fadeIn(250);
           $('body').append('<div class="bgmask""></div>');
           $('.bgmask').fadeIn(250);
           positionPopup();
         }
      });
    });
});