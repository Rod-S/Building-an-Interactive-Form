//focus Basic Info - Name: on page load
document.getElementById('name').focus();

//initial page load to hide job role text input until conditions met
$('#other-title').hide();

//function to run on "Job Role" option drop-down selection
$('#title').change(function() {
  //if the selected drop-down option is 'other'
  if ($('#title option:selected').val()=='other') {
    //display 'other' input textbox
    $('#other-title').show();
  } else {
    //otherwise hide 'other' input textbox
    $('#other-title').hide();
  }
});

//initial page laod to hide t-shirt color until conditions met
$('#colors-js-puns').hide();

///////////////
//T-SHIRT INFO
///////////////

//function to run on design option drop-down selection
$('#design').change(function() {
  //if option selected is 'js puns'
  if ($('#design').val()=='js puns') {
    //display the color drop-down menu along with 'jsPuns' class options
    //hide 'heartJs' class options
    $('#colors-js-puns').show();
    $('#color').val('');
    $('.jsPuns').show();
    $('.heartJs').hide();
    //if option selected is 'heart js'
  } else if ($('#design').val()=='heart js') {
    //display the color drop-down menu along with 'heart js' class options
    //hide 'js puns' class options
    $('#colors-js-puns').show();
    $('#color').val('');
    $('.jsPuns').hide();
    $('.heartJs').show();
  } else {
    //if no design option selected
    //hide color select options
    $('#colors-js-puns').hide();
  }
});

//////////////////////////
//REGISTER FOR ACTIVITIES
//////////////////////////

//click event handler to run when checkboxes checked under Register for Activities
$('input:checkbox').on('click', function () {

  let $this = $(this);
  let isChecked = $this.is(':checked');

  if ($this.is('input:checkbox[name="js-frameworks"]')) {
    if ($('input:checkbox[name="js-frameworks"]:checked')) {
      //if 'js-frameworks' is checked, disable 'express' checkbox. Otherwise, do not disable
      $('input:checkbox[name="express"]').prop('disabled', isChecked ? true : false);
    }
  }
  else if ($this.is('input:checkbox[name="express"]')) {
    if ($('input:checkbox[name="express"]:checked')) {
      //if 'express' is checked, disable 'js-frameworks' checkbox. Otherwise, do not disable
      $('input:checkbox[name="js-frameworks"]').prop('disabled', isChecked ? true : false);
    }
  }
  else if ($this.is('input:checkbox[name="js-libs"]')) {
    if ($('input:checkbox[name="js-libs"]:checked')) {
      //if 'js-libs' is checked, disable 'node' checkbox. Otherwise, do not disable
      $('input:checkbox[name="node"]').prop('disabled', isChecked ? true : false);
    }
  }
  else if ($this.is('input:checkbox[name="node"]')) {
    if ($('input:checkbox[name="node"]:checked')) {
      //if 'node' is checked, disable 'js-libs' checkbox. Otherwise, do not disable
      $('input:checkbox[name="js-libs"]').prop('disabled', isChecked ? true : false);
    }
  }
});

//run tallyCost() on checkbox clicks
$("input[type=checkbox]").change(function() {
  runningTotal();
});

//tally up the cost of checked activities
const runningTotal = () => {
    //start cost count at $0
    var total = 0;
    //for each checked checkbox:
    $("input[type=checkbox]:checked").each(function() {
      //add up the values of each
      total += parseInt($(this).attr('val'));
    });
    //remove div to avoid duplicate elements on page
  $('#activityTotal').remove();
  //tally message to appear on page
  $('.activities').append('<div id=activityTotal>Total $' + total + '</div>');
};

///////////////
//PAYMENT INFO
///////////////

const $creditCard = $('.credit-card');
const $paypal = $('#credit-card').next();
const $bitcoin = $('#credit-card').next().next();

//initial payment selected option 'credit card'
$('#payment option[value="credit card"]').prop('selected', true);
//hide the Pay Pal and bitcoin payment messages
$paypal.hide();
$bitcoin.hide();

