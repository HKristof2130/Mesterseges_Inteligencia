import { Injectable } from '@angular/core';
import { City } from '../city-type/city.type';
import { Coordinate } from '../coordinate type/coordinate.type';

@Injectable({
  providedIn: 'root'
})
export class DestinatonsGeneratorService {

  private static readonly MIN_LIMIT_OF_Y_COORD = 1;
  private static readonly MAX_LIMIT_OF_Y_COORD = 60;

  private static readonly MIN_LIMIT_OF_X_COORD = 1;
  private static readonly MAX_LIMIT_OF_X_COORD = 60;

  private static readonly city_names = ["Aberdeen", "Abilene", "Akron", "Albany", "Albuquerque", "Alexandria", "Allentown", "Amarillo", "Anaheim", "Anchorage", "Ann Arbor", "Antioch", "Apple Valley", "Appleton", "Arlington", "Arvada", "Asheville", "Athens", "Atlanta", "Atlantic City", "Augusta", "Aurora", "Austin", "Bakersfield", "Baltimore", "Barnstable", "Baton Rouge", "Beaumont", "Bel Air", "Bellevue", "Berkeley", "Bethlehem", "Billings", "Birmingham", "Bloomington", "Boise", "Boise City", "Bonita Springs", "Boston", "Boulder", "Bradenton", "Bremerton", "Bridgeport", "Brighton", "Brownsville", "Bryan", "Buffalo", "Burbank", "Burlington", "Cambridge", "Canton", "Cape Coral", "Carrollton", "Cary", "Cathedral City", "Cedar Rapids", "Champaign", "Chandler", "Charleston", "Charlotte", "Chattanooga", "Chesapeake", "Chicago", "Chula Vista", "Cincinnati", "Clarke County", "Clarksville", "Clearwater", "Cleveland", "College Station", "Colorado Springs", "Columbia", "Columbus", "Concord", "Coral Springs", "Corona", "Corpus Christi", "Costa Mesa", "Dallas", "Daly City", "Danbury", "Davenport", "Davidson County", "Dayton", "Daytona Beach", "Deltona", "Denton", "Denver", "Des Moines", "Detroit", "Downey", "Duluth", "Durham", "El Monte", "El Paso", "Elizabeth", "Elk Grove", "Elkhart", "Erie", "Escondido", "Eugene", "Evansville", "Fairfield", "Fargo", "Fayetteville", "Fitchburg", "Flint", "Fontana", "Fort Collins", "Fort Lauderdale", "Fort Smith", "Fort Walton Beach", "Fort Wayne", "Fort Worth", "Frederick", "Fremont", "Fresno", "Fullerton", "Gainesville", "Garden Grove", "Garland", "Gastonia", "Gilbert", "Glendale", "Grand Prairie", "Grand Rapids", "Grayslake", "Green Bay", "GreenBay", "Greensboro", "Greenville", "Gulfport-Biloxi", "Hagerstown", "Hampton", "Harlingen", "Harrisburg", "Hartford", "Havre de Grace", "Hayward", "Hemet", "Henderson", "Hesperia", "Hialeah", "Hickory", "High Point", "Hollywood", "Honolulu", "Houma", "Houston", "Howell", "Huntington", "Huntington Beach", "Huntsville", "Independence", "Indianapolis", "Inglewood", "Irvine", "Irving", "Jackson", "Jacksonville", "Jefferson", "Jersey City", "Johnson City", "Joliet", "Kailua", "Kalamazoo", "Kaneohe", "Kansas City", "Kennewick", "Kenosha", "Killeen", "Kissimmee", "Knoxville", "Lacey", "Lafayette", "Lake Charles", "Lakeland", "Lakewood", "Lancaster", "Lansing", "Laredo", "Las Cruces", "Las Vegas", "Layton", "Leominster", "Lewisville", "Lexington", "Lincoln", "Little Rock", "Long Beach", "Lorain", "Los Angeles", "Louisville", "Lowell", "Lubbock", "Macon", "Madison", "Manchester", "Marina", "Marysville", "McAllen", "McHenry", "Medford", "Melbourne", "Memphis", "Merced", "Mesa", "Mesquite", "Miami", "Milwaukee", "Minneapolis", "Miramar", "Mission Viejo", "Mobile", "Modesto", "Monroe", "Monterey", "Montgomery", "Moreno Valley", "Murfreesboro", "Murrieta", "Muskegon", "Myrtle Beach", "Naperville", "Naples", "Nashua", "Nashville", "New Bedford", "New Haven", "New London", "New Orleans", "New York", "New York City", "Newark", "Newburgh", "Newport News", "Norfolk", "Normal", "Norman", "North Charleston", "North Las Vegas", "North Port", "Norwalk", "Norwich", "Oakland", "Ocala", "Oceanside", "Odessa", "Ogden", "Oklahoma City", "Olathe", "Olympia", "Omaha", "Ontario", "Orange", "Orem", "Orlando", "Overland Park", "Oxnard", "Palm Bay", "Palm Springs", "Palmdale", "Panama City", "Pasadena", "Paterson", "Pembroke Pines", "Pensacola", "Peoria", "Philadelphia", "Phoenix", "Pittsburgh", "Plano", "Pomona", "Pompano Beach", "Port Arthur", "Port Orange", "Port Saint Lucie", "Port St. Lucie", "Portland", "Portsmouth", "Poughkeepsie", "Providence", "Provo", "Pueblo", "Punta Gorda", "Racine", "Raleigh", "Rancho Cucamonga", "Reading", "Redding", "Reno", "Richland", "Richmond", "Richmond County", "Riverside", "Roanoke", "Rochester", "Rockford", "Roseville", "Round Lake Beach", "Sacramento", "Saginaw", "Saint Louis", "Saint Paul", "Saint Petersburg", "Salem", "Salinas", "Salt Lake City", "San Antonio", "San Bernardino", "San Buenaventura", "San Diego", "San Francisco", "San Jose", "Santa Ana", "Santa Barbara", "Santa Clara", "Santa Clarita", "Santa Cruz", "Santa Maria", "Santa Rosa", "Sarasota", "Savannah", "Scottsdale", "Scranton", "Seaside", "Seattle", "Sebastian", "Shreveport", "Simi Valley", "Sioux City", "Sioux Falls", "South Bend", "South Lyon", "Spartanburg", "Spokane", "Springdale", "Springfield", "St. Louis", "St. Paul", "St. Petersburg", "Stamford", "Sterling Heights", "Stockton", "Sunnyvale", "Syracuse", "Tacoma", "Tallahassee", "Tampa", "Temecula", "Tempe", "Thornton", "Thousand Oaks", "Toledo", "Topeka", "Torrance", "Trenton", "Tucson", "Tulsa", "Tuscaloosa", "Tyler", "Utica", "Vallejo", "Vancouver", "Vero Beach", "Victorville", "Virginia Beach", "Visalia", "Waco", "Warren", "Washington", "Waterbury", "Waterloo", "West Covina", "West Valley City", "Westminster", "Wichita", "Wilmington", "Winston", "Winter Haven", "Worcester", "Yakima", "Yonkers", "York", "Youngstown"];

