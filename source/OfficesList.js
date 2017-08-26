function OfficesList(config){
  var template = `
    <ul class='list-group'>
      ${
        config.offices.reduce(function(memo, office){
          memo+= `
            <li class='list-group-item'>
              ${office.name}
              <label class='label label-default'>
                ${ office.users.length }
              </label>
              <button data-id='${office.id}' class='btn btn-warning pull-right'>delete</button>
              <br clear='all' />
            </li>
          `;
          return memo;
        }, '')
      }
    </ul>
  `;
  var container = $(config.id);
  container.empty();
  var $html = $(template);
  $html.on('click', '.btn-warning', function(){
    config.onDelete($(this).attr('data-id'));
  });
  container.html($html);
}
