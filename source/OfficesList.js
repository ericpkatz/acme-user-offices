function OfficesList(config){
  var template = `
    <ul class='list-group'>
      ${
        config.offices.reduce(function(memo, office){
          memo+= `
            <li class='list-group-item'>
              ${office.name}
              <br />
              <em>lat:</em> ${office.lat}
              <br />
              <em>lng:</em> ${office.lng}
              <br />
              <p style='margin-top: 10px'>
                <label class='label label-default'>
                  ${ office.users.length } User${ office.users.length > 1 ? 's' : '' }
                </label>
              </p>
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
