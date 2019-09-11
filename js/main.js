var DEBUG = true;

function debug(data) {
  if (DEBUG) {
    console.log(data);
  }
}

function showLoader() {
  $('#loader').addClass('loading');
}

function hideLoader() {
  $('#loader').removeClass('loading');
}

function makeAPIRequest(url, method, successCallback, errorCallback, body) {
  showLoader();
  var req = {
      method: method,
      headers: {
        "Accept": "application/json"
      }
  };
  if (body !== undefined) {
    req.body = body;
  }
  fetch(
    url, 
    req
  )
  .then(function(response) {
    hideLoader();
    successCallback(response);
  })
 .catch(function(err) {
    hideLoader();
    errorCallback(err);
  });  
}

function loadView(url, method, templatePath, renderer, errorHandler) {
  makeAPIRequest(
    url, 
    method,
    function(response) {
      if (response.status !== 200) {
          errorHandler(response);
          return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        debug(data);
        var template = twig({
            href: templatePath,
            async: false,
            // The default is to load asynchronously, and call the load function 
            //   when the template is loaded.
            load: function(template) {
              renderer(template, data);
            }
        });
      }).catch(errorHandler);
    },
    errorHandler
  );
}

function fetchSessions()
{
    $('.nav-link.active').removeClass('active');
    $('#menuitem-sessions').addClass('active');
    
    $('#forms').html('');
    loadView(
      'http://www.lmsuy.local/sessions', 
      'get', 
      'templates/sessions-list.twig',
      function(template, data) {
        var output = template.render({
          sessions : data
        });
        $('#main').html(output);
      },
      function(err) {
        debug('Fetch Error :-S', err);
      }
    );
}

function deleteSession(idSession)
{   
    var url = 'http://www.lmsuy.local/sessions/' + idSession + '/remove';
    var method = 'get';
    makeAPIRequest(
      url,
      method,
      function(response) {
        if (response.status !== 204) {
            errorHandler(response);
            return;
        }

        fetchSessions();
        debug(data);
      },
        function(err) {
          console.log(err)
        }
      );
}

function fetchUsers()
{
    $('.nav-link.active').removeClass('active');
    $('#menuitem-users').addClass('active');
    
    $('#forms').html('');
    loadView(
      'http://www.lmsuy.local/users', 
      'get', 
      'templates/users-list.twig',
      function(template, data) {
        var output = template.render({
          users : data
        });
        $('#main').html(output);
      },
      function(err) {
        debug('Fetch Error :-S', err);
      }
    );
}

function deleteUser(idUser)
{   
    var url = 'http://www.lmsuy.local/users/' + idUser + '/remove';
    var method = 'get';
    makeAPIRequest(
      url,
      method,
      function(response) {
        if (response.status !== 204) {
            errorHandler(response);
            return;
        }

        fetchUsers();
        debug(data);
      },
        function(err) {
          console.log(err)
        }
      );
}

function fetchBuyins(idSession)
{   
    $('#forms').html('');
    loadView(
      'http://www.lmsuy.local/sessions/' + idSession + '/buyins', 
      'get', 
      'templates/buyins-list.twig',
      function(template, data) {
        var output = template.render({
          buyins : data,
          idSession: idSession
        });
        $('#main').html(output);
      },
      function(err) {
        debug('Fetch Error :-S', err);
      }
    );
}

function deleteBuyin(idSession, idBuyin)
{   
    var url = 'http://www.lmsuy.local/' + idSession + '/buyins/' + idBuyin + '/remove';
    var method = 'get';
    makeAPIRequest(
      url,
      method,
      function(response) {
        if (response.status !== 204) {
            errorHandler(response);
            return;
        }

        fetchBuyins(idSession);
        debug(data);
      },
        function(err) {
          console.log(err)
        }
      );
}

function fetchComissions(idSession)
{   
    $('#forms').html('');
    loadView(
      'http://www.lmsuy.local/sessions/' + idSession + '/comissions', 
      'get', 
      'templates/comissions-list.twig',
      function(template, data) {
        var output = template.render({
          comissions : data,
          idSession: idSession
        });

        $('#main').html(output);
      },
      function(err) {
        debug('Fetch Error :-S', err);
      }
    );
}

