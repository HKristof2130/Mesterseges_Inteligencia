import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomepageComponent } from './components/homepage/homepage.component';
import { SolvingWithWeightingComponent } from './components/solving-with-weighting/solving-with-weighting.component';
import { GeneticAlgorithmComponent } from './components/genetic-algorithm/genetic-algorithm.component';

@NgModule({
  declarations: [
    AppComponent,
    SolvingWithWeightingComponent,
    HomepageComponent,
    GeneticAlgorithmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
