import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
  searchValue?: string;

  constructor(private activatedRoute: ActivatedRoute) {}

  onSearchChange(searchGoal?: string) {
    this.triggeredSearchFunc.emit(searchGoal);
  }
}
