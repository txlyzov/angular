import { Component } from '@angular/core';
import { ImageFromDatabaseInterface } from 'src/app/models/table-models/image-interface';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { UserImagesService } from 'src/app/services/user-images/user-images.service';
import { TokenStorageService } from 'src/app/utils/token-storage/token-storage.service';
import { ResponseWithMetaInterface } from 'src/app/models/response-with-meta-interface';
import { ActivatedRoute, Router } from '@angular/router';
import { queryParams } from 'src/app/utils/consts/query-params';
import * as activatedRouteUtil from 'src/app/utils/other/activated-route-util';

const { PAGE_QUERY, PRIVACY_FILTER_QUERY, SEARCH_GOAL_QUERY } = queryParams;
const DEFAULT_PAGE_NUMBER = 1;
const ITEMS_PER_PAGE = 16;
const DEFAULT_TOTAL_ITEMS_NUMBER = 0;

@Component({
  templateUrl: 'user-images.component.html',
  styleUrls: ['user-images.component.css'],
})
export class UserImagesComponent {
  public images!: ImageFromDatabaseInterface[];
  public imageToEdit!: ImageFromDatabaseInterface;
  public imageToDelete!: ImageFromDatabaseInterface;
  config!: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
  };
  lastSearchGoal?: string | null;
  lastPrivacyFilter?: string | null;

  constructor(
    private userImagesService: UserImagesService,
    private tokenStorageService: TokenStorageService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.config = {
      currentPage: DEFAULT_PAGE_NUMBER,
      itemsPerPage: ITEMS_PER_PAGE,
      totalItems: DEFAULT_TOTAL_ITEMS_NUMBER,
    };
    this.activatedRoute.queryParams.subscribe((params) => {
      this.config.currentPage = params[PAGE_QUERY] || DEFAULT_PAGE_NUMBER;
      this.getImages();
    });
  }

  public getImages(): void {
    const token = this.tokenStorageService.getToken().getValue();

    if (!token) {
      return this.tokenStorageService.errorSignOut();
    }

    const privacyFilter = activatedRouteUtil.getQueryParamValue(
      this.activatedRoute,
      PRIVACY_FILTER_QUERY,
    );
    const searchGoal = activatedRouteUtil.getQueryParamValue(
      this.activatedRoute,
      SEARCH_GOAL_QUERY,
    );

    this.userImagesService
      .getUserImages(
        token,
        this.config.currentPage,
        this.config.itemsPerPage,
        searchGoal,
        privacyFilter,
      )
      .subscribe(
        (response: ResponseWithMetaInterface) => {
          this.config.totalItems = response.meta.count;
          this.images = response.data.rows;
        },
        (err: HttpErrorResponse) => {
          if (err.status === HttpStatusCode.Forbidden) {
            return this.tokenStorageService.errorSignOut();
          }

          return alert(err.message);
        },
      );

    return;
  }

  public onOpenModal(image: ImageFromDatabaseInterface | null) {
    if (image) {
      this.imageToDelete = image;

      return;
    }

    alert('Image not exist!');

    return this.getImages();
  }

  public openLink(url: string) {
    window.open(url, '_blank');
  }
}
