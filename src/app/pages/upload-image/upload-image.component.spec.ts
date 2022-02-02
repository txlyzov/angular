import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { UserImagesService } from 'src/app/services/user-images/user-images.service';
import { TokenStorageService } from 'src/app/utils/token-storage/token-storage.service';
import { errorsTexts, testValues as TV } from 'src/app/utils/consts/consts';
import { componentId as CID } from './upload-image-consts';

import { UploadImageComponent } from './upload-image.component';

describe('UploadImageComponent', () => {
  let component: UploadImageComponent;
  let fixture: ComponentFixture<UploadImageComponent>;
  let spyEvent: jasmine.Spy<() => void>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule, ReactiveFormsModule],
      declarations: [UploadImageComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    if (spyEvent) {
      spyEvent.calls.reset();
    }
  });

  describe('UI tests', () => {
    it('Upload button should be pushed with correct form filling(no empty fields)', () => {
      const button = fixture.nativeElement.querySelector(
        '#' + CID.SUBMIT_BUTTON,
      );
      const inputName = fixture.nativeElement.querySelector(
        '#' + CID.INPUT_IMAGE_NAME,
      );
      const inputLink = fixture.nativeElement.querySelector(
        '#' + CID.INPUT_IMAGE_URL,
      );
      const inputDescription = fixture.nativeElement.querySelector(
        '#' + CID.INPUT_IMAGE_DESCRIPTION,
      );
      const inputImagePrivacy = fixture.nativeElement.querySelector(
        '#' + CID.INPUT_IMAGE_PRIVACY,
      );

      spyEvent = spyOn(component, 'submit');
      inputName.value = TV.STRING_1;
      inputLink.value = TV.LINK_2;
      component.isImageUrlValid = true;
      inputDescription.value = TV.STRING_3;

      inputName.dispatchEvent(new Event('input'));
      inputLink.dispatchEvent(new Event('input'));
      inputDescription.dispatchEvent(new Event('input'));

      // TODO: Investigate why form can not receive value from checkbox in test
      inputImagePrivacy.click();
      expect(inputImagePrivacy.checked).toBeTruthy();
      component.image.isPrivate = true;
      fixture.detectChanges();
      button.click();

      expect(spyEvent).toHaveBeenCalledTimes(1);
    });

    it('Upload button should be pushed with correct form filling(empty description field)', () => {
      const button = fixture.nativeElement.querySelector(
        '#' + CID.SUBMIT_BUTTON,
      );
      const inputName = fixture.nativeElement.querySelector(
        '#' + CID.INPUT_IMAGE_NAME,
      );
      const inputLink = fixture.nativeElement.querySelector(
        '#' + CID.INPUT_IMAGE_URL,
      );
      const inputDescription = fixture.nativeElement.querySelector(
        '#' + CID.INPUT_IMAGE_DESCRIPTION,
      );
      const inputImagePrivacy = fixture.nativeElement.querySelector(
        '#' + CID.INPUT_IMAGE_PRIVACY,
      );

      spyEvent = spyOn(component, 'submit');
      inputName.value = TV.STRING_1;
      inputLink.value = TV.LINK_2;
      component.isImageUrlValid = true;
      inputDescription.value = TV.EMPTY_STRING;

      inputName.dispatchEvent(new Event('input'));
      inputLink.dispatchEvent(new Event('input'));
      inputDescription.dispatchEvent(new Event('input'));

      // TODO: Investigate why form can not receive value from checkbox in test
      inputImagePrivacy.click();
      expect(inputImagePrivacy.checked).toBeTruthy();
      component.image.isPrivate = true;
      fixture.detectChanges();
      button.click();

      expect(spyEvent).toHaveBeenCalledTimes(1);
    });

    it('Upload button should NOT be pushed without correct form filling (link validation failed)', () => {
      const button = fixture.nativeElement.querySelector(
        '#' + CID.SUBMIT_BUTTON,
      );
      const inputName = fixture.nativeElement.querySelector(
        '#' + CID.INPUT_IMAGE_NAME,
      );
      const inputLink = fixture.nativeElement.querySelector(
        '#' + CID.INPUT_IMAGE_URL,
      );
      const inputDescription = fixture.nativeElement.querySelector(
        '#' + CID.INPUT_IMAGE_DESCRIPTION,
      );

      spyEvent = spyOn(component, 'submit');
      inputName.value = TV.STRING_1;
      inputLink.value = TV.STRING_2;
      component.isImageUrlValid = false;
      inputDescription.value = TV.STRING_3;

      inputName.dispatchEvent(new Event('input'));
      inputLink.dispatchEvent(new Event('input'));
      inputDescription.dispatchEvent(new Event('input'));

      fixture.detectChanges();
      button.click();

      expect(spyEvent).not.toHaveBeenCalled();
    });

    it('Upload button should be pushed with correct form filling(empty  field)', () => {
      const button = fixture.nativeElement.querySelector(
        '#' + CID.SUBMIT_BUTTON,
      );
      const inputName = fixture.nativeElement.querySelector(
        '#' + CID.INPUT_IMAGE_NAME,
      );
      const inputLink = fixture.nativeElement.querySelector(
        '#' + CID.INPUT_IMAGE_URL,
      );
      const inputDescription = fixture.nativeElement.querySelector(
        '#' + CID.INPUT_IMAGE_DESCRIPTION,
      );
      const inputImagePrivacy = fixture.nativeElement.querySelector(
        '#' + CID.INPUT_IMAGE_PRIVACY,
      );

      spyEvent = spyOn(component, 'submit');
      inputName.value = TV.EMPTY_STRING;
      inputLink.value = TV.LINK_2;
      component.isImageUrlValid = true;
      inputDescription.value = TV.STRING_3;

      inputName.dispatchEvent(new Event('input'));
      inputLink.dispatchEvent(new Event('input'));
      inputDescription.dispatchEvent(new Event('input'));

      // TODO: Investigate why form can not receive value from checkbox in test
      inputImagePrivacy.click();
      expect(inputImagePrivacy.checked).toBeTruthy();
      component.image.isPrivate = true;
      fixture.detectChanges();
      button.click();

      expect(spyEvent).not.toHaveBeenCalled();
    });
  });

  describe('Logic tests', () => {
    it('should test previewName(name) function', () => {
      component.image.name = TV.EMPTY_STRING;
      component.previewName(TV.STRING_1);

      expect(component.image.name).toBe(TV.STRING_1);
    });

    it('should test previewLink(link) function', () => {
      component.image.url = TV.EMPTY_STRING;
      component.previewLink(TV.LINK_1);

      expect(component.image.url).toBe(TV.LINK_1);
    });

    it('should test previewDescription(description) function', () => {
      component.image.description = TV.EMPTY_STRING;
      component.previewDescription(TV.STRING_1);

      expect(component.image.description).toBe(TV.STRING_1);
    });

    it('should test setImageUrlValidStatus(status) function', () => {
      component.isImageUrlValid = false;
      component.setImageUrlValidStatus(true);

      expect(component.isImageUrlValid).toBeTruthy();
    });

    it('should test submit() function (tokenStorageService.errorSignOut() call)', () => {
      const tokenStorageService = TestBed.get(TokenStorageService);
      tokenStorageService.saveToken(TV.EMPTY_STRING);
      spyEvent = spyOn(tokenStorageService, 'errorSignOut');

      fixture.detectChanges();
      component.submit();

      expect(spyEvent).toHaveBeenCalledTimes(1);
    });

    it('should test submit() function (invalid image link alert)', () => {
      const tokenStorageService = TestBed.get(TokenStorageService);
      spyOn(window, 'alert');
      tokenStorageService.saveToken(TV.AUTH_TOKEN_1);
      component.isImageUrlValid = false;

      fixture.detectChanges();
      component.submit();

      expect(window.alert).toHaveBeenCalledWith(errorsTexts.IMG_LINK_ERROR);
    });

    it('should test submit() function (userImageService.createImage(imageData, token) call)', () => {
      const tokenStorageService = TestBed.get(TokenStorageService);
      const userImageService = TestBed.get(UserImagesService);
      tokenStorageService.saveToken(TV.AUTH_TOKEN_1);

      const inputName = fixture.nativeElement.querySelector(
        '#' + CID.INPUT_IMAGE_NAME,
      );
      const inputLink = fixture.nativeElement.querySelector(
        '#' + CID.INPUT_IMAGE_URL,
      );
      const inputDescription = fixture.nativeElement.querySelector(
        '#' + CID.INPUT_IMAGE_DESCRIPTION,
      );

      inputName.value = TV.EMPTY_STRING;
      inputLink.value = TV.LINK_2;
      component.isImageUrlValid = true;
      inputDescription.value = TV.STRING_3;

      inputName.dispatchEvent(new Event('input'));
      inputLink.dispatchEvent(new Event('input'));
      inputDescription.dispatchEvent(new Event('input'));

      spyEvent = spyOn(userImageService, 'createImage').and.returnValue({
        subscribe: () => {},  // eslint-disable-line
      });
      fixture.detectChanges();

      component.submit();

      expect(spyEvent).toHaveBeenCalledTimes(1);
    });

    it('should create component', () => {
      expect(component).toBeTruthy();
    });
  });
});
