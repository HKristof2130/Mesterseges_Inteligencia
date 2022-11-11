import { Component, Input, OnInit } from '@angular/core';
import { City } from 'src/app/city-type/city.type';
import { Vehicle } from 'src/app/vehicle types/vehicle.type';

@Component({
  selector: 'app-genetic-algorithm',
  templateUrl: './genetic-algorithm.component.html',
  styleUrls: ['./genetic-algorithm.component.scss']
})
export class GeneticAlgorithmComponent implements OnInit {

  @Input() baseSolution : Vehicle[] =[];
  constructor() { }

  ngOnInit(): void {
  }

  public createGenerations(){

  }

  private shuffleVehicleRoutes() : void{

    for(let i = 0; i < this.baseSolution.length; i++){

      const selectedVehicle : Vehicle = this.baseSolution[i];
      const arrayLength : number = selectedVehicle.visitedPlaces.length;
      const numberOfDestinationsToShuffle : number =  Math.floor(Math.random() * (arrayLength + 1));

      console.log(`I will shuffle ${numberOfDestinationsToShuffle}` );
      

      for(let j = 0 ; j < numberOfDestinationsToShuffle; j++){
        
        const numberOfDestinationsKeptInTheArray : number = selectedVehicle.visitedPlaces.length;
        const selectedDestinationsIndex : number = Math.floor(Math.random() * ( numberOfDestinationsKeptInTheArray + 1));
      
        const destinationToShuffle : City = selectedVehicle.visitedPlaces[selectedDestinationsIndex]
      
        const shuffleToAnAnotherVehicleIndex : number = Math.floor(Math.random() * (this.baseSolution.length + 1));
        const shuffleToAnAnotherVehiclesRoute : Vehicle = this.baseSolution[shuffleToAnAnotherVehicleIndex];

        shuffleToAnAnotherVehiclesRoute.visitedPlaces.push(destinationToShuffle);
        selectedVehicle.visitedPlaces.splice(selectedDestinationsIndex,0);
      }
    };
  }

}
