import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { MovieModel } from '../models/movie.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  //movies:Array<MovieModel>; //on crée le fichier movie.model.ts à la main en //
  movieslist:MovieModel[]; //autre syntaxe
  resultslist:MovieModel[]; 
  isLoading:boolean;

  constructor(private movieService:MovieService, private routeur:Router) { }

  //s'execute qd le composant est affiché dans la vue
  ngOnInit(): void {
    this.isLoading = true;
    //request à l'API themovie
    this.movieService.getMoviesFromApi();
    //on s'abonne à la source de données des films
    this.movieService.movies$.subscribe( (data: MovieModel[]) => {
      this.movieslist = data;
      this.isLoading = false;
    });
    //abonnement resultats search
    this.movieService.search$.subscribe( (data: MovieModel[]) => {
      this.resultslist = data;
      this.isLoading = false;
    });
  }

  printImageSrc(movie:MovieModel){
    return 'https://image.tmdb.org/t/p/w500/'+movie.image;
  }

  loadNextMovies() {
    this.isLoading = true;
    this.movieService.getNextMoviesFromApi();
  }

  getListOpacity(){
    //si isLoading retourne opacity 0.1 sinon 1
    return this.isLoading?.1:1;
  }

  searchMovie(searchText: string){
    console.log(searchText);
    if(searchText.trim().length<3){
      //si plus rien dans zone de recherche on met un tableau vide dans liste des resultats
      this.movieService.search$.next([]);
    }
    else if(searchText.trim().length > 2){
    //else{
      this.movieService.searchMoviesFromApi(searchText);
    }
  }

  goToDetailPage(movieId){
    //this.movieService.search$.next([]); ne pas le faire ici sinon la ligne du dessous renvoie une page vide car on a vidé les infos
    this.routeur.navigate(['/detail', movieId, 'search']);
  }

}

