import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API_KEY = 'e40d07f00b094602953cc3bf8537477e';

  constructor(private httpClient: HttpClient) { }

  getNews(){
    return this.httpClient.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${this.API_KEY}`);
  }

  getABC() {
    return this.httpClient.get('https://abcnews.go.com/configuration/iphonev5-60729246');
  }

  getFromURL(url) {
    console.log(url.slice(0,));
    if (url.slice(0,5) != 'https') {
      url = 'https:'.concat(url.slice(5));
      console.log('NOT SECURE LOL');
    }
    url = '/api/rsidxfeed/79/json?list=section&view=json&segment=iphone&embeds=true&collection=true&focusintocollection=true&caption=true&tagname=true'
    // console.log();
    
    return this.httpClient.get(url);
  }

  getTimeline(){
    return this.httpClient.get(`https://newsapi.org/v2/top-headlines?country=us&q=coronavirus&apiKey=${this.API_KEY}`);
    }

  getCoronavirus(){
    return this.httpClient.get(`https://newsapi.org/v2/top-headlines?country=us&q=coronavirus&apiKey=${this.API_KEY}`);
    }

  getGov(){
    return this.httpClient.get(`https://newsapi.org/v2/everything?q=trump OR government&apiKey=${this.API_KEY}`);
    }

  getEcon(){
    return this.httpClient.get(`https://newsapi.org/v2/everything?q=employees OR economy OR market OR stimulus&apiKey=${this.API_KEY}`);
    }
}
