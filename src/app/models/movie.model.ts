import { NumberValueAccessor } from "@angular/forms";

// interface MovieModel {
//     title: string;
//     desc: string;
//     image: string;
// }

// on pourrait faire une interface mais on fait plutot une classe
//pour pouvoir en faire des instances

//TypeScript
//https://www.typescriptlang.org/docs/handbook/basic-types.html

//le mot clé export sert à pouvoir importer la classe dans le movie.service
//export signifie "exportable"
export class MovieModel {
    id: number;
    title: string;
    desc: string;
    image: string;
    date: Date;
    score: number;

    constructor(id:number, title:string, overview:string, backdrop:string, release_date:string, vote_average:number){
        this.id = id;
        this.title = title;
        this.desc = overview;
        this.image = backdrop;
        this.date = new Date(release_date);
        this.score = vote_average;
    }
}