import { Injectable } from '@angular/core';
import { Vehicle } from '../vehicle types/vehicle.type';

@Injectable({
  providedIn: 'root'
})
export class VehicleGeneratorService {

  private _numberOfVehicles : Vehicle[] = [];
  constructor() { }

  public get numberOfVehicles() : Vehicle[]{
    return this._numberOfVehicles;
  }

  addVehicles(amount : number){
    for(let i = 0 ; i< amount ; i++){
      this._numberOfVehicles.push( new Vehicle());
    }
  }

}
