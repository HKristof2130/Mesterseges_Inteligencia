import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { City } from 'src/app/city-type/city.type';
import { Coordinate } from 'src/app/coordinate type/coordinate.type';
import { DistanceCalculatorService } from 'src/app/services/distance-calculator.service';
import { DestinatonsGeneratorService } from 'src/app/services/route-generator.service';
import { VehicleGeneratorService } from 'src/app/services/vehicle-generator.service';
import { Vehicle } from 'src/app/vehicle types/vehicle.type';

@Component({
  selector: 'app-solving-with-weighting',
  templateUrl: './solving-with-weighting.component.html',
  styleUrls: ['./solving-with-weighting.component.scss']
})
export class SolvingWithWeightingComponent implements OnInit {

  public amountsForm = this.fb.group({
    amountOfDestinationsInEachQuadrant : ["",Validators.required],
    amountOfVehicles: ["", Validators.required],
  });
  public cities : Array<City> = [];
  public vehicles : Vehicle[] = [];

  constructor( private readonly destinationGeneratorService : DestinatonsGeneratorService,
               private readonly vehicleGeneratorService : VehicleGeneratorService,
               private readonly fb : FormBuilder,
               private readonly distanceCalculatorSerivce : DistanceCalculatorService) { }

  ngOnInit(): void {
    
  }

  public get formDestinationAmount() : AbstractControl<any,any> | null{
    return this.amountsForm.get("amountOfDestinationsInEachQuadrant");
  }

  public get formVehiclesAmount() : AbstractControl<any,any> | null{
    return this.amountsForm.get("amountOfVehicles");
  }

  public generateDestinationsAndVehicles(){
    
    if(! this._isFormValid()){
      alert("Stg wrong with the inputs");
      return;
    }

    this.destinationGeneratorService.generateDestinations(this.formDestinationAmount?.value);
    this.cities.splice(0,this.cities.length)
    this.cities = this.getGeneratedCities();
    this.destinationGeneratorService.printOutDestinations();

    this.vehicleGeneratorService.addVehicles(this.formVehiclesAmount?.value);
    this.vehicles = this.vehicleGeneratorService.vehicles;
    this.vehicleGeneratorService.printOutVehicles();
  }

  private _isFormValid() : boolean{
    if( !this.formDestinationAmount?.valid || !this.formVehiclesAmount?.valid){
      return false;
    }

    return true;
  }

  private getGeneratedCities() : Array<City> {

    const tmpCities : Array<City>= [];
    for(let i = 0 ; i < this.destinationGeneratorService.destinations.size; i++){
      tmpCities.push( this.destinationGeneratorService.destinations.get(i) as City);
    }

    return tmpCities;
  }

  public getBaseSolution() {
    
    this._putVehiclesToStartingPosition(this.cities[0]);

    for(let i = 1; i < this.cities.length; i++) {
      
      const city : City = this.cities[i];
      let lowestDistance : number = Number.POSITIVE_INFINITY;
      let chosenVehiclesIndex : number = -1;

      for( let i = 0; i < this.vehicles.length; i++){

        const distance : number = this.distanceCalculatorSerivce.calculateDistance(this.vehicles[i].position, city.coordinates);

        if( distance < lowestDistance){
          lowestDistance = distance;
          chosenVehiclesIndex = i;
        }
      }

      this.vehicles[chosenVehiclesIndex].move(city);

    };

    this.vehicles.forEach(vehicle => {
      vehicle.returnToStartingPosition(this.cities[0]);
    });

    this.logRoutesAfterBaseSolution();


  }

  private _putVehiclesToStartingPosition(city : City) : void{
    this.vehicles.forEach( (vehicle : Vehicle) => {
      vehicle.setStartingPosition(city);
    });
  }

  private logRoutesAfterBaseSolution() : void{
    console.log("Finished with base solution");
    
    this.vehicles.forEach(vehicle => {
      console.log(vehicle);
      
    });
  }

}
