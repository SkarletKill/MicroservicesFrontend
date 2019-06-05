import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdsComponent, HomeComponent, NewsComponent, StatisticsComponent} from './containers';
import {ComposersComponent} from './containers/composers/composers.component';
import {CompositionsComponent} from './containers/compositions/compositions.component';
import {AdDetailsComponent, ComposerDetailsComponent, CompositionDetailsComponent, NewsDetailsComponent} from './components';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'composers', component: ComposersComponent },
  { path: 'composer/:term', component: ComposerDetailsComponent },
  { path: 'compositions', component: CompositionsComponent },
  { path: 'composition/:term', component: CompositionDetailsComponent },
  { path: 'advertisement', component: AdsComponent},
  { path: 'advertisement/:term', component: AdDetailsComponent },
  { path: 'news', component: NewsComponent },
  { path: 'news/:term', component: NewsDetailsComponent},
  { path: 'statistics', component: StatisticsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
