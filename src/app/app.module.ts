import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainPageComponent } from './mainpage/mainPage.component';
import { AboutUsComponent } from './aboutus/aboutUs.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { BikesComponent } from './bikes/bikes.component';
import { RentComponent } from './rent/rent.component';
import { AddBikeComponent } from './addbike/addBike.component';
import { UsersComponent } from './users/users.component';
import { UserBikesComponent } from './userbikes/userBikes.component';
import { ReservationComponent } from './reservation/reservation.component';

import {AppRoutingModule} from './app-routing.module';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpModule
  ],
  declarations: [
      AppComponent,
      HeaderComponent,
      MainPageComponent,
      AboutUsComponent,
      RegisterComponent,
      LoginComponent,
      BikesComponent,
      RentComponent,
      AddBikeComponent,
      UsersComponent,
      UserBikesComponent,
      ReservationComponent
  ],
  providers: [
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
