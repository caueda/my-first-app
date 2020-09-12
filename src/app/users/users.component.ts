import { UserService } from './users.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{
    activeUsers: string[];
    inactiveUsers: string[];

    constructor(private userService: UserService){
    }

    ngOnInit(){
        this.activeUsers = this.userService.activeUsers;
        this.inactiveUsers = this.userService.inactiveUsers;
    }

    setActive(id: number) {
        console.log('set active id: ' + id);
        this.userService.setActive(id);
    }

    setInactive(id: number) {
        console.log('set Inactive id: ' + id);
        this.userService.setInactive(id);
    }
}