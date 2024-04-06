import { ChangeDetectionStrategy, Component, EventEmitter, Output, input } from '@angular/core';
import { optionsBuilder } from "./optionsBuilder";
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css'
})
export class SearchbarComponent {
  optionsBuilder = new optionsBuilder();
  buttonsSelected = Array(4).fill(false);
  name = new FormControl('');
  @Output() itemsEmiiter = new EventEmitter();

  handleFilterClick = (option:number) => {
    this.buttonsSelected[option] = !this.buttonsSelected[option];
  }

  emitOptions(optionSelected?: {class:string, value:String}) {
    this.itemsEmiiter.emit(optionSelected ? optionSelected : {class:'Name',value:this.name.value});
  }
}