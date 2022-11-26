import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { City } from 'src/app/city-type/city.type';
import { DistanceCalculatorService } from 'src/app/services/distance-calculator.service';
import { Vehicle } from 'src/app/vehicle types/vehicle.type';

@Component({
  selector: 'app-genetic-algorithm',
  templateUrl: './genetic-algorithm.component.html',
  styleUrls: ['./genetic-algorithm.component.scss']
})
export class GeneticAlgorithmComponent implements OnChanges, OnInit {

  @Input() baseSolution: Vehicle[] = [];
  @Input() baseAvgDistance : number = 0;
  @Input() baseSolutionGenerated: boolean = false;

  public solutionForGeneticAlgorithm: Vehicle[] = [];
  public bestSolution: Vehicle[] = [];
  public showChart: boolean = false;
  public averageDistance: number = Number.POSITIVE_INFINITY;
  public numberOfGenerationsForTesting : number[] = [];
  public testResults : Test[] = [];
  public showTestResults : boolean = false;



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
        min: -100
      },
      y: {
        beginAtZero: true,
        max: 100,
        min: -100
      }
    }
  };


  constructor(private readonly distanceCalculatorService: DistanceCalculatorService) { }

  ngOnChanges(changes: SimpleChanges): void {

    if (this.baseSolution.length > 0 && this.baseSolutionGenerated) {
      console.log("Show genetic alg");
      this.solutionForGeneticAlgorithm = [...this.baseSolution];
      this.bestSolution = [...this.solutionForGeneticAlgorithm];
    }

  }

  ngOnInit(): void {
  }

  public generateGenerations(generations: number): void {

    let generationsWatcher : number = 25;

    for (let i = 0; i < generations; i++) {
      this._fitnessMethod();
      const avgDist: number = this.distanceCalculatorService.calculateAverageDistance(this.solutionForGeneticAlgorithm);

      if (avgDist < this.averageDistance) {
        this.bestSolution = [...this.solutionForGeneticAlgorithm];
        this.averageDistance = avgDist;
      }
    };

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

    this.bestSolution.forEach(sol => {
      let r = Math.floor(Math.random() * 255);
      let g = Math.floor(Math.random() * 255);
      let b = Math.floor(Math.random() * 255);
      let color = "rgb(" + r + "," + g + "," + b + ")";
      this.chartData.push({
        label: sol.name,
        data: [
          ...sol.visitedPlaces.map(city => ({ x: city.coordinates.xCoord, y: city.coordinates.yCoord }))
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

    this.showChart = true;
  };

  
  public addToGenerationsArray(generations : number){
    this.numberOfGenerationsForTesting.push(generations);
  }


  public breedGenerations() : void{
    this.numberOfGenerationsForTesting.forEach(gen => {
      let avgDistForGivenGeneration : number = Number.POSITIVE_INFINITY;
      this.solutionForGeneticAlgorithm = [...this.baseSolution];
      for (let i = 0; i < gen; i++) {
        this._fitnessMethod();
        const avgDist: number = this.distanceCalculatorService.calculateAverageDistance(this.solutionForGeneticAlgorithm);
  
        if (avgDist < avgDistForGivenGeneration) {
          this.bestSolution = [...this.solutionForGeneticAlgorithm];
          avgDistForGivenGeneration = avgDist;
        }
      };

      this.testResults.push({
        numberOfGenerations : gen,
        averageDistance : avgDistForGivenGeneration
      });

    });

    this.showTestResults = true;
  };

  private _fitnessMethod() {


    this._shuffleDestinationsBetweenVehicleRoutes();
    this._shuffleEachVehiclesRoute();
    this._patchVehicleRoutes();
    this._calculateDistanceTakenByEachVehicle();

    this._logSolutionForGentic();

  };

  private _shuffleDestinationsBetweenVehicleRoutes(): void {

    console.log("Shuffle vehicle routes");

    if (this.solutionForGeneticAlgorithm.length <= 1) {
      return;
    }


    // iterate trough each vehicle and shuffle ciities between each vehicle's route

    for (let i = 0; i < this.solutionForGeneticAlgorithm.length; i++) {

      const originalVehicle: Vehicle = this.solutionForGeneticAlgorithm[i];
      const arrayLength: number = originalVehicle.visitedPlaces.length;
      const numberOfDestinationsToShuffle: number = Math.floor(Math.random() * (arrayLength - 2));

      console.log(`I will shuffle ${numberOfDestinationsToShuffle} destinations of ${this.solutionForGeneticAlgorithm[i].name}`);


      for (let j = 0; j < numberOfDestinationsToShuffle - 1; j++) {

        const numberOfDestinationsKeptInTheArray: number = originalVehicle.visitedPlaces.length;
        //  the destination's index we want to move to an another route
        const selectedDestinationsIndex: number = Math.floor(Math.random() * ((numberOfDestinationsKeptInTheArray - 1) - 1)) + 1;

        const destinationToShuffle: City = originalVehicle.visitedPlaces[selectedDestinationsIndex];

        // the vehicle's index we want to move the chose city
        let selectedVehiclesIndexWeWantToShuffleTo: number = i;

        while (selectedVehiclesIndexWeWantToShuffleTo === i) {
          selectedVehiclesIndexWeWantToShuffleTo = Math.floor(Math.random() * (this.solutionForGeneticAlgorithm.length - 1));

          if (this.solutionForGeneticAlgorithm.length == 2) {
            i === 0 ? selectedVehiclesIndexWeWantToShuffleTo = 1 : selectedVehiclesIndexWeWantToShuffleTo = 0;;
          }
        }
        const shuffleToAnAnotherVehicleLength: number = this.solutionForGeneticAlgorithm[selectedVehiclesIndexWeWantToShuffleTo].visitedPlaces.length;

        const lastCity: City = this.solutionForGeneticAlgorithm[selectedVehiclesIndexWeWantToShuffleTo].visitedPlaces[shuffleToAnAnotherVehicleLength - 1];
        this.solutionForGeneticAlgorithm[selectedVehiclesIndexWeWantToShuffleTo].visitedPlaces.pop;
        this.solutionForGeneticAlgorithm[selectedVehiclesIndexWeWantToShuffleTo].visitedPlaces.push(destinationToShuffle);
        this.solutionForGeneticAlgorithm[selectedVehiclesIndexWeWantToShuffleTo].visitedPlaces.push(lastCity);

        // delete the chosen destination from the original vehicle's route
        this.solutionForGeneticAlgorithm[i].visitedPlaces.splice(selectedDestinationsIndex, 1);
      }
    };
  };

  private _shuffleEachVehiclesRoute(): void {

    for (let i = 0; i < this.solutionForGeneticAlgorithm.length; i++) {

      const selectedVehicle: Vehicle = this.solutionForGeneticAlgorithm[i];
      const arrayLength: number = selectedVehicle.visitedPlaces.length;
      const numberOfDestinationsToShuffle: number = Math.floor(Math.random() * (arrayLength - 2));

      for (let j = 0; j < numberOfDestinationsToShuffle - 1; j++) {


        const numberOfDestinationsKeptInTheArray: number = selectedVehicle.visitedPlaces.length;
        const selectedDestinationsIndex: number = Math.floor(Math.random() * ((numberOfDestinationsKeptInTheArray - 1) - 1)) + 1;

        const selectedCity: City = selectedVehicle.visitedPlaces[selectedDestinationsIndex];


        let switchToAnAnotherCityIndex: number = selectedDestinationsIndex;

        while (switchToAnAnotherCityIndex === selectedDestinationsIndex) {
          switchToAnAnotherCityIndex = Math.floor(Math.random() * ((arrayLength - 1) - 1)) + 1;
        };

        const cityToSwitchWithSelectedCity: City = selectedVehicle.visitedPlaces[switchToAnAnotherCityIndex];

        this.solutionForGeneticAlgorithm[i].visitedPlaces[selectedDestinationsIndex] = cityToSwitchWithSelectedCity;
        this.solutionForGeneticAlgorithm[i].visitedPlaces[switchToAnAnotherCityIndex] = selectedCity;
      };
    };

  };

  private _patchVehicleRoutes(): void {
    this.solutionForGeneticAlgorithm.forEach(solution => {
      const destinationSet: Set<City> = new Set<City>();
      solution.visitedPlaces.forEach(vp => {
        destinationSet.add(vp);
      });
      const correctedRoute: City[] = [];

      destinationSet.forEach(dest => {
        correctedRoute.push(dest);
      });

      solution.visitedPlaces = correctedRoute;
      solution.visitedPlaces.push(this.baseSolution[0].visitedPlaces[0]);

    });
  };

  private _calculateDistanceTakenByEachVehicle() {
    this.solutionForGeneticAlgorithm.forEach(solution => {
      solution.distanceTaken = this.distanceCalculatorService.calculateDistanceOfVehicleRoute(solution);
    })
  };

  private _logSolutionForGentic(): void {
    console.log("Finished with base solution");

    const afterBase : Vehicle[] = [...this.solutionForGeneticAlgorithm];
    
    afterBase.forEach(ab => {
      console.log(ab.name);
      
      ab.visitedPlaces.forEach(vp => {
        console.log(vp);
        
      });
    });
  };

  private _whatPercentOf(numA : number, numB : number) : number{
    return (numA / numB) * 100;
  }

}

type Test = {
  numberOfGenerations: number,
  averageDistance : number,
};
