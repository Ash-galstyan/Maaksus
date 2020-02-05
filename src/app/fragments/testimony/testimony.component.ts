import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-testimony',
  templateUrl: './testimony.component.html',
  styleUrls: ['./testimony.component.scss']
})
export class TestimonyComponent implements OnInit {
  config = {
    loop: true,
    effect: 'fade',
    fadeEffect: { crossFade: true }
  };

  constructor() { }

  ngOnInit() {
  }

}