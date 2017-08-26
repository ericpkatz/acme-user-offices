$(function(){
  function renderUserForm(){
    UserForm({
      id: '#userForm',
      onSave: function(user){
        $.post('/users', user)
          .then(function(){
            renderUsersList();
            renderUserForm();
          });
      }
    });
  }

  function renderOfficeForm(){
    OfficeForm({
      id: '#officeForm',
      onSave: function(office){
        $.post('/offices', office)
          .then(function(){
            renderOfficesList();
            renderOfficeForm();
            renderUsersList();
          });
      }
    });
  }

  function renderUsersList(){
    Promise.all([
      $.get('/users'),
      $.get('/offices'),
    ])
    .then(function(result){
      var offices = result[1];
      var users = result[0];
      UsersList({
        id: '#usersList',
        users: users,
        offices: offices,
        onDelete: function(id){
          $.ajax({
            url: `/users/${id}`,
            method: 'DELETE'
          })
          .then(()=> {
            renderUsersList();
          });
        },
        onChange: function(user){
          $.ajax({
            contentType: 'application/json',
            method: 'PUT',
            url: `/users/${user.id}`,
            data: JSON.stringify(user)
          })
          .then( renderOfficesList );
        }
      });
    });
  }

  function renderOfficesList(){
    $.get('/offices')
      .then(function(offices){
        OfficesList({
          id: '#officesList',
          offices: offices,
          onDelete: function(id){
            $.ajax({
              url: `/offices/${id}`,
              method: 'DELETE'
            })
            .then(()=> {
              renderOfficesList();
              renderUsersList();
            });
          }
        });
      });
  }

  renderOfficesList();
  renderUsersList();
  renderUserForm();
  renderOfficeForm();
});
