import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.scss'],
})
export class AddButtonComponent {
  @Output() clickReceived = new EventEmitter<void>();

  click(): void {
    this.clickReceived.emit();
  }
}
