import { Component, EventEmitter, input, Output, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [FormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent {
  value = '';
  title = output<string>();

  constructor() {}

  onChildValueChange() {
    this.title.emit(this.value);
  }
}
