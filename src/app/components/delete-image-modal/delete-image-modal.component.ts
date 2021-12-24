import { Component, Input, OnInit } from '@angular/core';
import { Image } from '../../models/image';

@Component({
  selector: 'app-delete-image-modal',
  templateUrl: './delete-image-modal.component.html',
  styleUrls: ['./delete-image-modal.component.css']
})
export class DeleteImageModalComponent {

  @Input() image: Image | undefined;
  
}
