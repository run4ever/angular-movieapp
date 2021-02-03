import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'movies-app';
  movies;
  API_URL = "https://api.themoviedb.org/3/discover/movie?api_key=08aaf8584da58ddd4ea0300e86e6c279&language=fr";

  //faire une requette HTTP à l'api theMovieDB
 //https://developers.themoviedb.org/3/discover/movie-discover
 //injection de dépendance, ie qu'on instancie une seule fois l'objet http
 constructor(private http:HttpClient) {
  console.log(this);
  //on lance la requete (subscribe) et qd la data arrive on l'affiche dans console
  this.http.get(this.API_URL).subscribe((data) => console.log(data));

  this.http.get(this.API_URL).subscribe((data:any) => this.movies = data.results);

}


}
