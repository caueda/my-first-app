import { OnInit, Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appBetterHighlight]'
})
export class AppBetterHighlightDirective implements OnInit {
    constructor(private elmentRef: ElementRef, private renderer: Renderer2) {}

    ngOnInit() {
        this.renderer.setStyle(this.elmentRef.nativeElement, 'background-color', 'blue');
    }
}