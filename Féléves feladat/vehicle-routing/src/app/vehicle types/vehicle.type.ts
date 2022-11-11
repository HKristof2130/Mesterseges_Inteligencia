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

    public setStartingPosition(city : City){
        this.startingPosition = city.coordinates;
        this.visitedPlaces.push(city);
    };

    public move(city : City) : void{
        this.position.xCoord = city.coordinates.xCoord;
        this.position.yCoord = city.coordinates.yCoord;
        this.distanceTaken += this.distanceCalculatorSerice.calculateDistance(this.position,city.coordinates);
        this.visitedPlaces.push(city);
    };

    public returnToStartingPosition(city : City) : void{
        const distance : number = this.distanceCalculatorSerice.calculateDistance(this.position,city.coordinates);
        this.distanceTaken += distance;
        this.position = city.coordinates;
        this.visitedPlaces.push(city);
    };
    
}