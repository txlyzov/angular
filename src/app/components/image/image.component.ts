import { Component, Input, OnInit } from '@angular/core';
import { Image } from '../../models/image';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {


  @Input() image: Image | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  public openLink(url: string | undefined) {
    if(url)
    window.open(url, "_blank");
  }
}
