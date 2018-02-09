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
    $('#color').children('option[value="cornflowerblue"][value="darkslategrey"][value="gold"]').show();
    //$('#color').children('option[value="darkslategrey"]').show();
    //$('#color').children('option[value="gold"]').show();
    $('#color').children('option[value="tomato"][value="steelblue"][value="dimgrey"]').hide();
    //$('#color').children('option[value="tomato"]').hide();
    //$('#color').children('option[value="steelblue"]').hide();
    //$('#color').children('option[value="dimgrey"]').hide();
  } else if ($('#design').val()=='heart js') {
    $('#colors-js-puns').show();
    $('#color').val('');
    $('#color').children('option[value="cornflowerblue"]').hide();
    $('#color').children('option[value="darkslategrey"]').hide();
    $('#color').children('option[value="gold"]').hide();
    $('#color').children('option[value="tomato"]').show();
    $('#color').children('option[value="steelblue"]').show();
    $('#color').children('option[value="dimgrey"]').show();
  } else {
    $('#colors-js-puns').hide();
  }
});

//$('input[type="checkbox"]').each().addClass()
