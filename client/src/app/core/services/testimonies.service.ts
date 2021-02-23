import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TestimoniesService {
  constructor(private http: HttpClient) {
  }

  loadTestimonies() {
    return this.http.get('/api/testimonies');
  }
}