//event handler to run when different payment options are selected
$('#payment').change(function() {
  const val = $(this).val();
  //if option selected is 'paypal'
  if (val === 'paypal') {
      //remove classes which can potentially duplicate error messages
      $('.cc-blank-error, .cc-length-error, .cc-number-error, .zip-blank-error, .zip-length-error, .zip-number-error, .cvv-blank-error, .cvv-length-error, .cvv-number-error').hide();
      //set original paypal font color which can potentially be overwritten
      $('.payPalMsg').css('color', '#184f68');
      //hide bitcoin and credit card information
      //show paypal information
      $bitcoin.hide();
      $creditCard.hide();
      $paypal.show();
    //if option selected is 'bitcoin'
  } else if (val === 'bitcoin') {
      //remove classes which can potentially duplicate error messages
      $('.cc-blank-error, .cc-length-error, .cc-number-error, .zip-blank-error, .zip-length-error, .zip-number-error, .cvv-blank-error, .cvv-length-error, .cvv-number-error').hide();
      //set original bitcoin font color which can potentially be overwritten
      $('.bitMsg').css('color','#184f68');
      //show bitcoin information
      //hide paypal and credit card information
      $bitcoin.show();
      $creditCard.hide();
      $paypal.hide();
    //if option selected is 'credit card'
  } else if (val === 'credit card') {
      //remove classes which can potentially duplicate error messages
      $('.cc-blank-error, .cc-length-error, .cc-number-error, .zip-blank-error, .zip-length-error, .zip-number-error, .cvv-blank-error, .cvv-length-error, .cvv-number-error').show();
      //hide bitcoin and paypal information
      //show credit card information
      $bitcoin.hide();
      $creditCard.show();
      $paypal.hide();
    //if no payment option is selected
  } else {
      //hide bitcoin, credit card and paypal information
      $bitcoin.hide();
      $creditCard.hide();
      $paypal.hide();
  }
});

//////////////////
//FORM VALIDATION
//////////////////

/*
//regular expression which begins with one or more words (characters[A-Za-z0-9_]) ---  ^\w+
//then includes characters[.-] ---  \w+
//matches [.-] either 0 or 1 time ---  ?
//then includes another word or words (characters[A-Za-z0-9_]) ---  \w+
//matches the previous character 0 or more times --- *
//matches 0 or more occurences of --- ([.-]?\w+)*
// --- \w+([.-]?\w+)*

*/

const email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

