
import {Component} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';
import {Router} from '@angular/router';

@Component({
    selector: 'register',
    templateUrl: `./register.component.html`,
})

export class RegisterComponent {

    http: Http;
    router: Router;
    registerForm: FormGroup;
    data: string;
    postResponse: string;

    constructor(http: Http, router: Router) {
        this.http = http;
        this.router = router;

        if (localStorage.getItem('token') != null) {
            this.router.navigate(['']);
        }

        this.registerForm = new FormGroup({
            username: new FormControl(),
            password: new FormControl(),
            firstname: new FormControl(),
            lastname: new FormControl(),
            address: new FormControl(),
            city: new FormControl(),
            email: new FormControl(),
            phone: new FormControl(),
			hobi: new FormControl()
            
        });
    }

   onRegister(): void {
        this.data = 'username=' + this.registerForm.value.username + '&password=' + this.registerForm.value.password
            + '&firstname=' + this.registerForm.value.firstname + '&lastname=' + this.registerForm.value.lastname + '&address='
            + this.registerForm.value.address + '&city=' + this.registerForm.value.city + '&email=' + this.registerForm.value.email
            + '&phone=' + this.registerForm.value.phone + '&hobi=' + this.registerForm.value.hobi;
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this.http.post('http://localhost/php/registerservice.php', this.data, {headers: headers})
            .map(res => res)
            .subscribe( data => this.postResponse,
                err => {
                    let obj = JSON.parse(err._body);
                    document.getElementsByClassName('alert')[0].innerHTML = obj.error.split('\\r\\n').join('<br/>').split('\'').join('');
                },
                () => {
                    let obj = JSON.parse(JSON.stringify(this.data));
                    localStorage.setItem('token', obj.token);
                    this.router.navigate(['']);
                }
            );
    }
}
