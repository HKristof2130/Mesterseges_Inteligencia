import { Injectable } from '@angular/core';
import { Coordinate } from '../coordinate type/coordinate.type';

@Injectable({
  providedIn: 'root'
})
export class DistanceCalculatorService {

  constructor() { }

  public calculateDistance(c1 : Coordinate, c2 : Coordinate) : number{
    return Math.abs(c1.xCoord - c2.xCoord) + Math.abs(c2.yCoord - c2.yCoord);
  }
}