//submit event handler for form validation functions: validName(), validEmail(), activityCheck(), creditCheck()
$('form').submit(function (event) {
  const validName = () => {
    //if name input text field is blank
    if ($('#name').val() === '') {
      //prevent form submission
      event.preventDefault();
      //remove class to prevent duplicate message
      $('.name-error').remove();
      //add css class
      $('#name').addClass('error');
      //insert error message into DOM
      $('#name').before('<p class=name-error>Please enter a name.</p>');
      //add css class
      $('p').addClass('error-text');
      //scroll to top of page
      $('html,body').scrollTop(0);
    } else {
      //allow form submission and remove error classes
      $('p').remove('.name-error');
      $('#name').removeClass('error');
    }
  };
  //call name validation
  validName();

  const validEmail = (inputText) => {
    //if email input text field does not match regular expression string
    if (!inputText.match(email_regex)) {
      //prevent form submission
      event.preventDefault();
      //remove
      $('.email-error').remove();
      $('#mail').addClass('error');
      $('#mail').before('<p class=email-error>Please enter a valid email address.</p>');
      $('p').addClass('error-text');
      $('html,body').scrollTop(0);
    } else {
      $('p').remove('.email-error');
      $('#mail').removeClass('error');
    }
  };
  validEmail($('#mail').val());

  const activityCheck = (checked) => {
    if (checked) {
      event.preventDefault();
      $('.activity-error').remove();
      $('.activities legend').before('<p class=activity-error>Please check at least one activity.</p>');
      $('.activities legend').css('margin-bottom', '1px');
      $('.activity-error').addClass('error-text');
    } else {
      $('.activities legend').css('margin-bottom', '22.5px');
      $('p').remove('.activity-error');
    }
  }
  activityCheck($('input:checked').length<1);

  const creditCheck = () => {
    //Break out of creditCheck() validation if credit card option is not selected
    if ($('#payment').val() != 'credit card') {return};
    const cardNumber = $('#cc-num').val();
    const cardNumberValid = (cc) => {
      if (cc == '') {
        event.preventDefault();
        $('.cc-blank-error, .cc-length-error, .cc-number-error').remove();
        $('.credit-card').before('<p class=cc-blank-error>Please enter a Credit Card Number.</p>')
        $('.cc-blank-error').addClass('error-text');
        $('#cc-num').addClass('error');
      } else if (cardNumber.match(/^\d+$/)) {
        if ( cc.length < 13 || cc.length > 16 ) {
          event.preventDefault();
          $('.cc-blank-error, .cc-length-error, .cc-number-error').remove();
          $('.credit-card').before('<p class=cc-length-error>Credit Card Number must be between 13 and 16 digits long.</p>')
          $('.cc-length-error').addClass('error-text');
          $('#cc-num').addClass('error');
        } else if (cc.length >= 13 && cc.length <= 16) {
          $('.cc-blank-error, .cc-length-error, .cc-number-error').remove();
          $('#cc-num').removeClass('error');
        }
      } else if (!cardNumber.match(/^\d+$/)) {
        event.preventDefault();
        $('.cc-blank-error, .cc-length-error, .cc-number-error').remove();
        $('.credit-card').before('<p class=cc-number-error>Credit Card Number cannot include letters or symbols.')
        $('.cc-number-error').addClass('error-text');
        $('#cc-num').addClass('error');
      }
    }
    cardNumberValid($('#cc-num').val());

    const cardZipValid = () => {
      const zipCode = $('#zip').val();
      if (zipCode == '') {
        event.preventDefault();
        $('.zip-blank-error, .zip-length-error, .zip-number-error').remove();
        $('.credit-card').before('<p class=zip-blank-error>Please enter a Zip Code.</p>');
        $('.zip-blank-error').addClass('error-text');
        $('#zip').addClass('error');
      } else if (zipCode.match(/^\d+$/)) {
        if (zipCode.length != 5) {
          event.preventDefault();
          $('.zip-blank-error, .zip-length-error, .zip-number-error').remove();
          $('.credit-card').before('<p class=zip-length-error>Zip Code must be 5 digits long.</p>');
          $('.zip-length-error').addClass('error-text');
          $('#zip').addClass('error')
        } else if (zipCode.length == 5) {
          $('.zip-blank-error, .zip-length-error, .zip-number-error').remove();
          $('#zip').removeClass('error');
        }
      } else if (!zipCode.match(/^\d+$/)){
        event.preventDefault();
        $('.zip-blank-error, .zip-length-error, .zip-number-error').remove();
        $('.credit-card').before('<p class=zip-number-error>Zip Code cannot include letters or symbols.')
        $('.zip-number-error').addClass('error-text');
        $('#zip').addClass('error');
      }
    }
    cardZipValid();

    const cardCVV = () => {
      const CVV = $('#cvv').val();
      if (CVV == '') {
        event.preventDefault();
        $('.cvv-blank-error, .cvv-length-error, .cvv-number-error').remove();
        $('.credit-card').before('<p class=cvv-blank-error>Please enter a CVV.</p>');
        $('.cvv-blank-error').addClass('error-text');
        $('#cvv').addClass('error');
      } else if (CVV.match(/^\d+$/)) {
        if (CVV.length != 3) {
          event.preventDefault();
          $('.cvv-blank-error, .cvv-length-error, .cvv-number-error').remove();
          $('.credit-card').before('<p class=cvv-length-error>CVV must be 3 digits long.</p>');
          $('.cvv-length-error').addClass('error-text');
          $('#cvv').addClass('error');
        } else if (CVV.length == 3) {
          $('.cvv-blank-error, .cvv-length-error, .cvv-number-error').remove();
          $('#cvv').removeClass('error');
        }
      } else if (!CVV.match(/^\d+$/)){
        event.preventDefault();
        $('.cvv-blank-error, .cvv-length-error, .cvv-number-error').remove();
        $('.credit-card').before('<p class=cvv-number-error>CVV cannot include letters or symbols.')
        $('.cvv-number-error').addClass('error-text');
        $('#cvv').addClass('error');
      }
    }
  cardCVV();
  }
  creditCheck();
});

/////////////////////////////
//REAL-TIME EMAIL VALIDATION
/////////////////////////////

$('#mail').first().keyup(function() {
    var $email = this.value;
    validateEmail($email);
});

function validateEmail(inputText) {
    var email_regex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (!email_regex.test(inputText)) {
      $('.email-error, .email-valid').remove();
      $('#mail').addClass('error');
      $('#mail').before('<p class=email-error>Please enter a valid email address (eg: "John.Doe@hotmail.com")</p>');
    } else if ($('#mail').val()=='') {
      $('.email-valid, .email-error').remove();
      $('#mail').removeClass('error');
    } else {
      $('p').remove('.email-error');
      $('#mail').removeClass('error');
      $('.email-valid').remove();
      $('#mail').before('<p class=email-valid>Valid Email!</p>');
    }
}
