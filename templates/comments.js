function fetchSessions()
{
    loadView(
      'endopoint', 
      'method' 'get', 
      'templates de ui',
      'funcion que renderiza el template',
      'funcion que se aplica en caso de error'
    );
}

// function que renderiza el template
function(template, data) {
        var output = template.render({
          sessions : data
        });
        $('#main').html(output);
      }

/*
parametro data es json
parametro template es un template

template.render({sessions : data})

$('#main').html(output)


*/




// funcion que se aplica en caso de error
function(err) {
        debug('Fetch Error :-S', err);
      }


///////////////////////////// dudas ///////////////////////////////////

var DEBUG = true;

function debug(data) {
  if (DEBUG) {
    console.log(data);
  }
}