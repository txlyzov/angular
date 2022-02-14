import { Component } from '@angular/core';
import { ImageFromDatabaseInterface } from 'src/app/models/table-models/image-interface';
import { ImagesService } from 'src/app/services/images/images.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseWithMetaInterface } from 'src/app/models/response-with-meta-interface';
import { queryParams } from 'src/app/utils/consts/routes';

const { PAGE_QUERY } = queryParams;
const DEFAULT_PAGE_NUMBER = 1;
const ITEMS_PER_PAGE = 16;
const DEFAULT_TOTAL_ITEMS_NUMBER = 0;

@Component({
  templateUrl: 'public-images.component.html',
  styleUrls: ['public-images.component.css'],
})
export class PublicImagesComponent {
  public images!: ImageFromDatabaseInterface[];
  config!: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
  };
  lastSearchGoal?: string;

  constructor(
    private imageService: ImagesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.config = {
      currentPage: DEFAULT_PAGE_NUMBER,
      itemsPerPage: ITEMS_PER_PAGE,
      totalItems: DEFAULT_TOTAL_ITEMS_NUMBER,
    };
    activatedRoute.queryParams.subscribe((params) => {
      this.config.currentPage = params[PAGE_QUERY] || DEFAULT_PAGE_NUMBER;
      this.getImages();
    });
  }

  public getImages(searchGoal?: string): void {
    if (this.lastSearchGoal != searchGoal) {
      this.config.currentPage = DEFAULT_PAGE_NUMBER;
      this.lastSearchGoal = searchGoal;

      this.router.navigate([], {
        queryParams: { page: DEFAULT_PAGE_NUMBER },
      });
    }
    this.imageService
      .getPublicImages(
        this.config.currentPage,
        this.config.itemsPerPage,
        searchGoal,
      )
      .subscribe(
        (response: ResponseWithMetaInterface) => {
          this.config.totalItems = response.meta.count;
          this.images = response.data.rows;
        },
        (err: HttpErrorResponse) => {
          alert(err.message);
        },
      );
  }

  public openLink(url: string) {
    window.open(url, '_blank');
  }
}
