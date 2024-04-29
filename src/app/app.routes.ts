import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ContentComponent } from './components/content/content.component';
import { CharactersComponent } from './components/content/characters/characters.component';
import { EpisodesComponent } from './components/content/episodes/episodes.component';
import { SearchComponent } from './components/search/search.component';
import { RankingComponent } from './components/ranking/ranking.component';

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
    },
    {
        'path':'ranking', component:RankingComponent
    }
];
