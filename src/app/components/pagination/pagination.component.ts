import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { queryParams } from 'src/app/utils/consts/routes';

const { PRIVACY_FILTER_QUERY } = queryParams;

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent {
  @Input() config?: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
  };
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  pageChange(newPage: number) {
    this.router.navigate([], {
      queryParams: {
        page: newPage,
        privacyFilter:
          this.activatedRoute.snapshot.queryParamMap.get(PRIVACY_FILTER_QUERY),
      },
    });
  }
}
