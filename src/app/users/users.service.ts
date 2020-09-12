import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
    activeUsers: string [] = ['Lewis Hamilton', 'Max Verstapen'];
    inactiveUsers: string[] = ['Nicko Huckenberg'];

    setActive(id: number) {
        this.activeUsers.push(this.inactiveUsers[id]);
        this.inactiveUsers.splice(id, 1);
    }

    setInactive(id: number) {
        this.inactiveUsers.push(this.activeUsers[id]);
        this.activeUsers.splice(id, 1);
    }
}