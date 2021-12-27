import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-gallery-elements-bar',
  templateUrl: './gallery-elements-bar.component.html',
  styleUrls: ['./gallery-elements-bar.component.css'],
})
export class GalleryElementsBarComponent {
  @Input() isAvaliable: boolean | undefined;
}