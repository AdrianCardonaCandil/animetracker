import { ChangeDetectionStrategy, Component, EventEmitter, Output, input } from '@angular/core';
import { optionsBuilder } from "./optionsBuilder";
import { CommonModule } from '@angular/common';
import { Form, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css'
})
export class SearchbarComponent {

  /* Handling buttons for displaying or not dropwdown menus.*/
  optionsBuilder = new optionsBuilder();
  buttonsSelected = Array(4).fill(false);
  handleFilterClick = (option:number) => {
    this.buttonsSelected[option] = !this.buttonsSelected[option];
  }

  /* Declarations to handle emitted data from the search bar */
  name = new FormControl('');
  emittedOptions = {
    Name:String(),
    Genres:new Array<String>,
    Year:String(),
    Season:String(),
    Format: new Array<String>
  }
  @Output() itemsEmiiter = new EventEmitter();

  /* Handler for data emmited from the search bar */
  emitOptions(optionSelected?: {class:string, value:String}) {
    let selected = optionSelected ? optionSelected : {class:'Name', value:this.name.value};
    if (selected.class == "Genres" || selected.class == "Format"){
      if (this.emittedOptions[selected.class].includes(String(selected.value))) {
        this.emittedOptions[selected.class] = this.emittedOptions[selected.class].filter(elem => elem != selected.value)
      } 
        this.emittedOptions[selected.class].push(String(selected.value));
    } else if (selected.class == "Name" || selected.class == "Year" || selected.class == "Season") this.emittedOptions[selected.class] = String(selected.value);
    this.itemsEmiiter.emit(this.emittedOptions);
  }
}