function deleteComission(idSession, idComission)
{   
    var url = 'http://www.lmsuy.local/' + idSession + '/comissions/' + idComission + '/remove';
    var method = 'get';
    makeAPIRequest(
      url,
      method,
      function(response) {
        if (response.status !== 204) {
            errorHandler(response);
            return;
        }

        fetchComissions(idSession);
        debug(data);
      },
        function(err) {
          console.log(err)
        }
      );
}


function fetchUsersSession(idSession)
{   
    $('#forms').html('');
    loadView(
      'http://www.lmsuy.local/sessions/' + idSession + '/usersSession', 
      'get', 
      'templates/userssession-list.twig',
      function(template, data) {
        var output = template.render({
          usersSession : data,
          idSession: idSession
        });
        $('#main').html(output);
      },
      function(err) {
        debug('Fetch Error :-S', err);
      }
    );
}

function deleteUserSession(idSession, idUserSession)
{   
    var url = 'http://www.lmsuy.local/' + idSession + '/usersSession/' + idUserSession + '/remove';
    var method = 'get';
    makeAPIRequest(
      url,
      method,
      function(response) {
        if (response.status !== 204) {
            errorHandler(response);
            return;
        }

        fetchUsersSession(idSession);
        debug(data);
      },
        function(err) {
          console.log(err)
        }
    );
}

function fetchExpenses(idSession)
{   
    $('#forms').html('');
    loadView(
      'http://www.lmsuy.local/sessions/' + idSession + '/expenses', 
      'get', 
      'templates/expenses-list.twig',
      function(template, data) {
        var output = template.render({
          expenses : data,
          idSession: idSession
        });
        $('#main').html(output);
      },
      function(err) {
        debug('Fetch Error :-S', err);
      }
    );
}

function deleteExpenditure(idSession, idExpenditure)
{   
    var url = 'http://www.lmsuy.local/sessions/' + idSession + '/expenses/' + idExpenditure + '/remove';
    var method = 'get';
    makeAPIRequest(
      url,
      method,
      function(response) {
        if (response.status !== 204) {
            errorHandler(response);
            return;
        }

        fetchExpenses(idSession);
        debug(data);
      },
        function(err) {
          console.log(err)
        }
    );
}

function fetchTips(idSession)
{   
    $('#forms').html('');
    loadView(
      'http://www.lmsuy.local/sessions/' + idSession + '/tips', 
      'get', 
      'templates/tips-list.twig',
      function(template, data) {
        var output = template.render(
          {
            dealerTips : data.dealerTips, 
            serviceTips : data.serviceTips,
            idSession: idSession
          }
        );
        $('#main').html(output);
      },
      function(err) {
        debug('Fetch Error :-S', err);
      }
    );
}

function deleteDealerTip(idSession, idDealerTip)
{   
    var url = 'http://www.lmsuy.local/' + 'tips/dealertip/' + idDealerTip + '/remove';
    var method = 'get';
    makeAPIRequest(
      url,
      method,
      function(response) {
        if (response.status !== 204) {
            errorHandler(response);
            return;
        }

        fetchTips(idSession);
        debug(data);
      },
        function(err) {
          console.log(err)
        }
    );
}

function deleteServiceTip(idSession, idServiceTip)
{   
    var url = 'http://www.lmsuy.local/' + 'tips/servicetip/' + idServiceTip + '/remove';
    var method = 'get';
    makeAPIRequest(
      url,
      method,
      function(response) {
        if (response.status !== 204) {
            errorHandler(response);
            return;
        }

        fetchTips(idSession);
        debug(data);
      },
        function(err) {
          console.log(err)
        }
    );
}

///////////////////////////////////////

function updateComission(idSession, idComission)
{   
    loadView(
      'http://www.lmsuy.local/sessions/' + idSession + '/comissions/' + idComission, 
      'get', 
      'templates/comission-form.twig',
      function(template, data) {
        var output = template.render({
          title : 'Editar Comisión',
          action : 'http://www.lmsuy.local/comissions/' + idComission + '/update',
          buttonName : 'Editar',
          idSession : idSession
        });
        $('#forms').html(output);
        $('#id').val(data.id);
        $('#idSession').val(data.idSession);
        $('#comission').val(data.comission);
        $('#hour').val(data.hour.date.substr(0,10) + 'T' + data.hour.date.substr(11,5));

        // debug(data.hour.date.substr(0,10) + 'T' + data.hour.date.substr(11,5));
        // yyyy-MM-ddThh:mm
        // date: "2019-09-09 00:00:00.000000"

      },
      function(err) {
        debug('Fetch Error :-S', err);
      }
    );
}

