import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[visibleIf]'
})
export class VisibleIfDirective {
  @Input() visibleIf: boolean;

  constructor(  
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
    ) { }

  ngOnChanges(){

  }

}
