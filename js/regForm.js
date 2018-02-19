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

//
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


$('input:checkbox').on('click', function () {
  let $this = $(this);
  let isChecked = $(this).is(':checked');
  if ($this.is('input:checkbox[name="js-frameworks"]')) {
    if ($('input:checkbox[name="js-frameworks"]:checked')) {
      $('input:checkbox[name="express"]').prop('disabled', isChecked ? true : false);
    }
  }
  if ($this.is('input:checkbox[name="express"]')) {
    if ($('input:checkbox[name="express"]:checked')) {
      $('input:checkbox[name="js-frameworks"]').prop('disabled', isChecked ? true : false);
    }
  }
  if ($this.is('input:checkbox[name="js-libs"]')) {
    if ($('input:checkbox[name="js-libs"]:checked')) {
      $('input:checkbox[name="node"]').prop('disabled', isChecked ? true : false);
    }
  }
  if ($this.is('input:checkbox[name="node"]')) {
    if ($('input:checkbox[name="node"]:checked')) {
      $('input:checkbox[name="js-libs"]').prop('disabled', isChecked ? true : false);
    }
  }
});
