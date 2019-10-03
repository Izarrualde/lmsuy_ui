var DEBUG = true;

var CONFIG = {
  base_url : 'http://www.lmsuy.local',
  endpoints : {
    sessions : {
      list : {
        method : 'get',
        path : '/sessions/:idSession'
      },
      listAll : {
        method : 'get',
        path : '/sessions'
      },
      create : {
        method : 'post',
        path : '/sessions'
      },
      update : {
        method : 'post',
        path : '/sessions/:idSession/update'
      },
      delete : {
        method : 'get',
        path : '/sessions/:idSession/remove'
      },
      calculate : {
        method : 'get',
        path : '/sessions/:idSession/calculate'
      }
    },
    users: {
      list : {
        method : 'get',
        path : '/users/:idUser'
      },
      listAll : {
        method : 'get',
        path : '/users'
      },
      create : {
        method : 'post',
        path : '/users'
      },
      update : {
        method : 'post',
        path : '/users/:idUser/update'
      },
      delete : {
        method : 'get',
        path : '/users/:idUser/remove'
      }   
    },
    comissions : {
      list : {
        method : 'get',
        path : '/sessions/:idSession/comissions/:idComission'
      },
      listAll : {
        method : 'get',
        path : '/sessions/:idSession/comissions'
      },
      create : {
        method : 'post',
        path : '/sessions/:idSession/comissions'
      },
      update : {
        method : 'post',
        path : '/comissions/:idComission/update'
      },
      delete : {
        method : 'get',
        path : '/idSession/comissions/:idComission/remove'
      }    
    },
    tips : {
      listDealerTip : {
        method : 'get',
        path : '/sessions/:idSession/tips/dealerTip/:idDealerTip'
      },
      listServiceTip : {
        method : 'get',
        path : '/sessions/:idSession/tips/serviceTip/:idServiceTip'
      },
      listAll : {
        method : 'get',
        path : '/sessions/:idSession/tips'
      },
      create : {
        method : 'post',
        path : '/sessions/:idSession/tips'
      },
      updateDealerTip : {
        method : 'post',
        path : '/tips/dealertip/:idDealerTip/update'
      },
      updateServiceTip : {
        method : 'post',
        path : '/tips/servicetip/:idServiceTip/update'
      },
      deleteDealerTip : {
        method : 'get',
        path : '/tips/dealertip/:idDealerTip/remove'
      },
      deleteServiceTip : {
        method : 'get',
        path : '/tips/servicetip/:idServiceTip/remove'
      } 
    },
    expenses : {
      list : {
        method : 'get',
        path : '/sessions/:idSessions/expenses/:idExpenditure'
      },
      listAll : {
        method : 'get',
        path : '/sessions/:idSessions/expenses'
      },
      create : {
        method : 'post',
        path : '/sessions/:idSession/expenses'
      },
      update : {
        method : 'post',
        path : 'session/:idSession/expenses/:idExpenditure/update'
      },
      delete : {
        method : 'get',
        path : '/session/:idSession/expenses/:idExpenditure/remove'
      } 
    },
    userSession : {
      list : {
        method : 'get',
        path : '/sessions/:idSession/usersSession/:idUserSession'
      },
      listAll : {
        method : 'get',
        path : '/sessions/:idSession/usersSession'
      },
      create : {
        method : 'post',
        path : '/sessions/:idSession/usersSession'
      },
      update : {
        method : 'post',
        path : '/usersSession/:idUserSession/update'
      },
      delete : {
        method : 'get',
        path : '/:idSession/usersSession/:idUserSession/remove'
      },
      close : {
        method : 'get',
        path : '/:idSession/usersSession/:idUserSession/close'
      } 
    },
    buyins : {
      list : {
        method : 'get',
        path : '/sessions/:idSession/buyins/:idBuyin'
      },
      listAll : {
        method : 'get',
        path : '/sessions/:idSessions/buyins'
      },
      create : {
        method : 'post',
        path : '/sessions/:idSession/buyins'
      },
      update : {
        method : 'post',
        path : '/buyins/:idBuyin/update'
      },
      delete : {
        method : 'get',
        path : '/:idSession/buyins/:idBuyin/remove'
      } 
    },
  }
};

