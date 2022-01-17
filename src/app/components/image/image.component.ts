import { Component, Input } from '@angular/core';
import { ImageInterface } from 'src/app/models/table-models/image-interface';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css'],
})
export class ImageComponent {
  @Input() image: ImageInterface | undefined;

  public openLink(url: string | undefined) {
    if (url) window.open(url, '_blank');
  }
}
