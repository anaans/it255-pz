
import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';
import {Router} from '@angular/router';

@Component({
    selector: 'users',
    templateUrl: `./users.component.html`,
})

export class UsersComponent {

    http: Http;
    router: Router;
    postResponse: any;

    listofusers: Object[];

    constructor(http: Http,  router: Router) {
        this.http = http;
        this.router = router;
        let headers = new Headers();
        let $: any;
        http.get('http://localhost/php/getusers.php', {headers: headers})
            .map(res => res.json())
            .subscribe(listofusers => {
                    this.listofusers = listofusers.listofusers;
                    setInterval(function(){
                        $ = window['jQuery'];
                        $('table').DataTable();
                    }.bind(this), 500);
                },
                err => {
                    this.router.navigate(['./UsersPage']);
                }
            );
    }

    public removeUser(item: Number) {
        console.log('Remove: ', item);
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this.http.get('http://localhost/php/deleteuser.php?id=' + item, {headers: headers})
            .subscribe( data => this.postResponse = data,
                err => alert(JSON.stringify(err)),
                () => {
                    if(this.postResponse._body.indexOf('error') === -1) {
                        alert('Uspesno izbrisan korisnik');
                        this.router.navigate(['./LuxuryCarsPage']);
                    }else {
                        alert('Neuspesno izbrisan korisnik');
                    }
                }
            );
        location.reload();
    }

}
