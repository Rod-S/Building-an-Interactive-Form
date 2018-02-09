//focus Basic Info - Name: on page load
document.getElementById('name').focus();

//hide job role text input until conditions met
$('#other-title').hide();

//
$('#title').change(function() {
  console.log($('#title option:selected').val());
  if ($('#title option:selected').val()=='other') {
    $('#other-title').show();
  } else {
    $('#other-title').hide();
  }
});
