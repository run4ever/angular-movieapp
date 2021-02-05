import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [

  {path: '', component:ListComponent},
  {path: 'detail/:id/:type', component: DetailComponent}

];

//pour que ces lignes de routing soient utilisées,
//il faut placer le component router-outlet et attribut routerLink dans html


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
