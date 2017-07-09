/* global $, Stripe */
// Document ready.
$(document).on('turbolinks:load', function(){
  var theForm = $('#pro_form');
  var signupBtn = $('#form-signup-btn');
  
  // Set stripe public key.
  Stripe.setPublishableKey( $('meta[name = "stripe-key"]').attr('content') );

  // When user clicks form submit button,
  signupBtn.click(function(event){
    // prevent default submission behaviour.
    event.preventDefault();
    
    // Collect the credit card fields.
    var ccNum = $('#card_nubmer').val(),
        cvcNum = $('#card_code').val(),
        expMonth = $('#card_month').val(),
        expYear = $('#card_year').val();
    
    // Send the card information to Stripe.
    Stripe.createToken({
      number: ccNum,
      cvc: cvcNum,
      exp_month: expMonth,
      exp_year: expYear
    }, stripeResponseHandler);
  });
  
  
  
  // Stripe will return back a card token.
  // Inject card token as hidden field into form.
  // Submit for to our Rails app.
});
