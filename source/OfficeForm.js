function OfficeForm(config){
  var container = $(config.id);
  var template =`
    <div class='form-group'>
      <label>Name</label>
      <input class='form-control' name='name' />
    </div>
  `;
  var $html = $(template);
  var elem = $html.find('[name="name"]');
  var autocomplete = new google.maps.places.Autocomplete(elem[0]);
  autocomplete.addListener('place_changed', function(){
    var place = autocomplete.getPlace();
    config.onSave({
      name: place.formatted_address,
      lat: place.geometry.location.lat(), 
      lng: place.geometry.location.lng() 
    });
  });
  $html.on('click', '.btn', function(){
    var input = container.find('[name="name"]');
    config.onSave({
      name: input.val()
    });
  });
  container.empty();
  container.append($html);
}
