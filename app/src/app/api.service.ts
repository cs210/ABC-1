import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API_KEY = 'e40d07f00b094602953cc3bf8537477e';

  constructor(private httpClient: HttpClient) { }

  getNews(){
    return this.httpClient.get(`http://newsapi.org/v2/top-headlines?country=us&apiKey=${this.API_KEY}`);
  }

  getTimeline(){
    return this.httpClient.get(`http://newsapi.org/v2/top-headlines?sources=abc-news&q=coronavirus&from=2020-03-01&apiKey=${this.API_KEY}`);
    }
}
