import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-title-overlay',
  templateUrl: './title-overlay.component.html',
  styleUrls: ['./title-overlay.component.css']
})
export class TitleOverlayComponent implements OnInit {

    @Input()
    pageTitle: string;

    @Input()
    categoryTitle: string;

  constructor() { }

  ngOnInit() {
  }

}
