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
var http_1 = require("@angular/http");
require("rxjs/Rx");
var router_1 = require("@angular/router");
var BikesComponent = (function () {
    function BikesComponent(http, router) {
        var _this = this;
        this.http = http;
        this.router = router;
        var headers = new http_1.Headers();
        var $;
        http.get('http://localhost/php/getbikes.php', { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (bikes) {
            _this.bikes = bikes.bikes;
            console.log(_this.bikes);
            setInterval(function () {
                $ = window['jQuery'];
                $('table').DataTable();
            }.bind(_this), 500);
        }, function (err) {
            _this.router.navigate(['./UserBikesPage']);
        });
    }
    BikesComponent.prototype.removeBike = function (item) {
        var _this = this;
        console.log('Remove: ', item);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('token', localStorage.getItem('tokenadmin'));
        this.http.get('http://localhost/php/deletebike.php?lid=' + item, { headers: headers })
            .subscribe(function (data) { return _this.postResponse = data; }, function (err) { return alert(JSON.stringify(err)); }, function () {
            if (_this.postResponse._body.indexOf('error') === -1) {
                alert('Uspesno izbrisan bicikl');
                _this.router.navigate(['./BikesPage']);
            }
            else {
                alert('Neuspesno izbrisan bicikl');
            }
        });
        location.reload();
    };
    return BikesComponent;
}());
BikesComponent = __decorate([
    core_1.Component({
        selector: 'bikes',
        templateUrl: "./bikes.component.html",
    }),
    __metadata("design:paramtypes", [http_1.Http, router_1.Router])
], BikesComponent);
exports.BikesComponent = BikesComponent;
//# sourceMappingURL=bikes.component.js.map