  private static destinationCounter: number = 0;
  public destinations: City[]= [];

  constructor() { }

  public getGeneratedCities() : City[] {
    return this.destinations;
  }

  public printOutDestinations(): void {
    this.destinations.forEach(destination => {
      console.log(`${destination.name} xCoord: ${destination.coordinates.xCoord} yCoord: ${destination.coordinates.yCoord} visited: ${destination.visited}`);
    });
  }

  public generateDestinations(amountOfDestinationsInEachQuadrant: number): void {

    DestinatonsGeneratorService.destinationCounter = 0;
    this.destinations.splice(0,this.destinations.length);

    this.destinations.push({
      name: DestinatonsGeneratorService.city_names[DestinatonsGeneratorService.destinationCounter++],
      coordinates: { xCoord: 0, yCoord: 0 },
      visited : false,
    });


    this._generateDestinationsInTheFirstQuadrant(amountOfDestinationsInEachQuadrant);
    this._generateDestinationsInTheSecondQuadrant(amountOfDestinationsInEachQuadrant);
    this._generateDestinationsInTheThirdQuadrant(amountOfDestinationsInEachQuadrant);
    this._generateDestinationsInTheFourthQuadrant(amountOfDestinationsInEachQuadrant);



    console.log("destinations generated");
    console.log(DestinatonsGeneratorService.city_names.length);
    

  }

  private _generateDestinationsInTheFirstQuadrant(amountOfDestination: number) {

    for (let i = 0; i < amountOfDestination; i++) {

      //console.log("gen new dest");
      //generate random pos for each destination
      let uniqeCoordinate: boolean = false;
      let tmpXCoord: number = 0;
      let tmpYCoord: number = 0;

      while (!uniqeCoordinate) {
        tmpXCoord = Math.floor(Math.random() * (DestinatonsGeneratorService.MAX_LIMIT_OF_X_COORD - DestinatonsGeneratorService.MIN_LIMIT_OF_X_COORD + 1)) + DestinatonsGeneratorService.MIN_LIMIT_OF_X_COORD;
        tmpYCoord = Math.floor(Math.random() * (DestinatonsGeneratorService.MAX_LIMIT_OF_Y_COORD - DestinatonsGeneratorService.MIN_LIMIT_OF_Y_COORD + 1)) + DestinatonsGeneratorService.MIN_LIMIT_OF_Y_COORD;

        this.destinations.forEach(destination => {
          uniqeCoordinate = true;
          if (destination.coordinates.xCoord === tmpXCoord && destination.coordinates.yCoord === tmpYCoord) {
            uniqeCoordinate = false;
          }
        });
      }

      //console.log("dest generated");

      this.destinations.push(
        {
          name: DestinatonsGeneratorService.city_names[DestinatonsGeneratorService.destinationCounter++],
          coordinates: { xCoord: tmpXCoord, yCoord: tmpYCoord },
          visited : false,
        }
      );
    }
  }

