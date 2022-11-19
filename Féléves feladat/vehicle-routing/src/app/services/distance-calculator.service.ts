import { Injectable } from '@angular/core';
import { Coordinate } from '../coordinate type/coordinate.type';
import { Vehicle } from '../vehicle types/vehicle.type';

@Injectable({
  providedIn: 'root'
})
export class DistanceCalculatorService {

  constructor() { }

  public calculateDistance(c1 : Coordinate, c2 : Coordinate) : number{
    return Math.abs(c1.xCoord - c2.xCoord) + Math.abs(c1.yCoord - c2.yCoord);
  };

  public calculateDistanceOfVehicleRoute(vehicle : Vehicle) : number{
    let distanceTaken : number = 0;

    for( let i = 1 ; i < vehicle.visitedPlaces.length; i++){
      const start = vehicle.visitedPlaces[i-1];
      const end = vehicle.visitedPlaces[i];
      distanceTaken += this.calculateDistance(start.coordinates,end.coordinates);
    }

    return distanceTaken;
  };

  public calculateAverageDistance(vehicles : Vehicle[]) : number{
    
    let sumOfDistanceTaken : number = 0;

    vehicles.forEach(vehicle => {

      for( let i = 1 ; i < vehicle.visitedPlaces.length; i++){
        const start = vehicle.visitedPlaces[i-1];
        const end = vehicle.visitedPlaces[i];
        sumOfDistanceTaken += this.calculateDistance(start.coordinates,end.coordinates);
      }
    });

    return sumOfDistanceTaken/vehicles.length;
  }
}
