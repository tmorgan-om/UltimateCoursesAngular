import {Component} from "@angular/core";
import {Passenger} from "../../models/passenger.interface";
import {PassengerDashboardService} from "../../passenger-dashboard.service";
import {Router} from "@angular/router";

@Component({
  selector: 'passenger-dashboard',
  templateUrl: 'passenger-dashboard.component.html'
})
export class PassengerDashboardComponent {
  passengers: Passenger[] = []

  constructor(private passengerService: PassengerDashboardService,
              private router: Router) {
    this.passengerService.getPassengers().subscribe(pax => this.passengers = pax)
  }

  handleRemove(passengerID: number) {
    this.passengerService.removePassenger(passengerID)
      .subscribe(() => {
        this.passengers = this.passengers.filter(pax => pax.id !== passengerID)
      })
  }

  handleEdit([newPassenger, changes]: [Passenger, Set<string>]) {
    this.passengerService.updatePassenger(newPassenger)
      .subscribe(updatedPassenger => {
        this.passengers = this.passengers.map(oldPassenger => {
          if (oldPassenger.id === updatedPassenger.id) {
            let mergedPassenger = Object.assign({}, oldPassenger)
            changes.forEach(key => mergedPassenger[key] = updatedPassenger[key])
            return mergedPassenger
          } else return oldPassenger
        })
      })
  }

  handleView(passengerID: number) {
    this.router.navigate(['passengers', passengerID])
  }
}
