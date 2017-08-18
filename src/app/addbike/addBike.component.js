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
 * Created by Blagojevic Milica on 13-Aug-17.
 */
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
require("rxjs/Rx");
var router_1 = require("@angular/router");
var AddBikeComponent = (function () {
    function AddBikeComponent(http, router) {
        var _this = this;
        this.http = http;
        this.router = router;
        if (localStorage.getItem('token') != null) {
            this.router.navigate(['']);
        }
        this.addForm = new forms_1.FormGroup({
            marka_id: new forms_1.FormControl(),
            model_id: new forms_1.FormControl(),
            kategorija_id: new forms_1.FormControl(),
            price: new forms_1.FormControl(),
            options: new forms_1.FormControl()
        });
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        http.get('http://localhost/php/getmarke.php', { headers: headers })
            .map(function (res) { return res.json(); }).share()
            .subscribe(function (marke) {
            _this.marke = marke.marke;
            console.log('Marke:' + _this.marke);
        }, function (err) {
            _this.router.navigate(['./AddBikePage']);
        });
        http.get('http://localhost/php/getmodeli.php', { headers: headers })
            .map(function (res) { return res.json(); }).share()
            .subscribe(function (modeli) {
            _this.modeli = modeli.modeli;
        }, function (err) {
            _this.router.navigate(['./AddBikePage']);
        });
        http.get('http://localhost/php/getkategorija.php', { headers: headers })
            .map(function (res) { return res.json(); }).share()
            .subscribe(function (kategorije) {
            _this.kategorije = kategorije.kategorije;
            console.log('Kategorije:' + _this.kategorije);
        }, function (err) {
            _this.router.navigate(['./AddBikePage']);
        });
    }
    AddBikeComponent.prototype.onAddBike = function () {
        var _this = this;
        this.data = 'marka_id=' + this.addForm.value.marka_id + '&model_id=' + this.addForm.value.model_id
            + '&kategorija_id=' + this.addForm.value.kategorija_id + '&price=' + this.addForm.value.price
            + '&options=' + this.addForm.value.options;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this.http.post('http://localhost/php/addbike.php', this.data, { headers: headers })
            .map(function (res) { return res; })
            .subscribe(function (data) { return _this.postResponse = data; }, function (err) { return alert(JSON.stringify(err)); }, function () {
            if (_this.postResponse._body.indexOf('error') === -1) {
                alert('Uspesno dodavanje bicikla');
                _this.router.navigate(['./BikesPage']);
            }
            else {
                alert('Neuspesno dodavanje bicikla');
            }
        });
    };
    return AddBikeComponent;
}());
AddBikeComponent = __decorate([
    core_1.Component({
        selector: 'addBike',
        templateUrl: "./addBike.component.html",
    }),
    __metadata("design:paramtypes", [http_1.Http, router_1.Router])
], AddBikeComponent);
exports.AddBikeComponent = AddBikeComponent;
//# sourceMappingURL=addBike.component.js.map