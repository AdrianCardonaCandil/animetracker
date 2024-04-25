import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ContentComponent } from './components/content/content.component';
import { CharactersComponent } from './components/content/characters/characters.component';
import { EpisodesComponent } from './components/content/episodes/episodes.component';
import { SearchComponent } from './components/search/search.component';
import {TableComponent} from "./components/profile/table/table.component";
import {ProfileComponent} from "./components/profile/profile.component";

export const routes: Routes = [
    {
        'path': "", component: HomeComponent
    },
    {
        'path': "content/:id", component: ContentComponent,
        children:[
            {
                'path':'', redirectTo:'characters', pathMatch:'full'
            },
            {
                'path': "characters", component: CharactersComponent
            },
            {
                'path': "episodes/:page", component: EpisodesComponent
            }
        ]
    },
    {
        'path':'search/:page', component:SearchComponent
    }, { path: "profile/:username", redirectTo: "profile/:username/watching", pathMatch: "full" },
  {
    path: 'profile/:username', component: ProfileComponent,
    children: [
      { path: 'watching', component: TableComponent },
      { path: 'completed', component: TableComponent },
      { path: 'planToWatch', component: TableComponent },
      { path: 'favorites', component: TableComponent },
      { path: 'dropped', component: TableComponent }
    ]
  }
];
