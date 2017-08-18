
import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';
import {Router} from '@angular/router';

@Component({
    selector: 'userBikes',
    templateUrl: `./userBikes.component.html`,
})

export class UserBikesComponent {
    http: Http;
    router: Router;
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

    public edit(item: Number) {
        this.router.navigate(['/RentPage', item]);
    }

}
