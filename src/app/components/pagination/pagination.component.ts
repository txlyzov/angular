import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { regularExpressions } from 'src/app/utils/consts/regular-expressions';

const { LINK_WITHOUT_QUERIES_REG_EXP } = regularExpressions;

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
  constructor(private route: ActivatedRoute, private router: Router) {}

  pageChange(newPage: number) {
    const regex = new RegExp(LINK_WITHOUT_QUERIES_REG_EXP);

    this.router.navigate([regex.exec(this.router.url)![0]], {
      queryParams: { page: newPage },
    });
  }
}
