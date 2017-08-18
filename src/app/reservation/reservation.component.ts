
import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';
import {Router} from '@angular/router';

@Component({
    selector: 'reservation',
    templateUrl: `./reservation.component.html`,
})

export class ReservationComponent {

    http: Http;
    router: Router;
    postResponse: any;

    reservation: Object[];

    constructor(http: Http,  router: Router) {
        this.http = http;
        this.router = router;
        let headers = new Headers();
        let $:any;
        http.get('http://localhost/php/getreservation.php', {headers: headers})
            .map(res => res.json())
            .subscribe(reservation => {
                    this.reservation = reservation.reservation;
                    setInterval(function(){
                        $ = window['jQuery'];
                        $('table').DataTable();
                    }.bind(this), 500);
                },
                err => {
                    this.router.navigate(['./ReservationPage']);
                }
            );
    }

    public remove(item: Number) {
        console.log('Remove: ', item);
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this.http.get('http://localhost/php/deletereservation.php?rid=' + item, {headers: headers})
            .subscribe( data => this.postResponse = data,
                err => alert(JSON.stringify(err)),
                () => {
                    if(this.postResponse._body.indexOf('error') !== 1) {
                        alert('Uspesno izbrisana rezervacija');
                        this.router.navigate(['./ReservationPage']);
                    }else {
                        alert('Neuspesno izbrisana rezervacija');
                    }
                }
            );
        location.reload();
    }
}
