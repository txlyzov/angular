import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { queryParams } from 'src/app/utils/consts/query-params';
import * as activatedRouteUtil from 'src/app/utils/other/activated-route-util';

const DEFAULT_PAGE_NUMBER = 1;
const { PRIVACY_FILTER_QUERY, SEARCH_GOAL_QUERY } = queryParams;

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

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    activatedRoute.queryParams.subscribe((params) => {
      this.searchValue = params[SEARCH_GOAL_QUERY] || '';
    });
  }

  onSearchChange(searchGoal?: string) {
    let queryParams;

    if (searchGoal) {
      queryParams = {
        page: DEFAULT_PAGE_NUMBER,
        privacyFilter: activatedRouteUtil.getQueryParamValue(
          this.activatedRoute,
          PRIVACY_FILTER_QUERY,
        ),
        searchGoal,
      };
    } else {
      queryParams = {
        page: DEFAULT_PAGE_NUMBER,
        privacyFilter: activatedRouteUtil.getQueryParamValue(
          this.activatedRoute,
          PRIVACY_FILTER_QUERY,
        ),
      };
    }

    this.router.navigate([], {
      queryParams,
    });
  }
}
