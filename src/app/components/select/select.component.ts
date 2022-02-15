import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { queryParams } from 'src/app/utils/consts/query-params';
import * as activatedRouteUtil from 'src/app/utils/other/activated-route-util';

const DEFAULT_PAGE_NUMBER = 1;
const NOT_SELECTED_PRIVACY_TYPE = 'All';
const { PRIVACY_FILTER_QUERY, SEARCH_GOAL_QUERY } = queryParams;

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
})
export class SelectComponent {
  @Output() triggeredSearchFunc: EventEmitter<string> = new EventEmitter();
  privacyFilter? = NOT_SELECTED_PRIVACY_TYPE;
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    activatedRoute.queryParams.subscribe((params) => {
      this.privacyFilter =
        params[PRIVACY_FILTER_QUERY] || NOT_SELECTED_PRIVACY_TYPE;
    });
  }

  onFilterChange(privacyFilter: string) {
    let queryParams;

    if (privacyFilter !== NOT_SELECTED_PRIVACY_TYPE) {
      queryParams = {
        page: DEFAULT_PAGE_NUMBER,
        privacyFilter,
        searchGoal: activatedRouteUtil.getQueryParamValue(
          this.activatedRoute,
          SEARCH_GOAL_QUERY,
        ),
      };
    } else {
      queryParams = {
        page: DEFAULT_PAGE_NUMBER,
        searchGoal: activatedRouteUtil.getQueryParamValue(
          this.activatedRoute,
          SEARCH_GOAL_QUERY,
        ),
      };
    }

    this.router.navigate([], {
      queryParams,
    });
  }
}
