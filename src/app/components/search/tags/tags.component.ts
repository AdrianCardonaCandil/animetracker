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
    Year:'',
    Season:'',
    Format:''
  }
  @Output() optionsChange = new EventEmitter();

  changedOptions(key:optionNames, value:string|String) {
    if (key == 'Genres'){
      this.options[key].splice(this.options[key].findIndex(elem => elem === value), 1);
    } else this.options[key] = '';
    this.optionsChange.emit(structuredClone(this.options));
  }
}
