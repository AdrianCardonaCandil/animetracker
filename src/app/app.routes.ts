import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ContentComponent } from './components/content/content.component';

export const routes: Routes = [
    {
        'path': "", component: HomeComponent
    },
    {
        'path': "content/:id", component: ContentComponent
    }
];
