function UserForm(config){
  var container = $(config.id);
  var template = `
    <div class='form-group'>
      <label>Name</label>
      <input class='form-control' name='name' />
    </div>
    <div class='form-group'>
      <button class='btn btn-primary'>Save</button>
    </div>
  `;
  container.empty();
  var $html = $(template);
  $html.on('click', '.btn', function(){
    var input = container.find('[name="name"]');
    config.onSave({
      name: input.val()
    });
  });
  container.append($html);
}
