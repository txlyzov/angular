import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { regularExpressions as RE } from 'src/app/utils/consts/consts';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
})
export class PaginationComponent {
  @Input() config?: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
  };
  constructor(private route: ActivatedRoute, private router: Router) {}

  pageChange(newPage: number) {
    const regex = new RegExp(RE.LINK_WITHOUT_QUERIES);

    this.router.navigate([regex.exec(this.router.url)![0]], {
      queryParams: { page: newPage },
    });
  }
}
