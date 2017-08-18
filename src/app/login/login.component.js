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
var LoginComponent = (function () {
    function LoginComponent(http, router) {
        this.http = http;
        this.router = router;
        if (localStorage.getItem('token') != null) {
            this.router.navigate(['']);
        }
        this.loginForm = new forms_1.FormGroup({
            username: new forms_1.FormControl(),
            password: new forms_1.FormControl(),
            checkbox: new forms_1.FormControl()
        });
    }
    LoginComponent.prototype.onLogin = function () {
        var _this = this;
        this.data = 'username=' + this.loginForm.value.username + '&password=' + this.loginForm.value.password;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        if (this.loginForm.value.checkbox !== true) {
            this.http.post('http://localhost/php/loginservice.php', this.data, { headers: headers })
                .map(function (res) { return res; })
                .subscribe(function (data) { return _this.postResponse = data; }, function (err) { return alert(JSON.stringify(err)); }, function () {
                if (_this.postResponse._body.indexOf('error') === -1) {
                    var obj = JSON.parse(_this.postResponse._body);
                    localStorage.setItem('token', obj.token);
                    _this.router.navigate(['./MainPage']);
                }
                else {
                    var obj = JSON.parse(_this.postResponse._body);
                    document.getElementsByClassName('alert')[0].innerHTML =
                        obj.error.split('\\r\\n').join('<br/>').split('\'').join('');
                }
            });
        }
        else {
            this.http.post('http://localhost/php/loginadmin.php', this.data, { headers: headers })
                .map(function (res) { return res; })
                .subscribe(function (data) { return _this.postResponse = data; }, function (err) { return alert(JSON.stringify(err)); }, function () {
                if (_this.postResponse._body.indexOf('error') === -1) {
                    var obj = JSON.parse(_this.postResponse._body);
                    localStorage.setItem('tokenadmin', obj.tokenadmin);
                    _this.router.navigate(['./MainPage']);
                }
                else {
                    var obj = JSON.parse(_this.postResponse._body);
                    document.getElementsByClassName('alert')[0].innerHTML =
                        obj.error.split('\\r\\n').join('<br/>').split('\'').join('');
                }
            });
        }
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        selector: 'login',
        templateUrl: "./login.component.html",
    }),
    __metadata("design:paramtypes", [http_1.Http, router_1.Router])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map