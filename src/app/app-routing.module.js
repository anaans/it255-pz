"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var mainPage_component_1 = require("./mainpage/mainPage.component");
var aboutUs_component_1 = require("./aboutus/aboutUs.component");
var register_component_1 = require("./register/register.component");
var login_component_1 = require("./login/login.component");
var bikes_component_1 = require("./bikes/bikes.component");
var rent_component_1 = require("./rent/rent.component");
var addBike_component_1 = require("./addbike/addBike.component");
var users_component_1 = require("./users/users.component");
var userBikes_component_1 = require("./userbikes/userBikes.component");
var reservation_component_1 = require("./reservation/reservation.component");
var routes = [
    { path: '', redirectTo: '/MainPage', pathMatch: 'full' },
    { path: 'MainPage', component: mainPage_component_1.MainPageComponent },
    { path: 'AboutUs', component: aboutUs_component_1.AboutUsComponent },
    { path: 'RegisterPage', component: register_component_1.RegisterComponent },
    { path: 'LoginPage', component: login_component_1.LoginComponent },
    { path: 'BikesPage', component: bikes_component_1.BikesComponent },
    { path: 'ReservationPage', component: reservation_component_1.ReservationComponent },
    { path: 'RentPage/:lid', component: rent_component_1.RentComponent },
    { path: 'AddBikePage', component: addBike_component_1.AddBikeComponent },
    { path: 'UsersPage', component: users_component_1.UsersComponent },
    { path: 'UserBikesPage', component: userBikes_component_1.UserBikesComponent }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forRoot(routes)],
        exports: [router_1.RouterModule]
    })
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map