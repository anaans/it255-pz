"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var app_component_1 = require("./app.component");
var header_component_1 = require("./header/header.component");
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
var app_routing_module_1 = require("./app-routing.module");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule,
            app_routing_module_1.AppRoutingModule,
            http_1.HttpModule
        ],
        declarations: [
            app_component_1.AppComponent,
            header_component_1.HeaderComponent,
            mainPage_component_1.MainPageComponent,
            aboutUs_component_1.AboutUsComponent,
            register_component_1.RegisterComponent,
            login_component_1.LoginComponent,
            bikes_component_1.BikesComponent,
            rent_component_1.RentComponent,
            addBike_component_1.AddBikeComponent,
            users_component_1.UsersComponent,
            userBikes_component_1.UserBikesComponent,
            reservation_component_1.ReservationComponent
        ],
        providers: [],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map