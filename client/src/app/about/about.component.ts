import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  checkoutForm;

  constructor(private renderer: Renderer2, private formBuilder: FormBuilder) {
    this.checkoutForm = this.formBuilder.group({
      email: ''
    });
  }

  ngOnInit() {
  }

  public onIntersection({ target, visible }: { target: Element; visible: boolean }, animationName: string): void {
    if (animationName === 'fadeIn') {
      this.renderer.addClass(target, visible ? 'fadeIn' : 'notFadeIn');
      this.renderer.removeClass(target, visible ? 'notFadeIn' : 'fadeIn');
    } else {
      this.renderer.addClass(target, visible ? 'fadeInUp' : 'notFadeIn');
      this.renderer.removeClass(target, visible ? 'notFadeIn' : 'fadeInUp');
    }
  }

  onSubmit(customerData) {
    // Process checkout data here
    this.checkoutForm.reset();

    console.warn('Your order has been submitted', customerData);
  }

}
