"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Blagojevic Milica on 11-Aug-17.
 */
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
require("rxjs/Rx");
var router_1 = require("@angular/router");
var RentComponent = (function () {
    function RentComponent(route, http, router) {
        var _this = this;
        this.http = http;
        this.token = localStorage.getItem('token');
        this.router = router;
        this.route = route;
        if (localStorage.getItem('token') === null) {
            this.router.navigate(['']);
        }
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this.http.get('http://localhost/php/getuserbytoken.php?token=' + this.token, { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            _this.data1 = data.username;
            _this.user = _this.data1.username;
        }, function (err) { return console.log(JSON.stringify(err)); });
        this.route.params.subscribe(function (params) {
            var itemId = params['lid'];
            _this.http.get('http://localhost/php/getbikesbyid.php?lid=' + itemId, { headers: headers }).map(function (res) { return res.json(); }).share()
                .subscribe(function (data) {
                _this.data = data.bikes[0];
                _this.marka = _this.data.marka_type;
                _this.model = _this.data.model_type;
                _this.kategorija = _this.data.kategorija_type;
                _this.cena = _this.data.price;
            }, function (err) {
                _this.router.navigate(['./']);
            });
        });
        this.rentForm = new forms_1.FormGroup({
            username: new forms_1.FormControl({ value: this.user, disabled: true }, forms_1.Validators.required),
            numberofdays: new forms_1.FormControl(),
            marka_type: new forms_1.FormControl({ value: this.marka, disabled: true }, forms_1.Validators.required),
            model_type: new forms_1.FormControl({ value: this.model, disabled: true }, forms_1.Validators.required),
            kategorija_type: new forms_1.FormControl({ value: this.kategorija, disabled: true }, forms_1.Validators.required),
            price: new forms_1.FormControl({ value: this.cena, disabled: true }, forms_1.Validators.required)
        });
    }
    RentComponent.prototype.send = function () {
        var _this = this;
        this.data = 'username=' + this.user + '&marka_type=' + this.marka
            + '&model_type=' + this.model + '&kategorija_type=' + this.kategorija
            + '&numberofdays=' + this.rentForm.value.numberofdays + '&price=' + this.cena;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this.http.post('http://localhost/php/reservation.php', this.data, { headers: headers })
            .map(function (res) { return res; })
            .subscribe(function (data) { return _this.postResponse = data; }, function (err) {
            var obj = JSON.parse(err._body);
            document.getElementsByClassName('alert')[0].innerHTML = obj.error.split('\\r\\n').join('<br/>').split('\'').join('');
        }, function () {
            _this.router.navigate(['./']);
            alert('Succssesful Reservation');
        });
    };
    return RentComponent;
}());
RentComponent = __decorate([
    core_1.Component({
        selector: 'rent',
        templateUrl: "./rent.component.html",
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, http_1.Http, router_1.Router])
], RentComponent);
exports.RentComponent = RentComponent;
//# sourceMappingURL=rent.component.js.map