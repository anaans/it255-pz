
import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';
import {ActivatedRoute, Router, Params} from '@angular/router';

@Component({
    selector: 'rent',
    templateUrl: `./rent.component.html`,
})

export class RentComponent {

    http: Http;
    router: Router;
    route: ActivatedRoute;
    rentForm: FormGroup;
    data: any;
    data1: any;
    postResponse: any;
    user: any;
    marka: any;
    model: any;
    kategorija: any;
    cena: any;
    token: string;

    constructor(route: ActivatedRoute, http: Http, router: Router) {
        this.http = http;
        this.token = localStorage.getItem('token');
        this.router = router;
        this.route = route;

        if (localStorage.getItem('token') === null) {
            this.router.navigate(['']);
        }

        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

       this.http.get('http://localhost/php/getuserbytoken.php?token=' + this.token, { headers: headers })
            .map(res => res.json())
            .subscribe(data => {
                    this.data1 = data.username;
                    this.user = this.data1.username;
                },
                err => console.log(JSON.stringify(err)));

        this.route.params.subscribe((params: Params) => {
            let itemId = params['lid'];
            this.http.get('http://localhost/php/getbikesbyid.php?lid=' + itemId, {headers: headers}).map(res => res.json()).share()
                .subscribe(data => {
                        this.data = data.bikes[0];
                        this.marka = this.data.marka_type;
                        this.model = this.data.model_type;
                        this.kategorija = this.data.kategorija_type;
                        this.cena = this.data.price;
                    },
                    err => {
                        this.router.navigate(['./']);
                    }
                );
        });

        this.rentForm = new FormGroup({
            username: new FormControl({value: this.user, disabled: true}, Validators.required),
            numberofdays: new FormControl(),
            marka_type: new FormControl({value: this.marka, disabled: true}, Validators.required),
            model_type: new FormControl({value: this.model, disabled: true}, Validators.required),
            kategorija_type: new FormControl({value: this.kategorija, disabled: true}, Validators.required),
            price: new FormControl({value: this.cena, disabled: true}, Validators.required)
        });

    }

    send(): void {

        this.data = 'username=' + this.user + '&marka_type=' + this.marka
            + '&model_type=' + this.model + '&kategorija_type=' + this.kategorija
            + '&numberofdays=' + this.rentForm.value.numberofdays + '&price=' + this.cena;
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this.http.post('http://localhost/php/reservation.php', this.data, {headers: headers})
            .map(res => res)
            .subscribe( data => this.postResponse = data,
                err => {
                    let obj = JSON.parse(err._body);
                    document.getElementsByClassName('alert')[0].innerHTML = obj.error.split('\\r\\n').join('<br/>').split('\'').join('');
                },
                () => {
                    this.router.navigate(['./']);
                    alert ('Succssesful Reservation');
                }
            );
    }
}
