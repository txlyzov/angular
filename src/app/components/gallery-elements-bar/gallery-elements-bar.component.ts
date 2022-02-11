import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-gallery-elements-bar',
  templateUrl: './gallery-elements-bar.component.html',
})
export class GalleryElementsBarComponent {
  @Input() isAvaliable: boolean | undefined;
  @Input() config?: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
  };
  @Output() triggeredSearchFunc: EventEmitter<string> = new EventEmitter();

  search(searchGoal: string) {
    this.triggeredSearchFunc.emit(searchGoal);
  }
}
