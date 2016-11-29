searchMovie = {
  index: window.localStorage.getItem('searchMovie:index'),
  $table: document.querySelector('.search-movie-table'),
  $form: document.querySelector('.movie_serch_form'),
  $button_save: document.querySelector('.button_serch'),

init: function() {                                                             // initialize storage index
  if (!searchMovie.index) { 
    window.localStorage.setItem("searchMovie:index", searchMovie.index = 1);
  }                                                                           // initialize form                                                         
  
  searchMovie.$form.reset();                                                        
  searchMovie.$form.addEventListener("submit", function(event) {
    var entry = {
      id: parseInt(this.id_entry.value),
      firstMovie: this.firstMovie.value,
      secondMovie: this.secondMovie.value,
    };
    if (entry.id == 0) {
      searchMovie.movieAdd(entry);
      searchMovie.movieTableAdd(entry);
    } else { 
    }

    this.reset();
    this.id_entry.value = 0;
    event.preventDefault();
  }, true);

                                                                              // initialize table
  if (window.localStorage.length - 1) {
    var searchMovieList = [], i, key;
    for (i = 0; i < window.localStorage.length; i++) {
      key = window.localStorage.key(i);
      if (/searchMovie:\d+/.test(key)) {
      searchMovieList.push(JSON.parse(window.localStorage.getItem(key)));
      }
    }
    
    if (searchMovieList.length) {
      searchMovieList
      .sort(function(a, b) {
        return a.id < b.id ? -1 : (a.id > b.id ? 1 : 0);
      })
      .forEach(searchMovie.movieTableAdd);
    }
  }
},

movieAdd: function(entry) {
  entry.id = searchMovie.index;
  window.localStorage.setItem("searchMovie:index", ++searchMovie.index);
  window.localStorage.setItem("searchMovie:"+ entry.id, JSON.stringify(entry));
},

movieTableAdd: function(entry) {
  var $tr = document.createElement("tr"), $td, key;
  for (key in entry) {
    if (entry.hasOwnProperty(key)) {
      $td = document.createElement("td");
      $td.appendChild(document.createTextNode(entry[key]));
      $tr.appendChild($td);
    }
  }
  $tr.appendChild($td);
  $tr.setAttribute("id", "entry-"+ entry.id);
  searchMovie.$table.appendChild($tr);
},
};
searchMovie.init();
                                                                              // clear table
function ClearMovieSearchList() {
  localStorage.clear();
  location.reload()
};