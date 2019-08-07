import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from "@angular/core";
import {Passenger} from "../../models/passenger.interface";

type Changes = Set<keyof Omit<Passenger, 'id'>>

@Component({
  selector: 'passenger-detail',
  templateUrl: './passenger-detail.component.html',
  styleUrls: ['./passenger-detail.component.scss']
})
export class PassengerDetailComponent implements OnChanges {
  @Input() passenger: Passenger
  editing = false
  changedFields: Changes = new Set()

  @Output() remove = new EventEmitter<number>()
  @Output() edit = new EventEmitter<[Passenger, Changes]>()
  @Output() view = new EventEmitter<number>()

  constructor() {
  }

  checkedIn(passenger: Passenger): boolean {
    return !!passenger.checkedInDate
  }

  onNameChange(value: string) {
    this.passenger.name = value
    this.changedFields.add('name')
  }

  toggleEdit() {
    if (this.editing)
      this.edit.emit([this.passenger, this.changedFields])
    this.editing = !this.editing
  }

  onRemove() {
    this.remove.emit(this.passenger.id)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.passenger)
      this.passenger = Object.assign({}, changes.passenger.currentValue)
  }

  goToPassenger() {
    this.view.emit(this.passenger.id)
  }
}
