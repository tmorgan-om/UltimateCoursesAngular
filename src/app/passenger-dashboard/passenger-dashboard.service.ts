import {Passenger} from "./models/passenger.interface";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

const PASSENGER_API = '/api/passengers'

@Injectable()
export class PassengerDashboardService {
  constructor(private HTTP: HttpClient) {
  }

  getPassengers(): Observable<Passenger[]> {
    return this.HTTP.get<Passenger[]>(PASSENGER_API)
  }

  updatePassenger(passenger: Passenger): Observable<Passenger> {
    return this.HTTP.put<Passenger>(`${PASSENGER_API}/${passenger.id}`, passenger)
  }

  removePassenger(ID: number): Observable<Passenger> {
    return this.HTTP.delete<Passenger>(`${PASSENGER_API}/${ID}`)
  }

  getPassenger(ID: number): Observable<Passenger> {
    return this.HTTP.get<Passenger>(`${PASSENGER_API}/${ID}`)
  }
}
