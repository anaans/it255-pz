
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

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

const routes: Routes = [
    { path: '', redirectTo: '/MainPage', pathMatch: 'full'},
    { path: 'MainPage', component: MainPageComponent},
    { path: 'AboutUs', component: AboutUsComponent},
    { path: 'RegisterPage', component: RegisterComponent},
    { path: 'LoginPage', component: LoginComponent},
    { path: 'BikesPage', component: BikesComponent},
    { path: 'ReservationPage', component: ReservationComponent},
    { path: 'RentPage/:lid', component: RentComponent },
    { path: 'AddBikePage', component: AddBikeComponent},
    { path: 'UsersPage', component: UsersComponent},
    { path: 'UserBikesPage', component: UserBikesComponent}
]

@NgModule ({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})


export class AppRoutingModule {

}
