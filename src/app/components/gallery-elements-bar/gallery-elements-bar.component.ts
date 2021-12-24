import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery-elements-bar',
  templateUrl: './gallery-elements-bar.component.html',
  styleUrls: ['./gallery-elements-bar.component.css']
})
export class GalleryElementsBarComponent implements OnInit {

  @Input() isAvaliable: boolean | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
