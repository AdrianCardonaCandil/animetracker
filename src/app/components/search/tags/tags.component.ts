import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

type optionNames = 'Name'|'Genres'|'Year'|'Season'|'Format';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css'
})
export class TagsComponent {

  @Input() options = {
    Name:'',
    Genres:[''],
    Year:0,
    Season:'',
    Format:''
  }
  @Output() optionsChange = new EventEmitter();

  changedOptions(key:optionNames, value:string|number) {
    switch(key){
      case 'Genres':
        this.options[key].splice(this.options[key].findIndex(elem => elem === value), 1); break;
      case 'Year':
        this.options.Season = ''; this.options[key] = 0; break;
      case 'Season':
        this.options.Year = 0; this.options[key] = ''; break;
      default:
        this.options[key] = '';
    }
    this.optionsChange.emit({...this.options});
  }
}
