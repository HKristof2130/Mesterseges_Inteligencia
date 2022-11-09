import { City } from "../city-type/city.type";
import { Coordinate } from "../coordinate type/coordinate.type";
import { DistanceCalculatorService } from "../services/distance-calculator.service";


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

    private readonly distanceCalculatorSerice : DistanceCalculatorService = new DistanceCalculatorService();

    constructor( ){}

    public move(city : City, distance : number) : void{
        this.position.xCoord = city.coordinates.xCoord;
        this.position.yCoord = city.coordinates.yCoord;
        this.distanceTaken += distance;
        this.visitedPlaces.push(city);
    };

    public getClosestLocation() : number[]{

        return [];
    };

    public returnToStartingPosition() : void{
        const distance : number = this.distanceCalculatorSerice.calculateDistance(this.position,this.startingPosition);
        this.distanceTaken += distance;
        this.position = this.startingPosition;
    }
    
}