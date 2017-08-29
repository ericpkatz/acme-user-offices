function UsersList(config){
  var template = `
    <ul class='list-group'>
      ${
        config.users.reduce(function(memo, user){
          memo+= `
            <li class='list-group-item'>
              ${user.name}
                <select class='form-control' data-user-id='${ user.id }'>
                  ${ config.offices.reduce(function(memo, office){
                    memo += `<option ${ user.officeId === office.id ? 'selected': ''} value='${office.id}'>${office.name}</options>`;
                    return memo;
                  }, `<option value=''>-- none --</option>`)}
                </select>
                <div class='form-group' style='margin-top:10px'>
                  <button class='btn btn-warning' data-id='${user.id}'>remove</button>
                </div>
            </li>
            `;
          return memo;
        }, '')
      }
    </ul>
  `;

  var container = $(config.id);
  container.on('click', '.btn-warning', function(){
    config.onDelete($(this).attr('data-id'));
  });
  container.on('change', 'select', function(){
    var $this = $(this);
    config.onChange({
      id: $this.attr('data-user-id')*1,
      officeId: $this.val() ?  $this.val()*1 : null
    });
  });
  container.empty();
  var $html = $(template);
  container.html($html);
}
