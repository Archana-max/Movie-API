
function getValue(searchText){
    //console.log(searchText);
   var xhttp= new XMLHttpRequest();

   xhttp.onreadystatechange=function(){
      // alert(xhttp.statusText);
       if(xhttp.readyState== 4 && xhttp.status == 200){
        let data=JSON.parse(xhttp.responseText);
        //console.log(data);
        //console.log(data.Search);
        let moviesInfo=data.Search;
        let output="";
        moviesInfo.forEach((movie,index) => {
            output+= `<div class="col-12 col-sm-6 col-md-3 py-4">
            <div class="well text-center">
            <img src="${movie.Poster}">
            <h5 class="mt-3">${movie.Title}</h5>
            <a onClick="movieSelected('${movie.imdbID}')" class="btn btn-danger mt-1" >Movie Details</a>
            </div>
            </div>`;
        });

       // console.log(output);
        document.getElementById("movies").innerHTML=output;

       }
   }

xhttp.open("GET",'http://www.omdbapi.com/?s=' +searchText+ '&apikey=15487c0a',true);
xhttp.send();

}

function movieSelected(id){
    console.log(id);
    sessionStorage.setItem("movieId",id);
    window.location="movie.html";
    return false;
}

function getMovie(){

    let movieId=sessionStorage.getItem('movieId');

    var xhttp1= new XMLHttpRequest();

   xhttp1.onreadystatechange=function(){
    
       if(xhttp1.readyState== 4 && xhttp1.status == 200){
        let movieInfo =JSON.parse(xhttp1.responseText);
        console.log(movieInfo);
        let output=`
        <div class="row">
          <div class=" col-12  col-md-4">
            <img src="${movieInfo.Poster}" class="thumbnail">
          </div>
          <div class="col-12 col-md-8">
          <h3 class="text-center">${movieInfo.Title}</h3>
          <ul class="list-group">
            <li class="list-group-item"><strong>Year :</strong>${movieInfo.Year}</li>
            <li class="list-group-item"><strong>Actors :</strong>${movieInfo.Actors}</li>
            <li class="list-group-item"><strong>Genre :</strong>${movieInfo.Genre}</li>
            <li class="list-group-item"><strong>Language :</strong>${movieInfo.Language}</li>
            <li class="list-group-item"><strong>Rated :</strong>${movieInfo.Rated}</li>
            <li class="list-group-item"><strong>Imdb Rating :</strong>${movieInfo.imdbRating}</li>
            <li class="list-group-item"><strong>Director :</strong>${movieInfo.Director}</li>
            </ul>
              </div>
        </div>

        <div class="row">
        <div class="well">
        <h3>Plot</h3>
        
     <p> ${movieInfo.Plot}</p>
    
     <a href="index.html" class="btn btn-danger">Go to Search</a>


        </div>
        </div>

`

document.querySelector("#movieInfo").innerHTML=output;
    }
    

   }

   xhttp1.open("GET",'http://www.omdbapi.com/?i=' + movieId + '&apikey=15487c0a',true);
   xhttp1.send();

}