import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() { }

  ngOnInit(): void {
    // this.subscription = interval(1000).subscribe((next) => {
    //   console.log(next);
    // });
    const customObservalInterval = new Observable((observer) => {
      let count = 0;
      setInterval(() =>{
        observer.next(count);
        ++count;
        // if(count === 2) {
        //   observer.error(new Error("Count === 2"));
        // }
        if(count === 3) {
          observer.complete();
        }


      }, 1000);
    });
    this.subscription = customObservalInterval.pipe(
      map((data: number) => {
        return 'Round ' + (data + 1);
      })
    ).subscribe((count) => {
      console.log(count);
    }, (error) => console.log(error.message), () => console.log('Completed'));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
