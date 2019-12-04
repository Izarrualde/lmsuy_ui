const DEBUG = true;

const CONFIG = {
    base_url: 'http://www.lms-api.local',
    endpoints: {
        sessions: {
            fetch: {
                method: 'get',
                path: '/sessions/:idSession'
            },
            fetchAll: {
                method: 'get',
                path: '/sessions'
            },
            create: {
                method: 'post',
                path: '/sessions'
            },
            update: {
                method: 'put',
                path: '/sessions/:idSession'
            },
            delete: {
                method: 'delete',
                path: '/sessions/:idSession'
            },
            calculatePoints: {
                method: 'patch',
                path: '/sessions/:idSession/calculate'
            },
            playSession: {
                method: 'get',
                path: '/sessions/:idSession/play'
            },
            stopSession: {
                method: 'get',
                path: '/sessions/:idSession/stop'
            }
        },
        rakebackAlgorithms: {
            fetchAll: {
                method: 'get',
                path: '/rakeback-algorithms'
            }
        },
        users: {
            fetch: {
                method: 'get',
                path: '/users/:idUser'
            },
            fetchAll: {
                method: 'get',
                path: '/users'
            },
            create: {
                method: 'post',
                path: '/users'
            },
            update: {
                method: 'put',
                path: '/users/:idUser'
            },
            delete: {
                method: 'delete',
                path: '/users/:idUser'
            }
        },
        commissions: {
            fetch: {
                method: 'get',
                path: '/sessions/:idSession/commissions/:idCommission'
            },
            fetchAll: {
                method: 'get',
                path: '/sessions/:idSession/commissions'
            },
            create: {
                method: 'post',
                path: '/sessions/:idSession/commissions'
            },
            update: {
                method: 'put',
                path: '/sessions/:idSession/commissions/:idCommission'
            },
            delete: {
                method: 'delete',
                path: '/sessions/:idSession/commissions/:idCommission'
            }
        },
        dealerTips: {
            fetchDealerTip: {
                method: 'get',
                path: '/sessions/:idSession/dealer-tips/:idDealerTip'
            },
            fetchAll: {
                method: 'get',
                path: '/sessions/:idSession/dealer-tips'
            },
            create: {
                method: 'post',
                path: '/sessions/:idSession/dealer-tips'
            },
            updateDealerTip: {
                method: 'put',
                path: '/sessions/:idSession/dealer-tips/:idDealerTip'
            },
            deleteDealerTip: {
                method: 'delete',
                path: '/sessions/:idSession/dealer-tips/:idDealerTip'
            }
        },
        serviceTips: {
            fetchServiceTip: {
                method: 'get',
                path: '/sessions/:idSession/service-tips/:idServiceTip'
            },
            fetchAll: {
                method: 'get',
                path: '/sessions/:idSession/service-tips'
            },
            create: {
                method: 'post',
                path: '/sessions/:idSession/service-tips'
            },
            updateServiceTip: {
                method: 'put',
                path: '/sessions/:idSession/service-tips/:idServiceTip'
            },
            deleteServiceTip: {
                method: 'delete',
                path: '/sessions/:idSession/service-tips/:idServiceTip'
            }
        },
        expenses: {
            fetch: {
                method: 'get',
                path: '/sessions/:idSessions/expenses/:idExpenditure'
            },
            fetchAll: {
                method: 'get',
                path: '/sessions/:idSessions/expenses'
            },
            create: {
                method: 'post',
                path: '/sessions/:idSession/expenses'
            },
            update: {
                method: 'put',
                path: '/sessions/:idSession/expenses/:idExpenditure'
            },
            delete: {
                method: 'delete',
                path: '/sessions/:idSession/expenses/:idExpenditure'
            }
        },
        userSession: {
            fetch: {
                method: 'get',
                path: '/sessions/:idSession/users-session/:idUserSession'
            },
            fetchAll: {
                method: 'get',
                path: '/sessions/:idSession/users-session'
            },
            create: {
                method: 'post',
                path: '/sessions/:idSession/users-session'
            },
            update: {
                method: 'put',
                path: '/sessions/:idSession/users-session/:idUserSession'
            },
            delete: {
                method: 'delete',
                path: '/sessions/:idSession/users-session/:idUserSession'
            },
            closeUserSession: {
                method: 'post',
                path: '/users-session/:idUserSession/close'
            }
        },
        buyins: {
            fetch: {
                method: 'get',
                path: '/sessions/:idSession/buyins/:idBuyin'
            },
            fetchAll: {
                method: 'get',
                path: '/sessions/:idSessions/buyins'
            },
            create: {
                method: 'post',
                path: '/sessions/:idSession/buyins'
            },
            update: {
                method: 'put',
                path: '/sessions/:idSession/buyins/:idBuyin'
            },
            delete: {
                method: 'delete',
                path: '/sessions/:idSession/buyins/:idBuyin'
            }
        },
    }
};

