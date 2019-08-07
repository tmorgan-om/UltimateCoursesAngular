import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app/app.component';
import {PassengerDashboardModule} from "./passenger-dashboard/passenger-dashboard.module";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from './home/home.component';
import {NotFoundComponent} from './not-found/not-found.component';

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: '**', component: NotFoundComponent}
]

@NgModule({
  declarations: [AppComponent, HomeComponent, NotFoundComponent],
  imports: [
    BrowserModule,
    PassengerDashboardModule,
    RouterModule.forRoot(routes)],
  bootstrap: [AppComponent]
})
export class AppModule {
}
