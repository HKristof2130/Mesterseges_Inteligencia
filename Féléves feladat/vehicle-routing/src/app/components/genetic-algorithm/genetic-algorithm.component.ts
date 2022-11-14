import { Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { City } from 'src/app/city-type/city.type';
import { Vehicle } from 'src/app/vehicle types/vehicle.type';

@Component({
  selector: 'app-genetic-algorithm',
  templateUrl: './genetic-algorithm.component.html',
  styleUrls: ['./genetic-algorithm.component.scss']
})
export class GeneticAlgorithmComponent implements OnChanges {

  @Input() baseSolution: Vehicle[] = [];
  @Input() baseSolutionGenerated : boolean = false;
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
  
    if(this.baseSolution.length > 0 && this.baseSolutionGenerated){
      console.log("Show genetic alg");
      this.createGenerations();
    }
    
  }


  public createGenerations() {

    console.log(this.baseSolution);

    this._shuffleVehicleRoutes();
    this._shuffleEachVehiclesRoute();

    console.log(this.baseSolution);
    
  }

  private _shuffleVehicleRoutes(): void {

    console.log("Shuffle vehicle routes");


    for (let i = 0; i < this.baseSolution.length; i++) {

      const selectedVehicle: Vehicle = this.baseSolution[i];
      const arrayLength: number = selectedVehicle.visitedPlaces.length;
      const numberOfDestinationsToShuffle: number = Math.floor(Math.random() * (arrayLength -2))  ;

      console.log(`I will shuffle ${numberOfDestinationsToShuffle} destinations of ${this.baseSolution[i].name}`);


      for (let j = 0; j < numberOfDestinationsToShuffle; j++) {

        const numberOfDestinationsKeptInTheArray: number = selectedVehicle.visitedPlaces.length;
        const selectedDestinationsIndex: number = Math.floor(Math.random() * (numberOfDestinationsKeptInTheArray - 1 )) + 1;

        const destinationToShuffle: City = selectedVehicle.visitedPlaces[selectedDestinationsIndex]

        const shuffleToAnAnotherVehicleIndex: number = Math.floor(Math.random() * (this.baseSolution.length));

        const shuffleToAnAnotherVehicleLength : number = this.baseSolution[shuffleToAnAnotherVehicleIndex].visitedPlaces.length;
        const lastCity : City = this.baseSolution[shuffleToAnAnotherVehicleIndex].visitedPlaces[shuffleToAnAnotherVehicleLength-1];
        this.baseSolution[shuffleToAnAnotherVehicleIndex].visitedPlaces.splice(shuffleToAnAnotherVehicleLength-1, 0);
        this.baseSolution[shuffleToAnAnotherVehicleIndex].visitedPlaces.push(destinationToShuffle);
        this.baseSolution[shuffleToAnAnotherVehicleIndex].visitedPlaces.push(lastCity);
        this.baseSolution[i].visitedPlaces.splice(selectedDestinationsIndex, 0);
      }
    };
  }

  private _shuffleEachVehiclesRoute() : void{
    
    for (let i = 0; i < this.baseSolution.length; i++) {

    const selectedVehicle: Vehicle = this.baseSolution[i];
    const arrayLength: number = selectedVehicle.visitedPlaces.length;
    const numberOfDestinationsToShuffle: number = Math.floor(Math.random() * (arrayLength - 2 ));
    
    for (let j = 0; j < numberOfDestinationsToShuffle; j++) {

    
      const numberOfDestinationsKeptInTheArray: number = selectedVehicle.visitedPlaces.length;
      const selectedDestinationsIndex: number = Math.floor(Math.random() * (numberOfDestinationsKeptInTheArray - 1)) + 1;

      const selectedCity: City = selectedVehicle.visitedPlaces[selectedDestinationsIndex]

      let isTheSameCity : boolean = true;

      let switchToAnAnotherCityIndex : number = -1;
      while(isTheSameCity){
        switchToAnAnotherCityIndex = Math.floor(Math.random() * (selectedVehicle.visitedPlaces.length - 1)) + 1;
        if( switchToAnAnotherCityIndex !== selectedDestinationsIndex && switchToAnAnotherCityIndex  >= 0){
          isTheSameCity = false;
        }
      }
      
      const cityToSwitchWithSelectedCity : City = selectedVehicle.visitedPlaces[switchToAnAnotherCityIndex];

      const tmpCity : City = selectedCity;
      this.baseSolution[i].visitedPlaces[selectedDestinationsIndex] = cityToSwitchWithSelectedCity;
      this.baseSolution[i].visitedPlaces[switchToAnAnotherCityIndex] = selectedCity;
    }

    }
    
  }

}
