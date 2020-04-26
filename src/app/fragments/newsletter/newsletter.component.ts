import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss']
})
export class NewsletterComponent implements OnInit {
  newsLetterForm;

  constructor(private formBuilder: FormBuilder) {
    this.newsLetterForm = this.formBuilder.group({
      email: ''
    });
  }

  ngOnInit() {
  }

  onSubmit(customerData) {
    // Process checkout data here
    this.newsLetterForm.reset();

    console.warn('Subscribed', customerData);
  }

}
