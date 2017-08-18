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
var http_1 = require("@angular/http");
require("rxjs/Rx");
var router_1 = require("@angular/router");
var ReservationComponent = (function () {
    function ReservationComponent(http, router) {
        var _this = this;
        this.http = http;
        this.router = router;
        var headers = new http_1.Headers();
        var $;
        http.get('http://localhost/php/getreservation.php', { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (reservation) {
            _this.reservation = reservation.reservation;
            setInterval(function () {
                $ = window['jQuery'];
                $('table').DataTable();
            }.bind(_this), 500);
        }, function (err) {
            _this.router.navigate(['./ReservationPage']);
        });
    }
    ReservationComponent.prototype.remove = function (item) {
        var _this = this;
        console.log('Remove: ', item);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this.http.get('http://localhost/php/deletereservation.php?rid=' + item, { headers: headers })
            .subscribe(function (data) { return _this.postResponse = data; }, function (err) { return alert(JSON.stringify(err)); }, function () {
            if (_this.postResponse._body.indexOf('error') !== 1) {
                alert('Uspesno izbrisana rezervacija');
                _this.router.navigate(['./ReservationPage']);
            }
            else {
                alert('Neuspesno izbrisana rezervacija');
            }
        });
        location.reload();
    };
    return ReservationComponent;
}());
ReservationComponent = __decorate([
    core_1.Component({
        selector: 'reservation',
        templateUrl: "./reservation.component.html",
    }),
    __metadata("design:paramtypes", [http_1.Http, router_1.Router])
], ReservationComponent);
exports.ReservationComponent = ReservationComponent;
//# sourceMappingURL=reservation.component.js.map