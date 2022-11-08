import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { SolvingWithWeightingComponent } from './components/solving-with-weighting/solving-with-weighting.component';

const routes: Routes = [
  {path : "", component: HomepageComponent}, 
  {path : "home" , component: HomepageComponent},
  {path : "weighting-solution" , component : SolvingWithWeightingComponent},
  {path : "**", redirectTo : "home"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
