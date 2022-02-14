import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

const DEFAULT_PAGE_NUMBER = 1;
const NOT_SELECTED_PRIVACY_TYPE = 'All';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
})
export class SelectComponent {
  @Output() triggeredSearchFunc: EventEmitter<string> = new EventEmitter();
  privacyFilter? = NOT_SELECTED_PRIVACY_TYPE;
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  onFilterChange(privacyFilter: string) {
    let queryParams;

    if (privacyFilter !== NOT_SELECTED_PRIVACY_TYPE) {
      queryParams = {
        page: DEFAULT_PAGE_NUMBER,
        privacyFilter,
      };
    } else {
      queryParams = {
        page: DEFAULT_PAGE_NUMBER,
      };
    }

    this.router.navigate([], {
      queryParams,
    });
  }
}
