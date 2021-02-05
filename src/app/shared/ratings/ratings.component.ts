import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.scss']
})
export class RatingsComponent implements OnInit {

  @Input() score: number;
  
  //on crée un tableau, uniquement pour le ngFor
  //par exemple, pour une note = 3 on mettra 3 nombres dans le tableau, pour boucler 3 fois et mettre 3 étoiles
  //par exemple on mettra [0,0,0]
  stars:Array<number>;

  constructor() { }

  ngOnInit(): void {
    console.log(this.score);
    let roundedScore = Math.round(this.score);
    this.stars = new Array(roundedScore).fill(1);
  }
}