function comissionSubmit(idSession)
{
  var url    = $('#comissions-form').attr("action");
  var method = $('#comissions-form').attr("method");
  var form = new FormData(document.getElementById('comissions-form'));
  var errorHandler = function(err) {
    console.log(err)
  };
  makeAPIRequest(
    url,
    method,
    function(response) {
      if (response.status !== 200 && response.status !== 201) {
          errorHandler(response);
          return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        // CERRAR EL FORMULARIO
        $('#forms').html('');
        // ACTUALIZAR LA TABLA
        fetchComissions(idSession);
        debug(data);
      });
    },
   errorHandler,
    form
  );
}

function addComission(idSession)
{   
  // cargo el template de form
  var template = twig({
      href: 'templates/comission-form.twig',
      async: false,
      // The default is to load asynchronously, and call the load function 
      //   when the template is loaded.
      load: function(tpl) {
        var output = tpl.render({
          idSession : idSession,
          session : null,
          title: 'Agregar comisión',
          action : 'http://www.lmsuy.local/sessions/' + idSession + '/comissions',
          buttonName : 'Agregar'
        });
        $('#forms').html(output);
        $('#idSession').val(idSession);
      }
  });
}


function updateBuyin(idSession, idBuyin)
{   
    let dir = 'http://www.lmsuy.local/sessions/' + idSession + '/buyins/' + idBuyin;
    console.log(dir);
    loadView(
      'http://www.lmsuy.local/sessions/' + idSession + '/buyins/' + idBuyin, 
      'get', 
      'templates/buyin-form.twig',
      function(template, data) {
        var output = template.render({
          buyin : data,
          title : 'Editar Buyin',
          action : 'http://www.lmsuy.local/buyins/' + idBuyin + '/update',
          buttonName : 'Editar',
          idSession : idSession
        });
        $('#forms').html(output);
        $('#id').val(data.id);
        $('#idSession').val(data.idSession);
        $('#idUserSession').val(data.user_session.id);
        $('#amountCash').val(data.amountCash);
        $('#amountCredit').val(data.amountCredit);
        $('#approved').val(data.approved);
        $('#hour').val(data.hour.date.substr(0,10) + 'T' + data.hour.date.substr(11,5));
      },
      function(err) {
        debug('Fetch Error :-S', err);
      }
    );
}

function buyinSubmit(idSession)
{
  var url    = $('#buyins-form').attr("action");
  var method = $('#buyins-form').attr("method");
  var form = new FormData(document.getElementById('buyins-form'));
  makeAPIRequest(
    url,
    method,
    function(response) {
      if (response.status !== 200 && response.status !== 201) {
          errorHandler(response);
          return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        // CERRAR EL FORMULARIO
        $('#forms').html('');
        // ACTUALIZAR LA TABLA
        fetchBuyins(idSession);
        debug(data);
      });
    },
    function(err) {
      console.log(err)
    },
    form
  );
}

function addBuyin(idSession)
{   
  // cargo el template de form
  var template = twig({
      href: 'templates/buyin-formAdd.twig',
      async: false,
      // The default is to load asynchronously, and call the load function 
      //   when the template is loaded.
      load: function(tpl) {
        var output = tpl.render({
          idSession : idSession,
          session : null,
          title: 'Agregar Buyin',
          action : 'http://www.lmsuy.local/sessions/' + idSession + '/buyins',
          buttonName : 'Agregar'
        });
        $('#forms').html(output);
        $('#idSession').val(idSession);
        var loadUsers = function() {
          makeAPIRequest(
          'http://www.lmsuy.local/sessions/' + idSession + '/usersSession',
          'get',
          function(response) {
            if (response.status !== 200) {
                // si falla fetch usuarios hay que reintentarlo con un max retries
                //loadUsers();
                return;
            }

            // Examine the text in the response
            response.json().then(function(data) {
              
              // hacer un for
              // agregar los options al select
              data.forEach(function(item) {
                debug(item);
                if (item.end == null) {
                    $('#idUserSession').append('<option value="'+item.id+'">'+item.user.name+' '+item.lastname+'</option>');
                }
              });
            });
          },
          function(err) {
            console.log(err)
          },
        );
      };
      loadUsers();
    }
  });
}

