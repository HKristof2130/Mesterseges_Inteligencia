import { Coordinate } from "../coordinate type/coordinate.type";

export interface City{
    name : string;
    coordinates : Coordinate;
    visited : boolean;
}