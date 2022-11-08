import { Coordinate } from "../coordinate type/coordinate.type";

export class Vehicle{
    private position : Coordinate = {
        xCoord : 0,
        yCoord : 0,
    };
    public visitedPlaces : number[] = [];

    constructor(){}

    public move(coordinate : Coordinate) : void{
        this.position.xCoord = coordinate.xCoord;
        this.position.yCoord = coordinate.yCoord;
    };

    public getClosestLocation() : number[]{

        return [];
    };
}