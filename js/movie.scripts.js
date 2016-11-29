(function () {
  form = document.querySelector(".movie_serch_form");
  form.addEventListener("submit", function(e) {
    
    e.preventDefault();
    movieA = document.querySelector(".movie_input_first").value,
    movieB = document.querySelector(".movie_input_second").value;
                                                                                                    // request first
    requestFirst = new XMLHttpRequest();                                                           
    requestFirst.open('GET', 'http://www.omdbapi.com/?t='+movieA+'&y=&plot=short&r=json', true);
                                                                                                    // request second
    requestSecond = new XMLHttpRequest();
    requestSecond.open('GET', 'http://www.omdbapi.com/?t='+movieB+'&y=&plot=short&r=json', true);
                                                                                                    // request first load
    requestFirst.onload = function() {
      if (requestFirst.status >= 200 && requestFirst.status < 400) {
        var respFirst = JSON.parse(this.responseText),
        respFirstError = respFirst.Response;
      } else {
        // Error
      }
                                                                                                    // request second load
    requestSecond.onload = function() {
      if (requestSecond.status >= 200 && requestSecond.status < 400) {
  	    var respSecond = JSON.parse(requestSecond.responseText),
        respSecondError = respSecond.Response;
      } else {
        // Error
      }

      function titleMovieError(){
        var contentsFirst = document.querySelector('.results_first'),
        contentsSecond = document.querySelector('.results_second');

        if (respFirstError !== 'False' && respSecondError !== 'False') {
                                                                                                    // common actors   
          var a1 = respFirst.Actors.split(", "),
              a2 = respSecond.Actors.split(", ");

          var commonActors = a1.filter(function(v,i,a){
            return a2.indexOf(v) > -1;
          });
                                                                                                    // common director    
          var d1 = respFirst.Director.split(", "),
              d2 = respSecond.Director.split(", ");

          var commonDirector = d1.filter(function(v,i,a){
            return d2.indexOf(v) > -1;
          });

                                                                                                    //search response 
          if (commonActors.length > 0 && commonDirector.length > 0) {
            contentsFirst.innerHTML = "<b>Aktor</b><br>" + commonActors;
            contentsSecond.innerHTML = "<b>Reżyser</b><br>" +commonDirector;
          } else if (commonActors.length > 0 && commonDirector.length == 0) {
            contentsFirst.innerHTML = "<b>Aktor</b><br>" + commonActors;
            contentsSecond.innerHTML = "<b>Reżyser</b><br>Brak wspólnego reżysera";
          } else if (commonActors.length == 0 && commonDirector.length > 0) {
            contentsFirst.innerHTML = "<b>Aktor</b><br>Brak wspólnego aktora";
            contentsSecond.innerHTML = "<b>Reżyser</b><br>" +commonDirector;
          } else {
            contentsFirst.innerHTML = "Brak wspólnej obsady";
            contentsSecond.innerHTML = "";
          } 
        } else {
          contentsFirst.innerHTML = "Błędny tytuł filmu";
          contentsSecond.innerHTML = "";
        }
      }; titleMovieError();
    };
    requestSecond.send();
    };                                                                                              // request first & second send
    requestFirst.send();
    

  }, false);
})(); 	