function parseRoute(path, args) {
  for (var rep in args) {
    path = path.replace(":"+rep, args[rep]);  
  }
  return CONFIG.base_url + path;
}

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

function getCurrentDate() {
  var currentDate = new Date();
  debug(currentDate.getDate());
  var date = currentDate.getFullYear() +"-"+(((currentDate.getMonth()+1) < 10)?"0":"") + (currentDate.getMonth()+1) +"-"+ ((currentDate.getDate() < 10)?"0":"") + currentDate.getDate();
  var hour = ((currentDate.getHours() < 10) ? "0":"") + currentDate.getHours() + ":" + ((currentDate.getMinutes() < 10) ?"0":"") + currentDate.getMinutes();

  return {
    "date" : date,
    "hour" : hour
  };
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
    debug("en fetchSessions");
    $('.nav-link.active').removeClass('active');
    $('#menuitem-sessions').addClass('active');
    $('#forms').html('');
    
    var url = parseRoute(CONFIG.endpoints.sessions.listAll.path, {});
    var method = CONFIG.endpoints.sessions.listAll.method;

    loadView(
      url, 
      method, 
      'templates/sessions-list.twig',
      function(template, data) {
        var output = template.render({
          sessions : data
        });
        debug(data);
        $('#main').html(output);
      },
      function(err) {
        debug('Fetch Error :-S', err);
      }
    );
}

function deleteSession(idSession)
{   
    var url = parseRoute(CONFIG.endpoints.sessions.delete.path, { 
      "idSession" : idSession
    });
    var method = CONFIG.endpoints.sessions.delete.method;

    /*
    var url = 'http://www.lmsuy.local/sessions/' + idSession + '/remove';
    var method = 'get';
    */
    makeAPIRequest(
      url,
      method,
      function(response) {
        if (response.status !== 204) {
            errorHandler(response);
            return;
        }

        fetchSessions();
      },
        function(err) {
          console.log(err)
        }
      );
}

function calculatePoints(idSession)
{   
    var url = parseRoute(CONFIG.endpoints.sessions.calculate.path, { 
      "idSession" : idSession
    });
    var method = CONFIG.endpoints.sessions.calculate.method;
    makeAPIRequest(
      url,
      method,
      function(response) {
        if (response.status !== 200) {
            errorHandler(response);
            return;
        }

        debug('puntos cargados');
        fetchSessions();
      },
        function(err) {
          console.log(err)
        }
      );
}

function revisionSession(idSession)
{   
    debug('en revision session');
    var url = parseRoute(CONFIG.endpoints.sessions.list.path, {  
      "idSession" : idSession
    });
    debug(url);
    var method = CONFIG.endpoints.sessions.list.method;
    loadView(
      url, 
      method, 
      'templates/revision-session.twig',
      function(template, data) {
        var output = template.render({
          title : 'Revision de sesión',
          action : url,
          idSession : idSession,
          session : data
        });
        debug("data");
        debug(data);
        $('#forms').html(output);
      },
      function(err) {
        debug('Fetch Error :-S', err);
      }
    );
}