  private _generateDestinationsInTheSecondQuadrant(amountOfDestination: number) {

    for (let i = 0; i < amountOfDestination; i++) {

      //console.log("gen new dest");
      //generate random pos for each destination
      let uniqeCoordinate: boolean = false;
      let tmpXCoord: number = 0;
      let tmpYCoord: number = 0;

      while (!uniqeCoordinate) {
        tmpXCoord = Math.floor(Math.random() * (DestinatonsGeneratorService.MAX_LIMIT_OF_X_COORD - DestinatonsGeneratorService.MIN_LIMIT_OF_X_COORD + 1)) + DestinatonsGeneratorService.MIN_LIMIT_OF_X_COORD;
        tmpYCoord = (-1) * (Math.floor(Math.random() * (DestinatonsGeneratorService.MAX_LIMIT_OF_Y_COORD - DestinatonsGeneratorService.MIN_LIMIT_OF_Y_COORD + 1)) + DestinatonsGeneratorService.MIN_LIMIT_OF_Y_COORD);

        this.destinations.forEach(destination => {
          uniqeCoordinate = true;
          if (destination.coordinates.xCoord === tmpXCoord && destination.coordinates.yCoord === tmpYCoord) {
            uniqeCoordinate = false;
          }
        });
      }

      //console.log("dest generated");

      this.destinations.push(
        {
          name: DestinatonsGeneratorService.city_names[DestinatonsGeneratorService.destinationCounter++],
          coordinates: { xCoord: tmpXCoord, yCoord: tmpYCoord },
          visited : false,
        }
      );
    }
  }

  private _generateDestinationsInTheThirdQuadrant(amountOfDestination: number) {

    for (let i = 0; i < amountOfDestination; i++) {

      //console.log("gen new dest");
      //generate random pos for each destination
      let uniqeCoordinate: boolean = false;
      let tmpXCoord: number = 0;
      let tmpYCoord: number = 0;

      while (!uniqeCoordinate) {
        tmpXCoord = (-1) * (Math.floor(Math.random() * (DestinatonsGeneratorService.MAX_LIMIT_OF_X_COORD - DestinatonsGeneratorService.MIN_LIMIT_OF_X_COORD + 1)) + DestinatonsGeneratorService.MIN_LIMIT_OF_X_COORD);
        tmpYCoord = (-1) * (Math.floor(Math.random() * (DestinatonsGeneratorService.MAX_LIMIT_OF_Y_COORD - DestinatonsGeneratorService.MIN_LIMIT_OF_Y_COORD + 1)) + DestinatonsGeneratorService.MIN_LIMIT_OF_Y_COORD);

        this.destinations.forEach(destination => {
          uniqeCoordinate = true;
          if (destination.coordinates.xCoord === tmpXCoord && destination.coordinates.yCoord === tmpYCoord) {
            uniqeCoordinate = false;
          }
        });
      }

      //console.log("dest generated");

      this.destinations.push(
        {
          name: DestinatonsGeneratorService.city_names[DestinatonsGeneratorService.destinationCounter++],
          coordinates: { xCoord: tmpXCoord, yCoord: tmpYCoord },
          visited : false,
        }
      );
    }
  }

  private _generateDestinationsInTheFourthQuadrant(amountOfDestination: number) {

    for (let i = 0; i < amountOfDestination; i++) {

      //console.log("gen new dest");
      //generate random pos for each destination
      let uniqeCoordinate: boolean = false;
      let tmpXCoord: number = 0;
      let tmpYCoord: number = 0;

      while (!uniqeCoordinate) {
        tmpXCoord = (-1) * (Math.floor(Math.random() * (DestinatonsGeneratorService.MAX_LIMIT_OF_X_COORD - DestinatonsGeneratorService.MIN_LIMIT_OF_X_COORD + 1)) + DestinatonsGeneratorService.MIN_LIMIT_OF_X_COORD);
        tmpYCoord = Math.floor(Math.random() * (DestinatonsGeneratorService.MAX_LIMIT_OF_Y_COORD - DestinatonsGeneratorService.MIN_LIMIT_OF_Y_COORD + 1)) + DestinatonsGeneratorService.MIN_LIMIT_OF_Y_COORD;

        this.destinations.forEach(destination => {
          uniqeCoordinate = true;
          if (destination.coordinates.xCoord === tmpXCoord && destination.coordinates.yCoord === tmpYCoord) {
            uniqeCoordinate = false;
          }
        });
      }

      //console.log("dest generated");

      this.destinations.push(
        {
          name: DestinatonsGeneratorService.city_names[DestinatonsGeneratorService.destinationCounter++],
          coordinates: { xCoord: tmpXCoord, yCoord: tmpYCoord },
          visited : false,
        }
      );
    }
  }
}
