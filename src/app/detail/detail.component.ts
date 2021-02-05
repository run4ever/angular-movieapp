import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  movieId:number;
  urlType:string;
  movie;
  
  // on va injecter un objet de la classe ActivatedRoute
  // pour récupérer les paramètres de l'URL
  // et le movie Service pour avoir accès au contenu de tous les films

//pour récupérer video :
//re faire une request
//https://api.themoviedb.org/3/movie/464052/videos?api_key=08aaf8584da58ddd4ea0300e86e6c279&language=fr
//[src] = "'www.youtube.." + 'id_recupere_dans_request'

  constructor(
    private route: ActivatedRoute, 
    private movieService: MovieService,
    private routeur: Router
    ) { }

  ngOnInit(): void {
    // on récupère l'id contenu dans l'URL
    this.movieId = this.route.snapshot.params.id;
    //on recupère type url
    this.urlType = this.route.snapshot.params.type;

    // on récupère les infos du film
    switch(this.urlType){
      case 'movies':
        // on pourrait utiliser subscribe si on estimait que la liste pouvait changer à tout moment
        console.log(this.movieService.movies$.getValue());
        //console.log(this.movieService.movies$.getValue().find(movie => movie.id == this.movieId));
        this.movie = this.movieService.movies$.getValue()
          .find(movie => movie.id == this.movieId);
        break;
      case 'search':
        this.movie = this.movieService.search$.getValue()
          .find(movie => movie.id == this.movieId);
        break;
  
      }
  }

  goToRootPage(){
    this.movieService.search$.next([]);
    this.routeur.navigate(['/']);
  }

}
