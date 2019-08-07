import {Component, Input} from "@angular/core";
import {Passenger} from "../../models/passenger.interface";

@Component({
  selector: 'passenger-count',
  templateUrl: './passenger-count.component.html'
})
export class PassengerCountComponent {
  @Input() passengers: Passenger[]

  get checkedInCount(): number {
    if (!this.passengers) return 0
    return this.passengers.reduce((sum, pax) => sum + (pax.checkedInDate ? 1 : 0), 0)
  }
}
