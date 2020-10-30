import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-frames',
  templateUrl: './frames.component.html',
  styleUrls: ['./frames.component.scss']
})
export class FramesComponent implements OnInit {
  @Output() selectFrame = new EventEmitter();
  frames: any[];

  constructor() { }

  ngOnInit() {
    this.frames = [
      {
        name: 'Black Regular plastic',
        color: '#000000',
        price: '20$'
      },
      {
        name: 'Red Regular plastic',
        color: '#dc3545',
        price: '30$'
      }
    ];
  }

}
