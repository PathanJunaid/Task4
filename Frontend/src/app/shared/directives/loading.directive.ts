import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appLoading]'
})
export class LoadingDirective implements OnChanges {
  @Input() appLoading = false;

  constructor(private el: ElementRef) {}

  ngOnChanges() {
    this.el.nativeElement.style.opacity = this.appLoading ? '0.5' : '1';
    this.el.nativeElement.style.pointerEvents = this.appLoading ? 'none' : 'auto';
  }
}