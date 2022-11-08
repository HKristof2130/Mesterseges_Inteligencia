import { Injectable } from '@angular/core';
import { Vehicle } from '../vehicle types/vehicle.type';

@Injectable({
  providedIn: 'root'
})
export class VehicleGeneratorService {

  private _vehicles : Vehicle[] = [];
  constructor() { }

  public get vehicles() : Vehicle[]{
    return this._vehicles;
  }

  public addVehicles(amount : number){
    for(let i = 0 ; i < amount ; i++){
      this._vehicles.push( new Vehicle());
    }
  }

  public printOutVehicles(){
    console.log(this._vehicles);
    
  }

}