function fetchUsers()
{
    $('.nav-link.active').removeClass('active');
    $('#menuitem-users').addClass('active');
    $('#forms').html('');
    var url = parseRoute(CONFIG.endpoints.users.listAll.path, {});
    var method = CONFIG.endpoints.users.listAll.method;

    loadView(
      url, 
      method,
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
    var url = parseRoute(CONFIG.endpoints.users.delete.path, { 
      "idUser" : idUser
    });
    var method = CONFIG.endpoints.users.delete.method;

    // var url = 'http://www.lmsuy.local/users/' + idUser + '/remove';
    // var method = 'get';
    makeAPIRequest(
      url,
      method,
      function(response) {
        if (response.status !== 204) {
            errorHandler(response);
            return;
        }

        fetchUsers();
      },
        function(err) {
          console.log(err)
        }
      );
}

function fetchBuyins(idSession, countSeatedPlayers)
{   
    $('#forms').html('');
    var url = parseRoute(CONFIG.endpoints.buyins.listAll.path, { 
      "idSession" : idSession
    });
    var method = CONFIG.endpoints.buyins.listAll.method;

    loadView(
      url, 
      method, 
      'templates/buyins-list.twig',
      function(template, data) {
        var output = template.render({
          buyins : data,
          idSession: idSession,
          countSeatedPlayers: countSeatedPlayers
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
    var url = parseRoute(CONFIG.endpoints.buyins.delete.path, { 
      "idBuyin" : idBuyin,
      "idSession" : idSession
    });
    var method = CONFIG.endpoints.buyins.delete.method;
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

function fetchComissions(idSession, comissionTotal)
{   
    debug(comissionTotal);
    $('#forms').html('');
    var url = parseRoute(CONFIG.endpoints.comissions.listAll.path, { 
      "idSession" : idSession
    });
    var method = CONFIG.endpoints.comissions.listAll.method;

    loadView(
      url, 
      method, 
      'templates/comissions-list.twig',
      function(template, data) {
        var output = template.render({
          comissions : data,
          idSession: idSession,
          comissionTotal : comissionTotal
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
    var url = parseRoute(CONFIG.endpoints.comissions.delete.path, { 
      "idComission" : idComission,
      "idSession" : idSession
    });
    var method = CONFIG.endpoints.comissions.delete.method;
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
    var url = parseRoute(CONFIG.endpoints.userSession.listAll.path, { 
      "idSession" : idSession
    });
    var method = CONFIG.endpoints.userSession.listAll.method;
    loadView(
      url, 
      method, 
      'templates/userssession-list.twig',
      function(template, data) {
        var output = template.render({
          usersSession : data,
          idSession: idSession
        });
        $('#main').html(output);
        
        /*
        data.forEach(function(item) {
          if ((item.cashin) > 0) {
            $(#item.id).addClass("button-disabled");
          }  
        });
        */
        
      },
      function(err) {
        debug('Fetch Error :-S', err);
      }
    );
}

function deleteUserSession(idSession, idUserSession)
{   
    var url = parseRoute(CONFIG.endpoints.userSession.delete.path, { 
      "idUserSession" : idUserSession,
      "idSession" : idSession
    });

    debug("url"); debug(url);
    var method = CONFIG.endpoints.userSession.delete.method;
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
    var url = parseRoute(CONFIG.endpoints.expenses.listAll.path, { 
      "idSession" : idSession
    });
    var method = CONFIG.endpoints.expenses.listAll.method;
    loadView(
      url, 
      method, 
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
    var url = parseRoute(CONFIG.endpoints.expenses.delete.path, { 
      "idExpenditure" : idExpenditure,
      "idSession" : idSession
    });
    var method = CONFIG.endpoints.expenses.delete.method;
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
    var url = parseRoute(CONFIG.endpoints.tips.listAll.path, {
        "idSession" : idSession
    });
    var method = CONFIG.endpoints.tips.listAll.method;
    loadView(
      url, 
      method, 
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
    var url = parseRoute(CONFIG.endpoints.tips.deleteDealerTip.path, { 
      "idDealerTip" : idDealerTip,
      "idSession" : idSession
    });
    var method = CONFIG.endpoints.tips.deleteDealerTip.method;
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
    var url = parseRoute(CONFIG.endpoints.tips.deleteServiceTip.path, { 
      "idServiceTip" : idServiceTip,
      "idSession" : idSession
    });
    var method = CONFIG.endpoints.tips.deleteServiceTip.method;
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
    var url = parseRoute(CONFIG.endpoints.comissions.list.path, {  
      "idComission" : idComission,
      "idSession" : idSession
    });
    var method = CONFIG.endpoints.comissions.list.method;
    loadView(
      url, 
      method, 
      'templates/comission-form.twig',
      function(template, data) {
        var output = template.render({
          title : 'Editar Comisión',
          action : parseRoute(CONFIG.endpoints.comissions.update.path, { 
                      "idComission" : idComission
                   }),
          buttonName : 'Editar',
          idSession : idSession
        });
        debug(data);
        $('#forms').html(output);
        $('#id').val(data.id);
        $('#idSession').val(data.idSession);
        $('#comission').val(data.comission);
        $('#hour').val(data.hour.date.substr(0,10) + 'T' + data.hour.date.substr(11,5));
        $('#comission').focus();
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
        var now = getCurrentDate();
        var url = parseRoute(CONFIG.endpoints.comissions.create.path, { 
          "idSession" : idSession
        });
        var output = tpl.render({
          idSession : idSession,
          session : null,
          title: 'Agregar comisión',
          action : url,
          buttonName : 'Agregar'
        });
        $('#forms').html(output);
        $('#idSession').val(idSession);
        $('#hour').val(now["date"] + "T" + now["hour"]);
        $('#comission').focus();
      }
  });
}


function updateBuyin(idSession, idBuyin)
{   
    var url = parseRoute(CONFIG.endpoints.buyins.list.path, { 
      "idBuyin" : idBuyin,
      "idSession" : idSession
    });
    var method = CONFIG.endpoints.buyins.list.method;
    loadView(
      url, 
      method, 
      'templates/buyin-form.twig',
      function(template, data) {
        var output = template.render({
          buyin : data,
          title : 'Editar Buyin',
          action : parseRoute(CONFIG.endpoints.buyins.update.path, { 
                      "idBuyin" : idBuyin
                   }),
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
        $('#currency').val(data.currency);
        $('#hour').val(data.hour.date.substr(0,10) + 'T' + data.hour.date.substr(11,5));
        $('#amountCash').focus();
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

        // print ticket
        printTicket(data);

        debug(data);
      });
    },
    function(err) {
      console.log(err)
    },
    form
  );
}

function printTicket(data)
{
  debug("en print data");
  debug(data);
  var template = twig({
      href: 'templates/buyin-ticket.twig',
      async: false,
      // The default is to load asynchronously, and call the load function 
      //   when the template is loaded.
      load: function(template) {
        var output = template.render({
          name: data.user_session.user.name,
          lastname: data.user_session.user.lastname,
          amountCredit: data.amountCredit,
          hour: data.hour.date
        });

        $('#ticket').html(output);
      }
  });

  $('#ticket').removeClass('hide').addClass('show');
  // hidden list of buyins
  $('#main').removeClass('show').addClass('hide');
  $('#breadcrumbs').addClass('hide');
  $('#menu').addClass('hide');
}

function closeTicket()
{
  // hidden list of buyins
  $('#ticket').removeClass('show').addClass('hide');

  $('#main').removeClass('hide').addClass('show');
  $('#breadcrumbs').removeClass('hide');
  $('#menu').removeClass('hide');
}

/*
function suggestedDate(sessionDate) 
{
  var now = getCurrentDate();

  if sessionDate - now["date"] > 24 hs {
    return sessionDate;
  } else {
    return now["date"] + "T" + now["hour"];
  }
}
*/
function addBuyin(button, idSession)
{   
  if ($(button).hasClass("button-disabled")) {
    return;
  }
  // cargo el template de form
  var template = twig({
      href: 'templates/buyin-formAdd.twig',
      async: false,
      // The default is to load asynchronously, and call the load function 
      //   when the template is loaded.
      load: function(tpl) {
        
        var url = parseRoute(CONFIG.endpoints.buyins.create.path, { 
          "idSession" : idSession
        });
        var method = CONFIG.endpoints.buyins.create.method;
        var output = tpl.render({
          idSession : idSession,
          session : null,
          title: 'Agregar Buyin',
          action : url,
          buttonName : 'Agregar'
        });
        $('#forms').html(output);
        $('#idSession').val(idSession);
        // $('#hour').val(now["date"] + "T" + now["hour"]);
        // $('#hour').val(suggestedDate(session.date)); // fetchSession 
        $('#approved').val(1);
        $('#currency').val(1);
        $('#amountCash').focus();
        var url_usersSession = parseRoute(CONFIG.endpoints.userSession.listAll.path, { 
          "idSession" : idSession
        });
        var method_listAll = CONFIG.endpoints.userSession.listAll.method;
        var loadUsers = function() {
          makeAPIRequest(
          url_usersSession,
          method_listAll,
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
                if (item.endTime == null) {
                    $('#idUserSession').append('<option value="'+item.id+'">'+item.user.name+' '+item.user.lastname+'</option>');
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
    var url = parseRoute(CONFIG.endpoints.expenses.list.path, { 
      "idExpenditure" : idExpenditure,
      "idSession" : idSession
    });
    var method = CONFIG.endpoints.expenses.list.method;
    loadView(
      url, 
      method, 
      'templates/expenditure-form.twig',
      function(template, data) {
        var output = template.render({
          expenditure : data,
          title : 'Editar Gasto',
          action : parseRoute(CONFIG.endpoints.expenses.update.path, { 
                      "idSession" : idSession,
                      "idExpenditure" : idExpenditure
                   }),
          buttonName : 'Editar',
          idSession : idSession
        });

        $('#forms').html(output);
        $('#id').val(data.id);
        $('#idSession').val(data.idSession);
        $('#description').val(data.description);
        $('#amount').val(data.amount);
        $('#description').focus();
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
        var url = parseRoute(CONFIG.endpoints.expenses.create.path, { 
          "idSession" : idSession
        });
        var output = tpl.render({
          idSession : idSession,
          session : null,
          title: 'Agregar Gasto',
          action : url,
          buttonName : 'Agregar'
        });
        $('#forms').html(output);
        $('#idSession').val(idSession);
      }
  });
}

function updateDealerTip(idSession, idDealerTip)
{   
    var url = parseRoute(CONFIG.endpoints.tips.listDealerTip.path, { 
      "idDealerTip" : idDealerTip,
      "idSession" : idSession
    });
    var method = CONFIG.endpoints.tips.listDealerTip.method;
    loadView(
      url, 
      method, 
      'templates/dealerTip-form.twig',
      function(template, data) {
        var output = template.render({
          dealerTip : data.dealerTip,
          title : 'Editar Dealer Tip',
          action : parseRoute(CONFIG.endpoints.tips.updateDealerTip.path, { 
                      "idDealerTip" : idDealerTip
                   }),
          buttonName : 'Editar',
          idSession : idSession
        });

        $('#forms').html(output);
        $('#id').val(data.id);
        $('#idSession').val(data.idSession);
        $('#hour').val(data.hour.date.substr(0,10) + 'T' + data.hour.date.substr(11,5));
        $('#dealerTip').val(data.dealerTip);
        $('#dealerTip').focus();
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
    debug(url);
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
        var now = getCurrentDate();
        var url = parseRoute(CONFIG.endpoints.tips.create.path, { 
          "idSession" : idSession
        });
        var output = tpl.render({
          idSession : idSession,
          session : null,
          title: 'Agregar Tips',
          action : url,
          buttonName : 'Agregar'
        });
        $('#forms').html(output);
        $('#idSession').val(idSession);
        $('#hour').val(now["date"] + "T" + now["hour"]);
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
    var url = parseRoute(CONFIG.endpoints.tips.listServiceTip.path, { 
      "idServiceTip" : idServiceTip,
      "idSession" : idSession
    });
    var method = CONFIG.endpoints.tips.listServiceTip.method;
    loadView(
      url, 
      method, 
      'templates/serviceTip-form.twig',
      function(template, data) {
        var output = template.render({
          serviceTip : data.serviceTip,
          title : 'Editar Service Tip',
          action : parseRoute(CONFIG.endpoints.tips.updateServiceTip.path, { 
                      "idServiceTip" : idServiceTip
                   }),
          buttonName : 'Editar',
          idSession : idSession
        });

        $('#forms').html(output);
        $('#id').val(data.id);
        $('#idSession').val(data.idSession);
        $('#hour').val(data.hour.date.substr(0,10) + 'T' + data.hour.date.substr(11,5));
        $('#serviceTip').val(data.serviceTip);
        $('#serviceTip').focus();
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

// /userssession/{{ user.id }}/formclose

function updateUserSession(button, idSession, idUserSession)
{   
    if ($(button).hasClass("button-disabled")) {
      return;
    }

    var url = parseRoute(CONFIG.endpoints.userSession.list.path, { 
      "idUserSession" : idUserSession,
      "idSession" : idSession
    });

    var method = CONFIG.endpoints.userSession.list.method;
    loadView(
      url, 
      method, 
      'templates/usersession-form.twig',
      function(template, data) {
        var output = template.render({
          userSession : data,
          title : 'Editar Usuario',
          action : parseRoute(CONFIG.endpoints.userSession.update.path, { 
                      "idUserSession" : idUserSession
                   }),
          buttonName : 'Editar',
          idSession : idSession
        });

        $('#forms').html(output);
        $('#id').val(data.id);
        $('#idSession').val(data.idSession);
        $('#points').val(data.points);
        $('#isApproved').val(data.isApproved);
        
        // if isset startTime, show 
        $('#start').val(data.startTime.date.substr(0,10) + 'T' + data.startTime.date.substr(11,5));

        if (data.endTime) {
          $('#end').val(data.endTime.date.substr(0,10) + 'T' + data.endTime.date.substr(11,5));
          $('#cashout').val(data.cashout); 
        }

        $('#usersession-form').addClass('active-player');
        
      },
      function(err) {
        debug('Fetch Error :-S', err);
      }
    );
}


function closeUserSession(button, idSession, idUserSession)
{   
    if ($(button).hasClass("button-disabled")) {
      return;
    }

    var url = parseRoute(CONFIG.endpoints.userSession.list.path, { 
      "idUserSession" : idUserSession
    });
    var method = CONFIG.endpoints.userSession.close.method;
    loadView(
      url, 
      method, 
      'templates/usersession-form.twig',
      function(template, data) {
        debug(data);
        var now = getCurrentDate();
        var output = template.render({
          userSession : data,
          title : 'Cerrar sessión de usuario',
          action : parseRoute(CONFIG.endpoints.userSession.close.path, { 
                      "idSession" : idSession,
                      "idUserSession" : idUserSession
                   }),
          buttonName : 'Enviar',
          idSession : idSession
        });

        $('#forms').html(output);
        $('#id').val(data.id);
        $('#idUser').val(data.user.id);
        $('#idSession').val(data.idSession);
        $('#points').val(data.points);
        $('#isApproved').val(data.isApproved);
        $('#cashout').val(data.cashout);
        $('#start').val(data.startTime.date.substr(0,10) + 'T' + data.startTime.date.substr(11,5));
        $('#end').val(now["date"] + "T" + now["hour"]);
        $('#cashout').focus();
        // $('#usersession-form').addClass('active-player');

        
      },
      function(err) {
        debug('Fetch Error :-S', err);
      }
    );

}

function userSessionSubmit(idSession)
{
  var url    = $('#usersession-form').attr("action");
  var method = $('#usersession-form').attr("method");
  var form = new FormData(document.getElementById('usersession-form'));

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
        var url = parseRoute(CONFIG.endpoints.userSession.create.path, { 
          "idSession" : idSession
        });
        var output = tpl.render({
          idSession : idSession,
          session : null,
          title: 'Agregar Usuario',
          action : url,
          buttonName : 'Agregar'
        });
        $('#forms').html(output);
        $('#idSession').val(idSession);
        var url_users = parseRoute(CONFIG.endpoints.users.listAll.path, { 
          "idSession" : idSession
        });
        var method_listAll = CONFIG.endpoints.users.listAll.method;
        var loadUsers = function() {
          makeAPIRequest(
          url_users,
          method_listAll,
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
    var url = parseRoute(CONFIG.endpoints.users.list.path, { 
      "idUser" : idUser
    });
    var method = CONFIG.endpoints.users.list.method;
    loadView(
      url, 
      method, 
      'templates/user-form.twig',
      function(template, data) {
        var output = template.render({
          user : data,
          title : 'Editar Usuario',
          action : parseRoute(CONFIG.endpoints.users.update.path, { 
                      "idUser" : idUser
                   }),
          buttonName : 'Editar'
        });

        debug(url);
        $('#forms').html(output);
        $('#id').val(data.id);
        $('#lastname').val(data.lastname);
        $('#firstname').val(data.name);
        $('#username').val(data.username);
        $('#mobile').val(data.mobile);
        $('#email').val(data.email);
        $('#multiplier').val(data.multiplier);
        $('#password').val(data.password);
        $('#active').val(data.active);
        $('#sessions').val(data.sessions);
        $('#points').val(data.points);
        $('#results').val(data.results);
        $('#cashin').val(data.cashin);
        $('#hours').val(data.hours);
        $('#active').val(data.isActive);

      },
      function(err) {
        debug('Fetch Error :-S', err);
      }
    );
}

function userSubmit(idSession)
{
  var url    = $('#users-form').attr("action");
  var method = $('#users-form').attr("method");
  var form = new FormData(document.getElementById('users-form'));
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
        fetchUsers();
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
        var url = parseRoute(CONFIG.endpoints.users.create.path, {});
        debug(url);
        var output = tpl.render({
          title: 'Agregar Usuario',
          action : url,
          buttonName : 'Agregar'
        });
        $('#forms').html(output);
        $('#password').val(1234);
        $('#active').val(1);
        $('#sessions').val(0);
        $('#points').val(0);
        $('#results').val(0);
        $('#cashin').val(0);
        $('#hours').val(0);
      }
  });
}

function updateSession(idSession)
{   
    var url = parseRoute(CONFIG.endpoints.sessions.list.path, { 
      "idSession" : idSession
    });
    var method = CONFIG.endpoints.sessions.list.method;
    loadView(
      url, 
      method, 
      'templates/session-form.twig',
      function(template, data) {
        var output = template.render({
          user : data,
          title : 'Editar Sesión',
          action : parseRoute(CONFIG.endpoints.sessions.update.path, { 
                      "idSession" : idSession
                   }),
          buttonName : 'Editar',
          idSession : idSession
        });
        $('#forms').html(output);
        $('#id').val(data.id);
        $('#idSession').val(data.idSession);
        $('#description').val(data.description);
        $('#title').val(data.title);
        $('#rakebackClass').val(data.rakebackClass);
        $('#date').val(data.created_at.date.substr(0,10));
        $('#start_at').val(data.startTime.date.substr(0,10) + 'T' + data.startTime.date.substr(11,5));
        $('#real_start_at').val(data.startTimeReal.date.substr(0,10) + 'T' + data.startTimeReal.date.substr(11,5));
        $('#end_at').val(data.endTime.date.substr(0,10) + 'T' + data.endTime.date.substr(11,5));
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
  debug(method);
  debug(url);
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
        var now = getCurrentDate();
        var url = parseRoute(CONFIG.endpoints.sessions.create.path, {});
        debug("url"); debug(url);

        var output = tpl.render({
          title: 'Agregar Sesión',
          action : url,
          buttonName : 'Agregar'
        });
        $('#forms').html(output);
        $('#date').val(now["date"]);
        $('#start_at').val(now["date"] + "T" + now["hour"]);
      }
  });
}

function chargeAmount(id, amount)
{
  $('#'+id).val(amount);
}

