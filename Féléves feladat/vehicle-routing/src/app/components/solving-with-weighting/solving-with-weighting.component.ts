import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
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
  public avgDistance : number = 0;

  chartData: ChartDataset[] = [];
  chartLabels: string[] = [];
  chartType: ChartType = 'scatter';
  chartLegend: boolean = true;
  chartPlugins = [];
  chartOptions: ChartOptions = {
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        beginAtZero: true,
        max: 100,
        min : -100
      },
      y: {
        beginAtZero: true,
        max: 100,
        min : -100
      }
    }
  };

  constructor(private readonly destinationGeneratorService: DestinatonsGeneratorService,
    private readonly vehicleGeneratorService: VehicleGeneratorService,
    private readonly fb: FormBuilder,
    private readonly distanceCalculatorSerivce: DistanceCalculatorService) { }

  ngOnInit(): void {
    this.chartData.push({
      label: "Depo",
      data: [{ x: 0, y: 0 }],
      borderColor: 'red',
      borderWidth: 1,
      pointBackgroundColor: 'red',
      pointBorderColor: 'red',
      pointRadius: 8,
      pointHoverRadius: 8,
      fill: true,
      tension: 10,
      showLine: true
    });

  }

  public get formDestinationAmount(): AbstractControl<any, any> | null {
    return this.amountsForm.get("amountOfDestinationsInEachQuadrant");
  };

  public get formVehiclesAmount(): AbstractControl<any, any> | null {
    return this.amountsForm.get("amountOfVehicles");
  };

  public generateDestinationsAndVehicles() {

    this.isBasicSolutionDisplayed = false;
    if (!this._isFormValid()) {
      alert("Stg wrong with the inputs");
      return;
    };

    this.destinationGeneratorService.generateDestinations(this.formDestinationAmount?.value);
    this.cities.splice(0, this.cities.length)
    this.cities = this.destinationGeneratorService.getGeneratedCities();

    //this.destinationGeneratorService.printOutDestinations();

    this.vehicleGeneratorService.addVehicles(this.formVehiclesAmount?.value);
    this.vehicles = this.vehicleGeneratorService.vehicles;

    this.vehicleGeneratorService.printOutVehicles();


  };

  private _isFormValid(): boolean {
    if (!this.formDestinationAmount?.valid || !this.formVehiclesAmount?.valid) {
      return false;
    }

    return true;
  };

  public getBaseSolution() {

    this._putVehiclesToStartingPosition(this.cities[0]);

    const afterStartingPos = this.vehicles;
    
    const vehiclesBeforeStart: Vehicle[] = [...this.vehicles];
    



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

      this.vehicles[chosenVehiclesIndex].move(city);

    };

    
    this.vehicles.forEach(vehicle => {
      vehicle.returnToStartingPosition(this.cities[0]);
    });
    
    

    this.avgDistance = this.distanceCalculatorSerivce.calculateAverageDistance(this.vehicles);    

    this.vehicles.forEach(vehicle => {
      let r = Math.floor(Math.random() * 255);
      let g = Math.floor(Math.random() * 255);
      let b = Math.floor(Math.random() * 255);
      let color = "rgb(" + r + "," + g + "," + b + ")";
      this.chartData.push({
        label: vehicle.name,
        data: [
          ...vehicle.visitedPlaces.map(city => ({ x: city.coordinates.xCoord, y: city.coordinates.yCoord }))
        ],
        borderColor: color,
        borderWidth: 1,
        pointBackgroundColor: color,
        pointBorderColor: color,
        pointRadius: 3,
        pointHoverRadius: 4,
        tension: 0,
        showLine: true
      })
    });

    this._logRoutesAfterBaseSolution();
    this.isBasicSolutionDisplayed = true;


  };

  private _putVehiclesToStartingPosition(city: City): void {
    this.vehicles.forEach((vehicle: Vehicle) => {
      vehicle.visitedPlaces.push(city);
    });
  };

  private _logRoutesAfterBaseSolution(): void {
    console.log("Finished with base solution");

    const afterBase : Vehicle[] = [...this.vehicles];
    
    afterBase.forEach(ab => {
      console.log(ab.name);
      
      ab.visitedPlaces.forEach(vp => {
        console.log(vp);
        
      });
    });
  };

}
