import { Directive, OnInit, ElementRef } from '@angular/core';

@Directive({
    selector: '[appHighlight]'
})
export class AppHighlightDirective implements OnInit{
    constructor(private elementRef: ElementRef) {
    }
    ngOnInit() {
        this.elementRef.nativeElement.style.backgroundColor='yellow';
    }
}