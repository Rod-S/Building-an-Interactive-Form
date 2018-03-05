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

  //nested conditionals required to prevent checkbox from being permanently disabled once checked
  if ($this.is('input:checkbox[name="js-frameworks"]')) {
    if ($('input:checkbox[name="js-frameworks"]:checked')) {
      //if 'js-frameworks' is checked, disable 'express' checkbox. Otherwise, do not disable
      //addt'l ternary operator added for parent label element to add or remove css class "disabled-label" based on :checked
      $('input:checkbox[name="express"]').prop('disabled', isChecked ? true : false).parent()[isChecked ? 'addClass' : 'removeClass']('disabled-label');
    }
  }
  else if ($this.is('input:checkbox[name="express"]')) {
    if ($('input:checkbox[name="express"]:checked')) {
      //if 'express' is checked, disable 'js-frameworks' checkbox. Otherwise, do not disable
      //addt'l ternary operator added for parent label element to add or remove css class "disabled-label" based on :checked
      $('input:checkbox[name="js-frameworks"]').prop('disabled', isChecked ? true : false).parent()[isChecked ? 'addClass' : 'removeClass']('disabled-label');
    }
  }
  else if ($this.is('input:checkbox[name="js-libs"]')) {
    if ($('input:checkbox[name="js-libs"]:checked')) {
      //if 'js-libs' is checked, disable 'node' checkbox. Otherwise, do not disable
      //addt'l ternary operator added for parent label element to add or remove css class "disabled-label" based on :checked
      $('input:checkbox[name="node"]').prop('disabled', isChecked ? true : false).parent()[isChecked ? 'addClass' : 'removeClass']('disabled-label');;
    }
  }
  else if ($this.is('input:checkbox[name="node"]')) {
    if ($('input:checkbox[name="node"]:checked')) {
      //if 'node' is checked, disable 'js-libs' checkbox. Otherwise, do not disable
      //addt'l ternary operator added for parent label element to add or remove css class "disabled-label" based on :checked
      $('input:checkbox[name="js-libs"]').prop('disabled', isChecked ? true : false).parent()[isChecked ? 'addClass' : 'removeClass']('disabled-label');;
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

//initial payment option set to 'credit card'
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
  } else if (val === 'bitcoin') {
      $('.cc-blank-error, .cc-length-error, .cc-number-error, .zip-blank-error, .zip-length-error, .zip-number-error, .cvv-blank-error, .cvv-length-error, .cvv-number-error').hide();
      //set original bitcoin font color which can potentially be overwritten
      $('.bitMsg').css('color','#184f68');
      $bitcoin.show();
      $creditCard.hide();
      $paypal.hide();
  } else if (val === 'credit card') {
      $('.cc-blank-error, .cc-length-error, .cc-number-error, .zip-blank-error, .zip-length-error, .zip-number-error, .cvv-blank-error, .cvv-length-error, .cvv-number-error').show();
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

/*regular expression to match a string that includes an alphanumeric phrase followed by:
a [.] or [-] followed by another sequence of an alphanumeric phrase 1 or more times
followed by an [@]followed by another word or phrase
followed by a [.]
and a word or phrase that is at least 2 letters in length to a maximum of 4 */
const email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

//submit event handler for form validation functions: validName(), validEmail(), activityCheck(), creditCheck()
$('form').submit(function (event) {
  const validName = () => {
    //if name input text field is blank
    if ($('#name').val() === '') {
      //prevent form submission and add error classes/msg
      event.preventDefault();
      $('.name-error').remove();
      $('#name').addClass('error');
      $('#name').before('<p class=name-error>Please enter a name.</p>');
      $('p').addClass('error-text');
      $('html,body').scrollTop(0);
      //otherwise remove error classes allow form submission
    } else {
      $('p').remove('.name-error');
      $('#name').removeClass('error');
    }
  };
  //call name validation
  validName();

  const validEmail = (inputText) => {
    //if email input text field does not match regular expression string
    if (!inputText.match(email_regex)) {
      //prevent form submission and add error classes/msg
      event.preventDefault();
      $('.email-error').remove();
      $('#mail').addClass('error');
      $('#mail').before('<p class=email-error>Please enter a valid email address.</p>');
      $('p').addClass('error-text');
      $('html,body').scrollTop(0);
    } else {
      //otherwise remove error classes and allow form submission
      $('p').remove('.email-error');
      $('#mail').removeClass('error');
    }
  };
  //run email validation
  validEmail($('#mail').val());

  //activity checkbox validation
  const activityCheck = (checked) => {
    //if no checkbox is checked
    if (checked) {
      //prevent form submission and add error messages
      event.preventDefault();
      $('.activity-error').remove();
      $('.activities legend').before('<p class=activity-error>Please check at least one activity.</p>');
      $('.activities legend').css('margin-bottom', '1px');
      $('.activity-error').addClass('error-text');
    } else {
      //otherwise remove error classes and allow form to submit
      $('.activities legend').css('margin-bottom', '22.5px');
      $('p').remove('.activity-error');
    }
  }
  //run activity isChecked validation
  activityCheck($('input:checked').length<1);

  //payment section validation
  const creditCheck = () => {
    //Break out of creditCheck() validation if credit card option is not selected
    if ($('#payment').val() != 'credit card') {return};
    const cardNumber = $('#cc-num').val();
    const cardNumberValid = (cc) => {
      //if credit card number field is blank, prevent form submission and add error classes/msg
      if (cc == '') {
        event.preventDefault();
        $('.cc-blank-error, .cc-length-error, .cc-number-error').remove();
        $('.credit-card').before('<p class=cc-blank-error>Please enter a Credit Card Number.</p>')
        $('.cc-blank-error').addClass('error-text');
        $('#cc-num').addClass('error');
        //if card number text field matches numbers only
      } else if (cardNumber.match(/^\d+$/)) {
        //if card number length is less than 13 or greater than 16 prevent form submission and add error classes/msg
        if ( cc.length < 13 || cc.length > 16 ) {
          event.preventDefault();
          $('.cc-blank-error, .cc-length-error, .cc-number-error').remove();
          $('.credit-card').before('<p class=cc-length-error>Credit Card Number must be between 13 and 16 digits long.</p>')
          $('.cc-length-error').addClass('error-text');
          $('#cc-num').addClass('error');
          //if card number length is between 13 and 16 remove errors and allow form to submit
        } else if (cc.length >= 13 && cc.length <= 16) {
          $('.cc-blank-error, .cc-length-error, .cc-number-error').remove();
          $('#cc-num').removeClass('error');
        }
        //if card number includes more than just numbers prevent submission and add error classes/msg
      } else if (!cardNumber.match(/^\d+$/)) {
        event.preventDefault();
        $('.cc-blank-error, .cc-length-error, .cc-number-error').remove();
        $('.credit-card').before('<p class=cc-number-error>Credit Card Number cannot include letters or symbols.')
        $('.cc-number-error').addClass('error-text');
        $('#cc-num').addClass('error');
      }
    }
    //run card number validation
    cardNumberValid($('#cc-num').val());

    //zip code validation
    const cardZipValid = () => {
      const zipCode = $('#zip').val();
      //if zip code field is blank
      if (zipCode == '') {
        //prevent form submission and add error classes/msg
        event.preventDefault();
        $('.zip-blank-error, .zip-length-error, .zip-number-error').remove();
        $('.credit-card').before('<p class=zip-blank-error>Please enter a Zip Code.</p>');
        $('.zip-blank-error').addClass('error-text');
        $('#zip').addClass('error');
        //if zip code field input matches a number
      } else if (zipCode.match(/^\d+$/)) {
        //if the zip code number input is not equal to 5
        if (zipCode.length != 5) {
          //prevent form submission and add error classes/msg
          event.preventDefault();
          $('.zip-blank-error, .zip-length-error, .zip-number-error').remove();
          $('.credit-card').before('<p class=zip-length-error>Zip Code must be 5 digits long.</p>');
          $('.zip-length-error').addClass('error-text');
          $('#zip').addClass('error')
          //if the zip code number input is equal to 5
        } else if (zipCode.length == 5) {
          //remove errors and allow form to submit
          $('.zip-blank-error, .zip-length-error, .zip-number-error').remove();
          $('#zip').removeClass('error');
        }
        //if the zip code field input includes characters other than numbers
      } else if (!zipCode.match(/^\d+$/)){
        //prevent form submission and add error classes/msg
        event.preventDefault();
        $('.zip-blank-error, .zip-length-error, .zip-number-error').remove();
        $('.credit-card').before('<p class=zip-number-error>Zip Code cannot include letters or symbols.')
        $('.zip-number-error').addClass('error-text');
        $('#zip').addClass('error');
      }
    }
    //run zip code field validation
    cardZipValid();

    //CVV field validation
    const cardCVV = () => {
      const CVV = $('#cvv').val();
      //if cvv field is blank
      if (CVV == '') {
        //prevent form submission and add error classes
        event.preventDefault();
        $('.cvv-blank-error, .cvv-length-error, .cvv-number-error').remove();
        $('.credit-card').before('<p class=cvv-blank-error>Please enter a CVV.</p>');
        $('.cvv-blank-error').addClass('error-text');
        $('#cvv').addClass('error');
        //if the cvv field matches a string of only numbers
      } else if (CVV.match(/^\d+$/)) {
        //if the cvv field string length is not equal to 3
        if (CVV.length != 3) {
          //prevent form submission and add error classes
          event.preventDefault();
          $('.cvv-blank-error, .cvv-length-error, .cvv-number-error').remove();
          $('.credit-card').before('<p class=cvv-length-error>CVV must be 3 digits long.</p>');
          $('.cvv-length-error').addClass('error-text');
          $('#cvv').addClass('error');
          //if cvv field string length is equal to 3
        } else if (CVV.length == 3) {
          //remove errors and allow form submission
          $('.cvv-blank-error, .cvv-length-error, .cvv-number-error').remove();
          $('#cvv').removeClass('error');
        }
        //if the cvv field string does not match only numbers
      } else if (!CVV.match(/^\d+$/)){
        //prevent form submission and add error classes/msg
        event.preventDefault();
        $('.cvv-blank-error, .cvv-length-error, .cvv-number-error').remove();
        $('.credit-card').before('<p class=cvv-number-error>CVV cannot include letters or symbols.')
        $('.cvv-number-error').addClass('error-text');
        $('#cvv').addClass('error');
      }
    }
    //run cvv validation
  cardCVV();
  }
  //run payment section validation
  creditCheck();
});

/////////////////////////////
//REAL-TIME EMAIL VALIDATION
/////////////////////////////


//keyup event handler to run each time a key is pressed and released
$('#mail').first().keyup(function() {
    var $email = this.value;
    validateEmail($email);
});

function validateEmail(inputText) {
    //email regular expression string to match email input text field against
    var email_regex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    //if current string does not match email_regex string template
    if (!email_regex.test(inputText)) {
      //display error classes/msg
      $('.email-error, .email-valid').remove();
      $('#mail').addClass('error');
      $('#mail').before('<p class=email-error>Please enter a valid email address (eg: "John.Doe@hotmail.com")</p>');
      //if input field is currently empty, remove error classes
    } else if ($('#mail').val()=='') {
      $('.email-valid, .email-error').remove();
      $('#mail').removeClass('error');
      //if user email string matches regular expression display validation pass message
    } else {
      $('p').remove('.email-error');
      $('#mail').removeClass('error');
      $('.email-valid').remove();
      $('#mail').before('<p class=email-valid>Valid Email!</p>');
    }
}
