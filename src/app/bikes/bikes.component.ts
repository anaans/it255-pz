
import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';
import {Router} from '@angular/router';

@Component({
    selector: 'bikes',
    templateUrl: `./bikes.component.html`,
})

export class BikesComponent {

    http: Http;
    router: Router;
    postResponse: any;
    bikes: Object[];

    constructor(http: Http,  router: Router) {
        this.http = http;
        this.router = router;
        let headers = new Headers();
        let $:any;
        http.get('http://localhost/php/getbikes.php', {headers: headers})
         .map(res => res.json())
         .subscribe(bikes => {
         this.bikes = bikes.bikes;
         console.log(this.bikes);
         setInterval(function(){
             $ = window['jQuery'];
         $('table').DataTable();
         }.bind(this), 500);
         },
         err => {
         this.router.navigate(['./UserBikesPage']);
         }
         );
         }

         public removeBike(item: Number) {
         console.log('Remove: ', item);
         let headers = new Headers();
         headers.append('Content-Type', 'application/x-www-form-urlencoded');
         headers.append('token', localStorage.getItem('tokenadmin'));
         this.http.get('http://localhost/php/deletebike.php?lid=' + item, {headers: headers})
         .subscribe( data => this.postResponse = data,
         err => alert(JSON.stringify(err)),
         () => {
         if (this.postResponse._body.indexOf('error') === -1) {
         alert('Uspesno izbrisan bicikl');
         this.router.navigate(['./BikesPage']);
         }else {
         alert('Neuspesno izbrisan bicikl');
         }
         }
         );
         location.reload();
         }

    }