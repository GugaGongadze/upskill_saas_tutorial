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
    signupBtn.val("Processing").prop('disabled', true);
    
    // Collect the credit card fields.
    var ccNum = $('#card_nubmer').val(),
        cvcNum = $('#card_code').val(),
        expMonth = $('#card_month').val(),
        expYear = $('#card_year').val();
        
    // Use Stripe JS library to check for card errors.
    var error = false;
    
    // Validate card number.
    if (!Stripe.card.validateCVC(cvcNum)){
      error = true;
      alert('The credit card appears to be invalid');
    }
    
    // Validate CVC number.
    if (!Stripe.card.validateCardNumber(ccNum)){
      error = true;
      alert('The CVC number appears to be invalid');
    }
    
      // Validate credit card expiry date.
    if (!Stripe.card.validateExpiry(expMonth, expYear)){
      error = true;
      alert('The expiration date appears to be invalid');
    }
    
    
    // Send the card information to Stripe.
    if (error) {
      // If there are card errors don't sent to Stripe.
      signupBtn.prop('disable', false).val("Sign Up");
    } else {
        Stripe.createToken({
        number: ccNum,
        cvc: cvcNum,
        exp_month: expMonth,
        exp_year: expYear
      }, stripeResponseHandler);
    }
    
    
    return false;
  });
  
  function stripeResponseHandler(status, response){
    // Get the token from the response
    var token = response.id;
    
    // Inject card token in hidden field.
    theForm.append( $('<input type = "hidden" name = "user[stripe_card_token]">').val(token) );
  }
  
  // Submit for to our Rails app.
  theForm.get(0).submit();
});
