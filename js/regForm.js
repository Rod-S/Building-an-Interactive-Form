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
  $('#payment option:selected').each(function () {
    if ($('#payment option[value="paypal"]:selected')) {
        $bitcoin.hide();
        $creditCard.hide();
        $paypal.show();
    } else if ($('#payment option[value="credit card"]:selected')) {
        $paypal.hide();
        $bitcoin.hide();
        $creditCard.show();
    }
  })
})
