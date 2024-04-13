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
  @Input() options: {Name:string, Genres:string[], Year:number, Season:string, Format:string} = {Name:'', Genres:[], Year:0, Season:'', Format:''}
  @Output() optionsChange = new EventEmitter();

  // Function to get the current season of the year.
  getSeason = (d:Date) => Math.floor((d.getMonth() / 12 * 4)) % 4;

  /* Handler for data emmited from the search bar */
  emitOptions(item:optionNames, value:string|number) {
    switch(item){
      case 'Name':
        if (this.tracker !== true) this.modeHandler('normal');
        this.options[item] = this.options[item] === String(value) ? '' : String(value); break;
      case 'Genres':
        if (this.tracker !== true) this.modeHandler('normal');
        this.options[item].includes(String(value)) ? this.options[item].splice(this.options[item].findIndex(elem => elem === value), 1) : this.options[item].push(String(value)); break;
      case 'Year':
        if (this.tracker !== false) this.modeHandler('time');
        if (this.options[item] === value){this.optionsCleanup(["Season"]); this.options[item] = 0}
        else {
          this.options[item] = Number(value);
          this.options.Season = this.options.Season === '' ? ['Winter', 'Spring', 'Summer', 'Autumn'][this.getSeason(new Date())] : this.options.Season;
        };
        break;
      case 'Season':
        if (this.tracker !== false) this.modeHandler('time');
        if (this.options[item] === String(value)){this.optionsCleanup(["Year"]); this.options[item] = ''}
        else {
          this.options[item] = String(value);
          this.options.Year = this.options.Year === 0 ? new Date().getFullYear() : this.options.Year;
        };
        break;
      case 'Format':
        this.options[item] = this.options[item] === String(value) ? '' : String(value); break;
      }
    this.optionsChange.emit({...this.options});
  }

  optionsCleanup(items:optionNames[]){
    items.forEach(elem => elem === "Genres" ? this.options[elem].length = 0 : elem === "Year" ? this.options[elem] = 0 : this.options[elem] = '');
  }

  // Input Component to Observe
  @ViewChild('searchinput') searchInput!:ElementRef;
  ngAfterViewInit(): void {
    fromEvent(this.searchInput.nativeElement, 'keyup').pipe(debounceTime(1000)).subscribe(()=>{
      this.emitOptions('Name', String(this.name.value));
    })
  }

  // Variables to track the current search mode in wich we are in.
  searchMode = ''; tracker:boolean|undefined = undefined;

  modeHandler(mode:'normal'|'time'){
    if(mode === 'normal') {
      this.optionsCleanup(["Year", "Season"]); this.searchMode = "normal"; this.tracker = true;
    } else {
      this.optionsCleanup(["Name", "Genres"]); this.searchMode = "time"; this.name.reset(); this.tracker = false;
    }
  }
}