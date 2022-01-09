import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appMyAutoFocus]'
})
export class MyAutoFocusDirective implements OnInit{

  constructor(private elementRef: ElementRef) { };

  ngOnInit(): void {
    this.elementRef.nativeElement.focus();
  }
}
