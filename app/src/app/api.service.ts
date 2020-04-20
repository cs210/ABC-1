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
    return this.httpClient.get(`http://newsapi.org/v2/top-headlines?country=us&q=coronavirus&apiKey=${this.API_KEY}`);
    }

  getCoronavirus(){
    return this.httpClient.get(`http://newsapi.org/v2/top-headlines?country=us&q=coronavirus&apiKey=${this.API_KEY}`);
    }

  getGov(){
    return this.httpClient.get(`http://newsapi.org/v2/top-headlines?country=us&q=president&apiKey=${this.API_KEY}`);
    }

  getEcon(){
    return this.httpClient.get(`http://newsapi.org/v2/top-headlines?country=us&q=employees&apiKey=${this.API_KEY}`);
    }
}
