import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { MovieModel } from './models/movie.model';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private API_URL = environment.apis.TMDB_API_URL;
  private API_KEY = environment.apis.TMDB_API_KEY;
  
  //'https://api.themoviedb.org/3/discover/movie?api_key=&language=fr';
  //faire une requette HTTP à l'api theMovieDB
 //https://developers.themoviedb.org/3/discover/movie-discover

  // variable subjext de type flux auquel on pourra 'abonner
  //on prend pour habitude de mettre $ à la fin
  //variable qu'on peut écouter et qui va aussi servir à modifier la data
  movies$ = new BehaviorSubject([]);
  search$ = new BehaviorSubject([]);
  currentPage:number = 1;

 //injection de dépendance, ie qu'on instancie une seule fois l'objet http
 //on lance la requete (subscribe) et qd la response arrive on l'affiche dans console
  //this.http.get(this.API_URL).subscribe((response) => console.log(response));
  //get renvoie un observable auquel on s'abonne (mais avant on traite le flux)
  //http://reactivex.io/documentation/operators.html

  constructor(private http:HttpClient) { }

  /*
  Load 20 movies from API*/
    getMoviesFromApi(){
      const params = new HttpParams({fromObject : {
        api_key : this.API_KEY,
        language: 'fr',
        page: this.currentPage.toString(),
      }});

      //&page='+this.currentPage
      console.log(params);

      this.http
      .get(this.API_URL+'/discover/movie', {params}) //renvoie un observable
      //normalement on devrait écrire {params: params} mais comme la clé et la valeur ont le meme nom, on peut écrire {params}
      .pipe( 
        map(
          (data:any) => data.results //qd on recevra data, on gardera que results
            //et on mappe les données reçues avec notre modele pour chaque movie reçu
            .map( 
              movie => new MovieModel(
                movie.id,
                movie.title, 
                movie.overview, 
                movie.backdrop_path, 
                movie.release_date,
                movie.vote_average,
              )
            ) 
        )
      ) // Renvoie aussi un observable => on peut chainer les operator
      //on met la reponse dans un subject, objet rxjs de type particulier, comme un flux observable
      .subscribe(response => {
        console.log(response);
        let movies: MovieModel[] = this.movies$.getValue();
        this.movies$.next([...movies, ...response]); //on ajoute un element dans notre flux. On concatene toutes les valeurs du tableau movies et toutes les valeurs du tableau response
        //this.movies$.next(response);
      })
    }

    //load 20 suivants
    getNextMoviesFromApi(){
      this.currentPage++;
      this.getMoviesFromApi();
      //this.movies$.next(movies);
    }

    searchMoviesFromApi(searchText: string){
      const params = new HttpParams({fromObject : {
        api_key : this.API_KEY,
        language: 'fr',
        query: searchText,
      }});

      console.log(params);

      this.http
      .get(this.API_URL+'/search/movie', {params}) 
      .pipe( 
        map(
          (data:any) => data.results 
            .map( 
              movie => new MovieModel(
                movie.id,
                movie.title, 
                movie.overview, 
                movie.backdrop_path, 
                movie.release_date,
                movie.vote_average,
              )
            ) 
        )
      ) 
      .subscribe(response => {
        console.log(response);
        this.search$.next(response); 
      })


    }

}
