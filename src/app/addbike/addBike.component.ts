
import {Component} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';
import {Router} from '@angular/router';

@Component({
    selector: 'addBike',
    templateUrl: `./addBike.component.html`,
})

export class AddBikeComponent {

    http: Http;
    router: Router;
    addForm: FormGroup;
    data: any;
    postResponse: any;
    marke: any;
    modeli: any;
    kategorije: any;

    constructor(http: Http, router: Router) {
        this.http = http;
        this.router = router;

        if (localStorage.getItem('token') != null) {
            this.router.navigate(['']);
        }

        this.addForm = new FormGroup({
            marka_id: new FormControl(),
            model_id: new FormControl(),
            kategorija_id: new FormControl(),
            price: new FormControl(),
            options: new FormControl()
        });

       let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        http.get('http://localhost/php/getmarke.php', {headers: headers})
            .map(res => res.json()).share()
            .subscribe( marke => {
                    this.marke = marke.marke;
                    console.log('Marke:' + this.marke);
                },
                err => {
                    this.router.navigate(['./AddBikePage']);
                }
            );

        http.get('http://localhost/php/getmodeli.php', {headers: headers})
            .map(res => res.json()).share()
            .subscribe(modeli => {
                    this.modeli = modeli.modeli;
                },
                err => {
                    this.router.navigate(['./AddBikePage']);
                }
            );

        http.get('http://localhost/php/getkategorija.php', {headers: headers})
            .map(res => res.json()).share()
            .subscribe( kategorije => {
                    this.kategorije = kategorije.kategorije;
                    console.log('Kategorije:' + this.kategorije);
                },
                err => {
                    this.router.navigate(['./AddBikePage']);
                }
            );
    }

    onAddBike(): void {
        this.data = 'marka_id=' + this.addForm.value.marka_id + '&model_id=' + this.addForm.value.model_id
            + '&kategorija_id=' + this.addForm.value.kategorija_id + '&price=' + this.addForm.value.price
            + '&options=' + this.addForm.value.options;
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this.http.post('http://localhost/php/addbike.php', this.data, {headers: headers})
            .map(res => res)
            .subscribe( data => this.postResponse = data,
                err => alert(JSON.stringify(err)),
                () => {
                    if (this.postResponse._body.indexOf('error') === -1) {
                        alert('Uspesno dodavanje bicikla');
                        this.router.navigate(['./BikesPage']);
                    }else {
                        alert('Neuspesno dodavanje bicikla');
                    }
                }
            );
    }
}
