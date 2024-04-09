import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

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
    Genres:new Array<String>,
    Year:'',
    Season:'',
    Format:new Array<String>
  }
  @Output() optionsChange = new EventEmitter();

  changedOptions(key:string, value:string|String) {
    switch(key){
      case 'Name': case 'Year': case 'Season':
        this.options[key] = ''
        break
      case 'Genres': case 'Format':
        this.options[key].splice(this.options[key].findIndex(elem => elem === value), 1);
    }
    this.optionsChange.emit(structuredClone(this.options));
  }
}
