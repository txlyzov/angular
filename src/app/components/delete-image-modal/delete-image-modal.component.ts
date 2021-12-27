import { Component, Input } from '@angular/core';
import { Image } from '../../models/image';

@Component({
  selector: 'app-delete-image-modal',
  templateUrl: './delete-image-modal.component.html',
})
export class DeleteImageModalComponent {
  @Input() image: Image | undefined;
}
