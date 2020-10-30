import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {
  @Input() productPreviewUrl: any;
  uploadedImageUrl = '../../../assets/images/product-details/preview-background.jpg';
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (e: any) => { // called once readAsDataURL is completed
        this.uploadedImageUrl = e.target.result;
      };
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
