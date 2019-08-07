import {Component, OnInit} from '@angular/core';
import {PassengerDashboardService} from "../../passenger-dashboard.service";
import {Passenger} from "../../models/passenger.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'passenger-viewer',
  templateUrl: './passenger-viewer.component.html',
  styleUrls: ['./passenger-viewer.component.scss']
})
export class PassengerViewerComponent implements OnInit {
  private passenger: Passenger

  constructor(private passengerService: PassengerDashboardService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params
      .pipe(switchMap(params => this.passengerService.getPassenger(params.id)))
      .subscribe(passenger => this.passenger = passenger)
  }

  onUpdate(passenger: Passenger) {
    this.passengerService.updatePassenger(passenger)
      .subscribe(passenger => this.passenger = passenger)
  }

  async goBack() {
    await this.router.navigate(['/passengers'])
  }
}
