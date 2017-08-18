import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component ({
    selector: 'my-header',
    templateUrl: './header.component.html'

})
export class HeaderComponent {

    router: Router;
    isAuth: String;
    isAuthAdmin: String;

    constructor(router: Router) {
        this.router = router;
        router.events.subscribe((val) => {

            if (localStorage.getItem('tokenadmin') !== null) {
                this.isAuthAdmin = 'yes';
            }if (localStorage.getItem('tokenadmin') == null) {
                this.isAuthAdmin = 'no';
            }if (localStorage.getItem('token') !== null) {
                this.isAuth = 'yes';
            }if (localStorage.getItem('token') == null) {
                this.isAuth = 'no';
            }
        });
    }

    onLogout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenadmin');
        this.router.navigate(['./MainPage']);

        if (localStorage.getItem('token') !== null) {
            this.isAuthAdmin = 'yes';
        }if (localStorage.getItem('tokena') == null) {
            this.isAuthAdmin = 'no';
        }if (localStorage.getItem('tokenadmin') !== null) {
            this.isAuth = 'yes';
        }if (localStorage.getItem('tokenadmin') == null) {
            this.isAuth = 'no';
        }
    }
}