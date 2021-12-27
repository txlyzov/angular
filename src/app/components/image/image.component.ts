import { Component, Input } from '@angular/core';
import { Image } from '../../models/image';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css'],
})
export class ImageComponent {
  @Input() image: Image | undefined;

  public openLink(url: string | undefined) {
    if (url) window.open(url, '_blank');
  }
}
