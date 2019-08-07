import {
  Component, EventEmitter,
  Input,
  OnInit, Output, ViewChild,
} from '@angular/core';
import {Passenger} from "../../models/passenger.interface";
import {NgForm} from "@angular/forms";
import {Baggage} from "../../models/baggage.interface";

interface FormPassenger extends Omit<Passenger, 'id'> {
  checkedIn: boolean
}

@Component({
  selector: 'passenger-form',
  templateUrl: './passenger-form.component.html',
  styleUrls: ['./passenger-form.component.scss']
})
export class PassengerFormComponent implements OnInit {
  @Input() passenger: Passenger
  @Output() update = new EventEmitter<Passenger>()

  @ViewChild('form', {static: false}) form: NgForm

  baggage: Baggage[] = [
    {key: 'none', value: "No baggage"},
    {key: 'stuffy', value: "Stuffy passenger"},
    {key: 'hand', value: "Hand baggage"},
    {key: 'hold', value: "Hold baggage"},
    {key: 'hand-hold', value: "Hand and hold baggage"},
  ]

  get checkedIn(): boolean {
    if (!this.passenger) return false
    return !!this.passenger.checkedInDate
  }

  constructor() {
  }

  ngOnInit() {
  }

  checkedInChanged(value: boolean) {
    if (value) this.form.value.checkedInDate = new Date()
    else this.form.value.checkedInDate = null
  }

  handleSubmit(passenger: FormPassenger, isValid: boolean) {
    if (!isValid) return

    let passengerWithID = Object.assign({}, this.passenger, passenger, {checkedIn: undefined})
    this.update.emit(passengerWithID)
  }
}
