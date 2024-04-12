import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild, WritableSignal, input, signal} from '@angular/core';
import { optionsBuilder } from "./optionsBuilder";
import { CommonModule, NgStyle } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, fromEvent} from 'rxjs';

type optionNames = 'Name'|'Genres'|'Year'|'Season'|'Format';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgStyle],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css'
})
export class SearchbarComponent implements AfterViewInit{

  /* Margin depending on what page why are in */
  page = input();

  /* Handling buttons for displaying or not dropwdown menus.*/
  optionsBuilder = new optionsBuilder();
  buttonsSelected = Array(4).fill(false);
  handleFilterClick = (option:number) => {
    this.buttonsSelected[option] = !this.buttonsSelected[option];
  }

  /* Declarations to handle emitted data from the search bar */
  name = new FormControl('');
  @Input() options: {Name:string, Genres:string[], Year:string, Season:string, Format:string} = {
    Name:'',
    Genres:[],
    Year:'',
    Season:'',
    Format:''
  }
  @Output() optionsChange = new EventEmitter();

  // Function to get the current season of the year.
  getSeason = (d:Date) => Math.floor((d.getMonth() / 12 * 4)) % 4;

  /* Handler for data emmited from the search bar */
  emitOptions(item:optionNames, value?:String|null) {
    this.filtersCleanup(item);
    if (item == "Genres"){
      this.options[item].includes(String(value)) ? this.options[item].splice(this.options[item].findIndex(elem => elem === value), 1) : this.options[item].push(String(value));
    } else {
      if (item == "Year") this.options.Season = this.options.Season === '' ? ['Winter', 'Spring', 'Summer', 'Autumn'][this.getSeason(new Date())] : this.options.Season;
      if (item == "Season") this.options.Year = this.options.Year === '' ? String(new Date().getFullYear()) : this.options.Year;
      this.options[item] === String(value) ? this.options[item] = '' : this.options[item] = String(value);
    }
    this.optionsChange.emit({...this.options});
  }

  // Cleans filters when a new option is selected
  filtersCleanup(item:optionNames) {
    switch(item){
      case 'Name': case 'Genres':
        if(this.tracker === true) break;
        else this.options.Year = ''; this.options.Season = ''; this.searchMode = 'normal'; this.tracker = true; break;
      case 'Year': case 'Season':
        if(this.tracker === false) break;
        else this.options.Name = ''; this.options.Genres.length = 0; this.name.reset(); this.searchMode = 'time'; this.tracker = false;
    }
  }

  // Input Component to Observe
  @ViewChild('searchinput') searchInput!:ElementRef;
  ngAfterViewInit(): void {
    fromEvent(this.searchInput.nativeElement, 'keyup').pipe(debounceTime(1000)).subscribe(()=>{
      this.emitOptions('Name', this.name.value);
    })
  }

  // Variables to track the current search mode in wich we are in.
  searchMode = ''; tracker:boolean|undefined = undefined;
  
}