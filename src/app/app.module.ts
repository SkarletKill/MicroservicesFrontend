import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AdsComponent, ComposersComponent, CompositionsComponent, HomeComponent, NewsComponent, StatisticsComponent} from './containers';
import {CommonModule} from '@angular/common';
import {
  AdDetailsComponent,
  ComposerDetailsComponent,
  CompositionDetailsComponent,
  MenuItemComponent,
  NewsDetailsComponent
} from './components';
import {AdsService, ApiService, ComposersService, CompositionsService, NewsService, StatisticsService} from './services';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuItemComponent,
    ComposersComponent,
    CompositionsComponent,
    CompositionDetailsComponent,
    StatisticsComponent,
    NewsComponent,
    AdsComponent,
    ComposerDetailsComponent,
    NewsDetailsComponent,
    AdDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    ApiService,
    ComposersService,
    CompositionsService,
    StatisticsService,
    NewsService,
    AdsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
