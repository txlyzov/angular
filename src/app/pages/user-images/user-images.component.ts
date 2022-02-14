import { Component } from '@angular/core';
import { ImageFromDatabaseInterface } from 'src/app/models/table-models/image-interface';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { UserImagesService } from 'src/app/services/user-images/user-images.service';
import { TokenStorageService } from 'src/app/utils/token-storage/token-storage.service';
import { ResponseWithMetaInterface } from 'src/app/models/response-with-meta-interface';
import { ActivatedRoute, Router } from '@angular/router';
import { queryParams } from 'src/app/utils/consts/routes';

const { PAGE_QUERY, PRIVACY_FILTER_QUERY } = queryParams;
const DEFAULT_PAGE_NUMBER = 1;
const ITEMS_PER_PAGE = 2;
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
  lastSearchGoal?: string;
  privacyFilter?: string | null;

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
    activatedRoute.queryParams.subscribe((params) => {
      this.config.currentPage = params[PAGE_QUERY] || DEFAULT_PAGE_NUMBER;
      this.getImages();
    });
  }

  public getImages(searchGoal?: string): void {
    const token = this.tokenStorageService.getToken().getValue();

    if (token) {
      const privacyFilter =
        this.activatedRoute.snapshot.queryParamMap.get(PRIVACY_FILTER_QUERY);

      if (
        this.lastSearchGoal != searchGoal ||
        this.privacyFilter != privacyFilter
      ) {
        this.config.currentPage = DEFAULT_PAGE_NUMBER;
        this.lastSearchGoal = searchGoal;
        this.privacyFilter = privacyFilter;

        this.router.navigate([], {
          queryParams: {
            page: DEFAULT_PAGE_NUMBER,
            privacyFilter:
              this.activatedRoute.snapshot.queryParamMap.get(
                PRIVACY_FILTER_QUERY,
              ),
          },
        });
      }
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

    return this.tokenStorageService.errorSignOut();
  }

  public onOpenModal(image: ImageFromDatabaseInterface | null) {
    if (image) {
      this.imageToDelete = image;
    }
  }

  public openLink(url: string) {
    window.open(url, '_blank');
  }
}
