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
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
require("rxjs/Rx");
var router_1 = require("@angular/router");
var RegisterComponent = (function () {
    function RegisterComponent(http, router) {
        this.http = http;
        this.router = router;
        if (localStorage.getItem('token') != null) {
            this.router.navigate(['']);
        }
        this.registerForm = new forms_1.FormGroup({
            username: new forms_1.FormControl(),
            password: new forms_1.FormControl(),
            firstname: new forms_1.FormControl(),
            lastname: new forms_1.FormControl(),
            address: new forms_1.FormControl(),
            city: new forms_1.FormControl(),
            email: new forms_1.FormControl(),
            phone: new forms_1.FormControl(),
            hobi: new forms_1.FormControl()
        });
    }
    RegisterComponent.prototype.onRegister = function () {
        var _this = this;
        this.data = 'username=' + this.registerForm.value.username + '&password=' + this.registerForm.value.password
            + '&firstname=' + this.registerForm.value.firstname + '&lastname=' + this.registerForm.value.lastname + '&address='
            + this.registerForm.value.address + '&city=' + this.registerForm.value.city + '&email=' + this.registerForm.value.email
            + '&phone=' + this.registerForm.value.phone + '&hobi=' + this.registerForm.value.hobi;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this.http.post('http://localhost/php/registerservice.php', this.data, { headers: headers })
            .map(function (res) { return res; })
            .subscribe(function (data) { return _this.postResponse; }, function (err) {
            var obj = JSON.parse(err._body);
            document.getElementsByClassName('alert')[0].innerHTML = obj.error.split('\\r\\n').join('<br/>').split('\'').join('');
        }, function () {
            var obj = JSON.parse(JSON.stringify(_this.data));
            localStorage.setItem('token', obj.token);
            _this.router.navigate(['']);
        });
    };
    return RegisterComponent;
}());
RegisterComponent = __decorate([
    core_1.Component({
        selector: 'register',
        templateUrl: "./register.component.html",
    }),
    __metadata("design:paramtypes", [http_1.Http, router_1.Router])
], RegisterComponent);
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map