function updateExpenditure(idSession, idExpenditure)
{   
    loadView(
      'http://www.lmsuy.local/sessions/' + idSession + '/expenses/' + idExpenditure, 
      'get', 
      'templates/expenditure-form.twig',
      function(template, data) {
        var output = template.render({
          expenditure : data,
          title : 'Editar Gasto',
          action : 'http://www.lmsuy.local/sessions/' + idSession + '/expenses/' + idExpenditure + '/update',
          buttonName : 'Editar',
          idSession : idSession
        });

        $('#forms').html(output);
        $('#id').val(data.id);
        $('#idSession').val(data.idSession);
        $('#description').val(data.description);
        $('#amount').val(data.amount);
      },
      function(err) {
        debug('Fetch Error :-S', err);
      }
    );
}

function expenditureSubmit(idSession)
{
  var url    = $('#expenses-form').attr("action");
  var method = $('#expenses-form').attr("method");
  var form = new FormData(document.getElementById('expenses-form'));
  makeAPIRequest(
    url,
    method,
    function(response) {
      if (response.status !== 200 && response.status !== 201) {
          errorHandler(response);
          return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        // CERRAR EL FORMULARIO
        $('#forms').html('');
        // ACTUALIZAR LA TABLA
        fetchExpenses(idSession);
        debug(data);
      });
    },
    function(err) {
      console.log(err)
    },
    form
  );
}

function addExpenditure(idSession)
{   
  // cargo el template de form
  var template = twig({
      href: 'templates/expenditure-form.twig',
      async: false,
      // The default is to load asynchronously, and call the load function 
      //   when the template is loaded.
      load: function(tpl) {
        var output = tpl.render({
          idSession : idSession,
          session : null,
          title: 'Agregar Gasto',
          action : 'http://www.lmsuy.local/sessions/' + idSession + '/expenses',
          buttonName : 'Agregar'
        });
        $('#forms').html(output);
        $('#idSession').val(idSession);
      }
  });
}

function updateDealerTip(idSession, idDealerTip)
{   
    loadView(
      'http://www.lmsuy.local/sessions/' + idSession + '/tips/dealerTip/' + idDealerTip, 
      'get', 
      'templates/dealerTip-form.twig',
      function(template, data) {
        var output = template.render({
          dealerTip : data.dealerTip,
          title : 'Editar Dealer Tip',
          action : 'http://www.lmsuy.local/tips/dealertip/' + idDealerTip + '/update',
          buttonName : 'Editar',
          idSession : idSession
        });

        $('#forms').html(output);
        $('#id').val(data.id);
        $('#idSession').val(data.idSession);
        $('#hour').val(data.hour.date.substr(0,10) + 'T' + data.hour.date.substr(11,5));
        $('#dealerTip').val(data.dealerTip);
      },
      function(err) {
        debug('Fetch Error :-S', err);
      }
    );
}

function dealerTipSubmit(idSession)
{
  var url    = $('#dealerTips-form').attr("action");
  var method = $('#dealerTips-form').attr("method");
  var form = new FormData(document.getElementById('dealerTips-form'));
  makeAPIRequest(
    url,
    method,
    function(response) {
      if (response.status !== 200 && response.status !== 201) {
          errorHandler(response);
          return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        // CERRAR EL FORMULARIO
        $('#forms').html('');
        // ACTUALIZAR LA TABLA
        fetchTips(idSession);
        debug(data);
      });
    },
    function(err) {
      console.log(err)
    },
    form
  );
}

function addTips(idSession)
{   
  // cargo el template de form
  var template = twig({
      href: 'templates/tips-form.twig',
      async: false,
      // The default is to load asynchronously, and call the load function 
      //   when the template is loaded.
      load: function(tpl) {
        var output = tpl.render({
          idSession : idSession,
          session : null,
          title: 'Agregar Tips',
          action : 'http://www.lmsuy.local/sessions/' + idSession + '/tips',
          buttonName : 'Agregar'
        });
        $('#forms').html(output);
        $('#idSession').val(idSession);
      }
  });
}

