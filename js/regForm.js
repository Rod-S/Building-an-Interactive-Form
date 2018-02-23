//focus Basic Info - Name: on page load
document.getElementById('name').focus();

//initial page load to hide job role text input until conditions met
$('#other-title').hide();

//conditional on select option change to show or hide job role text input
$('#title').change(function() {
  if ($('#title option:selected').val()=='other') {
    $('#other-title').show();
  } else {
    $('#other-title').hide();
  }
});

//initial page laod to hide t-shirt color until conditions met
$('#colors-js-puns').hide();

//T-SHIRT INFO

$('#design').change(function() {
  if ($('#design').val()=='js puns') {
    $('#colors-js-puns').show();
    $('#color').val('');
    $('.jsPuns').show();
    $('.heartJs').hide();
  } else if ($('#design').val()=='heart js') {
    $('#colors-js-puns').show();
    $('#color').val('');
    $('.jsPuns').hide();
    $('.heartJs').show();
  } else {
    $('#colors-js-puns').hide();
  }
});

//REGISTER FOR ACTIVITIES

$('input:checkbox').on('click', function () {
  let $this = $(this);
  let isChecked = $this.is(':checked');
  if ($this.is('input:checkbox[name="js-frameworks"]')) {
    if ($('input:checkbox[name="js-frameworks"]:checked')) {
      $('input:checkbox[name="express"]').prop('disabled', isChecked ? true : false);
    }
  }
  else if ($this.is('input:checkbox[name="express"]')) {
    if ($('input:checkbox[name="express"]:checked')) {
      $('input:checkbox[name="js-frameworks"]').prop('disabled', isChecked ? true : false);
    }
  }
  else if ($this.is('input:checkbox[name="js-libs"]')) {
    if ($('input:checkbox[name="js-libs"]:checked')) {
      $('input:checkbox[name="node"]').prop('disabled', isChecked ? true : false);
    }
  }
  else if ($this.is('input:checkbox[name="node"]')) {
    if ($('input:checkbox[name="node"]:checked')) {
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
    $("input[type=checkbox]:checked").each(function() {
      total += parseInt($(this).attr('val'));
    });
  $('#activityTotal').remove();
  $('.activities').append('<div id=activityTotal>Total $' + total + '</div>');
};

//PAYMENT INFO

const $creditCard = $('.credit-card');
const $paypal = $('#credit-card').next();
const $bitcoin = $('#credit-card').next().next();

//initial payment selection
$('#payment option[value="credit card"]').prop('selected', true);
$paypal.hide();
$bitcoin.hide();


  $('#payment').change(function() {
    const val = $(this).val();
    if (val === 'paypal') {
        $bitcoin.hide();
        $creditCard.hide();
        $paypal.show();
    } else if (val === 'bitcoin') {
        $bitcoin.show();
        $creditCard.hide();
        $paypal.hide();
    } else if (val === 'credit card') {
        $bitcoin.hide();
        $creditCard.show();
        $paypal.hide();
    } else {
        $bitcoin.hide();
        $creditCard.hide();
        $paypal.hide();
    }
  });

//FORM VALIDATION

$('form').submit(function (event) {
  const validName = () => {
    if ($('#name').val() === '') {
      event.preventDefault();
      $('.name-error').remove();
      $('#name').addClass('error');
      $('#name').before('<p class=name-error>Please enter a name.</p>');
      $('p').addClass('error-text');
      $('html,body').scrollTop(0);
    } else {
      $('p').remove('.name-error');
      $('#name').removeClass('error');
    }
  };
  validName();

  const validEmail = (inputText) => {
    const email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!inputText.match(email_regex)) {
      event.preventDefault();
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

  const activityChecked = (checked) => {
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
  activityChecked($('input:checked').length<1);

  const creditCheck = () => {
    const cardNumber = $('#cc-num').val();
    const cc_num_regex = /^\d+$/
    const cardNumberValid = (cc) => {
      if (cc == '') {
        $('.cc-blank-error').remove();
        $('.cc-number-error').remove();
        $('.cc-letter-error').remove();
        $('.credit-card').before('<p class=cc-blank-error>Please enter a card number.</p>')
        $('.cc-blank-error').addClass('error-text');
        $('#cc-num').addClass('error');
      } else if (cardNumber.match(/^\d+$/)) {
        if ( cc.length < 13 || cc.length > 16 ) {
          $('.cc-blank-error').remove();
          $('.cc-number-error').remove();
          $('.cc-letter-error').remove();
          $('.credit-card').before('<p class=cc-number-error>Card Number must be between 13 and 16 numbers.</p>')
          $('.cc-number-error').addClass('error-text');
          $('#cc-num').addClass('error');
        }
      } else if (!cardNumber.match(/^\d+$/)) {
        $('.cc-blank-error').remove();
        $('.cc-number-error').remove();
        $('.cc-letter-error').remove();
        $('.credit-card').before('<p class=cc-letter-error>Card Number cannot include letters or symbols.')
        $('.cc-letter-error').addClass('error-text');
        $('#cc-num').addClass('error');
      } else {
        $('.cc-blank-error').remove();
        $('.cc-number-error').remove();
        $('.cc-letter-error').remove();
        $('#cc-num').removeClass('error');
      }
    }
    cardNumberValid($('#cc-num').val());
  }
  creditCheck();
});
