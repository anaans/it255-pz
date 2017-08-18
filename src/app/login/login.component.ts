
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';
import {Router} from '@angular/router';

@Component({
    selector: 'login',
    templateUrl: `./login.component.html`,
})

export class LoginComponent {

    http: Http;
    router: Router;
    loginForm: FormGroup;
    data: string;
    postResponse: any;

    constructor(http: Http, router: Router) {
        this.http = http;
        this.router = router;

        if (localStorage.getItem('token') != null) {
            this.router.navigate(['']);
        }

        this.loginForm = new FormGroup({
            username: new FormControl(),
            password: new FormControl(),
            checkbox: new FormControl()
        });
    }

    onLogin(): void {
        this.data = 'username=' + this.loginForm.value.username + '&password=' + this.loginForm.value.password;
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        if (this.loginForm.value.checkbox !== true){
            this.http.post('http://localhost/php/loginservice.php', this.data, {headers: headers})
                .map(res => res)
                .subscribe( data => this.postResponse = data,
                    err => alert(JSON.stringify(err)),
                    () => {
                        if (this.postResponse._body.indexOf('error') === -1) {
                            let obj = JSON.parse(this.postResponse._body);
                            localStorage.setItem('token', obj.token);
                            this.router.navigate(['./MainPage']);
                        } else {
                            let obj = JSON.parse(this.postResponse._body);
                            document.getElementsByClassName('alert')[0].innerHTML =
                                obj.error.split('\\r\\n').join('<br/>').split('\'').join('');
                        }
                    }
                );
        } else {
            this.http.post('http://localhost/php/loginadmin.php', this.data, {headers: headers})
                .map(res => res)
                .subscribe( data => this.postResponse = data,
                    err => alert(JSON.stringify(err)),
                    () => {
                        if (this.postResponse._body.indexOf('error') === -1){
                            let obj = JSON.parse(this.postResponse._body);
                            localStorage.setItem('tokenadmin', obj.tokenadmin);
                            this.router.navigate(['./MainPage']);
                        }else {
                            let obj = JSON.parse(this.postResponse._body);
                            document.getElementsByClassName('alert')[0].innerHTML =
                                obj.error.split('\\r\\n').join('<br/>').split('\'').join('');
                        }

                    }
                );
        }
    }

}