function tipsSubmit(idSession)
{
  var url    = $('#tips-form').attr("action");
  var method = $('#tips-form').attr("method");
  var form = new FormData(document.getElementById('tips-form'));
  makeAPIRequest(
    url,
    method,
    function(response) {
      if (response.status !== 200 && response.status !== 201) {
          errorHandler(response);
          return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        // CERRAR EL FORMULARIO
        $('#forms').html('');
        // ACTUALIZAR LA TABLA
        debug(data);
        fetchTips(idSession);
      });
    },
    function(err) {
      console.log(err)
    },
    form
  );
}

function updateServiceTip(idSession, idServiceTip)
{   
    loadView(
      'http://www.lmsuy.local/sessions/' + idSession + '/tips/serviceTip/' + idServiceTip, 
      'get', 
      'templates/serviceTip-form.twig',
      function(template, data) {
        var output = template.render({
          serviceTip : data.serviceTip,
          title : 'Editar Service Tip',
          action : 'http://www.lmsuy.local/tips/servicetip/' + idServiceTip + '/update',
          buttonName : 'Editar',
          idSession : idSession
        });

        $('#forms').html(output);
        $('#id').val(data.id);
        $('#idSession').val(data.idSession);
        $('#hour').val(data.hour.date.substr(0,10) + 'T' + data.hour.date.substr(11,5));
        $('#serviceTip').val(data.serviceTip);
      },
      function(err) {
        debug('Fetch Error :-S', err);
      }
    );
}

function serviceTipSubmit(idSession)
{
  var url    = $('#serviceTips-form').attr("action");
  var method = $('#serviceTips-form').attr("method");
  var form = new FormData(document.getElementById('serviceTips-form'));
  makeAPIRequest(
    url,
    method,
    function(response) {
      if (response.status !== 200 && response.status !== 201) {
          errorHandler(response);
          return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        // CERRAR EL FORMULARIO
        $('#forms').html('');
        // ACTUALIZAR LA TABLA
        debug(data);
        fetchTips(idSession);
      });
    },
    function(err) {
      console.log(err)
    },
    form
  );
}

function updateUserSession(idSession, idUserSession)
{   
    loadView(
      'http://www.lmsuy.local/sessions/' + idSession + '/usersSession/' + idUserSession, 
      'get', 
      'templates/userSession-form.twig',
      function(template, data) {
        var output = template.render({
          userSession : data,
          title : 'Editar Usuario',
          action : 'http://www.lmsuy.local/usersSession/' + idUserSession + '/update',
          buttonName : 'Editar',
          idSession : idSession
        });

        $('#forms').html(output);
        $('#id').val(data.id);
        $('#idSession').val(data.idSession);
        $('#points').val(data.points);
        $('#isApproved').val(data.isApproved);
        $('#cashout').val(data.cashout);
        $('#isApproved').val(data.isApproved);
        $('#start').val(data.startTime.date.substr(0,10) + 'T' + data.startTime.date.substr(11,5));
      },
      function(err) {
        debug('Fetch Error :-S', err);
      }
    );
}

function userSessionSubmit(idSession)
{
  var url    = $('#userssession-form').attr("action");
  var method = $('#userssession-form').attr("method");
  var form = new FormData(document.getElementById('userssession-form'));
  debug('url: ' + url); debug('method: ' + method);
  makeAPIRequest(
    url,
    method,
    function(response) {
      if (response.status !== 200 && response.status !== 201) {
          errorHandler(response);
          return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        // CERRAR EL FORMULARIO
        $('#forms').html('');
        // ACTUALIZAR LA TABLA
        fetchUsersSession(idSession);
        debug(data);
      });
    },
    function(err) {
      console.log(err)
    },
    form
  );
}

