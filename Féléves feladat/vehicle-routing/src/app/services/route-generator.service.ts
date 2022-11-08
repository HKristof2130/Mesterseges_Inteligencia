import { Injectable } from '@angular/core';
import { Coordinate } from '../coordinate type/coordinate.type';

@Injectable({
  providedIn: 'root'
})
export class DestinatonsGeneratorService {

  private static readonly MIN_LIMIT_OF_Y_COORD = 20;
  private static readonly MAX_LIMIT_OF_Y_COORD = 40;

  private static readonly MIN_LIMIT_OF_X_COORD = 25;
  private static readonly MAX_LIMIT_OF_X_COORD = 60;

  private static destinationCounter : number = 0;
  private destinations : Map<number,Coordinate> = new Map<number,Coordinate>();

  constructor() { }

  generateDestinations(amountOfDestinations : number) : void{
    
    for(let i = 0 ; i < amountOfDestinations; i++){
      
      //generate random pos for each destination
      const tmpXCoord = Math.floor( Math.random() * (DestinatonsGeneratorService.MAX_LIMIT_OF_X_COORD - DestinatonsGeneratorService.MIN_LIMIT_OF_X_COORD + 1) ) + DestinatonsGeneratorService.MIN_LIMIT_OF_X_COORD;
      const tmpYCoord = Math.floor( Math.random() * (DestinatonsGeneratorService.MAX_LIMIT_OF_Y_COORD - DestinatonsGeneratorService.MIN_LIMIT_OF_Y_COORD + 1) ) + DestinatonsGeneratorService.MIN_LIMIT_OF_Y_COORD;

      this.destinations.set(
        DestinatonsGeneratorService.destinationCounter,
        {
          xCoord : tmpXCoord,
          yCoord : tmpYCoord
        }
      );

    }
     
  }
}