function parseRoute(path, args) {
    for (var rep in args) {
        path = path.replace(":" + rep, args[rep]);
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
    var date = currentDate.getFullYear() + "-" + (((currentDate.getMonth() + 1) < 10) ? "0" : "") + (currentDate.getMonth() + 1) + "-" + ((currentDate.getDate() < 10) ? "0" : "") + currentDate.getDate();
    var hour = ((currentDate.getHours() < 10) ? "0" : "") + currentDate.getHours() + ":" + ((currentDate.getMinutes() < 10) ? "0" : "") + currentDate.getMinutes();

    return {
        "date": date,
        "hour": hour
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
        .then(function (response) {
            hideLoader();
            successCallback(response);
        })
        .catch(function (err) {
            hideLoader();
            errorCallback(err);
        });
}

function loadView(url, method, templatePath, renderer, errorHandler) {
    makeAPIRequest(
        url,
        method,
        function (response) {
            if (response.status !== 200) {
                errorHandler(response);
                return;
            }

            // Examine the text in the response
            response.json().then(function (data) {
                var template = twig({
                    href: templatePath,
                    async: false,
                    // The default is to load asynchronously, and call the load function
                    //   when the template is loaded.
                    load: function (template) {
                        renderer(template, data);
                    }
                });
            }).catch(errorHandler);
        },
        errorHandler
    );
}

function fetchSessions() {
    $('.nav-link.active').removeClass('active');
    $('#menuitem-sessions').addClass('active');
    $('#forms').html('');

    var url = parseRoute(CONFIG.endpoints.sessions.fetchAll.path, {});
    var method = CONFIG.endpoints.sessions.fetchAll.method;

    loadView(
        url,
        method,
        'templates/sessions-list.twig',
        function (template, data) {
            var output = template.render({
                sessions: data._embedded.sessions
            });
            debug(data);
            $('#main').html(output);
        },
        function (err) {
            debug('Fetch Error :-S', err);
        }
    );
}

function deleteSession(idSession) {
    var url = parseRoute(CONFIG.endpoints.sessions.delete.path, {
        "idSession": idSession
    });
    var method = CONFIG.endpoints.sessions.delete.method;

    makeAPIRequest(
        url,
        method,
        function (response) {
            if (response.status !== 204) {
                errorHandler(response);
                return;
            }

            fetchSessions();
        },
        function (err) {
            console.log(err)
        }
    );
}

function calculatePoints(idSession) {
    var url = parseRoute(CONFIG.endpoints.sessions.calculatePoints.path, {
        "idSession": idSession
    });
    var method = CONFIG.endpoints.sessions.calculatePoints.method;
    debug('en calculate points');
    debug(url);
    debug(method);

    makeAPIRequest(
        url,
        method,
        function (response) {
            if (response.status !== 200) {
                errorHandler(response);
                return;
            }

            debug('puntos cargados');
            fetchSessions();
        },
        function (err) {
            console.log(err)
        }
    );
}

function revisionSession(idSession) {
    debug('en revision session');
    var url = parseRoute(CONFIG.endpoints.sessions.fetch.path, {
        "idSession": idSession
    });
    debug(url);
    var method = CONFIG.endpoints.sessions.fetch.method;
    loadView(
        url,
        method,
        'templates/revision-session.twig',
        function (template, data) {
            var output = template.render({
                title: 'Revision de sesión',
                action: url,
                idSession: idSession,
                session: data
            });
            debug(data);
            $('#forms').html(output);
        },
        function (err) {
            debug('Fetch Error :-S', err);
        }
    );
}

function fetchUsers() {
    debug('en fetch users');
    $('.nav-link.active').removeClass('active');
    $('#menuitem-users').addClass('active');
    $('#forms').html('');
    var url = parseRoute(CONFIG.endpoints.users.fetchAll.path, {});
    var method = CONFIG.endpoints.users.fetchAll.method;

    loadView(
        url,
        method,
        'templates/users-list.twig',
        function (template, data) {
            var output = template.render({
                users: data._embedded.users
            });
            $('#main').html(output);
        },
        function (err) {
            debug('Fetch Error :-S', err);
        }
    );
}

function deleteUser(idUser) {
    var url = parseRoute(CONFIG.endpoints.users.delete.path, {
        "idUser": idUser
    });
    var method = CONFIG.endpoints.users.delete.method;
    makeAPIRequest(
        url,
        method,
        function (response) {
            if (response.status !== 204) {
                errorHandler(response);
                return;
            }
            fetchUsers();
        },
        function (err) {
            console.log(err)
        }
    );
}

function fetchBuyins(idSession, countSeatedPlayers, sessionDate) {
    $('#forms').html('');
    var url = parseRoute(CONFIG.endpoints.buyins.fetchAll.path, {
        "idSession": idSession
    });
    var method = CONFIG.endpoints.buyins.fetchAll.method;

    loadView(
        url,
        method,
        'templates/buyins-list.twig',
        function (template, data) {
            var output = template.render({
                buyins: data._embedded.buyins,
                idSession: idSession,
                sessionDate: sessionDate,
                countSeatedPlayers: countSeatedPlayers
            });
            debug(data._embedded.buyins);
            $('#main').html(output);
        },
        function (err) {
            debug('Fetch Error :-S', err);
        }
    );
}

function deleteBuyin(idSession, idBuyin) {
    var url = parseRoute(CONFIG.endpoints.buyins.delete.path, {
        "idBuyin": idBuyin,
        "idSession": idSession
    });
    var method = CONFIG.endpoints.buyins.delete.method;
    makeAPIRequest(
        url,
        method,
        function (response) {
            if (response.status !== 204) {
                errorHandler(response);
                return;
            }

            fetchBuyins(idSession);
        },
        function (err) {
            console.log(err)
        }
    );
}

function fetchCommissions(idSession, commissionTotal, sessionDate) {
    $('#forms').html('');
    var url = parseRoute(CONFIG.endpoints.commissions.fetchAll.path, {
        "idSession": idSession
    });
    var method = CONFIG.endpoints.commissions.fetchAll.method;

    loadView(
        url,
        method,
        'templates/commissions-list.twig',
        function (template, data) {
            var output = template.render({
                commissions: data._embedded.commissions,
                sessionDate: sessionDate,
                idSession: idSession,
                commissionTotal: commissionTotal
            });

            debug(data);
            $('#main').html(output);
        },
        function (err) {
            debug('Fetch Error :-S', err);
        }
    );
}

function deleteCommission(idSession, idCommission) {
    var url = parseRoute(CONFIG.endpoints.commissions.delete.path, {
        "idCommission": idCommission,
        "idSession": idSession
    });
    var method = CONFIG.endpoints.commissions.delete.method;
    makeAPIRequest(
        url,
        method,
        function (response) {
            if (response.status !== 204) {
                errorHandler(response);
                return;
            }

            fetchCommissions(idSession);
            debug(data);
        },
        function (err) {
            console.log(err)
        }
    );
}

function fetchUsersSession(idSession) {
    $('#forms').html('');
    var url = parseRoute(CONFIG.endpoints.userSession.fetchAll.path, {
        "idSession": idSession
    });
    var method = CONFIG.endpoints.userSession.fetchAll.method;
    debug(url);
    debug(method);

    loadView(
        url,
        method,
        'templates/userssession-list.twig',
        function (template, data) {
            debug(data); debug('del usersession');
            var output = template.render({
                usersSession: data._embedded.users_session,
                idSession: idSession
            });
            $('#main').html(output);

            debug(data)
            /*data.forEach(function(item) {
              if ((item.cashin) > 0) {
                $('#item.id').addClass("button-disabled");
              }
            });*/
        },
        function (err) {
            debug('Fetch Error :-S', err);
        }
    );
}

function deleteUserSession(idSession, idUserSession) {
    var url = parseRoute(CONFIG.endpoints.userSession.delete.path, {
        "idUserSession": idUserSession,
        "idSession": idSession
    });

    debug("url");
    debug(url);
    var method = CONFIG.endpoints.userSession.delete.method;
    makeAPIRequest(
        url,
        method,
        function (response) {
            if (response.status !== 204) {
                errorHandler(response);
                return;
            }

            fetchUsersSession(idSession);
        },
        function (err) {
            console.log(err)
        }
    );
}

function fetchExpenses(idSession) {
    $('#forms').html('');
    var url = parseRoute(CONFIG.endpoints.expenses.fetchAll.path, {
        "idSession": idSession
    });
    var method = CONFIG.endpoints.expenses.fetchAll.method;
    loadView(
        url,
        method,
        'templates/expenses-list.twig',
        function (template, data) {
            var output = template.render({
                expenses: data._embedded.expenses,
                idSession: idSession
            });
            $('#main').html(output);
        },
        function (err) {
            debug('Fetch Error :-S', err);
        }
    );
}

function deleteExpenditure(idSession, idExpenditure) {
    var url = parseRoute(CONFIG.endpoints.expenses.delete.path, {
        "idExpenditure": idExpenditure,
        "idSession": idSession
    });
    var method = CONFIG.endpoints.expenses.delete.method;
    makeAPIRequest(
        url,
        method,
        function (response) {
            if (response.status !== 204) {
                errorHandler(response);
                return;
            }

            fetchExpenses(idSession);
        },
        function (err) {
            console.log(err)
        }
    );
}

async function fetchServiceTips(template, dataDealerTips, sessionDate, idSession) {
makeAPIRequest(
    parseRoute(CONFIG.endpoints.serviceTips.fetchAll.path, {
        "idSession": idSession
    }),
    CONFIG.endpoints.serviceTips.fetchAll.method,
    async function (response) {

        // Examine the text in the response
        const service = await response.json();
        var output = template.render(
            {
                dealerTips: dataDealerTips._embedded.dealer_tips,
                serviceTips: service._embedded.service_tips,
                sessionDate: sessionDate,
                idSession: idSession
            }
        );

        $('#main').html(output);
    },
    function (err) {
        console.log(err)
    },
)}

function fetchDealerTips(idSession, sessionDate) {
    $('#forms').html('');
    var url = parseRoute(CONFIG.endpoints.dealerTips.fetchAll.path, {
        "idSession": idSession
    });
    var method = CONFIG.endpoints.dealerTips.fetchAll.method;

    loadView(
        url,
        method,
        'templates/tips-list.twig',
        function (template, data) {
            let serviceTips;
            fetchServiceTips(template, data, sessionDate, idSession).then(r => serviceTips);
        },
        function (err) {
            debug('Fetch Error :-S', err);
        }
    );
}

function deleteDealerTip(idSession, idDealerTip) {
    var url = parseRoute(CONFIG.endpoints.dealerTips.deleteDealerTip.path, {
        "idDealerTip": idDealerTip,
        "idSession": idSession
    });
    var method = CONFIG.endpoints.dealerTips.deleteDealerTip.method;
    makeAPIRequest(
        url,
        method,
        function (response) {
            if (response.status !== 204) {
                errorHandler(response);
                return;
            }
            fetchDealerTips(idSession);
        },
        function (err) {
            console.log(err)
        }
    );
}

function deleteServiceTip(idSession, idServiceTip) {
    var url = parseRoute(CONFIG.endpoints.serviceTips.deleteServiceTip.path, {
        "idServiceTip": idServiceTip,
        "idSession": idSession
    });
    var method = CONFIG.endpoints.serviceTips.deleteServiceTip.method;
    makeAPIRequest(
        url,
        method,
        function (response) {
            if (response.status !== 204) {
                errorHandler(response);
                return;
            }

            fetchDealerTips(idSession);
        },
        function (err) {
            console.log(err)
        }
    );
}

function suggestedDate(sessionDate) {
    var now = getCurrentDate();
    var now_date = moment(now.date);
    var session_date = moment(sessionDate);

    if (now_date.diff(session_date, 'days') > 2) {
        return sessionDate.substring(0, 10) + "T" + sessionDate.substring(11, 16);
    }

    return now["date"] + "T" + now["hour"];
}

function updateCommission(idSession, idCommission) {
    var url = parseRoute(CONFIG.endpoints.commissions.fetch.path, {
        "idCommission": idCommission,
        "idSession": idSession
    });
    debug(url);
    debug('session id');
    debug(idSession);
    var method = CONFIG.endpoints.commissions.fetch.method;
    loadView(
        url,
        method,
        'templates/commission-form.twig',
        function (template, data) {
            var output = template.render({
                title: 'Editar Comisión',
                action: parseRoute(CONFIG.endpoints.commissions.update.path, {
                    "idCommission": idCommission,
                    "idSession": idSession
                }),
                method: CONFIG.endpoints.commissions.update.method,
                buttonName: 'Editar',
                idSession: idSession
            });
            debug(data);
            $('#forms').html(output);
            $('#id').val(data.id);
            $('#idSession').val(data.idSession);
            $('#commission').val(data.commission);
            $('#hour').val(data.hour.date.substr(0, 10) + 'T' + data.hour.date.substr(11, 5));
            $('#commission').focus();
        },
        function (err) {
            debug('Fetch Error :-S', err);
        }
    );
}

function commissionSubmit(idSession) {
    var url = $('#commissions-form').attr("action");
    var method = $('#commissions-form').attr("method");
    var form = new FormData(document.getElementById('commissions-form'));
    var errorHandler = function (err) {
        console.log(err)
    };

    makeAPIRequest(
        url,
        method,
        function (response) {
            if (response.status !== 200 && response.status !== 201) {
                errorHandler(response);
                return;
            }

            // Examine the text in the response
            response.json().then(function (data) {
                // CERRAR EL FORMULARIO
                $('#forms').html('');
                // ACTUALIZAR LA TABLA
                fetchCommissions(idSession);
                debug(data);
            });
        },
        errorHandler,
        form
    );
}

function addCommission(idSession, sessionDate) {
    var template = twig({
        href: 'templates/commission-form.twig',
        async: false,
        // The default is to load asynchronously, and call the load function
        //   when the template is loaded.
        load: function (tpl) {
            var now = getCurrentDate();
            var url = parseRoute(CONFIG.endpoints.commissions.create.path, {
                "idSession": idSession
            });
            var method =  CONFIG.endpoints.commissions.create.method;
            var output = tpl.render({
                idSession: idSession,
                sessionDate: sessionDate,
                session: null,
                title: 'Agregar comisión',
                action: url,
                method: method,
                buttonName: 'Agregar'
            });
            $('#forms').html(output);
            $('#idSession').val(idSession);
            $('#hour').val(suggestedDate(sessionDate));
            $('#commission').focus();
        }
    });
}


function updateBuyin(idSession, idBuyin) {
    var url = parseRoute(CONFIG.endpoints.buyins.fetch.path, {
        "idBuyin": idBuyin,
        "idSession": idSession
    });
    var method = CONFIG.endpoints.buyins.fetch.method;
    loadView(
        url,
        method,
        'templates/buyin-form.twig',
        function (template, data) {
            var output = template.render({
                buyin: data,
                title: 'Editar Buyin',
                action: parseRoute(CONFIG.endpoints.buyins.update.path, {
                    "idBuyin": idBuyin
                }),
                buttonName: 'Editar',
                idSession: idSession
            });

            $('#forms').html(output);
            $('#id').val(data.id);
            $('#idSession').val(data.idSession);
            $('#idUserSession').val(data._embedded.userSession.id);
            $('#amountCash').val(data.amountCash);
            $('#amountCredit').val(data.amountCredit);
            $('#approved').val(data.isApproved);
            $('#currency').val(data.currency);
            $('#hour').val(data.hour.date.substr(0, 10) + 'T' + data.hour.date.substr(11, 5));
            $('#amountCash').focus();
        },
        function (err) {
            debug('Fetch Error :-S', err);
        }
    );
}

function buyinSubmit(idSession) {
    var url = $('#buyins-form').attr("action");
    var method = $('#buyins-form').attr("method");
    var form = new FormData(document.getElementById('buyins-form'));
    makeAPIRequest(
        url,
        method,
        function (response) {
            if (response.status !== 200 && response.status !== 201) {
                errorHandler(response);
                return;
            }

            // Examine the text in the response
            response.json().then(function (data) {
                // CERRAR EL FORMULARIO
                $('#forms').html('');
                // ACTUALIZAR LA TABLA
                fetchBuyins(idSession);

                // print ticket
                debug(data);
                printTicket(data);

                debug(data);
            });
        },
        function (err) {
            console.log(err)
        },
        form
    );
}

function printTicket(data) {
    debug(data);
    var template = twig({
        href: 'templates/buyin-ticket.twig',
        async: false,
        // The default is to load asynchronously, and call the load function
        //   when the template is loaded.
        load: function (template) {
            var output = template.render({
                name: data._embedded.userSession._embedded.user.name,
                lastname: data._embedded.userSession._embedded.user.lastname,
                amountCredit: data.amountCredit,
                hour: data.hour.date.substr(11, 5)
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

function closeTicket() {
    // hidden list of buyins
    $('#ticket').removeClass('show').addClass('hide');

    $('#main').removeClass('hide').addClass('show');
    $('#breadcrumbs').removeClass('hide');
    $('#menu').removeClass('hide');
}


function addBuyin(button, idSession, sessionDate) {
    debug(sessionDate);
    if ($(button).hasClass("button-disabled")) {
        return;
    }

    var template = twig({
        href: 'templates/buyin-formAdd.twig',
        async: false,
        // The default is to load asynchronously, and call the load function
        //   when the template is loaded.
        load: function (tpl) {

            var url = parseRoute(CONFIG.endpoints.buyins.create.path, {
                "idSession": idSession
            });
            var method = CONFIG.endpoints.buyins.create.method;
            var output = tpl.render({
                idSession: idSession,
                sessionDate: sessionDate,
                session: null,
                title: 'Agregar Buyin',
                action: url,
                buttonName: 'Agregar'
            });
            $('#forms').html(output);
            $('#idSession').val(idSession);
            // $('#hour').val(now["date"] + "T" + now["hour"]);
            $('#hour').val(suggestedDate(sessionDate));
            $('#approved').val(1);
            $('#currency').val(1);
            $('#amountCash').focus();
            var url_usersSession = parseRoute(CONFIG.endpoints.userSession.fetchAll.path, {
                "idSession": idSession
            });
            var method_fetchAll = CONFIG.endpoints.userSession.fetchAll.method;
            var loadUsers = function () {
                makeAPIRequest(
                    url_usersSession,
                    method_fetchAll,
                    function (response) {
                        if (response.status !== 200) {
                            // si falla fetch usuarios hay que reintentarlo con un max retries
                            //loadUsers();
                            return;
                        }

                        // Examine the text in the response
                        response.json().then(function (data) {
                            data._embedded.users_session.forEach(function (item) {
                                debug(item);
                                if (item.endTime == null) {
                                    $('#idUserSession').append('<option value="' + item.id + '">' + item._embedded.user.name + ' ' + item._embedded.user.lastname + '</option>');
                                }
                            });
                        });
                    },
                    function (err) {
                        console.log(err)
                    },
                );
            };
            loadUsers();
        }
    });
}

function updateExpenditure(idSession, idExpenditure) {
    var url = parseRoute(CONFIG.endpoints.expenses.fetch.path, {
        "idExpenditure": idExpenditure,
        "idSession": idSession
    });
    var method = CONFIG.endpoints.expenses.fetch.method;
    loadView(
        url,
        method,
        'templates/expenditure-form.twig',
        function (template, data) {
            var output = template.render({
                expenditure: data,
                title: 'Editar Gasto',
                action: parseRoute(CONFIG.endpoints.expenses.update.path, {
                    "idSession": idSession,
                    "idExpenditure": idExpenditure
                }),
                method: CONFIG.endpoints.expenses.update.method,
                buttonName: 'Editar',
                idSession: idSession
            });

            $('#forms').html(output);
            $('#id').val(data.id);
            $('#idSession').val(data.idSession);
            $('#description').val(data.description);
            $('#amount').val(data.amount);
            $('#description').focus();
        },
        function (err) {
            debug('Fetch Error :-S', err);
        }
    );
}

function expenditureSubmit(idSession) {
    var url = $('#expenses-form').attr("action");
    var method = $('#expenses-form').attr("method");
    var form = new FormData(document.getElementById('expenses-form'));
    makeAPIRequest(
        url,
        method,
        function (response) {
            if (response.status !== 200 && response.status !== 201) {
                errorHandler(response);
                return;
            }

            // Examine the text in the response
            response.json().then(function (data) {
                // CERRAR EL FORMULARIO
                $('#forms').html('');
                // ACTUALIZAR LA TABLA
                fetchExpenses(idSession);
            });
        },
        function (err) {
            console.log(err)
        },
        form
    );
}

function addExpenditure(idSession) {
    var template = twig({
        href: 'templates/expenditure-form.twig',
        async: false,
        // The default is to load asynchronously, and call the load function
        //   when the template is loaded.
        load: function (tpl) {
            var url = parseRoute(CONFIG.endpoints.expenses.create.path, {
                "idSession": idSession
            });
            var method = CONFIG.endpoints.expenses.create.method;
            var output = tpl.render({
                idSession: idSession,
                session: null,
                title: 'Agregar Gasto',
                action: url,
                method: method,
                buttonName: 'Agregar'
            });
            $('#forms').html(output);
            $('#idSession').val(idSession);
        }
    });
}

function updateDealerTip(idSession, idDealerTip) {
    var url = parseRoute(CONFIG.endpoints.dealerTips.fetchDealerTip.path, {
        "idDealerTip": idDealerTip,
        "idSession": idSession
    });
    var method = CONFIG.endpoints.dealerTips.fetchDealerTip.method;

    loadView(
        url,
        method,
        'templates/dealerTip-form.twig',
        function (template, data) {
            var output = template.render({
                dealerTip: data.dealerTip,
                title: 'Editar Dealer Tip',
                onSubmit: 'tipSubmit',
                action: parseRoute(CONFIG.endpoints.dealerTips.updateDealerTip.path, {
                    "idDealerTip": idDealerTip,
                    "idSession": idSession
                }),
                method: CONFIG.endpoints.dealerTips.updateDealerTip.method,
                buttonName: 'Editar',
                idSession: idSession
            });

            $('#forms').html(output);
            $('#id').val(data.id);
            $('#idSession').val(idSession);
            $('#hour').val(data.hour.date.substr(0, 10) + 'T' + data.hour.date.substr(11, 5));
            $('#dealerTip').val(data.dealerTip);
            $('#dealerTip').focus();
        },
        function (err) {
            debug('Fetch Error :-S', err);
        }
    );
}

function updateServiceTip(idSession, idServiceTip) {
    var url = parseRoute(CONFIG.endpoints.serviceTips.fetchServiceTip.path, {
        "idServiceTip": idServiceTip,
        "idSession": idSession
    });
    var method = CONFIG.endpoints.serviceTips.fetchServiceTip.method;

    loadView(
        url,
        method,
        'templates/serviceTip-form.twig',
        function (template, data) {
            var output = template.render({
                serviceTip: data.serviceTip,
                title: 'Editar Service Tip',
                onSubmit: 'tipSubmit',
                action: parseRoute(CONFIG.endpoints.serviceTips.updateServiceTip.path, {
                    "idServiceTip": idServiceTip,
                    "idSession": idSession
                }),
                method: CONFIG.endpoints.serviceTips.updateServiceTip.method,
                buttonName: 'Editar',
                idSession: idSession
            });

            $('#forms').html(output);
            $('#id').val(data.id);
            $('#idSession').val(idSession);
            $('#hour').val(data.hour.date.substr(0, 10) + 'T' + data.hour.date.substr(11, 5));
            $('#serviceTip').val(data.serviceTip);
            $('#serviceTip').focus();
        },
        function (err) {
            debug('Fetch Error :-S', err);
        }
    );
}

function serviceTipSubmit(idSession, form, successCallback, errorCallback) {
    var url = parseRoute(CONFIG.endpoints.serviceTips.create.path, {
        "idSession": idSession
    });
    var method = CONFIG.endpoints.serviceTips.create.method;

    makeAPIRequest(
        url,
        method,
        function (response) {
            if (response.status !== 200 && response.status !== 201) {
                errorHandler(response);
                return;
            }

            if(successCallback){
                successCallback(response);
            }
        },
        errorCallback,
        form
    );
}

function dealerTipSubmit(idSession) {
    var url = $('#tips-form').attr("action");
    var method = $('#tips-form').attr("method");

    var form = new FormData(document.getElementById('tips-form'));
    var errorHandler = function (err) {
        console.log(err)
    };

    makeAPIRequest(
        url,
        method,
        function (response) {
            if (response.status !== 200 && response.status !== 201) {
                errorHandler(response);
                return;
            }

            serviceTipSubmit(idSession, form, response, errorHandler);
            // Examine the text in the response
            response.json().then(function (data) {
                // CERRAR EL FORMULARIO
                $('#forms').html('');
                // ACTUALIZAR LA TABLA
                fetchDealerTips(idSession);
                debug(data);
            });
        },
        errorHandler,
        form
    );
}

function tipSubmit(idSession) {
    var url = $('#tip-form').attr("action");
    var method = $('#tip-form').attr("method");
    var form = new FormData(document.getElementById('tip-form'));
    var errorHandler = function (err) {
        console.log(err)
    };
    debug(url);
    makeAPIRequest(
        url,
        method,
        function (response) {
            if (response.status !== 200 && response.status !== 201) {
                errorHandler(response);
                return;
            }

            // Examine the text in the response
            response.json().then(function (data) {
                // CERRAR EL FORMULARIO
                $('#forms').html('');
                // ACTUALIZAR LA TABLA
                fetchDealerTips(idSession);
                debug(data);
            });
        },
        errorHandler,
        form
    );
}

function addTips(idSession, sessionDate) {

    var template = twig({
        href: 'templates/tips-form.twig',
        async: false,
        // The default is to load asynchronously, and call the load function
        //   when the template is loaded.
        load: function (tpl) {
            var url = parseRoute(CONFIG.endpoints.dealerTips.create.path, {
                "idSession": idSession
            });
            var method = CONFIG.endpoints.dealerTips.create.method;

            var output = tpl.render({
                idSession: idSession,
                sessionDate: sessionDate,
                session: null,
                title: 'Agregar Tips',
                onSubmit: 'dealerTipSubmit',
                action: url,
                method: method,
                buttonName: 'Agregar'
            });
            $('#forms').html(output);
            $('#idSession').val(idSession);
            $('#hour').val(suggestedDate(sessionDate));
        }
    });
}

function updateUserSession(button, idSession, idUserSession) {
    if ($(button).hasClass("button-disabled")) {
        return;
    }

    var url = parseRoute(CONFIG.endpoints.userSession.fetch.path, {
        "idUserSession": idUserSession,
        "idSession": idSession
    });

    var method = CONFIG.endpoints.userSession.fetch.method;
    loadView(
        url,
        method,
        'templates/usersession-form.twig',
        function (template, data) {
            var output = template.render({
                userSession: data,
                title: 'Editar Usuario',
                action: parseRoute(CONFIG.endpoints.userSession.update.path, {
                    "idUserSession": idUserSession,
                    "idSession": idSession
                }),
                method: CONFIG.endpoints.userSession.update.method,
                buttonName: 'Editar',
                idSession: idSession
            });

            $('#forms').html(output);
            $('#id').val(data.id);
            $('#idUser').val(data._embedded.user.id);
            $('#idSession').val(idSession);
            $('#points').val(data.accumulatedPoints);
            $('#isApproved').val(data.isApproved);

            // if isset start, show
            $('#start').val(data.start.date.substr(0, 10) + 'T' + data.start.date.substr(11, 5));
            $('#minimum_minutes').val(data.minimumMinutes);
            $('#cashout').val(data.cashout);

            if (data.end) {
                $('#end').val(data.end.date.substr(0, 10) + 'T' + data.end.date.substr(11, 5));
            }

            $('#usersession-form').addClass('active-player');

        },
        function (err) {
            debug('Fetch Error :-S', err);
        }
    );
}

function closeUserSession(button, idSession, idUserSession) {
    if ($(button).hasClass("button-disabled")) {
        return;
    }

    var url = parseRoute(CONFIG.endpoints.userSession.fetch.path, {
        "idSession": idSession,
        "idUserSession": idUserSession
    });
    var method = CONFIG.endpoints.userSession.fetch.method;
    loadView(
        url,
        method,
        'templates/usersession-form.twig',
        function (template, data) {
            debug(data);
            var now = getCurrentDate();
            var output = template.render({
                userSession: data._embedded.users_session,
                title: 'Cerrar sessión de usuario',
                action: parseRoute(CONFIG.endpoints.userSession.closeUserSession.path, {
                    "idUserSession": idUserSession
                }),
                method: CONFIG.endpoints.userSession.closeUserSession.method,
                buttonName: 'Enviar',
                idSession: idSession
            });

            $('#forms').html(output);
            $('#id').val(data.id);
            $('#idUser').val(data._embedded.user.id);
            $('#cashout').val(data.cashout);
            $('#end').val(now["date"] + "T" + now["hour"]);
            $('#cashout').focus();
            $('#start').val(data.start.date.substr(0, 10) + 'T' + data.start.date.substr(11, 5));
            $('#minimum_minutes').val(data.minimumMinutes);
            // $('#usersession-form').addClass('active-player');
        },
        function (err) {
            debug('Fetch Error :-S', err);
        }
    );
}

function userSessionSubmit(idSession) {
    var url = $('#usersession-form').attr("action");
    var method = $('#usersession-form').attr("method");
    var form = new FormData(document.getElementById('usersession-form'));
    debug('url y method submit');
    debug(url); debug(method);
    makeAPIRequest(
        url,
        method,
        function (response) {
            if (response.status !== 200 && response.status !== 201) {
                errorHandler(response);
                return;
            }

            // Examine the text in the response
            response.json().then(function (data) {
                // CERRAR EL FORMULARIO
                $('#forms').html('');
                // ACTUALIZAR LA TABLA
                fetchUsersSession(idSession);
                debug(data);
            });
        },
        function (err) {
            console.log(err)
        },
        form
    );
}

function addUserSession(idSession) {
    // cargo el template de form
    var template = twig({
        href: 'templates/usersession-formAdd.twig',
        async: false,
        // The default is to load asynchronously, and call the load function
        //   when the template is loaded.
        load: function (tpl) {
            var url = parseRoute(CONFIG.endpoints.userSession.create.path, {
                "idSession": idSession
            });
            var output = tpl.render({
                idSession: idSession,
                session: null,
                title: 'Agregar Usuario',
                action: url,
                buttonName: 'Agregar'
            });

            $('#forms').html(output);
            $('#idSession').val(idSession);
            var url_users = parseRoute(CONFIG.endpoints.users.fetchAll.path, {});
            var method_fetchAll = CONFIG.endpoints.users.fetchAll.method;

            var loadUsers = function () {
                makeAPIRequest(
                    url_users,
                    method_fetchAll,
                    function (response) {
                        if (response.status !== 200) {
                            // si falla fetch usuarios hay que reintentarlo con un max retries
                            //loadUsers();
                            return;
                        }

                        // Examine the text in the response
                        response.json().then(function (data) {
                            data._embedded.users.forEach(function (item) {
                                $('#users_id').append('<option value="' + item.id + '">' + item.name + ' ' + item.lastname + '</option>');
                            });
                        });
                    },
                    function (err) {
                        console.log(err)
                    },
                );
            };
            loadUsers();
        }
    });
}


function updateUser(idUser) {
    var url = parseRoute(CONFIG.endpoints.users.fetch.path, {
        "idUser": idUser
    });
    var method = CONFIG.endpoints.users.fetch.method;
    loadView(
        url,
        method,
        'templates/user-form.twig',
        function (template, data) {
            var output = template.render({
                user: data,
                title: 'Editar Usuario',
                action: parseRoute(CONFIG.endpoints.users.update.path, {
                    "idUser": idUser
                }),
                method: CONFIG.endpoints.users.update.method,
                buttonName: 'Editar'
            });

            debug(parseRoute(CONFIG.endpoints.users.update.path, {
                "idUser": idUser
            }));
            debug(CONFIG.endpoints.users.update.method);
            $('#forms').html(output);
            $('#id').val(data.id);
            $('#lastname').val(data.lastname);
            $('#firstname').val(data.name);
            $('#username').val(data.username);
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
        function (err) {
            debug('Fetch Error :-S', err);
        }
    );
}

function userSubmit() {
    var url = $('#users-form').attr("action");
    var method = $('#users-form').attr("method");

    var form = new FormData(document.getElementById('users-form'));
    var errorHandler = function (err) {
        console.log(err)
    };

    makeAPIRequest(
        url,
        method,
        function (response) {
            if (response.status !== 200 && response.status !== 201) {
                errorHandler(response);
                return;
            }

            // Examine the text in the response
            response.json().then(function (data) {
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

function addUser() {
    var template = twig({
        href: 'templates/user-form.twig',
        async: false,
        // The default is to load asynchronously, and call the load function
        //   when the template is loaded.
        load: function (tpl) {
            var url = parseRoute(CONFIG.endpoints.users.create.path, {});
            var method = CONFIG.endpoints.users.create.method;
            var output = tpl.render({
                title: 'Agregar Usuario',
                action: url,
                method: method,
                buttonName: 'Agregar'
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

function playSession(idSession) {
    var url = parseRoute(CONFIG.endpoints.sessions.playSession.path, {
        "idSession": idSession
    });
    var method = CONFIG.endpoints.sessions.playSession.method;

    makeAPIRequest(
        url,
        method,
        function (response) {
            if (response.status !== 200) {
                errorHandler(response);
                return;
            }
            fetchSessions();
        },
        function (err) {
            debug(err)
        }
    );
}

function stopSession(idSession) {
    var url = parseRoute(CONFIG.endpoints.sessions.stopSession.path, {
        "idSession": idSession
    });
    var method = CONFIG.endpoints.sessions.stopSession.method;

    makeAPIRequest(
        url,
        method,
        function (response) {
            if (response.status !== 200) {
                errorHandler(response);
                return;
            }
            fetchSessions();
        },
        function (err) {
            debug(err)
        }
    );
}

function updateSession(idSession) {
    var url = parseRoute(CONFIG.endpoints.sessions.fetch.path, {
        "idSession": idSession
    });
    var method = CONFIG.endpoints.sessions.fetch.method;
    loadView(
        url,
        method,
        'templates/session-form.twig',
        function (template, data) {
            var output = template.render({
                session: data,
                title: 'Editar Sesión',
                action: parseRoute(CONFIG.endpoints.sessions.update.path, {
                    "idSession": idSession
                }),
                buttonName: 'Editar',
                idSession: idSession
            });
            debug('data para update');
            debug(data);
            $('#forms').html(output);
            $('#id').val(data.id);
            $('#idSession').val(data.idSession);
            $('#description').val(data.description);
            $('#title').val(data.title);
            $('#date').val(data.date.date.substr(0, 10));
            $('#start_at').val(data.startTime.date.substr(0, 10) + 'T' + data.startTime.date.substr(11, 5));
            if (data.startTimeReal != null) {
                $('#real_start_at').val(data.startTimeReal.date.substr(0, 10) + 'T' + data.startTimeReal.date.substr(11, 5));
            }
            if (data.endTime != null) {
                $('#end_at').val(data.endTime.date.substr(0, 10) + 'T' + data.endTime.date.substr(11, 5));
            }
            $('#minimum_user_session_minutes').val(data.minimumUserSessionMinutes);

            var url = parseRoute(CONFIG.endpoints.rakebackAlgorithms.fetchAll.path, {});
            var method = CONFIG.endpoints.rakebackAlgorithms.fetchAll.method;

            var loadAlgorithms = function () {
                makeAPIRequest(
                    url,
                    method,
                    function (response) {
                        if (response.status !== 200) {
                            return;
                        }

                        // Examine the text in the response
                        response.json().then(function (data) {
                            debug(data);
                            Object.values(data.algorithmsNames).forEach(function (item) {
                                debug(item);
                                $('#rakeback_class').append('<option value="' + item + '">' + item + '</option>');
                            });
                            $('#rakeback_namespace').val(data.namespace);
                        });
                    },
                    function (err) {
                        console.log(err)
                    },
                );
            };
            loadAlgorithms();
        },
        function (err) {
            debug('Fetch Error :-S', err);
        }
    );
}

function sessionSubmit() {
    var url = $('#sessions-form').attr("action");
    var method = $('#sessions-form').attr("method");
    var form = new FormData(document.getElementById('sessions-form'));
    var errorHandler = function (err) {
        console.log(err)
    };
    makeAPIRequest(
        url,
        method,
        function (response) {
            if (response.status !== 200 && response.status !== 201) {
                errorHandler(response);
                return;
            }

            // Examine the text in the response
            response.json().then(function (data) {
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

function addSession() {
    // cargo el template de form
    var template = twig({
        href: 'templates/session-form.twig',
        async: false,
        // The default is to load asynchronously, and call the load function
        //   when the template is loaded.
        load: function (tpl) {
            var now = getCurrentDate();
            var url = parseRoute(CONFIG.endpoints.sessions.create.path, {});
            var output = tpl.render({
                title: 'Agregar Sesión',
                action: url,
                buttonName: 'Agregar'
            });
            $('#forms').html(output);
            $('#date').val(now["date"]);
            $('#start_at').val(now["date"] + "T" + now["hour"]);
            $('#minimum_user_session_minutes').val(240);

            var url = parseRoute(CONFIG.endpoints.rakebackAlgorithms.fetchAll.path, {});
            var method = CONFIG.endpoints.rakebackAlgorithms.fetchAll.method;

            var loadAlgorithms = function () {
                makeAPIRequest(
                    url,
                    method,
                    function (response) {
                        if (response.status !== 200) {
                            return;
                        }

                        // Examine the text in the response
                        response.json().then(function (data) {
                            debug(data);
                            Object.values(data.algorithmsNames).forEach(function (item) {
                                debug(item);
                                $('#rakeback_class').append('<option value="' + item + '">' + item + '</option>');
                            });
                            $('#rakeback_namespace').val(data.namespace);
                        });
                    },
                    function (err) {
                        console.log(err)
                    },
                );
            };
            loadAlgorithms();
        }
    });
}

function chargeAmount(id, amount) {
    $('#' + id).val(amount);
}

function rotationDate() {
    $('.show-column .day').toggleClass('hide-me');
    $('.show-column .date').toggleClass('hide-me');
}

function rotationTitle() {
    $('.show-column .title').toggleClass('hide-me');
    $('.show-column .descrip').toggleClass('hide-me');
}

function rotationSeats() {
    $('.show-column .seats').toggleClass('hide-me');
    $('.show-column .seats-history').toggleClass('hide-me');
}