function addUserSession(idSession)
{   
  // cargo el template de form
  var template = twig({
      href: 'templates/usersession-formAdd.twig',
      async: false,
      // The default is to load asynchronously, and call the load function 
      //   when the template is loaded.
      load: function(tpl) {
        var output = tpl.render({
          idSession : idSession,
          session : null,
          title: 'Agregar Usuario',
          action : 'http://www.lmsuy.local/sessions/' + idSession + '/usersSession',
          buttonName : 'Agregar'
        });
        $('#forms').html(output);
        $('#idSession').val(idSession);
        var loadUsers = function() {
          makeAPIRequest(
          'http://www.lmsuy.local/users',
          'get',
          function(response) {
            if (response.status !== 200) {
                // si falla fetch usuarios hay que reintentarlo con un max retries
                //loadUsers();
                return;
            }

            // Examine the text in the response
            response.json().then(function(data) {
              debug(data);
              // hacer un for
              // agregar los options al select
              data.forEach(function(item) {
                $('#user_id').append('<option value="'+item.id+'">'+item.name+' '+item.lastname+'</option>');
              });
            });
          },
          function(err) {
            console.log(err)
          },
        );
      };
      loadUsers();
    }
  });
}


function updateUser(idUser)
{   
    loadView(
      'http://www.lmsuy.local/users/' + idUser, 
      'get', 
      'templates/user-form.twig',
      function(template, data) {
        var output = template.render({
          user : data,
          title : 'Editar Usuario',
          action : 'http://www.lmsuy.local/users/' + idUser + '/update',
          buttonName : 'Editar',
          idSession : idSession
        });
        $('#forms').html(output);
        $('#id').val(data.id);
        $('#idSession').val(data.idSession);
        $('#comission').val(data.comission);
      },
      function(err) {
        debug('Fetch Error :-S', err);
      }
    );
}

function userSubmit(idSession)
{
  var url    = $('#comissions-form').attr("action");
  var method = $('#comissions-form').attr("method");
  var form = new FormData(document.getElementById('comissions-form'));
  var errorHandler = function(err) {
    console.log(err)
  };
  makeAPIRequest(
    url,
    method,
    function(response) {
      if (response.status !== 200 && response.status !== 201) {
          errorHandler(response);
          return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        // CERRAR EL FORMULARIO
        $('#forms').html('');
        // ACTUALIZAR LA TABLA
        fetchComissions(idSession);
        debug(data);
      });
    },
   errorHandler,
    form
  );
}

function addUser()
{   
  // cargo el template de form
  var template = twig({
      href: 'templates/user-form.twig',
      async: false,
      // The default is to load asynchronously, and call the load function 
      //   when the template is loaded.
      load: function(tpl) {
        var output = tpl.render({
          title: 'Agregar Usuario',
          action : 'http://www.lmsuy.local/users',
          buttonName : 'Agregar'
        });
        $('#forms').html(output);
      }
  });
}

function updateSession(idSession)
{   
    loadView(
      'http://www.lmsuy.local/sessions/' + idSession, 
      'get', 
      'templates/session-form.twig',
      function(template, data) {
        var output = template.render({
          user : data,
          title : 'Editar Sesión',
          action : 'http://www.lmsuy.local/sessions/' + idSession + '/update',
          buttonName : 'Editar',
          idSession : idSession
        });
        $('#forms').html(output);
        $('#id').val(data.id);
        $('#idSession').val(data.idSession);
        $('#comission').val(data.comission);
      },
      function(err) {
        debug('Fetch Error :-S', err);
      }
    );
}

function sessionSubmit()
{
  var url    = $('#sessions-form').attr("action");
  var method = $('#sessions-form').attr("method");
  var form = new FormData(document.getElementById('sessions-form'));
  var errorHandler = function(err) {
    console.log(err)
  };
  makeAPIRequest(
    url,
    method,
    function(response) {
      if (response.status !== 200 && response.status !== 201) {
          errorHandler(response);
          return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        // CERRAR EL FORMULARIO
        $('#forms').html('');
        // ACTUALIZAR LA TABLA
        fetchSessions();
        debug(data);
      });
    },
   errorHandler,
    form
  );
}

function addSession()
{   
  // cargo el template de form
  var template = twig({
      href: 'templates/session-form.twig',
      async: false,
      // The default is to load asynchronously, and call the load function 
      //   when the template is loaded.
      load: function(tpl) {
        var output = tpl.render({
          title: 'Agregar Sesión',
          action : 'http://www.lmsuy.local/sessions',
          buttonName : 'Agregar'
        });
        $('#forms').html(output);
      }
  });
}