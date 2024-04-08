import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import { optionsBuilder } from "./optionsBuilder";
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, fromEvent} from 'rxjs';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css'
})
export class SearchbarComponent implements AfterViewInit{

  /* Handling buttons for displaying or not dropwdown menus.*/
  optionsBuilder = new optionsBuilder();
  buttonsSelected = Array(4).fill(false);
  handleFilterClick = (option:number) => {
    this.buttonsSelected[option] = !this.buttonsSelected[option];
  }

  /* Declarations to handle emitted data from the search bar */
  name = new FormControl('');
  options:{Name:string, Genres:string[], Year:string, Season:string, Format:string[]} = {
    Name:'',
    Genres:[],
    Year:'',
    Season:'',
    Format:[]
  }
  @Output() itemsEmiiter = new EventEmitter();

  /* Handler for data emmited from the search bar */
  emitOptions(item?:string, value?:String|null) {
      switch(item){
        case 'Name': case 'Year': case 'Season':
          this.options[item] = String(value);
          break;
        case 'Genres': case 'Format':
          if (this.options[item].includes(String(value))) this.options[item] = this.options[item].filter(elem => elem !== value);
          else this.options[item].push(String(value));
      }
      this.itemsEmiiter.emit(this.options);
  }

  // Input Component to Observe
  @ViewChild('searchinput') searchInput!:ElementRef;
  ngAfterViewInit(): void {
    fromEvent(this.searchInput.nativeElement, 'keyup').pipe(debounceTime(1000)).subscribe(()=>{
      this.emitOptions('Name', this.name.value);
    })
  }
  
}