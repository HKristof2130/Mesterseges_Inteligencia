import { City } from "../city-type/city.type";
import { Coordinate } from "../coordinate type/coordinate.type";


export class Vehicle{
    public startingPosition : Coordinate = {
        xCoord : 0,
        yCoord : 0,
    };

    public position : Coordinate = {
        xCoord : 0,
        yCoord : 0,
    };
    
    public visitedPlaces : City[] = [];

    public distanceTaken : number = 0;

    constructor(){}

    public move(coordinate : Coordinate) : void{
        this.position.xCoord = coordinate.xCoord;
        this.position.yCoord = coordinate.yCoord;
    };

    public getClosestLocation() : number[]{

        return [];
    };
    
}