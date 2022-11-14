import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { City } from 'src/app/city-type/city.type';
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
    amountOfDestinationsInEachQuadrant: ["", Validators.required],
    amountOfVehicles: ["", Validators.required],
  });
  public isBasicSolutionDisplayed: boolean = false;
  public cities: City[] = [];
  public vehicles: Vehicle[] = [];

  public baseSolution: Vehicle[] = [];

  constructor(private readonly destinationGeneratorService: DestinatonsGeneratorService,
    private readonly vehicleGeneratorService: VehicleGeneratorService,
    private readonly fb: FormBuilder,
    private readonly distanceCalculatorSerivce: DistanceCalculatorService) { }

  ngOnInit(): void {

  }

  public get formDestinationAmount(): AbstractControl<any, any> | null {
    return this.amountsForm.get("amountOfDestinationsInEachQuadrant");
  }

  public get formVehiclesAmount(): AbstractControl<any, any> | null {
    return this.amountsForm.get("amountOfVehicles");
  }

  public generateDestinationsAndVehicles() {

    this.isBasicSolutionDisplayed = false;
    if (!this._isFormValid()) {
      alert("Stg wrong with the inputs");
      return;
    }

    this.destinationGeneratorService.generateDestinations(this.formDestinationAmount?.value);
    this.cities.splice(0, this.cities.length)
    this.cities = this.destinationGeneratorService.getGeneratedCities();

    //this.destinationGeneratorService.printOutDestinations();

    this.vehicleGeneratorService.addVehicles(this.formVehiclesAmount?.value);
    this.vehicles = this.vehicleGeneratorService.vehicles;

    this.vehicleGeneratorService.printOutVehicles();
  }

  private _isFormValid(): boolean {
    if (!this.formDestinationAmount?.valid || !this.formVehiclesAmount?.valid) {
      return false;
    }

    return true;
  }

  public getBaseSolution() {

    this._putVehiclesToStartingPosition(this.cities[0]);

    console.log(this.vehicles);
    const vehiclesBeforeStart: Vehicle[] = [...this.vehicles];
    console.log(vehiclesBeforeStart);



    for (let i = 1; i < this.cities.length; i++) {

      const city: City = this.cities[i];

      let lowestDistance: number = Number.POSITIVE_INFINITY;
      let chosenVehiclesIndex: number = -1;

      for (let j = 0; j < this.vehicles.length; j++) {

        const distance: number = this.distanceCalculatorSerivce.calculateDistance(this.vehicles[j].position, city.coordinates);

        if (distance < lowestDistance) {
          lowestDistance = distance;
          chosenVehiclesIndex = j;
        }
      };

      console.log(lowestDistance, chosenVehiclesIndex);

      console.log(this.vehicles[chosenVehiclesIndex], lowestDistance);


      this.vehicles[chosenVehiclesIndex].move(city);

      console.log("");

    };

    
    this.vehicles.forEach(vehicle => {
      vehicle.returnToStartingPosition(this.cities[0]);
    });
    
    this.isBasicSolutionDisplayed = true;
    this.logRoutesAfterBaseSolution();


  }

  private _putVehiclesToStartingPosition(city: City): void {
    this.vehicles.forEach((vehicle: Vehicle) => {
      vehicle.visitedPlaces.push(city);
    });
  }

  private logRoutesAfterBaseSolution(): void {
    console.log("Finished with base solution");

    this.vehicles.forEach(vehicle => {
      console.log(vehicle);

    });
  }

}
